<template>
  <div>
    <ComboBuilder />
    <div>
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
            <td><input type="checkbox" v-bind:value="combo" v-model="checkedCombos"></td>
            <td>{{index}}</td>
          </tr>
        </tbody>
      </table>
      <button class="btn btn-outline-primary" v-on:click="saveFlow">Save</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ComboBuilder from "./ComboBuilder";
import ComboPreview from "./ComboPreview";

export default {
  components: {
    ComboBuilder,
    ComboPreview
  },
  data: function() {
    return {
      checkedCombos: []
    }
  },
  computed: {
    ...mapState({
      combos: state => state.combos.all
    })
  },
  methods: {
    saveFlow: function() {
      this.$store.dispatch("flow/createFlow", this.checkedCombos);
    }
  },
  created: function() {
    this.$store.dispatch("combos/getAllCombos");
  }
};
</script>