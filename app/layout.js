import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "Monis Rent",
  description: "Modern rental website scaffolded with Next.js and Tailwind CSS."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Script id="builder-form-enhancer" strategy="beforeInteractive">{`
          (function () {
            if (typeof window === 'undefined') return;
            var parser = new DOMParser();
            var inFlight = null;

            function isBuilderForm(form) {
              return !!(form && form.matches && form.matches('form[data-builder-form="true"]'));
            }

            function syncDocument(nextDoc) {
              var currentMain = document.querySelector('main');
              var nextMain = nextDoc.querySelector('main');
              if (!currentMain || !nextMain) return false;
              currentMain.replaceWith(nextMain);

              var currentTitle = nextDoc.querySelector('title');
              if (currentTitle) document.title = currentTitle.textContent || document.title;
              return true;
            }

            async function loadIntoPage(url, mode) {
              if (inFlight && typeof inFlight.abort === 'function') inFlight.abort();
              var controller = new AbortController();
              inFlight = controller;

              try {
                var response = await fetch(url, {
                  signal: controller.signal,
                  headers: { 'X-Requested-With': 'builder-enhancer' }
                });
                if (!response.ok) throw new Error('Request failed');
                var html = await response.text();
                var nextDoc = parser.parseFromString(html, 'text/html');
                if (!syncDocument(nextDoc)) {
                  window.location.assign(url);
                  return;
                }
                window.history[mode + 'State']({}, '', url);
              } catch (error) {
                if (error && error.name === 'AbortError') return;
                window.location.assign(url);
              }
            }

            document.addEventListener('submit', function (event) {
              var form = event.target;
              if (!isBuilderForm(form)) return;
              event.preventDefault();
              var action = form.getAttribute('action') || window.location.pathname;
              var url = new URL(action, window.location.href);
              var formData = new FormData(form);
              url.search = new URLSearchParams(formData).toString();
              loadIntoPage(url.toString(), 'push');
            }, true);

            window.addEventListener('popstate', function () {
              loadIntoPage(window.location.href, 'replace');
            });
          })();
        `}</Script>
        {children}
      </body>
    </html>
  );
}
