<template>
  <div class="container-fluid">
    <app-loader v-if="isLoading" />

    <div v-if="!isLoading">
      <b-table
        hover
        responsive
        striped
        :current-page="currentPage"
        :fields="$options.consts.FIELDS"
        :filter="filter"
        :items="entries"
        :per-page="$options.consts.PAGER_CONFIG.MAX_PER_PAGE">
        <template v-slot:row-details="data">
          <PhoneBookItem :row="data" />
        </template>
      </b-table>

      <AppPager
        :config="$options.consts.PAGER_CONFIG"
        @onPageChange="onPageChange" />
    </div>
  </div>
</template>

<script>
import { FIELDS, MAX_ENTRIES, PAGER_CONFIG } from './phonebook.config'
import { getEntries } from './phonebook.service'

import AppLoader from '@/components/AppLoader'
import AppPager from '@/components/AppPager'
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
    PAGER_CONFIG
  },

  data() {
    return {
      currentPage: 1,
      entries: [],
      filter: '',
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
     * Event handler for changing page
     * @param {Object} data - Data sent with event
     */
    onPageChange(data) {
      const { currentPage } = data
      this.currentPage = currentPage
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
