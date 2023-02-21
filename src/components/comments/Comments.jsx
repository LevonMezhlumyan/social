import "./comments.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { makeRequest } from "../../pages/api/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { DEFAULT_AVATAR } from "../config/config";

export default function Comments({ postId }) {
  const [desc, setDesc] = useState("");
  const { currentUser } = useContext(AuthContext);
  const { isLoading, error, data } = useQuery({
    queryKey: ["comments"],
    queryFn: () =>
      makeRequest.get(`/comments?postId=${postId}`).then((res) => res.data),
  });
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newComment) => {
      return makeRequest.post("/comments", newComment);
    },
    {
      onSuccess: () => {
        setDesc("");
        queryClient.invalidateQueries("comments");
      },
    }
  );
    const handleClick = (e) => {
      e.preventDefault();
      mutation.mutate({desc, postId});
    }

  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePic || DEFAULT_AVATAR} alt="" />
        <input
          type="text"
          maxLength={200}
          placeholder="write a comment"
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={handleClick}>Send</button>
      </div>
      {error
        ? "Something went wrong"
        : isLoading
        ? "Loading..."
        : data?.map((comment) => (
            <div className="comment" key={comment.id}>
              <img src={comment.profilePic || DEFAULT_AVATAR} alt="img" />
              <div className="info">
                <span>{comment.name}</span>
                <p>{comment.desc}</p>
              </div>
              <span className="date">
                {moment(comment.createdAt).fromNow()}
              </span>
            </div>
          ))}
    </div>
  );
}
