//导入vue和vuex
import Vue from 'vue';
import Vuex from 'vuex';
import localStorage from '../localStorage/localStorage.js';
Vue.use(Vuex);

//创建一个数据仓库
const state = {
	cart:[],
	ratings:[],
	seller:{},
	goods:[],
}
//mutations改变数据
const mutations = {
	clean(state){
		for(let i=0;i<state.cart.length;i++){
			state.cart[i].count=0
		}
		state.cart=[]
	},
	goPay(state){
		for(let i=0;i<state.cart.length;i++){
			state.cart[i].count=0
		}
		state.cart=[]
	},
	add(state,obj){
		let tag=true
		for(let i=0;i<state.cart.length;i++){
			if(state.cart[i].name==obj.food.name){
				tag=false
			}
		}
		if(tag){
			obj.food.cateIndex=obj.index
			state.cart.push(obj.food)
			// console.log(state.cart)
		}
		localStorage.write('cart',state.cart)
	},
	sub(state,obj){
		if(obj.food.count==0){
			for(let i=0;i<state.cart.length;i++){
				if(state.cart[i].name==obj.food.name){
					state.cart.splice(i,1)
				}
			}
		}
		localStorage.write('cart',state.cart)
	}
};


//导出 Vuex.Store的对象
export default new Vuex.Store({
	state,
	mutations,
});
