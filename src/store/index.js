// import Vue from 'vue';
import { createStore } from 'vuex'
// import actions from './actions';
import mutations from './mutations';

// Vue.use(Vuex);
const state = {
  routeData: [],
  curPathList: [],
}
const getters = {
    routeData: state=>state.routeData,
    curPathList: state=>state.curPathList,
}
const store = createStore({
  state,
  getters,
  mutations,
})

export default store