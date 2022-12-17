import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { useLocation } from 'react-router-dom';
import useFetch from './../../hooks/useFetch';
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from './../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Reserve from "../../components/reserve/Reserve";

const Hotel = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const location = useLocation()
  const id = location.pathname.split("/")[2];

  const { data, loading, error } = useFetch(`/hotels/find/${id}`);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { dates, options } = useContext(SearchContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }
  const days = dayDifference(dates[0].endDate, dates[0].startDate);


  const photos = [
    {
      src: "https://t-cf.bstatic.com/xdata/images/hotel/max1280x900/397998518.jpg?k=c5c68393aba0920de3941eb74f31a57abfdd0b1640627829ae9e1e189a54620c&o=&hp=1",
    },
    {
      src: "https://t-cf.bstatic.com/xdata/images/hotel/max1280x900/400664037.jpg?k=e9246321f8dbe9bd410d06eba0139ce965fe768f9a06c6687052681408ef84d3&o=&hp=1",
    },
    {
      src: "https://t-cf.bstatic.com/xdata/images/hotel/max1280x900/400664039.jpg?k=451fecf436015e5324f3dd56b5686f5d5a9435e3ec21e421ba1b276da2cb8b2e&o=&hp=1",
    },
    {
      src: "https://t-cf.bstatic.com/xdata/images/hotel/max1280x900/400663500.jpg?k=ce8b007e4186f94d57a6a743dfce7713563d3a205b6988993e2987ebb55edec9&o=&hp=1",
    },
    {
      src: "https://t-cf.bstatic.com/xdata/images/hotel/max1280x900/400663511.jpg?k=bdfb6aa8b233dd659b50a1dfb52839fb323d2fe0d7ac30d555f4d22e57253e44&o=&hp=1",
    },
    {
      src: "https://t-cf.bstatic.com/xdata/images/hotel/max1280x900/400663916.jpg?k=1fae04d62c839f79195f10bb8032a03dccae6ab7d63df2b24e9cbbc50ce4afe7&o=&hp=1",
    },
  ];


  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber)
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "loading"
      ) : (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img
                  src={data.photos[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="hotelWrapper">
            <button className="bookNow">Đặt trước hoặc Đặt ngay!</button>
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">
              Vị trí thuận lợi – {data.distance}m từ trung tâm
            </span>
            <span className="hotelPriceHighlight">
              Đặt kỳ nghỉ tại khách sạn này và taxi sân bay miễn phí
            </span>
            <div className="hotelImages">
              {data.photos?.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">{data.desc}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Hoàn hảo cho một kỳ nghỉ {days} ngày! </h1>
                <span>
                  Nằm ngay trung tâm, chỗ nghỉ này có điểm vị trí tuyệt vời - 9,8!
                </span>
                <h2>
                  <b>{(days * data.cheapestPrice * options.room).toLocaleString()} đ</b> ({days}{" "}
                  đêm )
                </h2>
                <button onClick={handleClick}>Đặt ngay!</button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id}/>}
    </div>
  );
};

export default Hotel;