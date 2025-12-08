import os
import feedparser
import requests
from dotenv import load_dotenv
import time
from tqdm import tqdm
import json

# Load environment variables
load_dotenv()

# Configuration
RSS_FEED_URL = "../feed.xml"  # Local file or URL
OUTPUT_DIR = "output"
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY") 
# You can use 'base', 'small', 'medium', 'large' for Whisper models. 
# 'base' is fast but less accurate. 'medium' or 'large' recommended for Traditional Chinese.
WHISPER_MODEL_SIZE = "small" 

def setup_directories():
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)
    
    audio_dir = os.path.join(OUTPUT_DIR, "audio")
    transcripts_dir = os.path.join(OUTPUT_DIR, "transcripts")
    tips_dir = os.path.join(OUTPUT_DIR, "tips")
    
    for d in [audio_dir, transcripts_dir, tips_dir]:
        if not os.path.exists(d):
            os.makedirs(d)
            
    return audio_dir, transcripts_dir, tips_dir

def download_audio(url, filename):
    response = requests.get(url, stream=True)
    total_size = int(response.headers.get('content-length', 0))
    
    with open(filename, 'wb') as file, tqdm(
        desc=filename,
        total=total_size,
        unit='iB',
        unit_scale=True,
        unit_divisor=1024,
    ) as bar:
        for data in response.iter_content(chunk_size=1024):
            size = file.write(data)
            bar.update(size)

def transcribe_with_whisper(audio_path):
    try:
        import whisper
    except ImportError:
        print("❌ 錯誤: 找不到 'whisper' 套件。請確認已安裝: pip install git+https://github.com/openai/whisper.git")
        return None

    print(f"正在載入 Whisper 模型 ({WHISPER_MODEL_SIZE})...")
    model = whisper.load_model(WHISPER_MODEL_SIZE)
    
    print(f"正在轉錄音訊: {audio_path} ... (這可能需要一段時間)")
    # initial_prompt helps guide the model to output Traditional Chinese
    result = model.transcribe(audio_path, initial_prompt="以下是繁體中文的親子共讀 Podcast 內容。")
    return result["text"]

def extract_tips_with_llm(transcript):
    if not OPENAI_API_KEY:
        print("警告: 未設定 OPENAI_API_KEY，跳過實用技巧提取步驟。")
        return "請設定 OpenAI API Key 以啟用 AI 摘要功能。"

    try:
        from openai import OpenAI
    except ImportError:
         print("❌ 錯誤: 找不到 'openai' 套件。請確認已安裝: pip install openai")
         return "缺少 openai 套件"

    client = OpenAI(api_key=OPENAI_API_KEY)
    
    prompt = f"""
    你是「Kidsbooksholic 閱讀馨聲」Podcast 的專業編輯。
    以下是本集節目的逐字稿。請幫我從中整理出「實用共讀技巧」(Practical Shared Reading Tips)。
    
    要求：
    1. 忽略無關的閒聊或廣告。
    2. 重點放在家長可以具體執行的建議、提問方式、或是與孩子互動的技巧。
    3. 以條列式呈現，語氣溫暖且專業。
    4. 使用繁體中文。
    5. 格式範例：
       - **技巧一：[標題]** - [具體說明]
    
    逐字稿內容：
    {transcript[:15000]} 
    (內容均為繁體中文)
    """
    # Note: limiting to 15000 chars to avoid token limits for simple demo, 
    # for full processing you might need a larger context window model or chunking.

    try:
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "你是一個專業的親子共讀顧問與編輯。"},
                {"role": "user", "content": prompt}
            ]
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"AI 處理發生錯誤: {e}"

def main():
    audio_dir, transcripts_dir, tips_dir = setup_directories()
    
    # Analyze Feed
    print(f"正在讀取 RSS Feed: {RSS_FEED_URL}")
    # Handle local file vs URL
    if os.path.exists(RSS_FEED_URL):
        feed = feedparser.parse(RSS_FEED_URL)
    else:
        feed = feedparser.parse(RSS_FEED_URL) # feedparser handles URLs too

    print(f"找到 {len(feed.entries)} 集節目。")
    
    # Process latest episode only for demo (change slice to process more)
    episodes_to_process = feed.entries[:1] 
    
    for entry in episodes_to_process:
        title = entry.title
        # Sanitize filename
        safe_title = "".join([c for c in title if c.isalpha() or c.isdigit() or c==' ' or c in ['_', '-']]).strip()
        print(f"\n=== 處理集數: {title} ===")
        
        # 1. Get Audio URL
        audio_url = None
        for link in entry.links:
            if link.type == 'audio/mpeg':
                audio_url = link.href
                break
        
        if not audio_url:
            print("找不到音訊連結，跳過。")
            continue
            
        audio_filename = os.path.join(audio_dir, f"{safe_title}.mp3")
        transcript_filename = os.path.join(transcripts_dir, f"{safe_title}.txt")
        tips_filename = os.path.join(tips_dir, f"{safe_title}_tips.md")
        
        # 2. Download (if not exists)
        if not os.path.exists(audio_filename):
            print("下載音訊中...")
            download_audio(audio_url, audio_filename)
        else:
            print("音訊檔案已存在，跳過下載。")
            
        # 3. Transcribe (if not exists)
        transcript = ""
        if not os.path.exists(transcript_filename):
            transcript = transcribe_with_whisper(audio_filename)
            if transcript:
                with open(transcript_filename, "w", encoding="utf-8") as f:
                    f.write(transcript)
                print("逐字稿已儲存。")
            else:
                 print("轉錄失敗或中止。")
                 continue
        else:
            print("逐字稿已存在，讀取中...")
            with open(transcript_filename, "r", encoding="utf-8") as f:
                transcript = f.read()
                
        # 4. Extract Tips
        print("正在萃取實用技巧...")
        tips = extract_tips_with_llm(transcript)
        
        with open(tips_filename, "w", encoding="utf-8") as f:
            f.write(f"# {title} - 實用共讀技巧\n\n")
            f.write(tips)
            
        print(f"✅ 完成！技巧已儲存至: {tips_filename}")

if __name__ == "__main__":
    main()
