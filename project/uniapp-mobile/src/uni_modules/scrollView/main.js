import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
import ourLoading from '@/components/our-loading/our-loading.vue'
Vue.component('ourLoading', ourLoading)
import selfRoll from '@/components/self-roll/roll.vue'
Vue.component('selfRoll', selfRoll)
import nodata from '@/components/no-data/bottom.vue';
Vue.component('nodata', nodata)
import noview from '@/components/no-data/back-view.vue';
Vue.component('noview', noview)
import scrollView from '@/components/scroll-view/scroll-view.vue';
Vue.component('scrollView', scrollView)


App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
