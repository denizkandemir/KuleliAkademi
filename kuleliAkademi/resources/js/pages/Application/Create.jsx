import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import Layout from '../../Layout';
import './Application.scss';

function ApplicationCreate({ services }) {
  const { data, setData, post, processing, errors, recentlySuccessful, reset } = useForm({
    service_id: '',
    full_name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    post('/basvuru', {
      preserveScroll: true,
      onSuccess: () => reset('phone', 'message'),
    });
  };

  return (
    <div className="application-page">
      <Head title="Başvuru Yap" />
      <div className="application-shell">
        <section className="application-hero">
          <p className="application-kicker">Başvuru Formu</p>
          <h1>Hizmet başvurusunu hızlıca gönderin.</h1>
          <p>
            İlgilendiğiniz hizmeti seçin, iletişim bilgilerinizi bırakın. En kısa sürede size dönüş yapılsın.
          </p>
        </section>

        <section className="application-card">
          {recentlySuccessful ? <p className="application-success">Başvurunuz alındı.</p> : null}
          <form className="application-form" onSubmit={handleSubmit}>
            <div className="application-grid">
              <label className="application-field">
                <span>Hizmet</span>
                <select value={data.service_id} onChange={(event) => setData('service_id', event.target.value)}>
                  <option value="">Genel başvuru</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.title}
                    </option>
                  ))}
                </select>
                {errors.service_id ? <small className="application-error">{errors.service_id}</small> : null}
              </label>

              <label className="application-field">
                <span>Ad Soyad</span>
                <input type="text" value={data.full_name} onChange={(event) => setData('full_name', event.target.value)} required />
                {errors.full_name ? <small className="application-error">{errors.full_name}</small> : null}
              </label>
            </div>

            <div className="application-grid">
              <label className="application-field">
                <span>E-posta</span>
                <input type="email" value={data.email} onChange={(event) => setData('email', event.target.value)} required />
                {errors.email ? <small className="application-error">{errors.email}</small> : null}
              </label>

              <label className="application-field">
                <span>Telefon</span>
                <input type="tel" value={data.phone} onChange={(event) => setData('phone', event.target.value)} />
                {errors.phone ? <small className="application-error">{errors.phone}</small> : null}
              </label>
            </div>

            <label className="application-field application-message">
              <span>Mesaj</span>
              <textarea
                value={data.message}
                onChange={(event) => setData('message', event.target.value)}
                placeholder="Kısaca ihtiyacınızı yazın"
              />
              {errors.message ? <small className="application-error">{errors.message}</small> : null}
            </label>

            <div className="application-actions">
              <button type="submit" className="application-button" disabled={processing}>
                {processing ? 'Gönderiliyor...' : 'Başvuruyu Gönder'}
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

ApplicationCreate.layout = (page) => <Layout>{page}</Layout>;

export default ApplicationCreate;
