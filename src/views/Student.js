import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header-student";
import StudentPredict from "../components/StudentPredict";
import SearchResult from "../components/DiseaseSearchResult";
import Profile from "../components/Profile";
import Cookies from "js-cookies";
import "../styles/student.css";
import Notification from "../components/Items/Notification";

const Student = () => {
  const [tab, setTab] = useState("predict");
  const [anwser, setAnwser] = useState([]);
  const [isShowNotification, setIsShowNotification] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [allDiseases, setAllDiseases] = useState([]);
  const [profiledata, setProfiledata] = useState([]);
  const navigate = useNavigate();
  // const Student = () => {
  //     const [tab, setTab] = useState("home")
  //     const [anwser, setAnwser] = useState([])
  //     const [isShowNotification, setIsShowNotification] = useState(false)
  //     const navigate = useNavigate()
  //     const onTagChange = (value) => {
  //         setTab(value)
  //         console.log(value)
  //     }
  // const onNotifyClick = () => {
  //     setIsShowNotification(!isShowNotification)
  //     onGetNotification()

  useEffect(() => {
    // Tải toàn bộ dữ liệu bệnh từ API
    fetch("http://127.0.0.1:8000/api/disease/all")
      .then((response) => response.json())
      .then((data) => setAllDiseases(data))
      .catch((error) => console.error("Error fetching diseases:", error));
  }, []);

  const onNotifyClick = () => {
    setIsShowNotification(!isShowNotification);
    onGetNotification();
  };
  const onGetNotification = async () => {
    let id = null;
    try {
      id = Cookies.getItem("current_user");
      console.log(id);
    } catch (e) {
      console.log("cookies error", e);
      navigate("/login");
    }
    const url = `/api/question/user/${id}`;

    await fetch(url, { method: "GET" })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw new Error();
      })
      .then((data) => {
        setAnwser(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  const onSearchClick = (data) => {
    setSearchData(data);
    setTab("result");
  };
  // setInterval(() => {
  //     onGetNotification()
  // }, 60 * 1000);
  // const iconNotify = document.getElementById("icon-notify")
  // document.addEventListener("click",(e)=>{
  //     const event = iconNotify.contains(e.target)
  //     if(!event){
  //         setIsShowNotification(false)
  //     }
  // })

  const onSearchDelete = () => {
    setSearchData("");
    setTab("predict");
  };

  const onProfileClick = (data) => {
    setProfiledata(data);
    setTab("profile");
  };

  return (
    <div>
      <Header
        onNotifyClick={onNotifyClick}
        onSearch={onSearchClick}
        onDelete={onSearchDelete}
        allDiseases={allDiseases}
        profile={onProfileClick}
      />
      <div>
        {tab === "result" && <SearchResult results={searchData} />}
        {tab === "predict" && <StudentPredict />}
        {tab === "profile" && <Profile userinfo={profiledata}></Profile>}
        {/* <SearchResult results={searchData} />
        <StudentPredict /> */}
        {isShowNotification && <Notification notify={anwser} />}
      </div>
    </div>
  );
};
export default Student;
