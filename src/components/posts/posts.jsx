import "./posts.scss";
import Post from "../post/Post";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../pages/api/axios";

export default function Posts({ userId }) {
  const { isLoading, error, data } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      makeRequest.get(!userId ? `/posts` : `/posts?userId=${userId}`).then((res) => res.data),
  });

  return (
    <div className="posts">
      {error
        ? "Something went wrong"
        : isLoading
        ? "Loading..."
        : data?.map((post) => (
            <div className="post" key={post.id}>
              <Post key={post.id} post={post} />
            </div>
          ))}
    </div>
  );
}
