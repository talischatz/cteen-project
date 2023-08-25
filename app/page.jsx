import ImageCarousel from '@/components/carousel/Carousel';
import VideoPlayer from '@/components/video-player/VideoPlayer';
import Image from 'next/image';
import Link from 'next/link';
import NewsList from '@/components/news-list/NewsList';

export default function Home() {

  return (
    <main className="full-container">
      <div className="w-full mt-10">
        <Image
          src={require('@/public/cteen-4.jpeg')}
          alt="cteen-banner"
          className="w-full rounded"
        />
      </div>
      <div className="mt-20 flex h-full flex-col">
        <div className="flex items-center gap-10 h-full flex-col md:flex-row">
          <div className="max-w-[500px] w-full h-full flex flex-col">
            <h2 className="text-4xl text-primary font-semibold">
              Sobre nosotros
            </h2>
            <p className="mt-10 text-xl">
              Jóvenes judíos uruguayos de{' '}
              <Link
                href="https://www.instagram.com/jabad.uruguay/"
                alt="jabad-uruguay"
                target="_blank"
                className="text-primary hover:underline"
              >
                @jabad.uruguay
              </Link>{' '}
              y una de las 700 sedes de
              <Link
                href="https://www.instagram.com/_cteen/"
                alt="cteen-mundial"
                target="_blank"
                className="text-primary hover:underline"
              >
                @_cteen
              </Link>{' '}
              Mundial 💪🏾
            </p>
          </div>
          <ImageCarousel />
        </div>
        <NewsList />
        <VideoPlayer videoUrl="https://www.youtube.com/embed/Qmb_EY9ZQmE" />
      </div>
    </main>
  );
}
