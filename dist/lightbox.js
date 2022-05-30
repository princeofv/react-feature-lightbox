import React, { useState, useEffect, useRef, Fragment } from 'react';
import './index.css';
import IconAssets from './lightboxAssets/index';
export default function LightBox(props) {
  const inputRef = useRef();
  let newSlide = '';
  const mediaItems = props.mediaItems && props.mediaItems.filter((item, i) => {
    if (props.currentSlide) {
      if (i === props.currentSlide) {
        newSlide = item;
      }
    }

    return item.type.toLowerCase() !== 'file';
  });
  const newCurrentSlide = mediaItems.findIndex(res => res === newSlide);
  const {
    callback
  } = props;
  const [toggler, setToggler] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(props.currentSlide ? newCurrentSlide : 0);
  const [downloadMediaUrl, setDownloadMediaUrl] = useState('');
  const [scale, setScale] = useState(1);
  const [isScalable, setIsScalable] = useState(false);
  const [media, setMedia] = useState(mediaItems[currentSlide].media);

  const setToFullScreen = () => {
    const el = inputRef.current;

    if (el) {
      if (el.requestFullscreen) {
        el.requestFullscreen();
      } else if (el.msRequestFullscreen) {
        el.msRequestFullscreen();
      } else if (el.mozRequestFullScreen) {
        el.mozRequestFullScreen();
      } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen();
      }
    }
  };

  const toggleIsOpen = () => {
    setToggler(!toggler);
    callback();
  };

  useEffect(() => {
    if (mediaItems[currentSlide].type === 'VIDEO' || mediaItems[currentSlide].type === 'IMAGE') {
      setIsScalable(true);
    } else {
      setIsScalable(false);
    }

    const mediaUrl = mediaItems[currentSlide].media;
    fetch(mediaUrl).then(res => res.blob()).then(data => {
      const blobUrl = URL.createObjectURL(data);
      setDownloadMediaUrl(blobUrl);
    });
    setMedia(mediaItems[currentSlide].media);
  }, [mediaItems, currentSlide]);

  const showPrev = e => {
    e.stopPropagation();
    let currentIndex = currentSlide;

    if (currentIndex <= 0) {
      currentIndex = mediaItems.length - 1;
    } else {
      currentIndex -= 1;
    }

    setCurrentSlide(currentIndex);

    if (mediaItems[currentIndex].type === 'VIDEO' || mediaItems[currentIndex].type === 'IMAGE') {
      setIsScalable(true);
    } else {
      setIsScalable(false);
    }

    fetch(media).then(res => res.blob()).then(data => {
      const blobUrl = URL.createObjectURL(data);
      setDownloadMediaUrl(blobUrl);
    });
    fetch(media).then(res => res.blob()).then(data => {
      const blobUrl = URL.createObjectURL(data);
      setDownloadMediaUrl(blobUrl);
    });
    setMedia(mediaItems[currentIndex].media); // parentShowPrev(e);
  };

  const showNext = e => {
    e.stopPropagation();
    let currentIndex = currentSlide;

    if (currentIndex >= mediaItems.length - 1) {
      currentIndex = 0;
    } else {
      currentIndex += 1;
    }

    setCurrentSlide(currentIndex);

    if (mediaItems[currentIndex].type === 'VIDEO' || mediaItems[currentIndex].type === 'IMAGE') {
      setIsScalable(true);
    } else {
      setIsScalable(false);
    }

    fetch(media).then(res => res.blob()).then(data => {
      const blobUrl = URL.createObjectURL(data);
      setDownloadMediaUrl(blobUrl);
    });
    setMedia(mediaItems[currentIndex].media); // shownext chaining parent event method definition also.
    // parentShowNext(e);
  }; // Arrow keys handler
  // const keyDownHandler = (event: any) => {
  //   console.log(event.code);
  //   if (event.code === 'ArrowLeft') {
  //     showPrev(event);
  //   }
  //   if (event.code === 'ArrowRight') {
  //     showNext(event);
  //   }
  //   if (event.code === 'Escape') {
  //     setToggler(!toggler);
  //   }
  // };


  const ZoomIn = () => {
    setScale(scale * 1.1);
  };

  const ZoomOut = () => {
    setScale(scale / 1.1);
  };

  document.onkeydown = event => {
    if (event.code === 'ArrowLeft') {
      showPrev(event);
    }

    if (event.code === 'ArrowRight') {
      showNext(event);
    }

    if (event.code === 'Escape') {
      setToggler(!toggler);
    }
  };

  return /*#__PURE__*/React.createElement(Fragment, null, toggler ? /*#__PURE__*/React.createElement("div", {
    className: "lightbox"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lsbox"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lightbox-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "item-count"
  }, /*#__PURE__*/React.createElement("h6", {
    className: "count-h6"
  }, currentSlide + 1, "/", mediaItems.length)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "button-group"
  }, isScalable ? /*#__PURE__*/React.createElement("div", null, " ", /*#__PURE__*/React.createElement("div", {
    className: "tooltip"
  }, /*#__PURE__*/React.createElement("button", {
    className: "icon-button",
    type: "button",
    onClick: ZoomIn
  }, /*#__PURE__*/React.createElement("img", {
    src: IconAssets.ZoomIn,
    alt: "",
    className: "svg-icons"
  })), /*#__PURE__*/React.createElement("span", {
    className: "tooltiptext"
  }, "Zoom In")), /*#__PURE__*/React.createElement("div", {
    className: "tooltip"
  }, /*#__PURE__*/React.createElement("button", {
    className: "icon-button",
    type: "button",
    onClick: ZoomOut
  }, /*#__PURE__*/React.createElement("img", {
    src: IconAssets.ZoomOut,
    alt: "",
    className: "svg-icons"
  })), /*#__PURE__*/React.createElement("span", {
    className: "tooltiptext"
  }, "Zoom Out")), /*#__PURE__*/React.createElement("div", {
    className: "tooltip"
  }, /*#__PURE__*/React.createElement("button", {
    className: "icon-button",
    type: "button",
    onClick: setToFullScreen
  }, /*#__PURE__*/React.createElement("img", {
    src: IconAssets.Fullscreen,
    alt: "",
    className: "svg-icons"
  })), /*#__PURE__*/React.createElement("span", {
    className: "tooltiptext"
  }, "Full Screen"))) : null, /*#__PURE__*/React.createElement("a", {
    href: downloadMediaUrl,
    download: true
  }, /*#__PURE__*/React.createElement("div", {
    className: "tooltip"
  }, /*#__PURE__*/React.createElement("button", {
    className: "icon-button",
    type: "button"
  }, /*#__PURE__*/React.createElement("img", {
    src: IconAssets.Download,
    alt: "",
    className: "svg-icons"
  })), /*#__PURE__*/React.createElement("span", {
    className: "tooltiptext"
  }, "Download"))), /*#__PURE__*/React.createElement("div", {
    className: "tooltip"
  }, /*#__PURE__*/React.createElement("button", {
    className: "icon-button",
    onClick: toggleIsOpen,
    type: "button"
  }, /*#__PURE__*/React.createElement("img", {
    src: IconAssets.Close,
    alt: "",
    className: "svg-icons"
  })), /*#__PURE__*/React.createElement("span", {
    className: "tooltiptext"
  }, "Close"))))), mediaItems.length > 1 ? /*#__PURE__*/React.createElement("div", {
    className: "left"
  }, /*#__PURE__*/React.createElement("button", {
    className: "icon-button",
    onClick: showPrev,
    type: "button"
  }, /*#__PURE__*/React.createElement("img", {
    src: IconAssets.Left,
    alt: "",
    className: "svg-icons"
  }))) : /*#__PURE__*/React.createElement("div", null), media ? /*#__PURE__*/React.createElement("div", {
    className: "media-center",
    ref: inputRef
  }, mediaItems[currentSlide].type === "IMAGE" ? /*#__PURE__*/React.createElement("div", {
    style: {
      transform: `scale(${scale})`
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: media,
    alt: "Broken",
    className: "lightbox-media"
  }), /*#__PURE__*/React.createElement("h6", {
    className: "lightbox-caption"
  }, mediaItems[currentSlide].caption ? mediaItems[currentSlide].caption : "")) : mediaItems[currentSlide].type === "VIDEO" ? /*#__PURE__*/React.createElement("div", {
    style: {
      transform: `scale(${scale})`
    }
  }, /*#__PURE__*/React.createElement("video", {
    className: "lightbox-media",
    controls: true
  }, /*#__PURE__*/React.createElement("source", {
    src: media,
    type: "video/mp4"
  }), /*#__PURE__*/React.createElement("source", {
    src: media,
    type: "video/ogg"
  })), /*#__PURE__*/React.createElement("h5", {
    className: "lightbox-caption"
  }, mediaItems[currentSlide].caption ? mediaItems[currentSlide].caption : "")) : mediaItems[currentSlide].type === "AUDIO" ? /*#__PURE__*/React.createElement("div", {
    className: "lightbox-audio"
  }, /*#__PURE__*/React.createElement("audio", {
    src: media,
    controls: true,
    style: {
      width: window.innerWidth < 390 ? "210px" : "300px"
    }
  }), /*#__PURE__*/React.createElement("h5", {
    className: "lightbox-caption"
  }, mediaItems[currentSlide].caption ? mediaItems[currentSlide].caption : "")) : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h6", {
    className: "lightbox-caption"
  }, "Mediafile is Not supported"))) : /*#__PURE__*/React.createElement("div", {
    className: "circular-progress"
  }, /*#__PURE__*/React.createElement("div", {
    className: "loader"
  })), mediaItems.length > 1 ? /*#__PURE__*/React.createElement("div", {
    className: "right"
  }, /*#__PURE__*/React.createElement("button", {
    className: "icon-button",
    onClick: showNext,
    type: "button"
  }, /*#__PURE__*/React.createElement("img", {
    src: IconAssets.Right,
    alt: "",
    className: "svg-icons"
  }))) : /*#__PURE__*/React.createElement("div", null))) : null);
}