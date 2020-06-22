import PostService from '../../PostService'
const state = {
    niz: [],
    poruka : "",
    brojEmotikona : 0,
    trajanjePoruke :0
};

const getters = {
    get_niz: state => state.niz,
    get_poruka: state => state.poruka,
    get_brojEmotikona : state => state.brojEmotikona,
    get_trajanjePoruke : state => state.trajanjePoruke,
};

const actions ={

};

const mutations = {
     async update() {
        state.niz = await PostService.getSettings();
        state.poruka = state.niz[0].poruka;
        state.brojEmotikona = state.niz[0].brojEmotikona;
        state.trajanjePoruke = state.niz[0].trajanjePoruke;
      }
};

export default {
    state,
    getters,
    actions,
    mutations
}