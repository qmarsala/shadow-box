<template>
  <form class="form-inline">
    <div class="form-group mb-2">
      <label for="new-combo-name">Combo Name:</label>
      <input class="form-control" id="new-combo-name" v-model="comboName" />
    </div>
    <div class="form-group mx-sm-3 mb-2">
      <label for="selected-move">Move:</label>
      <select class="form-control" id="selected-move" v-model="selectedMove">
        <option v-for="move in moves" v-bind:key="move.id" v-bind:value="move">{{ move.name }}</option>
      </select>
    </div>
    <div class="btn-group">
      <button type="button" class="btn btn-secondary" v-on:click="addMove()">Add move</button>
      <button type="button" class="btn btn-secondary" v-on:click="addCombo()">Create Combo</button>
    </div>
  </form>
</template>

<script>
export default {
  data: function() {
    return {
      comboName: "",
      moves: [
        { name: "Jab", shorthand: "1" },
        { name: "Cross", shorthand: "2" },
        { name: "Lead Hook", shorthand: "3" },
        { name: "Hook", shorthand: "4" },
        { name: "Lead Uppercut", shorthand: "5" },
        { name: "Uppercut", shorthand: "6" },
        { name: "Slip", shorthand: "S" },
        { name: "Roll", shorthand: "R" },
        { name: "Block", shorthand: "B" }
      ],
      newMoves: [],
      selectedMove: ""
    };
  },
  methods: {
    addMove: function() {
      this.newMoves.push({name: this.selectedMove.name, shorthand: this.selectedMove.shorthand});
      this.selectedMove = "";
    },
    addCombo: function() {
      const combo = {name: this.comboName, moves: this.newMoves, moveTiming: 600};
      this.$store.dispatch('combos/createCombo', combo);
      this.newMoves = [];
      this.selectedMove = "";
    }
  }
};
</script>

<style scoped>
</style>