import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchBookById } from "../../services/fetchBookById";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import bookdetail from "../../../src/assets/BookDetail-removebg-preview.png";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { AUTH_HEADER } from "../../services/constants";

const BookDetail = () => {
  const { id } = useParams();
  const bookId = decodeURIComponent(id);
  const [book, setBook] = useState(null);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const bookData = await fetchBookById(encodeURIComponent(bookId));
        setBook(bookData);
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    };
    fetchBookData();
  }, [bookId]);

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          "https://stem.automatex.dev/api/profile/",
          {
            headers: {
              ...AUTH_HEADER,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile || !book) {
    return <div>Loading...</div>;
  }

  return (
    <section className="mt-8 w-[100%] mx-auto flex flex-col md:flex-row justify-between gap-8 p-8 font-suwannaphum ">
      <div className="w-full md:w-[65%]">
        <div>
          {book.categories.map((category) => (
            <div key={category.id}>
              {category.lessons.map((lesson) => (
                <div key={lesson.id}>
                  {lesson.sections.map((section) => (
                    <div key={section.id}>
                      {section.contents.map((content) => (
                        <div key={content.id}>
                          {content.file ? (
                            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                              <Viewer
                                fileUrl={content.file.replace(
                                  /^http:\/\/136.228.158.126:50001\/media\/uploads\//,
                                  "https://stem.automatex.dev/media/uploads/"
                                )}
                                plugins={[defaultLayoutPluginInstance]}
                              />
                            </Worker>
                          ) : (
                            <p>No PDF file available for this content.</p>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full md:w-[35%] flex flex-col gap-8">
        {/* Profile Section */}
        <div className="w-full p-4 bg-gray-200 rounded-lg shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-4 sticky top-28">
          <img
            src={
              profile.image
                ? profile.image.replace(
                    /^http:\/\/136.228.158.126:50001\/media\/uploads\//,
                    "https://stem.automatex.dev/media/uploads/"
                  )
                : "https://via.placeholder.com/150"
            }
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="ml-3 flex flex-col items-start">
            <div className="font-bold text-sm mt-2 sm:mt-0">{`${book.created_by}`}</div>
            <div className="text-gray-400 text-xs mt-2">@{book.created_by}</div>
          </div>
          <button
            type="button"
            className="px-4 py-3 bg-blue-600 rounded-md text-white outline-none focus:ring-4 shadow-lg transform active:scale-x-75 transition-transform mx-5 flex mt-2 sm:mt-0 font-suwannaphum sm:ml-auto"
            onClick={() => {
              // Handle download without causing a page refresh
              const downloadLink = document.createElement("a");
              downloadLink.href = content.file.replace(
                /^http:\/\/136.228.158.126:50001\/media\/uploads\//,
                "https://stem.automatex.dev/media/uploads/"
              );
              downloadLink.setAttribute("download", "book.pdf");
              document.body.appendChild(downloadLink);
              downloadLink.click();
              document.body.removeChild(downloadLink);
            }}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            <span className="ml-2">ទាញយក</span>
          </button>
        </div>

        {/* Book Details Section */}
        <div className="w-full p-4 bg-gray-200 rounded-lg">
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span>ប្រភេទសៀវភៅ</span>
              <span>{book.course_name}</span>
            </li>
            <li className="flex justify-between">
              <span>អ្នកនិពន្ធ</span>
              <span>{book.created_by}</span>
            </li>
            <li className="flex justify-between">
              <span>បោះពម្ភផ្សាយ</span>
              <span>________</span>
            </li>
            <li className="flex justify-between">
              <span>ឆ្នាំបោះពម្ភ</span>
              <span>2024</span>
            </li>
          </ul>
        </div>

        {/* Related Articles Section */}
        <div className="w-full p-4 bg-gray-200 rounded-lg">
          <ul>
            <li className="font-bold mb-4">អត្ថបទដែលពាក់ព័ន្ធ</li>
            {[...Array(4)].map((_, index) => (
              <li key={index} className="flex items-center space-x-4">
                <div className="w-[60px] h-[60px]">
                  <img
                    src={bookdetail}
                    alt="Related article image"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="block">
                    ការអប់រំវិទ្យាសាស្រ្ត បច្ចេកវិទ្យា វិស្វកម្ម និងគណិតវិទ្យា
                  </span>
                  <div className="text-[14px]">ថ្ងៃបង្ហោះ : ________</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default BookDetail;
