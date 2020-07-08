<template>
    <div v-if="Admin" class="main-component">
        <PageTitle :title="'Planos'">
            <template #aside>
                <BaseButton
                        title="Ajuda"
                        :type="'icon'"
                        :color="'lightblue'"
                        @click="$refs.modalAjuda.toggle()"
                >
                    <i class="fas fa-question"></i>
                </BaseButton>
            </template>
        </PageTitle>

        <div class="page-content">
            <div class="div-table">
                <BaseTable>
                    <template #thead>
                        <th
                                style="width: 150px"
                                class="t-start clickable"
                                @click="toggleOrder(ordenacaoMainPlanos, 'ano')"
                        >
                            Nome
                            <i :class="setIconByOrder(ordenacaoMainPlanos, 'ano')"></i>
                        </th>
                        <th
                                style="width: 120px"
                                class="t-start clickable"
                                @click="toggleOrder(ordenacaoMainPlanos, 'obs')"
                        >
                            Observação
                            <i :class="setIconByOrder(ordenacaoMainPlanos, 'obs')"></i>
                        </th>

                    </template>
                    <template #tbody>
                        <tr
                                v-for="plano in PlanosOrdered"
                                :key="plano.id"
                                @click="handleClickInPlano(plano)"
                                :class="{ 'bg-selected': plano.id === planoSelected }"
                        >
                            <td style="width: 150px" class="t-start">{{ plano.ano }}</td>
                            <td style="width: 120px" class="t-start">{{ plano.obs }}</td>
                        </tr>
                    </template>
                </BaseTable>
            </div>

            <Card
                    :title="'Plano'"
                    :toggleFooter="isEdit"
                    @btn-salvar="editPlano()"
                    @btn-delete="openModalDelete()"
                    @btn-add="createPlano()"
                    @btn-clean="cleanPlano()"
            >
                <template #form-group>
                    <div class="row mb-2 mx-0">
                        <div class="form-group col m-0 px-0">
                            <label for="ano">Ano <i title="Campo obrigatório">*</i></label>
                            <input
                                    class="form-control"
                                    type="text"
                                    id="ano"
                                    v-model="planoForm.ano"
                            />
                        </div>
                    </div>
                    <div class="row mb-2 mx-0">
                        <div class="form-group col m-0 px-0">
                            <label for="obs"
                            >Observações</label
                            >
                            <input
                                    class="form-control"
                                    type="text"
                                    id="obs"
                                    v-model="planoForm.obs"
                            />
                        </div>
                    </div>

                </template>
            </Card>
        </div>

        <BaseModal
                ref="modalDeletePlano"
                :modalOptions="{
        title: 'Deletar Plano',
        position: 'center',
        hasBackground: true,
        hasFooter: true,
      }"
                :hasFooter="true"
        >
            <template #modal-body>
                <p class="mb-2" style="font-size:14px">
                    <template v-if="isEdit">
                        Tem certeza que deseja deletar o plano
                        <b>{{ planoForm.ano }}</b> ?
                    </template>
                    <template v-else>
                        Nenhum plano selecionado!
                    </template>
                </p>
            </template>
            <template #modal-footer>
                <button
                        class="btn-custom btn-modal btn-cinza btn-ok-modal"
                        @click="closeModalDelete()"
                >
                    Cancelar
                </button>
                <button
                        v-if="isEdit"
                        class="btn-custom btn-modal btn-vermelho btn-ok-modal"
                        @click="deletePlano()"
                >
                    Deletar
                </button>
            </template>
        </BaseModal>
        <!-- MODAL AJUDA -->

        <BaseModal
                ref="modalAjuda"
                :modalOptions="{
        type: 'ajuda',
        title: 'Ajuda',
      }"
        >
            <template #modal-body>
                <ul class="list-ajuda list-group">
                    <li class="list-group-item">
                        <b>Para excluir um plano:</b> clique no ícone de deletar
                        <i class="fas fa-times delbtn"></i> presente na tabela, em seguida
                        confirme se é realmente o plano que deseja exluir e clique no
                        botão deletar ou cancelar.
                    </li>
                </ul>
            </template>
        </BaseModal>
    </div>
</template>

<script>
    import _ from "lodash";
    import planoService from "@/common/services/plano";
    import {
        toggleOrdination,
        notification,
        redirectNotAdmin,
    } from "@/mixins/index.js";
    import {
        BaseTable,
        BaseModal,
        PageTitle,
        BaseButton,
        PasswordInput,
        Card,
    } from "@/components/index.js";

    const emptyPlano = {
        ano: "",
        obs: ""
    };

    export default {
        name: "Planos",
        mixins: [notification, redirectNotAdmin, toggleOrdination],
        components: {
            BaseTable,
            PageTitle,
            BaseButton,
            Card,
            PasswordInput,
            BaseModal,
        },
        data() {
            return {
                planoSelected: null,
                planoForm: _.clone(emptyPlano),
                ordenacaoMainPlanos: { order: "ano", type: "asc" },
            };
        },
        methods: {
            handleClickInPlano(plano) {
                this.cleanPlano();
                this.planoSelected = plano.id;
                this.showPlano(plano);
            },
            showPlano(plano) {
                this.planoForm = _.clone(plano);
            },
            cleanPlano() {
                this.planoSelected = null;
                this.planoForm = _.clone(emptyPlano);
            },
            openModalDelete() {
                this.$refs.modalDeletePlano.open();
            },
            closeModalDelete() {
                this.$refs.modalDeletePlano.close();
            },
            validatePlano(plano) {
                return !(plano.ano === "" || plano.ano === null)
            },
            async createPlano() {
                const plano = _.clone(this.planoForm);

                if (!this.validatePlano(plano)) {
                    this.showNotification({
                        type: "error",
                        message: `Campo ano inválido.`,
                    });
                    return;
                }

                try {
                    await planoService.create(plano);
                    this.showNotification({
                        type: "success",
                        message: `Plano criado.`,
                    });
                    this.cleanPlano();
                } catch (error) {
                    this.showNotification({
                        type: "error",
                        message: error,
                    });
                }
            },
            async editPlano() {
                const plano = _.clone(this.planoForm);

                if (!this.validatePlano(plano)) {
                    this.showNotification({
                        type: "error",
                        message: `Campo ano inválido.`,
                    });
                    return;
                }

                try {
                    await planoService.update(plano.id, plano);
                    this.showNotification({
                        type: "success",
                        message: `Plano atualizado.`,
                    });
                } catch (error) {
                    this.showNotification({
                        type: "error",
                        message: "Erro ao atualizar plano",
                    });
                }
            },
            async deletePlano() {
                const plano = _.clone(this.planoForm);

                try {
                    await planoService.delete(plano.id, plano);
                    this.showNotification({
                        type: "success",
                        message: `Plano ${plano.ano} foi removido.`,
                    });
                    this.closeModalDelete();
                    this.cleanPlano();
                } catch (error) {
                    this.showNotification({
                        type: "error",
                        message: error,
                    });
                }
            },
        },
        computed: {
            Planos() {
                return this.$store.state.plano.Plano
            },
            PlanosOrdered() {
                const { order, type } = this.ordenacaoMainPlanos;
                const planoSorter = (plano) => {
                    switch (order) {
                        case "obs":
                        case "ano":
                        default:
                            return plano[order];
                    }
                };

                return _.orderBy(this.Planos, planoSorter, type);
            },
            Admin() {
                return this.$store.state.auth.Usuario.admin === 1;
            },
            isEdit() {
                return this.planoSelected != null;
            },
        },
    };
</script>

<style scoped>
    ::v-deep .card input[type="text"],
    ::v-deep .card input[type="password"] {
        width: 200px !important;
        height: 25px !important;
        padding: 0px 5px !important;
        font-size: 12px !important;
        text-align: start;
    }
    .form-group label > i {
        color: #f30000;
    }

    .container-edit-senha {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin: 10px 0;
        margin-top: 12px;
        font-size: 12x;
        padding: 5px 0;
    }
    .container-edit-senha::before {
        content: "";
        position: absolute;
        top: 0;
        width: 100%;
        border-top: 1px solid #dee2e6;
    }
    .container-edit-senha::after {
        content: "";
        position: absolute;
        bottom: 0;
        width: 100%;
        border-bottom: 1px solid #dee2e6;
    }
    .btn-edit-senha {
        padding: 0 5px !important;
        background-color: transparent !important;
        line-height: 50%;
        border: none;
        margin: 0;
        background: none;
    }
    .btn-edit-senha i {
        transition: all 0.25s ease !important;
    }
    .btn-edit-senha:focus {
        box-shadow: 0 0 0 0.15rem #007bff40 !important;
    }
</style>
