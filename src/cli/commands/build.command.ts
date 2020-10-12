import {execSync} from 'child_process';
import {outputJson, remove} from 'fs-extra';

import {FileService} from '../../lib/services/file.service';
import {
  ProjectConfigs,
  ProjectService,
} from '../../lib/services/project.service';
import {MessageService} from '../../lib/services/message.service';
import {OutputOptions, RollupService} from '../../lib/services/rollup.service';

export class BuildCommand {
  constructor(
    private fileService: FileService,
    private messageService: MessageService,
    private projectService: ProjectService,
    private rollupService: RollupService
  ) {}

  async run() {
    const projectConfigs = await this.projectService.getConfigs();
    const {type, iifePath, tsconfigPath} = projectConfigs;
    // compile
    await this.compileCode(tsconfigPath);
    // bundle
    await this.bundleCode(projectConfigs);
    // specific for app
    if (type === 'app') {
      const iifeContent = await this.fileService.readFile(iifePath);
      const wwwSnippet = [
        'function doGet(e) { return App.www.get(e); }',
        'function doPost(e) { return App.www.post(e); }',
      ].join('\n');
      this.fileService.outputFile(iifePath, iifeContent + '\n' + wwwSnippet);
    }
    // done
    return this.messageService.logOk(
      `Build ${type} completed, you may now push to the server.`
    );
  }

  private async compileCode(tsconfigPath: string) {
    // save temp tsconfig
    await outputJson(tsconfigPath, {
      extends: './node_modules/gts/tsconfig-google.json',
      compilerOptions: {
        moduleResolution: 'Node',
        module: 'ESNext',
        rootDir: '.',
        skipLibCheck: true,
      },
      include: ['src/**/*.ts'],
    });
    // compile
    execSync('npx tsc -p ' + tsconfigPath, {stdio: 'ignore'});
    // remove temp tsconfig
    await remove(tsconfigPath);
  }

  private async bundleCode(configs: ProjectConfigs) {
    const {inputPath, iifePath, iifeName} = configs;
    // build output
    const output: OutputOptions[] = [
      {
        format: 'iife',
        file: iifePath,
        name: iifeName,
        exports: 'named',
      },
    ];
    // bundle
    return this.rollupService.bundleCode(inputPath, output);
  }
}
