import baseAPI from "@/redux/api/api";

const AuthenticationAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    sendOtp: builder.mutation({
      query: (body) => ({
        url: "/auth/send-otp",
        method: "POST",
        body,
      }),
    }),

    resendOtp: builder.mutation({
      query: (body) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body,
      }),
    }),

    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "/auth/forget-password",
        method: "POST",
        body,
      }),
    }),

    resetPassword: builder.mutation({
      query: (body) => ({
        url: "/auth/reset-password",
        method: "POST",
        body,
      }),
    }),

    verifyForgetPasswordOtp: builder.mutation({
      query: (body) => ({
        url: "/auth/otp-verify",
        method: "POST",
        body,
      }),
    }),

    changePassword: builder.mutation({
      query: (body) => ({
        url: "/auth/change-password",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useSendOtpMutation,
  useResendOtpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyForgetPasswordOtpMutation,
  useChangePasswordMutation,
} = AuthenticationAPI;
export default AuthenticationAPI;
