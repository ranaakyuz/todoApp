class Calculator{

    static isHaveOperator(value){
        let result = false;
        for(let i=0;i<value.length;i++){
            if(this.getOperators().has(value[i])){
                result = true;
                break;
            }
        }
        return result;
    }

    static isDotHave(value){
        let result = false;
        if(value.includes(".")){
            result = true;
        }
        return result;
    }

    static getOperators(){
        const map = new Map();
        map.set("+","toplama");
        map.set("-","çıkarma");
        map.set("*","çarpma");
        map.set("/","bölme");
        return map;
    }

    static deleteLastChar(value){
        let result;
        return result = value.slice(0,value.length-1);
    }
}
