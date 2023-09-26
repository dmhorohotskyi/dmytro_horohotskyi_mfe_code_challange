import { AppComponent } from "./components/appComponent.js";
import { SearchAutocompleteComponent } from "./components/searchAutocompleteComponent.js";
import {SearchAutocompleteItemComponent} from "./components/searchAutocompleteItemComponent";
import {DateSearchComponent} from "./components/dateSearchComponent";
import {TravelToResultComponent} from "./components/travelToResultComponent";

export const app = {
    defineElements() {
        window.customElements.define("app-root", AppComponent);
        window.customElements.define("destination-search", SearchAutocompleteComponent);
        window.customElements.define("destination-search-item", SearchAutocompleteItemComponent);
        window.customElements.define("date-search", DateSearchComponent);
        window.customElements.define("travel-to-result", TravelToResultComponent);
    }
}
