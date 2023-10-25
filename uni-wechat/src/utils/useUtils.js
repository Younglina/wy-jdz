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
  if (!store.userInfo) {
    uni.showToast({
      title: '请登录或注册',
      icon: 'fail'
    })
    return
  }
  if (!commentContent && !imgList.length) {
    uni.showToast({
      title: '没有内容或图片',
      icon: 'fail'
    })
    return
  }
  uni.showLoading({
    title: '提交中...'
  })
  const uploadImgs = []
  console.log(imgList, [...imgList], 'imgList')
  imgList.map(item=>{
    console.log(item, typeof item, 'item')
    const res = uni.getFileSystemManager().readFileSync(item, 'base64')
    uploadImgs.push({ filename: `${'wzq1'}_${+new Date()}_${item.split('/').at(-1)}`, file: res })
  })
  await Http.post('/addAreaComment', {
    ...dData,
    content: commentContent,
    images: uploadImgs,
    userid: store.userInfo.id
  })
  // Http.post(import.meta.env.VITE_MAIL,
  // { subject: `${store.userInfo.username}-评论-${areaName}`, text: commentObj.content },
  // {
  //   headers: { 'Content-Type': 'text/plain' }
  // }).then(res => {
  //   console.log(res)
  // })
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

export const randomAvatar = ['linear-gradient(to top, #c471f5 0%, #fa71cd 100%)', 'linear-gradient(to top, #48c6ef 0%, #6f86d6 100%)', 'linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%)', 'linear-gradient(to top, #feada6 0%, #f5efef 100%)', 'linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%)', 'linear-gradient(to top, #accbee 0%, #e7f0fd 100%)', 'linear-gradient(to right, #74ebd5 0%, #9face6 100%)',]

export const ImageBaseUrl = 'https://younglina-1256042946.cos.ap-nanjing.myqcloud.com/'

export const navCard = [
  { text: '美食', value: 'food', image: `${ImageBaseUrl}food.svg` },
  { text: '娱乐', value: 'play', image: `${ImageBaseUrl}game.svg` },
  { text: '景点', value: 'scenic', image: `${ImageBaseUrl}scenic.svg` },
  { text: '瓷器', value: 'porcelain', image: `${ImageBaseUrl}porcelain.svg` },
]