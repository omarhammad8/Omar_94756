/* =========================================================
   دليل فعاليات الجامعة الافتراضية: منطق الواجهة (JavaScript)
   - البيانات محفوظة كمصفوفة كائنات (بدون خادم) لتعمل على GitHub Pages.
   - كل صفحة تحدد نوعها عبر data-page على وسم <body> وننفّذ الدالة المناسبة.
   ========================================================= */

/* ---------- 1) بيانات التصنيفات والمواقع ---------- */
const CATEGORIES = {
  culture: { name: "ثقافة", icon: "bi-book" },
  sports:  { name: "رياضة", icon: "bi-trophy" },
  music:   { name: "موسيقى", icon: "bi-music-note-beamed" },
  family:  { name: "عائلي", icon: "bi-people" },
  tech:    { name: "تقنية", icon: "bi-cpu" },
  art:     { name: "فنون", icon: "bi-palette" },
};

const LOCATIONS = {
  damascus: "دمشق",
  aleppo: "حلب",
  homs: "حمص",
  latakia: "اللاذقية",
  online: "أونلاين",
};

/* ---------- 2) بيانات الفعاليات ---------- */
const EVENTS = [
  {
    id: 1, title: "معرض الكتاب الجامعي السنوي", cat: "culture",
    date: "2026-11-05", endDate: "2026-11-09", time: "10:00 - 20:00",
    loc: "damascus", venue: "مكتبة الأسد الوطنية، قاعة المعارض",
    short: "أكثر من 120 دار نشر وخصومات خاصة للطلاب وتوقيع كتب لمؤلفين سوريين.",
    desc: "يعود معرض الكتاب الجامعي في دورته الخامسة بمشاركة أكثر من 120 دار نشر محلية وعربية. يتضمن المعرض جناحاً خاصاً للكتب الأكاديمية والمراجع الجامعية بأسعار مخفّضة للطلاب، إضافة إلى جلسات توقيع يومية مع كتّاب وروائيين، وندوات حول مستقبل النشر الرقمي. يمكن لطلاب الجامعة الافتراضية الحصول على خصم 30% عند إبراز البطاقة الجامعية.",
    featured: true, seats: 500, booked: 312, price: "مجاني",
  },
  {
    id: 2, title: "ماراثون الجامعة الخيري 5 كم", cat: "sports",
    date: "2026-11-14", time: "07:30 - 11:00",
    loc: "latakia", venue: "الكورنيش الجنوبي",
    short: "سباق جري خيري على الكورنيش، يذهب ريعه لدعم المنح الدراسية.",
    desc: "ماراثون خيري مفتوح للطلاب والخريجين وعائلاتهم بمسافتين: 5 كم للمتسابقين و2 كم للمشي العائلي. يحصل كل مشارك على قميص الماراثون وميدالية إتمام، ويذهب كامل ريع رسوم التسجيل لصندوق المنح الدراسية للطلاب المتفوقين. نقاط مياه وإسعاف على طول المسار.",
    featured: true, seats: 800, booked: 655, price: "5,000 ل.س",
  },
  {
    id: 3, title: "أمسية العود والطرب الأصيل", cat: "music",
    date: "2026-11-20", time: "19:00 - 22:00",
    loc: "damascus", venue: "دار الأوبرا، القاعة متعددة الاستعمالات",
    short: "أمسية موسيقية لفرقة الجامعة تقدّم موشحات وقدوداً حلبية بتوزيع جديد.",
    desc: "تقدّم فرقة الجامعة الموسيقية أمسية طربية تضم مختارات من الموشحات الأندلسية والقدود الحلبية بتوزيع معاصر، بمشاركة عازفين من طلاب الجامعة وخريجيها. الأمسية مناسبة لكل الأعمار، ويُرجى الحضور قبل الموعد بـ 20 دقيقة.",
    featured: true, seats: 300, booked: 290, price: "مجاني بحجز مسبق",
  },
  {
    id: 4, title: "يوم العائلة المفتوح", cat: "family",
    date: "2026-11-28", time: "11:00 - 17:00",
    loc: "homs", venue: "حديقة الزهراء العامة",
    short: "ألعاب للأطفال، مسابقات عائلية، ومسرح دمى وورشات رسم.",
    desc: "يوم ترفيهي لعائلات الطلاب والموظفين يتضمن ألعاباً جماعية للأطفال، مسابقات معلومات عائلية بجوائز قيّمة، عروض مسرح الدمى، وورشات رسم وتلوين. تتوفر أكشاك طعام وجلسات استراحة مظللة.",
    featured: false, seats: 400, booked: 120, price: "مجاني",
  },
  {
    id: 5, title: "هاكاثون الجامعة الافتراضية 2026", cat: "tech",
    date: "2026-12-04", endDate: "2026-12-05", time: "48 ساعة متواصلة",
    loc: "online", venue: "منصة الجامعة الافتراضية (عن بُعد)",
    short: "48 ساعة لبناء حلول تقنية لمشكلات حقيقية، مع جوائز وفرص تدريب.",
    desc: "هاكاثون عن بُعد تتنافس فيه فرق من 3 إلى 5 طلاب لبناء حلول تقنية في مجالات التعليم الإلكتروني، الصحة، والأمن السيبراني. يرافق الفرق موجّهون من القطاع التقني، وتحصل الفرق الثلاث الأولى على جوائز مالية وفرص تدريب في شركات شريكة.",
    featured: true, seats: 200, booked: 148, price: "مجاني",
  },
  {
    id: 6, title: "معرض فنون الطلاب التشكيلية", cat: "art",
    date: "2026-12-10", endDate: "2026-12-15", time: "12:00 - 19:00",
    loc: "aleppo", venue: "صالة الأسد للفنون الجميلة",
    short: "أعمال رسم ونحت وتصوير فوتوغرافي لطلاب الجامعة من مختلف المحافظات.",
    desc: "يعرض المعرض أكثر من 80 عملاً فنياً لطلاب الجامعة تشمل الرسم الزيتي والمائي والنحت والتصوير الفوتوغرافي. تُقام يومياً جولات إرشادية بصحبة الفنانين المشاركين، وتُعلن في اليوم الأخير نتائج جائزة الجمهور.",
    featured: false, seats: 600, booked: 210, price: "مجاني",
  },
  {
    id: 7, title: "ندوة: الذكاء الاصطناعي والهوية الثقافية", cat: "culture",
    date: "2026-12-17", time: "17:00 - 19:00",
    loc: "online", venue: "بث مباشر عبر منصة الجامعة",
    short: "حوار مفتوح حول أثر الذكاء الاصطناعي على اللغة العربية والإنتاج الثقافي.",
    desc: "ندوة حوارية يشارك فيها أكاديميون وباحثون لمناقشة دور تقنيات الذكاء الاصطناعي في حفظ اللغة العربية والتراث الثقافي، والتحديات المتعلقة بالمحتوى المولَّد آلياً. تتضمن الندوة فقرة أسئلة مفتوحة للحضور.",
    featured: false, seats: 1000, booked: 430, price: "مجاني",
  },
  {
    id: 8, title: "بطولة كرة القدم بين الكليات", cat: "sports",
    date: "2027-01-08", endDate: "2027-01-22", time: "16:00 - 20:00",
    loc: "aleppo", venue: "ملعب الحمدانية الرياضي",
    short: "بطولة خماسيات بمشاركة 16 فريقاً تمثّل البرامج الأكاديمية المختلفة.",
    desc: "تنطلق بطولة خماسيات كرة القدم بمشاركة 16 فريقاً من مختلف برامج الجامعة. تقام المباريات بنظام المجموعات ثم خروج المغلوب، وتُبث المباراة النهائية مباشرة عبر صفحات الجامعة. التسجيل مفتوح للفرق حتى نهاية كانون الأول.",
    featured: false, seats: 1500, booked: 380, price: "مجاني",
  },
  {
    id: 9, title: "حفل كورال الشتاء", cat: "music",
    date: "2026-12-23", time: "18:30 - 20:30",
    loc: "latakia", venue: "المركز الثقافي في اللاذقية",
    short: "كورال الجامعة يقدّم أغاني شتوية وتراتيل وأغانٍ تراثية بأصوات الطلاب.",
    desc: "يقدّم كورال الجامعة المؤلف من 40 صوتاً حفله الشتوي السنوي، متضمناً أغاني فيروزية وتراثية وتراتيل موسمية بتوزيع جماعي. الحفل عائلي ومناسب لجميع الأعمار.",
    featured: false, seats: 350, booked: 95, price: "مجاني",
  },
  {
    id: 10, title: "ورشة الطبخ العائلية: مطبخنا الشامي", cat: "family",
    date: "2027-01-15", time: "15:00 - 18:00",
    loc: "damascus", venue: "مركز الأنشطة الطلابية، المزة",
    short: "ورشة تفاعلية للأهل والأطفال لتحضير أطباق شامية تقليدية معاً.",
    desc: "ورشة طبخ يقودها طهاة محترفون يتعلم فيها المشاركون مع أطفالهم تحضير الكبة والفتوش والمعمول خطوة بخطوة. تُقدَّم كل المكونات والأدوات، ويأخذ كل مشارك وصفات مطبوعة إلى البيت.",
    featured: false, seats: 60, booked: 52, price: "15,000 ل.س للعائلة",
  },
  {
    id: 11, title: "ورشة أمن المعلومات: احمِ حسابك", cat: "tech",
    date: "2026-11-11", time: "18:00 - 20:00",
    loc: "online", venue: "قاعة افتراضية على منصة الجامعة",
    short: "ورشة عملية حول كلمات المرور، المصادقة الثنائية، وكشف رسائل التصيّد.",
    desc: "ورشة عملية موجّهة لجميع الطلاب تشرح أساسيات حماية الحسابات الشخصية والجامعية: إنشاء كلمات مرور قوية ومدير كلمات المرور، تفعيل المصادقة الثنائية، وكيفية التعرّف على رسائل التصيّد الاحتيالي من خلال أمثلة حقيقية مُعدّلة. تنتهي الورشة باختبار قصير وشهادة حضور.",
    featured: true, seats: 250, booked: 201, price: "مجاني",
  },
  {
    id: 12, title: "مهرجان الخط العربي", cat: "art",
    date: "2027-01-28", endDate: "2027-01-30", time: "11:00 - 18:00",
    loc: "homs", venue: "دار الثقافة في حمص",
    short: "معرض لوحات خط عربي وورشات تعليمية لخط الرقعة والثلث للمبتدئين.",
    desc: "مهرجان يحتفي بجماليات الخط العربي يضم معرضاً للوحات خطاطين معروفين وطلاب موهوبين، وورشات يومية لتعليم أساسيات خطي الرقعة والثلث للمبتدئين، مع توفير الأقلام والأحبار للمشاركين.",
    featured: false, seats: 300, booked: 60, price: "مجاني",
  },
];

/* ---------- 3) أدوات مساعدة عامة ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

// localStorage قد يكون غير متاح (وضع التصفح الخاص) لذلك نغلفه بـ try/catch
const store = {
  get(key, fallback = null) { try { const v = localStorage.getItem(key); return v === null ? fallback : JSON.parse(v); } catch { return fallback; } },
  set(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch { /* تجاهل */ } },
};

const MONTHS = ["كانون الثاني", "شباط", "آذار", "نيسان", "أيار", "حزيران", "تموز", "آب", "أيلول", "تشرين الأول", "تشرين الثاني", "كانون الأول"];
const parseDate = (s) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
const today = () => { const t = new Date(); return new Date(t.getFullYear(), t.getMonth(), t.getDate()); };
const fmtDate = (s) => { const d = parseDate(s); return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`; };
const fmtRange = (e) => (e.endDate ? `${fmtDate(e.date)} إلى ${fmtDate(e.endDate)}` : fmtDate(e.date));
const escapeHTML = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// حالة الفعالية بالنسبة لتاريخ اليوم: اليوم / هذا الأسبوع / قادمة / منتهية
function eventStatus(e) {
  const start = parseDate(e.date), end = parseDate(e.endDate || e.date), t = today();
  const days = Math.round((start - t) / 86400000);
  if (t >= start && t <= end) return { key: "today", label: "الحدث اليوم", cls: "bg-danger pulse" };
  if (end < t) return { key: "past", label: "منتهية", cls: "bg-secondary" };
  if (days <= 7) return { key: "week", label: `بعد ${days} ${days === 1 ? "يوم" : "أيام"}`, cls: "bg-warning text-dark" };
  return { key: "upcoming", label: "قادمة", cls: "bg-success" };
}

// الفعالية القادمة الأقرب (أو الجارية اليوم)
function nextEvent() {
  const t = today();
  const upcoming = EVENTS.filter((e) => parseDate(e.endDate || e.date) >= t).sort((a, b) => parseDate(a.date) - parseDate(b.date));
  return upcoming[0] || [...EVENTS].sort((a, b) => parseDate(b.date) - parseDate(a.date))[0];
}

/* ---------- 4) قالب بطاقة الفعالية (Bootstrap Card) ---------- */
function eventCardHTML(e) {
  const c = CATEGORIES[e.cat], st = eventStatus(e), d = parseDate(e.date);
  return `
  <article class="card event-card" data-cat="${e.cat}">
    <div class="thumb">
      <img src="assets/img/events/event-${e.id}.svg" alt="${escapeHTML(e.title)}" loading="lazy">
      <span class="badge badge-cat rounded-pill"><i class="bi ${c.icon} ms-1"></i>${c.name}</span>
      <span class="badge badge-status rounded-pill ${st.cls}">${st.label}</span>
      <div class="date-chip"><b>${d.getDate()}</b><small>${MONTHS[d.getMonth()]}</small></div>
    </div>
    <div class="card-body d-flex flex-column pt-4">
      <h3 class="card-title">${escapeHTML(e.title)}</h3>
      <ul class="event-meta">
        <li><i class="bi bi-calendar-event"></i>${fmtRange(e)}</li>
        <li><i class="bi bi-geo-alt"></i>${LOCATIONS[e.loc]}، ${escapeHTML(e.venue)}</li>
      </ul>
      <p class="text-muted-2 small flex-grow-1">${escapeHTML(e.short)}</p>
      <div class="d-flex justify-content-between align-items-center">
        <span class="small fw-bold text-brand">${escapeHTML(e.price)}</span>
        <a href="event.html?id=${e.id}" class="btn btn-sm btn-brand rounded-pill px-3">التفاصيل <i class="bi bi-arrow-left"></i></a>
      </div>
    </div>
  </article>`;
}

/* ---------- 5) ميزات مشتركة بين كل الصفحات ---------- */

// الوضع الليلي (Bonus): تبديل خاصية data-bs-theme وحفظ الاختيار
function initTheme() {
  const saved = store.get("theme");
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(saved || (prefersDark ? "dark" : "light"));
  $$(".theme-toggle").forEach((btn) => btn.addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-bs-theme") === "dark" ? "light" : "dark";
    applyTheme(next); store.set("theme", next);
  }));
}
function applyTheme(mode) {
  document.documentElement.setAttribute("data-bs-theme", mode);
  $$(".theme-toggle i").forEach((i) => (i.className = mode === "dark" ? "bi bi-sun-fill" : "bi bi-moon-stars-fill"));
}

// زر العودة للأعلى (Bonus)
function initToTop() {
  const btn = $("#toTop"); if (!btn) return;
  window.addEventListener("scroll", () => btn.classList.toggle("show", window.scrollY > 400), { passive: true });
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

// تمييز الرابط الحالي في شريط التنقل
function initActiveNav() {
  const page = location.pathname.split("/").pop() || "index.html";
  $$(".navbar .nav-link").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === page || (page === "event.html" && href === "events.html")) { a.classList.add("active"); a.setAttribute("aria-current", "page"); }
  });
}

// ظهور تدريجي للعناصر عند التمرير
function initReveal() {
  const els = $$(".reveal"); if (!("IntersectionObserver" in window)) { els.forEach((el) => el.classList.add("visible")); return; }
  const io = new IntersectionObserver((entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); } }), { threshold: .12 });
  els.forEach((el) => io.observe(el));
}

// تنبيه Bootstrap ديناميكي (يُستخدم في النماذج)
function showAlert(container, type, html) {
  container.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show d-flex gap-2 align-items-start" role="alert">
      <i class="bi ${type === "success" ? "bi-check-circle-fill" : "bi-exclamation-triangle-fill"} fs-5"></i>
      <div>${html}</div>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="إغلاق"></button>
    </div>`;
  container.scrollIntoView({ behavior: "smooth", block: "center" });
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[0-9\s-]{8,15}$/;

// حجز مكان عبر Modal (Bonus)، مشترك بين الرئيسية والتفاصيل
function initBookingModal() {
  const modalEl = $("#bookingModal"); if (!modalEl) return;
  const form = $("#bookingForm"), alertBox = $("#bookingAlert");
  modalEl.addEventListener("show.bs.modal", (ev) => {
    const id = Number(ev.relatedTarget?.dataset.eventId || form.dataset.eventId);
    const e = EVENTS.find((x) => x.id === id) || EVENTS[0];
    form.dataset.eventId = e.id;
    $("#bookingEventTitle").textContent = e.title;
    $("#bookingEventMeta").textContent = `${fmtRange(e)} · ${LOCATIONS[e.loc]}`;
    form.reset(); form.classList.remove("was-validated"); alertBox.innerHTML = "";
    form.hidden = false; $("#bookingSubmit").hidden = false;
  });
  form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const email = $("#bkEmail");
    email.setCustomValidity(EMAIL_RE.test(email.value.trim()) ? "" : "invalid");
    if (!form.checkValidity()) { form.classList.add("was-validated"); return; }
    const e = EVENTS.find((x) => x.id === Number(form.dataset.eventId));
    const code = "SVU-" + e.id + "-" + Math.random().toString(36).slice(2, 7).toUpperCase();
    const bookings = store.get("bookings", []); bookings.push({ id: e.id, code, at: Date.now() }); store.set("bookings", bookings);
    form.hidden = true; $("#bookingSubmit").hidden = true;
    showAlert(alertBox, "success", `<strong>تم الحجز بنجاح!</strong><br>رمز حجزك: <code dir="ltr">${code}</code><br>سيصلك تأكيد على بريدك الإلكتروني.`);
  });
  $("#bookingSubmit").addEventListener("click", () => form.requestSubmit());
}

/* ---------- 6) الصفحة الرئيسية ---------- */
function initHome() {
  // أ) سلايدر الفعاليات البارزة (Bootstrap Carousel)
  const featured = EVENTS.filter((e) => e.featured);
  $("#featuredIndicators").innerHTML = featured.map((_, i) =>
    `<button type="button" data-bs-target="#featuredCarousel" data-bs-slide-to="${i}" ${i === 0 ? 'class="active" aria-current="true"' : ""} aria-label="شريحة ${i + 1}"></button>`).join("");
  $("#featuredSlides").innerHTML = featured.map((e, i) => `
    <div class="carousel-item ${i === 0 ? "active" : ""}" data-bs-interval="5000">
      <img src="assets/img/events/event-${e.id}.svg" alt="${escapeHTML(e.title)}">
      <div class="carousel-caption" data-cat="${e.cat}">
        <span class="badge badge-cat rounded-pill mb-2">${CATEGORIES[e.cat].name}</span>
        <h3>${escapeHTML(e.title)}</h3>
        <p class="mb-3 d-none d-md-block">${escapeHTML(e.short)}</p>
        <p class="small mb-3"><i class="bi bi-calendar-event"></i> ${fmtRange(e)} &nbsp; <i class="bi bi-geo-alt"></i> ${LOCATIONS[e.loc]}</p>
        <a href="event.html?id=${e.id}" class="btn btn-light btn-sm rounded-pill px-3 fw-bold">اعرف المزيد</a>
        <button class="btn btn-gradient btn-sm rounded-pill px-3 fw-bold" data-bs-toggle="modal" data-bs-target="#bookingModal" data-event-id="${e.id}">احجز مكانك</button>
      </div>
    </div>`).join("");

  // ب) التصنيفات السريعة مع عدد الفعاليات في كل تصنيف
  $("#catGrid").innerHTML = Object.entries(CATEGORIES).map(([key, c]) => {
    const n = EVENTS.filter((e) => e.cat === key).length;
    return `<a class="cat-tile" data-cat="${key}" href="events.html?cat=${key}"><i class="bi ${c.icon}"></i>${c.name}<small>${n} فعاليات</small></a>`;
  }).join("");

  // ج) أحدث الفعاليات: أقرب 6 فعاليات قادمة
  const t = today();
  const latest = EVENTS.filter((e) => parseDate(e.endDate || e.date) >= t).sort((a, b) => parseDate(a.date) - parseDate(b.date));
  const list = (latest.length >= 6 ? latest : [...latest, ...EVENTS.filter((e) => !latest.includes(e))]).slice(0, 6);
  $("#latestGrid").innerHTML = list.map((e) => `<div class="col-12 col-sm-6 col-lg-4 reveal">${eventCardHTML(e)}</div>`).join("");

  // د) بطاقة "الحدث اليوم / القادم" مع عدّاد تنازلي
  const n = nextEvent(), st = eventStatus(n);
  $("#nextEvent").innerHTML = `
    <div class="row g-0" data-cat="${n.cat}">
      <div class="col-md-5"><img src="assets/img/events/event-${n.id}.svg" class="w-100" alt="${escapeHTML(n.title)}"></div>
      <div class="col-md-7 p-4">
        <span class="badge rounded-pill ${st.cls} mb-2">${st.key === "today" ? "🔴 الحدث اليوم" : "⏳ الحدث القادم"}</span>
        <span class="badge badge-cat rounded-pill mb-2">${CATEGORIES[n.cat].name}</span>
        <h3 class="h4">${escapeHTML(n.title)}</h3>
        <p class="text-muted-2 mb-2"><i class="bi bi-calendar-event"></i> ${fmtRange(n)} · ${n.time} &nbsp; <i class="bi bi-geo-alt"></i> ${LOCATIONS[n.loc]}</p>
        <div class="countdown my-3" id="countdown"></div>
        <a href="event.html?id=${n.id}" class="btn btn-brand rounded-pill px-4">التفاصيل</a>
        <button class="btn btn-outline-secondary rounded-pill px-4" data-bs-toggle="modal" data-bs-target="#bookingModal" data-event-id="${n.id}">احجز مكانك</button>
      </div>
    </div>`;
  const target = parseDate(n.date); target.setHours(parseInt(n.time) || 9);
  const tick = () => {
    const diff = Math.max(0, target - new Date());
    const parts = [[Math.floor(diff / 864e5), "يوم"], [Math.floor(diff / 36e5) % 24, "ساعة"], [Math.floor(diff / 6e4) % 60, "دقيقة"], [Math.floor(diff / 1e3) % 60, "ثانية"]];
    $("#countdown").innerHTML = diff === 0 ? '<span class="fw-bold text-danger">بدأت الفعالية! 🎉</span>' : parts.map(([v, l]) => `<div><b>${v}</b><small>${l}</small></div>`).join("");
  };
  tick(); setInterval(tick, 1000);

  // هـ) إحصاءات سريعة في البطل
  $("#statEvents").textContent = EVENTS.length;
  $("#statCities").textContent = new Set(EVENTS.map((e) => e.loc)).size;
  $("#statCats").textContent = Object.keys(CATEGORIES).length;
}

/* ---------- 7) صفحة كل الفعاليات: بحث + فلترة ---------- */
function initEvents() {
  const grid = $("#eventsGrid"), count = $("#resultCount");
  const q = $("#fSearch"), cat = $("#fCat"), loc = $("#fLoc"), when = $("#fWhen"), sort = $("#fSort");

  // تعبئة القوائم المنسدلة من البيانات
  cat.innerHTML += Object.entries(CATEGORIES).map(([k, c]) => `<option value="${k}">${c.name}</option>`).join("");
  loc.innerHTML += Object.entries(LOCATIONS).map(([k, l]) => `<option value="${k}">${l}</option>`).join("");
  $("#catChips").innerHTML = `<button class="btn btn-sm btn-outline-secondary" data-chip="">الكل</button>` +
    Object.entries(CATEGORIES).map(([k, c]) => `<button class="btn btn-sm btn-outline-secondary" data-cat="${k}" data-chip="${k}"><i class="bi ${c.icon}"></i> ${c.name}</button>`).join("");

  // الأولوية: التصنيف من الرابط (?cat=) ثم التفضيل المحفوظ في localStorage (Bonus)
  const params = new URLSearchParams(location.search);
  const saved = store.get("filters", {});
  cat.value = params.get("cat") && CATEGORIES[params.get("cat")] ? params.get("cat") : saved.cat || "";
  loc.value = saved.loc || ""; when.value = saved.when || "all"; sort.value = saved.sort || "date-asc";
  if (params.get("q")) q.value = params.get("q");

  function matchesWhen(e) {
    const t = today(), s = parseDate(e.date), end = parseDate(e.endDate || e.date);
    const addDays = (n) => new Date(t.getFullYear(), t.getMonth(), t.getDate() + n);
    switch (when.value) {
      case "today": return s <= t && end >= t;
      case "week": return end >= t && s <= addDays(7);
      case "month": return end >= t && s <= addDays(30);
      case "upcoming": return end >= t;
      case "past": return end < t;
      default: return true;
    }
  }

  function render() {
    const term = q.value.trim().toLowerCase();
    let list = EVENTS.filter((e) =>
      (!cat.value || e.cat === cat.value) &&
      (!loc.value || e.loc === loc.value) &&
      matchesWhen(e) &&
      (!term || (e.title + e.short + e.venue + LOCATIONS[e.loc] + CATEGORIES[e.cat].name).toLowerCase().includes(term)));

    const by = { "date-asc": (a, b) => parseDate(a.date) - parseDate(b.date), "date-desc": (a, b) => parseDate(b.date) - parseDate(a.date), "title": (a, b) => a.title.localeCompare(b.title, "ar") };
    list.sort(by[sort.value]);

    grid.innerHTML = list.length
      ? list.map((e) => `<div class="col-12 col-sm-6 col-lg-4">${eventCardHTML(e)}</div>`).join("")
      : `<div class="col-12"><div class="empty-state"><i class="bi bi-calendar-x"></i><h3 class="h5 mt-3">لا توجد فعاليات مطابقة</h3><p>جرّب تغيير معايير البحث أو <a href="#" id="resetLink">إعادة ضبط الفلاتر</a>.</p></div></div>`;
    count.textContent = list.length;
    $$("#catChips [data-chip]").forEach((b) => b.classList.toggle("active", b.dataset.chip === cat.value));
    $("#resetLink")?.addEventListener("click", (ev) => { ev.preventDefault(); reset(); });
    store.set("filters", { cat: cat.value, loc: loc.value, when: when.value, sort: sort.value }); // حفظ التفضيلات
  }

  function reset() { q.value = ""; cat.value = ""; loc.value = ""; when.value = "all"; sort.value = "date-asc"; render(); }

  [cat, loc, when, sort].forEach((el) => el.addEventListener("change", render));
  q.addEventListener("input", render);
  $("#catChips").addEventListener("click", (ev) => { const b = ev.target.closest("[data-chip]"); if (b) { cat.value = b.dataset.chip; render(); } });
  $("#resetFilters").addEventListener("click", reset);
  $("#filterForm").addEventListener("submit", (ev) => ev.preventDefault());
  render();
}

/* ---------- 8) صفحة تفاصيل الفعالية ---------- */
function initEventDetails() {
  const id = Number(new URLSearchParams(location.search).get("id")) || 1;
  const e = EVENTS.find((x) => x.id === id);
  if (!e) {
    $("#eventRoot").innerHTML = `<div class="empty-state"><i class="bi bi-search"></i><h2 class="h4 mt-3">الفعالية غير موجودة</h2><a class="btn btn-brand rounded-pill mt-2" href="events.html">العودة لكل الفعاليات</a></div>`;
    return;
  }
  const c = CATEGORIES[e.cat], st = eventStatus(e), pct = Math.round((e.booked / e.seats) * 100);
  document.title = `${e.title} | دليل فعاليات الجامعة الافتراضية`;
  $("#crumbTitle").textContent = e.title;
  $("#heroTitle").textContent = e.title;
  $("#heroBadges").innerHTML = `<span class="badge badge-cat rounded-pill" data-cat="${e.cat}"><i class="bi ${c.icon} ms-1"></i>${c.name}</span> <span class="badge rounded-pill ${st.cls}">${st.label}</span>`;

  $("#eventRoot").innerHTML = `
  <div class="row g-4">
    <div class="col-lg-8">
      <img class="event-hero-img mb-4" src="assets/img/events/event-${e.id}.svg" alt="${escapeHTML(e.title)}">
      <h2 class="h4">عن الفعالية</h2>
      <p class="fs-6">${escapeHTML(e.desc)}</p>

      <h2 class="h4 mt-4">معرض الصور</h2>
      <div class="gallery-grid mb-4">
        ${[1, 2, 3].map((g) => `<img src="assets/img/gallery/event-${e.id}-${g}.svg" alt="صورة ${g} من ${escapeHTML(e.title)}" data-bs-toggle="modal" data-bs-target="#galleryModal" data-src="assets/img/gallery/event-${e.id}-${g}.svg">`).join("")}
      </div>

      <h2 class="h4">الموقع على الخريطة</h2>
      <img class="map-img mb-2" src="assets/img/map-${e.loc}.svg" alt="خريطة موقع ${LOCATIONS[e.loc]}">
      <p class="small text-muted-2"><i class="bi bi-geo-alt"></i> ${escapeHTML(e.venue)}، ${LOCATIONS[e.loc]}.</p>
    </div>

    <aside class="col-lg-4">
      <div class="info-card p-4 sticky-lg-top" style="top: 90px">
        <div class="info-row"><div class="ic"><i class="bi bi-calendar-event"></i></div><div><small class="text-muted-2">التاريخ</small><div class="fw-bold">${fmtRange(e)}</div></div></div>
        <div class="info-row"><div class="ic"><i class="bi bi-clock"></i></div><div><small class="text-muted-2">الوقت</small><div class="fw-bold">${e.time}</div></div></div>
        <div class="info-row"><div class="ic"><i class="bi bi-geo-alt"></i></div><div><small class="text-muted-2">المكان</small><div class="fw-bold">${escapeHTML(e.venue)}</div><small>${LOCATIONS[e.loc]}</small></div></div>
        <div class="info-row"><div class="ic"><i class="bi bi-ticket-perforated"></i></div><div><small class="text-muted-2">الرسوم</small><div class="fw-bold">${escapeHTML(e.price)}</div></div></div>
        <div class="my-3">
          <div class="d-flex justify-content-between small mb-1"><span>المقاعد المحجوزة</span><span class="fw-bold">${e.booked} / ${e.seats}</span></div>
          <div class="progress seats-bar" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"><div class="progress-bar ${pct > 85 ? "bg-danger" : "bg-success"}" style="width:${pct}%"></div></div>
          ${pct > 85 ? '<small class="text-danger fw-bold">⚡ المقاعد على وشك النفاد!</small>' : ""}
        </div>
        <div class="d-grid gap-2">
          <button class="btn btn-gradient rounded-pill fw-bold" data-bs-toggle="modal" data-bs-target="#bookingModal" data-event-id="${e.id}" ${st.key === "past" ? "disabled" : ""}><i class="bi bi-bookmark-check"></i> احجز مكانك</button>
          <button class="btn btn-outline-primary rounded-pill" id="addCal"><i class="bi bi-calendar-plus"></i> أضف للتقويم</button>
          <button class="btn btn-outline-secondary rounded-pill" id="shareBtn"><i class="bi bi-share"></i> شارك</button>
        </div>
        <div id="actionAlert" class="mt-3"></div>
      </div>
    </aside>
  </div>`;

  // معرض الصور: تكبير الصورة داخل Modal
  $("#galleryModal").addEventListener("show.bs.modal", (ev) => { $("#galleryImg").src = ev.relatedTarget.dataset.src; $("#galleryImg").alt = ev.relatedTarget.alt; });

  // زر "أضف للتقويم": إنشاء ملف .ics قياسي يفتح في أي تطبيق تقويم
  $("#addCal").addEventListener("click", () => {
    const d = (s, add = 0) => { const x = parseDate(s); x.setDate(x.getDate() + add); return `${x.getFullYear()}${String(x.getMonth() + 1).padStart(2, "0")}${String(x.getDate()).padStart(2, "0")}`; };
    const ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//SVU Events Guide//AR", "BEGIN:VEVENT",
      `UID:svu-event-${e.id}@svu-events`, `DTSTAMP:${d(new Date().toISOString().slice(0, 10))}T000000Z`,
      `DTSTART;VALUE=DATE:${d(e.date)}`, `DTEND;VALUE=DATE:${d(e.endDate || e.date, 1)}`,
      `SUMMARY:${e.title}`, `LOCATION:${e.venue} - ${LOCATIONS[e.loc]}`, `DESCRIPTION:${e.short}`, "END:VEVENT", "END:VCALENDAR"].join("\r\n");
    const a = Object.assign(document.createElement("a"), { href: URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" })), download: `svu-event-${e.id}.ics` });
    document.body.appendChild(a); a.click(); a.remove();
    showAlert($("#actionAlert"), "success", "تم تنزيل ملف التقويم (.ics)، افتحه لإضافة الفعالية إلى تقويمك.");
  });

  // زر "شارك": واجهة المشاركة الأصلية إن توفرت، وإلا نسخ الرابط
  $("#shareBtn").addEventListener("click", async () => {
    const data = { title: e.title, text: e.short, url: location.href };
    try {
      if (navigator.share) { await navigator.share(data); return; }
      await navigator.clipboard.writeText(location.href);
      showAlert($("#actionAlert"), "success", "تم نسخ رابط الفعالية إلى الحافظة 📋");
    } catch (err) {
      if (err?.name !== "AbortError") showAlert($("#actionAlert"), "warning", `انسخ الرابط يدوياً:<br><small dir="ltr" class="text-break">${escapeHTML(location.href)}</small>`);
    }
  });

  // فعاليات ذات صلة: نفس التصنيف أولاً ثم نفس المدينة
  const related = EVENTS.filter((x) => x.id !== e.id && x.cat === e.cat)
    .concat(EVENTS.filter((x) => x.id !== e.id && x.cat !== e.cat && x.loc === e.loc));
  // إكمال القائمة حتى 3 فعاليات بأقرب الفعاليات القادمة
  EVENTS.filter((x) => x.id !== e.id && !related.includes(x)).sort((a, b) => parseDate(a.date) - parseDate(b.date))
    .forEach((x) => related.length < 3 && related.push(x));
  $("#relatedGrid").innerHTML = related.map((x) => `<div class="col-12 col-md-4">${eventCardHTML(x)}</div>`).join("");
  $("#bookingForm").dataset.eventId = e.id;
}

/* ---------- 9) صفحة اتصل بنا: تحقق من النموذج ---------- */
function initContact() {
  const form = $("#contactForm"), alertBox = $("#contactAlert");
  const name = $("#cName"), email = $("#cEmail"), phone = $("#cPhone"), subject = $("#cSubject"), msg = $("#cMessage");
  const MIN = 20, MAX = 500;

  msg.addEventListener("input", () => { $("#charCount").textContent = `${msg.value.length} / ${MAX}`; });

  // قواعد التحقق لكل حقل مع رسالة خطأ واضحة
  const rules = [
    [name, () => name.value.trim().length >= 3, "الاسم مطلوب (3 أحرف على الأقل)."],
    [email, () => EMAIL_RE.test(email.value.trim()), "يرجى إدخال بريد إلكتروني صحيح مثل name@example.com."],
    [phone, () => !phone.value.trim() || PHONE_RE.test(phone.value.trim()), "رقم الهاتف غير صالح (أرقام فقط، 8-15 خانة)."],
    [subject, () => subject.value !== "", "يرجى اختيار موضوع الرسالة."],
    [msg, () => msg.value.trim().length >= MIN && msg.value.length <= MAX, `الرسالة مطلوبة (${MIN} حرفاً على الأقل).`],
  ];

  const validateField = ([el, test, text]) => {
    const ok = test();
    el.classList.toggle("is-invalid", !ok); el.classList.toggle("is-valid", ok);
    el.nextElementSibling?.classList.contains("invalid-feedback") && (el.nextElementSibling.textContent = text);
    return ok;
  };

  // التحقق الفوري بعد مغادرة الحقل
  rules.forEach((r) => { r[0].addEventListener("blur", () => validateField(r)); r[0].addEventListener("input", () => r[0].classList.contains("is-invalid") && validateField(r)); });

  form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const failed = rules.filter((r) => !validateField(r));
    if (failed.length) {
      showAlert(alertBox, "danger", `<strong>تعذّر الإرسال.</strong> يرجى تصحيح الحقول التالية:<ul class="mb-0">${failed.map((r) => `<li>${r[2]}</li>`).join("")}</ul>`);
      failed[0][0].focus({ preventScroll: true });
      return;
    }
    // لا يوجد خادم: نحاكي الإرسال ونحفظ الرسالة محلياً
    const btn = $("#contactSubmit"); btn.disabled = true;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> جارٍ الإرسال...';
    setTimeout(() => {
      const msgs = store.get("messages", []); msgs.push({ name: name.value.trim(), email: email.value.trim(), subject: subject.value, at: Date.now() }); store.set("messages", msgs);
      showAlert(alertBox, "success", `<strong>شكراً ${escapeHTML(name.value.trim())}!</strong> تم استلام رسالتك بنجاح، وسنرد عليك خلال 48 ساعة على <span dir="ltr">${escapeHTML(email.value.trim())}</span>.`);
      form.reset(); $$(".is-valid", form).forEach((el) => el.classList.remove("is-valid")); $("#charCount").textContent = `0 / ${MAX}`;
      btn.disabled = false; btn.innerHTML = '<i class="bi bi-send"></i> إرسال الرسالة';
    }, 900);
  });
}

/* ---------- 10) نموذج اقتراح فعالية (صفحة عن الدليل) ---------- */
function initSuggest() {
  const form = $("#suggestForm"); if (!form) return;
  form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const em = $("#sgEmail"); em.setCustomValidity(EMAIL_RE.test(em.value.trim()) ? "" : "invalid");
    if (!form.checkValidity()) { form.classList.add("was-validated"); return; }
    showAlert($("#suggestAlert"), "success", "شكراً لاقتراحك! سيراجعه فريق التحرير وفق معايير النشر خلال 3 أيام عمل.");
    form.reset(); form.classList.remove("was-validated");
  });
}

/* ---------- 11) نقطة الانطلاق ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initTheme(); initToTop(); initActiveNav(); initBookingModal();
  const year = $("#year"); if (year) year.textContent = new Date().getFullYear();
  const page = document.body.dataset.page;
  ({ home: initHome, events: initEvents, event: initEventDetails, contact: initContact, about: initSuggest }[page] || (() => {}))();
  initReveal();
});
