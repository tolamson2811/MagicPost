import { createRouter, createWebHistory } from "vue-router";
import { defineAsyncComponent } from "vue";

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
    ],
    scrollBehavior() {
        return { top: 0, behavior: "smooth" };
    },
});

export default router;
