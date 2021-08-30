<template>
    <div id="app">
        <Catalog />
        <Cart />
    </div>
</template>

<script>
import Catalog from "./components/Catalog/Catalog.vue";
import Cart from "./components/Cart/Cart.vue";

export default {
    name: "App",
    components: {
        Catalog,
        Cart,
    },
};
</script>
