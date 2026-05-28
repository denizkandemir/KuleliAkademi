import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

function Index({ items }) {
  const destroy = (id) => router.delete(`/admin/education-options/${id}`);

  return (
    <>
      <Head title="Yurt Dışı Eğitim Opsiyonları" />
      <div className="admin-page-stack">
        <section className="admin-page-toolbar"><div><p className="admin-page-kicker">Eğitim Opsiyonları</p><h2>Yurt dışı eğitim kartları</h2></div><Link href="/admin/education-options/create" className="admin-primary-button">Yeni Opsiyon</Link></section>
        <section className="admin-table-card"><table className="admin-table"><thead><tr><th>Başlık</th><th>Ülke</th><th>Kategori</th><th>Durum</th><th /></tr></thead><tbody>{items?.length ? items.map((item) => <tr key={item.id}><td>{item.title}</td><td>{item.country || '-'}</td><td>{item.category || '-'}</td><td><span className={`admin-status-badge${item.is_active ? ' is-active' : ''}`}>{item.is_active ? 'Aktif' : 'Pasif'}</span></td><td><div className="admin-action-group"><Link className="admin-text-button" href={`/admin/education-options/${item.id}/edit`}>Düzenle</Link><button className="admin-text-button is-danger" type="button" onClick={() => destroy(item.id)}>Sil</button></div></td></tr>) : <tr><td colSpan="5" className="admin-empty-state">Kayıt yok.</td></tr>}</tbody></table></section>
      </div>
    </>
  );
}

Index.layout = (page) => <AdminLayout>{page}</AdminLayout>;
export default Index;
