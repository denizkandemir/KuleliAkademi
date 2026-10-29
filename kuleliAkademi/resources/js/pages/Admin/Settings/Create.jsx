import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

function Create() {
  const { data, setData, post, processing } = useForm({ key: '', value: '', type: 'text', group: 'general' });
  return (<><Head title="Yeni Ayar" /><div className="admin-page-stack"><section className="admin-page-toolbar"><div><p className="admin-page-kicker">Site Ayarları</p><h2>Yeni ayar ekle</h2></div><Link href="/admin/settings" className="admin-secondary-button">Geri Dön</Link></section><section className="admin-form-card"><form className="admin-form" onSubmit={(e) => { e.preventDefault(); post('/admin/settings'); }}><label className="admin-field"><span>Key</span><input value={data.key} onChange={(e) => setData('key', e.target.value)} required /></label><div className="admin-form-grid"><label className="admin-field"><span>Type</span><input value={data.type} onChange={(e) => setData('type', e.target.value)} /></label><label className="admin-field"><span>Group</span><input value={data.group} onChange={(e) => setData('group', e.target.value)} /></label></div><label className="admin-field"><span>Value</span><textarea rows="6" value={data.value} onChange={(e) => setData('value', e.target.value)} /></label><div className="admin-form-actions"><button className="admin-primary-button" disabled={processing}>{processing ? 'Kaydediliyor...' : 'Kaydet'}</button></div></form></section></div></>);
}

Create.layout = (page) => <AdminLayout>{page}</AdminLayout>;
export default Create;
