import destinationService from "../services/destinationsService"
import utils from "../utils/utils"
import dateService from "@/services/dateService";
import EventHandler from "@/services/eventHandler";

const SearchAutocompleteTemplate = document.createElement("template");
SearchAutocompleteTemplate.innerHTML = `
    <style>
        
        
        .list-container {
            display: flex;
        }
        
        .input-field:hover {
            background: var(--destination-hover);
        }
        
        .input-field {
            padding-left: 25px;
            height: 25px;
            width: calc(100% - 30px);
            border-radius: 5px;
            font-size: 15px;
        }
        
        .options-items {
            position: absolute;
            z-index: 9999;
            color: var(--background-color);
            background: var(--select-box-back);
            border: 1px solid var(--background-color);
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
            border-top: none;
            width: 100%;
        }
        
        .hide {
            display: none;
        }
        
        .label {
            min-width: 150px;
        }
        
        .placeholder-icon {
            position: absolute;
            z-index: 9;
            top: 7px;
            color: var(--text-color);
        }
        
        .left-icon {
            left: 5px;
        }
        
        .right-icon {
            right: 5px;
        }
        
        .items {
            position: relative;
            width: 100%;
        }
    </style>
    <link rel=stylesheet  href=https://cdn.materialdesignicons.com/4.9.95/css/materialdesignicons.min.css>
    
    <div class="app-component">
        <div class="list-container">
            <div class="label">Destination</div>
            <div class="items">
                <span class="mdi mdi-umbrella placeholder-icon left-icon"></span>
                <span class="mdi mdi-magnify placeholder-icon right-icon"></span>
                <input class="input-field" type="text"/>
                <div class="options-items hide"></div>
            </div>
        </div>
    </div>`;

export class SearchAutocompleteComponent extends HTMLElement {
    constructor() {
        super();

        this.serchedValue = '';

        this.attachShadow({ mode: "open" });

        this.shadowRoot.appendChild(SearchAutocompleteTemplate.content.cloneNode(true));

        this.listItems = this.shadowRoot.querySelector('.options-items');
        this.inputField = this.shadowRoot.querySelector('.input-field');

        this.generateListItems();
        this.hideOptions();
    }

    connectedCallback() {
        // show options box on input click
        this.inputField.addEventListener("click", (e) => {
            e.stopPropagation();
            e.preventDefault();
            this.showOptions();
        });

        const keyUpDefer = utils.deferClosure(()=> {
            this.performSearching();
        })

        this.inputField.addEventListener("keyup", (e) => {
            keyUpDefer(200);
        });
        //prevent from closing options box
        document.addEventListener('click', (e) => {
            if (e.target.closest('.input-field')) {
                return;
            }
            this.hideOptions();
        })
    }

    async performSearching() {
        const value = this.inputField.value;
        if (value && value !== this.serchedValue) {
            const searchResult = await destinationService.performSearch(value);

            this.generateListItems();
        }
    }

    showOptions() {
        this.listItems.classList.remove('hide');
    }

    hideOptions() {
        this.listItems.classList.add("hide");
    }

    generateListItems () {
        this.clearListItems();
        let values = destinationService.getSearchedResults();

        values = values.length
            ? values
            : [{name: 'Nothing found', type: 'empty'}];

        values.forEach((item)=> {
            this.addLListItem(item);
        });

        this.showOptions();
    }

    clearListItems() {
        this.listItems.innerHTML = ''
    }

    addLListItem(item) {
        const { name, type } = item;
        let listItem = document.createElement("destination-search-item");

        listItem.value = name;
        listItem.type = type;

        listItem.addEventListener("click", (e) => {
            if (listItem.type === 'empty') {
                return;
            }

            this.setValueFromItem( listItem.value);
        });

        this.listItems.appendChild(listItem);
    }

    setValueFromItem(value) {
        this.inputField.value = value;
        destinationService.setSelectedDestination(value);
        EventHandler.triggerEvent('form-changed');
    }

    disconnectedCallback() {}
}
