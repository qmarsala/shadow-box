<template>
  <div id="app">
    <Naviagtion />
    <router-view></router-view>
  </div>
</template>

<script>
import Naviagtion from './components/Navigation'

export default {
  name: 'App',
  components: {
    Naviagtion
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
