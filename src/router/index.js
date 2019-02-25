import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Navbar from '@/components/Layouts/Navbar'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Navbar,
      children: [
        {
          path: '/',
          name: 'Home',
          components: { default: Home },
          meta: { title: 'Henri Potier Shop - Bibliothèque' }
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  return next()
})

export default router
