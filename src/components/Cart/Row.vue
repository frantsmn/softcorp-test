<template>
    <tr class="cart-row">
        <td>
            <div class="cart-row__name">
                {{ productName }}
            </div>
        </td>
        <td v-if="isAvailable">
            <div class="cart-row__amount">
                <div
                    v-if="position.amount > product.P"
                    class="cart-row__amount-warn"
                >
                    Превышено максимальное кол-во.<br />Всего доступно:
                    <b>{{ product.P }}&nbsp;шт.</b>
                </div>
                <input
                    class="cart-row__amount-input"
                    type="number"
                    min="1"
                    :max="product.P"
                    v-model.number="position.amount"
                    @focusout="validateAmount"
                />
                шт.
            </div>
        </td>
        <td :colspan="!isAvailable ? 2 : false">
            <span class="cart-row__price">
                {{ isAvailable ? priceRubFormatted : "Нет в наличии" }}
            </span>
        </td>
        <td class="cart-row__delete-cell">
            <button
                class="cart-row__delete-btn btn"
                @click="removeProduct(position.productId)"
            >
                Удалить
            </button>
        </td>
    </tr>
</template>

<script>
import priceMethods from "@/mixins/priceMethods";
import { mapGetters, mapMutations } from "vuex";
export default {
    mixins: [priceMethods],
    props: {
        position: {
            type: Object,
            required: true,
        },
    },
    computed: {
        ...mapGetters("catalog", ["indexedProductNames", "indexedProducts"]),
        productName() {
            return this.indexedProductNames[this.position.productId];
        },
        product() {
            return this.indexedProducts[this.position.productId];
        },
        isAvailable() {
            return Boolean(this.product);
        },
        priceRub() {
            return this.convertUsdToRub(this.product.C);
        },
        priceRubFormatted() {
            return this.formatPriceRub(this.priceRub);
        },
    },
    methods: {
        ...mapMutations("cart", ["removeProduct"]),
        validateAmount() {
            if (!this.isAvailable) return;
            if (this.position.amount < 1) {
                this.position.amount = 1;
            }
            if (this.position.amount > this.product.P) {
                this.position.amount = this.product.P;
            }
            this.position.amount = parseInt(this.position.amount);
        },
    },
};
</script>
