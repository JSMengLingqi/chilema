<template>
  <div id="app">
    <router-view class="main-body"/>
    <div class="nav">
      <router-link active-class="active" to="/msite">外卖</router-link>
      <router-link active-class="active" to="/discover">发现</router-link>
      <router-link active-class="active" to="/order">订单</router-link>
      <router-link active-class="active" to="/profile">我的</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html, body, ul, li, h1, h2, h3, h4, dt, dd, dl {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
}
ul,li{ padding:0;margin:0;list-style:none}
html, body, #app{
  height: 100%;
}
#app {
  display: flex;
  flex-direction: column;
}
.nav {
  border-top: 1px solid #999;
  height: 46px;
  line-height: 46px;
  text-align: center;
  display: flex;
}
.nav a{
  flex: 1;
  text-decoration: none;
  color: #999;
}
.main-body {
  flex: 1;
  overflow-y: auto;
}
.nav a.active {
  color: #0f9dff;
  font-weight: bold;
}
</style>
