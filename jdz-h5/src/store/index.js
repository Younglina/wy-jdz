import { defineStore } from 'pinia'
let modules = import.meta.glob("../views/*.vue")

// pinia状态管理器
export const useStore = defineStore('wyStore', {
    state: () => {
        return {
            // 路由表
            routes: [],
            userInfo: null
        }
    },
    getters: {
        getUserInfo() {
            return this.userInfo
        }
    },
    actions: {
        // 添加动态路由，并同步到状态管理器中
        addRoutes(data, router) {
            const t = []
            data.forEach(item => {
                t.push({
                    path: item.path,
                    name: item.name,
                    component: modules[`../views/${item.component}`],
                    meta: item.meta
                })
            })
            this.routes = t
            t.forEach(m => router.addRoute(m))
        },
        setUserInfo(data){
            this.userInfo = data
        },
    },
    persist: {
      storage: sessionStorage,
      paths: ['routes', 'userInfo'],
    },
})