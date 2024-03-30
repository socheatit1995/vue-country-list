<template>
    <div>
      <ul class="pagination">
        <li class="pagination-button" :class="{ disabled: currentPage === 1 }">
          <a @click.prevent="prevPage" href="#">Previous</a>
        </li>
        <li class="pagination-button" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
          <a @click.prevent="goToPage(page)">{{ page }}</a>
        </li>
        <li class="pagination-button" v-if="currentPage < totalPages">
          <a @click.prevent="nextPage" href="#">Next</a>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      pagination: Object,
    },
    computed: {
      currentPage() {
        return this.pagination.currentPage;
      },
      totalPages() {
        const totalItems = Number.isFinite(this.pagination.totalItems) ? this.pagination.totalItems : 0;
        return Math.ceil(totalItems / this.pagination.rowsPerPage);
      },
    },
    methods: {
      prevPage() {
        if (this.currentPage !== 1) {
          this.pagination.currentPage--;
          this.$emit('page-changed', this.currentPage);
        }
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.pagination.currentPage++;
          this.$emit('page-changed', this.currentPage);
        }
      },
      goToPage(page) {
        this.pagination.currentPage = page;
        this.$emit('page-changed', this.currentPage);
      },
    },
  };
  </script>
  <style scoped>
    
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  list-style: none;
}

.pagination-button {
  border: 1px solid #dddddd;
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
  cursor: pointer;
  background-color: #ffffff;
  color: #555555;
}

.pagination-button:hover {
  background-color: #dddddd;
}
.pagination-button>a:hover {
  background-color: transparent;
}

.pagination-button.active {
    background-color: #ece2e2;
}
.selected-page {
  background-color: #dddddd;
  color: #222222;
}
  </style>