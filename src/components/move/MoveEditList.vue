<template>
  <ul class="list-group list-group">
    <MoveEditListItem
      v-for="(move, index) in moves"
      v-bind:key="index"
      class="list-group-item"
      v-bind:title="`${move.name} (${move.shorthand})`"
      v-bind:timing="move.timing"
      v-on:update:timing="move.timing = $event"
    >
      <button class="btn btn-sm btn-outline-danger" v-on:click="$delete(moves, index)">Remove</button>
    </MoveEditListItem>
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