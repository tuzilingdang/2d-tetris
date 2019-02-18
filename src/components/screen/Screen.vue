<template>
    <div class="screen" :class="isGameOn ? 'on' : 'off'">
        <div class="screen-grid">
            <img class="game_over_img" src="../../assets/wilson_pixel_game_over.png" v-if="gameOver" alt="">
            <img class="game_over_img" src="../../assets/wilson_pixel.png" v-if="isGameOn && !isStart && !gameOver" alt="">
            <i class="game_over" v-if="gameOver"></i>
            <div class="screen-grid-area" :class="!isGameOn ? 'hidden': ''">
                <div class="square"  :class="!gameOver && matrix[parseInt((n-1)/columnNum)][(n-1)%columnNum ] ? 'black':''"
                    v-for="n in columnNum*rowNum" :id="`${parseInt((n-1)/columnNum)}-${(n-1)%columnNum }`" v-bind:key="n">
                    <div class="square-inner"></div>
                </div>
            </div>

            <!-- test 1维数组  -->
            <!-- <div class="screen-grid-area">
                <div class="square" :class="d1_matrix[n] ? 'black':''" v-for="n in d1_matrix.length" :id="`${n }`" v-bind:key="n">
                    <div class="square-inner"></div>
                </div>
            </div> -->
        </div>

        <div class="screen-status">
            <div class="screen-status-next screen-status-item" v-if="isGameOn">
                <span>NEXT</span>
                <div class="screen-status-nextshape-area ">
                    <div class="square"  :class="!gameOver && nextShapeMat[parseInt((n-1)/4)][(n-1)%4 ] ? 'black':''"
                        v-for="n in 8" :id="`${parseInt((n-1)/4)}-${(n-1)%4 }`" v-bind:key="n">
                        <div class="square-inner"></div>
                    </div>
                </div>
            </div>
            <div class="screen-status-grade screen-status-item" v-if="isGameOn">
                <span>SCORE</span>
                <p>{{score}}</p>
            </div>
            <!-- <div class="screen-status-best-grade"></div> -->
            <div class="screen-status-level screen-status-item" v-if="isGameOn">
                <span>LEVEL</span>
                <p>{{level}}</p>
            </div>
            <div class="screen-status-music screen-status-item"></div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import Block from '../../block'
    import { BLOCK_INDEX } from '../../const'
    import { sound } from '../../common/sound'

    export default {
        name: 'Screen',
        data: function () {
            return {
                d1_matrix: [0, 0, 0, 0]
            };
        },
        computed: mapState([
            'isGameOn',
            'isSoundOn',
            'isStart',
            'score',
            'level',
            'columnNum',
            'rowNum',
            'matrix',
            'nextShapeMat',
            'showNextBlock',
            'accRowsList',
            'gameOver',
            'clearFlag'
        ]),

        watch: {
            showNextBlock: function (newVal) {
                if (newVal) this.initShowNextBlock()
            },

            clearFlag: function (newVal) {
                if (newVal) {
                    this.stopDown()
                    setTimeout(() => {
                        this.clearRows()
                        this.initShowNextBlock()
                    }, 1000)
                }
            }
        },
        created() {
            this.init()
        },
        methods: {
            init() {
                this.initMatrix()
                // this.start()
                this.initNextShapeMat()
            },

            getNextBlock() {
                let block = this.getRandomBlock()

                this.$store.commit({
                    type: 'setNextBlock',
                    block
                })
            },

            initShowNextBlock() {
                const accMax = Math.max(...this.accRowsList)
                if (accMax >= this.rowNum) {
                    if(this.isSoundOn) sound && sound.gameOver()
                    this.$store.commit('gameOver')
                    return
                }

                // let block = this.getRandomBlock()

                this.$store.commit({
                    type: 'setCurBlock',
                    // block
                })

                this.getNextBlock()

                this.$store.commit({
                    type: 'down',
                })
            },

            initMatrix() {
                for (let i = 0; i < this.rowNum; i++) {
                    this.$set(this.matrix, i, new Array())
                    for (let j = 0; j < this.columnNum; j++) {
                        this.$set(this.matrix[i], j, 0)
                    }
                }
            },

            initNextShapeMat() {
                for (let i = 0; i < 2; i++) {
                    this.$set(this.nextShapeMat, i, new Array())
                    for (let j = 0; j < 3; j++) {
                        this.$set(this.nextShapeMat[i], j, 0)
                    }
                }
            },

            getRandomBlock() {
                let random = Math.floor(Math.random() * BLOCK_INDEX.length)
                let type = BLOCK_INDEX[random]
                return new Block(type)
            },

            clearRows() {
                this.$store.commit({
                    type: 'clear',
                })
            },

            stopDown() {
                this.$store.commit({
                    type: 'stopDown'
                })
            }
        }
    }
</script>

<style lang="less">
    @import './screen.less';
</style>