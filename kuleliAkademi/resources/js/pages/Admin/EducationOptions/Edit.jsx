import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

function Edit({ item }) {
  const { data, setData, put, processing } = useForm({ title: item.title || '', slug: item.slug || '', short_description: item.short_description || '', description: item.description || '', image_url: item.image_url || '', country: item.country || '', category: item.category || '', is_active: Boolean(item.is_active), sort_order: item.sort_order ?? 0 });
  return (
    <>
      <Head title="Eğitim Opsiyonu Düzenle" />
      <div className="admin-page-stack"><section className="admin-page-toolbar"><div><p className="admin-page-kicker">Eğitim Opsiyonları</p><h2>Kayıt düzenle</h2></div><Link href="/admin/education-options" className="admin-secondary-button">Geri Dön</Link></section><section className="admin-form-card"><form className="admin-form" onSubmit={(e) => { e.preventDefault(); put(`/admin/education-options/${item.id}`); }}><label className="admin-field"><span>Başlık</span><input value={data.title} onChange={(e) => setData('title', e.target.value)} required /></label><label className="admin-field"><span>Slug</span><input value={data.slug} onChange={(e) => setData('slug', e.target.value)} required /></label><label className="admin-field"><span>Görsel URL</span><input type="url" value={data.image_url} onChange={(e) => setData('image_url', e.target.value)} /></label><div className="admin-form-grid"><label className="admin-field"><span>Ülke</span><input value={data.country} onChange={(e) => setData('country', e.target.value)} /></label><label className="admin-field"><span>Kategori</span><input value={data.category} onChange={(e) => setData('category', e.target.value)} /></label></div><label className="admin-field"><span>Kısa Açıklama</span><textarea rows="3" value={data.short_description} onChange={(e) => setData('short_description', e.target.value)} /></label><label className="admin-field"><span>Açıklama</span><textarea rows="5" value={data.description} onChange={(e) => setData('description', e.target.value)} /></label><div className="admin-form-actions"><button className="admin-primary-button" disabled={processing}>{processing ? 'Güncelleniyor...' : 'Güncelle'}</button></div></form></section></div>
    </>
  );
}

Edit.layout = (page) => <AdminLayout>{page}</AdminLayout>;
export default Edit;
