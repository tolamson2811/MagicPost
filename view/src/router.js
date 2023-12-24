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
// Route của điểm tập kết
const LeaderAggregation = defineAsyncComponent(() =>
    import("./pages/aggregation/leader/LeaderAggregation.vue")
);
const LeaderCreateAccount = defineAsyncComponent(() =>
    import("./pages/aggregation/leader/CreateAccount.vue")
);
const LeaderListAccount = defineAsyncComponent(() =>
    import("./pages/aggregation/leader/ListAccount.vue")
);
const LeaderStatisticAggregation = defineAsyncComponent(() =>
    import("./pages/aggregation/leader/StatisticAggregation.vue")
);
// Route của điểm giao dịch
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
            path: "/aggregation/leader/:leader_id",
            component: LeaderAggregation,
            redirect: (to) => {
                const { params } = to;
                return `/aggregation/leader/${params.leader_id}/account/list`;
            },
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
                    path: "statistic",
                    component: LeaderStatisticAggregation,
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
