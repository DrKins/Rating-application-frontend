import Services from '../../services'
const state = {
    array: [],
    adminMessage : "",
    emoticonNumber : 0,
    adminMessageduration : 0,
};

const getters = {
    get_array: state => state.array,
    get_adminMessage: state => state.adminMessage,
    get_emoticonNumber : state => state.emoticonNumber,
    get_adminMessageduration : state => state.adminMessageduration,
};

const actions ={

};

const mutations = {
     async update() {
        state.array = await Services.getSettings();
        state.adminMessage = state.array[0].adminMessage;
        state.emoticonNumber = state.array[0].emoticonNumber;
        state.adminMessageduration = state.array[0].adminMessageduration;
      }
};

export default {
    state,
    getters,
    actions,
    mutations
}