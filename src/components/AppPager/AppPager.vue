<template>
  <b-container>
    <b-row align-v="center">
      <b-pagination
        v-model="currentPage"
        :total-rows="config.MAX_ENTRIES"
        :per-page="config.MAX_PER_PAGE"
        @input="onPageChange" />
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'AppPager',

  props: {
    /**
     * Config for pager
     */
    config: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      currentPage: null
    }
  },

  mounted() {
    /**
     * Destructuring for only one property seems a bit excessive
     */
    const { START_PAGE } = this.config
    this.currentPage = START_PAGE
  },

  methods: {
    /**
     * Event handler for page change
     */
    onPageChange() {
      this.$emit('onPageChange', {
        currentPage: this.currentPage
      })
    }
  }
}
</script>
