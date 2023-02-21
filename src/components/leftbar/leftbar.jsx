import "./leftbar.scss";
import Friends from "../../assets/1.png";
import Groups from "../../assets/2.png";
import Market from "../../assets/3.png";
import Watch from "../../assets/4.png";
import Memories from "../../assets/5.png";
import Events from "../../assets/6.png";
import Gaming from "../../assets/7.png";
import Gallery from "../../assets/8.png";
import Videos from "../../assets/9.png";
import Messages from "../../assets/10.png";
import Tutorials from "../../assets/11.png";
import Courses from "../../assets/12.png";
import Fund from "../../assets/13.png";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { DEFAULT_AVATAR } from "../config/config";

const items3 = [
  { name: "Fund", logo: Fund },
  { name: "Courses", logo: Courses },
  { name: "Tutorials", logo: Tutorials },
];
const items = [
  { name: "Friends", logo: Friends },
  { name: "Groups", logo: Groups },
  { name: "Marketplace", logo: Market },
  { name: "Watch", logo: Watch },
  { name: "Memories", logo: Memories },
];
const item2 = [
  { name: "Events", logo: Events },
  { name: "Gaming", logo: Gaming },
  { name: "Gallery", logo: Gallery },
  { name: "Videos", logo: Videos },
  { name: "Messages", logo: Messages },
];

export default function Leftbar() {
  const {currentUser} = useContext(AuthContext)

  return (
    <div className="leftbar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <img
              src={currentUser.profilePic || DEFAULT_AVATAR}
              alt="img"
            />
            <span>{currentUser.name}</span>
          </div>
          {items?.map((obj, i) => (
            <div className="item" key={i}>
              <img src={obj.logo} alt={obj.name} />
              <span>{obj.name}</span>
            </div>
          ))}
        </div>
        <hr />
        <div className="menu">
          <span>Your Shortcut</span>
          {item2?.map((obj, i) => (
            <div className="item" key={i}>
              <img src={obj.logo} alt={obj.name} />
              <span>{obj.name}</span>
            </div>
          ))}
        </div>
         <hr />
        <div className="menu">
          <span>Others</span>
          {items3?.map((obj, i) => (
            <div className="item" key={i}>
              <img src={obj.logo} alt={obj.name} />
              <span>{obj.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
