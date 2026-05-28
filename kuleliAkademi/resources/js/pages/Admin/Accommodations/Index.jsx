import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

function Index({ items }) {
  return (
    <>
      <Head title="Konaklamalar" />
      <div className="admin-page-stack"><section className="admin-page-toolbar"><div><p className="admin-page-kicker">Konaklama Yönetimi</p><h2>Konaklama kayıtları</h2></div><Link href="/admin/accommodations/create" className="admin-primary-button">Yeni Kayıt</Link></section><section className="admin-table-card"><table className="admin-table"><thead><tr><th>Başlık</th><th>Şehir</th><th>Tip</th><th>Fiyat Aralığı</th><th /></tr></thead><tbody>{items?.length ? items.map((item) => <tr key={item.id}><td>{item.title}</td><td>{item.city || '-'}</td><td>{item.type || '-'}</td><td>{item.price_range || '-'}</td><td><div className="admin-action-group"><Link className="admin-text-button" href={`/admin/accommodations/${item.id}/edit`}>Düzenle</Link><button type="button" className="admin-text-button is-danger" onClick={() => router.delete(`/admin/accommodations/${item.id}`)}>Sil</button></div></td></tr>) : <tr><td colSpan="5" className="admin-empty-state">Kayıt yok.</td></tr>}</tbody></table></section></div>
    </>
  );
}

Index.layout = (page) => <AdminLayout>{page}</AdminLayout>;
export default Index;
