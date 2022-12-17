import "./featured.css"
import useFetch from './../../hooks/useFetch';

const Featured = () => {

    const {data,loading,error} = useFetch("/hotels/countByCity?cities=Đà Nẵng,Đà Lạt,Sa Pa")
    console.log(data);

  return(
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
        <div className="featuredItem">
            <img src="https://t-cf.bstatic.com/xdata/images/city/500x500/688843.webp?k=cf7302d43a44850ddf8509da48c3198d4dda0aa75832b5737cc241249bf394aa&o" alt="" className="featuredImg" />
            <div className="featuredTitles">
                <h1>Đà Nẵng</h1>
                <h2>{data[0]} properties</h2>
            </div>
        </div>

        <div className="featuredItem">
            <img src="https://t-cf.bstatic.com/xdata/images/city/500x500/688828.webp?k=6ff2042e10f68221007161a36c476226806abfe0a511a9104d45263cc0cedf55&o=" alt="" className="featuredImg" />
            <div className="featuredTitles">
                <h1>Đà Lạt</h1>
                <h2>{data[1]} properties</h2>
            </div>
        </div>

        <div className="featuredItem">
            <img 
            src="https://t-cf.bstatic.com/xdata/images/city/500x500/688849.webp?k=c1f2770a0c096aeb09a6956a9754abbb61b946a932601a4a02bb6aa42d7fa74a&o=" alt="" 
            className="featuredImg" />
            <div className="featuredTitles">
                <h1>Sa Pa</h1>
                <h2>{data[2]} properties</h2>
            </div>
        </div>
        </>
      )}
    </div>
  );
}

export default Featured