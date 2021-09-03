<template>
  <div class="home">
    <h1 class="home__header">Ability Scores</h1>
    <p class="home__intro">Displays Ability Scores for sale by highest rank on <a href="https://opensea.io/collection/ability-score">OpenSea</a>. Includes rarity rank which is calculated <a href="https://github.com/Anish-Agnihotri/dhof-loot/blob/master/derivatives/andy8052-ability-score/output/score.json">here</a>.</p>
    <div class="home__ability-cards">
      <div v-for="item in items" :key="item.id" class="home__ability-cards__card">
        <img :src="item.image_url" class="home__ability-cards__card-image">
        <button class="home__ability-cards__card-button" @click="goTo(item.permalink)">Ξ {{ item.price }}</button><br/><br/>
        <div>Rank: {{ item.rank }}</div>
        <div>Score: {{ item.score }}</div>
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
    goTo(link) {
      window.location = link;
    }
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
  padding: 1rem;
  border: 3px solid #fff;
  margin: .9rem;
  width: 25%;
  text-align: center;
}

.home__ability-cards__card-button {
  border-radius: 2px;
  border: 1px solid white;
  background-color: #fff;
  padding: 0.5rem;
  cursor: pointer;
}

.home__ability-cards__card-image {
}
</style>