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
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 2vh;

        #game {
            width: 90%;
            max-width: 360px;
            height: 88vh;
            border: #c5bab9 3px solid;;
            border-radius: 40px;
            margin: auto;
            padding-top: 15%;
            // background: #3c3a3a;
            background: -webkit-gradient(linear, 0% 0%, 45% 0%, from(#3C3A3A), to(#3C3A3A), color-stop(0.0, #6B6868));
            box-shadow: 10px 8px 5px #999;
        }
    }
</style>