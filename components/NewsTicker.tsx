import React, { useState, useEffect } from 'react';
import type { NewsItem } from '../types';

const RSS_FEED_URL = 'https://assets.nst.com.my/rss/news';

const NewsTicker: React.FC = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(RSS_FEED_URL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const text = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "application/xml");
        const items = xmlDoc.querySelectorAll("item");
        
        const parsedItems: NewsItem[] = Array.from(items).map(item => {
          const title = item.querySelector("title")?.textContent || 'No Title';
          const link = item.querySelector("link")?.textContent || '#';
          const description = item.querySelector("description")?.textContent || '';
          const imageUrlMatch = description.match(/<img src="([^"]+)"/);
          const imageUrl = imageUrlMatch ? imageUrlMatch[1] : '';
          return { title, link, imageUrl };
        }).filter(item => item.imageUrl); // Only keep items with images

        if(parsedItems.length > 0) {
            setNewsItems(parsedItems);
        }

      } catch (error) {
        console.error("Failed to fetch or parse RSS feed:", error);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    if (newsItems.length === 0) return;

    const intervalId = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
          setCurrentItemIndex(prevIndex => (prevIndex + 1) % newsItems.length);
          setIsVisible(true);
      }, 500); // Wait for fade out
    }, 7000); // Change item every 7 seconds

    return () => clearInterval(intervalId);
  }, [newsItems.length]);

  if (newsItems.length === 0) {
    return null;
  }

  const currentItem = newsItems[currentItemIndex];

  return (
    <div className="absolute top-12 left-0 w-full bg-black/30 backdrop-blur-sm p-2 z-20 overflow-hidden">
        <a 
            href={currentItem.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`flex items-center justify-center space-x-4 text-white no-underline transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
            {currentItem.imageUrl && (
                <img src={currentItem.imageUrl} alt="" className="w-12 h-12 object-cover rounded-md border-2 border-white/50" />
            )}
            <span className="text-lg font-semibold text-shadow-md">{currentItem.title}</span>
        </a>
    </div>
  );
};

export default NewsTicker;