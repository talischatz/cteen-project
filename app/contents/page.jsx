"use client";


import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUserFromLocalStorage } from '@/redux/slices/userSlice'; 
import ReactPlayer from "react-player/youtube";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Contents } from '@/components/content/Contents';

export default function ContentsPage() {
  const dispatch = useDispatch();
  
  // const videoUrls = [
  //   "https://www.youtube.com/watch?v=Qmb_EY9ZQmE",
  //   "https://www.youtube.com/watch?v=Qmb_EY9ZQmE",
  //   "https://www.youtube.com/watch?v=Qmb_EY9ZQmE",
  //   "https://www.youtube.com/watch?v=Qmb_EY9ZQmE",
  //   "https://www.youtube.com/watch?v=Qmb_EY9ZQmE",
  //   "https://www.youtube.com/watch?v=Qmb_EY9ZQmE",
  // ];
  
  useEffect(() => {
    dispatch(loadUserFromLocalStorage());
  }, [dispatch]);

  return (
    <div>
      <div>
        <p className="text-4xl text-primary font-semibold mt-8 text-center">
          Contenidos
        </p>
        <Contents/>
      </div>
    </div>
  );
}

// "use client";

// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from "react-responsive-carousel";
// import VideoPlayer from "@/components/video-player/VideoPlayer";

// export default function ContentsPage() {
//   return (
//     <div>
//       <div>
//         <p className="text-4xl text-primary font-semibold mt-8 text-center">
//           Contenidos
//         </p>
//       </div>
//       <div className="relative shadow-2xl w-full md:w-[90%] mx-auto">
//         <Carousel
//           infiniteLoop
//           showArrows={true}
//           showStatus={false}
//           showIndicators={true}
//           showThumbs={false}
//           // interval={8000}
//           stopOnHover={true}
//         >
//      <div style={{ width: "35%", height: "35%" }}>
//             <VideoPlayer videoUrl="https://www.youtube.com/embed/Qmb_EY9ZQmE" />
//           </div>
//           <div style={{ width: "35%", height: "35%" }}>
//             <VideoPlayer videoUrl="https://www.youtube.com/embed/Qmb_EY9ZQmE" />
//           </div>
//           <div style={{ width: "35%", height: "35%" }}>
//             <VideoPlayer videoUrl="https://www.youtube.com/embed/Qmb_EY9ZQmE" />
//           </div>
//           <div style={{ width: "35%", height: "35%" }}>
//             <VideoPlayer videoUrl="https://www.youtube.com/embed/Qmb_EY9ZQmE" />
//           </div>
//           <div style={{ width: "35%", height: "35%" }}>
//             <VideoPlayer videoUrl="https://www.youtube.com/embed/Qmb_EY9ZQmE" />
//           </div>
//           <div style={{ width: "35%", height: "35%" }}>
//             <VideoPlayer videoUrl="https://www.youtube.com/embed/Qmb_EY9ZQmE" />
//           </div>
//         </Carousel>
//       </div>
//     </div>
//   );
// }
