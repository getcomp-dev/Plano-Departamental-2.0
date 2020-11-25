<template>
  <div class="main-component">
    <PageHeader :title="'Preferências dos docentes'">
      <BaseButton template="adicionar" @click="toggleAsideModal('newPref')" />
      <BaseButton template="file-upload" @click="toggleAsideModal('upload')" />
      <BaseButton template="swap-modes" @click="toggleTableMode" />
      <BaseButton template="ajuda" @click="toggleAsideModal('ajuda')" />
    </PageHeader>

    <div class="div-table">
      <BaseTable v-show="tableMode === 'disciplina'">
        <template #thead>
          <v-th-ordination
            :currentOrder="ordenacaoDisciplina.disciplinas"
            orderToCheck="codigo"
            width="90"
            align="start"
          >
            Código
          </v-th-ordination>
          <v-th-ordination
            :currentOrder="ordenacaoDisciplina.disciplinas"
            orderToCheck="nome"
            width="420"
            align="start"
          >
            Nome
          </v-th-ordination>
          <v-th-ordination
            width="80"
            :currentOrder="ordenacaoDisciplina.disciplinas"
            orderToCheck="perfil.abreviacao"
          >
            Perfil
          </v-th-ordination>
          <v-th-ordination
            :currentOrder="ordenacaoDisciplina.docentes"
            orderToCheck="docente.apelido"
            width="120"
            align="start"
          >
            Docente
          </v-th-ordination>
          <v-th-ordination
            :currentOrder="ordenacaoDisciplina.pref"
            orderToCheck="preferencia"
            orderType="desc"
            :orderFixed="true"
            width="60"
            title="Preferência"
          >
            Pref.
          </v-th-ordination>
        </template>

        <template #tbody>
          <template v-for="disciplina in DisciplinasInPreferenciasOrdered">
            <tr :key="disciplina.id" class="bg-custom">
              <v-td width="90" align="start">{{ disciplina.codigo }}</v-td>
              <v-td width="420" align="start">{{ disciplina.nome }}</v-td>
              <v-td width="80" paddingX="2">{{ disciplina.perfil.abreviacao }}</v-td>
              <v-td width="120" />
              <v-td
                width="60"
                class="clickable"
                type="content"
                @click="openModalAddPreferencia(disciplina)"
              >
                <font-awesome-icon :icon="['fas', 'plus']" class="icon-darkgray" />
              </v-td>
            </tr>

            <tr
              v-for="preferencia in disciplina.preferencias"
              :key="preferencia.Docente + '-' + preferencia.Disciplina"
            >
              <v-td width="90" />
              <v-td width="420" />
              <v-td width="80" />
              <v-td width="120" align="start" :title="preferencia.docente.nome">
                {{ preferencia.docente.apelido }}
              </v-td>
              <v-td
                width="60"
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
          <v-th-ordination
            :currentOrder="ordenacaoDocentes.docentes"
            orderToCheck="nome"
            width="120"
            align="start"
          >
            Docente
          </v-th-ordination>
          <v-th-ordination
            :currentOrder="ordenacaoDocentes.disciplinas"
            orderToCheck="disciplina.codigo"
            width="90"
          >
            Código
          </v-th-ordination>
          <v-th-ordination
            :currentOrder="ordenacaoDocentes.disciplinas"
            orderToCheck="disciplina.nome"
            width="420"
            align="start"
          >
            Nome
          </v-th-ordination>
          <v-th-ordination
            :currentOrder="ordenacaoDocentes.disciplinas"
            orderToCheck="disciplina.perfil.abreviacao"
            width="80"
          >
            Perfil
          </v-th-ordination>
          <v-th-ordination
            :currentOrder="ordenacaoDocentes.pref"
            orderToCheck="preferencia"
            orderType="desc"
            :orderFixed="true"
            width="60"
            title="Preferência"
          >
            Pref.
          </v-th-ordination>
        </template>

        <template #tbody>
          <template v-for="docente in DocentesInPreferenciasOrdered">
            <tr :key="docente.id" class="bg-custom">
              <v-td width="120" align="start">{{ docente.apelido }}</v-td>
              <v-td width="90" />
              <v-td width="420" />
              <v-td width="80" />
              <v-td
                width="60"
                type="content"
                class="clickable"
                @click="openModalAddPreferencia(docente)"
              >
                <font-awesome-icon :icon="['fas', 'plus']" class="icon-darkgray" />
              </v-td>
            </tr>

            <tr
              v-for="preferencia in docente.preferencias"
              :key="preferencia.Docente + '-' + preferencia.Disciplina"
            >
              <v-td width="120" />
              <v-td width="90">{{ preferencia.disciplina.codigo }}</v-td>
              <v-td width="420" align="start">{{ preferencia.disciplina.nome }}</v-td>
              <v-td width="80">{{ preferencia.disciplina.perfil.abreviacao }}</v-td>
              <v-td
                width="60"
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
          text="Salvar"
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
                  v-for="docente in DocentesAtivos"
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
                  v-for="disciplina in DisciplinasDCCInPerfis"
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
                  v-for="disciplina in DisciplinasDCCInPerfis"
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
                v-for="disciplina in DisciplinasDCCInPerfis"
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
                v-for="disciplina in DisciplinasDCCInPerfis"
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
                v-for="docente in DocentesAtivos"
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
      position="right"
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

    <ModalAjuda ref="modalAjuda">
      <li class="list-group-item">
        <b>Adicionar:</b>
        Clique no ícone de adicionar
        <font-awesome-icon :icon="['fas', 'plus']" class="icon-green" />
        no cabeçalho da página. Em seguida, preencha a janela que se abrirá à direita e
        para finalizar clique no botão Confirmar. Ou para adicionar uma preferência
        diretamente numa linha da tabela clique no icone de adicionar
        <font-awesome-icon :icon="['fas', 'plus']" class="icon-darkgray" />
        na coluna Pref. (preferência) da linha que deseja, preencha a janela que se abrirá
        à direita e para finalizar clique no botão Confirmar.
      </li>
      <li class="list-group-item">
        <b>Editar:</b>
        Clique no numero da coluna Pref. (preferência) na linha que deseja alterar. Em
        seguida, na janela que se abrirá à direita altere as informações que desejar e
        clique em Salvar.
      </li>
      <li class="list-group-item">
        <b>Deletar:</b>
        Basta seguir os passos da edição descrito acima colocando o valor da preferência
        como zero.
      </li>
      <li class="list-group-item">
        <b>Alterar visualizaçao da tabela:</b>
        Clique no ícone de alterar visualizaçao
        <font-awesome-icon :icon="['fas', 'sync-alt']" class="icon-gray" />
        no cabeçalho da página para alterar a visualizaçao das preferencias entre docentes
        por disciplinas, ou disciplinas por docentes.
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
import { mapGetters } from "vuex";
import XLSX from "xlsx";
import docenteDisciplinaService from "@/common/services/docenteDisciplina";
import { ModalAjuda } from "@/components/modals";
import { toggleAsideModal } from "@/common/mixins";

export default {
  name: "PreferenciasDocentes",
  components: { ModalAjuda },
  mixins: [toggleAsideModal],
  data() {
    return {
      asideModalsRefs: [
        "modalAjuda",
        "modalAddPref",
        "modalEditPref",
        "modalNewPref",
        "modalUpload",
      ],
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
      ordenacaoDocentes: {
        docentes: { order: "nome", type: "asc" },
        disciplinas: { order: "disciplina.codigo", type: "asc" },
        pref: { order: "preferencia", type: "desc" },
      },
      ordenacaoDisciplina: {
        disciplinas: { order: "codigo", type: "asc" },
        docentes: { order: "docente.apelido", type: "asc" },
        pref: { order: "preferencia", type: "desc" },
      },
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
    closeAllModals() {
      this.$_.forEach(this.asideModalsRefs, (ref) => {
        this.$refs[ref].close();
      });
    },
    openModalEditPreferencia(preferencia) {
      this.edit.docente = { ...preferencia.docente };
      this.edit.disciplina = { ...preferencia.disciplina };
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
      this.closeAllModals();
      this.$refs.modalEditPref.open();
    },
    openModalAddPreferencia(data) {
      if (this.tableMode === "disciplina") {
        this.add.Disciplina = data;
      } else {
        this.add.Docente = data;
      }

      this.closeAllModals();
      this.$refs.modalAddPref.open();
    },
    findPreferencia(docente, disciplina) {
      let preferenciaFounded = this.$_.find(this.PreferenciasDocentes, {
        Docente: docente.id,
        Disciplina: disciplina.id,
      });

      return preferenciaFounded ? preferenciaFounded.preferencia : 0;
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

      const docentes = this.DocentesAtivos;
      const disciplinas = this.DisciplinasDCCInPerfis;
      const preferencias = this.PreferenciasDocentes;
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
    ...mapGetters(["DocentesAtivos", "DisciplinasDCCInPerfis", "PreferenciasDocentes"]),

    DocentesInPreferenciasOrdered() {
      const disciplinasOrd = this.ordenacaoDocentes.disciplinas;
      const docentesOrd = this.ordenacaoDocentes.docentes;
      const preferenciaOrd = this.ordenacaoDocentes.pref;

      const docentesOrdered = this.$_.map(this.DocentesInPreferencias, (docente) => {
        return {
          ...docente,
          preferencias: this.$_.orderBy(
            docente.preferencias,
            [preferenciaOrd.order, disciplinasOrd.order],
            [preferenciaOrd.type, disciplinasOrd.type]
          ),
        };
      });

      return this.$_.orderBy(docentesOrdered, docentesOrd.order, docentesOrd.type);
    },
    DocentesInPreferencias() {
      const docentesResult = [];

      this.$_.forEach(this.DocentesAtivos, (docente) => {
        const preferenciasDoDocente = this.$_.filter(this.PreferenciasDocentes, [
          "Docente",
          docente.id,
        ]);

        if (preferenciasDoDocente.length)
          docentesResult.push({
            ...preferenciasDoDocente[0].docente,
            preferencias: preferenciasDoDocente,
          });
      });

      return docentesResult;
    },

    DisciplinasInPreferenciasOrdered() {
      const docentesOrd = this.ordenacaoDisciplina.docentes;
      const disciplinasOrd = this.ordenacaoDisciplina.disciplinas;
      const preferenciaOrd = this.ordenacaoDisciplina.pref;

      const disciplinasOrdered = this.$_.map(
        this.DisciplinasInPreferencias,
        (disciplina) => {
          return {
            ...disciplina,
            preferencias: this.$_.orderBy(
              disciplina.preferencias,
              [preferenciaOrd.order, docentesOrd.order],
              [preferenciaOrd.type, docentesOrd.type]
            ),
          };
        }
      );

      return this.$_.orderBy(
        disciplinasOrdered,
        disciplinasOrd.order,
        disciplinasOrd.type
      );
    },
    DisciplinasInPreferencias() {
      const disciplinasResult = [];

      this.$_.forEach(this.DisciplinasDCCInPerfis, (disciplina) => {
        const preferenciasDaDisciplina = this.$_.filter(this.PreferenciasDocentes, [
          "Disciplina",
          disciplina.id,
        ]);

        if (preferenciasDaDisciplina.length)
          disciplinasResult.push({
            ...preferenciasDaDisciplina[0].disciplina,
            preferencias: preferenciasDaDisciplina,
          });
      });

      return disciplinasResult;
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
