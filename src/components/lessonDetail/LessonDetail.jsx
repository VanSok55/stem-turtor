import React, { useEffect, useState } from "react";
import { fetchLessonById } from "../../services/fetchLessonById";
import { useParams } from "react-router-dom";
const LessonDetail = () => {
  const { id } = useParams();
  const bookId = decodeURIComponent(id);
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    const fetchlessonData = async () => {
      try {
        const bookData = await fetchLessonById(encodeURIComponent(bookId));
        setLesson(bookData);
      } catch (error) {
        console.error("Error fetching lesson data:", error);
      }
    };
    fetchlessonData();
  }, []);

  if (!lesson) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {" "}
      <section className="w-[80%] h-auto mx-auto mt-8 grid grid-cols-1 lg:grid-cols-[69%_29%] gap-[2%] font-suwannaphum">
        <div className="w-full p-2 bg-[#F5F5F5]">
          <h3 className="text-[24px] font-semibold text-black">
            {lesson.lesson_title}
          </h3>

          {/*
           */}
          {lesson.sections.flatMap((section) =>
            section.contents.map(
              (content) =>
                content.video_url &&
                (content.video_url.includes("youtube.com") ? (
                  <div>
                    <iframe
                      className="w-full h-[500px]"
                      src={`https://www.youtube.com/embed/${new URL(
                        content.video_url
                      ).searchParams.get("v")}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="YouTube Video"
                    ></iframe>
                    <div className="text-[20px] mt-5 text-center font-bold mb-5">
                      {content.video_title || "No Title"}
                    </div>
                  </div>
                ) : null)
            )
          )}

          {/* <h3 className="p-8 text-center text-black ">ត្រីកោណប៉ុនគ្នា</h3> */}
        </div>
        <div className="w-full bg-[#F5F5F5] p-5 md:p-8">
          {lesson.sections.map((sections) => (
            <ul key={sections.id} className="leading-5">
              {" "}
              <li className="text-[20px] font-medium mt-5">
                {sections.title || "No Title"}
              </li>
            </ul>
          ))}

          <ul className="leading-8 pt-5">
            <li>ចំនួនកុំផ្លិច</li>
            <li>ភាពជាប់នៃអនុគមន៍</li>
            <li>អនុវត្តន៍ដេរីវេ</li>
            <li>ព្រីមីទីវនិងអាំងតេក្រាលមិនកំណត់</li>
            <li>អាំងតេក្រាលកំណត់</li>
            <li>អនុគមន៍អុិចស្ប៉ូណង់ស្យែល</li>
            <li>អនុគមន៍លោការីត</li>
            <li>អាំងតេក្រាលមិនកំណត់</li>
            <li>សមីការឌីផេរ៉ង់ស្យែល</li>
          </ul>
        </div>
      </section>
      <section className="mt-8 w-[80%] mx-auto h-auto bg-[#F5F5F5] p-4 font-suwannaphum">
        <ul>
          <li>អំពីមេរៀន</li>
          <li className="p-5">
            គណិតវិទ្យាថ្នាក់ទី១២ បង្រៀនដោយលោកគ្រូ ថុល ចាន់ថន ។
            នៅក្នុងវីដេអូមានលក្ខណៈកែលំហាត់ ហ្វឹកហាត់ ។
            សិស្សអាចធ្វើការស្វ័យសិក្សាតាមរយៈវីដេអូ ។របៀបរៀនតាមវីដេអូ៖ មើលវីដេអូ
            ហ្វឹកហាត់លំហាត់តាមរយៈឧទាហរណ៍ដែលបានដោះស្រាយ ។
          </li>
        </ul>
      </section>
    </>
  );
};

export default LessonDetail;
