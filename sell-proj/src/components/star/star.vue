<template>
  <div class="star">
      <span v-for="(iClass,index) in stars" class="item" :class="iClass" :key="index"></span>
  </div>
</template>

<script>
export default {
    props:{
        score:0
    },
    computed:{
        stars(){
            let onCnt = parseInt(this.score);
            let halfCnt = this.score-onCnt<0.5?0:1;
            let result = ['offStar','offStar','offStar','offStar','offStar'];
            for(var i = 0; i < onCnt; i++){ //var 不能改成let，因为let定义的作用域是局部的，yao改成let
                result[i]='onStar';
            }
            if(halfCnt>0) result[i]='halfStar'; //上面改成let，这里的i就要改成onCnt
            return result;
        }
    }
}
</script>

<style>
    .item{
        display:inline-block;
        width:20px;
        height:20px;
    }
    .onStar{
		background: url('./img/star24_on@2x.png');
		background-repeat: no-repeat;
	}
	.offStar{
		background: url('./img/star24_off@2x.png');
		background-repeat: no-repeat;
	}
	.halfStar{
		background: url('./img/star24_half@2x.png');
		background-repeat: no-repeat;
	}
</style>