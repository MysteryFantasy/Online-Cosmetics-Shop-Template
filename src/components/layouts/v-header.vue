<template>
    <div class="v-header">
        <router-link :to="{name: 'mainPage'}">
            <img src="../../assets/logo.png" alt="">
        </router-link>
        <div class="search-field">
            Search:<input type="text" placeholder="Start typing product name"
            v-model="searchValue"
            @keypress.enter="search(searchValue)">
           <button class="search-btn">
                <i class="material-icons" @click="search(searchValue)">search</i>
            </button>
            <button class="search-btn">
                <i class="material-icons" @click="clearSearchField">cancel</i>
            </button>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    name: "v-header",
    props: {},
    data() {
        return {
            searchValue:''
        }
    },
    computed: {
        ...mapGetters([
            'SEARCH_VALUE'
        ])
    },
    methods: {
        ...mapActions([
            'GET_SEARCH_VALUE_TO_VUEX'
        ]),
        search(value) {
            this.GET_SEARCH_VALUE_TO_VUEX(value);
            if(this.$route.path !== '/catalog'){
                this.$router.push('catalog');
            }
        },
        clearSearchField() {
            this.searchValue = '';
            this.GET_SEARCH_VALUE_TO_VUEX();
            if(this.$route.path !== '/catalog'){
                this.$router.push('catalog');
            }
        },
        
    }
}
</script>

<style>
.v-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgb(206, 156, 221);
    padding: 10px;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
}
.v-header img {
    width: 10vh;
    height: 7vh;
}
.search-field {
    position: relative;
    right: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.search-btn {
    cursor: pointer;
    background: transparent;
    border: none;
}
</style>