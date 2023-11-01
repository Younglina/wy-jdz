import { defineStore } from 'pinia'

export const useStore = defineStore('mainStore', {
  state: () => ({
      userInfo: null,
      isCollapse: false,
  }),
  getters: {
    getUserInfo(state){
      return state.userInfo
    }
  },
  actions: {
    toggleAsideBar(){
      this.isCollapse = !this.isCollapse
    }
  }
})
