import csv, html, os, re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / 'data' / 'products.csv'
SITE = ROOT / 'site'
POSTS = SITE / 'posts'
POSTS.mkdir(parents=True, exist_ok=True)

def clean(s):
    return html.escape(s or '')

def split_pipe(s):
    return [x.strip() for x in (s or '').split('|') if x.strip()]

def load_products():
    with DATA.open(newline='', encoding='utf-8') as f:
        return list(csv.DictReader(f))

def layout(title, body, desc='Smart Lazada finds for Filipino buyers.'):
    return f'''<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{clean(title)} | AI Deal Finder PH</title>
  <meta name="description" content="{clean(desc)}">
  <link rel="stylesheet" href="/assets/styles.css">
  <script defer src="/assets/app.js"></script>
</head>
<body>
  <div class="wrap">
    <nav class="nav">
      <div class="brand">AI Deal Finder <span>PH</span></div>
      <div>
        <a href="/">Home</a>
        <a href="/categories.html">Categories</a>
        <a href="/disclosure.html">Disclosure</a>
      </div>
    </nav>
    {body}
    <footer class="footer section">
      <p>AI Deal Finder PH shares curated product ideas. Prices, availability, and ratings can change. Always check the seller page before buying.</p>
      <p>As an affiliate site, this website may earn a commission from qualifying purchases.</p>
    </footer>
  </div>
</body>
</html>'''

def card(p):
    return f'''<article class="card">
      <img src="{clean(p['image_url'])}" alt="{clean(p['title'])}">
      <span class="pill">{clean(p['category'])}</span>
      <h3>{clean(p['title']).title()}</h3>
      <p>{clean(p['benefit'])}</p>
      <p class="price">Estimated range: {clean(p['price_range'])}</p>
      <a class="btn" href="/posts/{clean(p['slug'])}.html">Read review</a>
    </article>'''

def generate_index(products):
    top_cards = '\n'.join(card(p) for p in products[:9])
    cats = sorted(set(p['category'] for p in products))
    cat_pills = ''.join(f'<span class="pill">{clean(c)}</span>' for c in cats)
    body = f'''
    <section class="hero">
      <div>
        <span class="badge">Lazada finds for creators, workers, and everyday buyers</span>
        <h1>Smart tech and home-office deals in the Philippines.</h1>
        <p>Browse practical Lazada product ideas with quick pros, cons, and buyer-fit notes. Built for fast decisions, not endless scrolling.</p>
        <a class="cta" href="#latest">See latest finds</a>
      </div>
      <div class="panel">
        <h2>Start here</h2>
        <p class="muted">Best categories for quick affiliate content:</p>
        {cat_pills}
        <p class="muted">Replace placeholder affiliate links in <code>data/products.csv</code>, then regenerate the site.</p>
      </div>
    </section>
    <section class="section" id="latest">
      <h2>Latest product ideas</h2>
      <div class="grid">{top_cards}</div>
    </section>'''
    (SITE / 'index.html').write_text(layout('Smart Lazada Finds', body), encoding='utf-8')

def generate_categories(products):
    by_cat = {}
    for p in products:
        by_cat.setdefault(p['category'], []).append(p)
    sections = []
    for c, items in sorted(by_cat.items()):
        sections.append(f'<section class="section"><h2>{clean(c).title()}</h2><div class="grid">' + ''.join(card(p) for p in items) + '</div></section>')
    (SITE / 'categories.html').write_text(layout('Categories', '\n'.join(sections)), encoding='utf-8')

def generate_post(p):
    pros = ''.join(f'<li>{clean(x)}</li>' for x in split_pipe(p['pros']))
    cons = ''.join(f'<li>{clean(x)}</li>' for x in split_pipe(p['cons']))
    keywords = ''.join(f'<span class="pill">{clean(k)}</span>' for k in split_pipe(p['keywords']))
    title = clean(p['title']).title()
    body = f'''
    <article class="article section">
      <span class="badge">{clean(p['category']).title()}</span>
      <h1>{title}: quick Lazada buying guide</h1>
      <p class="muted">Best for {clean(p['best_for'])}.</p>
      <img src="{clean(p['image_url'])}" alt="{title}">
      <p class="price">Estimated range: {clean(p['price_range'])}</p>
      <p><a class="cta" data-affiliate="1" rel="sponsored nofollow noopener" target="_blank" href="{clean(p['affiliate_url'])}">Check price on Lazada</a></p>
      <p class="disclaimer">Affiliate disclosure: this page may contain affiliate links. If you buy through the link, the site may earn a commission at no extra cost to you.</p>
      <h2>Why this product is useful</h2>
      <p>{clean(p['problem']).capitalize()}. This product helps because it gives you {clean(p['benefit'])}.</p>
      <div class="proscons">
        <div class="panel"><h2>Pros</h2><ul>{pros}</ul></div>
        <div class="panel"><h2>Cons</h2><ul>{cons}</ul></div>
      </div>
      <h2>Who should buy it?</h2>
      <p>Consider this if you are looking for a practical, low-cost option for {clean(p['best_for'])}. Before buying, check the seller rating, recent reviews, shipping fee, warranty terms, and actual product photos.</p>
      <h2>Suggested short-video script</h2>
      <div class="panel"><p><strong>Hook:</strong> Need {clean(p['benefit'])}? This {clean(p['title'])} is a simple Lazada find for {clean(p['best_for'])}.</p><p><strong>CTA:</strong> Check the link for the current price and seller details.</p></div>
      <h2>Search tags</h2>
      <p>{keywords}</p>
    </article>'''
    (POSTS / f"{p['slug']}.html").write_text(layout(f"{title} Review", body, f"Quick buying guide for {p['title']} on Lazada Philippines."), encoding='utf-8')

def generate_disclosure():
    body = '''<section class="article section"><h1>Affiliate Disclosure</h1><p>AI Deal Finder PH may contain affiliate links. This means the site may earn a commission when a visitor clicks a product link and completes a qualifying purchase.</p><p>Product prices, availability, shipping fees, ratings, and seller terms can change. Always verify details on the seller page before purchasing.</p><p>Recommendations are intended as general product discovery content, not financial or professional advice.</p></section>'''
    (SITE / 'disclosure.html').write_text(layout('Affiliate Disclosure', body), encoding='utf-8')

def generate_sitemap(products):
    urls = ['/', '/categories.html', '/disclosure.html'] + [f"/posts/{p['slug']}.html" for p in products]
    (SITE / 'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + ''.join(f'<url><loc>https://example.com{u}</loc></url>\n' for u in urls) + '</urlset>\n', encoding='utf-8')
    (SITE / 'robots.txt').write_text('User-agent: *\nAllow: /\nSitemap: https://example.com/sitemap.xml\n', encoding='utf-8')

def main():
    products = load_products()
    generate_index(products)
    generate_categories(products)
    generate_disclosure()
    generate_sitemap(products)
    for p in products:
        generate_post(p)
    print(f'Generated {len(products)} product pages in {SITE}')

if __name__ == '__main__':
    main()
