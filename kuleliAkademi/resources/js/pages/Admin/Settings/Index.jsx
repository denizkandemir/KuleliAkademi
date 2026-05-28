import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

function SettingsIndex({ items }) {
  return (
    <>
      <Head title="Site Ayarları" />
      <div className="admin-page-stack">
        <section className="admin-page-toolbar">
          <div>
            <p className="admin-page-kicker">Site Ayarları</p>
            <h2>Key-value ayar kayıtları</h2>
          </div>
          <Link href="/admin/settings/create" className="admin-primary-button">Yeni Ayar</Link>
        </section>

        <section className="admin-table-card">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Key</th>
                <th>Type</th>
                <th>Group</th>
                <th>Value</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {items?.length ? items.map((item) => (
                <tr key={item.id}>
                  <td>{item.key}</td>
                  <td>{item.type || '-'}</td>
                  <td>{item.group || '-'}</td>
                  <td>{item.value ? String(item.value).slice(0, 80) : '-'}</td>
                  <td>
                    <div className="admin-action-group">
                      <Link href={`/admin/settings/${item.id}/edit`} className="admin-text-button">Düzenle</Link>
                      <button type="button" className="admin-text-button is-danger" onClick={() => router.delete(`/admin/settings/${item.id}`)}>
                        Sil
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="admin-empty-state">Ayar kaydı bulunmuyor.</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
}

SettingsIndex.layout = (page) => <AdminLayout>{page}</AdminLayout>;

export default SettingsIndex;
