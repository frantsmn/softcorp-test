<template>
    <div class="catalog__group group" v-if="isRender">
        <div class="group__header">
            {{ groupTitle }}
        </div>
        <ul class="group__content">
            <slot name="items"></slot>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    props: {
        groupId: {
            type: Number,
            required: true,
        },
        groupTitle: {
            type: String,
            required: true,
        },
    },
    computed: {
        ...mapGetters("catalog", ["availableGroupIds"]),
        isRender() {
            return this.availableGroupIds.includes(this.groupId);
        },
    },
};
</script>
