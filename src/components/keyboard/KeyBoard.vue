<template>
    <div class="keyboard">
        <div class="top-buttons">
            <div class="on"></div>
            <div class="pause"></div>
            <div class="music"></div>
        </div>

        <div class="bottom-buttons">
            <div class="arrows">
                <div class="left" @click="left"></div>
                <div class="right" @click="right"></div>
                <div class="up"></div>
                <div class="down" @click="fall"></div>
            </div>

            <div class="rotate" @click="start">
                <div class="rotate-btn"></div>
                <h2>Rotate/旋转</h2>
            </div>

        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import Block from '../../block'

    export default {
        name: 'KeyBoard',
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
            'accRows',
            'gameOver'
        ]),

        watch: {
            randomBlock: function (newVal) {
                if (newVal) this.nextBlock()
            }
        },
        created() {},
        methods: {

            start() {
                alert('start')
            },

            left() {
                this.$store.commit({
                    type: 'left',
                })
            },

            right() {
                this.$store.commit({
                    type: 'right',
                })
            },

            fall() {
                this.$store.commit({
                    type: 'fall',
                })
            },


        }
    }
</script>

<style lang="less">
    @import './keyboard.less';
</style>