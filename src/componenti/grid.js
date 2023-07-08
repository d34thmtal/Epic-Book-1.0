import Card from "./card";
import cardsDataResponse from "../json/fantasy.json";
import { useState } from "react";

function CardList({ inputValue }) {
  const [selected, setSelected] = useState(false);

  const resetSelection = () => {
    setSelected(false);
  };

  return (
    <div className="container">
      <div className="row">
        {cardsDataResponse
          .filter((data) => {
            const titleLower = data.title.toLowerCase();
            const inputLower = inputValue.toLowerCase();

            return titleLower.includes(inputLower);
          })
          .map((item) => (
            <Card
              key={item.img}
              imgUrl={item.img}
              title={item.title}
              price={item.price}
              asin={item.asin}
              selected={selected}
              setSelected={setSelected}
              resetSelection={resetSelection}
            />
          ))}
      </div>
    </div>
  );
}

export default CardList;