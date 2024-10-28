import { NearBindgen, near, call, view, UnorderedMap, assert, NearPromise } from 'near-sdk-js';


type Transactions = {
  walletid: string;
  date: bigint;
  amount: string;
};

type User = {
  username: string;
  firstname: string;
  lastname: string;
  walletid: string;
  subscribed: boolean;
  plan: number | null;
  subscriptionDate: bigint | null;
};

@NearBindgen({})
class Dialexa {
 
  transactions: UnorderedMap<Transactions> = new UnorderedMap('h');
  user: UnorderedMap<User> = new UnorderedMap('u');

  constructor() {}

  @call({})
  createUser({
    Firstname,
    Lastname,
    Username,
  }: {
    Firstname: string;
    Lastname: string;
    Username: string;
  }): any {
    assert(!this.user.get(Username), 'Username already exists');

    const newUser: User = {
      firstname: Firstname,
      lastname: Lastname,
      walletid: near.signerAccountId(),
      username: Username,
      subscribed: false,
      plan: null,
      subscriptionDate: null,
    };

    this.user.set(Username, newUser);

    near.log(`User profile created for ${Username}`);
    return newUser;
  }

  @call({payableFunction: true})
  subscribe({ Username, plan }: { Username: string; plan: number }): void {
    assert(plan === 12 || plan === 67 || plan === 150, 'Invalid plan. Choose 1 NEAR or 2 NEAR');
    const user = this.user.get(Username);
    assert(user, 'User not found');
    // assert(!user.subscribed, 'User is already subscribed');

    user.subscribed = true;
    user.plan = plan;
    user.subscriptionDate = near.blockTimestamp();

    this.user.set(Username, user);



    const amount = near.attachedDeposit();
    const bidder = near.predecessorAccountId();
    NearPromise.new(bidder).transfer(amount);
    near.log(`${Username} subscribed to the ${plan} NEAR plan`);
  }

  @call({payableFunction: true})
  subscribetest({ Username, plan }: { Username: string; plan: number }): void {
    assert(plan === 10, 'Invalid plan. Choose 1 NEAR or 2 NEAR');
    const user = this.user.get(Username);
    assert(user, 'User not found');
    assert(!user.subscribed, 'User is already subscribed');

    user.subscribed = true;
    user.plan = plan;
    user.subscriptionDate = near.blockTimestamp();

    this.user.set(Username, user);



    const amount = near.attachedDeposit();
    const bidder = near.predecessorAccountId();
    NearPromise.new(bidder).transfer(amount);
   

    near.log(`${Username} subscribed to the ${plan} NEAR plan`);
  }

  @call({payableFunction: true})
  cancelSubscription({ Username }: { Username: string }): void {
    const user = this.user.get(Username);
    assert(user, 'User not found');
    assert(user.subscribed, 'User is not subscribed');

    const now = near.blockTimestamp();
    const subscriptionDuration = now - BigInt(user.subscriptionDate || 0);

    if (subscriptionDuration < BigInt(15 * 24 * 60 * 60 * 1_000_000_000)) {

      const promiseIndex = near.promiseBatchCreate(user.walletid);
      near.promiseBatchActionTransfer(promiseIndex, BigInt(user.plan || 0) * BigInt(1_000_000_000_000_000_000_000_000));
      near.log(`Refunded ${user.plan} NEAR to ${Username}`);
    }

    user.subscribed = false;
    user.plan = null;
    user.subscriptionDate = null;

    this.user.set(Username, user);
    near.log(`${Username} canceled their subscription`);
  }

  @view({})
  getTransactionHistory({ Username }: { Username: string }): Transactions[] {
    const user = this.user.get(Username);
    assert(user, 'User not found');
    const maindata = this.transactions.toArray()
    const trans = maindata.map(item => item[1]);
    const allTransactions: Transactions[] = [];
    trans.forEach((tx) => {
      if (tx.walletid === user.walletid) {
        allTransactions.push(tx);
      }
    });

    return allTransactions;
  }
  @view({})
  getUser({ Username }: { Username: string }): User | boolean {
    const user = this.user.get(Username);
    if (user){
      return user;
    }else{
      return false
    }
    

  }

  @view({})
  getAllUsers(): User[] {
    return this.user.toArray().map(([_, user]) => user);
  }

  @call({})
  logTransaction({ amount }: { amount: string }): void {
    const walletid = near.signerAccountId();
    const newTransaction: Transactions = {
      walletid,
      date: near.blockTimestamp(),
      amount,
    };

    this.transactions.set(near.blockIndex().toString(), newTransaction);
    near.log(`Transaction of ${amount} NEAR logged for ${walletid}`);
  }
}
