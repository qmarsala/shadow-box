<template>
  <div class="card-columns">
    <div class="card" v-for="(move, index) in moves" :key="index">
      <div class="card-body">
        <Move v-if="move" v-bind:moveData="move" v-bind:animate="false" />
        <button class="btn btn-light" v-on:click="onLearnClicked(move.shorthand)">Learn this move</button>
      </div>
    </div>
  </div>
</template>

<script>
import Move from "./move/Move";
import { mapState } from 'vuex';

export default {
  components: {
    Move
  },
  computed: {
    ...mapState({
      moves: state => state.moves.all
    })
  },
  methods: {
    onLearnClicked: function(shorthand) {
      this.$router.push(`/learn-move/${shorthand}`);
    }
  },
  created: function() {
    this.$store.dispatch("moves/getAllMoves");
  }
};
</script>