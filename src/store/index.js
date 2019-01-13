import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutation'
import Block from '../block'

Vue.use(Vuex)

const state = {
    columnNum: 12,
    rowNum: 22,
    matrix: [],
    randomBlock: false,  // 是否获取随机形状
    accRows: 0, // 已累积行数
    gameOver: false ,
    curBlock: {}  // 当前下落的小方块
}

export default new Vuex.Store({
    state,
    // getters,
    // actions,
    mutations: {
        left(state) {
            state.curBlock.left(state.matrix)
        },

        right(state) {
            state.curBlock.right(state.matrix)
        },

        down(state, payload) {
            let interval = setInterval(function(){
                if(!payload.block.down(state.matrix, state.accRows)) {
                    clearInterval(interval)
                    state.accRows += payload.block.shapeLength ? payload.block.shapeLength : 0
                    state.randomBlock = true
                }
            }, 1000)
        },

        setCurBlock(state, payload) {
            state.curBlock = payload.block
        },

        nextBlock(state) {
            state.randomBlock = false
        },

        gameOver(state) {
            state.gameOver = true
        }
    }
  })