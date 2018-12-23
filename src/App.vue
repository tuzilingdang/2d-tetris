<template>
    <div id="app">
        <div id="game">
            <WebglTest />
            <Screen column-num="12" row-num="22" />
            <KeyBoard />
        </div>

    </div>
</template>

<script>
    import Screen from './components/screen/Screen.vue'
    import KeyBoard from './components/keyboard/KeyBoard.vue'
    import WebglTest from './components/WebglTest.vue'

    export default {
        name: 'app',
        components: {
            Screen,
            KeyBoard,
            WebglTest
        }
    }
</script>

<style lang='less'>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 5vh;

        #game {
            width: 90%;
            height: 100vh;
            border: #e6493d 1px solid;
            border-radius: 40px;
            margin: auto;
            padding-top: 10%;
        }
    }
</style>