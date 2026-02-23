import os
import xml.etree.ElementTree as ET
import urllib.request
import ssl
import concurrent.futures

def download_episode(item_data, output_dir, ctx):
    index, title_text, url, total = item_data
    safe_title = "".join([c for c in title_text if c.isalpha() or c.isdigit() or c in ' -_']).rstrip()
    file_name = f"{index:03d}_{safe_title}.mp3"
    file_path = os.path.join(output_dir, file_name)
                
    if os.path.exists(file_path):
        print(f"Skipping [{index}/{total}] {file_name} (already downloaded)")
        return

    print(f"Downloading [{index}/{total}]: {title_text}")
    try:
        req = urllib.request.Request(
            url, 
            headers={'User-Agent': 'Mozilla/5.0'}
        )
        with urllib.request.urlopen(req, context=ctx) as response, open(file_path, 'wb') as out_file:
            data = response.read()
            out_file.write(data)
        print(f"  -> Saved to {file_path}")
    except Exception as e:
        print(f"  -> Error downloading {url}: {e}")

def download_podcasts(feed_path, output_dir):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    print(f"Parsing {feed_path}...")
    try:
        tree = ET.parse(feed_path)
        root = tree.getroot()
    except Exception as e:
        print(f"Error parsing XML: {e}")
        return

    channel = root.find('channel')
    if channel is None:
        print("Could not find <channel> in feed.")
        return

    items = channel.findall('item')
    total_items = len(items)
    print(f"Found {total_items} episodes.")

    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE

    download_tasks = []
    for index, item in enumerate(items, 1):
        title = item.find('title')
        enclosure = item.find('enclosure')
        if title is not None and enclosure is not None:
            url = enclosure.get('url')
            if url:
                download_tasks.append((index, title.text.strip(), url, total_items))
    
    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
        futures = [executor.submit(download_episode, task, output_dir, ctx) for task in download_tasks]
        concurrent.futures.wait(futures)

if __name__ == "__main__":
    feed_file = "feed.xml"
    out_directory = "podcast_downloads"
    download_podcasts(feed_file, out_directory)
