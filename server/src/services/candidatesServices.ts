import { GetAllCandidatesDataOptions } from '../types/candidateTypes';
import fetchAllPages from '../utils/fetchAllPages';
import fetchTeamtailorApi from '../utils/fetchTeamtailorApi';

export async function getAllCandidatesData() {
  const url = 'https://api.teamtailor.com/v1/candidates?include=job-applications&page[size]=30';

  const candidates = await fetchAllPages({ url });
}

export async function fetchPaginatedCandidates(url: string) {
  try {
    return await fetchTeamtailorApi(url);
  } catch (err) {
    throw err;
  }
}
