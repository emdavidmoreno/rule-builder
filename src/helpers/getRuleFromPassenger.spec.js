import { rangeRulePassengerValueValue, totalRule } from "./getRuleFromPassenger"

describe('Total rule', () => {
  it('should return empty object if paxs is empty', () => {
    const result = totalRule([], 0);
    expect(result).toStrictEqual({});

  });
  it('should return empty object if total is negative', () => {
    const result = totalRule([], 1);
    expect(result).toStrictEqual({});
  });
  it('should return json logic rule with 1 var', () => {
    const result = totalRule(['age1'], 9);
    expect(result).toStrictEqual({"<=":[{"+":[{"var":"age1"}]},9]});
  });
  it('should return json logic rule with 2 var', () => {
    const result = totalRule(['age1', 'age2'], 9);
    expect(result).toStrictEqual({"<=":[{"+":[{"var":"age1"},{"var":"age2"}]},9]});
  });
});

describe('Range rule passenger value', () => {
  it('should return empty objet if pax is empty string', () => {
    const result = rangeRulePassengerValueValue('', 0, 0);
    expect(result).toStrictEqual({});
  });
  it('should return empty objet if min value is negative', () => {
    const result = rangeRulePassengerValueValue('', -1, 0);
    expect(result).toStrictEqual({});
  });
  it('should return empty objet if max value is negative', () => {
    const result = rangeRulePassengerValueValue('', 0, -2);
    expect(result).toStrictEqual({});
  });
});