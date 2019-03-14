
<style lang='less' scoped>
  @import '../../../assets/less/main.less';
  .DailyInfo-layout {
    width: 500px;
    padding: 30px 0 0 40px;
    font-size: @text;
    color: @textColor;
  }
  .cell-box {
    min-height: 60px;
    .displayCenter(@justify-content: flex-start);
    .title {
      width: 90px;
    }
    .form {
      width: 250px;
      #ToolTip {
        width: 250px;
      }
    }
    .text-optional {
      font-size: @smallText;
      color: @supportTextColor;
    }
  }
</style>

<template>
  <div class="DailyInfo-layout">
    <div class="cell-box">
      <div class="title">选择日期</div>
      <div class="form">                                                      
                                                                        <!-- :options="disableDate"  -->
        <DatePicker type="date" placeholder="选择日期" @on-change="changeDate" size="large" style="width: 250px"></DatePicker>
      </div>
    </div>
    <div class="cell-box">
      <div class="title">知识点</div>
      <div class="form">
        <Input v-model="dailyInfo.sentence" size="large" placeholder="请输入知识点" />
      </div>
    </div>
    <div class="cell-box">
      <div class="title">单词</div>
      <div class="form">
        <Input v-model="dailyInfo.english" size="large" placeholder="请输入英文单词" />
      </div>
    </div>
    <div class="cell-box">
      <div class="title">名词解释</div>
      <div class="form">
        <Tooltip id="ToolTip" content="如: n.剑术；围墙；筑围栏的材料" placement="right">
          <Input v-model="noun" size="large" placeholder="请输入名词翻译" />
        </Tooltip>
      </div>
      <span class="text-optional">(可选填)</span>
    </div>
    <div class="cell-box">
      <div class="title">动词解释</div>
      <div class="form">
        <Tooltip id="ToolTip" content="如: v. 击剑（fence的现在分词）；围以围栏" placement="right">
          <Input v-model="verb" size="large" placeholder="请输入动词翻译" />
        </Tooltip>
      </div>
      <span class="text-optional">(可选填)</span>
    </div>
    <div class="cell-box">
      <div class="title">形容词解释</div>
      <div class="form">
        <Tooltip id="ToolTip" content="如: adj. 有趣的，好玩的，逗人笑的" placement="right">
          <Input v-model="adj" size="large" placeholder="请输入动词翻译" />
        </Tooltip>
      </div>
      <span class="text-optional">(可选填)</span>
    </div>
    <div class="cell-box">
      <div class="title">其他解释</div>
      <div class="form">
        <Tooltip id="ToolTip" content="代词/副词/连词/介词/冠词" placement="right">
          <Input v-model="other" size="large" placeholder="请输入动词翻译" />
        </Tooltip>
      </div>
      <span class="text-optional">(可选填)</span>
    </div>
    <div class="cell-box" style="marin:0px;">
      <div class="title">每日图片</div>
      <div class="form">
        <Cropper :width="width" :height="height" imgtype="Base" v-on:datafromCropper="datafromCropper"></Cropper>
      </div>
    </div>
    <div class="cell-box" style="marin:0px;">
      <div class="title"></div>
      <div class="form">
        <Button type="success" @click="clickSubmit" :loading="buttonLoading" size="large" long>提 交</Button>
      </div>
    </div>
  </div>
</template>

<script>
  import GLOBAL from './../../../assets/GLOBAL.vue'
  import Cropper from './../../../components/Cropper.vue'
  export default {
    name: "DailyInfoAdd",
    data() {
      return {
        // 截图子组件宽高
        width: 340,
        height: 200,
        // 名词
        noun: '',
        // 动词
        verb: '',
        // 形容词
        adj: '',
        // 其他解释
        other: '',
        // 表单对象
        dailyInfo: {
          date: '',
          sentence: '',
          english: '',
          chinese: '',
          picture: ''
        },
        // 按钮加载
        buttonLoading: false,
        // 禁用日期
        // disableDate: {
        //   disabledDate(date) {
        //     return date && date.valueOf() < Date.now() - 86400000;
        //   }
        // },
      }
    },
    components: {
      Cropper
    },
    computed: {
      CHINESE() {
        const chinese = this.noun + '}' + this.verb + '}' + this.adj + '}' + this.other +'}'
        return chinese
      }
    },
    methods: {
      changeDate(date) {
        const DATE = date
        this.dailyInfo.date = DATE
      },
      datafromCropper(data) {
        const _CropperInfo = data
        this.dailyInfo.picture = _CropperInfo
      },
      // 提交
      clickSubmit() {
        this.dailyInfo.chinese = this.CHINESE
        const {
          date,
          sentence,
          english,
          chinese,
          picture
        } = this.dailyInfo
        this.$http.post(GLOBAL.URL + 'daily/insert', {
          date: date,
          sentence: sentence,
          english: english,
          chinese: chinese,
          picture: picture
        }).then(res => {
          if (res.data.msg === '成功') {
            this.$Message.success({
              content:'提交成功',
              duration:5
            })
          }
        }, err => {})
      }
    },
    created() {
      // 修改面包屑
      this.$emit("changeBreadSon", 'Daily-info 添加')
    }
  }
</script>

