<script setup>
import {ref, onMounted, defineProps, watch} from 'vue';
import { useAuthStore } from '../../stores/authStore';
import { storeToRefs } from 'pinia';
import {findAllUnreadNotificationByUserId, 
  findAllNotificationByUserId,
  readNotificationByNotificationId,
  deleteNotificationByNotificationId,
} from '@/api/notification.js';
const props = defineProps({
    showNotificationModal : Boolean,
    toggleNotificationModal : Function
})
const authStore = useAuthStore();
const {userId} = storeToRefs(authStore);
const notificationList = ref([]);

const confirmNotification = async (index) => {
  const notification = notificationList.value[index];
  console.log(`Notification ${notification.id} confirmed.`);
  await readNotificationByNotificationId(notification.id, (reponse)=>{

  },(error)=>{
    console.log(error);
  })
  notification.isRead = true; 
};

// 알림 삭제 버튼 클릭 핸들러
const deleteNotification = async (index) => {
  const notification = notificationList.value[index];
  console.log(`Notification ${notification.id} deleted.`);
  await deleteNotificationByNotificationId(notification.id, (response)=>{

  },(error)=>{
    console.log(error);
  })
  notificationList.value.splice(index, 1); 
};


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
      <ul v-if="notificationList.length > 0" class="notificationList">
        <li
          v-for="(notification, index) in notificationList"
          :key="index"
          :class="['notificationItem', { read: notification.read }]"
        >
          <div class="notificationContent">
            <p class="notificationText">
              <strong>{{ notification.senderName }}</strong> {{ notification.content }}
            </p>
            <small class="notificationDate">{{ notification.notifyDate }}</small>
          </div>
          <div class="notificationActions">
            <button v-if="!notification.read" @click="confirmNotification(index)" class="confirmButton">확인</button>
            <button @click="deleteNotification(index)" class="deleteButton">삭제</button>
          </div>
          <div class="notificationStatus"></div>
        </li>
      </ul>
      <div v-else class="emptyNotification">
        현재 받은 알람 보관함이 비어있습니다.
      </div>
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
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.notificationList {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
}

.notificationItem {
  display: flex;
  align-items: flex-start;
  padding: 12px 16px;
  border-bottom: 1px solid #e5e5e5;
  transition: background-color 0.3s;
}

.notificationItem.read {
  background-color: #e9ecef; /* 읽음 처리된 알림의 배경색 */
}

.notificationItem:hover {
  background-color: #f2f3f5;
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

.notificationActions {
  display: flex;
  gap: 8px;
}

.confirmButton {
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
}

.confirmButton:hover {
  background-color: #218838;
}

.deleteButton {
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
}

.deleteButton:hover {
  background-color: #c82333;
}

.emptyNotification {
  font-size: 16px;
  color: #606770;
  padding: 20px;
  text-align: center;
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

