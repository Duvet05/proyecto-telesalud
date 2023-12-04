import React from "react";

const NewsItem = ({ news }) => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const defaultImage = "default-image.jpg";
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden my-4">
      <img
        src={news.urlToImage || defaultImage}
        alt={news.title}
        className="w-full h-64 object-cover object-center"
      />
      <div className="p-4">
        <h3 className="font-bold text-primary-dark-blue text-xl mb-2">
          {news.title}
        </h3>
        <p className="text-gray-one mb-4">{formatDate(news.publishedAt)}</p>
        <p className="text-metal mb-4">
          {news.description ? news.description.substring(0, 100) + "..." : ""}
        </p>
        <a
          href={news.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-secondary-orange hover:text-secondary-dark-orange font-semibold"
        >
          Read more
        </a>
      </div>
    </div>
  );
};

export default NewsItem;
