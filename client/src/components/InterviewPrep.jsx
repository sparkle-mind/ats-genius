"use client";
import CardWrp from "./CardWrp";
import { BookOpen, ChevronRight, SquareArrowUpRight } from "lucide-react";
import { useLatestResume } from "@/hooks/useLatestResume";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
const InterviewPrep = () => {
  const { data: latestResume } = useLatestResume();
  const latestResumeResources =
    latestResume?.atsAnalysis?.interviewPrep?.resources || [];

  const withoutMock = latestResumeResources.filter((resource) => {
    return !(
      resource.title?.toLowerCase().includes("mock") ||
      resource.platform?.toLowerCase().includes("mock") ||
      resource.technology?.toLowerCase().includes("mock") ||
      resource.type?.toLowerCase().includes("mock")
    );
  });
  return (
    <CardWrp>
      <div className="flex items-center gap-2 mb-6">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ background: "rgba(255,87,34,0.12)" }}
        >
          <BookOpen
            className="w-4 h-4"
            style={{ color: "var(--color-orange)" }}
          />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">
            Interview Prep Resources
          </h2>
          <p className="italic text-sm  !text-[#fff06a]">
            These resources are based on your " Recent Resume "{" "}
          </p>
        </div>
      </div>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={3}
        navigation
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 2,
          },
          1400: {
            slidesPerView: 3,
          },
        }}
      >
        {withoutMock?.map((res) => (
          <SwiperSlide key={res.title}>
            <div className="glass-card rounded-xl p-5 flex flex-col gap-4 h-full">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-white text-sm font-bold leading-snug">
                    {res?.title}
                  </p>

                  <p className="text-[var(--color-text-secondary)] text-xs mt-1">
                    {res?.platform}
                  </p>
                </div>

                <span
                  className="
              inline-flex items-center justify-center
              rounded-full
              px-3 py-1
              text-xs
              font-semibold
              capitalize
              bg-amber-500/10
              text-amber-300
              border border-amber-500/30
              whitespace-nowrap
            "
                >
                  {res?.type || "-"}
                </span>
              </div>

              <div className="flex items-center justify-between mt-auto">
                <span className="flex items-center gap-1 text-[var(--color-text-secondary)] text-xs">
                  <SquareArrowUpRight className="w-3 h-3" />
                  {res?.technology}
                </span>

                <Link
                  href={res?.url || ""}
                  target="_blank"
                  className="text-md font-semibold flex items-center gap-1 transition-all hover:gap-2"
                  style={{ color: "var(--color-orange)" }}
                >
                  Start
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </CardWrp>
  );
};

export default InterviewPrep;
