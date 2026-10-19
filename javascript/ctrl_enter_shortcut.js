// Bulletproof Ctrl+Enter keyboard shortcut for WebUI Generate
(function() {
    window.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && (e.key === 'Enter' || e.keyCode === 13)) {
            const app = (typeof gradioApp === 'function') ? gradioApp() : document;
            let btn = null;
            
            // 1. Check in currently visible tab item
            const visibleTabs = app.querySelectorAll('.tabitem:not([style*="display: none"])');
            for (const tab of visibleTabs) {
                const b = tab.querySelector('button[id$="_generate"]');
                if (b && b.offsetParent !== null) {
                    btn = b;
                    break;
                }
            }
            
            // 2. Direct check for txt2img or img2img generate button
            if (!btn) {
                const candidates = [
                    app.querySelector('#img2img_generate'),
                    app.querySelector('#txt2img_generate')
                ];
                for (const c of candidates) {
                    if (c && c.offsetParent !== null) {
                        btn = c;
                        break;
                    }
                }
            }
            
            // 3. Fallback: Any visible button with text "Generate"
            if (!btn) {
                const allButtons = app.querySelectorAll('button');
                for (const b of allButtons) {
                    if (b.textContent.trim().toLowerCase() === 'generate' && b.offsetParent !== null) {
                        btn = b;
                        break;
                    }
                }
            }

            if (btn) {
                e.preventDefault();
                e.stopPropagation();
                btn.click();
            }
        }
    }, true);
})();
