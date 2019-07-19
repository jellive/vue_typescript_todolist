<template>
  <div class="form-group">
    <input type="text"
        class="form-control"
        @keyup.enter="addItem"
        placeholder="할 일을 입력해주세요."
        v-model="title">
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import {mapState} from 'vuex'; // state 헬퍼 함수. 바로 부를 수 있음.

@Component({
    computed: mapState([
        'todoList',
    ]),
})
export default class ItemInput extends Vue {
    title: string = '';
    todoList!: any[]

    addItem() {
        this.$store.commit('addItem', {
            id: this.todoList.length,
            title: this.title,
            status: 'active',
        });
    }
}
</script>

