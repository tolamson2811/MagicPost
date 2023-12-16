import { createRouter, createWebHistory } from "vue-router";
import { defineAsyncComponent } from "vue";

const PackageHistory = defineAsyncComponent(() =>
    import("./pages/customer/PackageHistory.vue")
);
const HomePage = defineAsyncComponent(() => import("./pages/HomePage.vue"));
const AuthPage = defineAsyncComponent(() =>
    import("./pages/auth/AuthPage.vue")
);
const ManagerPage = defineAsyncComponent(() =>
    import("./pages/manager/ManagerPage.vue")
);
const ManageAggregation = defineAsyncComponent(() =>
    import("./pages/manager/ManageAggregation.vue")
);
const ManageTransaction = defineAsyncComponent(() =>
    import("./pages/manager/ManageTransaction.vue")
);
const CreateAccount = defineAsyncComponent(() =>
    import("./pages/manager/CreateAccount.vue")
);
const ListAccount = defineAsyncComponent(() =>
    import("./pages/manager/ListAccount.vue")
);
const StatisticAggregation = defineAsyncComponent(() =>
    import("./pages/manager/StatisticAggregation.vue")
);
const StatisticTransaction = defineAsyncComponent(() =>
    import("./pages/manager/StatisticTransaction.vue")
);
const PackageDetail = defineAsyncComponent(() =>
    import("./pages/customer/PackageDetail.vue")
);
const PackageList = defineAsyncComponent(() =>
    import("./pages/customer/PackageList.vue")
);
const LeaderTransaction = defineAsyncComponent(() =>
    import("./pages/transaction/leader/LeaderTransaction.vue")
);
const CreateTransactionAccount = defineAsyncComponent(() =>
    import("./pages/transaction/leader/CreateAccount.vue")
);
const ListTransactionAccount = defineAsyncComponent(() =>
    import("./pages/transaction/leader/ListAccount.vue")
);
const StatisticTransactionSent = defineAsyncComponent(() =>
    import("./pages/transaction/leader/StatisticSent.vue")
);
const StatisticTransactionReceived = defineAsyncComponent(() =>
    import("./pages/transaction/leader/StatisticReceived.vue")
);
const EmployeeTransaction = defineAsyncComponent(() =>
    import("./pages/transaction/employee/EmployeeTransaction.vue")
);
const CreateTransportPackage = defineAsyncComponent(() =>
    import("./pages/transaction/employee/transport/CreatePackage.vue")
);
const TransportPackageStatus = defineAsyncComponent(() => import("./pages/transaction/employee/transport/PackageStatus.vue"));

const router = createRouter({
    history: createWebHistory(),
    routes: [
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
            path: "/customer/:customer_id",
            redirect: (to) => {
                const { params } = to;
                return `/customer/${params.customer_id}/history`;
            },
            props: true,
            component: PackageHistory,
            children: [
                {
                    path: "history",
                    component: PackageList,
                    props: true,
                },
                {
                    path: "history/:package_id",
                    component: PackageDetail,
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
            props: true,
            children: [
                {
                    path: "account/create",
                    component: CreateTransactionAccount,
                },
                {
                    path: "account/list",
                    component: ListTransactionAccount,
                },
                {
                    path: "statistic/sent",
                    component: StatisticTransactionSent,
                },
                {
                    path: "statistic/received",
                    component: StatisticTransactionReceived,
                },
            ],
        },
        {
            path: "/transaction/employee/:employee_id",
            component: EmployeeTransaction,
            props: true,
            children: [
                {
                    path: "transport/create",
                    component: CreateTransportPackage,
                },
                {
                    path: "transport/status",
                    component: TransportPackageStatus,
                },
            ],
        },
    ],
    scrollBehavior() {
        return { top: 0, behavior: "smooth" };
    },
});

export default router;
