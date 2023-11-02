<script setup>
import AMapLoader from '@amap/amap-jsapi-loader';

const props = defineProps({
  lng: '',
  lat: '',
  address: ''
})
const emit = defineEmits(['chooseArea'])
const LngLatList = ref([])
const areaAddress = ref("")

let map = null, marker = null
onMounted(() => {
  window._AMapSecurityConfig = {
    securityJsCode: '1798020d0518464df4e389ee55365c02'
  }
  AMapLoader.load({
    "key": "c35481dff089b8a651daaca8ed71c38c",
    "version": "2.0",
    "plugins": ['AMap.Marker'],
  })
    .then((AMap) => {
      map = new AMap.Map("map-container", {
        // 设置地图容器id
        viewMode: "2D", // 是否为3D地图模式
        zoom: 12, // 初始化地图级别
        center: [props.lng || 117.186448, props.lat || 29.275149],
      });
      map.on('click', e => {
        let lng = e.lnglat.lng
        let lat = e.lnglat.lat
        // 增加点标记
        addMarker(lng, lat)
        // 获取地址
      })
    })
    .catch((e) => {
      console.log(e);
    });
})

const remoteMethod = (query) => {
  if (query) {
    AMapLoader.load(['AMap.AutoComplete']).then((AMap) => {
      AMap.plugin('AMap.AutoComplete', () => {
        // 实例化Autocomplete
        const autoOptions = {
          city: '江西省',
          citylimit: true
        }
        const autoComplete = new AMap.AutoComplete(autoOptions);
        autoComplete.search('景德镇市' + query, function (status, result) {
          // 搜索成功时，result即是对应的匹配数据
          LngLatList.value = result.tips.map(item => {
            return {
              name: item.name,
              id: item.id,
              subname: item.address,
              district: item.district,
              lng: item.location && item.location.lng,
              lat: item.location && item.location.lat,
            }
          })
        })
      })
    }).catch((e) => {
      console.error(e);
      showFailToast('查询详细地址失败')
    });
  } else {
    LngLatList.value = []
  }
}

function addMarker(lng, lat, choose) {
  if (map) {
    if (marker) {
      marker.setMap(null)
      marker = null
    }
    marker = new AMap.Marker({
      position: new AMap.LngLat(lng, lat),
    });
    if(!choose){
      emit('chooseArea', {lng, lat})
    }
    marker.setMap(map)
  }
}

function changeArea(v) {
  const area = LngLatList.value.find(item => item.id === v)
  console.log(v, area)
  addMarker(area.lng, area.lat, 'choose')
  emit('chooseArea', area)
}

</script>
<template>
  <div position-relative>
    <div position-absolute top-1 right-1 z-10>
      <el-select v-model="areaAddress" filterable remote reserve-keyword placeholder="请输入关键词"
        :remote-method="remoteMethod" @change="changeArea">
        <el-option v-for="item in LngLatList" :key="item.id" :value="item.id">
          {{ item.name }}({{ item.subname}})
        </el-option>
      </el-select>
    </div>
    <div id="map-container" w-300px h-300px p-0 m-0></div>
  </div>
</template>
<style scoped lang='scss'>
</style>
