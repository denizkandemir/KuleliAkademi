import React, { useMemo, useState } from 'react';
import { Head } from '@inertiajs/react';
import { FiFileText, FiImage, FiSearch, FiDownload, FiEye } from 'react-icons/fi';
import AdminBadge from '../../../components/admin/AdminBadge';
import AdminLayout from '../../../Layouts/AdminLayout';
import AdminDocumentPreviewModal from '../../../components/admin/AdminDocumentPreviewModal';

function DocumentsIndex({ documents = [], documentTypeOptions = {}, documentStatusOptions = {} }) {
  const [studentQuery, setStudentQuery] = useState('');
  const [documentType, setDocumentType] = useState('all');
  const [status, setStatus] = useState('all');
  const [activeDocument, setActiveDocument] = useState(null);

  const filteredDocuments = useMemo(
    () =>
      documents.filter((document) => {
        const matchesStudent = document.student_name.toLowerCase().includes(studentQuery.trim().toLowerCase());
        const matchesType = documentType === 'all' || document.document_type_key === documentType;
        const matchesStatus = status === 'all' || document.status === status;

        return matchesStudent && matchesType && matchesStatus;
      }),
    [documentType, documents, status, studentQuery],
  );

  return (
    <>
      <Head title="Belgeler" />

      <div className="admin-page-stack">
        <section className="admin-hero-card">
          <p className="admin-page-kicker">Belge Yönetimi</p>
          <h1>Yüklenen dosyaları filtreleyin, önizleyin ve indirin.</h1>
          <p>
            Öğrenci adına, belge tipine ve durumuna göre hızlı filtreleme yapın. PDF dosyaları doğrudan önizlenir, görseller ise modal içinde açılır.
          </p>
        </section>

        <section className="admin-panel-card">
          <header className="admin-panel-card-header">
            <div className="admin-panel-card-copy">
              <p className="admin-panel-eyebrow">Filtreler</p>
              <h3 className="admin-panel-title">Belge havuzunu daraltın</h3>
            </div>
            <div className="admin-panel-action">
              <AdminBadge tone="gold">{filteredDocuments.length} kayıt</AdminBadge>
            </div>
          </header>

          <div className="admin-form-grid admin-form-grid--compact">
            <label className="admin-field">
              <span>Öğrenci adına göre</span>
              <div className="admin-input-with-icon">
                <FiSearch aria-hidden="true" />
                <input type="search" value={studentQuery} onChange={(event) => setStudentQuery(event.target.value)} placeholder="Ara..." />
              </div>
            </label>

            <label className="admin-field">
              <span>Belge türü</span>
              <select value={documentType} onChange={(event) => setDocumentType(event.target.value)}>
                {Object.entries(documentTypeOptions).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>

            <label className="admin-field">
              <span>Durum</span>
              <select value={status} onChange={(event) => setStatus(event.target.value)}>
                {Object.entries(documentStatusOptions).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </section>

        <section className="admin-table-card">
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Öğrenci</th>
                  <th>Belge Türü</th>
                  <th>Tarih</th>
                  <th>Önizleme</th>
                  <th>İndir</th>
                  <th>Durum</th>
                </tr>
              </thead>
              <tbody>
                {filteredDocuments.length > 0 ? (
                  filteredDocuments.map((document) => (
                    <tr key={document.id}>
                      <td>
                        <div className="admin-service-cell">
                          <span className="admin-service-thumb admin-service-thumb--empty">
                            {document.preview_kind === 'image' ? <FiImage aria-hidden="true" /> : <FiFileText aria-hidden="true" />}
                          </span>
                          <div>
                            <strong>{document.student_name}</strong>
                            <small>{document.form_title || 'Form Başvurusu'}</small>
                          </div>
                        </div>
                      </td>
                      <td>{document.document_type}</td>
                      <td>{document.submitted_at}</td>
                      <td>
                        <button type="button" className="admin-text-button" disabled={!document.preview_url} onClick={() => setActiveDocument(document)}>
                          <FiEye aria-hidden="true" />
                          Önizle
                        </button>
                      </td>
                      <td>
                        {document.download_url ? (
                          <a href={document.download_url} target="_blank" rel="noreferrer" className="admin-text-button">
                            <FiDownload aria-hidden="true" />
                            İndir
                          </a>
                        ) : (
                          <button type="button" className="admin-text-button" disabled>
                            <FiDownload aria-hidden="true" />
                            Yok
                          </button>
                        )}
                      </td>
                      <td>
                        <AdminBadge tone={document.status === 'approved' ? 'success' : document.status === 'reviewing' ? 'info' : document.status === 'missing' ? 'danger' : 'warning'}>
                          {document.status_label}
                        </AdminBadge>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="admin-empty-state">
                      Eşleşen belge bulunamadı.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <AdminDocumentPreviewModal document={activeDocument} onClose={() => setActiveDocument(null)} />
    </>
  );
}

DocumentsIndex.layout = (page) => <AdminLayout>{page}</AdminLayout>;

export default DocumentsIndex;