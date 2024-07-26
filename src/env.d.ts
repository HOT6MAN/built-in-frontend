/// <reference types="vite/client" />

declare module 'bootstrap-vue-3' {
    import { Plugin } from 'vue';
    const BootstrapVue3: Plugin;
    export default BootstrapVue3;
  }
  
  declare module '@/stores/auth.js';
  declare module '@/util/axios-refresh.js';
  declare module '@/components/login/LoginModal.vue';
  declare module '@/views/board/TeamBuildingView.vue';
  declare module '@/views/board/TeamBuildingRecruitView.vue';
  declare module '@/views/login/AfterLoginView.vue';