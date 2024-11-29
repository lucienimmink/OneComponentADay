import {customElement, LitElement, html, property} from 'lit-element';
import {balloonStyles} from './balloonstyles';

@customElement('balloon-element')
class BalloonElement extends LitElement {
    private addWord: any;
    private loop: any;
    private active = false;
    private WORD_SPEAK_TIME = 200;

    static get styles() {
        return [balloonStyles];
    }

    @property({type: String})
    speakText = '';
    @property({type: String})
    shownText = '';
    @property({type: Boolean})
    pauseWriting = false;

    render() {
        return html`
            ${this.speakText !== ''
                ? html` <div id="balloon" class="clippy-balloon">
                      <div id="balloon-content" class="clippy-content">
                          ${this.shownText}
                      </div>
                      <div class="clippy-tip"></div>
                  </div>`
                : html``}
        `;
    }

    updated(changedProperties: Map<string, any>) {
        changedProperties.forEach((oldValue: any, propName: string) => {
            if (propName == 'speakText') {
                this.speak(this.speakText);
            }
            if (propName == 'pauseWriting') {
                if (oldValue == null) {
                    return;
                }
                if (this.pauseWriting === true) {
                    this.pause();
                } else {
                    this.resume();
                }
            }
        });
    }

    public speak(text: string) {
        this.sayWords(text);
    }

    private sayWords(text: string) {
        this.active = true;
        const words = text.split(/[^\S-]/);
        const time = this.WORD_SPEAK_TIME;
        let idx = 1;

        this.addWord = () => {
            if (!this.active) {
                return;
            }
            if (idx > words.length) {
                delete this.addWord;
                this.active = false;
            } else {
                this.shownText = words.slice(0, idx).join(' ');
                idx++;
                this.loop = setTimeout(this.addWord.bind(this), time);
            }
        };
        this.addWord();
    }

    public pause(): void {
        clearTimeout(this.loop);
    }

    public resume(): void {
        if (this.addWord) {
            this.addWord();
        }
    }
}
declare global {
    interface HTMLElementTagNameMap {
        'balloon-element': BalloonElement;
    }
}
