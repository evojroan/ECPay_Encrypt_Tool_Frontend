import {useState} from "react";
import axios from "axios";

export default function useStatesHndlr() {
  const allAccounts = [
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

  const [accounts, setAccounts] = useState(allAccounts);
  const [option, setOption] = useState(0); // 所選方式，預設 0
  const [chosenAct, setChosenAct] = useState(accounts[0]); //所選金鑰
  const [CMValgorithm, setCMValgorithm] = useState("sha256");
  const [inputParams, setInputParams] = useState("");
  const [outPuts, setOutPuts] = useState("");

  //Input 事件處理器：選擇方式
  function chooseOption(event) {
    setOption(event.target.value);
  }

  //Input 事件處理器：選擇演算法
  function chooseCMValgo(event) {
    setCMValgorithm(event.target.value);
  }

  //Input 事件處理器：選擇金鑰
  function chooseAct(event) {
    setChosenAct(accounts[event.target.value]);
  }

  //Input 事件處理器：修改 accounts[7]的自訂 HashKey、HashIV
  function hashInput(event) {
    const newAccounts = [...accounts];
    if (event.target.id === "hashKeyInput") {
      newAccounts[7].HashKey = event.target.value;
    } else if (event.target.id === "hashIVInput") {
      newAccounts[7].HashIV = event.target.value;
    }
    setAccounts(newAccounts);
  }

  //Input 事件處理器：輸入參數
  function paramsInput(event) {
    setInputParams(event.target.value);
  }
  //Input 事件處理器：清除參數
  function clearInput() {
    setInputParams("");
    setOutPuts("");
  }

  //Output 事件處理器：複製結果
  function copyResult() {
    const resultElement = document.querySelector(".toCopy");
    if (resultElement) {
      const textToCopy = resultElement.textContent;
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          alert("已複製結果!");
        })
        .catch(err => {
          console.error("複製失敗:", err);
        });
    } else {
      alert("沒有找到可複製的結果");
    }
  }

  async function CheckMacValueGen() {
    try {
      const response = await axios.post("http://localhost:3000/", {
        option: Number(option), //在 React 應用中，如果您使用 radio buttons 或 select 元素來選擇 option，這些元素的值通常會被當作字符串處理。
        inputParams: inputParams,
        CMValgorithm: CMValgorithm,
        HashKey: chosenAct.HashKey,
        HashIV: chosenAct.HashIV
      });
      setOutPuts(response.data);
    } catch (error) {
      console.error(error);
      setOutPuts("發生錯誤：" + error.message);
    }
  }
  return {
    allAccounts,
    accounts,
    option,
    chosenAct,
    CMValgorithm,
    inputParams,
    outPuts,
    chooseOption,
    chooseCMValgo,
    chooseAct,
    hashInput,
    paramsInput,
    clearInput,
    copyResult,
    CheckMacValueGen
  };
}
