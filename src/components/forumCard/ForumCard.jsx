import React, { useState, useEffect } from "react";
import { FaChevronRight, FaChevronLeft, FaArrowRight } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import image1 from "../../../src/assets/Science in the city​ E.jpg";
import image2 from "../../../src/assets/A Framework for K-12.jpg";
import image3 from "../../../src/assets/Designing with Photoshop.jpg";
import image4 from "../../../src/assets/Creative with Photoshop.jpg"
import image5 from "../../../src/assets/Open middle math E.jpg";
import image6 from "../../../src/assets/Learning STEM.jpg";
import image7 from "../../../src/assets/Video Production.jpg";
import image8 from "../../../src/assets/Creating Compelling Video E.jpg";
import forumcard1 from "../../../src/assets/Forum Part.jpg";
import forumcard2 from "../../../src/assets/chamistry of products.jpg";
import forumcard3 from "../../../src/assets/From Batch to Stream.jpg";
import forumcard4 from "../../../src/assets/Machine Learning.jpg";
AOS.init();
const ForumCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4; // Number of items to show per slide
  const forums = [
    {
      imgSrc: image1,
      title: "Science in the City",
      description:
        "សៀវភៅនេះភ្ជាប់ការរុករកនៃការស្រាវជ្រាវសហសម័យស្តីពីការបង្រៀនវិទ្យាសាស្ត្រទៅនឹងវិធីសាស្រ្តបង្រៀន...",
      views: 44,
    },
    {
      imgSrc: image2,
      title: "Framework for K-12",
      description:
        "វិទ្យាសាស្ត្រ វិស្វកម្ម និងបច្ចេកវិជ្ជា ជាគន្លឹះក្នុងការដោះស្រាយបញ្ហាប្រឈមសំខាន់ៗជាច្រើននាពេលបច្ចុប្បន្ន...",
      views: 10,
    },
    {
      imgSrc: image3,
      title: "Designing",
      description:
        "Photoshop សម្រាប់ការរចនាក្រាហ្វិក រួមទាំងការបង្កើតរូបភាពដ៏អស្ចារ្យ និងក្រាហ្វិកប្រកបដោយប្រសិទ្ធ...",
      views: 24,
    },
    {
      imgSrc: image4,
      title: "Creative with Photoshop",
      description:
        "Tips and Techniques:ស្វែងយល់ពីបច្ចេកទេសសម្រាប់ការរៀបចំរូបភាពប្រកបដោយភាពច្នៃប្រឌិត...",
      views: 63,
    },
    {
      imgSrc: image5,
      title: "Open Middle Math",
      description:
        "សៀវភៅនេះសម្រាប់គ្រូក្នុងការជួយសិស្សឱ្យអភិវឌ្ឍទាំងភាពស្ទាត់ជំនាញ ការបង្កើតបញ្ហាគណិតវិទ្យា Open...",
      views: 67,
    },
    {
      imgSrc: image6,
      title: "Learning STEM",
      description:
        "ការរៀន STEM ផ្តោតលើការរៀនដែលមានតែមួយគត់ចំពោះការបង្រៀនវិទ្យាសាស្ត្រ បច្ចេកវិទ្យា វិស្វកម្ម និ...",
      views: 100,
    },
    {
      imgSrc: image7,
      title: "Video Production",
      description:
        "ស្វែងយល់ពីរបៀបបង្កើតគំនិតគួរឱ្យទាក់ទាញ រៀបចំផែនការថតរបស់អ្នក និងអនុវត្តការថតដោយយកចិត្ត...",
      views: 94,
    },
    {
      imgSrc: image8,
      title: "Creating Compelling ",
      description:
        "ស្វែងយល់ពីរបៀបបង្កើតរឿងគួរឱ្យទាក់ទាញអារម្មណ៍ រៀបចំផែនការធាតុរូបភាព សំឡេង និងប្រើប្រាស់ឧប...",
      views: 9,
    },
    // Add more books as needed
  ];

  const totalSlides = Math.ceil(forums.length / itemsPerPage);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const autoSlide = setInterval(() => {
      nextSlide();
    }, 3000); // Slide every 3 seconds


    return () => clearInterval(autoSlide);
  }, []);
  return (
    <>
      <section className="flex justify-between mt-5 w-[90%] sm:w-[94%]  mx-auto font-suwannaphum mb-10">
        <span className="font-bold text-[#16A1DF] xl:text-[25px]">វេទិកា</span>
        <Link to="/forum">
          <span className="flex items-center text-black xl:text-[25px]">
            បង្ហាញទាំងអស់
            <FaArrowRightLong />
          </span>
        </Link>
      </section>
      <Link to="/forum">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-[94%] mx-auto mb-5 px-2">
          <div className="border rounded-lg bg-white text-gray-700 shadow-sm h-[430px]" 
              data-aos="fade-up"
              data-aos-duration="1500">
            <div className="relative h-full w-full overflow-hidden">
              <img
                className="h-full w-full rounded-md object-cover opacity-100 transition duration-300 ease-in-out transform scale-100"
                src={forumcard1}
                alt="Stem Book"
              />
              <div className="absolute inset-0 font-suwannaphum bg-transparent hover:bg-slate-300 opacity-0 hover:opacity-60 transition-opacity duration-300 ease-in-out flex items-center justify-center">
                <h2 className="text-black text-[16px] sm:text-[18px] md:text-[20px] font-suwannaphum text-center font-bold">
                  ចែករំលែកដំណឹងទាក់ទងទៅនិង STEM
                  <br />
                  <span className="text-[14px] sm:text-[16px] md:text-[18px]">
                    ស្វែងរកអត្ថបទផ្សេងៗដែលទាក់ទងទៅនឹងវិទ្យាសាស្រ្ត
                    និងបច្ចេកវិទ្យា
                  </span>
                </h2>
              </div>
            </div>
          </div>

          {/* Card1 */}
          <div className="border rounded-xl bg-white text-gray-700 shadow-md h-[430px]" 
              data-aos="fade-up"
              data-aos-duration="1500">
            <div className="relative h-[250px] overflow-hidden">
              <img
                className="h-full w-full object-cover rounded-t-md hover:scale-105 transition-transform duration-500 ease-in-out"
                src={forumcard2}
                alt=""
              />
            </div>
            <div className="p-3 mb-4">
              <h4 className="block font-suwannaphum text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] font-bold leading-snug tracking-normal text-blue-gray-900">
                Chemistry of Products
              </h4>
              <span className="line-clamp-2 block font-suwannaphum mt-2 text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] leading-relaxed text-gray-700">
                ស្វែងយល់ពីរបកគំហើញចុងក្រោយបំផុតនៅក្នុងគីមីវិទ្យាសរីរាង្គ...
              </span>
            </div>


            <div className="border-t">
              <div className="flex items-center justify-between p-3 mt-1">
                <p className="font-suwannaphum text-[12px] sm:text-[14px] md:text-[16px] text-black">
                  ចំនួនអ្នកមេីល: 100 នាក់
                </p>
                <div className="flex items-center text-[12px] sm:text-[14px] md:text-[16px]">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-3 h-3 text-yellow-400"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Card2 */}
          <div className="border rounded-xl bg-white text-gray-700 shadow-md h-[430px]" 
              data-aos="fade-up"
              data-aos-duration="1500">
            <div className="relative h-[250px] overflow-hidden">
              <img
                className="h-full w-full object-cover rounded-t-md hover:scale-105 transition-transform duration-500 ease-in-out"
                src={forumcard3}
                alt=""
              />
            </div>
            <div className="p-3 mb-4">
              <h4 className="block font-suwannaphum text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] font-bold leading-snug tracking-normal text-blue-gray-900">
                From Batch to Stream
              </h4>
              <span className="line-clamp-2 block font-suwannaphum mt-2 text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] leading-relaxed text-gray-700">
                ស្វែងយល់ពីវិធីសាស្ត្រផ្សេងៗចំពោះដំណើរការទិន្នន័យធំ
                រួមទាំងដំណើរការជាបាច់...
              </span>
            </div>


            <div className="border-t">
              <div className="flex items-center justify-between p-3 mt-1">
                <p className="font-suwannaphum text-[12px] sm:text-[14px] md:text-[16px] text-black">
                  ចំនួនអ្នកមេីល: 56 នាក់
                </p>
                <div className="flex items-center text-[12px] sm:text-[14px] md:text-[16px]">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-3 h-3 text-yellow-400"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Card3 */}
          <div className="border rounded-xl bg-white text-gray-700 shadow-md h-[430px]" 
              data-aos="fade-up"
              data-aos-duration="1500">
            <div className="relative h-[250px] overflow-hidden">
              <img
                className="h-full w-full object-cover rounded-t-md hover:scale-105 transition-transform duration-500 ease-in-out"
                src={forumcard4}
                alt=""
              />
            </div>
            <div className="p-3 mb-4">
              <h4 className="block font-suwannaphum text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] font-bold leading-snug tracking-normal text-blue-gray-900">
                Machine Learning
              </h4>
              <span className="line-clamp-2 block font-suwannaphum mt-2 text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] leading-relaxed text-gray-700">
                Big Data with Machine Learning ស្វែងយល់ពីរបៀបដែល Big Data...
              </span>
            </div>


            <div className="border-t">
              <div className="flex items-center justify-between p-3 mt-1">
                <p className="font-suwannaphum text-[12px] sm:text-[14px] md:text-[16px] text-black">
                  ចំនួនអ្នកមេីល: 27 នាក់
                </p>
                <div className="flex items-center text-[12px] sm:text-[14px] md:text-[16px]">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-3 h-3 text-yellow-400"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </Link>
      <Link to="/forum">
        <section className="relative w-[94%] mx-auto overflow-hidden rounded-lg mb-5 gap-4 px-2 mt-5">
          <div
            className="flex transition-transform ease-out duration-500"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {forums.map((book, index) => (
              <Link
                to="/forum"
                key={index}
                className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 px-2"
              >
                <div className="border bg-white text-gray-700 shadow-md rounded-lg" 
                    data-aos="fade-up"
                    data-aos-duration="1500">
                  <div className="relative h-[250px] overflow-hidden">
                    <img
                      className="w-full h-[200px] xl:h-full xl:w-full object-cover rounded-t-md hover:scale-105 transition-transform duration-500 ease-in-out"
                      src={book.imgSrc}
                      alt={book.title}
                    />
                  </div>
                  <div className="p-3">
                    <h4 className="line-clamp-1 text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] block font-suwannaphum font-semibold leading-snug tracking-normal text-blue-gray-900">
                      {book.title}
                    </h4>
                    <span className="line-clamp-2 mt-2 text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px] font-suwannaphum leading-relaxed text-gray-900">
                      {book.description}
                    </span>
                  </div>
                  <div className="border-t">
                    <div className="flex items-center justify-between p-3 mt-1">
                      <p className="font-suwannaphum text-[14px] sm:text-[16px] md:text-[18px] xl:text-[20px] text-black">
                        ចំនួនអ្នកមេីល: {book.views} នាក់
                      </p>
                      <div className="flex items-center text-[14px] sm:text-[16px] md:text-[18px] xl:text-[20px]">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-3 h-3 text-yellow-400"
                          >
                            <path
                              fillRule="evenodd"

                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white bg-black p-2 rounded-full hover:bg-gray-700 transition-colors"
          >
            <FaChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white bg-black p-2 rounded-full hover:bg-gray-700 transition-colors"
          >
            <FaChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </section>
      </Link>
    </>
  );
};
export default ForumCard;
