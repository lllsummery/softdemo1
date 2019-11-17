<template>
  <div class="el-tabs__nav">
    <el-row class="el-container">
      <el-menu :default-active="index"  style="width: 100%" class="el-menu--horizontal"  mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">首页</el-menu-item>
        <el-submenu index="2">
          <template slot="title">我的工作台</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="3" >消息中心</el-menu-item>
        <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>

      </el-menu>
    </el-row>

  </div>
</template>

<script>
    export default {
            data() {
                return {
                    index: '1',
                    activeName: 'second',
                };
            },
            methods: {
                handleSelect(key, keyPath) {
                    console.log(key, keyPath);
                },
                handleClick(tab, event) {
                    console.log(tab, event);
                }
            }
    }
</script>

<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 100px;
  }
  a {
    color: #42b983;
  }
</style>
