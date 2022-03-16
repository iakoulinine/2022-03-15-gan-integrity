import { ErrorHandler } from '@angular/core';

export class DefaultErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    console.log('I am the default error handler');
    console.log(error);
  }
}
