# 🎮 Tic Tac Toe

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](#)
[![.NET](https://img.shields.io/badge/.NET-51BDD4?style=for-the-badge&logo=dotnet&logoColor=white)](#)
[![SignalR](https://img.shields.io/badge/SignalR-0078D4?style=for-the-badge&logo=microsoft&logoColor=white)](#)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](#)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](#)
[![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)](#)

Uma aplicação Full Stack de Jogo da Velha com suporte a partidas multiplayer em tempo real. O projeto contempla um back-end robusto em C# (ASP.NET Core), comunicação bidirecional via WebSockets com SignalR, validação de regras de negócio em tempo real, registro de vitórias em banco de dados e um front-end dinâmico e responsivo construído com React e Vite.

## 🚀 Tecnologias Utilizadas

* **React & Vite:** Biblioteca para construção da interface de usuário com build otimizado.
* **Styled-Components:** Estilização componentizada e isolada no front-end.
* **C# & ASP.NET Core:** Framework web para construção da API REST e regras de negócio.
* **SignalR:** Biblioteca da Microsoft para adicionar funcionalidades web em tempo real (WebSockets).
* **PostgreSQL:** Banco de dados relacional robusto e open-source.
* **Entity Framework Core:** ORM para mapeamento, comunicação e gerenciamento do banco de dados.
* **Swagger:** Geração automática de documentação interativa para a API.

---

## 🛠️ Como configurar o projeto localmente

Siga o passo a passo abaixo para configurar, instalar e testar a aplicação na sua máquina.

### 1. Pré-requisitos

* [Node.js](https://nodejs.org/) (v18 ou superior) instalado.
* [.NET SDK](https://dotnet.microsoft.com/download) (versão 8.0) instalado.
* Instância do **PostgreSQL** rodando localmente (via pgAdmin, DBeaver ou Docker).
* Git instalado na máquina.
* Visual Studio 2022 ou VS Code.

### 2. Clonando o Repositório

Clone o repositório localmente:

```bash
git clone [https://github.com/doglast/tic-tac-toe.git](https://github.com/doglast/tic-tac-toe.git)
cd tic-tac-toe
```

### 3. Configurando a API (Back-end)
#### 1. Navegue até a pasta da API
```bash
cd backend
```

#### 2. Restaure as dependências do projeto C#:
```bash
dotnet restore
```

#### 3. Configuração do Banco de Dados: Abra o arquivo `appsettings.json` na pasta do back-end e configure a sua Connection String do PostgreSQL substituindo os campos do template pelos dados da sua base.
```bash
"ConnectionStrings": {
  "DefaultConnection": "Host=localhost;Port=SUAPORTA;Database=SEUDATABASE;Username=SEUUSERNAME;Password=SUASENHA"
}
```

#### 4. Aplique as Migrations para criar o banco de dados e as tabelas:
```bash
dotnet ef database update
```
*(Nota: Caso prefira também na pasta scripts tem o script para criação das tabelas usadas no projeto).*

#### 5. Inicie o servidor do back-end:
```bash
dotnet run
```
*(Nota: O terminal exibirá a porta HTTPS em que a API está rodando, por exemplo: https://localhost:7092. Anote essa porta).*

### 4. Configurando o React (Front-End)
#### 1. Abra um novo terminal e navegue até a pasta do front-end:
```bash
cd frontend
```

#### 2. Instale as dependências do Node:
```bash
npm install
```

#### 3. Conexão de Portas: 
Verifique se as URLs nos arquivos `src/services/api.js` e `src/hooks/useSignalR.js` estão apontando exatamente para a mesma porta HTTPS em que a sua API C# está rodando.


#### 3. Inicie o servidor de desenvolvimento do front-end:
```bash
npm run dev
```

---

## 🕹️ Como Testar o Jogo Online
Para vivenciar a experiência multiplayer P2P (Peer-to-Peer) com WebSockets funcionando localmente:

Com a API e o front-end rodando, acesse a URL gerada pelo Vite (geralmente http://localhost:5173) no seu navegador.

Abra uma nova aba (ou uma janela anônima/outro navegador) e acesse a mesma URL.

Na Tela 1 (Jogador 1): Digite o nome "Douglas", Código da Sala "10", escolha o símbolo "X" e clique em Entrar.

Na Tela 2 (Jogador 2): Digite um nome diferente (ex: "Amanda"), Código da Sala "10", escolha o símbolo "O" e clique em Entrar.

As telas sincronizarão os nomes automaticamente. Divirta-se clicando nos quadrados da Tela 1 e vendo a jogada ser refletida instantaneamente na Tela 2!

Bloqueios e Segurança: O sistema possui travas ativas. Sinta-se à vontade para testar tentar entrar na mesma sala usando um símbolo que já foi escolhido ou um nome que já está em uso para ver o sistema de validação em tempo real barrar a conexão.

Ao final da partida, o resultado será salvo pelo jogador vencedor e o componente de Ranking será atualizado no banco de dados, retornando o Top 10 com o sistema de medalhas.

---

## 🕹️ Como Testar o Jogo Offline

Caso você queira testar a versão inicial do projeto, onde a partida acontece localmente e os dois jogadores dividem o mesmo mouse e tela (sem a necessidade de WebSockets), o repositório conta com uma branch dedicada.

Para acessar e rodar essa versão:

### 1. No terminal, antes da execução do front-end ou da API mude para a branch `offline`:
```bash
git checkout offline
```

### 2. Com a API e o front-end rodando, acesse a URL gerada pelo Vite (geralmente http://localhost:5173) no seu navegador.

### 3. Preencha o nome dos dois jogadores e o jogo acontecerá na mesma aba, alternando os turnos a cada clique.

