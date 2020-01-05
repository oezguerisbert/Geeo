import Command from '../index';
export default class GUI extends Command<any> {
    run(whatev: any, filter?: any): Promise<any> {
        return new Promise((resolve, reject) => {
            let error: Error = new Error("This command does not exist.");
            switch (whatev.toString()) {
                case 'show':
                    resolve({visible:true});
                    break;
                case 'hide':
                    resolve({visible:false});
                    break;
                default:
                    reject({error:error});
                    break;
            }
        });
    }
}
