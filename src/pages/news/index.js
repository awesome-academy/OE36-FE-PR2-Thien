import apiNews from "apis/tasks/apiNews";
import { changeShowLoading } from "app/features/common";
import Paging from "components/paging";
import { ERROR_NOTIFICATION } from "constants/notificationMessage";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { warning } from "react-toastify-redux";
import NewsItem from "./newsItem";
import "./style.scss";

function News() {
  const [newsList, setNewsList] = useState([]);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState({ _page: 1, _limit: 8 });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changeShowLoading(true));
    try {
      apiNews.get(filter).then((response) => {
        if (response.status === 200) {
          setNewsList(response.data);
          setTotal(response.total);
        }
        dispatch(changeShowLoading(false));
      });
    } catch (err) {
      dispatch(changeShowLoading(false));
      dispatch(warning(ERROR_NOTIFICATION));
    }
  }, [filter]);
  return (
    <div className="news-pages container">
      <h2 className="news-pages__title">News</h2>
      <ul>
        {newsList.map((news, index) => (
          <li key={index}>
            <NewsItem news={news} />
          </li>
        ))}
      </ul>
      <Paging
        content="News"
        total={total}
        filters={filter}
        length={newsList.length}
        onFiltersChange={setFilter}
      />
    </div>
  );
}

export default News;
