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

export class AlreadyExists extends Error {
  constructor(message) {
    super(message ? message : 'Item already exists');
    this.name = 'AlreadyExists';
  }
}

export class UnknownError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnknownError';
  }
}
