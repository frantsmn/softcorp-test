<template>
    <section class="catalog section">
        <Group
            v-for="(group, id) in names"
            :key="id"
            :groupId="Number(id)"
            :groupTitle="group.G"
        >
            <template v-slot:items>
                <Item
                    v-for="(product, id) in group.B"
                    :key="id"
                    :productId="Number(id)"
                    :productName="product.N"
                />
            </template>
        </Group>
        <div v-if="error" class="catalog__error-message">
            <span>{{ error }}</span>
            <button
                class="catalog__error-btn btn"
                @click.once="resetError(), syncCatalog()"
            >
                Повторить
            </button>
        </div>
    </section>
</template>

<script>
import Group from "./Group.vue";
import Item from "./Item.vue";
import { mapState, mapActions } from "vuex";

export default {
    components: {
        Group,
        Item,
    },
    computed: {
        ...mapState("catalog", ["names", "error"]),
    },
    methods: {
        ...mapActions("currency", ["updateCurrency"]),
        ...mapActions("catalog", ["fetchProducts", "fetchNames", "resetError"]),
        async syncCatalog() {
            await this.fetchNames();
            await this.updateCurrency();
            await this.fetchProducts();

            console.info(`[Catalog.vue] > Запуск синхронизации каталога...`);
            const intervalId = setInterval(async () => {
                try {
                    await this.fetchProducts();
                    await this.updateCurrency();
                } catch {
                    clearInterval(intervalId);
                    console.warn(
                        `[Catalog.vue] > Синхронизация каталога остановлена`
                    );
                }
            }, 15000);
        },
    },
    mounted() {
        this.syncCatalog();
    },
};
</script>
