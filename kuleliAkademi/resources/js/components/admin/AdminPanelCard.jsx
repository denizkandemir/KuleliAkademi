import React from 'react';

export default function AdminPanelCard({ eyebrow, title, description, action, className = '', children }) {
  return (
    <section className={`admin-panel-card${className ? ` ${className}` : ''}`.trim()}>
      {(eyebrow || title || description || action) ? (
        <header className="admin-panel-card-header">
          <div>
            {eyebrow ? <p className="admin-page-kicker">{eyebrow}</p> : null}
            {title ? <h2>{title}</h2> : null}
            {description ? <p className="admin-panel-card-description">{description}</p> : null}
          </div>
          {action ? <div className="admin-panel-card-action">{action}</div> : null}
        </header>
      ) : null}
      {children}
    </section>
  );
}
