<template>
  <svg viewBox="{{viewBox}}" @mousedown="$event.preventDefault()">
    <component :is="currentDiagram" :bound="bound"/>
  </svg>
  <form>
    <template v-for="diagram in diagrams">
      <input type="radio"
        name="diagram"
        :id="diagram"
        :value="diagram"
        v-model="currentDiagram">
      <label :for="diagram">{{diagram}}</label>
      <br/>
    </template>
  </form>
</template>

<script>
import LineLineIntersection from './LineLineIntersection'
import PointLineDistance from './PointLineDistance'
import CircleLineIntersection from './CircleLineIntersection'
import PointLineIntersection from './PointLineIntersection'

export default {
  data () {
    return {
      bounds: {
        x1: 0,
        y1: 0,
        x2: 200,
        y2: 200
      },
      diagrams: [
        'line-line-intersection',
        'point-line-distance',
        'circle-line-intersection',
        'point-line-intersection'
      ],
      currentDiagram: 'line-line-intersection'
    }
  },
  computed: {
    viewBox () {
      return [
        this.bounds.x1,
        this.bounds.y1,
        this.bounds.x2 - this.bounds.x1,
        this.bounds.y2 - this.bounds.y1
      ].join(' ')
    }
  },
  methods: {
    bound (x, y) {
      return {
        x: Math.max(this.bounds.x1, Math.min(this.bounds.x2, x)),
        y: Math.max(this.bounds.y1, Math.min(this.bounds.y2, y))
      }
    }
  },
  components: {
    LineLineIntersection,
    PointLineDistance,
    CircleLineIntersection,
    PointLineIntersection
  }
}
</script>

<style>
svg {
  width: 200px;
  height: 200px;
}
</style>
