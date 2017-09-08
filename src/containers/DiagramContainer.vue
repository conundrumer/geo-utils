<template>
  <div class="container">
    <slot name="header"></slot>
    <div class="full-flex">
      <slot name="content"></slot>
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
