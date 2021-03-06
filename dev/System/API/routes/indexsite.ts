import express from 'express';
import Pager from '../../Pager';

namespace indexsite {
    export function get() {
        return [
            '/$',
            (req: express.Request, res: express.Response) => {
                let page = new Pager.Page(
                    Pager.PageVersion.API,
                    'essentials.js',
                    'api.js',
                    'main.css'
                );
                return page.render(res);
            },
        ];
    }
}
export default indexsite;
