import React, { useState } from "react";
import { LightBox } from './components';
const image1 =
  "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80";
const image2 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrKHPsvNDJHY9tWpkHrfkfo8Dkf0LvZU3Hdg&usqp=CAU";
const image3 = "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__480.jpg";
const image4 = "https://wallpapercave.com/wp/wp4626258.jpg";
const image5 = "https://c4.wallpaperflare.com/wallpaper/907/35/593/spiderman-hd-4k-5k-wallpaper-preview.jpg";
const data = [
  {
    media: image1,
    type: "IMAGE",
  },
  {
    media: image2,
    type: "IMAGE",
  },
  {
    media: image3,
    type: "IMAGE",
  },
  {
    media: image4,
    type: "IMAGE",
  },
  {
    media: image5,
    type: "IMAGE",
  },
];
function App() {
    const [toggler, setToggler] = useState(false);
    const [currentSlide, setCurrentSlide] = useState();
  return (
    <div style={{textAlign:'center'}}>
      {data?.map((val, i) => (
        <div key={val.media}>
          <div
            onClick={() => {
              setCurrentSlide(i);
              setToggler(true);
            }}
          >
            {val.type === "IMAGE" ? (
              <img src={val.media} height="300px" width="300px" alt="" />
            ) : val.type === "VIDEO" ? (
              <video width="320" height="300" controls>
                <source src={val.media} type="video/mp4" />
                <source src={val.media} type="video/ogg" />
              </video>
            ) : val.type === "AUDIO" ? (
              <audio style={{ height: "300px" }} controls>
                <source src={val.media} type="audio/ogg" />
                <source src={val.media} type="audio/mpeg" />
              </audio>
            ) : (
              <h2> This Media file is not Supported</h2>
            )}
          </div>
        </div>
      ))}
      {toggler ? (
        <LightBox
          // currentSlide={currentSlide}
          mediaItems={data}
          callback={() => {
            setToggler(false);
          }}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
