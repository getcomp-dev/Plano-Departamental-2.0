# Guia de Instalação do MySQL Server e MySQL Workbench

## Pré-requisitos
- Sistema operacional Windows
- Privilégios de administrador
- Conexão com a internet

## Método 1: Download Manual do MySQL Installer (Recomendado)

### Passo 1: Download do MySQL Installer
1. Acesse o site oficial: https://dev.mysql.com/downloads/installer/
2. Escolha uma das opções:
   - **mysql-installer-community-8.0.39.0.msi** (157 MB) - Versão completa offline
   - **mysql-installer-web-community-8.0.39.0.msi** (2.4 MB) - Versão web que baixa componentes durante a instalação
3. Clique em "Download" (não é necessário criar conta)
4. Na próxima página, clique em "No thanks, just start my download"

### Passo 2: Execução do MySQL Installer
1. Execute o arquivo baixado como **Administrador** (clique com botão direito → "Executar como administrador")
2. Aceite o controle de usuário (UAC) se solicitado
3. O MySQL Installer será iniciado

### Passo 3: Escolha do Tipo de Instalação
1. Selecione **"Developer Default"** para instalar:
   - MySQL Server
   - MySQL Workbench
   - MySQL Shell
   - Conectores e documentação
2. Clique em "Next"

### Passo 4: Verificação de Requisitos
1. O installer verificará os requisitos do sistema
2. Se algum componente estiver faltando, será oferecido para download
3. Clique em "Execute" para instalar dependências se necessário
4. Clique em "Next" quando todos os requisitos estiverem satisfeitos

### Passo 5: Instalação
1. Revise os componentes que serão instalados
2. Clique em "Execute" para iniciar a instalação
3. Aguarde a conclusão (pode levar alguns minutos)
4. Clique em "Next" quando concluído

## Configuração do MySQL Server

### Passo 6: Configuração Inicial
1. **Type and Networking:**
   - Mantém as configurações padrão
   - Porta: 3306
   - Clique em "Next"

2. **Authentication Method:**
   - Selecione "Use Strong Password Encryption for Authentication"
   - Clique em "Next"

### Passo 7: Configuração de Senha do Root
1. **Accounts and Roles:**
   - Digite uma senha forte para o usuário root
   - **IMPORTANTE:** Anote esta senha em local seguro
   - Confirme a senha
   - Opcionalmente, crie usuários adicionais
   - Clique em "Next"

### Passo 8: Configuração do Serviço Windows
1. **Windows Service:**
   - Mantém as configurações padrão
   - Nome do serviço: MySQL80
   - Iniciar automaticamente: ✓
   - Clique em "Next"

### Passo 9: Aplicar Configurações
1. Clique em "Execute" para aplicar todas as configurações
2. Aguarde a conclusão
3. Clique em "Finish"

## Verificação da Instalação

### Testando o MySQL Server
Execute os comandos no PowerShell/CMD:

```powershell
# Verificar se o serviço está rodando
Get-Service -Name "MySQL80"

# Conectar ao MySQL (será solicitada a senha do root)
mysql -u root -p
```

### Testando o MySQL Workbench
1. Procure por "MySQL Workbench" no menu Iniciar
2. Execute o aplicativo
3. Clique na conexão "Local instance MySQL80"
4. Digite a senha do root configurada
5. Se conectar com sucesso, a instalação está correta

## Método 2: Usando Chocolatey (Alternativo)

Se você tem privilégios de administrador, pode usar o Chocolatey:

```powershell
# Execute o PowerShell como Administrador
# Instalar MySQL Server
choco install mysql -y

# Instalar MySQL Workbench
choco install mysql.workbench -y
```

## Solução de Problemas Comuns

### Erro de Conexão
- Verifique se o serviço MySQL está rodando
- Confirme se a porta 3306 não está bloqueada pelo firewall
- Verifique se a senha está correta

### Serviço não inicia
- Execute como administrador
- Verifique logs em: `C:\ProgramData\MySQL\MySQL Server 8.0\Data\`

### Esqueceu a senha do root
1. Pare o serviço MySQL
2. Inicie em modo de recuperação
3. Redefina a senha usando comandos SQL

## Próximos Passos

Após a instalação bem-sucedida:
1. Configure usuários adicionais se necessário
2. Configure backup automático
3. Ajuste configurações de performance conforme necessário
4. Instale drivers/conectores para suas aplicações

## Links Úteis
- [Documentação oficial MySQL](https://dev.mysql.com/doc/)
- [MySQL Workbench Manual](https://dev.mysql.com/doc/workbench/en/)
- [Tutoriais MySQL](https://dev.mysql.com/doc/mysql-tutorial-excerpt/8.0/en/)