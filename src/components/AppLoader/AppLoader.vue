<template>
  <b-spinner
    class="app-spinner"
    label="Loading"
    type="grow"
    variant="primary" />
</template>

<script>
export default {
  name: 'AppLoader'
}
</script>

<style scoped>
  .app-spinner {
    width: 5rem;
    height: 5rem;
  }
</style>
