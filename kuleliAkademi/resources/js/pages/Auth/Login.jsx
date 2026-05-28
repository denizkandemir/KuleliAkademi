import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthLayout from '../../Layouts/AuthLayout';

export default function Login() {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const submit = (event) => {
    event.preventDefault();
    post('/login', {
      onFinish: () => reset('password'),
    });
  };

  return (
    <>
      <Head title="Giriş Yap" />
      <AuthLayout title="Admin Girişi" subtitle="Admin paneline erişmek için giriş yapın.">
        <form className="auth-form" onSubmit={submit}>
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
              autoComplete="current-password"
              required
            />
            {errors.password ? <p className="auth-error">{errors.password}</p> : null}
          </label>

          <label className="auth-field" style={{ gridAutoFlow: 'column', justifyContent: 'start', alignItems: 'center' }}>
            <input
              type="checkbox"
              checked={data.remember}
              onChange={(event) => setData('remember', event.target.checked)}
              style={{ width: '18px', height: '18px' }}
            />
            <span>Beni hatırla</span>
          </label>

          <div className="auth-row">
            <button type="submit" className="auth-submit" disabled={processing}>
              {processing ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </button>
            <Link href="/register" className="auth-secondary">
              Kayıt ol
            </Link>
          </div>
        </form>
      </AuthLayout>
    </>
  );
}
