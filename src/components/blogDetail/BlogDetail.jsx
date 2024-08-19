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

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const blogData = await fetchBlogById(id);
        setBlog(blogData);

        const followedBlogs = JSON.parse(localStorage.getItem("followed_blogs")) || {};
        if (blogData.author_id in followedBlogs) {
          setIsFollowing(followedBlogs[blogData.author_id]);
        } else {
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
            localStorage.setItem("followed_blogs", JSON.stringify(followedBlogs));
          }
        }
      } catch (error) {
        console.error("Error fetching blog data:", error);
        setError("Failed to load blog data.");
      }
    };

    fetchBlogData();
  }, [id]);

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

      setTotalFollowers((prev) => (newIsFollowing ? prev + 1 : prev - 1));

      setFollowSuccessMessage(
        newIsFollowing
          ? "You have started following this blog."
          : "You have unfollowed this blog."
      );
      setFollowError("");

      const followedBlogs = JSON.parse(localStorage.getItem("followed_blogs")) || {};
      followedBlogs[blog.author_id] = newIsFollowing;
      localStorage.setItem("followed_blogs", JSON.stringify(followedBlogs));
    } catch (error) {
      console.error("Error toggling follow status:", error);
      setFollowError(error.message);
      setFollowSuccessMessage("");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <section className="w-[100%] mx-auto flex flex-col md:flex-row justify-between gap-8 p-8 font-suwannaphum">
      <div className="w-full h-full">
        <h1 className="text-2xl font-bold mb-4" dangerouslySetInnerHTML={{ __html: blog.title || "No title" }}></h1>
        <p className="mb-4 text-[18px]" dangerouslySetInnerHTML={{ __html: blog.content || "No title" }} ></p>
        <div className="w-[60%] mx-auto flex justify-center">
          <div>
            <img
              className="w-full object-cover rounded-lg"
              src={
                blog.image
                  ? blog.image.replace(
                      /^http:\/\/136.228.158.126:50001\/media\/uploads\//,
                      "https://stem.automatex.dev/media/uploads/"
                    )
                  : "https://via.placeholder.com/150"
              }
              alt={blog.title || "Image"}
            />
          </div>
        </div>
      </div>

      <div className="w-full md:w-[35%] flex flex-col gap-8">
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
            className="w-16 h-16 md:w-12 md:h-12 rounded-full"
          />
        </div>
        <div className="ml-3 flex flex-col items-center text-center">
          <div className="font-bold text-base md:text-sm mt-2">{`${blog.author}`}</div>
          <div className="text-gray-400 text-sm md:text-xs mt-2">
            @{blog.author}
          </div>
          <span className="mt-2">
            {error && <p>Error: {error}</p>}
            {totalFollowers !== null && !loading && !error && (
              <p className="text-sm md:text-base">
                ចំនួនតាម : {totalFollowers}
              </p>
            )}
          </span>
        </div>

        <div
          className={`flex items-center text-white space-x-2 py-2 px-4 md:px-8 lg:px-12 xl:px-16 rounded-xl cursor-pointer transition-all duration-300 mt-4 ${
            isFollowing
              ? "bg-gray-400"
              : "bg-[#16a1df] hover:bg-[#246a8b] transform hover:scale-105"
          }`}
          onClick={handleFollowToggle}
          aria-pressed={isFollowing}
        >
          <SlUserFollow className="text-base md:text-sm" />
          <button className="text-sm md:text-base lg:text-lg">
            {isFollowing ? "ឈប់តាម" : "តាមដាន"}
          </button>
        </div>
      </div>

      <div className="w-full p-4 bg-gray-200 rounded-lg">
        <ul>
          <li className="font-bold text-lg md:text-base mb-4">
            អត្ថបទដែលពាក់ព័ន្ធ
          </li>
          {[...Array(4)].map((_, index) => (
            <li key={index} className="flex items-center space-x-4">
              <div className="w-[80px] h-[80px] md:w-[60px] md:h-[60px] mt-3 cursor-pointer">
                <img
                  src={
                    blog.image
                      ? blog.image.replace(
                          /^http:\/\/136.228.158.126:50001\/media\/uploads\//,
                          "https://stem.automatex.dev/media/uploads/"
                        )
                      : "https://via.placeholder.com/150"
                  }
                  alt="image"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <p className="text-sm md:text-xs">{blog.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default BlogDetail;
