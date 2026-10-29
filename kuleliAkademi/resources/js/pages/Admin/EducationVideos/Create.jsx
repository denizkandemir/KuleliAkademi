import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { slugify } from '../../../utils/slugify';

function Create() {
  const { data, setData, post, processing } = useForm({ title: '', slug: '', description: '', video_url: '', thumbnail_url: '', source: '', is_active: true, sort_order: 0 });
  return (<><Head title="Yeni Eğitim Videosu" /><div className="admin-page-stack"><section className="admin-page-toolbar"><div><p className="admin-page-kicker">Eğitim Videoları</p><h2>Yeni video kaydı</h2></div><Link href="/admin/education-videos" className="admin-secondary-button">Geri Dön</Link></section><section className="admin-form-card"><form className="admin-form" onSubmit={(e) => { e.preventDefault(); post('/admin/education-videos'); }}><label className="admin-field"><span>Başlık</span><input value={data.title} onChange={(e) => { setData('title', e.target.value); setData('slug', slugify(e.target.value)); }} required /></label><label className="admin-field"><span>Slug</span><input value={data.slug} onChange={(e) => setData('slug', e.target.value)} /></label><label className="admin-field"><span>Video URL</span><input type="url" value={data.video_url} onChange={(e) => setData('video_url', e.target.value)} required /></label><label className="admin-field"><span>Thumbnail URL</span><input type="url" value={data.thumbnail_url} onChange={(e) => setData('thumbnail_url', e.target.value)} /></label><label className="admin-field"><span>Kaynak</span><input value={data.source} onChange={(e) => setData('source', e.target.value)} /></label><label className="admin-field"><span>Açıklama</span><textarea rows="5" value={data.description} onChange={(e) => setData('description', e.target.value)} /></label><div className="admin-form-actions"><button className="admin-primary-button" disabled={processing}>{processing ? 'Kaydediliyor...' : 'Kaydet'}</button></div></form></section></div></>);
}

Create.layout = (page) => <AdminLayout>{page}</AdminLayout>;
export default Create;
