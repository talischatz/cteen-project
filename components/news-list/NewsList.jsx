'use client'

import { useState } from 'react';
import NewsCard from '../news-card/NewsCard';
import NewsModal from '../news-modal/NewsModal';
import { NewsData } from '@/constants/NewsMockup';

function NewsList() {
  const [selectedNews, setSelectedNews] = useState(null);

  return (
    <div className="relative">
      <div className="mt-20 w-full">
        <h2 className="text-4xl text-primary font-semibold">Noticias</h2>
        <div className="my-10 w-full flex flex-wrap gap-6 items-center justify-center">
          {NewsData.map(({ id, content, image, title }) => (
            <NewsCard
              key={id}
              id={id}
              content={content}
              title={title}
              image={image}
              onClick={() => setSelectedNews({ id, content, image, title })}
            />
          ))}
        </div>
      </div>
      <NewsModal news={selectedNews} onClose={() => setSelectedNews(null)}/>
    </div>
  );
}

export default NewsList;
