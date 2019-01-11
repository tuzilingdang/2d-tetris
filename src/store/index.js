import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutation'
import { blankMatrix, lastRecord, maxPoint, blockType } from '../const'
import Block from '../block'

Vue.use(Vuex)

const state = {
    columnNum: 12,
    rowNum: 22,
    matrix: [],
    randomBlock: false,  // 是否获取随机形状
    accRows: 0, // 已累积行数
}

export default new Vuex.Store({
    state,
    // getters,
    // actions,
    mutations: {
        down(state, payload) {
            let interval = setInterval(function(){
                if(!payload.block.down(state.matrix, state.accRows)) {
                    clearInterval(interval)
                    state.randomBlock = true
                }
            }, 1000)
        },
        nextBlock(state, payload) {
            state.accRows += payload.shape && payload.shape.length ? payload.shape.length : 0
            state.randomBlock = false
        }
    }
  })