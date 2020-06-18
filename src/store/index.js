import Vuex from 'vuex';
import Vue from 'vue';
import podaci from './modules/podaci';

Vue.use(Vuex);

export default new Vuex.Store({
modules : {
    podaci
}

});