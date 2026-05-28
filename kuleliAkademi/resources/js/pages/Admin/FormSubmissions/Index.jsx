import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

function Index({ submissions, statusOptions }) {
  const updateStatus = (id, status) => router.put(`/admin/form-submissions/${id}`, { status, is_read: true });
  return (
    <>
      <Head title="Form Başvuruları" />
      <div className="admin-page-stack"><section className="admin-page-toolbar"><div><p className="admin-page-kicker">Form Başvuruları</p><h2>Gelen form yanıtları</h2></div></section><section className="admin-table-card"><table className="admin-table"><thead><tr><th>Form</th><th>Ad</th><th>Email</th><th>Durum</th><th /></tr></thead><tbody>{submissions?.length ? submissions.map((item) => <tr key={item.id}><td>{item.form?.title || '-'}</td><td>{item.full_name || '-'}</td><td>{item.email || '-'}</td><td><select value={item.status} onChange={(e) => updateStatus(item.id, e.target.value)}>{Object.entries(statusOptions || {}).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></td><td><div className="admin-action-group"><Link href={`/admin/form-submissions/${item.id}`} className="admin-text-button">Detay</Link><button type="button" className="admin-text-button is-danger" onClick={() => router.delete(`/admin/form-submissions/${item.id}`)}>Sil</button></div></td></tr>) : <tr><td colSpan="5" className="admin-empty-state">Kayıt yok.</td></tr>}</tbody></table></section></div>
    </>
  );
}

Index.layout = (page) => <AdminLayout>{page}</AdminLayout>;
export default Index;
