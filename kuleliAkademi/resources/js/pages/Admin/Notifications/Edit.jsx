import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

function Edit({ item }) {
  const { data, setData, put, processing } = useForm({ is_read: Boolean(item.is_read) });
  return (<><Head title="Bildirim Düzenle" /><div className="admin-page-stack"><section className="admin-page-toolbar"><div><p className="admin-page-kicker">Bildirimler</p><h2>Bildirim durumu</h2></div><Link href="/admin/notifications" className="admin-secondary-button">Geri Dön</Link></section><section className="admin-form-card"><form className="admin-form" onSubmit={(e) => { e.preventDefault(); put(`/admin/notifications/${item.id}`); }}><p><strong>{item.title}</strong></p><p>{item.message || '-'}</p><label className="admin-checkbox-field"><input type="checkbox" checked={data.is_read} onChange={(e) => setData('is_read', e.target.checked)} /><span>Okundu</span></label><div className="admin-form-actions"><button className="admin-primary-button" disabled={processing}>{processing ? 'Kaydediliyor...' : 'Kaydet'}</button></div></form></section></div></>);
}

Edit.layout = (page) => <AdminLayout>{page}</AdminLayout>;
export default Edit;
