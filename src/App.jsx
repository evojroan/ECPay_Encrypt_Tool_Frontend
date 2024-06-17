// import { createHash } from "crypto";
// import crypto from "crypto";

import "./App.css";
import {useState, useEffect} from "react";

const accounts = [
  {
    Num: 0,
    name: "3002607(全方位金流 - 特店)",
    HashKey: "pwFHCqoQZGmho4w6",
    HashIV: "EkRm7iFT261dpevs"
  },
  {
    Num: 1,
    name: "3002599(全方位金流 - 平台商)",
    HashKey: "spPjZn66i0OhqJsQ",
    HashIV: "hT5OJckN45isQTTs"
  },
  {
    Num: 2,
    name: "3003008(站內付平台商)",
    HashKey: "FCnGLNS7P3xQ2q3E",
    HashIV: "awL5GRWRhyaybq13"
  },
  {
    Num: 3,
    name: "2000132(B2C物流)",
    HashKey: "5294y06JbISpM5x9",
    HashIV: "v77hoKGq4kWxNNIS"
  },
  {
    Num: 4,
    name: "2000933(C2C物流)",
    HashKey: "XBERn1YOvpM9nfZc",
    HashIV: "h1ONHk4P4yqbl5LK"
  },
  {
    Num: 5,
    name: "2000132(B2C與B2B電子發票 - 一般特店)",
    HashKey: "ejCk326UnaZWKisg",
    HashIV: "q9jcZX8Ib9LM8wYk"
  },
  {
    Num: 6,
    name: "3085340(B2C電子發票與離線發票 - 平台商)",
    HashKey: "HwiqPsywG1hLQNuN",
    HashIV: "YqITWD4TyKacYXpn"
  },
  {Num: 7, name: "自行輸入", HashKey: "", HashIV: ""}
];

function Inputs({propActs, propChooseOption, propChooseAct, propChosenAct}) {
  return (
    <div>
      <div>
        <h2>1.選擇方式</h2>
        <span
          className="option"
          onClick={propChooseOption}
          value="a">
          <input
            type="radio"
            id="CheckMacValue"
            name="option"
            value="0"
          />
          <label htmlFor="CheckMacValue">計算 CheckMacValue</label>
          <br />
        </span>
        <span
          className="option"
          onClick={propChooseOption}
          value="b">
          <input
            onClick={propChooseOption}
            type="radio"
            id="AESEncrypt"
            name="option"
            value="1"
          />
          <span onClick={propChooseOption}>
            <label htmlFor="AESEncrypt">AES 加密</label>
          </span>
          <br />
        </span>
        <span
          className="option"
          onClick={propChooseOption}
          value="c">
          <input
            onClick={propChooseOption}
            type="radio"
            id="AESDecrypt"
            name="option"
            value="2"
          />
          <span>
            <label htmlFor="AESDecrypt">AES 解密</label>
          </span>
          <br />
        </span>
      </div>
      <div>
        <h2>2. 選擇金鑰</h2>
        <select onChange={propChooseAct}>
          {accounts.map(act => {
            return (
              <option
                key={act.Num}
                value={act.Num}>
                {act.name}
              </option>
            );
          })}
        </select>
        {}
        {/* 以下尚未解決 */}
        {/* {propChosenAct.Num == 7 ? (
          <div className="hashInput">
            請輸入 HashKey：
            <input
              type="text"
              className="hashInput"
            />
            <br />
            請輸入 HashIV：
            <input
              type="text"
              className="hashInput"
            />
          </div>
        ) : (
          ""
        )} */}
      </div>
    </div>
  );
}

function Outputs() {
  return <>OUTPUTS</>;
}

function App() {
  const [option, setOption] = useState(0); // 所選方式
  const [chosenAct, setChosenAct] = useState(0); //所選金鑰

  const [CMValgorithm, setCMValgorithm] = useState("sha256");
  const [input, setInput] = useState("");

  //事件處理器：選擇方式
  function chooseOption(event) {
    setOption(event.target.value);
  }

  //事件處理器：選擇金鑰
  function chooseAct(event) {
    setChosenAct(accounts[event.target.value]);
  }

  return (
    <div>
      <h1>於本區域輸入</h1>
      <Inputs
        propActs={accounts} //所有金鑰
        propChooseOption={chooseOption} //事件處理器：選擇方式
        propChooseAct={chooseAct} //事件處理器：選擇金鑰
        propChosenAct={chosenAct} //所選金鑰
      />
      {chosenAct}
      <h1>計算結果</h1>
      <Outputs />
    </div>
  );
}

export default App;

//待辦：選擇金鑰，可以顯示出來
