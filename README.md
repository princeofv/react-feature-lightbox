# React-feature-LightBox

    npm i react-feature-lightbox

Lightbox is a popular and widely used concept for showing the gallery of media files. It is a very impressive approach for the end user to glance through media files. Media files like audio or video will load the html audio or video controls. 

Lightbox is a UI component which will be a simple, unobtrusive script used to overlay images on the current page. It is an elegant way to slide over the image gallery. It's a snap to setup and works on all modern browsers. It will blur the whole web page and show one of the images in the gallery which will avoid the screen size constraints. It will also keep the user on the same page and has next and previous controls to move between the images in the gallery. To return to the actual screen, we would have the close button to close the image lightbox modal and show the actual page. Having the count and slide position will be intuitive to the user for easy location of images in the gallery.

## Media Type Supports 
   Image , Video and Audio

## Base64 -Supported

# Code 
  Media Items has Must in Array of Object type 

    import { LightBox } from 'react-feature-lightbox';
    <!-- Must need to send 2 data , Media and Media type  -->
    const data = [
      {
        media: image1,
        type: "IMAGE",
      },
      {
        media: image1,
        type: "AUDIO",
      },{
        media: image1,
        type: "VIDEO",
      },
    ];

    function App() {
    <!-- Toggler state is used to open the Modal  -->
    const [toggler, setToggler] = useState(false);
    <!-- Current Slide of Media Items  -->
    const [currentSlide, setCurrentSlide] = useState();
      return (
        <div style={{textAlign:'center'}}>
        { .... 
          .....
          ..... }
          {toggler ? (
            <LightBox
              currentSlide={currentSlide}
              mediaItems={data}
              callback={() => {
                <!-- callback Function to close the toggler -->
                setToggler(false);
              }}
            />
          ) : (
            ""
          )}
        </div>
      );
    }