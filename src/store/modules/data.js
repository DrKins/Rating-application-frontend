const state = {
    array: [],
    adminMessage : "",
    emoticonNumber : 0,
    adminMessageduration : 0,
    token : 'nntoken',
    level: 3,
    items: [
        {title: 'blackPack', img: require('../../assets/blackPack/1.png'), id: 1 , number: [3,4,5]},
        {title: 'blackPack', img: require('../../assets/blackPack/2.png'), id: 2, number: [5]},
        {title: 'blackPack', img: require('../../assets/blackPack/3.png'), id: 3, number:[3,4,5]},
        {title: 'blackPack', img: require('../../assets/blackPack/4.png'), id: 4, number:[4,5]},
        {title: 'blackPack', img: require('../../assets/blackPack/5.png'), id: 5, number:[3,4,5]},
        {title: 'yellowPack', img: require('../../assets/yellowPack/1.png'), id: 1, number:[3,4,5]},
        {title: 'yellowPack', img: require('../../assets/yellowPack/2.png'), id: 2, number:[5]},
        {title: 'yellowPack', img: require('../../assets/yellowPack/3.png'), id: 3, number:[3,4,5]},
        {title: 'yellowPack', img: require('../../assets/yellowPack/4.png'), id: 4, number:[4,5]},
        {title: 'yellowPack', img: require('../../assets/yellowPack/5.png'), id: 5, number:[3,4,5]},
      ],
      users:[],
      statistics: [],
};

const getters = {
    get_array: state => state.array,
    get_adminMessage: state => state.adminMessage,
    get_emoticonNumber : state => state.emoticonNumber,
    get_adminMessageduration : state => state.adminMessageduration,
    get_token : state => state.token,
    get_items : state => state.items,
    get_users : state => state.users,
    get_level : state => state.level,
    get_statistics : state => state.statistics,
};

const actions ={
    // Action of session token.
    updateTokenAction: function ({commit}, payload) {
        commit('mutateToken', payload)
     },
     // Action of Updating GUI Settings.
    updateGUISettingsAction: function ({commit}, payload) {
        commit('mutateGUISettings', payload)
    },
    // Action of getting statistics from backend.
    getStatisticsAction: function({commit}, payload) {
        commit('mutateStatistics',payload)
    },
    getUsers: function({commit},payload) {
        commit('mutateSettings',payload);
    }
};

const mutations = {
    // Mutation for token and level of user.
    mutateToken(state, payload) {
        state.token = payload.token
        state.level = payload.level
        state.loaded = false
     },
    // Mutation of GUI settings.
    mutateGUISettings(state, payload) {
         state.array = payload[0];
         state.adminMessage = state.array.message;
         state.emoticonNumber = state.array.emoticonCount;
         state.adminMessageduration = state.array.messageDuration;
         state.loaded = true;
     },
    // Mutation of reports statistics.
     mutateStatistics(state,payload){
         state.statistics = payload;
     },
    mutateSettings(state,payload){
        state.users = payload;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}