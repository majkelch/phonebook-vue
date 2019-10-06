<template>
  <li> {{ row }} </li>
</template>

<script>
export default {
  name: 'PhoneBookItem',

  props: {
    /**
      * Row to display
      */
    row: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
