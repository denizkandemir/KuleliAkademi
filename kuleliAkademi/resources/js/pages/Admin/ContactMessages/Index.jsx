import React from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

function ContactMessagesIndex({ messages }) {
  const markAsRead = (message, isRead) => {
    router.put(`/admin/contact-messages/${message.id}`, { is_read: isRead }, { preserveScroll: true });
  };

  const handleDelete = (message) => {
    if (!window.confirm(`"${message.name}" mesajını silmek istediğinize emin misiniz?`)) {
      return;
    }

    router.delete(`/admin/contact-messages/${message.id}`, { preserveScroll: true });
  };

  return (
    <>
      <Head title="Mesajlar" />
      <div className="admin-page-stack">
        <section className="admin-page-toolbar">
          <div>
            <p className="admin-page-kicker">İletişim Mesajları</p>
            <h2>Gelen mesajları takip edin.</h2>
          </div>
        </section>

        <section className="admin-message-grid">
          {messages.length > 0 ? (
            messages.map((message) => (
              <article key={message.id} className={`admin-message-card${message.is_read ? ' is-read' : ''}`}>
                <div className="admin-message-card-header">
                  <div>
                    <strong>{message.name}</strong>
                    <p>{message.email}</p>
                  </div>
                  <span>{new Date(message.created_at).toLocaleDateString('tr-TR')}</span>
                </div>

                <p className="admin-message-body">{message.message}</p>

                <div className="admin-message-meta">
                  <span>{message.phone || 'Telefon yok'}</span>
                  <span>{message.is_read ? 'Okundu' : 'Yeni'}</span>
                </div>

                <div className="admin-action-group">
                  <button type="button" className="admin-text-button" onClick={() => markAsRead(message, !message.is_read)}>
                    {message.is_read ? 'Okunmadı Yap' : 'Okundu Yap'}
                  </button>
                  <button type="button" className="admin-text-button is-danger" onClick={() => handleDelete(message)}>
                    Sil
                  </button>
                </div>
              </article>
            ))
          ) : (
            <div className="admin-empty-state admin-empty-state--card">Henüz mesaj yok.</div>
          )}
        </section>
      </div>
    </>
  );
}

ContactMessagesIndex.layout = (page) => <AdminLayout>{page}</AdminLayout>;

export default ContactMessagesIndex;
