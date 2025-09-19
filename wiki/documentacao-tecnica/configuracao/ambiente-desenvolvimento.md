# ⚙️ Configuração do Ambiente de Desenvolvimento

## 📋 Sumário

- [📋 Sumário](#-sumário)
- [🎯 Pré-requisitos](#-pré-requisitos)
- [🛠️ Instalação e Configuração](#-instalação-e-configuração)
  - [1️⃣ Configuração do Banco de Dados](#1-configuração-do-banco-de-dados)
  - [2️⃣ Configuração do Backend](#2-configuração-do-backend)
  - [3️⃣ Configuração do Frontend](#3-configuração-do-frontend)
- [🚀 Executando o Sistema](#-executando-o-sistema)
- [🔧 Configurações Específicas](#-configurações-específicas)
- [🐛 Troubleshooting](#-troubleshooting)
- [🧪 Ambiente de Testes](#-ambiente-de-testes)

---

## 🎯 Pré-requisitos

### 💻 Software Necessário

| Software | Versão Mínima | Versão Recomendada | Download |
|----------|---------------|-------------------|-----------|
| **Node.js** | 12.x | 16.x LTS | https://nodejs.org |
| **npm** | 6.x | 8.x | Incluído com Node.js |
| **MySQL** | 5.7 | 8.0 | https://mysql.com/downloads |
| **Git** | 2.20+ | Mais recente | https://git-scm.com |

### 🔧 Ferramentas Recomendadas

| Ferramenta | Propósito | Download |
|------------|-----------|-----------|
| **VS Code** | Editor de código | https://code.visualstudio.com |
| **MySQL Workbench** | Gerenciador de banco | https://mysql.com/products/workbench |
| **Postman** | Teste de APIs | https://postman.com |
| **Git Bash** (Windows) | Terminal Git | https://git-scm.com |

### 📱 Extensões VS Code Recomendadas

```json
{
  "recommendations": [
    "ms-vscode.vscode-json",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "octref.vetur",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.sublime-keybindings"
  ]
}
```

---

## 🛠️ Instalação e Configuração

### 1️⃣ Configuração do Banco de Dados

#### 📥 Instalação MySQL

**Windows:**
1. Download MySQL Installer do site oficial
2. Instalar MySQL Server + MySQL Workbench
3. Configurar password do usuário root

**macOS (via Homebrew):**
```bash
brew install mysql
brew services start mysql
mysql_secure_installation
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install mysql-server
sudo mysql_secure_installation
```

#### 🗄️ Criação do Banco

```sql
-- Conectar como root
mysql -u root -p

-- Criar banco de dados
CREATE DATABASE plano_departamental CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Criar usuário específico (opcional, recomendado)
CREATE USER 'plano_user'@'localhost' IDENTIFIED BY 'senha_segura';
GRANT ALL PRIVILEGES ON plano_departamental.* TO 'plano_user'@'localhost';
FLUSH PRIVILEGES;

-- Verificar criação
SHOW DATABASES;
USE plano_departamental;
```

#### 🔧 Configuração de Conexão

Editar arquivo `plano-back/config/config.json`:

```json
{
  "development": {
    "username": "plano_user",
    "password": "senha_segura",
    "database": "plano_departamental",
    "host": "127.0.0.1",
    "port": 3306,
    "dialect": "mysql",
    "timezone": "-03:00",
    "define": {
      "timestamps": true,
      "underscored": false,
      "freezeTableName": true
    },
    "pool": {
      "max": 10,
      "min": 0,
      "acquire": 30000,
      "idle": 10000
    }
  }
}
```

### 2️⃣ Configuração do Backend

#### 📁 Navegação e Instalação

```bash
# Clone do repositório (se necessário)
git clone <url-do-repositorio>
cd Plano-Departamental-2.0/plano-back

# Instalação das dependências
npm install

# Verificar se todas as dependências foram instaladas
npm list --depth=0
```

#### 🗄️ Configuração do Sequelize

Inicializar e popular o banco de dados:

```bash
# Se houver migrations (verifique se existe pasta migrations/)
npx sequelize-cli db:migrate

# Se houver seeds (dados iniciais)
npx sequelize-cli db:seed:all
```

**Se não houver migrations**, você pode precisar criar as tabelas manualmente ou usar um script SQL:

```bash
# Verificar se existe arquivo drop_all.sql ou similar
ls *.sql

# Se existir, executar:
mysql -u plano_user -p plano_departamental < script_criacao.sql
```

#### 🔑 Configuração de Variáveis de Ambiente

Criar arquivo `.env` na raiz do backend (opcional):

```env
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=plano_departamental
DB_USER=plano_user
DB_PASS=senha_segura
JWT_SECRET=chave-super-secreta-desenvolvimento
JWT_EXPIRES_IN=24h
```

#### ✅ Teste da Configuração Backend

```bash
# Executar em modo desenvolvimento
npm start

# Verificar se servidor iniciou (deve mostrar):
# Server running on port 3000
# Database connected successfully
```

Testar endpoint básico:
```bash
curl http://localhost:3000/api/test
# ou abrir no navegador
```

### 3️⃣ Configuração do Frontend

#### 📁 Navegação e Instalação

```bash
# Navegar para pasta do frontend
cd ../plano-front

# Instalar dependências
npm install

# Verificar instalação
npm list vue
```

#### 🔧 Configuração da API

Editar `src/services/axios.js`:

```javascript
import axios from 'axios';

// Configuração para desenvolvimento local
const baseURL = 'http://localhost:3000/api/';

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor para adicionar token JWT automaticamente
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default axiosInstance;
```

Editar `src/socketInstance.js`:

```javascript
import io from 'socket.io-client';

// Configuração para desenvolvimento local
const socket = io('http://localhost:3000', {
  autoConnect: true,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 5,
});

export default socket;
```

#### ✅ Teste da Configuração Frontend

```bash
# Executar em modo desenvolvimento
npm run serve

# Deve mostrar algo como:
# App running at:
# - Local:   http://localhost:8080/
# - Network: http://192.168.1.100:8080/
```

---

## 🚀 Executando o Sistema

### 🔄 Processo Completo

#### Terminal 1 - Backend
```bash
cd plano-back
npm start
```

#### Terminal 2 - Frontend
```bash
cd plano-front
npm run serve
```

#### Terminal 3 - Monitoramento (Opcional)
```bash
# Monitorar logs do MySQL
tail -f /var/log/mysql/error.log

# Ou no Windows com XAMPP
tail -f C:/xampp/mysql/data/mysql_error.log
```

### 🌐 Acessos

| Serviço | URL | Descrição |
|---------|-----|-----------|
| **Frontend** | http://localhost:8080 | Interface principal do usuário |
| **Backend API** | http://localhost:3000 | API REST endpoints |
| **Socket.IO** | ws://localhost:3000 | WebSocket para tempo real |
| **MySQL** | localhost:3306 | Banco de dados |

### 👤 Usuário de Teste

Se existir sistema de autenticação, criar usuário inicial:

```sql
-- Exemplo de inserção de usuário admin
INSERT INTO Usuario (nome, email, senha, perfil) VALUES
('Administrador', 'admin@ufjf.br', 'hash_da_senha', 'admin');
```

---

## 🔧 Configurações Específicas

### 📊 Configuração de Logs

Criar arquivo `plano-back/config/winston.js`:

```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'plano-back' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

module.exports = logger;
```

### 🔒 Configuração de CORS

No arquivo `plano-back/app.js`, ajustar CORS para desenvolvimento:

```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:8080',  // Frontend local
    'http://localhost:3000'   // Testes locais
  ],
  credentials: true,
  optionsSuccessStatus: 200
}));
```

### 📁 Configuração de Arquivos Estáticos

```javascript
// Servir arquivos estáticos para PDFs, downloads, etc.
app.use('/files', express.static(path.join(__dirname, 'public')));
```

### 🔄 Hot Reload Configuração

No `vue.config.js`:

```javascript
module.exports = {
  devServer: {
    port: 8080,
    host: 'localhost',
    hot: true,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      }
    }
  },
  configureWebpack: {
    devtool: 'source-map'
  }
};
```

---

## 🐛 Troubleshooting

### ❌ Problemas Comuns

#### Backend não conecta com MySQL

**Sintomas:**
```
Error: Access denied for user 'root'@'localhost'
SequelizeConnectionRefusedError: connect ECONNREFUSED 127.0.0.1:3306
```

**Soluções:**
1. Verificar se MySQL está rodando:
   ```bash
   # Windows
   net start mysql80

   # macOS
   brew services start mysql

   # Linux
   sudo systemctl start mysql
   ```

2. Testar conexão manual:
   ```bash
   mysql -u root -p -h localhost -P 3306
   ```

3. Verificar configurações em `config/config.json`

#### Frontend não consegue conectar com Backend

**Sintomas:**
```
Network Error
CORS error
Failed to load resource: net::ERR_CONNECTION_REFUSED
```

**Soluções:**
1. Verificar se backend está rodando na porta correta
2. Confirmar URLs em `axios.js` e `socketInstance.js`
3. Verificar configuração CORS no backend

#### Dependências npm faltando

**Sintomas:**
```
Module not found: Error: Can't resolve 'module-name'
```

**Soluções:**
```bash
# Limpar cache e reinstalar
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# Ou forçar reinstalação específica
npm install module-name --save
```

#### Porta já em uso

**Sintomas:**
```
Error: listen EADDRINUSE :::3000
```

**Soluções:**
```bash
# Ver processo usando a porta
netstat -an | findstr :3000  # Windows
lsof -ti:3000                # macOS/Linux

# Matar processo
taskkill /PID PID_NUMBER /F  # Windows
kill -9 PID_NUMBER           # macOS/Linux

# Ou usar porta diferente
PORT=3001 npm start
```

### 🔧 Scripts de Diagnóstico

Criar `scripts/diagnose.js`:

```javascript
const mysql = require('mysql2/promise');
const axios = require('axios');

async function diagnose() {
  console.log('🔍 Iniciando diagnóstico...');

  // Testar conexão MySQL
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'plano_user',
      password: 'senha_segura',
      database: 'plano_departamental'
    });
    console.log('✅ Conexão MySQL OK');
    await connection.end();
  } catch (error) {
    console.log('❌ Conexão MySQL ERRO:', error.message);
  }

  // Testar backend
  try {
    const response = await axios.get('http://localhost:3000/api/test');
    console.log('✅ Backend API OK');
  } catch (error) {
    console.log('❌ Backend API ERRO:', error.message);
  }

  // Testar frontend
  try {
    const response = await axios.get('http://localhost:8080');
    console.log('✅ Frontend OK');
  } catch (error) {
    console.log('❌ Frontend ERRO:', error.message);
  }
}

diagnose();
```

---

## 🧪 Ambiente de Testes

### 📊 Configuração de Banco de Teste

```json
{
  "test": {
    "username": "plano_user",
    "password": "senha_segura",
    "database": "plano_departamental_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "logging": false
  }
}
```

### 🧪 Scripts de Teste

No `package.json` do backend:

```json
{
  "scripts": {
    "test": "NODE_ENV=test jest",
    "test:watch": "NODE_ENV=test jest --watch",
    "test:coverage": "NODE_ENV=test jest --coverage"
  }
}
```

### 📊 Dados de Teste (Seeds)

Criar `seeders/demo-data.js`:

```javascript
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Curso', [
      {
        nome: 'CIÊNCIA DA COMPUTAÇÃO',
        codigo: 'COMP',
        turno: 'INTEGRAL',
        alunosEntrada: 40,
        alunosEntrada2: 0
      }
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Curso', null, {});
  }
};
```

---

<div align="center">

### ✅ Checklist de Configuração

- [ ] MySQL instalado e configurado
- [ ] Node.js e npm atualizados
- [ ] Dependências instaladas (backend e frontend)
- [ ] Banco de dados criado
- [ ] Configurações de conexão ajustadas
- [ ] URLs da API configuradas
- [ ] Backend iniciando sem erros
- [ ] Frontend carregando corretamente
- [ ] Comunicação entre frontend e backend funcionando

---

**🎯 Próximos passos**: Consulte a [documentação funcional](../../documentacao-funcional/) para entender como usar o sistema

</div>