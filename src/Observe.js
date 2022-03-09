import Dep from "./dep.js";
/**
 * 将 object 数据的每层属性都变为响应式
 * @param {object} value
 */

class Observer{
    constructor(value){
        // 给数据对象定义  __ob__  属性， 指向当前 Observe 实例， 不可遍历
        def(value, '__ob__', this, false);
        console.log(`生成Observe - ${value}`);

        this.walk(value);
    }

    walk(value){
        for(let key in value){
            defineReactive(value, key)
        }
    }

}




function def(obj, key, value, enumerable){
    Object.defineProperty(obj, key, {
        value,
        enumerable,
        writable : true,
        configurable : true 
    })
}





function defineReactive(obj, key, value){

    const dep = new Dep();
    // obj.__ob__.dep = dep;
    // console.log(`key : ${key}, dep : ${dep}`)
    // console.log(dep);

    if(arguments.length === 2){
        value = obj[key]
    };

    let childOb = observe(value);

    Object.defineProperty(obj, key, {
        enumerable : true,
        configurable : true,
        get(){
            console.log(`getter访问 ${key} 属性`);
            if(Dep.target){
                dep.depend();
                // if(childOb){
                //     childOb.dep.depend();
                // }
            }
            return value;
        },
        set(newValue){
            console.log(`settet修改 ${key} 属性为 ${newValue}`);
            if(value === newValue) return;
            value = newValue
            childOb = observe(newValue) // 新值为对象时，也要响应式

            dep.notify();
        }
    })
}




function observe(value){
    if( typeof value !== 'object') return;

    let ob = null;
    if(value.__ob__) {
        ob = value.__ob__;
    }else{
        ob = new Observer(value);
    }

    return ob;
}

export default observe;