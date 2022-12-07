function redirectPage(url) {
  window.open(url, "_blank").focus();
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
  const queryId = window.location.href.split("?")[1];
  const idValue = queryId.split("=")[1];

  const data = await fetch("https://api.github.com/users/Du2Du/repos");
  const projects = await data.json();
  const filteredProject = projects.find(
    (project) => project.id === Number(idValue)
  );
  const { name, topics, description, html_url, homepage } = filteredProject;
  const projectDiv = document.getElementById("project");
  const img = (await isUrlFound(name))
    ? `../assets/projects/${name}.png`
    : "../assets/projects/notImg.jpg";

  projectDiv.innerHTML = `
  <div class="img">
    <img src="${img}" alt="ProjectImg" />
  </div>
  <div class="info">
    <div class="principalInfo">
      <span class="projectName">${name}</span>
      <span class="status${homepage ? "On" : "Off"}">${
    homepage ? "Online" : "Offline"
  }</span>
    </div>
    <div class="tags">
      ${topics.map((topic) => ` <span class="tag">${topic}</span>`).join("")}  
    </div>
    <div class="description">${description}</div>
    <hr/>
    <div class="links">
      <span class="url" onclick='redirectPage("${html_url}")'>Github</span>
     
      ${
        homepage
          ? `<span class="domain" onclick='redirectPage("${homepage}")'>Site</span>`
          : ""
      }
    </div>
  </div>
  `;
});
