<template>
    <v-text-field
    :value="$store.state.search"
    @input="$store.commit('setSearch', $event)"
    @focus="searchClosed = false"
    @blur="searchClosed = true"
    class="mt-1 expanding-search"
    :class="{ 'closed': searchClosed && !$store.state.search }"
    :disabled="$store.state.sorting"
    placeholder="Search"
    filled
    dense
    clearable
    prepend-inner-icon="mdi-magnify"
    ></v-text-field>
</template>

<script>
export default {
    data() {
        return {
            searchClosed: true
        }
    }
}
</script>

<style lang="sass">
    .expanding-search
        transition: max-width 0.3s
        .v-input__slot
            cursor: pointer !important
            background: rgba(255,255,255,0.25) !important
            width: 70% !important
            margin-left: auto
            &:before, &:after
                border-color: transparent !important
                border-style: none !important
        &.closed
            max-width: 45px
            .v-input__slot
                background: transparent !important
</style>