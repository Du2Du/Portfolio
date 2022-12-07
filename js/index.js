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

  projectsDiv.innerHTML = (
    await Promise.all(
      projects.map(async (project) => {
        const { id, name, stargazers_count: stars } = project;

        const img = (await isUrlFound(name))
          ? `../assets/projects/${name}.png`
          : "../assets/projects/notImg.jpg";

        return id !== 574497729 && id !== 401799527 && id !== 384554189
          ? `<div class="project" onclick='redirectPage(${id})'>
        <img
         src="${img}"
         alt="ProjectImg"
         width="290"
         height="200" />
        <div class="info">
          <span>${name}</span>
          <div class="stars">
            ${stars}
            <img
            src="../assets/star.png"
            alt="Star Icon by Chamestudio on IconScout"
            width="24"
            class="starImg"
            height="24" />
          </div>
        </div>
      </div>`
          : null;
      })
    )
  ).join("");
});
