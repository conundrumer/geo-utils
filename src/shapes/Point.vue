<template>
  <g>
    <circle
      :cx="c.x"
      :cy="c.y"
      :r="r"
      :class="classes"
    />
  </g>
</template>

<script>
export default {
  props: {
    c: {
      type: Object,
      default: () => ({x: 0, y: 0})
    },
    r: {
      type: Number,
      default: 6
    },
    classes: String
  }
}
</script>
