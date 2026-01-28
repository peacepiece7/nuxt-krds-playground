<script setup lang="ts">
  import Skeleton from '~/components/hanui/Skeleton.vue'
  import Spinner from '~/components/hanui/Spinner.vue'
</script>

<template>
  <div
    class="border border-grey-300"
    style="
      border-radius: 4px;
      background: #ffffff;
      min-height: 450px;
      position: relative;
      overflow: hidden;
    "
  >
    <div
      class="border-b border-grey-300"
      style="
        display: flex;
        align-items: center;
        background: #ffffff;
        flex-wrap: wrap;
      "
    >
      <template v-for="i in 7" :key="i">
        <Skeleton variant="rounded" width="5rem" height="5rem" style="flex-shrink: 0" />
      </template>
    </div>

    <div
      class="p-4"
      style="
        display: flex;
        flex-direction: column;
        gap: 12px;
        background: #ffffff;
      "
    >
      <Skeleton variant="text" width="100%" height="2rem" />
      <Skeleton variant="text" width="100%" height="2rem" />
      <Skeleton variant="text" width="60%" height="2rem" />
      <Skeleton variant="text" width="100%" height="2rem" />
      <Skeleton variant="text" width="100%" height="2rem" />
      <Skeleton variant="text" width="60%" height="2rem" />
    </div>

    <div
      class="text-grey-900 font-medium"
      style="
        position: absolute;
        bottom: 16px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        gap: 8px;
      "
    >
      <Spinner size="sm" variant="secondary" class="mr-2" />
      <span>에디터를 불러오는 중입니다...</span>
    </div>
  </div>
</template>
