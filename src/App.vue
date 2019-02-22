<template>
    <div id="app">
        <div id="game">
            <Screen />
            <KeyBoard />
        </div>

    </div>
</template>

<script>
    import Screen from './components/screen/Screen.vue'
    import KeyBoard from './components/keyboard/KeyBoard.vue'

    export default {
        name: 'app',
        components: {
            Screen,
            KeyBoard,
        }
    }
</script>

<style lang='less'>
    body {
        // padding-top: constant(safe-area-inset-top);
        // padding-left: constant(safe-area-inset-left); //如果未竖屏时为0                
        // padding-right: constant(safe-area-inset-right); //如果未竖屏时为0                
        // padding-bottom: constant(safe-area-inset-bottom); //为底下圆弧的高度 34px    
        padding-bottom: constant(safe-area-inset-bottom);
        padding-bottom: env(safe-area-inset-bottom);
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 2vh;

        #game {
            width: 85%;
            max-width: 360px;
            max-height: 610px;
            height: 94vh;

            @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
                // iphoneX css部分
                height: 86vh;
                width: 90%;
            }

            border: #c5bab9 3px solid;
            border-radius: 40px;
            margin: auto;
            padding-top: 10vh;
            background: -webkit-gradient(linear, 0% 0%, 45% 0%, from(#3C3A3A), to(#3C3A3A), color-stop(0.0, #6B6868));
            box-shadow: 10px 8px 5px #999;
        }
    }
</style>