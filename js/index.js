import { projects } from "./projects";

function redirectPage(url) {
  window.location.assign(url);
}

window.addEventListener("load", () => {
  const projectsDiv = document.getElementById("projects");
  projectsDiv.innerHTML = projects.map((project) => project.projectName);
});
