import store from '../store/index'

const AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext
// const qqUrl = 'https://mail.qq.com/cgi-bin/readmail?sid=T_TyBKvYsVA5XW8z&mailid=ZC2617-6kFtZMu4LM2kQ3Et4BPEb92&nocheckframe=true&t=attachpreviewer&select=1&selectfile=&seq=';
// const gitUrl = 'https://raw.githubusercontent.com/tuzilingdang/2d-tetris/master/src/assets/tetris-music_lite.mp3'

export let sound = {}
export const hasWebAudio = {
  data: !!AudioContext && location.protocol.indexOf('http') !== -1
}

getSound().then( res => {
    sound = res
})

function getSound() {
    return new Promise((resolve, reject) => {
        let _sound = {}
        const audioCtxt = new AudioContext()
        const request = new XMLHttpRequest()
        const srcUrl = 'https://raw.githubusercontent.com/tuzilingdang/2d-tetris/master/src/assets/tetris-music_lite.mp3'
        request.open('GET', srcUrl, true)
        request.responseType = 'arraybuffer'
        
        request.onload = () => {
            audioCtxt.decodeAudioData(
              request.response,
              buffer => {
                // 将拿到的audio解码转为buffer
                const getBuffer = () => {
                  // 创建source源。
                  const source = audioCtxt.createBufferSource()
                  source.buffer = buffer
                  source.connect(audioCtxt.destination)
                  return source
                }
        
                _sound.on = () => {
                  // 游戏机开启
                  if (!store.state.isSoundOn) {
                    return
                  }
                  getBuffer().start(0, 0, 2.1)
                }
        
                _sound.gameStart = () => {
                  // 游戏开始声音
                  if (!store.state.isSoundOn) {
                    return
                  }
                  getBuffer().start(0, 8.15, 0.7)
                }

                _sound.pause = () => {
                  // 游戏暂停声音
                  if (!store.state.isSoundOn) {
                    return
                  }
                  getBuffer().start(0, 7.5, 0.4)
                }

                _sound.start = () => {
                  // 游戏取消暂停声音
                  if (!store.state.isSoundOn) {
                    return
                  }
                  getBuffer().start(0, 6.6, 0.4)
                }

                _sound.reset = () => {
                  // 游戏开始声音
                  if (!store.state.isSoundOn) {
                    return
                  }
                  getBuffer().start(0, 0, 2.1)
                }
        
                // 满行clear声音
                _sound.clear = () => {
                  if (!store.state.isSoundOn) {
                    return
                  }
                  getBuffer().start(0, 2.1, 1.4)
                }
        
                // 方块掉落声音
                _sound.fall = () => {
                  if (!store.state.isSoundOn) {
                    return
                  }
                  getBuffer().start(0, 3.1, 0.5)
                }
        
                // 游戏结束声音
                _sound.gameOver = () => {
        
                  if (!store.state.isSoundOn) {
                    return
                  }
                  getBuffer().start(0, 4.7, 2.7)
                }
        
                // 旋转声音
                _sound.rotate = () => {
                  if (!store.state.isSoundOn) {
                    return
                  }
                  getBuffer().start(0, 4.6, 0.6)
                }
        
                // 左右方向箭头声音
                _sound.move = () => {
                  if (!store.state.isSoundOn) {
                    return
                  }
                  getBuffer().start(0, 3.8, 0.4)
                }

                resolve(_sound)
              },
              error => {
                if (window.console && window.console.error) {
                  window.console.error('音频文件读取错误', error)
                  hasWebAudio.data = false
                  reject(error)
                }
              }
            )
          }
        
        request.send()
    }) 
}

