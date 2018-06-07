#!/usr/bin/env node
const path = require('path')
const chalk = require('chalk')
const semver = require('semver')
const pkg = require('../package.json')
const fs = require('fs-extra')
const program = require('commander')

const PrismicVress = require('../build/main').default

const configPath = path.resolve('prismic-vress.config.js')
const deafultConfig = require('../src/default.config')


let userConfig = null
if (fs.existsSync(configPath)) {
  const userConfigModule = require(configPath)
  userConfig = userConfigModule.default || userConfigModule
}else {
  userConfig = deafultConfig
}

if (!semver.satisfies(process.version, pkg.engines.node)) {
  console.log(chalk.red(
    `\n[vuepress] minimum Node version not met:` +
    `\nYou are using Node ${process.version}, but VuePress ` +
    `requires Node ${pkg.engines.node}.\nPlease upgrade your Node version.\n`
  ))
  process.exit(1)
}



program
  .version(pkg.version)
  .usage('<command> [options]')

program
  .command('generate')
  .description('generate markdown and images as vuepress contents')
  .option('-d, --dest <outDir>', 'specify build output dir (default: .vuepress/dist)')
  .option('-e, --endpoint <endpointurl>', 'specify endpoint url')
  .action(({ debug, dest, endpoint }) => {

    if(dest) {
      userConfig.dist = path.resolve(dest)
    }

    if (endpoint) {
      userConfig.endpoint = endpoint
    }

    if (!userConfig.endpoint) {
      console.error(`${chalk.red(`Must speficy endpoint`)}.`)
      process.exit(1)
    }
    PrismicVress.generate(userConfig).then(function(){
      console.log(`\n${chalk.green('Success!')} Generated contents files in ${chalk.cyan(userConfig.dist)}.\n`)
    })
  })


// output help information on unknown commands
program
  .arguments('<command>')
  .action((cmd) => {
    program.outputHelp()
    console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`))
    console.log()
  })

// add some useful info on help
program.on('--help', () => {
  console.log()
  console.log(`  Run ${chalk.cyan(`vuepress <command> --help`)} for detailed usage of given command.`)
  console.log()
})

program.commands.forEach(c => c.on('--help', () => console.log()))


program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp()
}
