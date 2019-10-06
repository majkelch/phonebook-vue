<template>
  <div>{{ msg }}</div>
</template>

<script>
export default {
  name: 'PhoneBook',

  props: {
    msg: {
      type: String,
      default: 'OK This is it.'
    }
  }
}
</script>
