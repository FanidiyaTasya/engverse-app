export default function Header({ avatarUrl, name, activeRoute }) {
    const isActive = (route) =>
        route === activeRoute
            ? 'text-indigo-600 border-b-2 border-indigo-600 pb-3'
            : 'text-gray-700 hover:text-indigo-600';

    return `
    <header class="bg-white shadow-sm border border-gray-200 rounded-b-2xl">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          
          <div class="flex items-center space-x-3">
            <span class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm">E</span>
            <a href="#/dashboard" class="text-gray-900 font-bold text-base">Engverse</a>
          </div>

          <div class="hidden md:flex space-x-8">
            <a href="#/dashboard" class="${isActive('#/dashboard')} flex items-center space-x-1">
                <i class="fas fa-home"></i>
                <span>Dashboard</span>
            </a>
            <a href="#/practice" class="${isActive('#/practice')} flex items-center space-x-1">
                <i class="fas fa-clipboard-list"></i>
                <span>Practice</span>
            </a>
          </div>

          <div class="relative">
            <div class="dropdown-trigger flex items-center space-x-3 px-3 py-1.5 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer">
              <img src="${avatarUrl}" alt="Profile" class="w-8 h-8 rounded-full object-cover" />
              <div class="flex flex-col leading-tight">
                <p class="text-sm text-gray-400">Welcome,</p>
                <p class="text-sm font-semibold text-gray-900">${name}</p>
              </div>
              <i class="fas fa-chevron-down text-gray-400 text-xs"></i>
            </div>

            <div class="dropdown-menu absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-md hidden z-10">
              <span class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</span>
              <span class="block px-4 py-2 text-sm text-red-600 hover:bg-red-50">Keluar</span>
            </div>
          </div>

        </div>
      </nav>
    </header>
  `;
}

export function setupDropdownToggle() {
  document.querySelectorAll('.dropdown-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const dropdown = trigger.nextElementSibling;
      dropdown.classList.toggle('hidden');
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
      menu.classList.add('hidden');
    });
  });
}
