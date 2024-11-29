import {Animations, Frame, Animation, AnimationStates} from './animations';
import {Queue} from './queue';
import {Loader} from './loader';
import {LitElement} from 'lit-element';

export class Animator {
    private started = false;
    private exiting = false;
    private currentAnimation: Animation | undefined;
    private endCallback: any;
    private loop: any;
    private currentFrame: Frame | undefined;
    private currentFrameIndex = 0;

    private soundList: [Sound] | undefined;
    private animations: Animations | undefined;
    private queue: Queue;
    private loader: Loader;
    private clippy: LitElement;

    constructor(clippy: LitElement) {
        this.clippy = clippy;
        this.queue = new Queue();
        this.loader = new Loader();
        this.queue.createCallback(this.onQueueEmpty.bind(this));
    }

    public async SetupData(name: string) {
        this.animations = ((await this.GetAgentData(
            name
        )) as unknown) as Animations;
        this.preloadSounds(
            ((await this.GetSoundData(name)) as unknown) as [string, string]
        );
    }

    public GetFramesize(): number[] | undefined {
        return this.animations?.framesize;
    }

    private async GetAgentData(name: string): Promise<string> {
        return await this.loader.loadAgent(name);
    }

    private async GetSoundData(name: string): Promise<string> {
        return await this.loader.loadSounds(name);
    }

    changePos(pos: string) {
        let event = new CustomEvent('backgroundState', {
            detail: {
                pos: pos
            }
        });

        this.clippy.dispatchEvent(event);
    }

    public clearTimeout() {
        clearTimeout(this.loop);
    }

    public getRandomAnimationName(typeName?: string): string {
        const nameList = new Array<string>();
        const filteredList = new Array<string>();
        if (this.animations)
            for (const n of this.animations.animations) {
                nameList.push(n.name);
            }
        if (typeName) {
            for (let i = 0; i < nameList.length; i++) {
                const a = nameList[i];
                if (a.indexOf(typeName) === 0) {
                    filteredList.push(a);
                }
            }
            // pick one
            const idx = Math.floor(Math.random() * filteredList.length);
            return filteredList[idx];
        } else {
            const idx = Math.floor(Math.random() * nameList.length);
            return nameList[idx];
        }
    }

    public hasAnimation(name: string): boolean {
        return (
            this.animations?.animations.find((x) => x.name === name) !=
            undefined
        );
    }

    public exitAnimation() {
        this.exiting = true;
    }

    public showAnimation(
        animationName: string,
        callback: (state: AnimationStates) => void
    ) {
        return new Promise(() => {
            this.exiting = false;
            if (!this.hasAnimation(animationName)) {
                return false;
            }

            this.currentAnimation = this.animations?.animations.find(
                (f) => f.name === animationName
            );

            this.currentFrameIndex = 0;
            this.currentFrame = undefined;

            if (!this.started) {
                this.step();
                this.started = true;
            }
            this.endCallback = callback;
            return true;
        });
    }

    public queueAnimation(animation: string): void {
        if (!this.hasAnimation(animation)) {
            return;
        }
        this.queue.enqueue((complete) => {
            let completed = false;

            window.setTimeout(() => {
                if (completed) {
                    return;
                }
                // exit after timeout
                this.exitAnimation();
            }, 5000);
            this.showAnimation(animation, (state) => {
                if (state === AnimationStates.State.EXITED) {
                    completed = true;
                    complete();
                }
            });
        });
    }

    public enqueueFunction(func: (complete: any) => void) {
        this.queue.enqueue(func);
    }

    public showIdleAnimation(callback: (state: AnimationStates) => void): void {
        this.showAnimation(this.getRandomAnimationName('Idle'), callback);
    }

    public step() {
        if (!this.currentAnimation) {
            return;
        }
        const newFrameIndex = Math.min(
            this.getNextAnimationFrame(),
            this.currentAnimation.frames.length - 1
        );
        const frameChanged =
            !this.currentFrame || this.currentFrameIndex !== newFrameIndex;
        this.currentFrameIndex = newFrameIndex;

        // always switch frame data, unless we're at the last frame of an animation with a useExitBranching flag.
        if (!(this.atLastFrame() && this.currentAnimation.useExitBranching)) {
            this.currentFrame = this.currentAnimation.frames[
                this.currentFrameIndex
            ];
        }
        this.draw();
        this.playSound();

        this.loop = setTimeout(
            this.step.bind(this),
            this.currentFrame?.duration ?? 100
        );

        // fire events if the frames changed and we reached an end
        if (this.endCallback && frameChanged && this.atLastFrame()) {
            if (this.currentAnimation.useExitBranching && !this.exiting) {
                this.endCallback(AnimationStates.State.WAITING);
            } else {
                this.endCallback(AnimationStates.State.EXITED);
            }
        }
    }

    private preloadSounds(sounds: [string, string]) {
        if (this.animations)
            for (let i = 0; i < this.animations.sounds.length; i++) {
                const snd = this.animations.sounds[i];
                const uri: string = sounds[Number(snd)];
                if (!uri) {
                    continue;
                }
                if (this.soundList == undefined)
                    this.soundList = [{name: snd, audio: new Audio(uri)}];
                else this.soundList.push({name: snd, audio: new Audio(uri)});
            }
    }

    private draw() {
        let images: Array<number[]> = [];
        if (this.currentFrame) {
            images = this.currentFrame.images || [];
        }
        for (let i = 0; i < images.length; i++) {
            const xy = images[i];
            const bg = -xy[0] + 'px ' + -xy[1] + 'px';
            this.changePos(bg);
        }
    }

    private getNextAnimationFrame() {
        if (!this.currentAnimation) {
            return 0;
        }
        // No current frame. start animation.
        if (!this.currentFrame) {
            return 0;
        }
        const currentFrame = this.currentFrame;
        const branching = this.currentFrame.branching;

        if (this.exiting && currentFrame.exitBranch !== undefined) {
            return currentFrame.exitBranch;
        } else if (branching) {
            let rnd = Math.random() * 100;
            for (let i = 0; i < branching.branches.length; i++) {
                const branch = branching.branches[i];
                if (rnd <= branch.weight) {
                    return branch.frameIndex;
                }
                rnd -= branch.weight;
            }
        }
        return this.currentFrameIndex + 1;
    }

    private playSound() {
        if (!this.currentFrame) return;
        const s = this.currentFrame.sound;
        if (!s) {
            return;
        }
        const audio = this.soundList?.find((f) => f.name === s)?.audio;
        if (audio) {
            audio.play();
        }
    }

    private atLastFrame() {
        if (this.currentAnimation)
            return (
                this.currentFrameIndex >=
                this.currentAnimation.frames.length - 1
            );
        return true;
    }

    public stopAnimating(showExitAnimation: boolean) {
        this.queue.clear();
        if (showExitAnimation) this.exitAnimation();
    }

    public onQueueEmpty() {
        this.showIdleAnimation((state) => {
            if (state === AnimationStates.State.EXITED) {
                this.onQueueEmpty();
            }
        });
    }
}
interface Sound {
    name: string;
    audio: HTMLAudioElement;
}
