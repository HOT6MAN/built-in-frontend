import {ref} from 'vue';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';

import { findAllUnreadNotificationByUserId } from '@/api/notification.js';

export const useNotificationStore = defineStore(
    'notification',
    ()=>{
        const unreadNotificationSize = ref(0);

        const storeFindAllUnreadNotificationByUserId = async (userId)=>{
            await findAllUnreadNotificationByUserId(userId, (response)=>{
                console.log("update noti size");
                unreadNotificationSize.value = response.data.data;
            },(error)=>{
                console.log("error = ",error);
            })
        };
        return{
            storeFindAllUnreadNotificationByUserId,
            unreadNotificationSize,
        };
    }
)