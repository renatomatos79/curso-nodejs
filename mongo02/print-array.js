// load("C:/Temp/curso-nodejs/mongo02/print-array.js")

conn = new Mongo();
db = conn.getDB("test");
var myCursor = db.orders.find( { cust_id: "abc1" } ).forEach( function(row) { 
	print( "cust_id: " + row.ord_date ); 
} );
