 import Services from '../../services/api'
const state = {
    array: [],
    adminMessage : "",
    emoticonNumber : 3,
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
      ]
};

const getters = {
    get_array: state => state.array,
    get_adminMessage: state => state.adminMessage,
    get_emoticonNumber : state => state.emoticonNumber,
    get_adminMessageduration : state => state.adminMessageduration,
    get_token : state => state.token,
    get_items : state => state.items
};

const actions ={
    updateTokenAction: function ({commit}, payload) {
        commit('mutateToken', payload)
     },
    async updateGUISettingsAction ({commit}, payload) {
        var data = await Services.getSettings(payload)
        commit('mutateGUISettings', data)
    }
};

const mutations = {
    mutateGUISettings(state, payload) {
         state.array = payload;
         console.log("ovo je payload "+payload[0]);
         state.adminMessage = state.array[0].poruka;
         state.emoticonNumber = state.array[0].brojEmotikona;
         state.adminMessageduration = state.array[0].trajanjePoruke;
     },
    mutateToken(state, payload) {
        state.token = payload.token
     }
};

export default {
    state,
    getters,
    actions,
    mutations
}