<template>
    <div class="screen">
        <div class="screen-grid"> 
            <div class="screen-grid-area">
                <div class="square" v-for="n in columnNum*rowNum" v-bind:key>
                    <div class="square-inner"  ></div>
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

<style lang="less">
@import './screen.less';
</style>
