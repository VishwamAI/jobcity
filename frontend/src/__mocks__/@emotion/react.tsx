const actualEmotion = jest.requireActual('@emotion/react');

module.exports = {
  ...actualEmotion,
  withEmotionCache: (fn: any) => fn,
};
