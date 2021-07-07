<template>
    <div class="v-cart">
        <router-link :to="{name: 'catalog'}">
            <div class="v-cart__link_to_catalog"> Back to catalog</div>
        </router-link>
        <h1>Cart</h1>
        <p v-if="!cart_data.length">There are no products in the cart...</p>
        <v-cart-item 
            v-for="(item, index) in cart_data"
            :key="item.article"
            :cart_item_data="item"
            @deleteFromCart="deleteFromCart(index)"
            @increment="increment(index)"
            @decrement="decrement(index)"
        />
        <div class="v-cart__order" v-if="cart_data.length">
            <button class="order__button" @click="makeAnOrder">Buy now</button>
        </div>
        <div class="v-cart__total">
            <p class="total__name">Total:</p>
            <p>{{cartTotalCost | toFix | formattedPrice}}</p>
        </div>
    </div>
</template>

<script>
import vCartItem from './v-cart-item'
import {mapActions} from 'vuex'
import toFix from '../../filters/toFix'
import formattedPrice from '../../filters/price-format'

export default {
    name:'v-cart',
    components: {
        vCartItem,
    },
    props: {
        cart_data: {
            type: Array,
            default(){
                return []
            }
        }
    },
    data() {
        return {
            title: 'Cart',
            messages: [],
        }
    },
    filters: {
        toFix,
        formattedPrice
    },
    computed: {
        cartTotalCost() {
            let result = [];
            if(this.cart_data.length){
                for (let item of this.cart_data){
                    result.push(item.price * item.quantity);
                }
                result = result.reduce(function(sum, el){
                    return sum + el;
                })
                return result;   
            } else {
                return 0;
            }
        }
    },
    methods: {
        ...mapActions([
            'DECREMENT_CART_ITEM',
            'INCREMENT_CART_ITEM',
            'DELETE_FROM_CART',
        ]),
        increment(index) {
            this.INCREMENT_CART_ITEM(index);
        },
        decrement(index) {
            this.DECREMENT_CART_ITEM(index);
        },
        deleteFromCart(index) {
            this.DELETE_FROM_CART(index);
        },
        makeAnOrder(){
            alert('Thank you for your order!');
            window.location.reload();
        }
    }
}
</script>

<style>
.v-cart{
    margin-bottom: 100px;
}
.v-cart__link_to_catalog{
    position: absolute;
    top: 80px;
    right: 10px;
    padding: 16px;
    border: solid 1px grey;
}
.order__button{
    cursor: pointer;
    padding: 4px 12px;
    background: rgb(13, 139, 30);
    color: white;
    border-radius: 5px;
}
.v-cart__total{
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    padding: 8px 16px;
    display: flex;
    justify-content: center;
    background: rgb(76, 161, 76);
    color: white;
    font-size: 20px;
}
.total__name{
    margin-right: 16px;
}
</style>