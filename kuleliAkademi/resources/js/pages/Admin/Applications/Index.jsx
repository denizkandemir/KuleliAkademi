import React from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

function ApplicationsIndex({ applications, statusOptions }) {
  const handleStatusChange = (application, status) => {
    router.put(`/admin/applications/${application.id}`, { status }, { preserveScroll: true });
  };

  const handleDelete = (application) => {
    if (!window.confirm(`"${application.full_name}" başvurusunu silmek istediğinize emin misiniz?`)) {
      return;
    }

    router.delete(`/admin/applications/${application.id}`, { preserveScroll: true });
  };

  return (
    <>
      <Head title="Başvurular" />
      <div className="admin-page-stack">
        <section className="admin-page-toolbar">
          <div>
            <p className="admin-page-kicker">Başvuru Takibi</p>
            <h2>Gelen başvuruları yönetin.</h2>
          </div>
        </section>

        <section className="admin-table-card">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Ad Soyad</th>
                <th>E-posta</th>
                <th>Telefon</th>
                <th>Hizmet</th>
                <th>Status</th>
                <th>Tarih</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {applications.length > 0 ? (
                applications.map((application) => (
                  <tr key={application.id}>
                    <td>{application.full_name}</td>
                    <td>{application.email}</td>
                    <td>{application.phone || '-'}</td>
                    <td>{application.service?.title || 'Genel'}</td>
                    <td>
                      <select
                        className="admin-select"
                        value={application.status}
                        onChange={(event) => handleStatusChange(application, event.target.value)}
                      >
                        {Object.entries(statusOptions).map(([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>{new Date(application.created_at).toLocaleDateString('tr-TR')}</td>
                    <td>
                      <button type="button" className="admin-text-button is-danger" onClick={() => handleDelete(application)}>
                        Sil
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="admin-empty-state">
                    Henüz başvuru yok.
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

ApplicationsIndex.layout = (page) => <AdminLayout>{page}</AdminLayout>;

export default ApplicationsIndex;
