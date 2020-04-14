<template>
  <div>
    <div v-if="!running">
      <select class="custom-select" v-model="selectedFlow">
        <option value="undefined" disabled selected>Choose a flow...</option>
        <option
          v-for="(flow, index) in flows"
          v-bind:key="index"
          v-bind:value="flow"
        >{{ flow.name }}</option>
      </select>
      <label for="round-duration">Round Duration (in seconds)</label>
      <input id="round-duration" v-model="roundDurationSeconds" />
      <button class="btn btn-primary" v-on:click="run" v-bind:disabled="isDisabled">Run</button>
    </div>
    <div v-if="running">
      <div class="combo-name">"{{ comboName }}"</div>
      <Move v-if="currentMove" v-bind:moveData="currentMove" v-bind:animate="true" />
      <FlowPreview v-bind:moves="this.selectedFlow.moves" v-bind:currentIndex="currentMoveIndex" />
    </div>
  </div>
</template>

<script>
import Move from "./move/Move";
import FlowPreview from "./FlowPreview";
import { mapState } from "vuex";

export default {
  components: {
    Move,
    FlowPreview
  },
  data: function() {
    return {
      selectedFlow: undefined,
      currentMoveIndex: 0
    };
  },
  computed: {
    ...mapState({
      running: state => state.flow.running
    }),
    ...mapState({
      flows: state => state.flow.all
    }),
    isDisabled: function() {
      return this.selectedFlow == undefined;
    },
    currentMove: function() {
      if (this.running) {
        const move = this.selectedFlow.moves[this.currentMoveIndex];
        return { ...move, id: this.currentMoveIndex };
      }
      return null;
    },
    comboName: function() {
      if (this.running) {
        return this.currentMove.comboName;
      }
      return "";
    },
    roundDurationSeconds: function() {
      return this.selectedFlow ? this.selectedFlow.minimumRoundDuration / 1000 : 100;
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
      if (this.currentMoveIndex >= this.selectedFlow.moveCount) {
        this.currentMoveIndex = 0;
      }
    },
    sleep: function(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  },
  created: function() {
    this.$store.dispatch("flow/getAllFlows");
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