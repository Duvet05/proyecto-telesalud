import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import newsData from "./newsData"; // Importa los datos de muestra
const NewsFeed = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Simula una carga de datos
    setTimeout(() => {
      setNewsList(newsData.articles);
      setLoading(false);
    }, 1000); // Retraso de 1 segundo para simular una carga de datos
  }, []);

  if (loading) {
    return <p className="w-[23.5rem] flex flex-col">Loading news...</p>;
  }

  if (loading) {
    return <p className="w-[23.5rem] flex flex-col">Loading news...</p>;
  }

  return (
    <div className="w-[23.5rem]">
      <div
        className="text-xl font-bold text-black-500 px-4"
        style={{ color: "#28539E" }}
      >
        Noticias
      </div>
      <div className="flex flex-col">
        {newsList.slice(1, 6).map((news, index) => (
          <NewsItem key={index} news={news} />
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;
