<template>
  <div>
    <PageHeader title="Preferências dos docentes">
      <BaseButton template="swap-modes" @click="swapModes()" />
      <BaseButton template="file-upload" @click="openModalUpload()" />
    </PageHeader>
    <div class="div-table">
      <BaseTable v-if="docentespordisciplina" style="border: 0px;">
        <template #thead>
          <th style="width: 80px">Código</th>
          <th style="width: 420px">Nome</th>
          <th style="width: 100px">Perfil</th>
          <th style="width: 200px">Docente</th>
          <th style="width: 40px">Pref</th>
        </template>

        <template #tbody>
          <template v-for="disciplina in DocentesPorDisciplinas">
            <tr
              :key="disciplina[0].Disciplina + 'headerDisciplina'"
              class="bg-custom"
            >
              <td style="width: 80px">
                {{ disciplinaById(disciplina[0].Disciplina).codigo }}
              </td>
              <td style="width: 420px">
                {{ disciplinaById(disciplina[0].Disciplina).nome }}
              </td>
              <td style="width: 100px">
                {{
                  perfilById(disciplinaById(disciplina[0].Disciplina).Perfil)
                    .abreviacao
                }}
              </td>
              <td style="width: 200px"></td>
              <td
                style="width: 40px"
                @click="openModalAddDocente(disciplina[0].Disciplina)"
                class="td-pref"
              >
                +
              </td>
            </tr>

            <tr
              v-for="preferencia in disciplina"
              :key="
                'disciplina' +
                  preferencia.Disciplina +
                  'docente' +
                  preferencia.Docente
              "
            >
              <td style="width: 80px"></td>
              <td style="width: 420px"></td>
              <td style="width: 100px"></td>
              <td style="width: 200px">
                {{ docenteById(preferencia.Docente).apelido }}
              </td>
              <td
                style="width: 40px"
                @click="openModalEdit(preferencia)"
                class="td-pref"
              >
                {{ preferencia.preferencia }}
              </td>
            </tr>
          </template>
        </template>
      </BaseTable>

      <BaseTable v-else style="border: 0px;">
        <template #thead>
          <th style="width: 200px">Docente</th>
          <th style="width: 80px">Código</th>
          <th style="width: 420px">Nome</th>
          <th style="width: 100px">Perfil</th>
          <th style="width: 40px">Pref</th>
        </template>

        <template #tbody>
          <template v-for="docente in DisciplinasPorDocentes">
            <tr :key="docente[0].Docente + 'headerDocente'" class="bg-custom">
              <td style="width: 200px">
                {{ docenteById(docente[0].Docente).apelido }}
              </td>
              <td style="width: 80px"></td>
              <td style="width: 420px"></td>
              <td style="width: 100px"></td>
              <td
                style="width: 40px"
                @click="openModalAddDisciplina(docente[0].Docente)"
                class="td-pref"
              >
                +
              </td>
            </tr>

            <tr
              v-for="preferencia in docente"
              :key="
                'docente' +
                  preferencia.Docente +
                  'disciplina' +
                  preferencia.Disciplina
              "
            >
              <td style="width: 200px"></td>
              <td style="width: 80px">
                {{ disciplinaById(preferencia.Disciplina).codigo }}
              </td>
              <td style="width: 420px">
                {{ disciplinaById(preferencia.Disciplina).nome }}
              </td>
              <td style="width: 100px">
                {{
                  perfilById(disciplinaById(preferencia.Disciplina).Perfil)
                    .abreviacao
                }}
              </td>
              <td
                style="width: 40px"
                @click="openModalEdit(preferencia)"
                class="td-pref"
              >
                {{ preferencia.preferencia }}
              </td>
            </tr>
          </template>
        </template>
      </BaseTable>
    </div>

    <BaseModal ref="modalEdit" :title="'Editar Preferência'" :hasFooter="true">
      <template #modal-body>
        <div class="row" :style="{ margin: '0' }">
          <p>Docente: {{ edit.docente ? edit.docente.nome : "" }}</p>
        </div>
        <div class="row" :style="{ margin: '0' }">
          <p>Disciplina: {{ edit.disciplina ? edit.disciplina.nome : "" }}</p>
        </div>
        <div class="row" :style="{ display: 'table-cell', verticalAlign: 'middle' }">
          <label for="inputPreferenciaDocentes">Preferência: </label>
          <input
            type="text"
            v-model="preferenciaForm.preferencia"
            id="inputPreferenciaDocentes"
            :style="{
              width: '25px',
              height: '20px',
              marginLeft: '10px',
              textAlign: 'center',
            }"
          />
        </div>
      </template>
      <template #modal-footer>
        <BaseButton
          type="text"
          color="lightblue"
          @click="handleEditPrefs()"
          class="ml-auto"
          >Confirmar</BaseButton
        >
      </template>
    </BaseModal>

    <BaseModal
      ref="modalAddDocente"
      :title="'Adicionar Preferência'"
      :hasFooter="true"
    >
      <template #modal-body>
        <div class="row" :style="{ margin: '0' }">
          <p>Disciplina: {{ add.Disciplina ? add.Disciplina.nome : "" }}</p>
        </div>
        <div class="row" :style="{ margin: '0' }">
          <label for="selectPreferenciaAdicionarDocentes">Docente: </label>
          <select
            v-model="add.Docente"
            id="selectPreferenciaAdicionarDocentes"
            style="width: 200px"
          >
            <option
              v-for="docente in AllDocentes"
              :key="`adicionarDocente${docente.id}`"
              :value="docente.id"
            >
              {{ docente.apelido }}
            </option>
          </select>
        </div>
        <div class="row" :style="{ display: 'table-cell', verticalAlign: 'middle' }">
          <label for="inputPreferenciaAdicionarDocentes">Preferência: </label>
          <input
            type="text"
            v-model="add.preferencia"
            id="inputPreferenciaAdicionarDocentes"
            :style="{
              width: '25px',
              height: '20px',
              marginLeft: '10px',
              textAlign: 'center',
            }"
          />
        </div>
      </template>
      <template #modal-footer>
        <BaseButton
          type="text"
          color="lightblue"
          @click="addPreferencia()"
          class="ml-auto"
          >Confirmar</BaseButton
        >
      </template>
    </BaseModal>

    <BaseModal
      ref="modalAddDisciplina"
      :title="'Adicionar Preferência'"
      :hasFooter="true"
    >
      <template #modal-body>
        <div class="row" :style="{ margin: '0' }">
          <p>Docente: {{ add.Docente ? add.Docente.apelido : "" }}</p>
        </div>
        <div class="row" :style="{ margin: '0' }">
          <label for="selectPreferenciaAdicionarDisciplinas">Disciplina: </label>
          <select
            v-model="add.Disciplina"
            id="selectPreferenciaAdicionarDisciplinas"
            style="width: 200px"
          >
            <option
              v-for="disciplina in AllDisciplinas"
              :key="`adicionarDisciplina${disciplina.id}`"
              :value="disciplina.id"
            >
              {{ disciplina.codigo }} - {{ disciplina.nome }}
            </option>
          </select>
        </div>
        <div class="row" :style="{ display: 'table-cell', verticalAlign: 'middle' }">
          <label for="inputPreferenciaAdicionarDisciplinas">Preferência: </label>
          <input
            type="text"
            v-model="add.preferencia"
            id="inputPreferenciaAdicionarDisciplinas"
            :style="{
              width: '25px',
              height: '20px',
              marginLeft: '10px',
              textAlign: 'center',
            }"
          />
        </div>
      </template>
      <template #modal-footer>
        <BaseButton
          type="text"
          color="lightblue"
          @click="addPreferencia()"
          class="ml-auto"
          >Confirmar</BaseButton
        >
      </template>
    </BaseModal>

    <BaseModal
      ref="modalUpload"
      :title="'Selecione um arquivo para importar'"
      :hasFooter="true"
    >
      <template #modal-body>
        <input type="file" ref="xlsxPrefs" id="xlsxPrefs" />
      </template>
      <template #modal-footer>
        <BaseButton
          type="text"
          color="lightblue"
          @click="importPrefs"
          class="ml-auto"
          >Importar</BaseButton
        >
      </template>
    </BaseModal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import docenteDisciplinaService from "@/common/services/docenteDisciplina";
import { toggleOrdination, toggleItemInArray } from "@/common/mixins";
import { Card } from "@/components/ui";
import { ModalAjuda, ModalDelete } from "@/components/modals";
import XLSX from "xlsx";
import _ from "lodash";
import { SET_PARTIAL_LOADING } from "../../../vuex/mutation-types";

export default {
  name: "DashboardPreferencias",
  mixins: [toggleOrdination, toggleItemInArray],
  components: { Card, ModalAjuda, ModalDelete },
  data() {
    return {
      file: undefined,
      preferenciaForm: {
        Docente: undefined,
        Disciplina: undefined,
        preferencia: undefined,
      },
      edit: {
        docente: undefined,
        disciplina: undefined,
        isZero: undefined,
      },
      add: {
        Docente: undefined,
        Disciplina: undefined,
        preferencia: undefined,
      },
      error: undefined,
      docentespordisciplina: true,
    };
  },

  methods: {
    ...mapActions(["setPartialLoading"]),

    importPrefs() {
      console.log(this.PreferenciaDosDocentes);
      this.file = this.$refs.xlsxPrefs.files[0];
      let reader = new FileReader();
      let name = this.file.name;
      let docentes = this.AllDocentes;
      let disciplinas = this.AllDisciplinas;
      let preferencias = this.PreferenciaDosDocentes;
      reader.onload = function(e) {
        let data = e.target.result;
        let workbook = XLSX.read(data, { type: "binary" });
        let first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
        let prefs = XLSX.utils.sheet_to_json(first_worksheet);
        let disciplinasFields = _.filter(
          _.split(XLSX.utils.sheet_to_csv(first_worksheet), ","),
          function(p) {
            return p.substring(0, 11) === "Disciplinas";
          }
        );
        let disciplinasCods = [];
        for (let i = 0; i < disciplinasFields.length; i++) {
          let start = disciplinasFields[i].indexOf("[");
          let end = disciplinasFields[i].indexOf("\t");
          let disc = _.find(disciplinas, {
            codigo: disciplinasFields[i].substring(start + 1, end),
          });
          disciplinasCods.push(disc);
          if (!disc) {
            console.log(disciplinasFields[i] + " não existe no sistema");
          }
        }
        for (let i = 0; i < prefs.length; i++) {
          let docente = _.find(docentes, { nome: prefs[i].Nome.toUpperCase() });
          if (docente) {
            for (let j = 0; j < disciplinasFields.length; j++) {
              if (disciplinasCods[j]) {
                let prefdisc = _.find(preferencias, {
                  Docente: docente.id,
                  Disciplina: disciplinasCods[j].id,
                });
                if (
                  prefs[i][disciplinasFields[j]] &&
                  prefs[i][disciplinasFields[j]] != 0
                ) {
                  let prefDiscForm = {
                    Docente: docente.id,
                    Disciplina: disciplinasCods[j].id,
                    preferencia: prefs[i][disciplinasFields[j]],
                  };
                  if (prefdisc) {
                    if (prefdisc.preferencia != prefDiscForm.preferencia) {
                      docenteDisciplinaService.update(
                        prefdisc.Disciplina,
                        prefdisc.Docente,
                        prefDiscForm
                      );
                    }
                  } else {
                    docenteDisciplinaService.create(prefDiscForm);
                  }
                } else {
                  if (prefdisc) {
                    docenteDisciplinaService.delete(
                      prefdisc.Disciplina,
                      prefdisc.Docente
                    );
                  }
                }
              }
            }
          }
        }
      };
      reader.readAsBinaryString(this.file);
      this.$refs.modalUpload.close();
    },

    preferencia(docente, disciplina) {
      let p = this.$_.find(this.PreferenciaDosDocentes, {
        Docente: docente.id,
        Disciplina: disciplina.id,
      });
      if (p) return p.preferencia;
      else return 0;
    },

    openModalEdit(preferencia) {
      this.edit.docente = this.docenteById(preferencia.Docente);
      this.edit.disciplina = this.disciplinaById(preferencia.Disciplina);
      let p = preferencia.preferencia;
      if (p === 0) this.edit.isZero = true;
      else this.edit.isZero = false;
      this.preferenciaForm = {
        Docente: preferencia.Docente,
        Disciplina: preferencia.Disciplina,
        preferencia: p,
      };
      this.$refs.modalEdit.open();
    },

    openModalAddDocente(disciplina) {
      this.add.Disciplina = this.disciplinaById(disciplina);
      this.$refs.modalAddDocente.open();
    },

    openModalAddDisciplina(docente) {
      this.add.Docente = this.docenteById(docente);
      this.$refs.modalAddDisciplina.open();
    },

    handleEditPrefs() {
      if (this.edit.isZero) {
        if (this.preferenciaForm.preferencia != 0) {
          docenteDisciplinaService
            .create(this.preferenciaForm)
            .then(() => {
              this.$notify({
                group: "general",
                title: `Sucesso!`,
                text: `Preferência atualizada com sucesso!`,
                type: "success",
              });
              this.$refs.modalEdit.close();
            })
            .catch((error) => {
              this.error = "<b>Erro ao atualizar Preferência</b>";
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
          this.edit.isZero = false;
        }
      } else {
        if (
          this.preferenciaForm.preferencia !=
          this.preferencia(this.edit.docente, this.edit.disciplina)
        ) {
          if (this.preferenciaForm.preferencia == 0) {
            docenteDisciplinaService
              .delete(this.preferenciaForm.Disciplina, this.preferenciaForm.Docente)
              .then(() => {
                this.$notify({
                  group: "general",
                  title: `Sucesso!`,
                  text: `Preferência atualizada com sucesso!`,
                  type: "success",
                });
                this.$refs.modalEdit.close();
              })
              .catch((error) => {
                this.error = "<b>Erro ao atualizar Preferência</b>";
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
            this.edit.isZero = true;
          } else {
            docenteDisciplinaService
              .update(
                this.preferenciaForm.Disciplina,
                this.preferenciaForm.Docente,
                this.preferenciaForm
              )
              .then(() => {
                this.$notify({
                  group: "general",
                  title: `Sucesso!`,
                  text: `Preferência atualizada com sucesso!`,
                  type: "success",
                });
                this.$refs.modalEdit.close();
              })
              .catch((error) => {
                this.error = "<b>Erro ao atualizar Preferência</b>";
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
          }
        }
      }
    },

    addPreferencia() {
      console.log(this.add)
      if (this.add.Docente && this.add.Disciplina && this.add.preferencia) {
        if (this.add.Docente.id) this.add.Docente = this.add.Docente.id;
        if (this.add.Disciplina.id) this.add.Disciplina = this.add.Disciplina.id;
        console.log(this.add)
        docenteDisciplinaService
          .create(this.add)
          .then(() => {
            this.$notify({
              group: "general",
              title: `Sucesso!`,
              text: `Preferência adicionada com sucesso!`,
              type: "success",
            });
            this.add.Disciplina = undefined;
            this.add.Docente = undefined;
            this.add.preferencia = undefined;
            this.$refs.modalAddDocente.close();
            this.$refs.modalAddDisciplina.close();
          })
          .catch((error) => {
            this.error = "<b>Erro ao atualizar Preferência</b>";
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
            this.add.Disciplina = undefined;
            this.add.Docente = undefined;
            this.add.preferencia = undefined;
            this.$refs.modalAddDocente.close();
            this.$refs.modalAddDisciplina.close();
          });
      }
    },

    openModalUpload() {
      this.$refs.modalUpload.open();
    },

    disciplinaById(disc) {
      return _.find(this.AllDisciplinas, { id: disc });
    },

    docenteById(doce) {
      return _.find(this.AllDocentes, { id: doce });
    },

    perfilById(perfil) {
      return _.find(this.AllPerfis, { id: perfil });
    },

    swapModes() {
      this.docentespordisciplina = !this.docentespordisciplina;
    },
  },

  computed: {
    ...mapGetters([
      "AllDocentes",
      "AllDisciplinas",
      "PreferenciaDosDocentes",
      "AllPerfis",
    ]),

    DocentesPorDisciplinas() {
      let prefs = {};
      this.PreferenciaDosDocentes.forEach((p) => {
        if (prefs[p.Disciplina] === undefined) prefs[p.Disciplina] = [];
        prefs[p.Disciplina].push(p);
      });
      for (var disc in prefs) {
        if (Object.prototype.hasOwnProperty.call(prefs, disc)) {
          prefs[disc] = _.orderBy(
            _.orderBy(prefs[disc], (doce) => {
              return this.docenteById(doce.Docente).apelido;
            }),
            ["preferencia"],
            ["desc"]
          );
        }
      }
      return prefs;
    },

    DisciplinasPorDocentes() {
      let prefs = {};
      this.PreferenciaDosDocentes.forEach((p) => {
        if (prefs[p.Docente] === undefined) prefs[p.Docente] = [];
        prefs[p.Docente].push(p);
      });
      for (var doce in prefs) {
        if (Object.prototype.hasOwnProperty.call(prefs, doce)) {
          prefs[doce] = _.orderBy(
            _.orderBy(prefs[doce], (disc) => {
              return this.disciplinaById(disc.Disciplina).codigo;
            }),
            ["preferencia"],
            ["desc"]
          );
        }
      }
      return prefs;
    },
  },
};
</script>

<style scoped>
.card .input-maior {
  width: 270px;
}
.card .input-medio {
  width: 150px;
}

.td-pref:hover {
  color: #1a79b2;
  text-decoration: underline;
  cursor: pointer;
}
</style>
