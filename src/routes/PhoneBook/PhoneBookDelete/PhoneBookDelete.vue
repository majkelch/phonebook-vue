<template>
  <b-button
    size="sm"
    variant="danger"
    @click="onRowDelete">
    Remove
  </b-button>
</template>

<script>
export default {
  name: 'PhoneBookDelete',
  props: {
    /**
     * Row data
     */
    row: {
      type: Object,
      default: () => ({})
    }
  },

  methods: {
    /**
     * Event handler for removing item
     */
    onRowDelete() {
      this.$emit('onRowDelete', this.row)
    }
  }
}
</script>

<style scoped>

</style>
