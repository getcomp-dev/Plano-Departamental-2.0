# Configuração do Servidor Plano Departamental

## Acesso ao Servidor
```bash
ssh planodcc@200.131.219.57 -p 2222
# password: pDCC2018

sudo su
# password: pDCC2018

cd Plano-Departamental-2.0
pm2 list
```

## Atualização do Servidor
```bash
git pull
pm2 restart 0
```

## Acesso ao MySQL
```bash
# No servidor, como root
mysql
# usuário: root | senha: '' (vazia)
```

## Configuração de Conexão Externa ao MySQL

### 1. Verificar Configuração do MySQL no Servidor
```bash
# No servidor, verificar se MySQL aceita conexões externas
sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf
# ou
sudo nano /etc/mysql/my.cnf

# Procurar por:
# bind-address = 127.0.0.1
# Alterar para:
# bind-address = 0.0.0.0
```

### 2. Criar Usuário para Acesso Remoto
```sql
-- No MySQL do servidor
CREATE USER 'usuario_remoto'@'%' IDENTIFIED BY 'senha_segura';
GRANT ALL PRIVILEGES ON *.* TO 'usuario_remoto'@'%';
FLUSH PRIVILEGES;

-- Ou para um usuário específico do seu IP
CREATE USER 'usuario_remoto'@'SEU_IP' IDENTIFIED BY 'senha_segura';
GRANT ALL PRIVILEGES ON *.* TO 'usuario_remoto'@'SEU_IP';
FLUSH PRIVILEGES;
```

### 3. Configurar Firewall (se necessário)
```bash
# No servidor, liberar porta 3306
sudo ufw allow 3306
# ou para IP específico
sudo ufw allow from SEU_IP to any port 3306
```

### 4. Reiniciar MySQL
```bash
sudo systemctl restart mysql
```

## Strings de Conexão

### Para Aplicações Node.js
```javascript
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '200.131.219.57',
  port: 3306,
  user: 'usuario_remoto',
  password: 'senha_segura',
  database: 'nome_do_banco'
});
```

### Para Python
```python
import mysql.connector

connection = mysql.connector.connect(
  host='200.131.219.57',
  port=3306,
  user='usuario_remoto',
  password='senha_segura',
  database='nome_do_banco'
)
```

### Para .NET/C#
```csharp
string connectionString = "Server=200.131.219.57;Port=3306;Database=nome_do_banco;Uid=usuario_remoto;Pwd=senha_segura;";
```

### Para PHP
```php
$host = '200.131.219.57';
$port = '3306';
$dbname = 'nome_do_banco';
$username = 'usuario_remoto';
$password = 'senha_segura';

$pdo = new PDO("mysql:host=$host;port=$port;dbname=$dbname", $username, $password);
```

## Ferramentas de Cliente MySQL

### MySQL Workbench
- Host: 200.131.219.57
- Port: 3306
- Username: usuario_remoto
- Password: senha_segura

### phpMyAdmin (se instalado no servidor)
- URL: http://200.131.219.57/phpmyadmin

### Linha de Comando Local
```bash
mysql -h 200.131.219.57 -P 3306 -u usuario_remoto -p
```

## Observações Importantes

1. **Segurança**: Sempre use senhas fortes para usuários remotos
2. **Firewall**: Configure o firewall para aceitar apenas IPs conhecidos
3. **SSL**: Configure conexões SSL para maior segurança
4. **Backup**: Sempre mantenha backups regulares do banco
5. **Monitoramento**: Use `pm2 monit` para monitorar os processos

## Comandos Úteis PM2
```bash
pm2 list          # Listar processos
pm2 restart 0     # Reiniciar processo ID 0
pm2 stop 0        # Parar processo ID 0
pm2 logs 0        # Ver logs do processo ID 0
pm2 monit         # Monitor em tempo real
pm2 save          # Salvar configuração atual
pm2 startup       # Configurar inicialização automática
```

## Troubleshooting

### Problema: Conexão recusada
1. Verificar se MySQL está rodando: `sudo systemctl status mysql`
2. Verificar se porta 3306 está aberta: `netstat -tulpn | grep 3306`
3. Verificar firewall: `sudo ufw status`

### Problema: Acesso negado
1. Verificar usuário e senha
2. Verificar permissões do usuário no MySQL
3. Verificar se o host está permitido

### Problema: Timeout de conexão
1. Verificar conectividade de rede
2. Verificar se não há proxy/firewall bloqueando
3. Testar com telnet: `telnet 200.131.219.57 3306`