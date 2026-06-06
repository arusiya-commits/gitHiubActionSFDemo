import { LightningElement } from 'lwc';

export default class LightningMock extends LightningElement {}

export const ShowToastEventName = 'lightning__showtoast';
export class ShowToastEvent extends CustomEvent {
    constructor(toast) {
        super(ShowToastEventName, { detail: toast });
    }
}
