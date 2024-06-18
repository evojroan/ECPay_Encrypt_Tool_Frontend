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

function Inputs({
  propChooseOption,
  propChosenOption,
  propChooseCMValgo,
  propChosenCMValgo,
  propChooseAct,
  propChosenAct,
  prophHashKeyInput,
  propHashIVInput,
  propParamsInput
}) {
  return (
    <div>
      <div className="InputPart1">
        <h2>1.選擇方式</h2>
        <div className="option">
          <input
            type="radio"
            id="CheckMacValue"
            name="option"
            value="0"
            onClick={propChooseOption}
            checked={propChosenOption == 0}
          />
          <label
            htmlFor="CheckMacValue"
            onClick={propChooseOption}>
            計算 CheckMacValue
          </label>
          <div>
            {propChosenOption == 0 ? (
              <>
                加密方式：
                <span onClick={propChooseCMValgo}>
                  <input
                    type="radio"
                    id="sha256"
                    name="cmvalgorithm"
                    value="sha256"
                    checked={propChosenCMValgo == "sha256"}
                  />
                  <label htmlFor="sha256">SHA256 (全方位金流)</label>
                </span>
                <span onClick={propChooseCMValgo}>
                  <input
                    type="radio"
                    id="md5"
                    name="cmvalgorithm"
                    value="md5"
                  />
                  <label htmlFor="md5">MD5 (物流)</label>
                </span>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
        <div
          className="option"
          onClick={propChooseOption}>
          <input
            onClick={propChooseOption}
            type="radio"
            id="AESEncrypt"
            name="option"
            value="1"
          />
          <label htmlFor="AESEncrypt">AES 加密</label>
        </div>
        <div
          className="option"
          onClick={propChooseOption}>
          <input
            onClick={propChooseOption}
            type="radio"
            id="AESDecrypt"
            name="option"
            value="2"
          />
          <label htmlFor="AESDecrypt">AES 解密</label>
        </div>
      </div>
      <div className="InputPart2">
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

        {propChosenAct.Num == 7 ? (
          <div className="hashInput">
            請輸入 HashKey：
            <input
              type="text"
              className="hashInput"
              onInput={prophHashKeyInput}
              value={propChosenAct.HashKey}
            />
            {propChosenAct.HashKey}
            <br />
            請輸入 HashIV：
            <input
              type="text"
              className="hashInput"
              onInput={propHashIVInput}
              value={propChosenAct.HashIV}
            />
            {propChosenAct.HashIV}
          </div>
        ) : (
          <div className="hashInput">
            HashKey：{propChosenAct.HashKey} <br />
            HashIV：{propChosenAct.HashIV}
          </div>
        )}
      </div>
      <div className="InputPart3">
        <h2>3. 輸入資料</h2>
        <p>
          計算檢查碼，請輸入 JSON 或字串；
          <br />
          AES 加密請輸入 JSON；
          <br />
          若要 AES 解密請輸入字串
        </p>

        <input
          className="inputParams"
          type="text"
          onInput={propParamsInput}
        />
      </div>
      <button>計算結果</button>
    </div>
  );
}

function Outputs() {
  return <>OUTPUTS</>;
}

function App() {
  const [option, setOption] = useState(0); // 所選方式，預設 0
  const [chosenAct, setChosenAct] = useState(accounts[0]); //所選金鑰
  const [CMValgorithm, setCMValgorithm] = useState("sha256");
  const [inputParams, setInputParams] = useState("");

  //事件處理器：選擇方式
  function chooseOption(event) {
    setOption(event.target.value);
  }

  //事件處理器：選擇演算法
  function chooseCMValgo(event) {
    setCMValgorithm(event.target.value);
  }

  //事件處理器：選擇金鑰
  function chooseAct(event) {
    setChosenAct(accounts[event.target.value]);
  }

  // 事件處理器：輸入 HashKey
  function hashKeyInput(event) {
    accounts[7].HashKey = event.target.value;
  }

  // 事件處理器：輸入HashIV
  function hashIVInput(event) {
    accounts[7].HashIV = event.target.value;
  }

  //事件處理器：輸入參數
  function paramsInput(event) {
    setInputParams(event.target.value);
  }

  return (
    <div>
      <h1>綠界檢查碼、 AES 加解密產生器</h1>
      <Inputs
        propActs={accounts} //所有金鑰
        propChooseOption={chooseOption} //事件處理器：選擇方式
        propChooseCMValgo={chooseCMValgo}
        propChosenCMValgo={CMValgorithm}
        propChosenOption={option} //所選方式
        propChooseAct={chooseAct} //事件處理器：選擇金鑰
        propChosenAct={chosenAct} //所選金鑰
        prophHashKeyInput={hashKeyInput} // 事件處理器：輸入 HashKey
        propHashIVInput={hashIVInput} // 事件處理器：輸入HashIV
        propParamsInput={paramsInput}
      />

      <h2>4. 計算結果</h2>
      <Outputs propParams={inputParams} />
    </div>
  );
}

export default App;
