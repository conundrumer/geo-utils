<template>
  <svg v-el:svg @mousedown.prevent @touchstart.prevent>
    <slot></slot>
  </svg>
</template>

<script>
export default {
  props: {
    dim: {
      type: Object,
      twoWay: true
    }
  },
  ready () {
    this.$emit('resize')
  },
  events: {
    'resize' () {
      if (!this.dim) return
      let {clientWidth: width, clientHeight: height} = this.$els.svg
      if (this.dim.width === width && this.dim.height === height) return
      this.dim = {width, height}
      return true
    }
  }
}
</script>

<style scoped>
svg {
  width: 100%;
  border: 1px solid #333;
}
</style>
