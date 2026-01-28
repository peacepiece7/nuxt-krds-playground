<script setup lang="ts">
  import type { MenuItem } from '~/components/templates/GNB.vue'

  interface Props {
    menuItems: MenuItem[]
    visible: boolean
    isAtTop: boolean
  }

  const props = defineProps<Props>()

  const isDrawerOpen = ref(false)

  const toggleDrawer = () => {
    isDrawerOpen.value = !isDrawerOpen.value
  }

  const closeDrawer = () => {
    isDrawerOpen.value = false
    expandedMenuIndex.value = null
  }

  const route = useRoute()
  watch(
    () => route.path,
    () => {
      isDrawerOpen.value = false
    },
  )

  const expandedMenuIndex = ref<number | null>(null)

  const toggleMenuExpansion = (index: number) => {
    if (expandedMenuIndex.value === index) {
      expandedMenuIndex.value = null
    } else {
      expandedMenuIndex.value = index
    }
  }

  // 투명 배경 로직 제거 - 항상 배경색 표시

  const authStore = useAuthStore()
  const isLoggedIn = computed(() => authStore.isLoggedIn)
  const userName = computed(() => authStore.user?.name || '')

  const goToMyPage = () => {
    navigateTo('/mypage')
    closeDrawer()
  }

  const isLoginDialogOpen = ref(false)

  const handleLoginLogout = () => {
    if (isLoggedIn.value) {
      authStore.logout()
      closeDrawer()
    } else {
      isLoginDialogOpen.value = true
      closeDrawer()
    }
  }

  const handleLoginSuccess = () => {
    isLoginDialogOpen.value = false
  }

  const shouldShowAppBar = computed(() => {
    return props.visible || isDrawerOpen.value
  })
</script>

<template>
  <div class="w-full">
    <header
      class="bg-krds-primary-50 relative w-full shadow-sm transition-[transform,background-color,box-shadow] duration-300 ease-in-out will-change-transform"
      :style="{
        transform: shouldShowAppBar ? 'translateY(0)' : 'translateY(-100%)',
      }"
    >
      <div
        class="flex w-full max-w-full items-center justify-between px-4 py-0"
      >
        <div class="flex items-center">
          <NuxtLink
            :prefetch="false"
            to="/"
            class="flex cursor-pointer items-center no-underline transition-opacity duration-200 ease-in hover:opacity-80"
            @click="closeDrawer"
          >
            <NuxtImg
              src="/icon.svg"
              alt="ü������ �ΰ�"
              width="40"
              height="40"
              class="shrink-0 object-contain"
            />
          </NuxtLink>
        </div>

        <div class="flex items-center gap-1">
          <template v-if="isLoggedIn">
            <Button outline color="inverse" @click="goToMyPage">
              <IcIcon icon="login-v1" />
            </Button>
          </template>
          <Button outline color="inverse" @click="handleLoginLogout">
            {{ isLoggedIn ? 'Logout' : 'Login' }}
          </Button>
          <Button outline color="inverse" @click.stop="toggleDrawer">
            <IcIcon icon="setting" />
          </Button>
        </div>
      </div>
    </header>

    <Dialog v-model="isLoginDialogOpen" :max-width="500">
      <template #content>
        <LoginSection @login-success="handleLoginSuccess" />
      </template>
    </Dialog>

    <div
      v-if="isDrawerOpen"
      class="z-drawer fixed inset-0 bg-black/40"
      @click="closeDrawer"
    />

    <aside
      class="z-drawer fixed top-0 right-0 h-full w-[80%] max-w-[360px] bg-white shadow-lg transition-transform duration-200"
      :class="isDrawerOpen ? 'translate-x-0' : 'translate-x-full'"
    >
      <div class="flex h-full flex-col">
        <div
          class="border-grey-200 flex items-center justify-between border-b p-4"
        >
          <h2 class="text-grey-900 m-0 text-2xl font-bold">Menu</h2>
          <Button
            outline
            color="primary"
            class="!text-grey-900"
            shape="square"
            @click="closeDrawer"
          >
            <IcIcon icon="close" />
          </Button>
        </div>

        <div class="flex-1 overflow-y-auto px-0 py-2">
          <div
            v-for="(item, index) in menuItems"
            :key="item.to"
            class="border-grey-100 border-b"
          >
            <div
              class="w-full"
              :class="{
                'gnb-drawer-menu-expanded': expandedMenuIndex === index,
              }"
            >
              <NuxtLink
                v-if="!item.children || item.children.length === 0"
                :prefetch="false"
                :to="item.to"
                class="text-grey-900 block p-4 text-base font-medium no-underline transition-[background-color,color] duration-200 ease-in-out"
                @click="closeDrawer"
              >
                {{ item.title }}
              </NuxtLink>
              <Button
                v-else
                color="primary"
                shape="square"
                class="w-full"
                @click="toggleMenuExpansion(index)"
              >
                <span>{{ item.title }}</span>
                <IcIcon
                  icon="chevron-down"
                  class="transition-transform duration-200 ease-in-out"
                  :class="{ 'rotate-180': expandedMenuIndex === index }"
                />
              </Button>
            </div>

            <div
              v-if="
                item.children &&
                item.children.length > 0 &&
                expandedMenuIndex === index
              "
              class="bg-grey-50 animate-[slideDown_200ms_ease-in-out] px-0 py-2"
            >
              <NuxtLink
                v-for="child in item.children"
                :key="child.to"
                :prefetch="false"
                :to="child.to"
                class="text-grey-600 block px-4 py-3 pl-8 text-sm no-underline transition-[background-color,color] duration-200 ease-in-out"
                @click="closeDrawer"
              >
                {{ child.title }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>
