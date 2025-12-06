import { createRouter, createWebHistory } from 'vue-router'
import HomePage from "@/components/workPlace/homePage/HomePage.vue";
import EditUser from "@/components/workPlace/editUser/EditUser.vue";
import CreateCompany from "@/components/workPlace/createCompany/СreateCompany.vue";
import JoinCompany from "@/components/workPlace/joinCompany/JoinCompany.vue";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  mode: "history",
  routes: [
    {
      path: "/",
      name: 'home',
      component: HomePage,
    },
    {
      path: "/editUser",
      name: 'editUser',
      component: EditUser,
    },
    {
      path: "/createCompany",
      name: 'createCompany',
      component: CreateCompany,
    },
    {
      path: "/step_1",
      name: 'step_1',
      component: CreateCompany,
    },
    {
      path: "/step_2",
      name: 'step_2',
      component: CreateCompany,
    },
    {
      path: "/step_3",
      name: 'step_3',
      component: CreateCompany,
    },
    {
      path: "/step_4",
      name: 'step_4',
      component: CreateCompany,
    },
    {
      path: "/joinCompany",
      name: 'joinCompany',
      component: JoinCompany,
    },
    {
      path: "/join_step_1",
      name: 'join_step_1',
      component: JoinCompany,
    },
    {
      path: "/join_step_2",
      name: 'join_step_2',
      component: JoinCompany,
    },
    {
      path: "/myCompany",
      name: 'myCompany',
      component: HomePage,
    },
    {
      path: "/myRecord",
      name: 'myRecord',
      component: HomePage,
    },
    {
      path: "/companyRecord",
      name: 'companyRecord',
      component: HomePage,
    },
    {
      path: "/addEmployee",
      name: 'addEmployee',
      component: HomePage,
    },
    {
      path: "/editEmployee",
      name: 'editEmployee',
      component: HomePage,
    },
    {
      path: "/settingsCompany",
      name: 'settingsCompany',
      component: HomePage,
    },
    {
      path: "/settingsService",
      name: 'settingsService',
      component: HomePage,
    },
    {
      path: "/settingsSchedule",
      name: 'settingsSchedule',
      component: HomePage,
    },
    {
      path: "/statisticCompany",
      name: 'statisticCompany',
      component: HomePage,
    },
    {
      path: "/statisticEmployee",
      name: 'statisticEmployee',
      component: HomePage,
    }
  ],
})

export default router
