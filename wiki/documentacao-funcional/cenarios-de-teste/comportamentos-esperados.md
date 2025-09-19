# 🧪 Cenários de Teste e Comportamentos Esperados

## 📋 Sumário

- [📋 Sumário](#-sumário)
- [🎯 Objetivo](#-objetivo)
- [🏗️ Estrutura de Testes](#-estrutura-de-testes)
- [🏫 Gestão de Turmas - Cenários Detalhados](#-gestão-de-turmas---cenários-detalhados)
- [📚 Gestão de Disciplinas - Cenários Detalhados](#-gestão-de-disciplinas---cenários-detalhados)
- [🎓 Processo de Matrículas - Cenários Detalhados](#-processo-de-matrículas---cenários-detalhados)
- [🔄 Estados de Sistema](#-estados-de-sistema)
- [⚠️ Matriz de Falhas](#-matriz-de-falhas)

---

## 🎯 Objetivo

Esta documentação detalha **EXATAMENTE** como a aplicação deve se comportar em cada cenário, incluindo:

- ✅ **Cenários de Sucesso**: Fluxo normal esperado
- ❌ **Cenários de Erro**: Comportamentos quando algo dá errado
- 🔄 **Cenários de Fallback**: Como a aplicação se recupera
- ⚠️ **Estados Inconsistentes**: Como detectar bugs vs features
- 🧪 **Casos Limite**: Situações extremas ou incomuns

## 🏗️ Estrutura de Testes

Cada cenário segue o padrão:

```
🎯 CENÁRIO: [Nome do cenário]
📋 CONTEXTO: [Estado inicial do sistema]
⚡ AÇÃO: [O que o usuário faz]
✅ RESULTADO ESPERADO: [O que deve acontecer]
❌ POSSÍVEIS FALHAS: [O que pode dar errado]
🔄 FALLBACKS: [Como o sistema deve reagir]
🧪 COMO TESTAR: [Passos específicos para reproduzir]
```

---

## 🏫 Gestão de Turmas - Cenários Detalhados

### 1️⃣ Criação de Turma - Fluxo Normal

#### 🎯 CENÁRIO 1.1: Criação de Turma Básica com Sucesso

**📋 CONTEXTO:**
- Sistema online e responsivo
- Usuário logado como Coordenador
- Plano ativo existente (status = 'ativo')
- Pelo menos 1 disciplina cadastrada (status = 'ativa')
- Pelo menos 1 docente cadastrado (status = 'ativo')

**⚡ AÇÃO:**
1. Usuário acessa `/turmas/nova`
2. Seleciona disciplina: "DCC001 - INTRODUÇÃO À PROGRAMAÇÃO"
3. Digita letra: "A"
4. Seleciona turno: "MATUTINO"
5. Seleciona docente: "João Silva Santos"
6. Clica "Salvar & Ativar"

**✅ RESULTADO ESPERADO:**

```javascript
// 1. Validações em tempo real DEVEM passar:
- Campo disciplina: VÁLIDO
- Campo letra: VÁLIDO (verificação de unicidade retorna true)
- Campo turno: VÁLIDO
- Campo docente: VÁLIDO (carga horária suficiente)

// 2. Submissão do formulário:
POST /turmas
{
  "disciplinaId": 1,
  "letra": "A",
  "periodo": null,
  "turno1": "MATUTINO",
  "turno2": null,
  "docente1Id": 5,
  "docente2Id": null,
  "salaId": null,
  "horarioId": null,
  "planoId": 2024001,
  "status": "ativa"
}

// 3. Backend DEVE:
- Validar dados (200ms máximo)
- Criar registro na tabela Turma
- Gerar pedidos automáticos para cursos relacionados
- Emitir evento Socket.IO
- Retornar status 201

// 4. Resposta esperada:
{
  "success": true,
  "data": {
    "id": 123,
    "disciplina": { "codigo": "DCC001", "nome": "INTRODUÇÃO À PROGRAMAÇÃO" },
    "letra": "A",
    "periodo": null,
    "turno1": "MATUTINO",
    "docente1": { "nome": "JOÃO SILVA SANTOS", "apelido": "JOÃO SILVA" },
    "status": "ativa",
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "message": "Turma criada com sucesso"
}

// 5. Interface DEVE:
- Exibir toast verde: "Turma criada com sucesso"
- Redirecionar para /turmas após 2s
- Atualizar contadores no dashboard
- Emitir notificação Socket.IO para outros usuários
```

**🧪 COMO TESTAR:**
1. Limpar banco de dados de teste
2. Inserir dados mínimos (1 plano ativo, 1 disciplina, 1 docente)
3. Fazer login como coordenador
4. Seguir fluxo exato acima
5. Verificar se cada passo acontece conforme especificado

---

#### 🎯 CENÁRIO 1.2: Falha na Validação de Unicidade

**📋 CONTEXTO:**
- Sistema funcionando normalmente
- Usuário logado como Coordenador
- Já existe turma "DCC001-A" no plano ativo
- Usuário tenta criar nova turma "DCC001-A"

**⚡ AÇÃO:**
1. Acessa formulário de nova turma
2. Seleciona disciplina "DCC001"
3. Digita letra "A" e sai do campo (evento onBlur)

**✅ RESULTADO ESPERADO:**

```javascript
// 1. Validação em tempo real DEVE disparar:
GET /turmas/validar-unicidade?letra=A&disciplinaId=1&planoId=2024001

// 2. Backend DEVE retornar:
{
  "disponivel": false,
  "mensagem": "Já existe turma A para disciplina DCC001 no plano 2024/1",
  "turmaExistente": {
    "id": 45,
    "letra": "A",
    "docente": "Prof. Maria Silva"
  }
}

// 3. Interface DEVE:
- Campo letra fica vermelho (classe: 'is-invalid')
- Exibe mensagem: "Já existe turma A para disciplina DCC001 no plano 2024/1"
- Botão "Salvar" fica DESABILITADO
- Foco permanece no campo letra
- Não faz nova requisição se usuário digitar mesma letra novamente
```

**❌ POSSÍVEL FALHA:**
Se validação não disparar ou campo não ficar inválido = **BUG**

**🔄 FALLBACK:**
Se API de validação falhar:
```javascript
// Interface deve assumir conflito e mostrar:
"⚠️ Não foi possível verificar disponibilidade. Verifique se letra já existe."
```

**🧪 COMO TESTAR:**
1. Criar turma DCC001-A manualmente no banco
2. Tentar criar outra DCC001-A via interface
3. Verificar se campo fica inválido IMEDIATAMENTE ao sair do campo
4. Verificar se mensagem é exata
5. Verificar se botão fica desabilitado

---

#### 🎯 CENÁRIO 1.3: Sobrecarga de Docente

**📋 CONTEXTO:**
- Docente "João Silva" tem limite de 20 créditos
- Já possui 18 créditos alocados em outras turmas
- Disciplina DCC001 tem 6 créditos (4h teórica + 2h prática)
- Total seria 24 créditos (excede limite)

**⚡ AÇÃO:**
1. Seleciona disciplina DCC001 (6 créditos)
2. Seleciona docente "João Silva"
3. Sistema calcula carga em tempo real

**✅ RESULTADO ESPERADO:**

```javascript
// 1. Cálculo automático DEVE disparar:
GET /docentes/5/carga-atual
GET /disciplinas/1/carga-horaria

// 2. Cálculo DEVE ser:
cargaAtual = 18 créditos
cargaDisciplina = 6 créditos
novaCargatotal = 18 + 6 = 24 créditos
limite = 20 créditos
sobrecarga = 24 - 20 = 4 créditos

// 3. Interface DEVE exibir:
⚠️ WARNING (amarelo): "Docente ficará com sobrecarga: 24/20 créditos (+4 créditos excedentes)"

// 4. Comportamento esperado:
- Campo docente fica amarelo (warning, não erro)
- Botão "Salvar" PERMANECE HABILITADO (sobrecarga é permitida)
- Exibe tooltip explicativo: "Sobrecarga será reportada à coordenação"
- Se usuário tentar salvar, DEVE aparecer confirmação:
  "⚠️ Docente ficará sobrecarregado. Confirma a alocação?"
```

**❌ POSSÍVEL FALHA:**
Se cálculo der resultado diferente ou não aparecer warning = **BUG**

**🔄 FALLBACK:**
Se API de carga falhar:
```javascript
// Interface deve assumir carga OK e mostrar:
"⚠️ Não foi possível verificar carga do docente. Prosseguir por sua conta e risco."
```

---

#### 🎯 CENÁRIO 1.4: Falha de Conexão Durante Salvamento

**📋 CONTEXTO:**
- Formulário preenchido corretamente
- Todas as validações passaram
- Usuário clica "Salvar & Ativar"
- Conexão com servidor falha durante POST

**⚡ AÇÃO:**
1. Usuário clica "Salvar & Ativar"
2. Requisição POST /turmas inicia
3. Conexão é perdida ou servidor não responde

**✅ RESULTADO ESPERADO:**

```javascript
// 1. Interface DEVE imediatamente:
- Mostrar loading spinner no botão
- Desabilitar todos os campos do formulário
- Texto do botão vira "Salvando..."

// 2. Após timeout (30s), DEVE:
- Remover loading
- Reabilitar campos
- Texto do botão volta para "Salvar & Ativar"
- Exibir erro: "❌ Falha na conexão. Dados NÃO foram salvos. Tente novamente."

// 3. Dados do formulário DEVEM:
- Permanecer preenchidos (não perder dados)
- Manter todas as validações anteriores
- Permitir nova tentativa imediatamente

// 4. Logs DEVEM ser gerados:
console.error('[TURMA_CREATE] Network error:', error);
```

**❌ POSSÍVEL FALHA:**
- Se formulário for limpo após erro = **BUG**
- Se usuário perder dados digitados = **BUG**
- Se não exibir erro claro = **BUG**

**🔄 FALLBACK AUTOMÁTICO:**
```javascript
// Sistema DEVE tentar 3 vezes automaticamente:
try {
  await criarTurma(data);
} catch (error) {
  if (tentativas < 3) {
    setTimeout(() => tentarNovamente(), 1000 * tentativas);
  } else {
    exibirErroDefinitivo();
  }
}
```

---

### 2️⃣ Edição de Turma - Cenários Complexos

#### 🎯 CENÁRIO 2.1: Edição com Alunos Matriculados

**📋 CONTEXTO:**
- Turma DCC001-A existente com status "ativa"
- 25 alunos já matriculados na turma
- Coordenador tenta alterar docente de "Prof. João" para "Prof. Maria"

**⚡ AÇÃO:**
1. Clica "Editar" na turma DCC001-A
2. Altera campo docente para "Prof. Maria"
3. Clica "Salvar"

**✅ RESULTADO ESPERADO:**

```javascript
// 1. Sistema DEVE detectar impacto:
GET /turmas/123/impacto-alteracao
{
  "alunosMatriculados": 25,
  "permitido": true,
  "requerConfirmacao": true,
  "avisos": ["25 alunos matriculados serão notificados"]
}

// 2. Interface DEVE exibir modal:
┌─────────────────────────────────────────────┐
│ ⚠️ Confirmar Alteração                      │
├─────────────────────────────────────────────┤
│ Esta alteração afetará:                     │
│ • 25 alunos matriculados                    │
│ • Notificações serão enviadas               │
│ • Horário pode mudar                        │
│                                             │
│ Deseja continuar?                           │
│ ┌─────────────┐  ┌─────────────┐           │
│ │ Cancelar    │  │ Confirmar   │           │
│ └─────────────┘  └─────────────┘           │
└─────────────────────────────────────────────┘

// 3. Se confirmar, DEVE:
- Salvar alteração no banco
- Gerar log de alteração
- Enviar notificações para 25 alunos
- Exibir sucesso: "Docente alterado. 25 alunos foram notificados."
- Redirecionar para lista de turmas

// 4. Email para alunos DEVE conter:
Assunto: "Alteração no docente - DCC001 Turma A"
Corpo: "O docente da turma foi alterado de Prof. João Silva para Prof. Maria Santos..."
```

**❌ POSSÍVEIS FALHAS:**
- Se não detectar alunos matriculados = **BUG**
- Se não exibir confirmação = **BUG**
- Se notificações não forem enviadas = **BUG**

---

#### 🎯 CENÁRIO 2.2: Tentativa de Edição com Campos Bloqueados

**📋 CONTEXTO:**
- Turma com alunos matriculados
- Usuário tenta alterar código da disciplina (campo que deve estar bloqueado)

**⚡ AÇÃO:**
1. Acessa edição de turma com matriculas
2. Tenta alterar campo "disciplina" no formulário

**✅ RESULTADO ESPERADO:**

```javascript
// 1. Campo disciplina DEVE estar:
- Visualmente desabilitado (cinza)
- HTML: disabled="true"
- Com tooltip: "Não é possível alterar disciplina com alunos matriculados"

// 2. Se usuário tentar forçar via JavaScript:
- Backend DEVE rejeitar com erro 400
- Mensagem: "Campo disciplina não pode ser alterado para turma com matrículas"

// 3. Interface DEVE ignorar tentativas:
- Não permitir seleção no dropdown
- Não aceitar digitação
- Não enviar campo na requisição
```

**❌ FALHA CRÍTICA:**
Se campo for editável ou aceitar alteração = **BUG DE SEGURANÇA**

---

### 3️⃣ Gestão de Vagas - Cenários de Negócio

#### 🎯 CENÁRIO 3.1: Cálculo Automático de Vagas Baseado em Histórico

**📋 CONTEXTO:**
- Nova turma DCC001-A sendo criada
- Histórico dos últimos 3 semestres:
  - 2023/2: 28 matriculados
  - 2023/1: 32 matriculados
  - 2022/2: 25 matriculados
- Disciplina obrigatória com taxa de reprovação 15%

**⚡ AÇÃO:**
1. Sistema cria nova turma DCC001-A
2. Algoritmo automático calcula vagas

**✅ RESULTADO ESPERADO:**

```javascript
// 1. Cálculo DEVE ser executado:
const s1 = 28, s2 = 32, s3 = 25;
const mediaPonderada = (s1 * 0.5) + (s2 * 0.3) + (s3 * 0.2);
// mediaPonderada = 14 + 9.6 + 5 = 28.6

const fatorSazonalidade = 1.0; // semestre normal
const fatorReprovacao = 1.0;   // taxa < 30%
const fatorObrigatoria = 1.0;  // é obrigatória

const vagasSugeridas = Math.ceil(28.6 * 1.0 * 1.0 * 1.0) = 29 vagas

// 2. Distribuição automática DEVE ser:
const vagasPeriodizadas = Math.ceil(29 * 0.7) = 21 vagas
const vagasNaoPeriodizadas = 29 - 21 = 8 vagas

// 3. Pedidos DEVEM ser criados automaticamente:
INSERT INTO Pedido (TurmaId, CursoId, vagasPeriodizadas, vagasNaoPeriodizadas)
VALUES (123, 1, 21, 8) -- Ciência da Computação

// 4. Interface DEVE exibir:
"📊 Vagas calculadas automaticamente: 29 (21 periodizadas + 8 não-periodizadas)"
```

**❌ POSSÍVEL FALHA:**
Se cálculo der resultado diferente = **BUG NO ALGORITMO**

**🧪 COMO TESTAR:**
1. Inserir dados históricos exatos no banco
2. Criar turma nova
3. Verificar se cálculo é exatamente: Math.ceil(28.6) = 29
4. Verificar distribuição 70/30

---

#### 🎯 CENÁRIO 3.2: Ajuste Manual de Vagas com Validação de Capacidade

**📋 CONTEXTO:**
- Turma DCC001-A tem capacidade máxima de 40 alunos (definida pela sala)
- Pedidos atuais totalizam 35 vagas
- Coordenador tenta aumentar para 45 vagas (excede capacidade)

**⚡ AÇÃO:**
1. Acessa gestão de vagas da turma
2. Altera vagas de Ciência da Computação de 30 para 40
3. Total passa de 35 para 45 vagas
4. Clica "Salvar"

**✅ RESULTADO ESPERADO:**

```javascript
// 1. Validação DEVE disparar:
const totalVagas = 45;
const capacidadeMaxima = 40;
const excesso = 45 - 40 = 5 vagas;

// 2. Sistema DEVE rejeitar:
{
  "success": false,
  "error": "CAPACITY_EXCEEDED",
  "message": "Total de vagas (45) excede capacidade da sala (40)",
  "details": {
    "totalVagas": 45,
    "capacidadeMaxima": 40,
    "excesso": 5
  }
}

// 3. Interface DEVE:
- Campo ficar vermelho
- Exibir erro: "❌ Total de vagas (45) excede capacidade da sala (40)"
- Sugerir: "Reduza em 5 vagas ou altere para sala maior"
- Botão "Salvar" ficar desabilitado
- Valores retornarem ao estado anterior automaticamente
```

**❌ POSSÍVEL FALHA:**
Se sistema aceitar vagas acima da capacidade = **BUG CRÍTICO**

---

## 📚 Gestão de Disciplinas - Cenários Detalhados

### 4️⃣ Validação de Dependências Circulares

#### 🎯 CENÁRIO 4.1: Detecção de Dependência Circular Simples

**📋 CONTEXTO:**
- DCC001 → pré-requisito: nenhum
- DCC002 → pré-requisito: DCC001
- Usuário tenta fazer DCC001 → pré-requisito: DCC002 (criaria ciclo)

**⚡ AÇÃO:**
1. Edita disciplina DCC001
2. Tenta adicionar DCC002 como pré-requisito
3. Clica "Adicionar pré-requisito"

**✅ RESULTADO ESPERADO:**

```javascript
// 1. Sistema DEVE executar algoritmo de detecção:
POST /disciplinas/verificar-ciclo
{
  "disciplinaAtual": 1,      // DCC001
  "novoPreRequisito": 2,     // DCC002
  "preRequisitosExistentes": []
}

// 2. Algoritmo DFS DEVE detectar:
grafo = {
  1: [2],    // DCC001 → DCC002
  2: [1]     // DCC002 → DCC001 (já existe)
}
// CICLO DETECTADO: 1 → 2 → 1

// 3. Resposta DEVE ser:
{
  "temCiclo": true,
  "caminhoCiclo": ["DCC001", "DCC002", "DCC001"],
  "mensagem": "Esta adição criaria dependência circular: DCC001 → DCC002 → DCC001"
}

// 4. Interface DEVE:
- NÃO adicionar DCC002 à lista
- Exibir erro vermelho: "❌ Dependência circular detectada: DCC001 → DCC002 → DCC001"
- Destacar o caminho do ciclo
- Campo de seleção voltar para "Selecione..."
```

**❌ FALHA CRÍTICA:**
Se dependência circular for aceita = **BUG DE LÓGICA GRAVE**

**🧪 COMO TESTAR:**
1. Criar DCC001 sem pré-requisitos
2. Criar DCC002 com pré-requisito DCC001
3. Tentar adicionar DCC002 como pré-requisito de DCC001
4. Verificar se erro é exibido IMEDIATAMENTE

---

#### 🎯 CENÁRIO 4.2: Dependência Circular Complexa (3+ disciplinas)

**📋 CONTEXTO:**
- DCC001 → pré-req: nenhum
- DCC002 → pré-req: DCC001
- DCC003 → pré-req: DCC002
- Usuário tenta fazer DCC001 → pré-req: DCC003 (ciclo: 1→3→2→1)

**⚡ AÇÃO:**
Tenta adicionar DCC003 como pré-requisito de DCC001

**✅ RESULTADO ESPERADO:**

```javascript
// Algoritmo DEVE detectar caminho:
// DCC001 → DCC003 → DCC002 → DCC001 (ciclo de 3 elementos)

{
  "temCiclo": true,
  "caminhoCiclo": ["DCC001", "DCC003", "DCC002", "DCC001"],
  "tamanhoRodilha": 3,
  "disciplinasAfetadas": ["DCC001", "DCC002", "DCC003"]
}

// Interface deve mostrar diagrama visual:
DCC001 ──→ DCC003
  ↑           ↓
  └── DCC002 ←─┘
```

---

### 5️⃣ Sistema de Competências Docentes

#### 🎯 CENÁRIO 5.1: Cálculo Automático de Competência com Base em Histórico

**📋 CONTEXTO:**
- Prof. João Silva nunca lecionou DCC001
- Tem formação em Ciência da Computação (área específica)
- 8 anos de experiência docente
- Avaliação média dos alunos: 4.2/5.0
- Nenhuma capacitação específica na área

**⚡ AÇÃO:**
Sistema calcula competência automaticamente

**✅ RESULTADO ESPERADO:**

```javascript
// Cálculo detalhado DEVE ser:
let score = 0;
const evidencias = [];

// 1. Experiência específica (peso 40%):
const experienciaEspecifica = 0; // nunca lecionou
score += 0;
evidencias.push("⚠️ Primeira vez nesta disciplina");

// 2. Formação acadêmica (peso 20%):
const areaCompativel = "especifica"; // Ciência da Computação
score += 20;
evidencias.push("✅ Formação específica na área");

// 3. Avaliação dos alunos (peso 25%):
const avaliacaoNormalizada = Math.max(0, Math.min(1, (4.2 - 2) / 3)) = 0.73;
score += 25 * 0.73 = 18.25;
evidencias.push("✅ Boa avaliação: 4.2/5.0");

// 4. Experiência geral (peso 10%):
const experienciaNormalizada = Math.min(1, 8 / 10) = 0.8;
score += 10 * 0.8 = 8;
evidencias.push("✅ 8 anos de experiência");

// 5. Capacitações (peso 5%):
score += 0; // nenhuma capacitação
evidencias.push("⚠️ Sem capacitações específicas");

// Score final: 0 + 20 + 18.25 + 8 + 0 = 46.25 ≈ 46 pontos

// 6. Determinar nível:
// 46 está entre 45-65, logo: APTO
const nivel = "APTO";

// 7. Resultado DEVE ser:
{
  "nivel": "APTO",
  "score": 46,
  "evidencias": [
    "⚠️ Primeira vez nesta disciplina",
    "✅ Formação específica na área",
    "✅ Boa avaliação: 4.2/5.0",
    "✅ 8 anos de experiência",
    "⚠️ Sem capacitações específicas"
  ],
  "sugerido": true,
  "dataCalculo": "2024-01-15T10:30:00Z"
}
```

**❌ POSSÍVEL FALHA:**
Qualquer variação no cálculo acima = **BUG NO ALGORITMO**

---

## 🎓 Processo de Matrículas - Cenários Críticos

### 6️⃣ Algoritmo de Priorização Complexo

#### 🎯 CENÁRIO 6.1: Cálculo de Prioridade com Múltiplos Fatores

**📋 CONTEXTO:**
- Aluno: João Silva, CC 2020, 7º semestre
- IRA: 8.5
- Tempo no curso: 4 anos (entrou em 2020)
- Disciplina: DCC401 (7º período recomendado)
- Solicitação feita em 01/12/2023 08:30
- Abertura do período: 01/12/2023 08:00
- Situação especial: Formando

**⚡ AÇÃO:**
Sistema calcula prioridade para alocação de vaga

**✅ RESULTADO ESPERADO:**

```javascript
// Cálculo detalhado DEVE ser:
const pesos = {
  periodoCorreto: 0.40,      // 40%
  ira: 0.25,                 // 25%
  tempoNoCurso: 0.15,        // 15%
  situacaoEspecial: 0.10,    // 10%
  ordemSolicitacao: 0.05     // 5%
};

// 1. Período correto (40%):
// Disciplina do 7º período, aluno no 7º semestre
const scorePeriodoCorreto = 1.0; // período exato
scoreDetalhado.periodoCorreto = 1.0;

// 2. IRA (25%):
// IRA 8.5, função sigmóide: 1 / (1 + exp(-(8.5 - 6) * 1.5))
const scoreIRA = 1 / (1 + Math.exp(-(8.5 - 6) * 1.5)) = 0.95;
scoreDetalhado.ira = 0.95;

// 3. Tempo no curso (15%):
// 4 anos = 8 semestres, curso de 8 semestres (CC)
const proporcaoTempo = 8 / 8 = 1.0;
const scoreTempoNoCurso = 0.9; // aluno no tempo esperado
scoreDetalhado.tempoNoCurso = 0.9;

// 4. Situação especial (10%):
const isFormando = true;
let scoreSituacaoEspecial = 0.5; // base
scoreSituacaoEspecial += 0.4;    // formando
scoreDetalhado.situacaoEspecial = 0.9;

// 5. Ordem de solicitação (5%):
// 30 minutos após abertura = 0.5h
const horasDesdeAbertura = 0.5;
const scoreOrdemSolicitacao = Math.max(0, 1 - (0.5 / (7 * 24))) = 0.996;
scoreDetalhado.ordemSolicitacao = 0.996;

// Score final ponderado:
const scoreFinal =
  (1.0 * 0.40) +     // período correto
  (0.95 * 0.25) +    // IRA
  (0.9 * 0.15) +     // tempo no curso
  (0.9 * 0.10) +     // situação especial
  (0.996 * 0.05);    // ordem solicitação

// scoreFinal = 0.40 + 0.2375 + 0.135 + 0.09 + 0.0498 = 0.9123
// Em escala 0-100: 91.23 ≈ 91 pontos

// Categoria: score >= 80 = "MAXIMA"

// 7. Resultado DEVE ser:
{
  "scoreFinal": 91,
  "categoria": "MAXIMA",
  "detalhamento": {
    "periodoCorreto": 1.0,
    "ira": 0.95,
    "tempoNoCurso": 0.9,
    "situacaoEspecial": 0.9,
    "ordemSolicitacao": 0.996
  },
  "explicacao": [
    "✅ Disciplina no período correto (7º)",
    "✅ IRA excelente (8.5)",
    "✅ Tempo adequado no curso (8/8 semestres)",
    "🎓 Aluno formando (prioridade máxima)",
    "✅ Solicitação feita rapidamente (30min após abertura)"
  ]
}
```

**❌ FALHA CRÍTICA:**
Qualquer variação no cálculo = **BUG NO ALGORITMO DE PRIORIDADE**

---

#### 🎯 CENÁRIO 6.2: Processamento de Fila com Múltiplas Prioridades

**📋 CONTEXTO:**
- Disciplina DCC401 tem 30 vagas
- 45 pedidos recebidos
- Alunos com diferentes prioridades:
  - 3 alunos MAXIMA (scores: 91, 89, 87)
  - 8 alunos ALTA (scores: 75-84)
  - 15 alunos MEDIA (scores: 50-65)
  - 19 alunos BAIXA (scores: 35-49)

**⚡ AÇÃO:**
Sistema processa alocação automática

**✅ RESULTADO ESPERADO:**

```javascript
// 1. Ordenação DEVE ser por score decrescente:
const pedidosOrdenados = [
  { alunoId: 101, score: 91, nome: "João Silva" },      // MAXIMA
  { alunoId: 102, score: 89, nome: "Maria Santos" },    // MAXIMA
  { alunoId: 103, score: 87, nome: "Pedro Costa" },     // MAXIMA
  { alunoId: 104, score: 84, nome: "Ana Silva" },       // ALTA
  // ... continuando em ordem decrescente
  { alunoId: 145, score: 35, nome: "Carlos Lima" }      // BAIXA (último)
];

// 2. Alocação DEVE seguir ordem estrita:
// Vagas 1-30: primeiros 30 da lista ordenada
// Lista de espera: posições 31-45

// 3. Resultado DEVE ser:
const resultado = {
  aprovados: [
    { alunoId: 101, vaga: 1, prioridade: "MAXIMA" },
    { alunoId: 102, vaga: 2, prioridade: "MAXIMA" },
    // ... até 30
    { alunoId: 130, vaga: 30, prioridade: "MEDIA" }
  ],
  listaEspera: [
    { alunoId: 131, posicao: 1, prioridade: "MEDIA" },
    { alunoId: 132, posicao: 2, prioridade: "MEDIA" },
    // ... até 15
    { alunoId: 145, posicao: 15, prioridade: "BAIXA" }
  ]
};

// 4. Verificação de integridade:
- Todos os MAXIMA devem estar aprovados ✓
- Nenhum BAIXA deve estar aprovado se há ALTA na lista de espera ✓
- Ordem dentro da mesma categoria deve ser por score ✓
```

**❌ FALHAS CRÍTICAS:**
- Se aluno BAIXA for aprovado antes de ALTA = **BUG GRAVE**
- Se ordem não for respeitada = **BUG NO ALGORITMO**

---

### 7️⃣ Sistema de Redistribuição Inteligente

#### 🎯 CENÁRIO 7.1: Redistribuição por Desequilíbrio de Demanda

**📋 CONTEXTO:**
- DCC401 Turma A: 50 pedidos, 30 vagas (déficit: 20)
- DCC401 Turma B: 15 pedidos, 30 vagas (excesso: 15)
- Ambas as turmas são idênticas (mesmo horário, mesmo docente)

**⚡ AÇÃO:**
Sistema executa algoritmo de balanceamento

**✅ RESULTADO ESPERADO:**

```javascript
// 1. Detecção de desequilíbrio:
const turmaA = { pedidos: 50, vagas: 30, razao: 50/30 = 1.67 };
const turmaB = { pedidos: 15, vagas: 30, razao: 15/30 = 0.50 };
const desequilibrio = Math.abs(1.67 - 0.50) = 1.17 > 0.3; // DESEQUILIBRADO

// 2. Cálculo de redistribuição ideal:
const totalPedidos = 50 + 15 = 65;
const totalVagas = 30 + 30 = 60;
const distribuicaoIdeal = totalPedidos / 2 = 32.5;

// Redistribuição sugerida:
const novaDistribuicaoA = Math.min(32, 30) = 30; // mantém limite da sala
const novaDistribuicaoB = Math.min(33, 30) = 30; // mantém limite da sala

// 3. Como não é possível redistribuir vagas (salas cheias),
//    o sistema DEVE sugerir:
{
  "tipo": "NOVA_TURMA_NECESSARIA",
  "motivo": "Demanda (65) excede capacidade total (60)",
  "sugestoes": [
    "Abrir DCC401 Turma C com 20 vagas",
    "Aumentar capacidade das salas existentes"
  ],
  "impacto": {
    "alunosNaoAtendidos": 5,
    "listaEsperaTotalAtual": 15
  }
}

// 4. Interface DEVE exibir:
"⚠️ Demanda alta detectada para DCC401.
Recomenda-se abrir nova turma ou aumentar capacidade das salas."
```

---

#### 🎯 CENÁRIO 7.2: Redistribuição com Preferências de Horário

**📋 CONTEXTO:**
- DCC401 Turma A (Manhã): 35 pedidos, 30 vagas
- DCC401 Turma B (Noite): 20 pedidos, 30 vagas
- 15 alunos da Turma A marcaram "aceito realocação"
- 5 alunos têm restrição de horário (trabalham de dia)

**⚡ AÇÃO:**
Sistema tenta redistribuir considerando preferências

**✅ RESULTADO ESPERADO:**

```javascript
// 1. Análise de elegibilidade para redistribuição:
const elegiveisRealocacao = alunosDeficit.filter(aluno => {
  return aluno.aceitaRealocacao && !aluno.restricaoHorario;
});
// Resultado: 10 alunos elegíveis (15 - 5 com restrição)

// 2. Cálculo de redistribuição:
const deficitTurmaA = 35 - 30 = 5;
const excessoTurmaB = 30 - 20 = 10;
const podeRealimar = Math.min(deficitTurmaA, excessoTurmaB, elegiveisRealocacao.length);
// podeReallocar = min(5, 10, 10) = 5 alunos

// 3. Seleção dos 5 alunos para realocar:
// Critério: menores prioridades primeiro (preservar altas prioridades na turma preferida)
const alunosParaRealocar = elegiveisRealocacao
  .sort((a, b) => a.prioridadeScore - b.prioridadeScore)
  .slice(0, 5);

// 4. Resultado da redistribuição:
const redistribuicao = {
  turmaA: { vagasApos: 30, pedidosApos: 30 },  // balanceada
  turmaB: { vagasApos: 25, pedidosApos: 25 },  // balanceada
  alunosRealocados: 5,
  alunosNotificados: 5
};

// 5. Notificações DEVEM ser enviadas:
alunosParaRealocar.forEach(aluno => {
  enviarEmail(aluno.email, {
    assunto: "Realocação de turma - DCC401",
    corpo: `Você foi realocado da Turma A (manhã) para Turma B (noite)
            conforme sua indicação de aceitar realocação.`
  });
});
```

**🧪 COMO TESTAR:**
1. Criar cenário com desequilíbrio específico
2. Marcar exatamente 15 alunos como "aceita realocação"
3. Marcar 5 com restrição de horário
4. Executar redistribuição
5. Verificar se exatamente 5 foram realocados
6. Verificar se foram os de menor prioridade

---

## 🔄 Estados de Sistema

### 8️⃣ Máquina de Estados para Turma

#### 🎯 CENÁRIO 8.1: Transições de Estado Válidas

**📋 CONTEXTO:**
Estados possíveis: `rascunho` → `ativa` → `cancelada` → `concluida`

**⚡ TRANSIÇÕES VÁLIDAS:**

```javascript
const transicaoesPermitidas = {
  'rascunho': ['ativa', 'cancelada'],
  'ativa': ['cancelada', 'concluida'],
  'cancelada': [],  // estado final
  'concluida': []   // estado final
};

// CENÁRIO 8.1a: rascunho → ativa
const turma = { id: 1, status: 'rascunho' };
const resultado = await alterarStatus(1, 'ativa');
// DEVE retornar: { success: true, statusAnterior: 'rascunho', statusNovo: 'ativa' }

// CENÁRIO 8.1b: rascunho → cancelada
const resultado2 = await alterarStatus(1, 'cancelada');
// DEVE retornar: { success: true, statusAnterior: 'rascunho', statusNovo: 'cancelada' }

// CENÁRIO 8.1c: ativa → concluida
const turmaAtiva = { id: 2, status: 'ativa' };
const resultado3 = await alterarStatus(2, 'concluida');
// DEVE retornar: { success: true, statusAnterior: 'ativa', statusNovo: 'concluida' }
```

**✅ COMPORTAMENTO ESPERADO:**
- Transições válidas são aceitas
- Log de transição é criado
- Timestamps são atualizados
- Eventos Socket.IO são emitidos

---

#### 🎯 CENÁRIO 8.2: Transições de Estado Inválidas

**⚡ TRANSIÇÕES INVÁLIDAS:**

```javascript
// CENÁRIO 8.2a: cancelada → ativa (INVÁLIDO)
const turmaCancelada = { id: 3, status: 'cancelada' };
const resultado = await alterarStatus(3, 'ativa');

// DEVE retornar erro:
{
  "success": false,
  "error": "INVALID_TRANSITION",
  "message": "Transição inválida: cancelada → ativa não é permitida",
  "estadoAtual": "cancelada",
  "estadoTentado": "ativa",
  "transicoesPossiveis": []
}

// CENÁRIO 8.2b: concluida → rascunho (INVÁLIDO)
const turmaConcluida = { id: 4, status: 'concluida' };
const resultado2 = await alterarStatus(4, 'rascunho');

// DEVE retornar erro similar com:
"message": "Transição inválida: concluida → rascunho não é permitida"
```

**❌ FALHA CRÍTICA:**
Se transição inválida for aceita = **BUG DE LÓGICA GRAVE**

---

### 9️⃣ Estados de Matrícula e Consistência

#### 🎯 CENÁRIO 9.1: Verificação de Consistência de Dados

**📋 CONTEXTO:**
- Aluno tem matrícula "confirmada" em DCC001
- Sistema verifica se turma correspondente existe e está ativa

**⚡ AÇÃO:**
Executar verificação de integridade

**✅ RESULTADO ESPERADO:**

```javascript
// Query de verificação DEVE executar:
SELECT
  m.id as matriculaId,
  m.status as statusMatricula,
  t.id as turmaId,
  t.status as statusTurma,
  CASE
    WHEN t.status != 'ativa' THEN 'INCONSISTENTE'
    WHEN t.id IS NULL THEN 'TURMA_NAO_EXISTE'
    ELSE 'CONSISTENTE'
  END as situacao
FROM Matricula m
LEFT JOIN Turma t ON t.id = m.TurmaId
WHERE m.status = 'confirmada'
AND (t.status != 'ativa' OR t.id IS NULL);

// Se retornar registros, sistema DEVE:
{
  "inconsistenciasDetectadas": [
    {
      "matriculaId": 123,
      "alunoNome": "João Silva",
      "problema": "TURMA_CANCELADA",
      "descricao": "Aluno matriculado em turma cancelada",
      "acaoRecomendada": "Cancelar matrícula ou realocar para turma ativa"
    }
  ],
  "totalInconsistencias": 1,
  "acaoAutomatica": "NOTIFICAR_COORDENACAO"
}

// Interface DEVE exibir alerta:
"⚠️ 1 inconsistência detectada no sistema. Verificar relatório de integridade."
```

**❌ FALHA CRÍTICA:**
Se inconsistências não forem detectadas = **BUG DE INTEGRIDADE**

---

## ⚠️ Matriz de Falhas

### 🚨 Cenários de Falha Crítica

| **Cenário** | **Comportamento Esperado** | **Comportamento de Bug** | **Severidade** |
|-------------|---------------------------|-------------------------|----------------|
| Dependência circular aceita | Sistema rejeita com erro claro | Aceita dependência, quebra pré-requisitos | 🔴 CRÍTICA |
| Vaga acima da capacidade | Sistema rejeita, sugere alternativas | Aceita, causa superlotação | 🔴 CRÍTICA |
| Transição de estado inválida | Sistema rejeita com erro | Aceita transição, dados inconsistentes | 🔴 CRÍTICA |
| Prioridade calculada errada | Fórmula matemática exata | Cálculo diferente do esperado | 🟡 ALTA |
| Validação de unicidade falhando | Campo fica inválido em tempo real | Aceita duplicata | 🟡 ALTA |
| Notificações não enviadas | Email/SMS enviado para todos afetados | Usuários não são informados | 🟡 ALTA |
| Dados perdidos em erro de rede | Formulário mantém dados, permite retry | Formulário limpo, dados perdidos | 🟡 MÉDIA |
| Loading spinner não aparece | Interface mostra feedback visual | Usuário não sabe se ação está processando | 🟢 BAIXA |

### 🔧 Scripts de Teste Automatizado

```javascript
// Script para validar comportamentos críticos
describe('Comportamentos Críticos', () => {

  test('CRÍTICO: Dependência circular deve ser rejeitada', async () => {
    // Arrange
    await criarDisciplina('DCC001', []);
    await criarDisciplina('DCC002', ['DCC001']);

    // Act
    const resultado = await adicionarPreRequisito('DCC001', 'DCC002');

    // Assert
    expect(resultado.sucesso).toBe(false);
    expect(resultado.erro).toContain('dependência circular');
    expect(resultado.caminhoCiclo).toEqual(['DCC001', 'DCC002', 'DCC001']);
  });

  test('CRÍTICO: Vagas não podem exceder capacidade da sala', async () => {
    // Arrange
    const sala = await criarSala({ capacidade: 40 });
    const turma = await criarTurma({ salaId: sala.id });

    // Act
    const resultado = await definirVagas(turma.id, 45);

    // Assert
    expect(resultado.sucesso).toBe(false);
    expect(resultado.erro).toBe('CAPACITY_EXCEEDED');
    expect(resultado.excesso).toBe(5);
  });

  test('ALTA: Cálculo de prioridade deve ser exato', async () => {
    // Arrange
    const aluno = criarAlunoMock({
      ira: 8.5,
      tempoNoCurso: 8,
      formando: true,
      periodoAtual: 7
    });
    const disciplina = criarDisciplinaMock({ periodoRecomendado: 7 });

    // Act
    const prioridade = calcularPrioridade(aluno, disciplina);

    // Assert
    expect(prioridade.scoreFinal).toBe(91); // Exato conforme cálculo documentado
    expect(prioridade.categoria).toBe('MAXIMA');
  });

});
```

---

<div align="center">

### 🎯 Conclusão

Esta documentação detalha **EXATAMENTE** como sua aplicação deve se comportar em cada situação. Use-a como:

✅ **Especificação de Testes**: Cada cenário pode virar um teste automatizado
✅ **Detecção de Bugs**: Compare comportamento real vs esperado
✅ **Documentação de Falhas**: Identifique o que é bug vs feature
✅ **Guia de Debug**: Entenda onde procurar quando algo der errado

---

**📝 Documento extremamente detalhado - Para identificação precisa de bugs vs features**

</div>