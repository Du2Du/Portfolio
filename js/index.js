function redirectPage(url) {
  window.location.assign(url);
}
async function isUrlFound(name) {
  try {
    const response = await fetch(`../assets/projects/${name}.png`, {
      method: "HEAD",
      cache: "no-cache",
    });

    return response.status === 200;
  } catch (error) {
    return false;
  }
}

window.addEventListener("load", async () => {
  const projectsDiv = document.getElementById("projects");
  const data = await fetch("https://api.github.com/users/Du2Du/repos");
  const projects = await data.json();
  console.log(projects);

  projectsDiv.innerHTML = projects
    .map(async (project) => {
      const { id, name } = project;

      const img = (await isUrlFound(name))
        ? `../assets/projects/${name}.png`
        : "../assets/projects/notImg.jpg";

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
