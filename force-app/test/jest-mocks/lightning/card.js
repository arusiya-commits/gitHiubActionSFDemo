import { LightningElement, api } from 'lwc';
export default class LightningCard extends LightningElement {
    @api title;
    @api iconName;
    @api variant;
}
