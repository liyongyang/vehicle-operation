import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/page/layout'
import defaultMain from '@/page/defaultMain'
import menus from '@/config/menu-config'

Vue.use(Router)

var children = [{
  path: '/',
  name: 'defaultMain',
  component: defaultMain
}]

menus.forEach((item) => {
  item.sub.forEach((sub) => {
    children.push({
      path: `/${sub.componentName}`,
      name: sub.componentName,
      component: () => import(`@/components/${sub.componentName}`)
    })
  })
})

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children: children
    }
  ]
})
