/* ============================================================
   USE CASES DATA — 50 Comprehensive Real-World Salesforce Projects
   Each use case is a detailed, step-by-step build guide with
   💡 Concept boxes, Build Steps, API Names, and Reference Tables.
   ============================================================ */

export const useCases = [

  // ================================================================
  // USE CASE 1
  // ================================================================
  {
    id: 1,
    title: 'TechNova Support System — Data Model, Security & Governance',
    difficulty: 'Easy',
    category: 'Admin / Data Modeling',
    company: 'TechNova Solutions',
    subtitle: 'Build the complete foundation: custom objects, fields, profiles, OWD, sharing, validation, queues, approval processes, and reporting.',
    tags: ['Objects', 'Fields', 'Profiles', 'OWD', 'Sharing Rules', 'Validation Rules', 'Queues', 'Approval Process', 'Reports'],
    description: 'TechNova Solutions is a B2B SaaS company that sells subscription-based software. They need a Salesforce org configured from scratch to manage customer subscriptions, support cases, security, and reporting.',
    learnings: [
      'Create custom objects and fields with correct data types',
      'Design Record Types for different business processes',
      'Set up Profiles and Permission Sets for role-based access',
      'Configure Organization-Wide Defaults and Sharing Rules',
      'Build Validation Rules, Queues, and Approval Processes',
      'Create Reports and Dashboards for management visibility'
    ],
    content: `
      <h2>Background</h2>
      <p>TechNova Solutions is a B2B SaaS company. They sell subscription-based project management software to mid-market companies. Their support team handles billing disputes and technical issues, and they need Salesforce configured from scratch to manage everything.</p>
      <p>We will build in the order a real implementation would: foundation first, because later steps depend on earlier ones (you cannot create a Sharing Rule on a field that doesn't exist yet).</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → Custom Object · Step 2 → Fields on Subscription · Step 3 → Fields on Case · Step 4 → Record Types · Step 5 → Profiles · Step 6 → Permission Set · Step 7 → Role Hierarchy · Step 8 → OWD · Step 9 → Public Group & Sharing Rule · Step 10 → Validation Rule · Step 11 → Duplicate Rule · Step 12 → Queues · Step 13 → Approval Process · Step 14 → Reports & Dashboard</p>
      </div>

      <h2>Step 1: Create the Subscription Custom Object</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Custom Object</p>
        <p>An <strong>Object</strong> is like a database table. <strong>Standard Objects</strong> (Account, Contact, Case) come built-in. A <strong>Custom Object</strong> is one you create for a business need Salesforce doesn't have out of the box; its API Name always ends in <code>__c</code>.</p>
      </div>
      <p><strong>Purpose:</strong> Cases and later automation need to know which plan/tier a customer is on, so we need somewhere to store that data first.</p>
      <h3>Build Steps</h3>
      <ol class="step-list">
        <li class="step-list__item">Click the <strong>Setup gear icon</strong> → Setup.</li>
        <li class="step-list__item">In Quick Find, type <strong>"Object Manager"</strong> and click it.</li>
        <li class="step-list__item">Click <strong>Create → Custom Object</strong>.</li>
        <li class="step-list__item">Label: <code>Subscription</code>. Plural Label: <code>Subscriptions</code>.</li>
        <li class="step-list__item">Object Name auto-fills as <code>Subscription</code>; API Name becomes <code>Subscription__c</code>.</li>
        <li class="step-list__item">Check <strong>"Allow Reports"</strong> and <strong>"Track Activities"</strong>.</li>
        <li class="step-list__item">Click <strong>Save</strong>.</li>
      </ol>

      <h2>Step 2: Add Fields to Subscription__c</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Fields</p>
        <p>A <strong>Field</strong> is like a column in a table — one piece of data stored on every record. Custom fields also end in <code>__c</code>. Common types: Text, Number, Currency, Date, Checkbox, Picklist, Lookup, Formula.</p>
      </div>
      <p><strong>Purpose:</strong> We need to know which Account the subscription belongs to, what plan tier it is, when it started/ends, and its revenue value.</p>
      <h3>Build Steps (repeat for each field)</h3>
      <ol class="step-list">
        <li class="step-list__item">From Object Manager, open <code>Subscription__c</code> → Fields & Relationships → New.</li>
        <li class="step-list__item">Choose the field type, click Next.</li>
        <li class="step-list__item">Enter Field Label; API Name auto-fills. Confirm it matches the table below.</li>
        <li class="step-list__item">Set picklist values, required checkbox, or related object as specified.</li>
        <li class="step-list__item">Set Field-Level Security for each profile; click Save.</li>
      </ol>
      <table><thead><tr><th>Field Label</th><th>API Name</th><th>Type</th><th>Details</th></tr></thead><tbody>
        <tr><td>Account</td><td><code>Account__c</code></td><td>Lookup(Account)</td><td>Required = true</td></tr>
        <tr><td>Plan</td><td><code>Plan__c</code></td><td>Picklist</td><td>Values: Starter, Pro, Enterprise</td></tr>
        <tr><td>Start Date</td><td><code>Start_Date__c</code></td><td>Date</td><td></td></tr>
        <tr><td>End Date</td><td><code>End_Date__c</code></td><td>Date</td><td>Used for renewal calculations</td></tr>
        <tr><td>MRR</td><td><code>MRR__c</code></td><td>Currency</td><td>Monthly Recurring Revenue</td></tr>
      </tbody></table>

      <h2>Step 3: Add Custom Fields to Case</h2>
      <p><strong>Purpose:</strong> Case needs to know which Subscription it relates to, SLA due time, escalation status, and require resolution notes before closing.</p>
      <table><thead><tr><th>Field Label</th><th>API Name</th><th>Type</th><th>Details</th></tr></thead><tbody>
        <tr><td>Subscription</td><td><code>Subscription__c</code></td><td>Lookup(Subscription__c)</td><td>Links Case to customer's plan</td></tr>
        <tr><td>SLA Due</td><td><code>SLA_Due__c</code></td><td>Date/Time</td><td>Auto-calculated by Flow</td></tr>
        <tr><td>Escalated</td><td><code>Escalated__c</code></td><td>Checkbox</td><td>Defaults unchecked</td></tr>
        <tr><td>Resolution Notes</td><td><code>Resolution_Notes__c</code></td><td>Long Text Area (500)</td><td>Required before Status = Closed</td></tr>
      </tbody></table>

      <h2>Step 4: Create Record Types on Case</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Record Types</p>
        <p>A <strong>Record Type</strong> lets a single object support more than one business process. Each Record Type can show different picklist values and optionally a different page layout, while remaining the same underlying object.</p>
      </div>
      <p><strong>Purpose:</strong> Billing issues and Technical issues need different Case Reason options. An agent handling a billing dispute shouldn't see "Outage" in their picklist.</p>
      <table><thead><tr><th>Record Type Label</th><th>API Name</th><th>Restricted Picklist Values</th></tr></thead><tbody>
        <tr><td>Billing Case</td><td><code>Billing_Case</code></td><td>Invoice, Refund, Payment Failed</td></tr>
        <tr><td>Technical Case</td><td><code>Technical_Case</code></td><td>Bug, Outage, How-To</td></tr>
      </tbody></table>

      <h2>Step 5: Create Profiles</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Profiles</p>
        <p>A <strong>Profile</strong> is the baseline permission set every user must have exactly one of. It controls CRUD access to objects, field-level security, app/tab visibility, and more.</p>
      </div>
      <table><thead><tr><th>Profile Label</th><th>API Name</th><th>Cloned From</th><th>Key Differences</th></tr></thead><tbody>
        <tr><td>Support Agent</td><td><code>Support_Agent</code></td><td>Standard User</td><td>Case: Read/Create/Edit, no Delete</td></tr>
        <tr><td>Support Manager</td><td><code>Support_Manager</code></td><td>Support Agent</td><td>Adds Case Delete + report folder access</td></tr>
      </tbody></table>

      <h2>Step 6: Create a Permission Set</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Permission Sets</p>
        <p>A <strong>Permission Set</strong> grants additional permissions on top of a Profile without cloning a whole new profile. A user can have many Permission Sets but only one Profile.</p>
      </div>
      <p><strong>Purpose:</strong> Only senior agents should manually edit <code>Escalated__c</code>. A Permission Set grants that to specific individuals regardless of profile.</p>
      <table><thead><tr><th>Component</th><th>API Name</th><th>Grants</th></tr></thead><tbody>
        <tr><td>Permission Set</td><td><code>Case_Escalation_Access</code></td><td>Edit access to Case.Escalated__c</td></tr>
      </tbody></table>

      <h2>Step 7: Set Up Role Hierarchy</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Role Hierarchy</p>
        <p><strong>Role Hierarchy</strong> is an org-chart structure that automatically gives anyone above a user in the hierarchy access to that user's records.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Setup → Quick Find → Roles → Set Up Roles.</li>
        <li class="step-list__item">Add role: <strong>Support Manager</strong>, reporting to CEO/Executive.</li>
        <li class="step-list__item">Add role: <strong>Support Agent</strong>, reporting to Support Manager.</li>
        <li class="step-list__item">Assign each User to the matching role on their user detail page.</li>
      </ol>

      <h2>Step 8: Set Organization-Wide Defaults (OWD)</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — OWD</p>
        <p><strong>OWD</strong> is the strictest baseline sharing setting for an object — Private, Public Read Only, or Public Read/Write. Sharing Rules and Role Hierarchy only ever <em>open</em> access wider, never restrict it further.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Setup → Sharing Settings → Edit.</li>
        <li class="step-list__item">Set <strong>Case = Private</strong>. Set <strong>Account = Public Read Only</strong>. Save.</li>
      </ol>

      <h2>Step 9: Public Group & Sharing Rule</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Sharing Rules</p>
        <p>A <strong>Sharing Rule</strong> opens access wider than OWD/role hierarchy, based on ownership or criteria on the record's fields. A <strong>Public Group</strong> is a named bundle of users/roles you can share with in one step.</p>
      </div>
      <table><thead><tr><th>Component</th><th>API Name</th><th>Detail</th></tr></thead><tbody>
        <tr><td>Public Group</td><td><code>Escalation_Team</code></td><td>Tier 2 agents + managers</td></tr>
        <tr><td>Sharing Rule</td><td><code>Case_Share_High_Priority</code></td><td>Priority = High → Read/Write to Escalation_Team</td></tr>
      </tbody></table>

      <h2>Step 10: Validation Rule</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Validation Rules</p>
        <p>A <strong>Validation Rule</strong> is a formula that must evaluate to FALSE for a record to save; if TRUE, Salesforce blocks the save and shows an error message.</p>
      </div>
      <p><strong>Rule Name:</strong> <code>Require_Resolution_Notes_On_Close</code></p>
      <p><strong>Formula:</strong></p>
      <pre><code>AND(
  ISPICKVAL(Status, "Closed"),
  ISBLANK(Resolution_Notes__c)
)</code></pre>
      <p><strong>Error Message:</strong> "Please enter Resolution Notes before closing this Case."</p>

      <h2>Step 11: Duplicate Rule</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Duplicate Rules</p>
        <p>A <strong>Duplicate Rule</strong> works with a <strong>Matching Rule</strong> to detect and prevent duplicate records from being created, ensuring data hygiene.</p>
      </div>
      <p><strong>Purpose:</strong> Prevent users from creating a Contact if one with the same exact email already exists.</p>
      <ol class="step-list">
        <li class="step-list__item">Setup → Matching Rules → New. Select <strong>Contact</strong>. Criteria: Email exact match. Activate it.</li>
        <li class="step-list__item">Setup → Duplicate Rules → New Rule → Contact.</li>
        <li class="step-list__item">Rule Name: <code>Contact_Duplicate_Email</code>. Action on Create: Block. Action on Edit: Block.</li>
        <li class="step-list__item">Select the Matching Rule you just created. Activate the Duplicate Rule.</li>
      </ol>

      <h2>Step 12: Configure Queues</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Queues</p>
        <p>A <strong>Queue</strong> is a holding pen for records (like Cases or Leads) that do not yet have a specific owner. Users who are members of the Queue can pick records out of it.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Setup → Queues → New.</li>
        <li class="step-list__item">Label: <code>Tier1_Support_Queue</code>. Supported Object: Case. Add all Tier 1 Agents to Queue Members.</li>
        <li class="step-list__item">Repeat the process to create <code>Tier2_Support_Queue</code> for escalated issues.</li>
      </ol>

      <h2>Step 13: Build an Approval Process</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Approval Processes</p>
        <p>An <strong>Approval Process</strong> automates how records are approved. It specifies who must approve, and what actions (field updates, emails) happen upon approval or rejection.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Setup → Approval Processes. Select <strong>Opportunity</strong>. Use the Jump Start Wizard.</li>
        <li class="step-list__item">Name: <code>Opportunity_Discount_Approval</code>. Entry Criteria: Discount % > 20.</li>
        <li class="step-list__item">Approver: Manager of the record owner.</li>
        <li class="step-list__item">Add Final Approval Action: Field Update setting Stage to "Discount Approved". Add Final Rejection Action setting Stage back to "Negotiation".</li>
        <li class="step-list__item">Activate the Approval Process.</li>
      </ol>

      <h2>Step 14: Reports and Dashboards</h2>
      <p><strong>Purpose:</strong> Management needs visibility into how well the support team is adhering to SLAs.</p>
      <ol class="step-list">
        <li class="step-list__item">App Launcher → Reports. Click <strong>New Report</strong>. Report Type: Cases.</li>
        <li class="step-list__item">Filter: All Cases, All Time. Group By: Owner and Status. Add a formula column to calculate SLA adherence.</li>
        <li class="step-list__item">Save as <code>SLA_Compliance_Report</code> in a Public Folder.</li>
        <li class="step-list__item">App Launcher → Dashboards → New. Name it <code>SLA_Compliance_Dashboard</code>.</li>
        <li class="step-list__item">Add a Gauge component showing total breached cases, and a Bar Chart showing cases by owner. Save and Activate.</li>
      </ol>
    `
  },

  // ================================================================
  // USE CASE 2
  // ================================================================
  {
    id: 2,
    title: 'TechNova Flow Automation — SLA, Routing & Escalation',
    difficulty: 'Medium',
    category: 'Flow Automation',
    company: 'TechNova Solutions',
    subtitle: 'Build 6 Flows: Screen Flow wizard, Before-Save & After-Save triggers, Scheduled Flow, and reusable Subflows.',
    tags: ['Screen Flow', 'Record-Triggered Flow', 'Scheduled Flow', 'Subflow', 'Before-Save', 'After-Save'],
    description: 'Continuing from Use Case 1, the data model is complete but nothing moves or reacts on its own yet. We build 6 Flows to automate Case creation, SLA calculation, queue routing, and breach detection.',
    learnings: [
      'Differentiate between Screen, Record-Triggered, Scheduled, and Autolaunched Flows',
      'Understand Before-Save vs After-Save trigger timing',
      'Build reusable Subflows for DRY automation',
      'Implement bulk-safe Scheduled Flows',
      'Map the complete Order of Execution when a Case is created'
    ],
    content: `
      <h2>Recap from Use Case 1</h2>
      <p>Use Case 1 built: <code>Subscription__c</code> object, custom fields on Case, Record Types, Profiles, sharing, validation, queues, and reporting. None of that data moves on its own yet — that's what Flow does.</p>

      
      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 &rarr; Calculate Renewal Date (Autolaunched) &middot; Step 2 &rarr; Send Case Confirmation Email (Subflow) &middot; Step 3 &rarr; New Case Wizard (Screen Flow) &middot; Step 4 &rarr; Set SLA Due (Before-Save, Record-Triggered) &middot; Step 5 &rarr; Assign Case Queue (After-Save, Record-Triggered) &middot; Step 6 &rarr; SLA Breach Checker (Scheduled Flow) &middot; Step 7 &rarr; Consolidated Flow API Reference</p>
      </div>
<div class="callout callout--definition">
        <p class="callout__title">💡 Concept — What is Flow?</p>
        <p><strong>Flow</strong> is Salesforce's point-and-click automation tool. Instead of writing code, you assemble visual elements — get data, make a decision, change data, show a screen — and Salesforce executes that logic automatically.</p>
      </div>

      <h3>The Four Flow Types</h3>
      <table><thead><tr><th>Flow Type</th><th>Runs When</th><th>TechNova Example</th></tr></thead><tbody>
        <tr><td>Screen Flow</td><td>User clicks through a guided form</td><td>New Case Wizard</td></tr>
        <tr><td>Record-Triggered</td><td>Record is created/updated/deleted</td><td>SLA calculation, Queue assignment</td></tr>
        <tr><td>Scheduled</td><td>On a recurring schedule</td><td>SLA Breach Checker</td></tr>
        <tr><td>Autolaunched</td><td>Called by another Flow or Apex</td><td>Renewal Date Calculator</td></tr>
      </tbody></table>

      <div class="callout callout--tip">
        <p class="callout__title">💡 Before-Save vs After-Save</p>
        <p><strong>Before-Save</strong> changes fields on the same record being saved, before it hits the database — faster, no extra DML. <strong>After-Save</strong> runs once the record exists and is needed when touching other records, sending emails, or anything beyond the triggering record.</p>
      </div>

      <h2>Flow 1: Calculate Renewal Date (Autolaunched)</h2>
      <p><strong>Purpose:</strong> The renewal-date formula will be needed by multiple Flows and later by Agentforce — building it once avoids duplicating logic.</p>
      <ol class="step-list">
        <li class="step-list__item">New Flow → <strong>Autolaunched Flow (No Trigger)</strong>.</li>
        <li class="step-list__item">Add input variable <code>subscriptionId</code> (Text, Available for Input = true).</li>
        <li class="step-list__item">Add <strong>Get Records</strong>: Object = <code>Subscription__c</code>, filter Id = subscriptionId.</li>
        <li class="step-list__item">Add Assignment: add 12 months to <code>End_Date__c</code>, store in output variable <code>renewalDate</code>.</li>
        <li class="step-list__item">Save as <code>Calculate_Renewal_Date</code>. Activate.</li>
      </ol>

      <h2>Flow 2: Send Case Confirmation Email (Subflow)</h2>
      <p><strong>Purpose:</strong> Both the internal wizard and the Community portal need the same confirmation email — build once, reuse everywhere.</p>
      <table><thead><tr><th>Component</th><th>API Name</th><th>Type</th><th>Input</th></tr></thead><tbody>
        <tr><td>Flow</td><td><code>Send_Case_Confirmation_Email</code></td><td>Autolaunched (Subflow)</td><td>caseId (Text)</td></tr>
      </tbody></table>

      <h2>Flow 3: New Case Wizard (Screen Flow)</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Screen Flow</p>
        <p>A <strong>Screen Flow</strong> is the only Flow type with a user interface. It shows Screens, pausing for user input, then acts on what they entered.</p>
      </div>
      <p><strong>Purpose:</strong> Instead of a blank New Case form, the wizard guides agents through exactly the fields needed, in order, and auto-sends the confirmation email.</p>
      <ol class="step-list">
        <li class="step-list__item">New Flow → <strong>Screen Flow</strong>.</li>
        <li class="step-list__item"><strong>Screen 1</strong> (Select_Subscription): Lookup component for Subscription.</li>
        <li class="step-list__item"><strong>Screen 2</strong> (Enter_Case_Details): Subject, Description, Priority inputs.</li>
        <li class="step-list__item"><strong>Decision</strong> (Route_By_Plan): Branch on Plan__c to pre-set Priority (Enterprise → High).</li>
        <li class="step-list__item"><strong>Create Records</strong> (Create_Case): Insert the Case. Add a <strong>Fault Path</strong> for error handling.</li>
        <li class="step-list__item"><strong>Subflow</strong>: Call <code>Send_Case_Confirmation_Email</code>, passing the new Case Id.</li>
        <li class="step-list__item"><strong>Screen 3</strong> (Confirmation): Display the new Case Number.</li>
      </ol>

      <h2>Flow 4: Set SLA Due (Before-Save, Record-Triggered)</h2>
      <p><strong>Purpose:</strong> Every new Case needs <code>SLA_Due__c</code> set the instant it's created, regardless of which channel created it.</p>
      <ol class="step-list">
        <li class="step-list__item">New Flow → <strong>Record-Triggered Flow</strong>. Object: Case. Trigger: Created. Optimize: <strong>Fast Field Updates</strong>.</li>
        <li class="step-list__item"><strong>Decision</strong>: Branch on Priority (High / Medium / Low).</li>
        <li class="step-list__item"><strong>Assignment</strong>: Set <code>$Record.SLA_Due__c</code> = Now() + 4 hours (High), +1 day (Medium), +3 days (Low).</li>
      </ol>
      <table><thead><tr><th>API Name</th><th>Object</th><th>Trigger</th></tr></thead><tbody>
        <tr><td><code>Case_Set_SLA_Due_BeforeSave</code></td><td>Case</td><td>Before Save — Create</td></tr>
      </tbody></table>

      <h2>Flow 5: Assign Case Queue (After-Save, Record-Triggered)</h2>
      <p><strong>Purpose:</strong> Assigning the Owner to a Queue and emailing that team both require the Case to already exist.</p>
      <ol class="step-list">
        <li class="step-list__item">New Flow → <strong>Record-Triggered Flow</strong>. Object: Case. Trigger: Created. Optimize: <strong>Actions and Related Records</strong>.</li>
        <li class="step-list__item"><strong>Decision</strong>: Choose <code>Tier1_Support_Queue</code> or <code>Tier2_Support_Queue</code> based on Priority/Record Type.</li>
        <li class="step-list__item"><strong>Update Records</strong>: Set OwnerId to the chosen Queue Id.</li>
        <li class="step-list__item"><strong>Send Email</strong> action to notify the queue's team. Add <strong>Fault Paths</strong> on all DML elements.</li>
      </ol>

      <h2>Flow 6: SLA Breach Checker (Scheduled Flow)</h2>
      <div class="callout callout--warning">
        <p class="callout__title">⚠️ï¸ Why a Scheduled Flow?</p>
        <p>SLA breaches must be caught even if nobody edits the Case. A purely reactive (record-triggered) Flow would never notice a Case sitting untouched past its due time. Only a time-based check can catch that.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">New Flow → <strong>Schedule-Triggered Flow</strong>. Frequency: Hourly.</li>
        <li class="step-list__item"><strong>Get Records</strong>: Case where Status ≠ Closed AND SLA_Due__c < NOW().</li>
        <li class="step-list__item"><strong>Loop</strong> over results → <strong>Assignment</strong>: set Escalated__c = true, collect into a collection variable.</li>
        <li class="step-list__item"><strong>After the loop</strong> (never inside): <strong>Update Records</strong> to save the collection in bulk.</li>
        <li class="step-list__item"><strong>Send Email</strong> to notify Support Manager.</li>
      </ol>

      <h2>Order of Execution (When a Case Is Created)</h2>
      <table><thead><tr><th>Order</th><th>What Runs</th></tr></thead><tbody>
        <tr><td>1</td><td>Validation Rules (from Use Case 1)</td></tr>
        <tr><td>2</td><td><code>Case_Set_SLA_Due_BeforeSave</code> sets SLA_Due__c</td></tr>
        <tr><td>3</td><td>Record commits to database, gets an Id</td></tr>
        <tr><td>4</td><td><code>Case_Assign_Queue_AfterSave</code> sets Owner, sends routing email</td></tr>
        <tr><td>5</td><td><code>Send_Case_Confirmation_Email</code> emails the customer</td></tr>
        <tr><td>6</td><td>Later, on schedule: <code>SLA_Breach_Checker_Scheduled</code> checks breaches</td></tr>
      </tbody></table>

      <h2>Consolidated Flow API Reference</h2>
      <table><thead><tr><th>#</th><th>Flow Name</th><th>API Name</th><th>Type</th></tr></thead><tbody>
        <tr><td>1</td><td>Calculate Renewal Date</td><td><code>Calculate_Renewal_Date</code></td><td>Autolaunched</td></tr>
        <tr><td>2</td><td>Send Case Confirmation</td><td><code>Send_Case_Confirmation_Email</code></td><td>Subflow</td></tr>
        <tr><td>3</td><td>New Case Wizard</td><td><code>New_Case_Wizard</code></td><td>Screen Flow</td></tr>
        <tr><td>4</td><td>Set SLA Due</td><td><code>Case_Set_SLA_Due_BeforeSave</code></td><td>Before-Save</td></tr>
        <tr><td>5</td><td>Assign Case Queue</td><td><code>Case_Assign_Queue_AfterSave</code></td><td>After-Save</td></tr>
        <tr><td>6</td><td>SLA Breach Checker</td><td><code>SLA_Breach_Checker_Scheduled</code></td><td>Scheduled</td></tr>
      </tbody></table>
    `
  },

  // ================================================================
  // USE CASE 3
  // ================================================================
  {
    id: 3,
    title: 'MedFirst Clinic — Patient Management & Appointment System',
    difficulty: 'Easy',
    category: 'Admin / Data Modeling',
    company: 'MedFirst Healthcare',
    subtitle: 'Design a complete healthcare data model with custom objects for Patients, Appointments, and Prescriptions.',
    tags: ['Custom Objects', 'Relationships', 'Page Layouts', 'Formula Fields', 'Roll-Up Summary'],
    description: 'MedFirst is a multi-location clinic chain that needs to track patients, appointments, doctors, and prescriptions in Salesforce — replacing their spreadsheet-based system.',
    learnings: [
      'Design multi-object data models with Lookup and Master-Detail relationships',
      'Use Formula fields for calculated values',
      'Configure Roll-Up Summary fields on Master-Detail relationships',
      'Create Page Layouts for different user personas',
      'Build a relationship map across 4+ custom objects'
    ],
    content: `
      <h2>Background</h2>
      <p>MedFirst Healthcare operates 12 clinic locations. Doctors, nurses, and receptionists all use different systems today (paper, Excel, email). They want a unified Salesforce system for patient records, appointment scheduling, doctor assignments, and prescription tracking.</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Objects We Will Create</p>
        <p>Patient__c · Doctor__c · Appointment__c · Prescription__c · Clinic_Location__c</p>
      </div>

      <h2>Step 1: Design the Data Model</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Lookup vs Master-Detail</p>
        <p>A <strong>Lookup Relationship</strong> is a loose link — the child can exist without a parent. A <strong>Master-Detail Relationship</strong> is a tight parent-child bond — deleting the parent deletes all children, and the child inherits the parent's sharing/security. Master-Detail also enables <strong>Roll-Up Summary</strong> fields.</p>
      </div>
      <p><strong>Purpose:</strong> We need Appointment to be tightly bound to Patient (if a patient record is deleted, their appointments should go too), but Doctor is a loose reference (a doctor can exist independently).</p>
      <table><thead><tr><th>Object</th><th>API Name</th><th>Key Relationships</th></tr></thead><tbody>
        <tr><td>Clinic Location</td><td><code>Clinic_Location__c</code></td><td>None (top-level)</td></tr>
        <tr><td>Doctor</td><td><code>Doctor__c</code></td><td>Lookup → Clinic_Location__c</td></tr>
        <tr><td>Patient</td><td><code>Patient__c</code></td><td>Lookup → Clinic_Location__c (primary location)</td></tr>
        <tr><td>Appointment</td><td><code>Appointment__c</code></td><td>Master-Detail → Patient__c, Lookup → Doctor__c</td></tr>
        <tr><td>Prescription</td><td><code>Prescription__c</code></td><td>Master-Detail → Appointment__c</td></tr>
      </tbody></table>

      <h2>Step 2: Fields on Patient__c</h2>
      <table><thead><tr><th>Field Label</th><th>API Name</th><th>Type</th><th>Details</th></tr></thead><tbody>
        <tr><td>First Name</td><td><code>First_Name__c</code></td><td>Text(80)</td><td>Required</td></tr>
        <tr><td>Last Name</td><td><code>Last_Name__c</code></td><td>Text(80)</td><td>Required</td></tr>
        <tr><td>Date of Birth</td><td><code>Date_of_Birth__c</code></td><td>Date</td><td></td></tr>
        <tr><td>Age</td><td><code>Age__c</code></td><td>Formula (Number)</td><td><code>FLOOR((TODAY() - Date_of_Birth__c) / 365.25)</code></td></tr>
        <tr><td>Blood Group</td><td><code>Blood_Group__c</code></td><td>Picklist</td><td>A+, A-, B+, B-, AB+, AB-, O+, O-</td></tr>
        <tr><td>Phone</td><td><code>Phone__c</code></td><td>Phone</td><td></td></tr>
        <tr><td>Email</td><td><code>Email__c</code></td><td>Email</td><td></td></tr>
        <tr><td>Total Appointments</td><td><code>Total_Appointments__c</code></td><td>Roll-Up Summary</td><td>COUNT of Appointment__c records</td></tr>
      </tbody></table>

      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Formula Fields</p>
        <p>A <strong>Formula Field</strong> is read-only and auto-calculated from other fields. The Age formula above computes the patient's age from their Date of Birth, updating automatically every day.</p>
      </div>

      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Roll-Up Summary Fields</p>
        <p>A <strong>Roll-Up Summary</strong> field performs calculations (COUNT, SUM, MIN, MAX) across child records in a Master-Detail relationship. Here, it counts how many appointments each patient has had — automatically, with no code.</p>
      </div>

      <h2>Step 3: Fields on Appointment__c</h2>
      <table><thead><tr><th>Field Label</th><th>API Name</th><th>Type</th></tr></thead><tbody>
        <tr><td>Patient</td><td><code>Patient__c</code></td><td>Master-Detail(Patient__c)</td></tr>
        <tr><td>Doctor</td><td><code>Doctor__c</code></td><td>Lookup(Doctor__c)</td></tr>
        <tr><td>Appointment Date</td><td><code>Appointment_Date__c</code></td><td>Date/Time</td></tr>
        <tr><td>Status</td><td><code>Status__c</code></td><td>Picklist: Scheduled, Completed, Cancelled, No-Show</td></tr>
        <tr><td>Notes</td><td><code>Notes__c</code></td><td>Long Text Area</td></tr>
        <tr><td>Duration (min)</td><td><code>Duration__c</code></td><td>Number</td></tr>
      </tbody></table>

      <h2>Step 4: Page Layouts by Persona</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Page Layouts</p>
        <p>A <strong>Page Layout</strong> controls which fields, related lists, and buttons appear on a record's detail/edit screen. Different profiles can see different layouts.</p>
      </div>
      <table><thead><tr><th>Layout Name</th><th>Assigned To</th><th>Visible Sections</th></tr></thead><tbody>
        <tr><td>Patient - Reception Layout</td><td>Receptionist profile</td><td>Demographics, Contact Info, Appointment History</td></tr>
        <tr><td>Patient - Doctor Layout</td><td>Doctor profile</td><td>Medical History, Prescriptions, Lab Results, Notes</td></tr>
      </tbody></table>

      <h2>Step 5: Lightning Record Pages (Flexipages)</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Lightning App Builder</p>
        <p>While Page Layouts control the classic "Details" tab, <strong>Lightning Record Pages</strong> control the entire screen structure (tabs, rich text, sidebars, related list components, and dynamic visibility rules).</p>
      </div>
      <p><strong>Purpose:</strong> Receptionists need a streamlined view of upcoming appointments, while Doctors need quick access to prescribe medication on the same screen.</p>
      <ol class="step-list">
        <li class="step-list__item">Go to a Patient record → Click Gear Icon → <strong>Edit Page</strong>.</li>
        <li class="step-list__item">Choose the <strong>Header and Right Sidebar</strong> template.</li>
        <li class="step-list__item">In the main column, drop a <strong>Tabs</strong> component. Name the tabs "Details", "Appointments", and "Prescriptions".</li>
        <li class="step-list__item">Drag the <strong>Record Detail</strong> component into the "Details" tab.</li>
        <li class="step-list__item">Drag a <strong>Related List - Single</strong> (Appointments) into the right sidebar so it's always visible.</li>
        <li class="step-list__item">Click <strong>Save</strong> and <strong>Activate</strong>. Assign it to specific Profiles (Doctor vs Receptionist).</li>
      </ol>

      <h2>Step 6: Data Security & Sharing (OWD)</h2>
      <div class="callout callout--warning">
        <p class="callout__title">⚠️ï¸ HIPAA Compliance</p>
        <p>In healthcare scenarios, medical data must be strictly controlled. Only the assigned Doctor should see sensitive medical notes.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Setup → Sharing Settings.</li>
        <li class="step-list__item">Set <code>Patient__c</code> to <strong>Private</strong>. (Since Appointment is Master-Detail, it inherits Private).</li>
        <li class="step-list__item">Create a <strong>Sharing Rule</strong>: If <code>Patient.Status = Active</code>, share Read-Only with the Receptionist Public Group.</li>
        <li class="step-list__item">Doctors will get access to their specific patients via Apex manual sharing or specific criteria-based sharing rules in later modules.</li>
      </ol>

      <h2>Consolidated API Reference</h2>
      <table><thead><tr><th>Component</th><th>API Name</th><th>Type</th></tr></thead><tbody>
        <tr><td>Clinic Location</td><td><code>Clinic_Location__c</code></td><td>Custom Object</td></tr>
        <tr><td>Doctor</td><td><code>Doctor__c</code></td><td>Custom Object</td></tr>
        <tr><td>Patient</td><td><code>Patient__c</code></td><td>Custom Object</td></tr>
        <tr><td>Appointment</td><td><code>Appointment__c</code></td><td>Custom Object</td></tr>
        <tr><td>Prescription</td><td><code>Prescription__c</code></td><td>Custom Object</td></tr>
      </tbody></table>
    `
  },

  // ================================================================
  // USE CASE 4
  // ================================================================
  {
    id: 4,
    title: 'SkyHigh Realty — Property Listings, Lead Tracking & Sales Pipeline',
    difficulty: 'Easy',
    category: 'Admin / Sales Process',
    company: 'SkyHigh Realty',
    subtitle: 'Configure the complete sales pipeline: Lead capture, qualification, Opportunity stages, Products & Price Books.',
    tags: ['Leads', 'Lead Conversion', 'Opportunities', 'Sales Process', 'Products', 'Price Books', 'Web-to-Lead'],
    description: 'SkyHigh Realty is a commercial real estate firm. Leads come from the website, agents qualify them, and deals move through a custom sales process. They need property listings as Products with different pricing tiers.',
    learnings: [
      'Set up Web-to-Lead for capturing website inquiries',
      'Create Lead Assignment Rules for territory-based routing',
      'Map Lead conversion to Account, Contact, and Opportunity',
      'Define a custom Sales Process with business-specific Opportunity stages',
      'Configure Products and Price Books for tiered pricing'
    ],
    content: `
      <h2>Background</h2>
      <p>SkyHigh Realty sells commercial properties across 5 cities. Leads pour in from their website, property listing sites, and referrals. Currently, leads get lost in email, agents don't track follow-ups, and management has no pipeline visibility.</p>

      
      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 &rarr; Configure Web-to-Lead &middot; Step 2 &rarr; Lead Assignment Rules &middot; Step 3 &rarr; Lead Conversion Mapping &middot; Step 4 &rarr; Custom Sales Process & Opportunity Stages &middot; Step 5 &rarr; Products & Price Books</p>
      </div>
<h2>Step 1: Configure Web-to-Lead</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Web-to-Lead</p>
        <p><strong>Web-to-Lead</strong> automatically creates Lead records from an HTML form on your website. Salesforce generates the form HTML; you paste it into your site. Each submission creates a Lead in your org — up to 500/day in most editions.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Setup → Quick Find → <strong>Web-to-Lead</strong> → Create Web-to-Lead Form.</li>
        <li class="step-list__item">Select fields: First Name, Last Name, Email, Phone, Company, <code>Property_Interest__c</code> (custom picklist), City.</li>
        <li class="step-list__item">Set Return URL (thank-you page). Click Generate.</li>
        <li class="step-list__item">Copy the HTML and embed it on the SkyHigh website.</li>
      </ol>

      <h2>Step 2: Lead Assignment Rules</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Lead Assignment Rules</p>
        <p>An <strong>Assignment Rule</strong> automatically assigns new Leads (or Cases) to users or queues based on criteria you define. Only one Assignment Rule can be active at a time, but it can have many ordered entries.</p>
      </div>
      <table><thead><tr><th>Rule Entry</th><th>Criteria</th><th>Assign To</th></tr></thead><tbody>
        <tr><td>Entry 1</td><td>City = "Mumbai"</td><td>Mumbai_Sales_Queue</td></tr>
        <tr><td>Entry 2</td><td>City = "Delhi"</td><td>Delhi_Sales_Queue</td></tr>
        <tr><td>Entry 3</td><td>City = "Bangalore"</td><td>Bangalore_Sales_Queue</td></tr>
        <tr><td>Default</td><td>No match</td><td>National_Sales_Queue</td></tr>
      </tbody></table>

      <h2>Step 3: Lead Conversion Mapping</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Lead Conversion</p>
        <p>When a Lead is qualified, you <strong>convert</strong> it — Salesforce creates an Account, Contact, and optionally an Opportunity from the Lead's data. Custom field mappings control which Lead fields map to which Account/Contact/Opportunity fields.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Setup → Object Manager → Lead → <strong>Map Lead Fields</strong>.</li>
        <li class="step-list__item">Map <code>Property_Interest__c</code> (Lead) → <code>Property_Type__c</code> (Opportunity).</li>
        <li class="step-list__item">Map <code>Budget_Range__c</code> (Lead) → <code>Budget__c</code> (Opportunity).</li>
      </ol>

      <h2>Step 4: Custom Sales Process & Opportunity Stages</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Sales Process</p>
        <p>A <strong>Sales Process</strong> defines which Opportunity Stages are available for a given Record Type. This lets you have different pipelines (e.g., rental vs purchase) on the same Opportunity object.</p>
      </div>
      <table><thead><tr><th>Stage Name</th><th>Probability</th><th>Type</th></tr></thead><tbody>
        <tr><td>Inquiry Received</td><td>10%</td><td>Open</td></tr>
        <tr><td>Site Visit Scheduled</td><td>25%</td><td>Open</td></tr>
        <tr><td>Site Visit Completed</td><td>40%</td><td>Open</td></tr>
        <tr><td>Negotiation</td><td>60%</td><td>Open</td></tr>
        <tr><td>Legal Review</td><td>80%</td><td>Open</td></tr>
        <tr><td>Closed Won</td><td>100%</td><td>Closed/Won</td></tr>
        <tr><td>Closed Lost</td><td>0%</td><td>Closed/Lost</td></tr>
      </tbody></table>

      <h2>Step 5: Products & Price Books</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Products & Price Books</p>
        <p><strong>Products</strong> are the items/services you sell. A <strong>Price Book</strong> is a collection of products with specific prices. The <strong>Standard Price Book</strong> holds default prices; custom Price Books hold region-specific or partner-specific pricing.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Create Products: "Commercial Office 1000sqft", "Retail Space 500sqft", "Warehouse Unit".</li>
        <li class="step-list__item">Add Standard Price Book entries for each product.</li>
        <li class="step-list__item">Create a custom Price Book "Mumbai Pricing" with city-specific rates.</li>
        <li class="step-list__item">On Opportunities, agents add Opportunity Line Items (Products) to specify which property and price apply to each deal.</li>
      </ol>

      <h2>Consolidated API Reference</h2>
      <table><thead><tr><th>Component</th><th>API Name / Detail</th></tr></thead><tbody>
        <tr><td>Custom Field (Lead)</td><td><code>Property_Interest__c</code></td></tr>
        <tr><td>Custom Field (Opp)</td><td><code>Property_Type__c</code>, <code>Budget__c</code></td></tr>
        <tr><td>Sales Process</td><td><code>Property_Sales_Process</code></td></tr>
        <tr><td>Queues</td><td><code>Mumbai_Sales_Queue</code>, <code>Delhi_Sales_Queue</code>, etc.</td></tr>
      </tbody></table>
    `
  },

  // ================================================================
  // USE CASE 5
  // ================================================================
  {
    id: 5,
    title: 'GreenLeaf NGO — Donation Tracking, Campaigns & Volunteer Management',
    difficulty: 'Easy',
    category: 'Admin / Data Modeling',
    company: 'GreenLeaf Foundation',
    subtitle: 'Build a nonprofit CRM: Campaign ROI tracking, donation records, volunteer hours, and tax receipt automation.',
    tags: ['Campaigns', 'Campaign Members', 'Custom Objects', 'Reports', 'Dashboards', 'Formula Fields'],
    description: 'GreenLeaf Foundation runs environmental campaigns across India. They need to track donations, manage volunteers, measure campaign ROI, and generate tax receipts.',
    learnings: [
      'Use standard Campaigns and Campaign Members for event/drive tracking',
      'Build custom objects for Donations and Volunteer Hours',
      'Create Formula fields for automatic calculations',
      'Build comprehensive Reports and Dashboards for nonprofit analytics',
      'Understand Campaign Hierarchy for parent-child campaign tracking'
    ],
    content: `
      <h2>Background</h2>
      <p>GreenLeaf Foundation runs tree-planting drives, fundraising galas, and awareness campaigns. They track everything in spreadsheets, losing visibility into which campaigns generate the most donations, who their top volunteers are, and whether they're meeting annual fundraising targets.</p>

      
      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 &rarr; Custom Objects &middot; Step 2 &rarr; Fields on Donation__c &middot; Step 3 &rarr; Campaign Configuration &middot; Step 4 &rarr; Reports & Dashboard</p>
      </div>
<h2>Step 1: Custom Objects</h2>
      <table><thead><tr><th>Object</th><th>API Name</th><th>Relationships</th></tr></thead><tbody>
        <tr><td>Donation</td><td><code>Donation__c</code></td><td>Lookup → Contact (Donor), Lookup → Campaign</td></tr>
        <tr><td>Volunteer Activity</td><td><code>Volunteer_Activity__c</code></td><td>Lookup → Contact, Lookup → Campaign</td></tr>
      </tbody></table>

      <h2>Step 2: Fields on Donation__c</h2>
      <table><thead><tr><th>Field</th><th>API Name</th><th>Type</th><th>Details</th></tr></thead><tbody>
        <tr><td>Donor</td><td><code>Donor__c</code></td><td>Lookup(Contact)</td><td>Required</td></tr>
        <tr><td>Amount</td><td><code>Amount__c</code></td><td>Currency</td><td>Required</td></tr>
        <tr><td>Donation Date</td><td><code>Donation_Date__c</code></td><td>Date</td><td>Default = TODAY()</td></tr>
        <tr><td>Payment Method</td><td><code>Payment_Method__c</code></td><td>Picklist</td><td>Cash, Bank Transfer, UPI, Cheque, Online</td></tr>
        <tr><td>Tax Receipt #</td><td><code>Tax_Receipt_Number__c</code></td><td>Auto Number</td><td>Format: GF-{00000}</td></tr>
        <tr><td>Campaign</td><td><code>Campaign__c</code></td><td>Lookup(Campaign)</td><td>Links donation to the fundraising campaign</td></tr>
        <tr><td>Financial Year</td><td><code>Financial_Year__c</code></td><td>Formula (Text)</td><td><code>IF(MONTH(Donation_Date__c)&gt;=4, TEXT(YEAR(Donation_Date__c))+"-"+TEXT(YEAR(Donation_Date__c)+1), TEXT(YEAR(Donation_Date__c)-1)+"-"+TEXT(YEAR(Donation_Date__c)))</code></td></tr>
      </tbody></table>

      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Auto Number Fields</p>
        <p>An <strong>Auto Number</strong> field automatically generates a unique, sequential identifier for each record (e.g., GF-00001, GF-00002). It's read-only and guaranteed unique — perfect for receipt numbers, case numbers, or invoice IDs.</p>
      </div>

      <h2>Step 3: Campaign Configuration</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Campaigns & Campaign Members</p>
        <p>A <strong>Campaign</strong> is a standard object for tracking marketing or fundraising initiatives. <strong>Campaign Members</strong> are the Leads/Contacts associated with that campaign, each with a Status (Sent, Responded, Donated). <strong>Campaign Hierarchy</strong> lets you nest child campaigns under a parent for rollup tracking.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Create a parent Campaign: <strong>"FY 2025 Annual Fundraising"</strong>.</li>
        <li class="step-list__item">Create child Campaigns: "Gala Dinner Nov 2024", "Tree Drive Q1", "Corporate Matching".</li>
        <li class="step-list__item">Customize Campaign Member Statuses: Invited → Registered → Attended → Donated.</li>
        <li class="step-list__item">The parent campaign automatically rolls up stats from all children.</li>
      </ol>

      <h2>Step 4: Reports & Dashboard</h2>
      <table><thead><tr><th>Report</th><th>Type</th><th>Purpose</th></tr></thead><tbody>
        <tr><td>Donations by Campaign</td><td>Summary</td><td>SUM of Amount, grouped by Campaign</td></tr>
        <tr><td>Top Donors This Year</td><td>Summary</td><td>SUM of Amount, grouped by Donor, sorted desc</td></tr>
        <tr><td>Volunteer Hours by Month</td><td>Matrix</td><td>Rows: Volunteer, Columns: Month</td></tr>
        <tr><td>Campaign ROI</td><td>Summary</td><td>Campaign Cost vs Total Donations</td></tr>
      </tbody></table>

      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Report Types: Tabular, Summary, Matrix, Joined</p>
        <p><strong>Tabular</strong>: flat rows, no grouping. <strong>Summary</strong>: grouped by rows with subtotals. <strong>Matrix</strong>: grouped by both rows AND columns (like a pivot table). <strong>Joined</strong>: combines multiple report blocks side by side.</p>
      </div>
    `
  },

  // ================================================================
  // USE CASE 6
  // ================================================================
  {
    id: 6,
    title: 'SecureBank — Role Hierarchy, OWD, Sharing Rules & Field-Level Security',
    difficulty: 'Easy',
    category: 'Security Model',
    company: 'SecureBank Financial',
    subtitle: 'Design a complete security model: Private OWD, 4-level role hierarchy, criteria-based sharing, FLS, and Permission Sets.',
    tags: ['OWD', 'Role Hierarchy', 'Sharing Rules', 'Profiles', 'Permission Sets', 'FLS'],
    description: 'SecureBank needs strict data access controls. Branch managers should see their team\'s records, regional heads see their region, and compliance officers need cross-cutting access to flagged accounts.',
    learnings: [
      'Design a multi-level Role Hierarchy mirroring org structure',
      'Set OWD to Private and selectively open access',
      'Create ownership-based and criteria-based Sharing Rules',
      'Configure Field-Level Security to hide sensitive data',
      'Layer Permission Sets on top of minimal Profiles'
    ],
    content: `
      <h2>Background</h2>
      <p>SecureBank has 500+ employees across 20 branches in 4 regions. Loan officers should only see their own clients. Branch managers see their branch. Regional heads see their entire region. The compliance team (which doesn't sit in any branch hierarchy) needs to see flagged high-risk accounts across all regions.</p>

      
      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 &rarr; Design the Role Hierarchy &middot; Step 2 &rarr; Set OWD &middot; Step 3 &rarr; Sharing Rules for Compliance Team &middot; Step 4 &rarr; Field-Level Security (FLS) &middot; Step 5 &rarr; Permission Set for Exception Access</p>
      </div>
<h2>Step 1: Design the Role Hierarchy</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — How Role Hierarchy Grants Access</p>
        <p>Role Hierarchy automatically gives <strong>upward visibility</strong>. If OWD is Private, a Loan Officer can only see their own records. Their Branch Manager (one level up) can see all Loan Officers' records in that branch. The Regional Head sees all branches in their region. The CEO sees everything.</p>
      </div>
      <pre><code>CEO
â”œâ”€â”€ Regional Head (North)
â”‚   â”œâ”€â”€ Branch Manager (Delhi)
â”‚   â”‚   â”œâ”€â”€ Senior Loan Officer
â”‚   â”‚   â””â”€â”€ Loan Officer
â”‚   â””â”€â”€ Branch Manager (Chandigarh)
â”œâ”€â”€ Regional Head (South)
â”‚   â”œâ”€â”€ Branch Manager (Bangalore)
â”‚   â””â”€â”€ Branch Manager (Chennai)
â”œâ”€â”€ Regional Head (West)
â””â”€â”€ Regional Head (East)
    â””â”€â”€ Compliance Officer (separate hierarchy branch)</code></pre>

      <h2>Step 2: Set OWD</h2>
      <table><thead><tr><th>Object</th><th>OWD Setting</th><th>Rationale</th></tr></thead><tbody>
        <tr><td>Account</td><td>Private</td><td>Client data is confidential per branch</td></tr>
        <tr><td>Contact</td><td>Controlled by Parent</td><td>Follows Account's sharing</td></tr>
        <tr><td>Opportunity (Loan)</td><td>Private</td><td>Loan details are sensitive</td></tr>
        <tr><td>Case</td><td>Private</td><td>Customer complaints are confidential</td></tr>
        <tr><td>Report</td><td>Private</td><td>Management reports restricted</td></tr>
      </tbody></table>

      <div class="callout callout--warning">
        <p class="callout__title">⚠️ï¸ Key Rule</p>
        <p>OWD sets the <strong>most restrictive baseline</strong>. You can only <em>open up</em> access from here using Role Hierarchy, Sharing Rules, or Manual Sharing. You can <strong>never restrict further</strong> than OWD.</p>
      </div>

      <h2>Step 3: Sharing Rules for Compliance Team</h2>
      <p><strong>Problem:</strong> Compliance Officers don't sit in any branch's hierarchy, so Role Hierarchy doesn't give them access to any client records. But they need to see all accounts flagged as high-risk.</p>
      <ol class="step-list">
        <li class="step-list__item">Create a <strong>Public Group</strong>: <code>Compliance_Team</code> — add all users with the Compliance Officer role.</li>
        <li class="step-list__item">Create a <strong>Criteria-Based Sharing Rule</strong> on Account: Where <code>Risk_Level__c = "High"</code> → Share Read/Write with <code>Compliance_Team</code>.</li>
        <li class="step-list__item">Create a second rule on Opportunity: Where <code>Amount &gt; 5000000</code> → Share Read Only with <code>Compliance_Team</code>.</li>
      </ol>

      <h2>Step 4: Field-Level Security (FLS)</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Field-Level Security</p>
        <p>Even if a user can see a record (via OWD/sharing), <strong>FLS</strong> can hide specific fields on that record. It's controlled per Profile. For example, a Loan Officer can see the Account but not the "Credit Score" field.</p>
      </div>
      <table><thead><tr><th>Field</th><th>Loan Officer</th><th>Branch Manager</th><th>Compliance</th></tr></thead><tbody>
        <tr><td>Account.Credit_Score__c</td><td>Hidden</td><td>Read Only</td><td>Read/Edit</td></tr>
        <tr><td>Account.Risk_Level__c</td><td>Read Only</td><td>Read Only</td><td>Read/Edit</td></tr>
        <tr><td>Account.Annual_Revenue__c</td><td>Hidden</td><td>Read Only</td><td>Read Only</td></tr>
        <tr><td>Opportunity.Interest_Rate__c</td><td>Read/Edit</td><td>Read/Edit</td><td>Read Only</td></tr>
      </tbody></table>

      <h2>Step 5: Permission Set for Exception Access</h2>
      <p><strong>Scenario:</strong> One senior Loan Officer has been promoted to handle VIP clients and needs to see Credit Scores — but you don't want to create a whole new Profile just for one person.</p>
      <table><thead><tr><th>Permission Set</th><th>API Name</th><th>Grants</th></tr></thead><tbody>
        <tr><td>VIP Client Access</td><td><code>VIP_Client_Access</code></td><td>Read access to Account.Credit_Score__c, Account.Annual_Revenue__c</td></tr>
      </tbody></table>
    `
  },

  // ================================================================
  // USE CASE 7
  // ================================================================
  {
    id: 7,
    title: 'EduTrack Institute — Validation Rules, Formulas & Data Quality',
    difficulty: 'Easy',
    category: 'Admin / Data Quality',
    company: 'EduTrack Institute',
    subtitle: 'Enforce business rules with 8 Validation Rules, create complex Formula fields, and set up Duplicate Rules.',
    tags: ['Validation Rules', 'Formula Fields', 'Cross-Object Formulas', 'Duplicate Rules', 'Matching Rules'],
    description: 'EduTrack manages student enrollment for 50+ courses. Data quality issues (missing emails, invalid dates, duplicate students) cause billing errors and lost communications. They need bulletproof data enforcement.',
    learnings: [
      'Write Validation Rule formulas using AND, OR, REGEX, ISBLANK, ISPICKVAL',
      'Create cross-object Formula fields',
      'Set up Matching Rules and Duplicate Rules',
      'Use the PRIORVALUE function for change-based validation',
      'Understand error message placement (field-level vs page-level)'
    ],
    content: `
      <h2>Background</h2>
      <p>EduTrack's data problems: students enroll without email addresses (causing billing failures), enrollment dates are set in the past, duplicate student records exist (same email, different names), and courses get marked "Completed" without a final grade. We'll fix all of this with validation rules and data quality tools.</p>

      
      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 &rarr; Require Email on Active Students &middot; Step 2 &rarr; Enrollment Date Cannot Be in the Past &middot; Step 3 &rarr; Phone Number Must Be 10 Digits &middot; Step 4 &rarr; Cannot Close Course Without Grade &middot; Step 5 &rarr; Prevent Reopening Closed Enrollments &middot; Step 6 &rarr; End Date Must Be After Start Date &middot; Step 7 &rarr; Discount Cannot Exceed 30% Without Manager &middot; Step 8 &rarr; Duplicate Rules &middot; Step 9 &rarr; Consolidated Validation Rules Reference</p>
      </div>
<h2>Validation Rule 1: Require Email on Active Students</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Validation Rule Formulas</p>
        <p>A Validation Rule formula must evaluate to <strong>TRUE to block the save</strong>. Think of it as: "Block if this bad condition is true." Common functions: <code>ISBLANK()</code>, <code>ISPICKVAL()</code>, <code>REGEX()</code>, <code>AND()</code>, <code>OR()</code>, <code>PRIORVALUE()</code>.</p>
      </div>
      <p><strong>Rule Name:</strong> <code>Require_Email_Active_Student</code></p>
      <pre><code>AND(
  ISPICKVAL(Status__c, "Active"),
  ISBLANK(Email__c)
)</code></pre>
      <p><strong>Error:</strong> "Active students must have an email address." Location: <code>Email__c</code> field.</p>

      <h2>Validation Rule 2: Enrollment Date Cannot Be in the Past</h2>
      <p><strong>Rule Name:</strong> <code>Enrollment_Date_Not_Past</code></p>
      <pre><code>AND(
  ISNEW(),
  Enrollment_Date__c &lt; TODAY()
)</code></pre>
      <p><strong>Error:</strong> "Enrollment date cannot be in the past for new enrollments."</p>

      <div class="callout callout--tip">
        <p class="callout__title">💡 ISNEW() vs ISCHANGED()</p>
        <p><code>ISNEW()</code> returns true only when the record is being created for the first time. <code>ISCHANGED(field)</code> returns true when a specific field's value is different from its previous value. <code>PRIORVALUE(field)</code> returns the field's value before the current edit.</p>
      </div>

      <h2>Validation Rule 3: Phone Number Must Be 10 Digits</h2>
      <p><strong>Rule Name:</strong> <code>Phone_Must_Be_10_Digits</code></p>
      <pre><code>AND(
  NOT(ISBLANK(Phone__c)),
  NOT(REGEX(Phone__c, "[0-9]{10}"))
)</code></pre>

      <h2>Validation Rule 4: Cannot Close Course Without Grade</h2>
      <p><strong>Rule Name:</strong> <code>Require_Grade_On_Completion</code></p>
      <pre><code>AND(
  ISPICKVAL(Status__c, "Completed"),
  ISBLANK(TEXT(Final_Grade__c))
)</code></pre>

      <h2>Validation Rule 5: Prevent Reopening Closed Enrollments</h2>
      <p><strong>Rule Name:</strong> <code>Prevent_Reopen_Closed</code></p>
      <pre><code>AND(
  NOT(ISNEW()),
  ISPICKVAL(PRIORVALUE(Status__c), "Closed"),
  NOT(ISPICKVAL(Status__c, "Closed"))
)</code></pre>

      <h2>Validation Rule 6: End Date Must Be After Start Date</h2>
      <pre><code>End_Date__c &lt; Start_Date__c</code></pre>

      <h2>Validation Rule 7: Discount Cannot Exceed 30% Without Manager</h2>
      <pre><code>AND(
  Discount_Percent__c &gt; 30,
  $Profile.Name &lt;&gt; "Sales Manager"
)</code></pre>

      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — $Profile in Formulas</p>
        <p>The <code>$Profile</code> global variable gives access to the current user's Profile information. <code>$Profile.Name</code> is the Profile name — useful for making validation rules that only apply to certain profiles.</p>
      </div>

      <h2>Step 8: Duplicate Rules</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Matching Rules & Duplicate Rules</p>
        <p>A <strong>Matching Rule</strong> defines what "looks like a duplicate" (e.g., same email). A <strong>Duplicate Rule</strong> defines what to do when a match is found: <strong>Block</strong> (prevent save), <strong>Alert</strong> (warn but allow), or <strong>Report</strong> (log for review).</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Setup → Matching Rules → New on Student__c. Match on <code>Email__c</code> (Exact match).</li>
        <li class="step-list__item">Setup → Duplicate Rules → New on Student__c. Action: <strong>Block</strong> on Create, <strong>Alert</strong> on Edit.</li>
        <li class="step-list__item">Activate both rules.</li>
      </ol>

      <h2>Consolidated Validation Rules Reference</h2>
      <table><thead><tr><th>#</th><th>Rule Name</th><th>Object</th><th>Blocks When</th></tr></thead><tbody>
        <tr><td>1</td><td><code>Require_Email_Active_Student</code></td><td>Student__c</td><td>Active + no email</td></tr>
        <tr><td>2</td><td><code>Enrollment_Date_Not_Past</code></td><td>Enrollment__c</td><td>New record + past date</td></tr>
        <tr><td>3</td><td><code>Phone_Must_Be_10_Digits</code></td><td>Student__c</td><td>Invalid phone format</td></tr>
        <tr><td>4</td><td><code>Require_Grade_On_Completion</code></td><td>Enrollment__c</td><td>Completed + no grade</td></tr>
        <tr><td>5</td><td><code>Prevent_Reopen_Closed</code></td><td>Enrollment__c</td><td>Status changed from Closed</td></tr>
        <tr><td>6</td><td><code>End_After_Start</code></td><td>Course__c</td><td>End before start date</td></tr>
        <tr><td>7</td><td><code>Discount_Limit_Non_Manager</code></td><td>Enrollment__c</td><td>Discount > 30% by non-manager</td></tr>
      </tbody></table>
    `
  },

  // ================================================================
  // USE CASE 8
  // ================================================================
  {
    id: 8,
    title: 'GlobalShip Logistics — Approval Processes, Queues & Escalation Rules',
    difficulty: 'Easy',
    category: 'Admin / Process Automation',
    company: 'GlobalShip Logistics',
    subtitle: 'Build multi-step approval workflows, case queues with assignment rules, and time-dependent escalation.',
    tags: ['Approval Processes', 'Queues', 'Assignment Rules', 'Escalation Rules', 'Email Alerts'],
    description: 'GlobalShip handles thousands of shipping orders daily. High-value shipments need manager approval, support cases need auto-routing to the right team queue, and unresolved cases must escalate after 24 hours.',
    learnings: [
      'Create multi-step Approval Processes with conditional routing',
      'Build Case Assignment Rules with ordered entries',
      'Set up time-dependent Escalation Rules',
      'Configure Email Alerts and Field Updates as approval actions',
      'Understand the difference between Queues, Assignment Rules, and Escalation Rules'
    ],
    content: `
      <h2>Background</h2>
      <p>GlobalShip processes 2,000+ shipping orders daily. Any shipment over â‚¹5,00,000 needs Finance Manager approval. Any shipment of hazardous materials needs Safety Officer approval too. Support cases come in via email and need auto-routing. Cases unresolved for 24+ hours should auto-escalate to the team lead.</p>

      
      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 &rarr; Multi-Step Approval Process &middot; Step 2 &rarr; Case Assignment Rules &middot; Step 3 &rarr; Escalation Rules</p>
      </div>
<h2>Part A: Multi-Step Approval Process</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Approval Processes</p>
        <p>An <strong>Approval Process</strong> is a workflow where a record is "submitted for approval," <strong>locked</strong> (preventing edits), and routed to approver(s). On Approve or Reject, you can trigger field updates, email alerts, or outbound messages. Multi-step approvals route through multiple approvers sequentially.</p>
      </div>

      <h3>Build Steps</h3>
      <ol class="step-list">
        <li class="step-list__item">Setup → Approval Processes → Object: <code>Shipment__c</code> → Create New.</li>
        <li class="step-list__item">Name: <code>High_Value_Shipment_Approval</code>.</li>
        <li class="step-list__item">Entry Criteria: <code>Total_Value__c &gt; 500000</code>.</li>
        <li class="step-list__item"><strong>Step 1:</strong> Route to Finance Manager (role hierarchy). Add Email Alert to Finance Manager.</li>
        <li class="step-list__item"><strong>Step 2 (conditional):</strong> If <code>Hazardous__c = TRUE</code>, route to Safety Officer. Otherwise skip.</li>
        <li class="step-list__item"><strong>Final Approval Actions:</strong> Field Update — set <code>Approval_Status__c = "Approved"</code>. Email Alert to warehouse team.</li>
        <li class="step-list__item"><strong>Final Rejection Actions:</strong> Field Update — set <code>Approval_Status__c = "Rejected"</code>. Email Alert to submitter with rejection reason.</li>
        <li class="step-list__item">Record Lock: Lock during approval, unlock on final approve/reject.</li>
      </ol>

      <h2>Part B: Case Assignment Rules</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Assignment Rules vs Queues</p>
        <p>A <strong>Queue</strong> is a shared inbox (team owns records). An <strong>Assignment Rule</strong> determines <em>which</em> queue or user a new record gets assigned to, based on criteria. Assignment Rules run when a record is created (Web-to-Case, Email-to-Case, or when the "Assign using active assignment rule" checkbox is checked).</p>
      </div>
      <table><thead><tr><th>Rule Entry</th><th>Criteria</th><th>Assign To</th></tr></thead><tbody>
        <tr><td>1</td><td>Type = "Damage Claim"</td><td><code>Claims_Queue</code></td></tr>
        <tr><td>2</td><td>Type = "Tracking Issue"</td><td><code>Tracking_Queue</code></td></tr>
        <tr><td>3</td><td>Type = "Billing" AND Priority = "High"</td><td><code>Senior_Billing_Queue</code></td></tr>
        <tr><td>4</td><td>Type = "Billing"</td><td><code>Billing_Queue</code></td></tr>
        <tr><td>Default</td><td>No match</td><td><code>General_Support_Queue</code></td></tr>
      </tbody></table>

      <h2>Part C: Escalation Rules</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Escalation Rules</p>
        <p>An <strong>Escalation Rule</strong> automatically escalates Cases that remain unresolved after a specified time. Escalation actions can reassign the Case, send email notifications, or both. Only one Escalation Rule can be active at a time. Time is measured in <strong>Business Hours</strong>, which you configure separately.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Setup → Business Hours → Define: Mon-Sat, 9 AM â€“ 6 PM IST.</li>
        <li class="step-list__item">Setup → Escalation Rules → New: <code>Case_24Hr_Escalation</code>.</li>
        <li class="step-list__item">Rule Entry: Status = "New" OR Status = "Working".</li>
        <li class="step-list__item">Escalation Action at <strong>8 Business Hours</strong>: Email Alert to Case Owner ("Case aging reminder").</li>
        <li class="step-list__item">Escalation Action at <strong>24 Business Hours</strong>: Reassign to <code>Team_Lead_Queue</code> + Email Alert to Team Lead.</li>
      </ol>
    `
  },

  // ================================================================
  // USE CASE 9
  // ================================================================
  {
    id: 9,
    title: 'RetailMax — Screen Flow: Guided Return & Exchange Wizard',
    difficulty: 'Medium',
    category: 'Flow / Screen Flow',
    company: 'RetailMax Stores',
    subtitle: 'Build a multi-screen guided wizard with conditional branching, dynamic choices, record creation, and subflow calls.',
    tags: ['Screen Flow', 'Dynamic Choices', 'Decision Elements', 'Create Records', 'Subflow', 'Fault Paths'],
    description: 'RetailMax agents handle 500+ returns daily. The current process requires agents to navigate 4 different screens and manually check return eligibility. A Screen Flow wizard will guide them step by step, automatically checking eligibility and creating the return record.',
    learnings: [
      'Build multi-screen flows with progressive data collection',
      'Use Get Records + Decision for real-time eligibility checks',
      'Implement Dynamic Choice Sets for data-driven picklists',
      'Add Fault Paths for graceful error handling',
      'Call Subflows for reusable logic (email confirmation)'
    ],
    content: `
      <h2>Background</h2>
      <p>RetailMax agents currently handle returns by: (1) looking up the order, (2) manually checking if it's within the 30-day window, (3) checking if the item category allows returns, (4) creating a Case, (5) emailing the customer. This multi-step manual process leads to errors and inconsistency.</p>

      
      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 &rarr; Flow Design (7 Elements) &middot; Step 2 &rarr; Screen 1 — Order Lookup &middot; Step 3 &rarr; Screen 2 — Dynamic Item Selection &middot; Step 4 &rarr; Eligibility Check (Decision) &middot; Step 5 &rarr; Create Return Case + Subflow</p>
      </div>
<div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Screen Flow Architecture</p>
        <p>A Screen Flow pauses at each <strong>Screen element</strong>, waiting for user input. Between screens, you can run logic (Get Records, Decisions, Assignments) that doesn't need user interaction. The flow should validate data as early as possible to avoid dead-ends later.</p>
      </div>

      <h2>Flow Design (7 Elements)</h2>
      <pre><code>Screen 1 (Order Lookup)
  → Get Records (fetch order)
  → Decision (order exists?)
    → NO → Screen: Error "Order not found"
    → YES â†“
Screen 2 (Select Item)
  → Decision (within 30 days? + category returnable?)
    → NO → Screen: Error "Not eligible"
    → YES â†“
Screen 3 (Return Details)
  → Create Records (Return Case)
  → Subflow (Send Confirmation Email)
Screen 4 (Confirmation)</code></pre>

      <h2>Step 1: Screen 1 — Order Lookup</h2>
      <ol class="step-list">
        <li class="step-list__item">Add a <strong>Screen</strong> element with a Text Input for <code>orderNumber</code>.</li>
        <li class="step-list__item">After the screen, add <strong>Get Records</strong>: Object = <code>Order__c</code>, filter <code>Order_Number__c = {!orderNumber}</code>.</li>
        <li class="step-list__item">Add a <strong>Decision</strong>: "Order Found?" — check if the Get Records result is not null.</li>
        <li class="step-list__item">If NO: show an error Screen with "Order not found. Please verify the order number."</li>
      </ol>

      <h2>Step 2: Screen 2 — Dynamic Item Selection</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Dynamic Choice Sets</p>
        <p>A <strong>Dynamic Choice Set</strong> (Record Choice Set) populates a picklist/radio buttons from actual database records at runtime, instead of hardcoded values. Here, it shows only the items from the customer's specific order.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Create a <strong>Record Choice Set</strong>: Object = <code>Order_Item__c</code>, filter by the Order Id from Step 1. Display field: <code>Product_Name__c</code>. Value field: Id.</li>
        <li class="step-list__item">Add this to a Screen as a <strong>Radio Buttons</strong> component.</li>
      </ol>

      <h2>Step 3: Eligibility Check (Decision)</h2>
      <pre><code>Decision: "Return Eligible?"
Outcome 1 — Eligible:
  {!Get_Order.Order_Date__c} &gt;= ({!$Flow.CurrentDateTime} - 30 days)
  AND {!selectedItem.Category__c} != "Final Sale"
Outcome 2 — Not Eligible:
  Default → show error screen</code></pre>

      <h2>Step 4: Create Return Case + Subflow</h2>
      <ol class="step-list">
        <li class="step-list__item"><strong>Create Records</strong>: Object = Case. Set Subject, Description, Order__c, Status = "New", RecordType = "Return". Add a <strong>Fault Path</strong> → error screen.</li>
        <li class="step-list__item"><strong>Subflow</strong>: Call <code>Send_Return_Confirmation_Email</code> passing the new Case Id and customer email.</li>
        <li class="step-list__item"><strong>Screen 4</strong>: Display "Return Case #{!Create_Case.CaseNumber} created successfully."</li>
      </ol>

      <div class="callout callout--warning">
        <p class="callout__title">⚠️ï¸ Always Add Fault Paths</p>
        <p>Every <strong>Create/Update/Delete Records</strong> element should have a Fault Path. Without one, if the DML fails (validation rule, required field missing, duplicate rule), the user sees a cryptic error. With a Fault Path, you can show a friendly error screen with the actual error message: <code>{!$Flow.FaultMessage}</code>.</p>
      </div>

      <h2>API Reference</h2>
      <table><thead><tr><th>Component</th><th>API Name</th><th>Type</th></tr></thead><tbody>
        <tr><td>Screen Flow</td><td><code>Return_Exchange_Wizard</code></td><td>Screen Flow</td></tr>
        <tr><td>Subflow</td><td><code>Send_Return_Confirmation_Email</code></td><td>Autolaunched</td></tr>
        <tr><td>Custom Object</td><td><code>Order__c</code>, <code>Order_Item__c</code></td><td>Data</td></tr>
      </tbody></table>
    `
  },

  // ================================================================
  // USE CASE 10
  // ================================================================
  {
    id: 10,
    title: 'UrbanStay Hotels — Before-Save & After-Save Record-Triggered Flows',
    difficulty: 'Medium',
    category: 'Flow / Record-Triggered',
    company: 'UrbanStay Hotels',
    subtitle: 'Build 4 Record-Triggered Flows: auto-calculate checkout, assign housekeeping, update related records, and send notifications.',
    tags: ['Before-Save Flow', 'After-Save Flow', 'Fast Field Update', 'Related Records', 'Entry Conditions'],
    description: 'UrbanStay manages 200+ hotel rooms. When a reservation is created, the system must auto-calculate checkout date, set a priority tier, assign housekeeping staff, update room availability, and notify the front desk.',
    learnings: [
      'Understand when to use Before-Save vs After-Save flows',
      'Configure Entry Conditions to control when flows run',
      'Use Assignment elements for field calculations',
      'Update related records (rooms, staff) from After-Save flows',
      'Handle "Only when a record is updated to meet condition" filter'
    ],
    content: `
      <h2>Background</h2>
      <p>UrbanStay creates a <code>Reservation__c</code> record for every booking. When created, several things must happen automatically: the checkout date must be calculated from check-in + nights, a guest tier must be assigned, the room status must change to "Occupied", and housekeeping must be notified.</p>

      
      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 &rarr; Calculate Checkout & Set Tier (Before-Save) &middot; Step 2 &rarr; Update Room & Notify Staff (After-Save) &middot; Step 3 &rarr; Room Freed on Checkout (After-Save, on Update)</p>
      </div>
<div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Before-Save vs After-Save Decision Tree</p>
        <p>Ask yourself: "Am I only changing fields on <em>this same record</em>?" If YES → <strong>Before-Save</strong> (fast, no extra DML). If you need to touch <em>other</em> records, send emails, or call subflows → <strong>After-Save</strong>. You can (and often should) have both on the same object.</p>
      </div>

      <h2>Flow A: Calculate Checkout & Set Tier (Before-Save)</h2>
      <p><strong>Purpose:</strong> These are simple field assignments on the same Reservation record. Before-Save is faster because it doesn't consume DML limits for the triggering record.</p>
      <ol class="step-list">
        <li class="step-list__item">New Flow → Record-Triggered → Object: <code>Reservation__c</code> → Trigger: Created → Optimize: <strong>Fast Field Updates</strong>.</li>
        <li class="step-list__item"><strong>Assignment 1:</strong> <code>$Record.Checkout_Date__c = $Record.Checkin_Date__c + $Record.Nights__c</code></li>
        <li class="step-list__item"><strong>Decision:</strong> Branch on <code>$Record.Total_Amount__c</code>:
          <br>â€¢ > â‚¹50,000 → Tier = "Platinum"
          <br>â€¢ > â‚¹20,000 → Tier = "Gold"
          <br>â€¢ Default → Tier = "Standard"</li>
        <li class="step-list__item"><strong>Assignment 2:</strong> Set <code>$Record.Guest_Tier__c</code> to the determined tier.</li>
      </ol>
      <table><thead><tr><th>API Name</th><th>Trigger</th><th>Type</th></tr></thead><tbody>
        <tr><td><code>Reservation_Set_Checkout_Tier_BeforeSave</code></td><td>Before Save — Create</td><td>Fast Field Update</td></tr>
      </tbody></table>

      <h2>Flow B: Update Room & Notify Staff (After-Save)</h2>
      <p><strong>Purpose:</strong> Changing the Room's status and sending email notifications require the Reservation to already exist in the database.</p>
      <ol class="step-list">
        <li class="step-list__item">New Flow → Record-Triggered → Object: <code>Reservation__c</code> → Trigger: Created → Optimize: <strong>Actions and Related Records</strong>.</li>
        <li class="step-list__item"><strong>Get Records:</strong> Fetch the Room__c record where Id = <code>$Record.Room__c</code>.</li>
        <li class="step-list__item"><strong>Update Records:</strong> Set <code>Room__c.Status__c = "Occupied"</code>, <code>Room__c.Current_Guest__c = $Record.Guest_Name__c</code>.</li>
        <li class="step-list__item"><strong>Send Email:</strong> Notify the Housekeeping queue with room number and check-in time.</li>
        <li class="step-list__item">Add <strong>Fault Paths</strong> on both Update and Email elements.</li>
      </ol>

      <h2>Flow C: Room Freed on Checkout (After-Save, on Update)</h2>
      <div class="callout callout--tip">
        <p class="callout__title">💡 Entry Conditions — "Only when updated to meet condition"</p>
        <p>When configuring a Record-Triggered Flow on update, you choose: <strong>"Every time a record is updated and meets condition"</strong> (runs on every save if condition is true) vs <strong>"Only when a record is updated to meet the condition"</strong> (runs only when the condition transitions from false to true — like a status changing from "Active" to "Checked Out").</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Trigger: Updated. Condition: <code>Status__c = "Checked Out"</code>. Run: <strong>Only when updated to meet condition</strong>.</li>
        <li class="step-list__item"><strong>Update Records:</strong> Set Room__c.Status__c = "Available", clear Current_Guest__c.</li>
        <li class="step-list__item"><strong>Send Email:</strong> Notify Housekeeping "Room {roomNumber} needs turnover."</li>
      </ol>
    `
  },

  // Placeholder entries for use cases 11-50 (will be filled in next batches)
  // Using a builder pattern to keep the file extensible

  // ================================================================
  // USE CASE 11
  // ================================================================
  {
    id: 11,
    title: 'CloudSync SaaS — Scheduled Flow: License Expiry & Renewal Reminders',
    difficulty: 'Medium',
    category: 'Flow / Scheduled',
    company: 'CloudSync Technologies',
    subtitle: 'Build a Scheduled Flow that runs daily, checks license expiry dates, sends tiered reminders, and auto-creates renewal Opportunities.',
    tags: ['Scheduled Flow', 'Get Records', 'Loop', 'Decision', 'Create Records', 'Bulk Operations'],
    description: 'CloudSync sells annual software licenses. They need automated reminders at 90, 60, and 30 days before expiry, with auto-creation of renewal Opportunities at the 60-day mark.',
    learnings: [
      'Build Scheduled Flows with daily/hourly frequency',
      'Use Get Records to fetch batches of records meeting criteria',
      'Process records in Loops with collection variables',
      'Perform bulk DML after loops (never inside)',
      'Use Decision elements for tiered logic within loops'
    ],
    content: `
      <h2>Background</h2>
      <p>CloudSync's 2,000+ customers have annual licenses with different expiry dates. Currently, account managers manually check a spreadsheet for upcoming renewals — and they miss 15% of them. The company needs automated, tiered email reminders and auto-creation of renewal pipeline.</p>

      
      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 &rarr; Flow Design &middot; Step 2 &rarr; Build Steps</p>
      </div>
<div class="callout callout--warning">
        <p class="callout__title">⚠️ï¸ Critical Rule: Never DML Inside a Loop</p>
        <p>Salesforce enforces <strong>Governor Limits</strong> — e.g., max 150 DML statements per transaction. If you put a Create Records element inside a Loop processing 200 records, you'll hit the limit at record 151 and the flow will fail. Instead: <strong>collect records into a collection variable inside the loop</strong>, then do <strong>one bulk Create/Update after the loop ends</strong>.</p>
      </div>

      <h2>Flow Design</h2>
      <pre><code>Start (Daily Schedule, 6 AM)
  → Get Records: Licenses expiring in next 90 days
  → Loop over results
    → Decision: Days until expiry?
      → 90 days: Add to "90-day reminder" collection
      → 60 days: Add to "60-day reminder" + "create renewal" collection
      → 30 days: Add to "30-day urgent" collection
  → After loop: Send Email (90-day batch)
  → After loop: Send Email (60-day batch)
  → After loop: Create Records (renewal Opportunities, bulk)
  → After loop: Send Email (30-day urgent batch)</code></pre>

      <h2>Build Steps</h2>
      <ol class="step-list">
        <li class="step-list__item">New Flow → <strong>Schedule-Triggered Flow</strong>. Start: Daily at 6:00 AM.</li>
        <li class="step-list__item"><strong>Get Records:</strong> Object = <code>License__c</code>. Filter: <code>Expiry_Date__c &lt;= TODAY() + 90</code> AND <code>Status__c = "Active"</code> AND <code>Renewal_Reminder_Sent__c != "30-Day"</code>. Store all fields, get all records.</li>
        <li class="step-list__item">Create 3 collection variables: <code>col_90Day</code>, <code>col_60Day</code>, <code>col_30Day</code> (type: License__c).</li>
        <li class="step-list__item"><strong>Loop</strong> over the Get Records results. Inside:</li>
        <li class="step-list__item"><strong>Formula:</strong> <code>daysUntilExpiry = {!currentItem.Expiry_Date__c} - TODAY()</code></li>
        <li class="step-list__item"><strong>Decision:</strong> Branch on daysUntilExpiry:
          <br>â€¢ â‰¤ 30 → Assignment: add to col_30Day, set Renewal_Reminder_Sent__c = "30-Day"
          <br>â€¢ â‰¤ 60 → Assignment: add to col_60Day, set Renewal_Reminder_Sent__c = "60-Day"
          <br>â€¢ â‰¤ 90 → Assignment: add to col_90Day, set Renewal_Reminder_Sent__c = "90-Day"</li>
        <li class="step-list__item"><strong>After loop:</strong> Update Records (all modified licenses in bulk). Create Records (renewal Opportunities from col_60Day). Send 3 email alerts.</li>
      </ol>

      <table><thead><tr><th>Component</th><th>API Name</th><th>Schedule</th></tr></thead><tbody>
        <tr><td>Scheduled Flow</td><td><code>License_Renewal_Reminder_Scheduled</code></td><td>Daily at 6 AM</td></tr>
      </tbody></table>
    `
  },

  // ================================================================
  // USE CASE 12
  // ================================================================
  {
    id: 12,
    title: 'SwiftDeliver — Apex Trigger: Handler Pattern & Bulkification',
    difficulty: 'Hard',
    category: 'Apex / Triggers',
    company: 'SwiftDeliver Logistics',
    subtitle: 'Write your first Apex Trigger with the Handler Pattern — before/after insert, bulkification, and helper methods.',
    tags: ['Apex Trigger', 'Trigger Handler', 'Bulkification', 'Trigger Context Variables', 'Helper Classes'],
    description: 'SwiftDeliver needs code-level automation that Flow cannot easily handle: when a Delivery is marked "Completed", automatically update the parent Order\'s status, calculate delivery performance metrics, and log an audit trail — all in a bulk-safe, testable pattern.',
    learnings: [
      'Write an Apex Trigger with before and after context',
      'Implement the Trigger Handler pattern for maintainable code',
      'Bulkify SOQL and DML to respect Governor Limits',
      'Use Trigger.new, Trigger.old, Trigger.newMap, Trigger.oldMap',
      'Separate business logic into a Handler class'
    ],
    content: `
      <h2>Background</h2>
      <p>SwiftDeliver processes 10,000+ deliveries daily. When a delivery is marked "Completed", three things must happen: (1) the parent Order's delivery count and status must update, (2) a performance metric must be calculated, and (3) an audit log record must be created. Flow could do some of this, but the complex cross-object calculations and the need for transactional integrity make Apex the right choice.</p>

      
      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 &rarr; The Trigger (Thin Trigger Pattern) &middot; Step 2 &rarr; The Handler Class</p>
      </div>
<div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Why Use Apex Instead of Flow?</p>
        <p>Use Apex when you need: <strong>Complex cross-object logic</strong> in a single transaction, <strong>HTTP callouts</strong> to external systems, operations on <strong>very large record sets</strong> where Flow's loops would be slow, or logic that requires <strong>precise error handling</strong> with try/catch. For simple field updates and routing, Flow is preferred.</p>
      </div>

      <h2>Step 1: The Trigger (Thin Trigger Pattern)</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Trigger Handler Pattern</p>
        <p>Best practice: keep your Trigger file <strong>thin</strong> — it should only call a Handler class. All business logic lives in the Handler. This makes the code testable (you can test the Handler directly), maintainable (one file per concern), and prevents the "mega-trigger" anti-pattern.</p>
      </div>
      <pre><code>// DeliveryTrigger.trigger
trigger DeliveryTrigger on Delivery__c (before update, after update) {
    DeliveryTriggerHandler handler = new DeliveryTriggerHandler();
    
    if (Trigger.isBefore && Trigger.isUpdate) {
        handler.beforeUpdate(Trigger.new, Trigger.oldMap);
    }
    if (Trigger.isAfter && Trigger.isUpdate) {
        handler.afterUpdate(Trigger.new, Trigger.oldMap);
    }
}</code></pre>

      <h2>Step 2: The Handler Class</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Bulkification</p>
        <p><strong>Bulkification</strong> means writing code that handles 1 record or 10,000 records equally well. Key rules: (1) Never put SOQL or DML inside a for-loop. (2) Collect IDs first, query once, then process. (3) Use Maps for O(1) lookups instead of nested loops.</p>
      </div>
      <pre><code>// DeliveryTriggerHandler.cls
public class DeliveryTriggerHandler {

    // BEFORE UPDATE: Calculate performance metric on the delivery itself
    public void beforeUpdate(List&lt;Delivery__c&gt; newList, 
                             Map&lt;Id, Delivery__c&gt; oldMap) {
        for (Delivery__c del : newList) {
            Delivery__c oldDel = oldMap.get(del.Id);
            // Only run when Status changes to "Completed"
            if (del.Status__c == 'Completed' 
                && oldDel.Status__c != 'Completed') {
                // Calculate hours between creation and completion
                Long milliseconds = del.Completed_Date__c.getTime() 
                                  - del.CreatedDate.getTime();
                del.Delivery_Hours__c = milliseconds / (1000 * 60 * 60);
            }
        }
        // No DML needed — before-trigger changes save automatically
    }

    // AFTER UPDATE: Update parent Orders + create Audit Logs
    public void afterUpdate(List&lt;Delivery__c&gt; newList, 
                            Map&lt;Id, Delivery__c&gt; oldMap) {
        Set&lt;Id&gt; completedOrderIds = new Set&lt;Id&gt;();
        List&lt;Audit_Log__c&gt; auditLogs = new List&lt;Audit_Log__c&gt;();
        
        for (Delivery__c del : newList) {
            Delivery__c oldDel = oldMap.get(del.Id);
            if (del.Status__c == 'Completed' 
                && oldDel.Status__c != 'Completed') {
                completedOrderIds.add(del.Order__c);
                auditLogs.add(new Audit_Log__c(
                    Record_Id__c = del.Id,
                    Action__c = 'Delivery Completed',
                    Timestamp__c = System.now()
                ));
            }
        }
        
        if (!completedOrderIds.isEmpty()) {
            updateParentOrders(completedOrderIds);
        }
        if (!auditLogs.isEmpty()) {
            insert auditLogs; // Bulk insert — one DML for all
        }
    }

    private void updateParentOrders(Set&lt;Id&gt; orderIds) {
        // One SOQL — not inside a loop
        List&lt;Order__c&gt; orders = [
            SELECT Id, Total_Deliveries__c,
                (SELECT Id FROM Deliveries__r 
                 WHERE Status__c = 'Completed')
            FROM Order__c WHERE Id IN :orderIds
        ];
        for (Order__c ord : orders) {
            ord.Completed_Deliveries__c = ord.Deliveries__r.size();
            if (ord.Completed_Deliveries__c == ord.Total_Deliveries__c) {
                ord.Status__c = 'Fulfilled';
            }
        }
        update orders; // One DML — not inside a loop
    }
}</code></pre>

      <div class="callout callout--important">
        <p class="callout__title">ðŸ”´ Governor Limits to Watch</p>
        <p>â€¢ Max <strong>100 SOQL queries</strong> per transaction<br>â€¢ Max <strong>150 DML statements</strong> per transaction<br>â€¢ Max <strong>50,000 records</strong> returned by SOQL<br>â€¢ Max <strong>10,000 records</strong> processed by DML</p>
      </div>
    `
  },

  // ================================================================
  // USE CASE 13
  // ================================================================
  {
    id: 13,
    title: 'PayFlow — Apex Batch Processing: Monthly Invoice Generation',
    difficulty: 'Hard',
    category: 'Apex / Async Processing',
    company: 'PayFlow Billing',
    subtitle: 'Write Batch Apex to process 100,000+ subscription records, generate invoices, and schedule it monthly with Schedulable Apex.',
    tags: ['Batch Apex', 'Schedulable Apex', 'Database.Batchable', 'start/execute/finish', 'Cron Expressions'],
    description: 'PayFlow has 100,000+ active subscriptions. On the 1st of every month, the system must generate an Invoice record for each active subscription, calculate prorated amounts, and email a summary to the billing team. This exceeds Governor Limits for synchronous Apex.',
    learnings: [
      'Implement Database.Batchable<sObject> interface (start, execute, finish)',
      'Understand batch size and scope parameter tuning',
      'Chain batch jobs for sequential processing',
      'Write Schedulable Apex with Cron expressions',
      'Handle partial failures with Database.SaveResult'
    ],
    content: `
      <h2>Background</h2>
      <p>PayFlow tries to generate invoices with a Record-Triggered Flow, but it times out — 100,000+ records exceed synchronous limits. Batch Apex processes records in chunks (default 200), each chunk in its own transaction with fresh Governor Limits.</p>

      
      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Review the instructions below to complete the build.</p>
      </div>
<div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Batch Apex</p>
        <p><strong>Batch Apex</strong> implements <code>Database.Batchable&lt;sObject&gt;</code> with 3 methods: <code>start()</code> returns the query of records to process, <code>execute()</code> processes each chunk (scope), and <code>finish()</code> runs once after all chunks complete. Each <code>execute()</code> call gets fresh Governor Limits.</p>
      </div>

      <h2>The Batch Class</h2>
      <pre><code>public class MonthlyInvoiceBatch 
    implements Database.Batchable&lt;sObject&gt;, Database.Stateful {
    
    private Integer successCount = 0;
    private Integer failCount = 0;
    private List&lt;String&gt; errorMessages = new List&lt;String&gt;();
    
    // START: Define what records to process
    public Database.QueryLocator start(Database.BatchableContext bc) {
        return Database.getQueryLocator([
            SELECT Id, Account__c, Plan__c, MRR__c, 
                   Start_Date__c, End_Date__c
            FROM Subscription__c
            WHERE Status__c = 'Active'
            AND End_Date__c &gt;= TODAY()
        ]);
    }
    
    // EXECUTE: Process each chunk (default 200 records)
    public void execute(Database.BatchableContext bc, 
                        List&lt;Subscription__c&gt; scope) {
        List&lt;Invoice__c&gt; invoices = new List&lt;Invoice__c&gt;();
        
        for (Subscription__c sub : scope) {
            invoices.add(new Invoice__c(
                Subscription__c = sub.Id,
                Account__c = sub.Account__c,
                Amount__c = sub.MRR__c,
                Invoice_Date__c = Date.today(),
                Due_Date__c = Date.today().addDays(30),
                Status__c = 'Pending'
            ));
        }
        
        // Use Database.insert for partial success handling
        Database.SaveResult[] results = 
            Database.insert(invoices, false); // false = allow partial
        
        for (Database.SaveResult sr : results) {
            if (sr.isSuccess()) {
                successCount++;
            } else {
                failCount++;
                for (Database.Error err : sr.getErrors()) {
                    errorMessages.add(err.getMessage());
                }
            }
        }
    }
    
    // FINISH: Send summary email
    public void finish(Database.BatchableContext bc) {
        Messaging.SingleEmailMessage email = 
            new Messaging.SingleEmailMessage();
        email.setToAddresses(new String[]{'billing@payflow.com'});
        email.setSubject('Monthly Invoice Batch Complete');
        email.setPlainTextBody(
            'Invoices Created: ' + successCount + 'n' +
            'Failures: ' + failCount + 'n' +
            'Errors: ' + String.join(errorMessages, 'n')
        );
        Messaging.sendEmail(new List&lt;Messaging.SingleEmailMessage&gt;{email});
    }
}</code></pre>

      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Database.Stateful</p>
        <p>Normally, instance variables reset between <code>execute()</code> calls. Implementing <code>Database.Stateful</code> preserves instance variables across chunks — needed here to accumulate <code>successCount</code> and <code>failCount</code> across all batches.</p>
      </div>

      <h2>Schedule It Monthly</h2>
      <pre><code>public class MonthlyInvoiceScheduler implements Schedulable {
    public void execute(SchedulableContext sc) {
        MonthlyInvoiceBatch batch = new MonthlyInvoiceBatch();
        Database.executeBatch(batch, 200); // 200 records per chunk
    }
}

// Schedule via Anonymous Apex:
// Runs at midnight on the 1st of every month
String cronExp = '0 0 0 1 * ?';
System.schedule('Monthly Invoice Generation', 
                cronExp, new MonthlyInvoiceScheduler());</code></pre>

      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Cron Expressions</p>
        <p>Format: <code>Seconds Minutes Hours Day_of_Month Month Day_of_Week Optional_Year</code>. <code>'0 0 0 1 * ?'</code> = at 00:00:00 on the 1st day of every month. The <code>?</code> means "no specific value" for day-of-week (since day-of-month is specified).</p>
      </div>
    `
  },

  // ================================================================
  // USE CASE 14
  // ================================================================
  {
    id: 14,
    title: 'HealthBridge — Apex Test Classes: Achieving 100% Code Coverage',
    difficulty: 'Hard',
    category: 'Apex / Testing',
    company: 'HealthBridge Systems',
    subtitle: 'Write comprehensive test classes with test data factories, positive/negative scenarios, bulk testing, and System.runAs().',
    tags: ['Test Classes', 'TestSetup', 'Test Data Factory', 'System.runAs', 'Asserts', 'Bulk Testing'],
    description: 'HealthBridge has Apex triggers and classes that need deployment to production. Salesforce requires 75% code coverage, but best practice targets 100%. We write test classes covering positive, negative, bulk, and security scenarios.',
    learnings: [
      'Write @isTest classes with @TestSetup methods',
      'Create Test Data Factory patterns for reusable test data',
      'Test positive cases (happy path) and negative cases (expected failures)',
      'Use System.runAs() to test profile/permission-based logic',
      'Bulk test with 200+ records to verify Governor Limit safety'
    ],
    content: `
      <h2>Background</h2>
      <p>HealthBridge has a trigger that auto-calculates patient risk scores and assigns them to care teams. Before deploying to production, they need test classes that prove the code works correctly in all scenarios — not just "enough lines to hit 75%."</p>

      
      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 &rarr; Test Data Factory &middot; Step 2 &rarr; The Test Class</p>
      </div>
<div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Why Test Classes Matter</p>
        <p>Salesforce <strong>requires minimum 75% code coverage</strong> to deploy to production. But coverage alone doesn't prove correctness — you need <strong>assertions</strong> (System.assertEquals) that verify the code produced the right output. A test without assertions is a test that can never fail.</p>
      </div>

      <h2>Step 1: Test Data Factory</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — @TestSetup & Test Data Factory</p>
        <p><code>@TestSetup</code> runs once before all test methods in a class, creating shared test data. A <strong>Test Data Factory</strong> is a separate utility class with methods that create records for any test class to use — avoiding duplicate data setup across dozens of test classes.</p>
      </div>
      <pre><code>@isTest
public class TestDataFactory {
    
    public static Account createAccount(String name) {
        Account acc = new Account(Name = name);
        insert acc;
        return acc;
    }
    
    public static List&lt;Patient__c&gt; createPatients(
            Id accountId, Integer count) {
        List&lt;Patient__c&gt; patients = new List&lt;Patient__c&gt;();
        for (Integer i = 0; i &lt; count; i++) {
            patients.add(new Patient__c(
                First_Name__c = 'Test',
                Last_Name__c = 'Patient ' + i,
                Account__c = accountId,
                Age__c = 30 + Math.mod(i, 50),
                Risk_Score__c = null // Should be auto-set by trigger
            ));
        }
        insert patients;
        return patients;
    }
    
    public static User createUser(String profileName) {
        Profile p = [SELECT Id FROM Profile 
                     WHERE Name = :profileName LIMIT 1];
        User u = new User(
            FirstName = 'Test', LastName = 'User',
            Email = 'test' + System.now().getTime() + '@test.com',
            Username = 'test' + System.now().getTime() + '@test.com',
            Alias = 'tuser',
            ProfileId = p.Id,
            TimeZoneSidKey = 'Asia/Kolkata',
            LocaleSidKey = 'en_IN',
            EmailEncodingKey = 'UTF-8',
            LanguageLocaleKey = 'en_US'
        );
        insert u;
        return u;
    }
}</code></pre>

      <h2>Step 2: The Test Class</h2>
      <pre><code>@isTest
public class PatientTriggerTest {
    
    @TestSetup
    static void setupData() {
        Account acc = TestDataFactory.createAccount('HealthBridge Clinic');
        TestDataFactory.createPatients(acc.Id, 5);
    }
    
    // POSITIVE TEST: Risk score is calculated correctly
    @isTest
    static void testRiskScoreCalculation() {
        List&lt;Patient__c&gt; patients = [
            SELECT Id, Risk_Score__c, Age__c 
            FROM Patient__c
        ];
        
        for (Patient__c p : patients) {
            System.assertNotEquals(null, p.Risk_Score__c, 
                'Risk score should be auto-calculated');
            System.assert(p.Risk_Score__c &gt;= 0 && p.Risk_Score__c &lt;= 100,
                'Risk score should be between 0 and 100');
        }
    }
    
    // NEGATIVE TEST: Missing required field
    @isTest
    static void testMissingRequiredField() {
        try {
            Patient__c p = new Patient__c(
                First_Name__c = 'No',
                Last_Name__c = 'Account'
                // Missing Account__c (required)
            );
            insert p;
            System.assert(false, 'Should have thrown an exception');
        } catch (DmlException e) {
            System.assert(e.getMessage().contains('REQUIRED'),
                'Should fail on required field');
        }
    }
    
    // BULK TEST: Process 200+ records
    @isTest
    static void testBulkInsert() {
        Account acc = [SELECT Id FROM Account LIMIT 1];
        Test.startTest();
        List&lt;Patient__c&gt; bulkPatients = 
            TestDataFactory.createPatients(acc.Id, 200);
        Test.stopTest();
        
        Integer count = [SELECT COUNT() FROM Patient__c 
                         WHERE Risk_Score__c != null];
        System.assertEquals(205, count, 
            'All 205 patients should have risk scores');
    }
    
    // SECURITY TEST: Run as restricted profile
    @isTest
    static void testRestrictedProfileAccess() {
        User restrictedUser = TestDataFactory.createUser('Standard User');
        
        System.runAs(restrictedUser) {
            try {
                Patient__c p = new Patient__c(
                    First_Name__c = 'Restricted',
                    Last_Name__c = 'User'
                );
                insert p;
            } catch (DmlException e) {
                System.assert(true, 'Expected access denied');
            }
        }
    }
}</code></pre>

      <div class="callout callout--tip">
        <p class="callout__title">💡 Test.startTest() / Test.stopTest()</p>
        <p>Code between <code>Test.startTest()</code> and <code>Test.stopTest()</code> gets a <strong>fresh set of Governor Limits</strong>, separate from the test setup code. This is also where async code (future, batch, queueable) gets forced to execute synchronously for testing.</p>
      </div>
    `
  },

  // ================================================================
  // USE CASE 15
  // ================================================================
  {
    id: 15,
    title: 'NexaPay — Queueable Apex: Chaining Async Jobs for Payment Processing',
    difficulty: 'Hard',
    category: 'Apex / Async Processing',
    company: 'NexaPay Financial',
    subtitle: 'Implement Queueable Apex with job chaining, callouts to a payment gateway, and retry logic for failed transactions.',
    tags: ['Queueable Apex', 'Job Chaining', 'HTTP Callouts', 'Database.AllowsCallouts', 'Retry Pattern'],
    description: 'NexaPay processes payments by calling an external payment gateway API. Each payment requires a callout, status update, and notification. With 1,000+ payments per batch, synchronous processing would timeout. Queueable Apex handles this asynchronously with job chaining.',
    learnings: [
      'Implement the System.Queueable interface',
      'Enable HTTP callouts with Database.AllowsCallouts',
      'Chain queueable jobs for sequential async processing',
      'Build retry logic for transient failures',
      'Compare Queueable vs Future vs Batch Apex use cases'
    ],
    content: `
      <h2>Background</h2>
      <p>NexaPay's payment flow: (1) Call the PaymentGateway API with card/amount details, (2) Update the Payment__c record with the gateway's response, (3) Send confirmation email. This can't be synchronous (callouts + DML in triggers are limited) and can't be @future (no chaining, no complex objects). Queueable is the right fit.</p>

      
      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Review the instructions below to complete the build.</p>
      </div>
<div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Queueable vs Future vs Batch</p>
        <p><strong>@future</strong>: Simplest async — fire and forget, but can't chain, can't pass sObjects, only primitive params.<br><strong>Queueable</strong>: Can pass complex objects, can chain to another Queueable, supports callouts. Best for "do this one async job, then do the next."<br><strong>Batch</strong>: For processing huge datasets in chunks. Overkill for a single record's async work.</p>
      </div>

      <h2>The Queueable Class</h2>
      <pre><code>public class PaymentProcessor 
    implements Queueable, Database.AllowsCallouts {
    
    private List&lt;Id&gt; paymentIds;
    private Integer retryCount;
    
    public PaymentProcessor(List&lt;Id&gt; paymentIds) {
        this.paymentIds = paymentIds;
        this.retryCount = 0;
    }
    
    public PaymentProcessor(List&lt;Id&gt; paymentIds, Integer retryCount) {
        this.paymentIds = paymentIds;
        this.retryCount = retryCount;
    }
    
    public void execute(QueueableContext context) {
        List&lt;Payment__c&gt; payments = [
            SELECT Id, Amount__c, Card_Token__c, Status__c
            FROM Payment__c 
            WHERE Id IN :paymentIds AND Status__c = 'Pending'
        ];
        
        List&lt;Payment__c&gt; toUpdate = new List&lt;Payment__c&gt;();
        List&lt;Id&gt; failedIds = new List&lt;Id&gt;();
        
        for (Payment__c pmt : payments) {
            try {
                // HTTP Callout to payment gateway
                HttpResponse resp = callPaymentGateway(
                    pmt.Card_Token__c, pmt.Amount__c);
                
                if (resp.getStatusCode() == 200) {
                    pmt.Status__c = 'Completed';
                    pmt.Gateway_Response__c = resp.getBody();
                } else {
                    pmt.Status__c = 'Failed';
                    pmt.Error_Message__c = resp.getBody();
                    failedIds.add(pmt.Id);
                }
            } catch (Exception e) {
                pmt.Status__c = 'Error';
                pmt.Error_Message__c = e.getMessage();
                failedIds.add(pmt.Id);
            }
            toUpdate.add(pmt);
        }
        
        update toUpdate;
        
        // Chain: retry failed payments (max 3 attempts)
        if (!failedIds.isEmpty() && retryCount &lt; 3) {
            System.enqueueJob(
                new PaymentProcessor(failedIds, retryCount + 1));
        }
    }
    
    private HttpResponse callPaymentGateway(
            String token, Decimal amount) {
        HttpRequest req = new HttpRequest();
        req.setEndpoint('callout:PaymentGateway/charge');
        req.setMethod('POST');
        req.setHeader('Content-Type', 'application/json');
        req.setBody('{"token":"' + token + '","amount":' + amount + '}');
        req.setTimeout(30000);
        return new Http().send(req);
    }
}</code></pre>

      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Job Chaining</p>
        <p>You can call <code>System.enqueueJob()</code> from within a Queueable's <code>execute()</code> method to chain another job. Limit: <strong>1 child job per execution in synchronous context, up to 2 in test context</strong>. This is perfect for retry patterns — if payments fail, chain a retry with an incremented counter.</p>
      </div>

      <div class="callout callout--tip">
        <p class="callout__title">💡 Named Credentials</p>
        <p>The <code>callout:PaymentGateway</code> prefix uses a <strong>Named Credential</strong> — a secure way to store endpoint URLs and authentication. Setup → Named Credentials → New. The credential handles OAuth/API keys so your code never contains hardcoded secrets.</p>
      </div>
    `
  },

  // ================================================================
  // USE CASE 16
  // ================================================================
  {
    id: 16,
    title: 'GlobeTrotter — Apex REST Callout: Live Exchange Rates Integration',
    difficulty: 'Hard',
    category: 'Apex / Integration',
    company: 'GlobeTrotter Travel',
    subtitle: 'Make synchronous HTTP callouts to an external REST API to fetch live currency exchange rates from Apex.',
    tags: ['HTTP Callout', 'REST API', 'JSON Parsing', 'Named Credentials', 'JSON2Apex'],
    description: 'GlobeTrotter needs live currency exchange rates on their Opportunities to calculate accurate margins for international tours. We build an Apex class that calls a public REST API, parses the JSON response, and updates the Opportunity records.',
    learnings: [
      'Set up Remote Site Settings and Named Credentials',
      'Use the HttpRequest, Http, and HttpResponse classes',
      'Parse JSON responses using JSON.deserializeUntyped or strongly-typed wrapper classes',
      'Handle API errors gracefully',
      'Create an invocable method to call the integration from Flow'
    ],
    content: `
      <h2>Background</h2>
      <p>GlobeTrotter Travel quotes tours in USD, but incurs costs in EUR, JPY, and GBP. They need an automated way to pull today's exchange rate from an external API (like ExchangeRate-API) whenever an Opportunity is updated, to ensure they aren't losing margin on currency fluctuations.</p>

      
      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 &rarr; Security Configuration &middot; Step 2 &rarr; The Apex Callout Class &middot; Step 3 &rarr; Wrapper Class Alternative</p>
      </div>
<h2>Step 1: Security Configuration</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Named Credentials</p>
        <p>Salesforce blocks outbound calls to unknown URLs. You must authorize the endpoint. <strong>Named Credentials</strong> are best practice because they handle the base URL and authentication (API keys/OAuth) securely, keeping secrets out of code. If no auth is needed, <strong>Remote Site Settings</strong> can simply whitelist the domain.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Setup → <strong>Named Credentials</strong> → New Legacy.</li>
        <li class="step-list__item">Label: <code>ExchangeRateAPI</code>. URL: <code>https://api.exchangerate-api.com/v4/latest</code>.</li>
        <li class="step-list__item">Identity Type: Named Principal. Authentication: Password (put API key here if required).</li>
      </ol>

      <h2>Step 2: The Apex Callout Class</h2>
      <pre><code>public class ExchangeRateService {

    // @InvocableMethod allows Flow to call this Apex
    @InvocableMethod(label='Update Exchange Rates' 
                     description='Fetches live rates for Opps')
    public static void updateOpportunityRates(List&lt;Id&gt; oppIds) {
        // Since we are called from a trigger/flow, we must use @future(callout=true)
        // or a Queueable to make callouts async.
        makeCalloutAsync(oppIds);
    }

    @future(callout=true)
    private static void makeCalloutAsync(List&lt;Id&gt; oppIds) {
        List&lt;Opportunity&gt; opps = [SELECT Id, CurrencyIsoCode 
                                  FROM Opportunity WHERE Id IN :oppIds];
        
        // 1. Prepare Request
        HttpRequest req = new HttpRequest();
        // Using Named Credential
        req.setEndpoint('callout:ExchangeRateAPI/USD');
        req.setMethod('GET');
        
        // 2. Send Request
        Http http = new Http();
        HttpResponse res;
        
        try {
            res = http.send(req);
            
            if (res.getStatusCode() == 200) {
                // 3. Parse JSON Response
                Map&lt;String, Object&gt; results = 
                    (Map&lt;String, Object&gt;) JSON.deserializeUntyped(res.getBody());
                Map&lt;String, Object&gt; rates = 
                    (Map&lt;String, Object&gt;) results.get('rates');
                
                // 4. Process Data
                for (Opportunity opp : opps) {
                    if (rates.containsKey(opp.CurrencyIsoCode)) {
                        Decimal rate = (Decimal) rates.get(opp.CurrencyIsoCode);
                        opp.Current_Exchange_Rate__c = rate;
                    }
                }
                update opps;
            } else {
                System.debug('API Error: ' + res.getStatus());
            }
        } catch (Exception e) {
            System.debug('Callout Exception: ' + e.getMessage());
        }
    }
}</code></pre>

      <div class="callout callout--warning">
        <p class="callout__title">⚠️ï¸ Callout Rule</p>
        <p>You <strong>cannot make a synchronous callout from a Trigger</strong> or a Record-Triggered Flow (it holds up the database transaction). You must move the callout to an asynchronous method like <code>@future(callout=true)</code> or Queueable.</p>
      </div>

      <h2>Step 3: Wrapper Class Alternative</h2>
      <p>Instead of <code>JSON.deserializeUntyped</code> (which returns messy Maps of Objects), you can generate a strongly-typed Apex wrapper class using tools like JSON2Apex.</p>
      <pre><code>public class ExchangeRateResponse {
    public String base;
    public String date;
    public Map&lt;String, Decimal&gt; rates;
}

// In the callout method:
ExchangeRateResponse parsed = (ExchangeRateResponse) 
    JSON.deserialize(res.getBody(), ExchangeRateResponse.class);
Decimal eurRate = parsed.rates.get('EUR');</code></pre>
    `
  },

  // ================================================================
  // USE CASE 17
  // ================================================================
  {
    id: 17,
    title: 'CloudERP — Apex REST Web Service: Exposing a Custom API',
    difficulty: 'Hard',
    category: 'Apex / Integration',
    company: 'CloudERP Systems',
    subtitle: 'Expose a custom REST endpoint in Salesforce for external systems to create and update records.',
    tags: ['Apex REST', '@RestResource', 'HTTP Methods', 'RestRequest', 'RestResponse'],
    description: 'CloudERP needs to push inventory updates into Salesforce from their legacy mainframe. We build a custom Apex REST Web Service endpoint that accepts JSON payloads, processes complex business logic, and returns a standard response.',
    learnings: [
      'Create custom REST endpoints using @RestResource',
      'Implement @HttpGet, @HttpPost, @HttpPut methods',
      'Read JSON payloads from RestContext.request',
      'Send formatted responses via RestContext.response',
      'Understand Salesforce API authentication (OAuth)'
    ],
    content: `
      <h2>Background</h2>
      <p>CloudERP's legacy warehouse system needs to update Salesforce <code>Inventory__c</code> records in real-time. The standard Salesforce REST API is too generic — they want a custom endpoint that accepts a specific JSON structure, runs validation logic, and inserts/updates the records in one go.</p>

      
      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Review the instructions below to complete the build.</p>
      </div>
<div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Custom Apex REST</p>
        <p>By annotating a class with <code>@RestResource(urlMapping='/something/*')</code>, you expose it as a custom API endpoint at <code>https://your-domain.my.salesforce.com/services/apexrest/something/</code>. External systems must authenticate (usually via OAuth 2.0 JWT or Client Credentials) to call it.</p>
      </div>

      <h2>The Apex Web Service Class</h2>
      <pre><code>@RestResource(urlMapping='/InventorySync/*')
global with sharing class InventorySyncService {

    // GET: Fetch inventory levels
    @HttpGet
    global static Inventory__c getInventory() {
        RestRequest req = RestContext.request;
        // Extract ID from URL: /services/apexrest/InventorySync/SKU-123
        String sku = req.requestURI.substring(
            req.requestURI.lastIndexOf('/') + 1);
            
        Inventory__c inv = [SELECT Id, SKU__c, Quantity__c 
                            FROM Inventory__c 
                            WHERE SKU__c = :sku LIMIT 1];
        return inv;
    }

    // POST: Create or Update inventory
    @HttpPost
    global static SyncResponse syncInventory(String sku, Integer quantity, String warehouseId) {
        SyncResponse response = new SyncResponse();
        
        try {
            // Upsert based on SKU external ID
            Inventory__c inv = new Inventory__c(
                SKU__c = sku,
                Quantity__c = quantity,
                Warehouse_ID__c = warehouseId
            );
            
            upsert inv SKU__c;
            
            response.isSuccess = true;
            response.message = 'Inventory synced successfully';
            response.recordId = inv.Id;
            
        } catch (Exception e) {
            RestContext.response.statusCode = 500;
            response.isSuccess = false;
            response.message = e.getMessage();
        }
        
        return response;
    }
    
    // Wrapper class for formatted JSON response
    global class SyncResponse {
        global Boolean isSuccess;
        global String message;
        global String recordId;
    }
}</code></pre>

      <div class="callout callout--tip">
        <p class="callout__title">💡 Auto-JSON Parsing</p>
        <p>Notice the <code>@HttpPost</code> method parameters (sku, quantity, warehouseId). Salesforce automatically parses incoming JSON like <code>{"sku": "ABC", "quantity": 50}</code> and maps them to the method parameters. The return object is automatically serialized back to JSON.</p>
      </div>

      <h2>Testing the Endpoint</h2>
      <p>External systems will call:</p>
      <pre><code>POST /services/apexrest/InventorySync/
Host: your-domain.my.salesforce.com
Authorization: Bearer 00Dxx000000...
Content-Type: application/json

{
    "sku": "PROD-999",
    "quantity": 150,
    "warehouseId": "WH-North"
}</code></pre>
    `
  },

  // ================================================================
  // USE CASE 18
  // ================================================================
  {
    id: 18,
    title: 'HealthCare Plus — LWC Basics: Custom Patient Card',
    difficulty: 'Expert',
    category: 'LWC / Fundamentals',
    company: 'HealthCare Plus',
    subtitle: 'Build your first Lightning Web Component: reactive data binding, track/api decorators, and the Wire service.',
    tags: ['LWC', '@api', '@track', '@wire', 'HTML Template', 'Lightning Data Service'],
    description: 'HealthCare Plus wants a custom widget on the Account page that highlights critical patient vitals (Blood Type, Allergies) fetched directly from the database without Apex.',
    learnings: [
      'Create an LWC bundle (HTML, JS, XML)',
      'Use Lightning Data Service (LDS) with @wire to fetch data without Apex',
      'Use @api to expose properties to the Lightning App Builder',
      'Implement reactive data binding in the HTML template',
      'Configure the component for Record Pages'
    ],
    content: `
      <h2>Background</h2>
      <p>HealthCare Plus doctors need to see a patient's Blood Type and Allergies immediately upon opening an Account record. Standard page layouts are too cluttered. We will build a highly visible Lightning Web Component (LWC) that fetches this data automatically.</p>

      
      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 &rarr; The Metadata XML &middot; Step 2 &rarr; The JavaScript Controller &middot; Step 3 &rarr; The HTML Template</p>
      </div>
<div class="callout callout--definition">
        <p class="callout__title">💡 Concept — What is LWC?</p>
        <p><strong>Lightning Web Components</strong> is Salesforce's modern UI framework based on native web standards (Custom Elements, Shadow DOM). It replaces the older Aura framework. An LWC is a bundle of 3 core files: <code>.html</code> (template), <code>.js</code> (logic), and <code>.js-meta.xml</code> (metadata).</p>
      </div>

      <h2>Step 1: The Metadata XML</h2>
      <p>This exposes the component to the Lightning App Builder so admins can drag and drop it onto the Account page.</p>
      <pre><code>&lt;!-- patientCard.js-meta.xml --&gt;
&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;LightningComponentBundle xmlns="http://soap.sforce.com/2006/04/metadata"&gt;
    &lt;apiVersion&gt;58.0&lt;/apiVersion&gt;
    &lt;isExposed&gt;true&lt;/isExposed&gt;
    &lt;targets&gt;
        &lt;target&gt;lightning__RecordPage&lt;/target&gt;
    &lt;/targets&gt;
&lt;/LightningComponentBundle&gt;</code></pre>

      <h2>Step 2: The JavaScript Controller</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — @api and @wire</p>
        <p><code>@api recordId</code> automatically receives the ID of the current record the component is placed on. <code>@wire</code> (Lightning Data Service) provisions a stream of data to the component. If the database updates, the component re-renders automatically — no Apex needed!</p>
      </div>
      <pre><code>// patientCard.js
import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import BLOOD_TYPE_FIELD from '@salesforce/schema/Account.Blood_Type__c';
import ALLERGIES_FIELD from '@salesforce/schema/Account.Allergies__c';

export default class PatientCard extends LightningElement {
    // Exposes property to receive current record ID
    @api recordId;

    // Wire service fetches data without Apex
    @wire(getRecord, { recordId: '$recordId', fields: [BLOOD_TYPE_FIELD, ALLERGIES_FIELD] })
    patient;

    get bloodType() {
        return getFieldValue(this.patient.data, BLOOD_TYPE_FIELD);
    }

    get allergies() {
        return getFieldValue(this.patient.data, ALLERGIES_FIELD);
    }
}</code></pre>

      <h2>Step 3: The HTML Template</h2>
      <pre><code>&lt;!-- patientCard.html --&gt;
&lt;template&gt;
    &lt;lightning-card title="Critical Patient Vitals" icon-name="standard:healthcare"&gt;
        
        &lt;template if:true={patient.data}&gt;
            &lt;div class="slds-p-around_medium"&gt;
                &lt;p&gt;&lt;strong&gt;Blood Type:&lt;/strong&gt; {bloodType}&lt;/p&gt;
                &lt;p&gt;&lt;strong&gt;Known Allergies:&lt;/strong&gt; 
                    &lt;span class="slds-text-color_error"&gt;{allergies}&lt;/span&gt;
                &lt;/p&gt;
            &lt;/div&gt;
        &lt;/template&gt;

        &lt;template if:true={patient.error}&gt;
            &lt;div class="slds-p-around_medium slds-text-color_error"&gt;
                Error loading data.
            &lt;/div&gt;
        &lt;/template&gt;

    &lt;/lightning-card&gt;
&lt;/template&gt;</code></pre>
    `
  },

  // ================================================================
  // USE CASE 19
  // ================================================================
  {
    id: 19,
    title: 'FinancePro — LWC Communication: Lightning Message Service (LMS)',
    difficulty: 'Expert',
    category: 'LWC / Architecture',
    company: 'FinancePro',
    subtitle: 'Communicate between unconnected LWCs, Aura components, and Visualforce pages using pub/sub architecture.',
    tags: ['LWC', 'LMS', 'Message Channel', 'Publish', 'Subscribe'],
    description: 'FinancePro has a complex dashboard with a "Stock Ticker" component on the left and a "Portfolio Chart" on the right. When a user clicks a stock on the left, the chart on the right must update. Because they do not share a parent component, they must communicate via LMS.',
    learnings: [
      'Understand parent-child vs sibling component communication',
      'Create a Lightning Message Channel XML file',
      'Publish messages from one LWC',
      'Subscribe to messages in another LWC',
      'Handle component lifecycle (connectedCallback / disconnectedCallback)'
    ],
    content: `
      <h2>Background</h2>
      <p>If two LWCs have a parent-child relationship, they communicate via Custom Events (child-to-parent) and @api properties (parent-to-child). But if they sit in completely different parts of the screen (siblings or unconnected), they need a publish/subscribe mechanism. <strong>Lightning Message Service (LMS)</strong> solves this.</p>

      
      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 &rarr; Create the Message Channel &middot; Step 2 &rarr; The Publisher (Stock List LWC) &middot; Step 3 &rarr; The Subscriber (Chart LWC)</p>
      </div>
<h2>Step 1: Create the Message Channel</h2>
      <p>A Message Channel is a metadata component that defines the namespace for your pub/sub channel.</p>
      <pre><code>&lt;!-- StockSelectChannel.messageChannel-meta.xml --&gt;
&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;LightningMessageChannel xmlns="http://soap.sforce.com/2006/04/metadata"&gt;
    &lt;masterLabel&gt;StockSelectChannel&lt;/masterLabel&gt;
    &lt;isExposed&gt;true&lt;/isExposed&gt;
    &lt;description&gt;Broadcasts when a stock is selected&lt;/description&gt;
    &lt;lightningMessageFields&gt;
        &lt;fieldName&gt;stockSymbol&lt;/fieldName&gt;
        &lt;description&gt;The ticker symbol&lt;/description&gt;
    &lt;/lightningMessageFields&gt;
&lt;/LightningMessageChannel&gt;</code></pre>

      <h2>Step 2: The Publisher (Stock List LWC)</h2>
      <pre><code>// stockList.js
import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import STOCK_CHANNEL from '@salesforce/messageChannel/StockSelectChannel__c';

export default class StockList extends LightningElement {
    @wire(MessageContext)
    messageContext;

    handleStockClick(event) {
        const symbol = event.target.dataset.symbol; // e.g., 'AAPL'
        
        // Prepare the message payload
        const payload = { stockSymbol: symbol };
        
        // Broadcast the message to the entire app
        publish(this.messageContext, STOCK_CHANNEL, payload);
    }
}</code></pre>

      <h2>Step 3: The Subscriber (Chart LWC)</h2>
      <pre><code>// stockChart.js
import { LightningElement, wire } from 'lwc';
import { subscribe, unsubscribe, MessageContext } from 'lightning/messageService';
import STOCK_CHANNEL from '@salesforce/messageChannel/StockSelectChannel__c';

export default class StockChart extends LightningElement {
    subscription = null;
    currentStock = 'None Selected';

    @wire(MessageContext)
    messageContext;

    // Standard LWC lifecycle hook — runs when component is inserted in DOM
    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    // Standard LWC lifecycle hook — runs when component is removed
    disconnectedCallback() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                STOCK_CHANNEL,
                (message) =&gt; this.handleMessage(message)
            );
        }
    }

    // Handles the incoming message
    handleMessage(message) {
        this.currentStock = message.stockSymbol;
        // Call logic to re-render chart for this.currentStock
    }
}</code></pre>
    `
  },

  // ================================================================
  // USE CASE 20
  // ================================================================
  {
    id: 20,
    title: 'PartnerHub — Experience Cloud: Building a Partner Portal',
    difficulty: 'Medium',
    category: 'Experience Cloud',
    company: 'PartnerHub Logistics',
    subtitle: 'Deploy a portal for external partners to log in, view their Opportunities, and collaborate without seeing internal data.',
    tags: ['Experience Cloud', 'Partner Community', 'External Sharing', 'Portal Security'],
    description: 'PartnerHub uses external distributors. These partners need to log into a portal, register new Leads, and update their Opportunities. We set up an Experience Cloud site with Partner Community licenses and external sharing rules.',
    learnings: [
      'Enable Digital Experiences and create a site',
      'Configure Partner Community User profiles',
      'Understand Internal vs External OWD (Organization-Wide Defaults)',
      'Use Sharing Sets for high-volume external data sharing',
      'Publish an Experience Builder site'
    ],
    content: `
      <h2>Background</h2>
      <p>PartnerHub's distributors currently email leads in. The company wants to give them a self-service portal (Experience Cloud site) where they can log in, register leads, and track deals — but strictly isolate their data so Partner A cannot see Partner B's deals.</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → Enable Digital Experiences · Step 2 → External OWD · Step 3 → Enable Partner Accounts · Step 4 → Configure Partner Profile · Step 5 → Sharing Sets vs Roles · Step 6 → Customize in Experience Builder · Step 7 → Publish</p>
      </div>

      <h2>Step 1: Enable & Create the Site</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Experience Cloud</p>
        <p><strong>Experience Cloud</strong> (formerly Communities) allows you to build portals, forums, and websites on top of your Salesforce data. External users log in with specific licenses (Customer Community, Partner Community). Each site runs on its own URL, has its own branding, and shows only the data you expose.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Setup → Digital Experiences → Settings → <strong>Enable Digital Experiences</strong>. Choose a domain name (e.g., <code>partnerhub</code>). This cannot be changed later.</li>
        <li class="step-list__item">Go to All Sites → New. Choose the <strong>Partner Central</strong> template.</li>
        <li class="step-list__item">Name it "PartnerHub Portal" and click Create.</li>
        <li class="step-list__item">Salesforce generates a URL like <code>partnerhub.my.site.com/partners</code>.</li>
      </ol>

      <h2>Step 2: External Security (OWD)</h2>
      <div class="callout callout--warning">
        <p class="callout__title">⚠️ï¸ Internal vs External OWD</p>
        <p>Once you enable Experiences, Sharing Settings splits into <strong>Default Internal Access</strong> and <strong>Default External Access</strong>. You almost always want External Access to be <strong>Private</strong> for Accounts, Contacts, and Opportunities. If you leave External Access as "Public Read Only," every partner can see every other partner's data!</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Setup → Sharing Settings.</li>
        <li class="step-list__item">Set <strong>Default External Access</strong> for Account to <strong>Private</strong>.</li>
        <li class="step-list__item">Set <strong>Default External Access</strong> for Contact to <strong>Private</strong>.</li>
        <li class="step-list__item">Set <strong>Default External Access</strong> for Lead and Opportunity to <strong>Private</strong>.</li>
      </ol>
      <table><thead><tr><th>Object</th><th>Internal Access</th><th>External Access</th></tr></thead><tbody>
        <tr><td>Account</td><td>Public Read Only</td><td><strong>Private</strong></td></tr>
        <tr><td>Contact</td><td>Controlled by Parent</td><td><strong>Private</strong></td></tr>
        <tr><td>Lead</td><td>Public Read/Write</td><td><strong>Private</strong></td></tr>
        <tr><td>Opportunity</td><td>Public Read Only</td><td><strong>Private</strong></td></tr>
      </tbody></table>

      <h2>Step 3: Enable Partner Accounts</h2>
      <p>Before a Contact can log in, their parent Account must be enabled as a Partner Account. This is a permanent, irreversible action on the Account.</p>
      <ol class="step-list">
        <li class="step-list__item">Go to a distributor's Account record in Salesforce.</li>
        <li class="step-list__item">Click the drop-down arrow next to <strong>Edit</strong> → <strong>Enable As Partner</strong>.</li>
        <li class="step-list__item">Salesforce creates a Partner Role sub-hierarchy under that Account (Partner User, Partner Manager, Partner Executive).</li>
        <li class="step-list__item">Go to the specific Contact record on that Account.</li>
        <li class="step-list__item">Click <strong>Manage External User → Enable Partner User</strong>. This creates a User record linked to the Contact.</li>
        <li class="step-list__item">Choose the <strong>Partner Community User</strong> profile. Set a Username (email) and click Save.</li>
      </ol>

      <h2>Step 4: Configure the Partner User Profile</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Partner Profile Permissions</p>
        <p>Partner users should have extremely limited access. Clone the standard "Partner Community User" profile and remove access to standard objects they don't need (e.g., Campaigns, Quotes). Grant access only to relevant Custom Objects via Object Permissions and Tab Settings.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Setup → Profiles → Clone the "Partner Community User" profile. Name: "PartnerHub Portal User".</li>
        <li class="step-list__item">Set Tab Settings: Leads = Default On, Opportunities = Default On, Cases = Default Off.</li>
        <li class="step-list__item">Under Object Permissions, grant Create on Lead, Read/Edit on Opportunity.</li>
        <li class="step-list__item">Assign this profile in the Experience Cloud Site's Administration → Members section.</li>
      </ol>

      <h2>Step 5: Sharing Sets vs Partner Roles</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — External Data Sharing</p>
        <p><strong>Partner Community</strong> licenses get roles (Partner User, Partner Manager). They share data via the Role Hierarchy just like internal users. <strong>Customer Community</strong> licenses are high-volume (no roles); they share data using <strong>Sharing Sets</strong>, which map the user's Contact/Account to fields on target records.</p>
      </div>
      <p>Since we use Partner licenses here, the portal user automatically sees Opportunities they own, or Opportunities owned by their subordinates in the partner role hierarchy.</p>
      <table><thead><tr><th>License Type</th><th>Has Roles?</th><th>Sharing Mechanism</th><th>Best For</th></tr></thead><tbody>
        <tr><td>Partner Community</td><td>Yes</td><td>Role Hierarchy + Sharing Rules</td><td>Channel partners, resellers (hundreds)</td></tr>
        <tr><td>Customer Community</td><td>No</td><td>Sharing Sets</td><td>End customers, self-service (millions)</td></tr>
        <tr><td>Customer Community Plus</td><td>Yes</td><td>Role Hierarchy + Sharing Rules</td><td>Customers needing deeper access</td></tr>
      </tbody></table>

      <h2>Step 6: Customize the Portal in Experience Builder</h2>
      <ol class="step-list">
        <li class="step-list__item">From All Sites, click <strong>Builder</strong> next to the PartnerHub Portal.</li>
        <li class="step-list__item">Click the <strong>Theme</strong> panel. Upload the PartnerHub logo and set brand colors.</li>
        <li class="step-list__item">On the Home Page, drag standard components: "Recent Items", "Rich Text" (welcome message), and "Report Chart".</li>
        <li class="step-list__item">Add a <strong>Record List</strong> component showing Opportunities filtered by <code>OwnerId = Current User</code>.</li>
        <li class="step-list__item">Navigate to the Lead Object Pages section and add the "Create Lead" form so partners can register new leads directly.</li>
      </ol>

      <h2>Step 7: Publish the Site</h2>
      <ol class="step-list">
        <li class="step-list__item">In Experience Builder, click <strong>Publish</strong> in the top-right corner.</li>
        <li class="step-list__item">Go to Administration → Settings and check <strong>Make site available to the public</strong> (this activates the URL).</li>
        <li class="step-list__item">Send login credentials to distributors. They will log in via the site URL and see only their own data.</li>
      </ol>

      <div class="callout callout--tip">
        <p class="callout__title">💡 Testing Tip</p>
        <p>To test the portal, log in as the Partner User. In Setup, find the User record and click <strong>Login</strong> next to their name. You will see the portal exactly as the partner sees it. Verify that Partner A cannot see Partner B's Opportunities.</p>
      </div>
    `
  },

  // ================================================================
  // USE CASE 21
  // ================================================================
  {
    id: 21,
    title: 'SupportX — Omni-Channel & Service Cloud Routing',
    difficulty: 'Medium',
    category: 'Service Cloud',
    company: 'SupportX Global',
    subtitle: 'Configure Omni-Channel to automatically route Cases and Live Chats to agents based on capacity and skillset.',
    tags: ['Omni-Channel', 'Routing Configurations', 'Presence Statuses', 'Service Cloud'],
    description: 'SupportX has agents handling both email cases and live chats. Agents are cherry-picking easy cases. We implement Omni-Channel to push work to agents automatically based on their availability and workload capacity.',
    learnings: [
      'Enable Omni-Channel and add the utility bar component',
      'Create Service Channels (Case, Chat)',
      'Configure Routing Configurations (capacity and priority)',
      'Set up Presence Statuses (Available, Busy)',
      'Map Presence Statuses to User Profiles'
    ],
    content: `
      <h2>Background</h2>
      <p>SupportX uses queues, but agents manually pick cases from list views. This causes slow response times for hard cases and agents getting overwhelmed. <strong>Omni-Channel</strong> fixes this by <em>pushing</em> work to available agents based on capacity rules.</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → Enable Omni-Channel · Step 2 → Service Channels · Step 3 → Routing Configurations · Step 4 → Presence Statuses · Step 5 → Assign Presence to Profiles · Step 6 → Test the Widget</p>
      </div>

      <h2>Step 1: Enable Omni-Channel</h2>
      <ol class="step-list">
        <li class="step-list__item">Setup → Omni-Channel Settings → <strong>Enable Omni-Channel</strong>.</li>
        <li class="step-list__item">Setup → App Manager → Edit your Service Console app.</li>
        <li class="step-list__item">Under Utility Items (Desktop Only), click <strong>Add Utility Item</strong> → select <strong>Omni-Channel</strong>.</li>
        <li class="step-list__item">This gives agents the phone-dialer-like widget at the bottom of their screen where they set their status and receive work.</li>
      </ol>

      <h2>Step 2: Service Channels</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Service Channels</p>
        <p>A <strong>Service Channel</strong> connects Omni-Channel to a specific Salesforce object (e.g., Case, Live Chat Transcript, Lead, Custom Object). It tells Omni-Channel: "This type of work exists and should be routed."</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Setup → Service Channels → New.</li>
        <li class="step-list__item">Create a channel for <strong>Case</strong>: Name it "Cases", Related Object = Case.</li>
        <li class="step-list__item">Create a second channel for <strong>Live Chat Transcript</strong> (Messaging): Name it "Chats", Related Object = MessagingSession.</li>
      </ol>

      <h2>Step 3: Routing Configurations</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Routing Configurations</p>
        <p>A <strong>Routing Configuration</strong> determines the size of the work (e.g., a Case consumes 5 units of capacity, a Chat consumes 2 units) and the routing model (Most Available Agent or Least Active Agent). You link a Routing Config to a <strong>Queue</strong>.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Setup → Routing Configurations → New.</li>
        <li class="step-list__item">Name: <code>High_Priority_Cases</code>. Routing Model: <strong>Most Available</strong>. Priority: 1 (highest).</li>
        <li class="step-list__item">Set Units of Capacity: <strong>5</strong> (a single high-priority case takes significant agent effort).</li>
        <li class="step-list__item">Create another Routing Config: <code>Low_Priority_Cases</code>. Priority: 3. Units of Capacity: 2.</li>
        <li class="step-list__item">Create another for Chats: <code>Live_Chat_Routing</code>. Priority: 2. Units: 3.</li>
      </ol>
      <table><thead><tr><th>Routing Configuration</th><th>Priority</th><th>Capacity Units</th><th>Routing Model</th></tr></thead><tbody>
        <tr><td><code>High_Priority_Cases</code></td><td>1</td><td>5</td><td>Most Available</td></tr>
        <tr><td><code>Live_Chat_Routing</code></td><td>2</td><td>3</td><td>Most Available</td></tr>
        <tr><td><code>Low_Priority_Cases</code></td><td>3</td><td>2</td><td>Most Available</td></tr>
      </tbody></table>

      <h2>Step 4: Link Queues to Routing Configs</h2>
      <ol class="step-list">
        <li class="step-list__item">Setup → Queues. Edit the "Tier 1 Support" queue.</li>
        <li class="step-list__item">In the <strong>Routing Configuration</strong> lookup, select <code>High_Priority_Cases</code>.</li>
        <li class="step-list__item">Repeat for your Chat queue → select <code>Live_Chat_Routing</code>.</li>
        <li class="step-list__item">Now, when a Case enters the Tier 1 queue, Omni-Channel will automatically push it to the most available agent.</li>
      </ol>

      <h2>Step 5: Presence Statuses</h2>
      <p>Agents need a way to tell the system they are ready for work. Without Presence Statuses assigned to their profile, agents cannot log in to the Omni-Channel widget.</p>
      <ol class="step-list">
        <li class="step-list__item">Setup → Presence Statuses → New.</li>
        <li class="step-list__item">Name: <code>Available for Cases</code>. Status Options: Online. Selected Channels: Case.</li>
        <li class="step-list__item">Create another: <code>Available for Cases & Chat</code>. Status: Online. Channels: Case AND Messaging.</li>
        <li class="step-list__item">Name: <code>On Break</code>. Status Options: Busy (doesn't receive work).</li>
      </ol>

      <h2>Step 6: Assign Statuses to Profiles</h2>
      <div class="callout callout--warning">
        <p class="callout__title">⚠️ï¸ Common Mistake</p>
        <p>If you skip this step, agents will see an error when they try to go Online in the Omni-Channel widget. You <strong>must</strong> assign Presence Statuses to each agent's Profile or Permission Set.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Go to the Support Agent Profile → <strong>Enabled Service Presence Status Access</strong>.</li>
        <li class="step-list__item">Add all the statuses you created (Available for Cases, Available for Cases & Chat, On Break).</li>
        <li class="step-list__item">Set the agent's <strong>Overall Capacity</strong>: Setup → Presence Configurations → New. Set Capacity: 10. This means an agent can handle 2 high-priority cases (5+5=10) or 5 low-priority cases (2Ã—5=10) simultaneously.</li>
      </ol>

      <div class="callout callout--tip">
        <p class="callout__title">💡 Capacity Math</p>
        <p>Agent Total Capacity = 10. A high-priority Case consumes 5. A Chat consumes 3. So an agent handling 1 Case (5) has 5 remaining capacity — enough for 1 Chat (3), leaving 2 unused. The system won't push another Case until a slot frees up.</p>
      </div>
    `
  },

  // ================================================================
  // USE CASE 22
  // ================================================================
  {
    id: 22,
    title: 'AeroTech — Salesforce CPQ: Product Rules & Pricing',
    difficulty: 'Hard',
    category: 'CPQ',
    company: 'AeroTech Manufacturing',
    subtitle: 'Configure Configure, Price, Quote (CPQ) with Product Bundles, Option Constraints, and Discount Schedules.',
    tags: ['Salesforce CPQ', 'Product Bundles', 'Product Rules', 'Discount Schedules', 'Quote Templates'],
    description: 'AeroTech sells complex drone bundles. Sales reps frequently quote incompatible parts. We configure Salesforce CPQ to bundle products, enforce compatibility rules, and automate volume discounts.',
    learnings: [
      'Build a CPQ Product Bundle with Features and Options',
      'Create Option Constraints to prevent incompatible selections',
      'Implement Product Rules (Validation and Selection)',
      'Configure Discount Schedules for volume pricing',
      'Understand the CPQ data model (Quote, Quote Line)'
    ],
    content: `
      <h2>Background</h2>
      <p>AeroTech sells commercial drones. A drone requires a chassis, exactly one battery type, and optional cameras. Reps are configuring quotes with two batteries (impossible) or heavy cameras on light drones (incompatible). <strong>Salesforce CPQ</strong> solves this.</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → Create Parent Product (Bundle) · Step 2 → Features & Product Options · Step 3 → Option Constraints · Step 4 → Product Rules · Step 5 → Discount Schedules · Step 6 → Quote Template</p>
      </div>

      <h2>Step 1: Product Bundles</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — CPQ Bundles</p>
        <p>A Bundle is a parent product (Drone) containing <strong>Features</strong> (categories like Power, Optics). Inside Features are <strong>Product Options</strong> (the actual child products like 4K Camera). You can enforce min/max quantities per Feature.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Products tab → New Product: "Drone X1". Check <strong>Active</strong>.</li>
        <li class="step-list__item">On the Drone X1 record, go to Related → Features → New.</li>
        <li class="step-list__item">Feature 1: "Power". Min Options Selected: 1, Max: 1 (forces exactly one battery choice).</li>
        <li class="step-list__item">Feature 2: "Optics". Min: 0, Max: 3 (optional cameras).</li>
        <li class="step-list__item">Feature 3: "Accessories". Min: 0, Max: 5.</li>
      </ol>

      <h2>Step 2: Product Options</h2>
      <p>Product Options link child products (which must already exist as standalone Products) to the parent Bundle through a Feature.</p>
      <ol class="step-list">
        <li class="step-list__item">Create standalone Products: "Standard Battery" ($200), "Heavy Duty Battery" ($450), "4K Camera" ($800), "Pro Cinema Camera" ($2,200), "Reinforced Landing Gear" ($350).</li>
        <li class="step-list__item">On the Drone X1 record → Related → Product Options → New.</li>
        <li class="step-list__item">Link "Standard Battery" to the "Power" Feature. Quantity: 1.</li>
        <li class="step-list__item">Link "Heavy Duty Battery" to the "Power" Feature. Quantity: 1.</li>
        <li class="step-list__item">Link "4K Camera" and "Pro Cinema Camera" to the "Optics" Feature.</li>
      </ol>
      <table><thead><tr><th>Product Option</th><th>Feature</th><th>Default Qty</th><th>Required</th></tr></thead><tbody>
        <tr><td>Standard Battery</td><td>Power</td><td>1</td><td>No (but min 1 enforced by Feature)</td></tr>
        <tr><td>Heavy Duty Battery</td><td>Power</td><td>1</td><td>No</td></tr>
        <tr><td>4K Camera</td><td>Optics</td><td>1</td><td>No</td></tr>
        <tr><td>Pro Cinema Camera</td><td>Optics</td><td>1</td><td>No</td></tr>
        <tr><td>Reinforced Landing Gear</td><td>Accessories</td><td>1</td><td>No</td></tr>
      </tbody></table>

      <h2>Step 3: Option Constraints</h2>
      <p><strong>Scenario:</strong> The "Heavy Duty Battery" option requires the "Reinforced Landing Gear" option because of the added weight.</p>
      <ol class="step-list">
        <li class="step-list__item">On Drone X1 → Related → Option Constraints → New.</li>
        <li class="step-list__item">Type: <strong>Dependency</strong>. Constrained Option = Heavy Duty Battery, Constraining Option = Reinforced Landing Gear.</li>
        <li class="step-list__item">The Heavy Duty Battery cannot be selected until the Reinforced Landing Gear is also selected.</li>
      </ol>

      <h2>Step 4: Product Rules (Validation)</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Product Rules</p>
        <p>A <strong>Product Rule</strong> evaluates the quote configuration and either validates it (fires an error), auto-selects options, or hides options. It consists of <strong>Error Conditions</strong> (when does it fire?), an <strong>Error Message</strong>, and a scope (Quote or Product).</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Setup → Installed Packages → CPQ → Product Rules → New.</li>
        <li class="step-list__item">Type: <strong>Validation</strong>. Scope: Product. Product: Drone X1.</li>
        <li class="step-list__item">Add Error Condition 1: Tested Variable = "Light Chassis" Product Option, Operator = "is selected".</li>
        <li class="step-list__item">Add Error Condition 2 (AND): Tested Variable = "Pro Cinema Camera" Product Option, Operator = "is selected".</li>
        <li class="step-list__item">Error Message: "The Pro Cinema Camera is too heavy for the Light Chassis. Please select the Standard Chassis or remove the camera."</li>
        <li class="step-list__item">Condition Logic: 1 AND 2. Active = true.</li>
      </ol>

      <h2>Step 5: Discount Schedules (Volume Pricing)</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Discount Schedules</p>
        <p>A <strong>Discount Schedule</strong> applies tiered, volume-based discounts automatically. E.g., buy 1-9 = 0% off, 10-49 = 10% off, 50+ = 20% off. It applies to Quote Lines automatically as quantities change.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">CPQ → Discount Schedules → New. Name: "Drone Volume Discount". Type: Range.</li>
        <li class="step-list__item">Add Tiers:</li>
      </ol>
      <table><thead><tr><th>Lower Bound</th><th>Upper Bound</th><th>Discount (%)</th></tr></thead><tbody>
        <tr><td>1</td><td>9</td><td>0%</td></tr>
        <tr><td>10</td><td>49</td><td>10%</td></tr>
        <tr><td>50</td><td>99</td><td>15%</td></tr>
        <tr><td>100</td><td>—</td><td>20%</td></tr>
      </tbody></table>
      <ol class="step-list" start="3">
        <li class="step-list__item">Go to the Drone X1 Product record. In the <strong>Discount Schedule</strong> lookup, select "Drone Volume Discount".</li>
        <li class="step-list__item">Now, when a rep enters Quantity = 15, CPQ automatically applies a 10% discount on the Quote Line.</li>
      </ol>

      <h2>Step 6: Quote Template</h2>
      <ol class="step-list">
        <li class="step-list__item">CPQ → Quote Templates → New. Design a professional PDF output showing: Company Logo, Quote Lines (with Bundle breakdown), Totals, and Terms & Conditions.</li>
        <li class="step-list__item">Assign the template as the default on the Quote record. Reps click <strong>Generate Document</strong> to produce a branded PDF.</li>
      </ol>

      <div class="callout callout--tip">
        <p class="callout__title">💡 CPQ Data Model</p>
        <p>Opportunity → Quote (<code>SBQQ__Quote__c</code>) → Quote Line (<code>SBQQ__QuoteLine__c</code>). A Quote Line references a Product. When a Quote is marked "Primary", its lines sync back to the Opportunity's Products (OpportunityLineItem), keeping revenue reporting accurate.</p>
      </div>
    `
  },

  // ================================================================
  // USE CASE 23
  // ================================================================
  {
    id: 23,
    title: 'MergeCorp — Data Migration: Data Loader & External IDs',
    difficulty: 'Medium',
    category: 'Admin / Data Management',
    company: 'MergeCorp',
    subtitle: 'Migrate 50,000+ Accounts and Contacts from a legacy CRM using Data Loader, maintaining parent-child relationships via External IDs.',
    tags: ['Data Loader', 'Data Migration', 'External ID', 'Upsert', 'VLOOKUP'],
    description: 'MergeCorp acquired a competitor and needs to migrate their legacy CRM data into Salesforce. We use Data Loader and External IDs to import Accounts and related Contacts without relying on Salesforce internal 18-character IDs.',
    learnings: [
      'Install and configure Salesforce Data Loader',
      'Design an External ID strategy for data migration',
      'Understand the difference between Insert and Upsert',
      'Map parent-child relationships using External IDs in CSV files',
      'Handle errors and rollback strategies'
    ],
    content: `
      <h2>Background</h2>
      <p>MergeCorp acquired a smaller company called "DataNow" that uses a simple CRM. DataNow has 50,000 Accounts and 120,000 Contacts in CSV exports. We must import them into Salesforce while maintaining the Account-Contact parent-child relationship.</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → Create External ID fields · Step 2 → Prepare the Account CSV · Step 3 → Load Accounts via Data Loader · Step 4 → Prepare the Contact CSV · Step 5 → Load Contacts (mapping parent via External ID) · Step 6 → Verify & Cleanup</p>
      </div>

      <h2>Step 1: Create External ID Fields</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — External ID</p>
        <p>An <strong>External ID</strong> is a custom field marked as "External ID" in its field settings. It tells Salesforce: "This value uniquely identifies a record from an external system." During data loads, it allows you to <strong>upsert</strong> (insert-or-update) and reference parent records without knowing Salesforce's internal 18-character ID.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Object Manager → Account → Fields → New.</li>
        <li class="step-list__item">Type: Text. Label: <code>Legacy_CRM_ID</code>. Length: 50.</li>
        <li class="step-list__item">Check <strong>External ID</strong> and <strong>Unique</strong>. This prevents duplicate imports.</li>
        <li class="step-list__item">Repeat for Contact: Create <code>Legacy_Contact_ID__c</code> (Text, External ID, Unique).</li>
      </ol>
      <table><thead><tr><th>Object</th><th>Field Label</th><th>API Name</th><th>Type</th><th>External ID?</th><th>Unique?</th></tr></thead><tbody>
        <tr><td>Account</td><td>Legacy CRM ID</td><td><code>Legacy_CRM_ID__c</code></td><td>Text(50)</td><td>âœ…</td><td>âœ…</td></tr>
        <tr><td>Contact</td><td>Legacy Contact ID</td><td><code>Legacy_Contact_ID__c</code></td><td>Text(50)</td><td>âœ…</td><td>âœ…</td></tr>
      </tbody></table>

      <h2>Step 2: Prepare the Account CSV</h2>
      <p>The CSV from DataNow's export must have a column for the legacy ID that maps to our new External ID field.</p>
      <pre><code>Legacy_CRM_ID__c,Name,Industry,BillingCity,BillingState
DN-ACC-001,Acme Corp,Technology,San Francisco,CA
DN-ACC-002,GlobalTech,Manufacturing,Austin,TX
DN-ACC-003,MedPharma,Healthcare,Boston,MA</code></pre>

      <h2>Step 3: Load Accounts via Data Loader</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Insert vs Upsert</p>
        <p><strong>Insert</strong> always creates new records. <strong>Upsert</strong> checks if a record with the same External ID already exists — if it does, it updates; if not, it inserts. Always use Upsert for migrations to make them re-runnable (idempotent).</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Open Data Loader. Click <strong>Upsert</strong>.</li>
        <li class="step-list__item">Select object: <strong>Account</strong>.</li>
        <li class="step-list__item">Browse to your Account CSV file. Click Next.</li>
        <li class="step-list__item">External ID field: select <code>Legacy_CRM_ID__c</code>. This tells Data Loader: "Match on this field."</li>
        <li class="step-list__item">Map CSV columns to Salesforce fields. Click Finish.</li>
        <li class="step-list__item">Review the success and error files. Fix any errors and re-run.</li>
      </ol>

      <h2>Step 4: Prepare the Contact CSV</h2>
      <p>This is the crucial step. Contacts need to be linked to their parent Account. Instead of using Salesforce Account IDs (which you don't have yet), you reference the Account's <strong>External ID</strong>.</p>
      <pre><code>Legacy_Contact_ID__c,FirstName,LastName,Email,Account.Legacy_CRM_ID__c
DN-CON-001,John,Smith,john@acme.com,DN-ACC-001
DN-CON-002,Sarah,Jones,sarah@globaltech.com,DN-ACC-002
DN-CON-003,Mike,Chen,mike@medpharma.com,DN-ACC-003</code></pre>
      <div class="callout callout--warning">
        <p class="callout__title">⚠️ï¸ The Column Header Format</p>
        <p>Notice the column <code>Account.Legacy_CRM_ID__c</code>. The dot notation tells Data Loader: "Look up the Account whose <code>Legacy_CRM_ID__c</code> matches this value, and set it as the parent." This is how you establish relationships without Salesforce IDs.</p>
      </div>

      <h2>Step 5: Load Contacts</h2>
      <ol class="step-list">
        <li class="step-list__item">Data Loader → Upsert → Contact.</li>
        <li class="step-list__item">External ID: <code>Legacy_Contact_ID__c</code>.</li>
        <li class="step-list__item">Map the <code>Account.Legacy_CRM_ID__c</code> column to the AccountId field.</li>
        <li class="step-list__item">Data Loader will automatically resolve each Contact's parent Account by matching the External ID.</li>
      </ol>

      <h2>Step 6: Verify & Cleanup</h2>
      <ol class="step-list">
        <li class="step-list__item">Create a Report: Accounts without Contacts (LEFT OUTER JOIN) to find orphaned records.</li>
        <li class="step-list__item">Spot-check 10 random records: verify the Account-Contact hierarchy matches the source system.</li>
        <li class="step-list__item">Check Data Loader error files for common issues: required field missing, duplicate External IDs, or invalid picklist values.</li>
      </ol>

      <div class="callout callout--tip">
        <p class="callout__title">💡 Load Order Rule</p>
        <p>Always load <strong>parent objects first, child objects second</strong>. Accounts before Contacts. Accounts before Opportunities. If you load Contacts first, Data Loader cannot resolve <code>Account.Legacy_CRM_ID__c</code> because the Accounts don't exist yet.</p>
      </div>
    `
  },

  // ================================================================
  // USE CASE 24
  // ================================================================
  {
    id: 24,
    title: 'EventFlow — Event-Driven Architecture: Platform Events',
    difficulty: 'Expert',
    category: 'Architecture / Integration',
    company: 'EventFlow IoT',
    subtitle: 'Build a decoupled integration using Platform Events to process millions of IoT device pings asynchronously.',
    tags: ['Platform Events', 'Event-Driven Architecture', 'Apex Triggers', 'Integration', 'High Volume'],
    description: 'EventFlow manufactures smart printers that send diagnostic pings every hour. Direct API inserts of these pings cause database lock contention. We refactor the architecture to publish Platform Events, which are consumed by an Apex Trigger asynchronously.',
    learnings: [
      'Define Custom Platform Events (__e)',
      'Publish events via API or Apex (EventBus.publish)',
      'Consume events using an Apex after-insert trigger',
      'Understand decoupled, publish-subscribe architecture',
      'Compare Platform Events to standard object inserts'
    ],
    content: `
      <h2>Background</h2>
      <p>EventFlow's IoT printers call a Salesforce REST API to insert a <code>Diagnostic_Log__c</code> record. With thousands of printers pinging simultaneously, Salesforce throws "UNABLE_TO_LOCK_ROW" errors. Direct DML is synchronous and heavy. <strong>Platform Events</strong> act as a fast, decoupled queue.</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → Define Platform Event · Step 2 → External System publishes · Step 3 → Apex Trigger consumes · Step 4 → Error handling · Step 5 → Monitor in Event Bus</p>
      </div>

      <h2>Step 1: Define the Platform Event</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Platform Events</p>
        <p>A <strong>Platform Event</strong> is similar to a custom object, but it ends in <code>__e</code>. It is part of Salesforce's enterprise message bus. Events are published (not inserted), they persist for 72 hours, have no page layouts, and cannot be updated. They are designed for massive scale.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Setup → Platform Events → New. Label: <code>Printer Ping</code>. API Name: <code>Printer_Ping__e</code>.</li>
        <li class="step-list__item">Publish Behavior: <strong>Publish After Commit</strong> (default, safer — only publishes if the transaction succeeds) or <strong>Publish Immediately</strong> (publishes even if the transaction rolls back).</li>
        <li class="step-list__item">Add custom fields:</li>
      </ol>
      <table><thead><tr><th>Field Label</th><th>API Name</th><th>Type</th><th>Details</th></tr></thead><tbody>
        <tr><td>Serial Number</td><td><code>Serial_Number__c</code></td><td>Text(50)</td><td>Unique printer identifier</td></tr>
        <tr><td>Error Code</td><td><code>Error_Code__c</code></td><td>Text(10)</td><td>"OK" or error code like "E-02"</td></tr>
        <tr><td>Ink Level</td><td><code>Ink_Level__c</code></td><td>Number(3,0)</td><td>Percentage remaining (0-100)</td></tr>
        <tr><td>Firmware Version</td><td><code>Firmware_Version__c</code></td><td>Text(20)</td><td>Current firmware</td></tr>
      </tbody></table>

      <h2>Step 2: External System Publishes the Event</h2>
      <p>Instead of hitting the standard SObject endpoint, the IoT devices POST to the Platform Event endpoint:</p>
      <pre><code>POST /services/data/v58.0/sobjects/Printer_Ping__e
{
    "Serial_Number__c": "PRN-9941",
    "Error_Code__c": "E-02",
    "Ink_Level__c": 34,
    "Firmware_Version__c": "3.2.1"
}</code></pre>
      <p>This returns a 201 Created instantly, without locking any database rows. The event is placed on the Event Bus.</p>

      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Publish vs Insert</p>
        <p>When you <code>INSERT</code> a standard record, Salesforce grabs a database lock, writes to disk, fires triggers synchronously, and returns. When you <code>PUBLISH</code> an event, Salesforce writes to the Event Bus (a separate, high-throughput message queue), returns instantly, and consumers process the event asynchronously. No row locks. No contention.</p>
      </div>

      <h2>Step 3: Consume the Event in Apex</h2>
      <p>Salesforce runs a trigger to process these events in the background, in batches. The trigger runs in its own execution context with its own governor limits.</p>
      <pre><code>trigger PrinterPingTrigger on Printer_Ping__e (after insert) {
    // Platform Event triggers ONLY support "after insert"
    List&lt;Diagnostic_Log__c&gt; logsToCreate = new List&lt;Diagnostic_Log__c&gt;();
    
    for (Printer_Ping__e event : Trigger.new) {
        if (event.Error_Code__c != 'OK') {
            logsToCreate.add(new Diagnostic_Log__c(
                Printer_Serial__c = event.Serial_Number__c,
                Error__c = event.Error_Code__c,
                Ink_Level__c = event.Ink_Level__c,
                Timestamp__c = System.now()
            ));
        }
    }
    
    if (!logsToCreate.isEmpty()) {
        insert logsToCreate; // Processes safely in the background
    }
}</code></pre>

      <h2>Step 4: Error Handling with EventBus.RetryableException</h2>
      <div class="callout callout--warning">
        <p class="callout__title">⚠️ï¸ Retries in Platform Event Triggers</p>
        <p>If your trigger fails (e.g., a temporary database lock), Platform Events are lost by default. To prevent this, throw <code>EventBus.RetryableException</code> — Salesforce will retry the batch up to 9 times.</p>
      </div>
      <pre><code>trigger PrinterPingTrigger on Printer_Ping__e (after insert) {
    try {
        // ... processing logic ...
        insert logsToCreate;
    } catch (Exception e) {
        // Tell the platform to retry this batch of events
        throw new EventBus.RetryableException(e.getMessage());
    }
}</code></pre>

      <h2>Step 5: Monitoring</h2>
      <ol class="step-list">
        <li class="step-list__item">Setup → Platform Events → <code>Printer_Ping__e</code> → <strong>Subscriptions</strong> to see active consumers.</li>
        <li class="step-list__item">Use the <strong>Event Bus</strong> page in Setup to monitor event delivery, failures, and replay IDs.</li>
        <li class="step-list__item">You can also subscribe to Platform Events from Flow (Platform Event-Triggered Flow) or from an external system using CometD/Pub-Sub API.</li>
      </ol>

      <div class="callout callout--tip">
        <p class="callout__title">💡 Platform Events vs Change Data Capture</p>
        <p><strong>Platform Events</strong>: You define the event schema. You decide when to publish. Used for custom integrations.<br>
        <strong>Change Data Capture (CDC)</strong>: Salesforce auto-publishes events whenever a standard/custom object record changes. Used to sync Salesforce data changes to external systems automatically.</p>
      </div>
    `
  },

  // ================================================================
  // USE CASE 25
  // ================================================================
  {
    id: 25,
    title: 'AgileConfig — Custom Metadata Types: Hardcoding Prevention',
    difficulty: 'Medium',
    category: 'Architecture / Best Practices',
    company: 'AgileConfig Solutions',
    subtitle: 'Replace hardcoded IDs, API keys, and business rules in Apex/Flow using Custom Metadata Types.',
    tags: ['Custom Metadata Types', 'Deployment', 'Apex', 'Hardcoding', 'SOQL'],
    description: 'AgileConfig has Apex code full of hardcoded Queue IDs and API endpoints. When deployed from Sandbox to Production, the code breaks because IDs change. We refactor the org to use Custom Metadata Types for environment-agnostic configuration.',
    learnings: [
      'Create Custom Metadata Types (__mdt)',
      'Understand the difference between Custom Settings and Custom Metadata',
      'Query Custom Metadata in Apex without consuming SOQL limits',
      'Reference Custom Metadata in Flow and Validation Rules',
      'Deploy configuration records via Changesets/CI-CD'
    ],
    content: `
      <h2>Background</h2>
      <p>Never hardcode an ID (e.g., <code>00Gxx00000123abc</code>) in Apex or Flow. Sandbox IDs rarely match Production IDs. Previously, developers used Custom Settings or List variables. Today, <strong>Custom Metadata Types (CMDT)</strong> are the gold standard because the records themselves are deployable metadata, not just data.</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → Create the Custom Metadata Type · Step 2 → Add Fields · Step 3 → Create Records · Step 4 → Use in Apex · Step 5 → Use in Flow & Validation Rules</p>
      </div>

      <h2>Step 1: Create the Custom Metadata Type</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Custom Metadata Types</p>
        <p>CMDTs look like custom objects but end in <code>__mdt</code>. The fields are defined in Setup, and the records you create are packaged as metadata. Querying them in Apex does <strong>not count against the 100 SOQL query limit</strong>. This is a massive advantage over Custom Settings.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Setup → Custom Metadata Types → New Metadata Type.</li>
        <li class="step-list__item">Label: <code>Integration Setting</code>. API Name auto-fills as <code>Integration_Setting__mdt</code>.</li>
        <li class="step-list__item">Visibility: <strong>Public</strong> (so it can be packaged).</li>
      </ol>

      <h2>Step 2: Add Custom Fields</h2>
      <ol class="step-list">
        <li class="step-list__item">Click on Integration_Setting__mdt → Custom Fields → New.</li>
        <li class="step-list__item">Create the following fields:</li>
      </ol>
      <table><thead><tr><th>Field Label</th><th>API Name</th><th>Type</th><th>Purpose</th></tr></thead><tbody>
        <tr><td>Endpoint URL</td><td><code>Endpoint_URL__c</code></td><td>URL</td><td>The API base URL</td></tr>
        <tr><td>API Key</td><td><code>API_Key__c</code></td><td>Text(255)</td><td>Authentication key</td></tr>
        <tr><td>Timeout (ms)</td><td><code>Timeout_ms__c</code></td><td>Number</td><td>Callout timeout value</td></tr>
        <tr><td>Is Active</td><td><code>Is_Active__c</code></td><td>Checkbox</td><td>Enable/disable integrations</td></tr>
      </tbody></table>

      <h2>Step 3: Create Records (Manage Integration Settings)</h2>
      <ol class="step-list">
        <li class="step-list__item">Click <strong>Manage Records</strong> → New.</li>
        <li class="step-list__item">Record 1: Label = "Payment Gateway". DeveloperName = <code>PaymentGateway</code>. Endpoint = <code>https://api.paygateway.com/v2</code>. API Key = <code>pk_live_xxx</code>.</li>
        <li class="step-list__item">Record 2: Label = "Shipping API". DeveloperName = <code>ShippingAPI</code>. Endpoint = <code>https://api.shipper.com/v1</code>.</li>
      </ol>
      <div class="callout callout--tip">
        <p class="callout__title">💡 Deployability</p>
        <p>These records travel with your Change Sets and CI/CD pipelines. When you deploy from Sandbox to Production, the CMDT records deploy with them. Custom Settings records do NOT — you have to manually re-enter data in each environment.</p>
      </div>

      <h2>Step 4: Using CMDT in Apex</h2>
      <p>Instead of hardcoding the endpoint:</p>
      <pre><code>// âŒ DO NOT DO THIS
// HttpRequest req = new HttpRequest();
// req.setEndpoint('https://api.gateway.com/v1');

// âœ… DO THIS
Integration_Setting__mdt settings = 
    Integration_Setting__mdt.getInstance('PaymentGateway');

HttpRequest req = new HttpRequest();
req.setEndpoint(settings.Endpoint_URL__c);
req.setHeader('Authorization', 'Bearer ' + settings.API_Key__c);
req.setTimeout(Integer.valueOf(settings.Timeout_ms__c));</code></pre>
      <div class="callout callout--definition">
        <p class="callout__title">💡 getInstance() vs SOQL</p>
        <p>Using <code>getInstance('DeveloperName')</code> fetches the record directly from the metadata cache without any SOQL syntax and <strong>does not consume SOQL limits</strong>. It is the fastest, safest way to access CMDT records in Apex. You can also use <code>getAll()</code> to fetch all records into a Map.</p>
      </div>

      <h2>Step 5: Using CMDT in Flow & Validation Rules</h2>
      <ol class="step-list">
        <li class="step-list__item"><strong>In Flow:</strong> Use a Get Records element on <code>Integration_Setting__mdt</code>. Filter by <code>DeveloperName = 'PaymentGateway'</code>. Store the result in a variable. Access <code>{!var_Setting.Endpoint_URL__c}</code>.</li>
        <li class="step-list__item"><strong>In Validation Rules:</strong> You can reference CMDT using the <code>$CustomMetadata</code> global variable: <code>$CustomMetadata.Integration_Setting__mdt.PaymentGateway.Is_Active__c = TRUE</code>.</li>
      </ol>

      <h3>Custom Settings vs Custom Metadata — Comparison</h3>
      <table><thead><tr><th>Feature</th><th>Custom Settings</th><th>Custom Metadata Types</th></tr></thead><tbody>
        <tr><td>API Suffix</td><td>No suffix (sObject-like)</td><td><code>__mdt</code></td></tr>
        <tr><td>Records areâ€¦</td><td>Data (not deployable)</td><td><strong>Metadata (deployable)</strong></td></tr>
        <tr><td>SOQL Limits</td><td>Does NOT consume limits</td><td>Does NOT consume limits</td></tr>
        <tr><td>Accessible inâ€¦</td><td>Apex, Formulas</td><td>Apex, Formulas, <strong>Flows, Validation Rules</strong></td></tr>
        <tr><td>Best For</td><td>User/profile-specific settings</td><td><strong>Environment-agnostic config</strong></td></tr>
      </tbody></table>
    `
  },

  // ================================================================
  // USE CASE 26
  // ================================================================
  {
    id: 26,
    title: 'OmniService — Email-to-Case & Web-to-Case Automation',
    difficulty: 'Easy',
    category: 'Service Cloud',
    company: 'OmniService Support',
    subtitle: 'Automate support ticket creation from customer emails and website forms.',
    tags: ['Email-to-Case', 'Web-to-Case', 'Auto-Response Rules', 'Service Cloud'],
    description: 'OmniService agents are manually copying customer emails into Salesforce Cases. We configure Email-to-Case to automatically generate tickets, capture email threads, and fire auto-response emails.',
    learnings: [
      'Configure On-Demand Email-to-Case',
      'Set up Web-to-Case HTML generation',
      'Implement Auto-Response Rules for immediate customer feedback',
      'Understand Thread IDs for keeping emails on the same Case'
    ],
    content: `
      <h2>Background</h2>
      <p>When customers email <code>support@omniservice.com</code>, it currently goes to a shared Outlook inbox. Agents manually type the details into Salesforce. We will automate this end-to-end.</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → Enable Email-to-Case · Step 2 → Configure Routing Address · Step 3 → Auto-Response Rules · Step 4 → Web-to-Case · Step 5 → Thread ID Behavior</p>
      </div>

      <h2>Step 1: Email-to-Case Configuration</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — On-Demand Email-to-Case</p>
        <p>Salesforce generates a long, unique email address (e.g., <code>abc123@xyz.salesforce.com</code>). You go to your company's email server (e.g., Office365, Gmail) and set up a forwarding rule: anything sent to <code>support@omniservice.com</code> forwards to the long Salesforce address. Salesforce reads the email and creates a Case.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Setup → Email-to-Case → <strong>Enable Email-to-Case</strong>.</li>
        <li class="step-list__item">Check <strong>On-Demand Service</strong> (recommended over the older Email-to-Case Agent).</li>
        <li class="step-list__item">Check "Enable HTML Email" and "Save Email Headers".</li>
      </ol>

      <h2>Step 2: Routing Addresses</h2>
      <ol class="step-list">
        <li class="step-list__item">Under Email-to-Case, click <strong>New Routing Address</strong>.</li>
        <li class="step-list__item">Routing Name: "General Support". Email Address: <code>support@omniservice.com</code>.</li>
        <li class="step-list__item">Case Settings:</li>
      </ol>
      <table><thead><tr><th>Setting</th><th>Value</th><th>Why</th></tr></thead><tbody>
        <tr><td>Case Owner</td><td>Support Queue</td><td>Cases go to the queue, not a person</td></tr>
        <tr><td>Case Priority</td><td>Medium</td><td>Default; can be changed by assignment rules</td></tr>
        <tr><td>Case Origin</td><td>Email</td><td>Tracks the channel the case came from</td></tr>
        <tr><td>Case Record Type</td><td>Customer Support</td><td>Ensures correct Page Layout</td></tr>
      </tbody></table>
      <ol class="step-list" start="4">
        <li class="step-list__item">Click Save. Salesforce sends a verification email to the address.</li>
        <li class="step-list__item">Copy the generated Salesforce forwarding address (the long email). Go to your IT team and set up email forwarding from <code>support@omniservice.com</code> to this address.</li>
      </ol>

      <h2>Step 3: Auto-Response Rules</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Auto-Response Rules vs Workflows/Flows</p>
        <p><strong>Auto-Response Rules</strong> are specifically designed to send an immediate "We received your request" email to a Lead or Case contact. They are better than Flows for this because they only fire on the initial creation (Web/Email), respect email formatting specifically for replies, and include the Thread ID automatically.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Setup → Case Auto-Response Rules → New. Name: "Support Auto Response". Set as Active.</li>
        <li class="step-list__item">Click New Rule Entry. Sort Order: 1.</li>
        <li class="step-list__item">Rule Criteria: <code>Case: Origin equals Email</code>.</li>
        <li class="step-list__item">Select an Email Template (e.g., "Support Ticket Created — Your reference number is {!Case.CaseNumber}"). Send from: <code>support@omniservice.com</code>.</li>
        <li class="step-list__item">Add a second entry for Web: <code>Case: Origin equals Web</code> with a different template.</li>
      </ol>

      <h2>Step 4: Web-to-Case</h2>
      <ol class="step-list">
        <li class="step-list__item">Setup → Web-to-Case → <strong>Enable Web-to-Case</strong>.</li>
        <li class="step-list__item">Click <strong>Generate Web-to-Case HTML</strong>.</li>
        <li class="step-list__item">Select fields: Name, Email, Subject, Description, Priority.</li>
        <li class="step-list__item">Set Return URL (the page shown after submission): <code>https://omniservice.com/thank-you</code>.</li>
        <li class="step-list__item">Click Generate. Salesforce outputs an HTML form. Give this to your web developer to embed on the support page.</li>
      </ol>

      <h2>Step 5: Thread ID Behavior</h2>
      <div class="callout callout--tip">
        <p class="callout__title">💡 How Thread IDs Work</p>
        <p>When Salesforce sends an auto-reply, it embeds a hidden <strong>Thread ID</strong> (like <code>ref:_00Dxx._500xx:ref</code>) in the email subject and body. When the customer replies to that email, Salesforce reads the Thread ID and adds the reply as an Email Message on the <strong>same Case</strong>, instead of creating a new Case. If a customer forwards the email or strips the Thread ID, a new Case is created.</p>
      </div>
    `
  },

  // ================================================================
  // USE CASE 27
  // ================================================================
  {
    id: 27,
    title: 'EnterpriseSales — Enterprise Territory Management',
    difficulty: 'Expert',
    category: 'Sales Cloud / Architecture',
    company: 'EnterpriseSales Corp',
    subtitle: 'Design complex account assignment rules using Enterprise Territory Management instead of traditional Role Hierarchy.',
    tags: ['Territory Management', 'Sales Cloud', 'Account Assignment', 'Overlays'],
    description: 'EnterpriseSales Corp has matrixed sales teams. Reps sell into specific zip codes, but overlay specialists sell specific products across multiple territories. Standard Role Hierarchy cannot handle this matrix. We implement Enterprise Territory Management.',
    learnings: [
      'Enable and configure Enterprise Territory Management',
      'Create Territory Models and Territory Hierarchies',
      'Define Account Assignment Rules based on Geography/Industry',
      'Assign Users to Territories with different roles',
      'Compare Role Hierarchy vs Territory Management'
    ],
    content: `
      <h2>Background</h2>
      <p>Role Hierarchy assigns one owner to an Account. But EnterpriseSales Corp has a "Northeast" territory rep, a "Financial Services" industry specialist, and a "Cloud Product" overlay specialist — all needing access to the same Account based on different criteria. <strong>Territory Management</strong> handles many-to-many sharing.</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → Enable Territory Management · Step 2 → Create Territory Type · Step 3 → Build the Hierarchy · Step 4 → Account Assignment Rules · Step 5 → Assign Users · Step 6 → Activate the Model</p>
      </div>

      <h2>Step 1: The Territory Model</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Territory Management</p>
        <p>A Territory is a flexible collection of Accounts and Users. Users in a Territory get access to its Accounts, regardless of who owns them. You can run multiple "Models" (e.g., current year vs next year planning) but only one can be <strong>Active</strong>. Think of it as a parallel access system that works alongside — not instead of — the Role Hierarchy.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Setup → Territories → Settings → <strong>Enable Enterprise Territory Management</strong>.</li>
        <li class="step-list__item">Create a Territory Model: "FY25 Go To Market". State: Planning.</li>
      </ol>

      <h2>Step 2: Territory Types</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Territory Types</p>
        <p>A <strong>Territory Type</strong> is a label/category applied to territories (e.g., "Geographic", "Named Account", "Overlay"). It helps organize and filter territories. Every territory must have a Type.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Create Territory Types: "Geographic", "Industry", "Product Overlay".</li>
        <li class="step-list__item">Priority: Geographic = 1, Industry = 2, Overlay = 3 (determines assignment order).</li>
      </ol>

      <h2>Step 3: Build the Hierarchy</h2>
      <ol class="step-list">
        <li class="step-list__item">Under the FY25 model, create top-level territories: "North America", "EMEA", "APAC".</li>
        <li class="step-list__item">Under North America, create child territories: "Northeast", "Southeast", "West".</li>
        <li class="step-list__item">Under Northeast, create: "New York Metro" (Type: Geographic), "Financial Services — NE" (Type: Industry).</li>
      </ol>
      <table><thead><tr><th>Territory</th><th>Parent</th><th>Type</th></tr></thead><tbody>
        <tr><td>North America</td><td>(Top Level)</td><td>Geographic</td></tr>
        <tr><td>Northeast</td><td>North America</td><td>Geographic</td></tr>
        <tr><td>New York Metro</td><td>Northeast</td><td>Geographic</td></tr>
        <tr><td>Financial Services — NE</td><td>Northeast</td><td>Industry</td></tr>
        <tr><td>Cloud Product Overlay</td><td>North America</td><td>Product Overlay</td></tr>
      </tbody></table>

      <h2>Step 4: Account Assignment Rules</h2>
      <p>Instead of manually sharing accounts, rules evaluate Account fields and drop them into the right territory.</p>
      <ol class="step-list">
        <li class="step-list__item">On the "New York Metro" territory, click <strong>Assignment Rules</strong> → New.</li>
        <li class="step-list__item">Criteria: <code>Account.BillingState = 'NY'</code> AND <code>Account.AnnualRevenue &lt; 50000000</code> (Commercial segment).</li>
        <li class="step-list__item">On "Financial Services — NE", add rule: <code>Account.Industry = 'Financial Services'</code> AND <code>Account.BillingState IN ('NY','NJ','CT','MA')</code>.</li>
        <li class="step-list__item">Click <strong>Run Assignment Rules</strong>. All matching accounts instantly become accessible to any User assigned to that territory.</li>
      </ol>

      <h2>Step 5: Assign Users to Territories</h2>
      <ol class="step-list">
        <li class="step-list__item">Click on the "New York Metro" territory → <strong>Assigned Users</strong> → Add.</li>
        <li class="step-list__item">Add the field rep (John Smith). Role in Territory: "Territory Rep".</li>
        <li class="step-list__item">On "Cloud Product Overlay" territory, add the product specialist (Sarah Tech). She now sees all Accounts in any child territory of North America.</li>
      </ol>

      <h2>Step 6: Activate the Model</h2>
      <ol class="step-list">
        <li class="step-list__item">Once you are satisfied with the territory structure, change the Model State from "Planning" to <strong>Active</strong>.</li>
        <li class="step-list__item">Only one model can be Active at a time. When you need to reorganize for the next fiscal year, create a new Model in "Planning" state, build it, and then swap it to Active.</li>
      </ol>

      <div class="callout callout--tip">
        <p class="callout__title">💡 Role Hierarchy vs Territory Management</p>
        <p><strong>Role Hierarchy:</strong> 1 owner per record, data access flows upward. Best for simple org structures.<br>
        <strong>Territory Management:</strong> Many-to-many. An Account can be in multiple territories; a User can be in multiple territories. Best for matrixed sales teams, overlays, and complex go-to-market models.</p>
      </div>
    `
  },

  // ================================================================
  // USE CASE 28
  // ================================================================
  {
    id: 28,
    title: 'Agentforce — Einstein Chatbot Setup for Order Tracking',
    difficulty: 'Hard',
    category: 'Agentforce / AI',
    company: 'NextGen Retail',
    subtitle: 'Deploy an Agentforce (Einstein) Bot to deflect Tier 1 support cases by looking up order statuses via Flow.',
    tags: ['Agentforce', 'Einstein Bots', 'Chatbots', 'Flow Integration', 'Service Cloud'],
    description: 'NextGen Retail gets overwhelmed with "Where is my order?" chats. We build an Agentforce bot to intercept chats, ask for the Order Number, call a Flow to fetch the status, and return the answer — escalating to a human only if needed.',
    learnings: [
      'Enable Einstein Bots and configure a Bot Builder canvas',
      'Create Dialogs, Variables, and Entities',
      'Connect an Invocable Flow to a Bot Dialog',
      'Configure seamless escalation to Omni-Channel agents'
    ],
    content: `
      <h2>Background</h2>
      <p>Human agents shouldn't waste time looking up tracking numbers. An <strong>Agentforce Bot</strong> sits in front of the live chat widget, handling repetitive tasks programmatically. When the bot can't resolve the issue, it seamlessly transfers the customer to a live agent with full context.</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → Enable Einstein Bots · Step 2 → Create Bot Variables & Entities · Step 3 → Build Dialogs · Step 4 → Connect Flow to Dialog · Step 5 → Configure Escalation · Step 6 → Deploy to Chat Channel</p>
      </div>

      <h2>Step 1: Enable Einstein Bots</h2>
      <ol class="step-list">
        <li class="step-list__item">Setup → Einstein Bots → <strong>Enable Einstein Bots</strong>.</li>
        <li class="step-list__item">Prerequisite: Live Chat / Messaging must already be configured with a Deployment and a Queue.</li>
        <li class="step-list__item">Setup → Einstein Bots → New Bot. Name: "OrderBot". Description: "Handles order status inquiries."</li>
      </ol>

      <h2>Step 2: Bot Variables & Entities</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Bot Architecture</p>
        <p>A <strong>Dialog</strong> is a conversational state (e.g., "Welcome", "Check Order Status", "Escalate"). An <strong>Entity</strong> is a data type (Text, Number, DateTime, Object — like a picklist for the bot). A <strong>Variable</strong> stores the customer's input so the bot can use it later.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">In Bot Builder, go to <strong>Variables</strong>. Create:</li>
      </ol>
      <table><thead><tr><th>Variable Name</th><th>Type</th><th>Purpose</th></tr></thead><tbody>
        <tr><td><code>var_OrderNumber</code></td><td>Text</td><td>Stores the customer's order number</td></tr>
        <tr><td><code>var_OrderStatus</code></td><td>Text</td><td>Output from Flow (e.g., "Shipped")</td></tr>
        <tr><td><code>var_TrackingURL</code></td><td>Text</td><td>Output: tracking link</td></tr>
        <tr><td><code>var_CustomerName</code></td><td>Text</td><td>Greeting personalization</td></tr>
      </tbody></table>

      <h2>Step 3: Build the Dialogs</h2>
      <ol class="step-list">
        <li class="step-list__item"><strong>Welcome Dialog:</strong> Add a <strong>Message</strong> element: "Hi! I'm OrderBot. I can check your order status or connect you to an agent. What would you like to do?"</li>
        <li class="step-list__item">Add a <strong>Menu</strong> element with options: "Check Order Status" → routes to the Order Status Dialog. "Talk to an Agent" → routes to the Escalation Dialog.</li>
        <li class="step-list__item"><strong>Order Status Dialog:</strong> Add a <strong>Question</strong> element: "What is your order number?" Store the response in <code>var_OrderNumber</code>.</li>
        <li class="step-list__item">Add an <strong>Action</strong> element (Flow) — configured in Step 4.</li>
        <li class="step-list__item">Add a <strong>Message</strong> element: "Your order {!var_OrderNumber} is currently: <strong>{!var_OrderStatus}</strong>."</li>
        <li class="step-list__item">Add another <strong>Menu</strong>: "Was this helpful?" → "Yes" (ends conversation) / "No" (routes to Escalation Dialog).</li>
      </ol>

      <h2>Step 4: Connect Flow to the Bot</h2>
      <p>The Bot needs to query the database. It does this by calling an <strong>Autolaunched Flow</strong>.</p>
      <h3>4a: Create the Autolaunched Flow</h3>
      <ol class="step-list">
        <li class="step-list__item">Flow Builder → New → Autolaunched Flow.</li>
        <li class="step-list__item">Create an <strong>Input Variable</strong>: <code>OrderNumber</code> (Text, Available for Input).</li>
        <li class="step-list__item">Add a <strong>Get Records</strong> element: Get the first Order where <code>OrderNumber = {!OrderNumber}</code>.</li>
        <li class="step-list__item">Add an <strong>Assignment</strong>: Set <code>var_OutputStatus</code> = the Order's Status field.</li>
        <li class="step-list__item">Create <strong>Output Variables</strong>: <code>OrderStatus</code> (Text) and <code>TrackingURL</code> (Text). Mark them "Available for Output".</li>
        <li class="step-list__item">Save and Activate the Flow.</li>
      </ol>
      <h3>4b: Map Flow to Bot Action</h3>
      <ol class="step-list">
        <li class="step-list__item">Back in the Bot Builder, in the Order Status Dialog, click the <strong>Action</strong> element.</li>
        <li class="step-list__item">Action Type: <strong>Flow</strong>. Select your "Order Status Lookup" Flow.</li>
        <li class="step-list__item">Map inputs: Bot's <code>var_OrderNumber</code> → Flow's <code>OrderNumber</code>.</li>
        <li class="step-list__item">Map outputs: Flow's <code>OrderStatus</code> → Bot's <code>var_OrderStatus</code>. Flow's <code>TrackingURL</code> → Bot's <code>var_TrackingURL</code>.</li>
      </ol>

      <h2>Step 5: Configure Escalation (Transfer to Agent)</h2>
      <div class="callout callout--warning">
        <p class="callout__title">⚠️ï¸ Seamless Handoff</p>
        <p>When a bot escalates to a human, it should transfer the <strong>entire chat transcript</strong> so the agent sees the full conversation. Configure the Transfer Target as an Omni-Channel Queue (from Use Case 21). The agent receives the work item with full context.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">In the <strong>Escalation Dialog</strong>, add a <strong>Transfer</strong> element.</li>
        <li class="step-list__item">Transfer Target: Select the "Live Support" Queue (linked to an Omni-Channel Routing Configuration).</li>
        <li class="step-list__item">Add a pre-transfer message: "Let me connect you with a support agent. They'll have our full conversation."</li>
      </ol>

      <h2>Step 6: Deploy</h2>
      <ol class="step-list">
        <li class="step-list__item">In Bot Builder, click <strong>Activate</strong>.</li>
        <li class="step-list__item">Go to your Embedded Service Deployment (Chat) → Bot Settings → Select "OrderBot" as the initial bot.</li>
        <li class="step-list__item">The bot now intercepts all incoming chats. Only when escalation triggers does the chat reach a human agent.</li>
      </ol>
    `
  },

  // ================================================================
  // USE CASE 29
  // ================================================================
  {
    id: 29,
    title: 'FlexiUI — Dynamic Forms & Dynamic Actions',
    difficulty: 'Easy',
    category: 'Lightning App Builder',
    company: 'FlexiUI Config',
    subtitle: 'Modernize Page Layouts using Dynamic Forms to show/hide fields based on record data, eliminating the need for multiple Record Types.',
    tags: ['Dynamic Forms', 'Dynamic Actions', 'Lightning App Builder', 'UI Customization'],
    description: 'FlexiUI has 5 different Record Types on Opportunity just to show different fields for different deal types. This creates massive administrative overhead. We collapse this into a single layout using Dynamic Forms and component visibility filters.',
    learnings: [
      'Upgrade standard Page Layouts to Dynamic Forms',
      'Apply UI visibility filters to individual fields and sections',
      'Configure Dynamic Actions to show/hide buttons based on criteria',
      'Reduce Record Type and Page Layout sprawl'
    ],
    content: `
      <h2>Background</h2>
      <p>Historically, if you wanted the "Shipping Address" field to appear ONLY when "Delivery Type" = "Physical", you had to create a new Record Type and a new Page Layout. <strong>Dynamic Forms</strong> moves field layout into the Lightning App Builder, allowing you to show/hide fields dynamically without Record Types.</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → Upgrade to Dynamic Forms · Step 2 → Set Field Visibility Filters · Step 3 → Organize into Dynamic Sections · Step 4 → Configure Dynamic Actions · Step 5 → Decommission unused Record Types</p>
      </div>

      <h2>Step 1: Upgrade to Dynamic Forms</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Dynamic Forms</p>
        <p>Dynamic Forms breaks the monolithic "Details" component on record pages into individual fields and sections. Each field becomes a separate, draggable component in the Lightning App Builder. You gain the ability to set <strong>Component Visibility</strong> rules on individual fields — something Page Layouts can never do.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Go to an Opportunity record → Gear Icon → <strong>Edit Page</strong> (opens App Builder).</li>
        <li class="step-list__item">Click the "Record Detail" component. In the right panel, click <strong>Upgrade Now</strong> to Dynamic Forms.</li>
        <li class="step-list__item">Select which Page Layout to migrate. Click Next.</li>
        <li class="step-list__item">The monolithic block breaks into individual fields and sections that you can drag around.</li>
      </ol>
      <div class="callout callout--warning">
        <p class="callout__title">⚠️ï¸ Supported Objects</p>
        <p>Dynamic Forms is supported on most custom objects and standard objects including Account, Contact, Opportunity, Case, and Lead. It is NOT supported on Task, Event, Person Account, or Knowledge at this time.</p>
      </div>

      <h2>Step 2: Add Visibility Filters to Fields</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Component Visibility</p>
        <p>Every field, section, and component in the Lightning App Builder has a "Set Component Visibility" section. You can use <strong>record data</strong>, <strong>user data</strong> (Profile, Role), <strong>device type</strong> (desktop/mobile), or <strong>permissions</strong> as filter criteria. Multiple filters support AND/OR logic.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Click the "Shipping Address" field in the App Builder canvas.</li>
        <li class="step-list__item">In the right panel, expand <strong>Set Component Visibility</strong>.</li>
        <li class="step-list__item">Add Filter: <code>Field → Delivery_Type__c → Equal → Physical</code>.</li>
        <li class="step-list__item">Now the Shipping Address field instantly appears/disappears in the UI as the user changes the Delivery Type picklist — no page reload needed.</li>
      </ol>

      <h2>Step 3: Organize into Dynamic Sections</h2>
      <ol class="step-list">
        <li class="step-list__item">From the Components panel, drag a <strong>Field Section</strong> onto the canvas.</li>
        <li class="step-list__item">Name it "Physical Delivery Details". Set it to 2 columns.</li>
        <li class="step-list__item">Drag related fields into it: Shipping Address, Delivery Date, Carrier.</li>
        <li class="step-list__item">Set visibility on the <strong>entire section</strong>: <code>Delivery_Type__c = Physical</code>. Now the whole section appears/disappears together.</li>
        <li class="step-list__item">Create another section "Digital Delivery Details" with fields like Download Link, License Key, visible only when <code>Delivery_Type__c = Digital</code>.</li>
      </ol>
      <table><thead><tr><th>Section Name</th><th>Fields</th><th>Visible When</th></tr></thead><tbody>
        <tr><td>Physical Delivery Details</td><td>Shipping Address, Delivery Date, Carrier</td><td><code>Delivery_Type__c = Physical</code></td></tr>
        <tr><td>Digital Delivery Details</td><td>Download Link, License Key</td><td><code>Delivery_Type__c = Digital</code></td></tr>
        <tr><td>Enterprise Details</td><td>Contract Term, SLA Level, Account Executive</td><td><code>Amount &gt; 100000</code></td></tr>
      </tbody></table>

      <h2>Step 4: Dynamic Actions</h2>
      <p>Similarly, we only want the "Submit for Approval" button to show if the Opportunity Amount > $50,000.</p>
      <ol class="step-list">
        <li class="step-list__item">Click the <strong>Highlights Panel</strong> component (top of the page with the record Name and buttons).</li>
        <li class="step-list__item">Check <strong>Enable Dynamic Actions</strong>.</li>
        <li class="step-list__item">Remove the default "Edit", "Delete" etc. from the Page Layout Actions and manage them here instead.</li>
        <li class="step-list__item">Add the "Submit for Approval" action. Click the filter icon and add a visibility filter: <code>Amount &gt; 50000</code>.</li>
        <li class="step-list__item">Add a "Send Quote" button, visible only when <code>StageName = Proposal/Price Quote</code>.</li>
      </ol>

      <h2>Step 5: Decommission Unused Record Types</h2>
      <ol class="step-list">
        <li class="step-list__item">Now that Dynamic Forms handles field visibility, you likely no longer need separate Record Types like "Physical Opp" and "Digital Opp".</li>
        <li class="step-list__item">Review your Record Types. If the ONLY reason they exist is to show different fields, you can consolidate to a single Record Type.</li>
        <li class="step-list__item">Keep Record Types only if they drive different <strong>picklist values</strong>, <strong>business processes</strong> (Sales Path stages), or <strong>Approval Processes</strong>.</li>
      </ol>

      <div class="callout callout--tip">
        <p class="callout__title">💡 When to Use Record Types vs Dynamic Forms</p>
        <p><strong>Dynamic Forms:</strong> Show/hide fields based on data. No Record Type needed.<br>
        <strong>Record Types:</strong> Different picklist value sets, different Sales Path stages, different Page Layouts for fundamentally different business processes (e.g., "New Business" vs "Renewal").</p>
      </div>
    `
  },

  // ================================================================
  // USE CASE 30
  // ================================================================
  {
    id: 30,
    title: 'DevOpsPro — CI/CD Setup with Salesforce DX & GitHub Actions',
    difficulty: 'Expert',
    category: 'Architecture / DevOps',
    company: 'DevOpsPro Engineering',
    subtitle: 'Transition from Change Sets to source-driven development using SFDX, scratch orgs, and automated CI/CD pipelines.',
    tags: ['Salesforce DX', 'CLI', 'GitHub Actions', 'Scratch Orgs', 'Source-Driven Development', 'CI/CD'],
    description: 'DevOpsPro is tired of manually building Change Sets, fixing overwritten code, and dealing with deployment failures. We transition the team to Source-Driven Development: source of truth moves from the Sandbox to the Git repository, deployed automatically via GitHub Actions.',
    learnings: [
      'Install and configure Salesforce CLI (SFDX)',
      'Convert metadata format to source format',
      'Create and use Scratch Orgs for isolated development',
      'Write a GitHub Actions YAML workflow for automated testing and deployment',
      'Understand the lifecycle of Source-Driven Development'
    ],
    content: `
      <h2>Background</h2>
      <p>In traditional Salesforce development, a Sandbox is the source of truth. Developers step on each other's toes, and Change Sets are slow and error-prone. <strong>Salesforce DX (SFDX)</strong> shifts the paradigm: the Git repository is the source of truth. You spin up temporary "Scratch Orgs", build your feature, commit to Git, and a CI/CD pipeline pushes it to production.</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → CLI & Project Setup · Step 2 → Scratch Org Configuration · Step 3 → Development Workflow · Step 4 → CI/CD Pipeline · Step 5 → Branching Strategy</p>
      </div>

      <h2>Step 1: CLI and Project Setup</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Source Format</p>
        <p>Older tools (Ant, Change Sets) use "Metadata API format" (massive XML files). SFDX uses "Source format," which breaks large objects into smaller, manageable files (e.g., one file per custom field, one file per validation rule) to prevent Git merge conflicts.</p>
      </div>
      <pre><code># Install Salesforce CLI
npm install -g @salesforce/cli

# Authenticate to the Dev Hub (Production org that governs scratch orgs)
sf org login web -d -a DevHub

# Create a new SFDX project
sf project generate -n DevOpsProApp

# Project structure:
# DevOpsProApp/
#   â”œâ”€â”€ config/
#   â”‚   â””â”€â”€ project-scratch-def.json   â† Scratch Org shape
#   â”œâ”€â”€ force-app/
#   â”‚   â””â”€â”€ main/default/             â† Your source code lives here
#   â””â”€â”€ sfdx-project.json             â† Project config</code></pre>

      <h2>Step 2: Scratch Org Configuration</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Scratch Orgs</p>
        <p>A <strong>Scratch Org</strong> is a disposable, configurable Salesforce org that spins up in seconds. It's like a Docker container for Salesforce. Developers get their own isolated org, build their feature, test it, and throw it away. Scratch orgs expire after 1-30 days.</p>
      </div>
      <pre><code>// config/project-scratch-def.json
{
  "orgName": "DevOpsPro Scratch",
  "edition": "Developer",
  "features": ["EnableSetPasswordInApi", "Communities"],
  "settings": {
    "lightningExperienceSettings": {
      "enableS1DesktopEnabled": true
    },
    "securitySettings": {
      "passwordPolicies": {
        "enableSetPasswordInApi": true
      }
    }
  }
}</code></pre>
      <pre><code># Create a fresh Scratch Org (expires in 7 days)
sf org create scratch -d -f config/project-scratch-def.json -a DevOrg1 --duration-days 7

# Push your source code to the Scratch Org
sf project deploy start --target-org DevOrg1

# Open the Scratch Org in a browser
sf org open --target-org DevOrg1</code></pre>

      <h2>Step 3: Development & Commit</h2>
      <p>A developer builds a new Flow and a Custom Field inside the Scratch Org using the Setup UI. Then they pull the changes down:</p>
      <pre><code># Pull the changes from the Scratch Org to the local file system
sf project retrieve start --target-org DevOrg1

# See what changed (Git diff)
git status
# modified:  force-app/main/default/flows/SLA_Escalation_Flow.flow-meta.xml
# new file:  force-app/main/default/objects/Case/fields/Priority_Score__c.field-meta.xml

# Git commit and push to the remote repository
git add .
git commit -m "Added SLA Flow and Priority field"
git push origin feature/sla-escalation</code></pre>

      <h2>Step 4: CI/CD Pipeline (GitHub Actions)</h2>
      <p>When the developer creates a Pull Request against the 'main' branch, GitHub Actions automatically spins up a test org, deploys the code, runs all Apex tests, and reports back.</p>
      <pre><code># .github/workflows/pr-validation.yml
name: Validate PR
on:
  pull_request:
    branches: [ main ]
jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install Salesforce CLI
        run: npm install -g @salesforce/cli
      - name: Authenticate to QA Sandbox
        run: |
          echo "\${{ secrets.SFDX_AUTH_URL }}" &gt; authfile
          sf org login sfdx-url -f authfile -a QA
      - name: Run Validation (Check-Only Deploy + Tests)
        run: sf project deploy start -o QA --dry-run --test-level RunLocalTests
      - name: Report Results
        if: failure()
        run: echo "âŒ Deployment validation failed. Check test results."</code></pre>

      <div class="callout callout--warning">
        <p class="callout__title">⚠️ï¸ The Golden Rule</p>
        <p>In a true CI/CD model, <strong>nobody makes changes directly in Production or UAT</strong>. All changes must be made in a Scratch Org (or Dev Sandbox), committed to Git, reviewed via Pull Request, and deployed exclusively by the automated pipeline.</p>
      </div>

      <h2>Step 5: Branching Strategy</h2>
      <table><thead><tr><th>Branch</th><th>Purpose</th><th>Deploys To</th></tr></thead><tbody>
        <tr><td><code>main</code></td><td>Production-ready code</td><td>Production (on merge)</td></tr>
        <tr><td><code>develop</code></td><td>Integration branch</td><td>QA Sandbox (on push)</td></tr>
        <tr><td><code>feature/*</code></td><td>Individual features</td><td>Scratch Org (manual)</td></tr>
        <tr><td><code>hotfix/*</code></td><td>Emergency fixes</td><td>Production (fast-tracked)</td></tr>
      </tbody></table>

      <div class="callout callout--tip">
        <p class="callout__title">💡 Change Sets vs SFDX</p>
        <p><strong>Change Sets:</strong> Manual, error-prone, no version control, cannot roll back, one-way (cannot deploy down).<br>
        <strong>SFDX + CI/CD:</strong> Automated, auditable, version-controlled, rollback = git revert, bi-directional (deploy anywhere).</p>
      </div>
    `
  },

  // ================================================================
  // USE CASE 31
  // ================================================================
  {
    id: 31,
    title: 'BankCore — Advanced Screen Flow: Datatable & Collection Variables',
    difficulty: 'Hard',
    category: 'Flow',
    company: 'BankCore Financial',
    subtitle: 'Build a complex Screen Flow that allows users to select multiple related records from a Datatable and process them in bulk.',
    tags: ['Screen Flow', 'Datatable', 'Collection Variables', 'Loop', 'Bulkification'],
    description: 'BankCore loan officers need a way to quickly select multiple pending Loan Applications from an Account and approve them all at once. We build a Screen Flow using the Datatable component to handle collection processing.',
    learnings: [
      'Use the Datatable component in Screen Flows',
      'Pass data using Record Collection Variables',
      'Iterate over collections using the Loop element',
      'Perform DML efficiently with Assignment and Update Records elements'
    ],
    content: `
      <h2>Background</h2>
      <p>A BankCore Account might have 10 child Loan Application records. The standard UI forces users to click into each one to approve them. We want a single button on the Account: "Bulk Approve Loans" that presents a table of all pending applications, lets the user check boxes next to the ones they want to approve, and updates them all.</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → Get the Records · Step 2 → Build the Screen with Datatable · Step 3 → Processing Loop (Bulkified) · Step 4 → Add the button to the Account page</p>
      </div>

      <h2>Step 1: Get the Records</h2>
      <ol class="step-list">
        <li class="step-list__item">Create a Screen Flow. Create a variable <code>recordId</code> (Text, Available for Input) to hold the Account ID passed from the record page.</li>
        <li class="step-list__item">Add a <strong>Get Records</strong> element: Object = <code>Loan_Application__c</code>.</li>
        <li class="step-list__item">Filter: <code>Account__c = {!recordId}</code> AND <code>Status__c = Pending</code>.</li>
        <li class="step-list__item">Store: <strong>All records</strong>. This creates an automatic Record Collection Variable (e.g., <code>Get_Pending_Loans</code>).</li>
        <li class="step-list__item">Select fields to store: Name, Amount__c, Request_Date__c, Status__c.</li>
      </ol>

      <h2>Step 2: The Screen and Datatable</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Datatable Component</p>
        <p>The Datatable component takes a Record Collection and displays it as an interactive table. Users can select rows using checkboxes, which outputs a <em>new</em> Record Collection containing only the selected rows. This is the bridge between "showing data" and "acting on selected data."</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Add a <strong>Screen</strong> element. Drag the <strong>Datatable</strong> component onto it.</li>
        <li class="step-list__item">Configure the Data Source: Select the collection from Step 1 (<code>Get_Pending_Loans</code>).</li>
        <li class="step-list__item">Configure Columns:</li>
      </ol>
      <table><thead><tr><th>Column Label</th><th>Field API Name</th><th>Type</th><th>Sortable</th></tr></thead><tbody>
        <tr><td>Application Name</td><td><code>Name</code></td><td>Text</td><td>Yes</td></tr>
        <tr><td>Loan Amount</td><td><code>Amount__c</code></td><td>Currency</td><td>Yes</td></tr>
        <tr><td>Request Date</td><td><code>Request_Date__c</code></td><td>Date</td><td>Yes</td></tr>
        <tr><td>Status</td><td><code>Status__c</code></td><td>Text</td><td>No</td></tr>
      </tbody></table>
      <ol class="step-list" start="4">
        <li class="step-list__item">Selection Mode: <strong>Multiple</strong>. This enables checkboxes on each row.</li>
        <li class="step-list__item">The Datatable auto-creates an output variable containing only the selected rows.</li>
      </ol>

      <h2>Step 3: The Processing Loop (Bulkification)</h2>
      <div class="callout callout--warning">
        <p class="callout__title">⚠️ï¸ No Pink Inside the Loop!</p>
        <p>Never put an "Update Records" or "Create Records" (pink DML elements) inside a Loop. Each iteration counts as a separate DML operation, and you'll hit the 150 DML limit. Instead: inside the loop, use Assignment to modify records and add them to a new collection. After the loop, perform a single Update on the entire collection.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Add a <strong>Loop</strong> element. Collection Variable: The "Selected Rows" output from the Datatable.</li>
        <li class="step-list__item">Inside the loop, add an <strong>Assignment</strong>: Set <code>{!Current Item}.Status__c</code> = "Approved".</li>
        <li class="step-list__item">Add a second <strong>Assignment</strong>: Add <code>{!Current Item}</code> to a new Record Collection variable: <code>var_LoansToUpdate</code> (Operator: Add).</li>
        <li class="step-list__item">After the loop closes (the "After Last Item" connector), add a single <strong>Update Records</strong> element.</li>
        <li class="step-list__item">Use record collection: <code>var_LoansToUpdate</code>. This updates ALL selected loans in one efficient DML statement.</li>
      </ol>

      <h2>Step 4: Add the Flow to the Account Page</h2>
      <ol class="step-list">
        <li class="step-list__item">Save and Activate the Flow.</li>
        <li class="step-list__item">On the Account Lightning Record Page (App Builder), add a <strong>Flow</strong> component or create an Action that launches this Flow.</li>
        <li class="step-list__item">Pass <code>{!recordId}</code> from the page context to the Flow's input variable.</li>
        <li class="step-list__item">Users now click "Bulk Approve Loans", see a table of pending applications, check the ones to approve, and click Next.</li>
      </ol>

      <div class="callout callout--tip">
        <p class="callout__title">💡 Bulkification Pattern Summary</p>
        <p>1. Get Records → Collection<br>
        2. Screen → User selects from Datatable → Selected Collection<br>
        3. Loop → Modify each record → Add to new Collection<br>
        4. After Loop → Single DML on the new Collection</p>
      </div>
    `
  },

  // ================================================================
  // USE CASE 32
  // ================================================================
  {
    id: 32,
    title: 'DataCrunch — Batch Apex: Processing Millions of Records',
    difficulty: 'Expert',
    category: 'Apex / Async',
    company: 'DataCrunch Analytics',
    subtitle: 'Process massive datasets without hitting governor limits using Batch Apex and Database.Stateful.',
    tags: ['Batch Apex', 'Database.Batchable', 'Database.Stateful', 'Asynchronous Apex', 'Governor Limits'],
    description: 'DataCrunch needs to recalculate the "Lifetime Value" for all 2 million Accounts in their org every weekend. A standard trigger or anonymous Apex script will crash. We write a Batch Apex class to chunk the processing.',
    learnings: [
      'Implement the Database.Batchable interface (start, execute, finish)',
      'Use QueryLocators to bypass the 50k SOQL limit',
      'Maintain state across batches using Database.Stateful',
      'Execute batches and monitor them in Setup'
    ],
    content: `
      <h2>Background</h2>
      <p>Synchronous Apex can only query 50,000 records and process for 10 seconds. When you need to update 2 million Accounts, you must use <strong>Batch Apex</strong>, which breaks the job into chunks of 200 records (configurable) and processes them asynchronously.</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → Write the Batch Class · Step 2 → Invoke the Batch · Step 3 → Monitor in Setup · Step 4 → Write the Test Class</p>
      </div>

      <h2>Step 1: The Batch Class Structure</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Database.Batchable</p>
        <p>A batch class must implement three methods: <code>start()</code> gathers the massive list of records (up to 50 million via QueryLocator), <code>execute()</code> processes a tiny chunk of them (default 200), and <code>finish()</code> runs once at the very end to send emails or chain jobs. Each <code>execute()</code> call gets its own set of governor limits.</p>
      </div>
      <pre><code>public class AccountLTVBatch implements Database.Batchable&lt;sObject&gt;, Database.Stateful {
    
    // Stateful variables remember their value across the chunks
    // Without Database.Stateful, these would reset to 0 in each execute()
    private Integer totalAccountsProcessed = 0;
    private Integer totalErrors = 0;

    // 1. START: Query up to 50 million records
    public Database.QueryLocator start(Database.BatchableContext bc) {
        // This query bypasses normal 50k SOQL limits
        return Database.getQueryLocator([
            SELECT Id, Lifetime_Value__c, 
            (SELECT Amount FROM Won_Opportunities__r) 
            FROM Account
        ]);
    }

    // 2. EXECUTE: Runs multiple times, processing 'scope' (max 200 records)
    public void execute(Database.BatchableContext bc, List&lt;Account&gt; scope) {
        List&lt;Account&gt; accountsToUpdate = new List&lt;Account&gt;();
        
        for (Account acc : scope) {
            Decimal ltv = 0;
            for (Opportunity opp : acc.Won_Opportunities__r) {
                ltv += opp.Amount;
            }
            if (acc.Lifetime_Value__c != ltv) {
                acc.Lifetime_Value__c = ltv;
                accountsToUpdate.add(acc);
            }
        }
        
        // Use Database.update with false to allow partial success
        Database.SaveResult[] results = Database.update(accountsToUpdate, false);
        
        // Track stats for the finish method (only works with Database.Stateful)
        for (Database.SaveResult sr : results) {
            if (sr.isSuccess()) { totalAccountsProcessed++; }
            else { totalErrors++; }
        }
    }

    // 3. FINISH: Runs once at the end
    public void finish(Database.BatchableContext bc) {
        System.debug('Batch Complete. Processed: ' + totalAccountsProcessed);
        System.debug('Errors: ' + totalErrors);
        
        // Send a summary email to the admin
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        mail.setToAddresses(new String[]{'admin@datacrunch.com'});
        mail.setSubject('LTV Batch Complete');
        mail.setPlainTextBody('Processed: ' + totalAccountsProcessed + ', Errors: ' + totalErrors);
        Messaging.sendEmail(new Messaging.SingleEmailMessage[]{mail});
    }
}</code></pre>

      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Database.Stateful</p>
        <p>By default, Batch Apex does NOT maintain instance variable values between <code>execute()</code> calls. If you add <code>Database.Stateful</code>, your class variables (like counters) persist across all chunks. <strong>Warning:</strong> This uses more memory, so use it only when you need to aggregate data across batches.</p>
      </div>

      <h2>Step 2: Invoking the Batch</h2>
      <p>To run this manually from the Developer Console, or from another class:</p>
      <pre><code>// Second parameter is the scope size (chunk size). Default is 200.
// Smaller scope = more execute() calls but less memory per call.
Id batchJobId = Database.executeBatch(new AccountLTVBatch(), 200);
System.debug('Batch Job ID: ' + batchJobId);</code></pre>

      <h2>Step 3: Monitoring</h2>
      <ol class="step-list">
        <li class="step-list__item">Setup → Apex Jobs to see the batch progress (Batches Processed, Failures).</li>
        <li class="step-list__item">You can query the <code>AsyncApexJob</code> object for programmatic monitoring:</li>
      </ol>
      <pre><code>AsyncApexJob job = [SELECT Status, NumberOfErrors, JobItemsProcessed, 
                          TotalJobItems FROM AsyncApexJob WHERE Id = :batchJobId];
// Status: Queued → Preparing → Processing → Completed</code></pre>

      <h2>Step 4: Test Class</h2>
      <div class="callout callout--warning">
        <p class="callout__title">⚠️ï¸ Testing Batch Apex</p>
        <p>In test classes, <code>Database.executeBatch()</code> runs synchronously when wrapped in <code>Test.startTest()</code> and <code>Test.stopTest()</code>. The <code>execute()</code> method runs exactly once with your test data.</p>
      </div>
      <pre><code>@isTest
static void testAccountLTVBatch() {
    // Create test data
    Account acc = new Account(Name = 'Test Account');
    insert acc;
    Opportunity opp = new Opportunity(Name = 'Test Opp', AccountId = acc.Id, 
                                       Amount = 5000, StageName = 'Closed Won', 
                                       CloseDate = Date.today());
    insert opp;
    
    Test.startTest();
    Database.executeBatch(new AccountLTVBatch());
    Test.stopTest();
    
    // Verify
    Account updated = [SELECT Lifetime_Value__c FROM Account WHERE Id = :acc.Id];
    System.assertEquals(5000, updated.Lifetime_Value__c);
}</code></pre>
    `
  },

  // ================================================================
  // USE CASE 33
  // ================================================================
  {
    id: 33,
    title: 'DataCrunch — Schedulable Apex: Automating the Batch',
    difficulty: 'Medium',
    category: 'Apex / Async',
    company: 'DataCrunch Analytics',
    subtitle: 'Automate Apex execution by implementing the Schedulable interface and using Cron expressions.',
    tags: ['Schedulable Apex', 'Cron Expression', 'Automation', 'System.schedule'],
    description: 'Following the Account LTV recalculation, DataCrunch wants this batch to run automatically every Saturday night at 2:00 AM. We implement Schedulable Apex and schedule it using Cron.',
    learnings: [
      'Implement the Schedulable interface',
      'Call Batch Apex from within Schedulable Apex',
      'Understand Cron expression syntax in Salesforce',
      'Monitor Scheduled Jobs in Setup'
    ],
    content: `
      <h2>Background</h2>
      <p>You have a Batch class (from Use Case 32), but someone has to manually click a button to run it. <strong>Schedulable Apex</strong> allows you to put classes on a recurring schedule — like a cron job in Linux.</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → Write the Schedulable Class · Step 2 → Schedule via Anonymous Apex · Step 3 → Monitor & Manage Jobs</p>
      </div>

      <h2>Step 1: The Schedulable Class</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Schedulable Interface</p>
        <p>A class must implement <code>Schedulable</code> and define an <code>execute(SchedulableContext)</code> method. Inside this method, you instantiate and call your Batch class. The Schedulable class itself is lightweight — it just kicks off other async work.</p>
      </div>
      <pre><code>public class AccountLTVBatchScheduler implements Schedulable {
    
    public void execute(SchedulableContext sc) {
        // Instantiate the batch class from Use Case 32
        AccountLTVBatch batchJob = new AccountLTVBatch();
        
        // Execute the batch with a scope of 200
        Database.executeBatch(batchJob, 200);
    }
}</code></pre>
      <div class="callout callout--warning">
        <p class="callout__title">⚠️ï¸ Governor Limit</p>
        <p>An org can have a maximum of <strong>100 scheduled Apex jobs</strong> at once. If you are approaching this limit, consider using a single dispatcher scheduler that chains multiple batch jobs.</p>
      </div>

      <h2>Step 2: Scheduling the Job via Anonymous Apex</h2>
      <p>While you can schedule jobs via the Setup UI (Setup → Scheduled Jobs → Schedule Apex), doing it via Anonymous Apex allows you to use precise <strong>Cron expressions</strong> and is scriptable.</p>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Salesforce Cron Syntax</p>
        <p>Salesforce Cron has 6-7 fields: <code>Seconds Minutes Hours Day_of_month Month Day_of_week Year(optional)</code>.</p>
      </div>
      <table><thead><tr><th>Expression</th><th>Meaning</th></tr></thead><tbody>
        <tr><td><code>0 0 2 ? * 7</code></td><td>Every Saturday at 2:00 AM</td></tr>
        <tr><td><code>0 0 0 1 * ?</code></td><td>First day of every month at midnight</td></tr>
        <tr><td><code>0 0 13 * * ?</code></td><td>Every day at 1:00 PM</td></tr>
        <tr><td><code>0 30 8 ? * 2-6</code></td><td>Mon-Fri at 8:30 AM</td></tr>
      </tbody></table>
      <pre><code>// Schedule the job
String cronExp = '0 0 2 ? * 7'; // Every Saturday at 2 AM
String jobName = 'Weekly Account LTV Calculation';

System.schedule(jobName, cronExp, new AccountLTVBatchScheduler());
// Returns a CronTrigger ID</code></pre>

      <h2>Step 3: Monitor & Manage Scheduled Jobs</h2>
      <ol class="step-list">
        <li class="step-list__item">Setup → Scheduled Jobs → View all scheduled jobs, their next run time, and status.</li>
        <li class="step-list__item">To cancel a scheduled job programmatically:</li>
      </ol>
      <pre><code>// Find and abort the job
CronTrigger ct = [SELECT Id FROM CronTrigger WHERE CronJobDetail.Name = 'Weekly Account LTV Calculation'];
System.abortJob(ct.Id);</code></pre>

      <div class="callout callout--tip">
        <p class="callout__title">💡 Async Apex Comparison</p>
        <p><strong>Future:</strong> Fire-and-forget, simple, limited to primitives. Best for: single callouts, quick DML.<br>
        <strong>Queueable:</strong> Chainable, supports complex types. Best for: multi-step processing.<br>
        <strong>Batch:</strong> Processes millions of records in chunks. Best for: mass updates, data cleanup.<br>
        <strong>Schedulable:</strong> Time-based triggering. Best for: recurring automation.</p>
      </div>
    `
  },

  // ================================================================
  // USE CASE 34
  // ================================================================
  {
    id: 34,
    title: 'BrandCo — Experience Cloud: Custom Customer Portal',
    difficulty: 'Medium',
    category: 'Experience Cloud',
    company: 'BrandCo Consumer Goods',
    subtitle: 'Design a pixel-perfect Customer Service portal using Experience Builder, Branding Sets, and Custom Domains.',
    tags: ['Experience Cloud', 'Experience Builder', 'Customer Community', 'Branding', 'CMS'],
    description: 'BrandCo wants a B2C customer portal where users can log cases, read Knowledge articles, and view their warranties. It must perfectly match their public website branding.',
    learnings: [
      'Use the Customer Service template in Experience Cloud',
      'Configure Branding Sets (Colors, Fonts, Logos)',
      'Use the Page Variations and Audiences features',
      'Understand Custom Domains (CNAME mapping)'
    ],
    content: `
      <h2>Background</h2>
      <p>Unlike Partners (who need complex data access), Customers just need a clean, simple UI to self-serve. We will use the <strong>Customer Service template</strong> and heavily brand it to match BrandCo's identity.</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → Create the Site · Step 2 → Brand with Theme Panel · Step 3 → Configure Pages & Navigation · Step 4 → Audiences & Page Variations · Step 5 → Custom Domain · Step 6 → Self-Registration & Login</p>
      </div>

      <h2>Step 1: Create the Customer Site</h2>
      <ol class="step-list">
        <li class="step-list__item">Setup → All Sites → New. Choose the <strong>Customer Service</strong> template.</li>
        <li class="step-list__item">Name: "BrandCo Support Portal". URL suffix: <code>/support</code>.</li>
        <li class="step-list__item">Click Create.</li>
      </ol>

      <h2>Step 2: The Experience Builder (Branding)</h2>
      <ol class="step-list">
        <li class="step-list__item">Go to All Sites → Workspace → <strong>Builder</strong>.</li>
        <li class="step-list__item">Click the <strong>Theme</strong> icon (paintbrush). Go to Colors.</li>
        <li class="step-list__item">Set the Action Color to BrandCo's hex code: <code>#FF5722</code>.</li>
        <li class="step-list__item">Set the Navigation Color to <code>#333333</code>.</li>
        <li class="step-list__item">Upload the Company Logo. This updates the header across the entire portal.</li>
        <li class="step-list__item">Under Fonts, select a Google Font that matches the brand (e.g., "Poppins").</li>
      </ol>
      <table><thead><tr><th>Branding Element</th><th>Value</th><th>Applied To</th></tr></thead><tbody>
        <tr><td>Action Color</td><td><code>#FF5722</code></td><td>Buttons, links, active states</td></tr>
        <tr><td>Navigation Color</td><td><code>#333333</code></td><td>Top navigation bar</td></tr>
        <tr><td>Logo</td><td>brandco-logo.png</td><td>Site header</td></tr>
        <tr><td>Font Family</td><td>Poppins</td><td>All text on the site</td></tr>
      </tbody></table>

      <h2>Step 3: Configure Pages & Navigation</h2>
      <ol class="step-list">
        <li class="step-list__item">In the Builder, navigate to the <strong>Home Page</strong>. Add components: "Search", "Topic Catalog" (for Knowledge categories), and a "Tile Menu" linking to "My Cases", "Submit a Case", "FAQ".</li>
        <li class="step-list__item">Go to the <strong>Case Detail</strong> page. Ensure the Case Feed component is visible so customers can add comments.</li>
        <li class="step-list__item">Edit the Navigation Menu (Settings → Navigation): Add "Home", "My Cases", "Knowledge", "Contact Us".</li>
      </ol>

      <h2>Step 4: Audiences & Page Variations</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Personalization with Audiences</p>
        <p>An <strong>Audience</strong> is a segment of users (e.g., "VIP Customers", "Customers in California"). You can create multiple versions of a page (Page Variations) and assign them to specific Audiences. A VIP sees a different homepage than a standard user.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Click the Gear icon at the top of the builder → Page Properties → Page Variations.</li>
        <li class="step-list__item">Duplicate the Home page. Call it "VIP Home".</li>
        <li class="step-list__item">Edit the VIP Home to include a "Priority Support" component and a direct phone number banner.</li>
        <li class="step-list__item">Go to Settings → Audiences. Create an Audience where <code>User.Profile = VIP Customer Community User</code>.</li>
        <li class="step-list__item">Assign this audience to the VIP Home variation.</li>
      </ol>

      <h2>Step 5: Custom Domains</h2>
      <p>You don't want customers going to <code>brandco.my.site.com</code>. You want them at <code>support.brandco.com</code>.</p>
      <ol class="step-list">
        <li class="step-list__item">In Salesforce Setup, go to <strong>Domains</strong>. Add <code>support.brandco.com</code>.</li>
        <li class="step-list__item">Have your IT team create a <strong>CNAME</strong> DNS record: <code>support.brandco.com → brandco.my.site.com</code>.</li>
        <li class="step-list__item">Go to Custom URLs in Setup and map the new domain to your Experience Cloud Site.</li>
        <li class="step-list__item">Configure an SSL certificate (Salesforce provides free certificates for Experience Cloud custom domains).</li>
      </ol>

      <h2>Step 6: Self-Registration & Login</h2>
      <ol class="step-list">
        <li class="step-list__item">In the site's Administration → Login & Registration, enable <strong>Allow External Users to Self-Register</strong>.</li>
        <li class="step-list__item">Choose the default Profile and Account for self-registered users.</li>
        <li class="step-list__item">Optionally enable Social Sign-On (Google, Facebook, Apple) under Authentication Providers.</li>
      </ol>

      <div class="callout callout--tip">
        <p class="callout__title">💡 Customer Community vs Partner Community</p>
        <p><strong>Customer Community:</strong> High volume (millions of users), no roles, simpler sharing (Sharing Sets). Best for B2C self-service.<br>
        <strong>Partner Community:</strong> Lower volume (hundreds/thousands), has roles, complex sharing. Best for B2B channel partner collaboration.</p>
      </div>
    `
  },

  // ================================================================
  // USE CASE 35
  // ================================================================
  {
    id: 35,
    title: 'VisDash — LWC: Integrating Third-Party JS (Chart.js)',
    difficulty: 'Expert',
    category: 'LWC / Advanced',
    company: 'VisDash Analytics',
    subtitle: 'Upload a third-party JavaScript library as a Static Resource and load it into a Lightning Web Component.',
    tags: ['LWC', 'Static Resources', 'loadScript', 'Chart.js', 'DOM Manipulation'],
    description: 'VisDash needs a beautiful, animated donut chart on their home page showing sales by region. Standard dashboards are too rigid. We build an LWC that imports Chart.js from a Static Resource and renders a custom chart.',
    learnings: [
      'Upload third-party libraries as Static Resources',
      'Use lightning/platformResourceLoader (loadScript / loadStyle)',
      'Manage standard HTML elements in LWC with lwc:dom="manual"',
      'Ensure script loading timing with connectedCallback/renderedCallback'
    ],
    content: `
      <h2>Background</h2>
      <p>Salesforce's base components don't include complex charting libraries. To use something like Chart.js or D3.js, you must bypass LockerService/Lightning Web Security restrictions by loading the script as a Static Resource.</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → Upload Static Resource · Step 2 → Create the HTML Template · Step 3 → Write the JS Controller · Step 4 → Connect to Apex for Real Data · Step 5 → Deploy</p>
      </div>

      <h2>Step 1: Upload the Static Resource</h2>
      <ol class="step-list">
        <li class="step-list__item">Download the <code>chart.min.js</code> file from the Chart.js website (or npm).</li>
        <li class="step-list__item">Salesforce Setup → Static Resources → New.</li>
        <li class="step-list__item">Name: <code>ChartJS</code>. Cache Control: <strong>Public</strong>. Upload the file.</li>
      </ol>
      <div class="callout callout--warning">
        <p class="callout__title">⚠️ï¸ Naming Convention</p>
        <p>Static Resource names must be alphanumeric with underscores. No hyphens, no dots. Use <code>ChartJS</code>, not <code>chart.js</code>. In LWC, you reference it via <code>@salesforce/resourceUrl/ChartJS</code>.</p>
      </div>

      <h2>Step 2: The HTML Template</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — lwc:dom="manual"</p>
        <p>LWC tightly controls the DOM (Shadow DOM). If a 3rd-party script needs to inject elements or modify the DOM directly (like Chart.js drawing on a canvas), you MUST add <code>lwc:dom="manual"</code> to the container element. This tells LWC: "Back off, I am letting another script modify this element."</p>
      </div>
      <pre><code>&lt;!-- salesChart.html --&gt;
&lt;template&gt;
    &lt;lightning-card title="Sales by Region" icon-name="utility:chart"&gt;
        &lt;div class="chart-container slds-p-around_medium"&gt;
            &lt;!-- Chart.js will draw on this canvas --&gt;
            &lt;canvas class="donut-chart" lwc:dom="manual"&gt;&lt;/canvas&gt;
        &lt;/div&gt;
    &lt;/lightning-card&gt;
&lt;/template&gt;</code></pre>

      <h2>Step 3: The JavaScript Controller</h2>
      <pre><code>// salesChart.js
import { LightningElement } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import CHART_JS from '@salesforce/resourceUrl/ChartJS';

export default class SalesChart extends LightningElement {
    chartInitialized = false;
    error;

    // renderedCallback runs after the component renders on screen
    renderedCallback() {
        if (this.chartInitialized) {
            return; // Prevent loading the script multiple times
        }
        this.chartInitialized = true;

        // Load the static resource script asynchronously
        loadScript(this, CHART_JS)
            .then(() =&gt; {
                this.initializeChart();
            })
            .catch(error =&gt; {
                this.error = error;
                console.error('Error loading Chart.js', error);
            });
    }

    initializeChart() {
        // Query the DOM element manually
        const canvas = this.template.querySelector('canvas.donut-chart');
        const ctx = canvas.getContext('2d');

        // Use global window.Chart object provided by the library
        new window.Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['North', 'South', 'East', 'West'],
                datasets: [{
                    data: [300, 50, 100, 40],
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'bottom' }
                }
            }
        });
    }
}</code></pre>

      <h2>Step 4: Connect to Real Apex Data</h2>
      <p>Replace the hardcoded data with a @wire call to an Apex method:</p>
      <pre><code>import getSalesByRegion from '@salesforce/apex/DashboardController.getSalesByRegion';

@wire(getSalesByRegion)
wiredSales({ data, error }) {
    if (data) {
        this.salesData = data; // [{region: 'North', total: 300}, ...]
        if (this.chartInitialized) {
            this.initializeChart(); // Re-render with real data
        }
    }
}</code></pre>

      <div class="callout callout--tip">
        <p class="callout__title">💡 renderedCallback vs connectedCallback</p>
        <p><strong>connectedCallback:</strong> Fires when the component is inserted into the DOM. The template is NOT yet rendered — you cannot query DOM elements.<br>
        <strong>renderedCallback:</strong> Fires after every render cycle. The DOM exists. This is where you should load scripts that need to manipulate DOM elements. Always use a flag (<code>chartInitialized</code>) to prevent re-loading.</p>
      </div>
    `
  },

  // ================================================================
  // USE CASE 36
  // ================================================================
  {
    id: 36,
    title: 'SecureBank — Salesforce Shield: Encryption & Audit',
    difficulty: 'Expert',
    category: 'Security / Compliance',
    company: 'SecureBank',
    subtitle: 'Comply with financial regulations by implementing Platform Encryption and tracking field history for 10 years.',
    tags: ['Salesforce Shield', 'Platform Encryption', 'Field Audit Trail', 'Compliance', 'Security'],
    description: 'SecureBank is under regulatory pressure. Standard Field History Tracking (18 months) is insufficient, and they must encrypt SSNs and Account Numbers at rest. We implement Salesforce Shield.',
    learnings: [
      'Understand the 3 components of Shield (Encryption, Audit Trail, Event Monitoring)',
      'Generate tenant secrets and encrypt custom/standard fields',
      'Configure Field Audit Trail retention policies via API',
      'Understand the limitations of encrypted fields (e.g., SOQL sorting)'
    ],
    content: `
      <h2>Background</h2>
      <p>Salesforce encrypts all data in transit via HTTPS. But "Data at Rest" (in the database servers) requires <strong>Salesforce Shield Platform Encryption</strong>. Furthermore, standard history tracking deletes data after 18 months; regulations require 10 years. We need <strong>Shield Field Audit Trail</strong>.</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → Understand the 3 Shield Components · Step 2 → Platform Encryption Setup · Step 3 → Encrypt Fields · Step 4 → Field Audit Trail · Step 5 → Event Monitoring</p>
      </div>

      <h2>Step 1: Salesforce Shield Components</h2>
      <table><thead><tr><th>Component</th><th>Purpose</th><th>Key Feature</th></tr></thead><tbody>
        <tr><td>Platform Encryption</td><td>Encrypt data at rest</td><td>Tenant-controlled encryption keys</td></tr>
        <tr><td>Field Audit Trail</td><td>Track field changes for 10 years</td><td>Extends standard 18-month history</td></tr>
        <tr><td>Event Monitoring</td><td>Track user behavior</td><td>Login forensics, API usage, data exports</td></tr>
      </tbody></table>

      <h2>Step 2: Platform Encryption Setup</h2>
      <div class="callout callout--warning">
        <p class="callout__title">⚠️ï¸ Encryption Limitations</p>
        <p>Encrypting a field breaks certain database functions. You cannot use <code>ORDER BY</code> on an encrypted field in SOQL. You cannot use it in formula fields or <code>LIKE</code> filters. Deterministic encryption allows exact-match <code>WHERE</code> filters but is slightly less secure. <strong>Always encrypt ONLY what is absolutely legally required.</strong></p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Setup → Platform Encryption → <strong>Key Management</strong>.</li>
        <li class="step-list__item">Click <strong>Generate Tenant Secret</strong>. This combines with the Salesforce Master Secret to create your unique encryption keys.</li>
        <li class="step-list__item">The Tenant Secret never leaves Salesforce. You can <strong>archive</strong> and <strong>destroy</strong> old secrets for key rotation.</li>
      </ol>

      <h2>Step 3: Encrypt Specific Fields</h2>
      <ol class="step-list">
        <li class="step-list__item">Setup → Encryption Policy → <strong>Encrypt Fields</strong>.</li>
        <li class="step-list__item">Select the "SSN__c" custom field on Contact.</li>
        <li class="step-list__item">Choose encryption scheme:</li>
      </ol>
      <table><thead><tr><th>Scheme</th><th>Searchable?</th><th>Security Level</th><th>Best For</th></tr></thead><tbody>
        <tr><td>Deterministic</td><td>Exact match (=)</td><td>High</td><td>Fields you need to search by (e.g., SSN lookup)</td></tr>
        <tr><td>Probabilistic</td><td>No</td><td>Highest</td><td>Fields you only display (e.g., bank account numbers)</td></tr>
      </tbody></table>
      <ol class="step-list" start="4">
        <li class="step-list__item">Encrypt the "Account_Number__c" field using <strong>Probabilistic</strong> (never searched, only displayed).</li>
        <li class="step-list__item">Click Save. Salesforce begins background encryption of existing data.</li>
      </ol>

      <h2>Step 4: Field Audit Trail (FAT)</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Big Objects</p>
        <p>Field Audit Trail moves history data off standard objects and into <strong>Big Objects</strong> (massive, immutable data stores) after 18 months, keeping it available for up to 10 years. You query this data using standard SOQL on the <code>FieldHistoryArchive</code> object.</p>
      </div>
      <p>To configure FAT, you must deploy a Metadata API package. There is no Setup UI for retention policies.</p>
      <pre><code>&lt;!-- Account.historyRetentionPolicy --&gt;
&lt;HistoryRetentionPolicy&gt;
    &lt;archiveAfterMonths&gt;18&lt;/archiveAfterMonths&gt;
    &lt;archiveRetentionYears&gt;10&lt;/archiveRetentionYears&gt;
    &lt;description&gt;Bank Policy for Account History&lt;/description&gt;
&lt;/HistoryRetentionPolicy&gt;</code></pre>
      <ol class="step-list">
        <li class="step-list__item">Deploy this XML via the Metadata API or SFDX.</li>
        <li class="step-list__item">To query archived history:</li>
      </ol>
      <pre><code>SELECT ParentId, FieldName, OldValue, NewValue, CreatedDate 
FROM FieldHistoryArchive 
WHERE ParentId = '001xx...' AND FieldName = 'SSN__c'</code></pre>

      <h2>Step 5: Event Monitoring</h2>
      <ol class="step-list">
        <li class="step-list__item">Event Monitoring tracks user actions: Login History, API calls, Report Exports, Lightning page views.</li>
        <li class="step-list__item">Data is stored in <strong>EventLogFile</strong> objects (downloadable CSVs).</li>
        <li class="step-list__item">With <strong>Real-Time Event Monitoring</strong> (premium add-on), you can create Transaction Security Policies: e.g., "If any user exports more than 500 records from a report, block the action and alert the admin."</li>
      </ol>

      <div class="callout callout--tip">
        <p class="callout__title">💡 Shield Pricing</p>
        <p>Salesforce Shield is a paid add-on (typically 30% of your Salesforce license cost). It includes all three components. Many regulated industries (Financial Services, Healthcare) require it for compliance.</p>
      </div>
    `
  },

  // ================================================================
  // USE CASE 37
  // ================================================================
  {
    id: 37,
    title: 'MarketGen — Marketing Cloud Account Engagement (Pardot)',
    difficulty: 'Medium',
    category: 'Sales Cloud / Marketing',
    company: 'MarketGen B2B',
    subtitle: 'Connect Salesforce to MCAE (Pardot) to sync Leads, track website visitors, and score prospects.',
    tags: ['MCAE', 'Pardot', 'Lead Scoring', 'B2B Marketing', 'Connector'],
    description: 'MarketGen does B2B sales. They need to track which pages a Lead visits on their website and score them. When the score hits 100, the Lead should be assigned to a Sales Rep in Salesforce.',
    learnings: [
      'Install and configure the Salesforce-Pardot Connector',
      'Understand Prospect syncing logic (Email address as identifier)',
      'Add Pardot tracking code to a website',
      'Map custom fields between Pardot and Salesforce',
      'Use Pardot Engagement Studio for basic routing'
    ],
    content: `
      <h2>Background</h2>
      <p><strong>Marketing Cloud Account Engagement (formerly Pardot)</strong> is Salesforce's B2B marketing automation tool. It tracks prospects via cookies. When a prospect fills out a form, Pardot syncs them to Salesforce as a Lead or Contact.</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → Install the Connector · Step 2 → Field Mapping · Step 3 → Tracking Code · Step 4 → Scoring Model · Step 5 → Automation Rules · Step 6 → Engagement Studio</p>
      </div>

      <h2>Step 1: The Connector Setup</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Syncing Direction</p>
        <p>By default, if a record exists in both systems and a field conflicts, you must define the "Sync Behavior". Usually, <strong>Salesforce is the master for CRM data</strong> (Name, Phone), and <strong>Pardot is the master for marketing data</strong> (Score, Grade). For some fields, "Most Recently Updated" wins.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">In Salesforce Setup, install the MCAE package (if not already provisioned).</li>
        <li class="step-list__item">Assign the <strong>B2BMA Integration User</strong> permission set to the dedicated integration user.</li>
        <li class="step-list__item">Assign the <strong>Sales User</strong> and <strong>CRM User</strong> permission sets to all reps who need to see Pardot data.</li>
        <li class="step-list__item">In Pardot Settings → Connectors, verify the Salesforce connector shows "Verified".</li>
      </ol>

      <h2>Step 2: Field Mapping</h2>
      <ol class="step-list">
        <li class="step-list__item">In Pardot, go to Admin → Configure Fields.</li>
        <li class="step-list__item">Map each Pardot default field to the corresponding Salesforce field.</li>
        <li class="step-list__item">For custom fields, click "Add Custom Field" and map it to the Salesforce custom field API name.</li>
      </ol>
      <table><thead><tr><th>Pardot Field</th><th>Salesforce Field</th><th>Sync Behavior</th></tr></thead><tbody>
        <tr><td>First Name</td><td>FirstName</td><td>Salesforce wins</td></tr>
        <tr><td>Email</td><td>Email</td><td>Pardot wins (marketing collects it first)</td></tr>
        <tr><td>Company</td><td>Company</td><td>Salesforce wins</td></tr>
        <tr><td>Score</td><td><code>Pardot_Score__c</code></td><td>Pardot wins (always)</td></tr>
        <tr><td>Grade</td><td><code>Pardot_Grade__c</code></td><td>Pardot wins</td></tr>
      </tbody></table>

      <h2>Step 3: Tracking Code</h2>
      <ol class="step-list">
        <li class="step-list__item">In Pardot, go to Admin → Domain Management → Add your website domain: <code>www.marketgen.com</code>.</li>
        <li class="step-list__item">Go to Marketing → Campaigns → Default Campaign → Tracking Code.</li>
        <li class="step-list__item">Copy the JavaScript snippet. Give it to your web developer to paste before <code>&lt;/body&gt;</code> on every page.</li>
        <li class="step-list__item">Once installed, Pardot tracks anonymous visitors. When they fill out a form, Pardot links their entire browsing history to the new Prospect record.</li>
      </ol>

      <h2>Step 4: Scoring & Grading</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Score vs Grade</p>
        <p><strong>Score</strong> measures <em>engagement</em> — behavioral actions (visited pricing page = +10, clicked email = +5, downloaded whitepaper = +20). Score is a number.<br>
        <strong>Grade</strong> measures <em>fit</em> — demographic attributes (VP of Sales = A+, Intern = D). Grade is a letter.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">In Pardot, go to Admin → Automation Settings → Scoring Rules.</li>
        <li class="step-list__item">Configure: Page View = +1, Form Submission = +15, Email Click = +5, Pricing Page View = +10.</li>
        <li class="step-list__item">For Grading: Admin → Profile → Create criteria: Industry = "Technology" → Grade A. Job Title contains "VP" → Grade adjustment +1/3.</li>
      </ol>

      <h2>Step 5: Automation Rules (Score Threshold)</h2>
      <ol class="step-list">
        <li class="step-list__item">In Pardot, create an <strong>Automation Rule</strong>.</li>
        <li class="step-list__item">Rule Criteria: <code>Prospect Score is greater than 100</code>.</li>
        <li class="step-list__item">Rule Action: <code>Assign to Salesforce Queue: Sales Inbound</code>.</li>
        <li class="step-list__item">When triggered, Pardot pushes the Prospect to Salesforce as a Lead, and the Sales Rep gets a notification.</li>
      </ol>

      <h2>Step 6: Engagement Studio</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Engagement Studio</p>
        <p>Engagement Studio is Pardot's visual automation builder (like Flow Builder but for marketing). You design drip campaigns: send Email 1 → wait 3 days → did they open it? → Yes: send Email 2 → No: send reminder. It is the most powerful marketing automation tool in Pardot.</p>
      </div>

      <div class="callout callout--tip">
        <p class="callout__title">💡 Key Identifier</p>
        <p>Pardot identifies prospects by <strong>email address</strong>, not by Salesforce ID. If two Salesforce Leads have the same email, they map to a single Pardot Prospect. This is a common source of confusion during implementation.</p>
      </div>
    `
  },

  // ================================================================
  // USE CASE 38
  // ================================================================
  {
    id: 38,
    title: 'SolveIt — Service Cloud: Knowledge Base & Article Types',
    difficulty: 'Medium',
    category: 'Service Cloud',
    company: 'SolveIt Tech',
    subtitle: 'Implement Salesforce Knowledge to allow support agents to create, review, and attach articles to cases.',
    tags: ['Salesforce Knowledge', 'Article Record Types', 'Data Categories', 'Service Console'],
    description: 'SolveIt Tech agents are typing the same troubleshooting steps over and over. We implement Salesforce Knowledge, create Article templates (Record Types), and set up Data Categories for organization.',
    learnings: [
      'Enable Salesforce Knowledge and assign Knowledge User licenses',
      'Create Article Record Types (e.g., FAQ, Tutorial)',
      'Configure Data Category Groups for search navigation',
      'Add the Knowledge Component to the Service Console'
    ],
    content: `
      <h2>Background</h2>
      <p><strong>Salesforce Knowledge</strong> is a repository of articles. Agents use it to resolve cases quickly, and articles can be published externally to Experience Cloud sites so customers can self-serve.</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → Enable Knowledge · Step 2 → Article Record Types & Fields · Step 3 → Data Categories · Step 4 → Article Lifecycle (Draft → Published) · Step 5 → Service Console Integration · Step 6 → External Publishing</p>
      </div>

      <h2>Step 1: Enable & Structure Knowledge</h2>
      <ol class="step-list">
        <li class="step-list__item">Ensure your User record has the <strong>Knowledge User</strong> checkbox checked (requires a feature license).</li>
        <li class="step-list__item">Setup → Knowledge Settings → <strong>Enable Lightning Knowledge</strong>.</li>
        <li class="step-list__item">Enable the "Allow users to create and edit articles" permission on the Support Agent profile.</li>
      </ol>

      <h2>Step 2: Article Record Types & Custom Fields</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Article Record Types</p>
        <p>Unlike standard objects, Knowledge Articles use Record Types to define different <strong>templates</strong>. An "FAQ" article has a Question and Answer field. A "Troubleshooting Guide" has Symptoms, Root Cause, and Resolution. Each Record Type has its own Page Layout.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Go to Object Manager → Knowledge → Record Types → New.</li>
        <li class="step-list__item">Create Record Type: "FAQ". Create another: "Troubleshooting Guide".</li>
        <li class="step-list__item">Create custom Rich Text fields and assign them to the appropriate Record Type Page Layouts:</li>
      </ol>
      <table><thead><tr><th>Record Type</th><th>Custom Fields</th><th>Field Type</th></tr></thead><tbody>
        <tr><td>FAQ</td><td>Question, Answer</td><td>Rich Text Area</td></tr>
        <tr><td>Troubleshooting Guide</td><td>Symptoms, Root Cause, Resolution</td><td>Rich Text Area</td></tr>
      </tbody></table>

      <h2>Step 3: Data Categories</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Data Categories</p>
        <p>Unlike normal picklists, <strong>Data Categories</strong> are hierarchical (Hardware > Printers > Inkjet). They drive the search engine, allowing users to filter articles by category. They also control security — you can restrict access to certain categories based on User Profiles or Roles.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Setup → Data Category Setup → New Category Group. Name: "Products".</li>
        <li class="step-list__item">Add top-level categories: Software, Hardware, Network.</li>
        <li class="step-list__item">Add child categories: Hardware → Printers, Monitors, Keyboards.</li>
        <li class="step-list__item">Activate the group. When authors create articles, they tag them with these categories.</li>
      </ol>
      <table><thead><tr><th>Category Group</th><th>Top Level</th><th>Children</th></tr></thead><tbody>
        <tr><td>Products</td><td>Software</td><td>CRM, ERP, Analytics</td></tr>
        <tr><td>Products</td><td>Hardware</td><td>Printers, Monitors, Keyboards</td></tr>
        <tr><td>Products</td><td>Network</td><td>VPN, Firewall, WiFi</td></tr>
      </tbody></table>

      <h2>Step 4: Article Lifecycle</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Article Versioning</p>
        <p>Articles go through a lifecycle: <strong>Draft</strong> → <strong>Published</strong> → <strong>Archived</strong>. When you edit a published article, Salesforce creates a new draft version while the old version remains live. You can also set articles to auto-archive after a certain date.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">An agent writes a new article and saves it as a Draft.</li>
        <li class="step-list__item">An article manager reviews and clicks <strong>Publish</strong>.</li>
        <li class="step-list__item">Choose visibility channels: <strong>Internal App</strong> (agents only), <strong>Partner</strong> (partner portal), <strong>Customer</strong> (customer portal), or <strong>Public Knowledge Base</strong>.</li>
        <li class="step-list__item">If an article becomes outdated, archive it. It's hidden from search but still available for audit.</li>
      </ol>

      <h2>Step 5: Service Console Integration</h2>
      <ol class="step-list">
        <li class="step-list__item">Open the Service Console. Edit the Case Page Layout (Lightning App Builder).</li>
        <li class="step-list__item">Drag the <strong>Knowledge</strong> standard component onto the right sidebar.</li>
        <li class="step-list__item">Now, when an agent opens a Case, Salesforce automatically searches Knowledge based on the Case Subject and suggests relevant articles!</li>
        <li class="step-list__item">The agent can click an article to read it, then click <strong>Attach to Case</strong> to link the article to the Case for reporting.</li>
      </ol>

      <h2>Step 6: External Publishing</h2>
      <ol class="step-list">
        <li class="step-list__item">If you have an Experience Cloud site (Use Case 34), articles published with "Customer" channel visibility automatically appear in the site's Knowledge search.</li>
        <li class="step-list__item">Customers can search, filter by Data Category, and read articles — reducing Case volume by up to 30%.</li>
      </ol>

      <div class="callout callout--tip">
        <p class="callout__title">💡 Case Deflection Metric</p>
        <p>Track the "Case Deflection Rate" — the percentage of customers who searched Knowledge and did NOT submit a case. This is a key KPI for measuring the ROI of your Knowledge Base.</p>
      </div>
    `
  },

  // ================================================================
  // USE CASE 39
  // ================================================================
  {
    id: 39,
    title: 'CloudHealth — Health Cloud: Patient Modeling & Care Plans',
    difficulty: 'Expert',
    category: 'Industry Clouds / Architecture',
    company: 'CloudHealth Network',
    subtitle: 'Configure the Health Cloud data model to manage Patients as Person Accounts and build Care Plans with goals and tasks.',
    tags: ['Health Cloud', 'Person Accounts', 'Care Plans', 'Care Team', 'Industry Clouds'],
    description: 'CloudHealth needs to track patients, their doctors, family members, and specialized care programs. Standard Account/Contact models do not fit. We implement the Health Cloud data model, utilizing Person Accounts and Care Plans.',
    learnings: [
      'Enable and configure Person Accounts',
      'Understand the Health Cloud Patient Data Model',
      'Set up Care Plans (Case object) and Care Teams',
      'Use the Health Cloud Console to view the Patient Card'
    ],
    content: `
      <h2>Background</h2>
      <p>Standard Salesforce uses B2B models (Accounts = Companies, Contacts = People). Healthcare is B2C/B2B hybrid. <strong>Health Cloud</strong> uses <strong>Person Accounts</strong> to represent Patients, combining Account and Contact fields into a single record. It also extends standard objects (Cases become Care Plans).</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → Enable Person Accounts · Step 2 → Configure Patient Record Types · Step 3 → Build a Care Plan · Step 4 → Add the Care Team · Step 5 → Customize the Patient Card</p>
      </div>

      <h2>Step 1: Enable Person Accounts</h2>
      <div class="callout callout--warning">
        <p class="callout__title">⚠️ï¸ Irreversible Action</p>
        <p>Enabling Person Accounts cannot be undone. It fundamentally changes the org's data model. Always test this heavily in a sandbox.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Log a ticket with Salesforce Support to enable Person Accounts (or enable it directly in Setup if available in newer orgs).</li>
        <li class="step-list__item">Salesforce creates a new Record Type on Account called "Person Account".</li>
        <li class="step-list__item">When creating a Person Account, the user fills out First Name and Last Name (like a Contact) instead of Account Name.</li>
      </ol>

      <h2>Step 2: The Patient Data Model</h2>
      <p>Health Cloud requires mapping standard objects to its specific architecture.</p>
      <ol class="step-list">
        <li class="step-list__item">Setup → Custom Metadata Types → <strong>Individual Record Type Mapper</strong>.</li>
        <li class="step-list__item">Map the Account "Person Account" record type to the "Patient" role. This tells Health Cloud: "Treat these records as Patients."</li>
        <li class="step-list__item">Assign the "Health Cloud Standard" and "Health Cloud Foundation" permission sets to users.</li>
      </ol>

      <h2>Step 3: Build a Care Plan</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Care Plans</p>
        <p>A <strong>Care Plan</strong> in Health Cloud is actually just a <code>Case</code> record with a specific Record Type ("CarePlan"). It acts as the hub. Under the Care Plan, you have <strong>Problems</strong> (custom object), <strong>Goals</strong> (custom object), and <strong>Tasks</strong> (standard activities) designed to resolve the problems.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Go to the Health Cloud Console. Open a Patient record.</li>
        <li class="step-list__item">Click <strong>New Care Plan</strong>. Name it "Diabetes Management".</li>
        <li class="step-list__item">Add a Problem: "High Blood Sugar".</li>
        <li class="step-list__item">Add a Goal under the Problem: "Maintain A1C below 7%".</li>
        <li class="step-list__item">Add Tasks under the Goal: "Schedule follow-up lab work" (assigned to patient), "Review lab results" (assigned to physician).</li>
      </ol>

      <h2>Step 4: The Care Team</h2>
      <p>Patients don't heal alone. The Care Team tracks everyone involved.</p>
      <ol class="step-list">
        <li class="step-list__item">On the Care Plan, go to the <strong>Care Team</strong> tab.</li>
        <li class="step-list__item">Add Internal Users: e.g., Sarah (Primary Care Physician), John (Care Coordinator).</li>
        <li class="step-list__item">Add External Contacts: e.g., Mary (Patient's daughter/emergency contact), Dr. Smith (External Cardiologist).</li>
        <li class="step-list__item">Specify roles for each member. This visualizes the patient's support network.</li>
      </ol>

      <h2>Step 5: Customize the Patient Card</h2>
      <ol class="step-list">
        <li class="step-list__item">The Patient Card is the top highlight panel in Health Cloud. It's driven by Field Sets.</li>
        <li class="step-list__item">Setup → Object Manager → Account → Field Sets.</li>
        <li class="step-list__item">Edit the <strong>HcPatientCard</strong> field set.</li>
        <li class="step-list__item">Add fields: Date of Birth, Gender, Medical Record Number (MRN), Blood Type.</li>
        <li class="step-list__item">Refresh the console. The Patient Card now displays these critical data points prominently at the top of the screen.</li>
      </ol>

      <div class="callout callout--tip">
        <p class="callout__title">💡 Health Cloud EHR Integration</p>
        <p>Health Cloud is not an Electronic Health Record (EHR) system (like Epic or Cerner). It is an engagement layer. Clinical data (allergies, medications) is typically synced from the EHR into Health Cloud via integration platforms (MuleSoft) using FHIR standards.</p>
      </div>
    `
  },

  // ================================================================
  // USE CASE 40
  // ================================================================
  {
    id: 40,
    title: 'NonProfitOrg — NPSP: Households & Recurring Donations',
    difficulty: 'Medium',
    category: 'Industry Clouds / NPSP',
    company: 'Global Charity',
    subtitle: 'Manage donor families and subscription-based giving using the Non-Profit Success Pack (NPSP).',
    tags: ['NPSP', 'Household Model', 'Donations', 'Opportunities', 'Rollups'],
    description: 'Global Charity tracks donors as individual Contacts but needs to see total household giving to invite wealthy families to galas. They also need to automatically process $50/month recurring donations. We implement NPSP Household models and Recurring Donations.',
    learnings: [
      'Understand the NPSP Household Account Model',
      'Manage Household members and automatic naming conventions',
      'Configure Recurring Donations to auto-generate Opportunities',
      'Utilize Customizable Rollups for donor giving history'
    ],
    content: `
      <h2>Background</h2>
      <p>The <strong>Nonprofit Success Pack (NPSP)</strong> transforms standard Salesforce into a fundraising machine. Instead of B2B accounts, NPSP uses the <strong>Household Model</strong>: Contacts (donors) belong to Household Accounts. Opportunities represent Donations.</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → Understand the Household Model · Step 2 → Manage Household Names · Step 3 → Create a Recurring Donation · Step 4 → Review NPSP Rollups</p>
      </div>

      <h2>Step 1: The Household Account Model</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Auto-Account Creation</p>
        <p>In NPSP, if you create a standalone Contact (e.g., "John Smith") and leave the Account Name blank, NPSP automatically creates a Household Account named "Smith (John) Household" and links the Contact to it. This ensures no Contact is ever orphaned.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Go to Contacts → New. First Name: "Jane", Last Name: "Doe". Leave Account blank. Save.</li>
        <li class="step-list__item">Notice she is now linked to the "Doe (Jane) Household" Account.</li>
        <li class="step-list__item">Go to the Household Account. Click <strong>Manage Household</strong>.</li>
        <li class="step-list__item">Add her husband: "John Doe". Save.</li>
        <li class="step-list__item">NPSP automatically renames the Account to "Doe (Jane and John) Household".</li>
      </ol>

      <h2>Step 2: Household Naming Conventions</h2>
      <ol class="step-list">
        <li class="step-list__item">Go to the <strong>NPSP Settings</strong> tab → People → Households.</li>
        <li class="step-list__item">Change the Household Name Format. E.g., change <code>{!LastName} ({!Account.Primary_Contact__r.FirstName}) Household</code> to <code>The {!LastName} Family</code>.</li>
        <li class="step-list__item">Change the Formal Greeting format to <code>Mr. and Mrs. {!LastName}</code> (used for direct mail).</li>
        <li class="step-list__item">Change the Informal Greeting to <code>{!FirstNames}</code> (used for emails).</li>
      </ol>
      <table><thead><tr><th>Setting</th><th>Result Example</th><th>Use Case</th></tr></thead><tbody>
        <tr><td>Account Name</td><td>The Doe Family</td><td>CRM Display</td></tr>
        <tr><td>Formal Greeting</td><td>Mr. and Mrs. Doe</td><td>Tax Receipts, Gala Invites</td></tr>
        <tr><td>Informal Greeting</td><td>Jane and John</td><td>Email Marketing</td></tr>
      </tbody></table>

      <h2>Step 3: Recurring Donations</h2>
      <p>Jane Doe signs up to give $50 every month. We don't want to manually create 12 Opportunities a year.</p>
      <ol class="step-list">
        <li class="step-list__item">Go to the <strong>Recurring Donations</strong> tab → New.</li>
        <li class="step-list__item">Contact: Jane Doe.</li>
        <li class="step-list__item">Amount: $50.00. Schedule Type: Multiply By (fixed number of payments) or Ongoing (open-ended). Choose <strong>Ongoing</strong>.</li>
        <li class="step-list__item">Installment Period: Monthly. Installment Date: 1st of the month. Save.</li>
      </ol>
      <div class="callout callout--warning">
        <p class="callout__title">⚠️ï¸ How NPSP Handles Recurring Donations</p>
        <p>When you save, NPSP automatically generates future <code>Opportunity</code> records (usually 12 months out) with the Stage set to "Pledged". As the months pass and payments clear your payment processor, the stages are updated to "Closed Won".</p>
      </div>

      <h2>Step 4: Customizable Rollups</h2>
      <p>NPSP calculates donor metrics nightly using batch jobs.</p>
      <ol class="step-list">
        <li class="step-list__item">Look at Jane Doe's Contact record. You will see fields like: <code>Total Gifts</code>, <code>Total Gifts This Year</code>, <code>Largest Gift</code>, and <code>Last Gift Date</code>.</li>
        <li class="step-list__item">These rollups aggregate from the Contact level UP to the Household level. So the "Doe Family" Account shows the combined giving of Jane AND John.</li>
        <li class="step-list__item">To create custom rollups (e.g., "Total Gifts to the Wildlife Fund"), go to NPSP Settings → Donations → Customizable Rollups.</li>
      </ol>
    `
  },

  // ================================================================
  // USE CASE 41
  // ================================================================
  {
    id: 41,
    title: 'FinancialServ — Financial Services Cloud: Rollups & Groups',
    difficulty: 'Expert',
    category: 'Industry Clouds / FSC',
    company: 'WealthMax Advisors',
    subtitle: 'Configure Financial Services Cloud to roll up financial accounts to the Household level and manage complex client relationships.',
    tags: ['FSC', 'Financial Services Cloud', 'Rollup By Lookup (RBL)', 'Relationship Groups', 'Households'],
    description: 'WealthMax needs to see a client\'s total net worth. A client might have an IRA, a Joint Checking account with their spouse, and a Trust account. We configure FSC Rollup By Lookup (RBL) to aggregate these balances at the Household level.',
    learnings: [
      'Understand the FSC Individual and Household data model',
      'Configure Financial Accounts and assign ownership',
      'Set up Rollup By Lookup (RBL) rules for financial aggregation',
      'Manage Actionable Relationship Center (ARC) relationships'
    ],
    content: `
      <h2>Background</h2>
      <p><strong>Financial Services Cloud (FSC)</strong> is built for wealth management, banking, and insurance. It provides custom objects like <code>FinancialAccount__c</code> and an advanced aggregation engine called <strong>Rollup By Lookup (RBL)</strong> to calculate "Wallet Share" and Net Worth across complex family structures.</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → Enable FSC Person Accounts · Step 2 → Create the Household Group · Step 3 → Create Financial Accounts · Step 4 → Configure RBL Rules · Step 5 → Visualize in ARC</p>
      </div>

      <h2>Step 1: The FSC Data Model (Individuals vs Households)</h2>
      <ol class="step-list">
        <li class="step-list__item">Like Health Cloud, FSC relies heavily on <strong>Person Accounts</strong> to represent individual clients.</li>
        <li class="step-list__item">Unlike NPSP (which makes the Household the primary Account), FSC keeps the Individual as a Person Account and links them to a separate Household Account (Record Type = Household) via the <strong>Account-Contact Relationship (ACR)</strong> object.</li>
      </ol>
      <table><thead><tr><th>Entity</th><th>Salesforce Object</th><th>Record Type</th></tr></thead><tbody>
        <tr><td>Client (John Smith)</td><td>Account (Person)</td><td>Person Account / Individual</td></tr>
        <tr><td>Spouse (Jane Smith)</td><td>Account (Person)</td><td>Person Account / Individual</td></tr>
        <tr><td>The Smith Family</td><td>Account (Business)</td><td>Household</td></tr>
      </tbody></table>

      <h2>Step 2: Create the Household Group</h2>
      <ol class="step-list">
        <li class="step-list__item">Create a Person Account: "John Smith".</li>
        <li class="step-list__item">On John's record, navigate to the <strong>Relationships</strong> tab.</li>
        <li class="step-list__item">Click <strong>Add to Group</strong> → Create New Group. Name: "The Smith Household".</li>
        <li class="step-list__item">Add Jane Smith to the same group. Designate John as the Primary Member.</li>
      </ol>

      <h2>Step 3: Create Financial Accounts</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Financial Accounts</p>
        <p>A <code>FinancialAccount__c</code> represents a bank account, investment portfolio, loan, or insurance policy. It connects to a Primary Owner (the Person Account) and optionally to Joint Owners.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Go to John Smith's record → Financial Accounts tab → New.</li>
        <li class="step-list__item">Record Type: Investment Account. Name: "John's 401k". Balance: $500,000. Primary Owner: John Smith.</li>
        <li class="step-list__item">Create another account: Record Type: Bank Account. Name: "Joint Checking". Balance: $50,000. Primary Owner: Jane Smith. Joint Owner: John Smith.</li>
      </ol>

      <h2>Step 4: Rollup By Lookup (RBL)</h2>
      <p>WealthMax wants to look at "The Smith Household" and see a total balance of $550,000. Master-Detail rollups don't work because Financial Accounts are connected via Lookups. FSC uses RBL.</p>
      <ol class="step-list">
        <li class="step-list__item">Setup → Custom Metadata Types → <strong>Rollup By Lookup Configuration</strong>.</li>
        <li class="step-list__item">FSC comes with pre-built RBL rules (e.g., <code>TotalBankDeposits</code>, <code>TotalInvestments</code>).</li>
        <li class="step-list__item">These rules use a batch process (or real-time triggers, depending on config) to query all Financial Accounts linked to members of the Household and sum the Balances.</li>
        <li class="step-list__item">Go to "The Smith Household" record. The <strong>Total Financial Accounts</strong> field now reads $550,000.</li>
      </ol>
      <div class="callout callout--warning">
        <p class="callout__title">⚠️ï¸ Double Counting</p>
        <p>If John is Primary Owner of an account, and Jane is Joint Owner, RBL logic ensures the balance is only counted <strong>once</strong> at the Household level, preventing artificial inflation of Net Worth.</p>
      </div>

      <h2>Step 5: Visualize in ARC</h2>
      <ol class="step-list">
        <li class="step-list__item">The <strong>Actionable Relationship Center (ARC)</strong> is an interactive graph component on the Household page.</li>
        <li class="step-list__item">It displays nodes for the Household, John, Jane, their Financial Accounts, and even external relationships (e.g., John's CPA or Lawyer).</li>
        <li class="step-list__item">Advisors use this to visually map out wealth influence and identify cross-sell opportunities.</li>
      </ol>
    `
  },

  // ================================================================
  // USE CASE 42
  // ================================================================
  {
    id: 42,
    title: 'CodeClean — Apex Enterprise Patterns: Selector Layer',
    difficulty: 'Expert',
    category: 'Apex / Advanced',
    company: 'CodeClean Software',
    subtitle: 'Refactor messy SOQL queries scattered across triggers and controllers into a centralized Selector pattern.',
    tags: ['Apex Patterns', 'Selector Layer', 'fflib', 'Architecture', 'SOQL'],
    description: 'CodeClean has 50 different Apex classes that query the Account object. When a new field is added that everyone needs, developers have to update 50 queries. We implement the Selector pattern to centralize all SOQL.',
    learnings: [
      'Understand Martin Fowler’s Enterprise Application Architecture patterns',
      'Implement a basic Selector Layer for an object',
      'Call the Selector from Triggers and Controllers',
      'Improve code reusability, security, and maintainability'
    ],
    content: `
      <h2>Background</h2>
      <p>In mature orgs, writing <code>[SELECT Id, Name FROM Account WHERE...]</code> directly inside Triggers, Batch classes, and Aura controllers leads to massive code duplication and maintenance nightmares. The <strong>Selector Pattern</strong> dictates that <em>all</em> SOQL for a specific object should live in a single class.</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → The Problem (Scattered SOQL) · Step 2 → Create the Selector Class · Step 3 → Define Default Fields · Step 4 → Write Query Methods · Step 5 → Refactor Callers</p>
      </div>

      <h2>Step 1: The Problem</h2>
      <pre><code>// âŒ In Trigger Handler
List&lt;Account&gt; accs = [SELECT Id, Name, Industry, AnnualRevenue FROM Account WHERE Id IN :accIds];

// âŒ In LWC Controller
List&lt;Account&gt; topAccs = [SELECT Id, Name, Industry FROM Account WHERE AnnualRevenue &gt; 1000000];</code></pre>
      <p>If the business says, "We must always query the 'Compliance_Status__c' field on every Account query," you have to find and modify every query in the codebase.</p>

      <h2>Step 2: Create the Selector Class</h2>
      <p>Create a class dedicated purely to querying Accounts: <code>AccountsSelector</code>.</p>
      <pre><code>public inherited sharing class AccountsSelector {
    
    // Singleton pattern (optional but recommended)
    private static AccountsSelector instance;
    public static AccountsSelector newInstance() {
        if (instance == null) {
            instance = new AccountsSelector();
        }
        return instance;
    }
}</code></pre>

      <h2>Step 3: Define Default Fields</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Base Fields</p>
        <p>Define a core set of fields that every Account query should return. This guarantees consistency across the application.</p>
      </div>
      <pre><code>    // Inside AccountsSelector class...
    
    public List&lt;String&gt; getSObjectFieldList() {
        return new List&lt;String&gt;{
            'Id',
            'Name',
            'Industry',
            'AnnualRevenue',
            'Compliance_Status__c',
            'OwnerId'
        };
    }

    private String getFieldString() {
        return String.join(getSObjectFieldList(), ',');
    }</code></pre>

      <h2>Step 4: Write Query Methods</h2>
      <p>Create specific methods for specific business needs. They construct dynamic SOQL using the base fields.</p>
      <pre><code>    public List&lt;Account&gt; selectById(Set&lt;Id&gt; recordIds) {
        if (recordIds == null || recordIds.isEmpty()) return new List&lt;Account&gt;();
        
        String query = 'SELECT ' + getFieldString() + 
                       ' FROM Account WHERE Id IN :recordIds';
        return Database.query(query);
    }

    public List&lt;Account&gt; selectByIndustry(String industry) {
        String query = 'SELECT ' + getFieldString() + 
                       ' FROM Account WHERE Industry = :industry';
        return Database.query(query);
    }
    
    public List&lt;Account&gt; selectHighValueWithContacts(Decimal minRevenue) {
        // You can add subqueries here
        String query = 'SELECT ' + getFieldString() + ', ' +
                       '(SELECT Id, Name, Email FROM Contacts) ' +
                       ' FROM Account WHERE AnnualRevenue &gt;= :minRevenue';
        return Database.query(query);
    }</code></pre>

      <h2>Step 5: Refactor Callers</h2>
      <p>Now, update your Triggers and Controllers to stop writing SOQL, and instead call the Selector.</p>
      <pre><code>// âœ… In Trigger Handler
Set&lt;Id&gt; accIds = Trigger.newMap.keySet();
List&lt;Account&gt; accsWithData = AccountsSelector.newInstance().selectById(accIds);

// âœ… In LWC Controller
@AuraEnabled(cacheable=true)
public static List&lt;Account&gt; getTopTechAccounts() {
    return AccountsSelector.newInstance().selectByIndustry('Technology');
}</code></pre>

      <div class="callout callout--tip">
        <p class="callout__title">💡 fflib Framework</p>
        <p>While you can write Selectors from scratch as shown above, many enterprise orgs use the open-source <strong>fflib_SObjectSelector</strong> framework, which provides robust base classes for Selectors, standardizing field security enforcement (WITH SECURITY_ENFORCED) and query construction.</p>
      </div>
    `
  },

  // ================================================================
  // USE CASE 43
  // ================================================================
  {
    id: 43,
    title: 'CodeClean — Apex Enterprise Patterns: Service Layer',
    difficulty: 'Expert',
    category: 'Apex / Advanced',
    company: 'CodeClean Software',
    subtitle: 'Move business logic out of Triggers and Controllers into a centralized Service layer.',
    tags: ['Apex Patterns', 'Service Layer', 'fflib', 'Architecture', 'Business Logic'],
    description: 'CodeClean has a massive `AccountTriggerHandler`. When an Opportunity needs to apply a discount, it copies the same code. We create a Service Layer to encapsulate business logic into reusable, callable methods.',
    learnings: [
      'Understand the role of the Service Layer in MVC architecture',
      'Decouple business logic from standard entry points (Triggers/API)',
      'Design Service methods as Units of Work',
      'Implement boundary-level exception handling'
    ],
    content: `
      <h2>Background</h2>
      <p>Triggers, Batch classes, Invocable methods, and LWC Controllers are <strong>entry points</strong>. They should not contain complex business logic (e.g., <code>if (acc.Revenue &gt; 1M) { applyDiscount(); }</code>). The <strong>Service Layer</strong> is where the actual work happens. It ensures logic can be called from anywhere (a Trigger OR an API) without duplication.</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → The Problem (Logic in Triggers) · Step 2 → Create the Service Class · Step 3 → Design the Service Method · Step 4 → Call from Multiple Entry Points</p>
      </div>

      <h2>Step 1: The Problem</h2>
      <pre><code>// âŒ BAD: Logic trapped in a Trigger Handler
public class OpportunityTriggerHandler {
    public void afterUpdate(List&lt;Opportunity&gt; newList, Map&lt;Id, Opportunity&gt; oldMap) {
        // Business Logic: If Opp is Won, provision software licenses
        List&lt;License__c&gt; licensesToInsert = new List&lt;License__c&gt;();
        for (Opportunity opp : newList) {
            if (opp.IsWon && !oldMap.get(opp.Id).IsWon) {
                // ... complex calculation of license count ...
                licensesToInsert.add(new License__c(OppId = opp.Id));
            }
        }
        insert licensesToInsert;
    }
}</code></pre>
      <p>What if the Sales Ops team wants to provision licenses manually via a button (LWC)? They can't fire the trigger. They'd have to rewrite the license calculation logic in their LWC controller.</p>

      <h2>Step 2: Create the Service Class</h2>
      <p>Create a class named for the <em>business process</em> or entity, usually plural: <code>OpportunitiesService</code>.</p>
      <pre><code>public inherited sharing class OpportunitiesService {
    
    // Service methods are often static, representing stateless operations
    public static void provisionLicensesForWonOpportunities(Set&lt;Id&gt; oppIds) {
        // 1. Validate inputs
        if (oppIds == null || oppIds.isEmpty()) return;
        
        // 2. Query data using Selector Layer (Use Case 42)
        List&lt;Opportunity&gt; opps = OpportunitiesSelector.newInstance().selectByIdWithProducts(oppIds);
        
        // 3. Perform Business Logic
        List&lt;License__c&gt; licensesToCreate = new List&lt;License__c&gt;();
        for (Opportunity opp : opps) {
            Integer requiredLicenses = calculateRequiredLicenses(opp); // private helper
            for (Integer i = 0; i &lt; requiredLicenses; i++) {
                licensesToCreate.add(new License__c(
                    Opportunity__c = opp.Id,
                    Account__c = opp.AccountId,
                    Status__c = 'Active'
                ));
            }
        }
        
        // 4. Commit to database (or use UnitOfWork)
        if (!licensesToCreate.isEmpty()) {
            insert licensesToCreate;
        }
    }
    
    private static Integer calculateRequiredLicenses(Opportunity opp) {
        // Encapsulated complexity
        return opp.Amount &gt; 100000 ? 50 : 10;
    }
}</code></pre>

      <h2>Step 3: Call from Multiple Entry Points</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Thin Entry Points</p>
        <p>Entry points now become "thin." They are responsible only for routing the request to the Service layer and handling the response.</p>
      </div>

      <h3>Entry Point 1: The Trigger</h3>
      <pre><code>public class OpportunityTriggerHandler {
    public void afterUpdate(List&lt;Opportunity&gt; newList, Map&lt;Id, Opportunity&gt; oldMap) {
        Set&lt;Id&gt; wonOppIds = new Set&lt;Id&gt;();
        for (Opportunity opp : newList) {
            if (opp.IsWon && !oldMap.get(opp.Id).IsWon) {
                wonOppIds.add(opp.Id);
            }
        }
        
        // Delegate to Service Layer
        OpportunitiesService.provisionLicensesForWonOpportunities(wonOppIds);
    }
}</code></pre>

      <h3>Entry Point 2: An LWC Controller</h3>
      <pre><code>public class OpportunityActionController {
    
    @AuraEnabled
    public static void manualLicenseProvision(Id oppId) {
        try {
            // Delegate to the EXACT SAME Service Layer method
            OpportunitiesService.provisionLicensesForWonOpportunities(new Set&lt;Id&gt;{oppId});
        } catch (Exception e) {
            throw new AuraHandledException('Failed to provision: ' + e.getMessage());
        }
    }
}</code></pre>

      <div class="callout callout--tip">
        <p class="callout__title">💡 Service Layer Rules</p>
        <p>1. Service methods should take primitive collections (Sets of IDs) rather than full SObjects where possible to ensure they have the exact data they need.<br>
        2. Never call a Service from another Service unless absolutely necessary (can lead to tangled dependencies).<br>
        3. Service methods define a "transaction" boundary (manage try/catch and rollbacks here).</p>
      </div>
    `
  },

  // ================================================================
  // USE CASE 44
  // ================================================================
  {
    id: 44,
    title: 'SecurIT — Connected Apps & OAuth 2.0 Web Server Flow',
    difficulty: 'Expert',
    category: 'Security / Integration',
    company: 'SecurIT Integrations',
    subtitle: 'Configure a Connected App to allow an external web application to securely access Salesforce data using OAuth 2.0.',
    tags: ['Connected Apps', 'OAuth 2.0', 'Web Server Flow', 'API', 'Security'],
    description: 'SecurIT is building a custom Node.js application that needs to pull reports from Salesforce on behalf of the logged-in user. We set up a Connected App using the OAuth 2.0 Web Server Flow to grant access securely without sharing passwords.',
    learnings: [
      'Create and configure a Connected App',
      'Understand the OAuth 2.0 Web Server (Authorization Code) flow',
      'Define OAuth Scopes (Data Access Permissions)',
      'Exchange an authorization code for an Access Token and Refresh Token'
    ],
    content: `
      <h2>Background</h2>
      <p>If an external app needs to access Salesforce data via API, it should <strong>never</strong> ask for the user's Salesforce username and password. Instead, it should use a <strong>Connected App</strong> to implement OAuth 2.0. The app redirects the user to Salesforce, the user logs in, and Salesforce gives the app a temporary <em>Access Token</em>.</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → Create Connected App · Step 2 → Configure OAuth Settings · Step 3 → The Authorization Request (Browser) · Step 4 → The Token Request (Server) · Step 5 → Using the Token</p>
      </div>

      <h2>Step 1: Create the Connected App</h2>
      <ol class="step-list">
        <li class="step-list__item">Setup → App Manager → <strong>New Connected App</strong>.</li>
        <li class="step-list__item">Basic Info: Name = "NodeJS Reporting Portal", Email = "admin@securit.com".</li>
      </ol>

      <h2>Step 2: Configure OAuth Settings</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Callback URL & Scopes</p>
        <p>The <strong>Callback URL</strong> is where Salesforce redirects the user's browser after they successfully log in. <strong>Scopes</strong> define what the app is allowed to do (e.g., read data vs modify data).</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Check <strong>Enable OAuth Settings</strong>.</li>
        <li class="step-list__item">Callback URL: <code>https://portal.securit.com/oauth/callback</code> (must match the external app exactly).</li>
        <li class="step-list__item">Selected OAuth Scopes:
          <ul>
            <li><code>Manage user data via APIs (api)</code> (Standard API access)</li>
            <li><code>Perform requests at any time (refresh_token, offline_access)</code> (Allows the app to get a new token without asking the user to log in again).</li>
          </ul>
        </li>
        <li class="step-list__item">Save. Salesforce generates a <strong>Consumer Key</strong> (Client ID) and a <strong>Consumer Secret</strong> (Client Secret). Give these to the Node.js developer.</li>
      </ol>

      <h2>Step 3: The Authorization Request (Browser)</h2>
      <p>When the user clicks "Log in with Salesforce" on the Node.js app, the app redirects their browser to Salesforce:</p>
      <pre><code>GET https://login.salesforce.com/services/oauth2/authorize
    ?response_type=code
    &client_id=YOUR_CONSUMER_KEY
    &redirect_uri=https://portal.securit.com/oauth/callback</code></pre>
      <ol class="step-list">
        <li class="step-list__item">The user sees the standard Salesforce login screen.</li>
        <li class="step-list__item">After logging in, they see a prompt: <em>"NodeJS Reporting Portal is asking to access your data."</em> They click <strong>Allow</strong>.</li>
        <li class="step-list__item">Salesforce redirects the browser back to the app with a temporary code: <code>https://portal.securit.com/oauth/callback?code=aPrxwG...</code></li>
      </ol>

      <h2>Step 4: The Token Request (Server-to-Server)</h2>
      <div class="callout callout--warning">
        <p class="callout__title">⚠️ï¸ Secure the Secret</p>
        <p>The Consumer Secret should <strong>never</strong> be exposed in client-side code (like JavaScript in a browser). Step 4 must happen on the Node.js backend server.</p>
      </div>
      <p>The Node.js server takes the <code>code</code> and makes a POST request to Salesforce to exchange it for an Access Token.</p>
      <pre><code>POST https://login.salesforce.com/services/oauth2/token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code
&client_id=YOUR_CONSUMER_KEY
&client_secret=YOUR_CONSUMER_SECRET
&redirect_uri=https://portal.securit.com/oauth/callback
&code=aPrxwG...</code></pre>
      <p>Salesforce responds with JSON containing the keys to the kingdom:</p>
      <pre><code>{
    "access_token": "00Dxx00...xyz",
    "refresh_token": "5Aep861...abc",
    "instance_url": "https://securit.my.salesforce.com",
    "id": "https://login.salesforce.com/id/00D.../005..."
}</code></pre>

      <h2>Step 5: Using the Token</h2>
      <ol class="step-list">
        <li class="step-list__item">The Node.js app stores the <code>access_token</code> and uses it to make API calls to Salesforce.</li>
        <li class="step-list__item">It adds an HTTP header to every request: <code>Authorization: Bearer 00Dxx00...xyz</code>.</li>
        <li class="step-list__item">When the access token expires (usually after 2-24 hours depending on Session Settings), the Node.js app uses the <code>refresh_token</code> to request a new access token without involving the user.</li>
      </ol>
      <div class="callout callout--tip">
        <p class="callout__title">💡 Managing Access</p>
        <p>Users can revoke the app's access at any time by going to their Personal Settings → Advanced User Details → OAuth Connected Apps. Admins can view and revoke access globally via Setup → Connected Apps OAuth Usage.</p>
      </div>
    `
  },

  // ================================================================
  // USE CASE 45
  // ================================================================
  {
    id: 45,
    title: 'FlowOps — Record-Triggered Flow: Asynchronous Paths',
    difficulty: 'Medium',
    category: 'Flow / Automation',
    company: 'FlowOps Logistical',
    subtitle: 'Use Asynchronous Paths in Flow to make external HTTP callouts without holding up the database transaction.',
    tags: ['Record-Triggered Flow', 'Asynchronous Path', 'HTTP Callout', 'External Services', 'DML'],
    description: 'When an Opportunity is Won, FlowOps needs to send the order details to a third-party shipping API. Direct callouts from a standard Flow path fail because they occur during an active database transaction. We implement an Asynchronous Path.',
    learnings: [
      'Understand the "Uncommitted Work Pending" error',
      'Configure an Asynchronous Path in a Record-Triggered Flow',
      'Use External Services or Apex Invocable actions for callouts',
      'Handle potential errors in background processing'
    ],
    content: `
      <h2>Background</h2>
      <p>Salesforce has a strict rule: <strong>You cannot make an HTTP callout if you have pending DML operations (database inserts/updates) in the same transaction.</strong> If an Opportunity is updated to "Closed Won" (DML), and a Flow tries to immediately call an external API, you get the dreaded <code>CalloutException: You have uncommitted work pending.</code></p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → The Setup (External Service) · Step 2 → Create Flow & Set Trigger · Step 3 → Add Asynchronous Path · Step 4 → Add Callout to Async Path · Step 5 → Update Record (Post-Callout)</p>
      </div>

      <h2>Step 1: The Setup (External Service)</h2>
      <ol class="step-list">
        <li class="step-list__item">Assume you have already configured an <strong>External Service</strong> (or an Apex Invocable Method) that handles the API POST to the shipping provider.</li>
        <li class="step-list__item">This makes the callout available as an Action element in Flow Builder.</li>
      </ol>

      <h2>Step 2: Create Flow & Set Trigger</h2>
      <ol class="step-list">
        <li class="step-list__item">Flow Builder → New → Record-Triggered Flow.</li>
        <li class="step-list__item">Object: Opportunity. Trigger: A record is updated.</li>
        <li class="step-list__item">Condition Requirements: <code>StageName = Closed Won</code>.</li>
        <li class="step-list__item">Optimize for: <strong>Actions and Related Records</strong> (After-save).</li>
        <li class="step-list__item">Check: "Only when a record is updated to meet the condition requirements."</li>
      </ol>

      <h2>Step 3: Add the Asynchronous Path</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Asynchronous Path</p>
        <p>An Asynchronous Path separates logic into a completely different transaction that runs in the background <em>after</em> the initial Opportunity save commits to the database. Because the original transaction is closed, you can safely make HTTP callouts.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">On the Start element, click <strong>Add Scheduled Paths (Optional)</strong>.</li>
        <li class="step-list__item">Check the box for <strong>Include a Run Asynchronously path</strong>. (Do not set a time delay; just check the box).</li>
        <li class="step-list__item">The canvas now splits into two paths below the Start node: "Run Immediately" and "Run Asynchronously".</li>
      </ol>

      <h2>Step 4: Add Callout to Async Path</h2>
      <ol class="step-list">
        <li class="step-list__item">On the <strong>Run Asynchronously</strong> path, add an <strong>Action</strong> element.</li>
        <li class="step-list__item">Select your External Service action (e.g., "Create Shipping Order").</li>
        <li class="step-list__item">Pass in variables: <code>{!$Record.Id}</code>, <code>{!$Record.Amount}</code>, etc.</li>
      </ol>
      <div class="callout callout--warning">
        <p class="callout__title">⚠️ï¸ Run Immediately Path</p>
        <p>Leave the "Run Immediately" path blank unless you have other standard Salesforce updates to do (like creating a Task or updating a related Account). DO NOT put the callout here.</p>
      </div>

      <h2>Step 5: Post-Callout Updates</h2>
      <ol class="step-list">
        <li class="step-list__item">After the Callout Action on the Async path, add an <strong>Update Records</strong> element.</li>
        <li class="step-list__item">Update the triggering Opportunity: <code>{!$Record.Shipping_Sync_Status__c} = 'Success'</code> (based on the callout response).</li>
        <li class="step-list__item">Add a Fault Path to the Callout Action. If the API fails, update <code>{!$Record.Shipping_Sync_Status__c} = 'Failed'</code> and create an Error Log record.</li>
      </ol>

      <div class="callout callout--tip">
        <p class="callout__title">💡 Async Path vs Scheduled Path</p>
        <p><strong>Async Path:</strong> Runs as soon as resources are available (usually within seconds). Designed specifically for callouts and heavy processing to avoid limits.<br>
        <strong>Scheduled Path:</strong> Runs at a specific future time (e.g., 3 days after Close Date). Designed for time-based follow-ups.</p>
      </div>
    `
  },

  // ================================================================
  // USE CASE 46
  // ================================================================
  {
    id: 46,
    title: 'DataSync — External Objects (Salesforce Connect)',
    difficulty: 'Expert',
    category: 'Architecture / Integration',
    company: 'DataSync Logistics',
    subtitle: 'Display real-time order data from an external ERP system inside Salesforce without copying the data into standard objects.',
    tags: ['Salesforce Connect', 'External Objects', 'OData', 'Integration', 'Zero-Copy'],
    description: 'DataSync has millions of order records in an SAP ERP. Copying them into Salesforce custom objects would consume massive data storage and create sync headaches. We implement Salesforce Connect and External Objects to view the data virtually.',
    learnings: [
      'Understand the "Zero-Copy" integration pattern',
      'Configure an External Data Source using OData',
      'Sync External Objects (ending in __x)',
      'Create Indirect Lookups to relate External Objects to Standard Objects'
    ],
    content: `
      <h2>Background</h2>
      <p>Data storage in Salesforce is expensive. If users only need to <em>view</em> historical orders (not trigger automations on them), replicating millions of rows is an anti-pattern. <strong>Salesforce Connect</strong> solves this by querying the external database in real-time when the user loads the page.</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → Define External Data Source · Step 2 → Sync External Objects · Step 3 → Create Indirect Lookup · Step 4 → Add to Page Layouts</p>
      </div>

      <h2>Step 1: External Data Source</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — OData Protocol</p>
        <p>Salesforce Connect relies on standard protocols like OData (Open Data Protocol). The external system (ERP) must expose an OData REST API. Salesforce translates SOQL queries into OData HTTP requests on the fly.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Setup → External Data Sources → New.</li>
        <li class="step-list__item">Label: "SAP Orders". Name: <code>SAP_Orders</code>.</li>
        <li class="step-list__item">Type: <strong>Salesforce Connect: OData 4.0</strong>.</li>
        <li class="step-list__item">URL: <code>https://api.datasync.com/odata/v4/</code> (The base URL of the external API).</li>
        <li class="step-list__item">Authentication: Set to Named Principal or Per User (usually OAuth 2.0).</li>
        <li class="step-list__item">Click Save.</li>
      </ol>

      <h2>Step 2: Validate and Sync</h2>
      <ol class="step-list">
        <li class="step-list__item">On the SAP Orders Data Source page, click <strong>Validate and Sync</strong>.</li>
        <li class="step-list__item">Salesforce calls the OData metadata endpoint and discovers the tables available in the ERP.</li>
        <li class="step-list__item">Check the box next to the "Orders" table and click <strong>Sync</strong>.</li>
        <li class="step-list__item">Salesforce automatically creates an <strong>External Object</strong> called <code>Orders__x</code> and maps the external columns to custom fields (e.g., <code>Order_Total__c</code>, <code>Order_Date__c</code>).</li>
      </ol>

      <h2>Step 3: Relate External Data (Indirect Lookup)</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Indirect vs External Lookups</p>
        <p><strong>External Lookup:</strong> Links an External Object to another External Object.<br>
        <strong>Indirect Lookup:</strong> Links an External Object to a Standard/Custom Salesforce object, matching an External ID field (because the external data doesn't know Salesforce 18-char IDs).</p>
      </div>
      <p>We want the ERP Order to show up as a Related List on the Salesforce Account.</p>
      <ol class="step-list">
        <li class="step-list__item">Ensure the Salesforce Account object has an External ID field (e.g., <code>ERP_Customer_ID__c</code>) that matches the ERP's customer ID.</li>
        <li class="step-list__item">Go to Object Manager → <code>Orders__x</code> → Fields → New.</li>
        <li class="step-list__item">Type: <strong>Indirect Lookup Relationship</strong>.</li>
        <li class="step-list__item">Related To: Account.</li>
        <li class="step-list__item">Target Field: <code>ERP_Customer_ID__c</code>.</li>
        <li class="step-list__item">Map it to the External Object field that contains the customer ID (e.g., <code>CustomerID__c</code>).</li>
      </ol>

      <h2>Step 4: View in the UI</h2>
      <ol class="step-list">
        <li class="step-list__item">Go to the Account Page Layout.</li>
        <li class="step-list__item">Add the "Orders" related list.</li>
        <li class="step-list__item">When a user opens an Account, Salesforce makes a real-time OData call: <code>GET /Orders?$filter=CustomerID eq '12345'</code>.</li>
        <li class="step-list__item">The orders appear in the related list exactly like native records, but consume 0 bytes of Salesforce database storage.</li>
      </ol>

      <div class="callout callout--warning">
        <p class="callout__title">⚠️ï¸ Limitations of External Objects</p>
        <p>Because the data isn't in Salesforce, you <strong>cannot</strong>: Use them in Rollup Summary fields, trigger Flows/Apex off them, or use complex SOQL joins. They are best for display and reporting.</p>
      </div>
    `
  },

  // ================================================================
  // USE CASE 47
  // ================================================================
  {
    id: 47,
    title: 'SpeedySales — High-Volume Data: Platform Cache',
    difficulty: 'Hard',
    category: 'Apex / Advanced',
    company: 'SpeedySales E-Commerce',
    subtitle: 'Optimize Lightning Component performance and reduce SOQL queries by implementing Salesforce Platform Cache.',
    tags: ['Platform Cache', 'Apex', 'Performance', 'Limits', 'SOQL Optimization'],
    description: 'SpeedySales has a custom product catalog LWC that queries 1,000 Product records every time any user loads the home page. This causes slow load times and hits SOQL limits. We implement Org Cache to store the results in memory.',
    learnings: [
      'Understand the difference between Org Cache and Session Cache',
      'Configure Cache Partitions in Setup',
      'Implement Cache.Org.get() and Cache.Org.put() in Apex',
      'Design a cache-miss fallback pattern'
    ],
    content: `
      <h2>Background</h2>
      <p>Querying the database is slow and consumes governor limits. If data changes infrequently (like a Product Catalog) but is read constantly, it should be stored in RAM. <strong>Salesforce Platform Cache</strong> provides this in-memory layer (similar to Redis).</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → Allocate Cache Partitions · Step 2 → The Cache-Miss Pattern · Step 3 → Implement in Apex</p>
      </div>

      <h2>Step 1: Allocate Cache Partitions</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Org vs Session Cache</p>
        <p><strong>Org Cache:</strong> Shared across all users in the org. Best for global data (product catalogs, exchange rates, zip code mappings).<br>
        <strong>Session Cache:</strong> Specific to a single logged-in user. Best for user-specific state (shopping cart items, wizard progress).</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Setup → Platform Cache → Partitions → New.</li>
        <li class="step-list__item">Label: "CatalogPartition". API Name: <code>local.CatalogPartition</code>.</li>
        <li class="step-list__item">Allocate capacity: Set Org Cache Allocation to 5 MB (if you have capacity available). Leave Session Cache at 0.</li>
        <li class="step-list__item">Click Save.</li>
      </ol>

      <h2>Step 2: The Cache-Miss Pattern</h2>
      <p>You can never guarantee data is in the cache (it might have expired or been evicted). Your code must always attempt to fetch from cache, and if it fails (a "cache miss"), query the database, store it in the cache, and then return the data.</p>

      <h2>Step 3: Implement in Apex</h2>
      <pre><code>public class ProductCatalogController {
    
    @AuraEnabled(cacheable=true)
    public static List&lt;Product2&gt; getActiveProducts() {
        
        // 1. Define the cache key (PartitionName.KeyName)
        String cacheKey = 'local.CatalogPartition.ActiveProducts';
        
        // 2. Attempt to retrieve from cache
        List&lt;Product2&gt; cachedProducts = (List&lt;Product2&gt;) Cache.Org.get(cacheKey);
        
        // 3. Cache Hit
        if (cachedProducts != null) {
            System.debug('Fetched from Cache!');
            return cachedProducts;
        }
        
        // 4. Cache Miss - Query the Database
        System.debug('Cache miss. Querying DB...');
        List&lt;Product2&gt; dbProducts = [
            SELECT Id, Name, ProductCode, Description 
            FROM Product2 
            WHERE IsActive = true 
            LIMIT 1000
        ];
        
        // 5. Store in cache for next time (Time to Live = 86400 secs / 24 hours)
        Cache.Org.put(cacheKey, dbProducts, 86400);
        
        return dbProducts;
    }
}</code></pre>

      <div class="callout callout--tip">
        <p class="callout__title">💡 Cache Invalidation</p>
        <p>What if someone adds a new Product? The cache will hold stale data for 24 hours. You must write a Trigger on Product2 that calls <code>Cache.Org.remove('local.CatalogPartition.ActiveProducts')</code> whenever a product is inserted/updated. The next user will experience a cache miss, and the cache will refresh with the new data.</p>
      </div>
    `
  },

  // ================================================================
  // USE CASE 48
  // ================================================================
  {
    id: 48,
    title: 'MobileMax — Salesforce Mobile App & Publisher Actions',
    difficulty: 'Easy',
    category: 'Mobile / UI',
    company: 'MobileMax Field Sales',
    subtitle: 'Optimize the Salesforce Mobile App experience by configuring Mobile Navigation and Global Quick Actions.',
    tags: ['Mobile App', 'Quick Actions', 'Page Layouts', 'Compact Layouts'],
    description: 'MobileMax field reps complain the Salesforce mobile app is too cluttered. They just want to quickly log a call, create a Lead, and see key Account fields without scrolling. We optimize the mobile experience using Publisher Actions and Compact Layouts.',
    learnings: [
      'Configure the Salesforce Mobile App navigation menu',
      'Create and assign Global Quick Actions (Publisher Actions)',
      'Optimize Compact Layouts for mobile highlights',
      'Differentiate between Global vs Object-Specific Actions'
    ],
    content: `
      <h2>Background</h2>
      <p>The Salesforce Mobile App uses the exact same metadata (objects, fields, layouts) as the desktop Lightning Experience, but renders it differently. A dense desktop layout is terrible on a phone. We must explicitly optimize the mobile UI.</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → Mobile Navigation · Step 2 → Compact Layouts · Step 3 → Global Quick Actions · Step 4 → Object-Specific Actions</p>
      </div>

      <h2>Step 1: Mobile Navigation Menu</h2>
      <ol class="step-list">
        <li class="step-list__item">Setup → Salesforce Navigation.</li>
        <li class="step-list__item">The mobile app groups items into standard apps. Ensure the reps are using a specific Lightning App (e.g., "Field Sales").</li>
        <li class="step-list__item">Go to App Manager → Field Sales → Edit. Under Navigation Items, ensure only the most critical tabs (Accounts, Contacts, Leads, Dashboards) are included. The mobile app honors this app navigation.</li>
      </ol>

      <h2>Step 2: Compact Layouts (The Highlight Panel)</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Compact Layouts</p>
        <p>On desktop, the Compact Layout drives the Highlights Panel at the top of the record. On mobile, it drives the record header AND the list view card fields. You can only show up to 10 fields, and the first 4 are the most prominent.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Object Manager → Account → Compact Layouts → New.</li>
        <li class="step-list__item">Name: "Mobile Account Highlight".</li>
        <li class="step-list__item">Select fields: Account Name, Phone, Billing City, Annual Revenue.</li>
        <li class="step-list__item">Click Compact Layout Assignment → Set this layout as the primary.</li>
        <li class="step-list__item">When reps open an Account on their phone, Phone and City are instantly visible without scrolling.</li>
      </ol>

      <h2>Step 3: Global Quick Actions</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Global vs Object-Specific Actions</p>
        <p><strong>Global Actions:</strong> Accessed from the "+" button at the bottom of the mobile app. They create records with no relationship to the current page (e.g., "New Lead").<br>
        <strong>Object-Specific Actions:</strong> Accessed from a specific record page. They automatically link to that record (e.g., "Log a Call" on an Account automatically links the task to that Account).</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Setup → Global Actions → New Action.</li>
        <li class="step-list__item">Action Type: <strong>Create a Record</strong>. Target Object: <strong>Lead</strong>. Label: "Quick Lead".</li>
        <li class="step-list__item">Edit the Action Layout: Remove all fields except First Name, Last Name, Company, and Phone. (Mobile actions should be FAST).</li>
        <li class="step-list__item">Setup → Publisher Layouts → Edit the Global Layout.</li>
        <li class="step-list__item">Drag "Quick Lead" into the "Salesforce Mobile and Lightning Experience Actions" section. Move it to the very front so it's the first button reps see.</li>
      </ol>

      <h2>Step 4: Object-Specific Actions</h2>
      <ol class="step-list">
        <li class="step-list__item">Object Manager → Account → Buttons, Links, and Actions → New Action.</li>
        <li class="step-list__item">Action Type: <strong>Log a Call</strong>. Label: "Log Field Visit".</li>
        <li class="step-list__item">Predefined Field Values: Set <code>Subject</code> = "Field Visit", <code>Status</code> = "Completed". This saves the rep clicks.</li>
        <li class="step-list__item">Go to Account Page Layouts. Add "Log Field Visit" to the Mobile Actions section.</li>
      </ol>
      <div class="callout callout--tip">
        <p class="callout__title">💡 Mobile Optimization Rule</p>
        <p>If a user has to scroll down more than two swipes on their phone to complete their core job task, your mobile design has failed. Use Actions to bring data entry to the surface.</p>
      </div>
    `
  },

  // ================================================================
  // USE CASE 49
  // ================================================================
  {
    id: 49,
    title: 'AppExchange — Managed Packages & LMA',
    difficulty: 'Expert',
    category: 'Architecture / ISV',
    company: 'SaaS Innovators',
    subtitle: 'Package a custom application for the AppExchange and understand the License Management App (LMA).',
    tags: ['AppExchange', 'Managed Packages', 'ISV', 'LMA', 'Namespaces'],
    description: 'SaaS Innovators built a project management tool inside Salesforce. They want to sell it on the AppExchange. We configure a Developer Edition org, define a Namespace, create a Managed Package, and prepare for Security Review.',
    learnings: [
      'Understand the difference between Unmanaged and Managed Packages',
      'Register a Namespace Prefix',
      'Create and upload a Managed Package',
      'Understand the License Management Application (LMA) for ISVs'
    ],
    content: `
      <h2>Background</h2>
      <p>Building for a single org is "Enterprise Development." Building an app to sell to thousands of other orgs is "ISV (Independent Software Vendor) Development." ISV apps are distributed via the AppExchange using <strong>Managed Packages</strong>.</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → Dev Edition & Namespace · Step 2 → Package Manager · Step 3 → Upload & Versioning · Step 4 → The LMA · Step 5 → Security Review</p>
      </div>

      <h2>Step 1: Namespaces</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Namespace Prefix</p>
        <p>A Namespace is a unique 1-15 character string (e.g., <code>saas_proj</code>) prepended to all your components (<code>saas_proj__Project__c</code>). This prevents your custom object from colliding with a custom object named <code>Project__c</code> that the customer might have already built in their org.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Sign up for a Partner Developer Edition org (Pdo).</li>
        <li class="step-list__item">Setup → Package Manager → Developer Settings → Edit.</li>
        <li class="step-list__item">Register a unique namespace. <strong>This cannot be changed or undone once set.</strong></li>
        <li class="step-list__item">All API names in the org are automatically updated to include the prefix.</li>
      </ol>

      <h2>Step 2: Create the Managed Package</h2>
      <div class="callout callout--warning">
        <p class="callout__title">⚠️ï¸ Managed vs Unmanaged</p>
        <p><strong>Unmanaged:</strong> Open source. Code can be edited by the customer. Cannot be upgraded. No IP protection.<br>
        <strong>Managed:</strong> Locked down. Apex code is hidden (IP protection). Can be pushed and upgraded seamlessly. Requires a namespace.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Setup → Package Manager → New.</li>
        <li class="step-list__item">Name: "ProjManage Pro". Select <strong>Managed</strong>.</li>
        <li class="step-list__item">Click Add Components. Add the main Custom App or tab; Salesforce automatically pulls in dependent objects, fields, and classes.</li>
      </ol>

      <h2>Step 3: Upload & Versioning</h2>
      <ol class="step-list">
        <li class="step-list__item">Click <strong>Upload</strong>.</li>
        <li class="step-list__item">Version Name: "Summer Release". Version Number: <code>1.0</code>.</li>
        <li class="step-list__item">Salesforce compiles the code and generates an installation URL (e.g., <code>login.salesforce.com/packaging/installPackage.apexp?p0=04t...</code>).</li>
        <li class="step-list__item">You give this URL to customers, or link it to your AppExchange listing.</li>
        <li class="step-list__item">When you fix a bug, you create a new version (<code>1.1</code>) and can use "Push Upgrades" to force-update all customer orgs simultaneously.</li>
      </ol>

      <h2>Step 4: The License Management App (LMA)</h2>
      <p>How do you charge money for this? How do you cut off access if they stop paying?</p>
      <ol class="step-list">
        <li class="step-list__item">As an ISV partner, you get a special Salesforce org (Environment Hub/PBO).</li>
        <li class="step-list__item">You install the <strong>License Management App (LMA)</strong> into this org.</li>
        <li class="step-list__item">When a customer installs your package, a <code>License__c</code> record is automatically created in your LMA org.</li>
        <li class="step-list__item">You edit this record to set Status = "Active", Seats = "50", Expiration = "12/31/2025".</li>
        <li class="step-list__item">Salesforce infrastructure enforces these limits in the customer's org automatically.</li>
      </ol>

      <h2>Step 5: Security Review</h2>
      <ol class="step-list">
        <li class="step-list__item">Before listing on the AppExchange, Salesforce engineers run automated and manual penetration tests on your code.</li>
        <li class="step-list__item">They check for SOQL injection, Cross-Site Scripting (XSS), and CRUD/FLS enforcement (ensuring your Apex respects the customer's field-level security settings).</li>
        <li class="step-list__item">Passing this review is mandatory and proves your app is enterprise-ready.</li>
      </ol>
    `
  },

  // ================================================================
  // USE CASE 50
  // ================================================================
  {
    id: 50,
    title: 'FutureProof — LWC: Lightning Message Service (LMS)',
    difficulty: 'Hard',
    category: 'LWC / Advanced',
    company: 'FutureProof Components',
    subtitle: 'Communicate between decoupled Lightning Web Components, Aura Components, and Visualforce pages using LMS.',
    tags: ['LWC', 'LMS', 'Lightning Message Service', 'Pub/Sub', 'Component Communication'],
    description: 'FutureProof has a complex page with a custom LWC product filter on the left, an Aura list component in the middle, and a Visualforce legacy map on the right. They need to talk to each other without parent-child DOM relationships. We implement Lightning Message Service.',
    learnings: [
      'Understand the limitations of standard CustomEvents (DOM bubbling)',
      'Create a Lightning Message Channel (XML)',
      'Publish messages from an LWC',
      'Subscribe to messages in LWC and Aura components'
    ],
    content: `
      <h2>Background</h2>
      <p>If Component A is the parent of Component B, they communicate via <code>@api</code> properties (down) and <code>CustomEvent</code> (up). But what if Component A and Component C sit side-by-side on a Lightning Page with no parent? Standard events cannot cross this boundary. <strong>Lightning Message Service (LMS)</strong> is a publish-subscribe (pub/sub) model that works across the entire page, and even bridges LWC, Aura, and Visualforce.</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → Create the Message Channel · Step 2 → The Publisher LWC · Step 3 → The Subscriber LWC · Step 4 → The Subscriber Aura Component</p>
      </div>

      <h2>Step 1: Create the Message Channel</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Message Channels</p>
        <p>A Message Channel is a metadata artifact (XML file) deployed to the org. It acts as the central radio frequency that publishers broadcast on and subscribers listen to.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">In VS Code, navigate to <code>force-app/main/default/messageChannels</code>.</li>
        <li class="step-list__item">Create file: <code>ProductSelected.messageChannel-meta.xml</code>.</li>
      </ol>
      <pre><code>&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;LightningMessageChannel xmlns="http://soap.sforce.com/2006/04/metadata"&gt;
    &lt;masterLabel&gt;ProductSelected&lt;/masterLabel&gt;
    &lt;isExposed&gt;true&lt;/isExposed&gt;
    &lt;description&gt;Fires when a user clicks a product in the list.&lt;/description&gt;
    &lt;lightningMessageFields&gt;
        &lt;fieldName&gt;productId&lt;/fieldName&gt;
        &lt;description&gt;The Salesforce ID of the product&lt;/description&gt;
    &lt;/lightningMessageFields&gt;
&lt;/LightningMessageChannel&gt;</code></pre>
      <ol class="step-list" start="3">
        <li class="step-list__item">Deploy this file to the org.</li>
      </ol>

      <h2>Step 2: The Publisher LWC</h2>
      <p>This component has a list of products. When a user clicks one, it broadcasts the ID.</p>
      <pre><code>// productList.js
import { LightningElement, wire } from 'lwc';
// 1. Import LMS features
import { publish, MessageContext } from 'lightning/messageService';
// 2. Import the specific channel
import PRODUCT_SELECTED_CHANNEL from '@salesforce/messageChannel/ProductSelected__c';

export default class ProductList extends LightningElement {
    
    // 3. Get context for LMS
    @wire(MessageContext)
    messageContext;

    handleProductClick(event) {
        const selectedId = event.target.dataset.id;
        
        // 4. Create the payload matching the XML fields
        const payload = { productId: selectedId };
        
        // 5. Publish!
        publish(this.messageContext, PRODUCT_SELECTED_CHANNEL, payload);
    }
}</code></pre>

      <h2>Step 3: The Subscriber LWC</h2>
      <p>This component sits across the page and listens for the broadcast.</p>
      <pre><code>// productDetails.js
import { LightningElement, wire } from 'lwc';
import { subscribe, unsubscribe, MessageContext } from 'lightning/messageService';
import PRODUCT_SELECTED_CHANNEL from '@salesforce/messageChannel/ProductSelected__c';

export default class ProductDetails extends LightningElement {
    subscription = null;
    currentProductId;

    @wire(MessageContext)
    messageContext;

    // Subscribe when component is inserted into DOM
    connectedCallback() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                PRODUCT_SELECTED_CHANNEL,
                (message) =&gt; this.handleMessage(message)
            );
        }
    }

    // Always clean up to prevent memory leaks!
    disconnectedCallback() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    handleMessage(message) {
        this.currentProductId = message.productId;
        // Logic to fetch new product details...
    }
}</code></pre>

      <h2>Step 4: The Subscriber Aura Component</h2>
      <p>Aura can listen to the exact same channel natively using the <code>&lt;lightning:messageChannel&gt;</code> tag.</p>
      <pre><code>&lt;!-- legacyMap.cmp --&gt;
&lt;aura:component&gt;
    &lt;aura:attribute name="targetId" type="String"/&gt;

    &lt;!-- Include the channel and define the handler --&gt;
    &lt;lightning:messageChannel type="ProductSelected__c" 
                              onMessage="{!c.handleLmsMessage}"/&gt;

    &lt;div&gt;Map for Product: {!v.targetId}&lt;/div&gt;
&lt;/aura:component&gt;</code></pre>
      <pre><code>// legacyMapController.js
({
    handleLmsMessage : function(component, message, helper) {
        if (message != null && message.getParam("productId") != null) {
            component.set("v.targetId", message.getParam("productId"));
            // Update map logic...
        }
    }
})</code></pre>

      <div class="callout callout--tip">
        <p class="callout__title">💡 LMS vs pubsub.js</p>
        <p>In the early days of LWC, developers used a custom utility called <code>pubsub.js</code> to achieve this. <strong>LMS</strong> is the official, native replacement. You should migrate all legacy pubsub.js implementations to LMS, as LMS is faster, officially supported, and works across component frameworks.</p>
      </div>
    `
  }

];
