const AppTemplate = document.createElement("template");
AppTemplate.innerHTML = `
    <link rel=stylesheet  href=https://cdn.materialdesignicons.com/4.9.95/css/materialdesignicons.min.css>
    <style>
        .app-component {
            margin: 0 auto;
            display: flex;
            justify-content: center;
            flex-direction: column;
            width: 50%;
            color: var(--white);
        }
        
        .form-field {
            display: flex;
            flex-direction: column;
            margin: 20px 10px;
            width: 100%;
        }
        
        .head-text {
            display: flex;
            justify-content: center;
        }
        
        .logo-icon {
            margin-left: 10px;
        }
    </style>
    <div class="app-component">
        <h1 class="head-text">Where can I travel</h1>
        <destination-search class="form-field"></destination-search>
        <date-search class="form-field"></date-search>
        <travel-to-result class="form-field"></travel-to-result>
    </div>
`;

export class AppComponent extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });

        this.shadowRoot.appendChild(AppTemplate.content.cloneNode(true));
    }

    connectedCallback() {
        this.connectToMI()
    }

    connectToMI() {
        this.innerHTML = `<style>
          @font-face {
            font-family: "Material Design Icons";
            src: url("https://cdn.materialdesignicons.com/4.9.95/fonts/materialdesignicons-webfont.woff?v=4.9.95") format("woff");
          }
       </style>`
    }

    disconnectedCallback() {}
}
