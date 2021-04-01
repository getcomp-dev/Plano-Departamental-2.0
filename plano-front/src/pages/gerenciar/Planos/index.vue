<template>
  <div class="main-component">
    <portal to="page-header">
      <BaseButton template="ajuda" @click="$refs.modalAjuda.toggle()" />
    </portal>

    <div class="page-content">
      <div class="div-table">
        <BaseTable styles="height:max-content">
          <template #thead>
            <v-th-ordination
              :currentOrder="ordenacaoMainPlanos"
              orderToCheck="ano"
              width="65"
              title="Ano do Plano"
            >
              Ano
            </v-th-ordination>
            <v-th-ordination
              :currentOrder="ordenacaoMainPlanos"
              orderToCheck="nome"
              width="150"
              align="start"
              title="Nome do Plano"
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
              <v-td width="65">{{ plano.ano }}</v-td>
              <v-td width="150" align="start">{{ plano.nome }}</v-td>
              <v-td width="300" align="start" :title="plano.obs">{{ plano.obs }}</v-td>
              <v-td width="70">{{ booleanToText(plano.isEditable) }}</v-td>
              <v-td width="70">{{ booleanToText(plano.visible) }}</v-td>
            </tr>

            <tr v-if="!PlanosOrdered.length">
              <v-td width="680" colspan="5">
                <b>Nenhum plano encontrado</b>
              </v-td>
            </tr>
          </template>
        </BaseTable>
      </div>

      <Card title="Plano Departamental" width="330">
        <template #body>
          <div class="row">
            <div class="col-8">
              <VInput label="Nome" v-model="planoForm.nome" :validation="$v.planoForm.nome" />
            </div>
            <div class="col">
              <VSelect label="Ano" v-model.number="planoForm.ano" :validation="$v.planoForm.ano">
                <VOption v-for="ano in AnosDoPlano" :key="'ano' + ano" :value="ano" :text="ano" />
              </VSelect>
            </div>
          </div>

          <VTextarea label="Observações" v-model="planoForm.obs" rows="4" />

          <div class="row">
            <div class="col">
              <VCheckbox label="Editável" v-model="planoForm.isEditable" />
            </div>
            <div class="col">
              <VCheckbox label="Visível" v-model="planoForm.visible" />
            </div>
          </div>

          <!-- Botão para teste da função importTurmaPorDepartamento
          <div class="row mb-2 mx-0">
            <input 
              type="file" 
              @change="importTurmaPorDepartamento($event, AllDisciplinas, AllTurmas, AllCursos)">
          </div>  -->
        </template>

        <template #footer>
          <template v-if="isEditing">
            <BaseButton
              title="Importar pedidos"
              type="icon"
              color="gray"
              @click="$refs.modalImportPedidos.open()"
            >
              <font-awesome-icon :icon="['fas', 'file-import']" />
            </BaseButton>
            <BaseButton
              title="Copiar Plano"
              type="icon"
              color="lightblue"
              @click="copyPlanoSelected"
            >
              <font-awesome-icon :icon="['fas', 'copy']" />
            </BaseButton>

            <BaseButton class="ml-auto" template="Salvar" @click="handleEditPlano" />
            <BaseButton template="deletar" @click="openModalDelete" />
          </template>
          <BaseButton v-else template="adicionar" @click="openModalNovoPlano" />
          <BaseButton template="cancelar" @click="clearPlanoForm" />
        </template>
      </Card>
    </div>

    <ModalNovoPlano ref="modalNovoPlano" :plano="planoForm" />
    <ModalImportPedidos ref="modalImportPedidos" :planoForm="planoForm" />

    <ModalDelete ref="modalDelete" :isDeleting="isEditing" @btn-deletar="handleDeletePlano">
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
        <b>Adicionar plano:</b>
        Preencha o cartão em branco à direita e em seguida, clique em Adicionar
        <font-awesome-icon :icon="['fas', 'plus']" class="icon-green" />
        .
      </li>
      <li class="list-group-item">
        <b>Editar plano:</b>
        Clique na linha da tabela do plano que deseja alterar. Em seguida, no cartão à direita,
        altere as informações que desejar e clique em Salvar
        <font-awesome-icon :icon="['fas', 'check']" class="icon-green" />
        .
      </li>
      <li class="list-group-item">
        <b>Deletar plano:</b>
        Clique na linha da tabela do plano que deseja remover. Em seguida, no cartão à direita,
        clique em Remover
        <font-awesome-icon :icon="['fas', 'trash']" class="icon-red" />
        e confirme a remoção na janela que será aberta.
      </li>
      <li class="list-group-item">
        <b>Copiar plano:</b>
        Clique na linha da tabela do plano que deseja copiar. Em seguida, no cartão à direita,
        clique em Copiar
        <font-awesome-icon :icon="['fas', 'copy']" class="icon-lightblue" />
        .
      </li>
      <li class="list-group-item">
        <b>Importar pedidos SIGA:</b>
        Clique na linha da tabela do plano que deseja importar os pedidos. Em seguida, no cartão à
        direita, clique em Importar
        <font-awesome-icon :icon="['fas', 'file-import']" class="icon-gray" />
        .
      </li>
      <li class="list-group-item">
        <b>Limpar formulário:</b>
        No cartão à direita, clique em Cancelar
        <font-awesome-icon :icon="['fas', 'times']" class="icon-gray" />
        , para limpar as informações.
      </li>
    </ModalAjuda>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { clone, orderBy } from "lodash-es";
import { required, maxLength, numeric } from "vuelidate/lib/validators";
import copyPlanoService from "@/services/copyPlano";
import conceitoTurmaCursoService from "@/services/conceitoTurmaCurso";
import { booleanToText } from "@utils";
import { ModalAjuda, ModalDelete } from "@/components/modals";
import { Card, VInput, VSelect, VOption, VCheckbox, VTextarea } from "@/components/ui";
import ModalNovoPlano from "./ModalNovoPlano/index";
import ModalImportPedidos from "./ModalImportPedidos/index";
import workerSrc from "!!file-loader!pdfjs-dist/build/pdf.worker.min.js";

const emptyPlano = {
  ano: new Date().getFullYear(),
  nome: "",
  obs: "",
  isEditable: true,
  visible: true,
};

export default {
  name: "GerenciarPlanos",
  components: {
    ModalAjuda,
    ModalDelete,
    Card,
    ModalNovoPlano,
    ModalImportPedidos,
    VInput,
    VSelect,
    VOption,
    VCheckbox,
    VTextarea,
  },
  data() {
    return {
      planoForm: clone(emptyPlano),
      planoSelectedId: null,
      ordenacaoMainPlanos: { order: "ano", type: "asc" },
    };
  },
  validations: {
    planoForm: {
      ano: { required, numeric },
      nome: { required, maxLength: maxLength(14) },
    },
  },

  methods: {
    ...mapActions(["createPlano", "deletePlano", "updatePlano"]),
    booleanToText,

    handleClickInPlano(plano) {
      this.clearPlanoForm();
      this.planoSelectedId = plano.id;
      this.planoForm = clone(plano);
    },
    clearPlanoForm() {
      this.planoSelectedId = null;
      this.planoForm = clone(emptyPlano);
      this.$nextTick(() => this.$v.$reset());
    },
    openModalDelete() {
      this.$refs.modalDelete.open();
    },
    openModalNovoPlano() {
      this.$v.planoForm.$touch();
      if (this.$v.planoForm.$anyError) return;

      this.$refs.modalNovoPlano.open();
    },
    async handleEditPlano() {
      this.$v.planoForm.$touch();
      if (this.$v.planoForm.$anyError) return;

      try {
        this.setLoading({ type: "partial", value: true });
        await this.updatePlano({ data: this.planoForm, notify: true });
      } catch (error) {
        this.pushNotification({
          type: "error",
          title: "Erro ao atualizar plano",
          text: error.message || "",
        });
      } finally {
        this.setLoading({ type: "partial", value: false });
      }
    },
    async handleDeletePlano() {
      try {
        this.setLoading({ type: "partial", value: true });
        await this.deletePlano({ data: this.planoForm, notify: true });
        this.clearPlanoForm();
      } catch (error) {
        this.pushNotification({
          type: "error",
          title: "Erro ao deletar plano",
          text: "Tente novamente",
        });
      } finally {
        this.setLoading({ type: "partial", value: false });
      }
    },
    async copyPlanoSelected() {
      const planoToCopy = clone(this.planoForm);
      const newPlano = {
        nome: `Cópia de '${planoToCopy.nome}'`,
        ano: planoToCopy.ano,
        obs: `Cópia do plano '${planoToCopy.nome} - ${planoToCopy.ano}'`,
      };

      try {
        this.setLoading({ type: "partial", value: true });
        const planoCreated = await this.createPlano({ data: newPlano, notify: false });
        await copyPlanoService.copyPlano(planoToCopy.id, planoCreated.id);
        this.pushNotification({
          type: "success",
          text: `O Plano ${planoToCopy.nome} foi copiado!`,
        });
      } catch (error) {
        let errorMsg = "<b>Erro ao copiar plano</b>";
        if (error.response.data.fullMessage) {
          errorMsg += "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");
        }
        this.pushNotification({
          type: "error",
          text: errorMsg,
        });
      } finally {
        this.setLoading({ type: "partial", value: false });
      }
    },
    // prettier-ignore
    async importTurmaPorDepartamento(event, AllDisciplinas, AllTurmas, AllCursos) {
      const pdfjsLib = require(/* webpackChunkName: "pdfjs-dist" */ "pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;
      let file = event.target.files[0];
      console.log(file);
      let fullText = [];
      let data = {};
      let fileReader = new FileReader();
      fileReader.onload = async function() {
        let typedarray = new Uint8Array(this.result);
        let pdf = await pdfjsLib.getDocument(typedarray).promise;
        for(let i = 1; i <= pdf._pdfInfo.numPages; i++){
          let page = await pdf.getPage(i);
          let text = await page.getTextContent();
          fullText.push(...text.items);
        }
        let i = 0;

        let nexti = () => {
          i = i+1;
          if(!fullText[i].str) {
            i = i + 4;
          }
          if(fullText[i].str === pdf._pdfInfo.numPages.toString()){
            if(fullText[i + 2].str === "Página :"){
              i = i+8;
            }
          }
        };

        while(fullText[i].str !== "Disciplina"){
          nexti();
        }

        while(i < fullText.length){

          if(fullText[i].str === "Disciplina"){
            nexti();

            let disciplina = fullText[i].str.split(" ")[0];
            data[disciplina] = {};
            data[disciplina].codigo = disciplina;
            data[disciplina].Turmas = {};

            nexti();

            while(i < fullText.length && fullText[i].str !== "Disciplina") {
              let turma = fullText[i].str.split(" ")[1];
              data[disciplina].Turmas[turma] = {};
              data[disciplina].Turmas[turma].Turma = turma;

              nexti();

              data[disciplina].Turmas[turma].vagasOferecidas = fullText[i].str.split(" ")[2];

              nexti();

              data[disciplina].Turmas[turma].vagasOcupadas = fullText[i].str.split(" ")[2];

              nexti();

              if (i < fullText.length && fullText[i].str === "Aprovado:") {
                data[disciplina].Turmas[turma].Aprovado = {};
                nexti();
                while (i < fullText.length
                && fullText[i].str !== "Cancelado:"
                && fullText[i].str !== "Rep Freq:"
                && fullText[i].str !== "Rep Nota:"
                && fullText[i].str !== "Reprovado:"
                && fullText[i].str !== "Sem Conceito:"
                && fullText[i].str !== "Trancado:"
                && fullText[i].str !== "Disciplina"
                && fullText[i].str.substring(0, 5) !== "Turma") {
                  let curso = fullText[i].str;
                  data[disciplina].Turmas[turma].Aprovado[curso] = {};
                  data[disciplina].Turmas[turma].Aprovado[curso].Curso = fullText[i].str;
                  nexti();
                  data[disciplina].Turmas[turma].Aprovado[curso].Quantidade = fullText[i].str;
                  nexti();
                }
              }

              if (i < fullText.length && fullText[i].str === "Cancelado:") {
                data[disciplina].Turmas[turma].Cancelado = {};
                nexti();
                while (i < fullText.length
                && fullText[i].str !== "Rep Freq:"
                && fullText[i].str !== "Rep Nota:"
                && fullText[i].str !== "Reprovado:"
                && fullText[i].str !== "Sem Conceito:"
                && fullText[i].str !== "Trancado:"
                && fullText[i].str !== "Disciplina"
                && fullText[i].str.substring(0, 5) !== "Turma") {
                  let curso = fullText[i].str;
                  data[disciplina].Turmas[turma].Cancelado[curso] = {};
                  data[disciplina].Turmas[turma].Cancelado[curso].Curso = fullText[i].str;
                  nexti();
                  data[disciplina].Turmas[turma].Cancelado[curso].Quantidade = fullText[i].str;
                  nexti();
                }
              }

              if (i < fullText.length && fullText[i].str === "Rep Freq:") {
                data[disciplina].Turmas[turma].RepFreq = {};
                nexti();
                while (i < fullText.length
                && fullText[i].str !== "Rep Nota:"
                && fullText[i].str !== "Reprovado:"
                && fullText[i].str !== "Sem Conceito:"
                && fullText[i].str !== "Trancado:"
                && fullText[i].str !== "Disciplina"
                && fullText[i].str.substring(0, 5) !== "Turma") {
                  let curso = fullText[i].str;
                  data[disciplina].Turmas[turma].RepFreq[curso] = {};
                  data[disciplina].Turmas[turma].RepFreq[curso].Curso = fullText[i].str;
                  nexti();
                  data[disciplina].Turmas[turma].RepFreq[curso].Quantidade = fullText[i].str;
                  nexti();
                }
              }

              if (i < fullText.length && fullText[i].str === "Rep Nota:") {
                data[disciplina].Turmas[turma].RepNota = {};
                nexti();
                while (i < fullText.length
                && fullText[i].str !== "Reprovado:"
                && fullText[i].str !== "Sem Conceito:"
                && fullText[i].str !== "Trancado:"
                && fullText[i].str !== "Disciplina"
                && fullText[i].str.substring(0, 5) !== "Turma") {
                  let curso = fullText[i].str;
                  data[disciplina].Turmas[turma].RepNota[curso] = {};
                  data[disciplina].Turmas[turma].RepNota[curso].Curso = fullText[i].str;
                  nexti();
                  data[disciplina].Turmas[turma].RepNota[curso].Quantidade = fullText[i].str;
                  nexti();
                }
              }

              if (i < fullText.length && fullText[i].str === "Reprovado:") {
                data[disciplina].Turmas[turma].Reprovado = {};
                nexti();
                while (i < fullText.length
                && fullText[i].str !== "Sem Conceito:"
                && fullText[i].str !== "Trancado:"
                && fullText[i].str !== "Disciplina"
                && fullText[i].str.substring(0, 5) !== "Turma") {
                  let curso = fullText[i].str;
                  data[disciplina].Turmas[turma].Reprovado[curso] = {};
                  data[disciplina].Turmas[turma].Reprovado[curso].Curso = fullText[i].str;
                  nexti();
                  data[disciplina].Turmas[turma].Reprovado[curso].Quantidade = fullText[i].str;
                  nexti();
                }
              }

              if (i < fullText.length && fullText[i].str === "Sem Conceito:") {
                data[disciplina].Turmas[turma].SemConceito = {};
                nexti();
                while (i < fullText.length
                && fullText[i].str !== "Trancado:"
                && fullText[i].str !== "Disciplina"
                && fullText[i].str.substring(0, 5) !== "Turma") {
                  let curso = fullText[i].str;
                  data[disciplina].Turmas[turma].SemConceito[curso] = {};
                  data[disciplina].Turmas[turma].SemConceito[curso].Curso = fullText[i].str;
                  nexti();
                  data[disciplina].Turmas[turma].SemConceito[curso].Quantidade = fullText[i].str;
                  nexti();
                }
              }


              if (i < fullText.length && fullText[i].str === "Trancado:") {
                data[disciplina].Turmas[turma].Trancado = {};
                nexti();
                while (i < fullText.length
                && fullText[i].str !== "Disciplina"
                && fullText[i].str.substring(0, 5) !== "Turma") {
                  let curso = fullText[i].str;
                  data[disciplina].Turmas[turma].Trancado[curso] = {};
                  data[disciplina].Turmas[turma].Trancado[curso].Curso = fullText[i].str;
                  nexti();
                  data[disciplina].Turmas[turma].Trancado[curso].Quantidade = fullText[i].str;
                  nexti();
                }
              }
            }
          }
        }
        let disciplinas = Object.getOwnPropertyNames(data);
        let disciplinasNaoEncontradas = [];
        let turmasNaoEncontradas = [];
        let cursosNaoEncontrados = [];
        for(let disc in disciplinas){
          let disciplina = AllDisciplinas.find( (d) => d.codigo === disciplinas[disc] );
          if(!disciplina){
            disciplinasNaoEncontradas.push(disciplinas[disc]);
          }else{
            let turmas = Object.getOwnPropertyNames(data[disciplina.codigo].Turmas);
            for(let t in turmas){
              let turma = AllTurmas.find(
                (turma) => turma.letra === turmas[t] && turma.Disciplina === disciplina.id
              );
              if(!turma){
                turmasNaoEncontradas.push({disciplina: disciplina.codigo, letra: turmas[t]});
              } else {
                let conceitos = Object.getOwnPropertyNames(
                  data[disciplina.codigo].Turmas[turma.letra]
                );
                for(let conceito = 3; conceito < conceitos.length; conceito++){
                  let cursos = Object.getOwnPropertyNames(
                    data[disciplina.codigo].Turmas[turma.letra][conceitos[conceito]]
                  );
                  for(let c in cursos){
                    let curso = AllCursos.find( (curso) => curso.nome === cursos[c] );
                    if(!curso){
                      cursosNaoEncontrados.push(cursos[c]);
                    }else{
                      conceitoTurmaCursoService.create(
                        { 
                          Curso: curso.id,
                          Turma: turma.id,
                          avaliacao: conceitos[conceito],
                          quantidade: data[disciplina.codigo]
                            .Turmas[turma.letra][conceitos[conceito]][curso.nome].Quantidade,
                        });
                    }
                  }
                }
              }
            }
          }
        }
        console.log(disciplinasNaoEncontradas);
        console.log(turmasNaoEncontradas);
        console.log(cursosNaoEncontrados);
      };



      fileReader.readAsArrayBuffer(file);
    },
  },

  computed: {
    ...mapGetters(["Planos", "AnosDoPlano", "AllDisciplinas", "AllTurmas", "AllCursos"]),

    PlanosOrdered() {
      const { order, type } = this.ordenacaoMainPlanos;
      return orderBy(this.Planos, order, type);
    },
    isEditing() {
      return this.planoSelectedId != null;
    },
  },
};
</script>
