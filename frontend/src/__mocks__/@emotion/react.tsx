import { EmotionCache } from '@emotion/cache';

const actualEmotion = jest.requireActual('@emotion/react');

type WithEmotionCache = (fn: (cache: EmotionCache) => React.ReactNode) => React.ReactNode;

const mockEmotion = {
  ...actualEmotion,
  withEmotionCache: ((fn: any) => fn) as WithEmotionCache,
};

export default mockEmotion;
