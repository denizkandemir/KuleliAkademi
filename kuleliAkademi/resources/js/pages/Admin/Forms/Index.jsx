import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

function Index({ forms }) {
  return (
    <>
      <Head title="Formlar" />
      <div className="admin-page-stack"><section className="admin-page-toolbar"><div><p className="admin-page-kicker">Form Yönetimi</p><h2>Dinamik form tanımları</h2></div><Link href="/admin/forms/create" className="admin-primary-button">Yeni Form</Link></section><section className="admin-table-card"><table className="admin-table"><thead><tr><th>Başlık</th><th>Slug</th><th>Field</th><th>Submission</th><th /></tr></thead><tbody>{forms?.length ? forms.map((item) => <tr key={item.id}><td>{item.title}</td><td>{item.slug}</td><td>{item.fields_count}</td><td>{item.submissions_count}</td><td><div className="admin-action-group"><Link href={`/admin/forms/${item.id}/edit`} className="admin-text-button">Düzenle</Link><button type="button" className="admin-text-button is-danger" onClick={() => router.delete(`/admin/forms/${item.id}`)}>Sil</button></div></td></tr>) : <tr><td colSpan="5" className="admin-empty-state">Kayıt yok.</td></tr>}</tbody></table></section></div>
    </>
  );
}

Index.layout = (page) => <AdminLayout>{page}</AdminLayout>;
export default Index;
