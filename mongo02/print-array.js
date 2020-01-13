// load("C:/Temp/curso-nodejs/mongo02/print-array.js")

conn = new Mongo();
db = conn.getDB("aula");
var myCursor = db.orders.find( { cust_id: "abc1" } ).forEach( function(row) { 
	print( "ord_date: " + row.ord_date ); 
} );
