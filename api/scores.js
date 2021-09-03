import { utils as etherUtils, BigNumber } from 'ethers';
import { flatten, range, orderBy } from 'lodash';
import pMap from 'p-map';
import ranks from '~/static/ranks.js';

const offset = range(0, 1000, 50);
const fetchScoreSet = (offset) => {
  return fetch(`https://api.opensea.io/api/v1/assets?collection=ability-score&offset=${offset}&limit=50`)
  .then(async response => {
    return await response.json().then(json => {
      return prune(json.assets);
    })
  });
}

const fetchAllScores = async () => {
  const allSets = await pMap(offset, fetchScoreSet, { concurrency: 2 });
  return orderBy(flatten(allSets).map(set => {
    const match = ranks.items.filter(item => item.id === Number.parseInt(set.token_id))[0];
    return {
      ...set,
      rank: match.rank,
      score: match.score,
      price: getPrice(set),
    }
  }), 'rank');
}

const prune = (assets) => {
  return assets.filter(asset => {
    return !!asset.image_url && !!asset.sell_orders;
  });
}

const getPrice = (asset) => {
  return Number(
    etherUtils.formatUnits(
      BigNumber.from(asset.sell_orders[0]?.current_price.split('.')[0]),
    ),
  );
}

export {
  fetchAllScores,
  getPrice
}