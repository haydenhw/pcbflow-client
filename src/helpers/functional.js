export function compose(...fnArgs) {
  const [first, ...funcs] = fnArgs.reverse();
  return function(...args) {
    return funcs.reduce((res, fn) => fn(res), first(...args));
  };
}
