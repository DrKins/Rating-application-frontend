const state = {
    array: [],
    adminMessage : "",
    emoticonNumber : 0,
    adminMessageduration : 0,
    token : 'nntoken',
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
      loaded: false,
};

const getters = {
    get_array: state => state.array,
    get_adminMessage: state => state.adminMessage,
    get_emoticonNumber : state => state.emoticonNumber,
    get_adminMessageduration : state => state.adminMessageduration,
    get_token : state => state.token,
    get_items : state => state.items,
    get_loaded : state => state.loaded
};

const actions ={
    updateTokenAction: function ({commit}, payload) {
        commit('mutateToken', payload)
     },
    updateGUISettingsAction: function ({commit}, payload) {
        commit('mutateGUISettings', payload)
    }
};

const mutations = {
    mutateToken(state, payload) {
        state.token = payload.token
        state.loaded = false
     },
    mutateGUISettings(state, payload) {
         state.array = payload[0];
         console.log("ovo je payload za mutateGUISettings "+JSON.stringify(payload));
         state.adminMessage = state.array.poruka;
         state.emoticonNumber = state.array.brojEmotikona;
         state.adminMessageduration = state.array.trajanjePoruke;
         state.loaded = true;
     },
};

export default {
    state,
    getters,
    actions,
    mutations
}