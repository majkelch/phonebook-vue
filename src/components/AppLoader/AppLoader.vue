<template>
  <div class="d-flex justify-content-center mt-5">
    <b-spinner
      class="app-spinner"
      label="Loading"
      type="grow"
      variant="primary" />
  </div>
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
