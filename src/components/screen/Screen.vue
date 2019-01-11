<template>
    <div class="screen">
        <div class="screen-grid">
            <div class="screen-grid-area">
                <div class="square" :class="matrix[parseInt((n-1)/columnNum)][(n-1)%columnNum ] ? 'black':''" v-for="n in columnNum*rowNum" :id="`${parseInt((n-1)/columnNum)}-${(n-1)%columnNum }`" v-bind:key="n">
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
            'matrix'
        ]),
        created() {
            this.init()
        },
        methods: {
            init() {
                this.initMatrix()
                this.start()
            },

            start() {
                let block = new Block('L')
                let that = this;

                this.$store.commit({
                    type: 'down',
                    block
                })
            },

            initMatrix() {
                // this.matrix = new Array()
                for (let i = 0; i < this.rowNum; i++) {
                    // this.matrix[i]=new Array(); 
                    this.$set(this.matrix, i, new Array())
                    for (let j = 0; j < this.columnNum; j++) {
                        this.$set(this.matrix[i], j, 0)
                    }
                }
            }
        }
    }
</script>

<style lang="less">
    @import './screen.less';
</style>