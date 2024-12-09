import { TSequentiallyTesting } from 'src/utilities/helper-test.util';
import { IRequestMockCallback } from 'src/utilities/mock-request';

export const $1001_test_api: TSequentiallyTesting = ({ getDeps }) => {
  let request: IRequestMockCallback;

  beforeEach(async () => {
    request = getDeps().mockRequest;
  });

  it('Test api "initial app"', async () => {
    const response = await request({
      target: '/',
      method: 'GET',
    });

    expect(response.statusCode).toBe(200);
  });
};
