import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutation'
import { blankMatrix, lastRecord, maxPoint, blockType } from '../const'
import Block from '../block'

Vue.use(Vuex)

const state = {
    columnNum: 12,
    rowNum: 22
}

export default new Vuex.Store({
    state,
    // getters,
    // actions,
    // mutations
  })