<template>
  <div class="goods">
    <div class="menu_wrapper">
      <ul>
        <li class="menuItem" v-for="(item,index) in goods" :key="index" @click="getIndex(index)">
          <span class="text">{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div v-if="goods.length>0" class="food_wrapper">
      <p class="selected">{{goods[selectedIndex].name}}</p>
      <ul>
        <li v-for="(food,index) in goods[selectedIndex].foods" :key="index">
          <div class="img-wrapper">
            <img :src="food.icon" />
          </div>
          <div class="text">
            <h3>{{food.name}}</h3>
            <p>月售{{food.sellCount}}份&nbsp;&nbsp;好评率{{food.rating}}</p>
            <p>
              <span class="new-price">￥{{food.price}}</span>
              <span v-show="food.oldPlace">{{food.oldPrice}}</span>
            </p>
          </div>
          <div class="btn">
            <span v-if="num[index].counter>0" @click="reduce(index);redPrice(index)">
              <i class="iconfont" style="color:#1A94E6">&#xe619;</i>
              <a>{{num[index].counter}}</a>
            </span>
            <span @click="add(index)">
              <i class="iconfont" style="color:#1A94E6">&#xe653;</i>
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import localStorage from "../../localStorage/localStorage.js";
import cart from "../cart/cart.vue";
const ERR_OK = 0;
export default {
  props: {
    //商家信息提前加进来，以防后面用到
    seller: {}
  },
  data() {
    return {
      goods: [], //商品集合
      selectedIndex: 0, //设置选中的那个名字
      cart: [],
      num: [{ name: "",counter:0 }]
    };
  },
  mounted() {
    //挂载完成后，从服务器端加载商品数据
    this.$http.get("http://localhost:1900/goods").then(response => {
      if (response.data.errno == ERR_OK) {
        this.goods = response.data.data;
      }
      // console.log(this.goods);
    });
    localStorage.write("cart", [{ name: "",counter:0 }]);
  },
  methods: {
    getIndex(index) {
      // console.log(index);
      this.selectedIndex = index;
    },
    add(index) {
      // console.log(index);
      var food = this.goods[this.selectedIndex].foods[index]; //选中的那个食物  如果没有把数据拼凑进去，有的话，原来的数据加一，处理完后，将购物车数据放到vuex或者localstorage中
      var bb = localStorage.read("cart");

      var clone = function(obj) {
        //深拷贝food
        return JSON.parse(JSON.stringify(obj));
      };
      // console.log(bb);
      let tag = true;
      for (let item of bb) {
        if (item.name == food.name) {
          item.counter += 1;
          tag = false;
          break;
        }
      }
      if (tag) {
        var sum = clone(food);
        sum["counter"] = 1;
        // this.$set(sum,'counter',1);
        //Vue.$set(target,key,value)：可以动态的给数组、对象添加和修改数据，并更新视图中数据的显示
        let { name, price, counter } = sum;
        bb[index]={ name, price, counter };

        // this.$set(this.cart,index,{"name":sum.name,"price":sum.price,"counter":sum.counter});
        localStorage.write("cart", bb);
      } else {
        localStorage.write("cart", bb);
      }
      this.num = bb;
      console.log(this.num);
    },
    // console.log(sum);

    // console.log(food.counter);

    // localStorage.read("cart")
    // console.log(food)

    // reduce(index) {
    //   let food = this.goods[this.selectedIndex].foods[index];
    //   if (food.counter == 0) {
    //     this.$set(food, "counter", 0);
    //   } else {
    //     food.counter--;
    //   }
    //   this.$set(this.cart, index, {
    //     name: food.name,
    //     price: food.price,
    //     counter: food.counter
    //   });
    //   localStorage.write("cart", this.cart);
      // let allPrice = localStorage.read("allPrice");
      // let lastPrice = allPrice - food.price;
      // console.log(lastPrice);
      // localStorage.write("lastPrice",lastPrice);
//     },
//     addPrice() {
//       // localStorage.read("cart");
//       var allPrice = 0;
//       var price = 0;
//       var counter = 0;
//       var r = this.cart.filter(item => item);
//       // console.log(r);
//       for (let i = 0; i < r.length; i++) {
//         price = r[i].price;
//         counter = r[i].counter;
//         allPrice += price * counter;
//         localStorage.write("allPrice", allPrice);
//       }
//       // console.log(allPrice);
//       return allPrice;
//     },
//     redPrice(index) {
//       var food = this.goods[this.selectedIndex].foods[index];
//       var allPrice = localStorage.read("allPrice");
//       var lastPrice = allPrice - food.price;
//       // console.log(food.price);
//       // console.log(lastPrice);
//       return lastPrice;
//       localStorage.write("lastPrice", lastPrice);
//     }
  },
   components: {
     cart
     }
    };
</script>

<style>
.goods {
  position: absolute;
  display: flex;
  width: 100%;
  top: 174px;
  bottom: 70px;
  overflow: hidden;
}
.goods .menu_wrapper {
  flex: 0 0 80px;
  width: 80px; /*兼容安卓手机*/
  top: 174px;
  bottom: 70px;
  background: #f3f5f7;
  overflow: auto;
  /* display:table;表格，将左侧的做成表格形式 每个li就是单元格 */
}
.goods .menu_wrapper::-webkit-scrollbar {
  display: none; /*通过伪类去掉纵向的两个滚动条*/
}
.goods .food_wrapper {
  flex: 1; /*手机屏幕的不同，食物部分的宽度不同*/
  top: 174px;
  bottom: 70px;
  overflow: auto;
}
.goods .food_wrapper ul li {
  position: relative;
  display: flex;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}
.goods .food_wrapper ul li .img-wrapper img {
  width: 57px;
  height: 57px;
}
.goods .food_wrapper::-webkit-scrollbar {
  display: none;
}
.goods .food_wrapper .selected {
  height: 26px;
  line-height: 26px;
  font-size: 12px;
  color: rgb(147, 153, 159);
  background-color: #f3f5f7;
}
.menu_wrapper .menuItem {
  display: table;
}
.menuItem .text {
  display: table-cell;
  vertical-align: middle;
  padding: 0px 12px;
  height: 54px;
  font-size: 12px;
}
.food_wrapper ul li .img-wrapper {
  /* border:1px solid green;  */
  padding: 18px 10px 18px 18px;
}
.food_wrapper ul li .text {
  display: inline-block;
  margin-top: 18px;
  /* border:1px solid red; */
}
.food_wrapper ul li .text h3 {
  font-size: 14px;
  color: rgb(7, 17, 27);
  line-height: 14px;
}
.food_wrapper ul li .text p {
  font-size: 10px;
  color: rgb(147, 153, 159);
  line-height: 10px;
  margin-top: 8px;
}
.food_wrapper ul li .text p .new-price {
  font-size: 14px;
  color: red;
  font-weight: 350;
  line-height: 24px;
}
.food_wrapper ul li .btn {
  /* display:inline-block; */
  /* border:1px solid black; */
  bottom: 17px;
  position: absolute;
  right: 18px;
  float: right;
  float: right;
  font-size: 0;
}
.food_wrapper ul li .btn a {
  display: inline-block;
  font-size: 14px;
  color: rgb(147, 153, 159);
  margin: 0 10px;
}
/* html, body {height:100%;overflow:auto;margin: 0;} */
/* html,body{ overflow-y:scroll;}  */
/* html,body{ overflow:scroll; min-height:101%;}  */
/* html{ overflow:-moz-scrollbars-vertical;}  */
/* .food_wrapper ul li .gn{
    margin-bottom:-25px;
    text-align:center;
    border:1px solid red;
    width:100px;
    margin-top: 64px;
    padding-bottom: 64px;
  } */
/* .food_wrapper ul li .gn span{
    margin: -64px 50% 0 ;
    display:block;
    border:1px solid green;
  }  */
</style>