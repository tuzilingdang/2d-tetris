<template>
    <div class="screen">
        <div class="screen-grid">
            <div class="square" v-for="n in columnNum*rowNum"></div>
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
    export default {
        name: 'Screen',
        props: {
            msg: String,
            columnNum: Number,
            rowNum: Number
        }
    }
</script>

<style scoped>
    .screen {
        width: 80%;
        height: auto;
        margin: 20px auto;
        padding: 5%;
        border: 3px solid #666;
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
    }

    .screen-grid {
        width: 70%;
        height: 100%;
        border: 2px solid #666;
        display: grid;
        grid-template-rows: repeat(22, 1fr);
        grid-template-columns: repeat(12, 1fr);
    }

    .square {
        border: #666 1px solid;
    }

    .square:after {
        content: '';
        display: block;
        padding-top: 100%;
    }

    .square::before {
        content: '';
        display: block;
        padding-bottom: 80%;
        padding-left: 80%;
    }

    .screen-status {
        width: 30%;
        border: #666 1px solid;
    }
</style>