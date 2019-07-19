<template>
<div>
    <item v-for="item in renderList" :id="item.id" :title="item.title" :status="item.status"/>
</div>
</template>

<script lang="ts">
import {Vue, Component, Watch} from 'vue-property-decorator'
import item from '@/components/item.vue'

@Component({
    components: {
        item,
    }
})
export default class ItemList extends Vue {
    data: any[] = [
        {id: 0, title: 'test', status: 'active'},
        {id: 1, title: 'test1', status: 'clear'},
        {id: 2, title: 'test2', status: 'active'}
    ]

    renderList: any[] = this.data

    @Watch('$route.params.status')
    routeUpdate(newValue: string) {
        if (!newValue) {
            this.renderList = this.data
        } else if (newValue === 'active' || newValue === 'clear'){
            this.renderList = this.data.slice().filter((item: any) => {
                return item.status === newValue
            })
        }
    }
}
</script>
