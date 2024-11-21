// ==UserScript==
// @name          BYPASS.VIP BYPASSER (fixed by @yo_yo_yo_ on discord ★)
// @namespace     bypass.vip
// @version       0.3
// @author        bypass.vip (fixed for mobile by @yo_yo_yo_ on discord)
// @description   Bypass ad-links using the bypass.vip API and get to your destination without ads!
// @match       *://*loot-link.com/s?*
// @match       *://*loot-links.com/s?*
// @match       *://*lootlink.org/s?*
// @match       *://*lootlinks.co/s?*
// @match       *://*lootdest.info/s?*
// @match       *://*lootdest.org/s?*
// @match       *://*lootdest.com/s?*
// @match       *://*links-loot.com/s?*
// @match       *://*linksloot.net/s?*
// @match       *://*.linkvertise.com/*
// @match       *://*.paster.so/*
// @match       *://*.boost.ink/*
// @match       *://*.mboost.me/*
// @match       *://*.bst.gg/*
// @match       *://*.booo.st/*
// @match       *://*.socialwolvez.com/*
// @match       *://*.sub2get.com/*
// @match       *://*.sub2get.com/*
// @match       *://*.v.gd/*
// @match      *://*.unlocknow.net/*
// @match       *://*.sub2unlock.com/*
// @match       *://*.sub2unlock.net/*
// @match       *://*.sub2unlock.io/*
// @match       *://*.sub4unlock.io/*
// @match       *://*.rekonise.com/*
// @match       *://*.adfoc.us/*
// @match       *://*.bstlar.com/*
// @match       *://*.work.ink/*
// @match       *://*.workink.net/*
// @match       *://*.cety.app/*
// @grant         GM_addStyle
// @downloadURL   https://raw.githubusercontent.com/bypass-vip/userscript/master/bypass-vip.user.js
// @updateURL     https://raw.githubusercontent.com/bypass-vip/userscript/master/bypass-vip.user.js
// @homepageURL   https://bypass.vip
// @icon          https://www.google.com/s2/favicons?domain=bypass.vip&sz=64
// @run-at document-idle
// ==/UserScript==

GM_addStyle(`
.bypass-vip-logo {
    width: 48px;
    height: 48px;
}

.bypass-vip-toast-container {
    font-family: 'Montserrat', sans-serif;
    position: fixed;
    bottom: 20px;
    left: 20px;
    max-width: 70%; /* Increase the max-width to provide more space */
    max-height: 100%;
    background-color: rgba(50, 50, 50, 0.8);
    color: white;
    backdrop-filter: blur(10px);
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 4px rgba(255, 255, 255, 0.2);
    z-index: 2147483648;
}

.bypass-vip-toast-header {
    background-color: black;
    color: blue;
    text-align: center;
    padding: 10px;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.bypass-vip-close-button {
    background: white;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    border-radius: 8px;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    color: black;
}

.bypass-vip-toast-actions button {
    margin-top: 15px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    cursor: pointer;
    border-radius: 8px;
    min-width: 25%;
    height: auto;
    padding: 8px 12px;
    background: rgba(255, 255, 255, 0.4);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.bypass-vip-toast-content {
    padding: 15px;
    overflow-y: auto;
    word-wrap: break-word;
    max-height: 200px;
    text-align: center;
    font-size: 16px;
}

.bypass-vip-toast-loader {
    width: 48px;
    height: 48px;
    border: 5px solid #FFF;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
`);

document.querySelector("body").innerHTML += `
    <div class="bypass-vip-toast-container">
        <div class="bypass-vip-toast-header">
            <img src="https://bypass.vip/assets/img/logo-light-nobg.png" alt="LOGO" class="bypass-vip-logo">
            BYPASS.VIP(fixed by @yo_yo_yo_ on discord)
            <button class="bypass-vip-close-button" onclick="this.parentElement.parentElement.remove();">&times;</button>
        </div>
        <div class="bypass-vip-toast-content">
            <div class="bypass-vip-toast-result"></div>
            <div class="bypass-vip-toast-loading">
                <span class="bypass-vip-toast-loader"></span>
                <p>Loading bypass...</p>
            </div>
            <div class="bypass-vip-toast-actions" hidden>
                <button id="bypass-vip-copy">Copy</button>
                <button id="bypass-vip-open" hidden>Open</button>
            </div>
        </div>
    </div>
`;

fetch(`https://api.bypass.vip/bypass?url=${encodeURIComponent(window.location.href)}`)
    .then(response => response.json())
    .then(data => {
        document.querySelector(".bypass-vip-toast-loading").hidden = true;
        if (data.status == 'success') {
            document.querySelector(".bypass-vip-toast-actions").hidden = false;
            document.querySelector(".bypass-vip-toast-result").innerText = data.result;
            try {
                new URL(data.result);
                document.querySelector("#bypass-vip-open").hidden = false;
            } catch (e) {}
        } else {
            document.querySelector(".bypass-vip-toast-result").innerText = data.message;
        }
    })
    .catch(err => {
        alert('Error bypassing link! The error has been logged to the console.');
        console.error('Fetch Error:', err);
    });

document.querySelector("#bypass-vip-copy").addEventListener("click", () => {
    navigator.clipboard.writeText(document.querySelector(".bypass-vip-toast-result").innerText)
    alert('Content has been copied to your clipboard');
});
document.querySelector("#bypass-vip-open").addEventListener("click", () => {
    window.location.href = document.querySelector(".bypass-vip-toast-result").innerText
});
