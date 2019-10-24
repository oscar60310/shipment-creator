import * as React from 'react';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

const rxHook = <T>(
  target: BehaviorSubject<T> | Subject<T> | Observable<T>,
  initValue: T | null
) => {
  const [data, setData] = React.useState(initValue);
  React.useEffect(() => {
    const sub = target.subscribe(d => setData(d));
    return () => {
      sub.unsubscribe();
    };
  }, []);

  return data;
};
export const observableHook = <T>(target: Observable<T>) =>
  rxHook(target, null);
export const subjectHook = <T>(target: Subject<T>) => rxHook(target, null);

export const behaviorSubjectHook = <T>(target: BehaviorSubject<T>) =>
  rxHook(target, target.getValue());
