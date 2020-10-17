import {FileService} from './file.service';

export interface PackageJson {
  name: string;
  version: string;
  description: string;
  main: string;
  module: string;
  typings: string;
  author: string;
  homepage: string;
  license: string;
  scripts: {[key: string]: string};
  keywords: string[];
  repository: {
    type: string;
    url: string;
  };
  bugs: {
    url: string;
  };
  dependencies: {[key: string]: string};
  devDependencies: {[key: string]: string};
  peerDependencies: {[key: string]: string};
  // custom rollup plugin configs
  rollup?: {
    resolve?: {};
    commonjs?: {};
  };
}

export interface Options {
  deployDir: string;
  type: 'app' | 'module';
  name: string;
  fullName: string;
  inputPath: string;
  iifePath: string;
  iifeName: string;
  tsconfigPath: string;
}

export class OptionService {
  constructor(private fileService: FileService) {}

  async getOptions(): Promise<Options> {
    const {name: pkgName} = await this.getPackageJson();
    const deployDir = '.deploy';
    const type =
      pkgName === '@sheetbase/backend' || pkgName.indexOf('@app') !== -1
        ? 'app'
        : 'module';
    const name = pkgName.split('/').pop() as string; // ex.: server
    const fullName = pkgName.replace('@', '').replace('/', '-'); //ex.: sheetbase-server
    const inputPath = type === 'app' ? './src/www.js' : './src/public-api.js';
    const iifePath = `./${deployDir}/${type}.js`;
    const iifeName = type === 'app' ? 'App' : 'Module';
    const tsconfigPath = './tsconfig-deploy.json';
    return {
      deployDir,
      type,
      name,
      fullName,
      inputPath,
      iifePath,
      iifeName,
      tsconfigPath,
    };
  }

  async getPackageJson() {
    return this.fileService.readJson('package.json') as Promise<PackageJson>;
  }
}
