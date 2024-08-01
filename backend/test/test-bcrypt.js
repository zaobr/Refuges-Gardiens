 const bcrypt = require('bcrypt');

// async function testPasswordComparison() {
//     const password = '123'; // The plain text password
//     const hash = "$2b$10$AOEOfppspx6WUKG4tlJkBODOCS9pHtHzpe9SLsJqsMjqZ4cKHQuiG"; // Example hashed password, replace with one from your DB

//     const match = await bcrypt.compare(password, hash);
//     console.log('Password matches:', match);
// }

// testPasswordComparison();

    async function test(){
        const password = "123";
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);

        const match = await bcrypt.compare(password, hash);
        console.log('Password matches:', match);
    }

    test()