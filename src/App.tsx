import { useCallback, useEffect, useMemo, useState, UIEvent } from 'react';

function App() {
  const [text, setText] = useState<string>();
  const [checked, setChecked] = useState<boolean>(false);
  const [wasRead, setWasRead] = useState<boolean>(false);

  const isButtonEnabled = useMemo(() => checked && wasRead, [checked, wasRead]);

  useEffect(() => {
    fetch('https://loripsum.net/api/10/long/headers')
      .then(r => r.text())
      .then(t => setText(t));
  }, []);

  const onScroll = useCallback((e: UIEvent) => {
    // @ts-ignore
    const maxScroll = e.target.scrollHeight - e.target.offsetHeight;
    // @ts-ignore
    if (Math.abs(maxScroll - e.target.scrollTop) < 10) {
      setWasRead(true);
    }
  }, []);

  return (
    <div className="view">
      <div>
        <textarea value={text} onScroll={onScroll} />
      </div>
      <div>
        <label>
          <span>Agree</span>
          <input type="checkbox" checked={checked} onChange={e => setChecked(e.target.checked)} />
        </label>
      </div>
      <div>
        <button disabled={!isButtonEnabled}>Download</button>
      </div>
    </div>
  );
}

export default App;
