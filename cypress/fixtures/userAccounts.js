// User Account data:
//currently this is same for userAccountsArray and defaultUserAccount
//cos only one account coming through the from the BC

export const userAccounts =
 [
      { address: '0x847700B781667abdD98E1393420754E503dca5b7',
        balance: 2.0,
        username: 'player1',
        description: "test1",
        email: "test@test.com",
        owner: "0x847700B781667abdD98E1393420754E503dca5b7",
        picture: "Qmcs96FrhP5N9kJnhNsU87tUsuHpVbaSnGm7nxh13jMLLL",
        rankingDefault: "5c81c1e944e81057efe3e2c8"
     },
     {  address: '0x847700B781667abdD98E1393420754E503dca5b7',
        balance: 3.0,
        username: 'player2',
        description: "test2",
        email: "test2@test.com",
        owner: "0x847700B781667abdD98E1393420754E503dca5b7",
        picture: "Qmcs96FrhP5N9kJnhNsU87tUsuHpVbaSnGm7nxh13jMLLL",
        rankingDefault: "5c81c1e944e81057efe3e2c8"
     }
   ];

//REVIEW: Old sytle. Deprecated ...
export const userAccountsArray =
 [
     { address: '0x847700B781667abdD98E1393420754E503dca5b7',
       balance: 2.0,
       user: {
          username: 'player1',
          description: "test2",
          email: "test@test.com",
          owner: "0x847700B781667abdD98E1393420754E503dca5b7",
          picture: "Qmcs96FrhP5N9kJnhNsU87tUsuHpVbaSnGm7nxh13jMLLL",
          rankingDefault: "5c81c1e944e81057efe3e2c8"
       }
     },
     { address: '0x847700B781667abdD98E1393420754E503dca5b7',
       balance: 2.0,
       user: {
          username: 'player1',
          description: "test2",
          email: "test@test.com",
          owner: "0x847700B781667abdD98E1393420754E503dca5b7",
          picture: "Qmcs96FrhP5N9kJnhNsU87tUsuHpVbaSnGm7nxh13jMLLL",
          rankingDefault: "5c81c1e944e81057efe3e2c8"
       }
     }
   ];

   export const user = {
             username: 'player1',
             description: "test2",
             email: "test@test.com",
             owner: '0x847700B781667abdD98E1393420754E503dca5b7',
             picture: "Qmcs96FrhP5N9kJnhNsU87tUsuHpVbaSnGm7nxh13jMLLL",
             rankingDefault: "5c81c1e944e81057efe3e2c8"
        };
