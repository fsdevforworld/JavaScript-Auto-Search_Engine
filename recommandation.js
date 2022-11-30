var data = require('./data.json');
// const ContentBasedRecommender = require('content-based-recommender');
// const recommender = new ContentBasedRecommender({
//   maxVectorSize: 10,
//   minScore: 0.1,
//   maxSimilarDocuments: 100
// });

// const recommandation = async (search) => {
//   console.log(search);
//   let rec_data = data.map((d,i) =>{
//     return {id: i, content: d.search_term}
//   })
//   rec_data.push({id: rec_data.length, content: search});

//   // start training
//   await recommender.train(rec_data);
  
//   const similarDocuments = await recommender.getSimilarDocuments(rec_data.length-1, 0, 100);

//   let res_data = similarDocuments.map(d => {
//     return {...d, ...data[d.id]}
//   })
//   return res_data.sort((a, b) => b.share_of_voice - a.share_of_voice);
// }

const stringSimilarity = require("string-similarity");

const recommandation = async (search) => {
  console.log(search);
  let rec_data = data.map((d, i) => d.search_term+'::'+i);

  let {ratings} = stringSimilarity.findBestMatch(search, rec_data);

  let res_data = ratings.map((r)=>{
    return {...data[r.target.split('::')[1]*1], ...r, rec: r.rating*500+data[r.target.split('::')[1]*1].share_of_voice*1}
  })
  return res_data.sort((a, b) => b.rating - a.rating).slice(0,100).sort((a, b) => b.share_of_voice - a.share_of_voice).slice(0,12);
}

module.exports = recommandation;