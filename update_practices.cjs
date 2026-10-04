const fs = require('fs');

const detailedPractices = {
  "4.1": `    practice: {
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
    },`,
  "4.2": `    practice: {
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
    },`,
  "4.3": `    practice: {
      intro: 'Bundle Architecture: Scaffolding and deploying a component to the UI.',
      steps: [
        'In VS Code, create a new LWC named "orgInfoBanner". Notice it creates 3 files: orgInfoBanner.html, orgInfoBanner.js, and orgInfoBanner.js-meta.xml.',
        'Open orgInfoBanner.html and add:\\n<div class="banner">Welcome to the Org!</div>',
        'Open orgInfoBanner.js and verify it imports LightningElement and exports a default class.',
        'Open orgInfoBanner.js-meta.xml. This is the crucial step to make it visible to Admins.',
        'Change <isExposed>false</isExposed> to <isExposed>true</isExposed>.',
        'Immediately below <masterLabel>, add a targets block:\\n<targets>\\n    <target>lightning__HomePage</target>\\n    <target>lightning__RecordPage</target>\\n</targets>',
        'Deploy the component (Right-click -> Deploy Source to Org).',
        'Log into your Org, navigate to the Sales App Home Page, click the Gear Icon -> Edit Page.',
        'Look under "Custom" components on the left. Drag "orgInfoBanner" onto the canvas, save, and activate.'
      ],
      expectedOutcome: 'You will successfully bridge the gap between local code and the Salesforce drag-and-drop admin interface using the XML configuration file.'
    },`,
  "4.4": `    practice: {
      intro: 'Data Binding: Building a reactive calculator form.',
      steps: [
        'Create a new LWC named "reactiveCalculator".',
        'In the HTML file, create two input fields:\\n<lightning-input type="number" label="Price" onchange={handlePriceChange}></lightning-input>\\n<lightning-input type="number" label="Quantity" onchange={handleQtyChange}></lightning-input>',
        'Below the inputs, add an H1 tag to display the total:\\n<h1>Total Cost: {totalCost}</h1>',
        'Add a button that is conditionally disabled based on invalid input:\\n<lightning-button disabled={isInvalid} label="Checkout"></lightning-button>',
        'In the JS file, declare two properties:\\nprice = 0;\\nqty = 0;',
        'Write the event handlers:\\nhandlePriceChange(event) { this.price = event.target.value; }\\nhandleQtyChange(event) { this.qty = event.target.value; }',
        'Create the getter for totalCost:\\nget totalCost() { return this.price * this.qty; }',
        'Create the getter for isInvalid:\\nget isInvalid() { return this.price <= 0 || this.qty <= 0; }',
        'Deploy, add to a page, and test. Notice how the total updates instantly and the button disables/enables dynamically without any querySelector logic.'
      ],
      expectedOutcome: 'Mastery of unidirectional data flow: HTML triggering JS events, and JS getters automatically updating HTML.'
    },`,
  "4.5": `    practice: {
      intro: 'Deep Reactivity: Proving when to use @track vs reassignment.',
      steps: [
        'Create a new LWC named "deepTracker".',
        'In the JS file, import LightningElement (do NOT import @track yet).',
        'Create a property containing an array of objects:\\ntaskList = [{id: 1, name: "Wash Car"}];',
        'In the HTML, iterate over taskList using <template for:each={taskList} for:item="task"> and display {task.name}.',
        'Add a button:\\n<lightning-button label="Add Task (Push)" onclick={handlePush}></lightning-button>',
        'In JS, write handlePush():\\nhandlePush() {\\n    this.taskList.push({id: 2, name: "Mow Lawn"});\\n    console.log(this.taskList);\\n}',
        'Deploy and click the button. Look at the console—the array HAS the new item, but the UI did NOT update because the memory reference of the array didn\\'t change.',
        'Now add a second button calling handleReassign(). Write:\\nhandleReassign() {\\n    this.taskList = [...this.taskList, {id: 3, name: "Buy Groceries"}];\\n}',
        'Deploy and click Reassign. The UI instantly updates! This proves reassignment triggers reactivity.',
        'Finally, import @track, add it to taskList (@track taskList), deploy, and click the "Push" button. It now works because @track observes deep mutations.'
      ],
      expectedOutcome: 'A concrete understanding of JavaScript memory references, deep mutation vs shallow reactivity, and the exact necessity of @track.'
    },`,
  "4.6": `    practice: {
      intro: 'Styling Mastery: Combining SLDS and Scoped CSS.',
      steps: [
        'Create an LWC named "styledCard".',
        'In the HTML, construct a card using pure SLDS classes (do not write custom CSS yet):\\n<article class="slds-card">\\n    <div class="slds-card__header slds-grid">\\n        <header class="slds-media slds-media_center slds-has-flexi-truncate">\\n            <h2><span class="slds-text-heading_small">Account Details</span></h2>\\n        </header>\\n    </div>\\n    <div class="slds-card__body slds-card__body_inner">Inner content</div>\\n</article>',
        'Deploy and observe that it perfectly matches the standard Salesforce UI.',
        'Now, create a file named "styledCard.css" in your bundle.',
        'Add a rule:\\nh2 { color: red; font-size: 2rem; }',
        'Deploy again. Notice that ONLY the h2 inside your component turned red, proving Shadow DOM encapsulation prevented it from bleeding out to the rest of Salesforce.',
        'Finally, add a standard <lightning-button label="Submit"></lightning-button>.',
        'In your CSS, attempt to style the internal button text color:\\nlightning-button button { color: green; }\\nDeploy and notice it fails.',
        'Fix it using Styling Hooks:\\n:host { --sds-c-button-brand-color-background: green; }\\nand change the button variant to "brand". Deploy and watch it work.'
      ],
      expectedOutcome: 'Confidence in using SLDS for layout, Shadow DOM for isolation, and CSS variables (Styling Hooks) to pierce shadow boundaries.'
    },`,
  "4.7": `    practice: {
      intro: 'Logic in UI: Implementing complex conditional chains.',
      steps: [
        'Create an LWC named "conditionalWizard".',
        'In JS, declare a property:\\nstep = 1;',
        'Create two methods:\\nhandleNext() { this.step++; }\\nhandlePrev() { this.step--; }',
        'In HTML, implement modern conditional directives (available API 59.0+):\\n<template lwc:if={isStepOne}><h1>Welcome to Step 1</h1></template>\\n<template lwc:elseif={isStepTwo}><h1>You are on Step 2</h1></template>\\n<template lwc:else><h1>Final Step</h1></template>',
        'In JS, create the required getters:\\nget isStepOne() { return this.step === 1; }\\nget isStepTwo() { return this.step === 2; }',
        'Below the conditionals, add Next and Prev buttons, conditionally disabling "Prev" if step is 1, and "Next" if step is 3.',
        'Deploy and click through the wizard, ensuring the DOM cleanly replaces the elements.'
      ],
      expectedOutcome: 'Fluency in using lwc:if, lwc:elseif, and lwc:else to build multi-state UI flows efficiently.'
    },`,
  "4.8": `    practice: {
      intro: 'List Mastery: Rendering and manipulating arrays in the DOM.',
      steps: [
        'Create an LWC named "contactGallery".',
        'In JS, declare an array of objects:\\ncontacts = [{id: "001", name: "Alice", role: "CEO"}, {id: "002", name: "Bob", role: "CTO"}];',
        'In HTML, use the standard iterator:\\n<template for:each={contacts} for:item="contact">',
        'Inside the loop, you MUST provide a key on the top-level element:\\n<div key={contact.id} class="slds-box slds-m-bottom_small">',
        'Display the contact name and role inside the div.',
        'Deploy and verify the list renders.',
        'Now, replace the for:each loop with the advanced iterator:\\n<template iterator:it={contacts}>',
        'Inside the loop, change the key to:\\n<div key={it.value.id}>',
        'Add a special header that ONLY renders for the first item:\\n<h1 lwc:if={it.first}>Executive Team</h1>',
        'Add a special footer that ONLY renders for the last item:\\n<p lwc:if={it.last}>End of List</p>',
        'Deploy and verify the first/last elements render correctly.'
      ],
      expectedOutcome: 'Mastery of list rendering, strict key requirements, and advanced iteration mechanics.'
    },`,
  "4.9": `    practice: {
      intro: 'Event Architecture: Firing and handling custom events.',
      steps: [
        'Create two LWCs: "parentApp" and "childSearch".',
        'In childSearch HTML, add an input and a button:\\n<lightning-input type="search"></lightning-input>\\n<lightning-button label="Search" onclick={handleSearch}></lightning-button>',
        'In childSearch JS, capture the input value in a variable called searchTerm.',
        'Inside handleSearch(), dispatch a custom event:\\nthis.dispatchEvent(new CustomEvent("searchfired", { detail: this.searchTerm }));',
        'In parentApp JS, declare a property "query" and a method:\\nhandleSearchFired(event) { this.query = event.detail; }',
        'In parentApp HTML, instantiate the child and attach the listener:\\n<c-child-search onsearchfired={handleSearchFired}></c-child-search>',
        'Below the child, add an H1:\\n<h1>You searched for: {query}</h1>',
        'Deploy both. Add parentApp to a Lightning Page.',
        'Type a value in the child component, click search, and watch the parent instantly update.'
      ],
      expectedOutcome: 'A complete understanding of bottom-up communication in the LWC component tree using CustomEvent and event.detail.'
    },`,
  "4.10": `    practice: {
      intro: 'Reactive Wire: Fetching Salesforce data dynamically.',
      steps: [
        'Create an Apex class named "AccountController" with a method:\\n@AuraEnabled(cacheable=true)\\npublic static List<Account> getAccounts(String industry) {\\n    return [SELECT Id, Name FROM Account WHERE Industry = :industry LIMIT 10];\\n}',
        'Create an LWC named "wireViewer".',
        'In JS, import the Apex method:\\nimport getAccounts from "@salesforce/apex/AccountController.getAccounts";',
        'Declare a property:\\nselectedIndustry = "Technology";',
        'Provision the data using the reactive wire service:\\n@wire(getAccounts, { industry: "$selectedIndustry" }) wiredAccounts;',
        'In HTML, build the UI to handle the response:\\n<template lwc:if={wiredAccounts.data}> ... </template>\\n<template lwc:elseif={wiredAccounts.error}> ... </template>',
        'Add a <lightning-combobox> to the HTML that lets the user select an Industry (Technology, Finance, Energy).',
        'Bind the combobox onchange to a method that updates this.selectedIndustry.',
        'Deploy and test. Notice that as you change the combobox, the $selectedIndustry triggers the wire service to automatically fetch new data from Salesforce WITHOUT a page refresh.'
      ],
      expectedOutcome: 'Fluency in connecting LWC to Apex seamlessly using the reactive @wire service and dynamic parameters.'
    },`,
  "4.11": `    practice: {
      intro: 'Imperative Apex: Executing DML from LWC.',
      steps: [
        'Create an Apex class "ContactManager" with a method:\\n@AuraEnabled\\npublic static Id createContact(String lastName) {\\n    Contact c = new Contact(LastName=lastName);\\n    insert c;\\n    return c.Id;\\n}',
        'Note that (cacheable=true) is MISSING because we are performing DML (Insert).',
        'Create an LWC named "imperativeForm".',
        'In HTML, add an input for Last Name and a "Create Contact" button.',
        'In JS, import the method:\\nimport createContact from "@salesforce/apex/ContactManager.createContact";',
        'Write an async handler for the button click:\\nasync handleCreate() {\\n    try {\\n        const recordId = await createContact({ lastName: this.inputValue });\\n        console.log("Success! ID: " + recordId);\\n    } catch (error) {\\n        console.error("Error", error.body.message);\\n    }\\n}',
        'Deploy, place on a page, enter a name, and click Create. Check the console for the new ID, and verify in Salesforce that the record exists.'
      ],
      expectedOutcome: 'Understanding how to call Apex imperatively using Promises/async-await when DML prevents the use of @wire.'
    },`,
  "4.12": `    practice: {
      intro: 'Navigation: Routing users natively.',
      steps: [
        'Create an LWC named "navButton".',
        'In JS, import NavigationMixin:\\nimport { NavigationMixin } from "lightning/navigation";',
        'Extend it:\\nexport default class NavButton extends NavigationMixin(LightningElement) { ... }',
        'Add an @api recordId; property.',
        'Create a method handleNavigate():\\nthis[NavigationMixin.Navigate]({\\n    type: "standard__recordPage",\\n    attributes: {\\n        recordId: this.recordId,\\n        objectApiName: "Account",\\n        actionName: "edit"\\n    }\\n});',
        'In HTML, add a button labeled "Edit This Account" that calls handleNavigate.',
        'Expose the component in XML to lightning__RecordPage.',
        'Deploy, add it to an Account Record Page, click it, and watch the standard Edit modal open seamlessly.'
      ],
      expectedOutcome: 'Ability to trigger standard Salesforce navigation events (view, edit, list) programmatically from custom components.'
    },`,
  "4.13": `    practice: {
      intro: 'Data Services: Building forms without Apex.',
      steps: [
        'Create an LWC named "quickAccountEdit".',
        'In JS, add @api recordId; (to get the current record ID automatically).',
        'In HTML, construct a lightning-record-edit-form:\\n<lightning-record-edit-form record-id={recordId} object-api-name="Account" onsuccess={handleSuccess}>',
        'Inside the form, add fields:\\n<lightning-messages></lightning-messages>\\n<lightning-input-field field-name="Name"></lightning-input-field>\\n<lightning-input-field field-name="Industry"></lightning-input-field>',
        'Add a submit button at the bottom:\\n<lightning-button type="submit" label="Save" variant="brand"></lightning-button>',
        'Close the form:\\n</lightning-record-edit-form>',
        'In JS, implement handleSuccess:\\nhandleSuccess(event) { alert("Saved! ID: " + event.detail.id); }',
        'Expose the component to lightning__RecordPage.',
        'Deploy, add it to an Account page. Edit the fields and click Save.',
        'Notice that it queries, renders, validates, and saves the data securely to Salesforce without a single line of Apex code.'
      ],
      expectedOutcome: 'Proficiency in utilizing Lightning Data Service components to radically accelerate form development.'
    },`,
  "4.14": `    practice: {
      intro: 'Datatable: Rendering advanced, sortable grids.',
      steps: [
        'Create an LWC named "advancedGrid".',
        'In JS, define a columns array:\\nconst COLUMNS = [\\n    { label: "Name", fieldName: "Name", editable: true },\\n    { label: "Amount", fieldName: "Amount", type: "currency", sortable: true },\\n    { label: "Close Date", fieldName: "CloseDate", type: "date" }\\n];',
        'Expose columns to the template:\\ncolumns = COLUMNS;',
        'Create dummy data in an array called "oppData" mimicking the structure.',
        'In HTML, implement the datatable:\\n<lightning-datatable key-field="Id" data={oppData} columns={columns}></lightning-datatable>',
        'Deploy and preview.',
        'Now, implement sorting. Add "onsort={handleSort}" to the HTML.',
        'In JS, write handleSort():\\nhandleSort(event) {\\n    const { fieldName, sortDirection } = event.detail;\\n    // implement array sorting logic...\\n}',
        'Deploy and test clicking the Amount column header to verify sorting UI activates.'
      ],
      expectedOutcome: 'Ability to construct complex, highly interactive data grids that match native Salesforce list views.'
    },`,
  "4.15": `    practice: {
      intro: 'Deployment & CI/CD: Mastering the CLI pipeline.',
      steps: [
        'Open your terminal in VS Code.',
        'Run a command to retrieve all components from the org to ensure you are synced:\\nsf project retrieve start -m LightningComponentBundle',
        'Create a dummy test class in Apex (e.g., LwcTestDummy) so we have tests to run.',
        'Simulate a production validation deployment by running:\\nsf project deploy start --target-org prod --dry-run --test-level RunLocalTests',
        'Watch the terminal output. A dry run verifies that all LWC code compiles, XML configs are valid, and Apex tests pass, WITHOUT actually committing changes to the org.',
        'Review the resulting deployment report in the CLI.',
        'Finally, commit your LWC bundle into your local Git repository:\\ngit add force-app/main/default/lwc/myComponent\\ngit commit -m "feat: added new LWC"'
      ],
      expectedOutcome: 'Complete confidence in safely validating and deploying LWC components to production environments using modern DevOps commands.'
    },`
};

for (const file of [
  './js/data/m4/part1.js',
  './js/data/m4/part2.js',
  './js/data/m4/part3.js'
]) {
  let content = fs.readFileSync(file, 'utf8');
  
  for (const [lessonId, newPractice] of Object.entries(detailedPractices)) {
    const searchString = `"${lessonId}":`;
    if (content.includes(searchString)) {
      const startIndex = content.indexOf(searchString);
      const practiceIndex = content.indexOf('practice: {', startIndex);
      const interviewIndex = content.indexOf('interviewQuestions: [', practiceIndex);
      
      if (practiceIndex !== -1 && interviewIndex !== -1 && interviewIndex > practiceIndex) {
        const before = content.slice(0, practiceIndex);
        const after = content.slice(interviewIndex);
        content = before + newPractice + '\\n    ' + after;
      }
    }
  }
  fs.writeFileSync(file, content);
}
console.log('Practices updated successfully.');
