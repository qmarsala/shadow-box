<template>
  <div>
    <div v-if="!running">
      <label for="round-duration">Round Duration (in seconds)</label>
      <input id="round-duration" v-model="roundDurationSeconds" />
      <button class="btn btn-primary" v-on:click="run">Run</button>
    </div>
    <div v-if="running">
      <div class="combo-name">"{{ comboName }}"</div>
      <move v-if="currentMove" v-bind:moveData="currentMove" v-bind:animate="true"></move>
      <flow-preview v-bind:moves="moves" v-bind:currentIndex="currentMoveIndex"></flow-preview>
    </div>
  </div>
</template>

<script>
import Move from "./Move";
import FlowPreview from "./FlowPreview";
import { mapState } from "vuex";

export default {
  components: {
    Move,
    FlowPreview
  },
  data: function() {
    return {
      roundDurationSeconds: 10,
      currentMoveIndex: 0,
      moves: []
    };
  },
  computed: {
    ...mapState({
      running: state => state.flow.running
    }),
    ...mapState({
      combos: state => state.combos.all
    }),
    currentMove: function() {
      if (this.running) {
        const move = this.moves[this.currentMoveIndex];
        return { ...move, id: this.currentMoveIndex };
      }
      return null;
    },
    comboName: function() {
      if (this.running) {
        const move = this.moves[this.currentMoveIndex];
        return move.comboName;
      }
      return "";
    }
  },
  methods: {
    run: async function() {
      if (this.running) return;
      this.currentMoveIndex = 0;
      this.getMoves(this.$store.state.combos.all);
      this.start();
      setTimeout(() => this.stop(), this.roundDurationSeconds * 1000);
      
      while (this.running) {
        await this.sleep(this.currentMove.delay);
        this.next();
      }
    },
    start: function() {
      this.$store.dispatch("flow/start");
    },
    stop: function() {
      this.$store.dispatch("flow/stop");
    },
    //todo: what can we do to improve this?
    getMoves: function(combos) {
      this.moves = [];
      for (const combo of combos) {
        for (const move of combo.moves) {
          this.moves.push({
            ...move,
            comboName: combo.name,
            delay: combo.moveTiming
          });
        }
      }
    },
    next: function() {
      this.currentMoveIndex++;
      if (this.currentMoveIndex >= this.moves.length) {
        this.currentMoveIndex = 0;
      }
    },
    sleep: function(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  },
  created: function() {
    this.$store.dispatch("combos/getAllCombos");
  }
};
</script>

<style scoped>
.combo-name {
  text-align: center;
  font-size: 24px;
  padding: 10px;
}
</style>