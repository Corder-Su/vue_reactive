/**
 * Dep 类 管理、收集、删除依赖，并向依赖发送通知。
 */
let uid = 0
class Dep{
    constructor(){
        console.log('新建Dep');
        this.id = uid++;
        this.subs = []; // 数组存放watcher实例
    }

    addSub(sub){
        this.subs.push(sub)
    }

    removeSub(sub){
        const subs = this.subs;
        if(subs.length > 0){
            const index = subs.indexOf(sub);
            if(index > -1){
                return subs.splice(index, 1);
            }
        }
    }

    depend(){ // 指定一个唯一的全局位置？
        if(Dep.target){
            this.addSub(Dep.target)
        }
    }

    notify(){
        console.log('notify');
        const subs = this.subs.slice();
        for(let sub of subs){
            sub.update(); // 通知相应的更新
            this.removeSub(sub)
        }
    }
}

export default Dep