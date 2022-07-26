import { Dispatch, SetStateAction, useState } from 'react';
import { validateFrame } from '../constants/Functions';
import {
  validChars,
  BoxInput,
  Circle,
  noSplitChars,
} from '../constants/Values';

export default function TwoInput(props: {
  changeFrame: (inp: string) => void;
  changeWarning: (inp: string) => void;
  changeSplit: (spl: string) => void;
}): JSX.Element {
  const { changeFrame, changeWarning, changeSplit } = props;

  const [throw1, setThrow1]: [string, Dispatch<SetStateAction<string>>] =
    useState('-');
  const [throw2, setThrow2]: [string, Dispatch<SetStateAction<string>>] =
    useState('-');

  const [split, setSplit] = useState(false as boolean);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    // check if the frame data is good. if it is, pass it back up to the input
    changeWarning('_');
    const { value } = event.target;
    if (value.length === 0) {
      if (event.target.id === '1') {
        setThrow1('-');
        changeFrame(`-${throw2}`);
      } else if (event.target.id === '2') {
        setThrow2('-');
        changeFrame(`${throw1}-`);
      }
      return;
    }
    if (value.length === 2) {
      // You can't split strikes because you knocked all the pins down. You can't split 9 because there's only 1 pin. You can't split gutters.
      if (
        value.charAt(1) !== 's' ||
        value.charAt(0) === 'X' ||
        value.charAt(0) === '9' ||
        value.charAt(0) === '-'
      ) {
        changeWarning('Invalid input');
        event.target.value = value.charAt(0);
        return;
      }
      setSplit(!split);
      changeSplit(split ? 'f' : 't');
      event.target.value = validChars.has(value.charAt(0))
        ? value.charAt(0)
        : '';
      return;
    }
    if (value === 's') {
      setSplit(!split);
      changeSplit(split ? 'f' : 't');
      event.target.value = '';
      return;
    }
    if (!validChars.has(value)) {
      event.target.value = '';
      changeWarning('Invalid input');
      return;
    }
    let totalFrame = '';
    if (event.target.id === '1') {
      if (split && noSplitChars.has(value)) {
        changeWarning('Invalid input');
        event.target.value = '';
        return;
      }
      setThrow1(value);
      totalFrame = value + throw2;
    } else if (event.target.id === '2') {
      setThrow2(value);
      totalFrame = throw1 + value;
    }
    // console.log(totalFrame, throw1, throw2);
    if (validateFrame(totalFrame)) {
      changeFrame(totalFrame);
    } else {
      event.target.value = '';
      changeWarning('Invalid frame');
    }
  }

  return (
    <div>
      <Circle style={split ? {} : { visibility: 'hidden' }} />
      <BoxInput id="1" maxLength={2} onChange={(val) => handleChange(val)} />
      <BoxInput id="2" maxLength={2} onChange={(val) => handleChange(val)} />
    </div>
  );
}
