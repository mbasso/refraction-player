const timeoutIterate = (i, conditionFn, consumerFn, timeoutFn) => {
  if (conditionFn(i)) {
    setTimeout(() => {
      consumerFn(i);
      timeoutIterate(i + 1, conditionFn, consumerFn, timeoutFn);
    }, timeoutFn(i));
  }
};

export default ({
  refraction,
  track = [],
  exclude = [],
  delay = 200,
  ignoreTime = false,
}) => {
  let previousTime = -1;
  const events = [...track];

  const timeout = (i) => {
    let result = delay;
    const { time } = events[i];
    if (time && !ignoreTime) {
      if (previousTime === -1) {
        previousTime = time;
      }
      result = time - previousTime;
      previousTime = time;
    }
    return result;
  };

  const exists = (i) => i < events.length;

  const consume = (i) => {
    const { channel, param } = events[i];
    if (exclude.indexOf(channel) === -1) {
      refraction.publish(channel, param);
    }
  };

  timeoutIterate(0, exists, consume, timeout);
};
