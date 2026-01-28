<script setup lang="ts">
  export type Course = {
    id: string
    name: string
    instructor: string
    schedule: string
    capacity: number
    enrolled: number
    price?: string
  }
  export type SportClubCardData = {
    category: string
    distance: string
    address: string
    phone: string
    operatingFacilities: string[]
    convenienceFacilities: string[]
    homepageUrl?: string
    courses?: Course[]
  }

  defineProps<{ data: SportClubCardData }>()

  const dialogOpen = ref(false)
  const expanded = ref(false)
</script>

<template>
  <Card class="rounded-2xl shadow" style="position: relative; height: 100%; transition: box-shadow 200ms ease-in-out, height 200ms ease-in-out; overflow: hidden;">
    <button
      v-if="data.courses && data.courses.length > 0"
      class="border-grey-300 border-r"
      style="position: absolute; left: 0; top: 0; bottom: 0; width: 40px; background-color: var(--color-grey-100); border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; z-index: 1; transition: background-color 200ms ease-in-out, border-color 200ms ease-in-out;"
      @click="expanded = !expanded"
    >
      <IcIcon icon="chevron-right" class="text-grey-900 transition-transform duration-200 ease-in" :class="{ 'card__expand-icon--rotated': expanded }" />
    </button>

    <CardBody class="gap-4 p-4" style="padding-left: 56px; display: flex; flex-direction: column">
      <div class="gap-2" style="display: flex; align-items: center; flex-wrap: wrap">
        <span class="text-base font-bold" style="color: var(--color-primary-700)">{{ data.category }}</span>
        <div class="gap-1" style="display: flex; align-items: center">
          <span class="text-grey-600 text-sm">�� ��ġ���� {{ data.distance }}</span>
          <Button
            size="icon"
            variant="outlined"
            color="surface"
            class="min-w-[24px] w-6 h-6"
            @click="dialogOpen = true"
          >
            <IcIcon icon="plus" />
          </Button>
        </div>
      </div>

      <div class="rounded-lg" style="width: 100%; height: 200px; background-color: var(--color-grey-200); display: flex; align-items: center; justify-content: center;">
        <IcIcon icon="location" class="text-4xl text-grey-400" />
      </div>

      <div class="gap-2" style="display: flex; flex-direction: column">
        <div class="gap-2" style="display: flex; align-items: center">
          <IcIcon icon="location" class="text-grey-600" />
          <span class="text-grey-900 text-sm">{{ data.address }}</span>
        </div>
        <div class="gap-2" style="display: flex; align-items: center">
          <IcIcon icon="call" class="text-grey-600" />
          <span class="text-grey-900 text-sm">{{ data.phone }}</span>
        </div>
      </div>

      <div class="gap-2" style="display: flex; flex-direction: column">
        <h4 class="text-grey-900 m-0 text-xl font-bold">��ü�</h4>
        <ul class="m-0 gap-1 p-0" style="list-style: none; display: flex; flex-direction: column">
          <li v-for="(facility, index) in data.operatingFacilities" :key="index" class="text-grey-600 pl-2 text-sm">
            {{ facility }}
          </li>
        </ul>
      </div>

      <div class="gap-2" style="display: flex; flex-direction: column">
        <h4 class="text-grey-900 m-0 text-xl font-bold">���ǽü�</h4>
        <div class="gap-2" style="display: flex; flex-wrap: wrap">
          <span v-for="(facility, index) in data.convenienceFacilities" :key="index" class="text-grey-600 text-sm">
            {{ facility }}
          </span>
        </div>
      </div>

      <div v-if="data.homepageUrl" class="border-grey-300 border-t pt-2" style="margin-top: auto">
        <a :href="data.homepageUrl" target="_blank" rel="noopener noreferrer" class="gap-2 text-sm font-medium transition-colors duration-200 ease-in" style="display: flex; align-items: center; color: var(--color-primary-700); text-decoration: none;">
          <span>Ȩ������</span>
          <IcIcon icon="link" class="text-sm" />
        </a>
      </div>

      <div v-if="expanded && data.courses && data.courses.length > 0" class="border-grey-300 mt-2 gap-4 border-t-2 pt-4" style="display: flex; flex-direction: column">
        <h4 class="text-grey-900 m-0 text-xl font-bold">���� ������ ����</h4>
        <div class="gap-3" style="display: flex; flex-direction: column">
          <div v-for="course in data.courses" :key="course.id" class="border-grey-200 rounded-lg border p-3 transition-shadow duration-200 ease-in" style="background-color: var(--color-grey-50)">
            <div class="mb-2" style="display: flex; justify-content: space-between; align-items: center;">
              <h5 class="text-grey-900 m-0 text-base font-bold">{{ course.name }}</h5>
              <span v-if="course.price" class="text-base font-bold" style="color: var(--color-primary-700)">{{ course.price }}</span>
            </div>
            <div class="gap-1" style="display: flex; flex-direction: column">
              <div class="text-grey-600 gap-2 text-sm" style="display: flex; align-items: center">
                <IcIcon icon="login-v1" class="text-grey-600" />
                <span>{{ course.instructor }}</span>
              </div>
              <div class="text-grey-600 gap-2 text-sm" style="display: flex; align-items: center">
                <IcIcon icon="timeout" class="text-grey-600" />
                <span>{{ course.schedule }}</span>
              </div>
              <div class="text-grey-600 gap-2 text-sm" style="display: flex; align-items: center">
                <IcIcon icon="announcement" class="text-grey-600" />
                <span>{{ course.enrolled }} / {{ course.capacity }}��</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CardBody>

    <Dialog v-model="dialogOpen" max-width="800" scrollable class="dialog">
      <template #title>
        <div class="dialog__title-content">
          <span class="text-2xl font-bold" style="color: var(--color-primary-700)">{{ data.category }}</span>
          <span class="text-grey-600 text-xl">�� ��ġ���� {{ data.distance }}</span>
        </div>
      </template>
      <template #content>
        <div class="rounded-lg" style="width: 100%; height: 400px; background-color: var(--color-grey-200); display: flex; align-items: center; justify-content: center;">
          <IcIcon icon="location" class="text-[80px] text-grey-400" />
        </div>
        <div class="gap-3" style="display: flex; flex-direction: column">
          <div class="dialog__info-item">
            <IcIcon icon="location" class="dialog__info-icon" />
            <span class="dialog__info-text">{{ data.address }}</span>
          </div>
          <div class="dialog__info-item">
            <IcIcon icon="call" class="dialog__info-icon" />
            <span class="dialog__info-text">{{ data.phone }}</span>
          </div>
        </div>
        <div class="dialog__section">
          <h4 class="dialog__section-title">��ü�</h4>
          <ul class="m-0 gap-2 p-0" style="list-style: none; display: flex; flex-direction: column">
            <li v-for="(facility, index) in data.operatingFacilities" :key="index" class="text-grey-600 pl-3 text-base">
              {{ facility }}
            </li>
          </ul>
        </div>
        <div class="dialog__section">
          <h4 class="dialog__section-title">���ǽü�</h4>
          <div class="gap-3 pt-2" style="display: flex; flex-wrap: wrap">
            <span v-for="(facility, index) in data.convenienceFacilities" :key="index" class="text-grey-600 rounded-lg px-3 py-1 text-base" style="background-color: var(--color-grey-100)">
              {{ facility }}
            </span>
          </div>
        </div>
        <div class="dialog__section">
          <h4 class="dialog__section-title">� �ð�</h4>
          <p class="dialog__text">
            ����: 09:00 - 22:00<br />
            �ָ�: 10:00 - 20:00<br />
            ������ �޹�
          </p>
        </div>
        <div class="dialog__section">
          <h4 class="dialog__section-title">�̿� �ȳ�</h4>
          <p class="dialog__text">
            ȸ�� �� ��ȸ�� ��� �̿� �����ϸ� ���� ������ �����մϴ�. ü���ü� �̿� �� ���� ��� ���� �ʼ��Դϴ�.
          </p>
        </div>
        <div v-if="data.homepageUrl" class="border-grey-300 border-t pt-4">
          <a :href="data.homepageUrl" target="_blank" rel="noopener noreferrer" class="gap-2 text-base font-medium" style="display: flex; align-items: center; color: var(--color-primary-700); text-decoration: none;">
            <span>Ȩ������</span>
            <IcIcon icon="link" class="text-base" />
          </a>
        </div>
      </template>
      <template #footer="{ close }">
        <div class="flex w-full justify-end">
          <Button variant="outlined" @click="close">�ݱ�</Button>
        </div>
      </template>
    </Dialog>
  </Card>
</template>
