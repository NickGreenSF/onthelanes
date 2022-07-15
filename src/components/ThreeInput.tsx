import { Dispatch, SetStateAction, useState } from 'react';
import { validateFrame } from '../constants/Functions';
import { validChars, BoxInput } from '../constants/Values';

export default function ThreeInput(props: {
  changeFrame: (inp: string) => void;
  changeWarning: (inp: string) => void;
}): JSX.Element {
  const { changeFrame, changeWarning } = props;

  const [throw1, setThrow1]: [string, Dispatch<SetStateAction<string>>] = useState('-');
  const [throw2, setThrow2]: [string, Dispatch<SetStateAction<string>>] = useState('-');
  const [throw3, setThrow3]: [string, Dispatch<SetStateAction<string>>] = useState('-');

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    // check if the frame data is good. if it is, pass it back up to the input
    changeWarning('_');
    // value is a string
    const { value } = event.target;
    if (value.length === 0) {
      if (event.target.id === '1') {
        setThrow1('-');
        changeFrame(`-${throw2}${throw3}`);
      } else if (event.target.id === '2') {
        setThrow2('-');
        changeFrame(`${throw1}-${throw3}`);
      } else {
        setThrow3('-');
        changeFrame(`${throw1}${throw2}-`);
      }
      return;
    }
    if (!validChars.has(value)) {
      event.target.value = '';
      changeWarning('Invalid input');
      return;
    }
    let totalFrame = '';
    if (event.target.id === '1') {
      setThrow1(value);
      totalFrame = value + throw2 + throw3;
    } else if (event.target.id === '2') {
      setThrow2(value);
      totalFrame = throw1 + value + throw3;
    } else {
      setThrow3(value);
      totalFrame = throw1 + throw2 + value;
    }
    // console.log(totalFrame, throw1, throw2, throw3);
    if (validateFrame(totalFrame)) {
      changeFrame(totalFrame);
    } else {
      event.target.value = '';
      changeWarning('Invalid frame');
    }
  }

  return (
    <div>
      <BoxInput id="1" maxLength={1} onChange={(val) => handleChange(val)} />
      <BoxInput id="2" maxLength={1} onChange={(val) => handleChange(val)} />
      <BoxInput id="3" maxLength={1} onChange={(val) => handleChange(val)} />
    </div>
  );
}
