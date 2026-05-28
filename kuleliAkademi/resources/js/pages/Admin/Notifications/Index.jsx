import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

function Index({ items }) {
  return (
    <>
      <Head title="Bildirimler" />
      <div className="admin-page-stack"><section className="admin-page-toolbar"><div><p className="admin-page-kicker">Bildirimler</p><h2>Admin bildirimleri</h2></div><Link href="/admin/notifications/create" className="admin-primary-button">Yeni Bildirim</Link></section><section className="admin-table-card"><table className="admin-table"><thead><tr><th>Başlık</th><th>Tip</th><th>Durum</th><th /></tr></thead><tbody>{items?.length ? items.map((item) => <tr key={item.id}><td>{item.title}</td><td>{item.type || '-'}</td><td>{item.is_read ? 'Okundu' : 'Yeni'}</td><td><div className="admin-action-group"><Link href={`/admin/notifications/${item.id}/edit`} className="admin-text-button">Düzenle</Link><button type="button" className="admin-text-button" onClick={() => router.put(`/admin/notifications/${item.id}`, { is_read: !item.is_read })}>{item.is_read ? 'Okunmadı Yap' : 'Okundu Yap'}</button><button type="button" className="admin-text-button is-danger" onClick={() => router.delete(`/admin/notifications/${item.id}`)}>Sil</button></div></td></tr>) : <tr><td colSpan="4" className="admin-empty-state">Bildirim yok.</td></tr>}</tbody></table></section></div>
    </>
  );
}

Index.layout = (page) => <AdminLayout>{page}</AdminLayout>;
export default Index;
