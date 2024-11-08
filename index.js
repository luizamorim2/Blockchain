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
        this.nonce = 0;
        this.hash = this.generateHash();
    }

    generateHash() {
        return crypto.createHash('sha256')
            .update(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce)
            .digest('hex');
    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.generateHash();
        }
        console.log(`Bloco minerado: ${this.hash}`);
    }
}

class Blockchain {
    constructor(difficulty = 2) {
        this.chain = [this.createGenesisBlock()];
        this.pendingTransactions = [];
        this.difficulty = difficulty;
    }

    createGenesisBlock() {
        return new Block(Date.now(), [], '0');
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions() {
        const newBlock = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
        newBlock.mineBlock(this.difficulty);
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

    getTransactionHistory(address) {
        const history = [];
        for (const block of this.chain) {
            for (const transaction of block.transactions) {
                if (transaction.fromAddress === address || transaction.toAddress === address) {
                    history.push(transaction);
                }
            }
        }
        return history;
    }
}

let lcoin = new Blockchain(3);

console.log('Criando transações.');
lcoin.addTransaction(new Transaction('0x0001', '0x0002', 10));
lcoin.addTransaction(new Transaction('0x0002', '0x0001', 5));

console.log('Iniciando mineração.');
lcoin.minePendingTransactions();

console.log('Criando mais transações.');
lcoin.addTransaction(new Transaction('0x0001', '0x0003', 20));
lcoin.addTransaction(new Transaction('0x0003', '0x0001', 15));

console.log('Iniciando nova mineração.');
lcoin.minePendingTransactions();

console.log('Histórico de transações para 0x0001:');
console.log(lcoin.getTransactionHistory('0x0001'));

console.log('A blockchain é válida?', lcoin.isChainValid() ? 'Sim' : 'Não');
console.log(JSON.stringify(lcoin, null, 4));
