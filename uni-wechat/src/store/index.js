import { defineStore } from 'pinia'
import request from '@/utils/request.js'
// pinia状态管理器
export const useStore = defineStore('wyStore', {
    state: () => {
        return {
            userInfo: null,
            areas: [],
            extRoutes: []
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
        addRoutes(data){
            this.extRoutes = data
        },
        getAreas(){
            request.get('/getArea').then(res=>{
                this.areas = res.sort((a,b)=>b.likes-a.likes)
            })
        },
    }
})