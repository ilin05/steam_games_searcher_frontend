<template>
  <div style="position: relative; width: 100%; height: 100%;" @mouseover="showTitle=true" @mouseleave="showTitle=false">
    <img :src="imageUrl" alt="preImage" class="zoom-image" @click="$emit('update-showGame')">
    <div v-if="showTitle" class="title">{{title}}</div>
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

.title{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height:30%;
  background-image:linear-gradient(
  to bottom,
  lightgray,
  #213547
  );
  color: white;
  text-align: center;

  box-shadow: 0px -10px 20px rgba(0, 0, 0, 0.5);
}

</style>

<script>

import {Right} from "@element-plus/icons-vue";

export default {
  components: {Right},
  props:{
    imageUrl: String,
    title:String,
    required: true,
  },
  data()
  {
    return{
      showTitle:false,
    }
  }
};
</script>