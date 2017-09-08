import Vue from 'vue'
import App from './App'

Vue.config.debug = true

Vue.filter('fn', (args, functionName) => {
  return `${functionName}(${args.join()})`
})

window.onload = () => {
  new Vue({ // eslint-disable-line no-new
    el: 'body',
    components: { App }
  })
}
