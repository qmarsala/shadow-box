<template>
  <ul class="pagination pagination-sm justify-content-center">
    <li v-for="(move, index) in moves" :id="index" :key="index" class="page-item">
      <span class="badge badge-pill">{{move.shorthand}}</span>
    </li>
  </ul>
</template>

<script>
export default {
  props: ["moves", "currentIndex"],
  watch: {
    currentIndex: function() {
      const currentActiveClass = "badge-primary";
      const currentActive = document.getElementsByClassName(currentActiveClass);
      if (currentActive.length > 0) {
        currentActive[0].classList.remove(currentActiveClass);
      }
      const nextActive = document.getElementById(this.currentIndex);
      if (nextActive) {
        nextActive.classList.add(currentActiveClass);
      }
    }
  }
};
</script>