<template>
    <canvas id="glcanvas" width="640" height="480">
        Your browser doesn't appear to support the HTML5 <code>&lt;canvas&gt;</code> element.
    </canvas>
</template>

<script>
    export default {
        name: 'HelloWorld',
        props: {
            msg: String
        },
        created() {

        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                const canvas = document.querySelector("#glcanvas");
                // Initialize the GL context
                const gl = canvas.getContext("webgl");

                // Only continue if WebGL is available and working
                if (!gl) {
                    alert("Unable to initialize WebGL. Your browser or machine may not support it.");
                    return;
                }

                // Set clear color to black, fully opaque
                gl.clearColor(0.0, 0.0, 0.0, 1.0);
                // Clear the color buffer with specified clear color
                gl.clear(gl.COLOR_BUFFER_BIT);
            }
        }
    }
</script>

<style lang="less">
    // #glcanvas {
    //     background: black;
    // }
</style>