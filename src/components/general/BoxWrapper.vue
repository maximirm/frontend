<template>
  <div class="container">
    <div class="box"
         :style="{ height: height, width: width }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BoxWrapper',
  props: {
    height: {
      type: String,
      default: '100px'
    },
    width: {
      type: String,
      default: '100px'
    }
  }
}
</script>

<style>

.box {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  background-image: url('../../styling/pics/ice_age.webp');
  background-repeat: repeat;
  background-position: top left;
  border: 1px solid #1A237E;
  border-radius: 10px;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
}

</style>
