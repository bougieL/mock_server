const exec = require('child_process').exec

function shell (cmd) {
  const process = exec(cmd)
  process.stdout.on('data', data => {
    console.log(data.replace(/\n$/, ''))
  })
}

shell('npm run server')
shell('npm run watch')
