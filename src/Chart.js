import React from "react";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Text,
} from "recharts";
const Chart = ({ stockValue }) => {
  return (
    <div className="chart">
      <ResponsiveContainer aspect={1.5}>
        <AreaChart
          data={stockValue}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <Text>TEST</Text>
          <Area type="linear" dataKey="value" stroke="#2b4e68" fill="#fff" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="day" stroke="#fff" interval="preserveStartEnd" />
          <Tooltip />
          <YAxis
            stroke="#fff"
            type="number"
            domain={[
              0,
              Math.round(
                Math.max.apply(
                  Math,
                  stockValue.map(function (stock) {
                    return stock.value;
                  })
                ) * 1.25
              ),
            ]}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
