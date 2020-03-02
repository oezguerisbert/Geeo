import * as path from 'path';
import * as fs from 'fs';
import GeeoPage from './GeeoPage/index';
export default class GeeoWebPage {
    private text: string = null;
    private parsed: string = null;
    private page: GeeoPage = null;
    constructor(text: string) {
        if (
            fs.existsSync(
                path.join(
                    process.cwd(),
                    './dev/System/Server/Web/Templates/gjs/',
                    text.endsWith('.gjs') ? text : text.concat('.gjs')
                )
            )
        ) {
            this.page = new GeeoPage(
                path.join(
                    process.cwd(),
                    './dev/System/Server/Web/Templates/gjs/',
                    text.endsWith('.gjs') ? text : text.concat('.gjs')
                )
            );
        } else {
        }
        this.text = text;
    }
    public build(): string {
        if (this.text != null) {
            if (this.page != null) {
                this.parsePage(this.page);
            } else {
                this.parseString(this.text);
            }
        }
        return this.parsed;
    }
    private parsePage(page: GeeoPage) {
        this.parsed = page.create();
    }
    private parseString(text: string) {
        this.parsed = text;
    }
}
