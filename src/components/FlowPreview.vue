<template>
  <ul class="pagination pagination-sm justify-content-center flex-wrap">
    <li v-for="(move, index) in moves" :id="index" :key="index" class="page-item">
      <span class="badge badge-pill">{{move.shorthand}}</span>
    </li>
  </ul>
</template>

<script>
export default {
  props: ["moves", "currentIndex"],
  data: function() {
    return {
      currentActiveClass: "badge-success"
    };
  },
  watch: {
    currentIndex: function() {
      this.clearCurrentActive();
      this.setCurrentActive();
    }
  },
  methods: {
    clearCurrentActive: function() {
      const currentActive = document.getElementsByClassName(
        this.currentActiveClass
      );
      if (currentActive.length > 0) {
        currentActive[0].classList.remove(this.currentActiveClass);
      }
    },
    setCurrentActive: function() {
      const nextActive = document.getElementById(this.currentIndex);
      if (nextActive) {
        nextActive.classList.add(this.currentActiveClass);
      }
    }
  },
  mounted: function() {
    this.setCurrentActive();
  }
};
</script>