<template>
    <div class="screen">
        <div class="screen-grid">
            <div class="screen-grid-area">
                <div class="square" :class="matrix[parseInt((n-1)/columnNum)][(n-1)%columnNum ] ? 'black':''" v-for="n in columnNum*rowNum" :id="`${parseInt((n-1)/columnNum)}-${(n-1)%columnNum }`" v-bind:key="n">
                    <div class="square-inner"></div>
                </div>
            </div>
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
    import Block from '../../block'

    export default {
        name: 'Screen',
        props: {
            msg: String,
            columnNum: Number,
            rowNum: Number
        },
        data: function () {
            return {
                matrix:[]
            };
        },
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
                that.matrix = block.down(that.matrix)
                // setInterval(()=> {
                //     that.matrix = block.down(that.matrix)
                // }, 1000)
                
            },

            initMatrix() {
                this.matrix = new Array()
                for(let i = 0; i < this.rowNum; i++) {
                    this.matrix[i]=new Array(); 
                    for(let j = 0; j < this.columnNum; j++){
                        this.matrix[i][j] = 0
                    }
                }
            }
        }
    }
</script>

<style lang="less">
    @import './screen.less';
</style>