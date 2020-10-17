import {execSync} from 'child_process';
import {outputJson, remove} from 'fs-extra';

import {ProjectService} from '../../lib/services/project.service';
import {MessageService} from '../../lib/services/message.service';

export class BuildCommand {
  constructor(
    private messageService: MessageService,
    private projectService: ProjectService
  ) {}

  async run() {
    const {type, tsconfigPath} = await this.projectService.getConfigs();
    // compile
    await this.compileCode(tsconfigPath);
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
}
