<script setup>
import { ref, onMounted, nextTick  } from 'vue';
import { storeToRefs } from 'pinia';
import { useProjectStore } from '@/stores/projectStore.js';
import { findNPrevLogs, addDynamicListener } from '@/api/project.js';
import { useRoute } from 'vue-router';

const route = useRoute();
const store = useProjectStore();

const logs = ref([]);
const dataObject = ref({});
let stompClient = null;
onMounted(async () => {
  dataObject.value = JSON.parse(route.query.data);
  console.log("dataObject = ",dataObject.value);
  await findNPrevLogs(dataObject.value, (response) => {
    logs.value = response.data.data;
    nextTick(() => scrollToBottom());
  }, (error) => {
    console.log(error);
  });
  console.log("find N PrevLogs After logs.value = ",logs.value);
  await connect();
});

async function connect(){
    console.log("connect Call");
    console.log("Before Add Dynamic Listener Kafka Call");
    await addDynamicListener(dataObject.value, (response)=>{
    },(error)=>{
        console.log("error");
    })
    console.log("동적 리스너 생성 완료");
    const url = import.meta.env.VITE_VUE_API_URL;
    console.log("요청 연결 url = ", `${url}/ws/log`);
    const socket = new SockJS(`${url}/ws/log`, null, {
       transports: ['websocket'],
       timeout: 5000
    });
    stompClient = Stomp.over(socket);
    console.log("/sub/log/"+dataObject.value.projectInfoId+"/"+dataObject.value.configId);
    stompClient.connect({'destination':'/ws/log'}, async function (frame){
        stompClient.subscribe("/sub/log/"+dataObject.value.projectInfoId+"/"+dataObject.value.configId, function(message){
            const convertMessage = JSON.parse(message.body); 
            console.log("message = ",convertMessage);
            logs.value.push(convertMessage);
            nextTick(() => scrollToBottom());
        })
    })
}


function scrollToBottom() {
  const container = document.querySelector('.log-window-wrapper');
  if (container) {
    container.scrollTop = container.scrollHeight;
  }
}



function ansiToHtml(ansiString) {
  const ansiRegex = /\u001b\[([0-9;]*)m/g;
  const ansiCodes = {
    0: 'color:inherit;background-color:inherit;', // reset
    30: 'color:black;', 31: 'color:red;', 32: 'color:green;', 33: 'color:yellow;', 34: 'color:blue;', 35: 'color:magenta;', 36: 'color:cyan;', 37: 'color:white;',
    40: 'background-color:black;', 41: 'background-color:red;', 42: 'background-color:green;', 43: 'background-color:yellow;', 44: 'background-color:blue;', 45: 'background-color:magenta;', 46: 'background-color:cyan;', 47: 'background-color:white;',
    90: 'color:grey;', 91: 'color:red;', 92: 'color:green;', 93: 'color:yellow;', 94: 'color:blue;', 95: 'color:magenta;', 96: 'color:cyan;', 97: 'color:white;',
    100: 'background-color:grey;', 101: 'background-color:red;', 102: 'background-color:green;', 103: 'background-color:yellow;', 104: 'background-color:blue;', 105: 'background-color:magenta;', 106: 'background-color:cyan;', 107: 'background-color:white;'
  };

  return ansiString.replace(ansiRegex, (match, p1) => {
    const styles = p1.split(';').map(code => ansiCodes[code] || '').join('');
    return `<span style="${styles}">`;
  }).replace(/\u001b\[0m/g, '</span>'); // closing the span
}
</script>

<template>
  <div class="log-window-wrapper">
    <div class="log-window">
      <h1>Log Window</h1>
      <br>
      <div class="logs-container">
        <div v-for="log in logs" :key="log.timestamp" class="log-entry">
          <div class="log-line">
            <span class="timestamp">{{ log.timestamp }}</span>
            <span class="message" v-html="ansiToHtml(log.message)"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.log-window-wrapper {
  width: 100%;
  height: 100vh;
  overflow: auto;
  background-color: black;
}

.log-window {
  padding: 20px;
  width: max-content; 
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: black;
  color: white;
  box-sizing: border-box;
}

.logs-container {
  display: flex;
  flex-direction: column;
  gap: 10px; 
}

.log-entry {
  border: 1px solid #444;
  padding: 10px;
  border-radius: 5px;
  background-color: #333;
  overflow: hidden;
  white-space: nowrap; 
}

.log-line {
  display: flex;
  align-items: flex-start; 
  text-align: left; 
}


.timestamp {
  font-size: 0.9em;
  color: #888;
  margin-right: 10px;
  flex-shrink: 0;
}

.message {
  font-size: 1em;
  color: inherit;
  flex-grow: 1;
  text-align: left; 
}
</style>
