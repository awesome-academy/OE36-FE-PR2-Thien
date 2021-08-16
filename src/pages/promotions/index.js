import apiPromotions from "apis/tasks/apiPromotions";
import { changeShowLoading } from "app/features/common";
import Paging from "components/paging";
import { ERROR_NOTIFICATION } from "constants/notificationMessage";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { warning } from "react-toastify-redux";
import PromotionItem from "./components/promotionItem";
import "./style.scss";

function Promotions() {
  const [promotions, setPromotions] = useState([]);
  const [filter, setFilter] = useState({ _page: 1, _limit: 8 });
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changeShowLoading(true));
    try {
      apiPromotions.get(filter).then((response) => {
        if (response.status === 200) {
          setPromotions(response.data);
          setTotal(response.total);
        }
        window.scrollTo(0, 0);
        dispatch(changeShowLoading(false));
      });
    } catch (err) {
      dispatch(changeShowLoading(false));
      dispatch(warning(ERROR_NOTIFICATION));
    }
  }, [filter]);
  return (
    <section className="promotions container">
      <h2 className="promotions__title">Promotions</h2>
      <ul>
        {promotions.map((promotion, index) => (
          <li key={index}>
            <PromotionItem promotion={promotion} />
          </li>
        ))}
      </ul>
      <Paging
        content="promotions"
        total={total}
        filters={filter}
        length={promotions.length}
        onFiltersChange={setFilter}
      />
    </section>
  );
}

export default Promotions;
