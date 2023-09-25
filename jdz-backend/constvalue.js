module.exports = {
  ConstRouter: [
    { path: '/notes', name: 'Notes', component: 'notes.vue', meta: { title: '留言' } },
    { path: '/addArea', name: 'AddArea', component: 'addArea.vue', meta: { title: '新增', inFoot: true } },
    { path: '/verify', name: 'verify', component: 'verify.vue', meta: { title: '审核评论', inFoot: true } },
  ]
} 