import { html, css, LitElement, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * @cssprop [--header-color=black] - Controls the header colour
 * @cssprop [--text-color=black] - Controls the text colour
 * @cssprop [--border-color=red] - Controls the border colour
 * @cssprop [--background-color=white] - Controls the background colour
 */

@customElement('catalog-overview')
export class CatalogOverview extends LitElement {
  static styles = css`
    :host {
      display: block;
      background-color: var(--background-color, white);
    }
    h1 {
      color: var(--header-color, black);
    }
    ul {
      margin: 0;
      font-size: 0.8rem;
      display: flex;
      flex-direction: row;
      gap: 2em;
      list-style: none;
      padding: 0;
    }
    li {
      border: 1px solid var(--border-color, red);
      padding: 1em;
    }
  `
  /**
   * Which products will we render?
   */
  @property({ attribute: 'product-ids' })
  productIds = "1,2,3";

  @state()
  private purchases = [];

  private handlePurchase = (e:CustomEvent) => {
    // @ts-ignore
    this.purchases.push(e.detail.productId);
    this.requestUpdate();
  }

  private isVisible (id: string) {
    return Number(id) % 5 < 3;
  }

  render() {
    return html`
      <h1>Product overview</h1>
      <ul>
        ${this.productIds.split(",").map(id => {
          return html`<li>
            <catalog-item product-id="${Number(id)}" @purchase=${this.handlePurchase} ?is-visible=${this.isVisible(id)}>
              ${(Number(id) % 2 === 1) ? html`<div slot="container">Uneven</div>` : nothing}
            </catalog-item>
          </li>`
        })}
      </ul>
      <h2>Purchased items: ${this.purchases.join(", ")}</h2>
    `;
  }
}