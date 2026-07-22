import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

function UniversitiesIndex({ universities, countryOptions = [], selectedCountry = null }) {
  const activeCountry = countryOptions.find((option) => option.value === selectedCountry);

  const handleDelete = (item) => {
    if (!window.confirm(`\"${item.name}\" kaydını silmek istiyor musunuz?`)) return;
    router.delete(`/admin/universities/${item.id}`);
  };

  const handleCountryChange = (event) => {
    const nextCountry = event.target.value;

    router.get(
      '/admin/universities',
      nextCountry ? { country: nextCountry } : {},
      {
        preserveScroll: true,
        replace: true,
      }
    );
  };

  return (
    <>
      <Head title="Üniversiteler" />
      <div className="admin-page-stack">
        <section className="admin-page-toolbar">
          <div>
            <p className="admin-page-kicker">Üniversite Yönetimi</p>
            <h2>{selectedCountry ? `${activeCountry?.label || 'Seçili ülke'} üniversiteleri` : 'Tüm üniversite kayıtları'}</h2>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <label className="admin-field" style={{ minWidth: '220px' }}>
              <span>Ülke Filtresi</span>
              <select value={selectedCountry || ''} onChange={handleCountryChange}>
                <option value="">Tüm Ülkeler</option>
                {countryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label} ({option.count})
                  </option>
                ))}
              </select>
            </label>
            <Link href="/admin/universities/create" className="admin-primary-button">Yeni Üniversite</Link>
          </div>
        </section>

        <section className="admin-table-card">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Üniversite</th>
                <th>Ülke</th>
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
                  <td>{item.country || '-'}</td>
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
              )) : <tr><td colSpan="6" className="admin-empty-state">Kayıt yok.</td></tr>}
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
}

UniversitiesIndex.layout = (page) => <AdminLayout>{page}</AdminLayout>;

export default UniversitiesIndex;
