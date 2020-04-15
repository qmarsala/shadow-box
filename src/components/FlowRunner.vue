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
      <div class="form my-3">
        <div class="form-group row row-cols-1 row-cols-sm-4">
          <div class="col col-form-label">Round Duration</div>
          <div class="col">
            <input class="form-control" id="round-duration-minutes" v-model="roundDurationMinutes" />
            <label for="round-duration-minutes">minutes</label>
          </div>
          <div class="col">
            <input class="form-control" id="round-duration-seconds" v-model="roundDurationSeconds" />
            <label for="round-duration-seconds">seconds</label>
          </div>
          <div class="col">
            <button
              class="btn btn-outline-info w-100 my-1 my-sm-0"
              v-on:click="run"
              v-bind:disabled="isDisabled"
            >Run</button>
          </div>
        </div>
        <div class="row row-cols-1 row-cols-sm-3 my-3"></div>
      </div>
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
      roundDurationMinutes: 1,
      roundDurationSeconds: 30,
      currentMoveIndex: 0,
      autoStopTimout: undefined
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
    }
  },
  methods: {
    run: async function() {
      if (this.running) return;
      this.start();

      while (this.running) {
        await this.sleep(this.currentMove.timing);
        this.next();
      }
    },
    start: function() {
      this.currentMoveIndex = 0;
      this.autoStopTimout = setTimeout(
        () => this.stop(),
        (this.roundDurationMinutes * 60 * 1000) + (this.roundDurationSeconds * 1000)
      );
      this.$store.dispatch("flow/start");
    },
    stop: function() {
      clearTimeout(this.autoStopTimout);
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
  },
  beforeDestroy: function() {
    this.stop();
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