import { LightningElement, wire } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';

const COLUMNS = [
    { label: 'Name', fieldName: 'Name', type: 'text', sortable: true },
    { label: 'Email', fieldName: 'Email', type: 'email', sortable: true },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Title', fieldName: 'Title', type: 'text' },
    { label: 'Account', fieldName: 'AccountName', type: 'text' }
];

export default class ContactDatatable extends LightningElement {
    columns = COLUMNS;
    contacts;
    error;

    @wire(getContacts)
    wiredContacts({ error, data }) {
        if (data) {
            this.contacts = data.map((record) => ({
                Id: record.Id,
                Name: record.Name,
                Email: record.Email,
                Phone: record.Phone,
                Title: record.Title,
                AccountName: record.Account?.Name
            }));
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
