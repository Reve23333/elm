<template>
  <div id="app">
    <v-header :seller="seller"></v-header>  <!--注意不能用header 会和h5中的header标签冲突 -->
    <div class="tab border-bottom">
      <div class="tab-item">
        <router-link to='/goods'>商品</router-link> <!--导入Vue-Router之后要在main.js中导入 否则报vue-router没有导入的错误-->
      </div>
      <div class="tab-item" :seller="seller">
        <router-link to='/rating'>评论</router-link>
      </div>
      <div class="tab-item" >
        <router-link to='/seller'>商家</router-link>
      </div>
    </div>
    <cart :seller="seller"></cart>
    <router-view></router-view>
  </div>
</template>

<script>
import header from 'cs/header/header.vue' //导入header组件，但是不能用，因为会和H5中的header标签冲突，所以要声明一下v-header是header，在components声明
import goods from 'cs/goods/goods.vue'
import cart from 'cs/cart/cart.vue'
import rating from 'cs/rating/rating.vue'
import seller from 'cs/seller/seller.vue'
const ERR_OK=0;//小技巧 定义一个常量 没有错误的时候赋值为0
export default {
  name: 'app',
  data(){
    return {
      seller:{},
    };
  },
  mounted(){//钩子函数 表示已经挂载好了，可以发ajax请求了
    this.$http.get("http://localhost:1900/seller").then((response)=>{
      if(response.data.errno==ERR_OK){ //错误号等于0，表示没有错误
        this.seller = response.data.data[0];
        this.$store.state.seller=this.seller;
      }
      // console.log(this.seller);
    });
  },
  components:{
    'v-header':header,
    cart,
    goods,
    rating,
    seller,
  }
}
</script>
<style>
.tab{
  display:flex;/*设置样式是浮动*/
  width:100%; /*设置浮动的范围是100% */
  height:40px;
  line-height:40px;
  text-align:center;/*浮动后设置居中 */
  border-bottom:1px solid rgba(7,27,17,0.1);
}
.tab-item{
  flex:1; /*设置tab-item里面所有的元素都进行浮动 */
}
.tab-item a{
  display:block;
  font-size:14px;
  color:rgb(77,85,93);
  /* line-height:14px; */
}
.tab-item a.active{
  color:rgb(240,20,20);
}
</style>
