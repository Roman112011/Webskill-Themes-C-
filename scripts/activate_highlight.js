let scriptsMain = ['https://unpkg.com/prettier@2.8.8/standalone.js', 'https://unpkg.com/prettier@2.8.8/parser-babel.js', 'https://unpkg.com/prettier@2.8.8/parser-html.js'];
let scriptsFinal = ['../../../scripts/prism.js']
let loadedMain = 0;
let loadedFinal = 0;

const copyButtonLabel = "Скопіювати Код";
const copiedButtonLabel = "Код Скопійовано";


function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}


function loadScript(src, callback) {
    let script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    document.head.appendChild(script);
}
function loadScripts(scripts, callback) {
    for (var i = 0; i < scripts.length; i++) {
        loadScript(scripts[i], callback);
    }
}

async function copyCode(block, button) {
    let code = block.querySelector("code");
    let text = code.innerText;

    await navigator.clipboard.writeText(text);

    // visual feedback that task is completed
    button.innerText = copiedButtonLabel;

    setTimeout(() => {
        button.innerText = copyButtonLabel;
    }, 700);
}
function addCopyButtons() {
    // use a class selector if available
    let pres = document.querySelectorAll("pre");

    pres.forEach((pre) => {
        // only add button if browser supports Clipboard API
        if (navigator.clipboard) {
            let button = document.createElement("button");
            let button_container = document.createElement("div");

            button.className = "button-main theme-code-copy-button"
            button.innerText = copyButtonLabel;

            button_container.appendChild(button);
            button_container.style.padding = "0px";
            button_container.style.margin = "0px";
            button_container.setAttribute("align", "center");

            let pre_container = pre.parentNode;
            pre_container.appendChild(button_container);

            button.addEventListener("click", async () => {
                await copyCode(pre, button);
            });
        }
    });
}


function handleMainScriptLoad() {
    loadedMain++;
    if (loadedMain >= scriptsMain.length) {
        initializationPreFinal();
    }
}
function handleFinalScriptLoad() {
    loadedFinal++;
    if (loadedFinal >= scriptsFinal.length) {
        initializationFinal();
    }
}

function formatCode() {
    let codes_js = document.querySelectorAll("code.language-js");
    let codes_html = document.querySelectorAll("code.language-html");

    formatInnerText(codes_js, {
        parser: "babel",
        plugins: prettierPlugins,
        useTabs: true,
    });

    formatInnerText(codes_html, {
        parser: "html",
        plugins: prettierPlugins,
        useTabs: true,
    });
}
function formatInnerText(elems, settings) {
    for (let i = 0; i < elems.length; i++) {
        try {
            let result = prettier.format(elems[i].innerText, settings);
            elems[i].innerHTML = htmlEntities(result);
        } catch (error) {
            console.log(`Formating or parsing error in:[${elems[i].innerText}]`);
            console.log(`Error:[${error}]`);
        }
    }
}

function initialization() {
    loadScripts(scriptsMain, handleMainScriptLoad);
    console.log("init");
}
function initializationPreFinal() {
    formatCode();
    loadScripts(scriptsFinal, handleFinalScriptLoad);
    console.log("init-pre-final");
}
function initializationFinal() {
    console.log("init-final");
    addCopyButtons();
}


initialization()