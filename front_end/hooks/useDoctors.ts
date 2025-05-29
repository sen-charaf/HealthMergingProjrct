// "use client";

// import { useQuery } from "@tanstack/react-query";
// import { fetchAllDoctors } from "@/utils/doctor";

// export const useDoctors = () => {
//   return useQuery({ // No QueryClient set, use QueryClientProvider to set one	
//     queryKey: ["doctors"],
//     queryFn: fetchAllDoctors,
//     staleTime: 1000 * 60 * 5, // 5 minutes
//   });
// };