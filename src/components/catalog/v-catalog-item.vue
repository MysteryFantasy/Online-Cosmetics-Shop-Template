<template>
    <div class="v-catalog-item">
        <v-popup
            v-if="isInfoPopupVisible"
            rightBtnTitle="Add to cart"
            :popUpTitle="product_data.name"
            @closePopup="closeInfoPopup"
            @rightBtnAction="addToCart"
        >
            <img class="v-catalog-item_image" :src="require('../../assets/images/' + product_data.image)" alt="img">
            <div>
                <p class="v-catalog-item_brand">Brand: {{product_data.category}}</p>
                <p class="v-catalog-item_article"> Article: {{product_data.article}} </p>
                <p class="v-catalog-item_price">Price: {{product_data.price | toFix | formattedPrice}}</p>
            </div>
        </v-popup>
        <img class="v-catalog-item_image" :src="require('../../assets/images/' + product_data.image)" alt="img" @click='productClick'>
        <p class="v-catalog-item_name">{{product_data.name}}</p>
        <p class="v-catalog-item_price">Price: {{product_data.price | toFix | formattedPrice}}</p>
        <button 
            class="v-catalog-item__show-info"
            @click="showPopupInfo">
            Show info
        </button>
        <button class="v-catalog-item_add_to_cart_btn" 
            @click="addToCart">
            Add to cart
        </button>
    </div>
</template>

<script>
import vPopup from '../popup/v-popup'
import toFix from '../../filters/toFix'
import formattedPrice from '../../filters/price-format'

export default {
    name:'v-catalog-item',
    components: {
        vPopup,
    },
    props: {
        product_data: {
            type: Object,
            default(){
                return {}
            }
        }
    },
    data() {
        return {
            isInfoPopupVisible: false
        }
    },
    filters: {
        toFix,
        formattedPrice
    },
    methods: {
        showPopupInfo() {
            this.isInfoPopupVisible = true;
        },
        closeInfoPopup() {
            this.isInfoPopupVisible = false;
        },
        addToCart() {
            this.$emit('addToCart', this.product_data);
        },
        productClick(){
            this.$emit('productClick', this.product_data.article);
        } 
    },
    mounted() {
        this.$set(this.product_data, 'quantity', 1);
    }
}
</script>

<style>
.v-catalog-item {
    flex-basis: 30%;
    box-shadow: 0 0 8px 0 #e0e0e0;
    padding: 8px;
    margin-bottom: 16px;
}
.v-catalog-item_image {
    width: 180px;
    height: 200px;
}
.v-catalog-item_add_to_cart_btn {
    cursor: pointer;
    padding: 4px 12px;
    background: rgb(76, 161, 76);
    color: white;
    border-radius: 5px;
    margin: 15px;
}
.v-catalog-item__show-info {
    cursor: pointer;
    padding: 4px 12px;
    background:rgb(140, 95, 212);
    color: white;
    border-radius: 5px;
    margin: 15px;
}
</style>