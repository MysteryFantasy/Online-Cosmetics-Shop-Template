<template>
    <div class="v-main-page">
        <h1>Online Shop</h1>
        <p>
            <router-link :to="{name: 'catalog'}">
                Visit Catalog
            </router-link>
        </p>
    </div>
</template>

<script>
export default {
    name: "v-main-page",
    props: {},
    data() {
        return {}
    },
    computed: {}
}
</script>

<style>
.v-main-page{
    background: url(../../assets/images/cosmetics.jpg) no-repeat center center fixed; 
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    overflow: hidden;
    height: 100vh;
}
</style>