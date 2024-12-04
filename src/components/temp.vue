<template>
  <el-carousel :interval="2000" type="card" height="30vh" width=auto>
    <el-carousel-item v-for="game in commandGames" :key="game.appId">
      <preCard :imageUrl="game.MainPictureSrc" @update-showGame="ShowFavoriteGame(game.appId)"></preCard>
    </el-carousel-item>
  </el-carousel>
</template>





<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>


<script>
import router from "@/router/index.js";
import PreCard from "@/components/preCard.vue";
export default {
  components: {PreCard},
  data(){
    return {
      commandGames: [
        {
          appId: 0,
          MainPictureSrc: 'https://cdn.akamai.steamstatic.com/steam/apps/578080/header.jpg?t=1658287469',
        },
        {
          appId: 1,
          MainPictureSrc: 'https://cdn.akamai.steamstatic.com/steam/apps/255710/header.jpg?t=1654076112',
        }
      ],
    }
  }
}

</script>