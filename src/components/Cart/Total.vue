<template>
    <div class="cart-total">
        <div class="cart-total__label">Итого:</div>
        <div class="cart-total__value">{{ totalPriceRubFormatted }}</div>
    </div>
</template>

<script>
import priceMethods from "@/mixins/priceMethods";
import { mapGetters } from "vuex";

export default {
    mixins: [priceMethods],
    computed: {
        ...mapGetters("cart", ["totalPrice"]),
        totalPriceRub() {
            return this.convertUsdToRub(this.totalPrice);
        },
        totalPriceRubFormatted() {
            return this.formatPriceRub(this.totalPriceRub);
        },
    },
};
</script>
