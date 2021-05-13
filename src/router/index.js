import Vue from 'vue'
import VueRouter from 'vue-router'
import Error from '../views/Error/404.vue'
import Layout from '../views/Layout';
import Login from '../views/Login';

//订单管理 
import Order from "../views/OrderManage"
const OrderList = () =>
  import('../views/OrderManage/order-list')
const ProductManage = () =>
  import('../views/OrderManage/product-manage')
const ProductionList = () =>
  import('../views/OrderManage/product-manage/production-list')
const ReviewManage = () =>
  import('../views/OrderManage/product-manage/review-manage')
const ReturnGoods = () =>
  import('../views/OrderManage/return-goods')


Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: '/product',
    children: [{
        path: 'product',
        name: 'Product',
        component: () => import('../views/Product/index.vue')
      },
      {
        path: 'params',
        name: 'Params',
        component: () => import('../views/Params/index.vue')
      },
      {
        path: 'advert',
        name: 'Advert',
        component: () => import('../views/Advert/index.vue')
      },
      {
        path: 'center',
        name: 'Center',
        component: () => import('../views/Center/index.vue')
      },
      {
        path: 'order',
        name: 'Order',
        component: Order,
        meta: {
          name: '订单管理',
          icon: 'icon-email'
        },
        children: [{
            path: 'list',
            name: 'order-list',
            component: OrderList
          },
          {
            path: 'product',
            name: 'product-manage',
            component: ProductManage,
            children: [{
                path: 'list',
                name: 'product-list',
                component: ProductionList
              },
              {
                path: 'review',
                name: 'review-manage',
                component: ReviewManage
              }
            ]
          },
          {
            path: 'returnGoods',
            name: 'return-goods',
            component: ReturnGoods
          }
        ]
      }
    ],
    meta: {
      isLogin: true
    }
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '*',
    component: Error
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router