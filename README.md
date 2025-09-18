# 🍽️ Pedrão App - Sistema de Pedidos para Restaurante

<div align="center">
  <img src="./assets/images/logo.jpg" alt="Logo Pedrão App" width="200" height="200">
  
  **Aplicativo móvel para gerenciamento de pedidos em restaurantes**
  
  [![React Native](https://img.shields.io/badge/React_Native-0.76.9-blue.svg)](https://reactnative.dev/)
  [![Expo](https://img.shields.io/badge/Expo-~52.0.43-black.svg)](https://expo.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-~5.3.3-blue.svg)](https://www.typescriptlang.org/)
</div>

## 📋 Sobre o Projeto

O **Pedrão App** é um sistema de pedidos desenvolvido para restaurantes, permitindo que garçons gerenciem pedidos de forma eficiente através de dispositivos móveis. Este projeto foi desenvolvido como parte do Projeto Integrador I do 4º semestre da UNIVESP.

### ✨ Funcionalidades

- 🏠 **Tela Inicial**: Interface de boas-vindas com logo do restaurante
- 👨‍💼 **Seleção de Garçom e Mesa**: Interface para escolha do garçom responsável e número da mesa
- 📝 **Gerenciamento de Pedidos**: 
  - Adição de produtos por categoria
  - Controle de quantidade
  - Visualização de itens do pedido
  - Exclusão de itens individuais
- 💾 **Persistência de Dados**: Integração com API backend para salvar pedidos
- 🎨 **Interface Intuitiva**: Design moderno com tema escuro e elementos visuais atrativos

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React Native 0.76.9** - Framework para desenvolvimento mobile multiplataforma
- **Expo ~52.0.43** - Plataforma para desenvolvimento e deploy de apps React Native
- **Expo Router ~4.0.20** - Roteamento baseado em arquivos
- **TypeScript ~5.3.3** - Superset do JavaScript com tipagem estática
- **Axios ^1.8.4** - Cliente HTTP para requisições à API
- **React Native Vector Icons ^10.2.0** - Biblioteca de ícones
- **React Native Picker ^2.9.0** - Componente de seleção

### Desenvolvimento
- **Jest ^29.2.1** - Framework de testes
- **Babel ^7.25.2** - Compilador JavaScript
- **Git** - Controle de versão

## 📱 Estrutura do Projeto

```
pedrao-app-mobile/
├── assets/
│   └── images/
│       └── logo.jpg
├── components/
│   └── modal/
│       └── index.tsx          # Modal para adicionar produtos
├── src/
│   ├── app/
│   │   ├── _layout.tsx        # Layout principal da aplicação
│   │   ├── index.tsx          # Tela inicial
│   │   ├── waiter.tsx         # Seleção de garçom e mesa
│   │   └── order.tsx          # Gerenciamento de pedidos
│   └── server/
│       └── axios.tsx          # Configuração da API
├── app.json                   # Configurações do Expo
├── package.json               # Dependências do projeto
└── tsconfig.json             # Configurações do TypeScript
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn
- Expo CLI instalado globalmente
- Dispositivo móvel com Expo Go ou emulador Android/iOS

### Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/pedrao-app-mobile.git
   cd pedrao-app-mobile
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configure a API:**
   - Edite o arquivo `src/server/axios.tsx`
   - Altere a `baseURL` para o endereço do seu servidor backend

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm start
   # ou
   expo start
   ```

5. **Execute o aplicativo:**
   - **No dispositivo móvel**: Instale o Expo Go e escaneie o QR code
   - **No emulador**: Pressione `a` para Android ou `i` para iOS

### Scripts Disponíveis

```bash
npm start          # Inicia o servidor de desenvolvimento
npm run android    # Executa no Android
npm run ios        # Executa no iOS
npm run web        # Executa no navegador
npm test           # Executa os testes
```

## 🔧 Configuração da API

O aplicativo se conecta a uma API backend. Para configurar:

1. Abra o arquivo `src/server/axios.tsx`
2. Altere a `baseURL` para o endereço do seu servidor:
   ```typescript
   export const api = axios.create({
       baseURL: 'http://SEU_IP:PORTA', // Ex: 'http://192.168.1.100:3002'
   })
   ```

### Endpoints Utilizados
- `GET /waiters` - Lista garçons
- `GET /tables` - Lista mesas
- `GET /products` - Lista categorias de produtos
- `GET /products/:categoryId` - Lista produtos por categoria
- `POST /orders-details` - Cria detalhes do pedido
- `GET /orders-details/find/:orderId` - Busca pedido por ID
- `DELETE /orders-details/delete-item/:orderId/:itemId` - Remove item do pedido
- `DELETE /orders-details/delete/:orderId` - Remove pedido completo
- `POST /orders/create` - Cria pedido final

## 📱 Capturas de Tela

### Tela Inicial
Interface de boas-vindas com logo do restaurante e botão de acesso.

### Seleção de Garçom e Mesa
Interface para escolha do garçom responsável e número da mesa.

### Gerenciamento de Pedidos
Tela principal para adicionar, visualizar e gerenciar itens do pedido.

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

## 👥 Equipe

Desenvolvido como parte do Projeto Integrador I - UNIVESP 4º Semestre.

## 📞 Suporte

Para dúvidas ou suporte, entre em contato através das issues do repositório.

---

<div align="center">
  <p>Feito com ❤️ para o Restaurante Pedrão</p>
</div>