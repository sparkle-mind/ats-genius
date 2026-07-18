import ResumeATSComp from "@/components/ResumeATSComp";

const SingleResumeAnalysis = async ({ params }) => {
  const { id } = await params;

  return (
    <>
      <ResumeATSComp resumeId={id} />
    </>
  );
};

export default SingleResumeAnalysis;
