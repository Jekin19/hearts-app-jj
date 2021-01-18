import React from "react";
import { ICardInfo, ICardSymbolProps, ICardValueProps } from "../common/heartRules";
import { constants as heartsConstants } from "../common/heartRules";

interface ICardProps {
  card: ICardInfo;
  direction?: string;
  overturned?: boolean;
  toggled?: boolean;
  onClickHandler?: () => void;
}

const CardValue = ({ value }: ICardValueProps) => <div className="card__value">{value}</div>;

const CardSymbol = ({ symbol }: ICardSymbolProps) => <div className="card__symbol">{symbol}</div>;

const Card = ({ card, onClickHandler, direction, overturned = false, toggled = false }: ICardProps) => {
  const { value, suit } = card;
  const className =
    "card" +
    (direction !== undefined ? " card--" + direction : "") +
    (toggled ? " card--toggled" : "") +
    (overturned ? " card--overturned" : "");

  const contents = overturned
    ? []
    : [
        <CardValue key="value" value={value} />,
        <CardSymbol key="symbol" symbol={heartsConstants.cardSuits[suit].symbol} />,
      ];

  return (
    <div className={className} onClick={onClickHandler} style={{ color: heartsConstants.cardSuits[suit].colour }}>
      {contents}
    </div>
  );
};

export default Card;
