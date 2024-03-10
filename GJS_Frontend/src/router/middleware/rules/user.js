import store from '../../../store'

export default (to, from, next) => {
  if (store.getters.authenticated) {
    if(store.getters.getUserRole === 'user'){
        next()
    }else{
        next({path: 'unauthorized'})
    }
  } else {
    next({ name: 'login' })
  }
}