export const quantityTransfer = (q: string, unit: string): number => {
  if (!isQuantityAcceptable(q, unit))
    throw `Quantity ${q} and unit ${unit} is not acceptable`;
  if (!isNaN(q as any)) return parseFloat(q);
  switch (unit) {
    case '斤':
      const pattern = /(\d+)斤(\d+)兩/;
      const result = pattern.exec(q);
      if (!result) throw `Parse fail, should input *斤*兩`;

      return parseFloat(result[1]) + parseFloat(result[2]) / 16;
  }
  throw `Unit ${unit} not support string transfer`;
};
export const isQuantityAcceptable = (q: string, unit: string): boolean => {
  if (!isNaN(q as any)) return true;
  switch (unit) {
    case '斤':
      const pattern = /(\d+)斤(\d+)兩/;
      if (!pattern.test(q)) return false;
      return true;
  }
  return false;
};
