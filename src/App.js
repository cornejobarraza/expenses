import { useEffect, useState } from "react";

import expenses from "./data/expenses.json";

function App() {
  const [items, setItems] = useState({ data: [], currentData: [], currentTotal: 0 });

  useEffect(() => {
    const firstData = listData(expenses, 0);
    const firstTotal = listTotal(expenses, 0);

    setItems({ data: expenses, currentData: firstData, currentTotal: firstTotal });
  }, []);

  const listData = (data, week) => {
    const weekday = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    const d = new Date();
    let day = weekday[d.getDay()];

    const max = data[week].spendings.reduce((prev, current) => (prev.amount > current.amount ? prev : current));
    const content = data[week].spendings.map((spending, index) => (
      <div
        className="bar"
        key={index}
        style={{
          height: (spending.amount / max.amount) * 100 + "%",
          backgroundColor: spending.day === day ? "hsl(186, 34%, 60%)" : "hsl(10, 79%, 65%)",
          position: "relative",
        }}
      >
        <span className="Tooltip">${spending.amount}</span>
      </div>
    ));

    return content;
  };

  const listTotal = (data, week) =>
    data[week].spendings
      .map((spending) => spending.amount)
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0);

  return (
    <div className="Expenses">
      <div className="main">
        <div className="balance">
          <div className="amount">
            <span>My balance</span>
            <h3 style={{ marginTop: "0.5rem", marginBottom: "0" }}>$921.48</h3>
          </div>
          <svg width="60" height="48" viewBox="0 0 72 48" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fillRule="evenodd">
              <circle fill="#382314" cx="48" cy="24" r="24" />
              <circle stroke="#FFF" strokeWidth="2" cx="24" cy="24" r="23" />
            </g>
          </svg>
        </div>
        <div className="chart">
          <div className="header">
            <h3 className="dark-brown" style={{ margin: "0" }}>
              Spending - Last 7 days
            </h3>
            <div className="dark-brown">
              <span style={{ fontSize: "0.9rem" }}>Week </span>
              <select
                id="weeks"
                onChange={(e) => {
                  const newWeek = e.currentTarget.value - 1;
                  const newData = listData(items.data, newWeek);
                  const newTotal = listTotal(items.data, newWeek);

                  setItems({ ...items, currentData: newData, currentTotal: newTotal });
                }}
              >
                {items.data.map((item) => (
                  <option key={item.week}>{item.week}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="bars">{items.currentData}</div>
          <div className="days">
            <span>mon</span>
            <span>tue</span>
            <span>wed</span>
            <span>thu</span>
            <span>fri</span>
            <span>sat</span>
            <span>sun</span>
          </div>
          <hr className="divider"></hr>
          <div className="footer">
            <div>
              <span className="brown">Total this week</span>
              <h3 className="dark-brown" style={{ margin: "0" }}>
                ${items.currentTotal}
              </h3>
            </div>
            <div style={{ textAlign: "end" }}>
              <h4 className="dark-brown" style={{ margin: "0" }}>
                +2.4%
              </h4>
              <span className="brown">from last month</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
