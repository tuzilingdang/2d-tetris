<template>
    <div class="screen">
        <div class="screen-grid"> 
            <div class="screen-grid-area">
                <div class="square" v-for="n in columnNum*rowNum">
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
        padding: 1%;
    }

    .screen-grid-area {
        width: 100%;
        height: 100%;
        /* border: #6666662e 1px solid; */
        display: grid;
        grid-template-rows: repeat(22, 1fr);
        grid-template-columns: repeat(12, 1fr);
    }

    .square {
        border: #6666662e 1px solid;
        margin: 0px 0px -1px -1px; 
    }

    .square:after {
        content: '';
        display: block;
        padding-top: 100%;
    }

    .screen-status {
        margin-left: 2%;
        width: 30%;
        border: #666 1px solid;
    }

    .square-inner {
        float: left;
        width: 70%;
        margin-left: 15%;
        margin-top: 15%;
    }

    .square-inner:after {
        content:'';
        display: block;
        padding-top: 100%;
        background: #66666617;
    }
</style>