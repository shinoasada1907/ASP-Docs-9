/* Shared behaviour for the ASP.NET Core .NET 9 doc site */
(function () {
  "use strict";

  /* ---- Copy-to-clipboard for every code block ---- */
  document.querySelectorAll(".code").forEach(function (block) {
    var head = block.querySelector(".code-head");
    if (!head) return;
    var btn = document.createElement("button");
    btn.className = "copy-btn";
    btn.type = "button";
    btn.textContent = "Sao chép";
    head.appendChild(btn);
    btn.addEventListener("click", function () {
      var code = block.querySelector("code");
      if (!code) return;
      var text = code.innerText;
      navigator.clipboard.writeText(text).then(function () {
        btn.textContent = "Đã chép ✓";
        setTimeout(function () { btn.textContent = "Sao chép"; }, 1500);
      }).catch(function () {
        btn.textContent = "Lỗi";
        setTimeout(function () { btn.textContent = "Sao chép"; }, 1500);
      });
    });
  });

  /* ---- Sidebar active-section highlight on scroll ---- */
  var tocLinks = Array.prototype.slice.call(document.querySelectorAll(".sidebar .toc a"));
  var sections = tocLinks
    .map(function (a) {
      var id = a.getAttribute("href");
      if (id && id.charAt(0) === "#") return document.querySelector(id);
      return null;
    })
    .filter(Boolean);

  if (sections.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = "#" + entry.target.id;
          tocLinks.forEach(function (a) {
            a.classList.toggle("active", a.getAttribute("href") === id);
          });
        }
      });
    }, { rootMargin: "-80px 0px -70% 0px", threshold: 0 });
    sections.forEach(function (s) { observer.observe(s); });
  }

  /* ---- Mobile sidebar toggle ---- */
  var toggle = document.querySelector(".menu-toggle");
  var sidebar = document.querySelector(".sidebar");
  if (toggle && sidebar) {
    toggle.addEventListener("click", function () { sidebar.classList.toggle("open"); });
    sidebar.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { sidebar.classList.remove("open"); });
    });
  }
})();
