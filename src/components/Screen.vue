<template>
    <div class="screen">
        <div class="screen-grid">

        </div>
    </div>
</template>

<script>
export default {
  name: 'Screen',
  props: {
    msg: String
  }
}
</script>

<style scoped>
.screen {
    background: green;
    width: 90%;
    height: 1000px;
    margin: 20px auto;
}

.screen-grid {
    width:100%;
    height:100%;
    display: grid;
    grid-template-rows: repeat(50, 1fr);
    grid-template-columns: repeat(50, 1fr);
}

</style>