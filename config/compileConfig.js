/**
 * Так как config пишется на ts пере использованием его надо странспилировать в js
 * @returns { IConfig }
 */
module.exports = function compileConfig() {
  const spawnSync = require('child_process').spawnSync;
  const { stdout } = spawnSync('tsc', ['-b', '--force', './config/']);
  if (stdout.toString().match('error')) {
    throw new Error(stdout.toString());
  } else {
    console.log('configuration compiled successfully')
  }
  return require(`./dist/config.js`).default;
}
