<template>
  <div class="home">
    <el-container>
      <el-aside width="200px">
        <my-aside></my-aside>
      </el-aside>
      <el-container>
        <el-header>
          <my-header />
        </el-header>
        <el-main>
          <my-main />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  components: {
    MyAside: () => import('../components/pagesCommen/MyAside/'),
    MyHeader: () => import('../components/pagesCommen/MyHeader/'),
    MyMain: () => import('../components/pagesCommen/MyMain/')
  }
}
</script>

<style lang="scss" scoped>
.home{
  height: 100%;
}
.el-container {
  height: 100%;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  border-bottom: 2px solid #8888;
  background-color: #fff;
  line-height: 60px;
  padding: 0;
}

.el-aside {
  background-color: #304155;
  color: #ccc;
  height: 100%;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
   height: 100%;
   background-color: #fff;

}
</style>
