import baseAPI from "@/redux/api/api";

const notificationAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => ({
        url: `/notes/notifications`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetNotificationsQuery } = notificationAPI;
export default notificationAPI;
