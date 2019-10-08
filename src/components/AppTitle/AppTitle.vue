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
      <span>Current Theme: {{ currentTheme }}</span><br><br>
      <span>Buttons: {{ buttons }}</span>
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
      buttons: this.$options.consts.themeToggleButtons
    }
  },

  computed: {
    /**
     * Computed current theme
     */
    currentTheme() {
      return this.buttons.filter(btn => btn.isToggled)
    }
  },

  methods: {
    /**
     * Event handler on toggling theme
     * @param {Object} btn - Toggled button
     */
    onToggleTheme(btn) {
      const filterByToggled = item => R.equals(btn.order, item.order)
      const toggleItems = item => ({ ...item, isToggled: !btn.isToggled })
      const sortByOrder = R.sortBy(R.prop('order'))
      const toggled = R.compose(
        R.reject(filterByToggled),
        R.map(toggleItems)
      )(this.buttons)

      this.buttons = R.compose(
        sortByOrder,
        R.flatten
      )([toggled, btn])
    }
  }
}
</script>

<style scoped lang="scss">
  @import "app_title.scss";
</style>
