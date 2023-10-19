import { useStore } from '@/store'
import Http from '@/utils/request.js'

export function makeCall(p){
  uni.makePhoneCall({
    phoneNumber: p,
    success: () => {
      console.log('调用成功')
    },
    fail: (err) => {
      console.log(err)
    }
  })
}

export async function useComment(dData, commentContent, imgList){
  const store = useStore()
  // if (!store.userInfo) {
  //   uni.showToast({
  //     title: '请去我的页面进行登录或注册',
  //     icon: 'fail'
  //   })
  //   return
  // }
  if (!commentContent && !imgList.length) {
    uni.showToast({
      title: '还没有填写内容或图片哦',
      icon: 'fail'
    })
    return
  }
  uni.showLoading({
    title: '提交中...'
  })
  let commentImages = []
  if (imgList.length) {
    console.log(imgList)
    commentImages = imgList.map(item => `${dData.areaKey}_${+new Date()}_${item.path}`)
  }
  const commentData = {
    "content": commentContent,
    "images": commentImages,
  }
  console.log(commentData)
  // await submitData('verify', { ...commentData, "nickname": store.userInfo.username, "userid": store.userInfo.userid, areaKey: dData.areaKey, areaName: dData.areaName, dataType: dData.dataType })
  await Http.post('/addAreaComment', {
    ...commentData,
  })
  // Http.post(import.meta.env.VITE_MAIL,
  // { subject: `${store.userInfo.username}-评论-${areaName}`, text: commentObj.content },
  // {
  //   headers: { 'Content-Type': 'text/plain' }
  // }).then(res => {
  //   console.log(res)
  // })
  // uploadImage(dData.areaKey, imgList, +commentDate)
  uni.hideLoading()
  uni.showToast({
    title: '审核后将会显示',
    duration: 2000,
    icon: 'success'
  })
  setTimeout(() => {
    uni.navigateBack()
  }, 1300)
  return Promise.resolve()
}