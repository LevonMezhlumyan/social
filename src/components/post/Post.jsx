import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useContext, useState } from "react";
import { makeRequest } from "../../pages/api/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../context/AuthContext";
import { DEFAULT_AVATAR } from "../config/config";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [menu, setMenu] = useState(false);

  const { isLoading, error, data } = useQuery({
    queryKey: ["likes", post.id],
    queryFn: () =>
      makeRequest.get(`/likes?postId=${post.id}`).then((res) => res.data),
  });

  const { data: commentData } = useQuery({
    queryKey: ["comments", post.id],
    queryFn: () =>
      makeRequest.get(`/comments?postId=${post.id}`).then((res) => res.data),
  });

  const queryClient = useQueryClient();
  const mutation = useMutation(
    (liked) => {
      if(!liked) {
        return makeRequest.post("/likes?postId="+post.id);
      }
      return makeRequest.delete("/likes?postId="+post.id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("likes");
      },
    }
  );
  const delMutation = useMutation(
    (postId) => {
        return makeRequest.delete("/posts/"+postId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("posts");
      },
    }
  );

  const handleLike = () => {
    mutation.mutate(data?.includes(currentUser.id));
  };

  const handleDelete = () => {
    delMutation.mutate(post.id)
  }

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.profilePic || DEFAULT_AVATAR} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">1 min ago</span>
            </div>
          </div>
          <MoreHorizIcon onClick={() => setMenu(!menu)}/>
        </div>
          {menu && post.userId === currentUser.id && <div style={{display: "flex", justifyContent: 'flex-end'}}><button style={{border: 'none', padding: "10px", backgroundColor: 'red', color: 'white'}} onClick={handleDelete}>Delete</button></div>}
        <div className="content">
          <p>{post.desc}</p>
          {post?.img && <img src={post.img} alt="" />}
        </div>
        <div className="info">
          <div className="item">
            {data?.includes(currentUser.id) ? (
              <FavoriteOutlinedIcon
                onClick={handleLike}
                style={{ color: "red" }}
              />
            ) : (
              <FavoriteBorderOutlinedIcon onClick={handleLike} />
            )}
            {error ? "faile" : isLoading ? "..." : data?.length}
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            {commentData?.length} Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  );
};

export default Post;
