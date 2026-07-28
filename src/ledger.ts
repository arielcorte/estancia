type Entry = { account: string; amount: bigint };
type Transaction = { id: string; description: string; entries: Entry[] };
type Ledger = Transaction[];

const ZERO = 0n;

/**
 * Adds a transaction to the ledger.
 * Rejects the transaction if the entries don't sum to zero.
 */
function post(ledger: Ledger, transaction: Transaction) {
  const sum = transaction.entries.reduce((prev, cur) => prev + cur.amount, ZERO);

  if (sum !== ZERO) {
    throw new Error(
      `Unbalanced transaction ${transaction.id}: entries sum to ${sum}`,
    );
  }

  ledger.push(transaction);
}

/**
 * Sums the entries for an account.
 */
function balance(ledger: Ledger, account: string): bigint {
  return ledger
    .flatMap((transaction) => transaction.entries)
    .filter((entry) => entry.account === account)
    .reduce((prev, cur) => prev + cur.amount, ZERO);
}
