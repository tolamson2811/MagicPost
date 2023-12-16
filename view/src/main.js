import { createApp } from "vue";
import "./index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//import components
import BaseDialog from "./components/ui/BaseDialog.vue";
import BaseSpinner from "./components/ui/BaseSpinner.vue";
import BaseList from "./components/ui/BaseList.vue";
/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { faUserSecret, faArrowRight, faChevronDown, faCircleInfo, faArrowRightFromBracket, faMagnifyingGlass, faHandHoldingDollar, faMapLocationDot, faTruckFast, faUsers, faBoxOpen, faBars, faChevronUp, faCertificate, faFilter, faUserPlus, faRectangleList, faWarehouse, faTentArrowLeftRight, faTrash, faAnglesLeft, faAnglesRight, faArrowsUpDown, faArrowUp, faArrowDown, faChevronLeft, faChevronRight, faPaperPlane, faSatelliteDish, faCubes, faMotorcycle, faCartPlus, faRotateLeft, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(faUserSecret, faArrowRight, faChevronDown, faCircleInfo, faArrowRightFromBracket, faMagnifyingGlass, faHandHoldingDollar, faMapLocationDot, faTruckFast, faUsers, faBoxOpen, faBars, faChevronUp, faCertificate, faFilter, faUserPlus, faRectangleList, faWarehouse, faTentArrowLeftRight, faTrash, faAnglesLeft, faAnglesRight, faArrowsUpDown, faArrowUp, faArrowDown, faChevronLeft, faChevronRight, faPaperPlane, faSatelliteDish, faCubes, faMotorcycle, faCartPlus, faRotateLeft, faPenToSquare );

const app = createApp(App);
app.use(router);
app.use(store);

//use component
app.component("BaseDialog", BaseDialog);
app.component("BaseSpinner", BaseSpinner);
app.component("BaseList", BaseList);


//use fontawesome
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
