<template>
  <div class="DashboardPedidos row">
    <div class="col">
      <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
      >
        <h1 class="h2">Lista Pedidos</h1>
      </div>
      <table class="table table-hover table-sm">
        <thead class="thead-light">
          <tr>
            <th scope="col">Departamento</th>
            <th scope="col">Responsável</th>
            <th scope="col">Telefone</th>
            <th scope="col">Descrição</th>
            <th scope="col">Vagas Periodizadas Solicitadas</th>
            <th scope="col">Vagas Não Periodizadas Solicitadas</th>
            <th scope="col">Disciplina</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="Pedidos.length > 0">
            <tr
              v-for="pedido in Pedidos"
              :key="'pedido-'+pedido.id"
              v-on:click.prevent="showPedidos(pedido)"
            >
              <td>{{pedido.departamento}}</td>
              <td>{{pedido.responsavel}}</td>
              <td>{{pedido.telefone}}</td>
              <td>{{pedido.descricao}}</td>
              <td>{{pedido.vagasPeriodizadasAtendidas}}/{{pedido.vagasPeriodizadasSolicitadas}}</td>
              <td>{{pedido.vagasNaoPeriodizadasAtendidas}}/{{pedido.vagasNaoPeriodizadasSolicitadas}}</td>
              <template v-for="disciplina in Disciplinas">
                <td
                  v-if="disciplina.id===pedido.Disciplina"
                  :key="'1-'+disciplina.id"
                >{{disciplina.nome}}</td>
              </template>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="2" class="text-center">
                <i class="fas fa-exclamation-triangle"></i> Nenhum pedido encontrado!
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <div class="col">
      <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
      >
        <template v-if="isEdit">
          <h1 class="h2">Editar Pedido</h1>
        </template>
        <template v-else>
          <h1 class="h2">Adicionar Pedido</h1>
        </template>
      </div>
      <b-alert :show="Boolean(error)" variant="danger" dismissible v-html="error"></b-alert>
      <form>
        <div class="form-group row">
          <label for="departamento" class="col-sm-12 col-form-label">Departamento</label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              id="departamento"
              v-model="pedidoForm.departamento"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="responsavel" class="col-sm-12 col-form-label">Responsável</label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              id="responsavel"
              v-model="pedidoForm.responsavel"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="telefone" class="col-sm-12 col-form-label">Telefone</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="telefone" v-model="pedidoForm.telefone" />
          </div>
        </div>
        <div class="form-group row">
          <label for="descricao" class="col-sm-12 col-form-label">Descrição</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="descricao" v-model="pedidoForm.descricao" />
          </div>
        </div>
        <div class="form-group row">
          <label
            for="vagasPeriodizadasSolicitadas"
            class="col-sm-12 col-form-label"
          >Vagas Periodizadas Solicitadas</label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              id="vagasPeriodizadasSolicitadas"
              v-model="pedidoForm.vagasPeriodizadasSolicitadas"
            />
          </div>
        </div>
        <div class="form-group row">
          <label
            for="vagasNaoPeriodizadasSolicitadas"
            class="col-sm-12 col-form-label"
          >Vagas Não Periodizadas Solicitadas</label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              id="vagasNaoPeriodizadasSolicitadas"
              v-model="pedidoForm.vagasNaoPeriodizadasSolicitadas"
            />
          </div>
        </div>
        <div class="form-group row">
          <label
            for="vagasPeriodizadasAtendidas"
            class="col-sm-12 col-form-label"
          >Vagas Periodizadas Atendidas</label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              id="vagasPeriodizadasAtendidas"
              v-model="pedidoForm.vagasPeriodizadasAtendidas"
            />
          </div>
        </div>
        <div class="form-group row">
          <label
            for="vagasNaoPeriodizadasAtendidas"
            class="col-sm-12 col-form-label"
          >Vagas Não Periodizadas Atendidas</label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              id="vagasNaoPeriodizadasAtendidas"
              v-model="pedidoForm.vagasNaoPeriodizadasAtendidas"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="disciplina" class="col-sm-12 col-form-label">Disciplina</label>
          <div class="col-sm-10">
            <select
              type="text"
              class="form-control"
              id="disciplina"
              v-model="pedidoForm.Disciplina"
            >
              <option v-if="Disciplinas.length===0" type="text" value>Nenhuma Disciplina Encontrada</option>
              <option
                v-for="disciplina in Disciplinas"
                :key="'2'+disciplina.id"
                :value="disciplina.id"
              >{{disciplina.nome}}</option>
            </select>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-10">
            <template v-if="isEdit">
              <button
                type="button"
                class="btn btn-success m-2"
                v-on:click.prevent="editPedido"
                :key="11"
              >Editar</button>
              <button
                type="button"
                class="btn btn-danger m-2"
                v-on:click.prevent="deletePedido"
                :key="33"
              >Excluir</button>
              <button
                type="button"
                class="btn btn-secondary m-2"
                v-on:click.prevent="cleanPedido"
                :key="22"
              >Cancelar</button>
            </template>
            <template v-else>
              <button
                type="button"
                class="btn btn-success m-2"
                v-on:click.prevent="addPedido"
                :key="11"
              >Adicionar</button>
              <button
                type="button"
                class="btn btn-secondary m-2"
                v-on:click.prevent="cleanPedido"
                :key="22"
              >Resetar</button>
            </template>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import pedidoService from "../../common/services/pedido";

const emptyPedido = {
  id: undefined,
  departamento: undefined,
  responsavel: undefined,
  telefone: undefined,
  descricao: undefined,
  vagasPeriodizadasSolicitadas: undefined,
  vagasNaoPeriodizadasSolicitadas: undefined,
  vagasPeriodizadasAtendidas: undefined,
  vagasNaoPeriodizadasAtendidas: undefined,
  Disciplina: undefined
};

export default {
  name: "DashboardPedido",

  data() {
    return {
      pedidoForm: _.clone(emptyPedido),
      error: undefined
    };
  },

  methods: {
    addPedido() {
      pedidoService
        .create(this.pedidoForm)
        .then(response => {
          this.cleanPedido();
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `O Pedido foi ${response.Pedido.id} criado!`,
            type: "success"
          });
        })
        .catch(error => {
          this.error = "<b>Erro ao criar Pedido</b>";
          if (error.response.data.fullMessage) {
            this.error +=
              "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");
          }
        });
    },

    editPedido() {
      pedidoService
        .update(this.pedidoForm.id, this.pedidoForm)
        .then(response => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `O Pedido foi ${response.Pedido.id} atualizada!`,
            type: "success"
          });
        })
        .catch(error => {
          this.error = "<b>Erro ao atualizar Pedido</b>";
          if (error.response.data.fullMessage) {
            this.error +=
              "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");
          }
        });
    },

    deletePedido() {
      pedidoService
        .delete(this.pedidoForm.id, this.pedidoForm)
        .then(response => {
          this.cleanPedido();
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `O Pedido ${response.Pedido.id} foi excluída!`,
            type: "success"
          });
        })
        .catch(() => {
          this.error = "<b>Erro ao excluir Pedido</b>";
        });
    },

    cleanPedido() {
      this.pedidoForm = _.clone(emptyPedido);
      this.error = undefined;
    },

    showPedidos(pedido) {
      this.cleanPedido();
      this.pedidoForm = _.clone(pedido);
      (function smoothscroll() {
        var currentScroll =
          document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
          window.requestAnimationFrame(smoothscroll);
          window.scrollTo(0, currentScroll - currentScroll / 5);
        }
      })();
    }
  },

  computed: {
    Pedidos() {
      return this.$store.state.pedido.Pedidos;
    },

    Disciplinas() {
      return this.$store.state.disciplina.Disciplinas;
    },

    isEdit() {
      return this.pedidoForm.id !== undefined;
    }
  }
};
</script>

<style scoped>
</style>