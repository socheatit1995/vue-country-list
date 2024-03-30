<template>
  <div id="app">
    <div class="container mt-5">
      <div class="row">
        <div class="col">
          <h1>Country List</h1>
          <InputSearch v-model="searchTerm" class="mb-3" placeholder="Search by Country Name" @search-countries="onSearchCountry($event)"/>
          <div class="table-wrapper">
            <table class="table">
              <thead>
                <tr>
                  <th @click="sortBy('name.official')">
                    Country Name
                    <span v-if="sortKey === 'name.official' && sortOrder === 'asc'">
                      ↑
                    </span>
                    <span v-if="sortKey === 'name.official' && sortOrder === 'desc'">
                      ↓
                    </span>
                  </th>
                  <th>Country Code (2)</th>
                  <th>Country Code (3)</th>
                  <th> Native Country Name</th>
                  <th> Alternative Country Name</th>
                  <th> Country Calling Code</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="country in countries" :key="country.cca2" @click="openModal(country)">
                  <td>
                    <img :src="country.flags.png" alt="flag" width="30" />
                    {{ country.name.official }} 
                  </td>
                  <td>{{ country.cca2 }}</td>
                  <td>{{ country.cca3 }}</td>
                  <td>{{ getnativeName(country.name.nativeName) }}</td>
                  <td>{{ country.altSpellings.join(', ') }}</td>
                  <td>{{ country.idd.root }} {{ country.idd.suffixes }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <Pagination :pagination="pagination" @page-changed="onPageChanged" />
        </div>
      </div>
    </div>

    <CountryModal :show="showModal" :country="selectedCountry" @close-modal="showModal = false" />
  </div>
</template>

<script>
import axios from 'axios';
import InputSearch from './components/InputSearch.vue';
import Pagination from './components/Pagination.vue';
import CountryModal from './components/CountryModal.vue';

export default {
  name: 'App',
  components: {
    InputSearch,
    Pagination,
    CountryModal,
  },
  data() {
    return {
      allCountries: [],
      countries: [],
      searchTerm: '',
      sortKey: '',
      sortOrder: 'asc',
      pagination: {
        currentPage: 1,
        rowsPerPage: 25,
        totalItems: 0,
      },
      showModal: false,
      selectedCountry: null,
      nativeName: '',
    };
  },
  async created() {
    this.allCountries = (await axios.get('https://restcountries.com/v3.1/all')).data;
    this.pagination.totalItems = this.allCountries.length;
    this.setPagination();
  },
  methods: {
    sortBy(key) {
      if (key === this.sortKey) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortKey = key;
        this.sortOrder = 'asc';
      }
      this.countries = this.countries.sort((a, b) => {
        if(this.sortKey === 'name.official') {
          return this.sortOrder === 'asc' ? a.name.official.localeCompare(b.name.official)
          :  b.name.official.localeCompare(a.name.official);
        }
      })

    },
    onPageChanged(page) {
      this.pagination.currentPage = page;
      this.setPagination();
    },
    setPagination() {
      const start = (this.pagination.currentPage - 1) * this.pagination.rowsPerPage;
      this.countries = this.filteredCountries.slice(start, start + this.pagination.rowsPerPage);
    },
    openModal(country) {
      this.selectedCountry = country;
      this.showModal = true;
    },
    onSearchCountry(event) {
      this.searchTerm = event;
      if(this.searchTerm) {
        this.countries = this.allCountries.filter(country =>
          country.name.official.toLowerCase().includes(this.searchTerm.toLowerCase()),
        );
      } else {
         this.setPagination();
      } 

    },
    formatenativeName (value) {
        let firstval;
        for ( let d in value ) {
          firstval = value[d].official;
          break;
        }
        return this.nativeName = firstval;
          
      }
  },
  computed: {
    filteredCountries() {
      
      if (!this.searchTerm) {
        return this.allCountries;
      }
      return this.allCountries.filter(country =>
        country.name.official.toLowerCase().includes(this.searchTerm.toLowerCase()),
      );
    },
    getnativeName() {
      return (value => this.formatenativeName(value));
    }
  },
 
 
};
</script>

<style scoped>

.table-wrapper {
  height: 700px;
  overflow: auto;
}

table {
  border-collapse: collapse;
  width: 100%;
  display: block;
  overflow-x: auto;
  cursor: pointer;
}

th,
td {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
  width: auto;
  cursor: pointer;
  position: sticky;
  top: 0;
}
th:nth-child(1), 
th:nth-child(4) {
  width: 15%;
}
th:nth-child(2), 
th:nth-child(3),
th:nth-child(6) {
  width: 8%;
}

th:nth-child(5) {
  width: 20%;
}
th:hover {
  background-color: #dddddd;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #dddddd;
}

.mb-3 {
  margin-bottom: 15px;
}
</style>