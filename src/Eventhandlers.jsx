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

  async function CheckMacValueGen() {
    try {
      const response = await axios.post("http://localhost:3000/", {
        option: option,
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

  //Output 事件處理器：計算 CheckMacValue
  async function CheckMacValueGen2(params, CMValgorithm, digest) {
    let CMVStep0;
    if (typeof params === "string") {
      CMVStep0 = params;
    } else if (typeof params === "object") {
      CMVStep0 = Object.entries(params)
        .map(([Key, value]) => `${Key}=${value}`)
        .join("&");
    }

    function DotNETURLEncode(string) {
      const list = {
        "%2D": "-",
        "%5F": "_",
        "%2E": ".",
        "%21": "!",
        "%2A": "*",
        "%28": "(",
        "%29": ")",
        "%20": "+"
      };

      Object.entries(list).forEach(([encoded, decoded]) => {
        const regex = new RegExp(encoded, "g");
        string = string.replace(regex, decoded);
      });

      return string;
    }

    const CMVStep1 = CMVStep0.split("&")
      .sort((a, b) => {
        const KeyA = a.split("=")[0];
        const KeyB = b.split("=")[0];
        return KeyA.localeCompare(KeyB);
      })
      .join("&");
    const CMVStep2 = `HashKey=${chosenAct.HashKey}&${CMVStep1}&HashIV=${chosenAct.HashIV}`;
    const CMVStep3 = DotNETURLEncode(encodeURIComponent(CMVStep2));
    const CMVStep4 = CMVStep3.toLowerCase();
    const CMVStep5 = createHash(CMValgorithm).update(CMVStep4).digest(digest);
    const CMVStep6 = CMVStep5.toUpperCase();

    return `
    檢核碼計算順序<br/>
  <p>(1) 將傳遞參數依照第一個英文字母，由A到Z的順序來排序(遇到第一個英名字母相同時，以第二個英名字母來比較，以此類推)，並且以&方式將所有參數串連。<br/>
  ${CMVStep1}</p>

  <p>(2) 參數最前面加上HashKey、最後面加上HashIV<br/>
  ${CMVStep2}</p>

  <p>(3) 將整串字串進行URL encode<br/>
  ${CMVStep3}</p>

  <p>(4) 轉為小寫<br/>
  ${CMVStep4}</p>

  <p>(5) 以 ${CMValgorithm} 方式產生雜凑值<br/>
  ${CMVStep5}</p>

  <p>(6) 再轉大寫產生 CheckMacValue<br/>
  ${CMVStep6}</p>
    `;
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
    CheckMacValueGen
  };
}
