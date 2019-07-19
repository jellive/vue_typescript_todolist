import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import {State, Item} from './store.interface'

Vue.use(Vuex);

const store: StoreOptions<State> = {
  state: {
    todoList: [
      {id: 0, title: 'test', status: 'active'},
      {id: 1, title: 'test1', status: 'clear'},
      {id: 2, title: 'test2', status: 'active'}
  ]
  },
  mutations: {
    // TODO add
    addItem(state, item: Item) {
      state.todoList.push(item)
    },
    // TODO change status
    changeStatus(state, {id, status}: {id: number, status: 'active' | 'clear'}) {
      state.todoList[id].status = status
    },
    // TODO remove
    removeItem(state, id: number) {
      state.todoList.splice(id, 1)
    }
  },
  actions: {

  },
  getters: {
    allTodoList: (state) => state.todoList,
    activeTodoList: (state) => state.todoList.filter((item: Item) => item.status === 'active'),
    clearTodoList: (state) => state.todoList.filter((item: Item) => item.status === 'clear')
  }
}

export default new Vuex.Store(store)
