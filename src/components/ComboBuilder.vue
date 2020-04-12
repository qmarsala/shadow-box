<template>
  <div>
    <h3 class="display-6">New Combo</h3>
    <form>
      <div class="input-group mx-auto my-3 col-sm-6">
        <select class="custom-select" v-model="selectedMove">
          <option value="undefined" disabled selected>Choose a move...</option>
          <option
            v-for="move in moves"
            v-bind:key="move.shorthand"
            v-bind:value="move"
          >{{ move.name }}</option>
        </select>
        <div class="input-group-append">
          <button type="button" class="btn btn-outline-info" v-on:click="addMove">Add move</button>
        </div>
      </div>
    </form>

    <MoveEditList class="col-sm-5 mx-auto" v-bind:moves="newMoves" />
    
    <form>
      <div class="input-group mx-auto my-3 col-sm-6">
        <input type="text" class="form-control" placeholder="Combo Name" v-model="comboName" />
        <div class="input-group-append">
          <button type="button" class="btn btn-outline-success" v-on:click="addCombo">Create Combo</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import MoveEditList from "./move/MoveEditList";
import { mapState } from "vuex";
export default {
  components: {
    MoveEditList
  },
  data: function() {
    return {
      comboName: "",
      newMoves: [],
      selectedMove: undefined
    };
  },
  computed: {
    ...mapState({
      moves: state => state.moves.all
    })
  },
  methods: {
    addMove: function() {
      console.log(this.selectedMove);
      if (!this.selectedMove) return;

      this.newMoves.push({ ...this.selectedMove });
      this.selectedMove = undefined;
    },
    addCombo: function() {
      if (this.comboName == "" || this.newMoves.length < 1) return;

      const combo = { name: this.comboName, moves: this.newMoves };
      this.$store.dispatch("combos/createCombo", combo);
      this.comboName = "";
      this.selectedMove = undefined;
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