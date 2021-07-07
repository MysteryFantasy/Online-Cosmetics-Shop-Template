<template>
    <div class="v-product-page">
        <v-notificaion 
            :messages="messages"
            :timeout="4000"
        />
        <router-link :to="{name: 'cart', params: {cart_data: CART}}">
            <div class="v-catalog__link_to_cart"><i class="material-icons"> card_giftcard</i> {{CART.length}}</div>  
        </router-link>
        <p>Product name: {{product.name}}</p>
        <img v-if="product.image" class="v-catalog-item_image" :src="require('../../assets/images/' + product.image)" alt="img">
        <p>Brand: {{product.category}}</p>
        <p> Article: {{product.article}} </p>
        <p>Price: {{product.price | toFix | formattedPrice}}</p>
        <button class="v-catalog-item_add_to_cart_btn" 
            @click="addToCart">
            Add to cart
        </button>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import toFix from '../../filters/toFix'
import formattedPrice from '../../filters/price-format'
import vNotificaion from '../notifications/v-notification'

export default {
    name: "v-product-page",
    components: {
        vNotificaion
    },
    props: {},
    data() {
        return {
            messages: [],
        }
    },
    filters: {
        toFix,
        formattedPrice
    },
    computed: {
        ...mapGetters([
            'PRODUCTS',
            'CART'
        ]),
        product() {
            let result = {};
            let vm = this;
            this.PRODUCTS.find(function (item) {
                if(item.article === vm.$route.query.product) {
                    result = item;
                }
            });
            return result;
        }
    },
    methods: {
        ...mapActions([
            'GET_PRODUCTS_FROM_API',
            'ADD_TO_CART'
        ]),
        addToCart(){
            this.ADD_TO_CART(this.product)
            .then( () => {
                let timeStamp = Date.now().toLocaleString();
                this.messages.unshift(
                    {name: 'Item has been added to cart', icon: 'check_circle' ,id: timeStamp}
                );
            });
        }
    },
    mounted() {
        if (!this.PRODUCTS.length) {
            this.GET_PRODUCTS_FROM_API()
        }
    }
}
</script>