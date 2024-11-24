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


        <el-container style="display: flex;flex-direction: row;">
          <el-container class="head-picture-container">

            <img :src=ToShowPicture alt="Head Picture" class="head-picture">

            <div style="display: flex; flex-direction: row;  overflow-x: auto;white-space: nowrap;margin-top: 5px">
              <div v-for="(picture,index) in toShowGame.pictures" :key="index"
                   style="display:inline-block;margin-right: 5px">
                <img :src=picture class="single-picOrMovie-card" alt="Need pic" @click="changePicture(picture)">
              </div>
            </div>

          </el-container>

          <el-container class="detailed-information-container ">
            <img :src="toShowGame.MainPictureSrc" alt="Main Picture" class="main-picture">
            <div
                style="width:100%;margin-top:5px;color: gainsboro;font-size: large;word-wrap: break-word;word-break: break-all;overflow: hidden;">
              <p> {{ toShowGame.description }}</p></div>
            <div
                style="width: 100%;margin-top: 3px;margin-bottom:3px;text-align: center;color:deepskyblue;font-size:2em;font-weight: 300;">
              <p> {{ toShowGame.title }} </p></div>

            <div style="width:100%;">
              <p>
                <span style="font-size: math;color:darkgray;">Release date</span>
                <span style="font-size: math;color:cornflowerblue; margin-left: 30%">{{this.toShowGame.releaseDate}}</span>
              </p>
            </div>


            <div style="display: flex; flex-direction: row;overflow: hidden;margin-top: 4%;">
              <div v-for="(count,tag) in this.toShowGame.tags" :key="tag">
                <el-tag style="margin-left: 2px;font-size: 14px;color: #2c3e50"> {{tag}}</el-tag>
              </div>
            </div>

          </el-container>


        </el-container>
      </el-card>

      <el-card class="Action-field-card">
        <el-container class="Action-field-container">
          <div style="color: gainsboro;font-size: 20px;margin-top: 10px;margin-left: 15px">更多相关推荐</div>
          <el-button
        </el-container>


      </el-card>
      <el-card class="command-card">

      </el-card>


    </el-container>



    <el-container class="You-may-love-container">

    </el-container>

  </el-container>
</template>


<script>
import axios from 'axios';
import gamesData from '@/assets/newgames.json';
import {ElMessage, ElButton, ElIcon} from "element-plus";

export default {

  data() {
    return {

      query: '',
      showOptions: false,
      suggestions: [{"name": "Game A", "estimated_owners": "20000"},],
      toSearchGames: gamesData,
      filteredSuggestions: [],
      showSuggestions: false,
      highlightedIndex: -1,
      toShowGame: {
        appId: 0,
        title: 'PUBG:BATTLEGROUNDS',
        releaseDate: '2017 年 12 月 21 日',
        winSupport: false,
        macSupport: false,
        linuxSupport: false,
        price: 0.00,
        tags: {
          "Survival": 14039,
          "Shooter": 11849,
          "Multiplayer": 10176,
          "Battle Royale": 10065,
          "FPS": 7776,

        },
        supportedLanguages: [],
        website: '',
        MainPictureSrc: 'https://cdn.akamai.steamstatic.com/steam/apps/578080/header.jpg?t=1658287469',
        headerImage: '',
        recommendations: 0,
        positive: 0,
        negative: 0,
        estimatedOwners: 0,
        pictures: [
          "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_e2cbfefdff39b9cb8e080da8f30cc07223b041b9.1920x1080.jpg?t=1658287469",
          "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_01d84950ddfb28ea611f1fa1a28c3cb08ccd7eee.1920x1080.jpg?t=1658287469",
          "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_606cee13e97530720c678513cb1138ef9854d7d5.1920x1080.jpg?t=1658287469",
          "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_4454f310776c626a76baeca2d05fd82bd17c6ee0.1920x1080.jpg?t=1658287469",
          "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_e34bcd20c7e3f5244c17b5af5d192b2149e11d33.1920x1080.jpg?t=1658287469",
          "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_0985fff929498a15793fc3df766607fb54bf5338.1920x1080.jpg?t=1658287469",
          "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_2db6a7b87ad61fbee74adcd2d7b03eee1a28743e.1920x1080.jpg?t=1658287469",
          "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_93e6e1fa807c3b3b09ce4e1e4800e7723dc308a1.1920x1080.jpg?t=1658287469",
          "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_c49417566f70eec8bf0ddbb2956b235d91504a09.1920x1080.jpg?t=1658287469",
          "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_de28db240ee8646b1dd883a141b4832271a150e7.1920x1080.jpg?t=1658287469",
          "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_11e51d12d854712ed7c83e69f1b21d246ab018b3.1920x1080.jpg?t=1658287469",
          "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_abadb3bfc951cd05150901ff65386e3129c6011a.1920x1080.jpg?t=1658287469",
          "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_cec7ea5e83407dba51c80d24a2c8076e93752d4f.1920x1080.jpg?t=1658287469",
          "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_8814c071f0cce53821d8e1b1a96de78d00e5d4d1.1920x1080.jpg?t=1658287469",
          "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_5fe3d8ce7e90442569fc676e2315fffdf81dd1a5.1920x1080.jpg?t=1658287469",
          "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_2b1f73afd6efb1952ee267e94f8bcc24ec5e8fb3.1920x1080.jpg?t=1658287469",
          "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_52773275afe4c34a84fbf38e9960a598a420b3c2.1920x1080.jpg?t=1658287469",
          "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_c98c609e2f07c80c8455624cc62696c9dde9ea73.1920x1080.jpg?t=1658287469",
          "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_07590e851053a453e09c7d6f272adf602c3f8ee8.1920x1080.jpg?t=1658287469",
          "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_56d29e4503ba1a74047feb55986c6bf4ca4297f9.1920x1080.jpg?t=1658287469",
          "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_f96bc802fb38617ce790c0950b87a7979f096025.1920x1080.jpg?t=1658287469",
          "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_23af2e59855a833c22d0c11ca23a719f54a554ff.1920x1080.jpg?t=1658287469",
          "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_108e2981889423b057b778cd07ae25ac18406cf1.1920x1080.jpg?t=1658287469",
          "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_a403a1f4071d36d42bea7a505089b56b570b2569.1920x1080.jpg?t=1658287469",
          "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_109d7072cf85f5b3b1e3dacadf3009718db451c4.1920x1080.jpg?t=1658287469",
          "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_e7e79847eff0933de92192bb62b8bc7068d611da.1920x1080.jpg?t=1658287469",
          "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_8112cd376568d9470c2edde841908fcdf46f1529.1920x1080.jpg?t=1658287469",
          "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_4bbcaeac1ef977d962c60c1a5e4675cdd81de564.1920x1080.jpg?t=1658287469",
          "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_88a8dff0756673179e190c2e16d090de63ecfb2e.1920x1080.jpg?t=1658287469",
          "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_29d0709711f3204e84b6f9d69f3be163ebe12486.1920x1080.jpg?t=1658287469",
          "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_6595641da498162aedc71136a93feb5bcb1785d8.1920x1080.jpg?t=1658287469"
        ],
        movies: [
          "http://cdn.akamai.steamstatic.com/steam/apps/256896251/movie_max.mp4?t=1657765655",
          "http://cdn.akamai.steamstatic.com/steam/apps/256868780/movie_max.mp4?t=1641965538",
          "http://cdn.akamai.steamstatic.com/steam/apps/256864911/movie_max.mp4?t=1639450117",
          "http://cdn.akamai.steamstatic.com/steam/apps/256842241/movie_max.mp4?t=1625828895",
          "http://cdn.akamai.steamstatic.com/steam/apps/256814351/movie_max.mp4?t=1626232779",
          "http://cdn.akamai.steamstatic.com/steam/apps/256805874/movie_max.mp4?t=1619690398",
          "http://cdn.akamai.steamstatic.com/steam/apps/256793553/movie_max.mp4?t=1595992300",
          "http://cdn.akamai.steamstatic.com/steam/apps/256782753/movie_max.mp4?t=1587538797",
          "http://cdn.akamai.steamstatic.com/steam/apps/256773105/movie_max.mp4?t=1619690406",
          "http://cdn.akamai.steamstatic.com/steam/apps/256774477/movie_max.mp4?t=1619690413",
          "http://cdn.akamai.steamstatic.com/steam/apps/256774476/movie_max.mp4?t=1619690420",
          "http://cdn.akamai.steamstatic.com/steam/apps/256774471/movie_max.mp4?t=1619690427",
          "http://cdn.akamai.steamstatic.com/steam/apps/256774464/movie_max.mp4?t=1619690435",
          "http://cdn.akamai.steamstatic.com/steam/apps/256757848/movie_max.mp4?t=1564606214",
          "http://cdn.akamai.steamstatic.com/steam/apps/256720476/movie_max.mp4?t=1619690442"
        ],
        description: "Play PUBG: BATTLEGROUNDS for free. Land on strategic locations, loot weapons and supplies, and survive to become the last team standing across various, diverse Battlegrounds. Squad up and join the Battlegrounds for the original Battle Royale experience that only PUBG: BATTLEGROUNDS can offer.",
      },

      ToShowPicture: '',
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
  computed: {

  },

  methods: {
    changePicture(picture) {
      this.ToShowPicture = picture;
    },

    showOptions() {
      this.showSuggestions = !this.showSuggestions;
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
    this.ToShowPicture = this.toShowGame.pictures[0];
  }


}
</script>

<style scoped>
.main-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;

  font-family: 'Times New Roman', Times, serif;
}

/*******************************************************
 *                    搜索和结果展示区                    *
 *******************************************************/
.search-show-container {

  width: 80%;
  height: 100%;
  padding: 1% 2% 0% 1%;
  display: flex;
  background: #2c3e50;
  flex-direction: column;

}

/**********                搜索卡片              *********/


.auto-complete-search-card {
  width: 100%;
  height: 9%;
  border: none;
  margin-bottom: 0.5%;
  display: flex;
  background: #2c3e50;
  flex-direction: column;
}

.advanced-options-card {
  width: 100%;
  height: 15%;
  border: none;
  margin-bottom: 3%;
  display: flex;
  background: #2c3e50;
  flex-direction: column;
}


.show-options-container {
  width: 100%;
  height: 20%;
  background: #2c3e50;
}


.advanced-options-container {
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: row;
}


.auto-complete-search-card input {
  width: 100%;
  height: 50px;
  padding: 4px;
  background: #2c3e50;
  font-size: x-large;
  color: white;
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
  background-color: dimgrey;
  color: white;
  z-index: 1000;
}

.auto-complete-search-card li {
  padding: 8px;
  cursor: pointer;
}

.auto-complete-search-card li.highlighted {
  background-color: whitesmoke;
  color: black;
}

/*****************     结果信息卡片     **************/
.detailed-information-card {
  width: 100%;
  height: auto;
  display: flex;
  background: #2c3e50;
  border: none;
  flex-direction: row;
}


.head-picture-container {
  width: 30vw;
  height: auto;
  display: flex;
  flex-direction: column;
}

.head-picture {
  width: 100%;
  height: 100%;
  padding-left: 0;
  padding-right: 0;
  object-fit: fill;
}

.main-picture {
  width: 100%;
  height: auto;
  object-fit: fill;
}

.single-picOrMovie-card {
  width: 7vw;
  object-fit: fill;
}


.detailed-information-container {
  width: 30%;
  height: auto;
  padding-top: 0;
  padding-right: 0;
  padding-left: 1%;
  display: flex;
  flex-direction: column;
}

.Action-field-card{
  width: 100%;
  height: 4%;
  background: #535bf2;
  margin-top: 3px;
  border:none;
}

.Action-field-card:deep(.el-card__body) {
  padding: 0;
}

.Action-field-container{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}

.command-card{
  width: 100%;
  height:auto;
  margin-top: 8px
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

::-webkit-scrollbar {
  width: 6px; /* 对垂直滚动条有效 */
  height: 6px; /* 对水平滚动条有效 */
}

/* 定义滚动条的轨道颜色、内阴影及圆角 */
::-webkit-scrollbar-track {
  border-radius: 4px;
  background-color: #1a1a1a;
}

/* 定义滑块颜色、内阴影及圆角 */
::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background-color: #555;
}

/* 定义滑块悬停变化颜色、内阴影及圆角 */
::-webkit-scrollbar-thumb:hover {
  background-color: #646cff;
}

</style>