## 1 Web Component a 📅 <br />keeps the 🧑‍⚕️ away

<!-- .slide: data-theme="blue" -->

--

> I'd like to display album art. <br />
Here is my _artist_ and _album name_</span>.

<span class="fragment reveal-album">
  <album-art artist="ayreon"></album-art> <br />
  <span class="small">Ayreon</span>
</span>
<span class="fragment reveal-album">
  <album-art artist="epica" album="Ωmega alive"></album-art><br />
  <span class="small">Epica &bull; Ωmega alive</span>
</span>

--

### TODO

- Find the album art online<!-- .element: class="fragment fade-in-then-semi-out" -->
- Add caching to sequential calls to the same art<!-- .element: class="fragment fade-in-then-semi-out" -->
- Optimize the image for the required dimensions<!-- .element: class="fragment fade-in-then-semi-out" -->
- ...<!-- .element: class="fragment fade-in-then-semi-out" -->
- All without bothering the developer<!-- .element: class="fragment fade-in-then-semi-out" -->

--

### As a 3rd party script

```javascript
const albumArt = ({artist, album}) => {
  let magic;
  // do magic, magic will return an &lt;img&gt; tag
  return magic;
```

<p>
  <img src="/assets/icons/javascript.svg" class="icon icon-inline" alt=""> 3rd-party-script.js
</p><!-- .element: class="filename" -->

--

### In _my_ page

```html
<script src="//my-domain.example.com/album-art.js"></script>

<div id="art"></div>

<script>
  const art = albumArt({artist: 'tool', album: 'fear inoculum'});
  document.querySelector("#art").innerHTML = art;
  // 👊🤐💩💣 ... never trust external HTML
</script>
```

<p>
  <img src="/assets/icons/html.svg" class="icon icon-inline" alt=""> my-page.html
</p><!-- .element: class="filename" -->

--

### Until it becomes to complex

- It requires a lot of shared knowledge<!-- .element: class="fragment fade-in" -->
- Or a lot of copy-pasting<!-- .element: class="fragment fade-in" -->
- Who is responsible for the styling?<!-- .element: class="fragment fade-in" -->

--

> Just make it a _[insert favourite framework here]_ component!

--

> ... But we use _[insert other framework here]_

--

> Have fun rewriting your _[insert enourmous component here]_ using _[insert some other framework here]_

--

> Don't forget to use _TypeScript_
 
your least favourite co-worker or boss type of person<!-- .element: class="fragment fade-in small" -->
---

<!-- .slide: data-theme="calm-green" -->

## Lucien Immink, B.Eng.

Hopefully not that least favourite person<!-- .element: class="fragment fade-in small" -->

--

![Lucien Immink](/assets/lucien-immink.webp)<!-- .element: class="circle" style="max-height: 20vh" -->

Software Architect &</br>
Developer Advocate @ _iO_</br>
</br>
Google Developer Expert

---

## Upcoming

- Web Components<!-- .element: class="fragment fade-in" -->
- How to integrate<!-- .element: class="fragment fade-in" -->
- Some use-cases<!-- .element: class="fragment fade-in" -->

---

<!-- .slide: data-theme="calm-pink" -->
## Web Components

--

### Templates

> The HTML content _&lt;template&gt;_ element is a mechanism for holding HTML.

--

#### Example template

```html[1,5,6,9]
<template id="template">
  <div class="card card-artist">
    <img class="card-img-top" alt="artist" src="placeholder.webp">
    <p class="card-body">
      <slot name="artist">artist name</slot>
      <slot name="bio">artist bio</slot>
    </p>
  </div>
</template>
```

<p>
  <img src="/assets/icons/html.svg" class="icon icon-inline" alt=""> some-page.html
</p><!-- .element: class="filename" -->

--

<p class="warn">
  This DOM is not live.<br />
  No calls will be made to fetch the image. <br />
  No CSS is applied.<br />
  No script is excecuted.
</p>

--

#### Use JavaScript to use the template

```javascript
if ('content' in document.createElement('template')) {
  const template = document.querySelector('#template');

  // clone the template and fill in the values
  const clone = document.importNode(template.content, true);
  clone.querySelector('.card-img-top').setAttribute('src', url);
  // ...
  // now we can add it to the DOM
  document.querySelector('body').appendChild(clone);
}
```

<p>
  <img src="/assets/icons/javascript.svg" class="icon icon-inline" alt=""> some-script.js
</p><!-- .element: class="filename" -->

--

<p class="success">
  Once added the image is fetched. <br />
  CSS is applied to the nodes. <br />
  Script is excecuted.
</p>

--

### Custom Elements

--

<p>
  The ability to create
  <span class="fragment highlight-blue">custom elements</span> that
  encapsulate your
  <span class="fragment highlight-blue">functionality</span> on an
  HTML page, rather than having to make do with a
  <span class="fragment highlight-red"
    >long, nested batch of elements</span
  >
  that together provide a custom page feature.
</p>

--

#### Extend _HTMLElement_

```javascript
class AlbumArt extends HTMLElement {
  constructor() {
    // Always call super first
    super();

    // add your magic
  }
}
```

<p>
  <img src="/assets/icons/javascript.svg" class="icon icon-inline" alt=""> my-custom-element.js
</p><!-- .element: class="filename" -->

--

#### Register the custom element

```js
customElements.define('album-art', AlbumArt);
```

<p>
  <img src="/assets/icons/javascript.svg" class="icon icon-inline" alt=""> my-custom-element.js
</p><!-- .element: class="filename" -->

--

#### Customize built-in elements

```js
class SortableList extends HTMLOListElement {
  constructor() {
    super();
    // append constructor code
  }
  // and more class magic
};
customElements.define('sortable-list', SortableList, { extends: "ol" });
```

<p>
  <img src="/assets/icons/javascript.svg" class="icon icon-inline" alt=""> sortable-list.js
</p><!-- .element: class="filename" -->


```html
<ol is="sortable-list"></ol>
```

<p>
  <img src="/assets/icons/html.svg" class="icon icon-inline" alt=""> sortable-list-example.html
</p><!-- .element: class="filename" -->

--

### Use custom elements anywhere

```html[3-7]
<article class="artist-info">
  <p>Lorem ipsizzle sit down sit down sizzle amizzle</p>
  <album-art artist="2pac">
    <p slot="bio">Crizzle aliquam daahng dawg sure mi.
      Shut the shizzle up socizzle natoque penatibizzle
      check it out ma nizzle crazy hizzle</p>
  </album-art>
  <p>Nullam sapien velizzle, crazy volutpizzle, fo shizzle.</p>
</article>
```

<p>
  <img src="/assets/icons/html.svg" class="icon icon-inline" alt=""> alien-page.html
</p><!-- .element: class="filename" -->

--

### Lifecycle callbacks

- connectedCallback<!-- .element: class="fragment fade-in-then-semi-out" -->
- disconnectedCallback<!-- .element: class="fragment fade-in-then-semi-out" -->
- adoptedCallback<!-- .element: class="fragment fade-in-then-semi-out" -->
- attributeChangedCallback<!-- .element: class="fragment fade-in-then-semi-out" -->

--

### Shadow DOM

--

<p>
  Shadow DOM allows
  <span class="fragment highlight-blue">hidden DOM trees</span> to
  be attached to elements in the regular DOM tree.
</p>

--

![shadow DOM](/assets/shadow-dom.webp)<!-- .element: class="image" -->

--

#### Attach a shadow DOIM

```js
const shadowDom = this.attachShadow({ mode: 'open'});
```

<p>
  <img src="/assets/icons/javascript.svg" class="icon icon-inline" alt=""> my-custom-element.js
</p><!-- .element: class="filename" -->

<br>

- Open: Elements of the shadow root are accessible from JavaScript outside the root.<!-- .element: class="fragment fade-in-then-semi-out small" -->
- Closed: Denies access to the node(s) of a closed shadow root from JavaScript outside it.*<!-- .element: class="fragment fade-in-then-semi-out small" -->
- \* It is still possible to access the dom from outside the element. It's probably not worth the effort.<!-- .element: class="fragment fade-in-then-semi-out small" -->

--

```javascript[2,7]
// my-custom-element.js
this._root = this.attachShadow({ mode: "closed" });

// somewhere-else.js
const $myWebComponent = document.querySelector("my-web-component");
$myWebComponent.shadowRoot // null
$myWebComponent._root // shadow-root (closed)
```

![Even will the component is 'closed' you can still override the content](/assets/shadow-dom-closed-override.gif)<!-- .element: class="fragment fade-in image" style="max-height: 34vh;" -->

--

### Create the _shadow DOM_

```javascript
const shadow = this.attachShadow({ mode: 'open'});
const wrapper = document.createElement('div');
wrapper.classList.add('wrapper');
const image = document.createElement('img');

// use the img attributre of the custom element if present
let imageUrl = 'img/placeholder.webp';
if (this.hasAttribute('img')) {
  imageUrl = this.getAttribute('img');
}
image.src = imageUrl;

// add the new elements to the shadow DOM
wrapper.appendChild(image);
shadow.appendChild(wrapper);
```

<p>
  <img src="/assets/icons/javascript.svg" class="icon icon-inline" alt=""> my-custom-element.js
</p><!-- .element: class="filename" -->

--

### and add some _styling_

```javascript
const styleElem = document.createElement('style');
styleElem.textContent = `
  .wrapper {
    position: relative;
  }
  img {
    display: block;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;
shadow.appendChild(styleElem);
```

<p>
  <img src="/assets/icons/javascript.svg" class="icon icon-inline" alt=""> my-custom-element.js
</p><!-- .element: class="filename" -->

--

### _Bonus_: CSS Variables

```javascript
const styleElem = document.createElement('style');
styleElem.textContent = `
  :host {
    --primary: lch(80% 200 50);
    --fallback: rgb(255 0 0);
    --background: white;
  }
  p {
    background-color: var(--background);
    color: var(--primary, var(--fallback, black));
  }
`;
shadow.appendChild(styleElem);
```

<p>
  <img src="/assets/icons/javascript.svg" class="icon icon-inline" alt=""> my-custom-element.js
</p><!-- .element: class="filename" -->

--

### CSS variables and shadow DOM

- No shadow DOM: Uses global (light DOM) styling<!-- .element: class="fragment fade-in-then-semi-out" -->
- uses shadow DOM: Scoped styling<!-- .element: class="fragment fade-in-then-semi-out" -->
- uses shadow DOM &amp; CSS variables: Can use light DOM css variables<!-- .element: class="fragment fade-in-then-semi-out" -->

---

<!-- .slide: data-theme="calm-green" -->
## Integrate

--

### Angular

<div>

```js[1,4]
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
@NgModule({
  ...,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
```

<p>
  <img src="/assets/icons/typescript.svg" class="icon icon-inline" alt=""> app.module.ts
</p><!-- .element: class="filename" -->

</div><!-- .element: class="fragment fade-in-then-semi-out" -->

<div>

```js
import "album-art-component";
```

<p>
  <img src="/assets/icons/typescript.svg" class="icon icon-inline" alt=""> your-angular-component.ts
</p><!-- .element: class="filename" -->

</div><!-- .element: class="fragment fade-in-then-semi-out" -->

<div>

```html
<album-art [album]="album.name" [artist]="artist.name"></album-art>
```

<p>
  <img src="/assets/icons/html.svg" class="icon icon-inline" alt=""> your-angular-component.html
</p><!-- .element: class="filename" -->

</div><!-- .element: class="fragment fade-in-then-semi-out" -->

--

### React

<div>

```javascript
import "album-art-component";
class AlbumArt extends React.Component {
  render() {
    return (
      <album-art artist={this.props.artist.name}></album-art>
    );
  }
}
```

<p>
  <img src="/assets/icons/typescript.svg" class="icon icon-inline" alt=""> your-react-component.ts
</p><!-- .element: class="filename" -->

</div><!-- .element: class="fragment fade-in-then-semi-out" -->

<p class="warn">
  React can render Web Components but it cannot <em>easily</em> pass React props to custom element properties or listen to event listeners.<br />
  <br />
  Use a react-wrapper like <a href="https://www.npmjs.com/package/@lit-labs/react" target="_blank">@lit-labs/react - npmjs.com</a>
</p><!-- .element: class="fragment fade-in-then-semi-out warn small" -->

--

## Vue (config)

<div>

```javascript
import vue from '@vitejs/plugin-vue'
              
export default {
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // treat all tags with a dash as custom elements
          isCustomElement: (tag) => tag.includes('-')
        }
      }
    })
  ]
}
```

<p>
  <img src="/assets/icons/javascript.svg" class="icon icon-inline" alt=""> vite.config.js
</p><!-- .element: class="filename" -->

</div><!-- .element: class="fragment fade-in-then-semi-out" -->

--

## Vue (use)

<div>

```html
<template>
  <album-art 
    .album="{album.name}" 
    .artist="{artist.name}">
  </album-art>
</template>
<script>
  import "album-art-component";
</script>
```

<p>
  <img src="/assets/icons/typescript.svg" class="icon icon-inline" alt=""> your-vue-component.vue
</p><!-- .element: class="filename" -->

</div><!-- .element: class="fragment fade-in-then-semi-out" -->

--

## Libraries

- Lit<!-- .element: class="fragment fade-in-then-semi-out" -->
- Stencil.js<!-- .element: class="fragment fade-in-then-semi-out" -->
- Skate.js<!-- .element: class="fragment fade-in-then-semi-out" -->
- ...and so may more<!-- .element: class="fragment fade-in-then-semi-out" -->

---

<!-- .slide: data-theme="calm-pink" -->

## Examples / Use cases

--

### &lt;render-plantuml&gt;

```html
<render-plantuml server="https://some-server">
  Actor -> "Actor 2" : Hooray an example!
</render-plantuml>
```

![Example of render-plantuml](/assets/render-plantuml-example.webp)<!-- .element: class="fragment fade-in image" -->

--

Skeleton components

![Example of fg-configurator](/assets/fg-configurator.webp)<!-- .element: class="fragment fade-in image" -->

--

&lt;api-viewer&gt;

```html
<api-viewer src="./custom-elements.json"></api-viewer>
```

<api-viewer src="/assets/wc/custom-elements.json"></api-viewer><!-- .element: class="image" -->

--

## &lt;album-art&gt;

```html
<album-art artist="abba"></album-art>
<album-art artist="daft punk" album="random access memories"></album-art>
```

<p class="album-art-grid" data-edit>
  <album-art artist="Abba"></album-art><!-- .element: class="album-art-grid-item"  -->
  <album-art artist="daft punk" album="random access memories"></album-art><!-- .element: class="album-art-grid-item" -->
</p>

---

## And so it has come to this
<!-- .slide: data-theme="blue" -->

--

### Web components

```html
<album-art artist="abba"></album-art>

<api-viewer src="./custom-elements.json"></api-viewer>

<render-plantuml server="https://some-server">
  Actor -> "Actor 2" : Hooray an example!
</render-plantuml>
```

- APIs to create new custom, reusable HTML tags<!-- .element: class="fragment fade-in" -->
- With controlled style and markup that doesn't leak<!-- .element: class="fragment fade-in" -->
- Works in all modern browsers<!-- .element: class="fragment fade-in" -->

--

### Web components are

- HTML templates<!-- .element: class="fragment fade-in" -->
- Custom Elements<!-- .element: class="fragment fade-in" -->
- Shadow DOM<!-- .element: class="fragment fade-in" -->

--

### Web components...

- 😍 CSS variables<!-- .element: class="fragment fade-in" -->
- Integrate with all modern JavaScript frameworks<!-- .element: class="fragment fade-in" -->
- Can fetch my album art 🥳🎉🪩<!-- .element: class="fragment fade-in" -->

---

## Thank you

Contact me:

![iO logo](/assets/io.svg)<!-- .element: class="icon icon-inline" --> [iodigital.com](https://www.iodigital.com) <br >
🦜 [twitter.com/lucienimmink](https://twitter.com/lucienimmink) <br >
🏢 [linkedin.com/in/lucien-immink](https://www.linkedin.com/in/lucien-immink/) <br >
