import { mapState } from "vuex";
export default {
    computed: {
        ...mapState("currency", ["rubCurrency"]),
    },
    methods: {
        convertUsdToRub(usdValue) {
            return usdValue * this.rubCurrency
        },
        formatPriceRub(rubValue) {
            return new Intl.NumberFormat("ru-RU", {
                style: "currency",
                currency: "RUB",
            }).format(rubValue);
        }
    }
}