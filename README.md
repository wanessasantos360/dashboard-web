# Dashboard E‑Commerce Olist

Dashboard web desenvolvido em **HTML/CSS/JavaScript** utilizando **Chart.js**, consumo de **API pública** e comunicação com **Back4App** via função serverless (API REST), atendendo aos requisitos da disciplina.

![Demo dashboard](./assets/gif-dashboard.gif)

## 👥 Equipe

- Wanessa Santos - 861193
---

## 🎯 Objetivo do Projeto

Criar um **dashboard de e‑commerce** baseado no dataset público da **Olist** (Kaggle), exibindo:

- Métricas de pedidos e faturamento
- Gráficos interativos com **Chart.js**
- Consumo de uma **API pública externa** (AwesomeAPI)
- CRUD completo de metas de vendas usando **Back4App** (API REST) por meio de uma **camada de back-end** (serverless function).

---

## 🧱 Tecnologias Utilizadas

- **HTML5** – estrutura da página
- **CSS3** – estilização (layout responsivo)
- **JavaScript (ES6+)** – lógica do frontend
- **Chart.js** – gráficos do dashboard
- **Bootstrap 5 (CDN)** – grid e componentes visuais
- **Back4App / Parse** – backend (banco de dados + API REST)
- **Vercel Serverless Functions** – API intermediária para proteger as chaves
- **API pública** – AwesomeAPI (cotações de moedas)

---

## 📂 Estrutura de Pastas

```text
.
├── api/
│   └── metas.js          # Função serverless (endpoint /api/metas) que fala com o Back4App
│
├── css/
│   └── style.css         # Estilos do dashboard
│
├── js/
│   ├── api.js            # Consumo da API pública (AwesomeAPI - cotações)
│   ├── charts.js         # Configuração e renderização dos gráficos Chart.js
│   ├── crud.js           # Funções de CRUD que consomem /api/metas
│   └── main.js           # Inicialização geral (gráficos, métricas, relógio, etc.)
│
├── index.html            # Página principal do dashboard
└── README.md             # Este arquivo
```

---

## 🔐 Variáveis de Ambiente (.env)

Para não expor as chaves do Back4App no código, elas ficam em um arquivo `.env`, que **não deve ser commitado no Git**.

Exemplo de `.env`:

```env
BACK4APP_APP_ID=SEU_APP_ID_AQUI
BACK4APP_JS_KEY=SEU_JS_KEY_AQUI
BACK4APP_BASE_URL=https://parseapi.back4app.com/classes/Metas
```

> Importante: o arquivo `.env` está listado no `.gitignore`, então só existe localmente e nas configurações de ambiente da plataforma de deploy (ex.: Vercel).

---

## 🌐 APIs Utilizadas

### 1. Back4App (CRUD de Metas)

- Classe: `Metas`
- Campos:
  - `mes` (String)
  - `valor` (Number) – valor da meta em R$
  - `realizado` (Number) – valor realizado em R$

A comunicação com o Back4App é feita **apenas** pelo arquivo `api/metas.js` (função serverless).  
O frontend chama somente o endpoint interno:

- `GET /api/metas` – listar metas
- `POST /api/metas` – criar meta
- `PUT /api/metas?id={objectId}` – atualizar meta
- `DELETE /api/metas?id={objectId}` – remover meta

### 2. API Pública (AwesomeAPI)

Arquivo: `js/api.js`

Endpoint usado:

```text
https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL
```

Dados exibidos no dashboard:

- Cotação do **USD/BRL**
- Cotação do **EUR/BRL**
- Cotação do **BTC/BRL**

Atualização automática a cada 60 segundos.

---

## 📊 Funcionalidades do Dashboard

1. **Cards de métricas principais**
   - Total de pedidos
   - Receita total
   - Ticket médio
   - Taxa de cancelamento

2. **Gráficos (Chart.js)**
   - Pedidos por mês (linha)
   - Status dos pedidos (doughnut)
   - Top categorias mais vendidas (barras)
   - Distribuição de avaliações (barras)

3. **API Pública**
   - Exibe em tempo real as cotações de USD, EUR e BTC em relação ao Real (R$).

4. **CRUD de Metas de Vendas (Back4App)**
   - Criar nova meta (mês, valor, realizado)
   - Listar metas cadastradas
   - Editar meta existente (modal)
   - Excluir meta
   - Cálculo automático da porcentagem atingida com indicação visual (cores diferente por faixa de %)

5. **Outras funcionalidades**
   - Relógio em tempo real no navbar
   - Layout responsivo

---

## ▶️ Como Rodar o Projeto Localmente

1. **Clonar o repositório**

```bash
git clone https://github.com/SEU-USUARIO/SEU-REPO.git
cd SEU-REPO
```

2. **Criar o arquivo `.env` na raiz**

```env
BACK4APP_APP_ID=SEU_APP_ID_AQUI
BACK4APP_JS_KEY=SEU_JS_KEY_AQUI
BACK4APP_BASE_URL=https://parseapi.back4app.com/classes/Metas
```

3. **Configurar a classe `Metas` no Back4App**

- Criar app no Back4App
- Criar classe `Metas` com os campos:
  - `mes` (String)
  - `valor` (Number)
  - `realizado` (Number)
- Copiar o `Application ID` e `JavaScript Key` para o `.env`

4. **Subir um servidor local simples**

Você pode usar a extensão **Live Server** do VS Code ou rodar um servidor HTTP simples (por exemplo, com Python):

```bash
# Python 3
python -m http.server 5500
```

Depois, abra no navegador:

```text
http://localhost:5500/
```

> Observação: em produção (Vercel/Render), a função serverless `api/metas.js` roda no servidor da plataforma e lê as variáveis de ambiente configuradas lá.

---

## ☁️ Deploy

### 1. GitHub

- Repositório da UNICAP:  
  `https://github.com/UNICAP-ORG/NOME-DO-REPO`  
  (substituir aqui pelo link real)

### 2. Plataforma de deploy (ex.: Vercel)

- URL do site publicado:  
  `https://SEU-PROJETO.vercel.app`  
  (substituir aqui pela URL real)

- Configurar no painel da Vercel (Project Settings → Environment Variables):

```text
BACK4APP_APP_ID=SEU_APP_ID_AQUI
BACK4APP_JS_KEY=SEU_JS_KEY_AQUI
BACK4APP_BASE_URL=https://parseapi.back4app.com/classes/Metas
```

Fazer um novo deploy após salvar as variáveis.

---

## 🎥 Vídeo de Demonstração

- Duração: até **4 minutos**
- Conteúdo sugerido:
  1. Breve apresentação da equipe
  2. Navegação pelo dashboard (cards + gráficos)
  3. Demonstração da API pública (cotações)
  4. CRUD completo das metas (criar, editar, excluir)
  5. Comentário rápido sobre a arquitetura (frontend + serverless + Back4App)

- Link do vídeo:  
  `https://link-do-video.com`  
  (substituir pelo link real – YouTube, Loom etc.)

---

## ✅ Requisitos Atendidos (Resumo)

- [x] HTML/CSS/JavaScript
- [x] Uso de **Chart.js**
- [x] Dados baseados em dataset real do **Kaggle (Olist)**
- [x] CSS próprio + Bootstrap
- [x] JS com funcionalidade dinâmica (gráficos, relógio, métricas)
- [x] Comunicação com **API REST** (Back4App) com pelo menos um CRUD completo
- [x] Consumo de **API pública** externa
- [x] Repositório GitHub + site publicado + zip + vídeo explicativo

