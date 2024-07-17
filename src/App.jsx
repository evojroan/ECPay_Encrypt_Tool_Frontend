import "./App.css";

//import {useState} from "react";
import useStatesHndlr from "./Eventhandlers";

// 所有帳號

//元件：輸入資料
function Inputs({
  propAllAccounts,
  propChooseOption,
  propOption,
  propChooseCMValgo,
  propChooseAct,
  propChosenAct,
  propHashInput,
  propParamsInput,
  propCheckMacValueGen
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
            defaultChecked
          />
          <label
            htmlFor="CheckMacValue"
            onClick={propChooseOption}>
            計算 CheckMacValue
          </label>
          <div>
            {propOption == 0 ? (
              <>
                加密方式：
                <span onClick={propChooseCMValgo}>
                  <input
                    type="radio"
                    id="sha256"
                    name="cmvalgorithm"
                    value="sha256"
                    defaultChecked
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
          {propAllAccounts.map(act => {
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
            <span>請輸入 HashKey：</span>
            <input
              type="text"
              className="hashInput"
              id="hashKeyInput"
              onChange={propHashInput}
            />
            <br />
            <span>請輸入 HashIV：</span>
            <input
              type="text"
              className="hashInput"
              id="hashIVInput"
              onChange={propHashInput}
            />
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
      <button onClick={propCheckMacValueGen}>計算結果</button>
    </div>
  );
}

//元件：計算與輸出
function Outputs({propOutPuts}) {
  return <div dangerouslySetInnerHTML={{__html: propOutPuts}} />;
}

//最終畫面
function App() {
  const {
    allAccounts,
    accounts,
    option,
    chosenAct,
    CMValgorithm,
    inputParams,
    chooseOption,
    chooseCMValgo,
    chooseAct,
    hashInput,
    paramsInput,
    CheckMacValueGen,
    outPuts
  } = useStatesHndlr();

  return (
    <div>
      <h1>綠界檢查碼、 AES 加解密產生器</h1>

      <Inputs
        propAllAccounts={allAccounts}
        propChooseOption={chooseOption} //事件處理器：選擇方式
        propOption={option} //所選方式
        propChooseCMValgo={chooseCMValgo} //事件處理器：選擇演算法
        propChooseAct={chooseAct} //事件處理器：選擇金鑰
        propChosenAct={chosenAct} //所選金鑰
        propHashInput={hashInput} //事件處理器：修改 accounts[7]的自訂 HashKey、HashIV
        propParamsInput={paramsInput} //事件處理器：輸入參數
        propCheckMacValueGen={CheckMacValueGen}
      />
      <h2>4. 計算結果</h2>

      <Outputs propOutPuts={outPuts} />
    </div>
  );
}

export default App;
