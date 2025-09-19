# GUIA RÁPIDO: Conectar ao Servidor MySQL
# =====================================

## PASSO 1: Conectar ao Servidor via SSH

### 1.1. Abra um terminal/cmd e digite:
```bash
ssh planodcc@200.131.219.57 -p 2222
```
**Senha:** pDCC2018

### 1.2. Tornar-se root:
```bash
sudo su
```
**Senha:** pDCC2018

### 1.3. Navegar para o projeto:
```bash
cd Plano-Departamental-2.0
pm2 list
```

## PASSO 2: Configurar MySQL para Acesso Remoto

### 2.1. Editar configuração do MySQL:
```bash
nano /etc/mysql/mysql.conf.d/mysqld.cnf
```
**Alterar:** `bind-address = 127.0.0.1` 
**Para:** `bind-address = 0.0.0.0`

### 2.2. Acessar MySQL:
```bash
mysql
```
**Usuário:** root  
**Senha:** (vazia - apenas pressione Enter)

### 2.3. Criar usuário para acesso remoto:
```sql
CREATE USER 'usuario_remoto'@'%' IDENTIFIED BY 'sua_senha_aqui';
GRANT ALL PRIVILEGES ON *.* TO 'usuario_remoto'@'%';
FLUSH PRIVILEGES;
SHOW DATABASES;
exit
```

### 2.4. Configurar firewall:
```bash
ufw allow 3306
systemctl restart mysql
```

## PASSO 3: Testar Conexão do Seu PC

### 3.1. Via linha de comando:
```bash
mysql -h 200.131.219.57 -P 3306 -u usuario_remoto -p
```

### 3.2. Via MySQL Workbench:
- **Host:** 200.131.219.57
- **Port:** 3306
- **Username:** usuario_remoto
- **Password:** sua_senha_aqui

### 3.3. Via código (Node.js):
```javascript
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: '200.131.219.57',
  port: 3306,
  user: 'usuario_remoto',
  password: 'sua_senha_aqui',
  database: 'nome_do_banco'
});

connection.connect((err) => {
  if (err) {
    console.error('Erro de conexão: ' + err.stack);
    return;
  }
  console.log('Conectado como ID ' + connection.threadId);
});
```

## COMANDOS ÚTEIS PM2:

```bash
pm2 list          # Listar processos
pm2 restart 0     # Reiniciar aplicação
pm2 logs 0        # Ver logs
pm2 monit         # Monitor em tempo real
git pull          # Atualizar código
```

## TROUBLESHOOTING:

### Se não conseguir conectar:
1. **Verificar MySQL rodando:**
   ```bash
   systemctl status mysql
   ```

2. **Verificar porta aberta:**
   ```bash
   netstat -tulpn | grep 3306
   ```

3. **Verificar firewall:**
   ```bash
   ufw status
   ```

4. **Ver logs de erro:**
   ```bash
   tail -f /var/log/mysql/error.log
   ```

### Se der erro "Can't connect to MySQL server":
- Verificar se o bind-address foi alterado corretamente
- Verificar se o MySQL foi reiniciado
- Verificar se o firewall está liberando a porta 3306

### Se der erro "Access denied":
- Verificar se o usuário foi criado corretamente
- Verificar se as permissões foram concedidas
- Tentar conectar com o usuário root primeiro

## SEGURANÇA:
⚠️ **IMPORTANTE:** 
- Use senhas fortes para usuários remotos
- Configure firewall para aceitar apenas IPs conhecidos
- Considere usar SSL/TLS para conexões
- Faça backups regulares do banco de dados

---
**Data:** $(Get-Date)
**Servidor:** 200.131.219.57:2222 (SSH) / 200.131.219.57:3306 (MySQL)