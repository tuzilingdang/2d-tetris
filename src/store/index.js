import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const LEVELLIST =['SIMPLE','MIDDLE','HARD']
const SPEEDLIST = [1000, 500, 100];

const state = {
    isGameOn: false, // 游戏机开启状态
    isStart: false,  // 游戏开始状态
    isPause: false,  // 暂停状态
    isSoundOn: true, // 声音状态
    gameOver: false, // 游戏是否Over
    score: 0, // 得分
    level: 'SIMPLE', //游戏难度
    speed: 1000,
    columnNum: 12,
    rowNum: 22,
    matrix: [], // 屏幕矩阵
    nextShapeMat: [], // 下一个block形状矩阵
    showNextBlock: false, // 是否获取随机形状
    accRowsList: Array(12).fill(0), // 累计直方图
    accMax: [],  // 已累积行数
    curBlock: {}, // 当前下落的小方块
    nextBlock: {}, // 下一个下落的小方块
    clearRows: [], // 用于暂存需要删除的行
    clearFlag: false, // 行满消除标志
    interval:{}
}

export default new Vuex.Store({
    state,
    // getters,
    // actions,
    mutations: {
        on(state) {
            state.isGameOn = true

            for (let i = 0; i < state.rowNum; i++) {
                for (let j = 0; j < state.columnNum; j++) {
                    state.matrix[i].splice(j,1,0) 
                }
            }

            for (let i = 0; i < 2; i++) {
                for (let j = 0; j < 3; j++) {
                    state.nextShapeMat[i].splice(j,1,0) 
                }
            }
        },

        off(state) {
            state.isGameOn = false
            state.isStart = false
            state.isPause = false
            state.gameOver = false
            state.showNextBlock = false
            state.accRowsList = Array(12).fill(0)
            state.accMax = []
            state.curBlock = {}
            state.clearRows = []
            state.clearFlag = false
            clearInterval(state.interval)
        },

        reset(state) {
            state.isStart = false
            state.isPause = false
            state.gameOver = false
            state.showNextBlock = false
            state.accRowsList = Array(12).fill(0)
            state.accMax = []
            state.curBlock = {}
            state.clearRows = []
            state.clearFlag = false
            clearInterval(state.interval)
            for (let i = 0; i < state.rowNum; i++) {
                for (let j = 0; j < state.columnNum; j++) {
                    state.matrix[i].splice(j,1,0) 
                }
            }
        },

        startGame(state, payload) {
            state.isStart = true
            state.curBlock = payload.block
            state.showNextBlock = false
        },

        pause (state) {
            state.isPause = true
            clearInterval(state.interval)
        },

        stopPause(state) {
            state.isPause = false
        },

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
                if (state.clearRows.length == 0) {
                    state.showNextBlock = true
                }
                if (state.clearRows.length != 0) state.clearFlag = true
            }

        },

        down(state) {
            state.interval = setInterval(function () {
                if (!state.curBlock.down(state.matrix, state.accRowsList, state.clearRows)) {
                    clearInterval(state.interval)

                    let accMax = Math.max(...state.accRowsList)
                    if (accMax > state.matrix) this.gameOver()
                    if (state.clearRows.length != 0) state.clearFlag = true

                    state.showNextBlock = true
                }
            }, state.speed)
        },

        stopDown (state) {
            clearInterval(state.interval)
        },

        setCurBlock(state) {
            state.curBlock = state.nextBlock
            state.showNextBlock = false
        },

        setNextBlock(state, payload) {
            state.nextBlock = payload.block

            if(!state.nextBlock.shape) return
            for(let i = 0; i < 2; i++) {
                for(let j = 0; j < 4; j++) {
                    state.nextShapeMat[i][j] = state.nextBlock.shape[i] && state.nextBlock.shape[i][j]
                }
            }
        },

        gameOver(state) {
            state.gameOver = true
            state.isStart = false
        },

        clear(state) {
            const _accRowsList = state.accRowsList
            let matrix = state.matrix
            let clearRows = state.clearRows
            let clearNum = clearRows.length;

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

            const addScore = clearNum == 1 ? 10 : (clearNum == 2 ? 30 : (clearNum == 3 ? 60 : (clearNum == 4 ? 100 : 0)));
            state.score += addScore;
            
            state.clearRows = []
            state.clearFlag = false
        },

        setLevel(state,payload) {
            state.level = LEVELLIST[payload.idx]
            state.speed = SPEEDLIST[payload.idx]
        }
    }
})