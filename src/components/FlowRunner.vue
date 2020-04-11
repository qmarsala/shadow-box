<template>
  <div>
    <div v-if="!running">
      <label for="round-duration">Round Duration (in seconds)</label>
      <input id="round-duration" v-model="roundDurationSeconds" />
      <button class="btn btn-primary" v-on:click="run" v-bind:disabled="isDisabled">Run</button>
    </div>
    <div v-if="running">
      <div class="combo-name">"{{ comboName }}"</div>
      <Move v-if="currentMove" v-bind:moveData="currentMove" v-bind:animate="true" />
      <FlowPreview v-bind:moves="flowMoves" v-bind:currentIndex="currentMoveIndex"/>
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
      currentMoveIndex: 0
    };
  },
  computed: {
    ...mapState({
      running: state => state.flow.running
    }),
    ...mapState({
      flowMoves: state => state.flow.flowMoves
    }),
    isDisabled: function () {
      return this.flowMoves.length <= 0;
    },
    currentMove: function() {
      if (this.running) {
        const move = this.flowMoves[this.currentMoveIndex];
        return { ...move, id: this.currentMoveIndex };
      }
      return null;
    },
    comboName: function() {
      if (this.running) {
        return this.currentMove.comboName
      }
      return "";
    }
  },
  methods: {
    run: async function() {
      if (this.running) return;
      this.currentMoveIndex = 0;
      this.start();
      setTimeout(() => this.stop(), this.roundDurationSeconds * 1000);
      
      while (this.running) {
        await this.sleep(this.currentMove.timing);
        this.next();
      }
    },
    start: function() {
      this.$store.dispatch("flow/start");
    },
    stop: function() {
      this.$store.dispatch("flow/stop");
    },
    next: function() {
      this.currentMoveIndex++;
      if (this.currentMoveIndex >= this.flowMoves.length) {
        this.currentMoveIndex = 0;
      }
    },
    sleep: function(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
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