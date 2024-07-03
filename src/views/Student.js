import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header-student";
import StudentHome from "../components/Profile/StudentHome";
import StudentPredict from "../components/StudentPredict";
import SearchResult from "../components/DiseaseSearchResult";
import Cookies from "js-cookies";
import "../styles/student.css";
import { UserContext } from "../App";
import { SettingsApplicationsTwoTone } from "@mui/icons-material";
import Notification from "../components/Items/Notification";
const Student = () => {
  const [tab, setTab] = useState("predict");
  const user = useContext(UserContext);
  const [anwser, setAnwser] = useState([]);
  const [isShowNotification, setIsShowNotification] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [allDiseases, setAllDiseases] = useState([]);
  const navigate = useNavigate();

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
        if (res.status == 200) {
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
  const notify = [
    { tag: "anwser", content: "hello fen" },
    { tag: "anwser", content: "hello my name is dieu nhi" },
  ];

  const onSearchClick = (data) => {
    setSearchData(data);
    setTab("result");
  };

  const onSearchDelete = () => {
    setSearchData("");
    setTab("predict");
  };

  return (
    <div>
      <Header
        onNotifyClick={onNotifyClick}
        onSearch={onSearchClick}
        onDelete={onSearchDelete}
        allDiseases={allDiseases}
      />
      <div>
        {tab === "result" && <SearchResult results={searchData} />}
        {tab === "predict" && <StudentPredict />}
        {/* <SearchResult results={searchData} />
        <StudentPredict /> */}
        {isShowNotification && <Notification notify={anwser} />}
      </div>
    </div>
  );
};

export default Student;
