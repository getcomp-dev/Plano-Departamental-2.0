<template>
  <table class="tg">
    <tr>
      <th class="tg-0lax">Horário</th>
      <th class="tg-0lax">Seg</th>
      <th class="tg-0lax">Ter</th>
      <th class="tg-0lax">Qua</th>
      <th class="tg-0lax">Qui</th>
      <th class="tg-0lax">Sex</th>
    </tr>

    <tr>
      <td class="tg-0lax tg-hor">08-10</td>
      <td class="tg-0lax">
        <template
          v-for="turma in Turmas"
          v-if="
            (turma.Sala1 === laboratorio.id ||
              turma.Sala2 === laboratorio.id) &&
              checkTurmaHorario(turma, 1, laboratorio.id)
          "
        >
          <p
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
            :key="turma.letra + disciplina.id"
            v-b-popover.hover.right="{
              title: disciplina.nome,
              content: findDocenteInTurma(turma),
            }"
          >
            {{ disciplina.codigo }} {{ turma.letra }}
          </p>
        </template>
      </td>
      <td class="tg-0lax">
        <template
          v-for="turma in Turmas"
          v-if="
            (turma.Sala1 === laboratorio.id ||
              turma.Sala2 === laboratorio.id) &&
              checkTurmaHorario(turma, 7, laboratorio.id)
          "
        >
          <p
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
            :key="turma.letra + disciplina.id"
            v-b-popover.hover.right="{
              title: disciplina.nome,
              content: findDocenteInTurma(turma),
            }"
          >
            {{ disciplina.codigo }} {{ turma.letra }}
          </p>
        </template>
      </td>
      <td class="tg-0lax">
        <template
          v-for="turma in Turmas"
          v-if="
            (turma.Sala1 === laboratorio.id ||
              turma.Sala2 === laboratorio.id) &&
              checkTurmaHorario(turma, 13, laboratorio.id)
          "
        >
          <p
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
            :key="turma.letra + disciplina.id"
            v-b-popover.hover.right="{
              title: disciplina.nome,
              content: findDocenteInTurma(turma),
            }"
          >
            {{ disciplina.codigo }} {{ turma.letra }}
          </p>
        </template>
      </td>
      <td class="tg-0lax">
        <template
          v-for="turma in Turmas"
          v-if="
            (turma.Sala1 === laboratorio.id ||
              turma.Sala2 === laboratorio.id) &&
              checkTurmaHorario(turma, 19, laboratorio.id)
          "
        >
          <p
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
            :key="turma.letra + disciplina.id"
            v-b-popover.hover.right="{
              title: disciplina.nome,
              content: findDocenteInTurma(turma),
            }"
          >
            {{ disciplina.codigo }} {{ turma.letra }}
          </p>
        </template>
      </td>
      <td class="tg-0lax">
        <template
          v-for="turma in Turmas"
          v-if="
            (turma.Sala1 === laboratorio.id ||
              turma.Sala2 === laboratorio.id) &&
              checkTurmaHorario(turma, 25, laboratorio.id)
          "
        >
          <p
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
            :key="turma.letra + disciplina.id"
            v-b-popover.hover.right="{
              title: disciplina.nome,
              content: findDocenteInTurma(turma),
            }"
          >
            {{ disciplina.codigo }} {{ turma.letra }}
          </p>
        </template>
      </td>
    </tr>

    <tr>
      <td class="tg-0lax tg-hor">10-12</td>
      <td class="tg-0lax">
        <template
          v-for="turma in Turmas"
          v-if="
            (turma.Sala1 === laboratorio.id ||
              turma.Sala2 === laboratorio.id) &&
              checkTurmaHorario(turma, 2, laboratorio.id)
          "
        >
          <p
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
            :key="turma.letra + disciplina.id"
            v-b-popover.hover.right="{
              title: disciplina.nome,
              content: findDocenteInTurma(turma),
            }"
          >
            {{ disciplina.codigo }} {{ turma.letra }}
          </p>
        </template>
      </td>
      <td class="tg-0lax">
        <template
          v-for="turma in Turmas"
          v-if="
            (turma.Sala1 === laboratorio.id ||
              turma.Sala2 === laboratorio.id) &&
              checkTurmaHorario(turma, 8, laboratorio.id)
          "
        >
          <p
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
            :key="turma.letra + disciplina.id"
            v-b-popover.hover.right="{
              title: disciplina.nome,
              content: findDocenteInTurma(turma),
            }"
          >
            {{ disciplina.codigo }} {{ turma.letra }}
          </p>
        </template>
      </td>
      <td class="tg-0lax">
        <template
          v-for="turma in Turmas"
          v-if="
            (turma.Sala1 === laboratorio.id ||
              turma.Sala2 === laboratorio.id) &&
              checkTurmaHorario(turma, 14, laboratorio.id)
          "
        >
          <p
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
            :key="turma.letra + disciplina.id"
            v-b-popover.hover.right="{
              title: disciplina.nome,
              content: findDocenteInTurma(turma),
            }"
          >
            {{ disciplina.codigo }} {{ turma.letra }}
          </p>
        </template>
      </td>
      <td class="tg-0lax">
        <template
          v-for="turma in Turmas"
          v-if="
            (turma.Sala1 === laboratorio.id ||
              turma.Sala2 === laboratorio.id) &&
              checkTurmaHorario(turma, 20, laboratorio.id)
          "
        >
          <p
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
            :key="turma.letra + disciplina.id"
            v-b-popover.hover.right="{
              title: disciplina.nome,
              content: findDocenteInTurma(turma),
            }"
          >
            {{ disciplina.codigo }} {{ turma.letra }}
          </p>
        </template>
      </td>
      <td class="tg-0lax">
        <template
          v-for="turma in Turmas"
          v-if="
            (turma.Sala1 === laboratorio.id ||
              turma.Sala2 === laboratorio.id) &&
              checkTurmaHorario(turma, 26, laboratorio.id)
          "
        >
          <p
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
            :key="turma.letra + disciplina.id"
            v-b-popover.hover.right="{
              title: disciplina.nome,
              content: findDocenteInTurma(turma),
            }"
          >
            {{ disciplina.codigo }} {{ turma.letra }}
          </p>
        </template>
      </td>
    </tr>

    <tr>
      <td class="tg-0lax tg-hor">14-16</td>
      <td class="tg-0lax">
        <template
          v-for="turma in Turmas"
          v-if="
            (turma.Sala1 === laboratorio.id ||
              turma.Sala2 === laboratorio.id) &&
              checkTurmaHorario(turma, 3, laboratorio.id)
          "
        >
          <p
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
            :key="turma.letra + disciplina.id"
            v-b-popover.hover.right="{
              title: disciplina.nome,
              content: findDocenteInTurma(turma),
            }"
          >
            {{ disciplina.codigo }} {{ turma.letra }}
          </p>
        </template>
      </td>
      <td class="tg-0lax">
        <template
          v-for="turma in Turmas"
          v-if="
            (turma.Sala1 === laboratorio.id ||
              turma.Sala2 === laboratorio.id) &&
              checkTurmaHorario(turma, 9, laboratorio.id)
          "
        >
          <p
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
            :key="turma.letra + disciplina.id"
            v-b-popover.hover.right="{
              title: disciplina.nome,
              content: findDocenteInTurma(turma),
            }"
          >
            {{ disciplina.codigo }} {{ turma.letra }}
          </p>
        </template>
      </td>
      <td class="tg-0lax">
        <template
          v-for="turma in Turmas"
          v-if="
            (turma.Sala1 === laboratorio.id ||
              turma.Sala2 === laboratorio.id) &&
              checkTurmaHorario(turma, 15, laboratorio.id)
          "
        >
          <p
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
            :key="turma.letra + disciplina.id"
            v-b-popover.hover.right="{
              title: disciplina.nome,
              content: findDocenteInTurma(turma),
            }"
          >
            {{ disciplina.codigo }} {{ turma.letra }}
          </p>
        </template>
      </td>
      <td class="tg-0lax">
        <template
          v-for="turma in Turmas"
          v-if="
            (turma.Sala1 === laboratorio.id ||
              turma.Sala2 === laboratorio.id) &&
              checkTurmaHorario(turma, 21, laboratorio.id)
          "
        >
          <p
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
            :key="turma.letra + disciplina.id"
            v-b-popover.hover.right="{
              title: disciplina.nome,
              content: findDocenteInTurma(turma),
            }"
          >
            {{ disciplina.codigo }} {{ turma.letra }}
          </p>
        </template>
      </td>
      <td class="tg-0lax">
        <template
          v-for="turma in Turmas"
          v-if="
            (turma.Sala1 === laboratorio.id ||
              turma.Sala2 === laboratorio.id) &&
              checkTurmaHorario(turma, 27, laboratorio.id)
          "
        >
          <p
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
            :key="turma.letra + disciplina.id"
            v-b-popover.hover.right="{
              title: disciplina.nome,
              content: findDocenteInTurma(turma),
            }"
          >
            {{ disciplina.codigo }} {{ turma.letra }}
          </p>
        </template>
      </td>
    </tr>

    <tr>
      <td class="tg-0lax tg-hor">16-18</td>
      <td class="tg-0lax">
        <template
          v-for="turma in Turmas"
          v-if="
            (turma.Sala1 === laboratorio.id ||
              turma.Sala2 === laboratorio.id) &&
              checkTurmaHorario(turma, 4, laboratorio.id)
          "
        >
          <p
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
            :key="turma.letra + disciplina.id"
            v-b-popover.hover.right="{
              title: disciplina.nome,
              content: findDocenteInTurma(turma),
            }"
          >
            {{ disciplina.codigo }} {{ turma.letra }}
          </p>
        </template>
      </td>
      <td class="tg-0lax">
        <template
          v-for="turma in Turmas"
          v-if="
            (turma.Sala1 === laboratorio.id ||
              turma.Sala2 === laboratorio.id) &&
              checkTurmaHorario(turma, 10, laboratorio.id)
          "
        >
          <p
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
            :key="turma.letra + disciplina.id"
            v-b-popover.hover.right="{
              title: disciplina.nome,
              content: findDocenteInTurma(turma),
            }"
          >
            {{ disciplina.codigo }} {{ turma.letra }}
          </p>
        </template>
      </td>
      <td class="tg-0lax">
        <template
          v-for="turma in Turmas"
          v-if="
            (turma.Sala1 === laboratorio.id ||
              turma.Sala2 === laboratorio.id) &&
              checkTurmaHorario(turma, 16, laboratorio.id)
          "
        >
          <p
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
            :key="turma.letra + disciplina.id"
            v-b-popover.hover.right="{
              title: disciplina.nome,
              content: findDocenteInTurma(turma),
            }"
          >
            {{ disciplina.codigo }} {{ turma.letra }}
          </p>
        </template>
      </td>
      <td class="tg-0lax">
        <template
          v-for="turma in Turmas"
          v-if="
            (turma.Sala1 === laboratorio.id ||
              turma.Sala2 === laboratorio.id) &&
              checkTurmaHorario(turma, 22, laboratorio.id)
          "
        >
          <p
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
            :key="turma.letra + disciplina.id"
            v-b-popover.hover.right="{
              title: disciplina.nome,
              content: findDocenteInTurma(turma),
            }"
          >
            {{ disciplina.codigo }} {{ turma.letra }}
          </p>
        </template>
      </td>
      <td class="tg-0lax">
        <template
          v-for="turma in Turmas"
          v-if="
            (turma.Sala1 === laboratorio.id ||
              turma.Sala2 === laboratorio.id) &&
              checkTurmaHorario(turma, 28, laboratorio.id)
          "
        >
          <p
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
            :key="turma.letra + disciplina.id"
            v-b-popover.hover.right="{
              title: disciplina.nome,
              content: findDocenteInTurma(turma),
            }"
          >
            {{ disciplina.codigo }} {{ turma.letra }}
          </p>
        </template>
      </td>
    </tr>

    <tr>
      <td class="tg-0lax tg-hor">17-19</td>
      <td class="tg-0lax">
        <template
          v-for="turma in Turmas"
          v-if="
            (turma.Sala1 === laboratorio.id ||
              turma.Sala2 === laboratorio.id) &&
              checkTurmaHorario(turma, 32, laboratorio.id)
          "
        >
          <p
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
            :key="turma.letra + disciplina.id"
            v-b-popover.hover.right="{
              title: disciplina.nome,
              content: findDocenteInTurma(turma),
            }"
          >
            {{ disciplina.codigo }} {{ turma.letra }}
          </p>
        </template>
      </td>
      <td class="tg-0lax">
        <template
          v-for="turma in Turmas"
          v-if="
            (turma.Sala1 === laboratorio.id ||
              turma.Sala2 === laboratorio.id) &&
              checkTurmaHorario(turma, 34, laboratorio.id)
          "
        >
          <p
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
            :key="turma.letra + disciplina.id"
            v-b-popover.hover.right="{
              title: disciplina.nome,
              content: findDocenteInTurma(turma),
            }"
          >
            {{ disciplina.codigo }} {{ turma.letra }}
          </p>
        </template>
      </td>
      <td class="tg-0lax">
        <template
          v-for="turma in Turmas"
          v-if="
            (turma.Sala1 === laboratorio.id ||
              turma.Sala2 === laboratorio.id) &&
              checkTurmaHorario(turma, 36, laboratorio.id)
          "
        >
          <p
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
            :key="turma.letra + disciplina.id"
            v-b-popover.hover.right="{
              title: disciplina.nome,
              content: findDocenteInTurma(turma),
            }"
          >
            {{ disciplina.codigo }} {{ turma.letra }}
          </p>
        </template>
      </td>
      <td class="tg-0lax">
        <template
          v-for="turma in Turmas"
          v-if="
            (turma.Sala1 === laboratorio.id ||
              turma.Sala2 === laboratorio.id) &&
              checkTurmaHorario(turma, 38, laboratorio.id)
          "
        >
          <p
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
            :key="turma.letra + disciplina.id"
            v-b-popover.hover.right="{
              title: disciplina.nome,
              content: findDocenteInTurma(turma),
            }"
          >
            {{ disciplina.codigo }} {{ turma.letra }}
          </p>
        </template>
      </td>
      <td class="tg-0lax">
        <template
          v-for="turma in Turmas"
          v-if="
            (turma.Sala1 === laboratorio.id ||
              turma.Sala2 === laboratorio.id) &&
              checkTurmaHorario(turma, 40, laboratorio.id)
          "
        >
          <p
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
            :key="turma.letra + disciplina.id"
            v-b-popover.hover.right="{
              title: disciplina.nome,
              content: findDocenteInTurma(turma),
            }"
          >
            {{ disciplina.codigo }} {{ turma.letra }}
          </p>
        </template>
      </td>
    </tr>

    <tr>
      <td class="tg-0lax tg-hor">18-20</td>
      <td class="tg-0lax">
        <template
          v-for="turma in Turmas"
          v-if="
            (turma.Sala1 === laboratorio.id ||
              turma.Sala2 === laboratorio.id) &&
              checkTurmaHorario(turma, 33, laboratorio.id)
          "
        >
          <p
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
            :key="turma.letra + disciplina.id"
            v-b-popover.hover.right="{
              title: disciplina.nome,
              content: findDocenteInTurma(turma),
            }"
          >
            {{ disciplina.codigo }} {{ turma.letra }}
          </p>
        </template>
      </td>
      <td class="tg-0lax">
        <template
          v-for="turma in Turmas"
          v-if="
            (turma.Sala1 === laboratorio.id ||
              turma.Sala2 === laboratorio.id) &&
              checkTurmaHorario(turma, 35, laboratorio.id)
          "
        >
          <p
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
            :key="turma.letra + disciplina.id"
            v-b-popover.hover.right="{
              title: disciplina.nome,
              content: findDocenteInTurma(turma),
            }"
          >
            {{ disciplina.codigo }} {{ turma.letra }}
          </p>
        </template>
      </td>
      <td class="tg-0lax">
        <template
          v-for="turma in Turmas"
          v-if="
            (turma.Sala1 === laboratorio.id ||
              turma.Sala2 === laboratorio.id) &&
              checkTurmaHorario(turma, 37, laboratorio.id)
          "
        >
          <p
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
            :key="turma.letra + disciplina.id"
            v-b-popover.hover.right="{
              title: disciplina.nome,
              content: findDocenteInTurma(turma),
            }"
          >
            {{ disciplina.codigo }} {{ turma.letra }}
          </p>
        </template>
      </td>
      <td class="tg-0lax">
        <template
          v-for="turma in Turmas"
          v-if="
            (turma.Sala1 === laboratorio.id ||
              turma.Sala2 === laboratorio.id) &&
              checkTurmaHorario(turma, 39, laboratorio.id)
          "
        >
          <p
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
            :key="turma.letra + disciplina.id"
            v-b-popover.hover.right="{
              title: disciplina.nome,
              content: findDocenteInTurma(turma),
            }"
          >
            {{ disciplina.codigo }} {{ turma.letra }}
          </p>
        </template>
      </td>
      <td class="tg-0lax">
        <template
          v-for="turma in Turmas"
          v-if="
            (turma.Sala1 === laboratorio.id ||
              turma.Sala2 === laboratorio.id) &&
              checkTurmaHorario(turma, 41, laboratorio.id)
          "
        >
          <p
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
            :key="turma.letra + disciplina.id"
            v-b-popover.hover.right="{
              title: disciplina.nome,
              content: findDocenteInTurma(turma),
            }"
          >
            {{ disciplina.codigo }} {{ turma.letra }}
          </p>
        </template>
      </td>
    </tr>

    <tr>
      <td class="tg-0lax tg-hor">19-21</td>
      <td class="tg-0lax">
        <template
          v-for="turma in Turmas"
          v-if="
            (turma.Sala1 === laboratorio.id ||
              turma.Sala2 === laboratorio.id) &&
              checkTurmaHorario(turma, 5, laboratorio.id)
          "
        >
          <p
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
            :key="turma.letra + disciplina.id"
            v-b-popover.hover.right="{
              title: disciplina.nome,
              content: findDocenteInTurma(turma),
            }"
          >
            {{ disciplina.codigo }} {{ turma.letra }}
          </p>
        </template>
      </td>
      <td class="tg-0lax">
        <template
          v-for="turma in Turmas"
          v-if="
            (turma.Sala1 === laboratorio.id ||
              turma.Sala2 === laboratorio.id) &&
              checkTurmaHorario(turma, 11, laboratorio.id)
          "
        >
          <p
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
            :key="turma.letra + disciplina.id"
            v-b-popover.hover.right="{
              title: disciplina.nome,
              content: findDocenteInTurma(turma),
            }"
          >
            {{ disciplina.codigo }} {{ turma.letra }}
          </p>
        </template>
      </td>
      <td class="tg-0lax">
        <template
          v-for="turma in Turmas"
          v-if="
            (turma.Sala1 === laboratorio.id ||
              turma.Sala2 === laboratorio.id) &&
              checkTurmaHorario(turma, 17, laboratorio.id)
          "
        >
          <p
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
            :key="turma.letra + disciplina.id"
            v-b-popover.hover.right="{
              title: disciplina.nome,
              content: findDocenteInTurma(turma),
            }"
          >
            {{ disciplina.codigo }} {{ turma.letra }}
          </p>
        </template>
      </td>
      <td class="tg-0lax">
        <template
          v-for="turma in Turmas"
          v-if="
            (turma.Sala1 === laboratorio.id ||
              turma.Sala2 === laboratorio.id) &&
              checkTurmaHorario(turma, 23, laboratorio.id)
          "
        >
          <p
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
            :key="turma.letra + disciplina.id"
            v-b-popover.hover.right="{
              title: disciplina.nome,
              content: findDocenteInTurma(turma),
            }"
          >
            {{ disciplina.codigo }} {{ turma.letra }}
          </p>
        </template>
      </td>
      <td class="tg-0lax">
        <template
          v-for="turma in Turmas"
          v-if="
            (turma.Sala1 === laboratorio.id ||
              turma.Sala2 === laboratorio.id) &&
              checkTurmaHorario(turma, 29, laboratorio.id)
          "
        >
          <p
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
            :key="turma.letra + disciplina.id"
            v-b-popover.hover.right="{
              title: disciplina.nome,
              content: findDocenteInTurma(turma),
            }"
          >
            {{ disciplina.codigo }} {{ turma.letra }}
          </p>
        </template>
      </td>
    </tr>

    <tr>
      <td class="tg-0lax tg-hor">21-23</td>
      <td class="tg-0lax">
        <template
          v-for="turma in Turmas"
          v-if="
            (turma.Sala1 === laboratorio.id ||
              turma.Sala2 === laboratorio.id) &&
              checkTurmaHorario(turma, 6, laboratorio.id)
          "
        >
          <p
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
            :key="turma.letra + disciplina.id"
            v-b-popover.hover.right="{
              title: disciplina.nome,
              content: findDocenteInTurma(turma),
            }"
          >
            {{ disciplina.codigo }} {{ turma.letra }}
          </p>
        </template>
      </td>
      <td class="tg-0lax">
        <template
          v-for="turma in Turmas"
          v-if="
            (turma.Sala1 === laboratorio.id ||
              turma.Sala2 === laboratorio.id) &&
              checkTurmaHorario(turma, 12, laboratorio.id)
          "
        >
          <p
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
            :key="turma.letra + disciplina.id"
            v-b-popover.hover.right="{
              title: disciplina.nome,
              content: findDocenteInTurma(turma),
            }"
          >
            {{ disciplina.codigo }} {{ turma.letra }}
          </p>
        </template>
      </td>
      <td class="tg-0lax">
        <template
          v-for="turma in Turmas"
          v-if="
            (turma.Sala1 === laboratorio.id ||
              turma.Sala2 === laboratorio.id) &&
              checkTurmaHorario(turma, 18, laboratorio.id)
          "
        >
          <p
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
            :key="turma.letra + disciplina.id"
            v-b-popover.hover.right="{
              title: disciplina.nome,
              content: findDocenteInTurma(turma),
            }"
          >
            {{ disciplina.codigo }} {{ turma.letra }}
          </p>
        </template>
      </td>
      <td class="tg-0lax">
        <template
          v-for="turma in Turmas"
          v-if="
            (turma.Sala1 === laboratorio.id ||
              turma.Sala2 === laboratorio.id) &&
              checkTurmaHorario(turma, 24, laboratorio.id)
          "
        >
          <p
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
            :key="turma.letra + disciplina.id"
            v-b-popover.hover.right="{
              title: disciplina.nome,
              content: findDocenteInTurma(turma),
            }"
          >
            {{ disciplina.codigo }} {{ turma.letra }}
          </p>
        </template>
      </td>
      <td class="tg-0lax">
        <template
          v-for="turma in Turmas"
          v-if="
            (turma.Sala1 === laboratorio.id ||
              turma.Sala2 === laboratorio.id) &&
              checkTurmaHorario(turma, 30, laboratorio.id)
          "
        >
          <p
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
            :key="turma.letra + disciplina.id"
            v-b-popover.hover.right="{
              title: disciplina.nome,
              content: findDocenteInTurma(turma),
            }"
          >
            {{ disciplina.codigo }} {{ turma.letra }}
          </p>
        </template>
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  name: "TableHorariosLab",
  props: {
    Turmas: { type: Array, required: true, default: () => [] },
    laboratorio: { type: Object, required: true },
  },
  methods: {
    checkTurmaHorario(turma, horario, lab) {
      if (turma.Horario1 == horario || turma.Horario2 == horario) {
        let sala = this.checkTurmaLab(turma);
        switch (sala) {
          case 0:
            return false;

          case 1:
            if (turma.Horario1 == horario) return true;
            else return false;

          case 2:
            if (turma.Horario2 == horario) return true;
            else return false;

          case 3:
            if (turma.Sala1 === lab) {
              if (turma.Horario1 == horario) return true;
            }
            if (turma.Sala2 === lab) {
              if (turma.Horario2 == horario) return true;
            }
            return false;
        }
        return true;
      } else return false;
    },
    checkTurmaLab(turma) {
      let labs = this.$_.filter(this.$store.state.sala.Salas, [
        "laboratorio",
        true,
      ]);
      let result = 0;
      labs.forEach((lab) => {
        if (lab.id === turma.Sala1) result += 1;
        if (lab.id === turma.Sala2) result += 2;
      });

      return result;
    },
    findDocenteInTurma(turma) {
      let d1 = undefined,
        d2 = undefined;
      if (!this.$_.isNull(turma.Docente1))
        d1 = this.$_.find(this.$store.state.docente.Docentes, [
          "id",
          turma.Docente1,
        ]);
      if (!this.$_.isNull(turma.Docente2))
        d2 = this.$_.find(this.$store.state.docente.Docentes, [
          "id",
          turma.Docente1,
        ]);
      let apelidos = "";
      if (d1 !== undefined) {
        apelidos += d1.apelido;
        if (d2 !== undefined) {
          apelidos = apelidos + " " + d2.apelido;
        }
      } else {
        if (d2 !== undefined) apelidos += d2.apelido;
      }
      return apelidos;
    },
  },
  computed: {
    Disciplinas() {
      return this.$store.state.disciplina.Disciplinas;
    },
  },
};
</script>

<style scoped>
.tg {
  border-collapse: collapse;
  border-spacing: 0;
  border-color: #ccc;
}
.tg td {
  font-family: Arial, sans-serif;
  font-size: 11px;
  padding: 0px;
  border-style: solid;
  border-width: 1px;
  overflow: hidden;
  word-break: break-word;
  border-color: rgba(189, 189, 189, 0.644);
  color: #333;
  background-color: #fff;
}
.tg th,
.tg-hor {
  font-family: Arial, sans-serif;
  font-size: 11px;
  font-weight: bold;
  padding: 0px;
  border-style: solid;
  border-width: 1px;
  overflow: hidden;
  word-break: normal;
  border-color: rgba(189, 189, 189, 0.623);
  color: #333;
  background-color: #e9ecef !important;
  min-width: 50px !important;
}
.tg .tg-0lax {
  vertical-align: center;
  text-align: center;
  height: 22px;
  min-width: 66px;
}
.tg td p {
  min-width: 64px !important;
  padding: 0 1px !important;
  margin: 0 !important;
}
.tg td p:hover {
  cursor: default;
  background-color: var(--light-gray) !important;
}
</style>
