const crypto = require('crypto');

class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

class Block {
    constructor(timestamp, transactions, previousHash = '') {
        this.timestamp = new Date(timestamp).toLocaleString();
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.generateHash();
    }

    generateHash() {
        return crypto.createHash('sha256')
            .update(this.previousHash + this.timestamp + JSON.stringify(this.transactions))
            .digest('hex');
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.pendingTransactions = [];
    }

    createGenesisBlock() {
        return new Block(Date.now(), [], '0');
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions() {
        const newBlock = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
        this.chain.push(newBlock);

        console.log('Bloco minerado com sucesso!');
        this.pendingTransactions = [];
    }

    addTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

        
            if (currentBlock.hash !== currentBlock.generateHash()) {
                return false;
            }

        
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

let simpleCoin = new Blockchain();

console.log('Criando transações...');
simpleCoin.addTransaction(new Transaction('0x0001', '0x0002', 10));
simpleCoin.addTransaction(new Transaction('0x0002', '0x0001', 5));

console.log('Iniciando mineração...');
simpleCoin.minePendingTransactions();

console.log('Criando mais transações...');
simpleCoin.addTransaction(new Transaction('0x0001', '0x0002', 20));
simpleCoin.addTransaction(new Transaction('0x0003', '0x0001', 15));

console.log('Iniciando nova mineração...');
simpleCoin.minePendingTransactions();

console.log('Criando mais transações...');
simpleCoin.addTransaction(new Transaction('0x0001', '0x0002', 16));
simpleCoin.addTransaction(new Transaction('0x0003', '0x0001', 11));

console.log('Iniciando nova mineração...');
simpleCoin.minePendingTransactions();

console.log('A blockchain é válida?', simpleCoin.isChainValid() ? 'Sim' : 'Não');
console.log(JSON.stringify(simpleCoin, null, 4));