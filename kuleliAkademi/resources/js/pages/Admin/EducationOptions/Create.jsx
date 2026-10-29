import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { slugify } from '../../../utils/slugify';

function Create() {
  const { data, setData, post, processing, errors } = useForm({ title: '', slug: '', short_description: '', description: '', image_url: '', country: '', category: '', is_active: true, sort_order: 0 });
  return (
    <>
      <Head title="Yeni Eğitim Opsiyonu" />
      <div className="admin-page-stack"><section className="admin-page-toolbar"><div><p className="admin-page-kicker">Eğitim Opsiyonları</p><h2>Yeni opsiyon</h2></div><Link href="/admin/education-options" className="admin-secondary-button">Geri Dön</Link></section><section className="admin-form-card"><form className="admin-form" onSubmit={(e) => { e.preventDefault(); post('/admin/education-options'); }}><label className="admin-field"><span>Başlık</span><input value={data.title} onChange={(e) => { setData('title', e.target.value); setData('slug', slugify(e.target.value)); }} required />{errors.title && <small className="admin-field-error">{errors.title}</small>}</label><label className="admin-field"><span>Slug</span><input value={data.slug} onChange={(e) => setData('slug', e.target.value)} required /></label><label className="admin-field"><span>Görsel URL</span><input type="url" value={data.image_url} onChange={(e) => setData('image_url', e.target.value)} /></label><div className="admin-form-grid"><label className="admin-field"><span>Ülke</span><input value={data.country} onChange={(e) => setData('country', e.target.value)} /></label><label className="admin-field"><span>Kategori</span><input value={data.category} onChange={(e) => setData('category', e.target.value)} /></label></div><label className="admin-field"><span>Kısa Açıklama</span><textarea rows="3" value={data.short_description} onChange={(e) => setData('short_description', e.target.value)} /></label><label className="admin-field"><span>Açıklama</span><textarea rows="5" value={data.description} onChange={(e) => setData('description', e.target.value)} /></label><div className="admin-form-actions"><button className="admin-primary-button" disabled={processing}>{processing ? 'Kaydediliyor...' : 'Kaydet'}</button></div></form></section></div>
    </>
  );
}

Create.layout = (page) => <AdminLayout>{page}</AdminLayout>;
export default Create;
