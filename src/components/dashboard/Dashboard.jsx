import React, { useEffect, useState } from "react";
import { GoBell } from "react-icons/go";
import { RxDashboard } from "react-icons/rx";
import { GrArticle } from "react-icons/gr";
import { MdForum } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { AUTH_HEADER } from "../../services/constants";
import BlogDetail from "../blogDetail/BlogDetail";
import logodashboard from "../../../src/assets/STEM_TOTUR.jpg";
const Dashboard = () => {
  const [activeLink, setActiveLink] = useState(0);
  const [profile, setProfile] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLinkClick = (index) => {
    setActiveLink(index);
  };

  const handleNotificationClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const addNotification = (notification) => {
    setNotifications((prevNotifications) => [
      notification,
      ...prevNotifications,
    ]);
    setNotificationCount((prevCount) => prevCount + 1);
  };

  const SIDEBAR_LINKS = [
    { id: 1, path: "/dashboard", name: "Dashboard", icon: RxDashboard },
    { id: 2, path: "/article", name: "Article", icon: GrArticle },
    { id: 3, path: "/setting", name: "Setting", icon: IoSettingsOutline },
    { id: 4, path: "/getforum", name: "Forum", icon: MdForum },
  ];

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
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: data.username,
          })
        );
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    const fetchNotifications = async () => {
      try {
        const response = await fetch("https://stem.automatex.dev/api/notifications", {
          headers: {
            ...AUTH_HEADER,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setNotifications(data);
        setNotificationCount(data.length);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchProfile();
    fetchNotifications();
  }, []);

  if (!profile) {
    return (
      <button
        disabled
        type="button"
        class="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
      >
        <svg
          aria-hidden="true"
          role="status"
          class="inline w-10 h-10 mx-auto me-3 text-gray-200 animate-spin dark:text-gray-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="#1C64F2"
          />
        </svg>
        Loading...
      </button>
    );
  }

  return (
    <>
      <div className="flex justify-between md:items-center p-5 bg-[#16A1DF]">
        <div className="flex flex-row items-center w-full sm:w-auto"></div>
        <div className="flex items-center space-x-2 sm:space-x-5">
          <div className="hidden md:flex"></div>
          <div className="flex items-center space-x-2 sm:space-x-5">
            <img
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full "
              src={profile.image || "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEhUQExAQERUQEBUVEA8QEBAWERAWFRYWFxUTFRUYKCggGBslGxUVITEhJSkrLi4uGB8zODMsNygtLisBCgoKDg0NEA0PDy0ZFRkrKystLTcrKy0rNzctNy0rLSstKyswNysrKysrLSsrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYDBAcCAf/EAEIQAAIBAgEHCAcFBgcBAAAAAAABAgMRBAUGEiExQVETImFxgZGh0RUyUlOTscEUQ2Jy4QcjNIKS8DNCRHODssKi/8QAFwEBAQEBAAAAAAAAAAAAAAAAAAECA//EABkRAQEBAQEBAAAAAAAAAAAAAAABETEhAv/aAAwDAQACEQMRAD8A6iAAAAAAAAAAAAAAGOvXhTV5zjBcZNL5gZARFbOTCx+8cvyQk/F2RrPO3D+xWfTow8wLACKw2cOFn95oPhUTj47PE3Vj6L18tS+JDzA2AQ+Us4qFJPRkqs90Yu8b/iktSXiYM0MZOpCppty0al1J/iu2u/5gT4AAAAAAAAAAAAAAAAAAAAAAAAAAAEPnTjnSo2i7SqvRT3pWvJ92rtAj8uZzaLdOg1dapVbXS6ILY+sqtarKb0pScm98m2zwAPp8AAAAD6WXNzLtKlFUpx0Nd+UV2pN75Laty7NxWQB1OE1JJppp6007p9TPRz3I2WamGdlzoN86m34x4MveDxUK0FUg7p96e9NbmgM4AAAAAAAAAAAAAAAAAAAAAAY8RWjCMpydlCLlJ9C1geMXi6dKOlUkori9/QltZTc5srU8Q4KClaGldySV76OzuI7KePnXm5y/ljugtyRqAAD6B8B9PgAAAAAAJPIWVXh6l9sJaqkej2l0ojAB1SMk0mndNXTWxp7GfSv5nY3TpOk3rpPm/lezud/AsAAAAAAAAAAAAAAAAAAAACBzyxGjQUF95NJ9Uec/GxPFTz5nrpR6JvxivoBVgD6BIZEyPVxc9GGpR9eo/Vgvq+gvWCzQwlNc6Dqy3ynJ27Iqy+ZvZAyasNQhTtzraVR8Zv1u7Z1JEiTRHRyDg1/pqPbBP5iWQcG/9NR7IJfIkQRXNc7ch/Zp6cI/uqnq7XoS3wb8V+hXzsuLw0KsHTnFSjJWafz6zm+cGbdXCtyV6lLdUW2HRO2zr2dWwsqIIAFAAAbeTcfOhNVI9UovZJb0y2086sM43enF746N+5rUU/A4SVaapxcU5XtpOy1Jv6FiyXmq1JSrSi0nfk43el1t7gLPh6unGMrOOlFPRe1X12fSZAAAAAAAAAAAAAAAAAABUc+FzqT/AAz+aLcV3PXD6VKNT3c7PqkrfNR7wKYSmbOF5XFUotXSnpPqgnL6EWWj9ntK+IlL2KL75SivlcDoQAMqAAALAAV/KmaGGrXlG9GT3wtoPrh5WK5isycTH1JU6i/M4y7nq8ToYGjkOUcmVsO0qsHByTcdcWmlts1c0zoH7Q8NpUIVPd1bPqmnfxjE5+WIz4LEOlUhUX+SSfWk9a7VdHTKVRSSkndSSafFPYc3wGTqtfS5OOloRu1e2/Yunb3Ml8j5bnhf3NWnNxT5qtz4dCT2oouYPFGelFSs46ST0ZW0lfc7bz2AAAAAAAAAAAAAAAAAMdfBxrxdKV9Gas7bVvuukyGzgVrb4ICiZ1Zt/ZbVKblKnJ2elrlCW673p6+43/2cR51d8I013ufkXDKGDjXpzpS2VItX4PdLsdn2FU/Z5TlCWJjJWcZU4yXBp1E0TRcwARQAAAAAAAEXnRQ08JWXCm5Lrg1L6HP828jvF1dBtqEFpVJLbbYkul/RnUMRT04Sj7UWu9WK7mBhNDDco1rrTb7I81eKl3lG7hcjUsLFqne0pXek7tarJX4be8yEjiFzX1EcIgACgAAAAAAAAAAAAAAAAZ8HK0rcUYBcCVIbJuF5PGYlpaq0KNRdf7xS8VftJGjik9T1PjuZk5NOan+Bxfa4tfJ95lWQAAAAAAAAAAEa2TcPyVKnT9iEU+u2vxubJ5qVFFa35gY8XO0evUaB7rVXJ37lwPBYgACgAAAAAAAAAAAAAAAAAABnwcrStxMB9jKzvwAlAfIu6vxPplQAAAAAAAGOvK0W+4jmzaxs9ke1/Q1SxAAFAAAAAAAAAAAAAAAAAAAAAAAAG3g6v+V9nkbRD1vVf97zbwWN0ubLU+O6X6maN0ABQAADxWqKKv3LiecRiIwV32JbWRXKynPSfCyW5AZpO+s+AGkAAAAAAAAAAAAAAAAAAAAAAAAAAAaufOSMuHhpNq61K7W/XsM/JmaMVGtKOrauD8zajiIvo6zFyY5MKzutHj3GCriXsirdLHJjkwNSVNt3d31nzk7G5yZ8nRun0K4GqD5GSaundPY1sZ9NIAAAAAAAAAAAAAAAAAAAAAAAAEblHKWhzIa5b5bo/qfcrY1wWhH1mtb9leZBBLVozVV4Tk7tyqa299kvNky4kRmq/wB1L/cfyiTJmrOPOiNE9AK86I0T0APOiekgAKXDFyo1JxWuKqSWj1Sa1cCbw9aM46UXdeK6GV3KLvVqf7k/+zPmCxTpSutafrR4rzNMas4PNOaklJa09jPQaAAAAAAAAAAAAAAEJlTOSlRvGH72a22fMj1y39hWcZl/E1fvHBezT5q71rfeBfK+IhTV5zjBcZSS+ZF4nObDQ2SlUf4I6u92RRJNt3bbfF633nwCzYnO+b/w6UY9M5OT7lYjKuWMVWei6slpO1oc1a+ojCQyRSvJy9lWXW/0+YErThopLgtu99J6AKwsuaU+ZUXCaferfQnisZqVbVJx9qCa64v9WWcxW5xr5QxkaFOdWWyEb24vdFdLdl2lEo58YpetCjL+WSfgyV/aBUm6cYx9WMk6q6X6vd9UUMsFpq584l+rTox6bTf1JfM/OGpiJTpVpJy9em0klZapRSXDb3nPyYzWpy+0RqL7q8n06nFLtv4AdSPqPFOakk1saujHjaypwlN7ou3XbURVFrT0pSlxk33u54PiPptzaGUJTptVITlBvVJxk11N2PWGznxMNso1F+OOvvVjZxFLTi48Vq69xXWRqLfhs74P/EpSj0wkpLudn8yVw2WsNU9WrFPhPmv/AOjnQCuqriDmGGxVSn6k5w/LJpdxO5PzrqRsqsVUXtRspr6PwAuQNfBY6nWjpU5KS3rfHoa3GwAAAApucOcDqN0qTtDZKa21Ohfh+fUWLOBtYarbVzN3S0c6AAAAAABu4DGcnzWtTd7ravM0gBZYTUldNNcUeit0qso64trqJHCYyrN2tF8ZNOy7is4nsk1HGrFrp+X6F0dZaOl0bOngUOhPRlGXCSfcy367W3XuZq/LSxFBVFJSV1NPST33Oc4ukoTnBO6hOUU3vs2jqWicqqz0pOXtSb722IrwXbNfBKNBTWt1edJ9TaS7LFJL7mdLSwyXsTmvHSX/AGFFgydPbDtX1RpZx1uY48LJ9Lb8jZimndbiIzhnaMY8ZNvsX6knS8QgMGKlNK8FF22p3v2WIitjqktV7LhFWNsyJPF46MNS50uC3dbIWcrtvi7s8gi4AAKAADPg8XUoyU4ScWu5rg1vR0HJGPWIpKpo6Lu1JcGttug5uXnM7+G/5J/QCcAAEdnD/DVfyfVHOzqdSmpJxklJPamk0+tGv6Noe4o/Dh5Ac0B0v0bQ9xR+HDyHo2h7ij8OHkBzQHS/RtD3FH4cPIejaHuKPw4eQHNAdL9G0PcUfhw8h6Noe4o/Dh5Ac8wmElUfBLbL6LpJyjSjBaKVl/e0tUcHSWpU6aXBQikffstP2If0xCYq5ccnT06UJcYq/WtT8Ua32Wn7uH9MTNT5qtHmrgtSFJMe8oy0KVSfs0pvui2cnR1Wpzk4y5yas4vWmnuaNX0bQ9xR+HDyCuaF0zAqXhVhwnGS/mTX/kl/RtD3FH4cPIzYfDwp3cIRhfboRUb9dtoG/olZzhqXq6PsRS7Xr+qJ3lHxfezDOhCTu4xbe1uKbfaSQvqqmhjsDpc6OqW9bpfqXf7LT9iH9MR9lp+7h/TEqY5i1bVstuPh0yWT6Dd3RpN8XThf5Hz0bQ9xR+HDyCuaA6X6Noe4o/Dh5D0bQ9xR+HDyA5oDpfo2h7ij8OHkPRtD3FH4cPIDmheczv4b/kn9CS9G0PcUfhw8jPRoxgtGMYxV72ikl4AewAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//9k="}
              alt="Profile"
            />
            <span className="text-sm pr-3 sm:text-xl text-white -mt-[1px] sm:-mt-[2px] font-semibold  font-suwannaphum">
              {profile.username}
            </span>
          </div>
        </div>
      </div>
      {/* Sidebar */}
      <div className="w-12 sm:w-16 md:w-56 fixed left-0 top-0 z-10 h-screen border-r pt-8 px-2 sm:px-4 bg-white">
        {/* Logo */}
        <div className="mb-8 flex justify-center sm:justify-center">
          <Link to="/home">
            <main className="mb-8 flex justify-center sm:justify-start">
              <img
                src={logodashboard}
                alt="logo"
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 rounded-full object-cover"
              />
            </main>
          </Link>
        </div>
        {/* Navigation Links */}
        <ul className="mt-6 space-y-3 sm:space-y-6">
          {SIDEBAR_LINKS.map((link, index) => (
            <li
              key={index}
              className={`font-medium rounded-md py-1 sm:py-2 px-3 sm:px-5 hover:bg-gray-100 hover:text-indigo-500 ${
                activeLink === index ? "bg-indigo-100 text-indigo-500" : ""
              }`}
            >
              <Link
                to={link.path}
                className="flex justify-center md:justify-start items-center space-x-2 sm:space-x-5"
                onClick={() => handleLinkClick(index)}
              >
                <span>{<link.icon />}</span>
                <span className="text-xs sm:text-sm text-gray-500 hidden md:flex">
                  {link.name}
                </span>
              </Link>
            </li>
          ))} 
        </ul>
      </div>

      {/* Notifications Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg w-80">
            <h2 className="text-lg font-semibold mb-2">Notifications</h2>
            <ul className="space-y-2">
              {notifications.map((notification) => (
                <li
                  key={notification.id}
                  className="p-2 border-b border-gray-200"
                >
                  {notification.type === "follow" && (
                    <span className="text-blue-600 font-semibold">
                      {notification.username} started following you.
                    </span>
                  )}
                  {notification.type === "unfollow" && (
                    <span className="text-red-600 font-semibold">
                      {notification.username} unfollowed you.
                    </span>
                  )}
                  {notification.type !== "follow" &&
                    notification.type !== "unfollow" &&
                    notification.message}
                </li>
              ))}
            </ul>
            <button
              onClick={handleNotificationClick}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* BlogDetail component */}
      <BlogDetail addNotification={addNotification} />
    </>
  );
};

export default Dashboard;
