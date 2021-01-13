<template>
  <div id="app">
    <img class="img-logo" @click="returnHome" src="./assets/dart.png" alt="">
    <button v-if="!(this.$route.name == 'Home')" @click="returnHome" class="btn-acceuil secondaire">Acceuil</button>
    <router-view></router-view>

  </div>
</template>

<script>
  import Vue from 'vue';
  import feather from 'vue-icon'
  Vue.use(feather, 'v-icon')
  export default {
    created() {
      console.log(this.$route.name == 'Home');
    },
    methods : {
      returnHome() {
        this.$router.push({name : 'Home'})
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

  .btn-acceuil  {
    position: absolute;
    right: 50px;
    margin: 40px;
  }

  * {
    font-family: 'Poppins', sans-serif;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }

  #app {
    background: url("./assets/background.svg") no-repeat 50%;
    background-position: top;
  }

  .img-logo {
    height: 100px;
    position: absolute;
    left: 50px;
    margin: 20px 40px;
    cursor: pointer;
  }
</style>