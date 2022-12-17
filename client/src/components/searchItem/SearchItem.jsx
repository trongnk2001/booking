import { Link } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({ item }) => {
  return (
    <div className="searchItem">
      <img src={item.photos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.distance}m từ trung tâm</span>
        <span className="siTaxiOp">Xe đưa đón sân bay</span>
        <span className="siSubtitle">
            Khách sạn sang trọng
        </span>
        <span className="siFeatures">{item.desc}</span>
        <span className="siCancelOp">Huỷ miễn phí </span>
        <span className="siCancelOpSubtitle">
            Bạn có thể huỷ sau, vì vậy hãy đặt ngay!
        </span>
      </div>
      <div className="siDetails">
        {item.rating && <div className="siRating">
          <span>Excellent</span>
          <button>{item.rating}</button>
        </div>}
        <div className="siDetailTexts">
          <span className="siPrice">{item.cheapestPrice.toLocaleString()} đ</span>
          <span className="siTaxOp">Đã bao gồm thuế và phí</span>
          <Link to={`/hotels/${item._id}`}>
          <button className="siCheckButton">Xem phòng trống</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;