import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination,Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const fetchWriters = async () => {
  const response = await axios.get("https://bromine.vercel.app/api/users");
  return response.data;
};

const UserCarousel = () => {
  const { data: writers, isLoading, error } = useQuery({
    queryKey: ["writers"],
    queryFn: fetchWriters,
  });

  if (isLoading) return <p>Loading writers...</p>;
  if (error) return <p>Failed to load writers. Please try again later.</p>;

  return (
    <section className="py-8">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Some of Our Writers
      </h2>

      <Swiper
       autoplay={{
        delay: 3000, // Delay between slides (in milliseconds)
        disableOnInteraction: false, // Continue autoplay after user interaction
      }}
        spaceBetween={20}
        slidesPerView={1}
        
        allowSlideNext
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        modules={[Autoplay]}
        className="w-full max-w-6xl mx-auto"
      >
        {writers.map((writer) => (
          <SwiperSlide key={writer.id}>
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              {/* Profile Picture */}
              <div className="flex justify-center mb-4">
                <img
                  src={writer.pfp || "https://via.placeholder.com/150"}
                  alt={`${writer.user.first_name} ${writer.user.last_name}`}
                  className="w-24 h-24 rounded-full object-cover border border-gray-200"
                />
              </div>

              {/* User Details */}
              <h3 className="text-lg font-semibold text-gray-800">
                {writer.user.first_name} {writer.user.last_name}
              </h3>
              <p className="text-sm text-gray-500">@{writer.user.username}</p>
              <p className="text-gray-600 mt-2 line-clamp-1">{writer.bio || "No bio available."}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default UserCarousel;

