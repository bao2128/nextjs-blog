// const points = [4, 100, 1, 500, 25, 10]
// points.sort(function (a, b) { return b - a })
// console.log(points)
// let tmp = []
// console.log(tmp, typeof (tmp))
// // console.log('tmp');
//
// const fooString1 = new String("foo");
// const fooString2 = new String("foo");

// // Evaluates to false
// const tmp = (fooString1 == fooString2);
// console.log(typeof(tmp))
// //

var obj = {
    hello: "World",
    sayHello: (function() {
        console.log("I say Hello!");
    }).toString()
};
var myobj = JSON.parse(JSON.stringify(obj));
myobj.sayHello = new Function("return ("+myobj.sayHello+")")();
myobj.sayHello();

let tmpStr = '    '
console.log(!!tmpStr.trim())