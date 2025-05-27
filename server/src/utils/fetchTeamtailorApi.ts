import axios from 'axios';
import AppError from './appError';

export interface TeamtailorApiResponse {
  data: any[];
  included?: any[];
  links?: {
    self: string;
    next?: string;
  };
  meta?: {
    'record-count': number;
    'page-count': number;
  };
}

export default async function fetchTeamtailorApi(url: string): Promise<TeamtailorApiResponse> {
  try {
    const { TEAMTAILOR_API_KEY: API_KEY } = process.env;
    const { TEAMTAILOR_API_VERSION: API_VERSION } = process.env;

    if (!API_KEY) throw new AppError('TEAMTAILOR_API_KEY is not defined in env variables.', 500);

    if (!API_VERSION)
      throw new AppError('TEAMTAILOR_API_VERSION is not defined in env variables.', 500);

    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Token token=${API_KEY}`,
        'X-Api-Version': API_VERSION
      }
    });

    if (!data) throw new AppError(`Invalid data received from URL ${url}`, 500);

    return data;
  } catch (err) {
    throw err;
  }
}
