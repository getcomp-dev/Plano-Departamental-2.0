<template>
    <BaseModal
            ref="baseModalDownloadTurmasCursos"
            title="Relátorio"
            position="right"
            :styles="{ width: '300px', zIndex: 905 }"
    >
        <template #modal-body>
            <ul class="list-relatorio list-group flex-row w-100">
                <li
                        class="list-group-item clickable text-center m-0 rounded-0 col py-2"
                        @click="handleSelect(1)"
                >
                    Primeiro Período
                </li>
                <li
                        class="list-group-item clickable text-center m-0 rounded-0 col py-2"
                        @click="handleSelect(3)"
                >
                    Terceiro Período
                </li>
            </ul>
        </template>
    </BaseModal>
</template>

<script>
    export default {
        name: "ModalDownloadTurmasCursos",

        methods: {
            handleSelect(value) {
                this.setPartialLoading(true);
                this.close();
                this.$emit("selection-option", value);
                this.setPartialLoading(false);
            },

            toggle() {
                this.$refs.baseModalDownloadTurmasCursos.toggle();
            },
            close() {
                this.$refs.baseModalDownloadTurmasCursos.close();
            },
        },
    };
</script>

<style scoped>
    .list-relatorio .list-group-item {
        border: 1px solid rgba(0, 0, 0, 0.125);
        font-size: 11px;
        font-weight: bold;
    }
    .list-relatorio .list-group-item:hover {
        text-decoration: underline;
        color: var(--light-blue);
        background-color: #ebebeb;
    }
</style>
