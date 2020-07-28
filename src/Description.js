import React, { useState } from "react";

const Description = ({ description }) => {
  const [showFullDescription, setshowFullDescription] = useState(false);

  const handleDescription = () => {
    setshowFullDescription(!showFullDescription);
  };
  return (
    <div className="description">
      <ul>
        <li>
          <span className="bold">Name</span>: {description.name}
        </li>
        <li>
          <span className="bold">Symbol</span>: {description.symbol}
        </li>
        <li>
          <span className="bold">Country</span>:{description.country}
        </li>
        <li>
          <span className="bold">Exchange</span>:{description.exchange}
        </li>
        <li>
          <span className="bold">Currency</span>:{description.currency}
        </li>
      </ul>
      <hr />
      <p>
        {showFullDescription
          ? description.description
          : description.description.substring(0, 250) + "...   "}
        <button
          className="button button-description "
          onClick={handleDescription}
        >
          {showFullDescription ? "Hide" : "Show more"}
        </button>
      </p>
    </div>
  );
};

export default Description;
