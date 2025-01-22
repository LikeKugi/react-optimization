import { forwardRef, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

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

const Innerest = memo(() => {
  console.log('rerender innerest');
  return (<span>innerest</span>);
});

const Counter = memo(({ count }: { count: number }) => {

  useEffect(() => {

    return () => {
      console.log('Should announce only on unmount');
    };
  }, []);

  return (<span>{count}</span>);
});

const Inner = ({ count }: { count: number }) => {
  console.log('rerender inner');
  if (count % 2) {
    return (
      <div>
        <Counter count={count}/>
        <Innerest key={'optimize-innerest'}/>
      </div>
    );
  }

  return (<div>
    <Innerest key={'optimize-innerest'}/>
  </div>);
};

const Footer = memo(({ date }: { date: string }) => {
  console.log('rerender footer');
  return (<span>Today: {date}</span>);
});

const Button = memo(forwardRef<HTMLButtonElement, React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>>(({
                                                                                                                                                children,
                                                                                                                                                ...other
                                                                                                                                              }, ref) => {
  console.log('rerender button');
  return (<button ref={ref} {...other}>{children}</button>);
}));

export const Optimized = () => {

  const [count, setCount] = useState(0);

  const date = useMemo(() => expensiveCalculations(), [new Date().getDate()]);

  const buttonClickHandler = useCallback(() => {
    setCount(prevState => prevState + 1);
  }, []);

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  if (!buttonRef.current) {
    console.log('Should not announce that message');
  }

  return (
    <main className="main">
      <Button ref={buttonRef}
              onClick={buttonClickHandler}>increase</Button>
      <Inner count={count}/>
      <Footer date={date}
              key={'footer'}/>
    </main>
  );
};
