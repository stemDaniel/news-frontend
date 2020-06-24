import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = { searchesList: [], displayMenu: true, starredsList: [] }


const mutations = {
    addSearch(state, payload){
        state.searchesList.push(payload)
    },
    removeSearch(state, payload){
        state.searchesList = state.searchesList.filter(search => search._id != payload)
    },
    addStarred(state, payload){
        state.starredsList.push(payload)
    },
    removeStarred(state, payload){
        state.starredsList = state.starredsList.filter(starred => starred._id != payload)
    },
    toggleMenu(state, payload){
        if(payload === undefined) {
            state.displayMenu = !state.displayMenu
        } else {
            state.displayMenu = payload
        }
        
    }
}

const store = new Vuex.Store({ state, mutations })

export default store