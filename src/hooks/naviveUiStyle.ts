

export function setPrimaryColor(color: string) {
    console.log(color);
    const el = document.documentElement as HTMLElement
    el.style.setProperty('--n-border', '1px solid '+ color+" !important")
    el.style.setProperty('--n-border-active', '1px solid '+ color+" !important")
    el.style.setProperty('--n-border-focus', '1px solid '+ color+" !important")
    el.style.setProperty('--n-border-hover', '1px solid '+ color+" !important")
    el.style.setProperty('--n-caret-color', '1px solid '+ color+" !important")
    el.style.setProperty('--n-box-shadow-active', 'none !important');
    el.style.setProperty('--n-box-shadow-focus', 'none !important');
}