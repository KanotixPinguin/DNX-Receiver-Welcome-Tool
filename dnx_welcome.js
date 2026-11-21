/* dnx-welcome v4: Begruessung in DE/EN/RU/NL gleichzeitig, keine Spracherkennung */
(function(){
  var SHOW_EVERY_TIME = false;
  var KEY_SEEN = "dnx_welcome_seen";
  var TEXT = [
    {
      code: "de",
      title: "Deutsch – Willkommen auf dem DNX Receiver",
      p1: "Die Registrierung ist freiwillig und kostenlos. Sie schützt den Receiver vor Überlastung und Störungen. Wie und warum sicher: Dein Passwort wird nur lokal auf diesem Server gespeichert und nie an Dritte weitergegeben. Der Login nutzt ein Sitzungs-Cookie mit begrenzter Laufzeit; du kannst dich jederzeit abmelden. Kein Tracking, keine Werbung.",
      p2: "Als registrierter Nutzer darfst du: Profile wechseln und speichern, auch geschützte Betriebsarten; eine eigene Sitzungsdauer wählen; mit deinem Namen in der Besucheranzeige erscheinen; den Scanner bedienen.",
      p3: "Ohne Registrierung darfst du weiterhin: zuhören, Frequenzen und erlaubte Profile umschalten, Aufnahmen downloaden, Scanner und Besucheranzeige ansehen. Die Scanner-Bedienung bleibt Registrierten vorbehalten."
    },
    {
      code: "en",
      title: "English – Welcome to the DNX Receiver",
      p1: "Registration is voluntary and free. It protects the receiver from overload and interference. How and why it is safe: your password is stored only on this local server and never shared with third parties. Login uses a session cookie with limited lifetime; you can log out at any time. No tracking, no advertising.",
      p2: "As a registered user you may: switch and save profiles, including protected modes; choose your own session duration; appear with your name in the visitor list; operate the scanner.",
      p3: "Without registration you can still: listen, switch frequencies and permitted profiles, download recordings, and view the scanner and visitor list. Scanner control is reserved for registered users."
    },
    {
      code: "ru",
      title: "Русский – Добро пожаловать на DNX Receiver",
      p1: "Регистрация добровольная и бесплатная. Она защищает приёмник от перегрузки и помех. Как и почему это безопасно: ваш пароль хранится только на этом локальном сервере и не передаётся третьим лицам. Вход выполняется через cookie сессии с ограниченным сроком действия; выйти можно в любой момент. Без отслеживания и рекламы.",
      p2: "Зарегистрированные пользователи могут: переключать и сохранять профили, включая защищённые режимы; выбирать длительность сессии; отображаться под своим именем в списке посетителей; управлять сканером.",
      p3: "Без регистрации вы по-прежнему можете: слушать эфир, переключать частоты и разрешённые профили, скачивать записи, просматривать сканер и список посетителей. Управление сканером доступно только зарегистрированным."
    },
    {
      code: "nl",
      title: "Nederlands – Welkom bij de DNX Receiver",
      p1: "Registratie is vrijwillig en gratis. Zij beschermt de receiver tegen overbelasting en storingen. Hoe en waarom veilig: je wachtwoord wordt alleen lokaal op deze server opgeslagen en nooit aan derden doorgegeven. De login gebruikt een sessie-cookie met beperkte looptijd; je kunt je altijd afmelden. Geen tracking, geen reclame.",
      p2: "Als geregistreerde gebruiker mag je: profielen wisselen en opslaan, ook beschermde bedrijfsmodi; een eigen sessieduur kiezen; met je naam in de bezoekersweergave verschijnen; de scanner bedienen.",
      p3: "Zonder registratie mag je blijven: luisteren, frequenties en toegestane profielen omschakelen, opnames downloaden, scanner en bezoekersweergave bekijken. De bediening van de scanner blijft geregistreerde gebruikers voorbehouden."
    }
  ];
  var EXTRA_KEY = "dnx_welcome_extra";
  var EXTRA = [
    { code: "uk", flag: "🇺🇦", label: "Українська",
      title: "Українська – Вітаємо на DNX Receiver",
      p1: "Реєстрація добровільна та безкоштовна. Вона захищає приймач від перевантаження та перешкод. Як і чому це безпечно: ваш пароль зберігається лише на цьому локальному сервері й не передається третім особам. Вхід виконується через cookie сесії з обмеженим строком дії; вийти можна будь-коли. Без відстеження та реклами.",
      p2: "Зареєстровані користувачі можуть: перемикати та зберігати профілі, включно із захищеними режимами; обирати тривалість сесії; відображатися під своїм ім'ям у списку відвідувачів; керувати сканером.",
      p3: "Без реєстрації ви й надалі можете: слухати ефір, перемикати частоти й дозволені профілі, завантажувати записи, переглядати сканер і список відвідувачів. Керування сканером доступне лише зареєстрованим." },
    { code: "es", flag: "🇪🇸", label: "Español",
      title: "Español – Bienvenido al DNX Receiver",
      p1: "El registro es voluntario y gratuito. Protege el receptor frente a sobrecargas e interferencias. Cómo y por qué es seguro: tu contraseña se guarda solo en este servidor local y nunca se comparte con terceros. El inicio de sesión usa una cookie de sesión con duración limitada; puedes cerrar sesión en cualquier momento. Sin rastreo, sin publicidad.",
      p2: "Como usuario registrado puedes: cambiar y guardar perfiles, incluidos los modos protegidos; elegir la duración de tu sesión; aparecer con tu nombre en la lista de visitantes; manejar el escáner.",
      p3: "Sin registro puedes seguir: escuchando, cambiando frecuencias y perfiles permitidos, descargando grabaciones y viendo el escáner y la lista de visitantes. El manejo del escáner queda reservado a usuarios registrados." },
    { code: "zh", flag: "🇨🇳", label: "中文",
      title: "中文 – 欢迎来到 DNX 接收机",
      p1: "注册自愿且免费。它可以保护接收机免受过载和干扰。为何安全以及如何安全:您的密码仅保存在本服务器,绝不会提供给第三方。登录使用有期限的会话 Cookie;您可随时退出。无跟踪、无广告。",
      p2: "注册用户可以:切换并保存配置文件(包括受保护模式);自选会话时长;以您的名字显示在访客列表中;操作扫描仪。",
      p3: "未注册仍可:收听、切换频率和允许的配置、下载录音、查看扫描仪和访客列表。扫描仪操作仅限注册用户。" },
    { code: "ja", flag: "🇯🇵", label: "日本語",
      title: "日本語 – DNX Receiver へようこそ",
      p1: "登録は任意・無料です。受信機を過負荷や混信から守ります。安全な理由と仕組み:パスワードはこのローカルサーバーにのみ保存され、第三者へ提供されません。ログインは有効期限付きのセッションCookieを使用し、いつでもログアウトできます。トラッキングや広告はありません。",
      p2: "登録ユーザーは:保護モードを含むプロファイルの切替と保存、セッション時間の選択、訪問者リストへの名前表示、スキャナーの操作ができます。",
      p3: "未登録でも:聴取、周波数と許可プロファイルの切替、録音のダウンロード、スキャナーと訪問者リストの閲覧が可能です。スキャナーの操作は登録ユーザーに限られます。" },
    { code: "ko", flag: "🇰🇷", label: "한국어",
      title: "한국어 – DNX Receiver에 오신 것을 환영합니다",
      p1: "가입은 자율이며 무료입니다. 수신기를 과부하와 간섭으로부터 보호합니다. 안전한 이유와 방법: 비밀번호는 이 로컬 서버에만 저장되며 제3자에게 제공되지 않습니다. 로그인은 유효 기간이 있는 세션 쿠키를 사용하며 언제든지 로그아웃할 수 있습니다. 추적과 광고가 없습니다.",
      p2: "등록 사용자는: 보호 모드를 포함한 프로필 전환 및 저장, 세션 시간 선택, 방문자 목록에 이름 표시, 스캐너 조작이 가능합니다.",
      p3: "미등록 상태에서도: 청취, 주파수 및 허용된 프로필 전환, 녹음 다운로드, 스캐너와 방문자 목록 열람이 가능합니다. 스캐너 조작은 등록 사용자만 할 수 있습니다." },
    { code: "vi", flag: "🇻🇳", label: "Tiếng Việt",
      title: "Tiếng Việt – Chào mừng đến DNX Receiver",
      p1: "Đăng ký là tự nguyện và miễn phí. Nó bảo vệ máy thu khỏi quá tải và nhiễu. Vì sao và cách thức an toàn: mật khẩu của bạn chỉ lưu trên máy chủ cục bộ này, không chia sẻ cho bên thứ ba. Đăng nhập dùng cookie phiên có thời hạn; bạn có thể đăng xuất bất cứ lúc nào. Không theo dõi, không quảng cáo.",
      p2: "Người dùng đã đăng ký có thể: chuyển và lưu hồ sơ, gồm cả chế độ được bảo vệ; chọn thời lượng phiên; hiển thị tên trong danh sách khách; điều khiển máy quét.",
      p3: "Không đăng ký bạn vẫn có thể: nghe, chuyển tần số và hồ sơ được phép, tải bản ghi, xem máy quét và danh sách khách. Điều khiển máy quét chỉ dành cho người đã đăng ký." },
    { code: "th", flag: "🇹🇭", label: "ไทย",
      title: "ไทย – ยินดีต้อนรับสู่ DNX Receiver",
      p1: "การสมัครเป็นไปตามสมัครใจและฟรี ช่วยปกป้องเครื่องรับจากภาระเกินและการรบกวน ปลอดภัยอย่างไรและเพราะอะไร: รหัสผ่านของคุณเก็บเฉพาะบนเซิร์ฟเวอร์ท้องถิ่นนี้ ไม่ส่งต่อให้บุคคลที่สาม การเข้าสู่ระบบใช้คุกกี้เซสชันที่มีอายุจำกัด ออกได้ทุกเมื่อ ไม่มีการติดตามหรือโฆษณา",
      p2: "ผู้ใช้ที่ลงทะเบียนสามารถ: สลับและบันทึกโปรไฟล์รวมถึงโหมดที่ป้องกัน, เลือกระยะเวลาเซสชัน, แสดงชื่อในรายชื่อผู้ชม, ควบคุมสแกนเนอร์",
      p3: "โดยไม่ต้องลงทะเบียนคุณยังสามารถ: ฟัง, สลับความถี่และโปรไฟล์ที่อนุญาต, ดาวน์โหลดบันทึก, ดูสแกนเนอร์และรายชื่อผู้ชม การควบคุมสแกนเนอร์สงวนไว้สำหรับผู้ใช้ที่ลงทะเบียน" }
  ];
  var FLAGS = {
    de: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 16'><rect width='24' height='16' fill='#000'/><rect y='5.33' width='24' height='5.34' fill='#dd0000'/><rect y='10.67' width='24' height='5.33' fill='#ffce00'/></svg>",
    en: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 16'><rect width='24' height='16' fill='#012169'/><path d='M0,0 24,16 M24,0 0,16' stroke='#fff' stroke-width='3.2'/><path d='M0,0 24,16 M24,0 0,16' stroke='#C8102E' stroke-width='1.6'/><path d='M12,0 V16 M0,8 H24' stroke='#fff' stroke-width='5.3'/><path d='M12,0 V16 M0,8 H24' stroke='#C8102E' stroke-width='3.2'/></svg>",
    ru: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 16'><rect width='24' height='16' fill='#fff'/><rect y='5.33' width='24' height='5.34' fill='#0039a6'/><rect y='10.67' width='24' height='5.33' fill='#d52b1e'/></svg>",
    nl: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 16'><rect width='24' height='16' fill='#ae1c28'/><rect y='5.33' width='24' height='5.34' fill='#fff'/><rect y='10.67' width='24' height='5.33' fill='#21468b'/></svg>",
    uk: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 16'><rect width='24' height='8' fill='#005bbb'/><rect y='8' width='24' height='8' fill='#ffd500'/></svg>",
    es: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 16'><rect width='24' height='16' fill='#aa151b'/><rect y='4' width='24' height='8' fill='#f1bf00'/></svg>",
    zh: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 16'><rect width='24' height='16' fill='#de2910'/><path fill='#ffde00' d='M4,1.5 L4.8,3.9 L7.3,3.9 L5.3,5.4 L6,7.8 L4,6.3 L2,7.8 L2.7,5.4 L0.7,3.9 L3.2,3.9 Z'/></svg>",
    ja: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 16'><rect width='24' height='16' fill='#fff'/><circle cx='12' cy='8' r='4.5' fill='#bc002d'/></svg>",
    ko: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 16'><rect width='24' height='16' fill='#fff'/><circle cx='12' cy='8' r='4.5' fill='#cd2e3a'/><path d='M7.5,8 A4.5,4.5 0 0,0 16.5,8 Z' fill='#0047a0'/></svg>",
    vi: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 16'><rect width='24' height='16' fill='#da251d'/><path fill='#ffff00' transform='translate(8,3.2)' d='M4,1.5 L4.8,3.9 L7.3,3.9 L5.3,5.4 L6,7.8 L4,6.3 L2,7.8 L2.7,5.4 L0.7,3.9 L3.2,3.9 Z'/></svg>",
    th: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 16'><rect width='24' height='16' fill='#a51931'/><rect y='2.67' width='24' height='10.66' fill='#f4f5f8'/><rect y='5.33' width='24' height='5.34' fill='#2d2a4a'/></svg>"
  };
  function flagImg(code){
    var i = document.createElement("img");
    i.src = "data:image/svg+xml;utf8," + encodeURIComponent(FLAGS[code] || "");
    i.alt = code;
    i.style.cssText = "width:20px;height:14px;margin-right:6px;vertical-align:-2px;border:1px solid rgba(255,255,255,.25);border-radius:2px;";
    return i;
  }
  var LABELS = {
    register: "Registrieren · Register · Регистрация · Registreren",
    login: "Anmelden · Log in · Вход · Inloggen",
    close: "Schließen · Close · Закрыть · Sluiten"
  };
  var base = location.protocol + "//" + location.hostname + ":8096";
  var wrap = null, refs = {};
  function el(t, c, x){
    var e = document.createElement(t);
    if(c) e.className = c;
    if(x != null) e.textContent = x;
    return e;
  }
  function build(){
    wrap = el("div");
    wrap.id = "dnx-welcome-modal";
    var s = wrap.style;
    s.position = "fixed"; s.left = "0"; s.top = "0"; s.right = "0"; s.bottom = "0";
    s.zIndex = "2147483000"; s.display = "none";
    s.alignItems = "center"; s.justifyContent = "center";
    s.padding = "16px"; s.background = "rgba(0,0,0,.55)"; s.boxSizing = "border-box";
    var card = el("div");
    var c = card.style;
    c.maxWidth = "620px"; c.width = "100%"; c.maxHeight = "86vh"; c.overflowY = "auto";
    c.background = "#0f1713"; c.color = "#e8f5ec";
    c.border = "2px solid rgba(50,255,120,.75)"; c.borderRadius = "12px";
    c.padding = "14px 18px 12px"; c.boxSizing = "border-box";
    c.fontFamily = "'Segoe UI',Arial,sans-serif"; c.fontSize = "12px"; c.lineHeight = "1.45";
    function section(t, first){
      var sec = el("div");
      sec.style.margin = "0 0 10px";
      if(!first){
        sec.style.borderTop = "1px solid rgba(255,255,255,.14)";
        sec.style.paddingTop = "8px";
      }
      var h = el("h3");
      h.style.cssText = "margin:0 0 6px;font-size:14px;color:#35ff83;";
      if(t.code && FLAGS[t.code]){ h.appendChild(flagImg(t.code)); }
      h.appendChild(el("span", null, t.title));
      var p1 = el("p", null, t.p1);
      var p2 = el("p", null, t.p2);
      var p3 = el("p", null, t.p3);
      [p1, p2, p3].forEach(function(p){ p.style.margin = "0 0 6px"; });
      p2.style.color = "#d7ffd9";
      p3.style.color = "#ffe9a8";
      sec.appendChild(h); sec.appendChild(p1); sec.appendChild(p2); sec.appendChild(p3);
      return sec;
    }
    TEXT.forEach(function(t, i){
      card.appendChild(section(t, i === 0));
    });
    var savedExtra = [];
    try { savedExtra = (localStorage.getItem(EXTRA_KEY) || "").split(","); } catch(e){}
    var xdiv = el("div");
    xdiv.style.cssText = "border-top:1px solid rgba(255,255,255,.14);padding-top:8px;margin:0 0 8px;";
    var xlbl = el("div", null, "Weitere Sprachen · More languages · Інші мови · Más idiomas · 更多语言 · その他の言語 · 다른 언어 · Ngôn ngữ khác · ภาษาอื่นๆ");
    xlbl.style.cssText = "font-size:11px;color:#9fb8a8;margin:0 0 6px;";
    xdiv.appendChild(xlbl);
    var xrow = el("div");
    xrow.style.cssText = "display:flex;gap:6px;flex-wrap:wrap;";
    xdiv.appendChild(xrow);
    card.appendChild(xdiv);
    var xholder = el("div");
    EXTRA.forEach(function(x){
      var sec = section(x, false);
      sec.style.display = "none";
      var b = el("button");
      if(FLAGS[x.code]){ b.appendChild(flagImg(x.code)); }
      b.appendChild(el("span", null, x.label));
      b.style.cssText = "padding:4px 8px;border-radius:999px;border:1px solid #35ff83;background:transparent;color:#b9efff;font:700 11px/1.4 'Segoe UI',Arial,sans-serif;cursor:pointer;";
      function setOn(on){
        sec.style.display = on ? "block" : "none";
        b.style.background = on ? "#1f7a3d" : "transparent";
        b.style.color = on ? "#fff" : "#b9efff";
        var codes = [];
        EXTRA.forEach(function(y, i2){
          if(y.__sec && y.__sec.style.display === "block") codes.push(y.code);
        });
        try { localStorage.setItem(EXTRA_KEY, codes.join(",")); } catch(e){}
        if(on){ try { sec.scrollIntoView({ block: "nearest" }); } catch(e){} }
      }
      x.__sec = sec;
      b.onclick = function(){ setOn(sec.style.display !== "block"); };
      xrow.appendChild(b);
      xholder.appendChild(sec);
      if(savedExtra.indexOf(x.code) !== -1){ setOn(true); }
    });
    card.appendChild(xholder);
    var brow = el("div");
    brow.style.cssText = "display:flex;gap:8px;flex-wrap:wrap;margin-top:4px;";
    var aReg = el("a", null, LABELS.register);
    aReg.target = "_blank"; aReg.rel = "noopener";
    aReg.style.cssText = "padding:6px 12px;border-radius:6px;background:#1f7a3d;color:#fff;text-decoration:none;font-weight:700;";
    var aLog = el("a", null, LABELS.login);
    aLog.target = "_blank"; aLog.rel = "noopener";
    aLog.style.cssText = "padding:6px 12px;border-radius:6px;background:#274069;color:#fff;text-decoration:none;font-weight:700;";
    var bClose = el("button", null, LABELS.close);
    bClose.style.cssText = "padding:6px 12px;border-radius:6px;border:1px solid #666;background:transparent;color:#ccc;cursor:pointer;";
    bClose.onclick = hideSeen;
    aReg.href = base + "/register";
    aLog.href = base + "/login";
    refs.aReg = aReg; refs.aLog = aLog; refs.bClose = bClose;
    brow.appendChild(aReg); brow.appendChild(aLog); brow.appendChild(bClose);
    card.appendChild(brow);
    wrap.appendChild(card);
    document.body.appendChild(wrap);
  }
  function show(){
    if(!wrap) build();
    wrap.style.display = "flex";
  }
  function hideSeen(){
    try { localStorage.setItem(KEY_SEEN, "1"); } catch(e){}
    if(wrap) wrap.style.display = "none";
  }
  window.dnxWelcomeShow = show;
  function start(){
    var seen = null;
    try { seen = localStorage.getItem(KEY_SEEN); } catch(e){}
    if(SHOW_EVERY_TIME || seen !== "1"){ setTimeout(show, 1200); }
  }
  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
