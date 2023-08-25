'use client';

import dynamic from 'next/dynamic';
import ReactPlayer from 'react-player/youtube';

function VideoPlayer({videoUrl}) {

  const DynamicVideoPlayer = dynamic(() => import('react-player/youtube'), {
    ssr: false,
  });
  return (
    <div className="my-10 flex w-full items-center justify-center">
      <DynamicVideoPlayer
        url={videoUrl}
        width="90%"
        height={600}
        controls={true}
        autoPlay={false}
      />
    </div>
  );
}

export default VideoPlayer;
