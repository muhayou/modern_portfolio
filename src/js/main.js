// Select DOM items.
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');
const menuNav = document.querySelector('.menu-nav');
const menuBranding = document.querySelector('.menu-branding');
const navItems = document.querySelectorAll('.nav-item');

// Set initial state of menu.
let showMenu = false;

menuBtn.addEventListener('click', toggleMenu);

function toggleMenu() {
  if (!showMenu) {
    menuBtn.classList.add('close');
    menu.classList.add('show');
    menuNav.classList.add('show');
    menuBranding.classList.add('show');
    navItems.forEach(item => item.classList.add('show'));
  } else {
    menuBtn.classList.remove('close');
    menu.classList.remove('show');
    menuNav.classList.remove('show');
    menuBranding.classList.remove('show');
    navItems.forEach(item => item.classList.remove('show'));
  }
  // Set menu state.
  showMenu = !showMenu;
}

function getReposName(reposType) {
  switch (reposType) {
    case "github": return "Github";
    case "gitlab": return "Gitlab";
    default: return "";
  }
}

/**
 * Add font-awesome icon.
 * @param {*} element 
 * @param {*} reposType 
 */
function addReposIcon(element, reposType) {
  switch (reposType) {
    case "github": element.classList.add("fab", "fa-github"); break;
    case "gitlab": element.classList.add("fab", "fa-gitlab"); break;
    default: break;
  }
}

function generateProject() {
  const id = (new URL(document.location)).searchParams.get("id");
  const proj = JSON.parse(projs).projects[id - 1];
  
  let tag = document.getElementsByClassName("lg-heading");
  tag[0].innerText = proj.name;

  
}

/**
 * Generate project list.
 */
function generateProjects() {
  const jsonObj = JSON.parse(projs);

  const items = document.getElementsByClassName("projects");
  if (items == null) {
    alert('Could not find projects class.')
    return;
  }
  
  for (i in jsonObj.projects) {
    let item = document.createElement("div");
    item.classList.add("item");

    // Project detail link.
    let img = document.createElement("img");
    img.setAttribute("src", jsonObj.projects[i].image);
    img.setAttribute("alt", jsonObj.projects[i].name);
    let lnk = document.createElement("a");
    lnk.setAttribute("href", "work-detail.html?id=" + jsonObj.projects[i].id);
    lnk.appendChild(img);
    item.appendChild(lnk);

    // Project operation site link.
    lnk = document.createElement("a");
    lnk.setAttribute("href", jsonObj.projects[i].site);
    lnk.classList.add("btn-light");
    let icn = document.createElement("i");
    icn.classList.add("fas", "fa-eye");
    lnk.appendChild(icn);
    let txt = document.createTextNode(" " + jsonObj.projects[i].name);
    lnk.appendChild(txt);
    item.appendChild(lnk);

    // Github source code link.
    lnk = document.createElement("a");
    lnk.setAttribute("href", jsonObj.projects[i].repos.url);
    lnk.classList.add("btn-dark");
    icn = document.createElement("i");
    addReposIcon(icn, jsonObj.projects[i].repos.type)
    lnk.appendChild(icn);
    txt = document.createTextNode(" " + 
      getReposName(jsonObj.projects[i].repos.type));
    lnk.appendChild(txt);
    item.appendChild(lnk);

    items[0].appendChild(item); 
  }


}