import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { styleMap } from "lit-html/directives/style-map.js";
import { agentStyles } from "./styles";
import { Animator } from "./animator";
import "./balloon";
import { AnimationStates } from "./animations";

@customElement("clippy-element")
export class ClippyElement extends LitElement {
  private agentType: string;
  private animator: Animator | undefined;
  private pauseWriting = false;
  private pos1: number;
  private pos2: number;
  private pos3: number;
  private pos4: number;
  private mouseDown = false;

  static get styles() {
    return [agentStyles];
  }

  @property({ type: Object })
  backgroundPosition = {
    "background-position": "0px 0px",
    width: "0px",
    height: "0px",
  };
  @property({ type: String })
  name = "Clippy";
  @property({ type: String })
  hide = "false";
  @property({ type: Number })
  top = 0;
  @property({ type: Number })
  left = 0;
  @property({ type: Number })
  width = 0;
  @property({ type: Number })
  height = 0;
  @property({ type: String })
  speakText = "";

  render() {
    let containerStyle = { top: this.top + "px", left: this.left + "px" };
    return html`
      <div
        id="clippy-agent"
        class="agent-container"
        style=${styleMap(containerStyle)}
        ?hidden=${this.hide === "true"}
      >
        <balloon-element
          .speakText=${this.speakText}
          .pauseWriting=${this.pauseWriting}
        >
        </balloon-element>
        <div
          class="agent"
          id=${this.agentType}
          style=${styleMap(this.backgroundPosition)}
          @dblclick="${this.onDoubleClick}"
          @mousedown="${this.dragMouseDown}"
          @mousemove="${this.elementDrag}"
        ></div>
      </div>
    `;
  }

  constructor() {
    super();
    this.pos1 = this.pos2 = this.pos3 = this.pos4 = 0;
    this.agentType = this.name;
    document.onmouseup = this.closeDragElement;
    this.animator = new Animator(this);
    this.animator.SetupData(this.agentType).then(() => {
      let frameSize = this.animator!.GetFramesize();
      if (frameSize) {
        this.width = frameSize[0];
        this.height = frameSize[1];
      }
      if (this.hide == "false") {
        this.showElement();
      }
    });
    this.addEventListener(
      "backgroundState",
      (e: Event) => {
        this.backgroundPosition = {
          "background-position": (e as CustomEvent).detail.pos,
          width: this.width + "px",
          height: this.height + "px",
        };
      },
      false
    );
  }

  updated(changedProperties: Map<string, any>) {
    changedProperties.forEach((_oldValue: any, propName: string) => {
      if (propName == "hide") {
        if (this.animator!.hasAnimation("Show")) {
          if (this.hide == "true") {
            this.hideElement();
          } else if (this.hide == "false") {
            this.showElement();
          }
        }
      }
    });
  }

  public speak(text: string): void {
    this.speakText = text;
  }

  public hideBalloon(): void {
    this.speakText = "";
  }

  public animateElement(): void {
    const anim = this.animator!.getRandomAnimationName();
    // skip idle animations
    if (anim.indexOf("Idle") === 0) {
      return this.animateElement();
    }
    this.animator!.queueAnimation(anim);
  }

  public queueAnimation(animation: string): void {
    this.animator!.queueAnimation(animation);
  }

  public onQueueEmpty() {
    this.animator!.showIdleAnimation((state) => {
      if (state === AnimationStates.State.EXITED) {
        this.onQueueEmpty();
      }
    });
  }

  public stop(): void {
    this.animator!.stopAnimating(true);
    this.hideBalloon();
  }

  private showElement(): void {
    this.resume();
    this.animator!.queueAnimation("Show");
    this.hide = "false";
  }

  private hideElement = (): void => {
    this.stop();
    this.animator!.showAnimation("Hide", () => {
      this.pause();
    });
    setTimeout(() => {
      this.hide = "true";
    }, 300);
  };

  private pause() {
    this.animator!.clearTimeout();
    this.pauseWriting = true;
  }

  private resume() {
    this.animator!.step();
    this.pauseWriting = false;
  }

  private onDoubleClick() {
    this.animator?.stopAnimating(false);
    this.animateElement();
  }

  private dragMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    // get the mouse cursor position at startup:
    this.pos3 = e.clientX;
    this.pos4 = e.clientY;
    this.mouseDown = true;
  };

  private elementDrag = (e: MouseEvent) => {
    e.preventDefault();
    if (this.mouseDown) {
      // calculate the new cursor position:
      this.pos1 = this.pos3 - e.clientX;
      this.pos2 = this.pos4 - e.clientY;
      this.pos3 = e.clientX;
      this.pos4 = e.clientY;
      // set the element's new position:
      this.top = this.top - this.pos2;
      this.left = this.left - this.pos1;
    }
  };

  private closeDragElement = () => {
    // stop moving when mouse button is released:
    this.mouseDown = false;
  };
}

declare global {
  interface HTMLElementTagNameMap {
    "clippy-element": ClippyElement;
  }
}
