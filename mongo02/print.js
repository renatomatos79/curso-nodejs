// load("C:/Temp/curso-nodejs/mongo02/print.js")

conn = new Mongo();
db = conn.getDB("test");
var myCursor = db.orders.find( { cust_id: "abc1" } );
while (myCursor.hasNext()) {
   print(tojson(myCursor.next()));
}