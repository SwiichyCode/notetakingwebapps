import { CustomError } from './custom-error';

export class FailedToCreateNoteError extends CustomError {
  constructor() {
    super('Failed to create note', 500);
    this.name = 'FailedToCreateNoteError';
  }
}
