<template>
  <g
    class="draggable"
    :transform="[c.x, c.y] | fn 'translate'"
    @mousedown.stop.prevent="mouseDrag"
    @touchstart.stop.prevent="touchDrag"
  >
    <slot>
      <point/>
    </slot>
  </g>
</template>

<script>
import {Point} from '../shapes'
import {handleMouseDrag, handleTouchDrag} from '../dragHandler'
import {pointInBox} from '../bound'

export default {
  props: {
    c: {
      type: Object,
      twoWay: true
    },
    dim: Object
  },
  methods: {
    bound (x, y) {
      return pointInBox(x, y, this.dim.width, this.dim.height, true)
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
  watch: {
    'dim' () {
      this.c = this.bound(this.c.x, this.c.y)
    }
  },
  components: {
    Point
  }
}
</script>

<style>
.draggable {
  fill: blue;
}
.draggable:hover {
  fill: dodgerblue;
}
.draggable:active {
  fill: lightblue;
}

.draggable-line {
  fill: none;
  stroke-width: 5px;
  stroke: blue;
}
.draggable-line:hover {
  stroke: dodgerblue;
}
.draggable-line:active {
  stroke: lightblue;
}

</style>
