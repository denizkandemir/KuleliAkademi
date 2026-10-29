import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

function ServicesIndex({ services }) {
  const handleDelete = (service) => {
    if (!window.confirm(`"${service.title}" hizmetini silmek istediğinize emin misiniz?`)) {
      return;
    }

    router.delete(`/admin/services/${service.id}`);
  };

  return (
    <>
      <Head title="Hizmetler" />
      <div className="admin-page-stack">
        <section className="admin-page-toolbar">
          <div>
            <p className="admin-page-kicker">Hizmet Yönetimi</p>
            <h2>Aktif hizmetleri buradan yönetin.</h2>
          </div>
          <Link href="/admin/services/create" className="admin-primary-button">
            Yeni Hizmet
          </Link>
        </section>

        <section className="admin-table-card">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Hizmet</th>
                <th>Slug</th>
                <th>Sıra</th>
                <th>Durum</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {services.length > 0 ? (
                services.map((service) => (
                  <tr key={service.id}>
                    <td>
                      <div className="admin-service-cell">
                        {service.cover_image_url ? (
                          <img
                            src={service.cover_image_url}
                            alt={service.title}
                            onError={(event) => {
                              event.currentTarget.style.display = 'none';
                              event.currentTarget.nextElementSibling?.classList.remove('is-hidden');
                            }}
                          />
                        ) : null}
                        <span className={`admin-service-thumb admin-service-thumb--empty${service.cover_image_url ? ' is-hidden' : ''}`}>KA</span>
                        <div>
                          <strong>{service.title}</strong>
                          <small>{service.short_description || 'Kısa açıklama eklenmemiş.'}</small>
                        </div>
                      </div>
                    </td>
                    <td>{service.slug}</td>
                    <td>{service.sort_order}</td>
                    <td>
                      <span className={`admin-status-badge${service.is_active ? ' is-active' : ''}`}>
                        {service.is_active ? 'Aktif' : 'Pasif'}
                      </span>
                    </td>
                    <td>
                      <div className="admin-action-group">
                        <Link href={`/admin/services/${service.id}/edit`} className="admin-text-button">
                          Düzenle
                        </Link>
                        <button type="button" className="admin-text-button is-danger" onClick={() => handleDelete(service)}>
                          Sil
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="admin-empty-state">
                    Henüz hizmet eklenmedi.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
}

ServicesIndex.layout = (page) => <AdminLayout>{page}</AdminLayout>;

export default ServicesIndex;
