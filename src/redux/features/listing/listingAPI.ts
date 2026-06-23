import baseAPI from "@/redux/api/api";

const listingAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getAllListings: build.query({
      query: (params) => ({
        url: "/admin/listings/",
        method: "GET",
        params,
      }),
      providesTags: ["Listings"],
    }),

    approvedListing: build.mutation({
      query: ({ id, body }) => ({
        url: `/admin/listings/${id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Listings"],
    }),

    rejectListing: build.mutation({
      query: ({ id, body }) => ({
        url: `/admin/listings/${id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Listings"],
    }),

    deleteListing: build.mutation({
      query: (id) => ({
        url: `/admin/listings/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Listings"],
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
