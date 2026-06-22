import baseAPI from "@/redux/api/api";

const earningAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getEarnings: build.query({
      query: () => ({
        url: `/admin/earnings/`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetEarningsQuery } = earningAPI;
export default earningAPI;
