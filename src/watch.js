import Dep from "./dep.js";

let uid = 0;

export default class Watcher{
    constructor(target, expression, callback){
        console.log('new Watcher');
        this.id = uid++;
        this.target = target;
        this.getter = prasePath(expression);
        this.callback = callback;
        this.value = this.get();
    }

    get(){
        // 依赖收集阶段
        Dep.target = this;
        const data = this.target;
        let value;
        try {
            // 访问了data中的数据，依赖被收集到
            value = this.getter(data)
        } finally {
            Dep.target = null;
        }
        return value;
    }

    update(){
        this.run();
    }

    run(){
        this.getAndInvoke(this.callback)
    }

    getAndInvoke(callback){
        const value = this.get();
        if(value !== this.value || typeof value === 'object'){
            const oldValue = this.value;
            this.value = value;
            callback.call(this.target, value, oldValue);
        }
    }
}

function prasePath(expression){
    let segments = expression.split('.');
    return function(data){
        for(let key of segments){
            if(!data) return null;
            data = data[key];
        }
        return data;
    }
}