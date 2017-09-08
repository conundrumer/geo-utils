<template>
  <diagram-container>
    <h1 slot="header">Header</h1>
    <div slot="content" class="diagram-container">
      <div class="diagram-content full-flex">
        Hello World {{dim.width}}
      </div>
      <div class="diagram-content full-flex">
        <svg-container :dim.sync="dim">
          <svg>
            <g :transform="[dim.width/2, dim.height/2] | fn 'translate'">
              <circle :cx='0' :cy='0' r='30'/>
            </g>
          </svg>
        </svg-container>
      </div>
    </div>
    <p slot="footer">Footer</p>
  </diagram-container>
</template>

<script>
import {DiagramContainer, SvgContainer} from '../containers'

export default {
  data () {
    return {
      dim: {width: 1, height: 1}
    }
  },
  // watch: {
  //   'dim' (val, oldVal) {
  //     console.log('dim', val.width, val.height)
  //   }
  // },
  components: {
    DiagramContainer,
    SvgContainer
  }
}
</script>

<style scoped>
.diagram-container {
  width: 100%;
  display: flex;
}
.diagram-content {
  margin: 8px;
  border: 1px solid black;
}
</style>
