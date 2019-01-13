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
                <div class="right" @click="right">></div>
                <div class="up"></div>
                <div class="down"></div>
            </div>

            <div class="rotate">
                <div class="rotate-btn"></div>
                <h2>Rotate/旋转</h2>
            </div>
            
        </div>

        
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import Block from '../../block'
    // import func from './vue-temp/vue-editor-bridge';
    import { BLOCK_INDEX } from '../../const'

    export default {
        name: 'KeyBoard',
        data: function () {
            return {
                // matrix: [],
                d1_matrix: [0, 0, 0, 0]
            };
        },
        computed: mapState([
            'matrix',
            'accRows',
            'gameOver'
        ]),

        watch: {

        },

        methods: {
            left() {
                this.$store.commit({
                    type: 'left'
                })
            },

            right() {
                this.$store.commit({
                    type: 'right'
                })
            },

        }
    }
</script>

<style lang="less">
 @import './keyboard.less';
</style>