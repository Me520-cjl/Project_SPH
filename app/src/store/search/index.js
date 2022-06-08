import { reqGetSearchInfo } from '@/api'
//home模块的小仓库
const state = {
    //state中数据默认初始值别瞎写，服务器返回对象，服务器返回数组，根据返回值设置
    searchList: {},
};
//mution是唯一修改state的地方
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList;
    },
};
const actions = {
    //通过API里面的接口函数调用，向服务器发请求，获取服务器数据
    async getSearchList({ commit }, params = {}) {
        let result = await reqGetSearchInfo(params);
        console.log(result);
        if (result.code == 200) {
            commit('GETSEARCHLIST', result.data)
        }
    },
};
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}