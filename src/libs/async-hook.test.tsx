import React from 'react';
import { asyncHook, PromiseFunction } from './async-hook';
import { render, fireEvent } from '@testing-library/react';

describe('Aynsc hook test', () => {
  it('Should return null when promise is pending', async () => {
    const p = () => new Promise<number>(() => {});
    const TestComponent = () => {
      const re = asyncHook(p);
      return <div data-testid="re">{re}</div>;
    };
    const el = render(<TestComponent />);

    expect(el.getByTestId('re').innerHTML).toBe('');
  });
  it('Should return value when promise is resolved', async () => {
    let res = (n: number) => {};
    const p = () =>
      new Promise<number>(resolve => {
        res = resolve;
      });
    const TestComponent = () => {
      const re = asyncHook(p);
      return <div>{re}</div>;
    };
    const el = render(<TestComponent />);
    res(5);
    const target = await el.findByText('5');
    expect(target).toBeDefined();
  });
  it('Should return value when promise is reject', async () => {
    let res = (n: string) => {};
    const p = () =>
      new Promise<number>((resolve, reject) => {
        res = reject;
      });
    const TestComponent = () => {
      const re = asyncHook(p);
      return <div>{re instanceof Error && re.message}</div>;
    };
    const el = render(<TestComponent />);
    res('some error');
    const target = await el.findByText('some error');
    expect(target).toBeDefined();
  });
});
