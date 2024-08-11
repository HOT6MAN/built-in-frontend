import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useChatStore = defineStore('chat', () => {
    const chatOpen = ref(false);

    const changeChatOpenStatus = () => {
        chatOpen.value = !chatOpen.value;
    };

    return {
        chatOpen,
        changeChatOpenStatus
    };
});