import fetchAllPages from '../src/utils/fetchAllPages';
import fetchTeamtailorApi from '../src/utils/fetchTeamtailorApi';
import AppError from '../src/utils/appError';

jest.mock('../src/utils/fetchTeamtailorApi');
const mockedFetch = fetchTeamtailorApi as jest.MockedFunction<typeof fetchTeamtailorApi>;

describe('fetchAllPages', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches and accumulates data from multiple pages', async () => {
    mockedFetch
      .mockResolvedValueOnce({
        data: [{ id: 1 }],
        included: [{ id: 'a' }],
        links: { self: 'url1', next: 'url2' }
      })
      .mockResolvedValueOnce({
        data: [{ id: 2 }],
        included: [{ id: 'b' }],
        links: { self: 'url2' }
      });

    const result = await fetchAllPages({ url: 'url1' });

    expect(result).toEqual({
      candidates: [{ id: 1 }, { id: 2 }],
      applications: [{ id: 'a' }, { id: 'b' }]
    });
    expect(mockedFetch).toHaveBeenCalledTimes(2);
    expect(mockedFetch).toHaveBeenCalledWith('url1');
    expect(mockedFetch).toHaveBeenCalledWith('url2');
  });

  it('throws AppError if no candidates received', async () => {
    mockedFetch.mockResolvedValueOnce({
      data: [],
      included: [],
      links: { self: 'url1' }
    });

    await expect(fetchAllPages({ url: 'url1' })).rejects.toThrow(AppError);
  });

  it('retries on 429 error and succeeds', async () => {
    const error429 = {
      isAxiosError: true,
      response: {
        status: 429,
        headers: { 'x-rate-limit-reset': '0' }
      }
    };
    mockedFetch.mockRejectedValueOnce(error429 as any).mockResolvedValueOnce({
      data: [{ id: 1 }],
      included: [{ id: 'a' }],
      links: { self: 'url1' }
    });

    const result = await fetchAllPages({ url: 'url1' });

    expect(result).toEqual({
      candidates: [{ id: 1 }],
      applications: [{ id: 'a' }]
    });
    expect(mockedFetch).toHaveBeenCalledTimes(2);
  });
});
