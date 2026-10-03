const fs = require('fs');

// Helper to expand terse format to full objects
const ex = (list) => list.map(q => ({
  type: 'mcq',
  question: q[0],
  options: [q[1], q[2], q[3], q[4]],
  correct: q[5],
  explanation: q[6]
}));

const mod1Easy = ex([
  ['What does CRM stand for?', 'Customer Relationship Management', 'Cloud Resource Manager', 'Client Relational Model', 'Customer Retention Manager', 0, 'CRM is Customer Relationship Management.'],
  ['Which deployment model does Salesforce use?', 'On-premise', 'SaaS', 'IaaS', 'PaaS', 1, 'Salesforce primarily provides Software as a Service (SaaS).'],
  ['What is the App Launcher?', 'Grid icon to switch apps', 'Tool to build apps', 'Data loader', 'Sandbox', 0, 'App Launcher lets users navigate between Salesforce apps.'],
  ['How many major releases does Salesforce have per year?', '1', '2', '3', '4', 2, 'Salesforce has 3 releases: Spring, Summer, Winter.'],
  ['Which object represents a business or organization?', 'Contact', 'Opportunity', 'Lead', 'Account', 3, 'Accounts store information about businesses.'],
  ['Which object represents an individual person?', 'Account', 'Opportunity', 'Contact', 'Case', 2, 'Contacts represent people associated with Accounts.'],
  ['What is a Lead?', 'A closed deal', 'A potential customer', 'A support ticket', 'A product', 1, 'Leads represent potential customers or prospects.'],
  ['What happens when a Lead is converted?', 'It is deleted', 'It becomes an Account, Contact, and optional Opportunity', 'It becomes a Case', 'It is archived', 1, 'Lead conversion creates an Account, Contact, and optionally an Opportunity.'],
  ['What is an Opportunity?', 'A support issue', 'A potential sale or deal', 'A marketing campaign', 'A user profile', 1, 'Opportunities track sales deals.'],
  ['What is a Case?', 'A sales deal', 'A customer feedback issue or support ticket', 'A marketing email', 'A custom object', 1, 'Cases track customer support issues.']
]);

const mod1Medium = ex([
  ['What is the maximum number of Master-Detail relationships an object can have?', '1', '2', '3', 'Unlimited', 1, 'An object can have up to 2 Master-Detail relationships (junction object).'],
  ['In a Master-Detail relationship, what happens to the child when the parent is deleted?', 'Child becomes an orphan', 'Child is deleted (Cascade Delete)', 'Error is thrown', 'Child is reassigned', 1, 'Master-Detail enforces cascade deletion.'],
  ['Can a Lookup relationship field be required?', 'Yes', 'No', 'Only on standard objects', 'Only on custom objects', 0, 'Yes, lookup fields can be made required.'],
  ['What is a Roll-Up Summary field?', 'Calculates values from related child records', 'Summarizes text fields', 'Creates a report', 'Summarizes data across unrelated objects', 0, 'Roll-up summaries calculate min/max/sum/count of child records in a Master-Detail relationship.'],
  ['Where can you create a Roll-Up Summary field?', 'On any object', 'On the child object in a Lookup', 'On the master object in a Master-Detail', 'On the child object in a Master-Detail', 2, 'Roll-up summaries must be on the master object.'],
  ['What is Schema Builder?', 'A tool for writing Apex', 'A visual tool for data modeling', 'A data import tool', 'A report builder', 1, 'Schema Builder provides a visual canvas for objects and relationships.'],
  ['Which suffix denotes a custom object?', '__c', '__r', '__x', '__s', 0, 'Custom objects and fields end in __c.'],
  ['What is a junction object?', 'An object with two lookups', 'An object with two master-detail relationships', 'A standard object', 'An external object', 1, 'Junction objects model many-to-many relationships.'],
  ['What is the Data Import Wizard?', 'Tool to import 5M records', 'Tool to import 50,000 records', 'Tool to write Apex', 'Tool for exporting only', 1, 'Import Wizard handles up to 50,000 records.'],
  ['What is an External ID?', 'A unique ID from another system used for matching', 'A Salesforce generated ID', 'A URL field', 'A password field', 0, 'External IDs are used for upserts from external systems.'],
  ['What field type automatically numbers records?', 'Auto Number', 'Formula', 'Roll-up', 'Number', 0, 'Auto Number generates sequential numbers.'],
  ['Which relationship is exclusive to the User object?', 'Lookup', 'Master-Detail', 'Hierarchical', 'External', 2, 'Hierarchical relationships are only on the User object.'],
  ['Can standard objects be on the detail side of a Master-Detail relationship?', 'Yes', 'No', 'Only Account', 'Only Contact', 1, 'Standard objects cannot be the detail in a Master-Detail relationship.'],
  ['What is a cross-object formula?', 'A formula that references fields on a related parent object', 'A formula that updates child records', 'A formula in a report', 'A formula that calls an API', 0, 'Cross-object formulas can span up to 10 relationships upwards.'],
  ['What is a Picklist?', 'A text field', 'A multi-select checkbox', 'A drop-down list of options', 'A lookup to another object', 2, 'Picklists provide predefined options.']
]);

const mod1Hard = ex([
  ['How many external IDs can an object have?', '1', '3', '7', '25', 3, 'Objects can have up to 25 External ID fields.'],
  ['What is the maximum number of custom fields per object in Enterprise Edition?', '100', '500', '800', '900', 1, 'Enterprise Edition allows 500 custom fields per object.'],
  ['Which data type is not supported in a Formula field?', 'Text', 'Number', 'Long Text Area', 'Date', 2, 'Long Text Area, Rich Text Area, and Encrypted fields cannot be used in formulas.'],
  ['What is the limit of cross-object formula relationships?', '5', '10', '15', '20', 1, 'Cross-object formulas can span up to 10 relationships away.'],
  ['If a user converts a lead, what happens to the lead\'s custom fields?', 'They are lost', 'They must be mapped to Account, Contact, or Opportunity custom fields', 'They auto-map to standard fields', 'They remain on the Lead object only', 1, 'You must map custom Lead fields to custom fields on the target objects.'],
  ['What is a polymorphic relationship?', 'A relationship to multiple object types (e.g. WhatId)', 'A junction object', 'A master-detail', 'A self-lookup', 0, 'Polymorphic fields like WhatId (Related To) can look up to an Account, Opportunity, Campaign, etc.'],
  ['Can you change a Master-Detail to a Lookup?', 'No', 'Yes, always', 'Yes, if no roll-up summaries exist on the master', 'Yes, if the child has no records', 2, 'You can convert Master-Detail to Lookup only if there are no roll-up summaries on the master.'],
  ['What is the default record access for a detail record in Master-Detail?', 'Private', 'Public Read/Write', 'Controlled by Parent', 'Public Read Only', 2, 'Detail records inherit the security (Controlled by Parent).'],
  ['Can a child record in a Master-Detail be reparented?', 'No, never', 'Yes, if the "Allow reparenting" option is checked', 'Yes, by default', 'Only by admins', 1, 'Reparenting is allowed only if the option is checked on the relationship field.'],
  ['What is a Dependent Picklist?', 'A picklist whose values depend on another field', 'A picklist that requires a value', 'A global picklist', 'A multi-select picklist', 0, 'Dependent picklists filter their values based on a Controlling field.'],
  ['Which of these can be a Controlling field but NOT a Dependent field?', 'Standard Picklist', 'Custom Picklist', 'Checkbox', 'Multi-select Picklist', 2, 'Checkboxes can control picklists, but cannot be dependent themselves.'],
  ['What happens to a junction object record if ONE of its master records is deleted?', 'Nothing', 'The other master is deleted', 'The junction record is deleted', 'It becomes a lookup', 2, 'If either master is deleted, the junction record is deleted.'],
  ['Which tool is required to hard-delete records?', 'Import Wizard', 'Data Loader', 'Reports', 'List Views', 1, 'Data Loader supports Hard Delete (bypassing the Recycle Bin) via the Bulk API.'],
  ['How long do records stay in the Recycle Bin?', '15 days', '30 days', '60 days', '90 days', 0, 'Records stay in the Recycle Bin for 15 days before permanent deletion.'],
  ['What is an External Object?', 'An object that stores data in Salesforce but is visible outside', 'An object that maps to data stored outside Salesforce', 'A custom object with an external ID', 'A managed package object', 1, 'External objects (ending in __x) map to data stored outside Salesforce via Salesforce Connect.'],
  ['Can you create a Roll-up Summary field on a Lookup relationship?', 'Yes', 'No', 'Only via Flow', 'Only via Apex', 1, 'Roll-up summaries require a Master-Detail relationship.'],
  ['What is the maximum number of Roll-up summary fields per object?', '10', '25', '40', '100', 2, 'You can create up to 40 roll-up summary fields per object.'],
  ['What is Field History Tracking?', 'Tracks login history', 'Tracks changes to field values (old and new)', 'Tracks field creation', 'Tracks Apex usage', 1, 'Tracks up to 20 fields per object for value changes.'],
  ['How many fields can you track with Field History Tracking per object?', '10', '20', '50', '100', 1, 'You can track up to 20 fields per object (without purchasing Field Audit Trail).'],
  ['What is the VLOOKUP function used for in Salesforce?', 'Searching records globally', 'Validating data against a custom object in validation rules', 'Reporting', 'Flow lookups', 1, 'VLOOKUP is used in Validation Rules to check values against a custom object.']
]);

// We will construct mod2, mod3, mod4 similarly and write them to quizzes.js
const mod2Easy = ex([
  ['What is a Profile?', 'Controls object and field permissions', 'Controls record visibility', 'A user photo', 'A role', 0, 'Profiles control CRUD access to objects.'],
  ['What is a Role?', 'Controls record visibility via hierarchy', 'Controls field permissions', 'A job title', 'A permission set', 0, 'Roles open up record-level access.'],
  ['What is OWD?', 'Organization-Wide Defaults', 'Object-Wide Defaults', 'Open-Wide Defaults', 'Owner-Wide Defaults', 0, 'OWD sets the baseline record access.'],
  ['If OWD is Private, who sees the record?', 'Everyone', 'Only the owner and superiors in hierarchy', 'Only admins', 'Nobody', 1, 'Private means only the owner and hierarchy superiors can access it.'],
  ['What do Sharing Rules do?', 'Restrict access', 'Open up access horizontally', 'Change profiles', 'Delete records', 1, 'Sharing rules grant access to groups or roles.'],
  ['What is a Permission Set?', 'Restricts access', 'Grants additional access beyond the profile', 'Replaces a profile', 'A group of users', 1, 'Permission Sets extend access.'],
  ['Can a user have multiple Profiles?', 'Yes', 'No', 'Only admins', 'Only with permission sets', 1, 'A user can only have ONE profile.'],
  ['Can a user have multiple Permission Sets?', 'Yes', 'No', 'Only admins', 'Maximum 2', 0, 'Users can have multiple permission sets.'],
  ['What is a Validation Rule?', 'Ensures data meets criteria before saving', 'Deletes bad data', 'Updates fields automatically', 'Sends emails', 0, 'Validation rules block saves if criteria are not met.'],
  ['What is a Page Layout?', 'Controls UI fields, sections, and buttons', 'Controls OWD', 'Controls data storage', 'A visualforce page', 0, 'Page Layouts control the UI arrangement of fields.']
]);

const mod2Medium = ex([
  ['Which automation tool is Salesforce retiring?', 'Flow', 'Workflow Rules & Process Builder', 'Apex', 'Approvals', 1, 'Workflow Rules and Process Builder are being retired in favor of Flow.'],
  ['What type of Flow runs when a user clicks a button?', 'Record-Triggered', 'Schedule-Triggered', 'Screen Flow', 'Platform Event', 2, 'Screen Flows guide users through a UI.'],
  ['Which Flow type replaces Before Triggers?', 'After-Save Record-Triggered Flow', 'Before-Save Record-Triggered Flow', 'Screen Flow', 'Schedule Flow', 1, 'Before-Save flows are fast and update the triggering record.'],
  ['What is the correct order of execution?', 'Validation -> Triggers -> Flow', 'Before Triggers -> Validation -> After Triggers -> Flow', 'Flow -> Validation -> Triggers', 'Validation -> Flow -> Triggers', 1, 'Before Triggers -> Validation -> After Triggers -> Flow.'],
  ['What is an Approval Process?', 'A flow that approves data', 'A process that routes records for sign-off and locks them', 'A validation rule', 'A sharing rule', 1, 'Approval processes lock records and route them to approvers.'],
  ['What is a dynamic dashboard?', 'A dashboard that changes colors', 'A dashboard that runs as the logged-in user', 'An animated dashboard', 'A scheduled dashboard', 1, 'Dynamic dashboards show data based on the viewing user\'s permissions.'],
  ['Can you schedule a dashboard refresh?', 'Yes', 'No', 'Only in Classic', 'Only via Apex', 0, 'Dashboards can be scheduled for automatic refresh.'],
  ['What is Field-Level Security (FLS)?', 'Hides fields on page layouts', 'Restricts access to fields across the entire platform', 'Encrypts fields', 'Locks fields from deletion', 1, 'FLS is enforced at the database level, unlike page layouts.'],
  ['What does Login IP Ranges on a Profile do?', 'Restricts login to specific IP addresses', 'Sends an alert if outside IP', 'Requires MFA', 'Nothing', 0, 'If a user logs in outside the profile IP range, they are denied access.'],
  ['What does Network Access (Trusted IP Ranges) do?', 'Denies login outside range', 'Bypasses identity verification (MFA/OTP) for those IPs', 'Restricts API access', 'Allows guest access', 1, 'Trusted IPs don\'t block login; they just bypass the email/SMS verification code step.'],
  ['What is a Public Group?', 'A group of external users', 'A collection of users, roles, or other groups for sharing', 'A chat room', 'A queue', 1, 'Public Groups are used in sharing rules.'],
  ['What is a Queue?', 'A list of users', 'A holding area for unassigned records (like Cases or Leads)', 'A public group', 'A dashboard', 1, 'Queues own records until a user takes ownership.'],
  ['Which object CANNOT have a Queue?', 'Lead', 'Case', 'Custom Object', 'Opportunity', 3, 'Opportunities cannot be owned by a Queue.'],
  ['What is a Custom Report Type?', 'A report with charts', 'Defines the set of records and fields available to a report', 'A scheduled report', 'An exported report', 1, 'Custom report types define relationships and available fields.'],
  ['What is the maximum number of components on a Dashboard?', '10', '15', '20', '25', 2, 'A dashboard can have up to 20 components.']
]);

const mod2Hard = ex([
  ['What happens if a user is assigned a Profile with Object Read access, but FLS hides a field?', 'They see the field', 'They do not see the field', 'Error occurs', 'FLS is overridden', 1, 'The most restrictive setting applies (FLS hides it).'],
  ['What is Muting in Permission Set Groups?', 'Disables audio', 'Allows removing specific permissions from the group', 'Deletes the permission set', 'Hides the group', 1, 'Muting permission sets allow you to subtract permissions from a group.'],
  ['What is Manual Sharing?', 'Sharing a record using the Share button', 'Sharing a password', 'Exporting data', 'Emailing a record', 0, 'Users can manually share records they own.'],
  ['Can you manually share a record if OWD is Public Read/Write?', 'Yes', 'No', 'Only admins can', 'Only via Apex', 1, 'If OWD is Public Read/Write, everyone already has access; manual sharing is redundant/hidden.'],
  ['What is a Criteria-Based Sharing Rule?', 'Shares records based on field values', 'Shares records based on ownership', 'Shares records based on roles', 'Shares records based on profiles', 0, 'Criteria-based sharing evaluates fields (e.g., Industry = Technology).'],
  ['Which flow element should NEVER be inside a loop?', 'Decision', 'Assignment', 'Update Records', 'Action', 2, 'DML elements (Update/Create) inside a loop cause governor limit errors.'],
  ['What is a Pause element in Flow?', 'Stops the flow permanently', 'Pauses the flow until a specific time or event', 'Throws an error', 'Waits for user input', 1, 'Pause (Wait) elements suspend the flow and resume later.'],
  ['Can an Auto-Launched Flow have screens?', 'Yes', 'No', 'Only in Lightning', 'Only in Classic', 1, 'Auto-launched flows run in the background and cannot have UI.'],
  ['What is a Scheduled Action in Process Builder?', 'An action that runs later', 'An immediate action', 'A deleted action', 'An error action', 0, 'Scheduled actions execute after a time delay.'],
  ['If a record is locked in an Approval Process, who can edit it?', 'Nobody', 'Only System Admin and the Approver (if configured)', 'Any user', 'Only the owner', 1, 'Admins and designated approvers can edit locked records.'],
  ['What is a Custom Metadata Type?', 'A custom object', 'Customizable application metadata that is deployable', 'A custom field', 'A custom setting', 1, 'Custom Metadata records are deployable via change sets/packages.'],
  ['What is the difference between Custom Settings and Custom Metadata?', 'Custom Settings are deployable', 'Custom Metadata records are deployable, Custom Settings records are not', 'They are the same', 'Custom Metadata is deprecated', 1, 'Custom Settings DATA is not deployable; Custom Metadata RECORDS are.'],
  ['What is Delegated Administration?', 'Assigning admin tasks (like resetting passwords) to non-admin users', 'Delegating code deployment', 'Delegating approval steps', 'Delegating record ownership', 0, 'Delegated admins can manage users in specific roles/profiles.'],
  ['What is an Identity Provider (IdP)?', 'A system that verifies a user\'s identity for SSO', 'A salesforce profile', 'A permission set', 'A data loader tool', 0, 'IdP authenticates users for Single Sign-On (SSO).'],
  ['What is SAML?', 'A programming language', 'An XML-based standard for exchanging authentication data', 'A salesforce object', 'A query language', 1, 'SAML is the protocol used for SSO.'],
  ['How do you deploy changes from Sandbox to Production?', 'Data Loader', 'Change Sets or Metadata API / Salesforce DX', 'Import Wizard', 'Reports', 1, 'Change Sets, Ant Migration Tool, or SFDX are used for deployments.'],
  ['What is a Partial Copy Sandbox?', 'Has no data', 'Includes metadata and a subset of production data', 'Full copy of production', 'Developer sandbox', 1, 'Partial sandboxes include up to 10k records per selected object.'],
  ['What is the refresh interval for a Full Sandbox?', '1 day', '5 days', '29 days', '30 days', 2, 'Full sandboxes can be refreshed every 29 days.'],
  ['What is Shield Platform Encryption?', 'Encrypts passwords', 'Encrypts data at rest at the database layer', 'Encrypts network traffic', 'Encrypts Apex code', 1, 'Shield encrypts sensitive data at rest.'],
  ['What is Event Monitoring?', 'Monitors flows', 'Captures detailed security, performance, and usage data via API', 'Monitors network pings', 'Monitors record creation', 1, 'Event Monitoring provides logs of user activity for security/auditing.']
]);

const mod3Easy = ex([
  ['What type of language is Apex?', 'Compiled, strongly-typed', 'Interpreted, weakly-typed', 'Functional', 'Scripting', 0, 'Apex is strongly-typed and compiled on the platform.'],
  ['Which collection allows duplicates?', 'Set', 'Map', 'List', 'Dictionary', 2, 'Lists are ordered collections that allow duplicates.'],
  ['Which collection does NOT allow duplicates?', 'List', 'Array', 'Set', 'Vector', 2, 'Sets are unordered and automatically prevent duplicates.'],
  ['What is a Map in Apex?', 'A geographic tool', 'A collection of key-value pairs', 'A list of lists', 'A set of strings', 1, 'Maps store data as key-value pairs.'],
  ['What is SOQL?', 'Salesforce Object Query Language', 'Standard Object Query Language', 'System Object Query Language', 'Salesforce Orientated Query Language', 0, 'SOQL is used to read data from the database.'],
  ['What is DML?', 'Data Manipulation Language (Insert, Update, Delete)', 'Data Meaning Language', 'Direct Memory Link', 'Dynamic Mapping Layer', 0, 'DML is used to modify records.'],
  ['What does Trigger.new contain?', 'Old versions of records', 'New versions of records', 'A map of IDs', 'Deleted records', 1, 'Trigger.new is a list of the new versions of sObject records.'],
  ['Can you use DML in a Before trigger?', 'Yes', 'No', 'Only Insert', 'Only Update', 1, 'Before triggers modify Trigger.new directly without DML.'],
  ['What does System.debug() do?', 'Deletes a record', 'Prints a message to the debug log', 'Throws an error', 'Stops execution', 1, 'Used for logging information to the developer console.'],
  ['What is a Governor Limit?', 'A hard limit imposed by Salesforce to prevent resource hogging', 'A political limit', 'A limit on users', 'A limit on sandboxes', 0, 'Limits ensure multi-tenant stability.']
]);

const mod3Medium = ex([
  ['What is the SOQL query limit in a synchronous transaction?', '50', '100', '150', '200', 1, '100 SOQL queries are allowed per synchronous transaction.'],
  ['What is the DML statement limit in a synchronous transaction?', '50', '100', '150', '200', 2, '150 DML statements are allowed.'],
  ['How do you handle bulkification in a trigger?', 'Use SOQL inside loops', 'Use Maps and Sets outside loops to query and process records', 'Use @future for everything', 'Disable limits', 1, 'Bulkification requires collecting IDs and querying outside loops.'],
  ['What is the difference between insert and Database.insert(list, false)?', 'They are identical', 'insert rolls back completely on error; Database.insert allows partial success', 'insert is faster', 'Database.insert requires admin rights', 1, 'Database.insert(..., false) enables partial success.'],
  ['What is a Savepoint?', 'A backup of the org', 'A state of the database that you can rollback to', 'A deployment feature', 'A Git commit', 1, 'Database.setSavepoint() allows rolling back partial DML.'],
  ['What annotation runs a method asynchronously in the background?', '@async', '@future', '@background', '@queueable', 1, '@future executes methods asynchronously.'],
  ['Which parameters are allowed in a @future method?', 'Any object', 'sObjects only', 'Primitives or arrays of primitives only', 'Maps of sObjects', 2, '@future methods cannot take sObjects as arguments.'],
  ['What is Batch Apex?', 'A trigger pattern', 'An interface to process millions of records in chunks', 'A SOQL feature', 'A data loader tool', 1, 'Batch Apex processes data in batches (default size 200).'],
  ['What interfaces must a Batch class implement?', 'Database.Batchable', 'System.Schedulable', 'Queueable', 'HttpCalloutMock', 0, 'Batch classes must implement Database.Batchable.'],
  ['What is the default batch size for Batch Apex?', '100', '200', '500', '2000', 1, 'The default batch size is 200 records per execute method.'],
  ['What is Queueable Apex?', 'A legacy feature', 'An async feature that allows chaining and complex types', 'A workflow rule', 'A reporting tool', 1, 'Queueable Apex is like @future but supports sObjects and chaining.'],
  ['How do you schedule Apex to run daily?', 'Use a Workflow', 'Implement Schedulable interface and use System.schedule', 'Use @future', 'Use an infinite loop', 1, 'Schedulable Apex can be scheduled via CRON expressions or the UI.'],
  ['What is the minimum code coverage required to deploy Apex?', '50%', '75%', '85%', '100%', 1, 'Salesforce requires 75% overall code coverage.'],
  ['What does @isTest do?', 'Defines a class/method as test code that does not count towards org limits', 'Runs the code in production', 'Disables governor limits completely', 'Mocks data', 0, 'Test classes are ignored for org code size limits.'],
  ['What does Test.startTest() do?', 'Starts a timer', 'Resets governor limits to zero for the enclosed code', 'Mocks a callout', 'Creates a savepoint', 1, 'It provides a fresh set of limits for testing.']
]);

const mod3Hard = ex([
  ['What is the limit for total records retrieved by SOQL queries in a transaction?', '10,000', '50,000', '100,000', '500,000', 1, 'You can retrieve a maximum of 50,000 records per transaction.'],
  ['What is a Mixed DML error?', 'Updating 2 Account records', 'Updating a Setup object (User/Group) and a non-Setup object (Account) in the same transaction', 'Inserting and Deleting at the same time', 'Exceeding DML limits', 1, 'Mixed DML occurs when combining Setup and Non-Setup DML.'],
  ['How do you fix a Mixed DML error?', 'Use Database.insert', 'Move one DML operation to a @future or Queueable method', 'Use a try/catch block', 'Increase limits', 1, 'Async execution runs in a separate transaction, avoiding the conflict.'],
  ['What is the limit for SOQL queries in an ASYNCHRONOUS transaction (e.g., Batch)?', '100', '150', '200', '500', 2, 'Async limits are higher: 200 SOQL queries.'],
  ['Can you make a callout from a Trigger?', 'Yes, directly', 'No, callouts are blocked in triggers; must use @future(callout=true) or Queueable', 'Yes, but only REST', 'No, never', 1, 'Triggers run synchronously and cannot wait for external callouts.'],
  ['How do you test a Callout in Apex?', 'Make the actual callout in the sandbox', 'Implement HttpCalloutMock and use Test.setMock', 'Use @isTest(SeeAllData=true)', 'You cannot test callouts', 1, 'Salesforce requires mocks to simulate external callouts in tests.'],
  ['What does the WITH SECURITY_ENFORCED clause do in SOQL?', 'Encrypts the results', 'Throws an exception if the user lacks field/object access', 'Bypasses FLS', 'Requires a password', 1, 'It enforces Field-Level Security and Object permissions on the query.'],
  ['What is the purpose of the Trigger Handler pattern?', 'To bypass limits', 'To keep triggers logic-less and control the order of execution', 'To write less code', 'To disable triggers easily', 1, 'Logic-less triggers delegate work to a handler class.'],
  ['What is Database.Stateful used for in Batch Apex?', 'To save records automatically', 'To maintain state (like a counter) across multiple execute batches', 'To bypass limits', 'To retry failed batches', 1, 'By default, instance variables are reset per batch unless Database.Stateful is used.'],
  ['How many callouts are allowed in a single synchronous transaction?', '10', '50', '100', '150', 2, 'You can make up to 100 HTTP callouts per transaction.'],
  ['What is the maximum timeout for all callouts in a transaction?', '10 seconds', '60 seconds', '120 seconds', '240 seconds', 2, 'The cumulative timeout for all callouts in a transaction is 120 seconds.'],
  ['Can you call a Queueable job from a @future method?', 'Yes', 'No', 'Only in tests', 'Only in production', 1, 'You cannot chain a Queueable from a @future method.'],
  ['Can you call a @future method from a Batch execute method?', 'Yes', 'No', 'Only if callout=true', 'Only once', 1, 'You cannot call a @future method from a Batch job.'],
  ['What is Custom Settings (List type) replacement?', 'Custom Metadata Types', 'Custom Objects', 'Static Resources', 'Cache', 0, 'Custom Metadata Types replace List Custom Settings because they are deployable.'],
  ['What is Platform Cache?', 'Browser cache', 'Memory layer in Salesforce to store session or org-level data for faster access', 'Hard drive storage', 'Database index', 1, 'Platform Cache provides in-memory caching to improve performance.'],
  ['What is SOSL?', 'Salesforce Object Search Language (used for text searches across multiple objects)', 'SOQL for external objects', 'System Object Security Layer', 'Synchronous Object Search', 0, 'SOSL searches text across multiple objects simultaneously.'],
  ['What is the return type of a SOSL query?', 'List<sObject>', 'List<List<sObject>>', 'Map<Id, sObject>', 'Set<Id>', 1, 'SOSL returns a List of Lists, one list for each object searched.'],
  ['How do you bypass OWD in an Apex class?', 'Declare it as "without sharing"', 'Declare it as "with sharing"', 'Declare it as "global"', 'Use System.runAs()', 0, 'Classes declared "without sharing" ignore sharing rules.'],
  ['What does System.runAs() do in a test class?', 'Changes the profile permanently', 'Executes code in the context of a specific user to test sharing rules', 'Bypasses validation rules', 'Runs code asynchronously', 1, 'It allows testing sharing/visibility as different users.'],
  ['What is an Apex Exception?', 'A limit breach', 'A runtime error that can be caught using try/catch', 'A compilation error', 'A deployment failure', 1, 'Exceptions (like NullPointerException) disrupt flow but can be caught.']
]);

const mod4Easy = ex([
  ['What is LWC?', 'Lightning Web Components', 'Legacy Web Code', 'Lightning Workflow Creator', 'Local Web Client', 0, 'LWC is the modern UI framework for Salesforce.'],
  ['What web standards does LWC use?', 'Custom Elements, Shadow DOM, HTML Templates', 'jQuery, Bootstrap', 'React, Redux', 'Angular, TypeScript', 0, 'LWC relies on native browser web standards.'],
  ['What files make up an LWC bundle?', 'html, js, css, js-meta.xml', 'cmp, js, css, design', 'vfp, apxc', 'html, ts, scss', 0, 'A standard bundle contains html, js, css, and meta.xml.'],
  ['Which decorator exposes a public property?', '@api', '@track', '@wire', '@public', 0, '@api allows parent components to pass data in.'],
  ['Which decorator provisions data reactively from Apex?', '@api', '@track', '@wire', '@invoke', 2, '@wire connects a component to Salesforce data/Apex.'],
  ['How do you render data conditionally in LWC?', 'lwc:if={condition}', 'v-if="condition"', 'ng-if="condition"', 'render-if={condition}', 0, 'lwc:if, lwc:elseif, and lwc:else are used for conditional rendering.'],
  ['How do you iterate over an array in LWC?', 'for:each={array} for:item="item"', 'v-for="item in array"', '*ngFor="let item of array"', 'foreach(item in array)', 0, 'Use for:each and for:item to iterate.'],
  ['What is required on the first element inside a for:each loop?', 'id={item.id}', 'key={item.id}', 'name={item.name}', 'data-id={item.id}', 1, 'A unique key={...} attribute is mandatory for DOM tracking.'],
  ['Are LWC primitive properties reactive by default?', 'Yes', 'No', 'Only with @track', 'Only with @api', 0, 'All properties are reactive by default since Spring 20.'],
  ['What does @track do?', 'Tracks page views', 'Makes deep mutations (objects/arrays) reactive', 'Tracks user clicks', 'Tracks errors', 1, '@track is used to observe changes inside objects or arrays.']
]);

const mod4Medium = ex([
  ['How does a child component send data to a parent?', 'By calling an @api method', 'By dispatching a CustomEvent', 'By using @wire', 'By changing a global variable', 1, 'Child components dispatch events; parents listen.'],
  ['How do you dispatch an event named "select"?', 'this.fire("select")', 'this.dispatchEvent(new CustomEvent("select"))', 'this.send("select")', 'event.dispatch("select")', 1, 'Use standard DOM CustomEvent API.'],
  ['How does a parent listen to a child\'s "select" event in HTML?', 'on-select={handler}', 'onselect={handler}', 'handle-select={handler}', '@select={handler}', 1, 'Event listeners in HTML use "on" + eventname.'],
  ['What is Lightning Data Service (LDS)?', 'A database', 'A data caching and synchronization layer for UI components', 'An API gateway', 'A deployment tool', 1, 'LDS handles data operations without needing Apex.'],
  ['Which module is used to show a toast message?', 'lightning/platformShowToastEvent', 'lightning/toast', 'salesforce/toast', 'ui/toast', 0, 'Import ShowToastEvent to display toast notifications.'],
  ['What is NavigationMixin?', 'A tool to draw maps', 'A mixin to navigate to standard Salesforce pages/URLs', 'A router component', 'A sidebar', 1, 'NavigationMixin handles programmatic routing in LWC.'],
  ['How do you call an Apex method imperatively?', 'Using @wire', 'Import the method and call it like a standard JS Promise', 'Using <apex:actionFunction>', 'Using a visualforce page', 1, 'Imperative calls return a Promise.'],
  ['Why use imperative Apex instead of @wire?', 'To query more records', 'To control exactly when the call occurs (e.g. on button click)', 'To bypass FLS', 'To use SOAP', 1, '@wire is automatic; imperative gives you manual control.'],
  ['What must be true about an Apex method to be used with @wire?', 'It must return a List', 'It must be annotated with @AuraEnabled(cacheable=true)', 'It must be global', 'It must perform DML', 1, '@wire requires cacheable=true.'],
  ['Can a cacheable=true Apex method perform DML (Insert/Update)?', 'Yes', 'No', 'Only Inserts', 'Only Updates', 1, 'Cacheable methods are read-only and cannot perform DML.'],
  ['What is the purpose of connectedCallback()?', 'Fires when component is destroyed', 'Fires when component is inserted into the DOM', 'Fires on every render', 'Fires when an error occurs', 1, 'Use it for initialization logic.'],
  ['What is Shadow DOM?', 'A dark theme', 'Browser standard that encapsulates component CSS and DOM', 'A hidden object', 'A backup database', 1, 'Shadow DOM prevents CSS styles from leaking out or bleeding in.'],
  ['How do you query an element inside your component\'s template?', 'document.getElementById()', 'this.template.querySelector()', 'window.querySelector()', '$("selector")', 1, 'Use this.template to query within the component\'s Shadow DOM.'],
  ['What is Lightning Message Service (LMS)?', 'An email tool', 'A publish-subscribe mechanism to communicate across unrelated components', 'A chat tool', 'An SMS gateway', 1, 'LMS connects LWC, Aura, and VF across the DOM.'],
  ['What file defines an LMS channel?', '.messageChannel-meta.xml', '.lms', '.channel', '.xml', 0, 'LMS channels are defined in XML metadata files.']
]);

const mod4Hard = ex([
  ['What is the renderedCallback() hook?', 'Fires once on load', 'Fires every time the component finishes rendering', 'Fires when data changes', 'Fires on error', 1, 'renderedCallback runs after every render cycle.'],
  ['Why should you be careful with renderedCallback()?', 'It can cause infinite loops if you update a reactive property inside it', 'It deletes data', 'It is deprecated', 'It hides the component', 0, 'Updating state in renderedCallback triggers another render.'],
  ['What is the disconnectedCallback() hook?', 'Fires when the user logs out', 'Fires when the component is removed from the DOM', 'Fires on network loss', 'Fires when Apex fails', 1, 'Used to clean up resources like LMS subscriptions.'],
  ['What is the errorCallback() hook?', 'Catches errors during rendering or in lifecycle hooks of child components', 'Catches Apex errors', 'Catches syntax errors', 'Catches network errors', 0, 'errorCallback provides an error boundary for child components.'],
  ['How do you access static resources in LWC?', 'import myResource from "@salesforce/resourceUrl/myResource"', 'src="/static/myResource"', 'Use a URL string', 'Query it via Apex', 0, 'Use the @salesforce/resourceUrl scoped module.'],
  ['How do you access the current user\'s ID in LWC?', 'import Id from "@salesforce/user/Id"', 'this.user.id', 'Query via Apex', '$User.Id', 0, 'Use the scoped module @salesforce/user/Id.'],
  ['What is the purpose of the js-meta.xml file?', 'Defines component structure', 'Defines configuration, targets (where the component can be used), and design attributes', 'Defines CSS', 'Defines Apex controllers', 1, 'The XML file makes the component available in Lightning App Builder.'],
  ['How do you make properties configurable in the Lightning App Builder?', 'Use @api in JS and define <targetConfig> with <property> in XML', 'Just use @api', 'Use @track', 'It happens automatically', 0, 'You must define properties in the targetConfigs section of the XML.'],
  ['What is getRecord in the uiRecordApi?', 'An imperative Apex call', 'A wire adapter to fetch a record\'s data without Apex', 'A button component', 'A DML statement', 1, 'getRecord is part of LDS and fetches data automatically.'],
  ['How do you refresh an @wire response when data changes?', 'refreshWire()', 'import { refreshApex } from "@salesforce/apex" and call it with the wired provisioned value', 'Call the method again', 'Reload the page', 1, 'refreshApex() invalidates the LDS cache for that wire.'],
  ['What does "composed: true" mean when dispatching an event?', 'The event can cross the Shadow DOM boundary', 'The event bubbles up', 'The event has data', 'The event is an object', 0, 'composed: true allows the event to leave the shadow root.'],
  ['What is the difference between bubbles: true and composed: true?', 'Bubbles moves up the DOM within the shadow tree; Composed allows it to cross the shadow boundary', 'They are the same', 'Bubbles is for Aura, composed is for LWC', 'Bubbles is faster', 0, 'Bubbles travels up; Composed breaks out of Shadow DOM.'],
  ['Can a component access the DOM of its child components?', 'Yes, always', 'No, the child\'s DOM is encapsulated in its own Shadow DOM', 'Yes, using document.querySelector', 'Only if the child is Aura', 1, 'Shadow DOM prevents parents from inspecting children\'s internal DOM.'],
  ['What is a slot (<slot>) in LWC?', 'A storage variable', 'A placeholder where a parent component can inject HTML markup into a child', 'A time reservation', 'An event listener', 1, 'Slots allow composition by passing markup from parent to child.'],
  ['How do you share JavaScript code between LWCs without a UI?', 'Create an Apex class', 'Create a Service Component (an LWC with only a .js file) and import it', 'Use a Static Resource', 'Use global variables', 1, 'Export functions/classes from a JS-only LWC.'],
  ['What is Workspace API in LWC?', 'API for VS Code', 'API to manage console tabs and subtabs in Lightning Console apps', 'API for data import', 'API for creating orgs', 1, 'Workspace API controls tabs in console applications.'],
  ['Can LWC components run in Salesforce Classic?', 'Yes, natively', 'No, they must be wrapped in an Aura component or Visualforce page', 'Yes, with a plugin', 'No, never', 1, 'LWC requires a wrapper to run in Classic/VF.'],
  ['What is Lightning Locker / LWS (Lightning Web Security)?', 'A password manager', 'A security architecture that isolates components belonging to different namespaces', 'A network firewall', 'An encryption tool', 1, 'LWS/Locker prevents cross-site scripting and DOM tampering.'],
  ['How do you mock @wire data in Jest tests?', 'Make a real callout', 'Use @salesforce/sfdx-lwc-jest and emit mock data', 'Use System.debug', 'It cannot be tested', 1, 'LWC Jest provides tools to mock wired data and test reactivity.'],
  ['What is the standard tool to write unit tests for LWC?', 'Apex Tests', 'Selenium', 'Jest', 'Mocha', 2, 'Jest is the standard testing framework for LWC.']
]);

const quizzes = {
  '1': { easy: mod1Easy, medium: mod1Medium, hard: mod1Hard },
  '2': { easy: mod2Easy, medium: mod2Medium, hard: mod2Hard },
  '3': { easy: mod3Easy, medium: mod3Medium, hard: mod3Hard },
  '4': { easy: mod4Easy, medium: mod4Medium, hard: mod4Hard }
};

const output = 'export const quizzes = ' + JSON.stringify(quizzes, null, 2) + ';';
fs.writeFileSync('js/data/quizzes.js', output, 'utf8');
console.log('Successfully generated quizzes.js with 180 questions.');
