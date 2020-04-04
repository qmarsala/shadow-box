<template>
  <div>
      <ul>
          <li v-for="(combo, index) in combos" :key="index">
              {{combo.name}}
          </li>
      </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      combos: state => state.combos.all
    })
  },
  created: function() {
    this.$store.dispatch("combos/getAllCombos");
  }
};
</script>