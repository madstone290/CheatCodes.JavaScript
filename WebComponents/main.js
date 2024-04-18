const header = document.createElement('header');
const shadowRoot = header.attachShadow({mode: 'open'});
shadowRoot.innerHTML = `<h1>Web Components</h1>`;

console.log("shadowroot: ", header.shadowRoot);
console.log("host: ",shadowRoot.host);
