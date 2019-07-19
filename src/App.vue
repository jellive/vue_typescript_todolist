<template>
  <div id="app">
    <appHeader/>
    <item-input/>
    <router-view/>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import appHeader from '@/components/header.vue' // 그냥 header를 쓰면 원래 기본으로 있는 header태그와 겹쳐서 이름 바꿈.
import itemInput from '@/components/item-input.vue'


@Component({
  components: {
    appHeader, itemInput
  }
})
export default class App extends Vue {
  
}

</script>


<style>
#app {
  padding: 100px;
}
</style>
