import store from '../../../store'

export default (to, from, next) => {
  if (store.getters.authenticated) {
    if(store.getters.getUserRole === 'admin'){
      next()
    }else{
      next('/unauthorized')
    }
  } else {
    next({ name: 'login' })
  }
}
