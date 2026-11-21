'use strict';
// Editable international WhatsApp number, taken from the supplied reference.
const CONFIG = { whatsappNumber: '212639668041', canonicalUrl: '' };
const booking = document.querySelector('#booking');
const form = document.querySelector('#booking-form');
const defaultMessage = 'السلام عليكم، أريد الاستفسار عن خدمات المعالج السوسي جلال بمدينة الناظور.';
const whatsappUrl = message => `https://wa.me/${CONFIG.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
document.querySelectorAll('[data-wa]').forEach(a => { a.href = whatsappUrl(defaultMessage); a.target = '_blank'; a.rel = 'noopener noreferrer'; });
if (CONFIG.canonicalUrl) { const link = document.createElement('link'); link.rel = 'canonical'; link.href = CONFIG.canonicalUrl; document.head.append(link); }
const localDate = new Date();
form.elements.date.min = `${localDate.getFullYear()}-${String(localDate.getMonth()+1).padStart(2,'0')}-${String(localDate.getDate()).padStart(2,'0')}`;
const serviceAliases = {'الحجامة العلاجية':'الحجامة','المنتجات الطبيعية والخلطات العشبية':'المنتجات الطبيعية'};
document.querySelectorAll('[data-book]').forEach(button => button.addEventListener('click', () => {
 const service = serviceAliases[button.dataset.book] || button.dataset.book || 'استشارة عامة';
 form.elements.service.value = service;
 document.querySelector('#form-status').textContent = '';
 booking.showModal(); document.body.classList.add('modal-open');
}));
document.querySelectorAll('dialog').forEach(dialog => {
 dialog.querySelector('.close').addEventListener('click', () => dialog.close());
 dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
 dialog.addEventListener('click', e => { if(e.target === dialog) { const r=dialog.getBoundingClientRect(); if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom) dialog.close(); } });
});
form.addEventListener('submit', e => {
 e.preventDefault(); if(!form.reportValidity()) return;
 const data = new FormData(form);
 const message = `${defaultMessage}\nالاسم: ${data.get('name').trim()}\nرقم الهاتف: ${data.get('phone').trim()}\nالخدمة: ${data.get('service')}\nاليوم المفضل: ${data.get('date')}\n${data.get('notes').trim() ? 'ملاحظات: '+data.get('notes').trim() : ''}`;
 const button = form.querySelector('[type="submit"]'); button.disabled = true;
 window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer');
 document.querySelector('#form-status').textContent = 'تم طلب فتح واتساب. راجع الرسالة وأرسلها بنفسك؛ لم يتم تأكيد الموعد بعد.';
 button.disabled = false;
});
const menu = document.querySelector('.menu-toggle'), links = document.querySelector('#nav-links');
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label',open?'إغلاق القائمة':'فتح القائمة'); links.classList.toggle('open',open); });
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { links.classList.remove('open'); menu.setAttribute('aria-expanded','false'); }));
document.addEventListener('keydown', e => { if(e.key==='Escape'){links.classList.remove('open');menu.setAttribute('aria-expanded','false');} });
const privacy = document.querySelector('#privacy');
document.querySelector('#privacy-open').addEventListener('click', () => { privacy.showModal(); document.body.classList.add('modal-open'); });
privacy.querySelector('.close-privacy').addEventListener('click', () => privacy.close());
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.08});
 document.querySelectorAll('.reveal').forEach(el=>{el.classList.add('ready');observer.observe(el);});
}
