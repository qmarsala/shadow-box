<template>
  <li>
    <div class="form-row row-cols-1 row-cols-sm-4 text-center">
      <div class="col"><h5>{{title}}</h5></div>
      <div class="col">
         <label for="speedControl">Speed:</label>
      </div>
      <div class="col">
        <input
          id="speedControl"
          type="range"
          v-bind:value="timing"
          v-on:change="$emit('update:timing', parseInt($event.target.value))"
          class="custom-range"
          min="300"
          max="1500"
          step="100"
          style="direction: rtl"
        />
      </div>
      <div class="col">
        <slot></slot>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  model: {
    prop: "timing",
    event: "update:timing"
  },
  props: ["timing", "title"]
};
</script>

<style scoped>
</style>