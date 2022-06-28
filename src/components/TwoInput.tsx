export default function TwoInput(props: {
  changeFrame: (inp: string) => void;
}) {
  const { changeFrame } = props;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    // check if the frame data is good. if it is, pass it back up to the input
    console.log(event.target.id);
    const { value } = event.target;
    event.target.value = '';
    changeFrame(value);
  }

  return (
    <div>
      <input id="1" maxLength={1} onChange={handleChange} />
      <input id="2" maxLength={1} onChange={handleChange} />
    </div>
  );
}
