import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

function Index({ items }) {
  return (
    <>
      <Head title="Eğitim Videoları" />
      <div className="admin-page-stack"><section className="admin-page-toolbar"><div><p className="admin-page-kicker">Eğitim Videoları</p><h2>Video kayıtları</h2></div><Link href="/admin/education-videos/create" className="admin-primary-button">Yeni Video</Link></section><section className="admin-table-card"><table className="admin-table"><thead><tr><th>Başlık</th><th>Kaynak</th><th>Durum</th><th /></tr></thead><tbody>{items?.length ? items.map((item) => <tr key={item.id}><td>{item.title}</td><td>{item.source || '-'}</td><td><span className={`admin-status-badge${item.is_active ? ' is-active' : ''}`}>{item.is_active ? 'Aktif' : 'Pasif'}</span></td><td><div className="admin-action-group"><Link href={`/admin/education-videos/${item.id}/edit`} className="admin-text-button">Düzenle</Link><button type="button" className="admin-text-button is-danger" onClick={() => router.delete(`/admin/education-videos/${item.id}`)}>Sil</button></div></td></tr>) : <tr><td colSpan="4" className="admin-empty-state">Kayıt yok.</td></tr>}</tbody></table></section></div>
    </>
  );
}

Index.layout = (page) => <AdminLayout>{page}</AdminLayout>;
export default Index;
