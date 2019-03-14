
<style lang='less' scoped>
  @import '../../../assets/less/main.less';
  .DailyInfo-Manage-layout {
    padding: 30px;
  }
  .DailyInfo-title {
    font-size: 35px;
    color: @titleColor;
    margin-bottom: 10px;
    .displayCenter(@justify-content: flex-start);
    span {
      margin-right: 5px;
    }
  }
  .DailyInfo-Add-button {
    margin-bottom: 20px;
  }
  .DailyInfo-table {
    border-bottom: 1px #DFDFDF solid;
    padding-bottom: 20px;
    .showImg {
      cursor: pointer;
      color: #358fb9;
    }
    img {
      width: 310px;
      height: 200px;
    }
  }
  .DailyInfo-paging {
    .displayCenter();
    margin-top: 20px;
  }
</style>

<template>
  <div id="app" class="DailyInfo-Manage-layout">
    <!-- 标题 -->
    <div class="DailyInfo-title">
      <span>Daily-Info管理</span>
      <Icon type="md-time" size='40' />
    </div>
    <!-- 按钮 -->
    <div class="DailyInfo-Add-button">
      <Button type="success" @click="goToDailyInfoAdd">Daily-Info添加
                                           <Icon type="md-add" />
                                         </Button>
    </div>
    <!-- 表格 -->
    <div class="DailyInfo-table">
      <Table :columns="tableInfo" border stripe :data="data">
        <template slot-scope="{ row }" slot="image">
                                             <Tooltip placement="left" max-width="350" theme="light">
                                               <span class="showImg">查看图片</span>
                                               <img slot="content" :src="row.picture" />
                                             </Tooltip>
</template>
<template slot-scope="{ row, index }" slot="action">
  <Button type='error' @click="clickDelete(row,index)">删除</Button>
</template>
      </Table>
    </div>
     <!-- 分页 -->
    <div class="DailyInfo-paging">
      <page :total="this.totalCount" :page-size="10" show-elevator @on-change="changePage" />
    </div>
  </div>
</template>

<script>
  import GLOBAL from '../../../assets/GLOBAL.vue'
  export default {
    name: "DailyInfoManage",
    data() {
      return {
        // 分页总条数
        totalCount: 0,
        // 表格格式和数据
        tableInfo: [{
            title: '日期',
            key: 'date',
            width: 120,
            tooltip: 'true',
            fixed: 'left',
            align: "center"
          },
          {
            title: '知识点',
            key: 'sentence',
            minWidth: 150,
            tooltip: 'true',
            align: "center"
          },
          {
            title: '单词',
            key: 'english',
            minWidth: 150,
            align: "center"
          },
          {
            title: '单词解释',
            key: 'chinese',
            minWidth: 150,
            align: "center"
          },
          {
            title: '图片',
            slot: 'image',
            width: 85,
            align: "center"
          },
          {
            title: '操作',
            slot: 'action',
            width: 95,
            align: "center"
          }
        ],
        data: []
      }
    },
    methods: {
      // 删除  （row=行内数据  index=下标）
      clickDelete(row, index) {
        const that = this
        const DELETE_DATE = row.date
        // 弹出框
        this.$Modal.confirm({
          title: '<font size=4 >确定删除？</font>',
          onOk: () => {
            // 请求删除接口
            this.$http.delete(GLOBAL.URL + 'daily/delete', {
              params: {
                date: DELETE_DATE
              }
            }).then(res => {
              if (res.body.msg === '成功') {
                that.data.splice(index, 1)
                this.$Message.success('删除成功');
              }
            }, err => {})
          },
          onCancel: () => {
            this.$Message.warning('取消');
          }
        });
      },
      // 换页
      changePage(currentPage) {
        this.$http.get(GLOBAL.URL + "daily/list", {
          params: {
            limit: 10,
            page: currentPage
          }
        }).then(res => {
          this.totalCount = res.data.data.totalCount
          this.data = res.data.data.list
        }, err => {})
      },
      goToDailyInfoAdd() {
        this.$router.push({
          name: 'DailyInfoAdd'
        })
      }
    },
    created() {
      // 改变面包屑
      this.$emit("changeBreadFather", 'Daily Info管理')
      this.$emit("changeBreadSon", '')
      // 获取每日一图列表
      this.$http.get(GLOBAL.URL + "daily/list", {
        params: {
          limit: 10,
          page: 1
        }
      }).then(res => {
        this.totalCount = res.data.data.totalCount
        this.data = res.data.data.list
      }, err => {})
    }
  }
</script>

