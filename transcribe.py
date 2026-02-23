import os
import whisper

def transcribe_all():
    input_dir = "逐字稿專案/podcast_downloads"
    output_dir = "逐字稿專案/transcripts"
    
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        
    print("Loading Whisper model...")
    # 'turbo' is the new fast model, we fall back to 'base' if it cannot load
    try:
        model = whisper.load_model("turbo")
    except Exception:
        print("Falling back to small model...")
        model = whisper.load_model("small")
        
    # Get all mp3 files
    mp3_files = [f for f in os.listdir(input_dir) if f.endswith(".mp3")]
    mp3_files.sort()
    
    # Process the shortest one first (059) to test
    shortest = [f for f in mp3_files if "059" in f]
    others = [f for f in mp3_files if "059" not in f]
    mp3_files = shortest + others
    
    for i, filename in enumerate(mp3_files, 1):
        input_path = os.path.join(input_dir, filename)
        base_name = os.path.splitext(filename)[0]
        output_path = os.path.join(output_dir, f"{base_name}.txt")
        
        if os.path.exists(output_path):
            print(f"Skipping [{i}/{len(mp3_files)}] {filename} (already transcribed)")
            continue
            
        print(f"Transcribing [{i}/{len(mp3_files)}]: {filename}")
        try:
            # initial_prompt helps whisper output Traditional Chinese
            result = model.transcribe(
                input_path, 
                initial_prompt="繁體中文。這是Kidsbooksholic 閱讀馨聲的Podcast逐字稿。"
            )
            
            with open(output_path, "w", encoding="utf-8") as f:
                f.write(result["text"])
            print(f"  -> Saved to {output_path}")
        except Exception as e:
            print(f"  -> Error transcribing {filename}: {e}")

if __name__ == "__main__":
    transcribe_all()
