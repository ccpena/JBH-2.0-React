import TransactionDTO from './TransactionDTO';

export default interface AccountDTO {
    id: string;
    description: string;
    activeBalance: number;
    passiveBalance: number;
    transactions: Array<TransactionDTO>;
}