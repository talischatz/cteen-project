import Image from 'next/image';

function HomeBanner() {
  return (
    <div className="w-full mt-10">
      <Image
        src={require('@/public/cteen-4.jpeg')}
        alt="cteen-banner"
        className="w-full rounded"
      />
      {/* <h1>asd</h1> */}
    </div>
  );
}

export default HomeBanner;
