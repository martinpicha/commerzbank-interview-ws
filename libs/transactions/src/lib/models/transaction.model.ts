export type TransactionCategory = 'Food' | 'Entertainment' | 'Salary' | 'Unknown';
export type TransactionType = 'Card payment' | 'Fee' | 'Transfer';

export interface RawTransaction {
  date: string;
  who: string;
  category: TransactionCategory;
  type: TransactionType;
  amount: number;
}

export abstract class Transaction {
  date: Date;
  who: string;
  category: TransactionCategory;
  type: TransactionType;
  amount: number;

  protected constructor(data: RawTransaction) {
    this.date = new Date(data.date);
    this.who = data.who;
    this.category = data.category;
    this.type = data.type;
    this.amount = data.amount;
  }

  abstract getFormattedAmount(): string;
  abstract getAmountColor(): string;
  getCategoryPillClass(): string {
    return this.category.toLowerCase();
  }
}

export class OutgoingTransaction extends Transaction {
  constructor(data: RawTransaction) {
    super(data);
  }

  getFormattedAmount(): string {
    return `-${this.amount.toLocaleString('cs-CZ', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Kč`;
  }

  getAmountColor(): string {
    return 'standard';
  }
}

export class IncomingTransaction extends Transaction {
  constructor(data: RawTransaction) {
    super(data);
  }

  getFormattedAmount(): string {
    return `+ ${this.amount.toLocaleString('cs-CZ', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Kč`;
  }

  getAmountColor(): string {
    return 'green';
  }
}

export function createTransaction(data: RawTransaction): Transaction {
  if (data.type === 'Transfer') {
    return new IncomingTransaction(data);
  }
  return new OutgoingTransaction(data);
}
