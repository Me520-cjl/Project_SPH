<template>
  <div>
    <div>参数一：{{ $route.params.keyword }} {{ $route.query.keyword }}</div>
    <div>参数二: {{ $route.query.k }}</div>
  </div>
</template>

<script>
export default {
  //props: ["keyword"],
};
</script>

<style>
</style>