type TFunction = (args?: unknown) => unknown;

export const throttle = (fn: TFunction, ms = 1000) => {
  let isThrottled = false;

  return (args?: unknown) => {
    if (isThrottled) {
      return;
    }

    isThrottled = true;
    setTimeout(() => {
      isThrottled = false;
      fn(args);
    }, ms);
  };
};
