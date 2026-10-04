export const m4Part1 = {
  "4.1": {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 4.1 Introduction to LWC</p>
        <p><strong>Lightning Web Components (LWC)</strong> is Salesforce's modern UI framework. Unlike older frameworks that invented their own component models, LWC is built directly on native W3C Web Standards.</p>
      </div>
      <h3>Web Standards vs Proprietary Frameworks</h3>
      <p>Before 2019, the web lacked a native way to build reusable components, so frameworks like Aura had to invent proprietary rendering engines. Today, browsers natively support Custom Elements, Shadow DOM, and ES Modules. LWC acts as a thin layer over these native standards, making it incredibly fast and aligned with modern web development.</p>
      <h3>Shadow DOM & Component Model</h3>
      <p>The Shadow DOM is a web standard that strictly encapsulates a component. It acts as an invisible wall: CSS written inside the component cannot leak out and break the parent, and global CSS cannot leak in. Furthermore, when you build an LWC, you are building a standard HTML Custom Element (e.g., <code>&lt;c-my-component&gt;</code>) that the browser understands natively.</p>
    `,
    examples: [
      {
        title: 'Native Custom Elements',
        description: 'LWC components are just custom HTML tags.',
        language: 'javascript',
        code: `<!-- When you build 'heroBanner', you use it like a native tag -->
<c-hero-banner title="Welcome"></c-hero-banner>`,
        explanation: 'The browser treats this exactly like a standard <div> or <span>, because it uses the W3C Custom Elements spec.'
      },
      {
        title: 'Shadow DOM CSS Isolation',
        description: 'CSS rules stop at the Shadow Boundary.',
        language: 'css',
        code: `/* This rule ONLY applies to h1 tags inside THIS component */
h1 {
    color: #0176D3;
    font-size: 2rem;
}`,
        explanation: 'Because of Shadow DOM, you do not need to invent complex class names (like BEM methodology) to prevent CSS collisions.'
      },
      {
        title: 'Modern ES Modules',
        description: 'LWC relies on standard JavaScript imports and exports.',
        language: 'javascript',
        code: `import { LightningElement } from 'lwc';
import myHelper from 'c/myHelper'; // Importing another module

export default class MyApp extends LightningElement {
    // Standard ES6 class logic
}`,
        explanation: 'There is no proprietary controller syntax. It is 100% standard JavaScript.'
      }
    ],
            practice: {
      intro: 'Deep Dive: Exploring the LWC Architecture in your Org.',
      steps: [
        'Log into your Salesforce Developer Edition or Trailhead Playground org.',
        'Navigate to the Sales app and open any Account record.',
        'Click the gear icon and select "Edit Page" to open the Lightning App Builder.',
        'Look at the left sidebar under "Standard Components". Notice how these are built exactly like the custom components you will write.',
        'Drag the "Chatter" standard component onto the page and click Save.',
        'Return to the Account page. Press F12 to open Chrome Developer Tools.',
        'Right-click the Chatter feed and click "Inspect".',
        'In the Elements tab, locate the "#shadow-root (open)" node. Expand it and notice how the internal HTML elements and CSS are completely hidden from the main page DOM, protecting the component from external CSS collisions.',
        'Try to write a global CSS rule in the console (e.g., document.querySelector("body").style.color = "red") and notice how it does not affect the encapsulated shadow DOM text.'
      ],
      expectedOutcome: 'You will visually prove that Salesforce uses strict W3C Web Standards (Shadow DOM) for its UI, confirming LWC is not proprietary magic.'
    },
    interviewQuestions: [
      { scenario: 'What is the primary architectural difference between Aura and LWC?', answer: 'Aura relies on a heavy, proprietary JavaScript engine to manage components and rendering. LWC relies on the browser\'s native web stack (Custom Elements, Shadow DOM), making it significantly lighter and faster.' },
      { scenario: 'Explain what Shadow DOM is and why it is critical for enterprise applications.', answer: 'Shadow DOM encapsulates a component\'s internal markup and CSS. This prevents global CSS rules from accidentally altering a component\'s appearance, and stops component CSS from leaking out, ensuring absolute UI stability in large enterprise apps.' },
      { scenario: 'What is a Custom Element?', answer: 'A Web Standard that allows developers to define their own HTML tags with custom behavior. In LWC, a component named `contactCard` becomes `<c-contact-card>`.' },
      { scenario: 'Can you manipulate the DOM of a child component from a parent component using `querySelector`?', answer: 'No. The Shadow DOM boundary prevents standard `querySelector` calls from piercing into a child component\'s internals.' },
      { scenario: 'Does LWC work in browsers that do not support Shadow DOM?', answer: 'Yes, Salesforce provides a synthetic Shadow DOM polyfill for older browsers, though almost all modern browsers support it natively now.' }
    ]
  },
  "4.2": {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 4.2 Dev Environment Setup</p>
        <p>LWC development requires a local toolchain. You cannot build or edit Lightning Web Components directly in the Salesforce Developer Console.</p>
      </div>
      <h3>The Essential Toolchain</h3>
      <p>Your environment must include <strong>Visual Studio Code (VS Code)</strong>, the <strong>Salesforce CLI (sf)</strong>, and the <strong>Salesforce Extension Pack</strong>. This combination provides code completion, linting, and seamless deployment to your orgs.</p>
      <h3>SFDX Project Structure</h3>
      <p>LWC uses the Source-Driven Development model. When you initialize a project using the CLI, it generates an SFDX workspace. This structure breaks massive metadata files into granular, human-readable source files optimized for Git and CI/CD workflows.</p>
      <h3>Debugging Configurations</h3>
      <p>To effectively troubleshoot in your org, you must enable <strong>Debug Mode</strong> for your user in Salesforce Setup. This forces the platform to serve unminified, readable JavaScript to your browser\'s Developer Tools.</p>
    `,
    examples: [
      {
        title: 'Authenticating with the CLI',
        description: 'Connecting your local VS Code environment to a Salesforce Org.',
        language: 'bash',
        code: `sf org login web --set-default --alias devOrg`,
        explanation: 'This command opens a browser window for OAuth login, securely saving the connection token locally.'
      },
      {
        title: 'Generating an SFDX Project',
        description: 'Scaffolding the local workspace.',
        language: 'bash',
        code: `sf project generate --name my-lwc-project --template standard
cd my-lwc-project`,
        explanation: 'This creates the force-app/main/default folder structure required for source-driven development.'
      },
      {
        title: 'Creating an LWC Component',
        description: 'Generating the boilerplate files.',
        language: 'bash',
        code: `sf lightning generate component --name contactList --output-dir force-app/main/default/lwc`,
        explanation: 'Automatically scaffolds the HTML, JS, and XML files required for a valid component.'
      }
    ],
            practice: {
      intro: 'Environment Mastery: Setting up a professional local toolchain.',
      steps: [
        'Install the latest version of Salesforce CLI (sf) from developer.salesforce.com.',
        'Install Visual Studio Code (VS Code) and add the "Salesforce Extension Pack" from the extensions marketplace.',
        'Open VS Code, press Ctrl+Shift+P (Cmd+Shift+P on Mac), and execute "SFDX: Create Project". Choose "Standard", name it "LwcMastery", and select a folder.',
        'Press Ctrl+Shift+P again and execute "SFDX: Authorize an Org". Select "Project Default" (login.salesforce.com) and give it the alias "devOrg".',
        'A browser window will open. Log in to your developer org and allow access.',
        'In VS Code, verify the bottom left status bar shows your org alias.',
        'In your org, go to Setup -> "Debug Mode", search for your username, check the box, and click Enable.',
        'Return to VS Code, press Ctrl+Shift+P, and run "SFDX: Create Lightning Web Component". Name it "helloWorld" and place it in the default directory (force-app/main/default/lwc).',
        'Right-click the new "helloWorld" folder and select "SFDX: Deploy Source to Org". Ensure the output terminal shows a successful deployment.'
      ],
      expectedOutcome: 'A fully functional local development environment connected to a live org with unminified debug mode active for troubleshooting.'
    },
    interviewQuestions: [
      { scenario: 'Why is the Developer Console incapable of editing LWCs?', answer: 'The Developer Console does not support modern ES6 tooling, ESLint validation, or the multi-file bundle structure required for LWC compilation. Salesforce enforces local development to align with standard industry practices.' },
      { scenario: 'What does enabling "Debug Mode" actually do?', answer: 'It instructs the Salesforce Lightning framework to stop minifying and obfuscating JavaScript for your user session. This allows you to read your actual source code and place breakpoints in Chrome DevTools.' },
      { scenario: 'What is the purpose of the Salesforce Extension Pack?', answer: 'It provides IDE integrations including Apex/LWC language servers (for autocomplete), ESLint rules, and UI wrappers around the Salesforce CLI so you can right-click to deploy.' },
      { scenario: 'What is Source Format versus Metadata Format?', answer: 'Source Format breaks large configuration files into smaller, granular files optimized for Git version control. Metadata Format is the older, monolithic XML format used by the Metadata API.' },
      { scenario: 'What happens if you deploy an LWC without enabling Debug Mode, and an error occurs?', answer: 'The error stack trace will point to highly obfuscated, single-letter variables (minified code), making it virtually impossible to debug the root cause.' }
    ]
  },
  "4.3": {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 4.3 LWC Project Structure</p>
        <p>An LWC is not a single file; it is a tightly coupled <strong>Component Bundle</strong>. The framework enforces strict naming conventions to associate the files.</p>
      </div>
      <h3>The Component Bundle</h3>
      <p>A component folder (e.g., <code>myComponent</code>) must contain files with the exact same base name. The three mandatory files are: the HTML template (<code>myComponent.html</code>), the JavaScript logic (<code>myComponent.js</code>), and the Metadata XML (<code>myComponent.js-meta.xml</code>). An optional CSS file (<code>myComponent.css</code>) can be included for styling.</p>
      <h3>The HTML Template</h3>
      <p>The UI is defined inside a root <code>&lt;template&gt;</code> tag. This tag is a native HTML5 feature that holds markup without rendering it immediately, allowing the LWC engine to inject it into the DOM securely.</p>
      <h3>The Meta XML</h3>
      <p>The <code>.js-meta.xml</code> file is the bridge between your code and the Salesforce Platform. It dictates where the component can be used (e.g., App Pages, Record Pages, Experience Cloud) and defines properties that Admins can configure in the Lightning App Builder.</p>
    `,
    examples: [
      {
        title: 'Strict Naming Convention',
        description: 'All files must share the exact folder name.',
        language: 'javascript',
        code: `myDashboardWidget/
  ├── myDashboardWidget.html      // UI
  ├── myDashboardWidget.js        // Controller
  ├── myDashboardWidget.css       // Optional Styles
  └── myDashboardWidget.js-meta.xml // Org Config`,
        explanation: 'If you rename the JS file to just "widget.js", the Salesforce compiler will reject the deployment.'
      },
      {
        title: 'The HTML Root Template',
        description: 'All markup must be wrapped in a template tag.',
        language: 'javascript',
        code: `<!-- myDashboardWidget.html -->
<template>
    <div class="widget-container">
        <h1>Dashboard</h1>
    </div>
</template>`,
        explanation: 'The framework replaces the <template> tag with the Custom Element host tag (<c-my-dashboard-widget>) at runtime.'
      },
      {
        title: 'Configuring Targets in XML',
        description: 'Exposing the component to the Lightning App Builder.',
        language: 'javascript',
        code: `<?xml version="1.0" encoding="UTF-8"?>
<LightningComponentBundle xmlns="http://soap.sforce.com/2006/04/metadata">
    <apiVersion>59.0</apiVersion>
    <isExposed>true</isExposed>
    <masterLabel>Dashboard Widget</masterLabel>
    <targets>
        <target>lightning__RecordPage</target>
        <target>lightning__AppPage</target>
    </targets>
</LightningComponentBundle>`,
        explanation: 'Without isExposed="true" and specific targets, Admins will never see this component in the UI builders.'
      }
    ],
            practice: {
      intro: 'Bundle Architecture: Scaffolding and deploying a component to the UI.',
      steps: [
        'In VS Code, create a new LWC named "orgInfoBanner". Notice it creates 3 files: orgInfoBanner.html, orgInfoBanner.js, and orgInfoBanner.js-meta.xml.',
        'Open orgInfoBanner.html and add:\n<div class="banner">Welcome to the Org!</div>',
        'Open orgInfoBanner.js and verify it imports LightningElement and exports a default class.',
        'Open orgInfoBanner.js-meta.xml. This is the crucial step to make it visible to Admins.',
        'Change <isExposed>false</isExposed> to <isExposed>true</isExposed>.',
        'Immediately below <masterLabel>, add a targets block:\n<targets>\n    <target>lightning__HomePage</target>\n    <target>lightning__RecordPage</target>\n</targets>',
        'Deploy the component (Right-click -> Deploy Source to Org).',
        'Log into your Org, navigate to the Sales App Home Page, click the Gear Icon -> Edit Page.',
        'Look under "Custom" components on the left. Drag "orgInfoBanner" onto the canvas, save, and activate.'
      ],
      expectedOutcome: 'You will successfully bridge the gap between local code and the Salesforce drag-and-drop admin interface using the XML configuration file.'
    },
    interviewQuestions: [
      { scenario: 'What are the three mandatory files required for an LWC UI component to deploy successfully?', answer: 'The HTML template file (`.html`), the JavaScript class file (`.js`), and the metadata configuration file (`.js-meta.xml`).' },
      { scenario: 'Can a component bundle contain more than one JavaScript file?', answer: 'Yes. While the main controller must match the folder name, you can add auxiliary JS files (e.g., `helper.js`) to the bundle and import them into your main controller to organize complex logic.' },
      { scenario: 'What is the purpose of the `<isExposed>` tag in the `.js-meta.xml` file?', answer: 'It determines whether the component is visible to standard Salesforce UI tools like the Lightning App Builder or Experience Builder. If false, the component can only be used programmatically as a child of another LWC.' },
      { scenario: 'If you want a component to be used as a Quick Action, what target must you specify?', answer: 'You must add `<target>lightning__RecordAction</target>` to the `.js-meta.xml` file.' },
      { scenario: 'Why does all HTML in LWC start with a `<template>` tag?', answer: 'The `<template>` tag is a W3C web standard used to declare fragments of HTML that are parsed by the browser but not rendered immediately. The LWC engine uses this to securely construct the component\'s Shadow DOM at runtime.' }
    ]
  },
  "4.4": {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 4.4 Templates & Data Binding</p>
        <p>LWC enforces <strong>One-Way Data Binding</strong>. Data strictly flows from the JavaScript controller to the HTML template using expressions defined by curly braces <code>{}</code>.</p>
      </div>
      <h3>Dynamic Rendering without Inline Logic</h3>
      <p>You cannot write logic inside the HTML (e.g., <code>{price * quantity}</code> is strictly invalid). All logic must reside in the JavaScript file, typically implemented via a <strong>Getter</strong> method. This forces a clean separation of concerns: HTML handles presentation, JS handles computation.</p>
      <h3>Attribute Binding</h3>
      <p>Curly braces are used to bind JS properties to HTML attributes. For boolean attributes (like <code>disabled</code> or <code>readonly</code>), binding a JS property that evaluates to <code>false</code> will completely remove the attribute from the DOM element, matching native HTML5 behavior.</p>
      <h3>DOM Access with lwc:ref</h3>
      <p>Instead of using <code>this.template.querySelector()</code>, which scans the DOM at runtime, modern LWC uses the <code>lwc:ref</code> directive. This creates a direct memory pointer during compilation, allowing instant, high-performance access to HTML elements in your JS.</p>
    `,
    examples: [
      {
        title: 'Standard Data Binding',
        description: 'Binding text and attributes.',
        language: 'javascript',
        code: `<template>
    <!-- Text binding -->
    <h1>Welcome, {userName}!</h1>
    
    <!-- Attribute binding -->
    <div title={hoverText}>Hover here</div>
    
    <!-- Boolean attribute binding -->
    <button disabled={isFormLocked}>Save</button>
</template>`,
        explanation: 'If isFormLocked is false, the disabled attribute vanishes from the button entirely.'
      },
      {
        title: 'Using Getters for Logic',
        description: 'Keeping logic out of the template.',
        language: 'javascript',
        code: `import { LightningElement } from 'lwc';

export default class Cart extends LightningElement {
    price = 10;
    qty = 2;

    // The Getter performs the computation
    get totalCost() {
        return (this.price * this.qty).toFixed(2);
    }
}
/* In HTML, simply use: <p>Total: {totalCost}</p> */`,
        explanation: 'The getter is automatically re-evaluated whenever this.price or this.qty changes.'
      },
      {
        title: 'Using lwc:ref',
        description: 'High-performance DOM manipulation.',
        language: 'javascript',
        code: `<!-- HTML -->
<canvas lwc:ref="myCanvas"></canvas>

/* JS */
drawChart() {
    // Instant access via this.refs
    const canvas = this.refs.myCanvas;
    const ctx = canvas.getContext('2d');
    ctx.fillRect(0, 0, 100, 100);
}`,
        explanation: 'lwc:ref is significantly faster than querySelector. Note: it cannot be used inside for:each loops.'
      }
    ],
            practice: {
      intro: 'Data Binding: Building a reactive calculator form.',
      steps: [
        'Create a new LWC named "reactiveCalculator".',
        'In the HTML file, create two input fields:\n<lightning-input type="number" label="Price" onchange={handlePriceChange}></lightning-input>\n<lightning-input type="number" label="Quantity" onchange={handleQtyChange}></lightning-input>',
        'Below the inputs, add an H1 tag to display the total:\n<h1>Total Cost: {totalCost}</h1>',
        'Add a button that is conditionally disabled based on invalid input:\n<lightning-button disabled={isInvalid} label="Checkout"></lightning-button>',
        'In the JS file, declare two properties:\nprice = 0;\nqty = 0;',
        'Write the event handlers:\nhandlePriceChange(event) { this.price = event.target.value; }\nhandleQtyChange(event) { this.qty = event.target.value; }',
        'Create the getter for totalCost:\nget totalCost() { return this.price * this.qty; }',
        'Create the getter for isInvalid:\nget isInvalid() { return this.price <= 0 || this.qty <= 0; }',
        'Deploy, add to a page, and test. Notice how the total updates instantly and the button disables/enables dynamically without any querySelector logic.'
      ],
      expectedOutcome: 'Mastery of unidirectional data flow: HTML triggering JS events, and JS getters automatically updating HTML.'
    },
    interviewQuestions: [
      { scenario: 'Why does LWC throw a syntax error if you attempt to write `<div if="{age > 18}">`?', answer: 'LWC enforces a strict separation of concerns. Inline HTML expressions are forbidden. All logic must reside in the JavaScript file (using Getter functions). This makes the logic fully unit-testable via Jest.' },
      { scenario: 'What is the architectural advantage of `lwc:ref` over `querySelector`?', answer: '`querySelector` forces the browser to scan the DOM tree at runtime to find matches, which is computationally expensive. `lwc:ref` establishes a direct memory pointer during component compilation, providing instant O(1) access to the element.' },
      { scenario: 'Can you use `lwc:ref` to reference an element generated dynamically inside a `for:each` loop?', answer: 'No. `lwc:ref` requires a static, 1-to-1 mapping. For dynamically generated elements in a loop, you must rely on `querySelectorAll`.' },
      { scenario: 'Does LWC support two-way data binding (like `ng-model` in Angular)?', answer: 'No, LWC is strictly one-way (JS to HTML). To pass data from the HTML back to JS, you must use event listeners (e.g., `onchange`) to manually update the JS properties.' },
      { scenario: 'Are JavaScript Getters cached in LWC?', answer: 'No. Unlike computed properties in Vue.js, LWC getters execute every single time the component re-renders. You must avoid placing heavy computations (like complex array sorting) inside getters.' }
    ]
  },
  "4.5": {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 4.5 Decorators: @api, @track, & @wire</p>
        <p>Decorators in LWC drastically alter the behavior of JavaScript class properties. They are imported directly from the core <code>lwc</code> library.</p>
      </div>
      <h3>The @api Decorator</h3>
      <p>By default, properties are private to the component. <code>@api</code> makes a property public. It allows parent components to inject data downward. <strong>Rule of thumb:</strong> A component cannot mutate its own <code>@api</code> property; they are strictly read-only within the child.</p>
      <h3>The @track Decorator</h3>
      <p>Since Spring '20, all primitive properties (strings, booleans) are reactive automatically when reassigned. However, if you have a complex Object or Array, changing an internal value (e.g., <code>myObj.name = 'John'</code>) will NOT trigger a re-render because the memory reference didn\'t change. <code>@track</code> forces the framework to observe these deep internal mutations.</p>
      <h3>The @wire Decorator</h3>
      <p>The <code>@wire</code> decorator provisions data natively from Salesforce. It creates a reactive stream: if a dynamic parameter passed to the wire changes, the service automatically re-executes to fetch fresh data.</p>
    `,
    examples: [
      {
        title: '@api: Public Properties',
        description: 'Exposing properties to parents and App Builder.',
        language: 'javascript',
        code: `import { LightningElement, api } from 'lwc';

export default class ChildHeader extends LightningElement {
    // Parent can pass data via <c-child-header title="Hello">
    @api title;
    
    changeTitle() {
        // ILLEGAL! You cannot mutate your own @api property
        // this.title = 'New Title'; 
    }
}`,
        explanation: 'To allow admins to set this value in the Lightning App Builder, you must also define it in the .js-meta.xml targetConfigs.'
      },
      {
        title: '@track: Deep Object Mutation',
        description: 'Tracking internal changes to arrays/objects.',
        language: 'javascript',
        code: `import { LightningElement, track } from 'lwc';

export default class Tracker extends LightningElement {
    // Array requires track if we intend to mutate its contents
    @track tasks = [ { id: 1, done: false } ];

    completeTask() {
        // Deep mutation: changing a property inside the array
        // Without @track, the UI would not update!
        this.tasks[0].done = true; 
    }
}`,
        explanation: 'If you did not want to use @track, you would have to completely reassign the array memory reference: this.tasks = [...this.tasks].'
      },
      {
        title: '@wire: Reactive Data Provisioning',
        description: 'Fetching data without writing imperative Apex.',
        language: 'javascript',
        code: `import { LightningElement, api, wire } from 'lwc';
import getAccounts from '@salesforce/apex/Controller.getAccounts';

export default class WireDemo extends LightningElement {
    @api recordId;

    // The '$' prefix makes recordId reactive.
    // If the page injects a new ID, the wire automatically re-runs.
    @wire(getAccounts, { relatedId: '$recordId' })
    accounts; // Populates accounts.data and accounts.error
}`,
        explanation: 'Data provisioned by @wire is heavily cached and strictly immutable (read-only).'
      }
    ],
            practice: {
      intro: 'Deep Reactivity: Proving when to use @track vs reassignment.',
      steps: [
        'Create a new LWC named "deepTracker".',
        'In the JS file, import LightningElement (do NOT import @track yet).',
        'Create a property containing an array of objects:\ntaskList = [{id: 1, name: "Wash Car"}];',
        'In the HTML, iterate over taskList using <template for:each={taskList} for:item="task"> and display {task.name}.',
        'Add a button:\n<lightning-button label="Add Task (Push)" onclick={handlePush}></lightning-button>',
        'In JS, write handlePush():\nhandlePush() {\n    this.taskList.push({id: 2, name: "Mow Lawn"});\n    console.log(this.taskList);\n}',
        'Deploy and click the button. Look at the console—the array HAS the new item, but the UI did NOT update because the memory reference of the array didn\'t change.',
        'Now add a second button calling handleReassign(). Write:\nhandleReassign() {\n    this.taskList = [...this.taskList, {id: 3, name: "Buy Groceries"}];\n}',
        'Deploy and click Reassign. The UI instantly updates! This proves reassignment triggers reactivity.',
        'Finally, import @track, add it to taskList (@track taskList), deploy, and click the "Push" button. It now works because @track observes deep mutations.'
      ],
      expectedOutcome: 'A concrete understanding of JavaScript memory references, deep mutation vs shallow reactivity, and the exact necessity of @track.'
    },
    interviewQuestions: [
      { scenario: 'If you declare a primitive string `greeting = "Hi"`, do you need to use `@track` for the UI to update when it changes?', answer: "No. Since Spring '20, all primitive properties are reactive by default when their value is reassigned." },
      { scenario: 'Can a child component update the value of its own `@api` property?', answer: 'No. Properties decorated with `@api` are strictly read-only from the perspective of the component that owns them. Only the parent component (or the framework via App Builder) can assign a value to them.' },
      { scenario: 'What is the purpose of the `$` prefix in a `@wire` configuration parameter?', answer: 'It designates the parameter as dynamic and reactive. It binds the wire service directly to a class property. If the value of that property changes, the wire service automatically re-executes to fetch fresh data.' },
      { scenario: 'When manipulating an array, how can you trigger reactivity WITHOUT using `@track`?', answer: 'By completely reassigning the array\'s memory reference. Instead of mutating it with `.push(newItem)`, you create a new array using the spread operator: `this.myArray = [...this.myArray, newItem]`.' },
      { scenario: 'Is data returned by `@wire` mutable?', answer: 'No. The data object returned by the `@wire` service is strictly read-only to protect the Lightning Data Service cache. If you attempt to mutate it (e.g., `data.push(x)`), it will throw a severe runtime error. You must deep clone it first.' }
    ]
  }
};
