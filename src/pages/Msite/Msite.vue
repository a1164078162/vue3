<template>
  <div class="msite">
    <!--首页头部-->
    <Header :title="address.name || '正在定位中...'">
      <a class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </a>

      <a class="header_login" slot="right" @click="$router.push('./login')">
        <span class="header_login_text">登录|注册</span>
      </a>
    </Header>
    <!--首页导航-->
    <nav class="msite_nav border-1px">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categorys,index) in categorysArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(c,index) in categorys" :key="index">
              <div class="food_container">
                <img :src="'https://fuss10.elemecdn.com' + c.image_url" />
              </div>
              <span>{{c.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <!--首页附近商家-->
    <ShopList></ShopList>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Swiper from "swiper";
import ShopList from "../../components/ShopList/ShopList";
import "swiper/dist/css/swiper.min.css";
export default {
  computed: {
    ...mapState(["address", "categorys"]),
    //根据分类的一维数组生成二维数组
    categorysArr() {
      //取出相关数据
      const bigArr = [];
      let smallArr = [];
      const { categorys } = this;
      //计算产生结果
      this.categorys.forEach(c => {
        //将小数组放入大数组(同一个小数组只能被保存一次)
        if (smallArr.length === 0) {
          bigArr.push(smallArr);
        }
        //将分类对象放入小数组(小数组的长度最大为8)
        smallArr.push(c);
        // 如果满了，重新准备一个新的小数组
        if (smallArr.length === 8) {
          smallArr = [];
        }
      });
      //返回结果
      return bigArr;
    }
  },
  //分发action，异步获取商家列表
  mounted() {
    this.$store.dispatch("getShops");
    this.$store.dispatch("getCategorys");
    /* setTimeout(() => {
      var mySwiper = new Swiper(".swiper-container", {
        pagination: {
          el: ".swiper-pagination"
        },
        loop: true
      });
    }, 1000); */
  },
  /*
  解决创建swiper对象之后不能正常轮播
  原因是：创建对象的时机太早（必须在列表显示之后）
  解决办法：1，warch + nextTick()
  */
  watch: {
    // 更新状态数据 ==>  立即同步调用监视的回调函数===> 异步更新界面
    categorys() {
      //将回调延迟到下次DOM 更新循环之后执行。 在修改数据之后立即使用它，然后等待DOM更新
      this.$nextTick(() => {
        // 回调函数在界面更新之后执行
        // categorys数据变化
        new Swiper(".swiper-container", {
          pagination: {
            el: ".swiper-pagination"
          },
          loop: true
        });
      });
    }
  },
  components: {
    ShopList
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl'
.msite
  width 100%
  .msite_nav
    bottom-border-1px(#e4e4e4)
    margin-top 45px
    height 200px
    background #fff
    .swiper-container
      width 100%
      height 100%
      .swiper-wrapper
        width 100%
        height 100%
        .swiper-slide
          display flex
          justify-content center
          align-items flex-start
          flex-wrap wrap
          .link_to_food
            width 25%
            .food_container
              display block
              width 100%
              text-align center
              padding-bottom 10px
              font-size 0
              img
                display inline-block
                width 50px
                height 50px
            span
              display block
              width 100%
              text-align center
              font-size 13px
              color #666
      .swiper-pagination
        >span.swiper-pagination-bullet-active
          background #02a774
.profile-number
  margin-top 45.5px
  .profile-link
    clearFix()
    position relative
    display block
    background #02a774
    padding 20px 10px
    .profile_image
      float left
      width 60px
      height 60px
      border-radius 50%
      overflow hidden
      vertical-align top
      .icon-person
        background #e4e4e4
        font-size 62px
    .user-info
      float left
      margin-top 8px
      margin-left 15px
      p
        font-weight 700
        font-size 18px
        color #fff
        &.user-info-top
          padding-bottom 8px
        .user-icon
          display inline-block
          margin-left -15px
          margin-right 5px
          width 20px
          height 20px
          .icon-mobile
            font-size 30px
            vertical-align text-top
        .icon-mobile-number
          font-size 14px
          color #fff
    .arrow
      width 12px
      height 12px
      position absolute
      right 15px
      top 40%
      .icon-jiantou1
        color #fff
        font-size 5px
.profile_info_data
  bottom-border-1px(#e4e4e4)
  width 100%
  background #fff
  overflow hidden
  .info_data_list
    clearFix()
    .info_data_link
      float left
      width 33%
      text-align center
      border-right 1px solid #f1f1f1
      .info_data_top
        display block
        width 100%
        font-size 14px
        color #333
        padding 15px 5px 10px
        span
          display inline-block
          font-size 30px
          color #f90
          font-weight 700
          line-height 30px
      .info_data_bottom
        display inline-block
        font-size 14px
        color #666
        font-weight 400
        padding-bottom 10px
    .info_data_link:nth-of-type(2)
      .info_data_top
        span
          color #ff5f3e
    .info_data_link:nth-of-type(3)
      border 0
      .info_data_top
        span
          color #6ac20b
.profile_my_order
  top-border-1px(#e4e4e4)
  margin-top 10px
  background #fff
  .my_order
    display flex
    align-items center
    padding-left 15px
    >span
      display flex
      align-items center
      width 20px
      height 20px
      >.iconfont
        margin-left -10px
        font-size 30px
      .icon-order-s
        color #02a774
      .icon-jifen
        color #ff5f3e
      .icon-vip
        color #f90
      .icon-fuwu
        color #02a774
    .my_order_div
      width 100%
      border-bottom 1px solid #f1f1f1
      padding 18px 10px 18px 0
      font-size 16px
      color #333
      display flex
      justify-content space-between
      span
        display inline-block
      .my_order_icon
        float right
        width 10px
        height 10px
        .icon-jiantou1
          color #bbb
          font-size 10px
</style>
