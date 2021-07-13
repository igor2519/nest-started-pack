import { ConsoleLogger, LoggerService } from '@nestjs/common';
import { existsSync, mkdirSync, appendFileSync } from 'fs';

export default class MyLogger implements LoggerService {
  private loggerLevel = [];
  private logsFolderPath = '';

  constructor(loggerLevel: string[], logsFolderPath = './logs') {
    this.loggerLevel = loggerLevel;
    this.logsFolderPath = logsFolderPath;
    if (!existsSync(logsFolderPath)) {
      mkdirSync(logsFolderPath);
    }
  }

  private writeLog = (type: string, message: any, optionalParams: any[]) => {
    if (this.loggerLevel.indexOf(type) !== -1) {
      try {
        console.log(message);
        console.log(optionalParams);
        appendFileSync(
          `${this.logsFolderPath}/${type}.txt`,
          `Date : ${new Date().toJSON()}\n Message : ${message} \n Param : ${optionalParams}
           \r=======================================================================================\n`,
        );
      } catch (e) {
        console.log(e);
      }
    }
  };

  log(message: any, ...optionalParams: any[]) {
    this.writeLog('log', message, optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    this.writeLog('error', message, optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    this.writeLog('warn', message, optionalParams);
  }

  debug?(message: any, ...optionalParams: any[]) {
    this.writeLog('debug', message, optionalParams);
  }

  verbose?(message: any, ...optionalParams: any[]) {
    this.writeLog('verbose', message, optionalParams);
  }
}
