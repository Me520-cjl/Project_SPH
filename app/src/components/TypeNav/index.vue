<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveIndex()" @mouseenter="entershow()">
        <h2 class="all">全部商品分类</h2>
        <!-- 过度动画 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <!-- 利用事件委派+编程式导航实现路由的跳转和传递参数 -->
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex == index }"
              >
                <!-- 一级分类 -->
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-categoryId1="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <!-- 二级分类 -->
                  <div class="subitem">
                    <dl
                      class="fore"
                      v-for="c2 in c1.categoryChild"
                      :key="c2.categoryId"
                    >
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-categoryId2="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-categoryId3="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
//引入方式，把lodash所有功能函数引入
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      //存储用户鼠标上移哪一个一级分类
      currentIndex: -1,
      show: true,
    };
  },
  //组件挂载完毕，可以向服务器发请求
  mounted() {
    //通知Vuex发请求，获取数据，存储在仓库中
    this.$store.dispatch("categoryList");
    //当组件挂载完毕，让show属性变为false
    //如果不是home路由组件，将typanav进行隐藏
    if (this.$route.path != "/home" && this.$route.path != "/") {
      this.show = false;
    }
  },
  methods: {
    //鼠标进入修改样式currentIndex的属性
    //throttle回调函数别调用箭头函数，可能出现上下文this问题
    changeIndex: throttle(function (index) {
      //index：鼠标移上某一个一级分类的元素的索引值
      //正常情况下（用户慢慢的操作）：鼠标进入，每一个一级分类都会触发鼠标进入事件
      //非正常情况（用户操作很快）：只有部分一级分类触发了事件，就是用户行为过快，导致浏览器反应不过来，如果当前函数中有大量业务，浏览器可能反应不过来
      this.currentIndex = index;
    }, 50),
    //鼠标离开修改样式currentIndex的属性
    leaveIndex() {
      this.currentIndex = -1;
      if (this.$route.path !== "/"&&this.$route.path !== "/home") {
        console.log(this.$route.path);
        this.show = true;
      }
    },
    goSearch(event) {
      //最好的方案：编程式导航+事件委派
      //存在一些问题：事件委派是把所有的子节点【h3\dt\dl\dm】的事件委派给了父亲节点
      //点击a标签的时候，才会进行路由的跳转，【怎么能确定点击的一定是a标签】
      //存在另外一个问题：即使你能确定点击的是a标签，如何区分是一级、二级、三级分类的标签

      //第一个问题：把子节点当中的a标签,加上自定义属性data-categoryName，其余的子节点是没有的
      // this.show = false;
      let element = event.target;
      //获取到触发当前事件的节点
      //节点有一点儿属性dataset,可以获取到当前自定义节点的属性和属性值
      let { categoryname, categoryid1, categoryid2, categoryid3 } =
        element.dataset;
      if (categoryname) {
        //整理路由跳转的参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        //一级分类、二级分类、三级分类
        if (categoryid1) {
          query.categoryid1 = categoryid1;
        } else if (categoryid2) {
          query.categoryid2 = categoryid2;
        } else {
          query.categoryid3 = categoryid3;
        }
        if (this.$route.params) {
          //整理完参数
          location.query = query;
          location.params = this.$route.params;
          //路由跳转
          this.$router.push(location);
        }
      }
    },
    entershow() {
      this.show = true;
    },
  },
  computed: {
    //右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
    //注入一个参数state，其实即为大仓库的数据
    ...mapState({
      categoryList: (state) => {
        return state.home.categoryList;
      },
    }),
  },
};
</script>
<style scoped lang='less'>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .cur {
          background: skyblue;
        }
      }
    }
    //过度动画的样式
    //过度动画的开始状态
    .sort-enter {
      height: 0;
    }
    //过度动画结束状态
    .sort-enter-to {
      height: 461px;
    }
    //定义动画时间、速率
    .sort-enter-active {
      transition: all 0.5s linear;
    }
  }
}
</style>