<template>
  <span>{{preview}}</span>
</template>

<script>
export default {
  props: ["combo"],
  computed: {
      preview: function() {
          return this.combo.moves.map(m => m.shorthand).join('-');
      }
  }
};
</script>