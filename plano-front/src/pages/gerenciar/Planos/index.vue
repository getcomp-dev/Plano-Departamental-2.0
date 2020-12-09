<template>
  <div class="main-component">
    <portal to="page-header">
      <BaseButton template="ajuda" @click="$refs.modalAjuda.toggle()" />
    </portal>

    <div class="page-content">
      <div class="div-table">
        <BaseTable :styles="'height:max-content'">
          <template #thead>
            <v-th-ordination
              :currentOrder="ordenacaoMainPlanos"
              orderToCheck="ano"
              width="70"
              align="start"
            >
              Ano
            </v-th-ordination>
            <v-th-ordination
              :currentOrder="ordenacaoMainPlanos"
              orderToCheck="nome"
              width="150"
              align="start"
            >
              Nome
            </v-th-ordination>
            <v-th width="300" align="start">Observação</v-th>
            <v-th-ordination
              :currentOrder="ordenacaoMainPlanos"
              orderToCheck="isEditable"
              orderType="desc"
              width="70"
            >
              Editável
            </v-th-ordination>
            <v-th-ordination
              :currentOrder="ordenacaoMainPlanos"
              orderToCheck="visible"
              orderType="desc"
              width="70"
            >
              Visível
            </v-th-ordination>
          </template>

          <template #tbody>
            <tr
              v-for="plano in PlanosOrdered"
              :key="plano.id"
              :class="{ 'bg-selected': plano.id === planoSelectedId }"
              @click="handleClickInPlano(plano)"
            >
              <v-td width="70" align="start">{{ plano.ano }}</v-td>
              <v-td width="150" align="start">{{ plano.nome }}</v-td>
              <v-td width="300" align="start" :title="plano.obs">{{ plano.obs }}</v-td>
              <v-td width="70">{{ generateBooleanText(plano.isEditable) }}</v-td>
              <v-td width="70">{{ generateBooleanText(plano.visible) }}</v-td>
            </tr>

            <tr v-if="!PlanosOrdered.length">
              <v-td width="680" colspan="5">
                <b>Nenhum plano encontrado</b>
              </v-td>
            </tr>
          </template>
        </BaseTable>
      </div>

      <Card
        :title="'Plano Departamental'"
        :toggleFooter="isEditing"
        :isPlano="isEditing"
        @btn-salvar="handleEditPlano"
        @btn-delete="openModalDelete"
        @btn-add="openModalNovoPlano"
        @btn-clean="cleanPlano"
        @btn-copy="copyPlanoSelected(planoForm)"
      >
        <template #form-group>
          <div class="row w-100 m-0 mb-2">
            <div class="form-group col-9 m-0 p-0">
              <label required for="planoNome">Nome</label>
              <input
                type="text"
                id="planoNome"
                class="form-control w-100"
                @keypress="maskLimitLength($event, 12)"
                @change="planoForm.nome = normalizeInputText($event)"
                :value="planoForm.nome"
              />
            </div>

            <div class="form-group col-3 m-0 p-0">
              <label required for="ano">Ano</label>
              <select
                id="planoAno"
                class="form-control w-100"
                v-model.number="planoForm.ano"
              >
                <option v-for="ano in AnosDoPlano" :key="'ano' + ano" :value="ano">
                  {{ ano }}
                </option>
              </select>
            </div>
          </div>

          <div class="row mb-2 mx-0">
            <div class="form-group col m-0 px-0">
              <label for="planoObs">Observações</label>
              <textarea
                id="planoObs"
                cols="38"
                rows="5"
                v-model="planoForm.obs"
                class="form-control"
              ></textarea>
            </div>
          </div>

          <div class="row mb-2 mx-0">
            <div class="form-group col-6 m-0 p-0">
              <label required for="planoEditavel">Editável</label>
              <select
                id="planoEditavel"
                v-model.number="planoForm.isEditable"
                class="form-control"
              >
                <option :value="true">Sim</option>
                <option :value="false">Não</option>
              </select>
            </div>

            <div class="form-group col-6 m-0 p-0">
              <label required for="planoVisivel">Visível</label>
              <select
                id="planoVisivel"
                v-model.number="planoForm.visible"
                class="form-control"
              >
                <option :value="true">Sim</option>
                <option :value="false">Não</option>
              </select>
            </div>
          </div>
        </template>
      </Card>
    </div>

    <ModalNovoPlano ref="modalNovoPlano" :plano="planoForm" />

    <ModalDelete
      ref="modalDelete"
      :isDeleting="isEditing"
      @btn-deletar="handleDeletePlano"
    >
      <li class="list-group-item">
        <span v-if="isEditing">
          Tem certeza que deseja excluír o plano
          <b>{{ planoForm.ano + " - " + planoForm.nome }}</b>
          ?
        </span>
        <span v-else class="list-group-item">Nenhum plano selecionado.</span>
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
        Clique na linha da tabela do plano que deseja alterar. Em seguida, no cartão à
        direita, altere as informações que desejar e clique em Salvar
        <font-awesome-icon :icon="['fas', 'check']" class="icon-green" />
        .
      </li>
      <li class="list-group-item">
        <b>Deletar:</b>
        Clique na linha da tabela do plano que deseja remover. Em seguida, no cartão à
        direita, clique em Remover
        <font-awesome-icon :icon="['fas', 'trash-alt']" class="icon-red" />
        e confirme a remoção na janela que será aberta.
      </li>
      <li class="list-group-item">
        <b>Copiar:</b>
        Clique na linha da tabela do plano que deseja copiar. Em seguida, no cartão à
        direita, clique em Copiar
        <font-awesome-icon :icon="['fas', 'copy']" class="icon-lightblue" />
        .
      </li>
      <li class="list-group-item">
        <b>Limpar:</b>
        No cartão à direita, clique em Cancelar
        <font-awesome-icon :icon="['fas', 'times']" class="icon-gray" />
        , para limpar as informações.
      </li>
      <li class="list-group-item">
        <b>Ordenar:</b>
        Clique no cabeçalho da tabela, na coluna desejada, para alterar a ordenação das
        informações.
      </li>
    </ModalAjuda>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { clone, orderBy } from "lodash-es";
import copyPlanoService from "@/common/services/copyPlano";
import planoService from "@/common/services/plano";
import {
  generateBooleanText,
  normalizeInputText,
  maskLimitLength,
} from "@/common/mixins";
import { ModalAjuda, ModalDelete } from "@/components/modals";
import { Card } from "@/components/ui";
import ModalNovoPlano from "./ModalNovoPlano/index";
import workerSrc from '!!file-loader!pdfjs-dist/build/pdf.worker.min.js'

const emptyPlano = {
  ano: 2019,
  nome: "",
  obs: "",
  isEditable: true,
  visible: true,
};

export default {
  name: "Planos",
  mixins: [generateBooleanText, normalizeInputText, maskLimitLength],
  components: {
    ModalAjuda,
    ModalDelete,
    Card,
    ModalNovoPlano,
  },
  data() {
    return {
      planoForm: clone(emptyPlano),
      planoSelectedId: null,
      ordenacaoMainPlanos: { order: "ano", type: "asc" },
    };
  },

  methods: {
    ...mapActions(["deletePlano", "editPlano"]),

    handleClickInPlano(plano) {
      this.cleanPlano();
      this.planoSelectedId = plano.id;
      this.planoForm = clone(plano);
    },
    cleanPlano() {
      this.planoSelectedId = null;
      this.planoForm = clone(emptyPlano);
    },
    openModalDelete() {
      this.$refs.modalDelete.open();
    },
    openModalNovoPlano() {
      if (
        this.planoForm.ano === "" ||
        this.planoForm.ano === null ||
        this.planoForm.nome === "" ||
        this.planoForm.nome === null
      )
        this.pushNotification({
          type: "error",
          text: `Campos obrigatórios inválidos ou incompletos.`,
        });
      else {
        this.$refs.modalNovoPlano.open();
      }
    },

    async handleEditPlano() {
      try {
        this.setPartialLoading(true);
        await this.editPlano(this.planoForm);
      } catch (error) {
        this.pushNotification({
          type: "error",
          title: "Erro ao atualizar plano",
          text: error.message || "",
        });
      } finally {
        this.setPartialLoading(false);
      }
    },
    async handleDeletePlano() {
      try {
        this.setPartialLoading(true);
        await this.deletePlano(this.planoForm);
        this.cleanPlano();
      } catch (error) {
        this.pushNotification({
          type: "error",
          title: "Erro ao deletar plano",
          text: "Tente novamente",
        });
      } finally {
        this.setPartialLoading(false);
      }
    },

    async importTurmaPorDepartamento(event) {
      const pdfjsLib = require(/* webpackChunkName: "pdfjs-dist" */ `pdfjs-dist`)
      pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc
      let file = event.target.files[0];
      console.log(file)
      let fullText = []
      let data = {}
      let fileReader = new FileReader()
      fileReader.onload = async function() {
        let typedarray = new Uint8Array(this.result)
        let pdf = await pdfjsLib.getDocument(typedarray).promise
        for(let i = 1; i <= pdf._pdfInfo.numPages; i++){
          let page = await pdf.getPage(i)
          let text = await page.getTextContent()
          fullText.push(...text.items)
        }
        let i = 0;

        let nexti = () => {
          i = i+1
          if(!fullText[i].str) {
            i = i + 4
          }
          if(fullText[i].str === pdf._pdfInfo.numPages.toString()){
            if(fullText[i + 2].str === 'Página :'){
              i = i+8
            }
          }
        }

        while(fullText[i].str !== 'Disciplina'){
          nexti()
        }

        while(i < fullText.length){

          if(fullText[i].str === 'Disciplina'){
            nexti()

            let disciplina = fullText[i].str.split(' ')[0]
            data[disciplina] = {}
            data[disciplina].codigo = disciplina
            data[disciplina].Turmas = {}

            nexti()

            while(i < fullText.length && fullText[i].str !== 'Disciplina') {
              let turma = fullText[i].str.split(' ')[1]
              data[disciplina].Turmas[turma] = {}
              data[disciplina].Turmas[turma].Turma = turma

              nexti()

              data[disciplina].Turmas[turma].vagasOferecidas = fullText[i].str.split(' ')[2]

              nexti()

              data[disciplina].Turmas[turma].vagasOcupadas = fullText[i].str.split(' ')[2]

              nexti()

              if (i < fullText.length && fullText[i].str === 'Aprovado:') {
                data[disciplina].Turmas[turma].Aprovado = {}
                nexti()
                while (i < fullText.length
                && fullText[i].str !== 'Cancelado:'
                && fullText[i].str !== 'Rep Freq:'
                && fullText[i].str !== 'Rep Nota:'
                && fullText[i].str !== 'Reprovado:'
                && fullText[i].str !== 'Sem Conceito:'
                && fullText[i].str !== 'Trancado:'
                && fullText[i].str !== 'Disciplina'
                && fullText[i].str.substring(0, 5) !== 'Turma') {
                  let curso = fullText[i].str
                  data[disciplina].Turmas[turma].Aprovado[curso] = {}
                  data[disciplina].Turmas[turma].Aprovado[curso].Curso = fullText[i].str
                  nexti()
                  data[disciplina].Turmas[turma].Aprovado[curso].Quantidade = fullText[i].str
                  nexti()
                }
              }

              if (i < fullText.length && fullText[i].str === 'Cancelado:') {
                data[disciplina].Turmas[turma].Cancelado = {}
                nexti()
                while (i < fullText.length
                && fullText[i].str !== 'Rep Freq:'
                && fullText[i].str !== 'Rep Nota:'
                && fullText[i].str !== 'Reprovado:'
                && fullText[i].str !== 'Sem Conceito:'
                && fullText[i].str !== 'Trancado:'
                && fullText[i].str !== 'Disciplina'
                && fullText[i].str.substring(0, 5) !== 'Turma') {
                  let curso = fullText[i].str
                  data[disciplina].Turmas[turma].Cancelado[curso] = {}
                  data[disciplina].Turmas[turma].Cancelado[curso].Curso = fullText[i].str
                  nexti()
                  data[disciplina].Turmas[turma].Cancelado[curso].Quantidade = fullText[i].str
                  nexti()
                }
              }

              if (i < fullText.length && fullText[i].str === 'Rep Freq:') {
                data[disciplina].Turmas[turma].RepFreq = {}
                nexti()
                while (i < fullText.length
                && fullText[i].str !== 'Rep Nota:'
                && fullText[i].str !== 'Reprovado:'
                && fullText[i].str !== 'Sem Conceito:'
                && fullText[i].str !== 'Trancado:'
                && fullText[i].str !== 'Disciplina'
                && fullText[i].str.substring(0, 5) !== 'Turma') {
                  let curso = fullText[i].str
                  data[disciplina].Turmas[turma].RepFreq[curso] = {}
                  data[disciplina].Turmas[turma].RepFreq[curso].Curso = fullText[i].str
                  nexti()
                  data[disciplina].Turmas[turma].RepFreq[curso].Quantidade = fullText[i].str
                  nexti()
                }
              }

              if (i < fullText.length && fullText[i].str === 'Rep Nota:') {
                data[disciplina].Turmas[turma].RepNota = {}
                nexti()
                while (i < fullText.length
                && fullText[i].str !== 'Reprovado:'
                && fullText[i].str !== 'Sem Conceito:'
                && fullText[i].str !== 'Trancado:'
                && fullText[i].str !== 'Disciplina'
                && fullText[i].str.substring(0, 5) !== 'Turma') {
                  let curso = fullText[i].str
                  data[disciplina].Turmas[turma].RepNota[curso] = {}
                  data[disciplina].Turmas[turma].RepNota[curso].Curso = fullText[i].str
                  nexti()
                  data[disciplina].Turmas[turma].RepNota[curso].Quantidade = fullText[i].str
                  nexti()
                }
              }

              if (i < fullText.length && fullText[i].str === 'Reprovado:') {
                data[disciplina].Turmas[turma].Reprovado = {}
                nexti()
                while (i < fullText.length
                && fullText[i].str !== 'Sem Conceito:'
                && fullText[i].str !== 'Trancado:'
                && fullText[i].str !== 'Disciplina'
                && fullText[i].str.substring(0, 5) !== 'Turma') {
                  let curso = fullText[i].str
                  data[disciplina].Turmas[turma].Reprovado[curso] = {}
                  data[disciplina].Turmas[turma].Reprovado[curso].Curso = fullText[i].str
                  nexti()
                  data[disciplina].Turmas[turma].Reprovado[curso].Quantidade = fullText[i].str
                  nexti()
                }
              }

              if (i < fullText.length && fullText[i].str === 'Sem Conceito:') {
                data[disciplina].Turmas[turma].SemConceito = {}
                nexti()
                while (i < fullText.length
                && fullText[i].str !== 'Trancado:'
                && fullText[i].str !== 'Disciplina'
                && fullText[i].str.substring(0, 5) !== 'Turma') {
                  let curso = fullText[i].str
                  data[disciplina].Turmas[turma].SemConceito[curso] = {}
                  data[disciplina].Turmas[turma].SemConceito[curso].Curso = fullText[i].str
                  nexti()
                  data[disciplina].Turmas[turma].SemConceito[curso].Quantidade = fullText[i].str
                  nexti()
                }
              }


              if (i < fullText.length && fullText[i].str === 'Trancado:') {
                data[disciplina].Turmas[turma].Trancado = {}
                nexti()
                while (i < fullText.length
                && fullText[i].str !== 'Disciplina'
                && fullText[i].str.substring(0, 5) !== 'Turma') {
                  let curso = fullText[i].str
                  data[disciplina].Turmas[turma].Trancado[curso] = {}
                  data[disciplina].Turmas[turma].Trancado[curso].Curso = fullText[i].str
                  nexti()
                  data[disciplina].Turmas[turma].Trancado[curso].Quantidade = fullText[i].str
                  nexti()
                }
              }
            }
            console.log(data[disciplina])
          }
        }
      }
      fileReader.readAsArrayBuffer(file);
    },

    copyPlanoSelected(oldPlano) {
      let newPlano = {
        nome: `Cópia de '${oldPlano.nome}'`,
        ano: oldPlano.ano,
        obs: `Cópia do plano '${oldPlano.nome} - ${oldPlano.ano}'`,
      };
      planoService.create(newPlano).then((plano) => {
        copyPlanoService
          .copyPlano(oldPlano.id, plano.Plano.id)
          .then((response) => {
            this.$notify({
              group: "general",
              title: `Sucesso!`,
              text: `O Plano ${oldPlano.nome} foi copiado!`,
              type: "success",
            });
          })
          .catch((error) => {
            this.error = "<b>Erro ao copiar plano</b>";
            if (error.response.data.fullMessage) {
              this.error +=
                "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");
            }
            this.$notify({
              group: "general",
              title: `Erro!`,
              text: this.error,
              type: "error",
            });
          });
      });
    },
  },

  computed: {
    ...mapGetters(["AllPlanos", "AnosDoPlano"]),

    PlanosOrdered() {
      const { order, type } = this.ordenacaoMainPlanos;
      return orderBy(this.AllPlanos, order, type);
    },
    isEditing() {
      return this.planoSelectedId != null;
    },
  },
};
</script>
