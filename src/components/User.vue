

<template>

  <el-header class="title">
    <div style="margin-top: 12px; display: inline-block;">
      <span style="font-size: large; font-family: 'Microsoft YaHei'; color: #ffffff; font-weight: bold;">Price Comparator</span>
      <span style="margin-left :30px; font-size: large; font-family: 'Microsoft YaHei'; color: #ffffff; font-weight: bold;">用户您好！</span>
      <RouterLink to="/user">
        <button class="transparent-button">
          <span style="margin-left: 40px; font-size: medium; font-family: 'Microsoft YaHei'; color: #ffffff; font-weight: lighter">搜索商品</span>
        </button>
      </RouterLink>
      <el-icon style="color: #ffffff; margin-left: 5px">
        <Reading />
      </el-icon>
      <RouterLink to="/favorites">
        <button class="transparent-button">
          <span style="margin-left: 40px; font-size: medium; font-family: 'Microsoft YaHei'; color: #ffffff; font-weight: lighter">我的收藏</span>
        </button>
      </RouterLink>
      <el-icon style="color: #ffffff; margin-left: 5px">
        <UserFilled />
      </el-icon>
    </div >
    <RouterLink to="/login">
      <el-button type="primary" style="margin-top: 12px; padding-right: 10px;" @click="DeleteToken">
        <span style="font-size: medium; font-family: 'Microsoft YaHei'; color: #ffffff; font-weight: normal;">登出</span>
      </el-button>
    </RouterLink>
  </el-header>

  <div class="auto-complete-search" >
    <input 
      type="text" 
      v-model="query" 
      @input="onInput"
      @keydown.down="onArrowDown"
      @keydown.up="onArrowUp"
      @keydown.enter="onEnter"
    />

    <ul v-if="showSuggestions">
      <li 
        v-for="(suggestion, index) in filteredSuggestions" 
        :key="index"
        @click="selectSuggestion(suggestion)"
        :class="{ highlighted: index === highlightedIndex }"
      >
        {{ suggestion }}
      </li>
    </ul>
  </div>
  <div class="videoContainer">
    <video class="fullscreenVideo" v-show="backNum===firstbg"  id="bg0" playsinline="" autoplay="" muted="" loop="">
        <source src="../assets/video/firstbg.mp4" type="video/mp4">
    </video>
  <video class="fullscreenVideo" v-show="backNum===fpsbg"  id="bg1" playsinline="" autoplay="" muted="" loop="">
        <source src="../assets/video/fpsvideo.mp4" type="video/mp4">
    </video> 
     <video class="fullscreenVideo" v-show="backNum===speedbg"  id="bg2" playsinline="" autoplay="" muted="" loop="">
        <source src="../assets/video/speedvideo.mp4" type="video/mp4">
    </video>
  </div>
</template>


<script>

import axios from 'axios';
import gamesdata from '@/assets/newgames.json';
import {ElMessage} from "element-plus";

export default {
  name: 'AutoCompleteSearch',
  data() {
    return {
      query: '',
      suggestions: [{"name":"Game A","estimated_owners":"20000"},],
      // games:gamesdata,
      filteredSuggestions: [],
      showSuggestions: false,
      backNum:0,
      firstbg:0,
      speedbg:2,
      fpsbg:1,
      soulbg:3,
      highlightedIndex: -1,

      games: [
        {
          appId: 0,
          title: '',
          releaseDate: '',
          winSupport: false,
          macSupport: false,
          linuxSupport: false,
          price: 0.00,
          tags: [
          ],
          supportedLanguages: [
          ],
          website: '',
          headerImage: '',
          recommendations: 0,
          positive: 0,
          negative: 0,
          estimatedOwners: 0,
          screenshots: [

          ],
          description: '',
          movies: [

          ]
        }
      ]
    }
  },
  methods: {
    sortGameData(games) {
      // 按照estimated_owners降序排序
      return games.sort((a, b) => {
        const ownersA = parseInt(a.estimatedOwners, 10);
        const ownersB = parseInt(b.estimatedOwners, 10);
        return ownersB - ownersA; // 降序排序
      });
    },
    onInput() {
      if (this.query.length > 0) {
        this.suggestions = [];
        this.suggestions = this.games.filter(
            game => game.name.toLowerCase().includes(this.query.toLowerCase())
        );
        this.suggestions = this.sortGameData(this.suggestions);
        this.suggestions = this.suggestions.slice(0,10);

        this.filteredSuggestions =  this.suggestions.map(suggestion=>suggestion.name);
        this.showSuggestions = this.filteredSuggestions.length > 0;
      } else {
        this.showSuggestions = false;
      }
    },
    selectSuggestion(suggestion) {
      this.query = suggestion;
      this.showSuggestions = false;
    },
    onArrowDown() {
      if (this.highlightedIndex < this.filteredSuggestions.length - 1) {
        this.highlightedIndex++;
      }
    },
    onArrowUp() {
      if (this.highlightedIndex > 0) {
        this.highlightedIndex--;
      }
    },
    onEnter() {
      if (this.highlightedIndex >= 0) {
        this.selectSuggestion(this.filteredSuggestions[this.highlightedIndex]);
      }
      if(this.query==="")
      {
        this.backNum = this.firstbg;
      }
      else
      {
        if(this.backNum<2 )this.backNum++
        else this.backNum = this.fpsbg;
         axios.post("/user/search",{
           query:this.query,
           userId: sessionStorage.getItem("token")
          //password:SHA256(this.adminLoginInfo.password).toString(),
          })
          .then(response=>{
            if(response.data.code === 1){
              ElMessage.success("搜索成功");
              this.games = response.data.payload;
              sessionStorage.setItem("games", response.data.payload);
            }else{
              ElMessage.error(response.data)
            }
          })
          .catch(error =>{
            ElMessage.error("搜索失败");
          })
      }
   
    },
    DeleteToken(){
      sessionStorage.clear()
    }
  },
  beforeDestroy() {
    sessionStorage.setItem("games", JSON.stringify(this.games));
  },
  mounted() {
    if(sessionStorage.getItem("games") != null) {
      this.games = JSON.parse(sessionStorage.getItem("games"));
    }
  }
}
</script>

<style scoped>
.auto-complete-search {
  position: relative;
  width: 40%;
  margin: 50px auto;
  z-index: 50;
}
.auto-complete-search input {
  width: 100%;

  padding: 8px;
  box-sizing: border-box;
  font-size: x-large;
}
.auto-complete-search ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  position: relative;
  width: 100%;
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-top: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  z-index: 1000;
}
.auto-complete-search li {
  padding: 8px;
  cursor: pointer;
}

.auto-complete-search li.highlighted {
  background-color: #ff002b;
  color: #fff;
}


.videoContainer{
  position: fixed;
  background-color: white;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 10;
}
.fullscreenVideo{
  width: 100%;
  height: 100%;
  object-fit: fill
}

.title {
  background-color: rgb(17, 71, 117);
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.aside {
  min-height: calc(100vh - 60px);
  width: 180px;
  background-color: red;
}

.title2 {
  background: url("../assets/figure2.jpg");
  height: 60px;
  display: flex;
  align-items: center;
  text-align: left;
  color: #ffffff;
  font-weight: bold;
  font-size: xx-large;
  font-family: 'Microsoft YaHei';
}

.history-trail {
  margin-left: 30px;
  font-size: medium;
  color: #ffffff;
  font-weight: normal;
}

.product_table {
  position: absolute;
  top: 20%;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  height: auto;
  background-color: #ffffff;
  overflow-y: hidden;
}

.add_cashier_button {
  position: absolute;
  top: 20%;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  height: auto;
  background-color: #ffffff;
  overflow-y: hidden;
}

.left-image {
  width: 150px; /* 设置图片宽度 */
  height: auto; /* 自适应高度 */
  margin-right: 10px; /* 图片与文本之间的间距 */
}

.transparent-button {
  background-color: transparent; /* 设置背景为透明 */
  border: none; /* 去掉边框 */
  color: #000; /* 设置字体颜色，可以根据需要调整 */
  cursor: pointer; /* 鼠标悬停时显示手形光标 */
  padding: 10px 20px; /* 设置内边距 */
  font-size: 16px; /* 设置字体大小 */
}

</style>