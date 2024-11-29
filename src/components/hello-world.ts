import { html, css, LitElement } from "lit"
import { customElement, property } from "lit/decorators.js"

/**
* Hello generated world! Click for a gift or a bomb
*

* @cssprop [--text-color=black] - Controls the text colour
* @cssprop [--background-color=red] - Controls the background colour

*/

@customElement("hello-world")
export class HelloWorld extends LitElement {
  static styles = css`
    h1,
    h2 {
      margin: 0;
    }
    ul {
      margin: 0;
    }
    :host {
      --text-color: var(--text-color, black);
      --background-color: var(--background-color, red);
    }
  `

  /** What type is the world today? */
  @property({ type: String, attribute: "type" })
  type = "wonderful"

  /** Write function that dispatches the event Gift */
  private eventFunctionGift() {
    /** @type {Event} gift - I'm bearing a gift */
    this.dispatchEvent(new Event("Gift"))
  }

  /** Write function that dispatches the event Bomb */
  private eventFunctionBomb() {
    /** @type {Event} bomb - This was a mistake... */
    this.dispatchEvent(new Event("Bomb"))
  }

  render() {
    return html`
      <h1>HelloWorld - &lt;hello-world&gt;&lt;/hello-world&gt;</h1>

      <p>Hello generated world! Click for a gift or a bomb</p>

      <h2>CSS variables</h2>
      <ul>
        <li>
          <span style="color: var(--text-color, black)"
            >current text-color: --text-color default value: black</span
          >
        </li>
        <li>
          <span style="color: var(--background-color, red)"
            >current text-color: --background-color default value: red</span
          >
        </li>
      </ul>

      <h2>Attributes</h2>
      <ul>
        <li>type = ${this.type}</li>
      </ul>

      <h2>Events</h2>
      <ul>
        <li><button @click=${this.eventFunctionGift}>trigger Gift</button></li>
        <li><button @click=${this.eventFunctionBomb}>trigger Bomb</button></li>
      </ul>
    `
  }
}
