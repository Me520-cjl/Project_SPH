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
        // console.log(result);
        if (result.code == 200) {
            commit('GETSEARCHLIST', result.data)
        }
    },
};

//计算属性
//项目当中getters的主要作用是，简化仓库中的数据
//可以吧我们将来在组件当中需要用到的数据简化一下，【将来组件在使用数据的时候方便了】
const getters = {
    //当前形参state是当前仓库当中的state，而不是大仓库中的state
    goodsList(state) {
        //state.searchList.goodsList如果服务器数据回来了，没问题是一个数组
        //假如没有网络，返回的数据是一个undefind，至少应该给人家返回一个空数组
        return state.searchList.goodsList || []
    },
    trademarkList(state) {
        return state.searchList.trademarkList || []
    },
    attrsList(state) {
        return state.searchList.attrsList || []
    },
};
export default {
    state,
    mutations,
    actions,
    getters
}