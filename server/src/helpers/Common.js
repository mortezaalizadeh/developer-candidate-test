export default class Common {
  static isUndefined = value => typeof value === 'undefined';

  static isNotUndefined = value => !Common.isUndefined(value);

  static isNull = value => value === null;

  static isNotNull = value => !Common.isNull(value);

  static isNullOrUndefined = value => Common.isUndefined(value) || Common.isNull(value);

  static isDecimal = strValue => !isNaN(parseFloat(strValue)) && isFinite(strValue);
}
