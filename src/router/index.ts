import { createRouter, createWebHistory } from 'vue-router'
import TeamBuildingView from '@/views/board/TeamBuildingView.vue'
import TeamBuildingRecruitView from '@/views/board/TeamBuildingRecruitView.vue'
import AfterLoginView from '@/views/AfterLoginView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
      component : TeamBuildingRecruitView
    },
    {
      path: '/afterlogin',
      name: 'afterlogin',
      component : AfterLoginView
    },
  ]
})
export default router
