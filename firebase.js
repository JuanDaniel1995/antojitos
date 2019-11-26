const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_CONFIG)),
  databaseURL: "https://antojitos-b621a.firebaseio.com"
});

const db = admin.firestore();

module.exports = {
  showDishes: async function() {
    return await db.collection("dishes").get();
  },
  showDishPrice: async function(dishName) {
    return await db
      .collection("dishes")
      .where("name", "==", dishName)
      .get();
  }
};
