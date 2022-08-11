import { Dispatch, SetStateAction, useState } from 'react';
import { validateFrame } from '../constants/Functions';
import {
  validChars,
  BoxInput,
  Circle,
  noSplitChars,
} from '../constants/Values';

export default function ThreeInput(props: {
  changeFrame: (inp: string) => void;
  changeWarning: (inp: string) => void;
  changeSplit: (spl: string) => void;
}): JSX.Element {
  const { changeFrame, changeWarning, changeSplit } = props;

  const [throw1, setThrow1]: [string, Dispatch<SetStateAction<string>>] =
    useState('-');
  const [throw2, setThrow2]: [string, Dispatch<SetStateAction<string>>] =
    useState('-');
  const [throw3, setThrow3]: [string, Dispatch<SetStateAction<string>>] =
    useState('-');

  const [split1, setSplit1] = useState(false as boolean);
  const [split2, setSplit2] = useState(false as boolean);
  const [split3, setSplit3] = useState(false as boolean);

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
    if (value.length === 2) {
      if (
        (value.charAt(1) !== 's' && value.charAt(1) !== 'S') ||
        value.charAt(0) === 'X' ||
        value.charAt(0) === '9' ||
        value.charAt(0) === '-'
      ) {
        changeWarning('Invalid input');
        event.target.value = value.charAt(0);
        return;
      }
      if (event.target.id === '1') {
        setSplit1(!split1);
        changeSplit(
          `${split1 ? 'f' : 't'}${split2 ? 't' : 'f'}${split3 ? 't' : 'f'}`
        );
      } else if (event.target.id === '2') {
        if (throw1 !== 'X') {
          changeWarning('Invalid input');
          event.target.value = validChars.has(value.charAt(0))
            ? value.charAt(0)
            : '';
          return;
        }
        setSplit2(!split2);
        changeSplit(
          `${split1 ? 't' : 'f'}${split2 ? 'f' : 't'}${split3 ? 't' : 'f'}`
        );
      }
      if (event.target.id === '3') {
        if (throw2 !== 'X' && throw2 !== '/') {
          changeWarning('Invalid input');
          event.target.value = validChars.has(value.charAt(0))
            ? value.charAt(0)
            : '';
          return;
        }
        setSplit3(!split3);
        changeSplit(
          `${split1 ? 't' : 'f'}${split2 ? 't' : 'f'}${split3 ? 'f' : 't'}`
        );
      }
      event.target.value = validChars.has(value.charAt(0))
        ? value.charAt(0)
        : '';
      return;
    }
    if (value === 's' || value === 'S') {
      if (event.target.id === '1') {
        setSplit1(!split1);
        changeSplit(
          `${split1 ? 'f' : 't'}${split2 ? 't' : 'f'}${split3 ? 't' : 'f'}`
        );
      } else if (event.target.id === '2') {
        if (throw1 !== 'X') {
          changeWarning('Invalid input');
          event.target.value = validChars.has(value.charAt(0))
            ? value.charAt(0)
            : '';
          return;
        }
        setSplit2(!split2);
        changeSplit(
          `${split1 ? 't' : 'f'}${split2 ? 'f' : 't'}${split3 ? 't' : 'f'}`
        );
      }
      if (event.target.id === '3') {
        if (throw2 !== 'X' && throw2 !== '/') {
          changeWarning('Invalid input');
          event.target.value = validChars.has(value.charAt(0))
            ? value.charAt(0)
            : '';
          return;
        }
        setSplit3(!split3);
        changeSplit(
          `${split1 ? 't' : 'f'}${split2 ? 't' : 'f'}${split3 ? 'f' : 't'}`
        );
      }
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
      if (split1 && noSplitChars.has(value)) {
        changeWarning('Invalid input');
        event.target.value = '';
        return;
      }
      setThrow1(value);
      totalFrame = value + throw2 + throw3;
    } else if (event.target.id === '2') {
      if (split2 && noSplitChars.has(value)) {
        changeWarning('Invalid input');
        event.target.value = '';
        return;
      }
      setThrow2(value);
      totalFrame = throw1 + value + throw3;
    } else {
      if (split3 && noSplitChars.has(value)) {
        changeWarning('Invalid input');
        event.target.value = '';
        return;
      }
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
      <Circle style={split1 ? {} : { visibility: 'hidden' }} />
      <BoxInput id="1" maxLength={2} onChange={(val) => handleChange(val)} />
      <Circle style={split2 ? {} : { visibility: 'hidden' }} />
      <BoxInput id="2" maxLength={2} onChange={(val) => handleChange(val)} />
      <Circle style={split3 ? {} : { visibility: 'hidden' }} />
      <BoxInput id="3" maxLength={2} onChange={(val) => handleChange(val)} />
    </div>
  );
}
