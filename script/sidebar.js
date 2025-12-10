function renderSidebar() {
  // Define navigation items
  const navItems = [
    { name: 'Weather', icon: 'fa-cloud-sun-rain', link: 'home.html' },
    { name: 'Cities', icon: 'fa-list-ul', link: 'cities.html' },
    { name: 'Map', icon: 'fa-map', link: 'map.html' },
    { name: 'Settings', icon: 'fa-sliders', link: 'settings.html' }
  ];

  // Create sidebar element
  const sidebar = document.createElement('section');
  sidebar.className = 'side-nav';

  // Logo div
  const logoDiv = document.createElement('div');
  const logoLink = document.createElement('a');
  logoLink.href = 'home.html';
  const logoImg = document.createElement('img');
  logoImg.src = '../images/umbrella.png';
  logoLink.appendChild(logoImg);
  logoDiv.appendChild(logoLink);
  sidebar.appendChild(logoDiv);

  // Get current page filename to determine active state
  const currentPage = window.location.pathname.split('/').pop() || 'home.html';

  // Create nav items
  navItems.forEach(item => {
    const div = document.createElement('div');
    if (currentPage === item.link) {
      div.className = 'active';
    }

    const anchor = document.createElement('a');
    anchor.href = item.link;

    const icon = document.createElement('i');
    icon.className = `fa-solid ${item.icon}`;

    const p = document.createElement('p');
    p.textContent = item.name;

    anchor.appendChild(icon);
    anchor.appendChild(p);
    div.appendChild(anchor);
    sidebar.appendChild(div);
  });

  // Inject Sidebar into body at the beginning
  document.body.prepend(sidebar);
}

document.addEventListener('DOMContentLoaded', renderSidebar);
