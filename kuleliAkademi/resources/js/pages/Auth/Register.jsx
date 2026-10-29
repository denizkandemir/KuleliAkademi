import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthLayout from '../../Layouts/AuthLayout';

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const submit = (event) => {
    event.preventDefault();
    post('/register', {
      onFinish: () => reset('password', 'password_confirmation'),
    });
  };

  return (
    <>
      <Head title="Kayıt Ol" />
      <AuthLayout title="Kullanıcı Kaydı" subtitle="Normal kullanıcı kaydı herkese açık kalır; adminler seed ile oluşturulur.">
        <form className="auth-form" onSubmit={submit}>
          <label className="auth-field">
            <span>Ad Soyad</span>
            <input
              type="text"
              value={data.name}
              onChange={(event) => setData('name', event.target.value)}
              autoComplete="name"
              required
            />
            {errors.name ? <p className="auth-error">{errors.name}</p> : null}
          </label>

          <label className="auth-field">
            <span>E-posta</span>
            <input
              type="email"
              value={data.email}
              onChange={(event) => setData('email', event.target.value)}
              autoComplete="email"
              required
            />
            {errors.email ? <p className="auth-error">{errors.email}</p> : null}
          </label>

          <label className="auth-field">
            <span>Şifre</span>
            <input
              type="password"
              value={data.password}
              onChange={(event) => setData('password', event.target.value)}
              autoComplete="new-password"
              required
            />
            {errors.password ? <p className="auth-error">{errors.password}</p> : null}
          </label>

          <label className="auth-field">
            <span>Şifre Tekrarı</span>
            <input
              type="password"
              value={data.password_confirmation}
              onChange={(event) => setData('password_confirmation', event.target.value)}
              autoComplete="new-password"
              required
            />
          </label>

          <div className="auth-row">
            <button type="submit" className="auth-submit" disabled={processing}>
              {processing ? 'Kayıt oluşturuluyor...' : 'Kayıt Ol'}
            </button>
            <Link href="/login" className="auth-secondary">
              Giriş yap
            </Link>
          </div>
        </form>
      </AuthLayout>
    </>
  );
}
