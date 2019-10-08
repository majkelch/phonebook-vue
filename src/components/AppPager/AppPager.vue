<template>
  <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage" />
</template>

<script>
export default {
  name: 'AppPager',

  data() {
    return {
      currentPage: 1,
      rows: 10,
      perPage: 10
    }
  }
}
</script>
