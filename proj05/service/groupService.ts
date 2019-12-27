import { Group } from "../model/group";

class GroupService {
    constructor(){}

    groups(): Array<Group>{
        const groups:Array<Group> = new Array<Group>();
        groups.push(new Group(1, "Informática"));
        groups.push(new Group(2, "Papelaria"));
        groups.push(new Group(3, "Brinquedos"));
        return groups;
    }
}

export { GroupService }