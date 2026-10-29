import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { slugify } from '../../../utils/slugify';

const blankImage = { image_url: '', alt_text: '', sort_order: 0, is_cover: false };

function UniversitiesCreate({ countryOptions = [], defaultCountry = 'Polonya' }) {
  const { data, setData, post, processing, errors } = useForm({
    name: '', slug: '', short_name: '', country: defaultCountry, city: '', short_description: '', description: '', website_url: '', application_url: '', main_image_url: '', logo_url: '', tuition_fee: '', currency: 'EUR', duration: '', language: '', ranking: '', is_featured: false, is_active: true, sort_order: 0, images: [blankImage],
  });
  const [slugTouched, setSlugTouched] = useState(false);

  const updateImage = (index, key, value) => {
    const next = [...data.images];
    next[index] = { ...next[index], [key]: value };
    setData('images', next);
  };

  return (
    <>
      <Head title="Yeni Üniversite" />
      <div className="admin-page-stack">
        <section className="admin-page-toolbar"><div><p className="admin-page-kicker">Üniversite Yönetimi</p><h2>Yeni üniversite oluştur</h2></div><Link href="/admin/universities" className="admin-secondary-button">Geri Dön</Link></section>
        <section className="admin-form-card">
          <form className="admin-form" onSubmit={(e) => { e.preventDefault(); post('/admin/universities'); }}>
            <div className="admin-form-grid">
              <label className="admin-field"><span>Ad</span><input value={data.name} onChange={(e) => { setData('name', e.target.value); if (!slugTouched) setData('slug', slugify(e.target.value)); }} required />{errors.name && <small className="admin-field-error">{errors.name}</small>}</label>
              <label className="admin-field"><span>Slug</span><input value={data.slug} onChange={(e) => { setSlugTouched(true); setData('slug', e.target.value); }} required />{errors.slug && <small className="admin-field-error">{errors.slug}</small>}</label>
            </div>
            <div className="admin-form-grid">
              <label className="admin-field"><span>Şehir</span><input value={data.city} onChange={(e) => setData('city', e.target.value)} /></label>
              <label className="admin-field">
                <span>Ülke</span>
                <input list="university-country-options" value={data.country} onChange={(e) => setData('country', e.target.value)} required />
                <datalist id="university-country-options">
                  {countryOptions.map((option) => (
                    <option key={option.value} value={option.label} />
                  ))}
                </datalist>
                {errors.country && <small className="admin-field-error">{errors.country}</small>}
              </label>
            </div>
            <div className="admin-form-grid">
              <label className="admin-field"><span>Ana Görsel URL</span><input type="url" value={data.main_image_url} onChange={(e) => setData('main_image_url', e.target.value)} /></label>
              <label className="admin-field"><span>Logo URL</span><input type="url" value={data.logo_url} onChange={(e) => setData('logo_url', e.target.value)} /></label>
            </div>
            <label className="admin-field"><span>Kısa Açıklama</span><textarea rows="3" value={data.short_description} onChange={(e) => setData('short_description', e.target.value)} /></label>
            <label className="admin-field"><span>Açıklama</span><textarea rows="5" value={data.description} onChange={(e) => setData('description', e.target.value)} /></label>
            <h4>Galeri (URL)</h4>
            {data.images.map((img, index) => (
              <div className="admin-form-grid admin-form-grid--compact" key={index}>
                <label className="admin-field"><span>Görsel URL</span><input type="url" value={img.image_url} onChange={(e) => updateImage(index, 'image_url', e.target.value)} /></label>
                <label className="admin-field"><span>Alt Text</span><input value={img.alt_text} onChange={(e) => updateImage(index, 'alt_text', e.target.value)} /></label>
                <label className="admin-checkbox-field"><input type="checkbox" checked={img.is_cover} onChange={(e) => updateImage(index, 'is_cover', e.target.checked)} /><span>Kapak</span></label>
              </div>
            ))}
            <div className="admin-form-actions">
              <button type="button" className="admin-secondary-button" onClick={() => setData('images', [...data.images, { ...blankImage, sort_order: data.images.length }])}>Galeri Satırı Ekle</button>
              <button type="submit" className="admin-primary-button" disabled={processing}>{processing ? 'Kaydediliyor...' : 'Kaydet'}</button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}

UniversitiesCreate.layout = (page) => <AdminLayout>{page}</AdminLayout>;

export default UniversitiesCreate;
