<template>
  <b-container
    fluid
    :class="currentTheme">
    <AppLoader v-if="isLoading" />

    <b-row v-if="!isLoading">
      <AppTitle
        @onThemeChange="onThemeChange" />

      <AppSearch
        @onFilterInput="onFilterInput" />

      <b-container>
        <b-row
          md="6">
          <b-table
            responsive
            striped
            :current-page="currentPage"
            :fields="$options.consts.FIELDS"
            :filter="filter"
            :filter-debounce="$options.consts.FILTER_DEBOUNCE_TIME"
            :items="entries"
            :per-page="$options.consts.PAGER_CONFIG.MAX_PER_PAGE"
            @filtered="onFilteredTable">
            <template v-slot:cell(actions)="data">
              <PhoneBookDelete
                :row="data"
                @onRowDelete="onRowDelete" />
            </template>
            <template v-slot:table-caption>
              Number of items: {{ itemsNumber }}.
            </template>
          </b-table>
        </b-row>
      </b-container>

      <AppPager
        :config="pagerConfig"
        @onPageChange="onPageChange" />
    </b-row>
  </b-container>
</template>

<script>
import * as R from 'ramda'

import { removeOneFromCollectionByIdx } from '@/utils/app.utils'

// imports from exported consts are sorted alphabetically
import {
  FIELDS,
  FILTER_DEBOUNCE_TIME,
  MAX_ENTRIES,
  PAGER_CONFIG,
  START_PAGE
} from './phonebook.config'

import { getEntries } from './phonebook.service'

export default {
  name: 'PhoneBook',

  // components are sorted alphabetically
  components: {
    AppLoader: () => import('@/components/AppLoader'),
    AppPager: () => import('@/components/AppPager'),
    AppSearch: () => import('@/components/AppSearch'),
    AppTitle: () => import('@/components/AppTitle'),
    PhoneBookDelete: () => import('./PhoneBookDelete')
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
      currentTheme: '',
      entries: [],
      filter: null,
      filteredItems: [],
      isLoading: true,
      itemsNumber: null,
      itemsToRemove: [],
      pagerConfig: PAGER_CONFIG,
      entriesCopy: []
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
        this.itemsNumber = R.length(this.entries)
        this.entriesCopy = [...this.entries]
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
      if (!filter) {
        const idsToRemove = R.map(item => item.id, this.itemsToRemove)
        this.entries = R.filter(item => !idsToRemove.includes(item.id), this.entriesCopy)
      }
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
      this.filteredItems = items
      this.itemsNumber = numberOfItems
    },

    /**
     * Event handler for theme change
     * @param {Object} data - New theme
     */
    onThemeChange(data) {
      const { name } = data
      this.currentTheme = `theme-${name}`
    },

    /**
     * Event handler for removing row
     * @param {Object} data - Row data
     */
    onRowDelete(data) {
      const { index, item } = data
      if (this.filter) {
        this.itemsToRemove = R.append(item, this.itemsToRemove)
        this.entries = removeOneFromCollectionByIdx(index)(this.filteredItems)
        this.itemsNumber = R.length(this.entries)
        return
      }
      this.entries = removeOneFromCollectionByIdx(index)(this.entries)
      this.entriesCopy = [...this.entries]
      this.itemsNumber = R.length(this.entries)
    }
  }
}
</script>
