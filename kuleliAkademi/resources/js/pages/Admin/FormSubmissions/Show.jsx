import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

function Show({ submission }) {
  return (
    <>
      <Head title="Form Başvuru Detayı" />
      <div className="admin-page-stack"><section className="admin-page-toolbar"><div><p className="admin-page-kicker">Form Başvuruları</p><h2>Başvuru detayları</h2></div><Link href="/admin/form-submissions" className="admin-secondary-button">Listeye Dön</Link></section><section className="admin-form-card"><p><strong>Form:</strong> {submission.form?.title || '-'}</p><p><strong>Ad:</strong> {submission.full_name || '-'}</p><p><strong>Email:</strong> {submission.email || '-'}</p><p><strong>Telefon:</strong> {submission.phone || '-'}</p><h4>Cevaplar</h4><ul>{submission.answers?.map((answer) => <li key={answer.id}><strong>{answer.field?.label || answer.field_name}:</strong> {answer.value || '-'}</li>)}</ul></section></div>
    </>
  );
}

Show.layout = (page) => <AdminLayout>{page}</AdminLayout>;
export default Show;
