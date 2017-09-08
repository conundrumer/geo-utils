<template>
  <g>
    <line
      :x1="p.x"
      :y1="p.y"
      :x2="q.x"
      :y2="q.y"
      :class="classes || 'default-line'"
    />
  </g>
</template>

<script>
export default {
  props: {
    p: {
      type: Object,
      default: () => ({x: 0, y: 0})
    },
    q: {
      type: Object,
      default: () => ({x: 1, y: 1})
    },
    classes: String
  }
}
</script>

<style scoped>
.default-line {
  stroke-width: 3px;
  stroke: black;
}
</style>
