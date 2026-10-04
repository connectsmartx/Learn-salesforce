export const m4Part3 = {
  "4.11": {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 4.11 Imperative Apex</p>
        <p>While <code>@wire</code> is reactive and declarative, <strong>Imperative Apex</strong> allows you to call the server exactly when you want to (e.g., upon a button click). Imperative Apex must be used for DML operations.</p>
      </div>
      <h3>When to use Imperative over Wire</h3>
      <p>The <code>@wire</code> service requires Apex methods to be marked as <code>cacheable=true</code>. Salesforce strictly forbids DML operations (Insert, Update, Delete) inside cacheable methods. Therefore, if you need to modify database state, you <strong>must</strong> use an Imperative Apex call.</p>
      <h3>Promises and Async/Await</h3>
      <p>Imperative Apex calls return standard JavaScript Promises. While you can use traditional <code>.then()</code> and <code>.catch()</code> chains, modern LWC development heavily favors the <code>async / await</code> syntax. Async/Await allows you to write asynchronous server-call logic that reads linearly like synchronous code, eliminating complex nested callbacks ("callback hell").</p>
      <h3>The Finally Block</h3>
      <p>When making server calls, you usually show a loading spinner. The spinner must be hidden when the call finishes, regardless of whether it succeeded or threw an error. The <code>finally</code> block is the architectural best practice for executing this cleanup logic.</p>
    `,
    examples: [
      {
        title: 'Traditional Promise Chain',
        description: 'Standard imperative call handling success and error.',
        language: 'javascript',
        code: `import updateAccount from '@salesforce/apex/AccountController.updateAccount';

export default class ImperativeDemo extends LightningElement {
    handleSave() {
        // Apex method parameter names must match exactly
        updateAccount({ accountId: this.recordId, newName: 'Acme' })
            .then(result => {
                console.log('Success!', result);
            })
            .catch(error => {
                console.error('Failed!', error);
            });
    }
}`,
        explanation: 'This works, but can become deeply nested and hard to read if you need to make sequential server calls.'
      },
      {
        title: 'Modern Async/Await Syntax',
        description: 'Writing clean, linear asynchronous code.',
        language: 'javascript',
        code: `import updateAccount from '@salesforce/apex/AccountController.updateAccount';

export default class AsyncDemo extends LightningElement {
    
    // The function must be marked as 'async'
    async handleSave() {
        try {
            // Execution pauses here until the server responds
            const result = await updateAccount({ accountId: this.recordId, newName: 'Acme' });
            console.log('Success!', result);
            
            // You can easily make sequential calls
            // const secondResult = await doSomethingElse(result.Id);
            
        } catch (error) {
            console.error('Failed!', error);
        }
    }
}`,
        explanation: 'Await unwraps the Promise. If the Promise rejects, it throws an exception that is caught by the catch block.'
      },
      {
        title: 'Spinner Management with Finally',
        description: 'Ensuring the UI state resets correctly.',
        language: 'javascript',
        code: `async processPayment() {
    this.isLoading = true; // Show <lightning-spinner> in UI
    
    try {
        await chargeCreditCard();
        this.showToast('Success', 'Payment processed');
    } catch (error) {
        this.showToast('Error', error.body.message);
    } finally {
        // THIS ALWAYS RUNS, EVEN IF THE SERVER CRASHES
        this.isLoading = false; 
    }
}`,
        explanation: 'If you put isLoading = false inside the try block, and the server throws an error, the code jumps to the catch block, skipping the reset, leaving the spinner on the screen forever.'
      }
    ],
            practice: {
      intro: 'Imperative Apex: Executing DML from LWC.',
      steps: [
        'Create an Apex class "ContactManager" with a method:\n@AuraEnabled\npublic static Id createContact(String lastName) {\n    Contact c = new Contact(LastName=lastName);\n    insert c;\n    return c.Id;\n}',
        'Note that (cacheable=true) is MISSING because we are performing DML (Insert).',
        'Create an LWC named "imperativeForm".',
        'In HTML, add an input for Last Name and a "Create Contact" button.',
        'In JS, import the method:\nimport createContact from "@salesforce/apex/ContactManager.createContact";',
        'Write an async handler for the button click:\nasync handleCreate() {\n    try {\n        const recordId = await createContact({ lastName: this.inputValue });\n        console.log("Success! ID: " + recordId);\n    } catch (error) {\n        console.error("Error", error.body.message);\n    }\n}',
        'Deploy, place on a page, enter a name, and click Create. Check the console for the new ID, and verify in Salesforce that the record exists.'
      ],
      expectedOutcome: 'Understanding how to call Apex imperatively using Promises/async-await when DML prevents the use of @wire.'
    },
    interviewQuestions: [
      { scenario: 'Why must you use Imperative Apex instead of `@wire` to perform DML operations (insert, update, delete)?', answer: 'The `@wire` service requires the Apex method to be annotated with `@AuraEnabled(cacheable=true)`. Salesforce strictly prohibits executing DML statements inside cacheable methods. Because DML mutates database state, you must use an uncached Imperative Apex call.' },
      { scenario: 'What is the main architectural benefit of using `async`/`await` over `.then().catch()`?', answer: '`async`/`await` eliminates "callback hell". It allows you to write asynchronous code that executes and reads linearly, just like synchronous code. This makes complex sequential server calls drastically easier to read, reason about, and maintain.' },
      { scenario: 'Why is the `finally` block considered best practice when managing loading spinners?', answer: 'The `finally` block is guaranteed to execute regardless of whether the `try` block succeeded or the `catch` block caught an error. If you put `isLoading = false` inside the `try` block, and the server throws an error, execution skips to the `catch` block, and the spinner will be stuck on the screen forever. `finally` guarantees cleanup.' },
      { scenario: 'Can you call an `@AuraEnabled(cacheable=true)` method imperatively?', answer: 'Yes. While cacheable methods are typically used with `@wire`, they can also be called imperatively. This is useful when you want to leverage the LDS cache but only want to fetch the data when a specific event occurs (like a button click), rather than automatically on load.' },
      { scenario: 'If an Imperative Apex method throws a custom `AuraHandledException`, how do you extract the message in LWC?', answer: 'In the LWC `catch(error)` block, the message string is typically found deeply nested in the error object. You extract it using `error.body.message`.' }
    ]
  },
  "4.12": {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 4.12 Navigation & LMS</p>
        <p>This section covers routing users around the Salesforce ecosystem (NavigationMixin) and facilitating Pub/Sub communication across decoupled components (Lightning Message Service).</p>
      </div>
      <h3>NavigationMixin: Context-Aware Routing</h3>
      <p>Never hardcode URLs (like <code>window.location.href = '/lightning/r/Account/' + id</code>) in Salesforce. Hardcoded URLs break horribly because LWC components run in many contexts: Desktop Lightning, the Salesforce Mobile App, Console Apps, and Experience Cloud communities—each of which uses entirely different URL structures. <code>NavigationMixin</code> abstractly generates the correct URL format for the current execution context.</p>
      <h3>Lightning Message Service (LMS)</h3>
      <p>LMS is a standard Publish/Subscribe API that allows completely unrelated components (siblings, cousins, or components in different regions of the page) to communicate. Unlike older custom pub/sub scripts, LMS is built into the platform and works across LWC, Aura Components, and Visualforce pages.</p>
      <h3>The Message Context</h3>
      <p>To use LMS in LWC, you must import the <code>MessageContext</code>. This context ties the LMS message to the current Lightning Application\'s runtime scope, ensuring that your messages don\'t accidentally bleed into a different Lightning App running in another tab.</p>
    `,
    examples: [
      {
        title: 'Navigating to a Record',
        description: 'Using NavigationMixin to safely route the user.',
        language: 'javascript',
        code: `import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

// You MUST wrap the base class in NavigationMixin
export default class NavDemo extends NavigationMixin(LightningElement) {
    
    goToAccount() {
        // Navigate uses a PageReference object
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: '001xx000003Dxxx',
                objectApiName: 'Account',
                actionName: 'view' // or 'edit'
            }
        });
    }
}`,
        explanation: 'If this runs on a phone, it opens the native mobile record view. If on desktop, it opens the Lightning UI tab.'
      },
      {
        title: 'Publishing an LMS Message',
        description: 'Broadcasting an event across the entire Lightning Page.',
        language: 'javascript',
        code: `import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import SAMPLE_CHANNEL from '@salesforce/messageChannel/SampleMessageChannel__c';

export default class Publisher extends LightningElement {
    @wire(MessageContext)
    messageContext;

    handleBroadcast() {
        const payload = { recordId: '001xxx' };
        publish(this.messageContext, SAMPLE_CHANNEL, payload);
    }
}`,
        explanation: 'You must deploy a .messageChannel-meta.xml file to define SAMPLE_CHANNEL before using it.'
      },
      {
        title: 'Subscribing and Cleaning Up',
        description: 'Listening for LMS messages and preventing memory leaks.',
        language: 'javascript',
        code: `import { LightningElement, wire } from 'lwc';
import { subscribe, unsubscribe, MessageContext } from 'lightning/messageService';
import SAMPLE_CHANNEL from '@salesforce/messageChannel/SampleMessageChannel__c';

export default class Subscriber extends LightningElement {
    @wire(MessageContext) messageContext;
    subscription = null;

    connectedCallback() {
        this.subscription = subscribe(
            this.messageContext,
            SAMPLE_CHANNEL,
            (message) => this.handleMessage(message)
        );
    }

    disconnectedCallback() {
        // PREVENT MEMORY LEAKS
        unsubscribe(this.subscription);
        this.subscription = null;
    }
}`,
        explanation: 'If you fail to unsubscribe in disconnectedCallback, the component leaves phantom listeners in memory.'
      }
    ],
            practice: {
      intro: 'Navigation: Routing users natively.',
      steps: [
        'Create an LWC named "navButton".',
        'In JS, import NavigationMixin:\nimport { NavigationMixin } from "lightning/navigation";',
        'Extend it:\nexport default class NavButton extends NavigationMixin(LightningElement) { ... }',
        'Add an @api recordId; property.',
        'Create a method handleNavigate():\nthis[NavigationMixin.Navigate]({\n    type: "standard__recordPage",\n    attributes: {\n        recordId: this.recordId,\n        objectApiName: "Account",\n        actionName: "edit"\n    }\n});',
        'In HTML, add a button labeled "Edit This Account" that calls handleNavigate.',
        'Expose the component in XML to lightning__RecordPage.',
        'Deploy, add it to an Account Record Page, click it, and watch the standard Edit modal open seamlessly.'
      ],
      expectedOutcome: 'Ability to trigger standard Salesforce navigation events (view, edit, list) programmatically from custom components.'
    },
    interviewQuestions: [
      { scenario: 'Why is it a severe anti-pattern to use `window.location.href` to navigate to a record in LWC?', answer: 'Hardcoded URLs assume a specific environment. A component using `/lightning/r/Account/...` will completely break if placed inside a Salesforce Mobile App, a Console App workspace tab, or an Experience Cloud community. `NavigationMixin` abstracts routing and automatically generates the correct URL format based on the runtime context.' },
      { scenario: 'What is a PageReference object?', answer: 'It is a standardized JSON object used by the Navigation API. It defines the `type` of page (e.g., standard object page, record page, web page), the `attributes` (like recordId), and optional `state` parameters (like URL query strings).' },
      { scenario: 'What is the primary advantage of LMS over traditional LWC Pub/Sub models?', answer: 'LMS is native to the platform and can communicate seamlessly across LWC, Aura, and Visualforce pages. The old pub/sub modules only worked between LWC components.' },
      { scenario: 'What happens if you forget to call `unsubscribe()` in the `disconnectedCallback()`?', answer: 'A memory leak occurs. The component\'s DOM is destroyed, but the subscription callback function remains in the browser memory. The next time the component is loaded, a second subscription is added. When a message is published, both the old phantom callback and the new one execute.' },
      { scenario: 'Can LMS communicate between two different browser tabs (e.g., Tab A has an Account page, Tab B has a Contact page)?', answer: 'No. LMS scope is strictly limited to a single browser tab and single Lightning context. For cross-tab communication, you would need to use native browser APIs like the Broadcast Channel API or LocalStorage events.' }
    ]
  },
  "4.13": {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 4.13 Forms & Validation</p>
        <p>LWC provides Base Form components (<code>lightning-record-edit-form</code>) built on Lightning Data Service (LDS) for CRUD, and utilizes HTML5 constraint APIs for client-side validation.</p>
      </div>
      <h3>Lightning Data Service (LDS) Forms</h3>
      <p>By using <code>lightning-record-edit-form</code>, you do not need to write an Apex controller or SOQL. The component handles fetching the record data, generating the correct HTML input types, enforcing validation rules, checking user permissions (FLS), and saving the data.</p>
      <h3>Referential Integrity via Schema Imports</h3>
      <p>When specifying fields for these forms, you should never hardcode strings (e.g., <code>"Account.CustomField__c"</code>). Instead, you import the field reference directly from <code>@salesforce/schema</code>. This prevents Admins from deleting the field and breaking your code in production.</p>
      <h3>Client-Side Validation</h3>
      <p>Before sending custom form data to the server, validate it in the browser. Base components like <code>lightning-input</code> have built-in methods like <code>checkValidity()</code>, <code>reportValidity()</code>, and <code>setCustomValidity()</code> to manage UX error states without Apex.</p>
    `,
    examples: [
      {
        title: 'Building a Zero-Apex Edit Form',
        description: 'Creating a fully functional record editor in just a few lines of HTML.',
        language: 'javascript',
        code: `<!-- HTML Template -->
<lightning-record-edit-form record-id={recordId} object-api-name={objectApiName} onsuccess={handleSuccess}>
    <lightning-messages></lightning-messages> <!-- Displays validation rule errors -->
    
    <div class="slds-grid slds-wrap">
        <div class="slds-col slds-size_1-of-2">
            <!-- Uses imported schema fields -->
            <lightning-input-field field-name={nameField}></lightning-input-field>
        </div>
    </div>
    
    <div class="slds-m-top_medium">
        <lightning-button variant="brand" type="submit" label="Save"></lightning-button>
    </div>
</lightning-record-edit-form>`,
        explanation: 'The type="submit" on the button automatically triggers the form to save via LDS.'
      },
      {
        title: 'Importing Schema Definitions',
        description: 'Enforcing database referential integrity in JavaScript.',
        language: 'javascript',
        code: `import { LightningElement, api } from 'lwc';

// IMPORT THE SCHEMA
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';

export default class EditFormDemo extends LightningElement {
    @api recordId;
    
    // Expose to HTML
    objectApiName = ACCOUNT_OBJECT;
    nameField = NAME_FIELD;

    handleSuccess(event) {
        console.log('Record updated successfully! ID: ', event.detail.id);
    }
}`,
        explanation: 'Always import objects and fields. If you use a hardcoded string and the field is deleted, your component will crash at runtime.'
      },
      {
        title: 'Checking HTML5 Validity',
        description: 'Verifying all inputs in a custom form are valid before submitting.',
        language: 'javascript',
        code: `handleSave() {
    // querySelectorAll returns a NodeList, we turn it into an Array
    const inputs = Array.from(this.template.querySelectorAll('lightning-input'));
    
    // Check if every single input passes validation (required, email format, etc)
    const isFormValid = inputs.every(input => input.checkValidity());
    
    if (isFormValid) {
        // Safe to proceed to Apex
    } else {
        // Forces the inputs to display their red error messages in the UI
        inputs.forEach(input => input.reportValidity());
    }
}`,
        explanation: 'This relies on standard HTML attributes like required="true" or type="email" defined in the template.'
      }
    ],
            practice: {
      intro: 'Data Services: Building forms without Apex.',
      steps: [
        'Create an LWC named "quickAccountEdit".',
        'In JS, add @api recordId; (to get the current record ID automatically).',
        'In HTML, construct a lightning-record-edit-form:\n<lightning-record-edit-form record-id={recordId} object-api-name="Account" onsuccess={handleSuccess}>',
        'Inside the form, add fields:\n<lightning-messages></lightning-messages>\n<lightning-input-field field-name="Name"></lightning-input-field>\n<lightning-input-field field-name="Industry"></lightning-input-field>',
        'Add a submit button at the bottom:\n<lightning-button type="submit" label="Save" variant="brand"></lightning-button>',
        'Close the form:\n</lightning-record-edit-form>',
        'In JS, implement handleSuccess:\nhandleSuccess(event) { alert("Saved! ID: " + event.detail.id); }',
        'Expose the component to lightning__RecordPage.',
        'Deploy, add it to an Account page. Edit the fields and click Save.',
        'Notice that it queries, renders, validates, and saves the data securely to Salesforce without a single line of Apex code.'
      ],
      expectedOutcome: 'Proficiency in utilizing Lightning Data Service components to radically accelerate form development.'
    },
    interviewQuestions: [
      { scenario: 'What is the primary benefit of using `lightning-record-edit-form` over writing a custom UI backed by Imperative Apex?', answer: 'The base form leverages Lightning Data Service (LDS). It requires zero Apex, automatically respects Field Level Security (FLS) by hiding fields the user cannot see, automatically handles database validation errors, and updates the shared client-side cache so other components react instantly to the changes.' },
      { scenario: 'Why is it considered a strict best practice to import field definitions using `@salesforce/schema` instead of hardcoding strings like `"Contact.Email"`?', answer: 'Importing from `@salesforce/schema` establishes strong referential integrity. When deployed, Salesforce tracks this dependency. It prevents administrators from deleting the field or object from the database because it is officially "in use" by the LWC. Hardcoded strings offer no such protection.' },
      { scenario: 'If you want to validate a field on the client-side *before* `lightning-record-edit-form` sends the data to the server, how do you do it?', answer: 'You hook into the `onsubmit` event on the form. First, you call `event.preventDefault()` to halt the automatic network request. Then you inspect `event.detail.fields`. If validation fails, you show an error. If it passes, you call `this.template.querySelector(\'lightning-record-edit-form\').submit(fields)`.' },
      { scenario: 'How do you apply a custom error message to a `lightning-input` and display it in red on the screen?', answer: 'You first call `input.setCustomValidity("Your Error Message")` to apply the internal error state. Then, you MUST call `input.reportValidity()` to force the component to re-render and display the red error text.' },
      { scenario: 'How do you clear a custom validity error once the user corrects their input?', answer: 'You call `input.setCustomValidity("")` passing an empty string. This tells the constraint API that the field is now valid. You then call `reportValidity()` to clear the red text from the UI.' }
    ]
  },
  "4.14": {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 4.14 Lightning Data Table</p>
        <p>The <code>lightning-datatable</code> is arguably the most complex and powerful base component in LWC. It renders a highly interactive grid supporting sorting, inline editing, row-level actions, and custom data types.</p>
      </div>
      <h3>The Configuration Object</h3>
      <p>Unlike standard HTML tables where you write <code>&lt;tr&gt;</code> and <code>&lt;td&gt;</code> tags, the datatable is entirely configuration-driven. You pass it a JSON array of column definitions and a JSON array of data. The component dynamically builds the UI based on those configurations.</p>
      <h3>Inline Editing</h3>
      <p>When a user edits a cell inline, the datatable highlights the cell yellow and stores the uncommitted change in a property called <code>draftValues</code>. The component does <strong>not</strong> save this data to the database automatically. You must listen for the <code>onsave</code> event, extract the <code>draftValues</code>, send them to Apex for DML operations, and then manually clear the <code>draftValues</code> array to remove the yellow highlights.</p>
      <h3>Custom Data Types</h3>
      <p>Out of the box, the datatable supports text, currency, dates, URLs, etc. But if you want to display an image, a custom LWC badge, or a complex progress bar inside a cell, you must extend the base <code>LightningDatatable</code> class in JavaScript and define custom HTML templates for those cells.</p>
    `,
    examples: [
      {
        title: 'Basic Setup with Configurations',
        description: 'Defining columns and binding data.',
        language: 'javascript',
        code: `/* JavaScript */
const COLUMNS = [
    { label: 'Name', fieldName: 'Name', type: 'text' },
    { label: 'Revenue', fieldName: 'AnnualRevenue', type: 'currency' },
    { label: 'Created', fieldName: 'CreatedDate', type: 'date' }
];

export default class GridDemo extends LightningElement {
    columns = COLUMNS;
    data = [...]; // Data fetched from Apex
}

<!-- HTML -->
<!-- key-field is strictly mandatory -->
<lightning-datatable
    key-field="Id"
    data={data}
    columns={columns}>
</lightning-datatable>`,
        explanation: 'The key-field="Id" is mandatory. Without it, the table cannot track row selections or inline edits properly.'
      },
      {
        title: 'Handling Row Actions (Dropdown Menus)',
        description: 'Adding action buttons to specific rows.',
        language: 'javascript',
        code: `/* Define the column */
const actions = [
    { label: 'View Details', name: 'view' },
    { label: 'Delete', name: 'delete' }
];
const COLUMNS = [
    { label: 'Name', fieldName: 'Name' },
    { type: 'action', typeAttributes: { rowActions: actions } }
];

/* Handle the onrowaction event */
handleRowAction(event) {
    const actionName = event.detail.action.name;
    const row = event.detail.row;

    if (actionName === 'view') {
        this.navigateToRecord(row.Id);
    } else if (actionName === 'delete') {
        this.deleteRecord(row.Id);
    }
}`,
        explanation: 'The event.detail object provides both the action that was clicked and the entire data payload for the row it was clicked on.'
      },
      {
        title: 'Processing Inline Edits',
        description: 'Extracting draft values and clearing the UI state.',
        language: 'javascript',
        code: `async handleSave(event) {
    // 1. Extract the unsaved edits
    const draftValues = event.detail.draftValues;
    
    try {
        // 2. Send to Apex for DML
        await updateRecords({ records: draftValues });
        
        // 3. Clear the yellow highlights from the UI
        this.draftValues = [];
        
        // 4. Force a wire refresh to show updated data
        refreshApex(this.wiredDataResult);
        
    } catch (error) {
        console.error('Update failed', error);
    }
}`,
        explanation: 'You must manually clear the draftValues array bound to the HTML template to reset the table\'s edit state.'
      }
    ],
            practice: {
      intro: 'Datatable: Rendering advanced, sortable grids.',
      steps: [
        'Create an LWC named "advancedGrid".',
        'In JS, define a columns array:\nconst COLUMNS = [\n    { label: "Name", fieldName: "Name", editable: true },\n    { label: "Amount", fieldName: "Amount", type: "currency", sortable: true },\n    { label: "Close Date", fieldName: "CloseDate", type: "date" }\n];',
        'Expose columns to the template:\ncolumns = COLUMNS;',
        'Create dummy data in an array called "oppData" mimicking the structure.',
        'In HTML, implement the datatable:\n<lightning-datatable key-field="Id" data={oppData} columns={columns}></lightning-datatable>',
        'Deploy and preview.',
        'Now, implement sorting. Add "onsort={handleSort}" to the HTML.',
        'In JS, write handleSort():\nhandleSort(event) {\n    const { fieldName, sortDirection } = event.detail;\n    // implement array sorting logic...\n}',
        'Deploy and test clicking the Amount column header to verify sorting UI activates.'
      ],
      expectedOutcome: 'Ability to construct complex, highly interactive data grids that match native Salesforce list views.'
    },
    interviewQuestions: [
      { scenario: 'What is the absolute most critical attribute required to render a `lightning-datatable` without breaking features?', answer: 'The `key-field` attribute is strictly mandatory. It specifies the unique identifier for the rows (usually "Id"). If omitted, advanced features like row selection, inline editing, and sorting will fail because the component cannot track the nodes.' },
      { scenario: 'How do you clear the yellow "unsaved changes" highlighting after successfully processing an inline edit?', answer: 'You must reassign the array bound to the `draft-values` attribute on the HTML tag to an empty array (e.g., `this.draftValues = []`). This clears the internal UI state of the datatable.' },
      { scenario: 'Can you render a custom LWC component (like a custom status badge or a progress bar) inside a datatable cell?', answer: 'Yes, but it requires creating a Custom Data Type. You must create a new LWC component that extends `LightningDatatable` (instead of LightningElement). You then define HTML templates for view-mode and edit-mode and register them in the JS configuration.' },
      { scenario: 'How is sorting implemented in a `lightning-datatable`?', answer: 'Sorting is not automatic. You must set `sortable: true` on the columns, and bind the `sorted-by` and `sorted-direction` attributes on the HTML tag. You then listen for the `onsort` event, extract the field and direction, and write JavaScript logic to manually sort your local `data` array.' },
      { scenario: 'If you want to restrict the user to selecting only one row at a time using checkboxes/radio buttons, how do you do it?', answer: 'You use the `max-row-selection` attribute on the `<lightning-datatable>` tag and set it to `1`. The UI will automatically convert the row selection checkboxes into radio buttons.' }
    ]
  },
  "4.15": {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 4.15 Deploying LWC</p>
        <p>Deploying Lightning Web Components involves pushing your local SFDX source code into a Salesforce Organization. This process is managed via the Salesforce CLI (<code>sf</code>) and the Metadata API.</p>
      </div>
      <h3>The Deployment Process</h3>
      <p>When you trigger a deployment, the CLI packages your component bundle (HTML, JS, CSS, Meta XML), validates it against the Salesforce cloud compiler, and pushes it to the org. If your component contains syntax errors, references invalid schema fields, or violates security policies, the deployment will fail and roll back completely.</p>
      <h3>Org Management</h3>
      <p>Modern Salesforce development utilizes multiple orgs: Scratch Orgs for feature development, Sandboxes for testing and integration, and Production for final release. The CLI allows you to easily switch between these environments using aliases.</p>
      <h3>Continuous Integration (CI/CD)</h3>
      <p>Because LWC source code is stored locally as granular files, it is perfectly suited for Git repositories. In enterprise environments, developers do not deploy directly to Production. They commit their LWC code to Git, and a CI/CD pipeline (like GitHub Actions or Jenkins) automatically runs tests and deploys the code.</p>
    `,
    examples: [
      {
        title: 'Deploying a Component via CLI',
        description: 'Pushing local changes to the default org.',
        language: 'bash',
        code: `# Deploy the specific LWC component folder
sf project deploy start --source-dir force-app/main/default/lwc/myComponent

# Or deploy the entire project
sf project deploy start`,
        explanation: 'In VS Code, you can also just right-click the component folder and select "Deploy Source to Org".'
      },
      {
        title: 'Authorizing a Target Org',
        description: 'Connecting to a specific Sandbox for deployment.',
        language: 'bash',
        code: `# Authorize a sandbox and give it an alias
sf org login web --instance-url https://test.salesforce.com --alias uatSandbox

# Deploy specifically to that sandbox
sf project deploy start --target-org uatSandbox`,
        explanation: 'Aliases prevent you from accidentally deploying unfinished code to Production.'
      },
      {
        title: 'Retrieving Changes from the Org',
        description: 'Pulling down changes made by Admins (like Meta XML updates).',
        language: 'bash',
        code: `# Retrieve the latest version of the component from the org
sf project retrieve start --source-dir force-app/main/default/lwc/myComponent`,
        explanation: 'If an Admin changes the <targets> in the Developer Console, you must retrieve those changes before deploying again, or you will overwrite them.'
      }
    ],
            practice: {
      intro: 'Deployment & CI/CD: Mastering the CLI pipeline.',
      steps: [
        'Open your terminal in VS Code.',
        'Run a command to retrieve all components from the org to ensure you are synced:\nsf project retrieve start -m LightningComponentBundle',
        'Create a dummy test class in Apex (e.g., LwcTestDummy) so we have tests to run.',
        'Simulate a production validation deployment by running:\nsf project deploy start --target-org prod --dry-run --test-level RunLocalTests',
        'Watch the terminal output. A dry run verifies that all LWC code compiles, XML configs are valid, and Apex tests pass, WITHOUT actually committing changes to the org.',
        'Review the resulting deployment report in the CLI.',
        'Finally, commit your LWC bundle into your local Git repository:\ngit add force-app/main/default/lwc/myComponent\ngit commit -m "feat: added new LWC"'
      ],
      expectedOutcome: 'Complete confidence in safely validating and deploying LWC components to production environments using modern DevOps commands.'
    },
    interviewQuestions: [
      { scenario: 'What happens if you try to deploy an LWC that imports a custom field (`@salesforce/schema/Account.MyField__c`), but that field does not exist in the target org?', answer: 'The deployment will fail completely. The Salesforce compiler strictly validates schema imports during deployment to ensure referential integrity. If the field is missing, the entire component deployment is rolled back.' },
      { scenario: 'In VS Code, how can you quickly deploy a component without typing CLI commands?', answer: 'Assuming the Salesforce Extension Pack is installed, you can right-click the component\'s folder or any file inside it (like the HTML or JS file) and select "SFDX: Deploy Source to Org".' },
      { scenario: 'What is the difference between deploying to a Sandbox vs. a Scratch Org in terms of SFDX commands?', answer: 'While `sf project deploy start` works for Sandboxes (and Production), Scratch Orgs utilize Source Tracking. For Scratch Orgs, you typically use `sf project push`, which automatically detects which files have changed locally and only pushes those diffs, making it much faster.' },
      { scenario: 'Why is it dangerous to deploy directly to Production from your local VS Code?', answer: 'Deploying locally bypasses version control, code review, and automated testing pipelines. It creates a "rogue" deployment that is not tracked in Git. Enterprise teams strictly enforce that all Production deployments happen via CI/CD pipelines reading from the main branch.' },
      { scenario: 'If you get a deployment error stating "No module named c-my-component found", what is likely the issue?', answer: 'This usually happens when a parent component references a child component in its HTML `<c-my-component>`, but the child component has not been deployed to the org yet (or the deployment failed). You must deploy the child component first before deploying the parent.' }
    ]
  }
};
