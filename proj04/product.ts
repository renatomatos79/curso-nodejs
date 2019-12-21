import { Group } from "./group";

class Product {
    // propriedades da classe produto
    id:number;
    name:string;
    unity:string;
    price:number;
    balance:number;
    group:Group;    
    
    // parametro de entrada do construtor
    constructor(id:number, name: string, unity: string, price: number, balance: number, group: Group){
        this.id = id;
        this.name = name;
        this.unity = unity;
        this.price = price;
        this.balance = balance;
        this.group = group;
    }

    static report(groupId: number, list: Product[]): any {
        const items = list.filter(f => f.group.id === groupId);
        // length: quantidade de itens no array, semelhante ao count
        const count = items.length;
        // com map vc pode gerar uma nova lista apartir e outra
        // com reduce voce pode somar os elementos de uma lista entre si
        //  o operador "=>" representa o resultado de uma atribuicao, no caso a soma dos elementos anrior e atual (a e b)
        const sumBalance = items.map(s => s.balance * s.price).reduce((a,b) => a + b, 0);
        // tendo a lista com o saldo total, para cada iem, retorno apenas o maior elemento
        const maxBalance = items.map(s => s.balance * s.price).reduce((a, b) => a > b ? a : b);
        // tendo a lista, pego o minimo
        const minBalance = items.map(s => s.balance * s.price).reduce((a, b) => a > b ? b : a);
        // toFixed arredonda para N casas decimais
        const avgBalance = parseFloat((count === 0 ? 0 : sumBalance / count).toFixed(2));
        // resultado um elemento json
        return {"sum": sumBalance, "max": maxBalance, "min": minBalance, "avg": avgBalance, "count": count};
    }
}

export { Product };