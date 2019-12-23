import Identity from '../Identity/index';
import { GeeoMap } from '../GeeoMap/index';
import getMAC from 'getmac';
import User from '../User';
import Node from '../Crypt/index';
import * as fs from 'fs';
import * as path from 'path';
interface PK_IDENTITY {
    pk: Buffer;
    ident: Identity;
}
export default abstract class Device {
    private static identities: GeeoMap<string, PK_IDENTITY> = Device.loadIdentities();
    private static MAC_ADRESS = getMAC();
    private static MAC_ADRESS_HEX = Buffer.from(
        Device.MAC_ADRESS.split(':').join(''),
        'hex'
    ).toString('hex');

    /**
     * Checks if Identity exists
     *
     * @static
     * @param {string} name
     * @returns
     * @memberof Device
     */
    public static hasIdentity(name: string) {
        return Device.identities.hasItem(name);
    }
    private static loadIdentities(): GeeoMap<string, PK_IDENTITY> {
        let result = new GeeoMap<string, PK_IDENTITY>();
        let rootUsers = path.join(path.dirname(require.main.filename), "../saved/entities/users/");
        let f = fs.readdirSync(rootUsers);
        f.filter((v:string, index:number)=>{
            return fs.statSync(path.join(rootUsers,v)).isDirectory();
        });
        f.forEach((value)=>{
            let name = Buffer.from(value, 'hex').toString('utf8');
            let user_path = path.join(rootUsers, value, "user");
            let user_json = JSON.parse(fs.readFileSync(user_path).toString());
            result = result.addItem(name, {ident:Identity.of(name), pk:user_json.private});
        });
        
        return result;
    }
    /**
     *
     * Gives Identity based on name (if exists);
     * @static
     * @param {string} name
     * @returns
     * @memberof Device
     */
    public static getIdentity(name: string): Identity {
        return Device.hasIdentity(name)
            ? Device.identities.getItem(name).ident
            : null;
    }

    /**
     *
     * Creates Identity and stores it.
     * @param {string} name
     * @memberof Device
     */
    public static createIdentity(name: string):Identity {
        let i:Identity = null;
        console.error(`Trying to create Identity '${name}'.`);
        if (!Device.hasIdentity(name)) {
            let s = Device.MAC_ADRESS_HEX;
            let additionalSLength = Math.log2(16 - s.length);
            let randomS = Node.randomString(additionalSLength);
            let newS: string = s.concat(
                Buffer.from(randomS, 'utf8').toString('hex')
            );
            let pk = Buffer.from(newS, 'hex');
            i = new Identity(name, pk);
            let pk_i: PK_IDENTITY = { pk: pk, ident: i };
            Device.identities = Device.identities.addItem(name, pk_i);
            console.log(`Created Identity '${name}'.`);
            
        } else {
            console.error("Identity exists already, aborting.");
        }
        return i;

    }

    /**
     *
     * Gives private key of Device.
     * @static
     * @returns {Buffer}
     * @memberof Device
     */
    public static getPrivateKey(name: string): Buffer {
        return Device.identities.getItem(name).pk;
    }
}