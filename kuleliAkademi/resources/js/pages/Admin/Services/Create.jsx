import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

const slugify = (value) =>
  value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

function ServicesCreate() {
  const { data, setData, post, processing, errors, reset } = useForm({
    title: '',
    slug: '',
    short_description: '',
    description: '',
    image_url: '',
    is_active: true,
    sort_order: 0,
  });
  const [slugTouched, setSlugTouched] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    post('/admin/services', {
      onSuccess: () => {
        reset();
        setSlugTouched(false);
      },
    });
  };

  const handleTitleChange = (value) => {
    setData('title', value);
    if (!slugTouched) {
      setData('slug', slugify(value));
    }
  };

  return (
    <>
      <Head title="Yeni Hizmet" />
      <div className="admin-page-stack">
        <section className="admin-page-toolbar">
          <div>
            <p className="admin-page-kicker">Hizmet Yönetimi</p>
            <h2>Yeni hizmet oluşturun.</h2>
          </div>
          <Link href="/admin/services" className="admin-secondary-button">
            Geri Dön
          </Link>
        </section>

        <section className="admin-form-card">
          <form className="admin-form" onSubmit={handleSubmit}>
            <div className="admin-form-grid">
              <label className="admin-field">
                <span>Başlık</span>
                <input type="text" value={data.title} onChange={(event) => handleTitleChange(event.target.value)} required />
                {errors.title ? <small className="admin-field-error">{errors.title}</small> : null}
              </label>

              <label className="admin-field">
                <span>Slug</span>
                <input
                  type="text"
                  value={data.slug}
                  onChange={(event) => {
                    setSlugTouched(true);
                    setData('slug', event.target.value);
                  }}
                  placeholder="title-from-auto-slug"
                />
                {errors.slug ? <small className="admin-field-error">{errors.slug}</small> : null}
              </label>
            </div>

            <div className="admin-form-grid">
              <label className="admin-field">
                <span>Kısa Açıklama</span>
                <textarea value={data.short_description} onChange={(event) => setData('short_description', event.target.value)} rows="4" />
                {errors.short_description ? <small className="admin-field-error">{errors.short_description}</small> : null}
              </label>

              <label className="admin-field">
                <span>Açıklama</span>
                <textarea value={data.description} onChange={(event) => setData('description', event.target.value)} rows="4" />
                {errors.description ? <small className="admin-field-error">{errors.description}</small> : null}
              </label>
            </div>

            <div className="admin-form-grid admin-form-grid--compact">
              <label className="admin-field">
                <span>Görsel URL</span>
                <input type="url" value={data.image_url} onChange={(event) => setData('image_url', event.target.value)} placeholder="https://res.cloudinary.com/..." />
                {errors.image_url ? <small className="admin-field-error">{errors.image_url}</small> : null}
              </label>

              <label className="admin-field">
                <span>Sıra</span>
                <input type="number" value={data.sort_order} onChange={(event) => setData('sort_order', event.target.value)} />
                {errors.sort_order ? <small className="admin-field-error">{errors.sort_order}</small> : null}
              </label>

              <label className="admin-checkbox-field">
                <input type="checkbox" checked={data.is_active} onChange={(event) => setData('is_active', event.target.checked)} />
                <span>Aktif</span>
              </label>
            </div>

            {data.image_url ? <img src={data.image_url} alt="Önizleme" className="admin-image-preview" /> : null}

            <div className="admin-form-actions">
              <button type="submit" className="admin-primary-button" disabled={processing}>
                {processing ? 'Kaydediliyor...' : 'Kaydet'}
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}

ServicesCreate.layout = (page) => <AdminLayout>{page}</AdminLayout>;

export default ServicesCreate;
