export const m4Part2 = {
  "4.6": {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 4.6 CSS Styling in LWC</p>
        <p>Styling in LWC revolves around two core concepts: Shadow DOM encapsulation (which prevents your CSS from leaking) and the Salesforce Lightning Design System (SLDS).</p>
      </div>
      <h3>Shadow DOM Encapsulation</h3>
      <p>When you create a <code>.css</code> file in an LWC bundle, the styles are inherently scoped. If you write <code>button { color: red; }</code>, it will only turn the buttons red <em>inside</em> that specific component\'s HTML template. It will not turn buttons red in child components, parent components, or the global Salesforce UI. This is enforced natively by the browser\'s Shadow DOM.</p>
      <h3>Lightning Design System (SLDS)</h3>
      <p>You should almost never write custom CSS for margins, padding, typography, or colors. You should use standard SLDS utility classes directly in your HTML (e.g., <code>class="slds-m-around_medium slds-text-color_error"</code>). This ensures your component looks identical to standard Salesforce screens and automatically inherits global branding changes (like a company updating their brand color).</p>
      <h3>CSS Variables (Styling Hooks)</h3>
      <p>Because Shadow DOM prevents you from writing CSS that targets the internals of a child component, you cannot simply write <code>lightning-button button { background: red; }</code>. The framework blocks it. To customize standard Salesforce base components, you must use <strong>Styling Hooks</strong>. These are CSS Custom Variables exposed by Salesforce specifically to allow you to pass values through the Shadow boundary.</p>
    `,
    examples: [
      {
        title: 'Using SLDS Utility Classes',
        description: 'Building layouts without writing a single line of custom CSS.',
        language: 'javascript',
        code: `<template>
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
</template>`,
        explanation: 'Memorizing SLDS grid, margin (m), padding (p), and text classes will cut your development time in half and make your code enterprise-grade.'
      },
      {
        title: 'Scoping and the :host Selector',
        description: 'Targeting the component itself, not just its internals.',
        language: 'css',
        code: `/* Targets the <c-my-component> tag itself */
:host {
    display: block; /* By default, custom elements are display: inline */
    border: 1px solid #ccc;
    background-color: white;
}

/* Scoped strictly to this component */
h2 {
    font-weight: 700;
    color: #0176D3;
}`,
        explanation: 'Because a custom element is inline by default, padding and margins won\'t behave correctly unless you set :host to display: block.'
      },
      {
        title: 'Overriding Base Components via Styling Hooks',
        description: 'Piercing the shadow DOM using CSS variables.',
        language: 'css',
        code: `/* We want to make a specific lightning-badge green */
.success-badge {
    /* We cannot target the span inside lightning-badge. 
       Instead, we redefine the CSS variable the badge listens to. */
    --sds-c-badge-color-background: #04844B;
    --sds-c-badge-text-color: #FFFFFF;
}`,
        explanation: 'You apply class="success-badge" to the <lightning-badge>. The badge\'s internal Shadow DOM reads these variables and updates its colors accordingly.'
      }
    ],
            practice: {
      intro: 'Styling Mastery: Combining SLDS and Scoped CSS.',
      steps: [
        'Create an LWC named "styledCard".',
        'In the HTML, construct a card using pure SLDS classes (do not write custom CSS yet):\n<article class="slds-card">\n    <div class="slds-card__header slds-grid">\n        <header class="slds-media slds-media_center slds-has-flexi-truncate">\n            <h2><span class="slds-text-heading_small">Account Details</span></h2>\n        </header>\n    </div>\n    <div class="slds-card__body slds-card__body_inner">Inner content</div>\n</article>',
        'Deploy and observe that it perfectly matches the standard Salesforce UI.',
        'Now, create a file named "styledCard.css" in your bundle.',
        'Add a rule:\nh2 { color: red; font-size: 2rem; }',
        'Deploy again. Notice that ONLY the h2 inside your component turned red, proving Shadow DOM encapsulation prevented it from bleeding out to the rest of Salesforce.',
        'Finally, add a standard <lightning-button label="Submit"></lightning-button>.',
        'In your CSS, attempt to style the internal button text color:\nlightning-button button { color: green; }\nDeploy and notice it fails.',
        'Fix it using Styling Hooks:\n:host { --sds-c-button-brand-color-background: green; }\nand change the button variant to "brand". Deploy and watch it work.'
      ],
      expectedOutcome: 'Confidence in using SLDS for layout, Shadow DOM for isolation, and CSS variables (Styling Hooks) to pierce shadow boundaries.'
    },
    interviewQuestions: [
      { scenario: 'How does Shadow DOM impact CSS scoping in LWC?', answer: 'Shadow DOM creates an impenetrable wall around a component\'s CSS. Styles defined in a component\'s `.css` file will only affect elements declared inside that specific component\'s HTML file. They cannot leak out to affect parent components, nor can they penetrate downward to affect the internals of child components.' },
      { scenario: 'If you want to change the background color of the actual `<button>` tag sitting deep inside a `<lightning-button>`, how do you do it?', answer: 'You cannot use standard CSS descendant selectors (e.g., `lightning-button button { ... }`) because the `<button>` is hidden inside the child\'s Shadow DOM. You must use SLDS Styling Hooks by defining a CSS Custom Property like `--sds-c-button-brand-color-background` on the host element.' },
      { scenario: 'What is the purpose of the `:host` CSS pseudo-class?', answer: 'The `:host` selector allows you to apply CSS rules to the component\'s outermost wrapper element itself (the Custom Element tag, like `<c-my-component>`). This is necessary because by default, browser custom elements act as `display: inline`, which breaks layout padding/margins unless overridden with `:host { display: block; }`.' },
      { scenario: 'How can you share a common CSS stylesheet across 20 different LWC components?', answer: 'You create a dedicated LWC component containing only a `.css` file (no HTML or JS needed). Then, in the `.css` files of your 20 components, you import it using the syntax `@import \'c/mySharedStyles\';`.' },
      { scenario: 'Why is it recommended to use SLDS utility classes (e.g., `slds-m-top_medium`) instead of writing custom margins in CSS?', answer: 'Using SLDS ensures UI consistency across the entire Salesforce platform. It reduces CSS bundle size, prevents custom CSS maintenance debt, and guarantees that if Salesforce updates global spacing metrics in a future release, your components automatically inherit the improvements.' }
    ]
  },
  "4.7": {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 4.7 Conditional Rendering</p>
        <p>LWC provides powerful template directives to manipulate the DOM based on state. The modern standard uses <code>lwc:if</code>, <code>lwc:elseif</code>, and <code>lwc:else</code>.</p>
      </div>
      <h3>Modern Conditionals (lwc:if)</h3>
      <p>Salesforce deprecated the old <code>if:true</code> and <code>if:false</code> directives. The new syntax is much cleaner and performs significantly better because it short-circuits: the moment a condition evaluates to true, the framework completely ignores the remaining <code>elseif</code>/<code>else</code> blocks without evaluating them.</p>
      <h3>DOM Destruction vs CSS Hiding</h3>
      <p>When an <code>lwc:if</code> statement evaluates to false, the element is not merely hidden with CSS (<code>display: none</code>). It is completely destroyed and removed from the Virtual DOM, freeing up browser memory. This is critical for performance in large applications.</p>
    `,
    examples: [
      {
        title: 'Modern Conditional Chains',
        description: 'Using lwc:if, lwc:elseif, and lwc:else.',
        language: 'javascript',
        code: `<template>
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
</template>`,
        explanation: 'This completely replaces the old method where you had to use multiple `<template if:true={...}>` blocks and compute inverse logic manually in JS.'
      },
      {
        title: 'Legacy Conditionals (Deprecated)',
        description: 'How it used to be done (avoid this).',
        language: 'javascript',
        code: `<template>
    <!-- AVOID THIS SYNTAX IN MODERN LWC -->
    <template if:true={isReady}>
        <div>System is ready</div>
    </template>
    <template if:false={isReady}>
        <div>Please wait...</div>
    </template>
</template>`,
        explanation: 'The old syntax evaluated every single block independently, which wasted CPU cycles. Use lwc:else instead.'
      },
      {
        title: 'Combining with Getters',
        description: 'Using complex logic to drive simple booleans.',
        language: 'javascript',
        code: `// JS Controller
get showWarningPanel() {
    return this.userRole === 'Guest' || this.isTrialExpired;
}

<!-- HTML -->
<template lwc:if={showWarningPanel}>
    <div class="slds-notify slds-notify_alert slds-alert_warning">
        Please upgrade your account!
    </div>
</template>`,
        explanation: 'Because HTML templates do not support logic, you compute the boolean in a JS getter.'
      }
    ],
            practice: {
      intro: 'Logic in UI: Implementing complex conditional chains.',
      steps: [
        'Create an LWC named "conditionalWizard".',
        'In JS, declare a property:\nstep = 1;',
        'Create two methods:\nhandleNext() { this.step++; }\nhandlePrev() { this.step--; }',
        'In HTML, implement modern conditional directives (available API 59.0+):\n<template lwc:if={isStepOne}><h1>Welcome to Step 1</h1></template>\n<template lwc:elseif={isStepTwo}><h1>You are on Step 2</h1></template>\n<template lwc:else><h1>Final Step</h1></template>',
        'In JS, create the required getters:\nget isStepOne() { return this.step === 1; }\nget isStepTwo() { return this.step === 2; }',
        'Below the conditionals, add Next and Prev buttons, conditionally disabling "Prev" if step is 1, and "Next" if step is 3.',
        'Deploy and click through the wizard, ensuring the DOM cleanly replaces the elements.'
      ],
      expectedOutcome: 'Fluency in using lwc:if, lwc:elseif, and lwc:else to build multi-state UI flows efficiently.'
    },
    interviewQuestions: [
      { scenario: 'Why did Salesforce deprecate `if:true` in favor of `lwc:if`?', answer: '`if:true` evaluated every single template block independently. If you had three conditional blocks, the framework evaluated all three expressions even if the first one was true. `lwc:if` acts like a standard switch statement; it short-circuits and skips evaluating subsequent `lwc:elseif`/`lwc:else` blocks once a condition is met, drastically improving rendering performance.' },
      { scenario: 'When `lwc:if` evaluates to false, does the element get hidden via CSS `display: none`, or is it removed from the DOM?', answer: 'It is completely destroyed and removed from the DOM. If it is a custom component, its `disconnectedCallback` will fire. This frees up browser memory.' },
      { scenario: 'Can you use `lwc:elseif` without a preceding `lwc:if`?', answer: 'No. `lwc:elseif` and `lwc:else` must immediately follow a template block containing an `lwc:if`. The compiler will throw an error if they are placed independently or separated by other HTML elements.' },
      { scenario: 'If you need to show an element conditionally, but don\'t want it destroyed (because it takes a long time to re-render), what should you do?', answer: 'You should avoid `lwc:if` and instead use dynamic CSS classes. You can bind a getter that returns an SLDS utility class like `slds-hide` to toggle its visibility while keeping it in the DOM.' },
      { scenario: 'Can you place `lwc:if` directly on a standard HTML tag like a `<div>`?', answer: 'Yes! While developers often place conditionals on `<template>` wrappers, you can absolutely place `lwc:if` directly on standard elements like `<div lwc:if={isVisible}>` to reduce DOM depth.' }
    ]
  },
  "4.8": {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 4.8 List Rendering</p>
        <p>When iterating over arrays to generate UI elements (like rows in a table or list items), you must use <code>for:each</code> or <code>iterator</code>.</p>
      </div>
      <h3>The Mandatory Key Attribute</h3>
      <p><strong>Crucially:</strong> the very first HTML tag inside any loop must have a <code>key</code> attribute bound to a unique identifier (usually a record ID). LWC uses a Virtual DOM. The <code>key</code> acts as a unique fingerprint for that specific HTML node. Without it, if an item is inserted in the middle of an array, the framework would have to destroy and recreate the entire list. With the key, it just moves the nodes, saving massive amounts of processing power.</p>
      <h3>for:each vs iterator</h3>
      <p><code>for:each</code> is a simple, lightweight loop that just exposes the item. The <code>iterator</code> directive exposes a complex object containing the item data (<code>.value</code>), the index (<code>.index</code>), and boolean flags indicating if the item is the first (<code>.first</code>) or last (<code>.last</code>) in the array, making it ideal for timelines or bordered lists.</p>
    `,
    examples: [
      {
        title: 'Standard Array Iteration',
        description: 'Using for:each with the mandatory key.',
        language: 'javascript',
        code: `<template>
    <ul class="slds-m-around_medium">
        <!-- Loop over the 'contacts' JS array -->
        <template for:each={contacts} for:item="contact">
            <!-- THE KEY IS MANDATORY ON THIS ELEMENT -->
            <li key={contact.Id} class="slds-item">
                {contact.Name} - {contact.Title}
            </li>
        </template>
    </ul>
</template>`,
        explanation: 'If contact.Id is missing or duplicate, LWC will throw a massive error in the console. Never use the array index as the key if you can avoid it.'
      },
      {
        title: 'Advanced Iteration (iterator)',
        description: 'Using iterator when you need to know if an item is the first or last.',
        language: 'javascript',
        code: `<template>
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
</template>`,
        explanation: 'The iterator directive creates an object (named "step" here) that contains .value, .first, .last, and .index properties.'
      },
      {
        title: 'Looping over Map Data (via Getters)',
        description: 'LWC cannot loop directly over Maps/Sets.',
        language: 'javascript',
        code: `// JS: If your data is a Map, you must convert it to an Array
get mapToArray() {
    let result = [];
    for(let [key, val] of this.myMap.entries()){
        result.push({ key: key, value: val });
    }
    return result;
}

<!-- HTML: Now you can loop over the array -->
<template for:each={mapToArray} for:item="item">
    <div key={item.key}>{item.value}</div>
</template>`,
        explanation: 'The for:each directive strictly requires a standard JavaScript Array.'
      }
    ],
            practice: {
      intro: 'List Mastery: Rendering and manipulating arrays in the DOM.',
      steps: [
        'Create an LWC named "contactGallery".',
        'In JS, declare an array of objects:\ncontacts = [{id: "001", name: "Alice", role: "CEO"}, {id: "002", name: "Bob", role: "CTO"}];',
        'In HTML, use the standard iterator:\n<template for:each={contacts} for:item="contact">',
        'Inside the loop, you MUST provide a key on the top-level element:\n<div key={contact.id} class="slds-box slds-m-bottom_small">',
        'Display the contact name and role inside the div.',
        'Deploy and verify the list renders.',
        'Now, replace the for:each loop with the advanced iterator:\n<template iterator:it={contacts}>',
        'Inside the loop, change the key to:\n<div key={it.value.id}>',
        'Add a special header that ONLY renders for the first item:\n<h1 lwc:if={it.first}>Executive Team</h1>',
        'Add a special footer that ONLY renders for the last item:\n<p lwc:if={it.last}>End of List</p>',
        'Deploy and verify the first/last elements render correctly.'
      ],
      expectedOutcome: 'Mastery of list rendering, strict key requirements, and advanced iteration mechanics.'
    },
    interviewQuestions: [
      { scenario: 'Why is the `key` attribute strictly mandatory when iterating over lists?', answer: 'LWC uses a Virtual DOM. When an array changes, the framework compares the old DOM with the new DOM. The `key` attribute acts as a unique fingerprint for that specific HTML node. Without it, if an item is inserted in the middle of an array, the framework would have to destroy and recreate the entire list. With the key, it just moves the nodes, saving massive amounts of processing power.' },
      { scenario: 'Is it acceptable to use the array index as the `key` in a `for:each` loop?', answer: 'It is possible, but highly discouraged. If the order of the array changes (e.g., sorting or removing an item), the indexes shift. The Virtual DOM will see the keys shifting and incorrectly re-render the entire list, defeating the performance benefits of using a key.' },
      { scenario: 'What is the functional difference between `for:each` and `iterator`?', answer: '`for:each` is a simple, lightweight loop that just exposes the item. `iterator` exposes a complex object containing the item data (`.value`), the index (`.index`), and boolean flags indicating if the item is the first (`.first`) or last (`.last`) in the array, making it ideal for timelines or bordered lists.' },
      { scenario: 'Can you nest a `for:each` loop inside another `for:each` loop?', answer: 'Yes, absolutely. You just need to ensure that the `key` inside the inner loop is unique, often by combining IDs (e.g., `key={parentItem.id + childItem.id}`).' },
      { scenario: 'Can you iterate over a JS `Set` or `Map` using `for:each`?', answer: 'No. The `for:each` directive only accepts standard arrays. To render a Set or Map, you must convert it to an Array inside a JS getter first.' }
    ]
  },
  "4.9": {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 4.9 Event Handling</p>
        <p>In LWC, data strictly flows downwards from a Parent component to a Child component (via <code>@api</code>). Events flow <strong>upwards</strong>. A child component communicates with its parent by dispatching standard DOM <code>CustomEvent</code>s.</p>
      </div>
      <h3>The CustomEvent API</h3>
      <p>LWC relies on the native browser CustomEvent API. When a child needs to send a message (e.g., "I was clicked" or "Here is the selected ID"), it creates a new CustomEvent and dispatches it. The name of the event must be entirely lowercase (e.g., <code>select</code>, not <code>onSelect</code> or <code>myEvent</code>), because HTML attributes are case-insensitive.</p>
      <h3>Passing Data (Event Detail)</h3>
      <p>To send data payload along with the event, you must place it inside the <code>detail</code> property of the CustomEvent configuration object. In the parent's handler, you extract it via <code>event.detail</code>.</p>
      <h3>Event Bubbling and Retargeting</h3>
      <p>By default, custom events do not bubble up the DOM tree—they stop at the parent. If you set <code>bubbles: true</code>, the event travels up through the ancestor hierarchy. However, because of Shadow DOM encapsulation, the browser applies <strong>Event Retargeting</strong>. When an event bubbles out of the child\'s shadow tree, the <code>event.target</code> changes to the child\'s host element. This prevents the parent from seeing the private internal HTML structure of the child.</p>
    `,
    examples: [
      {
        title: 'Dispatching an Event with Data',
        description: 'The child fires an event containing a payload.',
        language: 'javascript',
        code: `/* Child JS */
handleItemClick(event) {
    const selectedId = '001xx000003Dxxx'; // Mock ID
    
    // Create the event. Name must be lowercase!
    const myEvent = new CustomEvent('recordselect', {
        detail: { recordId: selectedId }
    });
    
    // Fire it up to the parent
    this.dispatchEvent(myEvent);
}`,
        explanation: 'Always put your payload inside the "detail" object. Do not try to attach properties directly to the event object.'
      },
      {
        title: 'Listening in the Parent HTML',
        description: 'The parent declaratively listens for the event.',
        language: 'javascript',
        code: `<!-- Parent HTML -->
<template>
    <!-- Prefix the event name with 'on' -->
    <c-child-list onrecordselect={handleSelection}></c-child-list>
</template>

/* Parent JS */
handleSelection(event) {
    // Extract the data from the detail object
    const id = event.detail.recordId;
    console.log('Parent received ID: ', id);
}`,
        explanation: 'The child dispatched "recordselect". In HTML, the parent listens using "on" + "recordselect" = "onrecordselect".'
      },
      {
        title: 'Bubbling Events',
        description: 'Allowing an event to travel up multiple levels (Grandparent).',
        language: 'javascript',
        code: `/* Grandchild JS */
notifyUpperLevels() {
    // bubbles allows it to pass through the direct parent
    // composed allows it to cross the Shadow DOM boundary completely
    const evt = new CustomEvent('globalalert', {
        bubbles: true,
        composed: true,
        detail: { msg: 'System Failure' }
    });
    this.dispatchEvent(evt);
}`,
        explanation: 'Use bubbling sparingly. Using composed: true breaks encapsulation (the event leaks into the global DOM) and is considered an anti-pattern unless absolutely necessary.'
      }
    ],
            practice: {
      intro: 'Event Architecture: Firing and handling custom events.',
      steps: [
        'Create two LWCs: "parentApp" and "childSearch".',
        'In childSearch HTML, add an input and a button:\n<lightning-input type="search"></lightning-input>\n<lightning-button label="Search" onclick={handleSearch}></lightning-button>',
        'In childSearch JS, capture the input value in a variable called searchTerm.',
        'Inside handleSearch(), dispatch a custom event:\nthis.dispatchEvent(new CustomEvent("searchfired", { detail: this.searchTerm }));',
        'In parentApp JS, declare a property "query" and a method:\nhandleSearchFired(event) { this.query = event.detail; }',
        'In parentApp HTML, instantiate the child and attach the listener:\n<c-child-search onsearchfired={handleSearchFired}></c-child-search>',
        'Below the child, add an H1:\n<h1>You searched for: {query}</h1>',
        'Deploy both. Add parentApp to a Lightning Page.',
        'Type a value in the child component, click search, and watch the parent instantly update.'
      ],
      expectedOutcome: 'A complete understanding of bottom-up communication in the LWC component tree using CustomEvent and event.detail.'
    },
    interviewQuestions: [
      { scenario: 'Why must CustomEvent names be exclusively lowercase?', answer: 'Because HTML attributes are case-insensitive. If a child dispatches an event named "myCustomEvent", the browser will attempt to match it to an attribute. A parent listening with `onmyCustomEvent={...}` will fail because the browser converts the attribute to `onmycustomevent`. Lowercase ensures strict matching.' },
      { scenario: 'What is Event Retargeting in the context of Shadow DOM?', answer: 'When a child component fires a bubbling event from an internal element (like a button), and that event crosses the Shadow DOM boundary to the parent, the browser alters the `event.target` property to point to the child host element `<c-child>`, hiding the internal `<button>` from the parent to preserve encapsulation.' },
      { scenario: 'Where exactly must you store your custom data payload when dispatching a CustomEvent?', answer: 'The data must be stored within the `detail` property of the configuration object passed as the second argument to `new CustomEvent(eventName, { detail: { ... } })`.' },
      { scenario: 'What does setting `composed: true` do on a CustomEvent?', answer: 'It allows the event to break through the Shadow Root boundary and continue bubbling up the global HTML document tree. Without it, the event stops at the boundary of the Shadow DOM it was fired within.' },
      { scenario: 'Why does Salesforce generally discourage the use of `composed: true`?', answer: 'It breaks encapsulation. A component should not broadcast events to the entire document, as it leads to spaghetti architecture where unrelated components accidentally catch events. For cross-component communication, Lightning Message Service (LMS) should be used instead.' }
    ]
  },
  "4.10": {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 4.10 Wire Service</p>
        <p>The <code>@wire</code> service is the backbone of declarative data fetching in LWC. It provisions a reactive stream of data from either Lightning Data Service (LDS) adapters or custom Apex methods.</p>
      </div>
      <h3>Reactivity and the "$" Prefix</h3>
      <p>The true power of <code>@wire</code> is its reactivity. If you pass a dynamic parameter into the wire configuration using the <code>$</code> prefix (e.g., <code>{ recordId: \'$recordId\' }</code>), the framework watches that property. When the property changes, the wire service automatically re-executes the server call or pulls fresh data from the LDS cache without you writing any trigger logic.</p>
      <h3>Wired Properties vs Wired Functions</h3>
      <p>You can wire data directly into a property. The framework will automatically assign an object containing <code>data</code> and <code>error</code> keys to that property. Alternatively, you can wire data into a function. The function runs automatically whenever new data arrives. You use a wired function when you need to manipulate the data (e.g., adding properties or reshaping arrays) before the UI renders it, or when you need to trigger subsequent secondary logic.</p>
      <h3>Immutable Cache</h3>
      <p>Data returned by a wire is heavily cached and strictly immutable (read-only). If you use a wired function and attempt to mutate <code>data.push(newObj)</code>, the browser will throw a severe error. You must deep-clone the data using <code>JSON.parse(JSON.stringify(data))</code> or the spread operator before modifying it.</p>
    `,
    examples: [
      {
        title: 'Wiring to a Property',
        description: 'The simplest way to get data, ideal when no manipulation is required.',
        language: 'javascript',
        code: `import { LightningElement, api, wire } from 'lwc';
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
// </template>`,
        explanation: 'The HTML template must explicitly check for the ".data" property.'
      },
      {
        title: 'Wiring to a Function (Data Manipulation)',
        description: 'Used when you need to process the data before rendering.',
        language: 'javascript',
        code: `import { LightningElement, wire } from 'lwc';
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
}`,
        explanation: 'The wired function receives an object containing both data and error. Destructuring it directly into {error, data} is the standard convention.'
      },
      {
        title: 'Forcing a Cache Refresh',
        description: 'Wire data is cached. If you know the DB changed, you must force a refresh.',
        language: 'javascript',
        code: `import { LightningElement, wire } from 'lwc';
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
}`,
        explanation: 'refreshApex requires the complete wrapper object (which contains both data and error), not just the data portion.'
      }
    ],
            practice: {
      intro: 'Reactive Wire: Fetching Salesforce data dynamically.',
      steps: [
        'Create an Apex class named "AccountController" with a method:\n@AuraEnabled(cacheable=true)\npublic static List<Account> getAccounts(String industry) {\n    return [SELECT Id, Name FROM Account WHERE Industry = :industry LIMIT 10];\n}',
        'Create an LWC named "wireViewer".',
        'In JS, import the Apex method:\nimport getAccounts from "@salesforce/apex/AccountController.getAccounts";',
        'Declare a property:\nselectedIndustry = "Technology";',
        'Provision the data using the reactive wire service:\n@wire(getAccounts, { industry: "$selectedIndustry" }) wiredAccounts;',
        'In HTML, build the UI to handle the response:\n<template lwc:if={wiredAccounts.data}> ... </template>\n<template lwc:elseif={wiredAccounts.error}> ... </template>',
        'Add a <lightning-combobox> to the HTML that lets the user select an Industry (Technology, Finance, Energy).',
        'Bind the combobox onchange to a method that updates this.selectedIndustry.',
        'Deploy and test. Notice that as you change the combobox, the $selectedIndustry triggers the wire service to automatically fetch new data from Salesforce WITHOUT a page refresh.'
      ],
      expectedOutcome: 'Fluency in connecting LWC to Apex seamlessly using the reactive @wire service and dynamic parameters.'
    },
    interviewQuestions: [
      { scenario: 'What does the "$" prefix do when passing parameters to the `@wire` service?', answer: 'The "$" prefix makes the parameter reactive. It binds the wire service to a class property. Whenever the value of that class property changes, the wire service automatically detects the change and re-executes the server call to fetch fresh data based on the new parameter.' },
      { scenario: 'If you use a wired function, why will `data.push(newRecord)` throw a JavaScript error?', answer: 'Data provisioned by the `@wire` service is heavily cached by Lightning Data Service. To protect the integrity of the cache, the framework makes the returned `data` object strictly immutable (read-only). If you need to modify it, you must create a deep clone (e.g., using `JSON.parse(JSON.stringify(data))` or the spread operator).' },
      { scenario: 'What is the specific requirement for an Apex method to be compatible with `@wire`?', answer: 'The Apex method must be declared as `static` and it must be annotated with `@AuraEnabled(cacheable=true)`. If `cacheable=true` is missing, the wire service will fail to execute it.' },
      { scenario: 'When should you choose a wired function instead of a wired property?', answer: 'You use a wired function when you need to intercept and manipulate the data (like reshaping an array or calculating totals) before it is rendered, or when the arrival of data needs to trigger secondary imperative logic (like dispatching an event to a parent).' },
      { scenario: 'How do you force the `@wire` cache to invalidate and fetch fresh data from the server?', answer: 'You import `refreshApex` from `@salesforce/apex`. If using a wired function, you must save the complete raw result object (containing both data and error) to a variable. When you want to refresh, you call `refreshApex(thatSavedVariable)`.' }
    ]
  }
};
