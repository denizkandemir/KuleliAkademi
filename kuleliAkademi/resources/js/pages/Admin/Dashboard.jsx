import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';

const cards = [
  { key: 'totalServices', label: 'Toplam Hizmet' },
  { key: 'totalUniversities', label: 'Toplam Üniversite' },
  { key: 'newFormSubmissions', label: 'Yeni Form Başvurusu' },
  { key: 'unreadMessages', label: 'Okunmamış Mesaj' },
  { key: 'unreadNotifications', label: 'Okunmamış Bildirim' },
];

function Dashboard({ stats }) {
  return (
    <>
      <Head title="Admin Dashboard" />
      <div className="admin-page-stack">
        <section className="admin-hero-card">
          <p className="admin-page-kicker">Genel Bakış</p>
          <h2>Yönetim özetini buradan takip edin.</h2>
          <p>
            Hizmetler, üniversiteler, form başvuruları ve bildirimler için temel durum kartları aşağıda yer alıyor.
          </p>
        </section>

        <section className="admin-stats-grid">
          {cards.map((card) => (
            <article key={card.key} className="admin-stat-card">
              <span>{card.label}</span>
              <strong>{stats?.[card.key] ?? 0}</strong>
            </article>
          ))}
        </section>
      </div>
    </>
  );
}

Dashboard.layout = (page) => <AdminLayout>{page}</AdminLayout>;

export default Dashboard;
