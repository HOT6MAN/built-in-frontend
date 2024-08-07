import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ResumesView from '@/views/resume/ResumesView.vue'
import ResumeCreateView from '@/views/resume/ResumeCreateView.vue'
import TeamBuildingView from '@/views/board/TeamBuildingView.vue'
import teambuildingRecruitCreateView from '@/views/board/TeamBuildingRecruitCreateView.vue'
import teambuildingRecruitDetailView from '@/views/board/TeambuildingRecruitDetailView.vue'
import AfterLoginView from '@/views/login/AfterLoginView.vue'
import RegisterView from '@/views/login/RegisterView.vue'
import ProjectDashboardView from '@/views/projectManagement/ProjectDashboardView.vue'
import ProjectBuildConfigView from '@/views/projectManagement/ProjectBuildConfigView.vue'
import ProjectBuildResultView from '@/views/projectManagement/ProjectBuildResultView.vue'
import ProjectBuildStartView from '@/views/projectManagement/ProjectBuildStartView.vue'
import ProjectBuildResultAndLogsView from '@/views/projectManagement/ProjectBuildResultAndLogsView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path : '/',
      name : 'home',
      component : HomeView,
      meta: { showNavbar: true },
      
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/Bars/SideBarView.vue'),
      meta: { showNavbar: true },
    },
    {
      path: '/resumes',
      name: 'resumes',
      component : ResumesView,
      meta: { showNavbar: true },
    },
    {
      path: '/resume/create',
      name: 'resumeCreate',
      component : ResumeCreateView,
      meta: { showNavbar: true },
    },
    {
      path: '/resume/update/:id',
      name: 'resumeUpdate',
      component : ResumeCreateView
    },
    {
      path: '/teambuilding',
      name: 'teambuilding',
      component : TeamBuildingView,
      meta: { showNavbar: true },
    },
    {
      path: '/teambuilding/recruit/create',
      name: 'teambuildingRecruitCreate',
      component : teambuildingRecruitCreateView,
      meta: { showNavbar: true },
    },
    {
      path: '/teambuilding/recruit/update/:id',
      name: 'teambuildingRecruitUpdate',
      component : teambuildingRecruitCreateView,
      meta: { showNavbar: true },
    },
    {
      path: '/teambuilding/recruit/:id',
      name: 'teambuildingRecruitDetail',
      component : teambuildingRecruitDetailView,
      meta: { showNavbar: true },
    },
    {
      path: '/afterlogin',
      name: 'afterlogin',
      component : AfterLoginView,
      meta: { showNavbar: true },
    },
    {
      path : '/member',
      name : 'member',
      component : ()=>import('@/views/member/MemberView.vue'),
      meta: { showNavbar: true },
    },
    {
      path: '/register',
      name: 'register',
      component : RegisterView,
      meta: { showNavbar: true },
    },
    {
      path : '/teams',
      name : 'myteam',
      component : ()=>import('@/views/team/MyTeamView.vue'),
      meta: { showNavbar: true },
    },
    {
      path : '/teams/register',
      name : 'myTeamRegister',
      component : ()=>import('@/views/team/MyTeamRegisterView.vue'),
      meta: { showNavbar: true },
    },
    {
      path : '/teams/:teamId',
      name : 'myTeamDetail',
      component : ()=>import('@/views/team/MyTeamDetailView.vue'),
      meta: { showNavbar: true },
    },
    {
      path : '/project',
      children : [
        {
        path: 'dashboard',
        name: 'dashboard',
        component : ProjectDashboardView
        },
        {
          path: 'config',
          name: 'projectbuildconfig',
          component: ProjectBuildConfigView
        },
        {
          path: 'result',
          name: 'projectbuildresult',
          component: ProjectBuildResultView
        },
        {
          path: 'build',
          name: 'projectBuildStart',
          component: ProjectBuildStartView
        },
        {
          path: 'log',
          name: 'projectBuildResultAndLogs',
          component: ProjectBuildResultAndLogsView
        }
      ],
      meta: { showNavbar: true },
      
    }

  ]
})
export default router
