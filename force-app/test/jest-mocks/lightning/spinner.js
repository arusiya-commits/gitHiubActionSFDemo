import { LightningElement, api } from 'lwc';
export default class LightningSpinner extends LightningElement {
    @api alternativeText;
    @api size;
}
