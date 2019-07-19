<template>
<div>
    <item v-for="item in renderList" :id="item.id" :title="item.title" :status="item.status" :key="item.id" />
</div>
</template>

<script lang="ts">
import {
    Vue,
    Component,
    Watch,
} from 'vue-property-decorator';
import item from '@/components/item.vue';
import {
    mapGetters,
} from 'vuex'; // getters 헬퍼 함수. $store를 쓰지 않고 바로 부를 수 있다.

@Component({
    components: {
        item,
    },
    computed: {
        ...mapGetters([
            'allTodoList',
            'activeTodoList',
            'clearTodoList',
        ]),
    },
})
export default class ItemList extends Vue {
    renderList: any[] = [];
    allTodoList!: any[] // mapGetters는 런타임에 할당하기 떄문에 lint 에러가 나온다. 이를 해제하기 위함.
    activeTodoList!: any[]
    clearTodoList!: any[]


    async created() {
        this.$store.dispatch('initData');
    }

    initRenderList(status: string) {
        if (!status) {
            this.renderList = this.allTodoList;
        } else if (status === 'active') {
            this.renderList = this.activeTodoList;
        } else if (status === 'clear') {
            this.renderList = this.clearTodoList;
        }
    }

    @Watch('$route.params.status')
    routeUpdate(newValue: 'active' | 'clear') {
        this.initRenderList(newValue);
    }

    @Watch('$store.state.todoList', {deep: true})
    stateUpdate() {
        const status: string = this.$route.params.status
        this.initRenderList(status);
    }
}
</script>
