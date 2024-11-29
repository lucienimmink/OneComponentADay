export interface Animations {
    overlayCount: number;
    sounds: string[];
    framesize: number[];
    animations: Animation[];
}

export interface Animation {
    name: string;
    frames: Frame[];
    useExitBranching?: boolean;
}

export interface Frame {
    duration: number;
    images?: Array<number[]>;
    sound?: string;
    exitBranch?: number;
    branching?: Branching;
}

export interface Branching {
    branches: Branch[];
}

export interface Branch {
    frameIndex: number;
    weight: number;
}
export class AnimationStates {
    public static State = {WAITING: 1, EXITED: 0};
}
