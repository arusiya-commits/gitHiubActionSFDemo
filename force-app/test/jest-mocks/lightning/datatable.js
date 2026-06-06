import { LightningElement, api } from 'lwc';
export default class LightningDatatable extends LightningElement {
    @api keyField;
    @api data;
    @api columns;
    @api hideCheckboxColumn;
    @api sortedBy;
    @api sortedDirection;
}
