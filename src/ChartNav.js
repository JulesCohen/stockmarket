import React from "react";
import Button from "./Button";

const ChartNav = ({ fetchStock, symbol }) => {
  return (
    <div className="chartNav">
      <Button
        onClick={() => {
          fetchStock(symbol, "TIME_SERIES_INTRADAY", "5min", false);
        }}
      >
        1D
      </Button>
      <Button
        onClick={() => {
          fetchStock(symbol, "TIME_SERIES_DAILY", false, 7);
        }}
      >
        1W
      </Button>
      <Button
        onClick={() => {
          fetchStock(symbol, "TIME_SERIES_DAILY", null, 21);
        }}
      >
        1M
      </Button>
      <Button
        onClick={() => {
          fetchStock(symbol, "TIME_SERIES_WEEKLY", null, 52);
        }}
      >
        1Y
      </Button>
      <Button
        onClick={() => {
          fetchStock(symbol, "TIME_SERIES_MONTHLY", null, 60);
        }}
      >
        5Y
      </Button>
    </div>
  );
};

export default ChartNav;
