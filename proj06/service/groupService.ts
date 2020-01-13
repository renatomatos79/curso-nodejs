import { Group } from "../model/group";
import { GroupModel } from "../schemas/group.model";
import * as mongoose from "mongoose";

class GroupService {
    constructor(){}

    groups(): Array<Group>{
        const groups:Array<Group> = new Array<Group>();
        groups.push(new Group(1, "Informática"));
        groups.push(new Group(2, "Papelaria"));
        groups.push(new Group(3, "Brinquedos"));
        return groups;
    }

    groups_v2(): Promise<mongoose.Document[]>{
        return new Promise((resolver, reject) => {
            GroupModel.find().then(groups=>{
                resolver(groups);
            });
        });        
    }
}

export { GroupService }