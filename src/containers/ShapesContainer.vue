<template>
  <diagram-container>
    <h1 slot="header">{{header}}</h1>
    <svg-container slot="content" :dim.sync="dim">
      <svg>
        <g :transform="[dim.width/2, dim.height/2] | fn 'translate'">
          <slot></slot>
        </g>
      </svg>
    </svg-container>
    <p slot="footer">{{footer}}</p>
  </diagram-container>
</template>

<script>
import DiagramContainer from './DiagramContainer'
import SvgContainer from './SvgContainer'

export default {
  props: {
    dim: {
      type: Object,
      twoWay: true
    },
    header: String,
    Footer: String
  },
  components: {
    DiagramContainer,
    SvgContainer
  }
}
</script>
