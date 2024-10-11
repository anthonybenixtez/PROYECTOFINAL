<template>
  <TopMenu />

  <RouterView />

  <div></div>
</template>

<script setup lang="ts">
import './style.css';
import TopMenu from './modules/common/components/TopMenu.vue';
</script>
