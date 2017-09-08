<template>
  <g :transform="[angle] | fn 'rotate'">
    <path d='M-7,7 L7,0 L-7,-7 Z' />
  </g>
</template>

<script>
export default {
  props: {
    angle: {
      type: Number,
      default: 0 // in degrees
    }
  }
}
</script>
