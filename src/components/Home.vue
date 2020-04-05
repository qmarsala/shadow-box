<template>
  <div class="card-columns">
    <div class="card" v-for="(move, index) in moves" :key="index">
      <div class="card-body">
        <Move v-if="move" v-bind:moveData="move" v-bind:animate="false"/>
        <button class="btn btn-light">Learn this move</button>
      </div>
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
        { name: "Lead Hook", shorthand: "3" },
        { name: "Lead Uppercut", shorthand: "5" },
        { name: "Cross", shorthand: "2" },
        { name: "Hook", shorthand: "4" },
        { name: "Uppercut", shorthand: "6" },
        { name: "Slip", shorthand: "S" },
        { name: "Roll", shorthand: "R" },
        { name: "Block", shorthand: "B" }
      ]
    };
  }
};
</script>