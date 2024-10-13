# Uma blockchain basica

Este projeto é uma simples blockchain, que permite a criação de transações, mineração de blocos e verificação da integridade da cadeia.

---

## Pre-Requisitos

Para executar o projeto, é necessário ter o [Node.js](https://nodejs.org/pt/download/package-manager) instalado.


---

## Como Rodar o Projeto?

1. Clone este repositório:
   ```bash
   git clone https://github.com/luizamorim2/BChain.git
   ```

2. Execute o script utilizando:
    ```bash
    node index.js
    ```

---


## Funcionalidades

- **Criação de Transações:** Permite criar transações simples entre dois endereços.
- **Mineração de Blocos:** Agrupa as transações pendentes em um bloco, que é minerado e adicionado à blockchain.
- **Verificação da Integridade da Blockchain:** Garante que todos os blocos estão devidamente encadeados e não foram alterados.

---

## Explicação das Funções

### Transaction (classe)
Representa uma transação entre dois endereços.

- **Parâmetros:**
  - `sender`: Endereço do remetente.
  - `receiver`: Endereço do destinatário.
  - `amount`: Quantidade transferida.

### Block (classe)
Um bloco da blockchain que contém transações e um hash do bloco anterior.

- **Parâmetros:**
  - `timestamp`: O momento em que o bloco foi criado.
  - `transactions`: As transações dentro do bloco.
  - `previousHash`: O hash do bloco anterior.
  
- **Funções:**
  - `calculateHash()`: Gera um hash baseado no conteúdo do bloco.

### Blockchain (classe)
Gerencia toda a cadeia de blocos.

- **Funções:**
  - `createGenesisBlock()`: Cria o primeiro bloco da blockchain.
  - `getLatestBlock()`: Retorna o bloco mais recente.
  - `minePendingTransactions()`: Minera um bloco com as transações pendentes e o adiciona à blockchain.
  - `createTransaction()`: Adiciona uma nova transação à lista de transações pendentes.
  - `isChainValid()`: Verifica se todos os blocos na cadeia são válidos.

---

## Contact
**Discord**: *luiz.amorim*  
**Twitter**: *@Amoriim_Luiz*  
**Email**: *rluiz4353@gmail.com*  