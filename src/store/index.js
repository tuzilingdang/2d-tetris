import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    columnNum: 12,
    rowNum: 22,
    matrix: [],
    randomBlock: false, // 是否获取随机形状
    accRowsList: Array(12).fill(0), // 累计直方图
    accMax: [],  // 已累积行数
    gameOver: false,
    curBlock: {}, // 当前下落的小方块
    clearRows: [], // 用于暂存需要删除的行
    clearFlag: false,
    interval:{}
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

        rotate(state) {
            state.curBlock.rotate(state.matrix)
        },

        fall(state, payload) {
            if (state.curBlock.fall(state.matrix, payload.accRowsList, state.clearRows)) {
                // this.gameOver()
                if (state.clearRows.length == 0) {
                    state.randomBlock = true
                }
                if (state.clearRows.length != 0) state.clearFlag = true
            }

        },

        down(state) {
            state.interval = setInterval(function () {
                if (!state.curBlock.down(state.matrix, state.accRowsList, state.clearRows)) {
                    clearInterval(state.interval)

                    // let shapeColHeight = Array(payload.block.shapeWidth).fill(0)
                    // for(let i = 0; i < payload.block.shapeWidth; i ++) {
                    //     for(let j = 0; j < payload.block.shapeHeight; j ++ ) {
                    //         shapeColHeight[i] += payload.block.shape[j][i]
                    //     }        
                    //     state.accRowsList[payload.block.pos.y + i] += shapeColHeight[i]
                    // }
                    // let block = payload.block
                    // for (let i = 0; i < block.shapeHeight; i++) {
                    //     for (let j = 0; j < block.shapeWidth; j++) {
                    //         // if ((block.shape[i][j] && i == 0) || (block.shape[i][j] && i > 0 && !block.shape[i - 1][j]))
                    //         //     state.accRowsList[block.pos.y + j] += block.pos.x + i

                    //         if(block.shape[i][j] && i == 0 ) state.accRowsList[block.pos.y + j] += block.shapeHeight;
                    //         if(block.shape[i][j] && i > 0 && !block.shape[i - 1][j]) state.accRowsList[block.pos.y + j] +=block.shapeHeight - i;
                    //     }

                    // }
                    let accMax = Math.max(...state.accRowsList)
                    if (accMax > state.matrix) this.gameOver()
                    if (state.clearRows.length != 0) state.clearFlag = true

                    state.randomBlock = true
                }
            }, 1000)
        },

        stopDowm(state) {
            clearInterval(state.interval)
        },

        setCurBlock(state, payload) {
            state.curBlock = payload.block
        },

        nextBlock(state) {
            state.randomBlock = false
        },

        gameOver(state) {
            state.gameOver = true
        },

        clear(state) {
            const _accRowsList = state.accRowsList
            let matrix = state.matrix
            let clearRows = state.clearRows

            let accMax = Math.max(..._accRowsList)
            let matWidth = matrix[0].length
            let matLength = matrix.length

            clearRows.forEach(idx => {
                for (let i = idx; i >= (matLength - accMax) && i <= (matLength - 1); i--) {
                    matrix[i].splice(0, matWidth, ...matrix[i - 1])
                }
            });

            state.accRowsList = _accRowsList.map(element => {
                return element - clearRows.length
            })
            
            state.clearRows = []
            state.clearFlag = false
        }
    }
})