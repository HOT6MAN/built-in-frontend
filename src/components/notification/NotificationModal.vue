<script setup>
import {ref, onMounted, defineProps, watch} from 'vue';
import {findAllUnreadNotificationByUserId, findAllNotificationByUserId} from '@/api/notification.js';
import { useAuthStore } from '../../stores/authStore';
import { storeToRefs } from 'pinia';
const props = defineProps({
    showNotificationModal : Boolean,
    toggleNotificationModal : Function
})
const authStore = useAuthStore();
const {userId} = storeToRefs(authStore);
const notificationList = ref([]);

watch(() => props.showNotificationModal, async (newVal) => {
  if (newVal) {
    await findAllNotificationByUserId(userId.value, (response)=>{
        console.log("noti response = ",response);
        notificationList.value = response.data.data;
    }, (error)=>{
        console.log(error);
    })
  }
});
</script>

<template>
    <div v-if="showNotificationModal" class="notificationModal">
      <div class="notificationHeader">
        <h3>알림</h3>
        <button @click="toggleNotificationModal" class="closeButton">
          <span>&times;</span>
        </button>
      </div>
      <div class="notificationListContainer">
        <ul class="notificationList">
          <li v-for="(notification, index) in notificationList" :key="index" class="notificationItem">
            <div class="notificationContent">
              <p class="notificationText">
                <strong>{{ notification.senderName }}</strong> 님이 {{ notification.type }} 알림을 보냈습니다.
              </p>
              <small class="notificationDate">{{ formatDate(notification.notifyDate) }}</small>
            </div>
            <div class="notificationStatus"></div>
          </li>
        </ul>
      </div>
    </div>
  </template>

<style scoped>
.notificationModal {
  position: absolute;
  top: 60px;
  right: 20px;
  width: 600px;
  height: 350px;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  border-radius: 8px;
  overflow: hidden;
  z-index: 1000;
}

.notificationHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #dddfe2;
}

.notificationHeader h3 {
  font-size: 20px;
  font-weight: bold;
  color: #1c1e21;
  margin: 0;
}

.closeButton {
  background: none;
  border: none;
  font-size: 24px;
  color: #606770;
  cursor: pointer;
}

.notificationListContainer {
  height: calc(100% - 56px);
  overflow-y: auto;
}

.notificationList {
  list-style: none;
  padding: 0;
  margin: 0;
}

.notificationItem {
  display: flex;
  align-items: flex-start;
  padding: 12px 16px;
  border-bottom: 1px solid #e5e5e5;
  transition: background-color 0.3s;
}

.notificationItem:hover {
  background-color: #f2f3f5;
}

.notificationAvatar {
  width: 56px;
  height: 56px;
  margin-right: 12px;
  border-radius: 50%;
  overflow: hidden;
}

.notificationAvatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.notificationContent {
  flex: 1;
}

.notificationText {
  margin: 0 0 4px;
  font-size: 14px;
  color: #1c1e21;
  line-height: 1.34;
}

.notificationDate {
  font-size: 12px;
  color: #606770;
}

.notificationStatus {
  width: 12px;
  height: 12px;
  background-color: #1877f2;
  border-radius: 50%;
  margin-left: 8px;
}

/* 스크롤바 스타일링 (WebKit 브라우저용) */
.notificationListContainer::-webkit-scrollbar {
  width: 8px;
}

.notificationListContainer::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.notificationListContainer::-webkit-scrollbar-thumb {
  background: #bcc0c4;
  border-radius: 4px;
}

.notificationListContainer::-webkit-scrollbar-thumb:hover {
  background: #888;
}
</style>