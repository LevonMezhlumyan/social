import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { makeRequest } from "../../pages/api/axios";
import { storage } from "../../firebase";
import Image from "../../assets/img.png";
import { useState } from "react";
import { v4 } from "uuid";
import "./update.scss";

function Update({ set, user }) {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(false);
  const [cover, setCover] = useState(null);
  const [texts, setTexts] = useState({
    name: user?.name || "",
    city: user?.city || "",
    website: user?.website || "",
  });

  const queryClient = useQueryClient();
  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const mutation = useMutation(
    (user) => {
      return makeRequest.put("/users", user);
    },
    {
      onSuccess: () => {
        set(false);
        queryClient.invalidateQueries("user");
      },
    }
  );
  const uploadImgs = async (cover) => {
    const uniquecoverName = `images/${cover.name + v4()}`;
    const imageRef = ref(storage, uniquecoverName);
    return uploadBytes(imageRef, cover).then(() => {
      return getDownloadURL(imageRef)
        .then((url) => {
          return url;
        })
        .catch((e) => e);
    });
  };
  const handelSubmit = async () => {
    let c = await uploadImgs(cover);
    let p = await uploadImgs(profile);
    mutation.mutate({ coverPic: c, profilePic: p, ...texts });
  };

  const check = (e) => {
    e.preventDefault();
    if (!cover || !profile) {
      setError(true)
      return;
    }
    handelSubmit();
  };
  return (
    <div className="wrapper">
      <div className="update">
        <div className="header">
          <div></div>
          <h1>UPDATE</h1>
          <button onClick={() => set(false)}>X</button>
        </div>
        <form>
          <h3>Cover Picture</h3>
          <label htmlFor="file">
            <div className="item">
              <img src={Image} alt="" />
            </div>
            <div className="imgContainer">
                {cover && <img
                  src={
                    cover
                      ? URL.createObjectURL(cover)
                      : "/upload/" + user.coverPic
                  }
                  alt=""
                />}</div>
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={(e) => setCover(e.target.files[0])}
          />
          <h3>Avatar</h3>
          <label htmlFor="profile">
            <div className="item">
              <img src={Image} alt="" />
            </div>
            <div className="imgContainer">
                {profile && <img
                  src={
                    profile
                      ? URL.createObjectURL(profile)
                      : "/upload/" + user.profilePic
                  }
                  alt=""
                />}</div>
          </label>
          <input
            id="profile"
            type="file"
            style={{ display: "none" }}
            onChange={(e) => setProfile(e.target.files[0])}
          />
          <input
            value={texts.name}
            type="text"
            name={"name"}
            placeholder="name"
            onChange={handleChange}
          />
          <input
            value={texts.city}
            type="text"
            name={"city"}
            placeholder="city"
            onChange={handleChange}
          />
          <input
            value={texts.website}
            type="text"
            name={"website"}
            placeholder="website"
            onChange={handleChange}
          />
          {error && <p>Choose Avatar and Cover pictures</p>}
          <button onClick={check}>Update</button>
        </form>
      </div>
    </div>
  );
}

export default Update;
