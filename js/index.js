function redirectPage(url) {
  window.location.assign(url);
}

function fileExists(name) {
  if (url) {
    var req = new XMLHttpRequest();
    req.open("GET", `../assets/projects/${name}.png`, false);
    req.send();
    return true;
  } else {
    return false;
  }
}
window.addEventListener("load", async () => {
  const projectsDiv = document.getElementById("projects");
  const data = await fetch("https://api.github.com/users/Du2Du/repos");
  const projects = await data.json();
  console.log(projects);

  projectsDiv.innerHTML = projects
    .map((project) => {
      const { id, name } = project;
      // console.log(is_img(name));
      const img = fileExists(name) ? name : "../assets/projects/notImg.jpg";
      return id !== 574497729
        ? `<div class="project">
        <img
         src="${img}"
         alt="ProjectImg"
         width="300"
         height="300" />
        <span>${name}</span>
      </div>`
        : null;
    })
    .join("");
});
