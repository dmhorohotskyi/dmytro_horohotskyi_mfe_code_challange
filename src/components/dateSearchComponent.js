import dateService from "../services/dateService"
import utils from "../utils/utils";
import EventHandler from '../services/eventHandler'


const DateSearchTemplate = document.createElement("template");
DateSearchTemplate.innerHTML = `
    <style>      
        
        .hide {
            visibility: hidden;
            position: absolute;
        }
        
        .date-input-ghost {
            height: 30px;
        }
        
        .date-holder {
            position: relative;
            display: flex;
            width: 100%;
        }
        
        .label {
            min-width: 150px;
        }
        
        .date-form-field {
            display: flex;
        }
        
        .date-input {
            padding-left: 25px;
            height: 25px;
            width: 100%;
            font-size: 15px;
            border-radius: 5px;
        }
        
        .left-icon {
            position: absolute;
            z-index: 9;
            top: 7px;
            left: 5px;
            color: var(--text-color);
        }
    </style>
    <link rel=stylesheet  href=https://cdn.materialdesignicons.com/4.9.95/css/materialdesignicons.min.css>
    
    <div class="date-form-field">
        <div class="label"> Date </div>
        <div class="date-holder">
            <span class="mdi mdi-calendar left-icon"></span>
            <input class="date-input-ghost hide" type="date">
            <input class="date-input" type="text">
        </div>
    </div>
    `;

export class DateSearchComponent extends HTMLElement {
    constructor() {
        super();


        this.attachShadow({ mode: "open" });

        this.shadowRoot.appendChild(DateSearchTemplate.content.cloneNode(true));

        this.dateInputGhost = this.shadowRoot.querySelector('.date-input-ghost');
        this.dateInput = this.shadowRoot.querySelector('.date-input');

    }

    connectedCallback() {
        this.dateInput.addEventListener("click", (e) => {
            this.dateInputGhost.showPicker();
            console.log('test')
        });

        this.dateInputGhost.addEventListener("change", (e) => {
            const value = this.dateInputGhost.value;

            this.dateInput.value = utils.formatDateInYYYYMMDD(value);
            dateService.setSelectedDate(value);
            EventHandler.triggerEvent('form-changed');
        })
    }



    disconnectedCallback() {}
}
