<template>
  <g
    class="draggable"
    @mousedown.stop.prevent="mouseDrag"
    @touchstart.stop.prevent="touchDrag"
  >
    <slot>
      <point r="10"/>
    </slot>
  </g>
</template>

<script>
import {Point} from './shapes'
import {handleMouseDrag, handleTouchDrag} from '../dragHandler'

export default {
  props: {
    points: {
      type: Array,
      twoWay: true
    },
    dim: Object
  },
  methods: {
    bound (x, y) {
      return {x, y}
    },
    mouseDrag (e) {
      this.dragStart(e, handleMouseDrag)
    },
    touchDrag (e) {
      this.dragStart(e, handleTouchDrag)
    },
    dragStart (e, dragHandler) {
      let {x: initX, y: initY} = this.c
      let x0, y0
      dragHandler(e, {
        down: (x, y) => {
          x0 = x
          y0 = y
        },
        move: (x, y) => {
          let nextX = initX + x - x0
          let nextY = initY + y - y0
          this.c = this.bound(nextX, nextY)
        }
      })
    }
  },
  components: {
    Point
  }
}
</script>

<style scoped>
</style>
