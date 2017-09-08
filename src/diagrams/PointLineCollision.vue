<template>
  <diagram-container>
    <h1 slot="header">Point - Moving Line Segment Collision</h1>
    <svg-container slot="content" :dim.sync="dim">
      <svg>
        <g :transform="[dim.width/2, dim.height/2] | fn 'translate'">
          <draggable-group :points.sync="group0" :dim="dim">
            <line :p="l0.p" :q="l0.q" classes="draggable-line"/>
          </draggable-group>
          <draggable-group :points.sync="group1" :dim="dim">
            <line :p="l1.p" :q="l1.q" classes="draggable-line"/>
          </draggable-group>
          <draggable-ray :p.sync="l0.p" :q.sync="l1.p" :dim="dim" />
          <draggable-ray :p.sync="l0.q" :q.sync="l1.q" :dim="dim" />
          <draggable-point :c.sync="c" :dim="dim" />
          <line v-if="collision" :p="collision.p" :q="collision.q" classes="tangent" />
          <po
        </g>
      </svg>
    </svg-container>
    <p slot="footer"> Collision: {{!!collision}} </p>
  </diagram-container>
</template>

<script>
import {DiagramContainer, SvgContainer} from '../containers'
import {Point as DraggablePoint, Ray as DraggableRay, Group} from '../draggables'
import {Line} from '../shapes'
import makePointGroup from '../draggables/makePointGroup'
import {objectVector} from '../geoUtils'
let {pointLineCollision} = objectVector

export default {
  data () {
    return {
      dim: {width: 1, height: 1},
      l0: {
        p: {x: -40, y: -10},
        q: {x: 20, y: 10}
      },
      l1: {
        p: {x: -20, y: 30},
        q: {x: 40, y: 40}
      },
      c: {x: -10, y: 10}
    }
  },
  computed: {
    group0: makePointGroup(['p', 'q'], 'l0'),
    group1: makePointGroup(['p', 'q'], 'l1'),
    collision () {
      let t = pointLineCollision(this.c, this.l0, this.l1)
      if (t === null) {
        return
      }
      let {l0, l1} = this
      return {
        p: {
          x: (1 - t) * l0.p.x + t * l1.p.x,
          y: (1 - t) * l0.p.y + t * l1.p.y
        },
        q: {
          x: (1 - t) * l0.q.x + t * l1.q.x,
          y: (1 - t) * l0.q.y + t * l1.q.y
        }
      }
    }
  },
  components: {
    DiagramContainer,
    SvgContainer,
    DraggableRay,
    DraggablePoint,
    DraggableGroup: Group,
    Line
  }
}
</script>
