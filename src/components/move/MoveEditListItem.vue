<template>
  <li class="list-group-item">
    <div class="form-inline">
      <div class="col-sm-2">{{move.name}} ({{move.shorthand}})</div>
      <div class="form-group col-sm-2">
        <label for="speedControl">Speed</label>
        <input
          id="speedControl"
          type="range"
          v-bind:value="move.timing"
          v-on:change="$emit('update:timing', $event.target.value)"
          class="custom-range"
          min="300"
          max="1500"
          step="100"
          style="direction: rtl"
        />
      </div>
    </div>
  </li>
</template>

<script>
export default {
  model: {
    prop: "move",
    event: "update:timing"
  },
  props: ["move"]
};
</script>

<style scoped>
</style>