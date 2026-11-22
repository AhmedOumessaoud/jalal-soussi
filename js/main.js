"use strict";
const number = "212639668041";
document.querySelectorAll("[data-whatsapp]").forEach(link => {
 const service = link.dataset.whatsapp;
 const message = `السلام عليكم، أريد الاستفسار عن ${service} عند المعالج السوسي جلال بالناظور.`;
 link.href = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
 link.target = "_blank";
 link.rel = "noopener noreferrer";
});
