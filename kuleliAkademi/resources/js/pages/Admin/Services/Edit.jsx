import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import ServiceForm from './ServiceForm';

function ServicesEdit({ service }) {
  return (
    <>
      <Head title="Hizmet Düzenle" />
      <div className="admin-page-stack">
        <section className="admin-page-toolbar">
          <div>
            <p className="admin-page-kicker">Hizmet Yönetimi</p>
            <h2>Hizmeti düzenleyin.</h2>
          </div>
          <Link href="/admin/services" className="admin-secondary-button">
            Geri Dön
          </Link>
        </section>

        <section className="admin-form-card">
          <ServiceForm service={service} />
        </section>
      </div>
    </>
  );
}

ServicesEdit.layout = (page) => <AdminLayout>{page}</AdminLayout>;

export default ServicesEdit;
