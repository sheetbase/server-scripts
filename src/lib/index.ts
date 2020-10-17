import {FileService} from './services/file.service';
import {OptionService} from './services/option.service';
import {MessageService} from './services/message.service';
import {RollupService} from './services/rollup.service';

export class Lib {
  fileService: FileService;
  optionService: OptionService;
  messageService: MessageService;
  rollupService: RollupService;

  constructor() {
    this.fileService = new FileService();
    this.optionService = new OptionService(this.fileService);
    this.messageService = new MessageService();
    this.rollupService = new RollupService(this.optionService);
  }
}
