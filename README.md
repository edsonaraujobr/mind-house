## ✅ Instalando dependências

1. Ter o gerenciador de pacotes npm [instalado](https://www.npmjs.com/)
2. Executar o comando para instalar todos os pacotes necessários na raiz do projeto: 
```bash
npm i
```
3. Pronto, agora suas dependencias estão instaladas!

## 🐳 Configurando o banco de dados com Docker

1. [Baixe](https://www.docker.com/) o docker no seu computador caso ainda não tenha
2. na raiz do projeto subir um container com o banco de dados: 
```bash
docker compose up -d
```
3. Verifique se o seu container está rodando através do comando
```bash
docker ps
```
4. Se estiver rodando, é hora de executar as migrations! Na raiz do projeto execute: 
```bash
npm run migrate:deploy 
```
5. Pronto, agora o seu banco de dados está configurado!

## ⚙️ Configurando variáveis de ambiente

1. Primeiro é necessário criar um arquivo na raiz do projeto chamado .env
2. o arquivo .env deve ter a mesma estrutura do arquivo de exemplo chamado test.env
3. Você vai preencher as variaveis com uma url do banco de dados que você rodou através do docker, basta copiar a mesma do test.env, uma porta (geralmente 3000) e um token jwt, você pode gerar um token aleatório através do comando:
```bash
openssl rand -base64 64
```
4. Pronto, agora seu ambiente está pronto para desenvolvimento!

## 🚀 Rodando a aplicação
1. Para rodar sua aplicação e visualizar, basta na raiz do projeto executar:
```bash
npm run start
```
2. Caso você queira ao fazer uma alteração e visualizar em tempo real, digite:
```bash
npm run dev
```
3. Pronto! agora é só usar o link do navegador e testar as requisições através do postman, por exemplo.
