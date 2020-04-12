<template>
  <ul class="list-group">
    <MoveEditListItem v-for="(move, index) in moves" v-bind:key="index" v-bind:move="move" v-on:update:timing="move.timing = $event" />
  </ul>
</template>

<script>
import MoveEditListItem from "./MoveEditListItem";
export default {
  props: ["moves"],
  components: {
    MoveEditListItem
  }
};
</script>

<style scoped>
</style>