<template>
  <el-container class="main-container">

    <el-container class="search-show-container">
      <el-card class="auto-complete-search-card">
          <input
              type="text"
              v-model="query"
              placeholder="请输入以查询"
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
                style="font-size: x-large"
            >
              {{ suggestion }}
            </li>
          </ul>
      </el-card>

      <el-card class="advanced-options-card">

        <el-container class="show-options-container">
          <el-button type="primary" @click="showOptions" style="width:10%;height: 50px   ">高级选项
          </el-button>
        </el-container>

        <el-container class="advanced-options-container">
          <div v-if="showOptions">
            <el-button> type</el-button>
          </div>

        </el-container>
      </el-card>


      <el-card class="detailed-information-card">

        <el-container class="main-picture-container">
          <img :src="MainPictureSrc" alt="Main Picture">
        </el-container>

        <el-container class="detailed-information-container">



        </el-container>
      </el-card>


    </el-container>

    <el-container class="You-may-love-container">

    </el-container>

    <!--
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

  -->
  </el-container>
</template>


<script>
import axios from 'axios';
import gamesData from '@/assets/newgames.json';
import {ElMessage,ElButton,ElIcon} from "element-plus";

export default {

  data() {
    return {
      MainPictureSrc:'https://cdn.akamai.steamstatic.com/steam/apps/578080/header.jpg?t=1658287469',
      query: '',
      showOptions: false,
      suggestions: [{"name": "Game A", "estimated_owners": "20000"},],
      toSearchGames: gamesData,
      filteredSuggestions: [],
      showSuggestions: false,
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
          tags: [],
          supportedLanguages: [],
          website: '',
          headerImage: '',
          recommendations: 0,
          positive: 0,
          negative: 0,
          estimatedOwners: 0,
          screenshots: [],
          description: '',
          movies: []
        }
      ]
    }
  },
  methods: {
    showOptions(){
      if(this.showSuggestions){ this.showSuggestions = false; }
      else{this.showSuggestions = true;}
    },
    sortGameData(games) {
      // 按照estimated_owners降序排序
      return games.sort((a, b) => {
        const ownersA = parseInt(a.estimated_owners, 10);
        const ownersB = parseInt(b.estimated_owners, 10);
        return ownersB - ownersA; // 降序排序
      });
    },
    onInput() {
      if (this.query.length > 0) {
        this.suggestions = [];
        this.suggestions = this.toSearchGames.filter(
            game => game.name.toLowerCase().includes(this.query.toLowerCase())
        );
        this.suggestions = this.sortGameData(this.suggestions);
        this.suggestions = this.suggestions.slice(0, 10);
        this.filteredSuggestions = this.suggestions.map(suggestion => suggestion.name);
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
      if (this.query === "") {
        this.backNum = this.firstbg;
      } else {
        if (this.backNum < 2) this.backNum++
        else this.backNum = this.fpsbg;
        axios.post("/user/search", {
          query: this.query,
          userId: sessionStorage.getItem("token")
          //password:SHA256(this.adminLoginInfo.password).toString(),
        })
            .then(response => {
              if (response.data.code === 1) {
                ElMessage.success("搜索成功");
                this.games = response.data.payload;
                sessionStorage.setItem("games", response.data.payload);
              } else {
                ElMessage.error(response.data)
              }
            })
            .catch(error => {
              ElMessage.error("搜索失败");
            })
      }

    },
    DeleteToken() {
      sessionStorage.clear()
    }
  },
  beforeDestroy() {
    sessionStorage.setItem("games", JSON.stringify(this.games));
  },
  mounted() {
    if (sessionStorage.getItem("games") != null) {
      this.games = JSON.parse(sessionStorage.getItem("games"));
    }
  }


}
</script>

<style scoped>
.main-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  background-color: gainsboro;

  font-family: 'Times New Roman', Times, serif;
}

/*******************************************************
 *                    搜索和结果展示区                    *
 *******************************************************/
.search-show-container {

  width: 30%;
  height: 100%;
  padding: 1% 2% 3% 1%;
  display: flex;
  flex-direction: column;
}

/**********                搜索卡片              *********/


.auto-complete-search-card {
  width: 100%;
  height: 9%;
  border-radius: 20px;
  margin-bottom: 0.5%;
  display: flex;

  flex-direction: column;
}
.advanced-options-card{
  width: 100%;
  height: 30%;
  border-radius: 20px;
  margin-bottom:3%;
  display:flex;
  flex-direction: column;
}


.show-options-container{
  width: 100%;
  height: 20%;
}


.advanced-options-container{
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: row;
}




.auto-complete-search-card input {
  width: 100%;
  height: 50px;
  padding: 4px;

  font-size: x-large;
}

.auto-complete-search-card ul {
  margin-top: auto;
  position: absolute;
  width: 30.65%;
  max-height: 40%;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-top: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  z-index: 1000;
}

.auto-complete-search-card li {
  padding: 8px;
  cursor: pointer;
}

.auto-complete-search-card li.highlighted {
  background-color: #ff002b;
  color: #fff;
}

/*****************     结果信息卡片     **************/
.detailed-information-card {
  width: 100%;
  height: 100%;
  border-radius: 15px 30px 15px 30px;
  display: flex;
  flex-direction: row;
}
.main-picture-container{
  width: 40%;
  height: auto;
  
}

.You-may-love-container {
  width: 60%;
  height: 100%;
  padding: 1% 2% 3% 1%;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
}

.videoContainer {
  position: fixed;
  background-color: white;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 10;
}

.fullscreenVideo {
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