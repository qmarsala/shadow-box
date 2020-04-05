<template>
  <div class="row">
    <div class="col" v-for="(move, index) in moves" :key="index">
      <move v-if="move" v-bind:moveData="move" v-bind:animate="false"></move>
      <button class="btn btn-light">Learn this move</button>
    </div>
  </div>
</template>

<script>
import Move from "./Move";

export default {
  components: {
    Move
  },
  data: function() {
    return {
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
      ]
    };
  }
};
</script>