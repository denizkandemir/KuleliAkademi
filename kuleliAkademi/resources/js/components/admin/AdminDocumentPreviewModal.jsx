import React from 'react';
import { FiDownload, FiExternalLink, FiX } from 'react-icons/fi';

export default function AdminDocumentPreviewModal({ document, onClose }) {
  if (!document) {
    return null;
  }

  const isImage = document.previewType === 'image';
  const isPdf = document.previewType === 'pdf';

  return (
    <div className="admin-modal-backdrop" role="presentation" onClick={onClose}>
      <div className="admin-modal" role="dialog" aria-modal="true" aria-labelledby="admin-document-preview-title" onClick={(event) => event.stopPropagation()}>
        <header className="admin-modal-header">
          <div>
            <p className="admin-page-kicker">Belge Önizleme</p>
            <h3 id="admin-document-preview-title">{document.studentName}</h3>
            <p className="admin-modal-subtitle">{document.documentType}</p>
          </div>
          <button type="button" className="admin-icon-button" onClick={onClose} aria-label="Kapat">
            <FiX aria-hidden="true" />
          </button>
        </header>

        <div className="admin-modal-body">
          {isImage && document.previewUrl ? (
            <img src={document.previewUrl} alt={document.documentType} className="admin-modal-media" />
          ) : null}
          {isPdf && document.previewUrl ? (
            <iframe title={document.documentType} src={document.previewUrl} className="admin-modal-media admin-modal-media--frame" />
          ) : null}
          {!isImage && !isPdf ? (
            <div className="admin-modal-placeholder">
              <p>Bu belge için yerleşik önizleme kullanılamıyor.</p>
              <span>İndirme bağlantısı üzerinden inceleyebilirsiniz.</span>
            </div>
          ) : null}
        </div>

        <footer className="admin-modal-footer">
          {document.downloadUrl ? (
            <a href={document.downloadUrl} target="_blank" rel="noreferrer" className="admin-secondary-button">
              <FiDownload aria-hidden="true" />
              İndir
            </a>
          ) : (
            <button type="button" className="admin-secondary-button" disabled>
              <FiExternalLink aria-hidden="true" />
              İndirilemedi
            </button>
          )}
        </footer>
      </div>
    </div>
  );
}
