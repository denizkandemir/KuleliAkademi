import React from 'react';
import { Head } from '@inertiajs/react';
import { FiBell, FiBookOpen, FiFileText, FiGlobe, FiInbox, FiMail, FiPlus } from 'react-icons/fi';
import AdminBadge from '../../components/admin/AdminBadge';
import AdminLayout from '../../Layouts/AdminLayout';
import AdminPanelCard from '../../components/admin/AdminPanelCard';
import AdminStatCard from '../../components/admin/AdminStatCard';
import universityIcon from '../../assets/icons/university2.png';
import applyIcon from '../../assets/icons/application.png';
import messageIcon from '../../assets/icons/new-email.png';
import notificationIcon from '../../assets/icons/notification.png';


const statCards = [
  { key: 'totalUniversities', label: 'Toplam Üniversite', description: 'Aktif üniversite kaydı', icon: universityIcon, accent: 'gold' },
  { key: 'newFormSubmissions', label: 'Yeni Form Başvurusu', description: 'Son 30 gün içinde', icon: applyIcon, accent: 'navy' },
  { key: 'unreadMessages', label: 'Okunmamış Mesaj', description: 'Toplam yeni mesaj', icon: messageIcon, accent: 'navy-soft' },
  { key: 'unreadNotifications', label: 'Okunmamış Bildirim', description: 'Toplam bildirim', icon: notificationIcon, accent: 'cream' },
];

function Dashboard({
  stats = {},
  recentApplications = [],
  recentDocuments = [],
  todaySummary = [],
  universityDistribution = [],
}) {
  const topCountry = universityDistribution[0] || { label: 'Polonya', value: 0, percent: 0 };
  const distributionPercent = topCountry.percent ?? 0;
  const distributionTitle = universityDistribution.length > 0 ? `${topCountry.label} %${topCountry.percent}` : 'Üniversite Dağılımı';

  return (
    <>
      <Head title="Yönetim Merkezi" />

      <div className="admin-page-stack admin-dashboard-page">
      

        <section className="admin-stats-grid admin-stats-grid--hero">
          {statCards.map((card) => (
            <AdminStatCard
              key={card.key}
              icon={card.icon}
              label={card.label}
              value={stats?.[card.key] ?? 0}
              description={card.description}
              tone={card.accent}
            />
          ))}
        </section>

        <div className="admin-dashboard-grid">
          <div className="admin-dashboard-column admin-dashboard-column--wide">
            <AdminPanelCard
              eyebrow="Başvurular"
              title="Son Başvurular"
              action={<button type="button" className="admin-secondary-button">Tümünü Gör</button>}
            >
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Ad Soyad</th>
                      <th>E-Posta</th>
                      <th>Program</th>
                      <th>Tarih</th>
                      <th>Durum</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentApplications.length > 0 ? (
                      recentApplications.map((application) => (
                        <tr key={application.id}>
                          <td>{application.name}</td>
                          <td>{application.email}</td>
                          <td>{application.program}</td>
                          <td>{application.submitted_at}</td>
                          <td>
                            <AdminBadge tone={application.status_tone}>{application.status_label}</AdminBadge>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="admin-empty-state">
                          Henüz yeni başvuru yok.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </AdminPanelCard>

            <div className="admin-dashboard-bottom-grid">
              <AdminPanelCard eyebrow="Üniversite Dağılımı" title={distributionTitle}>
                <div className="admin-chart-card">
                  <div className="admin-donut" style={{ '--donut-angle': `${distributionPercent}%` }}>
                    <div className="admin-donut-center">
                      <strong>{stats?.totalUniversities ?? 0}</strong>
                      <span>Toplam</span>
                    </div>
                  </div>

                  <div className="admin-chart-legend">
                    {universityDistribution.length > 0 ? (
                      universityDistribution.map((item) => (
                        <div className="admin-chart-row" key={item.slug || item.label}>
                          <span className="admin-chart-dot" />
                          <strong>{item.label}</strong>
                          <span>{item.value}</span>
                          <span>{item.percent}%</span>
                        </div>
                      ))
                    ) : (
                      <p className="admin-chart-note">
                        Henüz üniversite kaydı bulunmuyor.
                      </p>
                    )}

                    <p className="admin-chart-note">
                      Üniversite kayıtları ülke bazında otomatik olarak gruplanır ve yeni kayıtlar eklendikçe dağılım güncellenir.
                    </p>
                  </div>
                </div>
              </AdminPanelCard>

            
            </div>
          </div>

          <div className="admin-dashboard-column admin-dashboard-column--side">
            <AdminPanelCard
              eyebrow="Belge Yönetimi"
              title="Belge Yüklemeleri"
              action={<button type="button" className="admin-text-button">Tüm Belgeler</button>}
            >
              <div className="admin-document-list">
                {recentDocuments.length > 0 ? (
                  recentDocuments.map((document) => (
                    <article key={document.id} className="admin-document-item">
                      <div className="admin-document-icon">
                        {document.preview_kind === 'pdf' ? <FiFileText aria-hidden="true" /> : <FiBookOpen aria-hidden="true" />}
                      </div>
                      <div className="admin-document-copy">
                        <strong>{document.student_name}</strong>
                        <span>{document.document_type}</span>
                        <small>{document.submitted_at}</small>
                      </div>
                      <button type="button" className="admin-secondary-button admin-document-download">
                        İndir
                      </button>
                    </article>
                  ))
                ) : (
                  <div className="admin-empty-state admin-empty-state--card">
                    <strong>Henüz belge yüklenmedi.</strong>
                    <p>Formlarda belge alanı doldukça yüklemeler burada listelenecek.</p>
                  </div>
                )}
              </div>
            </AdminPanelCard>

            <AdminPanelCard eyebrow="Hızlı İşlemler" title="Premium Kısayollar">
              <div className="admin-quick-actions">
                {['Yeni Üniversite Ekle', 'Yeni Hizmet Ekle', 'Blog Yazısı Ekle', 'Eğitim Videosu Ekle', 'Duyuru Ekle'].map((label) => (
                  <button key={label} type="button" className="admin-quick-action-button">
                    <FiPlus aria-hidden="true" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </AdminPanelCard>

            <AdminPanelCard eyebrow="Güncel Durum" title="Bugünkü Özet Kartı">
              <ul className="admin-summary-list admin-summary-list--compact">
                <li>
                  <span>Yeni Başvurular</span>
                  <strong>{stats?.newApplications ?? 0}</strong>
                </li>
                <li>
                  <span>İncelenen Başvurular</span>
                  <strong>{stats?.reviewingApplications ?? 0}</strong>
                </li>
                <li>
                  <span>Tamamlanan Başvurular</span>
                  <strong>{stats?.completedApplications ?? 0}</strong>
                </li>
                <li>
                  <span>Yüklenen Belgeler</span>
                  <strong>{stats?.totalDocuments ?? 0}</strong>
                </li>
                <li>
                  <span>Yeni Mesajlar</span>
                  <strong>{stats?.unreadMessages ?? 0}</strong>
                </li>
              </ul>
            </AdminPanelCard>
          </div>
        </div>
      </div>
    </>
  );
}

Dashboard.layout = (page) => <AdminLayout>{page}</AdminLayout>;

export default Dashboard;
