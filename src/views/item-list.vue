<template>
<div>
    <item v-for="item in renderList" :id="item.id" :title="item.title" :status="item.status" :key="item.id" />
</div>
</template>

<script lang="ts">
import {
    Vue,
    Component,
    Watch
} from 'vue-property-decorator'
import item from '@/components/item.vue'
import {
    mapGetters
} from 'vuex' // getters 헬퍼 함수. $store를 쓰지 않고 바로 부를 수 있다.

@Component({
    components: {
        item,
    },
    computed: {
        ...mapGetters([
            'allTodoList',
            'activeTodoList',
            'clearTodoList'
        ])
    }
})
export default class ItemList extends Vue {
    renderList: any[] = []

    created() {
        // this.renderList = this.allTodoList // 초기부터 넣으면 비동기인 getters가 불리기 전에 렌더링이 완료되서 undefined로 간다. created안에 값을 넣어줘야 함.
        this.initRenderList(this.$route.params.status as 'active' | 'clear')
    }

    initRenderList(status: 'active' | 'clear') {
        if (!status) {
            this.renderList = this.allTodoList
        } else if (status === 'active') {
            this.renderList = this.activeTodoList
        } else if (status === 'clear') {
            this.renderList = this.clearTodoList
        }
    }

    @Watch('$route.params.status')
    routeUpdate(newValue: 'active' | 'clear') {
        this.initRenderList(newValue)
    }

    @Watch('$store.state.todoList', {deep: true})
    routeUpdate() {
        this.initRenderList(this.$route.params.status)
    }
}
</script>
