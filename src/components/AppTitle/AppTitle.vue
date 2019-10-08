<template>
  <b-container>
    <b-row class="justify-content-md-center mt-5">
      <h1 class="app-title">
        Phone Book
      </h1>
    </b-row>

    <b-row class="justify-content-md-center mb-5">
      <b-button-group>
        <b-button
          v-for="(btn, idx) in buttons"
          :key="idx"
          :pressed.sync="btn.isToggled"
          variant="outline-primary"
          @click="onToggleTheme(btn)">
          {{ btn.caption }}
        </b-button>
      </b-button-group>
    </b-row>
  </b-container>
</template>

<script>
import * as R from 'ramda'
import { themeToggleButtons } from './appTitle.config'

export default {
  name: 'AppTitle',

  consts: {
    themeToggleButtons
  },

  data() {
    return {
      buttons: []
    }
  },

  mounted() {
    this.initialize()
  },

  methods: {
    /**
     * Initialize defaults for component
     */
    initialize() {
      this.buttons = [...this.$options.consts.themeToggleButtons]
      this.$emit('onThemeChange', R.head(this.buttons))
    },

    /**
     * Event handler on toggling theme
     * @param {Object} btn - Toggled button
     */
    onToggleTheme(btn) {
      const filterByCurrentlyToggled = item => R.equals(btn.order, item.order)
      const toggleItems = item => ({ ...item, isToggled: R.not(btn.isToggled) })
      const sortByOrder = R.sortBy(R.prop('order'))
      const toggled = R.compose(
        R.reject(filterByCurrentlyToggled),
        R.map(toggleItems)
      )(this.buttons)

      this.buttons = R.compose(
        sortByOrder,
        R.flatten
      )([toggled, btn])

      const currentlyOn = item => item.isToggled
      this.$emit('onThemeChange', R.find(currentlyOn, this.buttons))
    }
  }
}
</script>
