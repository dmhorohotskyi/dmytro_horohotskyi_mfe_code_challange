import destinationService from "../services/destinationsService"
import dateService from "@/services/dateService";
import utils from "../utils/utils"
import EventHandler from '../services/eventHandler'

const TravelToResultTemplate = document.createElement("template");
TravelToResultTemplate.innerHTML = `
    <style>      
        
        .hide {
            display: none!important;
        }
        
        .label {
            margin-left: 130px;
        }
        
        .date-form-field {
            display: flex;
            flex-direction:  row;
        }
        
        .where-to-go, .when-to-go {
            margin: 0 5px;
            color: cadetblue;
        }
        
    </style>
    <link rel=stylesheet  href=https://cdn.materialdesignicons.com/4.9.95/css/materialdesignicons.min.css>
    
    <div class="date-form-field hide">
        <span class="mdi mdi-island"></span>
        <div class="label"> Hooray you are going to </div>
        <span class="where-to-go"></span>
        <span> at </span>
        <span class="when-to-go"></span>
    </div>
    `;

export class TravelToResultComponent extends HTMLElement {
    constructor() {
        super();


        this.attachShadow({ mode: "open" });

        this.shadowRoot.appendChild(TravelToResultTemplate.content.cloneNode(true));
        this.formField =  this.shadowRoot.querySelector('.date-form-field');
        this.whereToGo = this.shadowRoot.querySelector('.where-to-go');
        this.whenToGo = this.shadowRoot.querySelector('.when-to-go');

    }

    connectedCallback() {
        EventHandler.subscribeToEvent('form-changed', () => {
            this.generateResult();
        })
    }

    generateResult() {
        const selectedDestination =  destinationService.getSelectedDestination();
        const selectedDate =  dateService.getSelectedDate();

        if (selectedDestination && selectedDate) {
            this.formField.classList.remove('hide');
            this.whereToGo.innerHTML = selectedDestination;
            this.whenToGo.innerHTML = utils.formatDateInDDMMYYYY(selectedDate);
        } else {
            this.formField.classList.add('hide');
        }
    }

    disconnectedCallback() {}
}
