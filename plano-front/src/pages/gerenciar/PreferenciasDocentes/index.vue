<template>
  <div class="main-component">
    <PageHeader :title="'Preferências dos docentes'">
      <BaseButton template="adicionar" @click="openModalNewPreferencia" />
      <BaseButton template="file-upload" @click="openModalUpload" />
      <BaseButton template="swap-modes" @click="toggleTableMode" />
      <!-- <BaseButton template="ajuda" /> -->
    </PageHeader>

    <div class="div-table">
      <BaseTable v-show="tableMode === 'disciplina'">
        <template #thead>
          <v-th width="90">Código</v-th>
          <v-th width="420" align="start">Nome</v-th>
          <v-th width="80">Perfil</v-th>
          <v-th width="120" align="start">Docente</v-th>
          <v-th width="50" title="Preferência">Pref.</v-th>
        </template>

        <template #tbody>
          <template v-for="disciplina in DocentesPorDisciplinas">
            <tr :key="disciplina[0].Disciplina" class="bg-custom">
              <v-td width="90">
                {{ findDisciplinaById(disciplina[0].Disciplina).codigo }}
              </v-td>
              <v-td width="420" align="start">
                {{ findDisciplinaById(disciplina[0].Disciplina).nome }}
              </v-td>
              <v-td width="80" paddingX="2">
                {{
                  findPerfilById(findDisciplinaById(disciplina[0].Disciplina).Perfil)
                    .abreviacao
                }}
              </v-td>
              <v-td width="120" />
              <v-td
                width="50"
                class="clickable"
                type="content"
                @click="openModalAddPreferencia(disciplina[0].Disciplina)"
              >
                <font-awesome-icon :icon="['fas', 'plus']" class="icon-darkgray" />
              </v-td>
            </tr>

            <tr
              v-for="preferencia in disciplina"
              :key="preferencia.Disciplina + '-' + preferencia.Docente"
            >
              <v-td width="90" />
              <v-td width="420" />
              <v-td width="80" />
              <v-td width="120" align="start">
                {{ findDocenteById(preferencia.Docente).apelido }}
              </v-td>
              <v-td
                width="50"
                class="td-pref"
                @click="openModalEditPreferencia(preferencia)"
                :title="
                  'Preferência: ' +
                    preferenciaText(preferencia.preferencia) +
                    '\nClique para editar'
                "
              >
                {{ preferencia.preferencia }}
              </v-td>
            </tr>
          </template>
        </template>
      </BaseTable>

      <BaseTable v-show="tableMode === 'docente'">
        <template #thead>
          <v-th width="120" align="start">Docente</v-th>
          <v-th width="90">Código</v-th>
          <v-th width="420" align="start">Nome</v-th>
          <v-th width="80">Perfil</v-th>
          <v-th width="50" title="Preferência">Pref.</v-th>
        </template>

        <template #tbody>
          <template v-for="docente in DisciplinasPorDocentes">
            <tr :key="docente[0].Docente" class="bg-custom">
              <v-td width="120" align="start">
                {{ findDocenteById(docente[0].Docente).apelido }}
              </v-td>
              <v-td width="90" />
              <v-td width="420" />
              <v-td width="80" />
              <v-td
                width="50"
                class="clickable"
                type="content"
                @click="openModalAddPreferencia(docente[0].Docente)"
              >
                <font-awesome-icon :icon="['fas', 'plus']" class="icon-darkgray" />
              </v-td>
            </tr>

            <tr
              v-for="preferencia in docente"
              :key="preferencia.Docente + '-' + preferencia.Disciplina"
            >
              <v-td width="120" />
              <v-td width="90">
                {{ findDisciplinaById(preferencia.Disciplina).codigo }}
              </v-td>
              <v-td width="420" align="start">
                {{ findDisciplinaById(preferencia.Disciplina).nome }}
              </v-td>
              <v-td width="80">
                {{
                  findPerfilById(findDisciplinaById(preferencia.Disciplina).Perfil)
                    .abreviacao
                }}
              </v-td>
              <v-td
                width="50"
                class="td-pref"
                type="content"
                @click="openModalEditPreferencia(preferencia)"
                :title="
                  'Preferência: ' +
                    preferenciaText(preferencia.preferencia) +
                    '\nClique para editar'
                "
              >
                {{ preferencia.preferencia }}
              </v-td>
            </tr>
          </template>
        </template>
      </BaseTable>
    </div>

    <BaseModal
      ref="modalEditPref"
      class="modal-pref"
      :title="'Editar Preferência'"
      :hasFooter="true"
      :position="'right'"
      :styles="{ width: '400px' }"
    >
      <template #modal-body>
        <div class="form-row w-100">
          <span class="w-100 mb-2">
            <b>Docente:</b>
            {{ edit.docente ? edit.docente.nome : "" }}
          </span>
          <span class="w-100">
            <b>Disciplina:</b>
            {{ edit.disciplina ? edit.disciplina.nome : "" }}
          </span>
        </div>

        <div class="form-row w-100">
          <div class="form-group col-6">
            <label for="editPref">Preferência:</label>
            <select
              id="editPref"
              class="form-control"
              v-model="preferenciaForm.preferencia"
            >
              <option v-for="pref in [0, 1, 2, 3]" :key="pref" :value="pref">
                {{ pref }} - {{ preferenciaText(pref) }}
              </option>
            </select>
          </div>
        </div>
      </template>

      <template #modal-footer>
        <BaseButton
          color="lightblue"
          text="Confirmar"
          class="ml-auto"
          @click="handleEditPrefs"
        />
      </template>
    </BaseModal>

    <BaseModal
      ref="modalAddPref"
      class="modal-pref"
      :title="
        tableMode === 'docente'
          ? 'Adicionar preferência ao docente'
          : 'Adicionar preferência à disciplina'
      "
      :hasFooter="true"
      :position="'right'"
      :styles="{ width: '400px' }"
    >
      <template #modal-body>
        <template v-if="tableMode === 'disciplina'">
          <div class="form-row w-100">
            <span class="w-100">
              <b>Disciplina:</b>
              {{ add.Disciplina ? add.Disciplina.nome : "" }}
            </span>
          </div>

          <div class="form-row w-100">
            <div class="form-group col-6 ">
              <label for="addDocente">Docente:</label>
              <select id="addDocente" class="form-control" v-model="add.Docente">
                <option
                  v-for="docente in AllDocentes"
                  :key="docente.id + docente.apelido"
                  :value="docente.id"
                >
                  {{ docente.apelido }}
                </option>
              </select>
            </div>

            <div class="form-group col-6 pl-3">
              <label for="addPref">Preferência:</label>
              <select id="addPref" v-model.number="add.preferencia" class="form-control">
                <option v-for="pref in [0, 1, 2, 3]" :key="pref" :value="pref">
                  {{ pref }} - {{ preferenciaText(pref) }}
                </option>
              </select>
            </div>
          </div>
        </template>

        <template v-else-if="tableMode === 'docente'">
          <div class="form-row w-100">
            <span class="w-100">
              <b>Docente:</b>
              {{ add.Docente ? add.Docente.apelido : "" }}
            </span>
          </div>

          <div class="form-row w-100">
            <div class="form-group col">
              <label for="addDisciplina">Disciplina:</label>
              <select
                id="addDisciplina"
                class="form-control"
                style="width:100%"
                v-model="add.Disciplina"
              >
                <option
                  v-for="disciplina in AllDisciplinas"
                  :key="disciplina.id + disciplina.codigo"
                  :value="disciplina.id"
                >
                  {{ disciplina.nome }}
                </option>
              </select>
            </div>
          </div>

          <div class="form-row w-100">
            <div class="form-group col-6">
              <label for="addDisciplina">Código:</label>
              <select id="addDisciplina" class="form-control" v-model="add.Disciplina">
                <option
                  v-for="disciplina in AllDisciplinas"
                  :key="disciplina.id + disciplina.codigo"
                  :value="disciplina.id"
                >
                  {{ disciplina.codigo }}
                </option>
              </select>
            </div>

            <div class="form-group col-6 pl-3">
              <label for="addPref">Preferência:</label>
              <select id="addPref" v-model.number="add.preferencia" class="form-control">
                <option v-for="pref in [0, 1, 2, 3]" :key="pref" :value="pref">
                  {{ pref }} - {{ preferenciaText(pref) }}
                </option>
              </select>
            </div>
          </div>
        </template>
      </template>

      <template #modal-footer>
        <BaseButton
          color="lightblue"
          text="Confirmar"
          class="ml-auto"
          @click="addPreferencia"
        />
      </template>
    </BaseModal>

    <BaseModal
      ref="modalNewPref"
      class="modal-pref"
      :title="'Nova Preferência'"
      :hasFooter="true"
      :position="'right'"
      :styles="{ width: '400px' }"
    >
      <template #modal-body>
        <div class="form-row w-100">
          <div class="form-group col">
            <label for="newDisciplina">Disciplina:</label>
            <select id="newDisciplina" class="form-control" v-model="add.Disciplina">
              <option
                v-for="disciplina in AllDisciplinas"
                :key="disciplina.id + disciplina.codigo"
                :value="disciplina.id"
              >
                {{ disciplina.nome }}
              </option>
            </select>
          </div>
        </div>

        <div class="form-row w-100">
          <div class="form-group col-6">
            <label for="newCodigo">Código:</label>
            <select id="newCodigo" class="form-control" v-model="add.Disciplina">
              <option
                v-for="disciplina in AllDisciplinas"
                :key="disciplina.id + disciplina.codigo"
                :value="disciplina.id"
              >
                {{ disciplina.codigo }}
              </option>
            </select>
          </div>

          <div class="form-group col-6 pl-3">
            <label for="newDocente">Docente:</label>
            <select id="newDocente" class="form-control" v-model="add.Docente">
              <option
                v-for="docente in AllDocentes"
                :key="docente.id + docente.nome"
                :value="docente.id"
              >
                {{ docente.apelido }}
              </option>
            </select>
          </div>
        </div>

        <div class="form-group col-6">
          <label for="newPref">Preferência:</label>
          <select id="newPref" v-model.number="add.preferencia" class="form-control">
            <option v-for="pref in [0, 1, 2, 3]" :key="pref" :value="pref">
              {{ pref }} - {{ preferenciaText(pref) }}
            </option>
          </select>
        </div>
      </template>

      <template #modal-footer>
        <BaseButton
          color="lightblue"
          class="ml-auto"
          text="Confirmar"
          @click="addPreferencia"
        />
      </template>
    </BaseModal>

    <BaseModal
      ref="modalUpload"
      class="modal-pref"
      :title="'Importar preferências'"
      :hasFooter="true"
      :hasBackground="true"
      :styles="{ width: '400px' }"
    >
      <template #modal-body>
        <input type="file" ref="xlsxPrefs" id="xlsxPrefs" />
      </template>

      <template #modal-footer>
        <BaseButton
          color="lightblue"
          class="ml-auto"
          text="Importar"
          @click="importPrefs"
        />
      </template>
    </BaseModal>
  </div>
</template>

<script>
import XLSX from "xlsx";
import docenteDisciplinaService from "@/common/services/docenteDisciplina";
import { mapGetters } from "vuex";
import { ModalAjuda } from "@/components/modals";

export default {
  name: "PreferenciasDocentes",
  components: { ModalAjuda },
  data() {
    return {
      file: null,
      preferenciaForm: {
        Docente: null,
        Disciplina: null,
        preferencia: null,
      },
      edit: {
        docente: null,
        disciplina: null,
        isZero: null,
      },
      add: {
        Docente: null,
        Disciplina: null,
        preferencia: 0,
      },
      error: null,
      tableMode: "docente",
    };
  },

  methods: {
    preferenciaText(preferencia) {
      switch (preferencia) {
        case 0:
          return "Inapto";
        case 1:
          return "Emergência";
        case 2:
          return "Confortável";
        case 3:
          return "Interesse";
        default:
          break;
      }
    },
    toggleTableMode() {
      if (this.tableMode === "docente") this.tableMode = "disciplina";
      else this.tableMode = "docente";

      this.$refs.modalNewPref.close();
      this.$refs.modalAddPref.close();
      this.$refs.modalEditPref.close();
    },
    openModalEditPreferencia(preferencia) {
      this.edit.docente = this.findDocenteById(preferencia.Docente);
      this.edit.disciplina = this.findDisciplinaById(preferencia.Disciplina);
      let p = preferencia.preferencia;

      if (p === 0) {
        this.edit.isZero = true;
      } else {
        this.edit.isZero = false;
      }

      this.preferenciaForm = {
        Docente: preferencia.Docente,
        Disciplina: preferencia.Disciplina,
        preferencia: p,
      };
      this.$refs.modalNewPref.close();
      this.$refs.modalAddPref.close();
      this.$refs.modalEditPref.open();
    },
    openModalAddPreferencia(newValue) {
      if (this.tableMode === "disciplina") {
        this.add.Disciplina = this.findDisciplinaById(newValue);
      } else {
        this.add.Docente = this.findDocenteById(newValue);
      }

      this.$refs.modalNewPref.close();
      this.$refs.modalEditPref.close();
      this.$refs.modalAddPref.open();
    },
    openModalNewPreferencia() {
      this.$refs.modalAddPref.close();
      this.$refs.modalEditPref.close();
      this.$refs.modalNewPref.open();
    },
    openModalUpload() {
      this.$refs.modalUpload.open();
    },

    findPreferencia(docente, disciplina) {
      let preferenciaFounded = this.$_.find(this.PreferenciaDosDocentes, {
        Docente: docente.id,
        Disciplina: disciplina.id,
      });

      return preferenciaFounded ? preferenciaFounded.preferencia : 0;
    },
    findDisciplinaById(disc) {
      return this.$_.find(this.AllDisciplinas, { id: disc });
    },
    findDocenteById(doce) {
      return this.$_.find(this.AllDocentes, { id: doce });
    },
    findPerfilById(perfil) {
      return this.$_.find(this.AllPerfis, { id: perfil });
    },

    addPreferencia() {
      if (this.add.Docente && this.add.Disciplina && this.add.preferencia) {
        if (this.add.Docente.id) this.add.Docente = this.add.Docente.id;
        if (this.add.Disciplina.id) this.add.Disciplina = this.add.Disciplina.id;

        docenteDisciplinaService
          .create(this.add)
          .then(() => {
            this.pushNotification({
              type: "success",
              text: `Preferência adicionada com sucesso!`,
            });

            this.add.Disciplina = null;
            this.add.Docente = null;
            this.add.preferencia = 0;
          })
          .catch(() => {
            this.pushNotification({
              type: "error",
              title: "Erro ao adicionar preferência!",
              text: "Verifique se a preferência já não existe",
            });
          });
      }
    },
    handleEditPrefs() {
      if (this.edit.isZero) {
        if (this.preferenciaForm.preferencia != 0) {
          docenteDisciplinaService
            .create(this.preferenciaForm)
            .then(() => {
              this.pushNotification({
                type: "success",
                text: `Preferência atualizada com sucesso!`,
              });
            })
            .catch((error) => {
              this.error = "<b>Erro ao atualizar Preferência</b>";
              if (error.response.data.fullMessage) {
                this.error +=
                  "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");
              }
              this.pushNotification({
                type: "error",
                text: this.error,
              });
            });
          this.edit.isZero = false;
        }
      } else {
        if (
          this.preferenciaForm.preferencia !=
          this.findPreferencia(this.edit.docente, this.edit.disciplina)
        ) {
          if (this.preferenciaForm.preferencia == 0) {
            docenteDisciplinaService
              .delete(this.preferenciaForm.Disciplina, this.preferenciaForm.Docente)
              .then(() => {
                this.pushNotification({
                  type: "success",
                  text: "Preferência atualizada com sucesso!",
                });
              })
              .catch((error) => {
                this.error = "<b>Erro ao atualizar Preferência</b>";
                if (error.response.data.fullMessage) {
                  this.error +=
                    "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");
                }
                this.pushNotification({
                  type: "error",
                  text: this.error,
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
                this.pushNotification({
                  type: "success",
                  text: `Preferência atualizada com sucesso!`,
                });
              })
              .catch((error) => {
                this.error = "<b>Erro ao atualizar Preferência</b>";
                if (error.response.data.fullMessage) {
                  this.error +=
                    "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");
                }
                this.pushNotification({
                  type: "error",
                  text: this.error,
                });
              });
          }
        }
      }
    },
    importPrefs() {
      this.file = this.$refs.xlsxPrefs.files[0];
      const reader = new FileReader();

      const docentes = this.AllDocentes;
      const disciplinas = this.AllDisciplinas;
      const preferencias = this.PreferenciaDosDocentes;
      reader.onload = function(e) {
        const workbook = XLSX.read(e.target.result, { type: "binary" });
        let first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
        let prefs = XLSX.utils.sheet_to_json(first_worksheet);
        let disciplinasFields = this.$_.filter(
          this.$_.split(XLSX.utils.sheet_to_csv(first_worksheet), ","),
          function(p) {
            return p.substring(0, 11) === "Disciplinas";
          }
        );
        let disciplinasCods = [];
        for (let i = 0; i < disciplinasFields.length; i++) {
          let start = disciplinasFields[i].indexOf("[");
          let end = disciplinasFields[i].indexOf("\t");
          let disc = this.$_.find(disciplinas, {
            codigo: disciplinasFields[i].substring(start + 1, end),
          });
          disciplinasCods.push(disc);
          if (!disc) {
            console.log(disciplinasFields[i] + " não existe no sistema");
          }
        }
        for (let i = 0; i < prefs.length; i++) {
          let docente = this.$_.find(docentes, {
            nome: prefs[i].Nome.toUpperCase(),
          });
          if (docente) {
            for (let j = 0; j < disciplinasFields.length; j++) {
              if (disciplinasCods[j]) {
                let prefdisc = this.$_.find(preferencias, {
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
      let preferencias = this.$_.orderBy(this.PreferenciaDosDocentes, (p) => {
        return this.findDisciplinaById(p.Disciplina).codigo;
      });
      preferencias.forEach((p) => {
        let codigo = this.findDisciplinaById(p.Disciplina).codigo;
        if (prefs[codigo] === undefined) prefs[codigo] = [];
        prefs[codigo].push(p);
      });
      for (var disc in prefs) {
        if (Object.prototype.hasOwnProperty.call(prefs, disc)) {
          prefs[disc] = this.$_.orderBy(
            this.$_.orderBy(prefs[disc], (doce) => {
              return this.findDocenteById(doce.Docente).apelido;
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
      let preferencias = this.$_.orderBy(this.PreferenciaDosDocentes, (p) => {
        return this.findDocenteById(p.Docente).apelido;
      });
      preferencias.forEach((p) => {
        let apelido = this.findDocenteById(p.Docente).apelido;
        if (prefs[apelido] === undefined) prefs[apelido] = [];
        prefs[apelido].push(p);
      });
      for (var doce in prefs) {
        if (Object.prototype.hasOwnProperty.call(prefs, doce)) {
          prefs[doce] = this.$_.orderBy(
            this.$_.orderBy(prefs[doce], (disc) => {
              return this.findDisciplinaById(disc.Disciplina).codigo;
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
.td-pref:hover {
  color: #1a79b2;
  text-decoration: underline;
  cursor: pointer;
}

.modal-pref {
  font-size: 14px;
}
.modal-pref span {
  text-align: start;
}
.modal-pref .form-control {
  width: 100%;
  height: 28px;
  font-size: 12px;
  padding: 0 5px;
  text-align: start;
}
.modal-pref .form-row {
  margin: 0;
  padding: 0;
  margin-bottom: 0.75rem;
}
.modal-pref .form-group {
  margin: 0;
  padding: 0;
}
.modal-pref label {
  font-weight: bold;
}
</style>
