/*
- https://www.youtube.com/watch?v=Ud5xKCYQTjM
- bcyprt salted password

The process:

1) Generate a salt for every single user

- the saltRounds is a value that will make it take longer for the code to generate the hash but the more "secure" it will be - (TODO - does this mean it will be harder to crack?)

- the salt is a value used when generating a hash of a value (hash the combo of the salt + the value you want to hash like a pwd). This way, when you store your password in a db, the hash to decrypt the password is different for every single user.

- the salt is a part of the final created hashed value along with some other data used to generate the hash and decypt the hash (ex. hashed password)

example=>
salt = $2b$10$qaJOGCL93fvb0Ny6mtgYh.
hash = $2b$10$qaJOGCL93fvb0Ny6mtgYh.QVxhwqZK463aqawkZ20l3CqFJ0BLIZK

and based on bcrypt's notes:
https://www.npmjs.com/package/bcrypt

the hash is broken down to be:

$ = (separator)
2b = (indicating bcrypt)
$ = (separator)
10 = (salt rounds)
$ = (separator)
qaJOGCL93fvb0Ny6mtgYh. = (22 chars for salt)
QVxhwqZK463aqawkZ20l3CqFJ0BLIZK = (hash-value)

- hashes are 60 chars long and will have this format ^

- Therefore, you will not need to store the salt in a DB.

-------------------

2) Generate a hash of the value you want to hash

- the bcrypt library's hash method (bcrypt.hash) can take a separately generated salt or generate a salt if the number of saltRounds is provided

-------------------
Use Cases:
- Prevent users from using the same password as before:
    - store the hashes of all the passwords a user has generated for all their passwords
    - you can then for-loop and do a bcrypt.compare of the user's next new password against all previous passwords to see if they result in "true" or "false"
*/

const bcrypt = require('bcrypt');

const testBcryptHashing = async () => {
    const saltRounds = 10;
    const myPlaintextPassword = 's0/\/\P4$$w0rD';
    const someOtherPlaintextPassword = 'not_bacon';

    /*
    salt = $2b$10$qaJOGCL93fvb0Ny6mtgYh.
    hash = $2b$10$qaJOGCL93fvb0Ny6mtgYh.QVxhwqZK463aqawkZ20l3CqFJ0BLIZK
    */

    // using separate salt generation process to generate the hash
    const salt1 = await bcrypt.genSalt(saltRounds);
    const hash1 = await bcrypt.hash(myPlaintextPassword, salt1);

    // using auto-gen salt process to generate the hash
    const hash2 = await bcrypt.hash(myPlaintextPassword, saltRounds);

    // prove that both hash1 and hash2 can be decrypted using their separate salts to result in the same myPlaintextPassword
    const result1 = await bcrypt.compare(myPlaintextPassword, hash1);
    const result2 = await bcrypt.compare(myPlaintextPassword, hash2);
    /*
    -------------
    salt1 =>  $2b$10$JXQF2Eaadqi9X3Qpf0cdDe
    hash1 =>  $2b$10$JXQF2Eaadqi9X3Qpf0cdDeoBGkOjGtSiQA20qYQSmvWp6pYzm4lM2
    result1 =>  true
    -------------
    hash2 =>  $2b$10$RCzKpqdDGpc1sqYd/vK6F.oklABci5sYOtWf4FCOq1nCha16o65H6
    result2 =>  true

    Note - each call to bcrypt results in a different hash but all can be compared to the original password with the hash and can equal the same password.
    */
    console.log('\n');
    console.log('-------------');
    console.log('salt1 => ', salt1);
    console.log('hash1 => ', hash1);
    console.log('result1 => ', result1);
    console.log('-------------');
    console.log('hash2 => ', hash2);
    console.log('result2 => ', result2);
    console.log('-------------');
    console.log('\n');
};

testBcryptHashing();