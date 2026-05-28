import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

function UniversitiesIndex({ universities }) {
  const handleDelete = (item) => {
    if (!window.confirm(`\"${item.name}\" kaydını silmek istiyor musunuz?`)) return;
    router.delete(`/admin/universities/${item.id}`);
  };

  return (
    <>
      <Head title="Üniversiteler" />
      <div className="admin-page-stack">
        <section className="admin-page-toolbar">
          <div>
            <p className="admin-page-kicker">Üniversite Yönetimi</p>
            <h2>DB-first üniversite kayıtları</h2>
          </div>
          <Link href="/admin/universities/create" className="admin-primary-button">Yeni Üniversite</Link>
        </section>

        <section className="admin-table-card">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Üniversite</th>
                <th>Şehir</th>
                <th>Sıra</th>
                <th>Durum</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {universities?.length ? universities.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="admin-service-cell">
                      {item.main_image_url ? <img src={item.main_image_url} alt={item.name} /> : <span className="admin-service-thumb admin-service-thumb--empty">KA</span>}
                      <div>
                        <strong>{item.name}</strong>
                        <small>{item.slug}</small>
                      </div>
                    </div>
                  </td>
                  <td>{item.city || '-'}</td>
                  <td>{item.sort_order}</td>
                  <td><span className={`admin-status-badge${item.is_active ? ' is-active' : ''}`}>{item.is_active ? 'Aktif' : 'Pasif'}</span></td>
                  <td>
                    <div className="admin-action-group">
                      <Link href={`/admin/universities/${item.id}/edit`} className="admin-text-button">Düzenle</Link>
                      <button type="button" onClick={() => handleDelete(item)} className="admin-text-button is-danger">Sil</button>
                    </div>
                  </td>
                </tr>
              )) : <tr><td colSpan="5" className="admin-empty-state">Kayıt yok.</td></tr>}
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
}

UniversitiesIndex.layout = (page) => <AdminLayout>{page}</AdminLayout>;

export default UniversitiesIndex;
