/*
  Note: This is a test file, please remove it once testing is in place for this service.
*/

function sum(a: number,b:number){
  return a+b;
}

describe('sum function', () => {
  it('should give the correct output, when both the numbers are positive', () => {
    expect(sum(2,4)).toEqual(6);
  });

  it('should give the correct output, when one of the number is negative', () => {
    expect(sum(2,-4)).toEqual(-2);
  });

  it('should give the correct output, when both the numbers are negative', () => {
    expect(sum(-2,-4)).toEqual(-6);
  });
});