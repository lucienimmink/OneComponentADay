import { html, css, LitElement } from "lit"
import { customElement, property } from "lit/decorators.js"

/**


* @slot container - Your light-dom elements will be placed here


* @cssprop [--text-color=black] - Controls the text colour

*/

@customElement("catalog-item")
export class CatalogItem extends LitElement {
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
    }
  `

  /** ID of the catalog item */
  @property({ type: Number, attribute: "product-id" })
  productId = -1
  /** undefined */
  @property({ type: Boolean, attribute: "is-visible" })
  isVisible = true

  /** Write function that dispatches the event purchase */
  private eventFunctionpurchase() {
    /** @type {Event} send intent tu purchase this item */
    this.dispatchEvent(new Event("purchase"))
  }

  render() {
    return html`
      <h1>CatalogItem - &lt;catalog-item&gt;&lt;/catalog-item&gt;</h1>

      <h2>CSS variables</h2>
      <ul>
        <li>
          <span style="color: var(--text-color, black)"
            >current text-color: --text-color default value: black</span
          >
        </li>
      </ul>

      <h2>Attributes</h2>
      <ul>
        <li>productId = ${this.productId}</li>
        <li>isVisible = ${this.isVisible}</li>
      </ul>

      <h2>Events</h2>
      <ul>
        <li>
          <button @click=${this.eventFunctionpurchase}>trigger purchase</button>
        </li>
      </ul>

      <h2>Slots</h2>
      <ul>
        <li>
          Slot container (Your light-dom elements will be placed here):
          <slot name="container"></slot>
        </li>
      </ul>
    `
  }
}
