const searchAutocompleteItemTemplate = document.createElement("template");
searchAutocompleteItemTemplate.innerHTML = `
    <style>
        .list-item {
            padding: 5px 10px;
            cursor: pointer;
        }
        
        .list-item:hover {
            background: var(--destination-list-hover);
        }
        
        .hide {
            display: none;
        }
    </style>
    <link rel=stylesheet  href=https://cdn.materialdesignicons.com/4.9.95/css/materialdesignicons.min.css>
    <div class="list-item">
        <span class="mdi mdi-map-marker location-icon"></span>
        <span class="item-value"></span>
    </div>
`;

export class SearchAutocompleteItemComponent extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(searchAutocompleteItemTemplate.content.cloneNode(true));

        this.item = this.shadowRoot.querySelector(".list-item");
        this.itemValue = this.item.querySelector(".item-value");
        this.locationIcon = this.item.querySelector(".location-icon");
    }

    connectedCallback() {
        this.itemValue.innerHTML = this.value;
        if (this.type === 'empty') {
            this.locationIcon.classList.add("hide");
            this.itemValue.classList.add("empty");
        }
    }
}
