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
}`, language: 'javascript', explanation: 'In modern LWC, all class fields are reactive by default. When count changes, the template automatically re-renders. No @track needed for primitives.' },
      { title: 'Example 3: Aura vs LWC Comparison', description: 'Side-by-side comparison of the same component.', code: `// ─── AURA (Legacy) ──────────────────────
// helloAura.cmp
<aura:component>
    <aura:attribute name="greeting" type="String" default="Hello"/>
    <div>
        <p>{!v.greeting}</p>
        <lightning:button label="Click" onclick="{!c.handleClick}"/>
    </div>
</aura:component>

// helloAuraController.js
({
    handleClick: function(component, event, helper) {
        component.set("v.greeting", "Hello Salesforce!");
    }
})

// ─── LWC (Modern) ──────────────────────
// helloLwc.html
<template>
    <p>{greeting}</p>
    <lightning-button label="Click" onclick={handleClick}></lightning-button>
</template>

// helloLwc.js
import { LightningElement } from 'lwc';
export default class HelloLwc extends LightningElement {
    greeting = 'Hello';
    handleClick() {
        this.greeting = 'Hello Salesforce!';
    }
}`, language: 'javascript', explanation: 'LWC is dramatically simpler than Aura — standard JavaScript classes, direct property access, and familiar patterns. No more component.set/get or {!v.variable} syntax.' }
    ],
    practice: {
      intro: 'Set up your development environment for LWC.',
      steps: [
        'Install Visual Studio Code from code.visualstudio.com.',
        'Install the "Salesforce Extension Pack" from VS Code marketplace.',
        'Install Salesforce CLI: npm install -g @salesforce/cli (or download from developer.salesforce.com).',
        'Verify installation: run "sf version" in terminal.',
        'Create a new SFDX project: sf project generate --name lwc-practice',
        'Authorize your Dev Org: sf org login web --set-default-dev-hub',
        'Create your first component: sf lightning generate component --name helloWorld --type lwc --output-dir force-app/main/default/lwc',
        'Edit the generated files following Example 1.',
        'Deploy: sf project deploy start --target-org your-org-alias'
      ],
      expectedOutcome: 'You should have VS Code set up with Salesforce Extensions, a new SFDX project, and your first LWC component deployed to your dev org.'
    },
    interviewQuestions: [
      { scenario: 'A client asks why you recommend LWC over Aura for a new project. What\'s your answer?', answer: 'LWC advantages: 1) Better performance — leverages native browser APIs instead of a custom framework. 2) Smaller bundle size — less JavaScript shipped to the browser. 3) Standard web skills — uses ES6+ classes and HTML templates, making it easier to hire developers. 4) Active development — Salesforce is investing in LWC while Aura is in maintenance mode. 5) CSS isolation via Shadow DOM. 6) Better testing with Jest. 7) Interoperability — LWC can contain Aura components, so migration is gradual.' },
      { scenario: 'Can LWC and Aura components coexist in the same app?', answer: 'Yes, with some constraints. An Aura component can contain LWC components (just use <c:myLwcComponent/>). However, an LWC component CANNOT contain an Aura component. This means migration should go bottom-up: convert leaf components to LWC first, then work up the hierarchy. The two frameworks can communicate via Lightning Message Service (LMS) or Application Events.' },
      { scenario: 'What is Shadow DOM and why does LWC use it?', answer: 'Shadow DOM creates an isolated DOM tree inside a component. CSS styles defined in the component don\'t leak out to the page, and external styles don\'t leak in. This prevents style conflicts between components. LWC uses "synthetic" Shadow DOM by default (a polyfill for broader browser support). You can opt into native Shadow DOM for better performance. This encapsulation is key to building reusable, conflict-free components.' },
      { scenario: 'Is LWC open source?', answer: 'Yes! The LWC framework core (lwc.dev) is open source. You can use it outside Salesforce to build standard web components. However, Salesforce-specific features (@wire, lightning-* base components, NavigationMixin) only work on the Salesforce platform. This is another advantage — learning LWC gives you transferable web development skills.' },
      { scenario: 'What are the main differences in syntax between LWC and React?', answer: 'LWC uses HTML templates (not JSX), class-based components (not hooks), and {expression} binding (not JSX interpolation). LWC has decorators (@api, @wire) while React uses hooks (useState, useEffect). LWC uses native DOM events; React has synthetic events. LWC CSS is auto-scoped via Shadow DOM; React requires CSS Modules or styled-components. Both use ES6 classes, but LWC extends LightningElement while React extends Component (or uses function components).' }
    ]
  },

  '4.2': {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p>The <strong>LWC Component Lifecycle</strong> refers to the series of events that occur from when a component is created, inserted into the DOM, rendered, and eventually removed. Understanding lifecycle hooks is essential for controlling when data loads, DOM manipulations happen, and resources are cleaned up.</p>
      </div>
      <h3>Lifecycle Hooks</h3>
      <table>
        <thead><tr><th>Hook</th><th>When Called</th><th>Common Use</th></tr></thead>
        <tbody>
          <tr><td><strong>constructor()</strong></td><td>Component created (before DOM)</td><td>Initialize variables (no DOM access)</td></tr>
          <tr><td><strong>connectedCallback()</strong></td><td>Inserted into DOM</td><td>Fetch data, add event listeners, start timers</td></tr>
          <tr><td><strong>renderedCallback()</strong></td><td>After every render/re-render</td><td>Post-render DOM manipulation (use guards!)</td></tr>
          <tr><td><strong>disconnectedCallback()</strong></td><td>Removed from DOM</td><td>Cleanup: remove listeners, cancel timers</td></tr>
          <tr><td><strong>errorCallback(error, stack)</strong></td><td>Child component error</td><td>Error boundaries, graceful error handling</td></tr>
        </tbody>
      </table>
      <div class="callout callout--warning">
        <p class="callout__title">⚠️ renderedCallback Trap</p>
        <p><code>renderedCallback()</code> fires after EVERY render cycle. If you modify reactive properties inside it without a guard, you'll create an infinite render loop. Always use a boolean flag: <code>if (this.hasRendered) return; this.hasRendered = true;</code></p>
      </div>
    `,
    examples: [
      { title: 'Example 1: Lifecycle Hook Sequence', description: 'Observing when each hook fires.', code: `// lifecycleDemo.js
import { LightningElement, api } from 'lwc';

export default class LifecycleDemo extends LightningElement {
    @api recordId;
    isRendered = false;
    
    constructor() {
        super(); // Must call super() first!
        console.log('1. constructor — component created');
        // ❌ Cannot access this.template here
        // ❌ Cannot access @api properties here
    }
    
    connectedCallback() {
        console.log('2. connectedCallback — inserted into DOM');
        console.log('   recordId:', this.recordId); // ✅ @api available
        // ✅ Great place to fetch data
        // ✅ Add event listeners
        // ❌ this.template.querySelector() may not work yet
        this.loadData();
    }
    
    renderedCallback() {
        console.log('3. renderedCallback — DOM rendered');
        // Use a guard to prevent infinite loops!
        if (this.isRendered) return;
        this.isRendered = true;
        
        // ✅ Safe DOM manipulation here
        const element = this.template.querySelector('.my-element');
        if (element) {
            element.classList.add('highlight');
        }
    }
    
    disconnectedCallback() {
        console.log('4. disconnectedCallback — removed from DOM');
        // ✅ Cleanup resources
        window.removeEventListener('resize', this.resizeHandler);
    }
    
    errorCallback(error, stack) {
        console.error('Child error:', error.message);
        console.error('Stack:', stack);
        // ✅ Handle child component errors gracefully
    }
    
    loadData() {
        console.log('Loading data for record:', this.recordId);
    }
}`, language: 'javascript', explanation: 'Hooks fire in order: constructor → connectedCallback → renderedCallback. disconnectedCallback fires when the component is removed. errorCallback catches errors from child components (error boundary pattern).' },
      { title: 'Example 2: Dynamic Data Loading', description: 'Using connectedCallback and disconnectedCallback.', code: `// liveAccountFeed.js
import { LightningElement, wire } from 'lwc';
import getRecentAccounts from '@salesforce/apex/AccountController.getRecentAccounts';

export default class LiveAccountFeed extends LightningElement {
    accounts = [];
    error;
    refreshInterval;
    
    connectedCallback() {
        // Initial data load
        this.fetchAccounts();
        
        // Set up auto-refresh every 30 seconds
        this.refreshInterval = setInterval(() => {
            this.fetchAccounts();
        }, 30000);
        
        // Listen for window events
        this.resizeHandler = this.handleResize.bind(this);
        window.addEventListener('resize', this.resizeHandler);
    }
    
    disconnectedCallback() {
        // Critical: clean up to prevent memory leaks!
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
        }
        window.removeEventListener('resize', this.resizeHandler);
    }
    
    async fetchAccounts() {
        try {
            this.accounts = await getRecentAccounts();
            this.error = undefined;
        } catch (error) {
            this.error = error.body.message;
            this.accounts = [];
        }
    }
    
    handleResize() {
        // Responsive behavior
        console.log('Window resized');
    }
}

<!-- liveAccountFeed.html -->
<template>
    <lightning-card title="Live Account Feed">
        <template if:true={error}>
            <p class="slds-text-color_error">{error}</p>
        </template>
        <template for:each={accounts} for:item="acc">
            <p key={acc.Id}>{acc.Name} — {acc.Industry}</p>
        </template>
    </lightning-card>
</template>`, language: 'javascript', explanation: 'connectedCallback sets up timers and event listeners. disconnectedCallback MUST clean them up to prevent memory leaks. This pattern is critical for any component with timers or global event listeners.' },
      { title: 'Example 3: Error Boundary Pattern', description: 'Using errorCallback to catch child errors.', code: `// errorBoundary.js — Parent component
import { LightningElement } from 'lwc';

export default class ErrorBoundary extends LightningElement {
    error;
    stack;
    
    errorCallback(error, stack) {
        this.error = error;
        this.stack = stack;
        console.error('Caught error from child:', error.message);
    }
    
    get hasError() {
        return !!this.error;
    }
    
    handleRetry() {
        this.error = undefined;
        this.stack = undefined;
    }
}

<!-- errorBoundary.html -->
<template>
    <template if:true={hasError}>
        <div class="error-panel">
            <lightning-icon icon-name="utility:error" variant="error"></lightning-icon>
            <p>Something went wrong: {error.message}</p>
            <lightning-button label="Retry" onclick={handleRetry}></lightning-button>
        </div>
    </template>
    <template if:false={hasError}>
        <slot></slot> <!-- Child components go here -->
    </template>
</template>

<!-- Usage in a parent page -->
<!-- 
<c-error-boundary>
    <c-risky-child-component></c-risky-child-component>
</c-error-boundary>
-->`, language: 'javascript', explanation: 'errorCallback on a parent catches unhandled errors from child components — like React error boundaries. Use <slot> to wrap any child component with error handling.' }
    ],
    practice: {
      intro: 'Experiment with lifecycle hooks.',
      steps: [
        'Create a component and add console.log to each lifecycle hook.',
        'Observe the order of hook execution in the browser console.',
        'Set up a timer in connectedCallback and clear it in disconnectedCallback.',
        'Use renderedCallback with a guard flag to manipulate DOM elements.',
        'Try removing the guard from renderedCallback — observe the infinite loop.',
        'Create an error boundary wrapper component.',
        'Test errorCallback by throwing an error in a child component.'
      ],
      expectedOutcome: 'You should understand the lifecycle order, when each hook fires, and how to properly set up and tear down resources.'
    },
    interviewQuestions: [
      { scenario: 'What is the difference between connectedCallback and renderedCallback?', answer: 'connectedCallback fires ONCE when the component is inserted into the DOM — use it for initial data loading, event listener setup, and one-time initialization. renderedCallback fires after EVERY render cycle (initial + re-renders from reactive property changes) — use it sparingly for post-render DOM manipulation, always with a guard flag to prevent infinite loops. Key rule: if you modify a reactive property in renderedCallback without a guard, it triggers a re-render which calls renderedCallback again — infinite loop.' },
      { scenario: 'Why must you call super() in the constructor?', answer: 'LWC components extend LightningElement. The constructor must call super() as its first statement to properly initialize the parent class. Without super(), the component won\'t have access to the LightningElement prototype chain, including the template, event system, and lifecycle hooks. This is a JavaScript class inheritance requirement, not LWC-specific.' },
      { scenario: 'How do you prevent memory leaks in LWC?', answer: 'Use disconnectedCallback to clean up: 1) clearInterval/clearTimeout for timers. 2) removeEventListener for window/document listeners. 3) Unsubscribe from Lightning Message Service channels. 4) Cancel pending fetch/imperative Apex calls. Any resource acquired in connectedCallback should be released in disconnectedCallback. LWC automatically handles @wire cleanup.' },
      { scenario: 'When would you use errorCallback?', answer: 'Use errorCallback in a parent wrapper component to catch unhandled errors from child components — the LWC equivalent of React\'s Error Boundaries. It receives (error, stack) parameters. Use it to: display a user-friendly error message instead of a broken component, log errors for debugging, provide a "retry" button. Note: it only catches errors from child components, not from the component itself.' },
      { scenario: 'Can you access DOM elements in the constructor?', answer: 'No! The constructor runs before the component is connected to the DOM. this.template is not available, and querySelector returns null. You can only initialize primitive variables and class fields. DOM access is available starting from connectedCallback (partially) and fully in renderedCallback. @api properties are also NOT available in the constructor — they\'re set after construction.' }
    ]
  },

  '4.3': {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p>An LWC <strong>component bundle</strong> consists of related files that define the component's template, logic, styling, and metadata. All files must share the same base name and reside in the same directory.</p>
      </div>
      <h3>Bundle Files</h3>
      <table>
        <thead><tr><th>File</th><th>Required</th><th>Purpose</th></tr></thead>
        <tbody>
          <tr><td>component.html</td><td>Yes</td><td>HTML template with data binding</td></tr>
          <tr><td>component.js</td><td>Yes</td><td>ES6 class with reactive properties and methods</td></tr>
          <tr><td>component.css</td><td>No</td><td>Scoped styles (Shadow DOM)</td></tr>
          <tr><td>component.js-meta.xml</td><td>Yes</td><td>Metadata: API version, targets, design attributes</td></tr>
          <tr><td>__tests__/*.test.js</td><td>No</td><td>Jest unit tests</td></tr>
          <tr><td>component.svg</td><td>No</td><td>Custom icon for Lightning App Builder</td></tr>
        </tbody>
      </table>
      <h3>Naming Rules</h3>
      <ul>
        <li>Folder and files: <strong>camelCase</strong> (e.g., myComponent)</li>
        <li>In HTML markup: <strong>kebab-case</strong> with c- prefix (e.g., &lt;c-my-component&gt;)</li>
        <li>Must start with a lowercase letter</li>
        <li>Must contain only alphanumeric characters</li>
        <li>Must be unique within the namespace</li>
      </ul>
    `,
    examples: [
      { title: 'Example 1: Complete Component Bundle', description: 'A contact card component with all files.', code: `// contactCard/contactCard.html
<template>
    <lightning-card title={cardTitle} icon-name="standard:contact">
        <div class="slds-p-horizontal_small">
            <p class="name">{contact.Name}</p>
            <p class="detail">{contact.Email}</p>
            <p class="detail">{contact.Phone}</p>
        </div>
        <div slot="footer">
            <lightning-button label="View Details" onclick={handleView}>
            </lightning-button>
        </div>
    </lightning-card>
</template>

// contactCard/contactCard.js
import { LightningElement, api } from 'lwc';

export default class ContactCard extends LightningElement {
    @api contact = {};
    
    get cardTitle() {
        return this.contact.Name || 'Unknown Contact';
    }
    
    handleView() {
        this.dispatchEvent(new CustomEvent('viewcontact', {
            detail: { contactId: this.contact.Id }
        }));
    }
}

// contactCard/contactCard.css
.name {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--lwc-colorTextDefault);
}
.detail {
    color: var(--lwc-colorTextWeak);
    margin-top: 0.25rem;
}

// contactCard/contactCard.js-meta.xml
<?xml version="1.0" encoding="UTF-8"?>
<LightningComponentBundle xmlns="http://soap.sforce.com/2006/04/metadata">
    <apiVersion>59.0</apiVersion>
    <isExposed>true</isExposed>
    <targets>
        <target>lightning__RecordPage</target>
        <target>lightning__AppPage</target>
    </targets>
    <targetConfigs>
        <targetConfig targets="lightning__RecordPage">
            <objects>
                <object>Contact</object>
            </objects>
        </targetConfig>
    </targetConfigs>
</LightningComponentBundle>`, language: 'javascript', explanation: 'This is a complete LWC component. The HTML defines the UI, JS handles logic, CSS styles are scoped, and the meta XML configures where it can be placed (Contact record pages).' }
    ],
    practice: {
      intro: 'Create a complete LWC component bundle.',
      steps: [
        'In your SFDX project, create a component: sf lightning generate component --name contactCard --type lwc --output-dir force-app/main/default/lwc',
        'Open contactCard.html and add a template with a lightning-card.',
        'Open contactCard.js and add a reactive property and a method.',
        'Create contactCard.css and add scoped styles.',
        'Edit contactCard.js-meta.xml to set targets to lightning__RecordPage.',
        'Deploy: sf project deploy start',
        'In Salesforce, edit a Contact Record Page in Lightning App Builder.',
        'Drag your component from the custom components panel onto the page.',
        'Save and test.'
      ],
      expectedOutcome: 'Your component should appear in Lightning App Builder and render correctly on a Contact record page with styled output.'
    },
    interviewQuestions: [
      { scenario: 'What happens if you name your component folder "MyComponent" with an uppercase M?', answer: 'It will cause an error. LWC component folders must start with a lowercase letter (camelCase). The correct name would be "myComponent". In HTML markup, it becomes kebab-case: <c-my-component>. This convention is enforced by the framework and Salesforce CLI.' },
      { scenario: 'Can you have multiple HTML templates in one LWC component?', answer: 'Yes. You can create additional HTML files and dynamically switch between them using the render() method. The additional templates must be imported: import altTemplate from "./altView.html". In the render() method, return altTemplate based on a condition. This is useful for different views (edit vs read mode).' },
      { scenario: 'How does CSS scoping work in LWC?', answer: 'LWC uses synthetic Shadow DOM to scope CSS. Styles in your component.css only affect elements within that component\'s template — they don\'t leak to parent or child components. Conversely, external styles don\'t affect your component\'s elements. To share styles, use SLDS (Salesforce Lightning Design System) utility classes or create shared CSS modules.' },
      { scenario: 'What is the purpose of isExposed in the meta XML?', answer: 'isExposed=true makes the component available in Lightning App Builder, allowing admins to drag it onto pages. If false (default), the component can only be used in other LWC/Aura components — it won\'t appear in App Builder. Set to true for components that end users or admins should be able to place on pages.' },
      { scenario: 'How do you pass configuration from Lightning App Builder to your component?', answer: 'Use @api properties combined with targetConfigs in the meta XML. Define the property with @api in JS, then declare it in targetConfigs with a property element specifying type, label, and description. Lightning App Builder renders it as a configuration field. Example: @api recordsToShow = 5; in JS, then <property name="recordsToShow" type="Integer" label="Records to Show"/> in meta XML.' }
    ]
  },

  '4.4': {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p><strong>LWC HTML Templates</strong> define the UI of your component. They use a standard <code>&lt;template&gt;</code> tag and allow you to seamlessly bind JavaScript properties to HTML elements using curly braces <code>{property}</code>.</p>
      </div>
      <h3>Data Binding</h3>
      <p>Data binding in LWC is <strong>one-way</strong> (from JS to HTML). When the JS property changes, the HTML automatically re-renders. To update JS from HTML, you must use event listeners (like <code>onchange</code> or <code>onclick</code>).</p>
      <h3>Types of Binding</h3>
      <ul>
        <li><strong>Text Binding:</strong> <code>&lt;p&gt;{greeting}&lt;/p&gt;</code></li>
        <li><strong>Attribute Binding:</strong> <code>&lt;input value={firstName}&gt;</code></li>
        <li><strong>Boolean Attribute Binding:</strong> <code>&lt;button disabled={isDisabled}&gt;</code></li>
      </ul>
      <div class="callout callout--tip">
        <p class="callout__title">💡 No Expressions in HTML</p>
        <p>Unlike some frameworks, LWC does not allow complex expressions in HTML (e.g., <code>{count + 1}</code> or <code>{isTrue ? 'Yes' : 'No'}</code>). You must compute these values in JavaScript using getter methods.</p>
      </div>
    `,
    examples: [
      { title: 'Example 1: Basic Text and Attribute Binding', description: 'Binding properties to text and attributes.', code: `// dataBinding.js
import { LightningElement } from 'lwc';

export default class DataBinding extends LightningElement {
    greeting = 'Hello, Salesforce Developer!';
    imgUrl = 'https://example.com/logo.png';
    imgAlt = 'Company Logo';
    isButtonDisabled = true;
}

<!-- dataBinding.html -->
<template>
    <!-- Text binding -->
    <p>{greeting}</p>
    
    <!-- Attribute binding -->
    <img src={imgUrl} alt={imgAlt} />
    
    <!-- Boolean attribute binding -->
    <!-- If isButtonDisabled is true, the attribute is added. If false, it's removed -->
    <lightning-button label="Submit" disabled={isButtonDisabled}></lightning-button>
</template>`, language: 'javascript', explanation: 'Text and attributes use curly braces for binding. Boolean attributes like disabled or checked are added if the value is truthy and removed if falsy.' },
      { title: 'Example 2: Getters for Computed Values', description: 'Using JS getters instead of HTML expressions.', code: `// computedValues.js
import { LightningElement } from 'lwc';

export default class ComputedValues extends LightningElement {
    firstName = 'John';
    lastName = 'Doe';
    score = 85;
    
    // Getter for concatenated string
    get fullName() {
        return \`\${this.firstName} \${this.lastName}\`;
    }
    
    // Getter for boolean logic
    get isPassing() {
        return this.score >= 70;
    }
    
    // Getter for dynamic classes
    get textClass() {
        return this.isPassing ? 'slds-text-color_success' : 'slds-text-color_error';
    }
}

<!-- computedValues.html -->
<template>
    <!-- Instead of {firstName + ' ' + lastName}, use the getter -->
    <p>Name: {fullName}</p>
    
    <!-- Instead of {score >= 70}, use the getter -->
    <template lwc:if={isPassing}>
        <p class={textClass}>Congratulations, you passed with a {score}!</p>
    </template>
</template>`, language: 'javascript', explanation: 'Since LWC HTML doesn\'t support inline expressions, you compute values in JS getters. Getters re-evaluate automatically when the properties they depend on change.' },
      { title: 'Example 3: Two-Way Data Binding Pattern', description: 'Updating JS properties from HTML inputs.', code: `// twoWayBinding.js
import { LightningElement } from 'lwc';

export default class TwoWayBinding extends LightningElement {
    userInput = '';
    
    // Event handler to update the JS property
    handleInputChange(event) {
        // event.target.value contains the new input value
        this.userInput = event.target.value;
    }
    
    get upperCaseInput() {
        return this.userInput.toUpperCase();
    }
}

<!-- twoWayBinding.html -->
<template>
    <lightning-card title="Two-Way Binding Pattern">
        <div class="slds-p-around_medium">
            <!-- 1. Bind value to JS property -->
            <!-- 2. Listen for change/input event to update JS -->
            <lightning-input 
                label="Type something" 
                value={userInput} 
                onchange={handleInputChange}>
            </lightning-input>
            
            <p class="slds-m-top_medium">You typed: {userInput}</p>
            <p>Uppercase: {upperCaseInput}</p>
        </div>
    </lightning-card>
</template>`, language: 'javascript', explanation: 'LWC enforces one-way data flow. To achieve two-way binding (like ng-model or v-model), you bind the input value to a property AND add an onchange/oninput handler to update that property.' }
    ],
    practice: {
      intro: 'Practice LWC data binding.',
      steps: [
        'Create an LWC with properties for title, description, and an image URL.',
        'Bind these properties to the HTML template.',
        'Create a number input field and bind it to a quantity property using an onchange handler.',
        'Create a getter that calculates a total price (quantity * fixed price).',
        'Display the total price in the template.',
        'Create a getter that returns true if quantity > 10, and use it to conditionally disable the input.'
      ],
      expectedOutcome: 'You should understand how to bind data to text and attributes, how to use getters for computation, and how to capture user input to update properties.'
    },
    interviewQuestions: [
      { scenario: 'Why doesn\'t LWC allow expressions like {count + 1} in the HTML template?', answer: 'LWC enforces separation of concerns. The template should only define the structure (the "view"), while the JavaScript class handles all logic (the "controller"). Allowing logic in the template makes the code harder to test, debug, and maintain. By using JavaScript getters instead, the logic can be easily unit tested with Jest.' },
      { scenario: 'How do you achieve two-way data binding in LWC?', answer: 'LWC inherently uses one-way data binding (JS to HTML). To achieve two-way binding, you must use the "value-and-event" pattern: bind the input element\'s value attribute to a JS property, and add an onchange or oninput event listener that updates the JS property when the user types (e.g., this.myProp = event.target.value). This gives you full control over state changes.' },
      { scenario: 'What is a getter in LWC and when do you use it?', answer: 'A getter is a JavaScript method defined with the "get" keyword that returns a value (e.g., get fullName() { return this.first + this.last; }). In LWC, getters are primarily used to compute values for the template since the template cannot contain inline logic. Getters are reactive — if they reference a reactive property, the template automatically re-renders when that property changes.' },
      { scenario: 'How do you bind a boolean attribute like "disabled" or "readonly"?', answer: 'You bind it just like a regular attribute: <button disabled={isDisabled}>. If the JavaScript property (isDisabled) evaluates to true, the framework adds the boolean attribute to the DOM element. If it evaluates to false, the framework removes the attribute entirely from the DOM element.' },
      { scenario: 'What happens if you try to bind an object directly in the template without a property?', answer: 'If you try to output an object directly (like <p>{myObject}</p>), it will render as "[object Object]" on the screen. To display object data, you must bind to specific properties of the object (like <p>{myObject.Name}</p>) or use JSON.stringify in a getter if you are trying to debug the object contents.' }
    ]
  },

  '4.5': {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p>LWC <strong>decorators</strong> are special annotations that modify the behavior of class properties and methods. The three decorators are <strong>@api</strong> (public), <strong>@track</strong> (deep reactive), and <strong>@wire</strong> (reactive data binding).</p>
      </div>
      <h3>Decorators Summary</h3>
      <table>
        <thead><tr><th>Decorator</th><th>Purpose</th><th>When to Use</th></tr></thead>
        <tbody>
          <tr><td><strong>@api</strong></td><td>Expose property/method publicly</td><td>Parent-child communication, App Builder config</td></tr>
          <tr><td><strong>@track</strong></td><td>Deep reactive tracking</td><td>Only for deep object/array mutations</td></tr>
          <tr><td><strong>@wire</strong></td><td>Reactive data provisioning</td><td>Fetching Apex data, UI API data</td></tr>
        </tbody>
      </table>
      <div class="callout callout--warning">
        <p class="callout__title">⚠️ Important Change (Spring '20+)</p>
        <p>Since Spring '20, <strong>all fields are reactive by default</strong>. You do NOT need @track for simple primitive values. @track is only needed for observing deep changes in objects/arrays (e.g., changing a nested property: this.obj.nested.value = 'new').</p>
      </div>
    `,
    examples: [
      { title: 'Example 1: @api Decorator', description: 'Public properties and methods accessible from parent components.', code: `// childComponent.js
import { LightningElement, api } from 'lwc';

export default class ChildComponent extends LightningElement {
    // Public property — parent can set this
    @api recordId;
    @api objectApiName;
    
    // Public property with default value
    @api variant = 'standard';
    
    // Public method — parent can call this
    @api
    refresh() {
        // Reload data logic
        console.log('Refreshing component...');
    }
    
    @api
    validate() {
        // Custom validation called by parent
        const isValid = this.checkFields();
        return { isValid, errorMessage: isValid ? '' : 'Please fill required fields' };
    }
}

// parentComponent.html
<template>
    <c-child-component
        record-id={recordId}
        variant="compact"
        onaction={handleAction}>
    </c-child-component>
    <lightning-button label="Refresh Child" onclick={handleRefresh}>
    </lightning-button>
</template>

// parentComponent.js — calling child method
handleRefresh() {
    this.template.querySelector('c-child-component').refresh();
}`, language: 'javascript', explanation: '@api makes properties settable by parents and methods callable by parents. Note: @api properties are one-way (parent → child). The child should never directly modify an @api property.' },
      { title: 'Example 2: @track for Deep Mutations', description: 'When you need @track vs when you don\'t.', code: `import { LightningElement, track } from 'lwc';

export default class TrackExample extends LightningElement {
    // ✅ NO @track needed — primitive is auto-reactive
    count = 0;
    name = 'World';
    
    // ✅ NO @track needed — reassigning object triggers re-render
    user = { name: 'John', age: 30 };
    
    // Works: reassignment triggers re-render
    updateUser() {
        this.user = { ...this.user, age: 31 };  // New object reference
    }
    
    // ❌ Does NOT trigger re-render without @track
    mutateUser() {
        this.user.age = 31;  // Deep mutation — component won't update!
    }
    
    // ✅ With @track, deep mutations trigger re-render
    @track trackedUser = { name: 'Jane', age: 25 };
    
    updateTrackedUser() {
        this.trackedUser.age = 26;  // This WILL trigger re-render
    }
}`, language: 'javascript', explanation: 'Rule of thumb: if you\'re replacing the entire object (this.obj = newObj), @track is unnecessary. If you\'re mutating nested properties (this.obj.prop = val), you need @track. Most developers avoid @track by always replacing objects.' },
      { title: 'Example 3: @wire Decorator', description: 'Reactive data provisioning from Apex.', code: `import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

export default class AccountList extends LightningElement {
    searchKey = '';
    
    // @wire as property — auto-provisions data
    @wire(getAccounts, { searchKey: '$searchKey' })
    accounts;
    // accounts = { data: [...], error: undefined }
    // or accounts = { data: undefined, error: {...} }
    
    // @wire as function — more control
    @wire(getAccounts, { searchKey: '$searchKey' })
    wiredAccountsHandler({ data, error }) {
        if (data) {
            this.processedData = data.map(acc => ({
                ...acc,
                displayName: acc.Name.toUpperCase()
            }));
        } else if (error) {
            console.error('Error loading accounts:', error);
        }
    }
    
    handleSearch(event) {
        // $ prefix in @wire makes searchKey reactive
        // When searchKey changes, @wire auto-refetches
        this.searchKey = event.target.value;
    }
}`, language: 'javascript', explanation: 'The $ prefix in @wire parameter values makes them reactive. When the referenced property changes, the wire adapter automatically re-invokes. @wire can be used as a property (simple) or function (for data transformation).' }
    ],
    practice: {
      intro: 'Practice using all three LWC decorators.',
      steps: [
        'Create a child component with @api properties (title, message).',
        'Create a parent component that passes values to the child.',
        'Add an @api method to the child and call it from the parent.',
        'Create a component with an object property. Test: mutate a nested property and observe no re-render.',
        'Add @track to the same property and verify re-render works on mutation.',
        'Try the spread operator approach (this.obj = {...this.obj, key: val}) without @track — verify it works.',
        'Create an Apex class with @AuraEnabled(cacheable=true) method.',
        'Use @wire in an LWC to call the Apex method and display results.'
      ],
      expectedOutcome: 'You should understand when to use each decorator and be able to build components that communicate with Apex via @wire.'
    },
    interviewQuestions: [
      { scenario: 'When would you use @track in modern LWC?', answer: 'Only when you need to track deep mutations on objects or arrays. For example, pushing to an array (this.items.push(newItem)) or changing a nested property (this.address.city = \'NYC\'). For most cases, avoid @track by reassigning the entire object: this.items = [...this.items, newItem] or this.address = {...this.address, city: \'NYC\'}. This approach is cleaner and doesn\'t require @track.' },
      { scenario: 'Can a child component modify an @api property?', answer: 'No. @api properties are read-only in the child. If the child tries to modify an @api property (this.myApiProp = newValue), it throws an error. This enforces one-way data flow (parent → child). If the child needs to communicate back, it should dispatch a CustomEvent. This is by design — it prevents confusing bidirectional data flow.' },
      { scenario: 'What does the $ prefix mean in @wire parameters?', answer: 'The $ makes a @wire parameter reactive. When the referenced property changes, the wire adapter automatically re-invokes with the new value. Example: @wire(getAccounts, { key: \'$searchKey\' }) — when this.searchKey changes, getAccounts is called again. Without $, the value is static and the wire only fires once (on initial load).' },
      { scenario: 'Can you use @wire with imperative parameters (non-reactive)?', answer: 'No. @wire is always reactive — it provisions data automatically. For imperative (on-demand) Apex calls, import the method and call it directly: import getAccounts from \'@salesforce/apex/...\'; then in a handler: const result = await getAccounts({key: val}). Use imperative calls when you want to control WHEN the call happens (e.g., on button click).' },
      { scenario: 'What is the cacheable=true annotation on Apex methods used with @wire?', answer: '@AuraEnabled(cacheable=true) enables client-side caching of the Apex result. Benefits: faster subsequent loads (cached response), offline support in mobile. Constraint: cacheable methods can only do read operations (no DML — insert/update/delete). If you need to perform DML, omit cacheable=true and use imperative Apex calls instead.' }
    ]
  },

  '4.6': {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p><strong>Reactive Properties</strong> are JavaScript variables that, when changed, automatically trigger the component's template to re-render. In modern LWC, all primitive properties are reactive by default.</p>
      </div>
      <h3>Reactivity Rules</h3>
      <ul>
        <li><strong>Primitives (String, Number, Boolean):</strong> Always reactive. Changing the value re-renders the component.</li>
        <li><strong>Objects & Arrays:</strong> Reactive ONLY on reassignment (e.g., <code>this.obj = newObj</code>). Internal mutations (e.g., <code>this.obj.name = 'John'</code>) are NOT tracked by default.</li>
        <li><strong>@track:</strong> Use this decorator to track internal mutations of objects and arrays.</li>
      </ul>
      <div class="callout callout--tip">
        <p class="callout__title">💡 Modern Best Practice</p>
        <p>Instead of using <code>@track</code>, it is often better to use the spread operator to create a new object/array. This triggers standard reactivity and avoids the overhead of proxying deep objects.</p>
      </div>
    `,
    examples: [
      { title: 'Example 1: Primitive Reactivity', description: 'Primitive fields are reactive by default.', code: `import { LightningElement } from 'lwc';

export default class PrimitiveReactivity extends LightningElement {
    // These are reactive automatically
    count = 0;
    message = 'Hello';
    
    increment() {
        this.count++; // UI updates automatically
    }
    
    changeMessage() {
        this.message = 'Goodbye'; // UI updates automatically
    }
}`, language: 'javascript', explanation: 'You don\'t need @track for primitives (strings, numbers, booleans) anymore. Modifying them automatically triggers a re-render.' },
      { title: 'Example 2: Object Reactivity (Without @track)', description: 'Using reassignment for reactivity.', code: `import { LightningElement } from 'lwc';

export default class ObjectReactivity extends LightningElement {
    // Not using @track
    user = {
        firstName: 'John',
        lastName: 'Doe'
    };
    
    updateFirstNameTheWrongWay() {
        // ❌ This changes the value in JS, but UI DOES NOT update
        // because the object reference 'user' didn't change
        this.user.firstName = 'Jane';
    }
    
    updateFirstNameTheRightWay() {
        // ✅ This creates a NEW object with the spread operator
        // The object reference changes, triggering a re-render
        this.user = { ...this.user, firstName: 'Jane' };
    }
}`, language: 'javascript', explanation: 'By reassigning the entire object using the spread syntax (...), you trigger standard reactivity without needing @track. This is a common pattern in modern JavaScript.' },
      { title: 'Example 3: Object Reactivity (With @track)', description: 'When to use @track for deep mutations.', code: `import { LightningElement, track } from 'lwc';

export default class TrackReactivity extends LightningElement {
    // Use @track when you want to mutate deeply nested structures
    @track
    complexData = {
        settings: {
            theme: 'dark',
            notifications: true
        },
        items: []
    };
    
    updateTheme() {
        // ✅ UI updates because @track monitors internal mutations
        this.complexData.settings.theme = 'light';
    }
    
    addItem() {
        // ✅ UI updates because @track monitors array push
        this.complexData.items.push({ id: 1, name: 'New Item' });
    }
}`, language: 'javascript', explanation: '@track tells the framework to wrap the object in a Proxy and monitor all internal changes. Use it for complex, deeply nested objects or large arrays where recreating the entire object would be inefficient.' }
    ],
    practice: {
      intro: 'Practice reactivity in LWC.',
      steps: [
        'Create a component with a simple array property (no @track).',
        'Add a button that pushes a new item to the array. Verify the UI does not update.',
        'Change the button logic to reassign the array: this.myArray = [...this.myArray, newItem]. Verify the UI updates.',
        'Add @track to the array property and revert the button logic to use .push(). Verify the UI updates.',
        'Create an object with nested properties and experiment with updating them.'
      ],
      expectedOutcome: 'You should understand when UI updates automatically, how to use spread syntax for reassignment, and exactly when @track is required.'
    },
    interviewQuestions: [
      { scenario: 'If you push an item to an array in LWC, why might the UI not update?', answer: 'In LWC, objects and arrays are only reactive upon reassignment by default. Pushing an item (array.push()) mutates the existing array but doesn\'t change the array reference, so the framework doesn\'t detect the change. To fix this, you can either: 1) Reassign the array using the spread operator: this.array = [...this.array, newItem]. 2) Decorate the array with @track.' },
      { scenario: 'When should you use @track vs the spread operator?', answer: 'Use the spread operator (...this.obj) for simple objects or arrays — it\'s standard ES6 and avoids the overhead of proxying the object. Use @track when working with deeply nested, complex objects or large arrays where recreating the entire structure would cause performance issues, or when migrating legacy Aura/React code that relies on deep mutations.' },
      { scenario: 'Are getter methods reactive?', answer: 'Getters themselves are not reactive, but they re-evaluate automatically if any reactive property they reference changes. For example, if get fullName() uses this.firstName, and this.firstName changes, the getter will re-evaluate and the template will update.' },
      { scenario: 'What was the major change to reactivity in Spring \'20?', answer: 'Before Spring \'20, ALL private properties had to be decorated with @track to be reactive. In Spring \'20, Salesforce made all fields reactive by default. @track is now only needed specifically for tracking internal mutations of objects and arrays.' },
      { scenario: 'How can you force a component to re-render if standard reactivity fails?', answer: 'While you shouldn\'t normally need to force a re-render, you can trigger one by creating a dummy primitive property, binding it invisibly in the template, and updating it. However, if standard reactivity is failing, it usually means you are mutating an untracked object/array instead of reassigning it. Fixing the data mutation pattern is the correct solution.' }
    ]
  },

  '4.7': {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p><strong>Conditional Rendering</strong> in LWC controls which parts of the template are displayed based on JavaScript property values. Modern LWC uses <strong>lwc:if</strong>, <strong>lwc:elseif</strong>, and <strong>lwc:else</strong> directives (replacing the legacy if:true/if:false).</p>
      </div>
      <h3>Old vs New Syntax</h3>
      <table>
        <thead><tr><th>Legacy (Deprecated)</th><th>Modern (Recommended)</th></tr></thead>
        <tbody>
          <tr><td>&lt;template if:true={expr}&gt;</td><td>&lt;template lwc:if={expr}&gt;</td></tr>
          <tr><td>&lt;template if:false={expr}&gt;</td><td>&lt;template lwc:else&gt;</td></tr>
          <tr><td>Nested templates for else-if</td><td>&lt;template lwc:elseif={expr}&gt;</td></tr>
        </tbody>
      </table>
      <div class="callout callout--warning">
        <p class="callout__title">⚠️ Migration Notice</p>
        <p>The <strong>if:true</strong> and <strong>if:false</strong> directives are deprecated. All new LWC components should use <strong>lwc:if</strong>, <strong>lwc:elseif</strong>, and <strong>lwc:else</strong>.</p>
      </div>
    `,
    examples: [
      { title: 'Example 1: Basic Conditional Rendering', description: 'Show/hide elements based on conditions.', code: `<!-- conditionalDemo.html -->
<template>
    <lightning-card title="Conditional Rendering Demo">
        <!-- Simple if -->
        <template lwc:if={isLoggedIn}>
            <p>Welcome back, {username}!</p>
            <lightning-button label="Logout" onclick={handleLogout}>
            </lightning-button>
        </template>
        <template lwc:else>
            <p>Please log in to continue.</p>
            <lightning-button label="Login" onclick={handleLogin}>
            </lightning-button>
        </template>

        <!-- If / Else-If / Else chain -->
        <template lwc:if={isAdmin}>
            <c-admin-panel></c-admin-panel>
        </template>
        <template lwc:elseif={isManager}>
            <c-manager-dashboard></c-manager-dashboard>
        </template>
        <template lwc:else>
            <c-user-view></c-user-view>
        </template>
    </lightning-card>
</template>`, language: 'markup', explanation: 'lwc:if accepts a truthy/falsy expression. lwc:elseif and lwc:else must immediately follow a lwc:if or lwc:elseif template — no elements between them.' },
      { title: 'Example 2: Conditional with Data Loading', description: 'Common pattern for loading states.', code: `<!-- dataLoader.html -->
<template>
    <!-- Loading spinner -->
    <template lwc:if={isLoading}>
        <lightning-spinner alternative-text="Loading" size="medium">
        </lightning-spinner>
    </template>

    <!-- Error state -->
    <template lwc:elseif={hasError}>
        <div class="error-panel">
            <p>⚠️ Something went wrong: {errorMessage}</p>
            <lightning-button label="Retry" onclick={handleRetry}>
            </lightning-button>
        </div>
    </template>

    <!-- Empty state -->
    <template lwc:elseif={isEmpty}>
        <div class="empty-state">
            <p>No records found.</p>
        </div>
    </template>

    <!-- Data loaded successfully -->
    <template lwc:else>
        <lightning-datatable
            key-field="Id"
            data={records}
            columns={columns}>
        </lightning-datatable>
    </template>
</template>

<!-- dataLoader.js -->
// get isEmpty() { return this.records && this.records.length === 0; }
// get hasError() { return !!this.errorMessage; }`, language: 'markup', explanation: 'This pattern handles all four UI states: loading, error, empty, and data display. Using lwc:elseif creates clean, readable conditional chains without nesting.' }
    ],
    practice: {
      intro: 'Practice conditional rendering with the modern lwc:if syntax.',
      steps: [
        'Create an LWC component called "conditionalDemo".',
        'Add a Boolean property isVisible = false and a toggle button.',
        'Use lwc:if to show/hide a paragraph based on isVisible.',
        'Add an lwc:else block with alternative content.',
        'Create a role property (String) with values: admin, manager, user.',
        'Use lwc:if / lwc:elseif / lwc:else to show different content per role.',
        'Add a picklist (lightning-combobox) to switch between roles dynamically.',
        'Test all three states render correctly.'
      ],
      expectedOutcome: 'Your component should dynamically switch between different UI states using the modern lwc:if directive chain.'
    },
    interviewQuestions: [
      { scenario: 'Why did Salesforce deprecate if:true in favor of lwc:if?', answer: 'Three reasons: 1) Performance — lwc:if is more efficient because it can optimize the rendering pipeline. 2) Expressiveness — lwc:elseif eliminates the need for nested templates to create else-if chains. 3) Clarity — the lwc: namespace makes it clear these are LWC framework directives, not standard HTML attributes. The old if:true also couldn\'t handle else-if logic without cumbersome workarounds.' },
      { scenario: 'Can lwc:if evaluate complex expressions?', answer: 'No. lwc:if only accepts a property reference (like {isVisible} or a getter). It cannot evaluate inline expressions like {count > 5} or {isA && isB}. For complex conditions, create a getter: get showSection() { return this.count > 5 && this.isActive; }. Then use lwc:if={showSection}.' },
      { scenario: 'What is the difference between lwc:if and CSS display:none for hiding elements?', answer: 'lwc:if removes the element from the DOM entirely — the element doesn\'t exist in memory when the condition is false. CSS display:none hides the element visually but keeps it in the DOM (it\'s still rendered and consumes resources). Use lwc:if for conditional content (better performance). Use CSS hiding for elements that toggle frequently (avoids re-rendering cost).' },
      { scenario: 'Can you place lwc:elseif or lwc:else on non-template elements?', answer: 'Yes, since API version 59.0+, you can place lwc:if/elseif/else on any element, not just <template>. Example: <div lwc:if={isVisible}>Content</div>. This makes the code cleaner when you don\'t need the extra <template> wrapper. However, <template> elements are still useful when you need to conditionally render multiple sibling elements without a wrapper div.' },
      { scenario: 'What happens to component state when an element is removed by lwc:if and later re-added?', answer: 'When lwc:if removes an element, it\'s destroyed — including any child component instances and their state. When the condition becomes true again, a NEW instance is created with default state. This is important: if a child component had user input or internal state, it\'s lost. To preserve state across visibility toggles, either lift state to the parent, use CSS visibility instead, or use a shared store pattern.' }
    ]
  },

  '4.8': {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p><strong>Iteration</strong> in LWC allows you to render lists of items. You use the <code>template for:each</code> or <code>template iterator</code> directives to loop over arrays and render HTML for each item.</p>
      </div>
      <h3>The Key Attribute</h3>
      <p>When iterating, <strong>every element inside the loop must have a unique <code>key</code> attribute</strong>. This allows the LWC engine (and its virtual DOM) to efficiently track which items change, move, or are removed, without re-rendering the entire list.</p>
      <h3>for:each vs iterator</h3>
      <ul>
        <li><strong>for:each</strong>: Standard loop. Access the current item.</li>
        <li><strong>iterator</strong>: Advanced loop. Access the current item, plus <code>isFirst</code> and <code>isLast</code> boolean flags.</li>
      </ul>
    `,
    examples: [
      { title: 'Example 1: Standard for:each Loop', description: 'Looping through an array of objects.', code: `import { LightningElement } from 'lwc';

export default class ContactList extends LightningElement {
    contacts = [
        { id: '003_1', name: 'Amy Taylor', title: 'VP of Engineering' },
        { id: '003_2', name: 'Michael Jones', title: 'Sales Director' },
        { id: '003_3', name: 'Jennifer Wu', title: 'CEO' }
    ];
}

<!-- contactList.html -->
<template>
    <lightning-card title="Contact List">
        <ul class="slds-m-around_medium">
            <!-- Iterate over the contacts array -->
            <!-- for:item defines the variable for the current item -->
            <template for:each={contacts} for:item="contact">
                <!-- The key MUST be on the first element inside the template -->
                <li key={contact.id} class="slds-p-bottom_small">
                    <strong>{contact.name}</strong> - {contact.title}
                </li>
            </template>
        </ul>
    </lightning-card>
</template>`, language: 'javascript', explanation: 'The for:each directive takes the array, and for:item defines the variable name for each iteration. The key={...} attribute is mandatory on the top-level element inside the loop.' },
      { title: 'Example 2: Using the Iterator Directive', description: 'Applying special styling to the first and last items.', code: `import { LightningElement } from 'lwc';

export default class StepsList extends LightningElement {
    steps = [
        { id: 1, text: 'Collect Requirements' },
        { id: 2, text: 'Design Solution' },
        { id: 3, text: 'Implementation' },
        { id: 4, text: 'Testing & Deployment' }
    ];
}

<!-- stepsList.html -->
<template>
    <lightning-card title="Project Steps">
        <div class="slds-m-around_medium">
            <!-- iterator:it defines 'it' as the iterator object -->
            <template iterator:it={steps}>
                <!-- The value is accessed via it.value -->
                <!-- The key must be unique -->
                <div key={it.value.id} class="step-container">
                    
                    <!-- Conditional rendering using isFirst -->
                    <template lwc:if={it.isFirst}>
                        <span class="badge start-badge">START</span>
                    </template>
                    
                    <p>{it.value.text}</p>
                    
                    <!-- Conditional rendering using isLast -->
                    <template lwc:if={it.isLast}>
                        <span class="badge end-badge">FINISH</span>
                    </template>
                    
                </div>
            </template>
        </div>
    </lightning-card>
</template>`, language: 'javascript', explanation: 'The iterator directive creates an object (named "it" here) that contains properties: value (the current item), index (the array index), isFirst (boolean), and isLast (boolean). Useful for boundary styling.' },
      { title: 'Example 3: Iterating with Index', description: 'Accessing the array index during a loop.', code: `import { LightningElement } from 'lwc';

export default class Leaderboard extends LightningElement {
    players = [
        { id: 'p1', name: 'Player One', score: 9500 },
        { id: 'p2', name: 'Player Two', score: 8200 },
        { id: 'p3', name: 'Player Three', score: 7100 }
    ];
}

<!-- leaderboard.html -->
<template>
    <lightning-card title="Top Scores">
        <table class="slds-table slds-table_cell-buffer slds-table_bordered">
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody>
                <!-- for:index defines a variable for the current index (0-based) -->
                <template for:each={players} for:item="player" for:index="index">
                    <tr key={player.id}>
                        <!-- Display index (you might want to add 1 in JS if you want 1-based ranking) -->
                        <td>{index}</td>
                        <td>{player.name}</td>
                        <td>{player.score}</td>
                    </tr>
                </template>
            </tbody>
        </table>
    </lightning-card>
</template>`, language: 'javascript', explanation: 'Use the for:index attribute to assign the current array index to a variable. Note that the index is 0-based. If you need a 1-based rank, you cannot compute {index + 1} in HTML — you must map the array in JS first.' }
    ],
    practice: {
      intro: 'Practice building lists in LWC.',
      steps: [
        'Create a component with an array of products (id, name, price).',
        'Use for:each to render the products in a list.',
        'Forget the key attribute intentionally and observe the framework error.',
        'Add the key attribute using the product id.',
        'Switch to using the iterator directive.',
        'Use the isFirst and isLast properties to bold the first and last product names.'
      ],
      expectedOutcome: 'You should be able to render lists of data efficiently and understand the critical importance of the key attribute.'
    },
    interviewQuestions: [
      { scenario: 'Why is the key attribute required in LWC loops?', answer: 'The key attribute provides a unique identifier for each item in the DOM. When the underlying array changes (items added, removed, or reordered), the LWC virtual DOM engine uses the keys to determine exactly which DOM elements need to be updated, moved, or destroyed. Without keys, the engine would have to re-render the entire list, severely degrading performance. If you forget the key, the framework throws an error.' },
      { scenario: 'Can you use the loop index as the key attribute?', answer: 'You can, but it is highly discouraged as a best practice. If the array order changes (e.g., you sort the list or insert an item at the beginning), the indices of the items change. This breaks the virtual DOM\'s ability to track the elements efficiently and can lead to UI bugs (like the wrong row retaining focus or input state). Always use a unique identifier from your data (like a record Id) for the key.' },
      { scenario: 'What is the difference between for:each and iterator?', answer: 'for:each is a standard, lightweight loop that gives you access to the current item (for:item) and optionally the index (for:index). The iterator directive provides an iterator object that gives you the item (it.value), the index (it.index), AND boolean flags for boundaries (it.isFirst and it.isLast). Use for:each for standard lists, and iterator when you need to apply special logic to the first or last items.' },
      { scenario: 'Can you use lwc:if and for:each on the same <template> tag?', answer: 'No, this causes a compilation error. If you need to conditionally render a list, you must nest the templates. Put the lwc:if on an outer <template>, and the for:each on an inner <template>.' },
      { scenario: 'How do you format data (like adding 1 to the index) inside a loop?', answer: 'Because LWC HTML templates don\'t support expressions (like {index + 1}), you cannot format data directly in the template. Instead, you must process the array in JavaScript before rendering. For example, create a getter that maps the original array to a new array of objects that includes a computed "rank" or "displayIndex" property, and iterate over that new array.' }
    ]
  },

  '4.9': {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p><strong>Event Handling</strong> in LWC is the primary mechanism for component communication. Child components dispatch <strong>Custom Events</strong> upward, and parent components handle them. This follows the standard DOM event model.</p>
      </div>
      <h3>Communication Patterns</h3>
      <table>
        <thead><tr><th>Direction</th><th>Mechanism</th></tr></thead>
        <tbody>
          <tr><td>Parent → Child</td><td>@api properties and methods</td></tr>
          <tr><td>Child → Parent</td><td>Custom Events (dispatchEvent)</td></tr>
          <tr><td>Unrelated Components</td><td>Lightning Message Service (LMS)</td></tr>
        </tbody>
      </table>
    `,
    examples: [
      { title: 'Example 1: Custom Events', description: 'Child dispatches event, parent handles it.', code: `// ── CHILD: contactSelector.js ──
import { LightningElement, api } from 'lwc';

export default class ContactSelector extends LightningElement {
    @api contacts = [];
    
    handleSelect(event) {
        const contactId = event.currentTarget.dataset.id;
        const contact = this.contacts.find(c => c.Id === contactId);
        
        // Dispatch custom event with data
        this.dispatchEvent(new CustomEvent('contactselected', {
            detail: { contact },
            bubbles: false,     // Don't bubble up past parent
            composed: false     // Don't cross Shadow DOM boundaries
        }));
    }
}

// contactSelector.html
// <template for:each={contacts} for:item="contact">
//     <div key={contact.Id} data-id={contact.Id} onclick={handleSelect}>
//         {contact.Name}
//     </div>
// </template>

// ── PARENT: contactManager.html ──
// <c-contact-selector
//     contacts={contacts}
//     oncontactselected={handleContactSelected}>
// </c-contact-selector>

// contactManager.js
handleContactSelected(event) {
    const selectedContact = event.detail.contact;
    console.log('Selected:', selectedContact.Name);
    // Update parent state
    this.selectedContact = selectedContact;
}`, language: 'javascript', explanation: 'Events flow up (child → parent). The event name in HTML uses "on" prefix and is all lowercase: event "contactselected" → handler attribute "oncontactselected". The detail property carries data.' }
    ],
    practice: {
      intro: 'Build a parent-child communication system with events.',
      steps: [
        'Create a child component "colorPicker" with 4 color buttons.',
        'On click, dispatch a CustomEvent named "colorchange" with the selected color in detail.',
        'Create a parent component "colorDemo" that includes <c-color-picker>.',
        'Handle the oncolorchange event to update a div\'s background color.',
        'Add a counter that tracks how many times each color was selected.',
        'Test the event flow: clicking a color in the child should update the parent.',
        'Try passing data back to the child via @api based on the selection.'
      ],
      expectedOutcome: 'You should have a working parent-child communication system where the child dispatches events with data and the parent reacts by updating its UI.'
    },
    interviewQuestions: [
      { scenario: 'How do you pass data from child to parent in LWC?', answer: 'Use Custom Events. In the child, create and dispatch: this.dispatchEvent(new CustomEvent(\'myevent\', { detail: { key: value } })). In the parent HTML: <c-child onmyevent={handler}></c-child>. In the parent JS: handler(event) { const data = event.detail; }. Event names must be lowercase alphanumeric. Data goes in the detail property.' },
      { scenario: 'What is the difference between bubbles and composed in Custom Events?', answer: 'bubbles: if true, the event propagates up through the DOM tree (from child to grandparent and beyond). If false, only the direct parent can handle it. composed: if true, the event crosses Shadow DOM boundaries. If false, it stays within the component\'s shadow tree. For most LWC events, set both to false (default) — it\'s safer and more predictable. Use bubbles:true only when grandparent components need to catch the event.' },
      { scenario: 'How do unrelated components communicate in LWC?', answer: 'Use Lightning Message Service (LMS). Steps: 1) Create a Message Channel (metadata XML). 2) In the publisher component, import and publish: publish(this.messageContext, CHANNEL, { key: value }). 3) In the subscriber component, subscribe: subscribe(this.messageContext, CHANNEL, handler). LMS works across LWC, Aura, and Visualforce — making it ideal for cross-technology communication.' },
      { scenario: 'Can you prevent an event from propagating in LWC?', answer: 'Yes, using event.stopPropagation() in the handler. This prevents the event from bubbling further up the DOM tree. Also, event.preventDefault() prevents the default browser action (like form submission). In LWC, most custom events have bubbles=false by default, so they naturally don\'t propagate beyond the direct parent.' },
      { scenario: 'Why should event names be all lowercase in LWC?', answer: 'HTML attributes are case-insensitive and automatically lowercased by the browser. If you dispatch an event named "contactSelected", the handler attribute "oncontactSelected" becomes "oncontactselected" in the DOM, causing a mismatch. Always use all-lowercase event names (like "contactselected" or "itemclick") to avoid this browser behavior issue.' }
    ]
  },

  '4.10': {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p><strong>Component Composition</strong> is building complex UIs by assembling smaller, reusable components (parent/child relationships). <strong>Slots</strong> (<code>&lt;slot&gt;</code>) allow a parent component to pass markup into the body of a child component, enabling flexible wrapper components.</p>
      </div>
      <h3>Slots</h3>
      <ul>
        <li><strong>Unnamed (Default) Slot:</strong> <code>&lt;slot&gt;&lt;/slot&gt;</code> captures any markup not assigned to a specific slot.</li>
        <li><strong>Named Slots:</strong> <code>&lt;slot name="footer"&gt;&lt;/slot&gt;</code> captures markup passed with a matching <code>slot="footer"</code> attribute.</li>
      </ul>
    `,
    examples: [
      { title: 'Example: Named and Default Slots', description: 'Creating a reusable card wrapper component.', code: `// myCard.html (Child Component)
<template>
    <article class="slds-card">
        <div class="slds-card__header">
            <!-- Named slot for the header -->
            <header class="slds-media slds-media_center">
                <slot name="title">Default Title</slot>
            </header>
        </div>
        <div class="slds-card__body slds-card__body_inner">
            <!-- Default (unnamed) slot for the main content -->
            <slot>Default body content goes here.</slot>
        </div>
        <footer class="slds-card__footer">
            <!-- Named slot for the footer -->
            <slot name="footer"></slot>
        </footer>
    </article>
</template>

// parentPage.html (Parent Component using myCard)
<template>
    <c-my-card>
        <!-- Targeting the 'title' slot -->
        <h2 slot="title" class="slds-text-heading_small">Account Details</h2>
        
        <!-- Content with no slot attribute goes into the default slot -->
        <p>Name: Acme Corp</p>
        <p>Industry: Technology</p>
        
        <!-- Targeting the 'footer' slot -->
        <lightning-button slot="footer" label="View More" variant="brand"></lightning-button>
    </c-my-card>
</template>`, language: 'javascript', explanation: 'Slots allow you to build structural components (like modals, cards, layouts) that dictate WHERE content goes, while the parent component dictates WHAT the content is.' }
    ],
    practice: {
      intro: 'Practice using slots.',
      steps: [
        'Create a "customModal" component with named slots for "header", "body", and "footer".',
        'Add fallback content inside the slots in customModal.',
        'Create a parent component that uses customModal.',
        'Pass specific HTML into the header and footer slots.',
        'Pass a form into the default slot.'
      ],
      expectedOutcome: 'You understand how to build highly reusable wrapper components using slots.'
    },
    interviewQuestions: [
      { scenario: 'What is a slot in LWC?', answer: 'A slot is a placeholder in a child component\'s markup that a parent component can pass HTML markup into. It allows for component composition and flexible wrapper components (like modals or cards). You can have one unnamed (default) slot, and multiple named slots using the name attribute.' },
      { scenario: 'How do you provide fallback content for a slot?', answer: 'You simply place the fallback content inside the <slot> tags in the child component (e.g., <slot>Default Content</slot>). If the parent component does not provide any markup for that slot, the fallback content is rendered. If the parent provides markup, the fallback content is replaced.' }
    ]
  },

  '4.11': {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p><strong>Lightning Message Service (LMS)</strong> enables communication between unrelated components across the entire Lightning page. It can communicate across LWC, Aura, and Visualforce pages.</p>
      </div>
      <h3>How LMS Works</h3>
      <ol>
        <li>Create a <strong>Message Channel</strong> metadata file (<code>.messageChannel-meta.xml</code>).</li>
        <li><strong>Publisher</strong> component imports the channel and calls <code>publish()</code>.</li>
        <li><strong>Subscriber</strong> component imports the channel and calls <code>subscribe()</code>.</li>
      </ol>
    `,
    examples: [
      { title: 'Example: Publish and Subscribe', description: 'Communicating across the DOM.', code: `// 1. Message Channel Metadata (Record_Selected.messageChannel-meta.xml)
<?xml version="1.0" encoding="UTF-8"?>
<LightningMessageChannel xmlns="http://soap.sforce.com/2006/04/metadata">
    <masterLabel>RecordSelected</masterLabel>
    <isExposed>true</isExposed>
</LightningMessageChannel>

// 2. Publisher Component (publisher.js)
import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import RECORD_SELECTED_CHANNEL from '@salesforce/messageChannel/Record_Selected__c';

export default class Publisher extends LightningElement {
    @wire(MessageContext) messageContext;

    handleSelect(event) {
        const payload = { recordId: event.target.dataset.id };
        publish(this.messageContext, RECORD_SELECTED_CHANNEL, payload);
    }
}

// 3. Subscriber Component (subscriber.js)
import { LightningElement, wire } from 'lwc';
import { subscribe, unsubscribe, MessageContext } from 'lightning/messageService';
import RECORD_SELECTED_CHANNEL from '@salesforce/messageChannel/Record_Selected__c';

export default class Subscriber extends LightningElement {
    @wire(MessageContext) messageContext;
    subscription = null;
    selectedRecordId;

    connectedCallback() {
        this.subscription = subscribe(
            this.messageContext,
            RECORD_SELECTED_CHANNEL,
            (message) => this.handleMessage(message)
        );
    }

    handleMessage(message) {
        this.selectedRecordId = message.recordId;
    }

    disconnectedCallback() {
        unsubscribe(this.subscription);
    }
}`, language: 'javascript', explanation: 'LMS uses a publish/subscribe pattern mediated by a Message Channel. Always unsubscribe in disconnectedCallback to prevent memory leaks.' }
    ],
    practice: {
      intro: 'Implement LMS.',
      steps: [
        'Create a Message Channel XML file.',
        'Create a List component that publishes a selected ID.',
        'Create a Details component that subscribes to the channel and displays the ID.',
        'Place both components on a Lightning page and verify they communicate.'
      ],
      expectedOutcome: 'You can implement cross-component communication using LMS.'
    },
    interviewQuestions: [
      { scenario: 'When should you use LMS vs Custom Events?', answer: 'Use Custom Events for parent-child communication (events bubble up the DOM tree). Use Lightning Message Service (LMS) for unrelated components (siblings, components in different regions of the page) or when you need to communicate across LWC, Aura, and Visualforce frameworks. LMS is a publish/subscribe model that bypasses the DOM.' },
      { scenario: 'What is MessageContext in LMS?', answer: 'MessageContext provides information about the Lightning environment where the component is executing. It must be wired into the component (@wire(MessageContext)) and passed to the publish(), subscribe(), and unsubscribe() methods. It ensures messages are routed correctly within the current application context.' }
    ]
  },

  '4.12': {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p>The <strong>@wire decorator</strong> reads Salesforce data (Apex or Lightning Data Service) reactively. When the component loads or the parameters change, the wire adapter provisions the data automatically. Apex methods must be annotated with <code>@AuraEnabled(cacheable=true)</code> to be used with @wire.</p>
      </div>
      <h3>Two Ways to Wire Apex</h3>
      <ul>
        <li><strong>Wire to a property:</strong> Simpler, assigns data to <code>property.data</code> and errors to <code>property.error</code>.</li>
        <li><strong>Wire to a function:</strong> Gives you a callback to execute logic when new data arrives.</li>
      </ul>
    `,
    examples: [
      { title: 'Example 1: Wire to a Property', description: 'The simplest way to fetch data.', code: `// apexController.cls
public with sharing class AccountController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(String industry) {
        return [SELECT Id, Name FROM Account WHERE Industry = :industry];
    }
}

// lwcComponent.js
import { LightningElement, api, wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

export default class WireProperty extends LightningElement {
    @api recordIndustry; // Assume this gets set by a parent

    // The $ makes the parameter reactive. If recordIndustry changes, getAccounts fires again.
    @wire(getAccounts, { industry: '$recordIndustry' })
    accounts; // The result is stored in this.accounts.data and this.accounts.error
}

<!-- lwcComponent.html -->
<template>
    <template lwc:if={accounts.data}>
        <template for:each={accounts.data} for:item="acc">
            <p key={acc.Id}>{acc.Name}</p>
        </template>
    </template>
    <template lwc:elseif={accounts.error}>
        <p>Error loading accounts.</p>
    </template>
</template>`, language: 'javascript', explanation: 'Wiring to a property is great for simply displaying data. The template automatically checks accounts.data and accounts.error.' },
      { title: 'Example 2: Wire to a Function', description: 'Used when you need to process data before displaying it.', code: `import { LightningElement, api, wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

export default class WireFunction extends LightningElement {
    @api recordIndustry;
    processedAccounts;
    error;

    // Wire to a function. Receives an object with { error, data }
    @wire(getAccounts, { industry: '$recordIndustry' })
    wiredAccounts({ error, data }) {
        if (data) {
            // Process the data
            this.processedAccounts = data.map(acc => {
                return { ...acc, displayName: acc.Name.toUpperCase() };
            });
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.processedAccounts = undefined;
        }
    }
}`, language: 'javascript', explanation: 'Wiring to a function is necessary when you need to transform the data, fire an event based on the result, or perform complex logic when the data arrives.' }
    ],
    practice: {
      intro: 'Fetch data with @wire.',
      steps: [
        'Create an Apex controller with a cacheable method.',
        'Wire the method to a property and display the results in HTML.',
        'Change the wire to use a reactive parameter ($).',
        'Refactor to wire to a function and modify the data before displaying it.'
      ],
      expectedOutcome: 'You understand reactive data provisioning and the differences between wiring to a property vs a function.'
    },
    interviewQuestions: [
      { scenario: 'What does the $ prefix mean in @wire parameters?', answer: 'The $ makes the parameter dynamic (reactive). It tells the wire adapter to observe the component property. If the property value changes, the wire adapter automatically re-invokes the Apex method or LDS adapter with the new value. Without the $, the string is treated as a static literal value.' },
      { scenario: 'Why must Apex methods be cacheable=true to be used with @wire?', answer: '@wire provisions data reactively and continuously as parameters change. To prevent excessive database queries and improve performance, Salesforce requires the responses to be cached on the client. Therefore, @wire only works with methods marked @AuraEnabled(cacheable=true). Because it\'s cached, the method cannot perform DML operations.' }
    ]
  },

  '4.13': {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p><strong>Imperative Apex</strong> involves calling an Apex method directly via a standard JavaScript Promise, rather than using the reactive @wire service. Use it when you need to control <em>when</em> the invocation happens (e.g., button click) or when you need to perform DML (methods without cacheable=true).</p>
      </div>
    `,
    examples: [
      { title: 'Example: Imperative Call with async/await', description: 'Calling Apex on button click.', code: `// apexController.cls
public with sharing class ContactController {
    // Note: cacheable=true is NOT required for imperative calls
    @AuraEnabled
    public static void updateContactTitle(Id contactId, String newTitle) {
        update new Contact(Id = contactId, Title = newTitle);
    }
}

// lwcComponent.js
import { LightningElement, api } from 'lwc';
import updateContactTitle from '@salesforce/apex/ContactController.updateContactTitle';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ImperativeApex extends LightningElement {
    @api recordId;
    newTitle = 'Director';

    // Called on button click
    async handleUpdate() {
        try {
            // Imperative call returns a Promise
            await updateContactTitle({ 
                contactId: this.recordId, 
                newTitle: this.newTitle 
            });
            
            this.dispatchEvent(new ShowToastEvent({
                title: 'Success',
                message: 'Contact updated',
                variant: 'success'
            }));
        } catch (error) {
            this.dispatchEvent(new ShowToastEvent({
                title: 'Error updating record',
                message: error.body.message,
                variant: 'error'
            }));
        }
    }
}`, language: 'javascript', explanation: 'Imperative Apex returns a JavaScript Promise. The modern approach is to use async/await within a try/catch block. The Apex method does not need cacheable=true, allowing it to perform DML.' }
    ],
    practice: {
      intro: 'Execute Apex imperatively.',
      steps: [
        'Create an Apex method that performs an update (no cacheable=true).',
        'Create an LWC with a button.',
        'In the button handler, call the Apex method imperatively using async/await.',
        'Show a success toast if the Promise resolves, and an error toast if it rejects.'
      ],
      expectedOutcome: 'You know how to call Apex on-demand and handle Promises.'
    },
    interviewQuestions: [
      { scenario: 'When should you use Imperative Apex instead of @wire?', answer: 'Use Imperative Apex when: 1) You need to control exactly WHEN the call happens (e.g., form submission, button click). 2) The Apex method performs DML (insert/update/delete) and therefore cannot be cacheable=true. @wire should be the default for simply fetching data on component load, but imperative is required for actions and mutations.' }
    ]
  },

  '4.14': {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p><strong>Lightning Data Service (LDS)</strong> is the framework's built-in data layer. It provides wire adapters and UI components to read and modify Salesforce records without writing any Apex code. LDS handles caching, data consistency across components, and respects Field-Level Security.</p>
      </div>
      <h3>LDS Approaches</h3>
      <ul>
        <li><strong>Base Components:</strong> <code>lightning-record-form</code>, <code>lightning-record-view-form</code>, <code>lightning-record-edit-form</code> (Zero JS required).</li>
        <li><strong>Wire Adapters:</strong> <code>getRecord</code>, <code>getFieldValue</code> from <code>lightning/uiRecordApi</code>.</li>
      </ul>
    `,
    examples: [
      { title: 'Example 1: LDS Base Components', description: 'Creating forms without Apex.', code: `// recordFormDemo.js
import { LightningElement, api } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';

export default class RecordFormDemo extends LightningElement {
    @api recordId;
    @api objectApiName;
    fields = [NAME_FIELD, INDUSTRY_FIELD];
    
    handleSuccess(event) {
        console.log('Record updated: ' + event.detail.id);
    }
}

<!-- recordFormDemo.html -->
<template>
    <!-- Read-only view -->
    <lightning-record-form
        record-id={recordId}
        object-api-name={objectApiName}
        layout-type="Compact"
        mode="readonly">
    </lightning-record-form>

    <!-- Edit form with specific fields -->
    <lightning-record-form
        record-id={recordId}
        object-api-name={objectApiName}
        fields={fields}
        mode="edit"
        onsuccess={handleSuccess}>
    </lightning-record-form>
</template>`, language: 'javascript', explanation: 'lightning-record-form handles fetching, displaying, editing, and saving data automatically. It provides the highest productivity but least UI flexibility.' },
      { title: 'Example 2: getRecord Wire Adapter', description: 'Fetching record data in JS without Apex.', code: `import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/Contact.Name';
import TITLE_FIELD from '@salesforce/schema/Contact.Title';

export default class WireLDS extends LightningElement {
    @api recordId;

    // Use LDS to get the record instead of Apex
    @wire(getRecord, { recordId: '$recordId', fields: [NAME_FIELD, TITLE_FIELD] })
    contact;

    // Helper getters use getFieldValue for null-safe extraction
    get name() {
        return getFieldValue(this.contact.data, NAME_FIELD);
    }
    
    get title() {
        return getFieldValue(this.contact.data, TITLE_FIELD);
    }
}`, language: 'javascript', explanation: 'The getRecord adapter fetches data directly from the UI API. If another component updates this record via LDS, this component automatically receives the updated data via the shared LDS cache.' }
    ],
    practice: {
      intro: 'Use LDS to manage data.',
      steps: [
        'Create a component using lightning-record-edit-form.',
        'Use the getRecord wire adapter to fetch data in JS and display it in custom HTML.',
        'Observe how updating the record via the form automatically updates the wired data (LDS Cache).'
      ],
      expectedOutcome: 'You understand how to leverage LDS to avoid writing unnecessary Apex.'
    },
    interviewQuestions: [
      { scenario: 'What are the benefits of using Lightning Data Service (LDS) over Apex?', answer: '1) No Apex code to write or test. 2) Built-in caching: if two components request the same record, LDS queries the server once. 3) Data consistency: if one component updates a record, LDS automatically updates all other components displaying that record on the page. 4) Security: LDS automatically enforces object-level and field-level security based on the user\'s profile.' }
    ]
  },

  '4.15': {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p>The <strong>NavigationMixin</strong> is a utility that enables components to navigate in Lightning Experience, the Salesforce app, and Experience Builder sites without hardcoding URLs.</p>
      </div>
    `,
    examples: [
      { title: 'Example: Navigating to a Record Page', description: 'Standard navigation pattern.', code: `import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

// Component class must extend NavigationMixin(LightningElement)
export default class NavDemo extends NavigationMixin(LightningElement) {
    
    navigateToRecord() {
        // Use the[NavigationMixin.Navigate] method
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: '001xx000003DXXX',
                objectApiName: 'Account',
                actionName: 'view' // or 'edit'
            }
        });
    }
    
    navigateToWebPage() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: 'https://salesforce.com'
            }
        });
    }
}`, language: 'javascript', explanation: 'By extending NavigationMixin, you gain access to this[NavigationMixin.Navigate]. You pass it a PageReference object defining the destination type and attributes.' }
    ],
    practice: {
      intro: 'Implement navigation.',
      steps: [
        'Apply the NavigationMixin to a component.',
        'Create buttons that navigate to a specific record view, a list view, and an external URL.'
      ],
      expectedOutcome: 'You can programmatically navigate users throughout Salesforce.'
    },
    interviewQuestions: [
      { scenario: 'Why use NavigationMixin instead of window.location.href?', answer: 'window.location.href hardcodes URLs, which can change (e.g., switching between Classic, Lightning, or Mobile apps). NavigationMixin uses PageReferences (like "standard__recordPage") which the framework dynamically resolves to the correct URL format for the current environment. This ensures your navigation code works everywhere (desktop, mobile, communities) without breaking.' }
    ]
  }
};
