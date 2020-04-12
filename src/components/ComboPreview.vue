<template>
  <span>{{preview}}</span>
</template>

<script>
export default {
  props: ["combo"],
  computed: {
      preview: function() {
          return this.combo.moves
            .map(m => `${m.shorthand}${this.getSeperator(m.timing)}`)
            .join('');
      }
  },
  methods: {
    getSeperator(timing) {
      if(timing <= 600) {
        return '-';
      }
      if (timing > 600 && timing <= 1000) {
        return '--';
      }
      if (timing > 1000) {
        return '---';
      }
    }
  }
};
</script>