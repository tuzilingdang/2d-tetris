import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    columnNum: 12,
    rowNum: 22,
    matrix: [],
    randomBlock: false,  // 是否获取随机形状
    accRowsList: Array(12).fill(0), // 已累积行数
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

        fall(state,payload) {
            state.curBlock.fall(state.matrix, payload.accRowsList)
        },

        down(state, payload) {
            let interval = setInterval(function(){
                if(!payload.block.down(state.matrix, state.accRows)) {
                    clearInterval(interval)

                    // let shapeColHeight = Array(payload.block.shapeWidth).fill(0)
                    // for(let i = 0; i < payload.block.shapeWidth; i ++) {
                    //     for(let j = 0; j < payload.block.shapeHeight; j ++ ) {
                    //         shapeColHeight[i] += payload.block.shape[j][i]
                    //     }        
                    //     state.accRowsList[payload.block.pos.y + i] += shapeColHeight[i]
                    // }
                    let block = payload.block
                    for (let i = 0; i < block.shapeHeight; i++) {
                        for (let j = 0; j < block.shapeWidth; j++) {
                            if ((block.shape[i][j] && i == 0) || (block.shape[i][j] && i > 0 && !block.shape[i - 1][j]))
                                state.accRowsList[block.pos.y + j] += block.pos.x + i
                        }
            
                    }

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