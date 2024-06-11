import { AuthGuard } from "./AuthGuard.guard";

describe('AuthGuard', () => {
  it('should be defined', () => {
    expect(new AuthGuard()).toBeDefined();
  });
});
