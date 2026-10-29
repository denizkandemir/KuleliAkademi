import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

function Edit({ form }) {
  const { data, setData, put, processing } = useForm({
    title: form.title || '', slug: form.slug || '', description: form.description || '', is_active: Boolean(form.is_active),
    fields: (form.fields || []).map((f) => ({ id: f.id, label: f.label, name: f.name, type: f.type, placeholder: f.placeholder || '', options: f.options || [], is_required: Boolean(f.is_required), sort_order: f.sort_order || 0 })),
  });

  const updateField = (index, key, value) => {
    const next = [...data.fields];
    next[index] = { ...next[index], [key]: value };
    setData('fields', next);
  };

  return (<><Head title="Form Düzenle" /><div className="admin-page-stack"><section className="admin-page-toolbar"><div><p className="admin-page-kicker">Form Yönetimi</p><h2>Form düzenle</h2></div><Link href="/admin/forms" className="admin-secondary-button">Geri Dön</Link></section><section className="admin-form-card"><form className="admin-form" onSubmit={(e) => { e.preventDefault(); put(`/admin/forms/${form.id}`); }}><label className="admin-field"><span>Başlık</span><input value={data.title} onChange={(e) => setData('title', e.target.value)} required /></label><label className="admin-field"><span>Slug</span><input value={data.slug} onChange={(e) => setData('slug', e.target.value)} required /></label><h4>Alanlar</h4>{data.fields.map((field, index) => <div className="admin-form-grid" key={field.id || index}><label className="admin-field"><span>Label</span><input value={field.label} onChange={(e) => updateField(index, 'label', e.target.value)} /></label><label className="admin-field"><span>Name</span><input value={field.name} onChange={(e) => updateField(index, 'name', e.target.value)} /></label><label className="admin-field"><span>Type</span><input value={field.type} onChange={(e) => updateField(index, 'type', e.target.value)} /></label></div>)}<div className="admin-form-actions"><button className="admin-primary-button" disabled={processing}>{processing ? 'Güncelleniyor...' : 'Güncelle'}</button></div></form></section></div></>);
}

Edit.layout = (page) => <AdminLayout>{page}</AdminLayout>;
export default Edit;
