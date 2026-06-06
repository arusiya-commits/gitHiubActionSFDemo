import { LightningElement, wire } from 'lwc';
import { getListUi } from 'lightning/uiListApi';
import CONTACT_OBJECT from '@salesforce/schema/Contact';

const COLUMNS = [
    { label: 'Name', fieldName: 'Name', type: 'text', sortable: true },
    { label: 'Email', fieldName: 'Email', type: 'email', sortable: true },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Title', fieldName: 'Title', type: 'text' },
    { label: 'Account', fieldName: 'AccountName', type: 'text' }
];

export default class ContactDatatable extends LightningElement {
    columns = COLUMNS;
    error;

    @wire(getListUi, {
        objectApiName: CONTACT_OBJECT,
        listViewApiName: 'AllContacts',
        pageSize: 50
    })
    wiredContacts({ error, data }) {
        if (data) {
            this.contacts = {
                data: data.records.records.map(record => ({
                    Id: record.id,
                    Name: record.fields.Name?.value,
                    Email: record.fields.Email?.value,
                    Phone: record.fields.Phone?.value,
                    Title: record.fields.Title?.value,
                    AccountName: record.fields.Account?.value?.fields?.Name?.value
                }))
            };
            this.error = undefined;
        } else if (error) {
            this.error = error.body?.message || 'Error loading contacts';
            this.contacts = undefined;
        }
    }

    get isLoading() {
        return !this.contacts && !this.error;
    }
}
