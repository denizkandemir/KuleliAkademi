import React from 'react';

export default function AdminBadge({ tone = 'neutral', children, className = '' }) {
  return <span className={`admin-badge is-${tone}${className ? ` ${className}` : ''}`.trim()}>{children}</span>;
}
