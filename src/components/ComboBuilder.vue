<template>
  <div>
    <h3>New Combo</h3>
    <div>{{shorthand}}</div>
    <div class="form my-3">
      <div class="my-3">
        <input type="text" class="form-control" placeholder="Combo Name" v-model="combo.name" />
      </div>
      <div class="row row-cols-1 row-cols-sm-2">
        <div class="col">
          <select class="custom-select" v-model="selectedMove">
            <option value="undefined" disabled selected>Choose a move...</option>
            <option
              v-for="move in moves"
              v-bind:key="move.shorthand"
              v-bind:value="move"
            >{{ move.name }}</option>
          </select>
        </div>
        <div class="col">
          <button type="button" class="btn btn-outline-info w-100 my-1 my-sm-0" v-on:click="addMove">Add move</button>
        </div>
      </div>
    </div>
    <MoveEditList v-bind:moves="this.combo.moves" />
    <button type="button" class="btn btn-outline-success my-3" v-on:click="addCombo">Create Combo</button>
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
      combo: {
        name: "",
        moves: []
      },
      selectedMove: undefined
    };
  },
  computed: {
    ...mapState({
      moves: state => state.moves.all
    }),
    shorthand: function() {
      return this.combo.moves
        .map(m => `${m.shorthand}${this.getSeperator(m.timing)}`)
        .join("");
    }
  },
  methods: {
    addMove: function() {
      if (!this.selectedMove) return;

      this.combo.moves.push({ ...this.selectedMove });
      this.selectedMove = undefined;
    },
    addCombo: function() {
      if (this.combo.name == "" || this.combo.moves.length < 1) return;

      this.buildCombo();
      this.saveCombo();
      this.resetCombo();
    },
    buildCombo: function() {
      this.combo.moves = this.combo.moves.map(m => {
        return { ...m, comboName: this.combo.name };
      });
      this.combo.shorthand = this.shorthand;
    },
    getSeperator: function(moveTiming) {
      if (moveTiming <= 600) {
        return "-";
      }
      if (moveTiming > 600 && moveTiming < 1000) {
        return "--";
      }
      if (moveTiming >= 1000) {
        return "---";
      }
    },
    saveCombo: function() {
      this.$store.dispatch("combos/createCombo", this.combo);
    },
    resetCombo: function() {
      this.combo = {
        name: "",
        moves: []
      };
      this.selectedMove = undefined;
    }
  },
  created: function() {
    this.$store.dispatch("moves/getAllMoves");
  }
};
</script>

<style scoped>
</style>