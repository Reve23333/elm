//创建router对象 返回 导入vue-router对象，vue-router对象是一个全局组件，所以要vue use
import Vue from 'vue'
import VueRouter from 'vue-router'

//1、导入组件
import goods from 'cs/goods/goods.vue'//为了地址写短一点，我在webpack.coonfig.js中设置了一个别名
import rating from 'cs/rating/rating.vue'
import seller from 'cs/seller/seller.vue'
import foodDetail from 'cs/food/foodDetail.vue'

//导入之后 vue.use 因为是全局安装
Vue.use(VueRouter);
//2、定义映射关系
const routes=[
    {path:'/goods/:index/:inx',component:foodDetail},
    {path:'/goods',component:goods}, //注意是component 不是components
    {path:'/rating',component:rating},
    {path:'/seller',component:seller},
    {path:'/',redirect:'/goods'},//指定默认的首地址 映射是一一对应，一个地址对应一个组件 component:goods被映射到/goods之后，就不能再被映射了
    {path:'*',redirect:'/seller'},//除上边外的其他任何地址，我都给定向到商家组件中
];
//定义完映射关系后创建router对象并返回 -> 创建vue对象需要用到vue-router 
//导出 new一个VueRouter对象
export default new VueRouter({
    routes,
    linkActiveClass:'active'//在创建路由对象时，加上这个属性，意思是，用router-link所生成的元素里面，如果被激活了，样式是什么
});