<template>
    <transition name="modal">
      <div class="modal-mask" v-if="show" @click="hideModal">
        <div class="modal-wrapper">
          <div class="modal-container" @click.stop>
            <div class="modal-header">
              <slot name="header">
                <h3 class="text-center">{{ country.name.official }}</h3>
              </slot>
              <button class="close" @click="hideModal">
                <span class="text-center">×</span>
              </button>
            </div>
            <div class="modal-body">
              <slot name="body">
                <div class="img-wrapper">
                  <img :src="country.flags.png" :alt="country.name.official" class="img-responsive" />
                </div>
                <h5>
                  <i class="flag flag-icon mr-2" v-for="(flag, index) in country.idd.root" :key="`flag-${index}`">
                    <span :class="`flag-icon-${flag.toLowerCase()}`"></span>
                  </i>
                  {{ country.idd.root }}
                </h5>
                <h5 class="mt-5">
                  <strong>Native Name:</strong>
                  {{ country.name.nativeName?.eng?.official }}
                </h5>
                <h5>
                  <strong>Alternative Names:</strong>
                  <span v-for="alt in country.altSpellings" :key="`alt-${alt}`">
                    {{ alt }}
                    <!-- Add a comma if it is not the last item -->
                    <span v-if="alt !== country.altSpellings[country.altSpellings.length - 1]">,</span>
                  </span>
                </h5>
              </slot>
            </div>
            <div class="modal-footer">
              <slot name="footer">
                <button class="btn btn-danger" @click="hideModal">Close</button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </template>
  
  <script>
  export default {
    props: {
      show: {
        type: Boolean,
        required: true,
      },
      country: {
        type: Object,
        required: true,
      },
    },
    methods: {
      hideModal() {
        this.$emit('close-modal');
      },
    },
  };
  </script>
  
  <style scoped>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
  }
  
  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }
  
  .modal-container {
    width: 800px;
    height: 600px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
  }
  
  .modal-header h5 {
    display: flex;
    align-items: center;
  margin-top: 0;
    color: black;
  }
  
  .modal-header .close {
    color: black;
    padding: 0;
    background-color: transparent;
    font-weight: normal;
    font-size: 1.5em;
    cursor: pointer;
    user-select: none;
    border: 0;
    outline: none;
    opacity: 0.5;
  }
  
  .modal-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 15px 0;
    color: black;
  }
  
  .modal-body .img-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
  }
  
  .modal-body img {
    height: 100%;
  }
  
  .modal-default-button {
    float: right;
  }
  
  /*
   * The following styles are auto-applied to elements with
   * transition="modal" when their visibility is toggled
   * by Vue.js.
   *
   * You can easily play with the modal transition by editing
   * these styles.
   */
  
  .modal-enter {
    opacity: 0;
  }
  
  .modal-leave-active {
    opacity: 0;
  }
  
  .modal-enter-active {
    transition: opacity 0.5s ease;
  }
  
  .modal-leave-active {
    transition: opacity 0.15s ease;
  }
  
  .flag-icon-root {
    color: black;
    font-size: 1em;
    margin: 0 10px;
  }
  </style>