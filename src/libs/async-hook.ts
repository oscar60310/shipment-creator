import * as React from 'react';

export type PromiseFunction<T> = () => Promise<T>;

export const asyncHook = <T>(f: PromiseFunction<T>) => {
  const [data, setData] = React.useState<T | null | Error>(null);
  React.useEffect(() => {
    const doAsyncWork = async () => {
      try {
        const result = await f();
        setData(result);
      } catch (e) {
        if (e instanceof Error) {
          setData(e);
        } else {
          setData(new Error(e));
        }
      }
    };
    doAsyncWork();
  }, []);

  return data;
};
