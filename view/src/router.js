import { createRouter, createWebHistory } from "vue-router";
import { defineAsyncComponent } from "vue";
import store from "./store/index.js";

const NotFound = defineAsyncComponent(() => import("./pages/NotFound.vue"));

const HomePage = defineAsyncComponent(() => import("./pages/HomePage.vue"));
const AuthPage = defineAsyncComponent(
    () => import("./pages/auth/AuthPage.vue"),
);
const ManagerPage = defineAsyncComponent(
    () => import("./pages/manager/ManagerPage.vue"),
);
const ManageAggregation = defineAsyncComponent(
    () => import("./pages/manager/ManageAggregation.vue"),
);
const ManageTransaction = defineAsyncComponent(
    () => import("./pages/manager/ManageTransaction.vue"),
);
const CreateAccount = defineAsyncComponent(
    () => import("./pages/manager/CreateAccount.vue"),
);
const ListAccount = defineAsyncComponent(
    () => import("./pages/manager/ListAccount.vue"),
);
const StatisticAggregation = defineAsyncComponent(
    () => import("./pages/manager/StatisticAggregation.vue"),
);
const StatisticTransaction = defineAsyncComponent(
    () => import("./pages/manager/StatisticTransaction.vue"),
);
const PackageDetail = defineAsyncComponent(
    () => import("./pages/PackageDetail.vue"),
);

// Route của điểm tập kết
const LeaderAggregation = defineAsyncComponent(
    () => import("./pages/aggregation/leader/LeaderAggregation.vue"),
);
const LeaderCreateAccount = defineAsyncComponent(
    () => import("./pages/aggregation/leader/CreateAccount.vue"),
);
const LeaderListAccount = defineAsyncComponent(
    () => import("./pages/aggregation/leader/ListAccount.vue"),
);
const AggregationEmployeePage = defineAsyncComponent(
    () => import("./pages/aggregation/employee/EmployeeAggregation.vue"),
);
const AggregationListPackages = defineAsyncComponent(
    () => import("./pages/aggregation/employee/warehouse/ListPackage.vue"),
);
const AggregationReceivedPackage = defineAsyncComponent(
    () => import("./pages/aggregation/employee/warehouse/ReceivedPackage.vue"),
);
const AggregationStatisticReceived = defineAsyncComponent(
    () => import("./pages/aggregation/leader/StatisticReceived.vue"),
);
const AggregationStatisticSent = defineAsyncComponent(
    () => import("./pages/aggregation/leader/StatisticSent.vue"),
);

// Route của điểm giao dịch
const LeaderTransaction = defineAsyncComponent(
    () => import("./pages/transaction/leader/LeaderTransaction.vue"),
);
const CreateTransactionAccount = defineAsyncComponent(
    () => import("./pages/transaction/leader/CreateAccount.vue"),
);
const ListTransactionAccount = defineAsyncComponent(
    () => import("./pages/transaction/leader/ListAccount.vue"),
);
const StatisticTransactionSent = defineAsyncComponent(
    () => import("./pages/transaction/leader/StatisticSent.vue"),
);
const StatisticTransactionReceived = defineAsyncComponent(
    () => import("./pages/transaction/leader/StatisticReceived.vue"),
);
const EmployeeTransaction = defineAsyncComponent(
    () => import("./pages/transaction/employee/EmployeeTransaction.vue"),
);
const TransportPackageStatus = defineAsyncComponent(
    () => import("./pages/transaction/employee/transport/PackageStatus.vue"),
);
const ListPackageWarehouse = defineAsyncComponent(
    () => import("./pages/transaction/employee/warehouse/ListPackage.vue"),
);
const ReceivedPackageFromAggregation = defineAsyncComponent(
    () =>
        import(
            "./pages/transaction/employee/warehouse/ReceivedAggregation.vue"
        ),
);

const SuccessDelivery = defineAsyncComponent(
    () => import("./pages/transaction/employee/statistic/SuccessDelivery.vue"),
);
const FailedDelivery = defineAsyncComponent(
    () => import("./pages/transaction/employee/statistic/FailedDelivery.vue"),
);
const CreateOrder = defineAsyncComponent(
    () => import("./pages/transaction/employee/warehouse/CreateOrder.vue"),
);
const DeliveryReceipt = defineAsyncComponent(
    () => import("./pages/transaction/employee/warehouse/DeliveryReceipt.vue"),
);

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/receipt/:package_id",
            component: DeliveryReceipt,
            props: true,
        },
        {
            path: "/",
            redirect: "/homepage",
        },
        {
            path: "/homepage",
            component: HomePage,
        },
        {
            path: "/auth",
            component: AuthPage,
        },
        {
            path: "/manager",
            redirect: "/manager/system/transaction",
            component: ManagerPage,
            meta: { requiereManager: true },
            children: [
                {
                    path: "system/aggregation",
                    component: ManageAggregation,
                },
                {
                    path: "system/transaction",
                    component: ManageTransaction,
                },
                {
                    path: "account/create",
                    component: CreateAccount,
                },
                {
                    path: "account/list",
                    component: ListAccount,
                },
                {
                    path: "statistic/aggregation",
                    component: StatisticAggregation,
                },
                {
                    path: "statistic/transaction",
                    component: StatisticTransaction,
                },
            ],
        },
        {
            path: "/package/detail/:package_id",
            component: PackageDetail,
            props: true,
        },
        {
            path: "/aggregation/employee/:employee_id",
            component: AggregationEmployeePage,
            props: true,
            redirect: (to) => {
                const { params } = to;
                return `/aggregation/employee/${params.employee_id}/warehouse/list`;
            },
            meta: { requiereAggregationEmployee: true },
            children: [
                {
                    path: "warehouse/list",
                    component: AggregationListPackages,
                    props: true,
                },
                {
                    path: "warehouse/received",
                    component: AggregationReceivedPackage,
                    props: true,
                },
            ],
        },
        {
            path: "/aggregation/leader/:leader_id",
            component: LeaderAggregation,
            redirect: (to) => {
                const { params } = to;
                return `/aggregation/leader/${params.leader_id}/account/list`;
            },
            meta: { requiereAggregationLead: true },
            props: true,
            children: [
                {
                    path: "account/create",
                    component: LeaderCreateAccount,
                    props: true,
                },
                {
                    path: "account/list",
                    component: LeaderListAccount,
                    props: true,
                },
                {
                    path: "statistic/received",
                    component: AggregationStatisticReceived,
                    props: true,
                },
                {
                    path: "statistic/sent",
                    component: AggregationStatisticSent,
                    props: true,
                },
            ],
        },
        {
            path: "/transaction/leader/:leader_id",
            component: LeaderTransaction,
            redirect: (to) => {
                const { params } = to;
                return `/transaction/leader/${params.leader_id}/account/list`;
            },
            meta: { requiereTransactionLead: true },
            props: true,
            children: [
                {
                    path: "account/create",
                    component: CreateTransactionAccount,
                    props: true,
                },
                {
                    path: "account/list",
                    component: ListTransactionAccount,
                    props: true,
                },
                {
                    path: "statistic/sent",
                    component: StatisticTransactionSent,
                    props: true,
                },
                {
                    path: "statistic/received",
                    component: StatisticTransactionReceived,
                    props: true,
                },
            ],
        },
        {
            path: "/transaction/employee/:employee_id",
            component: EmployeeTransaction,
            redirect: (to) => {
                const { params } = to;
                return `/transaction/employee/${params.employee_id}/warehouse/list`;
            },
            meta: { requiereTransactionEmployee: true },
            props: true,
            children: [
                {
                    path: "transport/status",
                    component: TransportPackageStatus,
                    props: true,
                },
                {
                    path: "warehouse/list",
                    component: ListPackageWarehouse,
                    props: true,
                },
                {
                    path: "warehouse/received",
                    component: ReceivedPackageFromAggregation,
                    props: true,
                },
                {
                    path: "warehouse/create",
                    component: CreateOrder,
                    props: true,
                },
                {
                    path: "statistic/success",
                    component: SuccessDelivery,
                    props: true,
                },
                {
                    path: "statistic/failed",
                    component: FailedDelivery,
                    props: true,
                },
            ],
        },
        {
            path: "/:notFound(.*)",
            component: NotFound,
        }
    ],
    scrollBehavior() {
        return { top: 0, behavior: "smooth" };
    },
});

router.beforeEach(function (to, _, next) {
    if (to.meta.requiereManager && !store.getters.isManager) {
        next("/notfound");
    } else if (
        to.meta.requiereTransactionEmployee &&
        !store.getters.isTransactionEmployee
    ) {
        next("/notfound");
    } else if (
        to.meta.requiereAggregationEmployee &&
        !store.getters.isAggregationEmployee
    ) {
        next("/notfound");
    } else if (
        to.meta.requiereTransactionLead &&
        !store.getters.isTransactionLead
    ) {
        next("/notfound");
    } else if (
        to.meta.requiereAggregationLead &&
        !store.getters.isAggregationLead
    ) {
        next("/notfound");
    } else {
        next();
    }
});

export default router;
