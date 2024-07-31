# 綠界檢查碼、 AES 加解密產生器 前端程式碼

## 這是什麼？

算出綠界科技的全方位金流 / 物流 / 電子發票系統中的檢查碼 (CheckMacValue)。
將綠界科技金流 / 電子發票的參數進行 AES 加密。
將綠界科技金流 / 電子發票加密過的參數進行 AES 解密。

[我曾以 Node.js 寫過綠界科技檢查碼以及 AES 加解密的功能](https://medium.com/@roan6903/hash-and-aes-encrypt-4229c1ba71a5)，但必須打開 Node.js 程式檔並修改要計算的參數；本次加上 React 前端介面，避免打開程式檔過程中不慎修改到程式。

本程式碼為前端部份。

後端程式碼：https://github.com/evojroan/ECPay_Encrypt_Tool_Backend

## 如何使用？

### 1. 本機端

請同時下載前端與後端。確保電腦可執行 Node.js。
啟動後端：終端到後端的專案檔，`node index.js`
啟動前端：`npm run dev`

### 2. 線上

不用安裝，已部署於線上，直接前往：（WIP）

## 使用技術

- React.js
- Node.js
- 前後端分離

## 本程式作者

[Roan 的網誌](https://medium.com/@roan6903)
[Roan 的 GitHub](https://github.com/evojroan)
