import { defineStore } from 'pinia'
// pinia状态管理器
export const useStore = defineStore('wyStore', {
    state: () => {
        return {
            userInfo: null,
            areas: []
        }
    },
    getters: {
        getUserInfo() {
            return this.userInfo
        }
    },
    actions: {
        setUserInfo(data){
            this.userInfo = data
        },
        getAreas(){
            // Http.get('/getArea').then(res=>{
            //     this.areas = res.data.sort((a,b)=>b.likes-a.likes)
            // })
            this.areas = [{id:1},{id:2},{id:3},{id:4}]
        },
    }
})