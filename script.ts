const msg: string = "Hello";
// alert(msg);

const styles = new Map<string, string>([
    ["default", "LabE-Style/page1.css"],
    ["dark", "LabE-Style/page2.css"],
    ["light", "LabE-Style/page3.css"],
    ["colorful", "LabE-Style/page4.css"]
]);

function styleSwap(style: string): void {
    const oldLink = document.querySelector<HTMLLinkElement>("link[rel='stylesheet']");
    if (oldLink) {
        oldLink.remove();
    }

    const newLink = document.createElement("link");
    newLink.rel = "stylesheet";
    newLink.href = styles.get(style) || "";
    document.head.appendChild(newLink);
}

function addStyle(name: string, path: string): void {
    styles.set(name, path);
    const button = document.createElement("button");
    button.textContent = name.charAt(0).toUpperCase() + name.slice(1);
    button.addEventListener("click", () => styleSwap(name));
    document.querySelector("footer")?.appendChild(button);
}

document.addEventListener("DOMContentLoaded", () => {
    const footer = document.querySelector("footer");
    if (footer) {
        const styleSelector = document.createElement("div");
        footer.appendChild(styleSelector);
        styles.forEach((_, style) => {
           addStyle(style, styles.get(style) || "");
        });
    }
});