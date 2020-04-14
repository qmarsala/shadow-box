<template>
  <div>
    <h3>New Flow</h3>
    <div>{{shorthand}}</div>
    <div class="form-inline">
      <div class="input-group my-3">
        <input type="text" class="form-control" placeholder="Flow Name" v-model="flow.name" />
        <button class="btn btn-outline-info" v-on:click="saveClicked">Save</button>
      </div>
    </div>
    <div class="row row-cols-1 row-cols-sm-2">
      <div class="col">
        <span>Select Combos</span>
        <div class="list-group">
          <button
            class="list-group-item list-group-item-action"
            v-for="combo in combos"
            :key="combo.name"
            v-on:click="addCombo(combo)"
          >
            <strong>{{combo.name}}</strong>
            <small class="float-right text-muted">{{combo.shorthand}}</small>
          </button>
        </div>
      </div>
      <div class="col">
        <span>Your Flow</span>
        <div class="list-group">
          <button
            v-for="(combo, index) in selectedCombos"
            :key="index"
            class="list-group-item list-group-item-action"
            v-on:click="$delete(selectedCombos, index)"
          >
            <strong>{{combo.name}}</strong>
            <small class="float-right text-muted">{{combo.shorthand}}</small>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: function() {
    return {
      flow: {
        name: ""
      },
      selectedCombos: []
    };
  },
  computed: {
    ...mapState({
      combos: state => state.combos.all
    }),
    shorthand: function() {
      return this.selectedCombos.map(c => c.shorthand).join("|");
    }
  },
  methods: {
    addCombo(combo) {
      this.selectedCombos.push(combo);
    },
    saveClicked() {
      this.buildFlow();
      this.save();
      this.resetFlow();
    },
    buildFlow() {
      this.flow.moves = this.selectedCombos.flatMap(c => c.moves);
      this.flow.comboCount = this.selectedCombos.length;
      this.flow.moveCount = this.flow.moves.length;
      this.flow.shorthand = this.shorthand;
      this.flow.minimumRoundDuration = this.flow.moves
        .map(m => m.timing)
        .reduce((sum, val) => sum + val);
    },
    save() {
      this.$store.dispatch("flow/saveFlow", this.flow);
    },
    resetFlow() {
      this.flow = {
        name: ""
      };
      this.selectedCombos = [];
    }
  },
  created: function() {
    this.$store.dispatch("combos/getAllCombos");
  }
};
</script>

<style>
</style>