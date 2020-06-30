// function timeout(ms) {
//     return new Promise((resolve, reject) => {
//         setTimeout(resolve, ms, 'done');
//     })
// }
// timeout(1000).then((value) => {
//     console.log(value, '');
// });
// const getJSON = function(url) {    
//     const promise = new Promise(function(resolve, reject) {
//         const handler = function() {
//             if (this.readyState !== 4) {
//                 return;
//             }
//             if (this.status === 200) {
//                 resolve(this.response);
//             } else {
//                 reject(new Error(this.statusText));
//             }
//         }
//         const client = new XMLHttpRequest();
//         client.open('get', url);
//         client.onreadystatechange = handler;
//         client.responseType = 'json';
//         client.setRequestHeader('Accept', 'application/json');
//         client.send();
//     });
//     return promise;
// }

// getJSON('https://api.apiopen.top/getJoke?page=1&count=2&type=video').then((json) => {
//     console.log('content: ' + JSON.stringify(json));
// }, (error) => {
//     console.log('error：' + error);
// });
// const p = Promise.resolve('hello');
// p.then((s) => {
//     console.log(s, '--');
// })

// import $ from 'jquery';
// const jsPromise = Promise.resolve($.ajax('https://api.apiopen.top/getJoke?page=1&count=2&type=video'));
// jsPromise.then((json) => {
//     console.log(JSON.stringify(json), '---');
// })

// const promise = new Promise((reslove) => {
//     setTimeout(() => {
//         reslove(1);
//     }, 2000);
// });

// promise.then(a => console.log(a, ''));
// promise.then(a => console.log(a + 1, ''));

// function Promise(executor) {
//     let that = this;
//     that.status = 'pending';
//     that.data = undefined;
//     that.onResolvedCallback = [];

//     that.onRejectedCallback = [];

//     function resolve(value) {
//         setTimeout(() => {
//             if (that.status === 'pending') {
//                 that.status = 'resolved';
//                 that.data = value;
//                 for (let i = 0; i < that.onResolvedCallback.length; i++) {
//                     that.onResolvedCallback[i](value);
//                 }
//             }
//         });

//     }

//     function reject(reason) {
//         setTimeout(() => {
//             if (that.status === 'pending') {
//                 that.status = 'rejected';
//                 that.data = reason;
//                 for (let i = 0; i < that.onRejectedCallback.length; i++) {
//                     that.onRejectedCallback[i](reason);
//                 }
//             }
//         });
//     }

//     try {
//         executor(resolve, reject);
//     } catch (e) {
//         reject(e);
//     }
// }



// Promise.prototype.then = function(onResolved, onRejected) {
//     let that = this;
//     let promise2;
//     onResolved = typeof onResolved === 'function' ? onResolved : function(value) {return value};
//     onRejected = typeof onRejected === 'function' ? onRejected : function(reason) {return reason};

//     if(that.status === 'resolved') {
//         return promise2 = new Promise(function(resolve, reject){
//             try {
//                 let x = onResolved(that.data);
//                 if(x instanceof Promise) {
//                     x.then(resolve, reject);
//                 }else {
//                     resolve(x);
//                 }
//             }catch(e) {
//                 reject(e);
//             }
//         })
//     }

//     if(that.status === 'rejected') {
//         return promise2 = new Promise(function(resolve, reject) {
//             try{
//                 let x = onRejected(that.data);
//                 if(x instanceof Promise) {
//                     x.then(resolve, reject);
//                 }else {
//                     resolve(x)
//                 }
//             }catch(e) {
//                 reject(e);
//             }
//         })
//     }

//     if(that.status === 'padding') {
//         return promise2 = new Promise(function(resolve, reject) {
//             that.onResolvedCallback.push(function(value) {
//                 try {
//                     let x = onResolved(that.data);
//                     if(x instanceof Promise) {
//                         x.then(resolve, reject)
//                     }else {
//                         resolve(x)
//                     }
//                 }catch(e) {
//                     reject(e)
//                 }
//             })
//             that.onRejectedCallback.push(function(reason) {
//                 try {
//                     let x = onRejected(that.data);
//                     if(x instanceof Promise) {
//                         x.then(resolve, reject)
//                     }else {
//                         resolve(x)
//                     }
//                 }catch(e) {
//                     reject(e);
//                 }
//             })
//         })
//     }
// }

// 遍历器生成器
// class RangeIterator {
//     constructor(start, stop) {
//             this.value = start;
//             this.stop = stop;
//         }
//         [Symbol.iterator]() { return this; }
//         next() {
//             let value = this.value;
//             if(value < this.stop) {
//                 this.value ++;
//                 return {done: false, value: value}
//             }
//             return {done: true, value: undefined}
//         }
// }

// function range(start, stop){
//     return new RangeIterator(start, stop);
// }

// for(let value of range(0, 3)) {
//     console.log(value, '');
// }

// function Obj(value) {
//     this.value = value;
//     this.next = null;
// }

// Obj.prototype[Symbol.iterator] = function () {
//     let iterator = { next: next};
//     let current = this;
//     function next() {
//         if(current) {
//             let value = current.value;
//             current = current.next;
//             return {done: false, value: value}
//         }else {
//             return {done: true}
//         }
//     }
//     return iterator;
// }

// var obj = new Proxy({}, {
//     get: function(target, propKey, receiver) {
//         console.log(`getting ${propKey} !`);
//         return Reflect.ger(target, propKey, receiver);
//     },
//     set: function(target, propKey, value, receiver) {
//         console.log(`settting ${propKey} !`);
//         return Reflect.set(target, propKey, value, receiver);
//     }
// });
// const queuedObservers = new Set();
// const observe = fn => queuedObservers.add(fn);
// const observable = obj => new Proxy(obj, { set });

// function set(target, key, value, receiver) {
//     const result = Reflect.set(target, key, value, receiver);
//     queuedObservers.forEach(observer => observer());
//     return result;
// }

// const person = observable({
//     name: '张三',
//     age: 20
// });

// function print() {
//     console.log(`${person.name}, ${person.age}`);
// }

// observe(print);
// person.name = 'a司';
