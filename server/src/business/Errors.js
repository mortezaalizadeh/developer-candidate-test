export class BadArgumentError extends Error {
  constructor(message) {
    super(message ? message : 'Bad argument');
    this.name = 'BadArgumentError';
  }
}

export class NotFoundError extends Error {
  constructor(message) {
    super(message ? message : 'Item not found');
    this.name = 'NotFoundError';
  }
}

export class AlreadyExistsError extends Error {
  constructor(message) {
    super(message ? message : 'Item already exists');
    this.name = 'AlreadyExistsError';
  }
}

export class UnknownError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnknownError';
  }
}
