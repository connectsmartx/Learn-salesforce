export const interviewQuestions = {
  "1": [
    {
      "question": "What is the difference between a Profile and a Role in Salesforce?",
      "answer": "A Profile controls what a user can DO (Object permissions, Field-Level Security, App access). A Role controls what records a user can SEE (Record-level access via the Role Hierarchy). Every user must have exactly one Profile, but a Role is optional.\n\n*Reference: Salesforce Help: Profiles and Roles*"
    },
    {
      "question": "What are Organization-Wide Defaults (OWD)?",
      "answer": "OWD is the baseline level of access that the most restricted user should have to records they do not own. It is the foundation of the sharing model. Access can only be opened up (via Roles, Sharing Rules) from the OWD, it cannot be restricted further.\n\n*Reference: Trailhead: Data Security > Control Access to Records*"
    },
    {
      "question": "Explain the difference between a Master-Detail and a Lookup relationship.",
      "answer": "In a Master-Detail relationship, the child record is tightly bound to the parent (cascade delete, inherits security, requires a parent). In a Lookup relationship, the child is independent (can exist without parent, has its own security, no cascade delete by default).\n\n*Reference: Salesforce Help: Object Relationships Overview*"
    },
    {
      "question": "What is a Junction Object and why is it used?",
      "answer": "A junction object is a custom object with two Master-Detail relationships. It is used to create a Many-to-Many relationship between two other objects (e.g., Job Postings and Applicants linked by a Job Application object).\n\n*Reference: Trailhead: Data Modeling > Create a Many-to-Many Relationship*"
    },
    {
      "question": "What are Validation Rules and when do they fire?",
      "answer": "Validation Rules ensure data integrity by verifying that data entered by a user meets specific criteria before the record is saved. They fire during the 'Before Save' portion of the order of execution.\n\n*Reference: Salesforce Help: Validation Rules*"
    },
    {
      "question": "What is the difference between a Standard Object and a Custom Object?",
      "answer": "Standard objects are provided by Salesforce out-of-the-box (e.g., Account, Contact, Opportunity). Custom objects are created by administrators to store data specific to the organization's business needs.\n\n*Reference: Trailhead: Data Modeling > Understand Custom & Standard Objects*"
    },
    {
      "question": "How does Field-Level Security (FLS) differ from Page Layouts?",
      "answer": "FLS controls visibility and editability of a field universally at the database level (API, Reports, Views). Page Layouts only control visibility on the UI. If a field is hidden via FLS, a user cannot query it via API; if hidden only on Page Layout, they can still query it.\n\n*Reference: Salesforce Help: Field-Level Security*"
    },
    {
      "question": "What happens when a Lead is converted?",
      "answer": "When a Lead is converted, Salesforce takes the data from the Lead and creates a new Account, Contact, and optionally an Opportunity. Custom fields on the Lead must be explicitly mapped to custom fields on the target objects.\n\n*Reference: Trailhead: Lead Management*"
    },
    {
      "question": "What is a Roll-up Summary field?",
      "answer": "A Roll-up Summary field calculates values (Count, Sum, Min, Max) from related child records in a Master-Detail relationship. It sits on the Master object.\n\n*Reference: Salesforce Help: Roll-Up Summary Field*"
    },
    {
      "question": "What is the difference between Data Loader and the Data Import Wizard?",
      "answer": "Data Import Wizard handles up to 50,000 records, supports basic deduplication, and has a simple UI. Data Loader handles up to 5,000,000 records, supports all objects, requires installation, and can be scheduled via CLI.\n\n*Reference: Trailhead: Data Management > Import Data*"
    },
    {
      "question": "What is a Record Type?",
      "answer": "Record Types allow you to offer different business processes, picklist values, and page layouts to different users based on their Profile. For example, a 'Support Case' vs a 'Billing Case'.\n\n*Reference: Salesforce Help: Record Types*"
    },
    {
      "question": "Can you convert a Lookup relationship to a Master-Detail relationship?",
      "answer": "Yes, but only if every single existing child record has a value in the lookup field. If there are orphan records, the conversion will be blocked.\n\n*Reference: Salesforce Help: Changing Custom Field Type*"
    },
    {
      "question": "What is a Dependent Picklist?",
      "answer": "A dependent picklist restricts the available values in one picklist (the dependent) based on the value selected in another field (the controlling field). Checkboxes can be controlling fields, but not dependent fields.\n\n*Reference: Salesforce Help: Dependent Picklists*"
    },
    {
      "question": "What is the difference between a Formula field and a Roll-up Summary field?",
      "answer": "Formula fields calculate values using fields on the same record or parent records (moving upwards in the hierarchy). Roll-up summaries calculate aggregate values from child records (moving downwards) and require a Master-Detail relationship.\n\n*Reference: Trailhead: Point-and-Click Developer*"
    },
    {
      "question": "What is an External ID?",
      "answer": "An External ID is a custom field that has the 'External ID' attribute checked. It contains unique identifiers from a system outside of Salesforce and is used to prevent duplicate records during Upsert operations via Data Loader or API.\n\n*Reference: Salesforce Help: External ID*"
    },
    {
      "question": "What is Field History Tracking?",
      "answer": "It allows you to track changes to up to 20 standard or custom fields on an object. It records the date, time, user, old value, and new value in a related History list.\n\n*Reference: Salesforce Help: Field History Tracking*"
    },
    {
      "question": "What happens to a Junction Object record if one of the Master records is deleted?",
      "answer": "Because it has two Master-Detail relationships, deleting either of the parent (Master) records will result in the immediate cascade deletion of the junction (child) record.\n\n*Reference: Salesforce Help: Considerations for Relationships*"
    },
    {
      "question": "What is an App in Salesforce?",
      "answer": "An App is a collection of tabs that operate as a unit to provide application functionality. Switching apps just changes the navigation menu, it does not change the underlying database or security access.\n\n*Reference: Trailhead: Platform Basics > Get Started with Salesforce*"
    },
    {
      "question": "What is a Global Picklist Value Set?",
      "answer": "It is a shared set of picklist values that can be reused across multiple custom picklist fields and objects. If you update the global set, all fields using it are updated.\n\n*Reference: Salesforce Help: Global Picklist Value Sets*"
    },
    {
      "question": "What is the Recycle Bin?",
      "answer": "When records are deleted, they are moved to the Recycle Bin where they stay for 15 days before being permanently purged. They can be restored during this window.\n\n*Reference: Salesforce Help: Recycle Bin*"
    }
  ],
  "2": [
    {
      "question": "What is the difference between a Workflow Rule and a Flow?",
      "answer": "Workflow Rules are legacy automation tools that can only update fields, send emails, create tasks, or send outbound messages. Flow is the modern, robust automation engine that can query data, loop through records, perform complex logic, and create any record.\n\n*Reference: Trailhead: Automate Your Business Processes*"
    },
    {
      "question": "Explain the concept of 'Order of Execution' in Salesforce.",
      "answer": "When a record is saved, Salesforce executes logic in a specific order: 1. System Validation, 2. Before Triggers, 3. Custom Validation Rules, 4. After Triggers, 5. Assignment Rules, 6. Auto-Response Rules, 7. Workflow Rules, 8. Escalation Rules, 9. Roll-up Summaries. (Flows have specific slots for Before-Save and After-Save).\n\n*Reference: Salesforce Help: Triggers and Order of Execution*"
    },
    {
      "question": "What is a Record-Triggered Flow?",
      "answer": "A Record-Triggered Flow runs automatically when a record is created, updated, or deleted. It replaces the need for most Apex triggers. It can run 'Before Save' (for fast field updates) or 'After Save' (for related record operations).\n\n*Reference: Trailhead: Record-Triggered Flows*"
    },
    {
      "question": "What is a Screen Flow?",
      "answer": "A Screen Flow provides a guided UI experience. It can pause for user input via forms, execute logic based on that input, and then update the database. Screen Flows can be embedded in Lightning Pages, Utility Bars, or launched via Quick Actions.\n\n*Reference: Trailhead: Screen Flows*"
    },
    {
      "question": "How do you bypass Validation Rules in an automated process?",
      "answer": "Validation rules cannot be natively 'turned off' for specific automations. The best practice is to add a custom checkbox field (e.g., 'Bypass_Validation__c') to the User or Profile, and add logic to the Validation Rule that checks if this flag is false before firing.\n\n*Reference: Salesforce Developer Blog: Bypassing Validation Rules*"
    },
    {
      "question": "What is a Scheduled Flow?",
      "answer": "A Scheduled Flow is an auto-launched flow that starts at a specific time and frequency (daily, weekly) for a batch of records that meet specific criteria.\n\n*Reference: Salesforce Help: Schedule-Triggered Flows*"
    },
    {
      "question": "Can a Flow perform DML operations (Insert/Update) inside a Loop?",
      "answer": "Technically yes, but it is a massive anti-pattern. Doing so will cause the Flow to hit SOQL/DML governor limits (e.g., Too many DML statements: 151). You must use an Assignment element in the loop to add records to a Collection, and perform one DML Update outside the loop.\n\n*Reference: Trailhead: Flow Best Practices*"
    },
    {
      "question": "What is an Approval Process?",
      "answer": "An Approval Process is an automated routing of a record for approval. It defines the steps to approve, the users who must approve, and the actions that happen upon approval, rejection, or recall (such as locking the record from edits).\n\n*Reference: Trailhead: Approval Processes*"
    },
    {
      "question": "What is a Custom Metadata Type?",
      "answer": "Custom Metadata Types are customizable, deployable application configuration records. Unlike Custom Settings, the records themselves are metadata, meaning they can be deployed via Change Sets or SFDX.\n\n*Reference: Salesforce Help: Custom Metadata Types*"
    },
    {
      "question": "What is a Permission Set Group?",
      "answer": "A Permission Set Group bundles multiple Permission Sets together based on user roles or job functions. Users assigned to the group inherit all permissions from the bundled sets.\n\n*Reference: Salesforce Help: Permission Set Groups*"
    },
    {
      "question": "What is the difference between a Public Group and a Queue?",
      "answer": "A Public Group is a collection of users used for sharing rules (granting access). A Queue is a holding area for unassigned records (like Cases or Leads) until a user accepts ownership.\n\n*Reference: Salesforce Help: Groups and Queues*"
    },
    {
      "question": "What are Sharing Rules?",
      "answer": "Sharing Rules are automated exceptions to Organization-Wide Defaults (OWD). They grant lateral access to records based on record ownership or criteria (e.g., all Accounts where Industry='Tech' are shared with the Sales group).\n\n*Reference: Trailhead: Data Security*"
    },
    {
      "question": "What is Manual Sharing?",
      "answer": "Manual Sharing allows the owner of a record, or someone above them in the hierarchy, to explicitly share a single record with another user or group via the 'Share' button. This is only available if OWD is Private or Public Read Only.\n\n*Reference: Salesforce Help: Manual Sharing*"
    },
    {
      "question": "What is the difference between Before-Save and After-Save Flows?",
      "answer": "Before-Save flows are incredibly fast (10x faster) because they update the triggering record before it hits the database. After-Save flows run after the record is saved, allowing them to access the new ID and update related records.\n\n*Reference: Salesforce Developer Blog: Record-Triggered Flows*"
    },
    {
      "question": "What happens if a Flow encounters an error?",
      "answer": "If a Flow fails (e.g., DML exception), it rolls back the entire database transaction and sends an email to the admin. You can use 'Fault Paths' to catch errors gracefully and show custom messages or log the error.\n\n*Reference: Salesforce Help: Flow Fault Paths*"
    },
    {
      "question": "What is a Dynamic Dashboard?",
      "answer": "A Dynamic Dashboard displays data tailored to the logged-in user viewing it, rather than a fixed running user. This ensures users only see data they are permitted to see based on their security settings.\n\n*Reference: Salesforce Help: Dynamic Dashboards*"
    },
    {
      "question": "What is a Custom Report Type?",
      "answer": "A Custom Report Type acts as a template for reports. It defines the relationships between objects (e.g., 'Accounts with or without Contacts') and specifies exactly which fields are available to the report builder.\n\n*Reference: Trailhead: Reports & Dashboards*"
    },
    {
      "question": "What is Event Monitoring?",
      "answer": "Event Monitoring is a Shield feature that provides API access to detailed logs of user activity (logins, reports exported, API calls). It is primarily used for security auditing and usage tracking.\n\n*Reference: Trailhead: Event Monitoring*"
    },
    {
      "question": "What is Identity Provider (IdP) and Service Provider (SP) in SSO?",
      "answer": "In Single Sign-On (SSO), the IdP verifies who the user is (e.g., Okta, Active Directory). The SP is the application the user wants to access (e.g., Salesforce). Salesforce can act as both an IdP and an SP.\n\n*Reference: Trailhead: Identity Basics*"
    },
    {
      "question": "What is a Partial Copy Sandbox?",
      "answer": "A Partial Sandbox includes a copy of your production metadata and a sample of your production data (up to 10,000 records per selected object). It is used for QA and UAT testing.\n\n*Reference: Salesforce Help: Sandbox Types*"
    }
  ],
  "3": [
    {
      "question": "What are Governor Limits?",
      "answer": "Because Salesforce operates in a multi-tenant environment, Governor Limits prevent any single tenant from monopolizing shared resources (CPU, Memory, DB connections). Examples: 100 SOQL queries per sync transaction, 150 DML statements.\n\n*Reference: Trailhead: Apex Basics & Database*"
    },
    {
      "question": "What is bulkification?",
      "answer": "Bulkification is the practice of writing code that handles collections of records (Lists, Sets) rather than processing single records one at a time. This ensures the code scales properly without hitting limits when processing data imports.\n\n*Reference: Trailhead: Bulk Apex Triggers*"
    },
    {
      "question": "Explain the difference between a Map, List, and Set in Apex.",
      "answer": "List: An ordered collection of elements that allows duplicates. Set: An unordered collection of unique elements (no duplicates). Map: A collection of key-value pairs where each key maps to a single value.\n\n*Reference: Apex Developer Guide: Collections*"
    },
    {
      "question": "What is the difference between Database.insert() and the insert DML statement?",
      "answer": "The `insert` keyword rolls back the entire transaction if any record fails. `Database.insert(records, false)` allows partial success; it commits the valid records and returns errors for the failed ones without halting execution.\n\n*Reference: Apex Developer Guide: Database Methods*"
    },
    {
      "question": "What is a Trigger Handler pattern?",
      "answer": "It is an architecture where the Apex Trigger itself contains no logic (logic-less). Instead, the trigger immediately calls a separate Handler class to execute the logic based on the trigger context (e.g., BeforeInsert, AfterUpdate).\n\n*Reference: Salesforce Developer Blog: Apex Trigger Best Practices*"
    },
    {
      "question": "What is the difference between @future and Queueable Apex?",
      "answer": "@future methods are basic asynchronous fire-and-forget methods that cannot take sObjects as parameters and cannot be chained. Queueable Apex allows passing complex types (like sObjects), can be chained (one calling another), and returns a Job ID for tracking.\n\n*Reference: Trailhead: Asynchronous Apex*"
    },
    {
      "question": "What is Batch Apex?",
      "answer": "Batch Apex processes massive amounts of data (up to 50 million records) by breaking the work into smaller chunks (batches of 200 records by default). The class must implement `Database.Batchable`.\n\n*Reference: Trailhead: Batch Apex*"
    },
    {
      "question": "What does the WITH SECURITY_ENFORCED clause do?",
      "answer": "Added to a SOQL query, it ensures that the query will throw an exception if the user does not have Field-Level Security or Object-level read access to the requested fields/objects.\n\n*Reference: Apex Developer Guide: Enforcing Security*"
    },
    {
      "question": "How do you test a web service callout in an Apex Test class?",
      "answer": "Test classes cannot make real HTTP callouts. You must create a class that implements the `HttpCalloutMock` interface and use `Test.setMock()` to return a simulated response.\n\n*Reference: Trailhead: Apex Integration Services*"
    },
    {
      "question": "What is a Mixed DML Error?",
      "answer": "This error occurs when you attempt to perform DML on a Setup object (like User or Group) and a non-Setup object (like Account) within the same synchronous transaction. You must separate them by moving one operation to an asynchronous method (like @future).\n\n*Reference: Apex Developer Guide: Mixed DML*"
    },
    {
      "question": "What is the SOQL limit in a synchronous transaction?",
      "answer": "You can execute a maximum of 100 SOQL queries per synchronous transaction. In an asynchronous transaction (like Batch or Queueable), the limit is 200.\n\n*Reference: Salesforce Help: Execution Governors and Limits*"
    },
    {
      "question": "What is the DML limit in a synchronous transaction?",
      "answer": "You can execute a maximum of 150 DML statements (insert, update, delete) per synchronous transaction, regardless of synchronous or asynchronous context.\n\n*Reference: Salesforce Help: Execution Governors and Limits*"
    },
    {
      "question": "What does Test.startTest() and Test.stopTest() do?",
      "answer": "They establish a new set of governor limits for the code enclosed within them. This ensures your test execution setup data doesn't count against the limits of the code you are actually testing. stopTest() also forces any asynchronous jobs to run synchronously.\n\n*Reference: Apex Developer Guide: Using Limits in Tests*"
    },
    {
      "question": "What is the difference between SOQL and SOSL?",
      "answer": "SOQL (Salesforce Object Query Language) is used to query specific fields from a single object and its related objects. SOSL (Salesforce Object Search Language) is used for full-text searches across multiple unrelated objects simultaneously.\n\n*Reference: Trailhead: SOQL vs SOSL*"
    },
    {
      "question": "What is Database.Stateful in Batch Apex?",
      "answer": "By default, instance variables in a Batch Apex class are reset between batches. If you implement Database.Stateful, the class retains its state (e.g., an error counter) across all execute methods until the finish method is called.\n\n*Reference: Apex Developer Guide: Using Batch Apex*"
    },
    {
      "question": "What does the 'without sharing' keyword do on an Apex class?",
      "answer": "It enforces that the code ignores the Organization-Wide Defaults, Sharing Rules, and Manual Sharing for the running user, granting the code full access to all records in the database. (It does not bypass CRUD/FLS).\n\n*Reference: Apex Developer Guide: Using the with sharing, without sharing*"
    },
    {
      "question": "What is System.runAs() used for?",
      "answer": "System.runAs() is used in test classes to execute a block of code within the context of a specific user. This is crucial for testing whether Sharing Rules and Record Visibility are functioning correctly for that profile/role.\n\n*Reference: Apex Developer Guide: Testing Custom Controllers*"
    },
    {
      "question": "Can you call a @future method from a Batch Apex execute method?",
      "answer": "No. Calling a @future method from within a Batch execute method is explicitly prohibited and will throw an exception.\n\n*Reference: Salesforce Help: Asynchronous Apex Limits*"
    },
    {
      "question": "What is the purpose of a Savepoint?",
      "answer": "Database.setSavepoint() allows you to mark a specific state in the database. If an error occurs later in the transaction, you can use Database.rollback(sp) to undo DML operations made after the savepoint.\n\n*Reference: Apex Developer Guide: Transaction Control*"
    },
    {
      "question": "What is Platform Cache?",
      "answer": "Platform Cache is a memory layer in Salesforce used to store session or org-level data. By storing frequently accessed, static data (like complex SOQL results) in memory, you improve application performance.\n\n*Reference: Trailhead: Platform Cache Basics*"
    },
    {
      "question": "How do you bypass governor limits?",
      "answer": "You cannot bypass governor limits. They are hard limits. You must redesign your code using bulkification, asynchronous processing, or caching to operate within the limits.\n\n*Reference: Salesforce Fundamentals*"
    },
    {
      "question": "What is an Apex Exception?",
      "answer": "An exception is an error that disrupts the normal flow of execution, such as a NullPointerException or DmlException. They can be caught using a try-catch-finally block to handle the error gracefully.\n\n*Reference: Apex Developer Guide: Exceptions*"
    },
    {
      "question": "What is custom metadata type used for in Apex?",
      "answer": "Since custom metadata records are loaded into the application cache, querying them does not count against SOQL limits. They are ideal for storing configurable variables like API keys or routing logic.\n\n*Reference: Salesforce Developer Blog*"
    },
    {
      "question": "What happens if a SOQL query returns no records?",
      "answer": "If assigned to a List, the List will be empty. If assigned to a single sObject variable (e.g., Account a = [SELECT Id FROM Account LIMIT 1]), it will throw a System.QueryException: List has no rows for assignment.\n\n*Reference: Apex Developer Guide: SOQL*"
    },
    {
      "question": "What is a Scheduled Apex class?",
      "answer": "It is a class that implements the Schedulable interface, allowing you to use System.schedule() to execute the code at specified times via a CRON expression.\n\n*Reference: Apex Developer Guide: Apex Scheduler*"
    }
  ],
  "4": [
    {
      "question": "What is the fundamental architecture of Lightning Web Components (LWC)?",
      "answer": "LWC leverages native web standards (Web Components, Custom Elements, Shadow DOM, ES modules) running on the browser, rather than a custom framework abstraction like Aura. This results in lightweight, high-performance UI components.\n\n*Reference: Trailhead: Lightning Web Components Basics*"
    },
    {
      "question": "What does the @api decorator do?",
      "answer": "The @api decorator exposes a public property or method, allowing a parent component to pass data down to the child component or invoke the child's method.\n\n*Reference: LWC Developer Guide: @api*"
    },
    {
      "question": "What does the @track decorator do?",
      "answer": "Historically, it made primitive properties reactive. Since Spring '20, all properties are reactive by default. Now, @track is only used to tell the framework to observe deep mutations (changes to properties inside an object or array).\n\n*Reference: LWC Developer Guide: Reactivity*"
    },
    {
      "question": "How does @wire work?",
      "answer": "The @wire decorator provisions data reactively from a Salesforce wire adapter or Apex method. When the parameters passed to the wire change, the wire automatically re-fetches the data and updates the component.\n\n*Reference: LWC Developer Guide: Use the Wire Service*"
    },
    {
      "question": "What is Lightning Data Service (LDS)?",
      "answer": "LDS is the data caching and synchronization layer for LWC. It allows components to read, create, and modify Salesforce records without writing Apex. If two components on a page use LDS for the same record, updates to one reflect instantly in the other.\n\n*Reference: Trailhead: Lightning Data Service*"
    },
    {
      "question": "How do child components communicate with parent components?",
      "answer": "Child components dispatch standard DOM CustomEvents (e.g., `this.dispatchEvent(new CustomEvent('select'))`). The parent component listens to these events via HTML attributes (e.g., `onselect={handleSelect}`).\n\n*Reference: LWC Developer Guide: Events*"
    },
    {
      "question": "What is Shadow DOM?",
      "answer": "Shadow DOM is a web standard that encapsulates a component's internal DOM structure and CSS. This prevents a component's styles from bleeding out and affecting the rest of the page, and prevents external styles from bleeding in.\n\n*Reference: LWC Developer Guide: Shadow DOM*"
    },
    {
      "question": "What is Lightning Message Service (LMS)?",
      "answer": "LMS is a publish-subscribe communication mechanism that allows unrelated components (siblings, LWC-to-Aura, LWC-to-Visualforce) to communicate across the entire Lightning Page using Message Channels.\n\n*Reference: Trailhead: Lightning Message Service*"
    },
    {
      "question": "What is the difference between a wire service and imperative Apex?",
      "answer": "@wire is reactive and automatic; it requires the Apex method to be `cacheable=true` (read-only). Imperative Apex is invoked manually via JavaScript promises (e.g., on a button click) and is required when you need to perform DML (Insert/Update) since cacheable methods cannot perform DML.\n\n*Reference: LWC Developer Guide: Call Apex Methods*"
    },
    {
      "question": "Explain the connectedCallback() lifecycle hook.",
      "answer": "connectedCallback() fires when the component is inserted into the document (DOM). It is the ideal place to perform initialization tasks like subscribing to an LMS channel or setting up component state.\n\n*Reference: LWC Developer Guide: Lifecycle Hooks*"
    },
    {
      "question": "Explain the renderedCallback() lifecycle hook.",
      "answer": "renderedCallback() fires after every render of the component. You must be extremely careful not to update reactive properties inside it without a guard clause, otherwise it triggers an infinite rendering loop.\n\n*Reference: LWC Developer Guide: Lifecycle Hooks*"
    },
    {
      "question": "Explain the disconnectedCallback() lifecycle hook.",
      "answer": "disconnectedCallback() fires when the component is removed from the DOM. It is used to clean up resources, such as unsubscribing from LMS channels or clearing setInterval timers to prevent memory leaks.\n\n*Reference: LWC Developer Guide: Lifecycle Hooks*"
    },
    {
      "question": "What is the errorCallback() lifecycle hook?",
      "answer": "errorCallback(error, stack) acts as an error boundary. It captures errors that occur during the rendering or lifecycle hooks of any child component, allowing the parent to display an error state gracefully.\n\n*Reference: LWC Developer Guide: Lifecycle Hooks*"
    },
    {
      "question": "Why do we need a 'key' attribute in a for:each loop?",
      "answer": "The key attribute assigns a unique identifier to each item in the array. This allows the LWC rendering engine to track which elements are added, removed, or reordered without re-rendering the entire list, ensuring high performance.\n\n*Reference: LWC Developer Guide: Render Lists*"
    },
    {
      "question": "What is a slot?",
      "answer": "A <slot> is a placeholder inside a component that allows a parent component to inject external HTML markup into the child's Shadow DOM, enabling flexible composition.\n\n*Reference: LWC Developer Guide: Slots*"
    },
    {
      "question": "What is Lightning Locker / LWS?",
      "answer": "Lightning Web Security (LWS) and Locker are security architectures that isolate components by namespace. They prevent malicious components from reading data from other components or tampering with the global DOM (preventing Cross-Site Scripting).\n\n*Reference: LWC Developer Guide: Security*"
    },
    {
      "question": "How do you call an Apex method from LWC?",
      "answer": "You import the Apex method from the '@salesforce/apex/Class.Method' module. You can then invoke it either reactively using @wire or imperatively as a standard JavaScript function that returns a Promise.\n\n*Reference: LWC Developer Guide: Call Apex Methods*"
    },
    {
      "question": "What does 'composed: true' mean in a CustomEvent?",
      "answer": "By default, events do not cross the Shadow DOM boundary. Setting 'composed: true' (along with 'bubbles: true') allows the event to break out of the component's Shadow DOM and propagate up to the document root.\n\n*Reference: LWC Developer Guide: Events*"
    },
    {
      "question": "How do you import a static resource in LWC?",
      "answer": "You import it using the scoped module syntax: `import myResource from '@salesforce/resourceUrl/myResourceName';`.\n\n*Reference: LWC Developer Guide: Static Resources*"
    },
    {
      "question": "How do you query elements inside an LWC?",
      "answer": "Because of Shadow DOM, you cannot use `document.querySelector`. You must use `this.template.querySelector('.my-class')` to access elements within the component's specific template.\n\n*Reference: LWC Developer Guide: Query the DOM*"
    },
    {
      "question": "What is NavigationMixin?",
      "answer": "NavigationMixin is a module that provides methods (`this[NavigationMixin.Navigate]`) to programmatically route the user to standard Salesforce pages, records, object homes, or external URLs without hardcoding URLs.\n\n*Reference: LWC Developer Guide: Navigate*"
    },
    {
      "question": "How do you show a toast message in LWC?",
      "answer": "You import `ShowToastEvent` from `lightning/platformShowToastEvent`, instantiate it with a title, message, and variant (success/error), and dispatch it using `this.dispatchEvent(new ShowToastEvent({...}))`.\n\n*Reference: LWC Developer Guide: Toast Notifications*"
    },
    {
      "question": "How do you share JavaScript code between LWCs?",
      "answer": "You create a Service Component, which is an LWC containing only a `.js` file (no HTML). You export the utility functions from that file, and then import them into your other LWCs.\n\n*Reference: LWC Developer Guide: Share Code*"
    },
    {
      "question": "What is the purpose of the js-meta.xml file?",
      "answer": "The metadata XML file defines the component's configuration. It specifies whether the component is `isExposed` (visible to builders), defines which targets (App Page, Record Page) it supports, and configures design attributes (properties exposed to the admin in App Builder).\n\n*Reference: LWC Developer Guide: XML Configuration*"
    },
    {
      "question": "How do you test LWC components?",
      "answer": "LWC components are tested locally using the Jest testing framework (`sfdx-lwc-jest`). Tests are completely isolated from Salesforce and use mocked data to ensure the UI behaves correctly based on state changes.\n\n*Reference: LWC Developer Guide: Testing*"
    }
  ]
};