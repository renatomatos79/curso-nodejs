class Util {
    static pagination<T>(list: Array<T>, skip?: number, take?: number): Array<T>{
        let temp = list;
        if (skip) {
            temp = temp.slice(skip);
        }
        if (take) {
            temp = temp.slice(0, take);
        }        
        return temp;
    }
}

export { Util }