<template>
  <div :key="moveData.id" class="move-container mx-auto">
    <div>{{moveData.name}}</div>
    <div class="move" v-bind:class="moveAnimation" v-bind:data-move="shorthand"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["moveData", "animate"],
  computed: {
    ...mapState(["isSouthpawStanceEnabled"]),
    shorthand: function() {
      const southpawMap = {
        B: "B",
        S: "S",
        R: "R",
        "1": "2",
        "2": "1",
        "3": "4",
        "4": "3",
        "5": "6",
        "6": "5"
      };
      return this.isSouthpawStanceEnabled 
        ? southpawMap[this.moveData.shorthand] 
        : this.moveData.shorthand;
    },
    moveAnimation: function() {
      if (!this.animate) return "";

      const moveAnimationMap = {
        B: "bounceIn",
        S: "rotateInDownLeft",
        R: "rotateIn",
        "1": "fadeIn",
        "2": "fadeIn",
        "3": "fadeInLeft",
        "4": "fadeInRight",
        "5": "fadeInUp",
        "6": "fadeInUp"
      }

      return `animated ${moveAnimationMap[this.shorthand]}`;
    }
  }
};
</script>

<style scoped>
.move-container {
  height: 320px;
  width: 300px;
  text-align: center;
}

.move {
  background-size: cover;
  background-repeat: no-repeat;
  height: 300px;
  width: 300px;
  animation-delay: 100ms;
  animation-duration: 350ms;
}

.move[data-move="1"] {
  background-image: url(../../assets/jab.png);
}

.move[data-move="2"] {
  background-image: url(../../assets/cross.png);
}

.move[data-move="3"] {
  background-image: url(../../assets/leadhook.png);
}

.move[data-move="4"] {
  background-image: url(../../assets/hook.png);
}

.move[data-move="5"] {
  background-image: url(../../assets/leaduppercut.png);
}

.move[data-move="6"] {
  background-image: url(../../assets/uppercut.png);
}

.move[data-move*="B"] {
  background-image: url(../../assets/block.png);
}

.move[data-move*="R"] {
  background-image: url(../../assets/roll.png);
}

.move[data-move*="S"] {
  background-image: url(../../assets/slip.png);
}
</style>