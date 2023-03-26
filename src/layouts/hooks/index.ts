export { default as useLayoutStore } from './useLayoutStore'
import Setting from '../../setting'
export function usePrimaryColor(color: string) {
  const el = document.documentElement as HTMLElement
  el.style.setProperty('--el-color-primary', color)
  const tempColors = color.split('#')[1]
  const r = parseInt( '0x' + tempColors.slice(0, 2))
  const g = parseInt( '0x' + tempColors.slice(2, 4))
  const b = parseInt( '0x' + tempColors.slice(4, 6))
  el.style.setProperty('--el-color-primary-cjl', `rgba(${r}, ${g}, ${b}, 0.2`);
  for(let i = 1; i<=9; i++) {
    el.style.setProperty('--el-color-primary-light-' + i, `rgba(${r}, ${g}, ${b}, ${1 - i * 0.1})`)
  }
}

export function useMenuWidth() {
  const r = document.querySelector(':root') as HTMLElement
  const styles = getComputedStyle(r)
  const menuWith = styles.getPropertyValue('--menu-width')
  return parseInt(menuWith)
}

export function useChangeMenuWidth(width: Number) {
  const r = document.querySelector(':root') as HTMLElement
  r.style.setProperty('--menu-width', width + 'px')
  localStorage.setItem(
    'sys_setting',
    JSON.stringify(
      Object.assign(Setting, {
        sideWidth: width,
      })
    )
  )
}
