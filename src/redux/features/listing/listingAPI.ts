import baseAPI from "@/redux/api/api";

const listingAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getAllListings: build.query({
      query: (params) => ({
        url: "/admin/listings/",
        method: "GET",
        params,
      }),
    }),

    approvedListing: build.mutation({
      query: ({ id, body }) => ({
        url: `/admin/listings/${id}/`,
        method: "PATCH",
        body,
      }),
    }),

    rejectListing: build.mutation({
      query: ({ id, body }) => ({
        url: `/admin/listings/${id}/`,
        method: "PATCH",
        body,
      }),
    }),

    deleteListing: build.mutation({
      query: (id) => ({
        url: `/admin/listings/${id}/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllListingsQuery,
  useApprovedListingMutation,
  useRejectListingMutation,
  useDeleteListingMutation,
} = listingAPI;
export default listingAPI;
