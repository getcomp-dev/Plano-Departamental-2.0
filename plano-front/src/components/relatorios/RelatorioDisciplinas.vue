<template>
  <div class="DashboardRelatorioDisciplinas row pr-2">
    <!-- Titulo -->
    <div
      class="div-titulo col-12 d-flex center-content-between flex-wrap flex-md-nowrap p-0 mb-0"
      style="height: 38px;"
    >
      <div class="form-inline col-12 pl-0 mb-1 pr-1">
        <h1 class="titulo col-8 col-sm-6 col-md-4 col-lg-4 px-0 pr-1">
          Plano Departamental
        </h1>

        <div
          class="form-group col-4 col-sm-6 col-md-8 col-lg-8 mb-0 p-0"
          style="justify-content: flex-end !important;"
        >
          <b-button
            v-b-modal.modalFiltros
            title="Filtros"
            class="cancelbtn btn-title btn-custom"
          >
            <i class="fas fa-list-ul"></i>
          </b-button>

          <div class="d-flex">
            <b-button
              v-b-modal.modalRelatorio
              type="button"
              class="relatbtn btn-title btn-custom"
              title="Relatório"
            >
              <i class="far fa-file-alt"></i>
            </b-button>

            <b-button
              v-b-modal.modalAjuda
              title="Ajuda"
              class="relatbtn btn-title btn-custom"
            >
              <i class="fas fa-question"></i>
            </b-button>
          </div>
        </div>
      </div>
    </div>

    <div class="w-100 mb-2 border-bottom"></div>

    <div class="divTable p-0" ref="carga">
      <table class="main-table table table-bordered table-hover table-sm">
        <thead class="thead-light">
          <tr class="sticky">
            <div style="font-size: 11px !important;" class="max-content">
              <th scope="col">
                <p
                  class="p-header clickable"
                  style="width: 80px;"
                  @click="toggleOrdDiscip('codigo')"
                  title="Clique para ordenar por código"
                >
                  Cód.
                  <i
                    style="font-size: 0.6rem; text-align: right;"
                    :class="
                      ordemDiscip.order == 'codigo'
                        ? ordemDiscip.type == 'asc'
                          ? 'fas fa-arrow-down fa-sm'
                          : 'fas fa-arrow-up fa-sm'
                        : 'fas fa-arrow-down fa-sm low-opacity'
                    "
                  ></i>
                </p>
              </th>
              <th scope="col">
                <p
                  class="p-header clickable"
                  style="width: 350px;"
                  @click="toggleOrdDiscip('nome')"
                  title="Clique para ordenar por nome"
                >
                  Nome
                  <i
                    style="font-size: 0.6rem; text-align: right;"
                    :class="
                      ordemDiscip.order == 'nome'
                        ? ordemDiscip.type == 'asc'
                          ? 'fas fa-arrow-down fa-sm'
                          : 'fas fa-arrow-up fa-sm'
                        : 'fas fa-arrow-down fa-sm low-opacity'
                    "
                  ></i>
                </p>
              </th>

              <th scope="col">
                <p
                  class="p-header clickable"
                  style="width: 65px;"
                  @click="toggleOrdDiscip('perfil')"
                  title="Clique para ordenar por nome"
                >
                  Perfil
                  <i
                    style="font-size: 0.6rem; text-align: right;"
                    :class="
                      ordemDiscip.order == 'perfil'
                        ? ordemDiscip.type == 'asc'
                          ? 'fas fa-arrow-down fa-sm'
                          : 'fas fa-arrow-up fa-sm'
                        : 'fas fa-arrow-down fa-sm low-opacity'
                    "
                  ></i>
                </p>
              </th>
              <th scope="col">
                <p class="p-header" style="width: 24px;">S.</p>
              </th>
              <th scope="col">
                <p class="p-header" style="width: 24px;">T.</p>
              </th>
              <th scope="col">
                <p class="p-header" style="width: 200px;">Docentes</p>
              </th>
              <th scope="col">
                <p class="p-header" style="width: 180px;">Horário</p>
              </th>

              <th
                scope="col"
                v-if="semestreAtual === 1"
                title="Vagas do 1º semestre"
              >
                <p class="p-header" style="width: 50px;">Vagas</p>
              </th>
              <th
                scope="col"
                v-if="semestreAtual === 2"
                title="Vagas do 2º semestre"
              >
                <p class="p-header" style="width: 50px;">Vagas</p>
              </th>
              <th
                scope="col"
                v-if="semestreAtual === 3"
                title="Vagas do 1º e 2º semestre"
              >
                <p class="p-header" style="width: 50px;">Vagas</p>
              </th>
            </div>
          </tr>
        </thead>
        <tbody>
          <template v-for="disciplina in Disciplinas_Main_Table">
            <template v-if="turmas(disciplina, semestreAtual).length > 0">
              <tr class="disciplina-tr" :key="disciplina.codigo">
                <div class="max-content">
                  <td>
                    <p style="width: 80px;">{{ disciplina.codigo }}</p>
                  </td>
                  <td>
                    <p style="width: 350px;">{{ disciplina.nome }}</p>
                  </td>
                  <td>
                    <p style="width: 65px;">{{ perfil(disciplina) }}</p>
                  </td>
                  <td>
                    <p style="width: 24px;"></p>
                  </td>
                  <td>
                    <p style="width: 24px;"></p>
                  </td>
                  <td>
                    <p style="width: 200px;"></p>
                  </td>
                  <td>
                    <p style="width: 180px;"></p>
                  </td>
                  <td v-if="semestreAtual == 1">
                    <p style="width: 50px;">
                      {{ vagasDisciplina(disciplina, 1) }}
                    </p>
                  </td>
                  <td v-if="semestreAtual == 2">
                    <p style="width: 50px;">
                      {{ vagasDisciplina(disciplina, 2) }}
                    </p>
                  </td>
                  <td v-if="semestreAtual == 3">
                    <p style="width: 50px;">
                      {{
                        vagasDisciplina(disciplina, 2) +
                          vagasDisciplina(disciplina, 1)
                      }}
                    </p>
                  </td>
                </div>
              </tr>
            </template>

            <template v-for="turma in turmas(disciplina, semestreAtual)">
              <tr :key="'turma-id:' + turma.id">
                <template>
                  <div class="linhas max-content">
                    <td>
                      <p style="width: 80px;"></p>
                    </td>
                    <td>
                      <p style="width: 350px;"></p>
                    </td>
                    <td>
                      <p style="width: 65px;"></p>
                    </td>
                    <td>
                      <p style="width: 24px;">{{ turma.periodo }}</p>
                    </td>
                    <td>
                      <p style="width: 24px;">{{ turma.letra }}</p>
                    </td>
                    <td>
                      <p style="width: 200px;">{{ docentes(turma) }}</p>
                    </td>

                    <td>
                      <div style="width: 180px;">
                        <template v-for="horario in Horarios">
                          <p
                            :key="horario.id"
                            v-if="horario.id === turma.Horario1"
                          >
                            {{ horario.horario }}
                            <template v-for="horario in Horarios">
                              <span
                                :key="horario.id"
                                v-if="horario.id === turma.Horario2"
                                >/ {{ horario.horario }}</span
                              >
                            </template>
                          </p>
                        </template>
                      </div>
                    </td>
                    <td
                      v-if="semestreAtual == 1"
                      v-on:click="selecionaTurma(turma)"
                      class="clickable"
                    >
                      <p
                        v-if="turma.periodo == 1 || turma.periodo == 2"
                        style="width: 50px;"
                        class="p-vagas"
                      >
                        {{ vagasTurma(turma, 1) }}
                      </p>
                    </td>
                    <td
                      v-if="semestreAtual == 2"
                      v-on:click="selecionaTurma(turma)"
                      class="clickable"
                    >
                      <p
                        v-if="turma.periodo == 3 || turma.periodo == 4"
                        style="width: 50px;"
                        class="p-vagas"
                      >
                        {{ vagasTurma(turma, 2) }}
                      </p>
                    </td>
                    <td
                      v-if="semestreAtual == 3"
                      v-on:click="selecionaTurma(turma)"
                      class="clickable"
                    >
                      <p
                        v-if="turma.periodo == 1 || turma.periodo == 2"
                        style="width: 50px;"
                        class="p-vagas"
                      >
                        {{ vagasTurma(turma, 1) }}
                      </p>
                      <p v-else style="width: 50px;" class="p-vagas">
                        {{ vagasTurma(turma, 2) }}
                      </p>
                    </td>
                  </div>
                </template>
              </tr>
            </template>
          </template>
        </tbody>
      </table>
    </div>

    <!-- MODAL DE AJUDA -->
    <b-modal
      class="modal-ajuda"
      id="modalAjuda"
      ref="ajudaModal"
      scrollable
      title="Ajuda"
    >
      <div class="modal-body">
        <ul class="listas list-group">
          <li class="list-group-item">
            <strong class="ajuda-strong"
              >Para exibir conteúdo na Tabela:</strong
            >
            Clique em Disciplinas
            <i
              class="fas fa-list-ul cancelbtn px-1"
              style="font-size: 12px;"
            ></i>
            e selecione a(s) disciplina(s) que deseja ver, em seguida confirme
            em OK. Caso queira ver todas basta clicar em Selecionar Todos.
          </li>
          <li class="list-group-item">
            <strong class="ajuda-strong">Para gerar relatório:</strong> Clique
            no botão Relatório
            <i
              class="far fa-file-alt relatbtn px-1"
              style="font-size: 12px;"
            ></i>
            e selecione se deseja o relatório completo, com todas as
            disciplinas, ou apenas o relatório parcial, com as disciplinas
            selecionadas.
          </li>
          <li class="list-group-item">
            <strong class="ajuda-strong">Para alterar ordenação:</strong> Clique
            em Cod. no cabeçalho da tabela para ordenar por código, ou em Nome
            para ordenar por ordem alfabética, ou em Perfil para ordenar por
            perfil.
          </li>
          <li class="list-group-item">
            <strong class="ajuda-strong"
              >Para visualizar divisões de vagas:</strong
            >
            Clique no número de vagas de uma turma para visualizar a alocação
            das vagas por cursos.
          </li>
        </ul>
      </div>

      <div slot="modal-footer" style="display: none;"></div>
    </b-modal>
    <!-- Modals FILTROS -->
    <b-modal
      id="modalFiltros"
      ref="modalFiltros"
      scrollable
      size="md"
      title="Filtros"
    >
      <div class="p-0 m-0" style="height: 30px; width: 465px;">
        <ul
          class="nav nav-tabs card-header-tabs m-0"
          style="font-size: 11px !important; height: 30px;"
        >
          <li class="nav-item" @click="changeTab('perfis')">
            <a
              class="nav-link border border-right-0"
              :class="{
                active: nav_ativo === 'perfis',
              }"
              >Perfis</a
            >
          </li>
          <li class="nav-item" @click="changeTab('disciplinas')">
            <a
              class="nav-link border border-right-0"
              :class="{
                active: nav_ativo === 'disciplinas',
              }"
              >Disciplinas</a
            >
          </li>
          <li class="nav-item" @click="changeTab('semestre')">
            <a
              class="nav-link border"
              :class="{
                active: nav_ativo === 'semestre',
              }"
              >Semestre</a
            >
          </li>
        </ul>
      </div>

      <div class="col m-0 p-0 max-content" style="height: 450px !important;">
        <table class="table table-sm modal-table table-bordered">
          <thead class="thead-light">
            <!-- search bar disciplinas -->
            <tr class="sticky" v-if="nav_ativo === 'disciplinas'">
              <div style="font-size: 11px !important;" class="max-content">
                <th>
                  <div class="m-0 input-group input-group-search">
                    <input
                      type="text"
                      class="form-control"
                      style="border-right: none;"
                      placeholder="Pesquise nome ou codigo de uma disciplina..."
                      v-model="searchDisciplinas"
                    />
                    <div
                      class="input-group-append"
                      @click="searchDisciplinas = null"
                    >
                      <span
                        class="input-group-text search-text"
                        style="height: 25px; font-size: 18px; cursor: pointer;"
                        >&times;</span
                      >
                    </div>
                  </div>
                </th>
              </div>
            </tr>
            <!-- perfis -->
            <tr v-if="nav_ativo === 'perfis'" class="sticky">
              <div class="max-content">
                <th>
                  <p style="width: 25px;" class="p-header"></p>
                </th>
                <th>
                  <p
                    class="p-header clickable"
                    style="width: 435px; text-align: start;"
                    @click="toggleOrdPerfis()"
                  >
                    Nome
                    <i
                      style="font-size: 0.6rem; text-align: right;"
                      :class="
                        ordemPerfis.type == 'asc'
                          ? 'fas fa-arrow-down fa-sm'
                          : 'fas fa-arrow-up fa-sm'
                      "
                    ></i>
                  </p>
                </th>
              </div>
            </tr>
            <!-- disciplinas -->
            <tr v-else-if="nav_ativo === 'disciplinas'" class="sticky2">
              <div class="max-content">
                <th>
                  <p
                    style="width: 25px; text-align: center;"
                    class="p-header"
                  ></p>
                </th>
                <th>
                  <p
                    class="p-header clickable"
                    style="width: 70px; text-align: start;"
                    @click="toggleOrdDiscip('codigo')"
                    title="Clique para ordenar por código"
                  >
                    Cód.
                    <i
                      style="font-size: 0.6rem; text-align: right;"
                      :class="
                        ordemDiscip.order == 'codigo'
                          ? ordemDiscip.type == 'asc'
                            ? 'fas fa-arrow-down fa-sm'
                            : 'fas fa-arrow-up fa-sm'
                          : 'fas fa-arrow-down fa-sm low-opacity'
                      "
                    ></i>
                  </p>
                </th>
                <th>
                  <p
                    class="p-header clickable"
                    style="width: 280px; text-align: start;"
                    @click="toggleOrdDiscip('nome')"
                    title="Clique para ordenar por nome"
                  >
                    Nome
                    <i
                      style="font-size: 0.6rem; text-align: right;"
                      :class="
                        ordemDiscip.order == 'nome'
                          ? ordemDiscip.type == 'asc'
                            ? 'fas fa-arrow-down fa-sm'
                            : 'fas fa-arrow-up fa-sm'
                          : 'fas fa-arrow-down fa-sm low-opacity'
                      "
                    ></i>
                  </p>
                </th>
                <th>
                  <p
                    class="p-header clickable"
                    style="width: 85px; text-align: start;"
                    @click="toggleOrdDiscip('perfil')"
                    title="Clique para ordenar por nome"
                  >
                    Perfil
                    <i
                      style="font-size: 0.6rem; text-align: right;"
                      :class="
                        ordemDiscip.order == 'perfil'
                          ? ordemDiscip.type == 'asc'
                            ? 'fas fa-arrow-down fa-sm'
                            : 'fas fa-arrow-up fa-sm'
                          : 'fas fa-arrow-down fa-sm low-opacity'
                      "
                    ></i>
                  </p>
                </th>
              </div>
            </tr>
            <!-- semestre -->
            <tr v-else class="sticky">
              <div class="max-content">
                <th>
                  <p style="width: 25px;" class="p-header"></p>
                </th>
                <th>
                  <p class="p-header" style="width: 435px; text-align: start;">
                    Semestre Letivo
                  </p>
                </th>
              </div>
            </tr>
          </thead>
          <tbody v-if="nav_ativo === 'perfis'">
            <tr v-for="perfil in Perfis_Modal" :key="'perfil-id' + perfil.id">
              <div class="max-content">
                <td>
                  <div style="width: 25px; height: inherit;" class="px-1">
                    <input
                      type="checkbox"
                      v-model="PerfisAtivados"
                      :value="perfil"
                      class="form-check-input position-static m-0"
                    />
                  </div>
                </td>
                <td>
                  <p style="width: 435px; text-align: start;">
                    {{ perfil.nome }}
                  </p>
                </td>
              </div>
            </tr>
          </tbody>
          <tbody v-else-if="nav_ativo === 'disciplinas'">
            <tr
              v-for="disciplina in Disciplinas_Filtred"
              :key="'disciplina' + disciplina.id"
              value="disciplina.id"
            >
              <div class="max-content">
                <td>
                  <div style="width: 25px; height: inherit;" class="px-1">
                    <input
                      type="checkbox"
                      class="form-check-input position-static m-0"
                      v-model="DisciplinasSelecionados"
                      :value="disciplina"
                    />
                  </div>
                </td>
                <td>
                  <p style="width: 70px; text-align: start;">
                    {{ disciplina.codigo }}
                  </p>
                </td>
                <td>
                  <p style="width: 280px; text-align: start;">
                    {{ disciplina.nome }}
                  </p>
                </td>
                <td>
                  <p style="width: 85px; text-align: start;">
                    {{ perfil(disciplina) }}
                  </p>
                </td>
              </div>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <div style="width: max-content;">
                <td>
                  <div style="width: 25px; height: inherit;" class="px-1">
                    <input
                      type="checkbox"
                      class="form-check-input position-static m-0"
                      v-model="semestre_1Ativo"
                    />
                  </div>
                </td>
                <td>
                  <p style="width: 435px; text-align: start;">PRIMEIRO</p>
                </td>
              </div>
            </tr>
            <tr>
              <div style="width: max-content;">
                <td>
                  <div style="width: 25px; height: inherit;" class="px-1">
                    <input
                      type="checkbox"
                      class="form-check-input position-static m-0"
                      v-model="semestre_2Ativo"
                    />
                  </div>
                </td>
                <td>
                  <p style="width: 435px; text-align: start;">SEGUNDO</p>
                </td>
              </div>
            </tr>
          </tbody>
        </table>
      </div>

      <div slot="modal-footer" class="w-100 m-0 p-0 d-flex">
        <div class="w-100">
          <template v-if="nav_ativo == 'disciplinas'">
            <b-button
              class="btn-azul btn-modal btn-custom"
              variant="success"
              @click="selectAllDisciplinas()"
              >Selecionar Todos</b-button
            >
            <b-button
              class="btn-cinza btn-modal btn-custom"
              variant="secondary"
              @click="selectNoneDisciplinas()"
              >Desmarcar Todos</b-button
            >
          </template>
          <template v-else-if="nav_ativo == 'perfis'">
            <b-button
              class="btn-azul btn-modal btn-custom"
              variant="success"
              @click="selectAllPerfis()"
              >Selecionar Todos</b-button
            >
            <b-button
              class="btn-cinza btn-modal btn-custom"
              variant="secondary"
              @click="selectNonePerfis()"
              >Desmarcar Todos</b-button
            >
          </template>
          <template v-else>
            <b-button
              class="btn-azul btn-modal btn-custom"
              variant="success"
              @click="selectAllSemestre()"
              >Selecionar Todos</b-button
            >
            <b-button
              class="btn-cinza btn-modal btn-custom"
              variant="secondary"
              @click="selectNoneSemestre()"
              >Desmarcar Todos</b-button
            >
          </template>
        </div>
        <b-button
          variant="success"
          @click="btnOK()"
          class="btn-verde btn-modal btn-custom"
          style="padding-right: 15px !important; padding-left: 15px !important;"
          >OK</b-button
        >
      </div>
    </b-modal>

    <!-- Modals para ver divisões de vagas por curso -->
    <b-modal
      size="md"
      id="modalVagas"
      class="modalVagas modal-vagas"
      ref="VagasModal"
      scrollable
    >
      <div slot="modal-header" class="row w-100 m-0 p-0">
        <div class="col-11 form-group p-0">
          <div class="form-row p-0 m-0">
            <h6 class="p-0 m-0 mr-4 col-12">
              {{
                turmaSelecionada !== undefined
                  ? disciplina(turmaSelecionada).codigo +
                    " - " +
                    disciplina(turmaSelecionada).nome
                  : "Nenhuma Turma Selecionada"
              }}
            </h6>
          </div>
          <div class="d-flex col-12 p-0 mt-2" style="margin-bottom: -15px;">
            <label for="selectTurma" class="mr-2">Turma: </label>
            <select
              id="selectTurma"
              class="form-control"
              style="width: 50px !important;"
              v-model="turmaSelecionada"
            >
              <option
                v-for="turma in turmaSelecionada !== undefined
                  ? turmas(
                      disciplina(turmaSelecionada),
                      turmaSelecionada.periodo === 1 ||
                        turmaSelecionada.periodo === 2
                        ? 1
                        : 2
                    )
                  : []"
                :key="'selectModalVagas' + turma.id"
                :value="turma"
                >{{ turma.letra }}</option
              >
            </select>
          </div>
        </div>

        <div class="col-1 m-0 p-0">
          <button
            type="button"
            class="close float-right"
            style="padding-bottom: 4px;"
            v-on:click="closeModalVagas()"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>

      <div class="col m-0 p-0 max-content">
        <!-- Table vagas -->
        <table
          class="table table-sm modal-table table-bordered"
          style="max-height: 450px !important;"
        >
          <thead class="thead-light ">
            <tr class="sticky">
              <div style="font-size: 11px !important;" class=" max-content">
                <th>
                  <p
                    class="p-header clickable"
                    style="width: 50px; text-align: start;"
                    v-on:click="toggleOrdVagas('codigo')"
                    title="Clique para ordenar por código"
                  >
                    Cód.
                    <i
                      :class="
                        ordemVagas.order === 'codigo'
                          ? ordemVagas.type == 'asc'
                            ? 'fas fa-arrow-down fa-sm'
                            : 'fas fa-arrow-up fa-sm'
                          : 'fas fa-arrow-down fa-sm low-opacity'
                      "
                      style="font-size: 0.6rem; text-align: right;"
                    ></i>
                  </p>
                </th>
                <th>
                  <p
                    class="p-header clickable"
                    style="width: 250px; text-align: start;"
                    v-on:click="toggleOrdVagas('nome')"
                    title="Clique para ordenar por nome"
                  >
                    Nome
                    <i
                      :class="
                        ordemVagas.order === 'nome'
                          ? ordemVagas.type == 'asc'
                            ? 'fas fa-arrow-down fa-sm'
                            : 'fas fa-arrow-up fa-sm'
                          : 'fas fa-arrow-down fa-sm low-opacity'
                      "
                      style="font-size: 0.6rem; text-align: right;"
                    ></i>
                  </p>
                </th>

                <th>
                  <p
                    class="p-header clickable"
                    style="width: 55px; text-align: start;"
                    v-on:click="toggleOrdVagas('vagasPeriodizadas')"
                    title="Clique para ordenar por vagas da grade"
                  >
                    Grade
                    <i
                      :class="
                        ordemVagas.order === 'vagasPeriodizadas'
                          ? ordemVagas.type == 'asc'
                            ? 'fas fa-arrow-down fa-sm'
                            : 'fas fa-arrow-up fa-sm'
                          : 'fas fa-arrow-down fa-sm low-opacity'
                      "
                      style="font-size: 0.6rem; text-align: right;"
                    ></i>
                  </p>
                </th>
                <th>
                  <p
                    class="p-header clickable"
                    style="width: 55px; text-align: start;"
                    v-on:click="toggleOrdVagas('vagasNaoPeriodizadas')"
                    title="Clique para ordenar por vagas extras"
                  >
                    Extra
                    <i
                      :class="
                        ordemVagas.order === 'vagasNaoPeriodizadas'
                          ? ordemVagas.type == 'asc'
                            ? 'fas fa-arrow-down fa-sm'
                            : 'fas fa-arrow-up fa-sm'
                          : 'fas fa-arrow-down fa-sm low-opacity'
                      "
                      style="font-size: 0.6rem; text-align: right;"
                    ></i>
                  </p>
                </th>
                <th>
                  <p
                    class="p-header clickable"
                    style="width: 50px; text-align: start;"
                    v-on:click="toggleOrdVagas('vagasTotais')"
                    title="Clique para ordenar por vagas extras"
                  >
                    Total
                    <i
                      :class="
                        ordemVagas.order === 'vagasTotais'
                          ? ordemVagas.type == 'asc'
                            ? 'fas fa-arrow-down fa-sm'
                            : 'fas fa-arrow-up fa-sm'
                          : 'fas fa-arrow-down fa-sm low-opacity'
                      "
                      style="font-size: 0.6rem; text-align: right;"
                    ></i>
                  </p>
                </th>
              </div>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="p in VagasTurmaSelecionada"
              :key="'vaga' + p.Curso + '-' + p.Turma"
            >
              <div style="width: max-content !important;">
                <td>
                  <p style="width: 50px; text-align: start;">
                    {{ curso(p).codigo }}
                  </p>
                </td>
                <td>
                  <p style="width: 250px; text-align: start;">
                    {{ curso(p).nome }}
                  </p>
                </td>
                <td>
                  <p style="width: 55px; text-align: start;">
                    {{ p.vagasPeriodizadas }}
                  </p>
                </td>
                <td>
                  <p style="width: 55px; text-align: start;">
                    {{ p.vagasNaoPeriodizadas }}
                  </p>
                </td>
                <td>
                  <p style="width: 50px; text-align: start;">
                    {{ p.vagasPeriodizadas + p.vagasNaoPeriodizadas }}
                  </p>
                </td>
              </div>
            </tr>
          </tbody>
        </table>
      </div>
      <div slot="modal-footer" class="w-100 m-0" style="display: flex;"></div>
    </b-modal>

    <!-- Modal para escolher relatório parcial ou completo-->
    <b-modal
      id="modalRelatorio"
      ref="relatorioModal"
      scrollable
      title="Relatório"
    >
      <div class="modal-body">
        <ul class="listas list-group">
          <li class="list-group-item clickable" v-on:click="pdf(1)">
            <strong class="ajuda-strong">Parcial</strong>
          </li>
          <li class="list-group-item clickable" v-on:click="pdf(2)">
            <strong class="ajuda-strong">Completo</strong>
          </li>
        </ul>
      </div>

      <div slot="modal-footer" style="display: none;"></div>
    </b-modal>
  </div>
</template>

<script>
import _ from "lodash";
import pdfs from "@/common/services/pdfs";
export default {
  name: "DashboardRelatorioDisciplinas",

  data() {
    return {
      PerfisAtivados: [],
      DisciplinasSelecionados: [],
      DisciplinasAtivados: [],
      semestre_1Ativo: true,
      semestre_2Ativo: true,
      semestreAtual: 3,
      turmaSelecionada: undefined,
      nav_ativo: "perfis",
      searchDisciplinas: null,
      ordemDiscip: { order: "codigo", type: "asc" },
      ordemVagas: { order: "codigo", type: "asc" },
      ordemPerfis: { order: "nome", type: "asc" },
    };
  },

  methods: {
    changeTab(tab) {
      this.nav_ativo = tab;
      // this.searchDisciplinas = null;
    },
    btnOK() {
      //Atualiza semestre selecionados
      if (this.semestre_1Ativo && !this.semestre_2Ativo) {
        this.semestreAtual = 1;
      } else if (this.semestre_2Ativo && !this.semestre_1Ativo) {
        this.semestreAtual = 2;
      } else if (this.semestre_1Ativo && this.semestre_1Ativo) {
        this.semestreAtual = 3;
      } else {
        this.semestreAtual = undefined;
      }
      //Somente atualiza o vetor de perfis ativados quando o botão OK for clickado
      this.DisciplinasAtivados = [...this.DisciplinasSelecionados];

      this.$refs.modalFiltros.hide();
      this.searchDisciplinas = null;
    },
    // Ordem disciplinas Main table
    toggleOrdDiscip(ord) {
      if (this.ordemDiscip.order != ord) {
        this.ordemDiscip.order = ord;
        this.ordemDiscip.type = "asc";
      } else {
        this.ordemDiscip.type = this.ordemDiscip.type == "asc" ? "desc" : "asc";
      }
    },

    // Ordem Perfis Modal
    toggleOrdPerfis() {
      if (this.ordemPerfis.type == "asc") {
        this.ordemPerfis.type = "desc";
      } else {
        this.ordemPerfis.type = "asc";
      }
    },
    // Ordem Vagas Modal
    toggleOrdVagas(ord) {
      if (this.ordemVagas.order != ord) {
        this.ordemVagas.order = ord;
        this.ordemVagas.type = "asc";
      } else {
        this.ordemVagas.type = this.ordemVagas.type == "asc" ? "desc" : "asc";
      }
    },
    //Select Semestre
    selectAllSemestre() {
      this.semestre_1Ativo = true;
      this.semestre_2Ativo = true;
    },
    selectNoneSemestre() {
      this.semestre_1Ativo = false;
      this.semestre_2Ativo = false;
    },
    //Select Perfis
    selectAllPerfis() {
      if (this.PerfisAtivados != []) this.PerfisAtivados = [];
      for (var i = 0; i < this.$store.state.perfil.Perfis.length; i++)
        this.PerfisAtivados.push(this.$store.state.perfil.Perfis[i]);
    },
    selectNonePerfis() {
      this.PerfisAtivados = [];
    },
    //select Disciplinas
    selectAllDisciplinas() {
      if (this.DisciplinasSelecionados != []) this.DisciplinasSelecionados = [];
      for (var i = 0; i < this.$store.state.disciplina.Disciplinas.length; i++)
        this.DisciplinasSelecionados.push(
          this.$store.state.disciplina.Disciplinas[i]
        );
    },
    selectNoneDisciplinas() {
      this.DisciplinasSelecionados = [];
    },

    pdf(opt) {
      if (opt === 1) {
        pdfs.pdfRelatorioDisciplinas({
          disciplinasSelecionadas: this.DisciplinasAtivados,
        });
      }
      if (opt === 2) {
        pdfs.pdfRelatorioDisciplinas({
          disciplinasSelecionadas: this.Disciplinas,
        });
      }
    },
    vagasTurma(turma, semestre) {
      if (
        (semestre === 1 && (turma.periodo == 3 || turma.periodo == 4)) ||
        (semestre === 2 && (turma.periodo == 1 || turma.periodo == 2))
      )
        return 0;
      let pedidos = this.$store.state.pedido.Pedidos[turma.id];
      let vagasP = 0;
      let vagasNP = 0;
      pedidos.forEach((p) => {
        vagasP += p.vagasPeriodizadas;
        vagasNP += p.vagasNaoPeriodizadas;
      });
      return vagasP + vagasNP;
    },

    vagasDisciplina(disciplina, semestre) {
      let turmas = _.filter(this.$store.state.turma.Turmas, {
        Disciplina: disciplina.id,
      });
      let vagas = 0;
      turmas.forEach((t) => {
        vagas += this.vagasTurma(t, semestre);
      });
      return vagas;
    },

    perfil(disciplina) {
      let perfil = _.find(this.$store.state.perfil.Perfis, {
        id: disciplina.Perfil,
      });
      return perfil.abreviacao;
    },
    turmas(disciplina, semestre) {
      return _.orderBy(
        _.filter(this.$store.state.turma.Turmas, (turma) => {
          return (
            turma.Disciplina === disciplina.id &&
            (semestre === 1
              ? turma.periodo === 1 || turma.periodo === 2
              : semestre === 2
              ? turma.periodo === 3 || turma.periodo === 4
              : true)
          );
        }),
        ["periodo", "letra"]
      );
    },

    docentes(turma) {
      let d1 = _.find(this.$store.state.docente.Docentes, {
        id: turma.Docente1,
      });
      let d2 = _.find(this.$store.state.docente.Docentes, {
        id: turma.Docente2,
      });
      if (d1 === undefined && d2 === undefined) {
        return "";
      } else if (d2 === undefined) {
        return `${d1.apelido}`;
      } else if (d1 === undefined) {
        return `${d2.apelido}`;
      } else {
        return `${d1.apelido} / ${d2.apelido}`;
      }
    },

    selecionaTurma(turma) {
      this.turmaSelecionada = turma;
      this.$refs.VagasModal.show();
    },

    curso(pedido) {
      return _.find(this.$store.state.curso.Cursos, { id: pedido.Curso });
    },

    disciplina(turma) {
      return _.find(this.$store.state.disciplina.Disciplinas, {
        id: turma.Disciplina,
      });
    },

    closeModalVagas() {
      this.$refs.VagasModal.hide();
    },
  },

  computed: {
    //Todas disciplinas do DCC
    Disciplinas() {
      let result = _.filter(this.$store.state.disciplina.Disciplinas, (d) => {
        return d.Perfil !== 13 && d.Perfil !== 15;
      });
      //Filtro search
      if (this.searchDisciplinas != null) {
        let searchUpperCase = this.searchDisciplinas
          .toUpperCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");

        return result.filter((disci) => {
          return (
            disci.nome
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .match(searchUpperCase) ||
            disci.nome.match(searchUpperCase) ||
            disci.codigo.match(searchUpperCase)
          );
        });
      } else return result;
    },
    //Disciplinas filtradas
    Disciplinas_Filtred() {
      if (this.ordemDiscip.order == "perfil") {
        //Se for ordem pelo perfil, passa o vetor de ordem ["Perfil", "codigo"]
        return _.orderBy(
          this.Disciplinas,
          (disciplina) => {
            switch (disciplina.Perfil) {
              case 1:
                return "BÁSICO";
              case 2:
                return "AVANÇADO";
              case 3:
                return "ARQSO";
              case 4:
                return "BD";
              case 5:
                return "CG";
              case 6:
                return "ES";
              case 7:
                return "IAIC";
              case 8:
                return "NUM/OC";
              case 9:
                return "REDES";
              case 10:
                return "TEO";
              case 11:
                return "HUMEMPR";
              case 12:
                return "MULTI";
              case 13:
                return "ICE";
              case 14:
                return "SI";
              case 15:
                return "MAC";
              case 16:
                return "EAD";
              case 17:
                return "PUI";
            }
          },
          [this.ordemDiscip.type, "asc"]
        );
      } else {
        //Outros casos
        return _.orderBy(
          this.Disciplinas,
          this.ordemDiscip.order,
          this.ordemDiscip.type
        );
      }
    },

    //Disciplinas da Main Table ordenadas
    Disciplinas_Main_Table() {
      if (this.ordemDiscip.order == "perfil") {
        return _.orderBy(
          this.DisciplinasAtivados,
          (disciplina) => {
            switch (disciplina.Perfil) {
              case 1:
                return "BÁSICO";
              case 2:
                return "AVANÇADO";
              case 3:
                return "ARQSO";
              case 4:
                return "BD";
              case 5:
                return "CG";
              case 6:
                return "ES";
              case 7:
                return "IAIC";
              case 8:
                return "NUM/OC";
              case 9:
                return "REDES";
              case 10:
                return "TEO";
              case 11:
                return "HUMEMPR";
              case 12:
                return "MULTI";
              case 13:
                return "ICE";
              case 14:
                return "SI";
              case 15:
                return "MAC";
              case 16:
                return "EAD";
              case 17:
                return "PUI";
            }
          },
          [this.ordemDiscip.type, "asc"]
        );
      } else {
        return _.orderBy(
          this.DisciplinasAtivados,
          this.ordemDiscip.order,
          this.ordemDiscip.type
        );
      }
    },
    Perfis_Modal() {
      return _.orderBy(
        this.$store.state.perfil.Perfis,
        this.ordemPerfis.order,
        this.ordemPerfis.type
      );
    },

    VagasTurmaSelecionada() {
      if (this.turmaSelecionada === undefined) return [];

      return _.orderBy(
        _.filter(
          this.$store.state.pedido.Pedidos[this.turmaSelecionada.id],
          function(p) {
            return p.vagasPeriodizadas > 0 || p.vagasNaoPeriodizadas > 0;
          }
        ),
        (p) => {
          switch (this.ordemVagas.order) {
            case "codigo":
              return this.curso(p).codigo;
            case "nome":
              return this.curso(p).nome;
            case "vagasPeriodizadas":
              return p.vagasPeriodizadas;
            case "vagasNaoPeriodizadas":
              return p.vagasNaoPeriodizadas;
            case "vagasTotais":
              return p.vagasPeriodizadas + p.vagasNaoPeriodizadas;
            default:
              return this.curso(p).codigo;
          }
        },
        this.ordemVagas.type
      );
    },

    Horarios() {
      return this.$store.state.horario.Horarios;
    },
    //Função para adicionar ao clickar no <tr>
    // addInDisci(disciplina) {
    //   let indice = this.DisciplinasSelecionados.indexOf(disciplina);

    //   if (indice === -1) {
    //     this.DisciplinasSelecionados.push(disciplina);
    //   } else {
    //     this.DisciplinasSelecionados.splice(indice, 1);
    //   }
    // },
  },
  watch: {
    PerfisAtivados(newValue, oldValue) {
      //Apaga todas disciplinas selecionadas sempre que um novo perfil é selecionado
      this.DisciplinasSelecionados = [];

      this.Disciplinas.forEach((discip) => {
        this.PerfisAtivados.forEach((perfil) => {
          if (
            discip.Perfil == perfil.id &&
            !this.DisciplinasSelecionados.includes(discip)
          ) {
            this.DisciplinasSelecionados.push(discip);
          }
        });
      });
    },
  },
};
</script>

<style scoped>
.DashboardRelatorioDisciplinas {
  max-width: 100%;
  overflow: hidden;
  margin: 0;
}
.titulo {
  font-size: 25px;
  font-weight: normal;
  padding-left: 0;
  margin: 0 !important;
}
/* main-table */
.divTable {
  overflow: hidden;
  height: -webkit-max-content;
  height: -moz-max-content;
  height: max-content;
  width: -webkit-max-content;
  width: -moz-max-content;
  width: max-content;
}
.main-table {
  display: block !important;
  overflow-y: scroll !important;
  overflow-x: auto !important;
  font-size: 11px !important;
  font-weight: normal !important;
  background-color: white;
  margin: 0 !important;
  height: -webkit-calc(100vh - 95px);
  height: -moz-calc(100vh - 95px);
  height: calc(100vh - 95px);
}
.main-table .p-header {
  height: 18px;
}
.main-table p {
  padding: 0 5px 0 5px !important;
  margin: 0 !important;
  font-size: 11px !important;
  text-align: center;
}
tbody {
  max-height: 100% !important;
  width: 100% !important;
}
.main-table td {
  text-align: center;
  vertical-align: middle !important;
  padding: 0 !important;
  height: 22px !important;
}
.main-table tr thead {
  display: block !important;
}
.main-table thead th {
  padding: 0 !important;
  font-size: 14px;
  text-align: center;
  height: 18px !important;
}
/* fim table */
.listas {
  line-height: 30px;
  font-size: 12px;
  text-align: justify;
  line-height: inherit;
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.15);
}
.ajuda-strong {
  color: #007bff;
}
.disciplina-tr {
  background-color: rgba(0, 0, 0, 0.089);
  color: black;
}

/* Formularios no topo da tela */
.form-inline .input-group,
.form-inline {
  width: auto;
}

.form-group {
  display: -ms-flexbox;
  display: flex;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  -ms-flex-flow: row wrap;
  flex-flow: row wrap;
  -ms-flex-align: center;
  align-items: center;
  margin-bottom: 0;
}

.col-form-label {
  padding-left: 25px;
  font-size: 14px !important;
}
.form-control {
  height: 25px !important;
  font-size: 12px !important;
  padding: 2px 5px 2px 5px !important;
  text-align: start;
}

.p-vagas:hover {
  color: #007bff;
  text-decoration: underline;
}

.modal-content .modal-header {
  padding: 0 !important;
}
@media screen and (max-width: 378px) {
  .div-titulo {
    height: 70px !important;
  }
}
</style>
