/* ============================================================
   MODULE 4 CONTENT — Lightning Web Components (15 Lessons)
   ============================================================ */

export const module4Content = {
  '4.1': {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p><strong>Lightning Web Components (LWC)</strong> is Salesforce's modern UI framework for building web components. Unlike its predecessor Aura, LWC is built on <strong>native Web Components standards</strong> — Custom Elements, Shadow DOM, HTML Templates — making it faster, lighter, and aligned with modern web development.</p>
      </div>
      <h3>LWC vs Aura</h3>
      <table>
        <thead><tr><th>Feature</th><th>Aura</th><th>LWC</th></tr></thead>
        <tbody>
          <tr><td>Architecture</td><td>Salesforce proprietary framework</td><td>W3C Web Components standard</td></tr>
          <tr><td>Performance</td><td>Heavier, custom rendering</td><td>Lighter, native browser APIs</td></tr>
          <tr><td>Learning curve</td><td>Unique syntax to learn</td><td>Standard JavaScript + HTML</td></tr>
          <tr><td>CSS isolation</td><td>Manual</td><td>Shadow DOM (automatic)</td></tr>
          <tr><td>Direction</td><td>Maintenance mode</td><td>Active development</td></tr>
        </tbody>
      </table>
      <h3>Web Components Standards</h3>
      <ul>
        <li><strong>Custom Elements</strong> — Define new HTML tags (e.g., &lt;c-my-component&gt;)</li>
        <li><strong>Shadow DOM</strong> — Encapsulates component internals, preventing CSS/JS leakage</li>
        <li><strong>HTML Templates</strong> — Declarative UI definition with dynamic bindings</li>
      </ul>
      <div class="callout callout--tip">
        <p class="callout__title">💡 Key Insight</p>
        <p>LWC components are <strong>true web components</strong>. The skills you learn here transfer to any modern web development. If you know JavaScript ES6+, you already know 80% of LWC.</p>
      </div>
    `,
    examples: [
      { title: 'Example 1: Component Structure', description: 'The anatomy of an LWC component bundle.', code: `myComponent/
├── myComponent.html        ← Template (UI structure)
├── myComponent.js          ← Controller (logic)
├── myComponent.css         ← Styles (scoped to component)
└── myComponent.js-meta.xml ← Config (where it can be used)

// myComponent.html
<template>
    <div class="container">
        <h1>{greeting}</h1>
        <lightning-button 
            label="Say Hello" 
            onclick={handleClick}>
        </lightning-button>
    </div>
</template>

// myComponent.js
import { LightningElement } from 'lwc';

export default class MyComponent extends LightningElement {
    greeting = 'Hello, World!';
    
    handleClick() {
        this.greeting = 'Hello, Salesforce!';
    }
}

// myComponent.js-meta.xml
<?xml version="1.0" encoding="UTF-8"?>
<LightningComponentBundle xmlns="http://soap.sforce.com/2006/04/metadata">
    <apiVersion>59.0</apiVersion>
    <isExposed>true</isExposed>
    <targets>
        <target>lightning__AppPage</target>
        <target>lightning__RecordPage</target>
        <target>lightning__HomePage</target>
    </targets>
</LightningComponentBundle>`, language: 'javascript', explanation: 'Every LWC has 4 files. The HTML template uses {expression} for data binding. The JS extends LightningElement. The meta XML defines where the component can be placed.' },
      { title: 'Example 2: Reactive Properties', description: 'How LWC tracks and re-renders when data changes.', code: `import { LightningElement } from 'lwc';

export default class Counter extends LightningElement {
    // Reactive by default (since Spring '20)
    count = 0;
    
    // Computed property (getter)
    get isPositive() {
        return this.count > 0;
    }
    
    get counterClass() {
        return this.count >= 0 ? 'counter positive' : 'counter negative';
    }
    
    handleIncrement() {
        this.count++;
        // Component automatically re-renders!
    }
    
    handleDecrement() {
        this.count--;
    }
    
    handleReset() {
        this.count = 0;
    }
}`, language: 'javascript', explanation: 'In modern LWC, all fields are reactive. When count changes, any getters depending on it (isPositive, counterClass) re-evaluate, and the template updates automatically.' }
    ],
    practice: {
      intro: 'Get familiar with LWC structure.',
      steps: [
        'Open the Component Library (developer.salesforce.com/docs/component-library).',
        'Explore the Base Components (like lightning-button, lightning-card).',
        'Review the HTML, JS, and Meta XML structure of an example component.',
        'Create a simple mental map mapping standard HTML elements to their lightning-* equivalents.'
      ],
      expectedOutcome: 'You should understand the basic files that make up a component and how they relate to each other.'
    },
    interviewQuestions: [
      { scenario: 'What is Shadow DOM and why does LWC use it?', answer: 'Shadow DOM is a web standard that encapsulates a component\'s internal DOM structure and CSS. LWC uses it so that CSS styles defined in a component do not leak out and affect other parts of the page, and external CSS does not inadvertently break the component\'s styling. It ensures components are truly modular and isolated.' },
      { scenario: 'How is LWC different from Aura?', answer: 'Aura is a proprietary Salesforce framework built before modern web standards existed. LWC is built on native W3C web standards (Custom Elements, Shadow DOM). As a result, LWC is much faster (using native browser APIs rather than custom framework logic), lighter, easier to learn for standard web developers, and provides better encapsulation.' },
      { scenario: 'What is the purpose of the .js-meta.xml file?', answer: 'The metadata configuration file tells Salesforce how and where the component can be used. It defines the API version, whether the component is exposed to the App Builder (<isExposed>), which pages it can be placed on (<targets>), and any design properties (attributes) the admin can configure when dragging the component onto a page.' }
    ]
  },

  '4.2': {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p>To build LWC, you need a local development environment. You cannot create LWC directly in the Salesforce Developer Console. The standard toolchain is <strong>Visual Studio Code</strong> with the <strong>Salesforce Extension Pack</strong>, and the <strong>Salesforce CLI (sf)</strong>.</p>
      </div>
      <h3>Required Tools</h3>
      <ul>
        <li><strong>Salesforce CLI (sf):</strong> Command-line tool for interacting with orgs, deploying code, and managing projects.</li>
        <li><strong>Visual Studio Code:</strong> The officially supported IDE for Salesforce development.</li>
        <li><strong>Salesforce Extension Pack:</strong> Provides syntax highlighting, code completion, and point-and-click deployment from VS Code.</li>
      </ul>
    `,
    examples: [
      { title: 'Example 1: Setup Commands', description: 'Commands to set up your project.', code: `# 1. Install Salesforce CLI (sf)
# Verify installation:
sf version

# 2. Authenticate to your Developer Edition (or Trailhead Playground)
# This opens a browser window for you to log in
sf org login web --set-default --alias myDevOrg

# 3. Create a new Salesforce DX Project
# (You usually do this via the VS Code Command Palette: SFDX: Create Project)
sf project generate --name myLwcProject

# 4. Create an LWC component
sf lightning generate component --name myFirstLwc --output-dir force-app/main/default/lwc

# 5. Deploy to your org
sf project deploy start --source-dir force-app/main/default/lwc/myFirstLwc`, language: 'bash', explanation: 'The CLI handles authentication and deployment. The --set-default flag ensures subsequent commands use this org automatically.' }
    ],
    practice: {
      intro: 'Set up your local dev environment.',
      steps: [
        'Install VS Code and the Salesforce Extension Pack.',
        'Install the Salesforce CLI.',
        'Open VS Code, press Ctrl+Shift+P (or Cmd+Shift+P), and run "SFDX: Create Project".',
        'Run "SFDX: Authorize an Org" and log into your Developer Edition.',
        'Create a new LWC component via the Command Palette.',
        'Deploy it to your org.'
      ],
      expectedOutcome: 'You have a working local environment and can push code to Salesforce.'
    },
    interviewQuestions: [
      { scenario: 'Can you write LWC in the Developer Console?', answer: 'No. The Developer Console does not support creating or editing Lightning Web Components. You must use a local IDE (like VS Code) with the Salesforce CLI, or a web-based IDE like Code Builder.' }
    ]
  },

  '4.3': {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p>An <strong>LWC Project Structure</strong> (SFDX Project) organizes your metadata and code for deployment. The core folder is <code>force-app/main/default/</code>, which contains subfolders for <code>lwc</code>, <code>classes</code>, <code>triggers</code>, etc.</p>
      </div>
      <h3>Component Bundle Files</h3>
      <p>Inside the <code>lwc</code> folder, each component has its own folder containing:</p>
      <ul>
        <li><code>[name].html</code> (Optional but typical) - The UI template.</li>
        <li><code>[name].js</code> (Required) - The JavaScript controller class.</li>
        <li><code>[name].js-meta.xml</code> (Required) - Configuration for App Builder and targets.</li>
        <li><code>[name].css</code> (Optional) - Scoped styles.</li>
        <li><code>[name].svg</code> (Optional) - Custom icon for the App Builder.</li>
      </ul>
    `,
    examples: [
      { title: 'Example: SFDX Project Layout', description: 'How files are organized.', code: `myProject/
├── sfdx-project.json     // Project configuration and package directories
├── package.json          // Node.js dependencies (Linting, Jest testing)
└── force-app/
    └── main/
        └── default/
            ├── classes/  // Apex Classes
            ├── lwc/      // Lightning Web Components
            │   ├── contactCard/
            │   │   ├── contactCard.html
            │   │   ├── contactCard.js
            │   │   ├── contactCard.js-meta.xml
            │   │   └── contactCard.css
            │   └── headerLayout/
            └── objects/  // Custom Objects`, language: 'bash', explanation: 'All files for a single component are grouped in a folder matching the component name.' }
    ],
    practice: {
      intro: 'Explore the project structure.',
      steps: [
        'Examine sfdx-project.json to understand how package directories are defined.',
        'Look at the structure inside force-app/main/default.',
        'Create an LWC and observe how the folder and files are named identically except for the extension.'
      ],
      expectedOutcome: 'You understand where to place different types of metadata in an SFDX project.'
    },
    interviewQuestions: [
      { scenario: 'What is the naming convention for LWC folders and files?', answer: 'The folder and files must match exactly and use camelCase (e.g., myComponent). When referencing this component in HTML (either in another LWC or an Aura component), the camelCase is converted to kebab-case with the namespace prepended (e.g., <c-my-component>).' }
    ]
  },

  '4.4': {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p><strong>LWC HTML Templates</strong> define the UI of your component. They use a standard <code>&lt;template&gt;</code> tag and allow you to seamlessly bind JavaScript properties to HTML elements using curly braces <code>{property}</code>.</p>
      </div>
      <h3>Data Binding</h3>
      <p>Data binding in LWC is <strong>one-way</strong> (from JS to HTML). When the JS property changes, the HTML automatically re-renders. To update JS from HTML, you must use event listeners (like <code>onchange</code>).</p>
    `,
    examples: [
      { title: 'Example 1: Basic Binding', description: 'Binding properties to text and attributes.', code: `// dataBinding.js
import { LightningElement } from 'lwc';

export default class DataBinding extends LightningElement {
    greeting = 'Hello, Developer!';
    imgUrl = 'logo.png';
    isDisabled = true;
}

<!-- dataBinding.html -->
<template>
    <p>{greeting}</p>
    <img src={imgUrl} />
    <button disabled={isDisabled}>Submit</button>
</template>`, language: 'javascript', explanation: 'Text and attributes use curly braces for binding. Boolean attributes (like disabled) are added if true and removed if false.' }
    ],
    practice: {
      intro: 'Practice LWC data binding.',
      steps: [
        'Create a component with title and image URL properties.',
        'Bind them in the HTML.',
        'Add an input field that updates a property using onchange.'
      ],
      expectedOutcome: 'You understand one-way binding and how to capture input.'
    },
    interviewQuestions: [
      { scenario: 'Why doesn\'t LWC allow expressions like {count + 1} in HTML?', answer: 'LWC enforces strict separation of concerns. Logic belongs in the JavaScript controller (using getters), not the template. This makes code easier to test and maintain.' }
    ]
  },

  '4.5': {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p>LWC uses three primary <strong>decorators</strong>: <strong>@api</strong> (public properties/methods), <strong>@track</strong> (deep reactivity), and <strong>@wire</strong> (fetching Salesforce data).</p>
      </div>
      <p>Since Spring '20, all primitive properties are reactive by default. @track is only needed for observing deep mutations in complex objects or arrays.</p>
    `,
    examples: [
      { title: 'Example 1: @api', description: 'Exposing properties to parents.', code: `import { LightningElement, api } from 'lwc';
export default class Child extends LightningElement {
    @api recordId; // Can be set by parent: <c-child record-id="123"></c-child>
    @api refresh() { /* Callable by parent */ }
}`, language: 'javascript', explanation: '@api makes a property public. The parent component passes data via kebab-case attributes.' }
    ],
    practice: {
      intro: 'Use decorators.',
      steps: [
        'Create a parent and child component.',
        'Pass data to the child using an @api property.',
        'Call a child\'s @api method from the parent.'
      ],
      expectedOutcome: 'You can use @api for downward communication.'
    },
    interviewQuestions: [
      { scenario: 'Can a child component modify its own @api property?', answer: 'No, @api properties are read-only in the child. Modifying them throws an error, enforcing one-way data flow.' }
    ]
  },

  '4.6': {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p><strong>CSS Styling in LWC</strong> relies heavily on the Salesforce Lightning Design System (SLDS). You can also write custom CSS which is scoped to the component via Shadow DOM.</p>
      </div>
      <h3>Styling Approaches</h3>
      <ul>
        <li><strong>SLDS Classes:</strong> Use standard utility classes (e.g., <code>slds-m-around_medium</code>) for consistent spacing, colors, and typography.</li>
        <li><strong>Custom CSS:</strong> Write rules in the <code>.css</code> file. Shadow DOM ensures they don't affect other components.</li>
        <li><strong>CSS Variables (Custom Properties):</strong> Use SLDS styling hooks to thematically override standard component styles.</li>
      </ul>
    `,
    examples: [
      { title: 'Example 1: SLDS and Custom CSS', description: 'Combining SLDS utilities with scoped CSS.', code: `<!-- styling.html -->
<template>
    <div class="slds-box slds-theme_default custom-container">
        <h1 class="slds-text-heading_large slds-text-color_success">Success!</h1>
        <lightning-button label="Click Me" class="my-button"></lightning-button>
    </div>
</template>

/* styling.css */
.custom-container {
    border: 2px solid #4CAF50; /* Scoped only to this component */
}

/* Using CSS Variables to override standard base components (Styling Hooks) */
.my-button {
    --sds-c-button-brand-color-background: #FF5722;
    --sds-c-button-brand-color-background-hover: #E64A19;
}`, language: 'css', explanation: 'SLDS provides layout and typography. Custom CSS handles specific exceptions. Styling hooks allow you to safely customize base components like lightning-button.' }
    ],
    practice: {
      intro: 'Style components.',
      steps: [
        'Build a component using only SLDS classes for margins and padding.',
        'Add a .css file and write a rule for a specific class.',
        'Verify the CSS doesn\'t leak out to the parent page.'
      ],
      expectedOutcome: 'You know how to apply SLDS and understand Shadow DOM CSS scoping.'
    },
    interviewQuestions: [
      { scenario: 'How do you override the styles of a standard lightning-button?', answer: 'Because of Shadow DOM, you cannot directly target the internal elements of a base component using CSS selectors. Instead, you must use SLDS Styling Hooks (CSS Custom Properties/Variables) exposed by Salesforce, e.g., setting --sds-c-button-text-color in your CSS.' }
    ]
  },

  '4.7': {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p><strong>Conditional Rendering</strong> controls what HTML is generated based on JS property values using <code>lwc:if</code>, <code>lwc:elseif</code>, and <code>lwc:else</code>.</p>
      </div>
    `,
    examples: [
      { title: 'Example: Conditional Directives', description: 'Showing states.', code: `<template>
    <template lwc:if={isLoading}>
        <lightning-spinner></lightning-spinner>
    </template>
    <template lwc:elseif={hasError}>
        <p>Error loading data.</p>
    </template>
    <template lwc:else>
        <p>Data loaded successfully!</p>
    </template>
</template>`, language: 'markup', explanation: 'lwc:if is the modern, performant way to render conditionally. It completely removes hidden elements from the DOM.' }
    ],
    practice: { intro: 'Practice conditions.', steps: ['Create a component that toggles text based on a checkbox.'], expectedOutcome: 'You can use lwc:if.' },
    interviewQuestions: [{ scenario: 'What replaced if:true?', answer: 'lwc:if, lwc:elseif, and lwc:else replaced if:true and if:false, offering better performance and simpler logic chains.' }]
  },

  '4.8': {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p><strong>List Rendering</strong> is achieved using <code>for:each</code> or <code>iterator</code> to loop over arrays. A unique <code>key</code> is strictly required.</p>
      </div>
    `,
    examples: [
      { title: 'Example: for:each', description: 'Iterating arrays.', code: `<template>
    <ul>
        <template for:each={contacts} for:item="contact">
            <li key={contact.Id}>{contact.Name}</li>
        </template>
    </ul>
</template>`, language: 'markup', explanation: 'The key attribute helps the virtual DOM efficiently track changes without full re-renders.' }
    ],
    practice: { intro: 'Render lists.', steps: ['Render a list of hardcoded objects.'], expectedOutcome: 'You can render arrays.' },
    interviewQuestions: [{ scenario: 'Why is the key attribute required?', answer: 'It allows the framework\'s virtual DOM to efficiently update, move, or delete specific items without re-rendering the whole list.' }]
  },

  '4.9': {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p><strong>Event Handling</strong> uses standard DOM events. Children dispatch <code>CustomEvent</code>s upward to parents.</p>
      </div>
    `,
    examples: [
      { title: 'Example: Custom Events', description: 'Child to parent.', code: `// Child.js
selectItem() {
    this.dispatchEvent(new CustomEvent('itemselect', { detail: { id: 1 } }));
}

<!-- Parent.html -->
<c-child onitemselect={handleSelect}></c-child>`, language: 'javascript', explanation: 'Events must be lowercase. Detail carries the payload.' }
    ],
    practice: { intro: 'Dispatch events.', steps: ['Child component button click sends data to Parent.'], expectedOutcome: 'Child to parent comms.' },
    interviewQuestions: [{ scenario: 'How do you pass data from child to parent?', answer: 'Dispatch a CustomEvent and put the data inside the detail property.' }]
  },

  '4.10': {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p>The <strong>Wire Service (@wire)</strong> provisions reactive data (from Apex or Lightning Data Service) automatically. Apex methods must use <code>@AuraEnabled(cacheable=true)</code>.</p>
      </div>
    `,
    examples: [
      { title: 'Example: Wiring Apex', description: 'Reactive parameters.', code: `import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/MyCtrl.getAccounts';

export default class WireExample extends LightningElement {
    searchKey = 'Acme';

    @wire(getAccounts, { name: '$searchKey' })
    accounts; // Result in this.accounts.data / .error
}`, language: 'javascript', explanation: 'The $ prefix makes searchKey reactive. If searchKey changes, the wire auto-runs.' }
    ],
    practice: { intro: 'Use @wire.', steps: ['Wire an Apex method to a property and display.'], expectedOutcome: 'You can fetch data reactively.' },
    interviewQuestions: [{ scenario: 'What does the $ prefix mean?', answer: 'It makes the parameter reactive so the wire re-runs when the property changes.' }]
  },

  '4.11': {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p><strong>Imperative Apex</strong> is calling Apex methods directly (as Promises) rather than using @wire. Use this for actions (like saving) or when controlling the exact timing of the call.</p>
      </div>
    `,
    examples: [
      { title: 'Example: Imperative Apex', description: 'Calling on click.', code: `import updateRecord from '@salesforce/apex/MyCtrl.updateRecord';

async handleSave() {
    try {
        const result = await updateRecord({ id: this.recordId });
        console.log('Success!', result);
    } catch (error) {
        console.error('Failed', error);
    }
}`, language: 'javascript', explanation: 'Use async/await for cleaner Promise syntax. Cacheable=true is not required for imperative calls.' }
    ],
    practice: { intro: 'Call Apex.', steps: ['Call Apex on button click.'], expectedOutcome: 'You can execute DML via imperative calls.' },
    interviewQuestions: [{ scenario: 'When to use Imperative vs Wire?', answer: 'Use Imperative when you need to control when the call happens (button click) or if the Apex method does DML (not cacheable).' }]
  },

  '4.12': {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p><strong>NavigationMixin</strong> handles routing without hardcoded URLs. <strong>Lightning Message Service (LMS)</strong> handles cross-DOM (unrelated component) communication.</p>
      </div>
    `,
    examples: [
      { title: 'Example: Navigation', description: 'Navigate to record.', code: `import { NavigationMixin } from 'lightning/navigation';
export default class Nav extends NavigationMixin(LightningElement) {
    goToRecord() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: { recordId: '001xxx', actionName: 'view' }
        });
    }
}`, language: 'javascript', explanation: 'Uses PageReferences instead of raw URLs.' }
    ],
    practice: { intro: 'Navigate.', steps: ['Add a button that navigates to an Account.'], expectedOutcome: 'You can route users.' },
    interviewQuestions: [{ scenario: 'Why use NavigationMixin?', answer: 'It dynamically resolves the correct URL based on context (Mobile, Classic, Lightning) preventing broken links.' }]
  },

  '4.13': {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p><strong>Forms & Validation</strong> involve using <code>lightning-input</code> and displaying custom error messages using the <code>setCustomValidity()</code> API.</p>
      </div>
    `,
    examples: [
      { title: 'Example: Custom Validation', description: 'Validating inputs.', code: `validateInput() {
    const input = this.template.querySelector('lightning-input');
    if (input.value === 'bad') {
        input.setCustomValidity('This value is not allowed');
    } else {
        input.setCustomValidity(''); // Clear error
    }
    input.reportValidity(); // Show error on UI
}`, language: 'javascript', explanation: 'setCustomValidity sets the message, reportValidity displays it.' }
    ],
    practice: { intro: 'Validate forms.', steps: ['Create a form and validate it before submission.'], expectedOutcome: 'You can control field validation.' },
    interviewQuestions: [{ scenario: 'How do you display a custom error on a standard input?', answer: 'Call setCustomValidity(msg) followed by reportValidity().' }]
  },

  '4.14': {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p><strong>Lightning Data Table</strong> (<code>lightning-datatable</code>) provides a robust grid for displaying tabular data, complete with sorting, inline editing, and row selection.</p>
      </div>
    `,
    examples: [
      { title: 'Example: Datatable', description: 'Basic setup.', code: `const COLUMNS = [
    { label: 'Name', fieldName: 'Name', type: 'text' },
    { label: 'Amount', fieldName: 'Amount', type: 'currency', editable: true }
];

<!-- HTML -->
<lightning-datatable
    key-field="Id"
    data={data}
    columns={columns}
    onsave={handleSave}>
</lightning-datatable>`, language: 'javascript', explanation: 'Requires data, columns array, and a key-field.' }
    ],
    practice: { intro: 'Build a table.', steps: ['Display a list of accounts in a datatable.'], expectedOutcome: 'You can configure complex data grids.' },
    interviewQuestions: [{ scenario: 'What is required by lightning-datatable?', answer: 'It strictly requires a key-field (like Id), data, and columns definitions.' }]
  },

  '4.15': {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p><strong>Deploying LWC</strong> involves using the Salesforce CLI (<code>sf project deploy start</code>) to push the local component files into a target Salesforce org.</p>
      </div>
    `,
    examples: [
      { title: 'Example: Deployment Commands', description: 'CLI Deployment.', code: `# Deploy specific source path
sf project deploy start --source-dir force-app/main/default/lwc/myComponent

# Deploy entire project
sf project deploy start

# Retrieve from org
sf project retrieve start --source-dir force-app/main/default/lwc/myComponent`, language: 'bash', explanation: 'Deploy pushes local changes, retrieve pulls org changes.' }
    ],
    practice: { intro: 'Deploy code.', steps: ['Deploy your components and verify them in the org.'], expectedOutcome: 'You can manage code lifecycles.' },
    interviewQuestions: [{ scenario: 'What happens if the metadata XML target is missing?', answer: 'The component will deploy successfully, but it won\'t be visible in the Lightning App Builder to drag onto a page.' }]
  }
};
