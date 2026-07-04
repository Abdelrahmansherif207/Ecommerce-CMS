import { useQuery } from '@tanstack/react-query';
import { fetchProfile } from '../api/profile.api';

export function useProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
  });
}
