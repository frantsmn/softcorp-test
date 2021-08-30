<template>
    <li class="group__item catalog-item" v-if="isRender">
        <dl class="catalog-item__d-list">
            <dt class="catalog-item__name">{{ productName }} ({{ amount }})</dt>
            <dd :class="['catalog-item__price', colorClass]">
                {{ priceRubFormatted }}
            </dd>
        </dl>
        <button class="catalog-item__add-btn btn" @click="addProduct(productId)">
            В корзину
        </button>
    </li>
</template>

<script>
import priceMethods from "@/mixins/priceMethods";
import { mapGetters, mapMutations } from "vuex";

export default {
    mixins: [priceMethods],
    props: {
        productId: {
            type: Number,
            required: true,
        },
        productName: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            colorClass: {
                higher: false,
                lower: false,
            },
        };
    },
    computed: {
        ...mapGetters("catalog", ["indexedProducts"]),
        amount() {
            return this.indexedProducts[this.productId]?.P;
        },
        price() {
            return this.indexedProducts[this.productId]?.C;
        },
        priceRub() {
            return this.convertUsdToRub(this.price);
        },
        priceRubFormatted() {
            return this.formatPriceRub(this.priceRub);
        },
        isRender() {
            return Boolean(
                this.indexedProducts[this.productId] &&
                    this.amount &&
                    this.price
            );
        },
    },
    watch: {
        priceRub(newVal, oldVal) {
            this.colorClass = {
                higher: newVal > oldVal,
                lower: newVal < oldVal,
            };
        },
    },
    methods: {
        ...mapMutations("cart", ["addProduct"]),
    },
};
</script>
