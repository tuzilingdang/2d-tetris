<template>
    <div class="keyboard">
        <div class="top-btn">
            <div class="top-btn-item">
                <span class="top-btn-item-txt" @click="reset">RESET</span>
            </div>
            <div class="top-btn-item" @click="pauseAndStart">
                <span class="top-btn-item-txt">P/S</span>
            </div>
            <div class="top-btn-item">
                <span class="top-btn-item-txt">SOUND</span>
            </div>
            <div class="top-btn-item" @click="onAndOff">
                <span class="top-btn-item-txt">ON/OFF</span>
            </div>
        </div>

        <div class="bottom-btn">
            <div class="bottom-btn-arrows">
                <div class="left" @click="left"></div>
                <div class="right" @click="right"></div>
                <div class="up"></div>
                <div class="down" @click="fall"></div>
            </div>
            <div class="bottom-btn-circle">
                <div class="bottom-btn-circle-start" @click="rotate"></div>
                <span>
                    <strong>ROTATE</strong>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import Block from '../../block'
    import { BLOCK_INDEX } from '../../const'
    import { sound } from '../../common/sound'
    // import { music } from '../../common/music'

    export default {
        name: 'KeyBoard',

        data() {
            return {
                levelIdx: 0,

            }
        },

        computed: mapState([
            'isGameOn',
            'isStart', // 游戏开始状态
            'isPause', // 暂停状态
            'isSoundOn', // 声音状态
            'gameOver',
            'columnNum',
            'rowNum',
            'matrix',
            'accRowsList'
        ]),

        methods: {
            onAndOff() {
                if (!this.isGameOn) {
                    if(this.isSoundOn) sound && sound.on()
                    this.$store.commit({
                        type: 'on'
                    })
                    return
                }

                this.$store.commit({
                    type: 'off'
                })

            },

            pauseAndStart() {
                if (!this.isGameOn || this.gameOver) return
                if(!this.isStart || this.isPause) {
                    if(this.isSoundOn) sound && sound.start()
                    this.start()
                }
                else {
                    if(this.isStart) {
                        if(this.isSoundOn) sound && sound.pause()
                        this.pause()
                    }
                }
            },

            start() {
                if (!this.isGameOn) return

                if (!this.isStart) {
                    if(this.isSoundOn) sound && sound.gameStart()
                    this.startGame()
                }

                if (this.isStart && this.isPause) {
                    this.$store.commit({
                        type: 'stopPause'
                    })

                    this.$store.commit({
                        type: 'down'
                    })
                }
            },
            reset() {
                if (!this.isGameOn) return
                // this.isStart = true

                if(this.isSoundOn) sound && sound.reset()

                this.$store.commit({
                    type: 'reset'
                })
            },

            startGame() {
                let block = this.getRandomBlock()
                let nextBlock = this.getRandomBlock()

                    !this.isStart && this.$store.commit({
                        type: 'startGame',
                        block
                    })

                this.$store.commit({
                    type: 'setNextBlock',
                    block: nextBlock
                })

                this.$store.commit({
                    type: 'down'
                })
            },

            left: function () {
                if (!this.isStart) {
                    if (this.levelIdx > 0) {
                        this.$store.commit({
                            type: 'setLevel',
                            idx: --this.levelIdx
                        })
                    }
                    return
                }
                if (this.isPause || this.gameOver) return

                if(this.isSoundOn) sound && sound.move()

                this.$store.commit({
                    type: 'stopDown'
                })
                this.$store.commit({
                    type: 'left',
                })
                this.$store.commit({
                    type: 'down',
                })
            },

            right() {
                if (!this.isStart) {
                        if (this.levelIdx >= 0 && this.levelIdx < 2) {
                            this.$store.commit({
                                type: 'setLevel',
                                idx: ++this.levelIdx
                            })
                        }
                        return
                }
                if (this.isPause || this.gameOver) return

                if(this.isSoundOn) sound && sound.move()

                this.$store.commit({
                    type: 'stopDown'
                })
                this.$store.commit({
                    type: 'right',
                })
                this.$store.commit({
                    type: 'down',
                })
            },

            rotate() {
                if (!this.isStart || this.isPause || this.gameOver) return

                if(this.isSoundOn) sound && sound.rotate()

                this.$store.commit({
                    type: 'stopDown'
                })

                this.$store.commit({
                    type: 'rotate',
                })

                this.$store.commit({
                    type: 'down',
                })
            },

            fall() {
                if (!this.isStart || this.isPause) return

                if(this.isSoundOn) sound && sound.fall()

                this.$store.commit({
                    type: 'stopDown'
                })

                this.$store.commit({
                    type: 'fall',
                    accRowsList: this.accRowsList
                })
            },

            pause() {
                if (!this.isStart || this.isPause) return

                this.$store.commit({
                    type: 'pause'
                })
            },

            // initMatrix() {
            //     for (let i = 0; i < this.rowNum; i++) {
            //         this.$set(this.matrix, i, new Array())
            //         for (let j = 0; j < this.columnNum; j++) {
            //             this.$set(this.matrix[i], j, 0)
            //         }
            //     }
            // },

            getRandomBlock() {
                let random = Math.floor(Math.random() * BLOCK_INDEX.length)
                let type = BLOCK_INDEX[random]
                return new Block(type)
            }
        }
    }
</script>

<style lang="less">
    @import './keyboard.less';
</style>