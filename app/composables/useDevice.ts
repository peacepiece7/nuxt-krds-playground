import { computed, ref, onBeforeMount } from 'vue'
import { useBreakpoints } from '@vueuse/core'

type DeviceType = 'mobile' | 'tablet' | 'desktop'

/** UserAgent 기반 기기 판별 */
function _detectFromUA(ua: string): DeviceType {
  const uaLower = ua.toLowerCase()

  const isTablet = /ipad|tablet|playbook|silk|android(?!.*mobile)/i.test(uaLower)
  if (isTablet) return 'tablet'

  const isMobile = /iphone|ipod|android|blackberry|iemobile|opera mini|webos/i.test(uaLower)
  if (isMobile) return 'mobile'

  return 'desktop'
}

/**
 * @description
 * - DeviceType은 UA 기준으로 **스크린 사이즈에 영향을 받지 않습니다**
 * - is[Mobile|Tablet|Desktop]은 **스크린 사이즈 기준으로 판별**합니다
 */
export const useDevice = () => {
  const breakpoints = useBreakpoints({
    sm: 600,
    md: 960,
    lg: 1280,
  })

  /** UA 기반 기기 판별(리사이즈 영향 없음) */
  const deviceType = ref<DeviceType>('desktop')

  onBeforeMount(() => {
    if (import.meta.client) {
      deviceType.value = _detectFromUA(navigator.userAgent)
    }
  })

  /** 화면 크기 기반 UI 상태 */
  const isMobile = breakpoints.smaller('sm') // < 600
  const isDesktop = breakpoints.greaterOrEqual('lg') // >= 1280
  const isTablet = computed(() => !isMobile.value && !isDesktop.value) // 600 ~ 1279
  /** breakpoint UI 타입 */
  const breakpointType = computed(() => {
    if (isMobile.value) return 'mobile'
    if (isTablet.value) return 'tablet'
    return 'desktop'
  })

  return {
    /** 기기 자체 (UA 기반) */
    deviceType: computed(() => deviceType.value),

    /** UI 상태 (반응형) */
    isMobile,
    isTablet,
    isDesktop,

    breakpointType,
  }
}
