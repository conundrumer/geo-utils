<template>
  <g
    class="draggable"
    @mousedown.stop.prevent="mouseDrag"
    @touchstart.stop.prevent="touchDrag"
  >
    <slot>
      <point :r="10" :c="c"/>
    </slot>
  </g>
</template>

<script>
import {Point} from '../shapes'
import {handleMouseDrag, handleTouchDrag} from '../dragHandler'
import {aabb, aabbInBox} from '../bound'

export default {
  props: {
    points: {
      type: Array,
      twoWay: true
    },
    dim: Object
  },
  computed: {
    c () {
      let c = this.points.reduce((a, b) => ({
        x: a.x + b.x,
        y: a.y + b.y
      }))
      c.x /= this.points.length
      c.y /= this.points.length
      return c
    },
    aabb () {
      return aabb(this.points)
    }
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
      let x0, y0
      dragHandler(e, {
        down: (x, y) => {
          x0 = x
          y0 = y
        },
        move: (x, y) => {
          let delta = {
            x: x - x0,
            y: y - y0
          }
          delta = aabbInBox(delta, this.aabb, this.dim.width, this.dim.height, true)
          this.points = this.points.map(p => ({
            x: p.x + delta.x,
            y: p.y + delta.y
          }))
          x0 = x
          y0 = y
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
