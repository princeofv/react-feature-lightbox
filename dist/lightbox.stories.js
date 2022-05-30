import React from "react";
import LightBox from "./lightbox";
const image1 = "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80";
const image2 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrKHPsvNDJHY9tWpkHrfkfo8Dkf0LvZU3Hdg&usqp=CAU";
const image3 = "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__480.jpg";
const image4 = "https://wallpapercave.com/wp/wp4626258.jpg";
const image5 = "https://c4.wallpaperflare.com/wallpaper/907/35/593/spiderman-hd-4k-5k-wallpaper-preview.jpg";
const data = [{
  media: image1,
  type: "IMAGE"
}, {
  media: image2,
  type: "IMAGE"
}, {
  media: image3,
  type: "IMAGE"
}, {
  media: image4,
  type: "IMAGE"
}, {
  media: image5,
  type: "IMAGE"
}];
export default {
  title: "Example/LightBox",
  component: LightBox,
  argTypes: {
    currentSlide: 0,
    callback: undefined,
    mediaItems: {
      data
    }
  }
};

const Template = args => /*#__PURE__*/React.createElement(LightBox, args);

export const Default = Template.bind({});
Default.args = {
  label: "LighBox"
};