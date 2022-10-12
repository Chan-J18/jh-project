<template>
  <div>
  </div>
</template>

<script>
export default {
  name: 'Topic',
  data () {
    return {
    }
  },
  methods: {
    mounted () {
      console.log(this.$route.params.type)
    }
  }
}
</script>

<style scoped>

</style>
