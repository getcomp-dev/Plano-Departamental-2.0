<template>
  <div class="main-component">
    <portal to="page-header">
      <BaseButton template="ajuda" @click="$refs.modalAjuda.toggle()" />
    </portal>

    <div class="page-content">
      <div class="div-table">
        <BaseTable>
          <template #thead>
            <v-th-ordination
              :currentOrder="ordenacaoUsuarios"
              orderToCheck="nome"
              width="150"
              align="start"
            >
              Nome
            </v-th-ordination>
            <v-th-ordination
              :currentOrder="ordenacaoUsuarios"
              orderToCheck="login"
              width="120"
              align="start"
            >
              Login
            </v-th-ordination>
            <v-th-ordination
              :currentOrder="ordenacaoUsuarios"
              orderToCheck="admin"
              orderType="desc"
              width="90"
              align="start"
            >
              Tipo
            </v-th-ordination>
          </template>

          <template #tbody>
            <tr
              v-for="usuario in UsuariosOrdered"
              :key="usuario.id"
              :class="{ 'bg-selected': usuario.id === usuarioClickado }"
              @click="selecionaUsuario(usuario)"
            >
              <v-td width="150" align="start">{{ usuario.nome }}</v-td>
              <v-td width="120" align="start">{{ usuario.login }}</v-td>
              <v-td width="90" align="start">{{ adminText(usuario.admin) }}</v-td>
            </tr>

            <tr v-if="!UsuariosOrdered.length">
              <v-td width="360" colspan="3">
                <b>Nenhum usuário encontrado</b>
              </v-td>
            </tr>
          </template>
        </BaseTable>
      </div>

      <Card
        :title="'Usuário'"
        :toggleFooter="isEditing"
        @btn-salvar="handleUpdateUsuario"
        @btn-delete="openModalDelete"
        @btn-add="handleCreateUsuario"
        @btn-clean="cleanUsuarioForm"
      >
        <template #form-group>
          <div class="row mb-2 mx-0">
            <div class="form-group col m-0 px-0">
              <label required for="usuarioNome">Nome</label>
              <input
                id="usuarioNome"
                type="text"
                class="form-control input-lg"
                v-model="usuarioForm.nome"
              />
            </div>
          </div>
          <div class="row mb-2 mx-0">
            <div class="form-group col m-0 px-0">
              <label required for="login">Login</label>
              <input
                class="form-control input-lg"
                type="text"
                id="login"
                v-model="usuarioForm.login"
              />
            </div>
          </div>
          <!-- Create -->
          <template v-if="!isEditing">
            <!-- senha -->
            <div class="row mb-2 mx-0">
              <div class="form-group col m-0 px-0">
                <label required for="novaSenha">Senha</label>
                <InputPassword :iconSize="13" :inputId="'novaSenha'" v-model="usuarioForm.senha" />
              </div>
            </div>
            <!-- confirmar senha -->
            <div class="row mb-2 mx-0">
              <div class="form-group col m-0 px-0">
                <label required for="confirmaSenha">Confirmar senha</label>
                <InputPassword
                  :iconSize="13"
                  :isInvalid="confirmaSenha != usuarioForm.senha"
                  :inputId="'confirmaSenha'"
                  v-model="confirmaSenha"
                />
              </div>
            </div>
          </template>
          <!-- Edit -->
          <template v-else-if="isEditing">
            <!-- toggle edit senha -->
            <ButtonSlideSection :isOpen="isEditingSenha" @handel-click="toggleEditSenha" />

            <!-- edit senha -->
            <transition-group name="slideY" mode="out-in">
              <template v-if="isEditingSenha">
                <div :key="'senha'" class="row mb-2 mx-0">
                  <div class="form-group col m-0 px-0">
                    <label required for="novaSenha">Nova senha</label>
                    <InputPassword
                      :iconSize="13"
                      :inputId="'novaSenha'"
                      v-model="usuarioForm.senha"
                    />
                  </div>
                </div>
                <!-- confirma nova senha -->
                <div :key="'confirma'" class="row mb-2 mx-0">
                  <div class="form-group col m-0 px-0">
                    <label required for="confirmaSenha">Confirmar nova senha</label>
                    <InputPassword
                      :iconSize="13"
                      :isInvalid="confirmaSenha != usuarioForm.senha"
                      :inputId="'confirmaSenha'"
                      v-model="confirmaSenha"
                    />
                  </div>
                </div>
              </template>
            </transition-group>
          </template>

          <div class="row mb-2 mx-0">
            <div class="form-group col m-0 px-0">
              <label for="usuarioAdmin">Tipo</label>
              <select
                id="usuarioAdmin"
                v-model.number="usuarioForm.admin"
                class="form-control input-lg"
              >
                <option :value="0">Consulta</option>
                <option :value="1">Comissão</option>
                <option :value="2">Administrador</option>
              </select>
            </div>
          </div>
        </template>
      </Card>
    </div>

    <ModalDelete ref="modalDelete" :isDeleting="isEditing" @btn-deletar="handleDeleteUsuario">
      <li class="list-group-item">
        <span>
          <template v-if="isEditing">
            Tem certeza que deseja excluír o usuário
            <b>{{ usuarioForm.nome }}</b>
            ?
          </template>
          <template v-else>Nenhum usuário selecionado!</template>
        </span>
      </li>
    </ModalDelete>

    <ModalAjuda ref="modalAjuda">
      <li class="list-group-item">
        <b>Adicionar:</b>
        Preencha o cartão em branco à direita e em seguida, clique em Adicionar
        <font-awesome-icon :icon="['fas', 'plus']" class="icon-green" />
        .
      </li>
      <li class="list-group-item">
        <b>Editar:</b>
        Clique na linha da tabela do usuário que deseja alterar. Em seguida, no cartão à direita,
        altere as informações que desejar e clique em Salvar
        <font-awesome-icon :icon="['fas', 'check']" class="icon-green" />
        .
      </li>
      <li class="list-group-item">
        <b>Deletar:</b>
        Clique na linha da tabela do usuário que deseja remover. Em seguida, no cartão à direita,
        clique em Remover
        <font-awesome-icon :icon="['fas', 'trash']" class="icon-red" />
        e confirme a remoção na janela que será aberta.
      </li>
      <li class="list-group-item">
        <b>Limpar:</b>
        No cartão à direita, clique em Cancelar
        <font-awesome-icon :icon="['fas', 'times']" class="icon-gray" />
        , para limpar as informações.
      </li>
      <li class="list-group-item">
        <b>Ordenar:</b>
        Clique no cabeçalho da tabela, na coluna desejada, para alterar a ordenação das informações.
      </li>
    </ModalAjuda>
  </div>
</template>

<script>
import { orderBy } from "lodash-es";
import { mapActions, mapGetters } from "vuex";
import { InputPassword, Card, ButtonSlideSection } from "@/components/ui";
import { ModalDelete, ModalAjuda } from "@/components/modals";

const emptyUsuario = {
  nome: "",
  login: "",
  senha: "",
  admin: 0,
};

export default {
  name: "GerenciarUsuarios",
  components: {
    Card,
    InputPassword,
    ButtonSlideSection,
    ModalDelete,
    ModalAjuda,
  },
  data() {
    return {
      usuarioForm: emptyUsuario,
      confirmaSenha: "",
      usuarioClickado: null,
      isEditingSenha: false,
      ordenacaoUsuarios: { order: "nome", type: "asc" },
    };
  },

  methods: {
    ...mapActions(["updateUsuario", "createUsuario", "deleteUsuario"]),

    adminText(admin) {
      if (admin === 0) return "Consulta";
      else if (admin === 1) return "Comissão";
      else if (admin === 2) return "Administrador";
    },
    openModalDelete() {
      this.$refs.modalDelete.open();
    },
    toggleEditSenha() {
      this.isEditingSenha = !this.isEditingSenha;
      this.usuarioForm.senha = "";
      this.confirmaSenha = "";
    },
    selecionaUsuario(usuario) {
      this.cleanUsuarioForm();
      this.usuarioClickado = usuario.id;
      this.usuarioForm = { ...usuario };
    },
    cleanUsuarioForm() {
      this.usuarioClickado = null;
      this.confirmaSenha = "";
      this.isEditingSenha = false;
      this.usuarioForm = { ...emptyUsuario };
    },
    //Services
    async handleCreateUsuario() {
      try {
        this.setLoading({ type: "partial", value: true });
        if (this.confirmaSenha !== this.usuarioForm.senha) {
          throw new Error("Campo senha e confirmar senha devem ser iguais.");
        }

        await this.createUsuario({ data: this.usuarioForm, notify: true });
        this.cleanUsuarioForm();
      } catch (error) {
        this.pushNotification({
          type: "error",
          text: error.message,
        });
      } finally {
        this.setLoading({ type: "partial", value: false });
      }
    },
    async handleUpdateUsuario() {
      try {
        this.setLoading({ type: "partial", value: true });
        if (this.isEditingSenha && !this.usuarioForm.senha) {
          throw new Error("Campo <b>senha</b> inválido.");
        }
        if (this.confirmaSenha !== this.usuarioForm.senha) {
          throw new Error("Campo senha e confirmar senha devem ser iguais.");
        }

        await this.updateUsuario({ data: this.usuarioForm, notify: true });
        this.usuarioForm.senha = "";
        this.confirmaSenha = "";
      } catch (error) {
        this.pushNotification({
          type: "error",
          text: error.message,
        });
      } finally {
        this.setLoading({ type: "partial", value: false });
      }
    },
    async handleDeleteUsuario() {
      try {
        this.setLoading({ type: "partial", value: true });
        await this.deleteUsuario({ data: this.usuarioForm, notify: true });
        this.cleanUsuarioForm();
      } catch (error) {
        this.pushNotification({
          type: "error",
          text: error.message,
        });
      } finally {
        this.setLoading({ type: "partial", value: false });
      }
    },
  },

  computed: {
    ...mapGetters(["AllUsuarios"]),

    UsuariosOrdered() {
      const { order, type } = this.ordenacaoUsuarios;

      return orderBy(
        this.AllUsuarios,
        (usuario) => {
          switch (order) {
          case "nome":
          case "login":
            return usuario[order].toLowerCase();
          default:
            return usuario[order];
          }
        },
        type
      );
    },
    isEditing() {
      return this.usuarioClickado != null;
    },
  },
};
</script>
