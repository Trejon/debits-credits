// export class Account {
//   id: number;
//   name: string;
//   balance: number;
//   constructor(id: number, name: string, balance: number) {
//     this.id = id;
//     this.name = name;
//     this.balance = balance;
//   }

//   static fromObject(obj: any): Account {
//     return new Account(obj.id, obj.name, obj.balance);
//   }

//   static fromArray(arr: any[]): Account[] {
//     return arr.map(Account.fromObject);
//   }

//   static async getAll(): Promise<Account[]> {
//     const result = await pool.query("SELECT * FROM accounts");
//     return Account.fromArray(result.rows);
//   }

//   static async getById(id: number): Promise<Account> {
//     const result = await pool.query("SELECT * FROM accounts WHERE id = $1", [id]);
//     return Account.fromObject(result.rows[0]);
//   }

//   static async getByName(name: string): Promise<Account> {
//     const result = await pool.query("SELECT * FROM accounts WHERE name = $1", [name]);
//     return Account.fromObject(result.rows[0]);
//   }

//   static async add(name: string, balance: number): Promise<Account> {
//     const result = await pool.query("INSERT INTO accounts (name, balance) VALUES ($1, $2) RETURNING *", [name, balance]);
//     return Account.fromObject(result.rows[0]);
//   }

//   static async update(id: number, name: string, balance: number): Promise<Account> {
//     const result = await pool.query("UPDATE accounts SET name = $1, balance = $2 WHERE id = $3 RETURNING *", [name, balance, id]);
//     return Account.fromObject(result.rows[0]);
//   }

//   static async delete(id: number): Promise<Account> {
//     const result = await pool.query("DELETE FROM accounts WHERE id = $1 RETURNING *", [id]);
//     return Account.fromObject(result.rows[0]);
//   }

//   static async deleteAll(): Promise<Account[]> {
//     const result = await pool.query("DELETE FROM accounts RETURNING *");
//     return Account.fromArray(result.rows);
//   }

//   static async getBalance(id: number): Promise<number> {
//     const result = await pool.query("SELECT balance FROM accounts WHERE id = $1", [id]);
//     return result.rows[0].balance;
//   }

//   static async deposit(id: number, amount: number): Promise<Account> {
//     const result = await pool.query("UPDATE accounts SET balance = balance + $1 WHERE id = $2 RETURNING *", [amount, id]);
//     return Account.fromObject(result.rows[0]);
//   }

//   static async withdraw(id: number, amount: number): Promise<Account> {
//     const result = await pool.query("UPDATE accounts SET balance = balance - $1 WHERE id = $2 RETURNING *", [amount, id]);
//     return Account.fromObject(result.rows[0]);
//   }

//   static async transfer(fromId: number, toId: number, amount: number): Promise<Account[]> {
//     const result = await pool.query("UPDATE accounts SET balance = balance - $1 WHERE id = $2; UPDATE accounts SET balance = balance + $1 WHERE id = $3 RETURNING *", [amount, fromId, toId]);
//     return Account.fromArray(result.rows);
//   }

//   static async transferWithTransaction(fromId: number, toId: number, amount: number): Promise<Account[]> {
//     const client = await pool.connect();
//     try {
//       await client.query("BEGIN");
//       const result = await client.query("UPDATE accounts SET balance = balance - $1 WHERE id = $2; UPDATE accounts SET balance = balance + $1 WHERE id = $3 RETURNING *", [amount, fromId, toId]);
//       await client.query("COMMIT");
//       return Account.fromArray(result.rows);
//     } catch (e) {
//       await client.query("ROLLBACK");
//       throw e;
//     } finally {
//       client.release();
//     }
//   }

//   static async transferWithTransactionAndLock(fromId: number, toId: number, amount: number): Promise<Account[]> {
//     const client = await pool.connect();
//     try {
//       await client.query("BEGIN");
//       const result = await client.query("UPDATE accounts SET balance = balance - $1 WHERE id = $2 FOR UPDATE; UPDATE accounts SET balance = balance + $1 WHERE id = $3 RETURNING *", [amount, fromId, toId]);
//       await client.query("COMMIT");
//       return Account.fromArray(result.rows);
//     } catch (e) {
//       await client.query("ROLLBACK");
//       throw e;
//     } finally {
//       client.release();
//     }
//   }

//   static async transferWithTransactionAndLockAndSavepoint(fromId: number, toId: number, amount: number): Promise<Account[]> {
//     const client = await pool.connect();
//     try {
//       await client.query("BEGIN");
//       const result = await client.query("SAVEPOINT A; UPDATE accounts SET balance = balance - $1 WHERE id = $2 FOR UPDATE; UPDATE accounts SET balance = balance + $1 WHERE id = $3 RETURNING *", [amount, fromId, toId]);
//       await client.query("RELEASE SAVEPOINT A");
//       await client.query("COMMIT");
//       return Account.fromArray(result.rows);
//     } catch (e) {
//       await client.query("ROLLBACK");
//       throw e;
//     } finally {
//       client.release();
//     }
//   }


// } 