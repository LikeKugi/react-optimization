import { FC, useState } from "react";

const expensiveCalculations = () => {
  console.log("rerender expensiveCalculations");

  let a = 0;

  for (let i = 0; i < 1_000_000_000; i++) {
    a += 1;
  }

  const today = new Date().getDate();
  const nowMonth = new Date().getMonth();
  const nowYear = new Date().getFullYear();

  return `${today}/${nowMonth}/${nowYear} | ${a}`;
};

const getExpensiveCount = () => {
  let a = 0;

  for (let i = 0; i < 1_000_000_000; i++) {
    a += 1;
  }

  return Math.random() + 1;
};

const Innerest = () => {
  console.log("rerender innerest");

  return <span>innerest</span>;
};

const Inner = ({ count }: { count: number }) => {
  console.log("rerender inner");

  if (count % 2) {
    return (
      <div>
        <span> {count} </span>
        <Innerest />
      </div>
    );
  }

  return (
    <div>
      <Innerest />
    </div>
  );
};

const Footer = ({ date }: { date: string }) => {
  console.log("rerender footer");
  return <span>Today: {date}</span>;
};

const Button: FC<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
> = ({ children, ...other }) => {
  console.log("rerender button");

  return <button {...other}>{children}</button>;
};

export const Unoptimized = () => {
  const [count, setCount] = useState(0);

  const someCount = getExpensiveCount();

  if (someCount < 2 && count % 5 === 0) {
    console.log("should render only when count is divided by 5 is 0", someCount);
  }

  return (
    <main className="main">
      <Button onClick={() => setCount(count + 1)}>increase</Button>
      <Inner count={count} />
      <Footer date={expensiveCalculations()} />
    </main>
  );
};
