import { Group } from "../model/group";
import { GroupModel } from "../schemas/group.model";
import * as mongoose from "mongoose";

class GroupService {
    constructor(){}

    groups(): Array<Group>{
        const result:Array<Group> = new Array<Group>();
        GroupModel.find({},(error: any, data: mongoose.Document[])=>{            
            if (!error) {
                data.forEach(doc=>{
                    result.push(new Group(doc.id, "123"));
                });
            }
        });
        return result;
    }

    groups_v2(): Promise<mongoose.Document[]>{
        return new Promise((resolver, reject) => {
            const result:Array<Group> = new Array<Group>();
            GroupModel.find().then(groups=>{
                resolver(groups);
            });
        });        
    }
}

export { GroupService }