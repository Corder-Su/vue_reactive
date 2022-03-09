import observe from './src/Observe.js'
import Watcher from './src/watch.js'

let data = {
    a : {
        b : 1,
        c : {
            d : 1,
            f : 2
        }
    },
    b : 2
}

observe(data)
console.log(data)
new Watcher(data, 'a.c.d', (newVal, oldVal) => {
    console.log(`a.c.d的值由${oldVal} 改为 ${newVal}!!`)
})
data.a.c.d = 285;
console.log(data);



data.a.c.d = 555;

data.a.c.d = 579;