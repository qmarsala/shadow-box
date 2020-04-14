<template>
  <div :key="moveData.id" class="move-container mx-auto">
    <div>{{moveData.name}}</div>
    <div class="move" v-bind:class="moveClass" v-bind:data-move="shorthand"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["moveData", "animate"],
  computed: {
    ...mapState(["isSouthpawStanceEnabled"]),
    shorthand: function() {
      return `${this.moveData.shorthand}${
        this.isSouthpawStanceEnabled ? "-southpaw" : ""
      }`;
    },
    moveClass: function() {
      if (!this.animate) return "";

      let classString = "animated ";
      switch (this.moveData.shorthand) {
        case "B":
          classString += "bounceIn";
          break;
        case "R":
          classString += "rotateIn";
          break;
        case "S":
          classString += "rotateInDownLeft";
          break;
        case "3":
          classString += this.isSouthpawStanceEnabled ? "fadeInRight" : "fadeInLeft";
          break;
        case "4":
          classString += this.isSouthpawStanceEnabled ? "fadeInLeft" : "fadeInRight";
          break;
        case "5":
        case "6":
          classString += "fadeInUp";
          break;
        case "1":
        case "2":
        default:
          classString += "fadeIn";
          break;
      }
      return classString;
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
  animation-duration: 350ms !important;
}

.move[data-move="1"] {
  background-image: url(../../assets/jab.png);
}

.move[data-move="1-southpaw"] {
  background-image: url(../../assets/cross.png);
}

.move[data-move="2"] {
  background-image: url(../../assets/cross.png);
}

.move[data-move="2-southpaw"] {
  background-image: url(../../assets/jab.png);
}

.move[data-move="3"] {
  background-image: url(../../assets/leadhook.png);
}

.move[data-move="3-southpaw"] {
  background-image: url(../../assets/hook.png);
}

.move[data-move="4"] {
  background-image: url(../../assets/hook.png);
}

.move[data-move="4-southpaw"] {
  background-image: url(../../assets/leadhook.png);
}

.move[data-move="5"] {
  background-image: url(../../assets/leaduppercut.png);
}

.move[data-move="5-southpaw"] {
  background-image: url(../../assets/uppercut.png);
}

.move[data-move="6"] {
  background-image: url(../../assets/uppercut.png);
}

.move[data-move="6-southpaw"] {
  background-image: url(../../assets/leaduppercut.png);
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