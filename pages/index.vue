<template>
  <div class="home">
    <h1 class="home__header">Ability Scores</h1>
    <p class="home__intro">Displays Ability Scores for sale by lowest price on <a href="https://opensea.io/collection/ability-score">OpenSea</a>. Includes rarity rank which is calculated <a href="https://github.com/Anish-Agnihotri/dhof-loot/blob/master/derivatives/andy8052-ability-score/output/score.json">here</a>.</p>
    <div class="home__ability-cards">
      <div v-for="item in items" :key="item.id" class="home__ability-cards__card">
        <img :src="item.image_url">
        <a :href="item.permalink">View on Opensea</a>
        <span>Rank: {{ item.rank }} Score: {{ item.score }} Price {{ item.price }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchAllScores } from '~/api/scores.js';

export default {
  data() {
    return {
      items: [],
    }
  },
  async fetch() {
    this.items = await fetchAllScores();
  },
  methods: {
    collectData() {

    },
    getColor(tokenId) {
      
    },
  }
}
</script>

<style scoped>
.home {
  max-width: 1096px;
  margin-left: auto;
  margin-right: auto;
}

.home__intro {
  font-size: 1.2rem;
  text-align: center;
}

.home__header {
  text-align: center;
  font-size: 5rem;
}
.home__ability-cards .home__ability-cards__card {
  display: inline-block;
  padding: 3rem;
  border: 3px solid #fff;
  margin: 1rem;
  width: 20%;
}
</style>