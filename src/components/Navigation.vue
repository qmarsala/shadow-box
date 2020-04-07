<template>
  <nav class="navbar navbar-dark bg-dark navbar-expand-lg fixed-top">
    <router-link class="navbar-brand" to="/">Shadow Box</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link" to="/run-flow">Run Flow</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/configure-flow">Configure Flow</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/create-combo">Create a Combo</router-link>
        </li>
      </ul>
      <button class="btn btn-sm btn-outline-light" v-on:click="toggleStance">Enable {{stanceText}}</button>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    stanceText: function () {
      return this.$store.state.isSouthpawStanceEnabled ? 'Regular stance' : 'Southpaw stance'
    }
  },
  methods: {
    toggleStance: function() {
      this.$store.dispatch('toggleStance');
    }
  }
}
</script>