<template>
  <div style="position: relative; width: 100%; height: 100%;">
    <img :src="imageUrl" alt="preImage" class="zoom-image" @click="$emit('update-showGame')">
  </div>
</template>




<style scoped>
.zoom-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease; /* 添加过渡效果 */
}

.zoom-image:hover {
  transform: scale(1.1); /* 鼠标悬停时放大 */
}

</style>

<script>

import {Right} from "@element-plus/icons-vue";

export default {
  components: {Right},
  props:{
    imageUrl: String,
    required: true,
  }
};
</script>