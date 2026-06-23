import baseAPI from "@/redux/api/api";

const userAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query({
      query: (params) => ({
        url: `/admin/users/`,
        method: "GET",
        params,
      }),
    }),

    getUserById: build.query({
      query: ({ id, params }) => ({
        url: `/user/profile/${id}`,
        method: "GET",
        params,
      }),
    }),

    updateStatus: build.mutation({
      query: ({ id, body }) => ({
        url: `/admin/users/${id}`,
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateStatusMutation,
} = userAPI;
export default userAPI;
