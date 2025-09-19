# 💻 Glossário de Termos Técnicos

## 📋 Sumário

- [📋 Sumário](#-sumário)
- [🎯 Sobre este Glossário](#-sobre-este-glossário)
- [🏗️ Arquitetura e Padrões](#-arquitetura-e-padrões)
- [🌐 Web e HTTP](#-web-e-http)
- [🗄️ Banco de Dados](#-banco-de-dados)
- [🔧 JavaScript e Node.js](#-javascript-e-nodejs)
- [🎨 Frontend e Vue.js](#-frontend-e-vuejs)
- [🔒 Segurança](#-segurança)
- [📊 Ferramentas e Utilitários](#-ferramentas-e-utilitários)

---

## 🎯 Sobre este Glossário

Este glossário define termos técnicos utilizados no desenvolvimento e operação do Sistema Plano Departamental 2.0. É direcionado para desenvolvedores, administradores de sistema e profissionais de TI.

---

## 🏗️ Arquitetura e Padrões

### **API (Application Programming Interface)**
Interface de programação que define como componentes de software devem interagir. No sistema, refere-se aos endpoints REST que o frontend consome.

**Exemplo no projeto:**
```javascript
// Endpoint da API
GET /api/cursos
POST /api/turmas
```

### **SPA (Single Page Application)**
Aplicação web que carrega uma única página HTML e atualiza o conteúdo dinamicamente via JavaScript, sem recarregar a página completa.

**Características:**
- Navegação mais fluida
- Menor transferência de dados
- Experiência similar a aplicativos nativos

### **MVC (Model-View-Controller)**
Padrão arquitetural que separa a aplicação em três componentes interconectados:
- **Model**: Gerencia dados e lógica de negócio
- **View**: Interface de usuário
- **Controller**: Intermediário entre Model e View

**No projeto:**
```
Backend Express.js:
├── Models (Sequelize) - Dados
├── Routes - Controllers
└── Frontend Vue.js - Views
```

### **ORM (Object-Relational Mapping)**
Técnica que mapeia dados entre sistemas incompatíveis usando linguagens orientadas a objetos. O projeto usa **Sequelize** como ORM.

**Exemplo:**
```javascript
// Sequelize Model
const Curso = sequelize.define('Curso', {
  nome: DataTypes.STRING,
  codigo: DataTypes.STRING
});

// Uso
const cursos = await Curso.findAll();
```

### **REST (Representational State Transfer)**
Estilo arquitetural para sistemas distribuídos, especialmente web services. Usa verbos HTTP padrão (GET, POST, PUT, DELETE).

**Convenções REST no projeto:**
- `GET /api/recursos` - Listar
- `GET /api/recursos/:id` - Obter um
- `POST /api/recursos` - Criar
- `PUT /api/recursos/:id` - Atualizar
- `DELETE /api/recursos/:id` - Excluir

### **Middleware**
Software que atua como ponte entre diferentes aplicações ou componentes, interceptando e processando requisições.

**Exemplos no Express.js:**
```javascript
// CORS Middleware
app.use(cors());

// JWT Authentication Middleware
app.use(jwt({ secret: 'chave-secreta' }));

// Body Parser Middleware
app.use(bodyParser.json());
```

---

## 🌐 Web e HTTP

### **CORS (Cross-Origin Resource Sharing)**
Mecanismo que permite que recursos em uma página web sejam requisitados de um domínio diferente do domínio da página.

**Configuração no projeto:**
```javascript
app.use(cors({
  origin: 'http://localhost:8080', // Frontend
  credentials: true
}));
```

### **WebSocket**
Protocolo de comunicação que fornece canais de comunicação full-duplex sobre uma única conexão TCP. Usado para comunicação em tempo real.

**Socket.IO no projeto:**
```javascript
// Servidor
io.emit('turmaCreated', novaTurma);

// Cliente
socket.on('turmaCreated', (turma) => {
  // Atualizar interface
});
```

### **HTTP Status Codes**
Códigos padrão que indicam o resultado de uma requisição HTTP.

**Códigos comuns no projeto:**
- `200` - OK (sucesso)
- `201` - Created (criado com sucesso)
- `400` - Bad Request (requisição inválida)
- `401` - Unauthorized (não autorizado)
- `404` - Not Found (não encontrado)
- `500` - Internal Server Error (erro interno)

### **JSON (JavaScript Object Notation)**
Formato de intercâmbio de dados baseado em texto, derivado do JavaScript mas independente de linguagem.

**Exemplo de response:**
```json
{
  "id": 1,
  "nome": "CIÊNCIA DA COMPUTAÇÃO",
  "codigo": "COMP",
  "turno": "INTEGRAL"
}
```

---

## 🗄️ Banco de Dados

### **SGBD (Sistema de Gerenciamento de Banco de Dados)**
Software que facilita a criação, manutenção e uso de bancos de dados. O projeto usa **MySQL**.

### **Migration**
Script que modifica a estrutura do banco de dados de forma controlada e versionada.

**Exemplo Sequelize:**
```javascript
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Cursos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  }
};
```

### **Foreign Key (Chave Estrangeira)**
Campo que cria um link entre duas tabelas, referenciando a chave primária de outra tabela.

**Exemplo:**
```sql
ALTER TABLE Turma
ADD CONSTRAINT FK_Turma_Disciplina
FOREIGN KEY (Disciplina) REFERENCES Disciplina(id);
```

### **Join**
Operação que combina linhas de duas ou mais tabelas baseada em uma coluna relacionada.

**Tipos usados:**
- **INNER JOIN**: Apenas registros com correspondência
- **LEFT JOIN**: Todos da tabela esquerda + correspondências da direita
- **INCLUDE**: Equivalente Sequelize para JOIN

### **Index (Índice)**
Estrutura de dados que melhora a velocidade das operações de consulta em uma tabela.

**Configuração no modelo:**
```javascript
{
  indexes: [
    {
      unique: true,
      fields: ['letra', 'periodo', 'Disciplina', 'Plano']
    }
  ]
}
```

### **Connection Pool**
Conjunto de conexões de banco de dados reutilizáveis, mantidas em cache para melhor performance.

---

## 🔧 JavaScript e Node.js

### **Node.js**
Runtime JavaScript construído no motor V8 do Chrome, que executa JavaScript no servidor.

**Características:**
- Event-driven (orientado a eventos)
- Non-blocking I/O (I/O não bloqueante)
- Single-threaded com event loop

### **NPM (Node Package Manager)**
Gerenciador de pacotes padrão do Node.js, usado para instalar e gerenciar dependências.

**Comandos essenciais:**
```bash
npm install         # Instalar dependências
npm start          # Executar aplicação
npm run build      # Build de produção
```

### **Express.js**
Framework web minimalista para Node.js, usado para construir APIs e aplicações web.

**Exemplo básico:**
```javascript
const express = require('express');
const app = express();

app.get('/api/teste', (req, res) => {
  res.json({ message: 'Hello World' });
});

app.listen(3000);
```

### **Async/Await**
Sintaxe que torna o código assíncrono mais legível, baseada em Promises.

**Comparação:**
```javascript
// Com Promises
curso.save()
  .then(result => console.log(result))
  .catch(error => console.error(error));

// Com Async/Await
try {
  const result = await curso.save();
  console.log(result);
} catch (error) {
  console.error(error);
}
```

### **Callback**
Função passada como argumento para outra função, executada em momento específico.

### **Promise**
Objeto que representa a eventual conclusão (ou falha) de uma operação assíncrona.

### **Event Loop**
Mecanismo que permite ao Node.js executar operações I/O não-bloqueantes, apesar do JavaScript ser single-threaded.

---

## 🎨 Frontend e Vue.js

### **Vue.js**
Framework JavaScript progressivo para construção de interfaces de usuário.

**Características:**
- Reativo (reactive)
- Baseado em componentes
- Virtual DOM
- Curva de aprendizado suave

### **SFC (Single File Component)**
Formato de arquivo do Vue.js que encapsula template, script e style em um único arquivo `.vue`.

**Exemplo:**
```vue
<template>
  <div>{{ message }}</div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello Vue!'
    };
  }
};
</script>

<style scoped>
div { color: blue; }
</style>
```

### **Vue Router**
Roteador oficial do Vue.js para construção de SPAs.

**Configuração:**
```javascript
const routes = [
  { path: '/', component: Home },
  { path: '/cursos', component: Cursos }
];

const router = new VueRouter({ routes });
```

### **Vuex**
Padrão de gerenciamento de estado + biblioteca para aplicações Vue.js.

**Estrutura:**
```javascript
const store = new Vuex.Store({
  state: { count: 0 },
  mutations: {
    increment(state) { state.count++; }
  },
  actions: {
    incrementAsync({ commit }) {
      setTimeout(() => commit('increment'), 1000);
    }
  }
});
```

### **Reactive Data**
Sistema do Vue.js que detecta automaticamente mudanças nos dados e atualiza a DOM.

### **Virtual DOM**
Representação virtual da DOM real mantida na memória, usada para otimizar atualizações.

### **Component Lifecycle**
Hooks que permitem executar código em diferentes momentos da vida de um componente.

**Principais hooks:**
- `created()` - Componente criado
- `mounted()` - Componente montado na DOM
- `updated()` - Dados atualizados
- `destroyed()` - Componente destruído

### **Props**
Mecanismo para passar dados de componente pai para componente filho.

### **Emit**
Mecanismo para comunicação de componente filho para componente pai através de eventos.

---

## 🔒 Segurança

### **JWT (JSON Web Token)**
Padrão aberto que define uma maneira compacta e auto-contida para transmitir informações entre partes como um objeto JSON.

**Estrutura:**
```
header.payload.signature
```

**Exemplo de uso:**
```javascript
// Geração
const token = jwt.sign({ userId: 123 }, 'secret');

// Verificação
const decoded = jwt.verify(token, 'secret');
```

### **Hash**
Função matemática que converte dados de tamanho arbitrário em string de tamanho fixo.

**Algoritmos:**
- **MD5**: Inseguro, usado em versões antigas
- **SHA-256**: Mais seguro
- **bcrypt**: Recomendado para senhas

### **Salt**
Dado aleatório adicionado à entrada de uma função hash, usado para proteger contra ataques de dicionário.

### **HTTPS**
Versão segura do HTTP que usa criptografia TLS/SSL para proteger a comunicação.

### **Authentication vs Authorization**
- **Authentication**: Verificar identidade (quem você é)
- **Authorization**: Verificar permissões (o que você pode fazer)

### **SQL Injection**
Tipo de ataque onde código SQL malicioso é inserido em campos de entrada.

**Prevenção com ORM:**
```javascript
// Vulnerável (SQL raw)
const query = `SELECT * FROM users WHERE id = ${userId}`;

// Seguro (ORM)
const user = await User.findByPk(userId);
```

### **XSS (Cross-Site Scripting)**
Ataque que injeta scripts maliciosos em páginas web visualizadas por outros usuários.

**Prevenção:**
- Sanitização de entrada
- Content Security Policy (CSP)
- Escape de caracteres especiais

---

## 📊 Ferramentas e Utilitários

### **Linting**
Processo de análise estática de código para identificar problemas de estilo, bugs potenciais e construções suspeitas.

**ESLint no projeto:**
```javascript
module.exports = {
  extends: ['eslint:recommended', '@vue/prettier'],
  rules: {
    'no-console': 'warn',
    'no-unused-vars': 'error'
  }
};
```

### **Babel**
Transpilador JavaScript que converte código moderno em versões compatíveis com navegadores mais antigos.

### **Webpack**
Bundler de módulos que empacota arquivos JavaScript, CSS, imagens e outros assets.

### **Hot Reload**
Técnica de desenvolvimento que atualiza automaticamente a aplicação quando arquivos são modificados.

### **Build Process**
Processo de transformação do código fonte em versão otimizada para produção.

**Etapas típicas:**
1. Transpilação (Babel)
2. Bundling (Webpack)
3. Minificação
4. Otimização de assets

### **Environment Variables**
Variáveis definidas no sistema operacional que podem ser acessadas pela aplicação.

**Uso no Node.js:**
```javascript
const dbHost = process.env.DB_HOST || 'localhost';
const port = process.env.PORT || 3000;
```

### **Process Manager**
Ferramenta que gerencia processos de aplicação em produção.

**PM2 (exemplo):**
```bash
pm2 start app.js --name "plano-back"
pm2 restart plano-back
pm2 logs plano-back
```

### **Reverse Proxy**
Servidor que atua como intermediário para requisições de clientes buscando recursos de outros servidores.

**Nginx (exemplo):**
```nginx
server {
  listen 80;
  location /api {
    proxy_pass http://localhost:3000;
  }
  location / {
    proxy_pass http://localhost:8080;
  }
}
```

### **Load Balancer**
Distribui requisições entre múltiplas instâncias de uma aplicação para melhorar performance e disponibilidade.

### **CDN (Content Delivery Network)**
Rede geograficamente distribuída de servidores proxy que serve conteúdo aos usuários baseado na localização.

### **Caching**
Técnica de armazenamento temporário de dados frequentemente acessados para melhorar performance.

**Tipos:**
- **Browser Cache**: Cache do navegador
- **Application Cache**: Cache da aplicação (Redis)
- **Database Cache**: Cache de consultas
- **HTTP Cache**: Headers de cache HTTP

---

<div align="center">

### 🔗 Links Úteis

| Tecnologia | Documentação Oficial |
|------------|---------------------|
| **Node.js** | https://nodejs.org/docs |
| **Express.js** | https://expressjs.com |
| **Vue.js** | https://vuejs.org/guide |
| **Sequelize** | https://sequelize.org |
| **MySQL** | https://dev.mysql.com/doc |

---

**📝 Glossário vivo - Atualizado conforme novas tecnologias são incorporadas**

</div>