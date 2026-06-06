import { createElement } from 'lwc';
import ContactDatatable from 'c/contactDatatable';
import { getListUi } from 'lightning/uiListApi';
import { registerLdsTestWireAdapter } from '@salesforce/wire-service-jest-util';

const getListUiAdapter = registerLdsTestWireAdapter(getListUi);

const MOCK_CONTACTS = {
    records: {
        records: [
            {
                id: '0031000001',
                fields: {
                    Name: { value: 'John Doe' },
                    Email: { value: 'john@example.com' },
                    Phone: { value: '555-1234' },
                    Title: { value: 'Engineer' },
                    Account: { value: { fields: { Name: { value: 'Acme Corp' } } } }
                }
            },
            {
                id: '0031000002',
                fields: {
                    Name: { value: 'Jane Smith' },
                    Email: { value: 'jane@example.com' },
                    Phone: { value: '555-5678' },
                    Title: { value: 'Manager' },
                    Account: { value: null }
                }
            }
        ]
    }
};

describe('c-contact-datatable', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('renders the lightning-card with title Contacts', () => {
        const element = createElement('c-contact-datatable', { is: ContactDatatable });
        document.body.appendChild(element);

        const card = element.shadowRoot.querySelector('lightning-card');
        expect(card).not.toBeNull();
        expect(card.title).toBe('Contacts');
    });

    it('shows spinner while data is loading', () => {
        const element = createElement('c-contact-datatable', { is: ContactDatatable });
        document.body.appendChild(element);

        const spinner = element.shadowRoot.querySelector('lightning-spinner');
        expect(spinner).not.toBeNull();
    });

    it('renders datatable with contacts when wire returns data', async () => {
        const element = createElement('c-contact-datatable', { is: ContactDatatable });
        document.body.appendChild(element);

        getListUiAdapter.emit(MOCK_CONTACTS);
        await Promise.resolve();

        const datatable = element.shadowRoot.querySelector('lightning-datatable');
        expect(datatable).not.toBeNull();
        expect(datatable.data).toHaveLength(2);
        expect(datatable.data[0].Name).toBe('John Doe');
        expect(datatable.data[1].Name).toBe('Jane Smith');
    });

    it('maps contact fields correctly including nested Account name', async () => {
        const element = createElement('c-contact-datatable', { is: ContactDatatable });
        document.body.appendChild(element);

        getListUiAdapter.emit(MOCK_CONTACTS);
        await Promise.resolve();

        const datatable = element.shadowRoot.querySelector('lightning-datatable');
        const first = datatable.data[0];
        expect(first.Email).toBe('john@example.com');
        expect(first.Phone).toBe('555-1234');
        expect(first.Title).toBe('Engineer');
        expect(first.AccountName).toBe('Acme Corp');
    });

    it('handles null Account gracefully', async () => {
        const element = createElement('c-contact-datatable', { is: ContactDatatable });
        document.body.appendChild(element);

        getListUiAdapter.emit(MOCK_CONTACTS);
        await Promise.resolve();

        const datatable = element.shadowRoot.querySelector('lightning-datatable');
        expect(datatable.data[1].AccountName).toBeUndefined();
    });

    it('shows error message when wire returns an error', async () => {
        const element = createElement('c-contact-datatable', { is: ContactDatatable });
        document.body.appendChild(element);

        getListUiAdapter.error({ body: { message: 'Server error' } });
        await Promise.resolve();

        const error = element.shadowRoot.querySelector('p.slds-text-color_error');
        expect(error).not.toBeNull();
        expect(error.textContent).toBe('Server error');
        const datatable = element.shadowRoot.querySelector('lightning-datatable');
        expect(datatable).toBeNull();
    });

    it('hides spinner once data is loaded', async () => {
        const element = createElement('c-contact-datatable', { is: ContactDatatable });
        document.body.appendChild(element);

        getListUiAdapter.emit(MOCK_CONTACTS);
        await Promise.resolve();

        const spinner = element.shadowRoot.querySelector('lightning-spinner');
        expect(spinner).toBeNull();
    });
});
