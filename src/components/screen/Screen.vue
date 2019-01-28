<template>
    <div class="screen">
        <div class="screen-grid">
            <img class="game_over_img" src="../../assets/wilson_pixel_game_over.png" v-if="gameOver" alt="">
            <i class="game_over" v-if="gameOver"></i>
            <div class="screen-grid-area">
                <div class="square" :class="!gameOver && matrix[parseInt((n-1)/columnNum)][(n-1)%columnNum ] ? 'black':''" v-for="n in columnNum*rowNum" :id="`${parseInt((n-1)/columnNum)}-${(n-1)%columnNum }`" v-bind:key="n">
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

        <div class="screen-status" style="width:100px;height:100px;background: red;" @click="status">
            <div class="screen-status-grade"></div>
            <div class="screen-status-best-grade"></div>
            <div class="screen-status-next-shape"></div>
            <div class="screen-status-speed"></div>
            <div class="screen-status-music"></div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import Block from '../../block'
    // import func from './vue-temp/vue-editor-bridge';
    import { BLOCK_INDEX } from '../../const'

    export default {
        name: 'Screen',
        // props: {
        //     msg: String,
        //     columnNum: Number,
        //     rowNum: Number
        // },
        data: function () {
            return {
                // matrix: [],
                d1_matrix: [0, 0, 0, 0]
            };
        },
        computed: mapState([
            'columnNum',
            'rowNum',
            'matrix',
            'randomBlock',
            'accRowsList',
            'gameOver'
        ]),

        watch: {
            randomBlock: function (newVal) {
                if (newVal) this.nextBlock()
            }
        },
        created() {
            this.init()
        },
        methods: {
            init() {
                this.initMatrix()
                // this.initAccRows()
                this.start()
            },

            status() {
                alert('start')
            },

            start() {
                let block = this.getRandomBlock()

                this.$store.commit({
                    type: 'setCurBlock',
                    block
                })

                this.$store.commit({
                    type: 'down',
                    block
                })
            },

            nextBlock() {
                if (this.accRows > this.rowNum) {
                    this.$store.commit('gameOver')
                    return
                }

                let block = this.getRandomBlock()

                this.$store.commit({
                    type: 'setCurBlock',
                    block
                })

                this.$store.commit({
                    type: 'nextBlock',
                })

                this.$store.commit({
                    type: 'down',
                    block
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

            // initAccRows() {
            //     this.accRowsList = Array(this.columnNum).fill(0)
            // },

            getRandomBlock() {
                let random = Math.floor(Math.random() * BLOCK_INDEX.length)
                let type = BLOCK_INDEX[3]
                return new Block(type)
            }
        }
    }
</script>

<style lang="less">
    @import './screen.less';
</style>