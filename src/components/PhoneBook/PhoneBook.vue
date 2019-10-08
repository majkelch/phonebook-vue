<template>
  <div class="container-fluid">
    <app-loader v-if="isLoading" />

    <div v-if="!isLoading">
      <b-table
        hover
        responsive
        striped
        :fields="$options.consts.FIELDS"
        :items="entries"
        :per-page="$options.consts.MAX_PER_PAGE">
        <template v-slot:row-details="data">
          <PhoneBookItem :row="data" />
        </template>
      </b-table>

      <AppPager />
    </div>
  </div>
</template>

<script>
import { FIELDS, MAX_ENTRIES, MAX_PER_PAGE } from './phonebook.config'
import { getEntries } from './phonebook.service'

import AppLoader from '../AppLoader'
import AppPager from '../AppPager'
import PhoneBookItem from './PhoneBookItem'

export default {
  name: 'PhoneBook',

  components: {
    AppLoader,
    AppPager,
    PhoneBookItem
  },

  /**
   * Custom option for consts
   */
  consts: {
    FIELDS,
    MAX_PER_PAGE
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
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
