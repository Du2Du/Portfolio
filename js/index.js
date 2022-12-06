function redirectPage(url) {
  window.location.assign(url);
}

const projects = [
  {
    projectName: "teste",
  },
];

window.addEventListener("load", () => {
  const projectsDiv = document.getElementById("projects");
  projectsDiv.innerHTML = projects.map((project) => project.projectName);
});
