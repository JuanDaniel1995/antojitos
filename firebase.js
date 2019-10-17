const admin = require("firebase-admin");
const path = require("path");
const homedir = require("os").homedir();
const serviceAccount = path.join(
  homedir,
  ".keys",
  "antojitos-b621a-firebase-adminsdk-z1ing-ff30b61f30.json"
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
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
