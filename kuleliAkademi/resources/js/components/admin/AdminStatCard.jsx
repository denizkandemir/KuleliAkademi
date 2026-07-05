import React from 'react';

export default function AdminStatCard({ icon: Icon, label, value, description, accent = 'navy' }) {
  return (
    <article className={`admin-stat-card is-${accent}`}>
      <div className="admin-stat-card-icon-wrap">
        <img src={Icon} alt="" className="stat-card-icon" />
      </div>
      <div className="admin-stat-card-copy">
        <span>{label}</span>
        <strong>{value}</strong>
        {/* {description ? <small>{description}</small> : null} */}
      </div>
    </article>
  );
}
