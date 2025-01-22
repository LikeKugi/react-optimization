import { FC, useRef, useState } from 'react';


/**
 * No need to change this function
 * @returns {`${number}/${number}/${number} | ${number}`}
 */
const expensiveCalculations = () => {

  console.log('rerender expensiveCalculations');

  let a = 0;

  for (let i = 0; i < 1_000_000_000; i++) {
    a += 1;
  }

  const today = new Date().getDate();
  const nowMonth = new Date().getMonth();
  const nowYear = new Date().getFullYear();

  return `${today}/${nowMonth}/${nowYear} | ${a}`;
};

const Innerest = () => {

  console.log('rerender innerest');

  return (<span>innerest</span>);
};

const Counter = ({ count }: { count: number }) => {

  console.log('Should announce only on unmount');

  return (<span>{count}</span>);
}

const Inner = ({ count }: { count: number }) => {

  console.log('rerender inner');

  if (count % 2) {
    return (
      <div>
        <Counter count={count} />
        <Innerest/>
      </div>
    );
  }

  return (<div>
    <Innerest/>
  </div>);
};

const Footer = ({ date }: { date: string }) => {
  console.log('rerender footer');
  return (<span>Today: {date}</span>);
};

const Button: FC<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>> = ({
                                                                                                                 children,
                                                                                                                 ...other
                                                                                                               }) => {
  console.log('rerender button');

  return (<button {...other}>{children}</button>);
};

export const Unoptimized = () => {

  const [count, setCount] = useState(0);

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  if (!buttonRef.current) {
    console.log('Should not announce that message');
  }

  return (
    <main className="main">
      <Button onClick={() => setCount(count + 1)}>increase</Button>
      <Inner count={count}/>
      <Footer date={expensiveCalculations()}/>
    </main>
  );
}
