function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

document.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
});

function setupInputsToggle() {
    const inputsToggle = document.querySelector('.inputs-toggle');
    const inputs = document.querySelector('.inputs');
    if (!inputsToggle || !inputs) return;
    inputsToggle.addEventListener('click', function () {
        inputs.classList.toggle('collapsed');
        this.classList.toggle('collapsed');
    });
    window.addEventListener('resize', function () {
        if (window.innerWidth > 1355) {
            inputs.classList.remove('collapsed');
            inputsToggle.classList.remove('collapsed');
        }
    });
}

let translations = {};
let currentLanguage = 'en';
window.currentTranslations = translations;

function getPreferredLanguage() {
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam) return langParam;
    const storedLang = localStorage.getItem('preferredLanguage');
    if (storedLang) return storedLang;
    return (navigator.language || 'en').slice(0, 2) || 'en';
}

function getNestedTranslation(obj, path) {
    if (!obj || !path) return undefined;
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

function getTranslatedText(key, fallback) {
    const value = getNestedTranslation(translations, key);
    return value || fallback || '';
}

async function applyLanguage(lang) {
    currentLanguage = lang || 'en';
    if (lang && lang !== 'en') {
        try {
            const response = await fetch('./locales/' + lang + '.json');
            translations = response.ok ? await response.json() : {};
        } catch (error) {
            translations = {};
        }
    } else {
        translations = {};
    }
    window.currentTranslations = translations;

    document.querySelectorAll('[data-i18n]').forEach(element => {
        if (element.closest('.custom-select-options') && element.classList.contains('custom-select-option')) return;
        const key = element.getAttribute('data-i18n');
        const translation = getNestedTranslation(translations, key);
        if (!translation) return;
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.setAttribute('placeholder', translation);
            return;
        }
        if (String(translation).indexOf('<') !== -1) element.innerHTML = translation;
        else element.textContent = translation;
    });

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getNestedTranslation(translations, key);
        if (translation && element.tagName !== 'INPUT') {
            if (String(translation).indexOf('<') !== -1) element.innerHTML = translation;
            else element.textContent = translation;
        }
        if (translation && (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA')) {
            element.setAttribute('placeholder', translation);
        }
    });

    if (typeof buildQuickSearchOptions === 'function') buildQuickSearchOptions();
    if (typeof updateLeagueTrigger === 'function') updateLeagueTrigger();
    if (typeof updatePositionTrigger === 'function') updatePositionTrigger();
    if (typeof resetQuickSearchTrigger === 'function') resetQuickSearchTrigger();
    if (typeof updateMetricTrigger === 'function') updateMetricTrigger();
    if (typeof syncModeButtons === 'function') syncModeButtons();
    if (typeof syncPastSeasonButton === 'function') syncPastSeasonButton();
    if (typeof buildMetricOptions === 'function') buildMetricOptions();
    if (typeof renderMetricSliders === 'function') renderMetricSliders();
    if (typeof scheduleSearch === 'function') scheduleSearch({ immediate: true });
}

function getOpenDropdownOptions(trigger) {
    if (!trigger) return null;
    const next = trigger.nextElementSibling;
    if (next && next.classList.contains('custom-select-options')) return next;
    const parent = trigger.parentElement;
    return parent ? parent.querySelector('.custom-select-options') : null;
}

function setupKeyboardNavigation() {
    document.addEventListener('keydown', function (e) {
        const openTrigger = document.querySelector('.custom-select-trigger.open');
        if (!openTrigger) return;
        const options = getOpenDropdownOptions(openTrigger);
        if (!options) return;

        const target = e.target;
        const isField = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA');
        const fieldInDropdown = isField && options.contains(target);

        // Ignore keys typed into unrelated page inputs (e.g. player search).
        if (isField && !fieldInDropdown) return;

        if (e.key === 'Escape') {
            e.preventDefault();
            openTrigger.classList.remove('open');
            options.style.display = 'none';
            return;
        }

        // While filtering inside a dropdown search box, only navigate — no typeahead.
        if (fieldInDropdown && e.key !== 'ArrowDown' && e.key !== 'ArrowUp' && e.key !== 'Enter') {
            return;
        }

        const visible = Array.from(options.querySelectorAll('.custom-select-option:not([hidden]):not(.metric-category-header)'));
        if (!visible.length) return;
        const currentIndex = visible.findIndex(opt => opt.classList.contains('selected'));

        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            let next = currentIndex;
            if (e.key === 'ArrowDown') next = currentIndex < visible.length - 1 ? currentIndex + 1 : 0;
            else next = currentIndex > 0 ? currentIndex - 1 : visible.length - 1;
            visible.forEach(opt => opt.classList.remove('selected'));
            visible[next].classList.add('selected');
            visible[next].scrollIntoView({ block: 'nearest' });
            return;
        }

        if (e.key === 'Enter') {
            e.preventDefault();
            const selected = options.querySelector('.custom-select-option.selected:not([hidden])') || visible[0];
            if (selected) selected.click();
            return;
        }

        if (e.key.length === 1 && /[a-zA-Z0-9%\s\-\+\(\)]/.test(e.key)) {
            const letter = e.key.toLowerCase();
            const start = currentIndex + 1;
            const match = visible.slice(start).concat(visible.slice(0, start)).find(opt => {
                const text = (opt.textContent || '').trim().toLowerCase();
                return text.charAt(0) === letter;
            });
            if (match) {
                visible.forEach(opt => opt.classList.remove('selected'));
                match.classList.add('selected');
                match.scrollIntoView({ block: 'nearest' });
            }
        }
    });
}

function equalizeSeasonButtonWidths() {
    // Season toggle is now an in-page icon button (no Current/Previous tabs).
}

document.addEventListener('DOMContentLoaded', function () {
    setupInputsToggle();
    setupKeyboardNavigation();
});
