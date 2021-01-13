import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        joueurs: [],
        test: "bonjour",
        equipes: [],
        playerTraining: "",
        bigFight: []
    },
    mutations: {
        updatePlayers(state, players) {
            state.joueurs = [...players]
        },
        updateTeams(state, teams) {
            state.equipes = [...teams]
        },
        updateTrainingPlayer(state, player) {
            state.playerTraining = player
        },
        updateBigFight(state, players) {
            state.bigFight = [...players]
        }
    },
    actions: {},
    modules: {},
    plugins: [
        createPersistedState({
            getState: (key) => Cookies.getJSON(key),
            setState: (key, state) => Cookies.set(key, state, { expires: 3, secure: true })
        })
    ]
}, )