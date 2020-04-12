<template>
  <li class="list-group-item">
    <div class="form-inline">
      <div class="mx-auto">{{title}}</div>
      <div class="col-sm-4 mx-auto">
        <label for="speedControl">Speed</label>
        <input
          id="speedControl"
          type="range"
          v-bind:value="timing"
          v-on:change="$emit('update:timing', $event.target.value)"
          class="custom-range"
          min="300"
          max="1500"
          step="100"
          style="direction: rtl"
        />
      </div>
      <div class="mx-auto">
        <slot></slot>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  model: {
    prop: "timing",
    event: "update:timing",
  },
  props: ["timing", "title"]
};
</script>

<style scoped>
</style>