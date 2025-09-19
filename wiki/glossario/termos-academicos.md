# 🎓 Glossário de Termos Acadêmicos

## 📋 Sumário

- [📋 Sumário](#-sumário)
- [🎯 Sobre este Glossário](#-sobre-este-glossário)
- [🏛️ Estrutura Universitária](#-estrutura-universitária)
- [📚 Organização Curricular](#-organização-curricular)
- [👥 Pessoas e Papéis](#-pessoas-e-papéis)
- [📝 Processo de Matrícula](#-processo-de-matrícula)
- [⏰ Temporal e Cronograma](#-temporal-e-cronograma)
- [📊 Avaliação e Performance](#-avaliação-e-performance)
- [🎯 Planejamento Departamental](#-planejamento-departamental)

---

## 🎯 Sobre este Glossário

Este glossário define termos do domínio acadêmico universitário utilizados no Sistema Plano Departamental 2.0. É direcionado para desenvolvedores que precisam compreender o contexto educacional e para usuários finais (coordenadores, secretários) que usam o sistema.

---

## 🏛️ Estrutura Universitária

### **Departamento**
Unidade administrativa e acadêmica da universidade responsável por um conjunto de disciplinas afins e cursos relacionados.

**Características:**
- Congrega docentes de área específica
- Oferece disciplinas para múltiplos cursos
- Possui autonomia para planejamento acadêmico
- Exemplo: Departamento de Ciência da Computação

### **Instituto/Faculdade**
Unidade maior que abriga múltiplos departamentos relacionados.

**Exemplo:**
- Instituto de Ciências Exatas (ICE)
  - Departamento de Ciência da Computação
  - Departamento de Matemática
  - Departamento de Física

### **Campus**
Espaço físico da universidade onde estão localizados os prédios, salas de aula e laboratórios.

### **Reitoria**
Órgão máximo de administração da universidade, responsável pela gestão geral e políticas institucionais.

---

## 📚 Organização Curricular

### **Curso**
Programa de estudos que leva a uma titulação específica (graduação ou pós-graduação).

**Características no sistema:**
- Possui código único (ex: "COMP" para Ciência da Computação)
- Definido por turno (matutino, vespertino, noturno, integral)
- Tem número de vagas para entrada por semestre
- Exemplo: Bacharelado em Ciência da Computação

### **Grade Curricular (Currículo)**
Conjunto estruturado de disciplinas que compõem um curso, organizado por períodos.

**Elementos:**
- **Disciplinas obrigatórias**: Deve ser cursada por todos os alunos
- **Disciplinas optativas**: Aluno escolhe dentre opções disponíveis
- **Períodos**: Organização temporal das disciplinas
- **Carga horária total**: Soma de todas as disciplinas

**Exemplo de estrutura:**
```
Ciência da Computação - Grade 2020
├── 1º Período
│   ├── Introdução à Programação (Obrigatória)
│   ├── Matemática Discreta (Obrigatória)
│   └── Fundamentos de Matemática (Obrigatória)
├── 2º Período
│   ├── Programação Orientada a Objetos (Obrigatória)
│   └── Cálculo I (Obrigatória)
...
└── 8º Período
    ├── Trabalho de Conclusão de Curso (Obrigatória)
    └── Disciplina Optativa
```

### **Disciplina**
Componente curricular que trata de um assunto específico, com carga horária e conteúdo definidos.

**Características:**
- **Código único**: Identificação no sistema (ex: "DCC001")
- **Nome**: Denominação da disciplina
- **Carga horária teórica**: Horas de aula expositiva
- **Carga horária prática**: Horas de exercícios/laboratório
- **Pré-requisitos**: Disciplinas que devem ser cursadas anteriormente
- **EAD**: Indica se possui componente de ensino à distância
- **Laboratório**: Indica se requer uso de laboratório

### **Turma**
Oferta específica de uma disciplina em um semestre letivo.

**Elementos:**
- **Letra identificadora**: A, B, C, D... (para diferenciar turmas da mesma disciplina)
- **Período sugerido**: Em qual período da grade a disciplina é normalmente oferecida
- **Turno**: Matutino, vespertino ou noturno
- **Docente(s)**: Professor(es) responsável(is)
- **Horário**: Dias e horários das aulas
- **Sala**: Local onde ocorrem as aulas

**Exemplo:**
```
Disciplina: Programação I
├── Turma A (Matutino)
│   ├── Docente: Prof. João Silva
│   ├── Horário: Segunda e Quarta, 8h-10h
│   └── Período: 2º período
└── Turma B (Noturno)
    ├── Docente: Prof. Maria Santos
    ├── Horário: Terça e Quinta, 19h-21h
    └── Período: 2º período
```

### **Pré-requisito**
Disciplina que deve ser concluída com aprovação antes que o aluno possa se matricular em outra disciplina.

**Tipos:**
- **Pré-requisito direto**: Disciplina específica obrigatória
- **Pré-requisito por créditos**: Número mínimo de créditos concluídos
- **Co-requisito**: Disciplina que deve ser cursada simultaneamente

### **Crédito**
Unidade de medida da carga horária universitária.

**Conversão típica:**
- 1 crédito = 15 horas de aula por semestre
- Disciplina de 4 créditos = 60 horas = 4 aulas por semana

---

## 👥 Pessoas e Papéis

### **Docente**
Professor universitário responsável por ministrar disciplinas.

**Classificações:**
- **Professor Efetivo**: Concursado, vínculo permanente
- **Professor Substituto**: Contrato temporário
- **Professor Visitante**: Vínculo temporário especial

**Características no sistema:**
- **Carga horária**: Total de horas disponíveis para lecionar
- **Competências**: Disciplinas que está apto a lecionar
- **Status**: Ativo ou inativo

### **Coordenador de Curso**
Docente responsável pela gestão acadêmica de um curso específico.

**Responsabilidades:**
- Planejamento da oferta de disciplinas
- Aprovação de pedidos especiais de matrícula
- Orientação acadêmica aos alunos
- Gestão da grade curricular

### **Chefe de Departamento**
Docente responsável pela administração geral do departamento.

**Responsabilidades:**
- Coordenação das atividades departamentais
- Distribuição de carga horária entre docentes
- Representação do departamento em colegiados

### **Secretário(a)**
Profissional administrativo que auxilia na gestão departamental.

**Responsabilidades no sistema:**
- Operação do sistema de matrículas
- Geração de relatórios
- Atendimento a alunos e docentes
- Manutenção de dados cadastrais

### **Aluno Regular**
Estudante matriculado em curso de graduação ou pós-graduação.

**Características:**
- **Matrícula**: Número de identificação único
- **Período atual**: Em qual período do curso está
- **Status**: Ativo, trancado, formado, evadido

### **Aluno Especial**
Estudante que cursa disciplinas isoladas sem estar matriculado em curso regular.

---

## 📝 Processo de Matrícula

### **Matrícula**
Processo pelo qual o aluno se inscreve oficialmente em disciplinas para um semestre letivo.

**Tipos:**
- **Matrícula inicial**: Primeira matrícula no curso
- **Rematrícula**: Matrícula de semestres subsequentes
- **Matrícula adicional**: Inclusão de disciplinas após período normal

### **Pedido de Matrícula**
No contexto do sistema, representa a demanda estimada de um curso por vagas em uma disciplina específica.

**Características:**
- **Vagas periodizadas**: Para alunos no período "correto"
- **Vagas não-periodizadas**: Para alunos fora do período normal
- **Base histórica**: Calculado com base em semestres anteriores

### **Vaga**
Lugar disponível para um aluno em uma turma específica.

**Características:**
- **Número total**: Quantidade máxima de alunos na turma
- **Distribuição por curso**: Quantas vagas são reservadas para cada curso
- **Tipo de aluno**: Periodizado, não-periodizado, especial

### **Lista de Espera**
Relação de alunos que solicitaram matrícula em turma sem vagas disponíveis, ordenados por critérios de prioridade.

### **Prioridade de Matrícula**
Critérios usados para determinar quem tem preferência quando há mais interessados do que vagas.

**Critérios típicos:**
1. **Período no curso**: Alunos no período "correto" têm prioridade
2. **IRA (Índice de Rendimento Acadêmico)**: Melhor desempenho, maior prioridade
3. **Tempo no curso**: Mais tempo cursado, maior prioridade
4. **Tipo de disciplina**: Obrigatórias têm prioridade sobre optativas

### **Trancamento**
Suspensão temporária dos estudos, mantendo o vínculo com a universidade.

**Tipos:**
- **Trancamento total**: Todas as disciplinas do semestre
- **Trancamento parcial**: Disciplinas específicas

---

## ⏰ Temporal e Cronograma

### **Semestre Letivo**
Período acadêmico de aproximadamente 6 meses, durante o qual são ministradas as aulas.

**Estrutura típica:**
- **Semestre 1**: Março a Julho
- **Semestre 2**: Agosto a Dezembro
- **Semestre de verão**: Janeiro a Fevereiro (opcional)

### **Período (de um curso)**
Etapa de organização curricular que agrupa disciplinas que devem ser cursadas em um mesmo semestre.

**Exemplo:**
- 1º período, 2º período, 3º período...
- Aluno "do 4º período" = cursando disciplinas do 4º período

### **Período Letivo vs Período do Curso**
- **Período letivo**: Tempo calendário (2024/1, 2024/2)
- **Período do curso**: Etapa curricular (1º, 2º, 3º período)

### **Calendário Acadêmico**
Cronograma oficial que define datas importantes do ano letivo.

**Marcos importantes:**
- Início e fim de semestres
- Períodos de matrícula
- Semanas de prova
- Férias e recessos
- Colação de grau

### **Prazo de Matrícula**
Período específico durante o qual os alunos podem se matricular em disciplinas.

**Fases típicas:**
- **Matrícula prioritária**: Para alunos regulares
- **Matrícula adicional**: Para ajustes e disciplinas com vagas
- **Matrícula extraordinária**: Casos especiais

---

## 📊 Avaliação e Performance

### **IRA (Índice de Rendimento Acadêmico)**
Média ponderada das notas do aluno, considerando a carga horária das disciplinas.

**Cálculo:**
```
IRA = Σ(Nota × Créditos) / Σ(Créditos)
```

### **Coeficiente de Rendimento (CR)**
Similar ao IRA, pode variar entre instituições na forma de cálculo.

### **Conceito**
Sistema de avaliação usado por algumas universidades em substituição às notas numéricas.

**Escala típica:**
- **A**: Excelente (9,0-10,0)
- **B**: Bom (7,0-8,9)
- **C**: Regular (5,0-6,9)
- **D**: Insuficiente (3,0-4,9)
- **E**: Péssimo (0,0-2,9)

### **Aprovação**
Condição em que o aluno obtém nota/conceito suficiente e frequência mínima para ser considerado aprovado na disciplina.

**Critérios típicos:**
- Nota ≥ 6,0 (ou conceito C)
- Frequência ≥ 75%

### **Reprovação**
Condição em que o aluno não atende aos critérios de aprovação.

**Tipos:**
- **Reprovação por nota**: Nota insuficiente
- **Reprovação por falta**: Frequência < 75%

### **Dependência**
Situação em que o aluno pode cursar disciplinas de períodos posteriores mesmo tendo reprovações em períodos anteriores.

---

## 🎯 Planejamento Departamental

### **Plano Departamental**
Documento que define a oferta de disciplinas do departamento para um semestre específico.

**Conteúdo:**
- Lista de disciplinas oferecidas
- Número de turmas por disciplina
- Alocação de docentes
- Definição de horários e salas
- Estimativa de vagas por curso

### **Oferta de Disciplina**
Decisão de disponibilizar uma disciplina específica em um semestre.

**Fatores considerados:**
- Demanda histórica
- Disponibilidade de docentes
- Recursos necessários (laboratórios, equipamentos)
- Sequência curricular

### **Alocação de Docente**
Processo de designar professores para ministrar disciplinas específicas.

**Critérios:**
- **Competência técnica**: Conhecimento na área da disciplina
- **Carga horária disponível**: Limites de horas por semestre
- **Preferências**: Disciplinas que o docente prefere lecionar
- **Distribuição equilibrada**: Evitar sobrecarga

### **Co-docência**
Situação em que duas ou mais docentes compartilham a responsabilidade por uma turma.

**Aplicações:**
- Disciplinas interdisciplinares
- Grandes turmas
- Disciplinas com componentes teórico e prático distintos

### **Capacidade da Turma**
Número máximo de alunos que uma turma pode comportar.

**Fatores limitantes:**
- **Tamanho da sala**: Número de lugares disponíveis
- **Tipo de disciplina**: Laboratórios têm menor capacidade
- **Metodologia**: Aulas práticas exigem menor número de alunos
- **Recursos**: Equipamentos e materiais disponíveis

### **Distribuição de Vagas**
Processo de alocar as vagas disponíveis em uma turma entre diferentes cursos que dela necessitam.

**Critérios:**
- **Demanda histórica**: Quantos alunos de cada curso se matricularam anteriormente
- **Obrigatoriedade**: Disciplinas obrigatórias têm prioridade
- **Período recomendado**: Alunos no período "correto" têm preferência

### **Ajuste de Oferta**
Modificação no plano original baseada na demanda real observada durante o período de matrículas.

**Ações possíveis:**
- **Abertura de nova turma**: Se demanda exceder capacidade
- **Fechamento de turma**: Se demanda for insuficiente
- **Mudança de horário**: Para otimizar distribuição de alunos
- **Remanejamento de docente**: Para cobrir necessidades

---

<div align="center">

### 📚 Referências Acadêmicas

| Conceito | Regulamentação |
|----------|----------------|
| **LDB** | Lei de Diretrizes e Bases da Educação (Lei 9.394/96) |
| **SINAES** | Sistema Nacional de Avaliação da Educação Superior |
| **DCN** | Diretrizes Curriculares Nacionais |
| **ENADE** | Exame Nacional de Desempenho dos Estudantes |

---

### 🏛️ Contexto UFJF

**UFJF (Universidade Federal de Juiz de Fora)**
- Instituição federal de ensino superior
- Sistema semestral
- Múltiplos campus
- Graduação, pós-graduação, extensão e pesquisa

---

**📖 Glossário em constante evolução - Acompanha mudanças na legislação e práticas acadêmicas**

</div>