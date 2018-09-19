import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/modules/store';
import PrettyCheckbox from 'pretty-checkbox-vue';
import './plugins/element.js';
import 'pretty-checkbox/src/pretty-checkbox.scss'; 

Vue.config.productionTip = false;
Vue.use(PrettyCheckbox);
console.log(PrettyCheckbox);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
