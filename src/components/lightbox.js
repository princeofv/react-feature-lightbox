import React, { useState, useEffect, useRef ,Fragment } from 'react';
import './index.css';
import IconAssets from './lightboxAssets/index';


export default function LightBox(props) {
  const inputRef = useRef();
  let newSlide = '';
  const mediaItems =
    props.mediaItems &&
    props.mediaItems.filter((item, i) => {
      if(props.currentSlide){
        if (i === props.currentSlide) {
          newSlide = item;
        }
      }
      return item.type.toLowerCase() !== 'file';
    });
  const newCurrentSlide = mediaItems.findIndex((res) => res === newSlide);
  const { callback } = props;
  const [toggler, setToggler] = useState(true);
  const [currentSlide, setCurrentSlide] = 
  useState(props.currentSlide ?   newCurrentSlide :0);
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
    fetch(mediaUrl)
      .then(res => res.blob())
      .then(data => {
        const blobUrl = URL.createObjectURL(data);
        setDownloadMediaUrl(blobUrl);
      });
    setMedia(mediaItems[currentSlide].media);
  }, [mediaItems, currentSlide]);

  const showPrev = (e) => {
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
    fetch(media)
      .then(res => res.blob())
      .then(data => {
        const blobUrl = URL.createObjectURL(data);
        setDownloadMediaUrl(blobUrl);
      });
    fetch(media)
      .then(res => res.blob())
      .then(data => {
        const blobUrl = URL.createObjectURL(data);
        setDownloadMediaUrl(blobUrl);
      });
    setMedia(mediaItems[currentIndex].media);
    // parentShowPrev(e);
  };
  const showNext = (e) => {
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
    fetch(media)
      .then(res => res.blob())
      .then(data => {
        const blobUrl = URL.createObjectURL(data);
        setDownloadMediaUrl(blobUrl);
      });
    setMedia(mediaItems[currentIndex].media);
    // shownext chaining parent event method definition also.
    // parentShowNext(e);
  };
  // Arrow keys handler
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
  return (
    <Fragment>
      {toggler ? (
        <div className="lightbox">
          <div className="lsbox">
            <div className="lightbox-header">
              <div className="item-count">
                <h6 className="count-h6">
                  {currentSlide + 1}/{mediaItems.length}
                </h6>
              </div>
              <div>
                <div className="button-group">
                  {isScalable ? (
                    <div>
                      {" "}
                      <div className="tooltip">
                        <button className="icon-button" type="button" onClick={ZoomIn}>
                          <img src={IconAssets.ZoomIn} alt="" className="svg-icons" />
                        </button>
                        <span className="tooltiptext">Zoom In</span>
                      </div>
                      <div className="tooltip">
                        <button className="icon-button" type="button" onClick={ZoomOut}>
                          <img src={IconAssets.ZoomOut} alt="" className="svg-icons" />
                        </button>
                        <span className="tooltiptext">Zoom Out</span>
                      </div>
                      <div className="tooltip">
                        <button className="icon-button" type="button" onClick={setToFullScreen}>
                          <img src={IconAssets.Fullscreen} alt="" className="svg-icons" />
                        </button>
                        <span className="tooltiptext">Full Screen</span>
                      </div>
                    </div>
                  ) : null}
                  <a href={downloadMediaUrl} download>
                    <div className="tooltip">
                      <button className="icon-button" type="button">
                        <img src={IconAssets.Download} alt="" className="svg-icons" />
                      </button>
                      <span className="tooltiptext">Download</span>
                    </div>
                  </a>
                  <div className="tooltip">
                    <button className="icon-button" onClick={toggleIsOpen} type="button">
                      <img src={IconAssets.Close} alt="" className="svg-icons" />
                    </button>
                    <span className="tooltiptext">Close</span>
                  </div>
                </div>
              </div>
            </div>
            {mediaItems.length > 1 ? (
              <div className="left">
                <button className="icon-button" onClick={showPrev} type="button">
                  <img src={IconAssets.Left} alt="" className="svg-icons" />
                </button>
              </div>
            ) : (
              <div />
            )}

            {media ? (
              <div className="media-center" ref={inputRef}>
                {mediaItems[currentSlide].type === "IMAGE" ? (
                  <div style={{ transform: `scale(${scale})` }}>
                    <img src={media} alt="Broken" className="lightbox-media" />
                    <h6 className="lightbox-caption">
                      {mediaItems[currentSlide].caption ? mediaItems[currentSlide].caption : ""}
                    </h6>
                  </div>
                ) : mediaItems[currentSlide].type === "VIDEO" ? (
                  <div style={{ transform: `scale(${scale})` }}>
                    <video className="lightbox-media" controls>
                      <source src={media} type="video/mp4" />
                      <source src={media} type="video/ogg" />
                    </video>
                    <h5 className="lightbox-caption">
                      {mediaItems[currentSlide].caption ? mediaItems[currentSlide].caption : ""}
                    </h5>
                  </div>
                ) : mediaItems[currentSlide].type === "AUDIO" ? (
                  <div className="lightbox-audio">
                    <audio
                      src={media}
                      controls
                      style={{
                        width: window.innerWidth < 390 ? "210px" : "300px",
                      }}
                    />
                    <h5 className="lightbox-caption">
                      {mediaItems[currentSlide].caption ? mediaItems[currentSlide].caption : ""}
                    </h5>
                  </div>
                ) : (
                  <div>
                    <h6 className="lightbox-caption">Mediafile is Not supported</h6>
                  </div>
                )}
              </div>
            ) : (
              <div className="circular-progress">
                <div className="loader" />
              </div>
            )}
            {mediaItems.length > 1 ? (
              <div className="right">
                <button className="icon-button" onClick={showNext} type="button">
                  <img src={IconAssets.Right} alt="" className="svg-icons" />
                </button>
              </div>
            ) : (
              <div />
            )}
          </div>
        </div>
      ) : null}
    </Fragment>
  );
}
