<template>
    <div class="keyboard">
        <div class="top-buttons">
            <div class="on"></div>
            <div class="pause"></div>
            <div class="music"></div>
        </div>

        <div class="bottom-buttons">
            <div class="arrows">
                <div class="left"></div>
                <div class="right"></div>
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
    let a = 1


            // <div class="circular"> 
            //     <svg viewBox="0 0 50 50"> 
            //         <path d="M 0,10 a 10,10 0 1,1 0,1 z" id="circle" /> 
            //         <text> 
            //             <textPath xlink:href="#circle"> rotate—> </textPath> 
            //         </text>
            //     </svg> 
            // </div>
</script>

<style lang="less">
 @import './keyboard.less';
</style>