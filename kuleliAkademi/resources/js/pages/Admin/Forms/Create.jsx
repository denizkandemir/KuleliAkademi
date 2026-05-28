import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { slugify } from '../../../utils/slugify';

const emptyField = { label: '', name: '', type: 'text', placeholder: '', options: [], is_required: false, sort_order: 0 };

function Create() {
  const { data, setData, post, processing } = useForm({ title: '', slug: '', description: '', is_active: true, fields: [emptyField] });
  const [optionInput, setOptionInput] = useState({});

  const updateField = (index, key, value) => {
    const next = [...data.fields];
    next[index] = { ...next[index], [key]: value };
    setData('fields', next);
  };

  const addOption = (index) => {
    const value = (optionInput[index] || '').trim();
    if (!value) return;
    const next = [...data.fields];
    next[index] = { ...next[index], options: [...(next[index].options || []), value] };
    setData('fields', next);
    setOptionInput({ ...optionInput, [index]: '' });
  };

  return (<><Head title="Yeni Form" /><div className="admin-page-stack"><section className="admin-page-toolbar"><div><p className="admin-page-kicker">Form Yönetimi</p><h2>Yeni dinamik form</h2></div><Link href="/admin/forms" className="admin-secondary-button">Geri Dön</Link></section><section className="admin-form-card"><form className="admin-form" onSubmit={(e) => { e.preventDefault(); post('/admin/forms'); }}><label className="admin-field"><span>Başlık</span><input value={data.title} onChange={(e) => { setData('title', e.target.value); setData('slug', slugify(e.target.value)); }} required /></label><label className="admin-field"><span>Slug</span><input value={data.slug} onChange={(e) => setData('slug', e.target.value)} required /></label><label className="admin-field"><span>Açıklama</span><textarea rows="4" value={data.description} onChange={(e) => setData('description', e.target.value)} /></label><h4>Form Alanları</h4>{data.fields.map((field, index) => <div key={index} className="admin-form-card"><div className="admin-form-grid"><label className="admin-field"><span>Label</span><input value={field.label} onChange={(e) => updateField(index, 'label', e.target.value)} required /></label><label className="admin-field"><span>Name</span><input value={field.name} onChange={(e) => updateField(index, 'name', e.target.value)} required /></label><label className="admin-field"><span>Type</span><select value={field.type} onChange={(e) => updateField(index, 'type', e.target.value)}><option value="text">text</option><option value="email">email</option><option value="phone">phone</option><option value="textarea">textarea</option><option value="select">select</option><option value="checkbox">checkbox</option><option value="radio">radio</option><option value="file">file</option></select></label></div><label className="admin-field"><span>Placeholder</span><input value={field.placeholder || ''} onChange={(e) => updateField(index, 'placeholder', e.target.value)} /></label>{['select', 'radio', 'checkbox'].includes(field.type) && <div className="admin-form-grid"><label className="admin-field"><span>Options</span><input value={optionInput[index] || ''} onChange={(e) => setOptionInput({ ...optionInput, [index]: e.target.value })} /></label><button type="button" className="admin-secondary-button" onClick={() => addOption(index)}>Option Ekle</button></div>}<small>{(field.options || []).join(', ')}</small></div>)}<div className="admin-form-actions"><button type="button" className="admin-secondary-button" onClick={() => setData('fields', [...data.fields, { ...emptyField, sort_order: data.fields.length }])}>Alan Ekle</button><button className="admin-primary-button" disabled={processing}>{processing ? 'Kaydediliyor...' : 'Kaydet'}</button></div></form></section></div></>);
}

Create.layout = (page) => <AdminLayout>{page}</AdminLayout>;
export default Create;
