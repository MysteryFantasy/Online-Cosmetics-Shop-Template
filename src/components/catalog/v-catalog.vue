<template>
    <div class="v-catalog">
        <v-notificaion 
            :messages="messages"
            :timeout="4000"
        />
        <router-link :to="{name: 'cart', params: {cart_data: CART}}">
            <div class="v-catalog__link_to_cart"><i class="material-icons"> card_giftcard</i> {{CART.length}}</div>  
        </router-link>
        <header>
            <slot name="header"><h1>Catalog</h1></slot>
            <div class="filters">
                <v-select
                    :selected="selected"
                    :options="categories"
                    @select="sortByCategories"
                />
                <div class="range-slider">
                    <div class="range-values">Price: {{minPrice}} – {{maxPrice}}</div>
                    <input 
                        type="range" 
                        min="0" 
                        max="2000" 
                        step="10" 
                        v-model.number="minPrice" 
                        @change="setRangeSlider"
                    >
                    <input 
                        type="range" 
                        min="0" 
                        max="2000" 
                        step="10" 
                        v-model.number="maxPrice" 
                        @change="setRangeSlider"
                    >
                </div>
            </div>
        </header>
        <div>
            <slot name="content">
                <div class="products">
                    <v-catalog-item
                        v-for="product in filteredProducts"
                        :key="product.article"
                        v-bind:product_data="product"
                        @addToCart="addToCart"
                        @productClick="productClick"
                    />
               </div>
            </slot>
        </div>
    </div>
</template>

<script>
import vCatalogItem from './v-catalog-item'
import {mapActions, mapGetters} from 'vuex'
import vSelect from '../v-select'
import vNotificaion from '../notifications/v-notification'

export default {
    name:'v-catalog',
    components: {
        vCatalogItem,
        vSelect,
        vNotificaion
    },
    data() {
        return {
            categories: [
                {name: "All", value: 0},
                {name: "L'Oréal Paris", value: 1},
                {name: "Maybelline New York", value: 2},
                {name: "Smashbox", value: 3},
                {name: "Artdeco", value: 4},
                {name: "NARS", value: 5},
                {name: "M.A.C", value: 6},
                {name: "Hourglass", value: 7},
            ],
            selected: 'All',
            sortedProducts: [],
            minPrice: 0,
            maxPrice: 2000,
            messages: [],
        }
    },
    computed: {
        ...mapGetters([
            'PRODUCTS',
            'CART',
            'SEARCH_VALUE'
        ]),
        filteredProducts() {
            if(this.sortedProducts.length){
                return this.sortedProducts;
            } else {
                return this.PRODUCTS;
            }
        }
    },
    methods: {
        ...mapActions([
            'GET_PRODUCTS_FROM_API',
            'ADD_TO_CART'
        ]),
        setRangeSlider(){
            if(this.minPrice > this.maxPrice) {
                let tmp = this.maxPrice;
                this.maxPrice = this.minPrice;
                this.minPrice = tmp;
            }
            this.sortByCategories();
        },
        sortByCategories(category) {
            let vm = this;
            this.sortedProducts = [...this.PRODUCTS];
            this.sortedProducts = this.sortedProducts.filter(function (item){
                return item.price >= vm.minPrice && item.price <= vm.maxPrice;
            });
            if(category) {
                this.sortedProducts = this.sortedProducts.filter(function (e){
                    vm.selected = category.name;
                    return e.category === category.name;
                });
            }
        },
        sortedProductsBySearchValue(value) {
            this.sortedProducts = [...this.PRODUCTS];
            if(value) {
                this.sortedProducts = this.sortedProducts.filter(function (item){
                    return item.name.toLowerCase().includes(value.toLowerCase());
                });
            } else {
                this.sortedProducts = this.PRODUCTS;
            }
        },
        addToCart(data){
            this.ADD_TO_CART(data)
            .then( () => {
                let timeStamp = Date.now().toLocaleString();
                this.messages.unshift(
                    {name: 'Item has been added to cart', icon: 'check_circle' ,id: timeStamp}
                )
            });
        },
        productClick(article){
            this.$router.push({name: 'product', query: {'product': article} });
        }
    },
    mounted(){
       this.GET_PRODUCTS_FROM_API()
       .then((response) => {
            if(response.data) {
                this.sortByCategories();
                this.sortedProductsBySearchValue(this.SEARCH_VALUE);
            }
        });
    },
   watch: {
        SEARCH_VALUE() {
            this.sortedProductsBySearchValue(this.SEARCH_VALUE);
        }
    }
}
</script>

<style>
.v-catalog .products {
    margin-top: 50px;
    display:flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
}
.v-catalog__link_to_cart {
    position: fixed;
    top: 80px;
    right: 10px;
    padding: 16px;
}
.filters {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.range-values {
    position: absolute;
    top: 220px;
    text-align: center;
    justify-content: space-between;
    right: 10px;
}
.range-slider input[type=range] {
    position: absolute;
    top: 230px;
    width: 150px;
    margin-top: 15px;
    right: 10px;
}
::-webkit-slider-thumb {
    z-index: 2;
    position: relative;
    top: 2px;
    margin-top: -7px;
}
input[type=range] {
    -webkit-appearance: none;
}
input[type=range]::-webkit-slider-runnable-track {
    width: 300px;
    height: 5px;
    background: rgb(228, 183, 228);
    border: none;
    border-radius: 3px;
}
input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: 1.5px solid #C1C1C1;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: #7a2a8a;
}
input[type=range]:focus {
    outline: none;
}
input[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: 5px;
    box-shadow: 1px 1px 1px #C6C6C6, 0px 0px 1px #787878;
    border-radius: 2px;
    border: 0.2px solid #787878;
}
</style>