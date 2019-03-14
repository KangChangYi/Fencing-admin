
<style lang='less' scoped>
  @import '../../../assets/less/main.less';
  .UserInfo-Manage-layout {
    padding: 30px;
  }
  .UserInfo-title {
    font-size: 35px;
    color: @titleColor;
    margin-bottom: 10px;
    .displayCenter(@justify-content: flex-start);
    span {
      margin-right: 5px;
    }
  }
  .UserInfo-table {
    border-bottom: 1px #DFDFDF solid;
    padding-bottom: 20px;
  }
  .UserInfo-paging {
    .displayCenter();
    margin-top: 20px;
  }
</style>

<template>
  <div id="app" class="UserInfo-Manage-layout">
    <!-- 标题 -->
    <div class="UserInfo-title">
      <span>用户资料管理</span>
      <Icon type="md-person" size='40' />
    </div>
    <!-- 表格 -->
    <div class="UserInfo-table">
      <Table :columns="tableInfo" border stripe :data="data">
        <template slot-scope="{ row, index }" slot="action">
                                                 <Button type='error' @click="clickDelete(row,index)">删除</Button>
</template>
      </Table>
    </div>
    <!-- 分页 -->
    <div class="UserInfo-paging">
      <page :total="this.totalCount" :page-size="10" show-elevator @on-change="changePage" />
    </div>
  </div>
</template>

<script>
  import GLOBAL from '../../../assets/GLOBAL.vue'
  export default {
    name: "UserInfoManage",
    data() {
      return {
        // 分页总条数
        totalCount: 40,
        // 表格格式和数据
        tableInfo: [{
            title: '姓名',
            key: 'name',
            width: 120,
            tooltip: 'true',
            fixed: 'left',
            align: "center",
          },
          {
            title: '性别',
            key: 'sex',
            minWidth: 150,
            tooltip: 'true',
            align: "center",
          },
          {
            title: '电话',
            key: 'telphone',
            minWidth: 150,
            align: "center",
          },
          {
            title: '地址',
            key: 'address',
            minWidth: 150,
            align: "center",
          },
          {
            title: '生日',
            key: 'birth',
            minWidth: 150,
            align: "center",
          },
          {
            title: '操作',
            slot: 'action',
            width: 95,
            align: "center",
          }
        ],
        data: []
      }
    },
    methods: {
      // 换页
      changePage(currentPage) {
        // 用户信息列表切换页码
        this.$http.get(GLOBAL.URL + "user/list", {
          params: {
            limit: 10,
            page: currentPage
          }
        }).then(res => {
          this.data = res.body.data.list
        })
      },
      // 删除
      clickDelete(row, index) {
        // 弹出框
        this.$Modal.confirm({
          title: '<font size=4 >确定删除？</font>',
          onOk: () => {
            const OPENID = row.openId
            //请求服务器
            this.$http.delete(GLOBAL.URL + "user/delete", {
              params: {
                openId: OPENID
              }
            }).then(res => {
              if (res.data.msg === "成功") {
                this.$Message.success("删除成功")
                this.data.splice(index, 1);
              }
            }, err => {
              this.$Message.error("删除失败")
            })
          },
          onCancel: () => {
            this.$Message.warning('取消');
          }
        });
      }
    },
    created() {
      // 改变面包屑
      this.$emit("changeBreadFather", '用户资料管理')
      this.$emit("changeBreadSon", '')
      // 获取用户信息列表
      this.$http.get(GLOBAL.URL + "user/list", {
        params: {
          limit: 10,
          page: 1
        }
      }).then(res => {
        this.data = res.body.data.list
        this.totalCount = res.body.data.totalCount
      })
    }
  }
</script>