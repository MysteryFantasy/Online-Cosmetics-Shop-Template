<template>
    <div class="v-cart-item">
        <img class="v-cart-item__image" :src="require('../../assets/images/' + cart_item_data.image)" alt="">
        <div class="v-cart-item__info">
            <p>{{cart_item_data.name}}</p>
            <p>{{cart_item_data.price | toFix | formattedPrice}}</p>
            <p>{{cart_item_data.article}}</p>
        </div>
        <div class="v-cart-item__quantity">
            <p>Quantity:</p>
            <span>
                <span class="quantity__btn" @click="decrementItem">-</span>
                {{cart_item_data.quantity}}
                <span class="quantity__btn" @click="incrementItem">+</span>
            </span>
        </div>
        <button class="v-cart-item__delete" @click="deleteFromCart">Delete</button>
    </div>
</template>

<script>
import toFix from '../../filters/toFix'
import formattedPrice from '../../filters/price-format'

export default {
    name:'v-cart-item',
    components: {},
    props: {
        cart_item_data:{
            type: Object,
            default(){
                return {}
            }
        }
    },
    data() {
        return {}
    },
    filters: {
        toFix,
        formattedPrice
    },
    methods: {
        decrementItem(){
            this.$emit('decrement');
        },
        incrementItem(){
            this.$emit('increment');
        },
        deleteFromCart() {
            this.$emit('deleteFromCart');
        }
    }
}
</script>

<style>
.v-cart-item {
    display:flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 0 8px 0 #e0e0e0;
    padding: 8px;
    margin-bottom: 16px;
}
.v-cart-item__image {
    max-width: 100px;
}
.quantity__btn {
    cursor: pointer;
    padding: 4px 11px;
    border: 1px solid rgb(223, 222, 222);
    border-radius: 3px;
}
.v-cart-item__delete {
    cursor: pointer;
    padding: 4px 12px;
    background: rgb(233, 15, 15);
    color: white;
    border-radius: 5px;
}
</style>