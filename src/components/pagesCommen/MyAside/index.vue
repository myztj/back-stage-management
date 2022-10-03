<template>
  <div>
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      background-color="#304155"
      text-color="rgb(191, 203, 217)"
      active-text-color="#409eff"
      router
    >
        <el-menu-item index="/index">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="/blog">
        <template slot="title">
          <i class="el-icon-notebook-2"></i>
          <span>博客管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/blog/article">
            <i class="el-icon-notebook-1"></i>
            文章管理
            </el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/blog/category">
            <i class="el-icon-tickets"></i>
            分类管理
            </el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/blog/label">
            <i class="el-icon-collection-tag"></i>
            标签管理
            </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/advert">
        <i class="el-icon-picture-outline-round"></i>
        <span slot="title">广告管理</span>
      </el-menu-item>
      <el-submenu index="/system">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>系统管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/system/user">
            <i class="el-icon-user-solid"></i>
            用户管理
            </el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/system/role">
            <i class="el-icon-coin"></i>
            角色管理
            </el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/system/menu">
            <i class="el-icon-menu"></i>
            菜单管理
            </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="4">
        <i class="el-icon-link"></i>
        <span slot="title"><router-link to="http://baidu.com">积云教育官方</router-link></span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'my-aside'
}
</script>

<style></style>
