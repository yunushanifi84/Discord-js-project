const {exec} = require('child_process');

exec("python ./commands/deneme.py", (error, stdout,stderr ) => {
    
    console.log(stdout);
    
});