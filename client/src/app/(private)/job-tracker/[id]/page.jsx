import React from "react";
import JobDetailClient from "./JobDetailClient";

const JobDetailPage = async ({ params }) => {
  const { id } = await params;
  return <JobDetailClient id={id} />;
};

export default JobDetailPage;

