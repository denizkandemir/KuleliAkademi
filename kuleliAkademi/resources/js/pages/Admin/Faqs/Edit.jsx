import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

function Edit({ item }) {
  const { data, setData, put, processing } = useForm({ page: item.page || '', question: item.question || '', answer: item.answer || '', is_active: Boolean(item.is_active), sort_order: item.sort_order ?? 0 });
  return (<><Head title="SSS Düzenle" /><div className="admin-page-stack"><section className="admin-page-toolbar"><div><p className="admin-page-kicker">SSS Yönetimi</p><h2>Soruyu düzenle</h2></div><Link href="/admin/faqs" className="admin-secondary-button">Geri Dön</Link></section><section className="admin-form-card"><form className="admin-form" onSubmit={(e) => { e.preventDefault(); put(`/admin/faqs/${item.id}`); }}><label className="admin-field"><span>Sayfa</span><input value={data.page} onChange={(e) => setData('page', e.target.value)} /></label><label className="admin-field"><span>Soru</span><input value={data.question} onChange={(e) => setData('question', e.target.value)} required /></label><label className="admin-field"><span>Cevap</span><textarea rows="6" value={data.answer} onChange={(e) => setData('answer', e.target.value)} required /></label><div className="admin-form-actions"><button className="admin-primary-button" disabled={processing}>{processing ? 'Güncelleniyor...' : 'Güncelle'}</button></div></form></section></div></>);
}

Edit.layout = (page) => <AdminLayout>{page}</AdminLayout>;
export default Edit;
