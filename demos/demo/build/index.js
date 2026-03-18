import { JSONObjectStream } from "bufferednetworkrequest";
//#region demo/index.ts
const statusEl = document.querySelector(".status");
statusEl.classList.add("loading");
const response = await fetch("https://api.github.com/users/github/repos?per_page=100", { cache: "no-store" });
if (!response.ok || !response.body) {
	statusEl.textContent = `An error occured while fetching the response.`;
	throw Error;
}
const stream = new JSONObjectStream(response.body);
for await (const objects of stream) {
	const repoElements = objects.map((repo) => {
		const el = document.createElement("p");
		el.textContent = repo.name;
		return el;
	});
	statusEl.append(...repoElements);
	scrollToBottom();
}
statusEl.classList.remove("loading");
function scrollToBottom() {
	document.body.scrollIntoView({ block: "end" });
}
//#endregion

//# sourceMappingURL=index.js.map