<template>
  <div id="app">
    <div class="app-content full-flex">
      <component :is="currentDiagram"></component>
    </div>
    <div class="app-content">
      <template v-for="diagram in diagrams">
        <input type="radio"
          name="diagram"
          :id="diagram"
          :value="diagram"
          v-model="currentDiagram">
        <label :for="diagram">{{startCase(diagram)}}</label>
        <br/>
      </template>
    </div>
  </div>
</template>

<script>
import kebabCase from 'lodash/string/kebabCase'
import startCase from 'lodash/string/startCase'
import * as diagrams from './diagrams'

let diagramNames = Object.keys(diagrams).map(kebabCase)

export default {
  data () {
    return {
      diagrams: diagramNames,
      currentDiagram: diagramNames[0]
    }
  },
  ready () {
    this.onResize()
    window.addEventListener('resize', this.onResize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    onResize () {
      this.$broadcast('resize')
    },
    startCase
  },
  components: {
    ...diagrams
  }
}
</script>

<style>
html, body {
  font-family: Helvetica, sans-serif;
  margin: 0;
  height: 100%;
}
.full-flex {
  flex: 1;
  display: flex;
  align-items: stretch;
}
</style>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.app-content {
  padding: 16px;
}
</style>
