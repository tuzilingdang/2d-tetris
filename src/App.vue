<template>
    <div id="app">
        <div id="game">
            <Screen />
            <KeyBoard />
            <!-- <HelloWorld /> -->
        </div>

    </div>
</template>

<script>
    import Screen from './components/screen/Screen.vue'
    import KeyBoard from './components/keyboard/KeyBoard.vue'
    import HelloWorld from './components/HelloWorld.vue'

    export default {
        name: 'app',
        components: {
            Screen,
            KeyBoard,
            HelloWorld
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