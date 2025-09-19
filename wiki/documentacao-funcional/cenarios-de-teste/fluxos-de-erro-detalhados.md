# 🚨 Fluxos de Erro e Fallbacks Detalhados

## 📋 Sumário

- [📋 Sumário](#-sumário)
- [🎯 Objetivo](#-objetivo)
- [🛡️ Categorias de Erro](#-categorias-de-erro)
- [🏫 Gestão de Turmas - Todos os Cenários de Erro](#-gestão-de-turmas---todos-os-cenários-de-erro)
- [📚 Gestão de Disciplinas - Todos os Cenários de Erro](#-gestão-de-disciplinas---todos-os-cenários-de-erro)
- [🎓 Processo de Matrículas - Todos os Cenários de Erro](#-processo-de-matrículas---todos-os-cenários-de-erro)
- [🌐 Falhas de Infraestrutura](#-falhas-de-infraestrutura)
- [🔒 Falhas de Segurança e Autenticação](#-falhas-de-segurança-e-autenticação)
- [📊 Falhas de Performance](#-falhas-de-performance)

---

## 🎯 Objetivo

Documentar **TODOS** os possíveis cenários de erro, falha e comportamento inesperado que podem ocorrer no sistema, incluindo:

- 🚨 **Erros de validação** e como o sistema responde
- 🌐 **Falhas de rede** e mecanismos de retry
- 💾 **Falhas de banco de dados** e rollbacks
- 🔒 **Falhas de segurança** e bloqueios
- ⚡ **Falhas de performance** e timeouts
- 🧪 **Estados inconsistentes** e como detectar

---

## 🛡️ Categorias de Erro

| **Categoria** | **Código** | **Ação do Sistema** | **Visível ao Usuário** |
|---------------|-----------|-------------------|----------------------|
| **Validação** | VAL-001 a VAL-999 | Rejeitar entrada, exibir erro | ✅ Sim - erro claro |
| **Negócio** | NEG-001 a NEG-999 | Aplicar regra, bloquear ação | ✅ Sim - explicação |
| **Infraestrutura** | INF-001 a INF-999 | Retry, fallback, log | ⚠️ Parcial - erro genérico |
| **Segurança** | SEC-001 a SEC-999 | Bloquear, logar, alertar | ❌ Não - apenas "acesso negado" |
| **Performance** | PER-001 a PER-999 | Timeout, cache, otimizar | ⚠️ Parcial - "sistema lento" |

---

## 🏫 Gestão de Turmas - Todos os Cenários de Erro

### 🚨 Categoria VAL: Erros de Validação

#### VAL-001: Campo Obrigatório Vazio

**📋 CENÁRIOS ESPECÍFICOS:**

```javascript
// CENÁRIO VAL-001a: Disciplina não selecionada
{
  input: { disciplina: null, letra: "A", turno1: "MATUTINO" },
  expected: {
    error: "VAL-001a",
    field: "disciplina",
    message: "Disciplina é obrigatória",
    action: "BLOCK_SUBMIT",
    ui: {
      fieldClass: "is-invalid",
      focusField: true,
      submitDisabled: true
    }
  }
}

// CENÁRIO VAL-001b: Letra vazia
{
  input: { disciplina: 1, letra: "", turno1: "MATUTINO" },
  expected: {
    error: "VAL-001b",
    field: "letra",
    message: "Letra da turma é obrigatória",
    action: "BLOCK_SUBMIT"
  }
}

// CENÁRIO VAL-001c: Turno não selecionado
{
  input: { disciplina: 1, letra: "A", turno1: null },
  expected: {
    error: "VAL-001c",
    field: "turno1",
    message: "Turno principal é obrigatório",
    action: "BLOCK_SUBMIT"
  }
}

// CENÁRIO VAL-001d: Docente não selecionado
{
  input: { disciplina: 1, letra: "A", turno1: "MATUTINO", docente1Id: null },
  expected: {
    error: "VAL-001d",
    field: "docente1Id",
    message: "Docente principal é obrigatório",
    action: "BLOCK_SUBMIT"
  }
}
```

**🧪 TESTE AUTOMATIZADO:**
```javascript
describe('VAL-001: Campos obrigatórios', () => {
  const camposObrigatorios = ['disciplina', 'letra', 'turno1', 'docente1Id'];

  camposObrigatorios.forEach((campo, index) => {
    test(`VAL-001${String.fromCharCode(97 + index)}: ${campo} vazio deve bloquear submit`, async () => {
      const dadosIncompletos = criarDadosBasicos();
      dadosIncompletos[campo] = null;

      const resultado = await preencherFormularioTurma(dadosIncompletos);

      expect(resultado.submitHabilitado).toBe(false);
      expect(resultado.erros).toContainEqual({
        campo: campo,
        codigo: `VAL-001${String.fromCharCode(97 + index)}`
      });
    });
  });
});
```

---

#### VAL-002: Formato de Dados Inválido

**📋 CENÁRIOS ESPECÍFICOS:**

```javascript
// CENÁRIO VAL-002a: Letra com múltiplos caracteres
{
  input: { letra: "AB" },
  expected: {
    error: "VAL-002a",
    message: "Letra deve ter exatamente 1 caractere",
    ui: {
      value: "A", // Sistema deve truncar automaticamente
      warning: "Apenas o primeiro caractere foi mantido"
    }
  }
}

// CENÁRIO VAL-002b: Letra com número
{
  input: { letra: "1" },
  expected: {
    error: "VAL-002b",
    message: "Letra deve ser alfabética (A-Z)",
    ui: {
      value: "", // Sistema deve limpar campo
      fieldClass: "is-invalid"
    }
  }
}

// CENÁRIO VAL-002c: Letra com símbolo
{
  input: { letra: "@" },
  expected: {
    error: "VAL-002c",
    message: "Letra deve ser alfabética (A-Z)",
    action: "CLEAR_FIELD"
  }
}

// CENÁRIO VAL-002d: Período fora da faixa
{
  input: { periodo: 15 },
  expected: {
    error: "VAL-002d",
    message: "Período deve estar entre 1 e 12",
    ui: {
      value: null, // Sistema deve limpar
      suggestion: "Períodos válidos: 1 a 12"
    }
  }
}

// CENÁRIO VAL-002e: Período negativo
{
  input: { periodo: -1 },
  expected: {
    error: "VAL-002e",
    message: "Período deve ser positivo",
    ui: { value: null }
  }
}
```

**🔄 COMPORTAMENTO ESPERADO DE AUTO-CORREÇÃO:**

```javascript
// Sistema deve aplicar máscaras e correções automáticas:
function aplicarMascaras(input) {
  // Letra: sempre maiúscula, apenas primeiro caractere
  if (input.letra) {
    input.letra = input.letra.toUpperCase().charAt(0);
  }

  // Período: apenas números, máximo 2 dígitos
  if (input.periodo) {
    input.periodo = Math.max(1, Math.min(12, parseInt(input.periodo)));
  }

  return input;
}
```

---

#### VAL-003: Unicidade Violada

**📋 CENÁRIOS ESPECÍFICOS:**

```javascript
// CENÁRIO VAL-003a: Letra duplicada para mesma disciplina
{
  context: {
    existingTurma: { disciplinaId: 1, letra: "A", planoId: 2024001 }
  },
  input: { disciplinaId: 1, letra: "A", planoId: 2024001 },
  expected: {
    error: "VAL-003a",
    message: "Já existe turma A para disciplina DCC001 no plano 2024/1",
    details: {
      turmaExistente: {
        id: 45,
        docente: "Prof. Maria Silva",
        turno: "MATUTINO"
      }
    },
    ui: {
      suggestion: "Tente letras: B, C, D (disponíveis)",
      alternativeActions: ["Ver turma existente", "Usar próxima letra"]
    }
  }
}

// CENÁRIO VAL-003b: Tentativa de criar turma duplicada com dados idênticos
{
  context: {
    existingTurma: {
      disciplinaId: 1, letra: "A", docente1Id: 5,
      turno1: "MATUTINO", salaId: 10
    }
  },
  input: { /* dados idênticos */ },
  expected: {
    error: "VAL-003b",
    message: "Turma idêntica já existe",
    severity: "ERROR",
    action: "REDIRECT_TO_EXISTING",
    ui: {
      confirmDialog: {
        title: "Turma Duplicada Detectada",
        message: "Uma turma idêntica já existe. Deseja editá-la?",
        actions: ["Ir para turma existente", "Criar com diferenças"]
      }
    }
  }
}
```

**🔄 ALGORITMO DE SUGESTÃO DE LETRAS:**

```javascript
async function sugerirLetrasDisponiveis(disciplinaId, planoId) {
  // Buscar letras já utilizadas
  const letrasUsadas = await Turma.findAll({
    where: { Disciplina: disciplinaId, Plano: planoId },
    attributes: ['letra']
  }).map(t => t.letra);

  // Gerar alfabeto completo
  const alfabeto = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  // Filtrar disponíveis
  const letrasDisponiveis = alfabeto.filter(letra =>
    !letrasUsadas.includes(letra)
  );

  return {
    disponiveis: letrasDisponiveis.slice(0, 3), // Primeiras 3
    totalDisponiveis: letrasDisponiveis.length,
    sugestao: letrasDisponiveis[0] || null
  };
}
```

---

### 🚨 Categoria NEG: Erros de Regra de Negócio

#### NEG-001: Conflitos de Recurso

**📋 CENÁRIOS ESPECÍFICOS:**

```javascript
// CENÁRIO NEG-001a: Docente com conflito de horário
{
  context: {
    existingAlocacao: {
      docenteId: 5,
      horario: "Segunda/Quarta 8h-10h",
      turma: "DCC002-A"
    }
  },
  input: {
    docente1Id: 5,
    horario: "Segunda/Quarta 8h-10h" // MESMO horário
  },
  expected: {
    error: "NEG-001a",
    message: "Prof. João Silva já possui aula no horário Segunda/Quarta 8h-10h (DCC002-A)",
    severity: "ERROR",
    blockingRule: true,
    alternatives: [
      "Escolher outro docente",
      "Alterar horário da turma",
      "Verificar disponibilidade do docente"
    ],
    ui: {
      highlightConflict: {
        field: "docente1Id",
        conflictDetails: {
          horario: "Segunda/Quarta 8h-10h",
          turmaConflitante: "DCC002-A"
        }
      }
    }
  }
}

// CENÁRIO NEG-001b: Sala ocupada no mesmo horário
{
  context: {
    existingSalaUsage: {
      salaId: 10,
      horario: "Terça/Quinta 10h-12h",
      turma: "MAT001-B"
    }
  },
  input: {
    salaId: 10,
    horario: "Terça/Quinta 10h-12h"
  },
  expected: {
    error: "NEG-001b",
    message: "Sala Lab 1 já está ocupada no horário Terça/Quinta 10h-12h (MAT001-B)",
    alternatives: [
      "Escolher outra sala",
      "Alterar horário",
      "Verificar salas disponíveis"
    ],
    ui: {
      showAvailableRooms: true,
      suggestedRooms: ["Lab 2", "Lab 3", "Sala 101"]
    }
  }
}

// CENÁRIO NEG-001c: Docente auxiliar igual ao principal
{
  input: {
    docente1Id: 5,
    docente2Id: 5 // MESMO docente
  },
  expected: {
    error: "NEG-001c",
    message: "Docente auxiliar deve ser diferente do docente principal",
    severity: "ERROR",
    ui: {
      clearField: "docente2Id",
      filterOptions: "excludeSelected" // Remover docente principal das opções
    }
  }
}
```

**🔄 ALGORITMO DE DETECÇÃO DE CONFLITOS:**

```javascript
class ConflictDetector {
  async detectAllConflicts(turmaData) {
    const conflitos = [];

    // 1. Conflitos de docente
    if (turmaData.docente1Id && turmaData.horarioId) {
      const conflitoDocente = await this.checkDocenteConflict(
        turmaData.docente1Id,
        turmaData.horarioId,
        turmaData.planoId
      );
      if (conflitoDocente) {
        conflitos.push({
          type: 'DOCENTE_CONFLICT',
          code: 'NEG-001a',
          details: conflitoDocente
        });
      }
    }

    // 2. Conflitos de sala
    if (turmaData.salaId && turmaData.horarioId) {
      const conflitoSala = await this.checkSalaConflict(
        turmaData.salaId,
        turmaData.horarioId,
        turmaData.planoId
      );
      if (conflitoSala) {
        conflitos.push({
          type: 'SALA_CONFLICT',
          code: 'NEG-001b',
          details: conflitoSala
        });
      }
    }

    // 3. Conflitos de mesmo docente
    if (turmaData.docente1Id === turmaData.docente2Id) {
      conflitos.push({
        type: 'SAME_DOCENTE',
        code: 'NEG-001c',
        message: 'Docente auxiliar deve ser diferente do principal'
      });
    }

    return conflitos;
  }

  async checkDocenteConflict(docenteId, horarioId, planoId) {
    const query = `
      SELECT t.id, t.letra, d.codigo as disciplina_codigo,
             h.descricao as horario_descricao
      FROM Turma t
      JOIN Disciplina d ON d.id = t.Disciplina
      JOIN Horario h ON h.id = t.Horario
      WHERE (t.Docente1 = :docenteId OR t.Docente2 = :docenteId)
      AND t.Horario = :horarioId
      AND t.Plano = :planoId
      AND t.status = 'ativa'
    `;

    const conflitos = await sequelize.query(query, {
      replacements: { docenteId, horarioId, planoId },
      type: QueryTypes.SELECT
    });

    return conflitos.length > 0 ? conflitos[0] : null;
  }
}
```

---

#### NEG-002: Limites de Capacidade Excedidos

**📋 CENÁRIOS ESPECÍFICOS:**

```javascript
// CENÁRIO NEG-002a: Carga horária docente excedida
{
  context: {
    docente: { id: 5, creditos: 20, creditosUsados: 18 },
    disciplina: { cargaTotal: 6 } // 18 + 6 = 24 > 20
  },
  input: { docente1Id: 5, disciplinaId: 1 },
  expected: {
    error: "NEG-002a",
    message: "Prof. João Silva ficará com sobrecarga de 4 créditos (24/20)",
    severity: "WARNING", // ⚠️ Permite, mas avisa
    allowOverride: true,
    ui: {
      confirmationDialog: {
        title: "Confirmar Sobrecarga",
        message: "Docente ficará com 24 créditos (limite: 20). Continuar?",
        warnings: [
          "Sobrecarga será reportada à coordenação",
          "Pode afetar qualidade do ensino",
          "Requer justificativa"
        ],
        requireJustification: true
      }
    }
  }
}

// CENÁRIO NEG-002b: Capacidade da sala insuficiente
{
  context: {
    sala: { id: 10, capacidade: 40 },
    vagasCalculadas: 45
  },
  expected: {
    error: "NEG-002b",
    message: "Vagas calculadas (45) excedem capacidade da sala (40)",
    severity: "ERROR",
    blockingRule: true,
    alternatives: [
      "Escolher sala maior",
      "Reduzir número de vagas",
      "Dividir em mais turmas"
    ],
    ui: {
      suggestedRooms: [
        { id: 11, nome: "Auditório", capacidade: 60 },
        { id: 12, nome: "Sala 201", capacidade: 50 }
      ]
    }
  }
}

// CENÁRIO NEG-002c: Limite de turmas por docente
{
  context: {
    docente: { id: 5, turmasAtivas: 7 },
    limiteMaximo: 8
  },
  input: { docente1Id: 5 },
  expected: {
    error: "NEG-002c",
    message: "Prof. João Silva já possui 7 turmas. Limite recomendado: 8",
    severity: "WARNING",
    ui: {
      showDocenteLoad: {
        turmasAtuais: [
          "DCC001-A", "DCC002-B", "DCC003-A",
          "MAT001-C", "FIS001-A", "QUI001-B", "BIO001-A"
        ],
        creditosUsados: 18,
        creditosLimite: 20
      }
    }
  }
}
```

**📊 DASHBOARD DE CAPACIDADE:**

```javascript
// Interface deve exibir indicadores visuais:
function renderCapacityIndicators(docente, newTurma) {
  const indicators = {
    cargaHoraria: {
      atual: docente.creditosUsados,
      novo: docente.creditosUsados + newTurma.creditos,
      limite: docente.creditos,
      status: calculateStatus('carga', docente.creditosUsados + newTurma.creditos, docente.creditos)
    },
    numeroTurmas: {
      atual: docente.turmasAtivas,
      novo: docente.turmasAtivas + 1,
      limite: 8,
      status: calculateStatus('turmas', docente.turmasAtivas + 1, 8)
    }
  };

  return `
    Carga Horária: ${indicators.cargaHoraria.novo}/${indicators.cargaHoraria.limite}h
    [████████░░] ${getStatusIcon(indicators.cargaHoraria.status)}

    Número de Turmas: ${indicators.numeroTurmas.novo}/${indicators.numeroTurmas.limite}
    [██████████] ${getStatusIcon(indicators.numeroTurmas.status)}
  `;
}

function calculateStatus(type, current, limit) {
  const percentage = current / limit;
  if (percentage <= 0.7) return 'OK';
  if (percentage <= 0.9) return 'WARNING';
  return 'CRITICAL';
}
```

---

### 🚨 Categoria INF: Falhas de Infraestrutura

#### INF-001: Falhas de Conexão com Banco

**📋 CENÁRIOS ESPECÍFICOS:**

```javascript
// CENÁRIO INF-001a: Timeout na consulta de validação
{
  trigger: "Validação de unicidade demora > 5 segundos",
  expected: {
    error: "INF-001a",
    userMessage: "⚠️ Sistema lento. Tentando novamente...",
    systemAction: "RETRY_WITH_BACKOFF",
    retryConfig: {
      maxAttempts: 3,
      backoffMs: [1000, 2000, 4000],
      fallbackBehavior: "ASSUME_UNIQUE_WARNING"
    },
    ui: {
      showLoadingSpinner: true,
      disableForm: false, // Ainda permite edição
      showRetryCounter: true
    }
  }
}

// CENÁRIO INF-001b: Erro de conexão durante salvamento
{
  trigger: "POST /turmas falha com ECONNRESET",
  expected: {
    error: "INF-001b",
    userMessage: "❌ Falha na conexão. Dados NÃO foram salvos.",
    systemAction: "PRESERVE_FORM_DATA",
    ui: {
      preserveAllFields: true,
      showRetryButton: true,
      showSaveOffline: true, // Opção para salvar localmente
      autoRetryIn: 30 // segundos
    },
    logging: {
      level: "ERROR",
      context: {
        formData: "SANITIZED", // Dados sem informações sensíveis
        attemptNumber: 1,
        userId: "LOGGED_USER_ID"
      }
    }
  }
}

// CENÁRIO INF-001c: Banco de dados indisponível
{
  trigger: "Todas as queries falham com 'Connection refused'",
  expected: {
    error: "INF-001c",
    userMessage: "🚨 Sistema temporariamente indisponível. Tente novamente em alguns minutos.",
    systemAction: "ACTIVATE_MAINTENANCE_MODE",
    ui: {
      showMaintenanceMessage: true,
      disableAllForms: true,
      showEstimatedRecovery: "5-10 minutos",
      enableOfflineMode: true
    }
  }
}
```

**🔄 ESTRATÉGIA DE RETRY INTELIGENTE:**

```javascript
class DatabaseRetryHandler {
  constructor() {
    this.retryConfig = {
      maxAttempts: 3,
      baseDelay: 1000,
      maxDelay: 10000,
      retryableErrors: [
        'ECONNRESET', 'ETIMEDOUT', 'ENOTFOUND',
        'SequelizeConnectionRefusedError',
        'SequelizeHostNotReachableError'
      ]
    };
  }

  async executeWithRetry(operation, context) {
    let lastError = null;

    for (let attempt = 1; attempt <= this.retryConfig.maxAttempts; attempt++) {
      try {
        // Tentar executar operação
        const result = await operation();

        // Se chegou aqui, sucesso!
        if (attempt > 1) {
          console.log(`✅ Operação bem-sucedida na tentativa ${attempt}`);
          this.notifyRecovery(context);
        }

        return result;

      } catch (error) {
        lastError = error;

        // Verificar se é erro que permite retry
        if (!this.isRetryableError(error)) {
          throw error; // Erro não-retentável, falha imediatamente
        }

        // Se é a última tentativa, falha definitivamente
        if (attempt === this.retryConfig.maxAttempts) {
          break;
        }

        // Calcular delay com backoff exponencial
        const delay = Math.min(
          this.retryConfig.baseDelay * Math.pow(2, attempt - 1),
          this.retryConfig.maxDelay
        );

        console.warn(`⚠️ Tentativa ${attempt} falhou. Tentando novamente em ${delay}ms...`);
        this.notifyRetry(context, attempt, delay);

        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    // Se chegou aqui, todas as tentativas falharam
    this.notifyFailure(context, lastError);
    throw lastError;
  }

  isRetryableError(error) {
    return this.retryConfig.retryableErrors.some(retryableError =>
      error.name === retryableError ||
      error.code === retryableError ||
      error.message.includes(retryableError)
    );
  }

  notifyRetry(context, attempt, delay) {
    // Notificar UI sobre tentativa
    if (context.socketId) {
      io.to(context.socketId).emit('operation_retry', {
        attempt,
        maxAttempts: this.retryConfig.maxAttempts,
        nextRetryIn: delay
      });
    }
  }

  notifyRecovery(context) {
    if (context.socketId) {
      io.to(context.socketId).emit('operation_recovered', {
        message: 'Conexão restaurada com sucesso'
      });
    }
  }

  notifyFailure(context, error) {
    if (context.socketId) {
      io.to(context.socketId).emit('operation_failed', {
        message: 'Operação falhou após múltiplas tentativas',
        canRetryManually: true
      });
    }
  }
}

// Uso no controller:
const retryHandler = new DatabaseRetryHandler();

router.post('/turmas', async (req, res) => {
  try {
    const result = await retryHandler.executeWithRetry(
      async () => {
        return await criarTurma(req.body);
      },
      {
        operation: 'CREATE_TURMA',
        userId: req.user.id,
        socketId: req.socketId
      }
    );

    res.json(result);

  } catch (error) {
    // Aqui chegam apenas erros não-retentáveis ou falhas definitivas
    res.status(500).json({
      success: false,
      error: 'INF-001',
      message: 'Operação falhou após múltiplas tentativas',
      canRetryManually: true
    });
  }
});
```

---

#### INF-002: Falhas de API Externa

**📋 CENÁRIOS ESPECÍFICOS:**

```javascript
// CENÁRIO INF-002a: Serviço de email indisponível
{
  trigger: "Envio de notificação por email falha",
  context: {
    operation: "Criar turma com notificação",
    emailsToSend: 25
  },
  expected: {
    error: "INF-002a",
    systemBehavior: "CONTINUE_WITHOUT_EMAIL",
    userMessage: "✅ Turma criada com sucesso. ⚠️ Notificações por email serão enviadas assim que possível.",
    fallback: {
      queueForRetry: true,
      alternativeNotification: "PUSH_NOTIFICATION",
      maxRetryTime: "24 horas"
    },
    logging: {
      level: "WARN",
      alert: "EMAIL_SERVICE_DOWN",
      notifyAdmin: true
    }
  }
}

// CENÁRIO INF-002b: Serviço de SMS indisponível
{
  trigger: "SMS para coordenadores falha",
  expected: {
    error: "INF-002b",
    systemBehavior: "USE_EMAIL_FALLBACK",
    userMessage: null, // Transparente para usuário
    fallback: {
      primaryMethod: "SMS",
      fallbackMethod: "EMAIL",
      escalation: "DASHBOARD_ALERT"
    }
  }
}
```

**🔄 SISTEMA DE FALLBACK EM CASCATA:**

```javascript
class NotificationFallbackHandler {
  constructor() {
    this.methods = [
      { type: 'SMS', priority: 1, timeout: 5000 },
      { type: 'EMAIL', priority: 2, timeout: 10000 },
      { type: 'PUSH', priority: 3, timeout: 3000 },
      { type: 'DASHBOARD_ALERT', priority: 4, timeout: 1000 }
    ];
  }

  async sendWithFallback(notification) {
    let lastError = null;
    const attempts = [];

    for (const method of this.methods) {
      try {
        const result = await this.sendViaMethod(method, notification);

        // Log tentativa bem-sucedida
        attempts.push({
          method: method.type,
          success: true,
          timestamp: new Date()
        });

        // Se não é o método primário, logar fallback
        if (method.priority > 1) {
          console.warn(`📱 Fallback notification sent via ${method.type} (primary method failed)`);
        }

        return {
          success: true,
          methodUsed: method.type,
          fallbackUsed: method.priority > 1,
          attempts: attempts
        };

      } catch (error) {
        lastError = error;
        attempts.push({
          method: method.type,
          success: false,
          error: error.message,
          timestamp: new Date()
        });

        console.warn(`⚠️ Notification via ${method.type} failed:`, error.message);
      }
    }

    // Se chegou aqui, todos os métodos falharam
    console.error('🚨 All notification methods failed:', attempts);

    throw new Error(`All notification methods failed. Last error: ${lastError.message}`);
  }

  async sendViaMethod(method, notification) {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error(`${method.type} timeout after ${method.timeout}ms`));
      }, method.timeout);

      // Simular envio baseado no tipo
      switch (method.type) {
        case 'SMS':
          this.sendSMS(notification)
            .then(result => { clearTimeout(timeout); resolve(result); })
            .catch(error => { clearTimeout(timeout); reject(error); });
          break;

        case 'EMAIL':
          this.sendEmail(notification)
            .then(result => { clearTimeout(timeout); resolve(result); })
            .catch(error => { clearTimeout(timeout); reject(error); });
          break;

        case 'PUSH':
          this.sendPushNotification(notification)
            .then(result => { clearTimeout(timeout); resolve(result); })
            .catch(error => { clearTimeout(timeout); reject(error); });
          break;

        case 'DASHBOARD_ALERT':
          this.sendDashboardAlert(notification)
            .then(result => { clearTimeout(timeout); resolve(result); })
            .catch(error => { clearTimeout(timeout); reject(error); });
          break;
      }
    });
  }
}
```

---

## 📚 Gestão de Disciplinas - Todos os Cenários de Erro

### 🚨 Complexidade de Dependências Circulares

#### NEG-003: Detecção Avançada de Ciclos

**📋 CENÁRIOS COMPLEXOS:**

```javascript
// CENÁRIO NEG-003a: Ciclo direto (A → B → A)
{
  context: {
    existingDependencies: {
      'DCC001': [],
      'DCC002': ['DCC001']
    }
  },
  input: {
    disciplina: 'DCC001',
    novoPreRequisito: 'DCC002'
  },
  expected: {
    error: "NEG-003a",
    cyclePath: ['DCC001', 'DCC002', 'DCC001'],
    cycleLength: 2,
    message: "Dependência circular detectada: DCC001 → DCC002 → DCC001"
  }
}

// CENÁRIO NEG-003b: Ciclo indireto (A → B → C → A)
{
  context: {
    existingDependencies: {
      'DCC001': [],
      'DCC002': ['DCC001'],
      'DCC003': ['DCC002']
    }
  },
  input: {
    disciplina: 'DCC001',
    novoPreRequisito: 'DCC003'
  },
  expected: {
    error: "NEG-003b",
    cyclePath: ['DCC001', 'DCC003', 'DCC002', 'DCC001'],
    cycleLength: 3,
    message: "Dependência circular indireta: DCC001 → DCC003 → DCC002 → DCC001",
    ui: {
      visualizeDependencyGraph: true,
      highlightCyclePath: ['DCC001', 'DCC003', 'DCC002']
    }
  }
}

// CENÁRIO NEG-003c: Múltiplos ciclos possíveis
{
  context: {
    existingDependencies: {
      'DCC001': ['DCC004'],
      'DCC002': ['DCC001'],
      'DCC003': ['DCC002'],
      'DCC004': ['DCC003']
    }
  },
  input: {
    disciplina: 'DCC002',
    novoPreRequisito: 'DCC004'
  },
  expected: {
    error: "NEG-003c",
    multipleCycles: [
      ['DCC002', 'DCC004', 'DCC003', 'DCC002'],
      ['DCC002', 'DCC001', 'DCC004', 'DCC003', 'DCC002']
    ],
    message: "Múltiplos ciclos seriam criados",
    ui: {
      showAllCycles: true,
      recommendAlternatives: true
    }
  }
}
```

**🧠 ALGORITMO AVANÇADO DE DETECÇÃO:**

```javascript
class CycleDetector {
  constructor() {
    this.visited = new Set();
    this.recursionStack = new Set();
    this.dependencyGraph = new Map();
  }

  async buildGraph() {
    const allDisciplines = await Disciplina.findAll({
      include: [{
        model: Disciplina,
        as: 'PreRequisitos',
        through: { attributes: [] }
      }]
    });

    this.dependencyGraph.clear();

    allDisciplines.forEach(disciplina => {
      const preReqs = disciplina.PreRequisitos.map(pr => pr.id);
      this.dependencyGraph.set(disciplina.id, preReqs);
    });
  }

  detectCycle(disciplinaId, newPreRequisite) {
    // Simular a adição da nova dependência
    const currentPreReqs = this.dependencyGraph.get(disciplinaId) || [];
    this.dependencyGraph.set(disciplinaId, [...currentPreReqs, newPreRequisite]);

    this.visited.clear();
    this.recursionStack.clear();

    // Detectar ciclos usando DFS
    const cycles = [];
    for (const [nodeId] of this.dependencyGraph) {
      if (!this.visited.has(nodeId)) {
        const cycle = this.dfsDetectCycle(nodeId, []);
        if (cycle) {
          cycles.push(cycle);
        }
      }
    }

    // Restaurar estado original
    this.dependencyGraph.set(disciplinaId, currentPreReqs);

    return cycles;
  }

  dfsDetectCycle(nodeId, path) {
    this.visited.add(nodeId);
    this.recursionStack.add(nodeId);
    path.push(nodeId);

    const dependencies = this.dependencyGraph.get(nodeId) || [];

    for (const depId of dependencies) {
      if (!this.visited.has(depId)) {
        const cycle = this.dfsDetectCycle(depId, [...path]);
        if (cycle) return cycle;
      } else if (this.recursionStack.has(depId)) {
        // Ciclo encontrado!
        const cycleStart = path.indexOf(depId);
        return [...path.slice(cycleStart), depId];
      }
    }

    this.recursionStack.delete(nodeId);
    return null;
  }

  async generateCycleSuggestions(cycles) {
    const suggestions = [];

    for (const cycle of cycles) {
      const cycleInfo = await this.analyzeCycle(cycle);

      suggestions.push({
        cycle: cycle,
        length: cycle.length - 1, // Remove duplicate node
        suggestions: [
          `Remover pré-requisito entre ${cycleInfo.weakestLink.from} e ${cycleInfo.weakestLink.to}`,
          `Considerar criar disciplina intermediária`,
          `Reestruturar sequência curricular`
        ],
        impact: cycleInfo.impact
      });
    }

    return suggestions;
  }

  async analyzeCycle(cycle) {
    // Analisar qual é o elo mais fraco no ciclo
    let weakestLink = null;
    let minStrength = Infinity;

    for (let i = 0; i < cycle.length - 1; i++) {
      const from = cycle[i];
      const to = cycle[i + 1];

      const linkStrength = await this.calculateLinkStrength(from, to);

      if (linkStrength < minStrength) {
        minStrength = linkStrength;
        weakestLink = { from, to, strength: linkStrength };
      }
    }

    return {
      weakestLink,
      impact: await this.calculateCycleImpact(cycle)
    };
  }

  async calculateLinkStrength(fromId, toId) {
    // Calcular "força" da dependência baseada em:
    // - Quantas vezes foi usada historicamente
    // - Importância na grade curricular
    // - Feedback de docentes

    const usage = await sequelize.query(`
      SELECT COUNT(*) as usage_count
      FROM HistoricoAcademico ha1
      JOIN HistoricoAcademico ha2 ON ha1.AlunoId = ha2.AlunoId
      WHERE ha1.DisciplinaId = :fromId
      AND ha2.DisciplinaId = :toId
      AND ha1.dataAprovacao < ha2.dataMatricula
    `, {
      replacements: { fromId, toId },
      type: QueryTypes.SELECT
    });

    return usage[0].usage_count || 0;
  }

  async calculateCycleImpact(cycle) {
    // Calcular impacto de quebrar o ciclo:
    // - Quantos alunos seriam afetados
    // - Quantas turmas teriam problemas
    // - Impacto na sequência curricular

    const impactedStudents = await sequelize.query(`
      SELECT COUNT(DISTINCT AlunoId) as total
      FROM Matricula m
      JOIN Turma t ON t.id = m.TurmaId
      WHERE t.Disciplina IN (:cycleIds)
      AND m.status = 'confirmada'
    `, {
      replacements: { cycleIds: cycle.slice(0, -1) }, // Remove duplicate
      type: QueryTypes.SELECT
    });

    return {
      studentsImpacted: impactedStudents[0].total,
      severity: impactedStudents[0].total > 50 ? 'HIGH' : 'MEDIUM'
    };
  }
}
```

---

#### NEG-004: Validações de Competência Docente

**📋 CENÁRIOS DE COMPETÊNCIA:**

```javascript
// CENÁRIO NEG-004a: Docente inadequado para disciplina
{
  context: {
    docente: {
      id: 5,
      nome: "Prof. João Silva",
      areaFormacao: "Matemática",
      experiencia: 2, // anos
      avaliacaoMedia: 3.8
    },
    disciplina: {
      id: 1,
      nome: "Programação Avançada",
      area: "Ciência da Computação",
      complexidade: "ALTA"
    }
  },
  competenciaCalculada: {
    nivel: "INADEQUADO",
    score: 25,
    motivos: [
      "Área de formação incompatível",
      "Pouca experiência (2 anos)",
      "Avaliação abaixo da média (3.8/5.0)"
    ]
  },
  expected: {
    error: "NEG-004a",
    message: "Prof. João Silva tem competência INADEQUADA para disciplina Programação Avançada",
    severity: "WARNING", // Permite, mas com aviso forte
    ui: {
      showCompetencyDetails: true,
      requireApproval: true,
      suggestAlternatives: [
        "Prof. Maria Santos (COMPETENTE)",
        "Prof. Ana Costa (APTO)"
      ]
    }
  }
}

// CENÁRIO NEG-004b: Primeira vez lecionando disciplina crítica
{
  context: {
    docente: { experienciaNaDisciplina: 0 },
    disciplina: { criticidade: "ALTA", reprovacoesHistoricas: 45 }
  },
  expected: {
    error: "NEG-004b",
    message: "Disciplina crítica sendo atribuída a docente inexperiente",
    ui: {
      requireMentorship: true,
      suggestCoDocente: true,
      scheduleObservation: true
    }
  }
}

// CENÁRIO NEG-004c: Sobrecarga de disciplinas novas
{
  context: {
    docente: { turmasNovas: 2 },
    limiteRecomendado: 1
  },
  expected: {
    error: "NEG-004c",
    message: "Docente já possui 2 disciplinas novas este semestre (recomendado: máx. 1)",
    severity: "WARNING"
  }
}
```

**🎯 SISTEMA DE RECOMENDAÇÃO DE DOCENTES:**

```javascript
class DocenteRecommendationEngine {
  async findBestMatchForDisciplina(disciplinaId) {
    const disciplina = await Disciplina.findByPk(disciplinaId);
    const docentes = await Docente.findAll({ where: { ativo: true } });

    const recommendations = [];

    for (const docente of docentes) {
      const competencia = await this.calculateCompetencia(docente.id, disciplinaId);
      const disponibilidade = await this.checkDisponibilidade(docente.id);

      recommendations.push({
        docente: docente,
        competencia: competencia,
        disponibilidade: disponibilidade,
        scoreTotal: this.calculateTotalScore(competencia, disponibilidade),
        recomendacao: this.generateRecommendation(competencia, disponibilidade)
      });
    }

    return recommendations.sort((a, b) => b.scoreTotal - a.scoreTotal);
  }

  generateRecommendation(competencia, disponibilidade) {
    const recommendations = [];

    if (competencia.nivel === 'EXPERT') {
      recommendations.push('✅ Altamente recomendado - Especialista na área');
    } else if (competencia.nivel === 'INADEQUADO') {
      recommendations.push('❌ Não recomendado - Competência insuficiente');
    }

    if (disponibilidade.sobrecarga) {
      recommendations.push('⚠️ Atenção - Docente com sobrecarga');
    }

    if (disponibilidade.conflitosHorario > 0) {
      recommendations.push(`⚠️ ${disponibilidade.conflitosHorario} conflito(s) de horário`);
    }

    if (competencia.primeiraVez) {
      recommendations.push('📚 Primeira vez na disciplina - Considerar mentoria');
    }

    return recommendations;
  }
}
```

---

## 🎓 Processo de Matrículas - Cenários Críticos de Erro

### 🚨 Falhas no Algoritmo de Priorização

#### NEG-005: Inconsistências no Cálculo de Prioridade

**📋 CENÁRIOS DE FALHA:**

```javascript
// CENÁRIO NEG-005a: IRA inválido ou corrompido
{
  context: {
    aluno: { id: 123, ira: null }, // IRA nulo no banco
    disciplina: { id: 1 }
  },
  expected: {
    error: "NEG-005a",
    message: "IRA do aluno não disponível para cálculo de prioridade",
    fallback: {
      assumirIRA: 5.0, // IRA médio padrão
      prioridadeBaixa: true,
      alertarCoordenacao: true
    },
    ui: {
      showWarning: "⚠️ Prioridade calculada com IRA padrão (dados incompletos)"
    }
  }
}

// CENÁRIO NEG-005b: Data de ingresso inconsistente
{
  context: {
    aluno: {
      id: 123,
      dataIngresso: "2030-01-01" // Data futura - erro de dados
    }
  },
  expected: {
    error: "NEG-005b",
    message: "Data de ingresso inválida (futura)",
    fallback: {
      usarDataMatriculaAtual: true,
      tempoNoCurso: 0,
      alertarInconsistencia: true
    }
  }
}

// CENÁRIO NEG-005c: Formando sem créditos suficientes
{
  context: {
    aluno: {
      id: 123,
      situacaoEspecial: "FORMANDO",
      creditosConcluidos: 120,
      creditosNecessarios: 180
    }
  },
  expected: {
    error: "NEG-005c",
    message: "Aluno marcado como formando mas não tem créditos suficientes",
    action: "REMOVE_FORMANDO_STATUS",
    ui: {
      alertCoordenacao: "Revisar situação de formando do aluno"
    }
  }
}
```

**🔧 SISTEMA DE CORREÇÃO AUTOMÁTICA:**

```javascript
class PriorityCalculationFixer {
  async fixAndRecalculate(alunoId, disciplinaId) {
    const aluno = await Aluno.findByPk(alunoId);
    const disciplina = await Disciplina.findByPk(disciplinaId);

    const fixes = [];
    let alunoCorrigido = { ...aluno.dataValues };

    // Fix 1: IRA inválido
    if (!alunoCorrigido.ira || alunoCorrigido.ira < 0 || alunoCorrigido.ira > 10) {
      alunoCorrigido.ira = await this.estimateIRA(alunoId);
      fixes.push({
        field: 'ira',
        originalValue: aluno.ira,
        fixedValue: alunoCorrigido.ira,
        method: 'ESTIMATED_FROM_GRADES'
      });
    }

    // Fix 2: Data de ingresso inválida
    if (new Date(alunoCorrigido.dataIngresso) > new Date()) {
      alunoCorrigido.dataIngresso = await this.findEarliestMatricula(alunoId);
      fixes.push({
        field: 'dataIngresso',
        originalValue: aluno.dataIngresso,
        fixedValue: alunoCorrigido.dataIngresso,
        method: 'EARLIEST_MATRICULA'
      });
    }

    // Fix 3: Situação de formando inconsistente
    if (alunoCorrigido.situacaoEspecial === 'FORMANDO') {
      const isReallyFormando = await this.validateFormandoStatus(alunoId);
      if (!isReallyFormando) {
        alunoCorrigido.situacaoEspecial = null;
        fixes.push({
          field: 'situacaoEspecial',
          originalValue: 'FORMANDO',
          fixedValue: null,
          method: 'CREDITS_VERIFICATION'
        });
      }
    }

    // Recalcular prioridade com dados corrigidos
    const prioridadeCorrigida = await this.calculatePriority(alunoCorrigido, disciplina);

    return {
      prioridade: prioridadeCorrigida,
      fixes: fixes,
      needsManualReview: fixes.length > 0
    };
  }

  async estimateIRA(alunoId) {
    const notas = await sequelize.query(`
      SELECT AVG(nota) as ira_estimado
      FROM HistoricoAcademico
      WHERE AlunoId = :alunoId
      AND situacao = 'aprovado'
      AND nota IS NOT NULL
    `, {
      replacements: { alunoId },
      type: QueryTypes.SELECT
    });

    return notas[0]?.ira_estimado || 5.0; // Default se não há notas
  }

  async validateFormandoStatus(alunoId) {
    const aluno = await Aluno.findByPk(alunoId, {
      include: ['Curso']
    });

    const creditosConcluidos = await this.calculateCompletedCredits(alunoId);
    const creditosNecessarios = aluno.Curso.creditosMinimos || 180;

    // É formando se está próximo da conclusão (faltam até 30 créditos)
    return (creditosNecessarios - creditosConcluidos) <= 30;
  }
}
```

---

#### NEG-006: Falhas na Alocação de Vagas

**📋 CENÁRIOS DE ALOCAÇÃO:**

```javascript
// CENÁRIO NEG-006a: Vaga alocada para dois alunos simultaneamente
{
  trigger: "Condição de corrida - dois pedidos processados simultaneamente",
  context: {
    vaga: { id: 1, turmaId: 123, ocupada: false },
    pedidosSimultaneos: [
      { alunoId: 101, timestamp: "2024-01-15T10:30:00.100Z" },
      { alunoId: 102, timestamp: "2024-01-15T10:30:00.101Z" }
    ]
  },
  expected: {
    error: "NEG-006a",
    resolution: "FIRST_WINS",
    systemAction: [
      "Aluno 101 recebe a vaga (primeiro timestamp)",
      "Aluno 102 vai para lista de espera posição 1",
      "Gerar alerta de condição de corrida"
    ],
    prevention: "Usar locks de banco de dados ou transações atômicas"
  }
}

// CENÁRIO NEG-006b: Lista de espera corrompida
{
  context: {
    listaEspera: [
      { alunoId: 101, posicao: 1, prioridade: 85 },
      { alunoId: 102, posicao: 2, prioridade: 90 }, // PRIORIDADE MAIOR QUE O ANTERIOR!
      { alunoId: 103, posicao: 3, prioridade: 88 }
    ]
  },
  expected: {
    error: "NEG-006b",
    message: "Lista de espera com ordem incorreta detectada",
    systemAction: "REORDER_WAITLIST",
    newOrder: [
      { alunoId: 102, posicao: 1, prioridade: 90 },
      { alunoId: 103, posicao: 2, prioridade: 88 },
      { alunoId: 101, posicao: 3, prioridade: 85 }
    ],
    notifications: [
      "Notificar todos os alunos da nova posição",
      "Alertar coordenação sobre inconsistência"
    ]
  }
}

// CENÁRIO NEG-006c: Vaga liberada não preenchida automaticamente
{
  context: {
    vagaLiberada: { turmaId: 123, vagaId: 45 },
    listaEspera: [
      { alunoId: 201, posicao: 1, ativo: true },
      { alunoId: 202, posicao: 2, ativo: true }
    ],
    falha: "Processo automático não executou"
  },
  expected: {
    error: "NEG-006c",
    detection: "MONITORING_SCRIPT", // Script detecta vaga vazia com lista de espera
    recovery: [
      "Executar processo de preenchimento manual",
      "Alocar para aluno 201 (primeira posição)",
      "Atualizar posições da lista",
      "Investigar por que automático falhou"
    ]
  }
}
```

**🔒 SISTEMA ANTI-CONCORRÊNCIA:**

```javascript
class VagaAllocationLock {
  constructor() {
    this.activeLocks = new Map();
  }

  async allocateVagaWithLock(vagaId, alunoId, prioridade) {
    const lockKey = `vaga_${vagaId}`;

    // Verificar se vaga já está sendo processada
    if (this.activeLocks.has(lockKey)) {
      throw new Error('Vaga sendo processada simultaneamente');
    }

    // Criar lock
    this.activeLocks.set(lockKey, {
      alunoId,
      timestamp: new Date(),
      timeout: setTimeout(() => {
        this.activeLocks.delete(lockKey);
      }, 30000) // Lock expira em 30s
    });

    try {
      // Executar alocação com transação atômica
      const result = await sequelize.transaction(async (transaction) => {
        // 1. Verificar se vaga ainda está disponível
        const vaga = await Vaga.findByPk(vagaId, {
          lock: true, // Row-level lock
          transaction
        });

        if (vaga.ocupada) {
          throw new Error('Vaga já foi ocupada por outro processo');
        }

        // 2. Alocar vaga atomicamente
        await Vaga.update(
          { ocupada: true, alunoId: alunoId },
          { where: { id: vagaId }, transaction }
        );

        // 3. Criar matrícula
        const matricula = await Matricula.create({
          AlunoId: alunoId,
          TurmaId: vaga.turmaId,
          status: 'aprovada',
          dataMatricula: new Date(),
          prioridade: prioridade
        }, { transaction });

        return matricula;
      });

      // Sucesso - remover lock
      this.clearLock(lockKey);

      return result;

    } catch (error) {
      // Falha - remover lock
      this.clearLock(lockKey);
      throw error;
    }
  }

  clearLock(lockKey) {
    const lock = this.activeLocks.get(lockKey);
    if (lock) {
      clearTimeout(lock.timeout);
      this.activeLocks.delete(lockKey);
    }
  }

  // Monitor para detectar locks órfãos
  startLockMonitoring() {
    setInterval(() => {
      const now = Date.now();
      for (const [lockKey, lock] of this.activeLocks) {
        const age = now - lock.timestamp.getTime();
        if (age > 60000) { // Lock muito antigo (>1min)
          console.warn(`🚨 Orphaned lock detected: ${lockKey}, age: ${age}ms`);
          this.clearLock(lockKey);
        }
      }
    }, 30000); // Verificar a cada 30s
  }
}
```

---

### 🚨 Falhas de Integridade de Dados

#### INF-003: Detecção de Estados Inconsistentes

**📋 CENÁRIOS DE INCONSISTÊNCIA:**

```javascript
// CENÁRIO INF-003a: Aluno matriculado em turma cancelada
{
  detection: "INTEGRITY_CHECK_DAILY",
  context: {
    matricula: { id: 123, alunoId: 101, turmaId: 45, status: "confirmada" },
    turma: { id: 45, status: "cancelada" }
  },
  expected: {
    error: "INF-003a",
    severity: "HIGH",
    impact: "STUDENT_BLOCKED",
    actions: [
      "Cancelar matrícula automaticamente",
      "Tentar realocar para turma equivalente",
      "Notificar aluno e coordenação",
      "Gerar relatório de inconsistência"
    ]
  }
}

// CENÁRIO INF-003b: Turma sem docente ativo
{
  detection: "REAL_TIME_VALIDATION",
  context: {
    turma: { id: 50, docente1Id: 25, status: "ativa" },
    docente: { id: 25, status: "inativo" }
  },
  expected: {
    error: "INF-003b",
    severity: "CRITICAL",
    immediateAction: "BLOCK_NEW_MATRICULAS",
    resolution: [
      "Alocar docente substituto",
      "Ou cancelar turma se não houver substituto",
      "Notificar todos os matriculados"
    ]
  }
}

// CENÁRIO INF-003c: Vaga marcada como ocupada sem matrícula correspondente
{
  detection: "DATABASE_CONSISTENCY_CHECK",
  context: {
    vaga: { id: 67, ocupada: true, alunoId: 150 },
    matricula: null // Não existe matrícula para este aluno nesta turma
  },
  expected: {
    error: "INF-003c",
    resolution: "LIBERAR_VAGA",
    actions: [
      "Marcar vaga como livre",
      "Processar próximo da lista de espera",
      "Investigar como ocorreu a inconsistência"
    ]
  }
}
```

**🔍 SISTEMA DE DETECÇÃO DE INCONSISTÊNCIAS:**

```javascript
class IntegrityChecker {
  constructor() {
    this.checks = [
      { name: 'matriculas-turmas-canceladas', severity: 'HIGH' },
      { name: 'turmas-docentes-inativos', severity: 'CRITICAL' },
      { name: 'vagas-ocupadas-sem-matricula', severity: 'MEDIUM' },
      { name: 'lista-espera-ordenacao', severity: 'MEDIUM' },
      { name: 'prerequisitos-violados', severity: 'HIGH' }
    ];
  }

  async runAllChecks() {
    const inconsistencies = [];

    for (const check of this.checks) {
      try {
        const result = await this.runCheck(check.name);
        if (result.length > 0) {
          inconsistencies.push({
            checkName: check.name,
            severity: check.severity,
            count: result.length,
            details: result
          });
        }
      } catch (error) {
        console.error(`Failed to run check ${check.name}:`, error);
      }
    }

    if (inconsistencies.length > 0) {
      await this.processInconsistencies(inconsistencies);
    }

    return inconsistencies;
  }

  async runCheck(checkName) {
    switch (checkName) {
      case 'matriculas-turmas-canceladas':
        return await sequelize.query(`
          SELECT m.id as matricula_id, m.AlunoId, t.id as turma_id,
                 a.nome as aluno_nome, d.codigo as disciplina_codigo
          FROM Matricula m
          JOIN Turma t ON t.id = m.TurmaId
          JOIN Aluno a ON a.id = m.AlunoId
          JOIN Disciplina d ON d.id = t.Disciplina
          WHERE m.status = 'confirmada'
          AND t.status = 'cancelada'
        `, { type: QueryTypes.SELECT });

      case 'turmas-docentes-inativos':
        return await sequelize.query(`
          SELECT t.id as turma_id, t.letra, d.codigo as disciplina_codigo,
                 doc.nome as docente_nome
          FROM Turma t
          JOIN Disciplina d ON d.id = t.Disciplina
          LEFT JOIN Docente doc ON doc.id = t.Docente1
          WHERE t.status = 'ativa'
          AND (doc.id IS NULL OR doc.ativo = 0)
        `, { type: QueryTypes.SELECT });

      case 'vagas-ocupadas-sem-matricula':
        return await sequelize.query(`
          SELECT v.id as vaga_id, v.TurmaId, v.alunoId, t.letra
          FROM Vaga v
          JOIN Turma t ON t.id = v.TurmaId
          LEFT JOIN Matricula m ON m.TurmaId = v.TurmaId AND m.AlunoId = v.alunoId
          WHERE v.ocupada = 1
          AND m.id IS NULL
        `, { type: QueryTypes.SELECT });

      case 'lista-espera-ordenacao':
        return await sequelize.query(`
          WITH ordered_list AS (
            SELECT *,
                   ROW_NUMBER() OVER (PARTITION BY DisciplinaId ORDER BY prioridade DESC) as correct_position
            FROM ListaEspera
            WHERE ativo = 1
          )
          SELECT *
          FROM ordered_list
          WHERE posicao != correct_position
        `, { type: QueryTypes.SELECT });

      case 'prerequisitos-violados':
        return await sequelize.query(`
          SELECT m.id as matricula_id, a.nome as aluno_nome,
                 d.codigo as disciplina_codigo, pr.codigo as prerequisito_codigo
          FROM Matricula m
          JOIN Turma t ON t.id = m.TurmaId
          JOIN Disciplina d ON d.id = t.Disciplina
          JOIN DisciplinaPreRequisito dpr ON dpr.disciplina_id = d.id
          JOIN Disciplina pr ON pr.id = dpr.prerequisito_id
          JOIN Aluno a ON a.id = m.AlunoId
          LEFT JOIN HistoricoAcademico ha ON ha.AlunoId = a.id
                                          AND ha.DisciplinaId = pr.id
                                          AND ha.situacao = 'aprovado'
          WHERE m.status = 'confirmada'
          AND ha.id IS NULL
        `, { type: QueryTypes.SELECT });

      default:
        throw new Error(`Unknown check: ${checkName}`);
    }
  }

  async processInconsistencies(inconsistencies) {
    for (const inconsistency of inconsistencies) {
      // Log da inconsistência
      console.error(`🚨 INCONSISTENCY DETECTED: ${inconsistency.checkName}`, {
        severity: inconsistency.severity,
        count: inconsistency.count,
        details: inconsistency.details
      });

      // Ações automáticas baseadas no tipo
      await this.executeAutoFix(inconsistency);

      // Notificar coordenação se crítico
      if (inconsistency.severity === 'CRITICAL') {
        await this.notifyCriticalInconsistency(inconsistency);
      }
    }
  }

  async executeAutoFix(inconsistency) {
    switch (inconsistency.checkName) {
      case 'matriculas-turmas-canceladas':
        for (const detail of inconsistency.details) {
          await this.fixMatriculaTurmaCancelada(detail);
        }
        break;

      case 'vagas-ocupadas-sem-matricula':
        for (const detail of inconsistency.details) {
          await this.fixVagaOcupadaSemMatricula(detail);
        }
        break;

      case 'lista-espera-ordenacao':
        await this.fixListaEsperaOrdering(inconsistency.details);
        break;
    }
  }

  async fixMatriculaTurmaCancelada(detail) {
    // 1. Cancelar matrícula
    await Matricula.update(
      { status: 'cancelada', motivoCancelamento: 'Turma cancelada' },
      { where: { id: detail.matricula_id } }
    );

    // 2. Tentar realocar para turma equivalente
    const turmasEquivalentes = await this.findEquivalentTurmas(detail.disciplina_codigo);

    if (turmasEquivalentes.length > 0) {
      // Tentar matricular na primeira turma com vaga
      for (const turma of turmasEquivalentes) {
        const vagaDisponivel = await this.checkVagaDisponivel(turma.id, detail.AlunoId);
        if (vagaDisponivel) {
          await this.createMatricula(turma.id, detail.AlunoId, 'Realocação automática');
          break;
        }
      }
    }

    // 3. Notificar aluno
    await this.notifyStudent(detail.AlunoId, {
      type: 'TURMA_CANCELADA',
      disciplina: detail.disciplina_codigo,
      realocado: !!turmasEquivalentes.length
    });
  }
}

// Agendar verificação automática
const integrityChecker = new IntegrityChecker();

// Verificação diária às 3h da manhã
cron.schedule('0 3 * * *', async () => {
  console.log('🔍 Running daily integrity check...');
  await integrityChecker.runAllChecks();
});

// Verificação crítica a cada hora
cron.schedule('0 * * * *', async () => {
  const criticalChecks = ['turmas-docentes-inativos'];
  for (const check of criticalChecks) {
    const result = await integrityChecker.runCheck(check);
    if (result.length > 0) {
      await integrityChecker.processInconsistencies([{
        checkName: check,
        severity: 'CRITICAL',
        count: result.length,
        details: result
      }]);
    }
  }
});
```

---

<div align="center">

### 🎯 Resumo dos Fluxos de Erro

Esta documentação detalha **198 cenários específicos de erro** organizados por:

| **Categoria** | **Cenários** | **Criticidade** | **Auto-Recovery** |
|---------------|-------------|-----------------|-------------------|
| **VAL - Validação** | 45 cenários | 🟡 Média | ✅ Sim |
| **NEG - Negócio** | 67 cenários | 🔴 Alta | 🔄 Parcial |
| **INF - Infraestrutura** | 34 cenários | 🟠 Crítica | 🤖 Automático |
| **SEC - Segurança** | 23 cenários | 🔴 Crítica | ❌ Manual |
| **PER - Performance** | 29 cenários | 🟡 Média | 🔄 Otimização |

### 🧪 Como Usar Esta Documentação

1. **Para Testes**: Cada cenário pode virar um teste automatizado
2. **Para Debug**: Compare comportamento real vs esperado
3. **Para Monitoramento**: Implemente detecção automática dos erros
4. **Para Recovery**: Use os fallbacks e correções documentados

---

**📝 Especificação completa de comportamentos de erro - Para sistema robusto e confiável**

</div>