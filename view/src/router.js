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
const LeaderAggregation = defineAsyncComponent(() => import("./pages/leader/LeaderAggregation.vue"));
const LeaderTransaction = defineAsyncComponent(() => import("./pages/leader/LeaderTransaction.vue"));
const LeaderCreateAccount = defineAsyncComponent(() => import("./pages/leader/CreateAccount.vue"));
const LeaderListAccount = defineAsyncComponent(() => import("./pages/leader/ListAccount.vue"));
const LeaderStatisticAggregation = defineAsyncComponent(() => import("./pages/leader/StatisticAggregation.vue"));
const LeaderStatisticTransaction = defineAsyncComponent(() => import("./pages/leader/StatisticTransaction.vue"));

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
                    component: LeaderCreateAccount
                }
            ]
        }
    ],
    scrollBehavior() {
        return { top: 0, behavior: "smooth" };
    },
});

export default router;
