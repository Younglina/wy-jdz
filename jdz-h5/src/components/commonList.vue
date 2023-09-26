<script setup>
import { ImageBaseUrl } from '@/utils/useData'
import { ref } from 'vue'
const props = defineProps({
  data: { default: [] },
})
const datalist = ref([]);
const loading = ref(false);
const finished = ref(false);

const onLoad = () => {
  for (let i = 0; i < 10; i++) {
    if (datalist.value.length >= props.data.length) {
      loading.value = false;
      finished.value = true;
      break
    }
    datalist.value.push(props.data[datalist.value.length]);
  }
  // 加载状态结束
  loading.value = false;
};
</script>
<template>
  <van-list
    v-model:loading="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <div v-for="item in datalist" :key="item.id" class="datalist">
      <div class="datalist_t">
        <div>
          <img class="datalist_image" :src="ImageBaseUrl+item.images[0]" :alt="item.name" />
        </div>
        <div class="datalist_info">
          <div class="datalist_name">{{ item.name }}</div>
          <div>{{ item.likes }}喜欢 {{ item.comments }}评论</div>
          <div>{{ item.tags.join(' ') }}</div>
          <div>开放时间：{{ item.openTime }}</div>
          <div>{{ item.cost || '自选' }}</div>
        </div>
      </div>
      <div class="datalist_desc">{{ item.description }}</div>
    </div>
  </van-list>
</template>
<style scoped lang='scss'>
.datalist{
  padding-bottom: 20px;
  &_t{
    display: flex;
    padding-bottom: 10px;
  }
  &_info{
    font-size: 12px;
  }
  &_name{
    font-size: 16px;
  }
  &_image {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100px;
    border-radius: 4px;
    margin-right: 10px;
  }
}
</style>