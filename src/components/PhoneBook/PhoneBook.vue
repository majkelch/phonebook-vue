<template>
  <div class="container-fluid">
    <app-loader v-if="isLoading" />

    <div v-if="!isLoading">
      <ul
        v-for="entry in entries"
        :key="entry.id">
        <PhoneBookItem :row="entry" />
      </ul>
    </div>
  </div>
</template>

<script>
import { MAX_ENTRIES } from './phonebook.config'
import { getEntries } from './phonebook.service'

import AppLoader from '../AppLoader/AppLoader'
import PhoneBookItem from './PhoneBookItem'

export default {
  name: 'PhoneBook',

  components: {
    AppLoader,
    PhoneBookItem
  },

  data() {
    return {
      entries: [],
      isLoading: true
    }
  },

  /**
   * @DISCLAIMER: I do not add comments for native Vue properties (such as hooks, data func, etc),
   * because Vue developer should know what they do
   */
  mounted() {
    this.initialize()
  },

  methods: {
    /**
     * Initialize defaults for component
     */
    async initialize() {
      this.entries = await getEntries({
        amount: MAX_ENTRIES
      })
      this.isLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .container-fluid {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
