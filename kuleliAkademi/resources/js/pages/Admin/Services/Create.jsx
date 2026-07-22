import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import ServiceForm from './ServiceForm';

function ServicesCreate() {
  return (
    <>
      <Head title="Yeni Hizmet" />
      <div className="admin-page-stack">
        <section className="admin-page-toolbar">
          <div>
            <p className="admin-page-kicker">Hizmet Yönetimi</p>
            <h2>Yeni hizmet oluşturun.</h2>
          </div>
          <Link href="/admin/services" className="admin-secondary-button">
            Geri Dön
          </Link>
        </section>

        <section className="admin-form-card">
          <ServiceForm />
        </section>
      </div>
    </>
  );
}

ServicesCreate.layout = (page) => <AdminLayout>{page}</AdminLayout>;

export default ServicesCreate;
