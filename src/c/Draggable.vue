<template>
  <g
    class="draggable"
    :transform="translate"
    @mousedown="mouseDrag"
    @touchstart="touchDrag"
  >
    <slot>
      <circle r="10" cx="0" cy="0" />
    </slot>
  </g>
</template>

<script>
import { handleMouseDrag, handleTouchDrag } from '../dragHandler'

export default {
  props: {
    x: {
      type: Number,
      twoWay: true
    },
    y: {
      type: Number,
      twoWay: true
    },
    bound: {
      type: Function,
      default: (x, y) => ({x, y})
    }
  },
  computed: {
    translate () {
      return `translate(${this.x} ${this.y})`
    }
  },
  methods: {
    mouseDrag (e) {
      e.stopPropagation()
      this.dragStart(e, handleMouseDrag)
    },
    touchDrag (e) {
      e.stopPropagation()
      this.dragStart(e, handleTouchDrag)
    },
    dragStart (e, dragHandler) {
      let initX = this.x
      let initY = this.y
      let x0, y0
      dragHandler(e, {
        down: (x, y) => {
          x0 = x
          y0 = y
        },
        move: (x, y) => {
          let nextX = initX + x - x0
          let nextY = initY + y - y0
          let bounded = this.bound(nextX, nextY)
          this.x = bounded.x
          this.y = bounded.y
        }
      })
    }
  }
}
</script>

<style>
.draggable {
  fill: blue;
}
</style>
