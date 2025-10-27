/**
* Çok dilli & kategori bazlı üretim: her dil × kategori için günlük 3–5 makale (09:00 UTC).
* Dedup: başlık benzerliği + kaynak URL host+yol + ilk 200 karakter cosine benzerliği.
* Görsel: 16:9; WebP/AVIF üret; img için srcset/sizes ver; yoksa /assets/img/placeholder-16x9.jpg.
* Şablonlar: /templates -> /public/{lang}/ altında static HTML.
* URL: /{lang}/{news-root}/{category}/{yyyy}/{mm}/{slug}/
* JSON-LD: NewsArticle (+BreadcrumbList); site: Organization + WebSite+SearchAction.
* Hreflang: dil varyantlarının karşılıklı linkleri + x-default.
* Sitemaps: /public/{lang}/sitemap.xml; News sitemap: /public/{lang}/news-sitemap.xml (son 48 saat).
* RSS: /public/{lang}/rss.xml ve /public/{lang}/{news-root}/{category}/rss.xml.
* Kategori sayfalama: /page/{n}/; rel=prev/next; canonical sadece kök kategori sayfasına.
* Tarih: içte UTC; JSON-LD/Sitemaps UTC; görünür metin yerel (TR için Europe/Istanbul).
* Keywords Lock: /feeds/keywords.json’daki 3 terim dışında başka terim kullanma.
* Google News fetch: dil/bölge parametreleri set (hl, gl).
*/
console.log("Stub: implement multilingual fetching, Keywords Lock, dedup, srcset/AVIF/WebP, sitemaps (incl. news), RSS, hreflang, pagination.");

const keywords = require('../feeds/keywords.json');
async function fetchCategory(lang, localCategory, target=5) {
    const terms = keywords[lang] || [];
    let collected = [];
    for (const term of terms) {
        const q = `${term} ${localCategory}`.trim();
        // const batch = await fetchGoogleNewsAndRss({ lang, query: q, hl: lang, gl: mapLangToGL(lang) });
        // collected = dedupMerge(collected, batch);
        if (collected.length >= target) break;
    }
    return collected.slice(0, target);
}