<template>
  <div class="container-fluid">
    <app-loader v-if="isLoading" />

    <div v-if="!isLoading">
      <AppTitle />

      <AppSearch
        @onFilterInput="onFilterInput" />

      <b-table
        responsive
        striped
        :current-page="currentPage"
        :fields="$options.consts.FIELDS"
        :filter="filter"
        :filter-debounce="$options.consts.FILTER_DEBOUNCE_TIME"
        :items="entries"
        :per-page="$options.consts.PAGER_CONFIG.MAX_PER_PAGE"
        @filtered="onFilteredTable" />

      <AppPager
        :config="pagerConfig"
        @onPageChange="onPageChange" />
    </div>
  </div>
</template>

<script>
// imports from exported consts are sorted alphabetically
import {
  FIELDS,
  FILTER_DEBOUNCE_TIME,
  MAX_ENTRIES,
  PAGER_CONFIG,
  START_PAGE
} from './phonebook.config'

import { getEntries } from './phonebook.service'

import AppLoader from '@/components/AppLoader'
import AppPager from '@/components/AppPager'
import AppSearch from '@/components/AppSearch'
import AppTitle from '@/components/AppTitle'

export default {
  name: 'PhoneBook',

  // components are sorted alphabetically
  components: {
    AppLoader,
    AppPager,
    AppSearch,
    AppTitle
  },

  /**
   * Custom option for consts
   */
  consts: {
    FIELDS,
    FILTER_DEBOUNCE_TIME,
    PAGER_CONFIG
  },

  data() {
    return {
      currentPage: START_PAGE,
      entries: [],
      filter: null,
      isLoading: true,
      pagerConfig: PAGER_CONFIG
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
      try {
        this.entries = await getEntries({
          amount: MAX_ENTRIES
        })
        this.isLoading = false
      } catch (e) {
        this.isLoading = true
      }
    },

    /**
     * Event handler for changing page from <AppPager>
     * @param {Object} data - Data sent with pager event
     */
    onPageChange(data) {
      const { currentPage } = data
      this.currentPage = currentPage
    },

    /**
     * Event handler for filtering from <AppSearch>
     * @param {Object} data - Data sent with filter event
     */
    onFilterInput(data) {
      const { filter } = data
      this.filter = filter
    },

    /**
     * Event handler from table with filter results
     * @param {Array} items - Found items
     * @param {Number} numberOfItems - Number of found items
     */
    onFilteredTable(items, numberOfItems) {
      this.pagerConfig = {
        ...this.pagerConfig,
        MAX_ENTRIES: numberOfItems
      }
      this.currentPage = START_PAGE
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
