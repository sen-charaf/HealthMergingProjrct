import fs from 'fs';
import path from 'path';
import { AppError } from './app-error';

class Logger {
  private logDir: string;
  private errorLogPath: string;

  constructor() {
    this.logDir = path.join(process.cwd(), 'logs');
    this.errorLogPath = path.join(this.logDir, 'error.log');
    this.initializeLogDirectory();
  }

  private initializeLogDirectory(): void {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  public logError(err: Error): void {
    const timestamp = new Date().toISOString();
    let logMessage = `\n[ERROR] ${timestamp}\n`;
    logMessage += `Message: ${err.message}\n`;
    logMessage += `Stack: ${err.stack}\n`;

    if (err instanceof AppError) {
      logMessage += `Type: ${err.type}\n`;
      logMessage += `Status Code: ${err.statusCode}\n`;
      logMessage += `Is Operational: ${err.isOperational}\n`;
    }

    logMessage += '\n';

    // Write to file
    fs.appendFileSync(this.errorLogPath, logMessage);

    // Also log to console
    console.error('\x1b[31m%s\x1b[0m', '[ERROR]', timestamp);
    console.error('Message:', err.message);
    console.error('Stack:', err.stack);
    
    if (err instanceof AppError) {
      console.error('Type:', err.type);
      console.error('Status Code:', err.statusCode);
      console.error('Is Operational:', err.isOperational);
    }
    
    console.error('\n');
  }
}

export const logger = new Logger();