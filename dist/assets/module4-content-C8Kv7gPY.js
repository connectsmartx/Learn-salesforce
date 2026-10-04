const e={"4.1":{theory:`
      <div class="callout callout--definition">
        <p class="callout__title">📘 4.1 LWC Architecture & Web Standards</p>
        <p><strong>Lightning Web Components (LWC)</strong> represents a fundamental paradigm shift in how Salesforce developers build UIs. Instead of relying on a heavy, proprietary framework like Aura, LWC is built directly on native W3C Web Standards.</p>
      </div>
      <h3>The End of Proprietary Frameworks</h3>
      <p>Historically, Aura had to invent its own component model, rendering engine, and event system because the web lacked these natively in 2014. By 2019, modern browsers natively supported <strong>Custom Elements</strong>, <strong>Shadow DOM</strong>, <strong>HTML Templates</strong>, and <strong>ES Modules</strong>. LWC is essentially a thin abstraction layer on top of these native capabilities. This makes LWC incredibly lightweight, drastically faster, and aligns your skills with standard web development.</p>
      <h3>Shadow DOM & Encapsulation</h3>
      <p>The Shadow DOM is a web standard that encapsulates a component's internal structure and CSS. In LWC, if you write a CSS rule like <code>h1 { color: red; }</code>, the Shadow DOM ensures it <em>only</em> applies to the <code>h1</code> tags inside that specific component, completely protecting it from bleeding into other components or being overridden by global styles. This strict boundary is why you cannot use standard <code>querySelector</code> to pierce into child components.</p>
      <h3>Custom Elements</h3>
      <p>When you create an LWC, you are essentially defining a new HTML tag (a Custom Element) that the browser understands. When you name your component <code>myHeroBanner</code>, it is instantiated in the DOM as <code>&lt;c-my-hero-banner&gt;</code>.</p>
    `,examples:[{title:"Complete Component Bundle Structure",description:"Every LWC is comprised of a tightly coupled bundle of files. The framework enforces strict naming conventions: all files must share the exact same base name as the folder they reside in.",language:"javascript",code:`myFirstLwc/
  ├── myFirstLwc.html      // The UI template (HTML5)
  ├── myFirstLwc.js        // The logic (ES6 JavaScript class)
  ├── myFirstLwc.css       // The styles (Scoped CSS)
  └── myFirstLwc.js-meta.xml // The configuration for Salesforce App Builder`,explanation:"If the folder is named myFirstLwc, the files MUST match exactly. The CSS file is optional, but the HTML, JS, and XML are mandatory for UI components."},{title:"The JavaScript Controller (ES Module)",description:"The JS file must export a default class that extends LightningElement. This exposes the native web component lifecycle and LWC decorators.",language:"javascript",code:`import { LightningElement } from 'lwc';

export default class MyFirstLwc extends LightningElement {
    // Properties defined here are reactive by default
    greeting = 'Welcome to Modern LWC';
    
    // Standard getter to compute values dynamically
    get uppercaseGreeting() {
        return this.greeting.toUpperCase();
    }
}`,explanation:"Notice the use of standard ES6 syntax: import, export default class, and getters. There is no proprietary syntax here, just standard JavaScript."},{title:"The Metadata Configuration (.js-meta.xml)",description:"This XML file determines where and how the component can be deployed within the Salesforce platform.",language:"xml",code:`<?xml version="1.0" encoding="UTF-8"?>
<LightningComponentBundle xmlns="http://soap.sforce.com/2006/04/metadata">
    <apiVersion>59.0</apiVersion>
    <isExposed>true</isExposed>
    <masterLabel>My First Component</masterLabel>
    <description>A demonstration of LWC architecture.</description>
    <targets>
        <target>lightning__RecordPage</target>
        <target>lightning__AppPage</target>
        <target>lightning__HomePage</target>
    </targets>
</LightningComponentBundle>`,explanation:"Without isExposed set to true and specific targets defined, your component will be completely invisible to Salesforce Admins in the Lightning App Builder."}],practice:{intro:"Practice in the Org: Scaffold and Deploy your first LWC.",steps:['1. Open VS Code and press Ctrl+Shift+P to open the Command Palette. Select "SFDX: Create Project" and create a standard project.','2. Authenticate to your Dev Hub or Trailhead Playground using "SFDX: Authorize an Org".',"3. Use the CLI command: sf lightning generate component --name myFirstLwc --output-dir force-app/main/default/lwc","4. Open the generated .js-meta.xml file, set <isExposed>true</isExposed>, and add <target>lightning__HomePage</target> inside the <targets> tag.",'5. Right-click the component folder and select "SFDX: Deploy Source to Org".','6. Log into your Salesforce Org, go to the Sales App, click the gear icon -> Edit Page, and drag "My First Component" onto the canvas.'],expectedOutcome:"You have successfully navigated the entire end-to-end flow of scaffolding locally, configuring metadata, deploying via CLI, and rendering the component natively in the Lightning UI."},interviewQuestions:[{scenario:"Explain the difference between LWC and Aura from an architectural standpoint.",answer:"Aura is a heavyweight framework that relies on a proprietary component model and rendering engine. LWC is a lightweight abstraction layer built directly on native W3C web standards (Custom Elements, HTML Templates, Shadow DOM). This makes LWC drastically faster and easier to test."},{scenario:"What is Shadow DOM and why does Salesforce enforce it in LWC?",answer:"Shadow DOM is a standard that encapsulates a component's internal DOM and CSS. Salesforce enforces it to guarantee that components are fully isolated. A global CSS rule will not break a component's UI, and a component's CSS will not leak out and break the main application."},{scenario:"Can you use a third-party DOM manipulation library like jQuery in LWC?",answer:`While technically possible using lwc:dom="manual", it is heavily discouraged. Because LWC uses a Virtual DOM and Shadow DOM, third-party libraries that attempt to manipulate the DOM directly will conflict with LWC's rendering engine, causing massive performance and sync issues.`},{scenario:"What is the role of the LightningElement base class?",answer:"LightningElement is a custom wrapper around the standard HTMLElement. It provisions the LWC lifecycle hooks (connectedCallback, etc.), reactivity system, and the Shadow DOM API for the component."},{scenario:"How do you make an LWC available for use in Salesforce Flow?",answer:"You must configure the .js-meta.xml file. Set <isExposed>true</isExposed> and add <target>lightning__FlowScreen</target> to the targets array."}]},"4.2":{theory:`
      <div class="callout callout--definition">
        <p class="callout__title">📘 4.2 Dev Environment, Tooling & Debugging</p>
        <p>Unlike Apex or Visualforce, you <strong>cannot</strong> create or edit Lightning Web Components directly in the Salesforce Developer Console. You must use a local development environment.</p>
      </div>
      <h3>The Essential Toolchain</h3>
      <p>Professional LWC development requires a specific set of tools working in harmony. The <strong>Salesforce CLI (sf)</strong> acts as the bridge between your local machine and the Salesforce servers. <strong>Visual Studio Code (VS Code)</strong> is the officially supported IDE, and the <strong>Salesforce Extension Pack</strong> provides the language servers, linting, and command palette integrations.</p>
      <h3>Source-Driven Development</h3>
      <p>LWC development heavily utilizes Source Format (SFDX format). Unlike traditional metadata format where all objects are grouped in giant XML files, source format breaks metadata down into smaller, granular files. This is specifically designed to make Git version control and CI/CD pipelines function smoothly.</p>
      <h3>Debugging in the Browser</h3>
      <p>Because LWC code is executed entirely in the client's browser, debugging requires the browser's DevTools (F12). However, Salesforce minifies and obfuscates JavaScript in production. To debug effectively, you must enable "Debug Mode" for your user in the Salesforce Setup, which serves unminified, readable JavaScript to the browser.</p>
    `,examples:[{title:"Authorizing an Org via CLI",description:"Before you can deploy code, your local environment must establish a secure OAuth connection to the Salesforce org.",language:"bash",code:`# Using the modern 'sf' CLI executable
sf org login web --set-default --alias myDevBox`,explanation:"This command opens your default web browser, asks you to log into Salesforce, grants OAuth permissions to the CLI, and saves an access token locally. The --alias makes it easy to reference this org later."},{title:"Deploying Code to the Org",description:"You do not zip files up manually. You use the CLI to push delta changes.",language:"bash",code:`# Deploy a specific component directory
sf project deploy start --source-dir force-app/main/default/lwc/myFirstLwc

# Or run tests before deploying
sf project deploy start --source-dir force-app --test-level RunLocalTests`,explanation:"The CLI packages the source files, converts them to metadata format in memory, pushes them to the Metadata API, and reports compilation errors in your terminal."},{title:"Enabling LWC Debug Mode in JS",description:"When Debug Mode is enabled in Salesforce, you can use standard browser debugging techniques in your LWC JS.",language:"javascript",code:`export default class DebugDemo extends LightningElement {
    handleDataLoad(data) {
        // Use console.table for arrays of objects
        console.table(data);
        
        // Force the browser debugger to pause execution here
        debugger; 
        
        this.processData(data);
    }
}`,explanation:'The "debugger;" statement acts as a hardcoded breakpoint. If Chrome DevTools is open, execution will freeze exactly on that line, allowing you to inspect the call stack and local variables.'}],practice:{intro:"Practice in the Org: Master the debugging flow.",steps:['1. Log into your Salesforce Org, go to Setup, search for "Debug Mode", and check the box next to your User record.',"2. In VS Code, create a component with a button that calls a JS method.",'3. Inside the JS method, add a console.log("Button clicked") and a "debugger;" statement on the next line.',"4. Deploy the component, add it to a Lightning Page, and open the page in Google Chrome.","5. Press F12 to open Chrome DevTools. Click your component button.",'6. Watch the browser freeze execution. Inspect the "Sources" tab to see your actual unminified LWC code.'],expectedOutcome:"You know exactly how to halt execution and inspect variables in the browser, which is the only way to effectively troubleshoot complex LWC logic errors."},interviewQuestions:[{scenario:"Why can't you write LWC in the Developer Console?",answer:"The Developer Console does not support the modern ES6 tooling, ESLint validation, or the file structure required for LWC compilation. Salesforce forces local development via CLI to enforce modern source-driven development practices."},{scenario:'What does enabling "Debug Mode" for a user in Salesforce actually do?',answer:"It tells the Lightning framework to bypass JavaScript minification and obfuscation for that specific user. It serves raw, unminified source maps to the browser, allowing the developer to read and debug the actual JS code they wrote."},{scenario:"What is the purpose of the Salesforce Extension Pack in VS Code?",answer:"It provides language servers for Apex, SOQL, and LWC, auto-completion, ESLint rules specifically tuned for LWC, and a visual interface for CLI commands (like right-click deploy)."},{scenario:"What is a Scratch Org and when should you use it?",answer:"A Scratch Org is a disposable, temporary Salesforce environment spun up entirely from source code via the CLI. It is used in CI/CD pipelines and feature-branch development to ensure a clean slate."},{scenario:"If your LWC is not updating in the browser after a successful deployment, what is the most likely cause?",answer:"The browser or the Lightning framework is aggressively caching the old JavaScript bundle. You must disable caching in Salesforce Setup (Session Settings) and perform a hard refresh (Ctrl+Shift+R) in the browser."}]},"4.3":{theory:`
      <div class="callout callout--definition">
        <p class="callout__title">📘 4.3 Component Lifecycle Hooks</p>
        <p>LWC provides specific callback methods (hooks) that allow you to execute logic at precise moments during a component's lifecycle: from creation in memory, to insertion in the DOM, to removal from the DOM.</p>
      </div>
      <h3>The Creation Phase</h3>
      <p>The <code>constructor()</code> is called when the component is first instantiated in memory. At this point, the component is completely blind. It has no access to the DOM, it hasn't received public properties (<code>@api</code>) from its parent yet, and its template doesn't exist. You must call <code>super()</code> as the very first line.</p>
      <h3>The Insertion Phase</h3>
      <p><code>connectedCallback()</code> fires exactly when the component's host element is inserted into the document DOM. This is the most crucial hook. Here, public properties have been populated by the parent, making it the perfect place to subscribe to message channels, perform initial calculations, or imperatively fetch data from Apex.</p>
      <h3>The Rendering Phase</h3>
      <p><code>renderedCallback()</code> fires after the component's template logic has been rendered. If you need to use <code>this.template.querySelector()</code> to manipulate a child DOM element or initialize a third-party library (like Chart.js), you must do it here because the elements finally exist. However, be extremely careful: modifying a reactive variable inside this hook triggers a re-render, which fires the hook again, causing an infinite loop.</p>
      <h3>The Destruction Phase</h3>
      <p><code>disconnectedCallback()</code> fires when the component is removed from the DOM (e.g., when an <code>lwc:if</code> condition turns false). You must use this to clean up memory: remove <code>window</code> event listeners, clear intervals, and unsubscribe from Lightning Message Service (LMS).</p>
    `,examples:[{title:"connectedCallback: Initialization",description:"This is the standard place to execute setup logic that depends on data passed from the parent.",language:"javascript",code:`import { LightningElement, api } from 'lwc';

export default class LifecycleDemo extends LightningElement {
    @api recordId;
    derivedValue;

    connectedCallback() {
        // recordId is guaranteed to be populated here if passed by the parent
        console.log('Component inserted into DOM. ID: ' + this.recordId);
        
        // Safe to initialize internal state
        this.derivedValue = 'Processed: ' + this.recordId;
    }
}`,explanation:"Do not attempt to read @api variables in the constructor, they will be undefined. connectedCallback is the correct place."},{title:"renderedCallback: DOM Manipulation & Guarding",description:"Executing logic that requires the HTML elements to actually exist on the screen, while preventing infinite loops.",language:"javascript",code:`import { LightningElement } from 'lwc';

export default class RenderDemo extends LightningElement {
    hasRendered = false; // Guard flag

    renderedCallback() {
        // If we don't guard this, any state change would loop infinitely
        if (this.hasRendered) {
            return;
        }
        
        // Now we can safely interact with the DOM
        const canvas = this.template.querySelector('canvas');
        if(canvas) {
            // Initialize 3rd party library here
            // initializeChartJs(canvas);
        }
        
        this.hasRendered = true; // Set flag to prevent future executions
        console.log('First render complete.');
    }
}`,explanation:"Because renderedCallback fires every time the UI updates, a boolean flag is strictly required if you only want to execute DOM setup logic once."},{title:"disconnectedCallback: Memory Cleanup",description:"Preventing memory leaks by cleaning up global listeners.",language:"javascript",code:`import { LightningElement } from 'lwc';

export default class CleanupDemo extends LightningElement {
    
    connectedCallback() {
        // Adding an event listener to the global window object
        this.handleResize = this.onResize.bind(this);
        window.addEventListener('resize', this.handleResize);
    }

    onResize() {
        console.log('Window resized!');
    }

    disconnectedCallback() {
        // MUST remove the global listener, otherwise it stays in memory forever
        window.removeEventListener('resize', this.handleResize);
        console.log('Component destroyed, memory cleaned.');
    }
}`,explanation:"If a parent component hides this child using lwc:if={false}, the component is destroyed. If the window listener isn't removed, the browser leaks memory."}],practice:{intro:"Practice in the Org: Observe the execution order.",steps:["1. Create a parent component and a child component.","2. In the parent HTML, use a checkbox bound to an lwc:if directive to conditionally render the child component.","3. In the child component JS, implement constructor(), connectedCallback(), renderedCallback(), and disconnectedCallback().","4. Inside every hook, add a console.log() statement indicating which hook fired.","5. Deploy and open the browser console. Check and uncheck the box in the UI.","6. Observe the exact order of logs when the component is created, and observe disconnectedCallback firing when it is destroyed."],expectedOutcome:"You will visually prove that connectedCallback fires before renderedCallback, and that toggling DOM visibility dictates creation and destruction."},interviewQuestions:[{scenario:"Why is it dangerous to update a reactive property inside renderedCallback()?",answer:"Updating a reactive property tells the framework the UI needs to be updated. When the UI updates, renderedCallback() is fired again. This results in an infinite loop that will crash the browser. Always use a boolean guard flag (e.g., isRendered = true) to prevent this."},{scenario:"In which lifecycle hook should you subscribe to the Lightning Message Service (LMS)?",answer:"You should subscribe in connectedCallback(), because the component is fully initialized and in the DOM. You MUST unsubscribe in disconnectedCallback() to prevent memory leaks."},{scenario:"Why can't you access elements using this.template.querySelector() inside connectedCallback()?",answer:"During connectedCallback(), the component has been inserted into the DOM hierarchy, but its internal HTML template has not yet been parsed and rendered. The elements literally do not exist yet. You must wait for renderedCallback()."},{scenario:"What is the errorCallback() hook?",answer:"It is a specialized hook that acts as an Error Boundary. It catches JavaScript errors that occur in the lifecycle hooks or event handlers of any descendant (child) components, allowing the parent to display a fallback UI instead of crashing the entire page."},{scenario:"If a parent and child both have connectedCallback(), which one fires first?",answer:"The parent's connectedCallback() fires first, followed by the child's connectedCallback(). The flow goes top-down for connection, but bottom-up for renderedCallback (child renders before parent finishes rendering)."}]},"4.4":{theory:`
      <div class="callout callout--definition">
        <p class="callout__title">📘 4.4 HTML Templates & One-Way Data Binding</p>
        <p>LWC enforces strict one-way data binding. Data flows from the JavaScript controller to the HTML template. The HTML template cannot contain complex logic or expressions.</p>
      </div>
      <h3>No Inline Logic</h3>
      <p>In older frameworks (like Angular or Visualforce), you could write logic directly in the UI: <code>&lt;div if="{count &gt; 5}"&gt;</code>. LWC strictly prohibits this. The HTML can only bind to properties or getters. If you need logic, you must write a Getter function in the JavaScript. This forces a clean separation of concerns, making your business logic testable via Jest without needing to render the DOM.</p>
      <h3>Attribute vs Property Binding</h3>
      <p>You bind JS variables to HTML text using curly braces <code>{myText}</code>. To bind to an HTML attribute (like disabled or class), you use the same syntax: <code>&lt;button disabled={isLocked}&gt;</code>. Note that for boolean HTML attributes (like disabled or readonly), passing <code>false</code> will entirely remove the attribute from the DOM element, which is the correct native HTML behavior.</p>
      <h3>Direct DOM Access via lwc:ref</h3>
      <p>While <code>this.template.querySelector('.my-class')</code> works, it forces the browser to scan the DOM tree at runtime, which is slow. LWC provides the <code>lwc:ref</code> directive, which allows you to tag an element in HTML and access it instantly in JS via <code>this.refs</code>. This is resolved at compile time and is significantly faster.</p>
    `,examples:[{title:"Basic Property & Boolean Binding",description:"Binding text content and element state to JS properties.",language:"markup",code:`<!-- HTML Template -->
<template>
    <!-- Text binding -->
    <p>Welcome, {userName}</p>
    
    <!-- Attribute binding -->
    <div title={hoverTooltip}>Hover over me</div>
    
    <!-- Boolean attribute binding -->
    <button disabled={isProcessing} onclick={handleClick}>Submit</button>
</template>`,explanation:"In the JS, if isProcessing is true, the button is disabled. If isProcessing is false, the disabled attribute is removed entirely."},{title:"Handling Logic with JS Getters",description:"Since you cannot write {price * quantity} in HTML, you use a Getter.",language:"javascript",code:`import { LightningElement } from 'lwc';

export default class CartItem extends LightningElement {
    price = 15.50;
    quantity = 3;

    // This acts like a computed property
    get totalCost() {
        // Logic belongs in JS, not HTML
        return (this.price * this.quantity).toFixed(2);
    }
}
// In HTML, you simply bind to {totalCost}`,explanation:"The getter is automatically re-evaluated by the LWC framework anytime the properties it depends on (price or quantity) are mutated."},{title:"High Performance DOM access with lwc:ref",description:"The modern replacement for querySelector.",language:"markup",code:`<!-- HTML -->
<template>
    <canvas lwc:ref="chartCanvas"></canvas>
    <button onclick={drawChart}>Draw</button>
</template>

/* JavaScript */
drawChart() {
    // Instant O(1) memory access, no DOM scanning required
    const canvasEl = this.refs.chartCanvas;
    const ctx = canvasEl.getContext('2d');
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, 150, 75);
}`,explanation:"lwc:ref is strictly for elements in your own template. You cannot use it to pierce into child components or access elements inside a for:each loop."}],practice:{intro:"Practice in the Org: Build a Dynamic Calculator UI.",steps:['1. Create a component with two lightning-input fields (type="number") for Width and Height.',"2. Bind their onchange events to update JS properties (width and height).",'3. Create a JS getter named "area" that multiplies width and height.','4. Create another getter "isInvalid" that returns true if area <= 0.',"5. In the HTML, display the {area} in a div, and add a Save <lightning-button> with disabled={isInvalid}.","6. Deploy and test. Watch the button instantly enable/disable as you type numbers."],expectedOutcome:"You will understand that Getters are automatically reactive and that boolean binding handles HTML attributes natively."},interviewQuestions:[{scenario:'Why does LWC throw a syntax error if you try to write <div if="{user.age > 18}">?',answer:"LWC strictly forbids inline expressions in HTML to enforce a separation of concerns. All logic must reside in the JavaScript file, typically using a Getter function. This makes the logic unit-testable."},{scenario:"What is the difference between querySelector and lwc:ref?",answer:"querySelector executes a runtime scan of the DOM tree to find matches, which is slower. lwc:ref creates a direct memory pointer during component compilation, providing instant O(1) access to the element."},{scenario:"Can you use lwc:ref inside a template for:each loop?",answer:"No. The lwc:ref directive requires a static, 1-to-1 mapping between the template and the JS. Elements generated dynamically in a loop cannot use lwc:ref; you must use querySelectorAll for those."},{scenario:"What happens if you assign false to a disabled attribute like disabled={isLocked}?",answer:'The framework completely removes the "disabled" attribute from the HTML DOM node. It does not render disabled="false", because in standard HTML, the mere presence of the disabled attribute (even if set to "false") disables the element.'},{scenario:"Are JS Getters cached in LWC?",answer:"Unlike Vue.js computed properties which cache their results, LWC getters are executed every single time the component re-renders. Therefore, you should never perform heavy computations (like complex array filtering) directly inside a getter."}]},"4.5":{theory:`
      <div class="callout callout--definition">
        <p class="callout__title">📘 4.5 Core Decorators: @api, @track, @wire</p>
        <p>Decorators in LWC dynamically alter the behavior of JavaScript properties. They are imported directly from the 'lwc' core library.</p>
      </div>
      <h3>The @api Decorator (Public Properties & Methods)</h3>
      <p>By default, all properties in a JS class are private to that component. Adding <code>@api</code> exposes the property to the outside world. It allows parent components to pass data down, or allows the Lightning App Builder to inject configuration data. <strong>Crucially:</strong> A component is not allowed to mutate its own <code>@api</code> properties; they are strictly read-only within the child.</p>
      <h3>The @track Decorator (Deep Observation)</h3>
      <p>Since Spring '20, all primitive properties (strings, booleans, numbers) are reactive by default. If you reassign them, the UI updates. However, if you have a complex Object or Array, modifying a nested property (e.g., <code>this.user.name = 'Bob'</code> or <code>this.myArray.push(1)</code>) will <strong>not</strong> trigger a UI update because the memory reference of the object didn't change. <code>@track</code> forces the framework to observe deep mutations inside the object structure.</p>
      <h3>The @wire Decorator (Reactive Data Streams)</h3>
      <p>The <code>@wire</code> decorator provisions data from Salesforce natively. It creates a reactive stream: if the parameters passed to the wire change, the wire automatically re-executes and fetches fresh data. This is heavily integrated with the Lightning Data Service (LDS) cache.</p>
    `,examples:[{title:"@api: Exposing Configuration",description:"Exposing a property so an Admin can set its value in the Lightning App Builder.",language:"javascript",code:`import { LightningElement, api } from 'lwc';

export default class HeaderBanner extends LightningElement {
    // The value can be set by the parent, or via App Builder
    @api bannerColor = 'blue';
    @api bannerText = 'Default Title';
    
    // You CANNOT do this:
    // this.bannerText = 'New Title'; // Throws an error!
}`,explanation:"To expose these to the App Builder, they must also be defined in the .js-meta.xml file under the <targetConfigs> node."},{title:"@track: Mutating Complex Objects",description:'Solving the "UI not updating" issue when manipulating arrays and objects.',language:"javascript",code:`import { LightningElement, track } from 'lwc';

export default class TrackDemo extends LightningElement {
    // Without @track, pushing to this array will NOT update the UI
    @track tasks = [
        { id: 1, label: 'Review Code', isDone: false }
    ];

    markDone() {
        // Deep mutation: changing an inner property of an object inside an array
        this.tasks[0].isDone = true; 
        
        // Deep mutation: adding to the array without reassigning it
        this.tasks.push({ id: 2, label: 'Deploy', isDone: false });
    }
}`,explanation:"If you did not want to use @track, you would have to completely reassign the array memory reference: this.tasks = [...this.tasks, newTask]. @track handles it automatically."},{title:"@wire: Fetching Record Data",description:"Using @wire to declaratively pull data without writing a single line of Apex.",language:"javascript",code:`import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/Account.Name';

export default class RecordViewer extends LightningElement {
    @api recordId; // Injected by the Lightning Record Page

    // Reactive wire: executes automatically when recordId is populated
    @wire(getRecord, { recordId: '$recordId', fields: [NAME_FIELD] })
    account; // Populates account.data and account.error

    get name() {
        return getFieldValue(this.account.data, NAME_FIELD);
    }
}`,explanation:'The "$" prefix tells the wire service that recordId is dynamic. When the component loads, recordId is undefined. Once the page injects the ID, the wire reacts and fetches the data.'}],practice:{intro:"Practice in the Org: See reactivity in action.",steps:['1. Create a component with a simple array of strings: `myList = ["Alpha", "Beta"]`.',"2. In the HTML, render the list using a template for:each loop.",'3. Create a button that calls a method `addItem()` which does `this.myList.push("Gamma")`.',"4. Deploy and click the button. Notice the UI does NOT update (even though the console will show the array changed).","5. Add `@track myList` to the JS file. Deploy and click the button again. The UI now updates.",'6. Remove `@track`, and change the logic to `this.myList = [...this.myList, "Gamma"]`. Deploy and see that it also updates without @track!'],expectedOutcome:"You will deeply understand the difference between deep mutation (requires @track) and memory reference reassignment (reactive by default)."},interviewQuestions:[{scenario:'If you have a primitive variable `greeting = "Hello"`, do you need to decorate it with @track for the UI to update when you change it?',answer:"No. Since Spring 20, all primitive properties (strings, numbers, booleans) are reactive by default when their value is reassigned."},{scenario:'A child component defines `@api status`. Can the child component run `this.status = "Complete"`?',answer:"No. Properties decorated with @api are strictly read-only within the component that defines them. Only the parent component (or the framework via App Builder) can assign a value to an @api property."},{scenario:'What does the "$" symbol do when passed into a @wire parameter, like `{ recordId: "$recordId" }`?',answer:"It designates the parameter as reactive. It tells the Wire service to observe the `recordId` property. If `recordId` changes at any point, the Wire service will automatically re-execute the request with the new ID."},{scenario:"Is @track always required when updating an Array?",answer:"No. If you mutate the array (e.g., using .push() or .splice()), you must use @track. However, if you completely reassign the array (e.g., this.myArray = [...this.myArray, newItem]), the memory reference changes, which triggers reactivity automatically without @track."},{scenario:"How do you expose an @api property to the Lightning App Builder so an Admin can configure it?",answer:"You must define the property in the JS file with @api, AND you must define it in the .js-meta.xml file under the <targetConfigs> -> <targetConfig> -> <property> tags, specifying its type and label."}]}},t={"4.6":{theory:`
      <div class="callout callout--definition">
        <p class="callout__title">📘 4.6 Parent to Child Communication</p>
        <p>In LWC, data strictly flows downwards from a Parent component to a Child component. This is achieved using Public Properties (via the <code>@api</code> decorator) and Public Methods.</p>
      </div>
      <h3>Passing Data Downward</h3>
      <p>When a child exposes a property via <code>@api userName;</code>, the parent passes data into it through HTML attributes. Because HTML attributes are case-insensitive, LWC automatically translates camelCase JavaScript properties into kebab-case HTML attributes. Thus, <code>userName</code> in JS becomes <code>user-name</code> in the HTML tag.</p>
      <h3>Executing Logic on Data Changes</h3>
      <p>Often, a child component needs to perform an action <em>exactly when</em> the parent passes it new data (e.g., fetching new details from the server when a new ID is received). You cannot use <code>renderedCallback</code> for this because it fires too often. Instead, you define the <code>@api</code> property using a JavaScript Getter and Setter. The Setter executes your custom logic precisely when the new value arrives.</p>
      <h3>Calling Child Methods Imperatively</h3>
      <p>While data-driven declarative UI is preferred, sometimes a parent needs to force a child to execute an action (e.g., resetting a form or playing an animation). The child exposes a function using <code>@api myMethod() { ... }</code>. The parent uses <code>this.template.querySelector('c-child')</code> to get a reference to the child, and then directly invokes <code>child.myMethod()</code>.</p>
    `,examples:[{title:"Declarative Data Passing (Kebab-case)",description:"The parent injects data into the child directly in the HTML template.",language:"markup",code:`<!-- Parent HTML -->
<template>
    <!-- We bind the parent's JS variable 'currentUser' to the child's 'user-record' attribute -->
    <c-user-profile user-record={currentUser} is-active="true"></c-user-profile>
</template>

/* Child JS */
import { LightningElement, api } from 'lwc';
export default class UserProfile extends LightningElement {
    // Camel case in JS maps to kebab-case in HTML
    @api userRecord;
    @api isActive; 
}`,explanation:"Always remember: camelCase in JavaScript becomes kebab-case in HTML. userRecord -> user-record."},{title:"Intercepting Property Changes (Get/Set)",description:"Executing logic exactly when the parent provides new data.",language:"javascript",code:`import { LightningElement, api } from 'lwc';

export default class DetailsViewer extends LightningElement {
    // Private backing variable
    _recordId;

    @api
    get recordId() {
        return this._recordId;
    }

    set recordId(value) {
        // Intercept the new value
        this._recordId = value;
        
        // Execute logic reacting to the change
        if(value) {
            this.fetchServerData(value);
        }
    }

    fetchServerData(id) {
        console.log('Fetching data for: ', id);
    }
}`,explanation:"The @api decorator sits above the getter. The setter intercepts the assignment. This pattern is essential for triggering server calls when a parent provides a new ID."},{title:"Imperative Method Invocation",description:"The parent directly commands the child to perform an action.",language:"javascript",code:`/* Child JS */
import { LightningElement, api } from 'lwc';
export default class VideoPlayer extends LightningElement {
    @api 
    playVideo() {
        console.log('Playing video...');
        // logic to play video
    }
}

/* Parent JS */
import { LightningElement } from 'lwc';
export default class Dashboard extends LightningElement {
    handleStart() {
        // Find the child element in the DOM
        const player = this.template.querySelector('c-video-player');
        if (player) {
            // Invoke the public @api method
            player.playVideo();
        }
    }
}`,explanation:"While this works, overusing it leads to tightly coupled code. Prefer passing data down instead of imperatively calling methods when possible."}],practice:{intro:"Practice in the Org: Pass objects and trigger actions.",steps:['1. Create a Child component with an @api property "customerData" and an @api method "resetView()".',"2. In the Child HTML, display the customerData.Name.","3. Create a Parent component that houses the Child.","4. In the Parent JS, create a JSON object and pass it to the Child in the HTML using customer-data={myObj}.","5. Add a button in the Parent. In the button's onclick handler, use querySelector to find the Child and call resetView().","6. Deploy and test to see the data flow down and the method execute."],expectedOutcome:"You will master the concept of kebab-case attribute translation and cross-component method invocation."},interviewQuestions:[{scenario:"If a child defines `@api accountName`, how do you pass data to it from the parent HTML?",answer:"You must use kebab-case for the attribute in the parent HTML: `<c-child-component account-name={myValue}></c-child-component>`."},{scenario:"Why should you use Getter/Setter pairs with @api instead of using connectedCallback to initialize data?",answer:"connectedCallback only fires once when the component is inserted. If the parent updates the data later, connectedCallback will NOT fire again. A Getter/Setter intercepts every single change, making it reliable for reacting to ongoing data updates."},{scenario:"Can an `@api` method return a value back to the parent?",answer:"Yes. An @api method is just a standard JavaScript function. It can return synchronous data (like a string or boolean) or return a Promise for asynchronous operations."},{scenario:"What happens if a parent tries to pass an attribute that the child did not explicitly decorate with @api?",answer:"The framework will drop the attribute entirely. The child will not receive the data, and it will not appear on the child's host element in the DOM."},{scenario:"Is it better to update the child's state via @api properties or by calling @api methods?",answer:"It is highly recommended to use declarative @api properties (passing data). Imperatively calling methods creates tight coupling and makes the UI state harder to track. Methods should be reserved for distinct actions (like focusing an input or playing a video)."}]},"4.7":{theory:`
      <div class="callout callout--definition">
        <p class="callout__title">📘 4.7 Child to Parent Communication</p>
        <p>While data flows down, events flow up. A child component communicates with its parent by dispatching standard DOM <code>CustomEvent</code>s. The parent listens for these events.</p>
      </div>
      <h3>The CustomEvent API</h3>
      <p>LWC relies on the native browser CustomEvent API. When a child needs to send a message (e.g., "I was clicked" or "Here is the selected ID"), it creates a new CustomEvent and dispatches it. The name of the event must be entirely lowercase (e.g., <code>select</code>, not <code>onSelect</code> or <code>myEvent</code>), because HTML attributes are case-insensitive.</p>
      <h3>Passing Data (Event Detail)</h3>
      <p>To send data payload along with the event, you must place it inside the <code>detail</code> property of the CustomEvent configuration object. In the parent's handler, you extract it via <code>event.detail</code>.</p>
      <h3>Event Bubbling and Retargeting</h3>
      <p>By default, custom events do not bubble up the DOM tree—they stop at the parent. If you set <code>bubbles: true</code>, the event travels up through the ancestor hierarchy. However, because of Shadow DOM encapsulation, the browser applies <strong>Event Retargeting</strong>. When an event bubbles out of the child's shadow tree, the <code>event.target</code> changes to the child's host element. This prevents the parent from seeing the private internal HTML structure of the child.</p>
    `,examples:[{title:"Dispatching an Event with Data",description:"The child fires an event containing a payload.",language:"javascript",code:`/* Child JS */
handleItemClick(event) {
    const selectedId = '001xx000003Dxxx'; // Mock ID
    
    // Create the event. Name must be lowercase!
    const myEvent = new CustomEvent('recordselect', {
        detail: { recordId: selectedId }
    });
    
    // Fire it up to the parent
    this.dispatchEvent(myEvent);
}`,explanation:'Always put your payload inside the "detail" object. Do not try to attach properties directly to the event object.'},{title:"Listening in the Parent HTML",description:"The parent declaratively listens for the event.",language:"markup",code:`<!-- Parent HTML -->
<template>
    <!-- Prefix the event name with 'on' -->
    <c-child-list onrecordselect={handleSelection}></c-child-list>
</template>

/* Parent JS */
handleSelection(event) {
    // Extract the data from the detail object
    const id = event.detail.recordId;
    console.log('Parent received ID: ', id);
}`,explanation:'The child dispatched "recordselect". In HTML, the parent listens using "on" + "recordselect" = "onrecordselect".'},{title:"Bubbling Events",description:"Allowing an event to travel up multiple levels (Grandparent).",language:"javascript",code:`/* Grandchild JS */
notifyUpperLevels() {
    // bubbles allows it to pass through the direct parent
    // composed allows it to cross the Shadow DOM boundary completely
    const evt = new CustomEvent('globalalert', {
        bubbles: true,
        composed: true,
        detail: { msg: 'System Failure' }
    });
    this.dispatchEvent(evt);
}`,explanation:"Use bubbling sparingly. Using composed: true breaks encapsulation (the event leaks into the global DOM) and is considered an anti-pattern unless absolutely necessary. Use LMS instead."}],practice:{intro:"Practice in the Org: Build an event-driven hierarchy.",steps:["1. Create a Child component with a list of names. Render them using a for:each loop.",'2. Add an onclick handler to the <li> tags in the Child. In the handler, dispatch a "userselect" event containing the name in the detail payload.',"3. Create a Parent component hosting the Child. Add onuserselect={handleSelect} to the tag.","4. In the Parent JS, read event.detail and display the selected name in a large header tag.","5. Deploy and test. Clicking a name in the child should instantly update the parent."],expectedOutcome:"Complete understanding of how state propagates upward via events and payload extraction."},interviewQuestions:[{scenario:"Why must CustomEvent names be exclusively lowercase?",answer:'Because HTML attributes are case-insensitive. If a child dispatches an event named "myCustomEvent", the browser will attempt to match it to an attribute. A parent listening with `onmyCustomEvent={...}` will fail because the browser converts the attribute to `onmycustomevent`. Lowercase ensures strict matching.'},{scenario:"What is Event Retargeting in the context of Shadow DOM?",answer:"When a child component fires a bubbling event from an internal element (like a button), and that event crosses the Shadow DOM boundary to the parent, the browser alters the `event.target` property to point to the child host element `<c-child>`, hiding the internal `<button>` from the parent to preserve encapsulation."},{scenario:"Where exactly must you store your custom data payload when dispatching a CustomEvent?",answer:"The data must be stored within the `detail` property of the configuration object passed as the second argument to `new CustomEvent(eventName, { detail: { ... } })`."},{scenario:"What does setting `composed: true` do on a CustomEvent?",answer:"It allows the event to break through the Shadow Root boundary and continue bubbling up the global HTML document tree. Without it, the event stops at the boundary of the Shadow DOM it was fired within."},{scenario:"Why does Salesforce generally discourage the use of `composed: true`?",answer:"It breaks encapsulation. A component should not broadcast events to the entire document, as it leads to spaghetti architecture where unrelated components accidentally catch events. For cross-component communication, Lightning Message Service (LMS) should be used instead."}]},"4.8":{theory:`
      <div class="callout callout--definition">
        <p class="callout__title">📘 4.8 Lightning Message Service (LMS)</p>
        <p>LMS is a standard Publish/Subscribe (Pub/Sub) API that allows completely unrelated components (siblings, cousins, or components in different regions of the page) to communicate.</p>
      </div>
      <h3>The Cross-Framework Bridge</h3>
      <p>Before LMS, developers used a custom Pub/Sub JavaScript file that only worked within LWC. LMS is built into the Salesforce platform and allows communication not just between LWCs, but also between LWC, Aura Components, and Visualforce pages. This makes it the definitive choice for complex app architectures.</p>
      <h3>Message Channels</h3>
      <p>LMS operates on defined channels. Before you can publish or subscribe, you must create a Metadata file (a <code>.messageChannel-meta.xml</code>) and deploy it to the org. This acts as a strongly-typed contract for the communication stream.</p>
      <h3>The Message Context</h3>
      <p>To use LMS in LWC, you must import the <code>MessageContext</code>. This context ties the LMS message to the current Lightning Application's runtime scope, ensuring that your messages don't accidentally bleed into a different Lightning App running in another tab.</p>
    `,examples:[{title:"Defining the Metadata Channel",description:"You must deploy this file first (typically stored in force-app/main/default/messageChannels).",language:"xml",code:`<?xml version="1.0" encoding="UTF-8"?>
<LightningMessageChannel xmlns="http://soap.sforce.com/2006/04/metadata">
    <masterLabel>SampleMessageChannel</masterLabel>
    <isExposed>true</isExposed>
    <description>Used to broadcast account selections.</description>
    <lightningMessageFields>
        <fieldName>recordId</fieldName>
        <description>The ID of the selected account</description>
    </lightningMessageFields>
</LightningMessageChannel>`,explanation:"This defines the schema of the channel. The isExposed tag makes it available across the org."},{title:"Publishing a Message",description:"Component A sends data to the channel.",language:"javascript",code:`import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import SAMPLE_CHANNEL from '@salesforce/messageChannel/SampleMessageChannel__c';

export default class Publisher extends LightningElement {
    // Wire the context
    @wire(MessageContext)
    messageContext;

    handleBroadcast() {
        const payload = { recordId: '001xxx' };
        // Publish requires: Context, Channel, Payload
        publish(this.messageContext, SAMPLE_CHANNEL, payload);
    }
}`,explanation:"The MessageContext is required so the platform knows where the event originated."},{title:"Subscribing and Unsubscribing",description:"Component B listens to the channel, and strictly cleans up after itself.",language:"javascript",code:`import { LightningElement, wire } from 'lwc';
import { subscribe, unsubscribe, MessageContext } from 'lightning/messageService';
import SAMPLE_CHANNEL from '@salesforce/messageChannel/SampleMessageChannel__c';

export default class Subscriber extends LightningElement {
    @wire(MessageContext)
    messageContext;
    
    subscription = null; // Store reference to allow unsubscribe

    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                SAMPLE_CHANNEL,
                (message) => this.handleMessage(message)
            );
        }
    }

    handleMessage(message) {
        console.log('Received ID: ', message.recordId);
    }

    disconnectedCallback() {
        // PREVENT MEMORY LEAKS
        unsubscribe(this.subscription);
        this.subscription = null;
    }
}`,explanation:"If you fail to unsubscribe in disconnectedCallback, the anonymous function stays in memory forever. If the component is created and destroyed 10 times, you will have 10 duplicate listeners firing simultaneously."}],practice:{intro:"Practice in the Org: Build a decoupled architecture.",steps:["1. In VS Code, create a folder force-app/main/default/messageChannels.","2. Create a file named DataChannel.messageChannel-meta.xml and deploy it.","3. Create a Sender LWC with an input text field and a button that publishes the text via LMS.","4. Create a Receiver LWC that subscribes to the channel in connectedCallback and displays the text.","5. Ensure the Receiver unsubscribes in disconnectedCallback.","6. Add both components to a Lightning App page in completely different columns. Test the interaction."],expectedOutcome:"Total comprehension of cross-component communication and memory management."},interviewQuestions:[{scenario:"What is the primary advantage of LMS over traditional LWC Pub/Sub models?",answer:"LMS is native to the platform and can communicate seamlessly across LWC, Aura, and Visualforce pages. The old pub/sub modules only worked between LWC components."},{scenario:"What is the purpose of `@wire(MessageContext)`?",answer:"It provides context about the Lightning application environment in which the component is executing. It ensures that messages are routed correctly within the current application scope."},{scenario:"What happens if you forget to call `unsubscribe()` in the `disconnectedCallback()`?",answer:"A memory leak occurs. The component's DOM is destroyed, but the subscription callback function remains in the browser memory. The next time the component is loaded, a second subscription is added. When a message is published, both the old phantom callback and the new one execute."},{scenario:"Can LMS communicate between two different browser tabs (e.g., Tab A has an Account page, Tab B has a Contact page)?",answer:"No. LMS scope is strictly limited to a single browser tab and single Lightning context. For cross-tab communication, you would need to use native browser APIs like the Broadcast Channel API or LocalStorage events."},{scenario:"Is it required to define `lightningMessageFields` in the XML channel definition?",answer:"No, it is optional documentation. It helps define the expected schema for developers, but LMS will allow you to pass any valid JSON payload through the channel regardless of the XML definitions."}]},"4.9":{theory:`
      <div class="callout callout--definition">
        <p class="callout__title">📘 4.9 Conditional & List Rendering</p>
        <p>LWC provides powerful template directives to manipulate the DOM based on state. You use <code>lwc:if</code> for conditional rendering and <code>for:each</code> or <code>iterator</code> for rendering lists of data.</p>
      </div>
      <h3>Modern Conditionals (lwc:if)</h3>
      <p>Salesforce recently deprecated the old <code>if:true</code> and <code>if:false</code> directives in favor of <code>lwc:if</code>, <code>lwc:elseif</code>, and <code>lwc:else</code>. The new syntax is much cleaner and performs better because it short-circuits: the moment a condition evaluates to true, the framework completely ignores the remaining <code>elseif</code>/<code>else</code> blocks without evaluating them.</p>
      <h3>List Rendering and the Mandatory Key</h3>
      <p>When iterating over arrays to generate UI elements (like rows in a table or list items), you must use <code>for:each</code>. <strong>Crucially:</strong> the very first HTML tag inside the loop must have a <code>key</code> attribute bound to a unique identifier (usually the record ID). The framework's Virtual DOM uses this key to track elements. If an item is removed from the array, the Virtual DOM simply removes the element with that specific key, rather than destroying and recreating the entire list.</p>
    `,examples:[{title:"Modern Conditional Chains",description:"Using lwc:if, lwc:elseif, and lwc:else.",language:"markup",code:`<template>
    <template lwc:if={isLoading}>
        <lightning-spinner></lightning-spinner>
    </template>
    <template lwc:elseif={hasError}>
        <div class="error-box">{errorMessage}</div>
    </template>
    <template lwc:else>
        <!-- Renders only if loading is false AND error is false -->
        <div>Data: {records.length} items found.</div>
    </template>
</template>`,explanation:"This completely replaces the old method where you had to use multiple `<template if:true={...}>` blocks and compute inverse logic manually in JS."},{title:"Standard Array Iteration",description:"Using for:each with the mandatory key.",language:"markup",code:`<template>
    <ul class="slds-m-around_medium">
        <!-- Loop over the 'contacts' JS array -->
        <template for:each={contacts} for:item="contact">
            <!-- THE KEY IS MANDATORY ON THIS ELEMENT -->
            <li key={contact.Id} class="slds-item">
                {contact.Name} - {contact.Title}
            </li>
        </template>
    </ul>
</template>`,explanation:"If contact.Id is missing or duplicate, LWC will throw a massive error in the console. Never use the array index as the key if you can avoid it."},{title:"Advanced Iteration (iterator)",description:"Using iterator when you need to know if an item is the first or last in the list.",language:"markup",code:`<template>
    <ul class="timeline">
        <template iterator:step={processSteps}>
            <!-- The value is accessed via step.value -->
            <li key={step.value.id}>
                <div lwc:if={step.first} class="start-flag">START</div>
                
                <p>{step.value.name}</p>
                
                <div lwc:if={step.last} class="end-flag">FINISH</div>
            </li>
        </template>
    </ul>
</template>`,explanation:'The iterator directive creates an object (named "step" here) that contains .value, .first, .last, and .index properties.'}],practice:{intro:"Practice in the Org: Build a dynamic feed.",steps:["1. Create a component with a JS array of 5 objects containing id, title, and category.","2. Use a for:each loop to render the list into standard HTML <div> tags. Remember the key!",'3. Use lwc:if / lwc:elseif inside the loop to render a blue icon if the category is "A", and a red icon if the category is "B".',"4. Add a button that removes the first element from the array using this.myArray.shift() (ensure @track is used on the array).","5. Deploy and click the button, watch the DOM seamlessly animate the removal because the keys allow the Virtual DOM to track elements perfectly."],expectedOutcome:"You will master conditional DOM rendering and understand why keys are absolutely critical for Virtual DOM performance."},interviewQuestions:[{scenario:"Why did Salesforce deprecate `if:true` in favor of `lwc:if`?",answer:"`if:true` evaluated every single template block independently. If you had three conditional blocks, the framework evaluated all three expressions even if the first one was true. `lwc:if` acts like a standard switch statement; it short-circuits and skips evaluating subsequent `lwc:elseif`/`lwc:else` blocks once a condition is met, drastically improving rendering performance."},{scenario:"Why is the `key` attribute strictly mandatory when iterating over lists?",answer:"LWC uses a Virtual DOM. When an array changes, the framework compares the old DOM with the new DOM. The `key` attribute acts as a unique fingerprint for that specific HTML node. Without it, if an item is inserted in the middle of an array, the framework would have to destroy and recreate the entire list. With the key, it just moves the nodes, saving massive amounts of processing power."},{scenario:"Is it acceptable to use the array index as the `key` in a `for:each` loop?",answer:"It is possible, but highly discouraged. If the order of the array changes (e.g., sorting or removing an item), the indexes shift. The Virtual DOM will see the keys shifting and incorrectly re-render the entire list, defeating the performance benefits of using a key."},{scenario:"What is the functional difference between `for:each` and `iterator`?",answer:"`for:each` is a simple, lightweight loop that just exposes the item. `iterator` exposes a complex object containing the item data (`.value`), the index (`.index`), and boolean flags indicating if the item is the first (`.first`) or last (`.last`) in the array, making it ideal for timelines or bordered lists."},{scenario:"When `lwc:if` evaluates to false, does the element get hidden via CSS `display: none`, or is it removed from the DOM?",answer:"It is completely destroyed and removed from the DOM, and its `disconnectedCallback` (if it is a custom component) will fire. This frees up browser memory."}]},"4.10":{theory:`
      <div class="callout callout--definition">
        <p class="callout__title">📘 4.10 CSS Styling, Scoping & SLDS Hooks</p>
        <p>Styling in LWC revolves around two core concepts: Shadow DOM encapsulation (which prevents your CSS from leaking) and the Salesforce Lightning Design System (SLDS).</p>
      </div>
      <h3>Shadow DOM Encapsulation</h3>
      <p>When you create a <code>.css</code> file in an LWC bundle, the styles are inherently scoped. If you write <code>button { color: red; }</code>, it will only turn the buttons red <em>inside</em> that specific component's HTML template. It will not turn buttons red in child components, parent components, or the global Salesforce UI. This is enforced natively by the browser's Shadow DOM.</p>
      <h3>Lightning Design System (SLDS)</h3>
      <p>You should almost never write custom CSS for margins, padding, typography, or colors. You should use standard SLDS utility classes directly in your HTML (e.g., <code>class="slds-m-around_medium slds-text-color_error"</code>). This ensures your component looks identical to standard Salesforce screens and automatically inherits global branding changes (like a company updating their brand color).</p>
      <h3>SLDS Styling Hooks</h3>
      <p>Because Shadow DOM prevents you from writing CSS that targets the internals of a child component, you cannot simply write <code>lightning-button button { background: red; }</code>. The framework blocks it. To customize standard Salesforce base components, you must use <strong>Styling Hooks</strong>. These are CSS Custom Properties (CSS variables) exposed by Salesforce specifically to allow you to pass values through the Shadow boundary.</p>
    `,examples:[{title:"Using SLDS Utility Classes",description:"Building layouts without writing a single line of custom CSS.",language:"markup",code:`<template>
    <!-- Grid layout with padding and specific background -->
    <div class="slds-grid slds-wrap slds-p-around_large slds-theme_default">
        <div class="slds-col slds-size_1-of-2">
            <!-- Text styling -->
            <h1 class="slds-text-heading_large slds-text-color_success">Success!</h1>
        </div>
        <div class="slds-col slds-size_1-of-2">
            <lightning-button label="Confirm" variant="brand"></lightning-button>
        </div>
    </div>
</template>`,explanation:"Memorizing SLDS grid, margin (m), padding (p), and text classes will cut your development time in half and make your code enterprise-grade."},{title:"Scoping and the :host Selector",description:"Targeting the component itself, not just its internals.",language:"css",code:`/* Targets the <c-my-component> tag itself */
:host {
    display: block; /* By default, custom elements are display: inline */
    border: 1px solid #ccc;
    background-color: white;
}

/* Scoped strictly to this component */
h2 {
    font-weight: 700;
    color: #0176D3;
}`,explanation:"Because a custom element is inline by default, padding and margins won't behave correctly unless you set :host to display: block."},{title:"Overriding Base Components via Styling Hooks",description:"Piercing the shadow DOM using CSS variables.",language:"css",code:`/* We want to make a specific lightning-badge green */
.success-badge {
    /* We cannot target the span inside lightning-badge. 
       Instead, we redefine the CSS variable the badge listens to. */
    --sds-c-badge-color-background: #04844B;
    --sds-c-badge-text-color: #FFFFFF;
}`,explanation:`You apply class="success-badge" to the <lightning-badge>. The badge's internal Shadow DOM reads these variables and updates its colors accordingly.`}],practice:{intro:"Practice in the Org: Master SLDS and Hooks.",steps:["1. Build a component with a <lightning-button> and a <lightning-badge>.","2. Attempt to write custom CSS in your .css file targeting the button tag inside the lightning-button. Deploy and observe that it fails entirely due to Shadow DOM.","3. Go to the SLDS documentation website, find the Design Tokens / Styling Hooks for the Button.","4. In your CSS, target a class on the lightning-button and redefine the --sds-c-button-brand-color-background hook to purple.","5. Deploy and see the button change color successfully."],expectedOutcome:"You will understand the rigid walls of Shadow DOM and how CSS Custom Properties (Hooks) provide the only authorized bridge across them."},interviewQuestions:[{scenario:"How does Shadow DOM impact CSS scoping in LWC?",answer:"Shadow DOM creates an impenetrable wall around a component's CSS. Styles defined in a component's `.css` file will only affect elements declared inside that specific component's HTML file. They cannot leak out to affect parent components, nor can they penetrate downward to affect the internals of child components."},{scenario:"If you want to change the background color of the actual `<button>` tag sitting deep inside a `<lightning-button>`, how do you do it?",answer:"You cannot use standard CSS descendant selectors (e.g., `lightning-button button { ... }`) because the `<button>` is hidden inside the child's Shadow DOM. You must use SLDS Styling Hooks by defining a CSS Custom Property like `--sds-c-button-brand-color-background` on the host element."},{scenario:"What is the purpose of the `:host` CSS pseudo-class?",answer:"The `:host` selector allows you to apply CSS rules to the component's outermost wrapper element itself (the Custom Element tag, like `<c-my-component>`). This is necessary because by default, browser custom elements act as `display: inline`, which breaks layout padding/margins unless overridden with `:host { display: block; }`."},{scenario:"How can you share a common CSS stylesheet across 20 different LWC components?",answer:"You create a dedicated LWC component containing only a `.css` file (no HTML or JS needed). Then, in the `.css` files of your 20 components, you import it using the syntax `@import 'c/mySharedStyles';`."},{scenario:"Why is it recommended to use SLDS utility classes (e.g., `slds-m-top_medium`) instead of writing custom margins in CSS?",answer:"Using SLDS ensures UI consistency across the entire Salesforce platform. It reduces CSS bundle size, prevents custom CSS maintenance debt, and guarantees that if Salesforce updates global spacing metrics in a future release, your components automatically inherit the improvements."}]}},a={"4.11":{theory:`
      <div class="callout callout--definition">
        <p class="callout__title">📘 4.11 Base Form Components & LDS</p>
        <p>Salesforce provides Base Form components (like <code>lightning-record-edit-form</code> and <code>lightning-record-view-form</code>) that leverage the Lightning Data Service (LDS) to provide zero-Apex CRUD operations with automatic caching and Field Level Security (FLS) enforcement.</p>
      </div>
      <h3>The Power of Lightning Data Service (LDS)</h3>
      <p>LDS is the data layer for LWC. It acts as a centralized cache for the browser. If two different components on a page request the same Account record via LDS, Salesforce only makes one network call to the server. Furthermore, if Component A updates the Account name, Component B instantly updates in real-time without needing a manual refresh or Pub/Sub events. Base Form components are wired directly into this cache.</p>
      <h3>Zero Apex, Zero SOQL</h3>
      <p>By using <code>lightning-record-edit-form</code>, you do not need to write an Apex controller, you do not need to write SOQL, and you do not need to write DML. The component handles fetching the record data, generating the correct HTML input types (e.g., rendering a date picker for a Date field, or a lookup widget for a Reference field), enforcing validation rules, checking user permissions, and saving the data.</p>
      <h3>Referential Integrity via Schema Imports</h3>
      <p>When specifying fields for these forms, you should never hardcode strings (e.g., <code>"Account.CustomField__c"</code>). Instead, you import the field reference directly from <code>@salesforce/schema</code>. This tells the Salesforce compiler that your component depends on this field. If an Admin tries to delete <code>CustomField__c</code> from the database, Salesforce will block the deletion, preventing your component from breaking in production.</p>
    `,examples:[{title:"Building a Zero-Apex Edit Form",description:"Creating a fully functional record editor in just a few lines of HTML.",language:"markup",code:`<!-- HTML Template -->
<lightning-record-edit-form record-id={recordId} object-api-name={objectApiName} onsuccess={handleSuccess}>
    <lightning-messages></lightning-messages> <!-- Displays validation rule errors -->
    
    <div class="slds-grid slds-wrap">
        <div class="slds-col slds-size_1-of-2">
            <!-- Uses imported schema fields -->
            <lightning-input-field field-name={nameField}></lightning-input-field>
        </div>
        <div class="slds-col slds-size_1-of-2">
            <lightning-input-field field-name={phoneField}></lightning-input-field>
        </div>
    </div>
    
    <div class="slds-m-top_medium">
        <lightning-button variant="brand" type="submit" label="Save"></lightning-button>
    </div>
</lightning-record-edit-form>`,explanation:'The type="submit" on the button automatically triggers the form to save via LDS.'},{title:"Importing Schema Definitions",description:"Enforcing database referential integrity in JavaScript.",language:"javascript",code:`import { LightningElement, api } from 'lwc';

// IMPORT THE SCHEMA
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';

export default class EditFormDemo extends LightningElement {
    @api recordId;
    
    // Expose to HTML
    objectApiName = ACCOUNT_OBJECT;
    nameField = NAME_FIELD;
    phoneField = PHONE_FIELD;

    handleSuccess(event) {
        // Automatically fired when save is successful
        console.log('Record updated successfully! ID: ', event.detail.id);
    }
}`,explanation:"Always import objects and fields. If you use a hardcoded string and the field is deleted, your component will crash at runtime."},{title:"Intercepting the Submission (onsubmit)",description:"Modifying data or performing custom validation before the server hit.",language:"javascript",code:`handleSubmit(event) {
    // 1. Stop the form from submitting automatically
    event.preventDefault(); 
    
    // 2. Get the field data submitted by the user
    const fields = event.detail.fields;
    
    // 3. Perform custom JS validation or manipulate data
    if (!fields.LastName) {
        fields.LastName = 'Unknown';
    }
    
    // 4. Manually submit the modified data to LDS
    this.template.querySelector('lightning-record-edit-form').submit(fields);
}`,explanation:"This pattern is vital when you need to calculate hidden fields or override user inputs immediately before the save occurs."}],practice:{intro:"Practice in the Org: Build a Contact quick-edit widget.",steps:["1. Create a component intended for the Contact Record Page (expose it to lightning__RecordPage).","2. Use @api recordId to grab the current Contact ID.","3. Import schema fields for Email, Phone, and LeadSource.","4. Implement a lightning-record-edit-form utilizing those fields.",'5. Write an onsubmit handler that intercepts the save. If LeadSource is blank, set it to "Web" programmatically.',"6. Deploy, place it on the Contact page, clear the LeadSource field, and hit save to see your interception logic work."],expectedOutcome:"Mastery of LDS base components, schema imports, and event interception."},interviewQuestions:[{scenario:"What is the primary benefit of using `lightning-record-edit-form` over writing a custom UI backed by Imperative Apex?",answer:"The base form leverages Lightning Data Service (LDS). It requires zero Apex, automatically respects Field Level Security (FLS) by hiding fields the user cannot see, automatically handles database validation errors, and updates the shared client-side cache so other components react instantly to the changes."},{scenario:'Why is it considered a strict best practice to import field definitions using `@salesforce/schema` instead of hardcoding strings like `"Contact.Email"`?',answer:'Importing from `@salesforce/schema` establishes strong referential integrity. When deployed, Salesforce tracks this dependency. It prevents administrators from deleting the field or object from the database because it is officially "in use" by the LWC. Hardcoded strings offer no such protection.'},{scenario:"If you want to validate a field on the client-side *before* `lightning-record-edit-form` sends the data to the server, how do you do it?",answer:"You hook into the `onsubmit` event on the form. First, you call `event.preventDefault()` to halt the automatic network request. Then you inspect `event.detail.fields`. If validation fails, you show an error. If it passes, you call `this.template.querySelector('lightning-record-edit-form').submit(fields)`."},{scenario:'What happens if a user views a `lightning-record-edit-form` but their Profile does not have "Edit" access to one of the fields?',answer:"LDS automatically enforces Field Level Security. The specific `lightning-input-field` will gracefully downgrade to a read-only view, or hide itself entirely, without throwing a hard error and breaking the page."},{scenario:"Does `lightning-record-edit-form` support querying child related lists?",answer:"No. Base forms and the standard UI API adapters are strictly designed for single-record CRUD operations. To query related lists or complex multi-object hierarchies, you must write Apex."}]},"4.12":{theory:`
      <div class="callout callout--definition">
        <p class="callout__title">📘 4.12 The @wire Service</p>
        <p>The <code>@wire</code> decorator is the backbone of declarative data fetching in LWC. It provisions a reactive stream of data from either Lightning Data Service adapters or custom Apex methods.</p>
      </div>
      <h3>Reactivity and the "$" Prefix</h3>
      <p>The true power of <code>@wire</code> is its reactivity. If you pass a dynamic parameter into the wire configuration using the <code>$</code> prefix (e.g., <code>{ recordId: '$recordId' }</code>), the framework watches that property. When the property changes, the wire service automatically re-executes the server call or pulls fresh data from the LDS cache without you writing any trigger logic.</p>
      <h3>Wired Properties vs Wired Functions</h3>
      <p>You can wire data directly into a property. The framework will automatically assign an object containing <code>data</code> and <code>error</code> keys to that property. Alternatively, you can wire data into a function. The function runs automatically whenever new data arrives. You use a wired function when you need to manipulate the data (e.g., adding properties or reshaping arrays) before the UI renders it, or when you need to trigger subsequent secondary logic.</p>
      <h3>Immutable Cache</h3>
      <p>Data returned by a wire is heavily cached and strictly immutable (read-only). If you use a wired function and attempt to mutate <code>data.push(newObj)</code>, the browser will throw a severe error. You must deep-clone the data using <code>JSON.parse(JSON.stringify(data))</code> or the spread operator before modifying it.</p>
    `,examples:[{title:"Wiring to a Property",description:"The simplest way to get data, ideal when no manipulation is required.",language:"javascript",code:`import { LightningElement, api, wire } from 'lwc';
import getRelatedContacts from '@salesforce/apex/ContactController.getRelatedContacts';

export default class WirePropDemo extends LightningElement {
    @api recordId;

    // Reactively executes when recordId is assigned by the page
    @wire(getRelatedContacts, { accountId: '$recordId' })
    contacts; // Populates this.contacts.data and this.contacts.error
}

/* HTML */
// <template lwc:if={contacts.data}> 
//    <template for:each={contacts.data} ...>
// </template>`,explanation:'The HTML template must explicitly check for the ".data" property.'},{title:"Wiring to a Function (Data Manipulation)",description:"Used when you need to process the data before rendering.",language:"javascript",code:`import { LightningElement, wire } from 'lwc';
import getActiveUsers from '@salesforce/apex/UserController.getActiveUsers';

export default class WireFuncDemo extends LightningElement {
    processedUsers;
    error;

    @wire(getActiveUsers)
    wiredUsers({ error, data }) {
        if (data) {
            // Data is strictly read-only. We must map/clone it to modify it.
            this.processedUsers = data.map(user => {
                return { 
                    ...user, 
                    FullName: \`\${user.FirstName} \${user.LastName}\` 
                };
            });
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.processedUsers = undefined;
        }
    }
}`,explanation:"The wired function receives an object containing both data and error. Destructuring it directly into {error, data} is the standard convention."},{title:"Forcing a Cache Refresh",description:"Wire data is cached. If you know the DB changed, you must force a refresh.",language:"javascript",code:`import { LightningElement, wire } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import getData from '@salesforce/apex/Controller.getData';

export default class RefreshDemo extends LightningElement {
    wiredResult; // Store the RAW result object

    @wire(getData)
    wiredData(result) {
        this.wiredResult = result; // Save reference for refreshApex
        if (result.data) { /* logic */ }
    }

    handleSave() {
        // ... user performs some DML via imperative Apex ...
        // Force the wire to go back to the server and update the cache
        refreshApex(this.wiredResult);
    }
}`,explanation:"refreshApex requires the complete wrapper object (which contains both data and error), not just the data portion."}],practice:{intro:"Practice in the Org: Build a reactive search.",steps:["1. Write an Apex class with a @AuraEnabled(cacheable=true) method that accepts a String searchKey and returns Accounts.",'2. In LWC, create an input field that updates a JS property called "searchTerm".',"3. Wire the Apex method, passing { searchKey: '$searchTerm' }.","4. Display the results in the HTML.","5. Deploy and test. Notice how typing in the input automatically triggers server calls without you writing a single line of event execution logic."],expectedOutcome:'Total mastery of wire reactivity via the "$" prefix.'},interviewQuestions:[{scenario:'What does the "$" prefix do when passing parameters to the `@wire` service?',answer:'The "$" prefix makes the parameter reactive. It binds the wire service to a class property. Whenever the value of that class property changes, the wire service automatically detects the change and re-executes the server call to fetch fresh data based on the new parameter.'},{scenario:"If you use a wired function, why will `data.push(newRecord)` throw a JavaScript error?",answer:"Data provisioned by the `@wire` service is heavily cached by Lightning Data Service. To protect the integrity of the cache, the framework makes the returned `data` object strictly immutable (read-only). If you need to modify it, you must create a deep clone (e.g., using `JSON.parse(JSON.stringify(data))` or the spread operator)."},{scenario:"What is the specific requirement for an Apex method to be compatible with `@wire`?",answer:"The Apex method must be declared as `static` and it must be annotated with `@AuraEnabled(cacheable=true)`. If `cacheable=true` is missing, the wire service will fail to execute it."},{scenario:"When should you choose a wired function instead of a wired property?",answer:"You use a wired function when you need to intercept and manipulate the data (like reshaping an array or calculating totals) before it is rendered, or when the arrival of data needs to trigger secondary imperative logic (like dispatching an event to a parent)."},{scenario:"How do you force the `@wire` cache to invalidate and fetch fresh data from the server?",answer:"You import `refreshApex` from `@salesforce/apex`. If using a wired function, you must save the complete raw result object (containing both data and error) to a variable. When you want to refresh, you call `refreshApex(thatSavedVariable)`."}]},"4.13":{theory:`
      <div class="callout callout--definition">
        <p class="callout__title">📘 4.13 Imperative Apex & Async/Await</p>
        <p>While <code>@wire</code> is reactive and declarative, <strong>Imperative Apex</strong> allows you to call the server exactly when you want to (e.g., upon a button click). Imperative Apex must be used for DML operations.</p>
      </div>
      <h3>When to use Imperative over Wire</h3>
      <p>The <code>@wire</code> service requires Apex methods to be marked as <code>cacheable=true</code>. Salesforce strictly forbids DML operations (Insert, Update, Delete) inside cacheable methods. Therefore, if you need to modify database state, you <strong>must</strong> use an Imperative Apex call.</p>
      <h3>Promises and Async/Await</h3>
      <p>Imperative Apex calls return standard JavaScript Promises. While you can use traditional <code>.then()</code> and <code>.catch()</code> chains, modern LWC development heavily favors the <code>async / await</code> syntax. Async/Await allows you to write asynchronous server-call logic that reads linearly like synchronous code, eliminating complex nested callbacks ("callback hell").</p>
      <h3>The Finally Block</h3>
      <p>When making server calls, you usually show a loading spinner. The spinner must be hidden when the call finishes, regardless of whether it succeeded or threw an error. The <code>finally</code> block is the architectural best practice for executing this cleanup logic.</p>
    `,examples:[{title:"Traditional Promise Chain",description:"Standard imperative call handling success and error.",language:"javascript",code:`import updateAccount from '@salesforce/apex/AccountController.updateAccount';

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
}`,explanation:"This works, but can become deeply nested and hard to read if you need to make sequential server calls."},{title:"Modern Async/Await Syntax",description:"Writing clean, linear asynchronous code.",language:"javascript",code:`import updateAccount from '@salesforce/apex/AccountController.updateAccount';

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
}`,explanation:"Await unwraps the Promise. If the Promise rejects, it throws an exception that is caught by the catch block."},{title:"Spinner Management with Finally",description:"Ensuring the UI state resets correctly.",language:"javascript",code:`async processPayment() {
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
}`,explanation:"If you put isLoading = false inside the try block, and the server throws an error, the code jumps to the catch block, skipping the reset, leaving the spinner on the screen forever."}],practice:{intro:"Practice in the Org: Build a transactional action.",steps:["1. Write an Apex method without cacheable=true that inserts a Contact record.","2. Build an LWC form with First Name and Last Name inputs.","3. Create an async handleSave() method triggered by a button.","4. Implement try/catch/finally. Set a boolean isLoading to true at the start, and false in the finally block.","5. Call the Apex method using await.","6. Deploy and test. Throttle your browser network connection in DevTools to see the spinner in action."],expectedOutcome:"You will master safe transaction handling, async/await syntax, and UX loading states."},interviewQuestions:[{scenario:"Why must you use Imperative Apex instead of `@wire` to perform DML operations (insert, update, delete)?",answer:"The `@wire` service requires the Apex method to be annotated with `@AuraEnabled(cacheable=true)`. Salesforce strictly prohibits executing DML statements inside cacheable methods. Because DML mutates database state, you must use an uncached Imperative Apex call."},{scenario:"What is the main architectural benefit of using `async`/`await` over `.then().catch()`?",answer:'`async`/`await` eliminates "callback hell". It allows you to write asynchronous code that executes and reads linearly, just like synchronous code. This makes complex sequential server calls drastically easier to read, reason about, and maintain.'},{scenario:"Why is the `finally` block considered best practice when managing loading spinners?",answer:"The `finally` block is guaranteed to execute regardless of whether the `try` block succeeded or the `catch` block caught an error. If you put `isLoading = false` inside the `try` block, and the server throws an error, execution skips to the `catch` block, and the spinner will be stuck on the screen forever. `finally` guarantees cleanup."},{scenario:"Can you call an `@AuraEnabled(cacheable=true)` method imperatively?",answer:"Yes. While cacheable methods are typically used with `@wire`, they can also be called imperatively. This is useful when you want to leverage the LDS cache but only want to fetch the data when a specific event occurs (like a button click), rather than automatically on load."},{scenario:"If an Imperative Apex method throws a custom `AuraHandledException`, how do you extract the message in LWC?",answer:"In the LWC `catch(error)` block, the message string is typically found deeply nested in the error object. You extract it using `error.body.message`."}]},"4.14":{theory:`
      <div class="callout callout--definition">
        <p class="callout__title">📘 4.14 Navigation & Validation</p>
        <p>LWC provides native modules for context-aware routing (NavigationMixin) and standard HTML5 APIs for client-side form validation.</p>
      </div>
      <h3>NavigationMixin: Context-Aware Routing</h3>
      <p>Never hardcode URLs (like <code>window.location.href = '/lightning/r/Account/' + id</code>) in Salesforce. Hardcoded URLs break horribly because LWC components run in many contexts: Desktop Lightning, the Salesforce Mobile App, Console Apps, and Experience Cloud communities—each of which uses entirely different URL structures. <code>NavigationMixin</code> abstractly generates the correct URL format for the current execution context.</p>
      <h3>Client-Side Validation</h3>
      <p>Before sending data to the server, you should validate it in the browser. LWC heavily utilizes the native HTML5 constraint validation API. Base components like <code>lightning-input</code> have built-in methods like <code>checkValidity()</code>, <code>reportValidity()</code>, and <code>setCustomValidity()</code>. This allows you to build complex, highly interactive validation UX without writing Apex.</p>
    `,examples:[{title:"Navigating to a Record",description:"Using NavigationMixin to safely route the user.",language:"javascript",code:`import { LightningElement } from 'lwc';
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
}`,explanation:"If this runs on a phone, it opens the native mobile record view. If on desktop, it opens the Lightning UI tab."},{title:"Checking HTML5 Validity",description:"Verifying all inputs in a form are valid before submitting.",language:"javascript",code:`handleSave() {
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
}`,explanation:'This relies on standard HTML attributes like required="true" or type="email" defined in the template.'},{title:"Custom Validation Rules",description:"Injecting complex business logic into the UI validation state.",language:"javascript",code:`validateAge() {
    const input = this.template.querySelector('.age-input');
    const age = parseInt(input.value, 10);

    if (age < 18) {
        // Sets the error state, but doesn't show it yet
        input.setCustomValidity('User must be at least 18 years old.');
    } else {
        // Passing an empty string clears the error state
        input.setCustomValidity(''); 
    }
    
    // Renders the red text on the screen
    input.reportValidity();
}`,explanation:"setCustomValidity marks the field as invalid internally. reportValidity actually manipulates the DOM to show the error."}],practice:{intro:"Practice in the Org: Route and Validate.",steps:['1. Create a component with a button that uses NavigationMixin to open the standard Account Creation page (actionName: "new").','2. Add a lightning-input for a "Discount Code".','3. Add a Save button. In the JS handler, check if the discount code equals "VIP2024".',`4. If it doesn't, use setCustomValidity and reportValidity to show a red error stating "Invalid Code".`,"5. If it does, clear the validity (empty string) and show a success toast message.","6. Deploy and test both the routing and the custom validation states."],expectedOutcome:"Solid capability in UX flow control and data sanitization."},interviewQuestions:[{scenario:"Why is it a severe anti-pattern to use `window.location.href` to navigate to a record in LWC?",answer:"Hardcoded URLs assume a specific environment. A component using `/lightning/r/Account/...` will completely break if placed inside a Salesforce Mobile App, a Console App workspace tab, or an Experience Cloud community. `NavigationMixin` abstracts routing and automatically generates the correct URL format based on the runtime context."},{scenario:"How do you force a `NavigationMixin.Navigate` call to open in a completely new browser tab?",answer:'`NavigationMixin.Navigate` behaves like a standard single-page-app router. To force a new tab, you must use `NavigationMixin.GenerateUrl` to asynchronously resolve the raw URL string, and then pass that string into standard `window.open(url, "_blank")`.'},{scenario:"What is a PageReference object?",answer:"It is a standardized JSON object used by the Navigation API. It defines the `type` of page (e.g., standard object page, record page, web page), the `attributes` (like recordId), and optional `state` parameters (like URL query strings)."},{scenario:"How do you apply a custom error message to a `lightning-input` and display it in red on the screen?",answer:'You first call `input.setCustomValidity("Your Error Message")` to apply the internal error state. Then, you MUST call `input.reportValidity()` to force the component to re-render and display the red error text.'},{scenario:"How do you clear a custom validity error once the user corrects their input?",answer:'You call `input.setCustomValidity("")` passing an empty string. This tells the constraint API that the field is now valid. You then call `reportValidity()` to clear the red text from the UI.'}]},"4.15":{theory:`
      <div class="callout callout--definition">
        <p class="callout__title">📘 4.15 Advanced Data Grids (lightning-datatable)</p>
        <p>The <code>lightning-datatable</code> is arguably the most complex and powerful base component in LWC. It renders a highly interactive grid supporting sorting, inline editing, row-level actions, and custom data types.</p>
      </div>
      <h3>The Configuration Object</h3>
      <p>Unlike standard HTML tables where you write <code>&lt;tr&gt;</code> and <code>&lt;td&gt;</code> tags, the datatable is entirely configuration-driven. You pass it a JSON array of column definitions and a JSON array of data. The component dynamically builds the UI based on those configurations.</p>
      <h3>Inline Editing</h3>
      <p>When a user edits a cell inline, the datatable highlights the cell yellow and stores the uncommitted change in a property called <code>draftValues</code>. The component does <strong>not</strong> save this data to the database automatically. You must listen for the <code>onsave</code> event, extract the <code>draftValues</code>, send them to Apex for DML operations, and then manually clear the <code>draftValues</code> array to remove the yellow highlights.</p>
      <h3>Custom Data Types</h3>
      <p>Out of the box, the datatable supports text, currency, dates, URLs, etc. But if you want to display an image, a custom LWC badge, or a complex progress bar inside a cell, you must extend the base <code>LightningDatatable</code> class in JavaScript and define custom HTML templates for those cells.</p>
    `,examples:[{title:"Basic Setup with Configurations",description:"Defining columns and binding data.",language:"javascript",code:`/* JavaScript */
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
</lightning-datatable>`,explanation:'The key-field="Id" is mandatory. Without it, the table cannot track row selections or inline edits properly.'},{title:"Handling Row Actions (Dropdown Menus)",description:"Adding action buttons to specific rows.",language:"javascript",code:`/* Define the column */
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
}`,explanation:"The event.detail object provides both the action that was clicked and the entire data payload for the row it was clicked on."},{title:"Processing Inline Edits",description:"Extracting draft values and clearing the UI state.",language:"javascript",code:`async handleSave(event) {
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
}`,explanation:"You must manually clear the draftValues array bound to the HTML template to reset the table's edit state."}],practice:{intro:"Practice in the Org: Build a fully interactive admin grid.",steps:["1. Wire an Apex method that returns 10 Accounts.","2. Configure columns for Name, Industry, and Phone. Make Phone editable: true.",'3. Add a row action column with an "Open Record" action.',"4. Render the lightning-datatable in HTML.","5. Implement the onrowaction handler to use NavigationMixin to open the Account record.","6. Implement the onsave handler to capture draftValues, pass them to a DML Apex method, clear the draftValues array, and refresh the wire.","7. Deploy and thoroughly test inline editing and row actions."],expectedOutcome:"Enterprise-level grid mastery. You can build advanced administration screens."},interviewQuestions:[{scenario:"What is the absolute most critical attribute required to render a `lightning-datatable` without breaking features?",answer:'The `key-field` attribute is strictly mandatory. It specifies the unique identifier for the rows (usually "Id"). If omitted, advanced features like row selection, inline editing, and sorting will fail because the component cannot track the nodes.'},{scenario:'How do you clear the yellow "unsaved changes" highlighting after successfully processing an inline edit?',answer:"You must reassign the array bound to the `draft-values` attribute on the HTML tag to an empty array (e.g., `this.draftValues = []`). This clears the internal UI state of the datatable."},{scenario:"Can you render a custom LWC component (like a custom status badge or a progress bar) inside a datatable cell?",answer:"Yes, but it requires creating a Custom Data Type. You must create a new LWC component that extends `LightningDatatable` (instead of LightningElement). You then define HTML templates for view-mode and edit-mode and register them in the JS configuration."},{scenario:"How is sorting implemented in a `lightning-datatable`?",answer:"Sorting is not automatic. You must set `sortable: true` on the columns, and bind the `sorted-by` and `sorted-direction` attributes on the HTML tag. You then listen for the `onsort` event, extract the field and direction, and write JavaScript logic to manually sort your local `data` array."},{scenario:"If you want to restrict the user to selecting only one row at a time using checkboxes/radio buttons, how do you do it?",answer:"You use the `max-row-selection` attribute on the `<lightning-datatable>` tag and set it to `1`. The UI will automatically convert the row selection checkboxes into radio buttons."}]}},i={...e,...t,...a};export{i as module4Content};
