import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

function Create() {
  const { data, setData, post, processing } = useForm({ page: '', question: '', answer: '', is_active: true, sort_order: 0 });
  return (<><Head title="Yeni SSS" /><div className="admin-page-stack"><section className="admin-page-toolbar"><div><p className="admin-page-kicker">SSS Yönetimi</p><h2>Yeni soru</h2></div><Link href="/admin/faqs" className="admin-secondary-button">Geri Dön</Link></section><section className="admin-form-card"><form className="admin-form" onSubmit={(e) => { e.preventDefault(); post('/admin/faqs'); }}><label className="admin-field"><span>Sayfa</span><input value={data.page} onChange={(e) => setData('page', e.target.value)} placeholder="contact, universities..." /></label><label className="admin-field"><span>Soru</span><input value={data.question} onChange={(e) => setData('question', e.target.value)} required /></label><label className="admin-field"><span>Cevap</span><textarea rows="6" value={data.answer} onChange={(e) => setData('answer', e.target.value)} required /></label><div className="admin-form-actions"><button className="admin-primary-button" disabled={processing}>{processing ? 'Kaydediliyor...' : 'Kaydet'}</button></div></form></section></div></>);
}

Create.layout = (page) => <AdminLayout>{page}</AdminLayout>;
export default Create;
