import { useEffect, useState } from "react";
import { fetchBlogById } from "../../services/fetchBlogById";
import { useParams } from "react-router-dom";
import { SlUserFollow } from "react-icons/sl";
import moment from "moment";
import "./styleBlog.css";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followError, setFollowError] = useState("");
  const [followSuccessMessage, setFollowSuccessMessage] = useState("");
  const [totalFollowers, setTotalFollowers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch blog data
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const blogData = await fetchBlogById(id);
        setBlog(blogData);

        // Retrieve follow status from local storage or check from backend
        const followedBlogs = JSON.parse(localStorage.getItem("followed_blogs")) || {};
        if (blogData.author_id in followedBlogs) {
          setIsFollowing(followedBlogs[blogData.author_id]);
        } else {
          // Check follow status from backend if not in local storage
          const accessToken = localStorage.getItem("access_token");
          if (accessToken) {
            const response = await fetch(
              `https://stem.automatex.dev/api/follows/${blogData.author_id}/unfollow_user/`,
              {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );
            const responseData = await response.json();
            setIsFollowing(responseData.isFollowing || false);
            followedBlogs[blogData.author_id] = responseData.isFollowing;
            localStorage.setItem(
              "followed_blogs",
              JSON.stringify(followedBlogs)
            );
          }
        }
      } catch (error) {
        console.error("Error fetching blog data:", error);
        setError("Failed to load blog data.");
      }
    };

    fetchBlogData();
  }, [id]);

  // Fetch total followers for the blog
  const fetchTotalFollowers = async () => {
    if (!blog || !blog.author_id) {
      console.error("Author ID is missing");
      return;
    }

    try {
      const response = await fetch(
        `https://stem.automatex.dev/api/follow/${blog.author_id}/followers/`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setTotalFollowers(data.total_followers);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Trigger fetch of total followers when blog data is available
  useEffect(() => {
    if (blog && blog.author_id) {
      fetchTotalFollowers();
    }
  }, [blog]);

  const handleFollowToggle = async () => {
    if (!blog || !blog.author_id) {
      setFollowError("Author ID is missing or undefined");
      return;
    }

    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        throw new Error("No access token found");
      }

      const url = isFollowing
        ? `https://stem.automatex.dev/api/follows/${blog.author_id}/unfollow_user/`
        : `https://stem.automatex.dev/api/follows/${blog.author_id}/follow_user/`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        setFollowError(errorData.detail || "Failed to update follow status");
        setFollowSuccessMessage("");
        return;
      }

      const newIsFollowing = !isFollowing;
      setIsFollowing(newIsFollowing);

      // Update total followers count based on the new follow status
      setTotalFollowers((prev) => (newIsFollowing ? prev + 1 : prev - 1));

      setFollowSuccessMessage(
        newIsFollowing
          ? "You have started following this blog."
          : "You have unfollowed this blog."
      );
      setFollowError("");
      const followedBlogs =
        JSON.parse(localStorage.getItem("followed_blogs")) || {};
      followedBlogs[blog.author_id] = newIsFollowing;
      localStorage.setItem("followed_blogs", JSON.stringify(followedBlogs));
    } catch (error) {
      console.error("Error toggling follow status:", error);
      setFollowError(error.message);
      setFollowSuccessMessage("");
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!blog) {
    return <div className="text-center">Blog not found</div>;
  }

  return (
    <>
      <section className="w-full max-w-screen-xl mx-auto flex flex-col md:flex-row gap-8 p-8 font-suwannaphum">
        {/* Blog Content Section */}
        <div className="w-full md:w-2/3 flex flex-col">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4" dangerouslySetInnerHTML={{ __html: blog.title || "No title" }}></h1>
          <p className="text-base md:text-lg lg:text-xl mb-4" dangerouslySetInnerHTML={{ __html: blog.content || "No content" }}></p>
          <div className="w-full flex justify-center mb-4">
            <img
              className="w-full max-w-lg object-cover rounded-lg"
              src={
                blog.image
                  ? blog.image.replace(
                      /^http:\/\/136.228.158.126:50001\/media\/uploads\//,
                      "https://stem.automatex.dev/media/uploads/"
                    )
                  : "https://via.placeholder.com/600x400"
              } // Fallback image if blog.image is null or undefined
              alt={blog.title || "Blog Image"}
            />
          </div>
        </div>

        {/* Profile Section */}
        <div className="w-full md:w-1/3 flex flex-col gap-8">
          <div className="w-full py-4 px-3 bg-gray-200 rounded-lg shadow-lg flex flex-col items-center">
            <img
              src={
                blog.profileUser
                  ? blog.profileUser.replace(
                      /^http:\/\/136.228.158.126:50001\/media\/uploads\//,
                      "https://stem.automatex.dev/media/uploads/"
                    )
                  : "https://mastertondental.co.nz/wp-content/uploads/2022/12/team-profile-placeholder.jpg"
              }
              alt="Profile Image"
              className="w-24 h-24 md:w-20 md:h-20 rounded-full"
            />
            <div className="mt-3 text-center">
              <div className="font-bold text-lg md:text-base">{blog.author || "Unknown Author"}</div>
              <div className="text-gray-400 text-sm md:text-xs">@{blog.author || "username"}</div>
              <p className="text-sm md:text-base mt-2">
                {error && <span className="text-red-500">Error: {error}</span>}
                {totalFollowers !== null && !loading && !error && (
                  <span>Followers: {totalFollowers}</span>
                )}
              </p>
              <button
                className={`mt-4 py-2 px-4 rounded-xl transition-transform duration-300 ${
                  isFollowing
                    ? "bg-gray-400"
                    : "bg-[#16a1df] hover:bg-[#246a8b] transform hover:scale-105"
                } text-white`}
                onClick={handleFollowToggle}
              >
                <SlUserFollow className="inline-block mr-2" />
                {isFollowing ? "Unfollow" : "Follow"}
              </button>
            </div>
          </div>

          {/* Related Articles Section */}
          <div className="w-full p-4 bg-gray-200 rounded-lg">
            <h2 className="font-bold text-lg md:text-base mb-4">Related Articles</h2>
            <ul>
              {[...Array(4)].map((_, index) => (
                <li key={index} className="flex items-center space-x-4 mb-4">
                  <img
                    src={
                      blog.image
                        ? blog.image.replace(
                            /^http:\/\/136.228.158.126:50001\/media\/uploads\//,
                            "https://stem.automatex.dev/media/uploads/"
                          )
                        : "https://via.placeholder.com/80x80"
                    }
                    alt={`Related article ${index + 1}`}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <p className="text-sm md:text-xs font-semibold" dangerouslySetInnerHTML={{ __html: blog.title || "Related article" }}></p>
                    <p className="text-xs text-gray-500 mt-1">Date</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Display follow messages */}
      {followError && (
        <div className="fixed bottom-0 right-0 p-4 bg-red-500 text-white">
          {followError}
        </div>
      )}
      {followSuccessMessage && (
        <div className="fixed bottom-0 right-0 p-4 bg-green-500 text-white">
          {followSuccessMessage}
        </div>
      )}
    </>
  );
};

export default BlogDetail;
