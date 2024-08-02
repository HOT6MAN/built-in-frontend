import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import TeamBuildingView from '@/views/board/TeamBuildingView.vue'
import teambuildingRecruitCreateView from '@/views/board/TeamBuildingRecruitCreateView.vue'
import teambuildingRecruitDetailView from '@/views/board/TeambuildingRecruitDetailView.vue'
import AfterLoginView from '@/views/login/AfterLoginView.vue'
import RegisterView from '@/views/login/RegisterView.vue'
import ProjectDashboardView from '@/views/projectManagement/ProjectDashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path : '/',
      name : 'home',
      component : HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/Bars/SideBarView.vue')
    },
    {
      path: '/teambuilding',
      name: 'teambuilding',
      component : TeamBuildingView,
    },
    {
      path: '/teambuilding/recruit/create',
      name: 'teambuildingRecruitCreate',
      component : teambuildingRecruitCreateView
    },
    {
      path: '/teambuilding/recruit/update/:id',
      name: 'teambuildingRecruitUpdate',
      component : teambuildingRecruitCreateView
    },
    {
      path: '/teambuilding/recruit/:id',
      name: 'teambuildingRecruitDetail',
      component : teambuildingRecruitDetailView
    },
    {
      path: '/afterlogin',
      name: 'afterlogin',
      component : AfterLoginView
    },
    {
      path : '/member',
      name : 'member',
      component : ()=>import('@/views/member/MemberView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component : RegisterView
    },
    {
      path : '/teams',
      name : 'myteam',
      component : ()=>import('@/views/team/MyTeamView.vue')
    },
    {
      path : '/teams/register',
      name : 'myTeamRegister',
      component : ()=>import('@/views/team/MyTeamRegisterView.vue')
    },
    {
      path : '/project',
      children : [
        {
        path: 'dashboard',
        name: 'dashboard',
        component : ProjectDashboardView
        },
      ]
      
    }

  ]
})
export default router
