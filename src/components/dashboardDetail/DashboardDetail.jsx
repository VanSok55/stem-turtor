import React, { useEffect, useState } from 'react';
import ApexCharts from 'apexcharts';
import axios from 'axios';

// DashboardDetail Component
const DashboardDetail = () => {
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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
            books: 100,  // Since there's no specific user data, assume the percentage as 100
            lessons: 100,  // Same assumption as books
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

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const chartData = [
    data.posts,
    data.articles,
    data.books,
    data.lessons,
  ];

  return (
    <section className="max-w-screen-2xl mx-auto mt-5 grid grid-cols-1 md:grid-cols-1 justify-center items-center">
      <div className="mx-auto">
        <DashboardCard title="User Statistics" chartData={chartData} percentages={percentages} />
      </div>
    </section>
  );
};

// DashboardCard Component
const DashboardCard = ({ title, chartData, percentages }) => {
  useEffect(() => {
    const chart = new ApexCharts(document.getElementById(`pie-chart-${title}`), getChartOptions(chartData, percentages));
    chart.render();
    return () => {
      chart.destroy();
    };
  }, [chartData, title, percentages]);

  return (
    <div className="w-[500px]  bg-white rounded-lg shadow dark:bg-gray-800 p-8 md:p-10">
      <div className="flex justify-between items-center w-full">
        <div className="flex-col items-center">
          <div className="flex items-center text-center mb-4">
            <h5 className="text-2xl font-bold leading-none text-gray-900 dark:text-white text-center">{title}</h5>
          </div>
        </div>
      </div>
      <div id={`pie-chart-${title}`} className="w-full h-96"></div>
    </div>
  );
};

// Chart options function
const getChartOptions = (chartData, percentages) => {
  return {
    chart: {
      type: 'pie',
      height: 500,
    },
    labels: ['Total Posts', 'Total Articles', 'Total Books', 'Total Lessons'],
    series: chartData,
    colors: ['#f39c12', '#d35400', '#27ae60', '#3498db'],
    legend: {
      show: true,
      position: 'bottom',
    },
    dataLabels: {
      enabled: true,
      formatter: (val, opts) => {
        const index = opts.seriesIndex;
        // Return only the user's percentage data
        return `${percentages[Object.keys(percentages)[index]].toFixed(2)}%`;
      },
      style: {
        fontSize: '14px',
        fontWeight: 'bold',
        colors: ['#fff'],
      },
    },
  };
};

// API call functions
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
      const filteredData = data.results.filter(item => item.author === userName);
      totalItems += filteredData.length;

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

export default DashboardDetail;
