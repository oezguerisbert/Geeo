import Entity from '../Entity';
import * as fs from 'fs';
import * as path from 'path';
import Safe from '../Safe';
import Node from '../Crypt';
import Identity from '../Identity/index';

/**
 * User Class.
 *
 * @export
 * @class User
 * @extends {Entity}
 */
export class User extends Entity {
    
    /**
     * Creates an instance of User.
     * @param {string} name
     * @memberof User
     */
    constructor(name: string) {
        super('user', name);
        this.addParameter('settings', '',false);
        this.addParameter('storages', []);
        this.addParameter('loggedin', false,false);
        this.addSafe(new Safe(name,'documents'));
        this.saveCurrentState();

    }
    public static exists(name:string | Identity){
        if(name instanceof Identity){

        }else {
            
        }
        return fs.existsSync();
    }
    public static from(hash: string): User {
        let u: User = null;
        let p = path.join(
            path.dirname(require.main.filename),
            '../saved/users/', hash
        );
        let name = "";
        let file = fs.readFileSync(p).toString();

        let encJSON = new Node(file);

        let userJSON = JSON.parse(JSON.parse(encJSON.toString()).data).user;
        u = new User(name);
        let keys = Object.keys(userJSON);

        keys.forEach(key => {
            u.addParameter(key, userJSON[key]);
        });
        u.addParameter('last_loaded', Date.now());
        return u;
    }
    static load(name: string): User {
        let u:User = null;
        
        return u;
    }
    public setLoggedIn(s: boolean) {
        this.addParameter('loggedin', s);
    }
    public isLoggedIn():boolean {
        let o = this.getParameter('loggedin');
        let result:boolean = false;
        if(typeof o === 'boolean'){
            result = o;
        }
        
        return result;
    }
    /**
     * Creates a storage for the User.
     *
     * @private
     * @memberof User
     */
    public addSafe(storage: Safe): boolean {
        let result = false;
        let storages = this.getParameter('storages');
        if (storages != null && Array.isArray(storages)) {
            if (storages.length < storages.push(storage)) {
                this.update('storages', storages);
                result = true;
            }
        }
        return result;
    }
    public getSafe(name: string): Safe {
        let result = null;
        let storages = this.getParameter('storages');
        if (storages != null && Array.isArray(storages)) {
            result = storages.filter((storage: Safe) => {
                return storage.getName() === name;
            })[0];
        }

        return result;
    }
    public getSafes(): Array<Safe> {
        let result = null;
        let storages = this.getParameter('storages');
        if (storages != null && Array.isArray(storages)) {
            result = storages;
        }

        return result;
    }
    /**
     * Stores the User to a file in root folder.
     *
     * @returns {boolean} Success of saved state.
     * @memberof User
     */
    public save(): boolean {
        let me = this;
        let result: boolean = false;
        let node = JSON.parse(JSON.stringify(this.getParameter('node')));
        console.log(node);
        
        // fs.writeFileSync(
        //     path.join(
        //         path.dirname(require.main.filename),
        //         '../saved/users/',
        //         this.getName().concat('.geeocypher')
        //     ),
        //     (() => {
        //         result = true;
        //         let obj = { key: key, iv: iv, data: data };
        //         return JSON.stringify(obj);
        //     })()
        // );
        return result;
    }
}

export default User;
