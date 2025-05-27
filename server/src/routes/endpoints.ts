export const BASE_URL = 'https://api.teamtailor.com/v1/';

export const URL_WITH_JOB_APPLICATIONS = `${BASE_URL}candidates?include=job-applications`;

export const GET_ALL_CANDIDATES_URL = `${URL_WITH_JOB_APPLICATIONS}&page[size]=30`;
