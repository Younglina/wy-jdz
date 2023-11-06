<script setup>
import http from '@/utils/http'
import { useStore } from '@/store'
const store = useStore()
defineOptions({
  name: 'IndexPage',
})

const username = ref('wzq1')
const password = ref('wzq1')

const router = useRouter()
function go() {
  if (username.value)
    http.post('/api/login', { username: username.value, password: password.value }).then((res) => {
      console.log(res)
      store.userInfo = res.data.userInfo
    })
}
</script>

<template>
  <div>
    <div i-carbon-campsite inline-block text-4xl />
    <p>
      <a rel="noreferrer" href="https://github.com/antfu/vitesse-lite" target="_blank">
        Vitesse Lite
      </a>
    </p>
    <p>
      <em text-sm op75>Opinionated Vite Starter Template</em>
    </p>

    <div py-4 />

    <TheInput
      v-model="username"
      placeholder="What's your name?"
      autocomplete="false"
      @keydown.enter="go"
    />

    <TheInput
      v-model="password"
      placeholder="What's your name?"
      autocomplete="false"
      @keydown.enter="go"
    />

    <div>
      <button
        class="m-3 text-sm btn"
        :disabled="!username"
        @click="go"
      >
        Go
      </button>
    </div>
  </div>
</template>
