import React, { useState } from "react";
import ChartNav from "./ChartNav";
import Modal from "./Modal/Modal";
import Chart from "./Chart";
import Description from "./Description";
import Form from "./Form";
import "./Stock.css";

const Stock = () => {
  const [symbol, setsymbol] = useState("AMZN");
  const [stockValue, setstockValue] = useState();
  const [description, setdescription] = useState();
  const [showModal, setshowModal] = useState(false);
  const [intradayDate, setintradayDate] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    setsymbol(data.symbol.toUpperCase());
    fetchDescription(data.symbol.toUpperCase());
    fetchStock(data.symbol.toUpperCase(), "TIME_SERIES_INTRADAY", "5min", null);
  };

  const fetchDescription = (symbol) => {
    const API_KEY = process.env.REACT_APP_ALPHA_API_KEY;
    let description_URL = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${API_KEY}`;

    fetch(description_URL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);

        if (data.Note) {
          setshowModal(true);
        } else {
          const description = {
            name: data.Name,
            symbol: data.Symbol,
            country: data.Country,
            exchange: data.Exchange,
            currency: data.Currency,
            description: data.Description,
          };
          setdescription(description);
        }
      });
  };

  const fetchStock = (symbol, timeSeries, time, limit) => {
    const API_KEY = process.env.REACT_APP_ALPHA_API_KEY;
    let stockValue_URL = `https://www.alphavantage.co/query?function=${timeSeries}&symbol=${symbol}${
      time ? "&interval=" + time : ""
    }&apikey=${API_KEY}`;

    let chartData = [];

    fetch(stockValue_URL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);

        if (data.Note) {
          setshowModal(true);
        } else {
          let dataDuration;

          switch (timeSeries) {
            case "TIME_SERIES_WEEKLY":
              dataDuration = data[`Weekly Time Series`];
              break;
            case "TIME_SERIES_MONTHLY":
              dataDuration = data[`Monthly Time Series`];
              break;
            default:
              dataDuration = data[`Time Series (${time ? time : "Daily"})`];
              break;
          }

          for (var key in dataDuration) {
            let date = key;
            if (time === "5min") {
              date = date.split(" ")[1];
              setintradayDate(key.split(" ")[0]);
            } else {
              setintradayDate(false);
            }
            chartData.push({
              day: date,
              value: dataDuration[key]["1. open"],
            });
          }

          limit
            ? setstockValue(chartData.slice(0, limit).reverse())
            : setstockValue(chartData.reverse());
        }
      });
  };

  return (
    <>
      <Modal
        onCancel={() => {
          setshowModal(false);
        }}
        show={showModal}
        footer={
          <button
            className="button"
            onClick={() => {
              setshowModal(false);
            }}
          >
            Okay
          </button>
        }
      />

      <div className="stock">
        <div className="stock__container">
          <Form onSubmit={onSubmit} />

          {stockValue && (
            <>
              {description && <Description description={description} />}

              <ChartNav fetchStock={fetchStock} symbol={symbol} />

              {intradayDate && <p className="time">{intradayDate}</p>}

              <Chart stockValue={stockValue} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Stock;
