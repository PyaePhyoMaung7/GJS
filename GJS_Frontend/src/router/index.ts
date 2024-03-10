import { createRouter, createWebHistory } from 'vue-router'
import middleware from './middleware'
import store from '../store';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: { path: "/user" },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      beforeEnter: middleware.guest,
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
      beforeEnter: middleware.guest,
    },
    {
      path: '/unauthorized',
      name: 'unauthorized',
      component: () => import('../views/UnAuthorized.vue')
    },
    {
      path: '/user',
      component: () => import('../views/user/UserLayout.vue'),
      beforeEnter: middleware.user,
      children:[
        {
          path: 'products',
          name: 'products',
          component: ()=> import('../views/user/ProductView.vue')
        }
      ]
    },
    {
      path: '/admin',
      component: () => import('../views/admin/AdminLayout.vue'),
      beforeEnter: middleware.admin,
      children:[
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('../views/admin/DashboardView.vue')
        },
        {
          path: 'user/list',
          name: 'userList',
          component: () => import('../views/admin/UserList.vue')
        },
        {
          path: 'category/list',
          name: 'categoryList',
          component: () => import('../views/admin/CategoryList.vue')
        },
        {
          path: 'product/list',
          name: 'productList',
          component: () => import('../views/admin/ProductList.vue')
        },
        {
          path: 'order/list',
          name: 'orderList',
          component: () => import('../views/admin/OrderList.vue')
        },
        {
          path: 'material/list',
          name: 'materialList',
          component: () => import('../views/admin/MaterialList.vue')
        },
        {
          path: 'brand/list',
          name: 'brandList',
          component: () => import('../views/admin/BrandList.vue')
        },
      ]
    },
    

  ]
})

router.beforeEach((to, from, next) => {
  // Update title based on the component
  let title = null;
  store.commit('changeTitle', title);

  switch (to.name) {
    case 'dashboard':
      title = 'Dashboard';
      break;
    case 'userList':
      title = 'User List';
      break;
    case 'categoryList':
      title = 'Category List';
      break;
    case 'productList':
      title = 'Product List';
      break;
    case 'orderList':
      title = 'Order List';
      break;
    case 'materialList':
      title = 'Material List';
      break;
    case 'brandList':
      title = 'Brand List';
      break;
    default:
      title = 'Default Title';
  }

  // Commit the title to the store
  store.commit('changeTitle', title);
  
  next();
});

export default router
