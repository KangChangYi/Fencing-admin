
<style lang='less' scoped>

</style>


<template>
  <div>
    首页
  </div>
</template>

<script>
  export default {
    name: "Index",
    data() {
      return {
      }
    },
    components: {
    },
    methods: {
    },
    created() {
      //  改变父组件面包屑
      this.$emit('changeBreadFather', '')
      this.$emit('changeBreadSon', '')
    },
  }
</script>
