<template>
  <div class="goods">
    <div class="menu_wrapper" ref="foodScroll">
      <ul>
        <li ref="menuItem" class="menuItem" :class="{current:currentIndex == index}" v-for="(item,index) in goods" :key="index" @click="getIndex(index)">
          <span class="text">{{item.name}}
          </span>  
         </li>
      </ul>
    </div>
    <div v-if="goods.length>0" class="food_wrapper" ref="foodScroll">
      <div class="content">
        <div v-for='(good,index) in goods' :key="index" class="food-list-hook">
          <p class="selected"> {{good.name}}</p>
          <ul>
            <li class="food-item" v-for="(food,inx) in good.foods" :key="inx">
              <div class="img-wrapper">
                <img :src="food.icon" alt="">
              </div>
              <div class="text">
                <h3>{{food.name}}</h3>
                <p>月售{{food.sellCount}}份&nbsp;&nbsp;好评率{{food.rating}}</p>
                <p><span class="new-price">￥{{food.price}}</span>
                  <span v-show="food.oldPlace">{{food.oldPrice}}</span></p>
              </div>
              <div class="btn">
                <span v-show="food.counter>0" @click="reduce(food,index,inx)"><i class="iconfont" style="color:#1A94E6">&#xe619;</i><a>{{food.counter}}</a></span>
                <span @click="add(food,index,inx)"><i class="iconfont" style="color:#1A94E6">&#xe653;</i></span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import localStorage from '../../localStorage/localStorage.js'
import cart from '../cart/cart.vue'
const ERR_OK=0;
export default {
  props:{//商家信息提前加进来，以防后面用到
    seller:{}
  },
  data(){
    return{
      goods:[],//商品集合
      cart:[],
      menu:[],
      food:[],
      listHeight:[],
      scrollY:0,
      // currentIndex:''
    }
  },
  mounted(){ //挂载完成后，从服务器端加载商品数据
    this.$http.get("http://localhost:1900/goods").then((response)=>{
      if(response.data.errno==ERR_OK){
        this.goods = response.data.data;
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.foodScroll,{
            probeType: 3 ,
            click:true//可以派发scroll事件
          });
          this.scroll.on('scroll', (pos) => {
            this.scrollY = Math.abs(Math.round(pos.y))
          })
          this.calcFoodHeight();
        });
      }
    });
  },
  methods:{
    calcFoodHeight(){
      let foodlist = this.$refs.foodScroll.getElementsByClassName('food-list-hook');
      // console.log(foodlist)
      let height = 0;
      this.listHeight.push(height);
        for(let i = 0; i < foodlist.length; i++) {
          height += foodlist[i].clientHeight;
          this.listHeight.push(height)    
        }
      // console.log(this.listHeight)
      },
    getIndex(index){
      let foodlist = this.$refs.foodScroll.getElementsByClassName('food-list-hook');
      this.scroll.scrollToElement(foodlist[index], 250)  //better-scroll的scrollToElement方法滚动到指定位置
      // this.selectedIndex = index;
    },
    add(food,index,inx){
     //选中的那个食物  如果没有把数据拼凑进去，有的话，原来的数据加一，处理完后，将购物车数据放到vuex或者localstorage中
      if(!food.counter){
        this.$set(food,'counter',0);//Vue.$set(target,key,value)：可以动态的给数组、对象添加和修改数据，并更新视图中数据的显示
        this.cart.push({"name":food.name,"price":food.price,"counter":food.counter})
      }else{
        for(let item of this.cart){
          if(item.name==food.name){
            item.counter++;
          }
        }
      } 
      food.counter++;
      // this.$set(this.cart,index,{"name":food.name,"price":food.price,"counter":food.counter});
      this.$store.state.cart = this.cart;
      localStorage.write("cart",this.cart);
      // console.log(this.cart);
    },
    reduce(food,index,inx){ 
      for(let item of this.cart){
        if(item.name==food.name){
          item.counter--;
        }
      }
      food.counter--;
      this.$store.state.cart = this.cart;
      localStorage.write("cart",this.cart);
    },
  },
  computed:{
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++){
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i+1]
        if((this.scrollY >= height1 && this.scrollY < height2)){
          return i
        }
      }
    }
  },
  components:{
    cart
  }
}
</script>

<style>
  .current{
    background-color:#fff;
  }
  .goods{
    position:absolute;
    display:flex;
    width:100%;
    top:174px;
    bottom:70px;
    overflow:hidden;
  }
  .goods .menu_wrapper{
    flex:0 0 80px;
    width:80px;/*兼容安卓手机*/
    top:174px;
    bottom:70px;
    background:#f3f5f7;
    /* overflow: auto; */
    /* display:table;表格，将左侧的做成表格形式 每个li就是单元格 */
  }
  /* .goods .menu_wrapper::-webkit-scrollbar{
    display:none; /*通过伪类去掉纵向的两个滚动条*/
  /*} */
  .goods .food_wrapper{
    flex:1;/*手机屏幕的不同，食物部分的宽度不同*/
    top:174px;
    bottom:70px;
    /* overflow: auto; */
  }
  .goods .food_wrapper ul li{
    position:relative;
    display: flex;
    border-bottom:1px solid rgba(7,17,27,0.1);
  }
  .goods .food_wrapper ul li .img-wrapper img{
    width:57px;
    height:57px;
  }
  /* .goods .food_wrapper::-webkit-scrollbar{
     display:none;
  }  */
  .goods .food_wrapper .selected{
    height:26px;
    line-height:26px;
    font-size:12px;
    color:rgb(147,153,159);
    background-color:#f3f5f7;
  }
  .menu_wrapper .menuItem{
    display:table;
    width:100%;
  }
  .menuItem .text{
    display: table-cell;
    vertical-align: middle;
    padding:0px 12px;
    height:54px;
    font-size:12px;
  }
  .food_wrapper ul li .img-wrapper{
    /* border:1px solid green;  */
    padding:18px 10px 18px 18px;
  }
  .food_wrapper ul li .text{
    display:inline-block;
    margin-top:18px;
    /* border:1px solid red; */
  }
  .food_wrapper ul li .text h3{
    font-size:14px;
    color:rgb(7,17,27);
    line-height:14px;
  }
  .food_wrapper ul li .text p{
    font-size:10px;
    color:rgb(147,153,159);
    line-height:10px;
    margin-top:8px;
  }
  .food_wrapper ul li .text p .new-price{
    font-size:14px;
    color:red;
    font-weight:350;
    line-height:24px;
  }
  .food_wrapper ul li .btn{
    /* display:inline-block; */
    /* border:1px solid black; */
    bottom:17px;
    position: absolute;
    right:18px;
    float:right;
    float:right;
    font-size:0;
  } 
  .food_wrapper ul li .btn a{
    display:inline-block;
    font-size:14px;
    color:rgb(147,153,159);
    margin:0 10px;
  }
</style>