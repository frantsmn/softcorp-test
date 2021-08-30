<template>
    <section class="cart section">
        <div class="cart__placeholder" v-if="isCartEmpty">Корзина пуста</div>
        <template v-else>
            <Table>
                <Row
                    v-for="position in positions"
                    :key="position.productId"
                    :position="position"
                />
            </Table>
            <Total />
        </template>
    </section>
</template>

<script>
import Table from "./Table.vue";
import Row from "./Row.vue";
import Total from "./Total.vue";
import { mapGetters, mapState } from "vuex";

export default {
    components: { Table, Row, Total },
    computed: {
        ...mapState("cart", ["positions"]),
        ...mapGetters("cart", ["isCartEmpty"]),
    },
};
</script>
