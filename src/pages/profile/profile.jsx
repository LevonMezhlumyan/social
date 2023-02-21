import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { COVER_PHOTO, DEFAULT_AVATAR } from "../../components/config/config";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import { AuthContext } from "../../context/AuthContext";
import LanguageIcon from "@mui/icons-material/Language";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import Update from "../../components/update/Update";
import PlaceIcon from "@mui/icons-material/Place";
import Posts from "../../components/posts/Posts";
import { useParams } from "react-router-dom";
import { makeRequest } from "../api/axios";
import { useContext, useState } from "react";

const Profile = () => {
  const userId = useParams()?.id;
  const { currentUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const { isLoading, error, data } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      makeRequest.get(`/users/find/${userId}`).then((res) => res.data),
  });
  const { data: shipData } = useQuery({
    queryKey: ["ships"],
    queryFn: () =>
      makeRequest
        .get(`/ships?followedUserId=${userId}`)
        .then((res) => res.data),
  });

  const queryClient = useQueryClient();
  const mutation = useMutation(
    (following) => {
      if (!following) {
        return makeRequest.post("/ships?userId=" + userId);
      }
      return makeRequest.delete("/ships?userId=" + userId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("ships");
      },
    }
  );

  const handleFollow = () => {
    mutation.mutate(shipData?.includes(currentUser.id));
  };
  if (isLoading) {
    return <p>Loading</p>;
  } else if (error) {
    return <p>Something went wrong</p>;
  }
  return (
    <>
      <div className="profile">
        <div className="images">
          <img
            src={data?.coverPic || COVER_PHOTO}
            alt="CoverPic"
            className="cover"
          />
          <img
            src={data?.profilePic || DEFAULT_AVATAR}
            alt="ProfilePic"
            className="profilePic"
          />
        </div>
        <div className="profileContainer">
          <div className="uInfo">
            <div className="left">
              <a href="http://facebook.com">
                <FacebookTwoToneIcon fontSize="large" />
              </a>
              <a href="http://facebook.com">
                <InstagramIcon fontSize="large" />
              </a>
              <a href="http://facebook.com">
                <TwitterIcon fontSize="large" />
              </a>
              <a href="http://facebook.com">
                <LinkedInIcon fontSize="large" />
              </a>
              <a href="http://facebook.com">
                <PinterestIcon fontSize="large" />
              </a>
            </div>
            <div className="center">
              <span>{data?.name}</span>
              <div className="info">
                <div className="item">
                  <PlaceIcon />
                  <span>{data?.city}</span>
                </div>
                <div className="item">
                  <LanguageIcon />
                  <span>{data?.website}</span>
                </div>
              </div>
              {userId == currentUser.id ? (
                <button onClick={() => setOpen(true)}>Update</button>
              ) : (
                <button onClick={handleFollow}>
                  {!shipData?.includes(currentUser.id) ? "Follow" : "Following"}
                </button>
              )}
            </div>
            <div className="right">
              <EmailOutlinedIcon />
              <MoreVertIcon />
            </div>
          </div>
          <Posts userId={userId} />
        </div>
      </div>
      {open && <Update set={setOpen} user={data}/>}
    </>
  );
};

export default Profile;
