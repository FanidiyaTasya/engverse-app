class HeaderApp extends HTMLElement {

  connectedCallback() {
    const name = this.getAttribute('name') || 'Tasyyaaa';
    const email = this.getAttribute('email') || 'tasya@example.com';

    this.innerHTML = `
    <header class="bg-white shadow-sm border border-gray-200 rounded-b-2xl">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          
          <div id="logo" class="text-2xl font-bold text-blue-600 cursor-pointer flex items-center">
            <a href="#/dashboard">Engverse</a>
          </div>

          <div class="flex gap-8">
            <a id="dashboardLink" href="#/dashboard" class="underline-animation inactive-link">
              <icon-svg name="squares" class="w-5 h-5 inline mr-1"></icon-svg> Dashboard
            </a>
            <a id="practiceLink" href="#/practice" class="underline-animation inactive-link">
              <icon-svg name="book_open" class="w-5 h-5 inline mr-1"></icon-svg>
              Practice
            </a>
          </div>

          <div class="relative">
            <div id="profileToggle" class="dropdown-trigger flex items-center space-x-3 px-3 py-1.5 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer">
              <div
                class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600 group-hover:bg-gray-300">
                T</div>
              <div class="flex flex-col leading-tight">
                <p class="text-sm text-gray-400">Welcome,</p>
                <p class="text-sm font-semibold text-gray-900">${name}</p>
              </div>
              <icon-svg name="chevron_down" class="size-4"></icon-svg>
            </div>

            <div id="profileDropdown"
              class="absolute right-0 top-14 bg-white rounded-lg shadow-lg w-64 p-5 hidden z-50 border border-gray-100">
              <h3 class="text-base font-semibold text-gray-800 mb-4 flex items-center">Profile</h3>

              <div class="mb-4">
                <div class="mb-2">
                  <p class="text-xs text-gray-500 flex items-center">
                    <icon-svg name="user" class="w-3 h-3 mr-1"></icon-svg> Your Name
                  </p>
                  <p class="text-sm font-medium text-gray-800 ml-4">${name}</p>
                </div>
                <div>
                  <p class="text-xs text-gray-500 flex items-center">
                    <icon-svg name="mail" class="w-3 h-3 mr-1"></icon-svg> Email
                  </p>
                  <p class="text-sm font-medium text-gray-800 ml-4">${email}</p>
                </div>
              </div>

              <div class="border-t border-gray-200 my-3"></div>

              <a href="#/login" id="logoutBtn"
                class="w-full flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-red-600 transition-colors">
                <icon-svg name="logout" class="w-4 h-4"></icon-svg> Logout
              </a>
            </div>
          </div>

        </div>
      </nav>
    </header>
    `;

    const links = {
      '#/dashboard': this.querySelector('#dashboardLink'),
      '#/practice': this.querySelector('#practiceLink'),
    };

    function setActiveLink() {
      const currentHash = window.location.hash;

      Object.entries(links).forEach(([hash, element]) => {
        if (element) {
          if (currentHash === hash) {
            element.classList.add('active-link');
            element.classList.remove('inactive-link');
          } else {
            element.classList.add('inactive-link');
            element.classList.remove('active-link');
          }
        }
      });
    }

    setActiveLink();
    window.addEventListener('hashchange', setActiveLink);

    const toggle = this.querySelector('#profileToggle');
    const dropdown = this.querySelector('#profileDropdown');

    toggle.addEventListener('click', () => {
      dropdown.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
      if (!this.contains(e.target)) return;

      if (dropdown.classList.contains('hidden')) return;

      if (
        e.target !== toggle &&
        !toggle.contains(e.target) &&
        !dropdown.contains(e.target)
      ) {
        dropdown.classList.add('hidden');
      }
    });
  }
}

customElements.define('header-app', HeaderApp);