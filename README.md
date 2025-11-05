# Cafflow Demo (Node.js + Vanilla Frontend)

Bu demo, **müşteri ekranı (QR menü yerine web sayfası)** ve **barista ekranı (KDS)** ile sipariş akışını gösterir.
Veriler *hafızada* tutulur (veritabanı yok) — yatırım öncesi demo için idealdir.

## Kurulum
```bash
# 1) Klasöre girin
cd cofflow-demo

# 2) Paketleri yükleyin
npm install

# 3) Geliştirme modu (otomatik yeniden başlatma)
npm run dev
# veya üretim
npm start
```

- Sunucu: http://localhost:4000
- Müşteri ekranı: `web/customer.html` dosyasını çift tıklayıp açın (veya bir live server eklentisiyle).
- Barista ekranı: `web/kds.html` dosyasını açın.

> Not: Tarayıcı, dosya:// üstünden CORS bloklayabilir. Sorun yaşarsanız VSCode Live Server veya basit bir statik server kullanın:
```bash
# global http-server (opsiyonel)
npm i -g http-server
# web klasörünü sun
http-server web -p 5173
# Artık müşteri: http://localhost:5173/customer.html
# KDS: http://localhost:5173/kds.html
```

## API Uçları
- `POST /orders` → sipariş oluşturur
- `GET /orders` → siparişleri listeler
- `POST /orders/:id/status` → `PENDING | IN_PROGRESS | READY | SERVED`

## Yapılacaklar (Geliştirme Fikirleri)
- Veritabanı (Postgres + Prisma) ile kalıcı hale getirme
- Ödeme entegrasyonu (iyzico/PayTR)
- Kullanıcı profili ve öneri motoru
- Stok–reçete düşümü
