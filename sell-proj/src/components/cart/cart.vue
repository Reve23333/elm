<template>
    <div class="cart">
        <div class="left-part">
            <span v-if="countNum>0"  class="circle">{{countNum}}</span>
            <span class="part01-bk" @click.stop="showDetail"><span class="part01"><i class="iconfont">&#xe600;</i></span></span>
            <span class="part02">￥{{total}}</span>
            <span class="divider"><span class="part03">另需配送费￥{{seller.deliveryPrice}}</span></span>
        </div>
        <div class="right-part">
            <span  class="sendingReq"><span v-if="minPrice>0">还差￥{{minPrice}}元起送</span><span v-else class='goPay' @click="goPay">去结算</span></span>
        </div>
        <div v-if="countNum>0" v-show="detailShow" class="cart-detail">
            <div class="choose">
                <div class="title">
                    <span class="title-detail">购物车</span>
                    <span class="clean" @click='clean'>清空</span>
                    <ul>
                        <li v-for='(cartFood,index) in cartFoods' :key="index">
                            <span class="cartFood-name">{{cartFood.name}}</span>
                            <span class="cartFood-price">￥{{cartFood.price}}</span>
                            <span class="btn">
                                <span class="iconfont sub" @click=sub(cartFood) style="color:#1A94E6;">&#xe619;</span>
                                <span class="fondCount">{{cartFood.count}}</span>
                                <span class="iconfont" @click=add(cartFood) style="color:#1A94E6;">&#xe653;</span>
                            </span>
                        </li>
                    </ul>
                </div>
            </div> 
        </div>
    </div>
</template>

<script>
import localStorage from "../../localStorage/localStorage.js"
import {MessageBox} from 'mint-ui'
export default {
    mounted(){
        // console.log(this.$store.state.cart);
    },
    data(){
        return{
            detailShow:false,
        }
    },
    computed:{
        seller(){
            return this.$store.state.seller
        },
        cartFoods(){
            return this.$store.state.cart
        },
        total(){
            let cart=this.$store.state.cart
            let total=0
            for(let i=0;i<cart.length;i++){
                if(cart[i]){
                    total+=cart[i].count*cart[i].price
                }
            }
            return total
        },
        countNum(){
            let allNum = 0;
            if(this.$store.state.cart.length==0){
                return '';
            }else{
                for(let i = 0; i<this.cartFoods.length; i++){
                allNum += this.cartFoods[i].count
            }
            return allNum;
            }
        },
        minPrice(){
            if(this.seller.minPrice-this.total>0){
                this.sending=false
                return this.seller.minPrice-this.total
            }else{
                this.sending=true
                return 0
            }

        }
    },
   
    methods:{
        clean(){
            MessageBox.confirm('清空购物车').then(action=>{
                if(action=='confirm'){
                    this.$store.commit('clean')
                }
            }).catch(err=>{
                if(err=='cancel'){
                    console.log("cancel")
                }
            })
        },
        goPay(){
            MessageBox.confirm('确认提交订单').then(action=>{
                if(action=="confirm"){
                    this.$store.commit('clean')
                }
            }).catch(err=>{
                if(err=="cancel"){
                    console.log('cancel')
                }
            })
        },
        showDetail(){
            if(this.detailShow==false){
                this.detailShow=true;
            }else{
                this.detailShow=false;
            }
        },
        add(food){
            food.count++
            this.$store.state.goods[food.cateIndex].cateCount++
            this.$store.commit('add',{food})
        },
        sub(food){
            food.count--
            this.$store.state.goods[food.cateIndex].cateCount--
            this.$store.commit('sub',{food})
        },
    }
    
}
</script>

<style>
    .cart{
        background:#141d27;
        height:67px;
        position:absolute;
        bottom:0;
        width:100%;
        right:0;
        display:flex;
        z-index:1
    }
    .cart .left-part{
        position:relative;
        width:310px;
    }
    .cart .left-part span{
        color:rgba(255,255,255,0.4);
        text-align:center;
    }
    .cart .left-part .part01-bk{
        margin-left:18px;
        text-align:center;
        width:85px;
        height:85px;
        line-height:80px;
        display:inline-block;
        border-radius:50%;
        margin-top:-20px;
        background:#141d27;
    }
    .cart .left-part .part01{
        width:67px;
        height:67px;
        display:inline-block;
        /* margin-left:18px; */
        background:rgba(54, 55, 58,1);
        line-height:60px;
        border-radius:50%;
        margin-top:8px;
    }
    .cart .left-part .part01 i{
        display:inline-block;
        font-size:40px;
        margin-top:8px;
    }
    .cart .left-part .part02{
        /* margin-left:10px; */
        display:inline-block;
        width:50px;
        font-size:18px;
        font-weight:350px;
    }
    .cart .left-part .divider{
        border-left:1px solid rgba(255,255,255,0.1);
        padding:12px;
    }
    .cart .left-part .part03{
        display:inline-block;
        font-size:16px;
    }
    .cart .right-part{
        margin-right:0;
        width:105px;
        text-align:center;
        line-height:67px;
        font-size:12px;
        background:rgba(255, 255, 255,0.1);
        font-weight:48px;
    }
    .gopay{
    color:#fff;
    }   
    /* .sending{
    padding:27.5px;
    background-color:rgba(27, 209, 42, 0.7);
    color:#fff;
    position:relative;
    margin-right:-14px;;
    } */
    .cart .right-part span{
        color:rgba(255,255,255,0.4);
    }
    .cart .left-part  .circle{
        position:absolute;
        color:#fff;
        background: rgb(240,20,20);
        font-size:18px;
        font-weight:9px;
        width:30px;
        height:20px;
        left:90px;
        top:-15px;
        border-radius:40px;
    }
    .cart .cart-detail{
        width:100%;
        height:100%;
        top:-67px;
        position:fixed;
        z-index:-1;
        background:rgba(7,17,27,0.6);
    }
    .cart .cart-detail .choose{
        position:absolute;
        bottom:0;
        background:#fff;
        width:100%;
        height:305px;
    }
    .cart .cart-detail .choose .title{
        width:100%;
        height:40px;
        background:#f3f5f7;
        margin-top:-25px;
        border-bottom:1px solid rgba(7,17,27,0.1);   
    }
    .cart .cart-detail .choose .title .title-detail{
        font-size:14px;
        font-weight:200;
        color:rgb(7,17,27);
        position:relative;
        top:14px;
        /* line-height:40px; */
        margin-left:18px;
    }
    .cart .cart-detail .choose .title .clean{
        font-size:12px;
        color:rgb(0,160,220);
        position: absolute;
        right: 18px;
        line-height: 40px;
    }
    .cart .cart-detail .choose .title ul{
        margin-top:30px;
        overflow:auto;
        height:250px;
    }
    .cart .cart-detail .choose .title ul::-webkit-scrollbar{
        display:none;
    }
    .cart .cart-detail .choose .title ul li{
        width:92%;
        border-bottom:1px solid rgba(7,17,27,0.1);
        margin-left:14px;
        padding:18px 0;
        position:relative;
        
    }
    .cart .cart-detail .choose .title ul li .cartFood-name,
    .cart .cart-detail .choose .title ul li .cartFood-price{
        font-size:14px;
        color:rgb(7,17,27);
    }
    .cart .cart-detail .choose .title ul li .cartFood-price{
        position:absolute;
        right:40%;
    }
    .cart .cart-detail .choose .title ul li .btn{
        position:absolute;
        right:5%; 
    }
</style>