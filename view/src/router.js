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
const LeaderPage = defineAsyncComponent(() =>
    import("./pages/leader/LeaderPage.vue")
);
const LeaderAggregation = defineAsyncComponent(() =>
    import("./pages/leader/LeaderAggregation.vue")
);
const LeaderCreateAccount = defineAsyncComponent(() =>
    import("./pages/leader/CreateAccount.vue")
);
const LeaderListAccount = defineAsyncComponent(() =>
    import("./pages/leader/ListAccount.vue")
);
const LeaderStatisticAggregation = defineAsyncComponent(() =>
    import("./pages/leader/StatisticAggregation.vue")
);
const LeaderStatisticTransaction = defineAsyncComponent(() =>
    import("./pages/leader/StatisticTransaction.vue")
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
    import("./pages/transaction/employee/transport/CreateTransport.vue")
);
const TransportPackageStatus = defineAsyncComponent(() =>
    import("./pages/transaction/employee/transport/PackageStatus.vue")
);
const ListPackageWarehouse = defineAsyncComponent(() =>
    import("./pages/transaction/employee/warehouse/ListPackage.vue")
);
const ReceivedPackageFromAggregation = defineAsyncComponent(() =>
    import("./pages/transaction/employee/warehouse/ReceivedAggregation.vue")
);
const SendPackageToAggregation = defineAsyncComponent(() =>
    import("./pages/transaction/employee/warehouse/SendAggregation.vue")
);
const SuccessDelivery = defineAsyncComponent(() =>
    import("./pages/transaction/employee/statistic/SuccessDelivery.vue")
);
const FailedDelivery = defineAsyncComponent(() =>
    import("./pages/transaction/employee/statistic/FailedDelivery.vue")
);
const CreateOrder = defineAsyncComponent(() =>
    import("./pages/transaction/employee/warehouse/CreateOrder.vue")
);

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
        // {
        //     path: "/leader",
        //     redirect: "/leader/system/aggregation",
        //     component: LeaderPage,
        //     children: [
        //         {
        //             path: "system/transaction",
        //             component: LeaderTransaction,
        //         },
        //         {
        //             path: "account/create",
        //             component: LeaderCreateAccount,
        //         },
        //         {
        //             path: "account/list",
        //             component: LeaderListAccount,
        //         },
        //         {
        //             path: "statistic/aggregation",
        //             component: LeaderStatisticAggregation,
        //         },
        //         {
        //             path: "statistic/transaction",
        //             component: LeaderStatisticTransaction,
        //         },
        //     ],
        // },
        {
            path: "/leader/aggregation",
            component: LeaderAggregation,
            children: [
                {
                    path: "/createaccount",
                    component: LeaderCreateAccount,
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
            redirect: (to) => {
                const { params } = to;
                return `/transaction/employee/${params.employee_id}/transport/create`;
            },
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
                {
                    path: "warehouse/list",
                    component: ListPackageWarehouse,
                },
                {
                    path: "warehouse/received",
                    component: ReceivedPackageFromAggregation,
                },
                {
                    path: "warehouse/send",
                    component: SendPackageToAggregation,
                },
                {
                    path: "warehouse/create",
                    component: CreateOrder,
                },
                {
                    path: "statistic/success",
                    component: SuccessDelivery,
                },
                {
                    path: "statistic/failed",
                    component: FailedDelivery,
                },
            ],
        },
    ],
    scrollBehavior() {
        return { top: 0, behavior: "smooth" };
    },
});

export default router;
