import axios from 'axios';
import { CandidatesData, GetAllCandidatesDataOptions } from '../types/candidateTypes';
import AppError from './appError';
import fetchTeamtailorApi from './fetchTeamtailorApi';

export default async function fetchAllPages(
  options: GetAllCandidatesDataOptions
): Promise<CandidatesData> {
  try {
    const { url, accumulatedData = { candidates: [], applications: [] } } = options;

    const response = await fetchTeamtailorApi(url);

    const currentCandidates = response.data ?? [];
    const currentApplications = response.included ?? [];
    const nextPage = response.links?.next;

    if (!currentCandidates || !currentCandidates.length) {
      throw new AppError('No candidates received', 500);
    }

    const updatedData: CandidatesData = {
      candidates: [...accumulatedData.candidates, ...currentCandidates],
      applications: [...accumulatedData.applications, ...(currentApplications || [])]
    };

    if (nextPage) {
      return fetchAllPages({ url: nextPage, accumulatedData: updatedData });
    }

    return updatedData;
  } catch (err) {
    throw err;
  }
}
