import {resolve} from 'path';
import {execSync} from 'child_process';

import {FileService} from '../../lib/services/file.service';
import {MessageService} from '../../lib/services/message.service';
import {
  ProjectService,
  ProjectConfigs,
} from '../../lib/services/project.service';
import {RollupService, OutputOptions} from '../../lib/services/rollup.service';

export interface PushOptions {
  copy?: string;
  vendor?: string;
  dryRun?: boolean;
}

export class PushCommand {
  constructor(
    private fileService: FileService,
    private messageService: MessageService,
    private projectService: ProjectService,
    private rollupService: RollupService
  ) {}

  async run(cmdOpts: PushOptions) {
    const configs = await this.projectService.getConfigs();
    // copy resource to /.deploy
    await this.staging(configs, cmdOpts);
    // publish
    if (!cmdOpts.dryRun) {
      this.pushing();
      await this.cleanup(configs.deployDir);
    } else {
      return this.messageService.logOk('Deploy content saved.');
    }
  }

  private async staging(configs: ProjectConfigs, cmdOpts: PushOptions) {
    const {copy = '', vendor = ''} = cmdOpts;
    // bundle
    await this.bundleCode(configs);
    // copy
    await this.copyResources(copy, configs.deployDir);
    // vendor
    await this.saveVendor(vendor, configs.deployDir);
  }

  private pushing() {
    return execSync('clasp push', {stdio: 'inherit'});
  }

  private cleanup(deployDir: string) {
    return this.fileService.remove(deployDir);
  }

  private async bundleCode(configs: ProjectConfigs) {
    const {type, inputPath, iifePath, iifeName} = configs;
    // bundle
    const output: OutputOptions[] = [
      {
        format: 'iife',
        file: iifePath,
        name: iifeName,
        exports: 'named',
      },
    ];
    await this.rollupService.bundleCode(inputPath, output);
    // specific for app
    if (type === 'app') {
      const iifeContent = await this.fileService.readFile(iifePath);
      const wwwSnippet = [
        'function doGet(e) { return App.www.get(e); }',
        'function doPost(e) { return App.www.post(e); }',
      ].join('\n');
      this.fileService.outputFile(iifePath, iifeContent + '\n' + wwwSnippet);
    }
  }

  private async copyResources(input: string, deployDir: string) {
    const copies = ['appsscript.json', 'src/views'];
    // extract copied path
    (input || '')
      .split(',')
      .forEach(item => !!item.trim() && copies.push(item.trim()));
    // save file
    return this.fileService.copy(copies, deployDir);
  }

  private async saveVendor(input: string, deployDir: string) {
    // extract vendor paths
    const vendors: string[] = [];
    (input || '')
      .split(',')
      .forEach(item => !!item.trim() && vendors.push(item.trim()));
    if (vendors.length) {
      // merge vendor code
      const contentArr: string[] = [];
      for (const vendor of vendors) {
        const path = vendor
          .replace('~', 'node_modules/')
          .replace('@', 'src/')
          .replace('//', '/');
        const content = await this.fileService.readFile(path);
        contentArr.push([`// ${path}`, content].join('\n'));
      }
      // save file
      return this.fileService.outputFile(
        resolve(deployDir, '@vendor.js'),
        contentArr.join('\n\n')
      );
    }
  }
}
