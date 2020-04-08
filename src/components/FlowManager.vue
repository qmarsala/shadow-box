<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Preview</th>
        <th scope="col">Include in flow</th>
        <th scope="col">Order</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(combo, index) in combos" :key="index">
        <th scope="row">{{combo.name}}</th>
        <td><ComboPreview v-bind:combo="combo" /></td>
        <td><input type="checkbox" checked></td>
        <td>{{index}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapState } from "vuex";
import ComboPreview from "./ComboPreview";

export default {
  components: {
    ComboPreview
  },
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