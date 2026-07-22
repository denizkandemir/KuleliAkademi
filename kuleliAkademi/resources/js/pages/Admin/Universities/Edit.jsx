import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { slugify } from '../../../utils/slugify';

function UniversitiesEdit({ university, countryOptions = [], defaultCountry = 'Polonya' }) {
  const { data, setData, put, processing, errors } = useForm({
    name: university.name || '', slug: university.slug || '', short_name: university.short_name || '', country: university.country || defaultCountry, city: university.city || '', short_description: university.short_description || '', description: university.description || '', website_url: university.website_url || '', application_url: university.application_url || '', main_image_url: university.main_image_url || '', logo_url: university.logo_url || '', tuition_fee: university.tuition_fee || '', currency: university.currency || 'EUR', duration: university.duration || '', language: university.language || '', ranking: university.ranking || '', is_featured: Boolean(university.is_featured), is_active: Boolean(university.is_active), sort_order: university.sort_order ?? 0, images: (university.images || []).map((x) => ({ id: x.id, image_url: x.image_url, alt_text: x.alt_text || '', sort_order: x.sort_order || 0, is_cover: Boolean(x.is_cover) })),
  });
  const [slugTouched, setSlugTouched] = useState(true);

  const updateImage = (index, key, value) => {
    const next = [...data.images];
    next[index] = { ...next[index], [key]: value };
    setData('images', next);
  };

  return (
    <>
      <Head title="Üniversite Düzenle" />
      <div className="admin-page-stack">
        <section className="admin-page-toolbar"><div><p className="admin-page-kicker">Üniversite Yönetimi</p><h2>Üniversiteyi düzenle</h2></div><Link href="/admin/universities" className="admin-secondary-button">Geri Dön</Link></section>
        <section className="admin-form-card">
          <form className="admin-form" onSubmit={(e) => { e.preventDefault(); put(`/admin/universities/${university.id}`); }}>
            <div className="admin-form-grid">
              <label className="admin-field"><span>Ad</span><input value={data.name} onChange={(e) => { setData('name', e.target.value); if (!slugTouched) setData('slug', slugify(e.target.value)); }} required />{errors.name && <small className="admin-field-error">{errors.name}</small>}</label>
              <label className="admin-field"><span>Slug</span><input value={data.slug} onChange={(e) => setData('slug', e.target.value)} required />{errors.slug && <small className="admin-field-error">{errors.slug}</small>}</label>
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
              <div className="admin-form-grid admin-form-grid--compact" key={img.id || index}>
                <label className="admin-field"><span>Görsel URL</span><input type="url" value={img.image_url} onChange={(e) => updateImage(index, 'image_url', e.target.value)} /></label>
                <label className="admin-field"><span>Alt Text</span><input value={img.alt_text} onChange={(e) => updateImage(index, 'alt_text', e.target.value)} /></label>
                <label className="admin-checkbox-field"><input type="checkbox" checked={img.is_cover} onChange={(e) => updateImage(index, 'is_cover', e.target.checked)} /><span>Kapak</span></label>
              </div>
            ))}
            <div className="admin-form-actions">
              <button type="button" className="admin-secondary-button" onClick={() => setData('images', [...data.images, { image_url: '', alt_text: '', sort_order: data.images.length, is_cover: false }])}>Galeri Satırı Ekle</button>
              <button type="submit" className="admin-primary-button" disabled={processing}>{processing ? 'Güncelleniyor...' : 'Güncelle'}</button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}

UniversitiesEdit.layout = (page) => <AdminLayout>{page}</AdminLayout>;

export default UniversitiesEdit;
