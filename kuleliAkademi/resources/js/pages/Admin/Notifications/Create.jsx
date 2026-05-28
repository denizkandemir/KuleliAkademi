import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

function Create() {
  const { data, setData, post, processing } = useForm({ title: '', message: '', type: '' });
  return (<><Head title="Yeni Bildirim" /><div className="admin-page-stack"><section className="admin-page-toolbar"><div><p className="admin-page-kicker">Bildirimler</p><h2>Yeni bildirim ekle</h2></div><Link href="/admin/notifications" className="admin-secondary-button">Geri Dön</Link></section><section className="admin-form-card"><form className="admin-form" onSubmit={(e) => { e.preventDefault(); post('/admin/notifications'); }}><label className="admin-field"><span>Başlık</span><input value={data.title} onChange={(e) => setData('title', e.target.value)} required /></label><label className="admin-field"><span>Tip</span><input value={data.type} onChange={(e) => setData('type', e.target.value)} /></label><label className="admin-field"><span>Mesaj</span><textarea rows="5" value={data.message} onChange={(e) => setData('message', e.target.value)} /></label><div className="admin-form-actions"><button className="admin-primary-button" disabled={processing}>{processing ? 'Kaydediliyor...' : 'Kaydet'}</button></div></form></section></div></>);
}

Create.layout = (page) => <AdminLayout>{page}</AdminLayout>;
export default Create;
