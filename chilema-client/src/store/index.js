import Vuex from 'vuex';
import Vue from 'vue';

// 由于vuex是个插件，所以要use一下才能全局使用，vuex就是一个全局状态管理
Vue.use(Vuex);


// 新建一个state对象
const state = {
    cart: []
};

// 再创建一个改变state对象的
const mutations = {                                                                                                                           
    addToCart: function(state, item) {
        var index = state.cart.indexOf(item);
        if(index != -1) {
            console.log("add");
            state.cart[index].count++;//这么做相当于通过下标改变数据，vue检测不到
            state.cart = state.cart.slice(0);// 把数据重新拷贝一份，然后再通过等好赋值
        } else {
            console.log("push");
            item["count"] == 1;
            state.cart.push(item);
        }
    }
}

const actions = {
    addToCartC: ({commit}, item) => {
        // 需要在这里调用mutations，解构一个commit出来，这个字符串key就是mutations里面对象的名字
        commit("addToCart", item);
    }
}

const getters = {
    count: function(state) {
        var count = 0;
        for(var item of state.cart) {
            count += item.count;
        }
        return count;
    }
}

// 将这些对象都暴露出来就生成了一个store
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})