//封装本地存储的读写方法
export default{
    read(key){
        let result = window.localStorage.getItem(key);
        if(!result) result = [];
        return JSON.parse(result);
    },
    write(key,obj){
        let result = JSON.stringify(obj);
        window.localStorage.setItem(key,result);
    }
}