!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).Editor=e()}(this,(function(){"use strict";const t=[],e=["hljs-tag","hljs-name","hljs-attr","hljs-string","hljs-attribute","hljs-selector-pseudo"],n=e=>{e.setAttribute("contentEditable","true");const n=e.closest("section").querySelector("[data-edit]");n&&(e.addEventListener("keyup",(()=>{const t=e.textContent;n.innerHTML=t})),t.push(e))},s={id:"editor",init(t){t.getRevealElement().addEventListener("click",(function(t){let{target:s}=t;if(s.classList.contains("hljs")&&null===s.getAttribute("contentEditable")&&n(s),Array.from(s.classList).some((t=>e.includes(t)))){const t=s.closest(".hljs");null===t.getAttribute("contentEditable")&&n(t)}}))},destroy(){t.forEach((t=>{t.removeAttribute("contentEditable"),t.removeEventListener("keyup")}))}};return()=>s}));