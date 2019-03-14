
<style lang="less" scoped>
  @import '../../assets/less/main.less';
  .menuItem {
    background: #001529;
    .displayCenter(@justify-content: flex-start);
    span {
      font-size: @text;
    }
  }
  .header {
    background: #fff;
    padding: 0;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
  }
  .bread-avatar-box {
    .displayCenter(@justify-content: space-between);
  }
  .Content-box {
    margin: 20px;
    background: #fff; // box-shadow: 0 0px 3px rgba(0, 0, 0, 0.15);
  } // 面包屑
  .bread-item {
    color: @textColor;
    cursor: pointer;
    transition: all 0.3s;
  }
  .bread-item:hover {
    color: rgb(97, 153, 245);
  }
  /* 改变menu的点击态 */
  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu),
  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu):hover,
  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu),
  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu):hover {
    background: #000c17;
  }
</style>


<template>
  <Layout :style="{minHeight: '100vh'}">
    <!-- 导航栏部分 -->
    <Sider width='240' style="background:#001529;">
      <Menu theme="dark" width="auto">
        <!-- 跳转部分 -->
        <router-link :to="{name:'DailyInfoManage'}">
          <MenuItem name="1-1" class="menuItem">
          <Icon type="md-time" size="24" />
          <span>Daily-Info管理</span>
          </MenuItem>
        </router-link>
        <router-link :to="{name:'UserInfoManage'}">
          <MenuItem name="1-2" class="menuItem">
          <Icon type="md-person" size="24" />
          <span>用户资料管理</span>
          </MenuItem>
        </router-link>
        <!-- 跳转部分 -->
      </Menu>
    </Sider>
    <Layout>
      <!-- 头部 -->
      <Header class="header">
        <div class="bread-avatar-box">
          <Breadcrumb :style="{marginLeft: '20px'}">
            <!-- 面包屑一级 -->
            <BreadcrumbItem>
              <router-link :to="{ name: 'Index'}">首页</router-link>
            </BreadcrumbItem>
            <!-- 面包屑二级 -->
            <BreadcrumbItem v-if="fatherBreadcrumb">
              <span id="fatherBread" @click="sonBreadcrumb==''?'':clickSecondBread()" class="bread-item">{{fatherBreadcrumb}}</span>
            </BreadcrumbItem>
             <!-- 面包屑三级 -->
            <BreadcrumbItem v-if="sonBreadcrumb">{{sonBreadcrumb}}</BreadcrumbItem>
          </Breadcrumb>
          <User/>
        </div>
      </Header>
      <!-- 内容 -->
      <Content class="Content-box">
        <!-- 路由 -->
        <router-view v-on:changeBreadSon="changeBreadSon" v-on:changeBreadFather="changeBreadFather"> </router-view>
      </Content>
    </Layout>
  </Layout>
</template>

<script>
  import User from "./../../components/User.vue";
  export default {
    name: "Navigate",
    data() {
      return {
        fatherBreadcrumb: "",
        sonBreadcrumb: "",
      }
    },
    components: {
      User
    },
    methods: {
      // 改变面包屑
      changeBreadFather(value) {
        this.fatherBreadcrumb = value;
      },
      changeBreadSon(value) {
        this.sonBreadcrumb = value;
      },
      // 点击二级面包屑返回一层
      clickSecondBread() {
        this.$router.go(-1);
      },
    },
    created() {},
  }
</script>
