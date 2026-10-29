import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { slugify } from '../../../utils/slugify';
import { contactConfig } from '../../../config/contactConfig';

const IMAGE_TYPES = [
  { key: 'homepage', label: 'Ana Sayfa Kartı Görseli' },
  { key: 'banner', label: 'Banner Görseli' },
  { key: 'detail', label: 'Detay Görseli' },
  { key: 'sidebar_widget', label: 'Sidebar Widget Görseli' },
  { key: 'cta', label: 'CTA Kart Görseli' },
];

const TABS = [
  { key: 'general', label: 'Genel Bilgiler' },
  { key: 'images', label: 'Görseller' },
  { key: 'intro', label: 'Giriş İçeriği' },
  { key: 'highlights', label: 'Öne Çıkanlar' },
  { key: 'process', label: 'Başvuru Süreci' },
  { key: 'requirements', label: 'Gerekli Evraklar' },
  { key: 'sidebar', label: 'Sidebar ve CTA' },
];

const blankImageState = () => ({ file: null, alt_text: '', object_position: '', remove: false, existingUrl: null });

const buildInitialImages = (service) =>
  IMAGE_TYPES.reduce((acc, { key }) => {
    const existing = service?.images?.[key];
    acc[key] = {
      file: null,
      alt_text: existing?.alt_text || '',
      object_position: existing?.object_position || '',
      remove: false,
      existingUrl: existing?.url || null,
    };
    return acc;
  }, {});

const tabHasError = (errors, prefixes) => prefixes.some((prefix) => Object.keys(errors).some((key) => key.startsWith(prefix)));

function RepeatableTextList({ items, onAdd, onRemove, onMove, onChange, addLabel, placeholder, errors, fieldName, maxLength }) {
  return (
    <div className="admin-repeatable-list">
      {items.map((item, index) => (
        <div className="admin-repeatable-row" key={item.id ?? `new-${index}`}>
          <span className="admin-repeatable-index">{String(index + 1).padStart(2, '0')}</span>
          <div className="admin-repeatable-row-field">
            <textarea
              rows="2"
              value={item.content}
              maxLength={maxLength}
              placeholder={placeholder}
              onChange={(event) => onChange(index, 'content', event.target.value)}
            />
            {errors[`${fieldName}.${index}.content`] ? (
              <small className="admin-field-error">{errors[`${fieldName}.${index}.content`]}</small>
            ) : null}
          </div>
          <div className="admin-repeatable-row-actions">
            <button type="button" className="admin-icon-button" onClick={() => onMove(index, -1)} disabled={index === 0} aria-label="Yukarı taşı">↑</button>
            <button type="button" className="admin-icon-button" onClick={() => onMove(index, 1)} disabled={index === items.length - 1} aria-label="Aşağı taşı">↓</button>
            <button type="button" className="admin-text-button is-danger" onClick={() => onRemove(index)}>Sil</button>
          </div>
        </div>
      ))}
      <button type="button" className="admin-secondary-button" onClick={onAdd}>{addLabel}</button>
    </div>
  );
}

function IconCardList({ items, onAdd, onRemove, onMove, onChange, onIconChange, onIconRemoveToggle, addLabel, errors, fieldName }) {
  return (
    <div className="admin-repeatable-list">
      {items.map((item, index) => (
        <div className="admin-repeatable-card" key={item.id ?? `new-${index}`}>
          <div className="admin-repeatable-card-header">
            <span className="admin-repeatable-index">{String(index + 1).padStart(2, '0')}</span>
            <div className="admin-repeatable-row-actions">
              <button type="button" className="admin-icon-button" onClick={() => onMove(index, -1)} disabled={index === 0} aria-label="Yukarı taşı">↑</button>
              <button type="button" className="admin-icon-button" onClick={() => onMove(index, 1)} disabled={index === items.length - 1} aria-label="Aşağı taşı">↓</button>
              <button type="button" className="admin-text-button is-danger" onClick={() => onRemove(index)}>Sil</button>
            </div>
          </div>

          <label className="admin-field">
            <span>Başlık</span>
            <input type="text" value={item.title} onChange={(event) => onChange(index, 'title', event.target.value)} />
            {errors[`${fieldName}.${index}.title`] ? <small className="admin-field-error">{errors[`${fieldName}.${index}.title`]}</small> : null}
          </label>

          <label className="admin-field">
            <span>Açıklama</span>
            <textarea rows="2" value={item.short_description} onChange={(event) => onChange(index, 'short_description', event.target.value)} />
          </label>

          <div className="admin-icon-upload">
            {item.file ? (
              <img src={URL.createObjectURL(item.file)} alt="" className="admin-icon-preview" />
            ) : item.existingIconUrl && !item.remove_icon ? (
              <img src={item.existingIconUrl} alt="" className="admin-icon-preview" />
            ) : (
              <span className="admin-icon-preview admin-icon-preview--empty">İkon yok</span>
            )}

            <div>
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={(event) => onIconChange(index, event.target.files?.[0] || null)}
              />
              {item.existingIconUrl ? (
                <label className="admin-checkbox-field">
                  <input type="checkbox" checked={item.remove_icon} onChange={(event) => onIconRemoveToggle(index, event.target.checked)} />
                  <span>İkonu kaldır</span>
                </label>
              ) : null}
              {errors[`${fieldName}.${index}.icon`] ? <small className="admin-field-error">{errors[`${fieldName}.${index}.icon`]}</small> : null}
            </div>
          </div>
        </div>
      ))}
      <button type="button" className="admin-secondary-button" onClick={onAdd}>{addLabel}</button>
    </div>
  );
}

export default function ServiceForm({ service = null }) {
  const isEdit = Boolean(service);

  const { data, setData, post, put, processing, errors } = useForm({
    title: service?.title || '',
    slug: service?.slug || '',
    subtitle: service?.subtitle || '',
    short_description: service?.short_description || '',
    description: service?.description || '',
    is_active: service ? Boolean(service.is_active) : true,
    sort_order: service?.sort_order ?? 0,
    homepage_button_text: service?.homepage_button_text || '',
    detail_object_position: service?.detail_object_position || '',

    intro_eyebrow: service?.intro_eyebrow || '',
    intro_title: service?.intro_title || '',
    intro_paragraphs: service?.intro_paragraphs?.length ? service.intro_paragraphs.map((p) => ({ id: p.id, content: p.content })) : [{ id: null, content: '' }],
    deleted_intro_paragraph_ids: [],

    highlights: service?.highlights?.length ? service.highlights.map((h) => ({ id: h.id, content: h.content })) : [{ id: null, content: '' }],
    deleted_highlight_ids: [],

    process_eyebrow: service?.process_eyebrow || '',
    process_title: service?.process_title || '',
    process_steps: service?.process_steps?.length
      ? service.process_steps.map((s) => ({ id: s.id, title: s.title, short_description: s.short_description || '', icon: null, remove_icon: false, existingIconUrl: s.icon_url }))
      : [],
    deleted_process_step_ids: [],

    requirements_eyebrow: service?.requirements_eyebrow || '',
    requirements_title: service?.requirements_title || '',
    requirements_description: service?.requirements_description || '',
    requirements_note_title: service?.requirements_note_title || '',
    requirements_note_text: service?.requirements_note_text || '',
    requirements_note_icon: null,
    requirements_note_icon_remove: false,
    requirements: service?.requirements?.length
      ? service.requirements.map((r) => ({ id: r.id, title: r.title, short_description: r.short_description || '', icon: null, remove_icon: false, existingIconUrl: r.icon_url }))
      : [],
    deleted_requirement_ids: [],

    sidebar_short_info: service?.sidebar_short_info || '',
    cta_eyebrow: service?.cta_eyebrow || '',
    cta_title: service?.cta_title || '',
    cta_text: service?.cta_text || '',
    cta_button_text: service?.cta_button_text || '',
    cta_href: service?.cta_href || '',
    whatsapp_key: service?.whatsapp_key || 'poland',
    detail_page_note: service?.detail_page_note || '',

    images: buildInitialImages(service),
  });

  const [slugTouched, setSlugTouched] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const existingIconUrl = service?.requirements_note_icon_url || null;

  const handleTitleChange = (value) => {
    setData('title', value);
    if (!slugTouched) {
      setData('slug', slugify(value));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const options = { forceFormData: true };

    if (isEdit) {
      put(`/admin/services/${service.id}`, options);
    } else {
      post('/admin/services', options);
    }
  };

  const updateImage = (type, key, value) => {
    setData('images', { ...data.images, [type]: { ...data.images[type], [key]: value } });
  };

  const makeListHelpers = (listKey, deletedKey, blankFactory) => ({
    add: () => setData(listKey, [...data[listKey], blankFactory()]),
    remove: (index) => {
      const item = data[listKey][index];
      const next = data[listKey].filter((_, i) => i !== index);
      setData(listKey, next);
      if (item?.id) {
        setData(deletedKey, [...data[deletedKey], item.id]);
      }
    },
    move: (index, direction) => {
      const next = [...data[listKey]];
      const target = index + direction;
      if (target < 0 || target >= next.length) return;
      [next[index], next[target]] = [next[target], next[index]];
      setData(listKey, next);
    },
    change: (index, field, value) => {
      const next = [...data[listKey]];
      next[index] = { ...next[index], [field]: value };
      setData(listKey, next);
    },
  });

  const introHelpers = makeListHelpers('intro_paragraphs', 'deleted_intro_paragraph_ids', () => ({ id: null, content: '' }));
  const highlightHelpers = makeListHelpers('highlights', 'deleted_highlight_ids', () => ({ id: null, content: '' }));
  const processHelpers = makeListHelpers('process_steps', 'deleted_process_step_ids', () => ({ id: null, title: '', short_description: '', icon: null, remove_icon: false, existingIconUrl: null }));
  const requirementHelpers = makeListHelpers('requirements', 'deleted_requirement_ids', () => ({ id: null, title: '', short_description: '', icon: null, remove_icon: false, existingIconUrl: null }));

  const tabErrorFlags = {
    general: tabHasError(errors, ['title', 'slug', 'subtitle', 'short_description', 'description', 'sort_order', 'homepage_button_text', 'detail_object_position']),
    images: tabHasError(errors, ['images']),
    intro: tabHasError(errors, ['intro_eyebrow', 'intro_title', 'intro_paragraphs']),
    highlights: tabHasError(errors, ['highlights']),
    process: tabHasError(errors, ['process_eyebrow', 'process_title', 'process_steps']),
    requirements: tabHasError(errors, ['requirements_eyebrow', 'requirements_title', 'requirements_description', 'requirements_note', 'requirements']),
    sidebar: tabHasError(errors, ['sidebar_short_info', 'cta_', 'whatsapp_key', 'detail_page_note']),
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="admin-tabs" role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.key}
            className={`admin-tab${activeTab === tab.key ? ' is-active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
            {tabErrorFlags[tab.key] ? <span className="admin-tab-error-dot" aria-hidden="true" /> : null}
          </button>
        ))}
      </div>

      {activeTab === 'general' ? (
        <div className="admin-tab-panel">
          <div className="admin-form-grid">
            <label className="admin-field">
              <span>Başlık</span>
              <input type="text" value={data.title} onChange={(event) => handleTitleChange(event.target.value)} required />
              {errors.title ? <small className="admin-field-error">{errors.title}</small> : null}
            </label>

            <label className="admin-field">
              <span>Slug</span>
              <input
                type="text"
                value={data.slug}
                onChange={(event) => {
                  setSlugTouched(true);
                  setData('slug', event.target.value);
                }}
                placeholder="başlıktan otomatik oluşturulur"
              />
              {errors.slug ? <small className="admin-field-error">{errors.slug}</small> : null}
            </label>
          </div>

          <label className="admin-field">
            <span>Alt Başlık</span>
            <textarea rows="2" value={data.subtitle} onChange={(event) => setData('subtitle', event.target.value)} />
            {errors.subtitle ? <small className="admin-field-error">{errors.subtitle}</small> : null}
          </label>

          <div className="admin-form-grid">
            <label className="admin-field">
              <span>Kısa Açıklama</span>
              <textarea rows="3" value={data.short_description} onChange={(event) => setData('short_description', event.target.value)} />
              {errors.short_description ? <small className="admin-field-error">{errors.short_description}</small> : null}
            </label>

            <label className="admin-field">
              <span>Açıklama</span>
              <textarea rows="3" value={data.description} onChange={(event) => setData('description', event.target.value)} />
              {errors.description ? <small className="admin-field-error">{errors.description}</small> : null}
            </label>
          </div>

          <div className="admin-form-grid admin-form-grid--compact">
            <label className="admin-field">
              <span>Sıra</span>
              <input type="number" min="0" value={data.sort_order} onChange={(event) => setData('sort_order', event.target.value)} />
              {errors.sort_order ? <small className="admin-field-error">{errors.sort_order}</small> : null}
            </label>

            <label className="admin-field">
              <span>Ana Sayfa Buton Metni</span>
              <input type="text" value={data.homepage_button_text} onChange={(event) => setData('homepage_button_text', event.target.value)} placeholder="Detayları Gör" />
            </label>

            <label className="admin-field">
              <span>Detay Görseli Konumu</span>
              <input type="text" value={data.detail_object_position} onChange={(event) => setData('detail_object_position', event.target.value)} placeholder="50% 50%" />
            </label>

            <label className="admin-checkbox-field">
              <input type="checkbox" checked={data.is_active} onChange={(event) => setData('is_active', event.target.checked)} />
              <span>Aktif</span>
            </label>
          </div>
        </div>
      ) : null}

      {activeTab === 'images' ? (
        <div className="admin-tab-panel">
          {IMAGE_TYPES.map(({ key, label }) => {
            const image = data.images[key];
            return (
              <div className="admin-image-slot" key={key}>
                <h4>{label}</h4>
                <div className="admin-image-slot-body">
                  <div className="admin-image-slot-preview">
                    {image.file ? (
                      <img src={URL.createObjectURL(image.file)} alt="Önizleme" />
                    ) : image.existingUrl && !image.remove ? (
                      <img src={image.existingUrl} alt="Mevcut görsel" />
                    ) : (
                      <span className="admin-image-slot-placeholder">Görsel yok</span>
                    )}
                  </div>

                  <div className="admin-image-slot-fields">
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/jpg,image/webp,image/gif"
                      onChange={(event) => updateImage(key, 'file', event.target.files?.[0] || null)}
                    />
                    {errors[`images.${key}.file`] ? <small className="admin-field-error">{errors[`images.${key}.file`]}</small> : null}

                    <label className="admin-field">
                      <span>Alt Metin</span>
                      <input type="text" value={image.alt_text} onChange={(event) => updateImage(key, 'alt_text', event.target.value)} />
                    </label>

                    <label className="admin-field">
                      <span>Görsel Konumu</span>
                      <input type="text" value={image.object_position} onChange={(event) => updateImage(key, 'object_position', event.target.value)} placeholder="50% 50%" />
                    </label>

                    {image.existingUrl ? (
                      <label className="admin-checkbox-field">
                        <input type="checkbox" checked={image.remove} onChange={(event) => updateImage(key, 'remove', event.target.checked)} />
                        <span>Görseli kaldır</span>
                      </label>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}

      {activeTab === 'intro' ? (
        <div className="admin-tab-panel">
          <div className="admin-form-grid">
            <label className="admin-field">
              <span>Giriş Bölümü Üst Etiketi</span>
              <input type="text" value={data.intro_eyebrow} onChange={(event) => setData('intro_eyebrow', event.target.value)} placeholder="Bu hizmet nedir?" />
            </label>
            <label className="admin-field">
              <span>Giriş Başlığı</span>
              <input type="text" value={data.intro_title} onChange={(event) => setData('intro_title', event.target.value)} />
            </label>
          </div>

          <h4>Giriş Paragrafları</h4>
          <RepeatableTextList
            items={data.intro_paragraphs}
            onAdd={introHelpers.add}
            onRemove={introHelpers.remove}
            onMove={introHelpers.move}
            onChange={introHelpers.change}
            addLabel="Paragraf Ekle"
            placeholder="Paragraf metni"
            errors={errors}
            fieldName="intro_paragraphs"
          />
        </div>
      ) : null}

      {activeTab === 'highlights' ? (
        <div className="admin-tab-panel">
          <h4>Öne Çıkanlar</h4>
          <RepeatableTextList
            items={data.highlights}
            onAdd={highlightHelpers.add}
            onRemove={highlightHelpers.remove}
            onMove={highlightHelpers.move}
            onChange={highlightHelpers.change}
            addLabel="Madde Ekle"
            placeholder="Öne çıkan madde"
            errors={errors}
            fieldName="highlights"
            maxLength={500}
          />
        </div>
      ) : null}

      {activeTab === 'process' ? (
        <div className="admin-tab-panel">
          <div className="admin-form-grid">
            <label className="admin-field">
              <span>Bölüm Üst Etiketi</span>
              <input type="text" value={data.process_eyebrow} onChange={(event) => setData('process_eyebrow', event.target.value)} placeholder="Süreç nasıl ilerliyor?" />
            </label>
            <label className="admin-field">
              <span>Bölüm Başlığı</span>
              <input type="text" value={data.process_title} onChange={(event) => setData('process_title', event.target.value)} placeholder="Başvuru Süreci" />
            </label>
          </div>

          <h4>Süreç Adımları</h4>
          <IconCardList
            items={data.process_steps}
            onAdd={processHelpers.add}
            onRemove={processHelpers.remove}
            onMove={processHelpers.move}
            onChange={processHelpers.change}
            onIconChange={(index, file) => processHelpers.change(index, 'icon', file)}
            onIconRemoveToggle={(index, value) => processHelpers.change(index, 'remove_icon', value)}
            addLabel="Yeni Süreç Adımı Ekle"
            errors={errors}
            fieldName="process_steps"
          />
        </div>
      ) : null}

      {activeTab === 'requirements' ? (
        <div className="admin-tab-panel">
          <div className="admin-form-grid">
            <label className="admin-field">
              <span>Bölüm Üst Etiketi</span>
              <input type="text" value={data.requirements_eyebrow} onChange={(event) => setData('requirements_eyebrow', event.target.value)} placeholder="Bu hizmet kapsamında neler var?" />
            </label>
            <label className="admin-field">
              <span>Bölüm Başlığı</span>
              <input type="text" value={data.requirements_title} onChange={(event) => setData('requirements_title', event.target.value)} placeholder="Gerekli Evrak ve Belgeler" />
            </label>
          </div>

          <label className="admin-field">
            <span>Bölüm Açıklaması</span>
            <textarea rows="2" value={data.requirements_description} onChange={(event) => setData('requirements_description', event.target.value)} />
          </label>

          <h4>Gerekli Evraklar</h4>
          <IconCardList
            items={data.requirements}
            onAdd={requirementHelpers.add}
            onRemove={requirementHelpers.remove}
            onMove={requirementHelpers.move}
            onChange={requirementHelpers.change}
            onIconChange={(index, file) => requirementHelpers.change(index, 'icon', file)}
            onIconRemoveToggle={(index, value) => requirementHelpers.change(index, 'remove_icon', value)}
            addLabel="Yeni Evrak Ekle"
            errors={errors}
            fieldName="requirements"
          />

          <h4>Bilgilendirme Notu</h4>
          <div className="admin-form-grid">
            <label className="admin-field">
              <span>Not Başlığı</span>
              <input type="text" value={data.requirements_note_title} onChange={(event) => setData('requirements_note_title', event.target.value)} />
            </label>
            <label className="admin-field">
              <span>Not Metni</span>
              <textarea rows="2" value={data.requirements_note_text} onChange={(event) => setData('requirements_note_text', event.target.value)} />
            </label>
          </div>

          <div className="admin-icon-upload">
            {data.requirements_note_icon ? (
              <img src={URL.createObjectURL(data.requirements_note_icon)} alt="" className="admin-icon-preview" />
            ) : existingIconUrl && !data.requirements_note_icon_remove ? (
              <img src={existingIconUrl} alt="" className="admin-icon-preview" />
            ) : (
              <span className="admin-icon-preview admin-icon-preview--empty">İkon yok</span>
            )}
            <div>
              <input type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => setData('requirements_note_icon', event.target.files?.[0] || null)} />
              {existingIconUrl ? (
                <label className="admin-checkbox-field">
                  <input type="checkbox" checked={data.requirements_note_icon_remove} onChange={(event) => setData('requirements_note_icon_remove', event.target.checked)} />
                  <span>İkonu kaldır</span>
                </label>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      {activeTab === 'sidebar' ? (
        <div className="admin-tab-panel">
          <label className="admin-field">
            <span>Sidebar Kısa Bilgi</span>
            <textarea rows="3" value={data.sidebar_short_info} onChange={(event) => setData('sidebar_short_info', event.target.value)} />
          </label>

          <div className="admin-form-grid">
            <label className="admin-field">
              <span>CTA Üst Etiketi</span>
              <input type="text" value={data.cta_eyebrow} onChange={(event) => setData('cta_eyebrow', event.target.value)} placeholder="BU HİZMET HAKKINDA BİLGİ ALIN" />
            </label>
            <label className="admin-field">
              <span>CTA Başlığı</span>
              <input type="text" value={data.cta_title} onChange={(event) => setData('cta_title', event.target.value)} />
            </label>
          </div>

          <label className="admin-field">
            <span>CTA Metni</span>
            <textarea rows="2" value={data.cta_text} onChange={(event) => setData('cta_text', event.target.value)} />
          </label>

          <div className="admin-form-grid">
            <label className="admin-field">
              <span>CTA Buton Metni</span>
              <input type="text" value={data.cta_button_text} onChange={(event) => setData('cta_button_text', event.target.value)} placeholder="Başvuru Formunu Doldur" />
            </label>
            <label className="admin-field">
              <span>CTA Bağlantısı</span>
              <input type="text" value={data.cta_href} onChange={(event) => setData('cta_href', event.target.value)} />
              {errors.cta_href ? <small className="admin-field-error">{errors.cta_href}</small> : null}
            </label>
          </div>

          <div className="admin-form-grid">
            <label className="admin-field">
              <span>WhatsApp Hattı</span>
              <select value={data.whatsapp_key} onChange={(event) => setData('whatsapp_key', event.target.value)}>
                {Object.entries(contactConfig.whatsapp).map(([key, contact]) => (
                  <option key={key} value={key}>{contact.context}</option>
                ))}
              </select>
            </label>

            <label className="admin-field">
              <span>Detay Sayfası Notu</span>
              <textarea rows="2" value={data.detail_page_note} onChange={(event) => setData('detail_page_note', event.target.value)} />
            </label>
          </div>
        </div>
      ) : null}

      <div className="admin-form-actions">
        <Link href="/admin/services" className="admin-secondary-button">Vazgeç</Link>
        <button type="submit" className="admin-primary-button" disabled={processing}>
          {processing ? 'Kaydediliyor...' : isEdit ? 'Güncelle' : 'Kaydet'}
        </button>
      </div>
    </form>
  );
}
