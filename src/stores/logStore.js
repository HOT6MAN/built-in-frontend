import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLogStore = defineStore('log', () => {
  const programLogs = ref({})

  function setProgramLogs(programName, logs) {
    programLogs.value[programName] = logs
  }

  return { programLogs, setProgramLogs }
})