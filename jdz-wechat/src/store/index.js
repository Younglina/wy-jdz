import { defineStore } from 'pinia'
import request from '@/utils/request.js'
// pinia状态管理器
export const useStore = defineStore('wyStore', {
    unistorage: true, 
    state: () => {
        return {
            userInfo: null,
            areas: [],
            extRoutes: [],
        }
    },
    getters: {
        getUserInfo() {
            return this.userInfo
        }
    },
    actions: {
        async setUserInfo(data){
            this.userInfo = data
            request.get('/getAreaComment', { userid: this.userInfo.id}).then(res=>{
                this.userInfo.comments = res
            })
        },
        logout(){
            this.userInfo = null
        },
        async handleLike(areakey){
            const likes = this.userInfo.likes || []
            let likeCount = 0
            if(likes.includes(areakey)){
                likes.splice(likes.indexOf(areakey),1)
                likeCount-=1
            }else{
                likes.push(areakey)
                likeCount+=1
            }
            return request.post('/updateLikes', { userId: this.userInfo.id, likes: JSON.stringify(likes), areakey, likeCount })
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