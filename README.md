# NExTIFlix 🍿

![NExTIFlix](https://img.shields.io/badge/Status-Concluído-success)
![React Native](https://img.shields.io/badge/React_Native-20232A?style=flat&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-1B1F23?style=flat&logo=expo&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white)

O **NExTIFlix** é um aplicativo móvel de catálogo de filmes e séries, desenvolvido como projeto de avaliação universitária (AVP 2 - Mobile). Ele simula o funcionamento de uma plataforma de streaming moderna, onde é possível visualizar lançamentos, pesquisar títulos, adicionar novos filmes e gerenciar seus favoritos.

---

## 🚀 Funcionalidades

A aplicação cumpre 100% dos requisitos estipulados no escopo do projeto:

- **Catálogo Principal**: Exibição de filmes em formato de "Cards" horizontais (estilo Netflix), contendo Imagem de Capa, Título e Gênero.
- **Detalhes do Filme**: Tela aprofundada exibindo informações do filme selecionado, incluindo Ano de Lançamento e Sinopse.
- **Gerenciamento de Favoritos**: Possibilidade de favoritar/desfavoritar títulos, com reflexo imediato no backend e uma aba exclusiva para consultar a "Minha Lista".
- **Adicionar Novo Filme**: Formulário completo acessível na aba inferior para a inclusão via `POST` de um novo título no banco de dados.
- **Remoção de Títulos**: Opção de deletar um filme permanentemente do catálogo, validando as informações com um alerta nativo.

---

## 🛠️ Tecnologias e Arquitetura

O desenvolvimento seguiu rigorosos padrões técnicos exigidos e também agregou **Boas Práticas de Mercado (Clean Code / SOLID)**:

- **React Native & Expo Router**: Utilizado o padrão de roteamento via pasta `src/app` garantindo navegação fluída por abas (Tabs).
- **React Hooks**: Gerenciamento intensivo de ciclo de vida e estado global temporário através de `useState`, `useEffect` e `useFocusEffect` (para atualizações em tempo real ao transitar entre abas).
- **Axios & API Service Layer**: Consumo de API padronizado. Todas as chamadas REST estão centralizadas em um **Service Pattern** (`src/services/api.ts`), facilitando manutenção e leitura do código nas telas.
- **Separação de Preocupações (SoC)**: A estrutura de telas abandonou o acoplamento de código. As lógicas de UI (`index.tsx`) e folhas de estilo (`styles.ts`) foram isoladas perfeitamente no diretório `src/screens`.
- **JSON Server**: Backend fake emulando perfeitamente um banco de dados NoSQL rodando localmente para as requisições assíncronas em rede local.

---

## 📁 Estrutura de Pastas

```text
rn-catalog-movie/
├── db.json                 # Banco de Dados Fake
├── src/
│   ├── app/                # Rotas da aplicação (Expo Router)
│   ├── components/         # Componentes reutilizáveis
│   ├── constants/          # Constantes como Cores da paleta da marca
│   ├── screens/            # Lógica (index.tsx) e Estilos (styles.ts)
│   │   ├── AddMovieScreen/
│   │   ├── CatalogScreen/
│   │   ├── FavoritesScreen/
│   │   └── MovieDetailsScreen/
│   └── services/           # Regras de Negócio e HTTP (api.ts)
```

---

## 💻 Como Rodar o Projeto

### 1. Requisitos
- Node.js instalado.
- Expo CLI ou Expo Go no seu smartphone.

### 2. Instalação
Clone este repositório e instale as dependências:
```bash
npm install
```

### 3. Rodando o Banco de Dados (JSON Server)
Em um terminal separado, inicie a sua Fake API:
```bash
npm run server
```
*A API ficará acessível na porta `3000` (http://localhost:3000).*

### 4. Rodando o App (Frontend)
Em outro terminal, execute o ambiente do Expo:
```bash
npx expo start --clear
```

Leia o QR Code com o aplicativo **Expo Go** (Android/iOS) ou aperte `a` para rodar no Emulador Android caso tenha o Android Studio configurado.

---

## 🎓 Sobre

Desenvolvido para avaliação da disciplina de Programação Mobile. Focado em estabilidade de rede, componentização limpa e arquitetura manutenível.
