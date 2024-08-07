<template>
    <div class="container">
        <div class="sidebar">
        <SideBarView></SideBarView>
        </div>
        <div class="content">
        <RouterView />
        </div>
    </div>
    </template>
    
    <script setup>
    import SideBarView from '@/views/Bars/SideBarView.vue';
    </script>
    
    <style scoped>
    .container {
    display: grid;
    grid-template-columns: 250px 1fr;
    height: 100vh;
    margin: 0;
    padding: 0;
    }
    
    .sidebar {
    background-color: #f4f4f4;
    }
    
    .content {
    padding: 20px;
    }
    </style>
    