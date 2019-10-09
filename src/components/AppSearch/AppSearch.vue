<template>
  <b-container>
    <b-row class="mb-2">
      <b-col
        sm="8"
        md="6"
        lg="4">
        <b-form-group
          label="Filter"
          label-cols-sm="3"
          label-cols-md="2"
          label-size="sm"
          label-for="filterInput"
          class="mb-0">
          <b-input-group size="sm">
            <b-form-input
              id="filterInput"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
              @input="onFilterInput" />
            <b-input-group-append>
              <b-button
                :disabled="!filter"
                @click="resetFilter">
                Clear
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'AppSearch',

  data() {
    return {
      filter: null
    }
  },

  methods: {
    /**
     * Set filter to default value
     */
    resetFilter() {
      this.filter = null
      this.onFilterInput()
    },

    /**
     * Event handler for interacting with filter field
     */
    onFilterInput() {
      this.$emit('onFilterInput', { filter: this.filter })
    }
  }
}
</script>
