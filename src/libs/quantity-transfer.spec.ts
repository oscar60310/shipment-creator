import { quantityTransfer } from './quantity-transfer';
describe('Quantity transfer testing', () => {
  it('Should return same number when input type is number', () => {
    const re = quantityTransfer('123', 'KG');
    expect(re).toBe(123);
  });
  it('Should throw error when input unit is not support', () => {
    try {
      quantityTransfer('123', 'KG');
      expect(false).toBeTruthy();
    } catch {
      expect(true).toBeTruthy();
    }
  });
  it('Should throw error when input is not *斤*兩', () => {
    try {
      quantityTransfer('HI123', '斤');
      expect(false).toBeTruthy();
    } catch {
      expect(true).toBeTruthy();
    }
  });
  it('Should calculate correct unit about 斤', () => {
    expect(quantityTransfer('3斤0兩', '斤')).toBe(3);
    expect(quantityTransfer('2斤8兩', '斤')).toBe(2.5);
    expect(quantityTransfer('0斤8兩', '斤')).toBe(0.5);
    expect(quantityTransfer('0斤1兩', '斤')).toBe(0.0625);
  });
});
