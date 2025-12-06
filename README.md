# Kidsbooksholic Website Project

這是一個用於 [Kidsbooksholic 閱讀馨聲](https://sniperhk.github.io/kidsbooksholic-site/) 已發布 Podcast 網站的靜態網頁專案。

## 🤖 給 AI 助手 / 接手開發者的交班注意事項

這個專案透過 **GitHub Pages** 自動部署。任何推送到 `main` 分支的變更都會在幾分鐘內自動反映到線上網站。

### 1. 專案結構
-   `index.html`: 首頁結構與內容。
-   `style.css`: 樣式表。包含節慶主題（紅/綠/金）的變數設定。
-   `script.js`: 包含 Podcast 集數資料 (`episodesData`) 與前端邏輯。

### 2. 編輯重點
-   **字體**: 我們使用 **Google Fonts** 的 `Mochiy Pop One` (標題) 和 `ZCOOL KuaiLe` 來替代 Canva 的專有字體 "可畫俏皮黑"。請勿隨意更換，除非找到更合適的免費替代品。
-   **Podcast 更新**: 新集數請新增到 `script.js` 中的 `episodesData` 陣列 **最前方**。
-   **圖片**: 外部連結圖片或 FontAwesome 圖示。若需新增本地圖片，請確保路徑正確。

### 3. 如何發布變更 (Workflow)

完成程式碼編輯後，請執行以下 Git 指令將變更推送到 GitHub：

```bash
# 1. 檢查狀態
git status

# 2. 加入所有變更
git add .

# 3. 提交變更 (請使用清楚的 commit message)
git commit -m "feat: 更新 Podcast 集數 S2E12" 
# 或 
git commit -m "style: 調整首頁文字顏色"

# 4. 推送到遠端
git push origin main
```

### 4. 常見指令 (AI 捷徑)
如果你 (AI) 已經確認所有變更都正確，可以使用這一行指令一次完成發布：

```bash
git add . && git commit -m "update: site content" && git push origin main
```

### 5. 驗證
推送後，請開啟 [https://sniperhk.github.io/kidsbooksholic-site/](https://sniperhk.github.io/kidsbooksholic-site/) 確認變更是否生效（通常需等待 1-2 分鐘）。
