<template>
    <div>
      <input v-model="search" :placeholder="placeholder" class="form-control" @keyup="countrySearch($event)"/>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      value: String,
      placeholder: String,
    },
    computed: {
    //   search: {
    //     get() {
    //       return this.value;
    //     },
    //     set(value) {
    //       this.$emit('input', value);
    //     },
    //   },
    },
    methods: {
        countrySearch(event) {
            const val = event.target.value;
            this.$emit('input', val);
            this.$emit('search-countries',val);
        }
    }
  };
  </script>
  <style scoped>
  .form-control{
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

input.form-control {
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
  border: 1px solid #dddddd;
  width: 50%;
}

input.form-control:focus {
  outline: none;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
}
  </style>