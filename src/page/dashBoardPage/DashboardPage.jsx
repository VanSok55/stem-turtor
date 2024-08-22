import React, { useEffect, useState } from 'react';
import { MdForum } from "react-icons/md";
import { GrArticle } from "react-icons/gr";
import { RiUserFollowFill } from "react-icons/ri";
import axios from 'axios';
import Dashboard from '../../components/dashboard/Dashboard';
import DashboardDetail from '../../components/dashboardDetail/DashboardDetail';
import { IoAccessibilityOutline } from 'react-icons/io5';

const fetchPaginatedUserData = async (apiEndpoint, authToken, userName) => {
  let totalItems = 0;
  let currentPage = 1;

  while (true) {
    try {
      const response = await axios.get(`${apiEndpoint}?page=${currentPage}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = response.data;

      // Filter items authored by the user
      const userItems = data.results.filter(item => item.author === userName);
      totalItems += userItems.length;

      // Check if there's a next page
      if (!data.next) {
        break;
      }

      currentPage += 1;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  return totalItems;
};

const fetchTotalCount = async (apiEndpoint, authToken) => {
  try {
    const response = await axios.get(apiEndpoint, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    const data = response.data;

    if (data.count === undefined) {
      throw new Error('Unexpected response format: count is missing');
    }

    return data.count;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const DashboardPage = () => {
  const [data, setData] = useState({
    posts: 0,
    articles: 0,
    books: 0,
    lessons: 0,
  });
  const [percentages, setPercentages] = useState({
    posts: 0,
    articles: 0,
    books: 0,
    lessons: 0,
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const accessToken = localStorage.getItem("access_token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user ? user.name : "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        if (accessToken && userName) {
          const postsCount = await fetchPaginatedUserData('https://stem.automatex.dev/api/forums/', accessToken, userName);
          const postsCountTotal = await fetchTotalCount('https://stem.automatex.dev/api/forums/', accessToken);

          const articlesCount = await fetchPaginatedUserData('https://stem.automatex.dev/api/articles/', accessToken, userName);
          const articlesCountTotal = await fetchTotalCount('https://stem.automatex.dev/api/articles/', accessToken);

          const booksCount = await fetchTotalCount('https://stem.automatex.dev/api/courses/', accessToken);
          const lessonsCount = await fetchTotalCount('https://stem.automatex.dev/api/lessons/', accessToken);

          const calculatedPercentages = {
            posts: (postsCount / postsCountTotal) * 100,
            articles: (articlesCount / articlesCountTotal) * 100,
            books: 100,
            lessons: 100,
          };

          setData({
            posts: postsCount,
            articles: articlesCount,
            books: booksCount,
            lessons: lessonsCount,
          });
          setPercentages(calculatedPercentages);
        }
      } catch (error) {
        setError("Error fetching data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [accessToken, userName]);

  return (
    <div className="ml-12 sm:ml-16 md:ml-56">
      <Dashboard />
      {error && <p className="text-red-500">{error}</p>}
      <section className="flex flex-col max-w-screen-xl mx-auto mt-5">
        <main className="w-full">
          <div className="grid mb-4 pb-10 px-4 sm:px-8 mx-2 sm:mx-4 rounded-3xl bg-gray-100 border-4 border-green-400">
            <div className="grid grid-cols-12 gap-6">
              <div className="grid grid-cols-12 col-span-12 gap-6 xxl:col-span-9">
                <div className="col-span-12 mt-8">
                  <div className="flex items-center h-10 intro-y">
                    <h2 className="mr-5 text-lg font-bold text-gray-600 truncate">Dashboard Welcome</h2>
                  </div>
                  <section className="max-w-screen-2xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-10 mt-5">
                      <a className="transform hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-1 intro-y bg-white" href="#">
                        <div className="p-5">
                          <div className="flex justify-between">
                            <MdForum className="h-7 w-7 text-blue-400" />
                            <div className="bg-green-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                              <span className="flex items-center">{percentages.posts.toFixed(2)}%</span>
                            </div>
                          </div>
                          <div className="ml-2 w-full flex-1">
                            <div>
                              <div className="mt-3 text-3xl font-bold leading-8">{data.posts}</div>
                              <div className="mt-1 text-base text-gray-600">Total Forums</div>
                            </div>
                          </div>
                        </div>
                      </a>
                      <a className="transform hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-1 intro-y bg-white" href="#">
                        <div className="p-5">
                          <div className="flex justify-between">
                            <GrArticle className="h-7 w-7 text-yellow-400" />
                            <div className="bg-red-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                              <span className="flex items-center">{percentages.articles.toFixed(2)}%</span>
                            </div>
                          </div>
                          <div className="ml-2 w-full flex-1">
                            <div>
                              <div className="mt-3 text-3xl font-bold leading-8">{data.articles}</div>
                              <div className="mt-1 text-base text-gray-600">Total Articles</div>
                            </div>
                          </div>
                        </div>
                      </a>
                      <a className="transform hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-1 intro-y bg-white" href="#">
                        <div className="p-5">
                          <div className="flex justify-between">
                            <RiUserFollowFill className="h-7 w-7 text-blue-400" />
                            <div className="bg-green-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                              <span className="flex items-center">{percentages.books.toFixed(2)}%</span>
                            </div> 
                          </div>
                          <div className="ml-2 w-full flex-1">
                            <div>
                              <div className="mt-3 text-3xl font-bold leading-8">{data.books}</div>
                              <div className="mt-1 text-base text-gray-600">Total Courses</div>
                            </div>
                          </div>
                        </div>
                      </a>
                      <a className="transform hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-1 intro-y bg-white" href="#">
                        <div className="p-5">
                          <div className="flex justify-between">
                            <IoAccessibilityOutline className="h-7 w-7 text-pink-400" />
                            <div className="bg-pink-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                              <span className="flex items-center">{percentages.lessons.toFixed(2)}%</span>
                            </div>
                          </div>
                          <div className="ml-2 w-full flex-1">
                            <div>
                              <div className="mt-3 text-3xl font-bold leading-8">{data.lessons}</div>
                              <div className="mt-1 text-base text-gray-600">Total Lessons</div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>
      <DashboardDetail />
    </div>
  );
};

export default DashboardPage;
