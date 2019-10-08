<template>
  <div>
    <b-col
      lg="6"
      class="my-1">
      <b-form-group
        label="Filter"
        label-cols-sm="3"
        label-align-sm="right"
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
  </div>
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
     * Event handler for typing into filter field
     */
    onFilterInput() {
      this.$emit('onFilterInput', { filter: this.filter })
    }
  }
}
</script>
