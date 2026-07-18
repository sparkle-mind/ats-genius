import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/services/authService";

export const useMe = () => {
  const query = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
    staleTime: 0, // 👈 important for auth (always revalidate when needed)
  });

  return {
    ...query,
    user: query.data ?? null,
    isLoggedIn: !!query.data,
  };
};