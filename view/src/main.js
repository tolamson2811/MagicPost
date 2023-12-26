import { createApp } from "vue";
import "./index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//import dependencies
import Notifications from "@kyvg/vue3-notification";

//import components
import BaseDialog from "./components/ui/BaseDialog.vue";
import BaseSpinner from "./components/ui/BaseSpinner.vue";
import BaseList from "./components/ui/BaseList.vue";
import UpdateStatus from './components/packages/UpdateStatus.vue'
/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { faUserSecret, faArrowRight, faChevronDown, faCircleInfo, faArrowRightFromBracket, faMagnifyingGlass, faHandHoldingDollar, faMapLocationDot, faTruckFast, faUsers, faBoxOpen, faBars, faChevronUp, faCertificate, faFilter, faUserPlus, faRectangleList, faWarehouse, faTentArrowLeftRight, faTrash, faAnglesLeft, faAnglesRight, faArrowsUpDown, faArrowUp, faArrowDown, faChevronLeft, faChevronRight, faPaperPlane, faSatelliteDish, faCubes, faMotorcycle, faCartPlus, faRotateLeft, faPenToSquare, faArrowLeft, faXmark } from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(faUserSecret, faArrowRight, faChevronDown, faCircleInfo, faArrowRightFromBracket, faMagnifyingGlass, faHandHoldingDollar, faMapLocationDot, faTruckFast, faUsers, faBoxOpen, faBars, faChevronUp, faCertificate, faFilter, faUserPlus, faRectangleList, faWarehouse, faTentArrowLeftRight, faTrash, faAnglesLeft, faAnglesRight, faArrowsUpDown, faArrowUp, faArrowDown, faChevronLeft, faChevronRight, faPaperPlane, faSatelliteDish, faCubes, faMotorcycle, faCartPlus, faRotateLeft, faPenToSquare, faArrowRight, faArrowLeft, faXmark );

const app = createApp(App);
app.use(router);
app.use(store);

//use component
app.component("BaseDialog", BaseDialog);
app.component("BaseSpinner", BaseSpinner);
app.component("BaseList", BaseList);
app.component("UpdateStatus", UpdateStatus);


//use fontawesome
app.component("font-awesome-icon", FontAwesomeIcon);

//use dependencies
app.use(Notifications);

app.mount("#app");
