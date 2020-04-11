<template>
  <form class="form-inline">
    <div class="form-group mb-2">
      <label for="new-combo-name">Combo Name:</label>
      <input class="form-control" id="new-combo-name" v-model="comboName" />
    </div>
    <div class="form-group mx-sm-3 mb-2">
      <label for="selected-move">Move:</label>
      <select class="form-control" id="selected-move" v-model="selectedMove">
        <option v-for="move in moves" v-bind:key="move.shorthand" v-bind:value="move">{{ move.name }}</option>
      </select>
    </div>
    <div class="btn-group">
      <button type="button" class="btn btn-secondary" v-on:click="addMove()">Add move</button>
      <button type="button" class="btn btn-secondary" v-on:click="addCombo()">Create Combo</button>
    </div>
  </form>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data: function() {
    return {
      comboName: "",
      newMoves: [],
      selectedMove: {}
    };
  },
  computed: {
    ...mapState({
      moves: state => state.moves.all
    })
  },
  methods: {
    addMove: function() {
      this.newMoves.push(this.selectedMove);
      this.selectedMove = {};
    },
    addCombo: function() {
      const combo = {name: this.comboName, moves: this.newMoves};
      this.$store.dispatch('combos/createCombo', combo);
      this.comboName = "";
      this.selectedMove = {};
      this.newMoves = [];
    }
  },
  created: function() {
    this.$store.dispatch("moves/getAllMoves");
  }
};
</script>

<style scoped>
</style>