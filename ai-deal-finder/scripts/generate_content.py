import csv
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / 'data' / 'products.csv'
OUT = ROOT / 'output'
OUT.mkdir(exist_ok=True)

rows = list(csv.DictReader(DATA.open(newline='', encoding='utf-8')))

with (OUT / 'short_video_scripts.md').open('w', encoding='utf-8') as f:
    f.write('# Short Video Scripts\n\n')
    for p in rows:
        f.write(f"## {p['title'].title()}\n")
        f.write(f"**Hook:** Still dealing with this problem: {p['problem']}?\n\n")
        f.write(f"**Body:** This {p['title']} can help with {p['benefit']}. It is best for {p['best_for']}.\n\n")
        f.write(f"**Pros:** {', '.join(p['pros'].split('|'))}.\n\n")
        f.write(f"**CTA:** Check the Lazada link for current price, seller rating, and shipping details.\n\n")
        f.write('**Caption:** Practical Lazada find for creators and work-from-home setups. #LazadaFindsPH #BudgetTechPH #AffiliateFinds\n\n')

with (OUT / 'posting_calendar.csv').open('w', encoding='utf-8', newline='') as f:
    w = csv.writer(f)
    w.writerow(['day','platform','topic','asset','status'])
    day = 1
    platforms = ['YouTube Shorts','TikTok','Facebook Reels','Instagram Reels','Pinterest']
    for p in rows:
        for platform in platforms:
            w.writerow([day, platform, p['title'], f"/posts/{p['slug']}.html", 'Not posted'])
        day += 1

with (OUT / 'seo_titles_and_descriptions.md').open('w', encoding='utf-8') as f:
    f.write('# SEO Titles and Meta Descriptions\n\n')
    for p in rows:
        f.write(f"## {p['title'].title()}\n")
        f.write(f"Title: {p['title'].title()} on Lazada Philippines | AI Deal Finder PH\n\n")
        f.write(f"Description: Quick buying guide for {p['title']} for {p['best_for']}. Check pros, cons, use case, and current Lazada seller details.\n\n")

print('Generated content files in output/')
