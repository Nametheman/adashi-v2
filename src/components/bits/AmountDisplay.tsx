type AmountDisplayProps = {
  text: string;
  isAsterisk: boolean;
};

const AmountDisplay = (props: AmountDisplayProps) => {
  const { text, isAsterisk } = props;

  const makeAsterisk = (s: string) => {
    return "******";
  };

  return <div>{isAsterisk ? <b>{makeAsterisk(text)}</b> : <b>{text}</b>}</div>;
};

export default AmountDisplay;
