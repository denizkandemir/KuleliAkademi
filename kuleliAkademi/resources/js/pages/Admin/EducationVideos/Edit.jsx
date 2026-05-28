import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

function Edit({ item }) {
  const { data, setData, put, processing } = useForm({ title: item.title || '', slug: item.slug || '', description: item.description || '', video_url: item.video_url || '', thumbnail_url: item.thumbnail_url || '', source: item.source || '', is_active: Boolean(item.is_active), sort_order: item.sort_order ?? 0 });
  return (<><Head title="Eğitim Videosu Düzenle" /><div className="admin-page-stack"><section className="admin-page-toolbar"><div><p className="admin-page-kicker">Eğitim Videoları</p><h2>Video düzenle</h2></div><Link href="/admin/education-videos" className="admin-secondary-button">Geri Dön</Link></section><section className="admin-form-card"><form className="admin-form" onSubmit={(e) => { e.preventDefault(); put(`/admin/education-videos/${item.id}`); }}><label className="admin-field"><span>Başlık</span><input value={data.title} onChange={(e) => setData('title', e.target.value)} required /></label><label className="admin-field"><span>Slug</span><input value={data.slug} onChange={(e) => setData('slug', e.target.value)} /></label><label className="admin-field"><span>Video URL</span><input type="url" value={data.video_url} onChange={(e) => setData('video_url', e.target.value)} required /></label><label className="admin-field"><span>Thumbnail URL</span><input type="url" value={data.thumbnail_url} onChange={(e) => setData('thumbnail_url', e.target.value)} /></label><label className="admin-field"><span>Kaynak</span><input value={data.source} onChange={(e) => setData('source', e.target.value)} /></label><label className="admin-field"><span>Açıklama</span><textarea rows="5" value={data.description} onChange={(e) => setData('description', e.target.value)} /></label><div className="admin-form-actions"><button className="admin-primary-button" disabled={processing}>{processing ? 'Güncelleniyor...' : 'Güncelle'}</button></div></form></section></div></>);
}

Edit.layout = (page) => <AdminLayout>{page}</AdminLayout>;
export default Edit;
