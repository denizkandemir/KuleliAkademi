# Sticky WhatsApp Widget - Kullanım Rehberi

## 📋 Genel Bilgi

Premium, modern ve sitenin tasarımına uyumlu bir sticky WhatsApp widget'ı oluşturulmuştur. Component tüm sayfalarda otomatik olarak görünür.

---

## 🎯 Özellikler

✅ **Sol alt köşede sabit konum** - Fixed positioning, tüm cihazlarda uyumlu  
✅ **Premium tasarım** - Navy ve soft tones, sitenin tasarım diliyle uyumlu  
✅ **Smooth animasyon** - Scale + Translate + Opacity kombinasyonu  
✅ **İki danışmanlık seçeneği** - Polonya ve Aliağa  
✅ **Doğrudan WhatsApp iletişim** - wa.me link formatı, ön tanımlı mesajlar  
✅ **Responsive** - Desktop, tablet, mobile uyumlu  
✅ **Accessibility** - ARIA labels, semantic HTML  
✅ **Click outside close** - Otomatik kapanma  

---

## 📁 Dosya Yapısı

```
resources/js/components/StickyWhatsappWidget/
├── StickyWhatsappWidget.jsx      (Component JSX)
└── StickyWhatsappWidget.scss     (Stiller)
```

---

## 🔧 İmplementasyon

Component **Layout.jsx** dosyasına otomatik olarak entegre edilmiştir.

### Layout.jsx

```jsx
import StickyWhatsappWidget from "./components/StickyWhatsappWidget/StickyWhatsappWidget";

export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <StickyWhatsappWidget />  {/* ← Tüm sayfalarda görünür */}
        </>
    );
}
```

---

## 📞 İletişim Numaraları ve Mesajlar

Component içinde tanımlı iletişim bilgileri:

```javascript
const whatsappContacts = [
    {
        id: 1,
        title: "Polonya Danışmanlık",
        phone: "+90 530 123 45 67",
        phoneRaw: "905301234567",
        message: "Merhaba, Polonya danışmanlığı hakkında bilgi almak istiyorum."
    },
    {
        id: 2,
        title: "Aliağa Danışmanlık",
        phone: "+90 532 987 65 43",
        phoneRaw: "905329876543",
        message: "Merhaba, Aliağa danışmanlığı hakkında bilgi almak istiyorum."
    }
];
```

### 📝 Numaraları Değiştirmek

**StickyWhatsappWidget.jsx** dosyasında `whatsappContacts` array'ini güncelle:

```javascript
const whatsappContacts = [
    {
        id: 1,
        title: "Mersin Şubesi",
        phone: "+90 XXX XXX XX XX",
        phoneRaw: "90XXXXXXXXXX",  // ön planda 90 olacak şekilde
        message: "Merhaba, Mersin şubesi hakkında bilgi almak istiyorum."
    },
    // ... diğer şubeler
];
```

---

## 🎨 Tasarım Detayları

### Renk Şeması

- **Ana Buton**: Soft white gradient (#ffffff → #f8f9fa)
- **İkon**: WhatsApp yeşili (#25D366)
- **Başlık**: Navy blue (#1f6fb2)
- **Telefon**: Soft gray (rgba(0, 0, 0, 0.65))
- **Border**: Navy blue transparent (rgba(31, 111, 178, 0.1))

### Boyutlar

| Cihaz      | Button | Padding | Konumu |
|-----------|--------|---------|--------|
| Desktop   | 56px   | 24px    | Sol alt |
| Tablet    | 52px   | 20px    | Sol alt |
| Mobile    | 48px   | 16px    | Sol alt |

### Gölgeler

- Normal: `0 4px 12px rgba(31, 111, 178, 0.12)`
- Hover: `0 8px 16px rgba(31, 111, 178, 0.16)`
- Active: `0 8px 20px rgba(31, 111, 178, 0.2)`

---

## ✨ Animasyonlar

### Açılış Animasyonu

```scss
@keyframes slideUpWhatsapp {
    from {
        opacity: 0;
        transform: translateY(16px) scale(0.92);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}
```

- **Duration**: 0.4s
- **Easing**: `cubic-bezier(0.34, 1.56, 0.64, 1)` (Spring effect)
- **Stagger**: 0.08s gecikme arası

### Hover Efektler

**Ana Button**:
- Transform: `translateY(-3px) scale(1.05)`
- Shadow artırma
- Border color değişimi

**Contact Items**:
- Transform: `translateX(4px)`
- Background gradient değişimi
- Border color artırma

---

## 🖱️ İnteraksiyon

### Açma/Kapama

1. Ana ikona tıkla → Numaralar animasyonlu açılır
2. Tekrar tıkla → Animasyonlu kapanır
3. Dışarı tıkla → Otomatik kapanır
4. Numara seçin → Tıkla → WhatsApp aç → Otomatik kapanır

### WhatsApp Linki

Oluşturulan link formatı:

```
https://wa.me/905301234567?text=Merhaba, Polonya danışmanlığı hakkında bilgi almak istiyorum.
```

- Yeni sekmede açılır (`_blank`)
- URL encode edilmiş mesaj ile gelir
- `noopener,noreferrer` security attributes var

---

## 📱 Responsive Davranış

### Desktop (1024px+)

- 56px button, 24px margin
- Smooth hover effects
- Full contact labels

### Tablet (768px - 1023px)

- 52px button, 20px margin
- Optimized spacing
- Full labels

### Mobile (< 768px)

- 48px button, 16px margin
- Compact padding
- Touch-optimized
- Items dikey sırada, ekran dışına taşmıyor

---

## ♿ Erişilebilirlik (Accessibility)

```jsx
<button
    aria-label="WhatsApp iletişim menüsü"
    aria-expanded={isOpen}
>
    {/* ... */}
</button>
```

- ARIA labels mevcut
- Semantic HTML buttons
- Keyboard accessible
- Screen reader friendly

---

## 🔒 Güvenlik

- External link security: `rel="noopener,noreferrer"`
- Click outside handler ile kontrol
- State isolation

---

## 🎯 Özelleştirme

### 1. Numuraları Değiştir

**StickyWhatsappWidget.jsx** → `whatsappContacts`

### 2. Mesajları Güncelle

```javascript
message: "Özel bir mesaj yazabilirsin"
```

### 3. Renkleri Değiştir

**StickyWhatsappWidget.scss** içinde:

```scss
.whatsapp-main-button {
    background: linear-gradient(135deg, #hexa 0%, #hexb 100%);
    // ...
}
```

### 4. Boyutu Değiştir

```scss
.whatsapp-main-button {
    width: 64px;  // default 56px
    height: 64px;
}
```

### 5. Konumunu Değiştir

```scss
.sticky-whatsapp-widget {
    bottom: 30px;  // değişkeni
    left: 30px;    // değişkeni
}
```

---

## 📊 Component Props

Bu component prop almaz. Data `whatsappContacts` array'inde hardcoded'dır.

Eğer dinamik yapmak istersen:

```jsx
const StickyWhatsappWidget = ({ contacts = whatsappContacts }) => {
    // ...
}
```

---

## 🐛 Troubleshooting

### Widget görünmüyor mu?

1. `Layout.jsx` içinde import var mı? ✓
2. Component dosyası doğru yolda mı? ✓
3. SCSS dosyası import edildi mi? ✓
4. z-index çakışması var mı? (999'dan daha yüksek bir z-index varsa yükselt)

### Animasyon donuk mu?

- Browser'ı refresh et
- Dev tools'da hardware acceleration kontrol et
- CSS animasyonları aktif mi kontrol et

### WhatsApp linki çalışmıyor mu?

- `phoneRaw` formatı doğru mu? (90 ile başlamalı)
- Message URL encoded mi? ✓ (JS bunu otomatik yapıyor)

---

## 📈 Performans

- **Bundle size**: ~3KB (JSX + SCSS)
- **Animation**: CSS animasyonu (performant)
- **Event handling**: Debounced click outside
- **No external dependencies**: Pure React

---

## 🌙 Dark Mode

Component dark mode destekler! SCSS'de `prefers-color-scheme: dark` media query var.

```scss
@media (prefers-color-scheme: dark) {
    .whatsapp-main-button {
        background: linear-gradient(135deg, #1f2f46 0%, #1e3a5f 100%);
        // ...
    }
}
```

---

## 📞 Sonuç

✅ Premium sticky WhatsApp widget hazır!  
✅ Tüm sayfalarda otomatik görünüyor  
✅ Modern animasyonlar  
✅ Responsive ve accessible  
✅ Sitenin tasarım diliyle uyumlu  

**Artık tüm sayfalarda sol alt köşede profesyonel WhatsApp widget'ı görülecektir!**
