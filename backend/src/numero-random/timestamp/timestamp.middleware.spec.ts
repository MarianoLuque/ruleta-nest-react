import { TimestampMiddleware } from './timestamp.middleware';

describe('TimestampMiddleware', () => {
  it('should be defined', () => {
    expect(new TimestampMiddleware()).toBeDefined();
  });
});
