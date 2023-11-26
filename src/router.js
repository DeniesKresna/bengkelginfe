import { createRouter, createWebHistory } from "vue-router";
import { useLayoutStore } from "./pages/layout/store.js";
import PageNotFound from "./pages/utility/PageNotFound.vue";
import Signin from "./pages/auth/Signin/Index.vue";
import LayoutDashboard from "./pages/layout/Dashboard.vue";
import CarTable from "./pages/dashboard/car/Index.vue";
import CustomerTable from "./pages/dashboard/customer/Index.vue";
import UserTable from "./pages/dashboard/user/Index.vue";
import ExecutionTable from "./pages/dashboard/execution/Index.vue";
import ExecutionCreate from "./pages/dashboard/execution/Add.vue";
import ExecutionEdit from "./pages/dashboard/execution/Edit.vue";

const routerHistory = createWebHistory();

const router = createRouter({
  history: routerHistory,
  linkActiveClass: 'active-link',
  linkExactActiveClass: 'exact-active-link',
  routes: [
    {
      path: "/",
      component: Signin,
    },
    {
      path: "/signin",
      name: "Signin",
      component: Signin,
    },
    {
      path: "/dashboard",
      component: LayoutDashboard,
      meta: { hideLogo: true, loginStatus: true },
      redirect: '/',
      children: [
        {
          path: "car",
          name: "CarTable",
          component: CarTable,
        },
        {
          path: "customer",
          name: "CustomerTable",
          component: CustomerTable,
        },
        {
          path: "user",
          name: "UserTable",
          component: UserTable,
        },
        {
          path: "execution",
          name: "ExecutionTable",
          component: ExecutionTable,
        },
        {
          path: "execution/create",
          name: "ExecutionCreate",
          component: ExecutionCreate,
        },
        {
          path: "execution/edit/:id",
          name: "ExecutionEdit",
          component: ExecutionEdit,
        },
        {
          path: "/:pathMatch(.*)*",
          name: "NotFound",
          component: PageNotFound,
        }
      ]
    }
  ],
});


// router.beforeEach((to, from, next) => {
//   const isAuthenticated = localStorage.getItem("token")


//   if (to.name !== "Signin" && !isAuthenticated) {
//     next({ path: '/signin' })
//   } else if (to.name === "Signin" && isAuthenticated) {
//     next({ path: '/' })
//   } else if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
//     next({ path: '/signin' })
//   } else {
//     next()
//   }
// });

router.beforeEach((to, from) => {
  // if(to.meta.loginStatus){
  //   const token = localStorage.getItem('token')
  //   if( token== null || token == ""){
  //     return '/'
  //   }
  // }
})

router.afterEach((to, from) => {
  const layoutStore = useLayoutStore();
  layoutStore.resetApiRequestAmount();

  // Scroll to the top of the page
  const layoutContentDiv = document.getElementById("layoutContent")
  if(layoutContentDiv){
    layoutContentDiv.scrollTop = 0
  }
});

export default router;
