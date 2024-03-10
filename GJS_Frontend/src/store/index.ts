import {createStore} from 'vuex'

const store = createStore({
    state:{
        title: null,
        salesData : [], //past 12 months data
        statusData: [],
        salesDataLoaded: false,
        statusDataLoaded: false,
        acceptedRate: 0,
        userInfo: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')): null,
    },
    getters:{
        getSalesData : state => state.salesData,
        getStatusData : state => state.statusData,
        
        getSalesDataLoaded: state => state.salesDataLoaded,
        getStatusDataLoaded: state => state.statusDataLoaded,

        getAcceptedRate: state => state.acceptedRate,
        getUserInfo: state => state.userInfo,

        authenticated: state => state.userInfo !== null,
        getUserRole: state => state.userInfo.role,
        getUserId: state => state.userInfo.id,
    },
    mutations:{
        changeTitle: (state,value) => state.title = value,

        changeSalesData : (state, value) => state.salesData = value,
        changeStatusData : (state, value) => state.statusData = value,

        changeSalesDataLoaded : (state, value) => state.salesDataLoaded = value,
        changeStatusDataLoaded : (state, value) => state.statusDataLoaded = value,

        changeAcceptedRate: (state, value) => state.acceptedRate = value,

        changeUserInfo: (state, value) => state.userInfo = value,
    },
    actions:{

    },
    modules:{

    }
})

export default store