import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

function Edit({ item }) {
  const { data, setData, put, processing } = useForm({ key: item.key || '', value: item.value || '', type: item.type || 'text', group: item.group || 'general' });
  return (<><Head title="Ayar Düzenle" /><div className="admin-page-stack"><section className="admin-page-toolbar"><div><p className="admin-page-kicker">Site Ayarları</p><h2>Ayar düzenle</h2></div><Link href="/admin/settings" className="admin-secondary-button">Geri Dön</Link></section><section className="admin-form-card"><form className="admin-form" onSubmit={(e) => { e.preventDefault(); put(`/admin/settings/${item.id}`); }}><label className="admin-field"><span>Key</span><input value={data.key} onChange={(e) => setData('key', e.target.value)} required /></label><div className="admin-form-grid"><label className="admin-field"><span>Type</span><input value={data.type} onChange={(e) => setData('type', e.target.value)} /></label><label className="admin-field"><span>Group</span><input value={data.group} onChange={(e) => setData('group', e.target.value)} /></label></div><label className="admin-field"><span>Value</span><textarea rows="6" value={data.value} onChange={(e) => setData('value', e.target.value)} /></label><div className="admin-form-actions"><button className="admin-primary-button" disabled={processing}>{processing ? 'Güncelleniyor...' : 'Güncelle'}</button></div></form></section></div></>);
}

Edit.layout = (page) => <AdminLayout>{page}</AdminLayout>;
export default Edit;
