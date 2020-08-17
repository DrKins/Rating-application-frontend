const state = {
    array: [],
    adminMessage : "Hvala na povjerenju! asdweqsdaasgqeasdwqeqwewsdsa",
    emoticonNumber : 0,
    adminMessageduration : 0,
    emoticonPack: 'yellowPack',
    token : 'nntoken',
    level: {user:'troll',level:2,company:''},
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
      statistics: {
          temp:[0,1,1,4,1],
          emotc:5,
      },
      statisticsHour: {},
};

const getters = {
    get_array: state => state.array,
    get_adminMessage: state => state.adminMessage,
    get_emoticonNumber : state => state.emoticonNumber,
    get_adminMessageduration : state => state.adminMessageduration,
    get_emoticonPack : state => state.emoticonPack,
    get_token : state => state.token,
    get_items : state => state.items,
    get_users : state => state.users,
    get_level : state => state.level,
    get_statistics : state => state.statistics,
    get_statisticsHour : state => state.statisticsHour,
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
    // Action of getting all users from backend.
    getUsers: function({commit},payload) {
        commit('mutateSettings',payload);
    },
    // Action of getting hour stats from backend.
    getStatisticsHourAction: function({commit},payload) {
        commit('mutateStatisticsHour',payload);
    }
};

const mutations = {
    // Mutation for token and level of user.
    mutateToken(state, payload) {
        state.token = payload.token
        state.level.level = payload.level
        state.level.user = payload.name
        state.level.company = payload.company
     },
    // Mutation of GUI settings.
    mutateGUISettings(state, payload) {
         state.array = payload[0];
         state.adminMessage = state.array.message;
         state.emoticonNumber = state.array.emoticonCount;
         state.adminMessageduration = state.array.messageDuration;
         state.emoticonPack = state.array.emoticonPack;
     },
    // Mutation of reports statistics.
     mutateStatistics(state,payload){
         state.statistics = payload;
     },
    // Mutation of getting all users from backend.
    mutateSettings(state,payload){
        state.users = payload;
    },
    // Mutation of getting hour stats from backend.
    mutateStatisticsHour(state,payload){
    state.statisticsHour = payload.temp;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}