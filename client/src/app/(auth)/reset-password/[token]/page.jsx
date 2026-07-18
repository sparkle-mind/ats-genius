import ResetPWComponent from "@/components/_shared/reset-password/ResetPWComponent";

const ResetPasswordPage = async ({ params }) => {
  const { token } = await params;

  return <ResetPWComponent token={token} />;
};

export default ResetPasswordPage;
