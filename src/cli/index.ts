import {red} from 'chalk';
import {Command} from 'commander';

import {Lib as AppscriptsModule} from '../lib/index';
import {BuildCommand} from './commands/build.command';
import {DeployCommand} from './commands/deploy.command';

export class Cli {
  private appscriptsModule: AppscriptsModule;

  buildCommand: BuildCommand;
  deployCommand: DeployCommand;

  commander = [
    'sheetbase-server-scripts',
    'Scripts for Sheetbase server modules and apps.',
  ];

  buildCommandDef: CommandDef = ['build', 'Build distribution package.'];

  deployCommandDef: CommandDef = [
    'deploy',
    'Push to the Apps Script server.',
    ['-d, --dry-run', 'Staging only.'],
    ['--copy [value]', 'Copied resources, comma-seperated.'],
    ['--vendor [value]', 'Files for @vendor.js, comma-seperated.'],
  ];

  constructor() {
    this.appscriptsModule = new AppscriptsModule();
    this.buildCommand = new BuildCommand(
      this.appscriptsModule.optionService,
      this.appscriptsModule.messageService
    );
    this.deployCommand = new DeployCommand(
      this.appscriptsModule.fileService,
      this.appscriptsModule.optionService,
      this.appscriptsModule.messageService,
      this.appscriptsModule.rollupService
    );
  }

  getApp() {
    const commander = new Command();

    // general
    const [command, description] = this.commander;
    commander
      .version(require('../../package.json').version, '-v, --version')
      .name(`${command}`)
      .usage('[options] [command]')
      .description(description);

    // build
    (() => {
      const [command, description] = this.buildCommandDef;
      commander
        .command(command)
        .description(description)
        .action(() => this.buildCommand.run());
    })();

    // deploy
    (() => {
      const [
        command,
        description,
        dryRunOpt,
        copyOpt,
        vendorOpt,
      ] = this.deployCommandDef;
      commander
        .command(command)
        .description(description)
        .option(...dryRunOpt) // -d, --dry-run
        .option(...copyOpt) // --copy
        .option(...vendorOpt) // --vendor
        .action(options => this.deployCommand.run(options));
    })();

    // help
    commander
      .command('help')
      .description('Display help.')
      .action(() => commander.outputHelp());

    // *
    commander
      .command('*')
      .description('Any other command is not supported.')
      .action(cmd => console.error(red(`Unknown command '${cmd.args[0]}'`)));

    return commander;
  }
}

type CommandDef = [string, string, ...Array<[string, string]>];
