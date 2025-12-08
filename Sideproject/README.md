# Podcast 實用技巧萃取器

這是一個 Side Project，用於自動下載 Podcast 音訊，轉錄成文字，並使用 AI 萃取其中的「實用共讀技巧」。

## 功能
1.  **自動下載**: 解析 RSS Feed (支援本地 `../feed.xml` 或遠端 URL)，下載最新集數的 MP3。
2.  **語音轉文字**: 使用 OpenAI 的 Whisper 模型（本地執行，免費）將語音轉為繁體中文逐字稿。
3.  **AI 重點整理**: 使用 OpenAI GPT-4o API 將逐字稿整理成條列式的實用技巧。

## 安裝步驟

### 1. 準備環境
建議使用虛擬環境 (Virtual Environment)：

```bash
# 建立虛擬環境
python3 -m venv venv

# 啟動虛擬環境 (Mac/Linux)
source venv/bin/activate
# Windows: venv\Scripts\activate
```

### 2. 安裝套件
除了 Python 基本套件外，還需要安裝 `ffmpeg` (Whisper 依賴)：

```bash
# Mac 安裝 ffmpeg
brew install ffmpeg

# 安裝 Python 套件
pip install -r requirements.txt
```

### 3. 設定 API Key
複製範例設定檔並填入你的 OpenAI API Key：

```bash
cp .env.example .env
# 編輯 .env 檔案，填入你的 Key
# OPENAI_API_KEY=sk-.......
```

## 使用方法

執行主程式：

```bash
python podcast_processor.py
```

程式會自動：
1.  讀取根目錄的 `feed.xml`。
2.  下載最新一集的音訊到 `output/audio/`。
3.  轉錄文字到 `output/transcripts/`。
4.  生成的技巧筆記會存在 `output/tips/`。

## 注意事項
-   **Whisper 模型**: 預設使用 `small` 模型。如果覺得準確度不夠，可以在 `podcast_processor.py` 中將 `WHISPER_MODEL_SIZE` 改為 `medium` 或 `large` (速度會變慢)。
-   **API 費用**: 萃取重點步驟會呼叫 OpenAI API，會產生少量費用。若不想付費，可以只執行到轉錄步驟，手動丟給 ChatGPT 整理。
