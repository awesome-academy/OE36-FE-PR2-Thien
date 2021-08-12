import React, { useState } from "react";
import PropTypes from "prop-types";
import formatMoney from "utils/formatMoney";
import { Button } from "devextreme-react";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { changeFood } from "app/features/offer/offerSlice";

FoodItem.propTypes = {
  food: PropTypes.object,
};

function FoodItem({ food }) {
  const foods = useSelector((state) => state.offer.foods);
  const totalPrice = useSelector((state) => state.offer.totalPrice);
  const dispatch = useDispatch();
  const [number, setNumber] = useState(0);
  const handleIncrement = () => {
    if (number < 10) {
      const newFoodItem = {
        id: food.id,
        name: food.name,
        number: number + 1,
        price: food.FoodPrice,
      };
      const foodId = foods.findIndex((foodItem) => foodItem.id === food.id);
      const newFoods =
        foodId < 0
          ? [...foods, newFoodItem]
          : [
              ...foods.slice(0, foodId),
              newFoodItem,
              ...foods.slice(foodId + 1),
            ];
      dispatch(
        changeFood({
          foods: newFoods,
          totalPrice: totalPrice + food.FoodPrice,
        })
      );
      setNumber(number + 1);
    }
  };
  const handleDecrement = () => {
    if (number > 0) {
      const newFoodItem = {
        id: food.id,
        name: food.name,
        number: number - 1,
        price: food.FoodPrice,
      };
      const foodId = foods.findIndex((foodItem) => foodItem.id === food.id);
      const newFoods =
        foodId < 0
          ? [...foods]
          : number === 1
          ? [...foods.slice(0, foodId), ...foods.slice(foodId + 1)]
          : [
              ...foods.slice(0, foodId),
              newFoodItem,
              ...foods.slice(foodId + 1),
            ];

      dispatch(
        changeFood({
          foods: newFoods,
          totalPrice: totalPrice - food.FoodPrice,
        })
      );
      setNumber(number - 1);
    }
  };

  return (
    <div className="food-item">
      <div className="food__image">
        <img src={food.FoodImg} alt={food.name} width="200" height="200" />
      </div>
      <div className="food__info">
        <h4 className="food__name" title={food.name}>
          {food.name}
        </h4>
        <div className="food__price">
          <span>{formatMoney(food.FoodPrice)} VND</span>
        </div>
        <div className="food__number">
          <Button onClick={handleDecrement}>
            <i className="fa fa-minus" />
          </Button>
          <span> {number} </span>
          <Button onClick={handleIncrement}>
            <i className="fa fa-plus" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FoodItem;
