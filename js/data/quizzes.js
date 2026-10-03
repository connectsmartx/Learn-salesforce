export const quizzes = {
  "1": {
    "easy": [
      {
        "type": "mcq",
        "question": "What does CRM stand for?",
        "options": [
          "Customer Relationship Management",
          "Cloud Resource Manager",
          "Client Relational Model",
          "Customer Retention Manager"
        ],
        "correct": 0,
        "explanation": "CRM is Customer Relationship Management."
      },
      {
        "type": "mcq",
        "question": "Which deployment model does Salesforce use?",
        "options": [
          "On-premise",
          "SaaS",
          "IaaS",
          "PaaS"
        ],
        "correct": 1,
        "explanation": "Salesforce primarily provides Software as a Service (SaaS)."
      },
      {
        "type": "mcq",
        "question": "What is the App Launcher?",
        "options": [
          "Grid icon to switch apps",
          "Tool to build apps",
          "Data loader",
          "Sandbox"
        ],
        "correct": 0,
        "explanation": "App Launcher lets users navigate between Salesforce apps."
      },
      {
        "type": "mcq",
        "question": "How many major releases does Salesforce have per year?",
        "options": [
          "1",
          "2",
          "3",
          "4"
        ],
        "correct": 2,
        "explanation": "Salesforce has 3 releases: Spring, Summer, Winter."
      },
      {
        "type": "mcq",
        "question": "Which object represents a business or organization?",
        "options": [
          "Contact",
          "Opportunity",
          "Lead",
          "Account"
        ],
        "correct": 3,
        "explanation": "Accounts store information about businesses."
      },
      {
        "type": "mcq",
        "question": "Which object represents an individual person?",
        "options": [
          "Account",
          "Opportunity",
          "Contact",
          "Case"
        ],
        "correct": 2,
        "explanation": "Contacts represent people associated with Accounts."
      },
      {
        "type": "mcq",
        "question": "What is a Lead?",
        "options": [
          "A closed deal",
          "A potential customer",
          "A support ticket",
          "A product"
        ],
        "correct": 1,
        "explanation": "Leads represent potential customers or prospects."
      },
      {
        "type": "mcq",
        "question": "What happens when a Lead is converted?",
        "options": [
          "It is deleted",
          "It becomes an Account, Contact, and optional Opportunity",
          "It becomes a Case",
          "It is archived"
        ],
        "correct": 1,
        "explanation": "Lead conversion creates an Account, Contact, and optionally an Opportunity."
      },
      {
        "type": "mcq",
        "question": "What is an Opportunity?",
        "options": [
          "A support issue",
          "A potential sale or deal",
          "A marketing campaign",
          "A user profile"
        ],
        "correct": 1,
        "explanation": "Opportunities track sales deals."
      },
      {
        "type": "mcq",
        "question": "What is a Case?",
        "options": [
          "A sales deal",
          "A customer feedback issue or support ticket",
          "A marketing email",
          "A custom object"
        ],
        "correct": 1,
        "explanation": "Cases track customer support issues."
      }
    ],
    "medium": [
      {
        "type": "mcq",
        "question": "What is the maximum number of Master-Detail relationships an object can have?",
        "options": [
          "1",
          "2",
          "3",
          "Unlimited"
        ],
        "correct": 1,
        "explanation": "An object can have up to 2 Master-Detail relationships (junction object)."
      },
      {
        "type": "mcq",
        "question": "In a Master-Detail relationship, what happens to the child when the parent is deleted?",
        "options": [
          "Child becomes an orphan",
          "Child is deleted (Cascade Delete)",
          "Error is thrown",
          "Child is reassigned"
        ],
        "correct": 1,
        "explanation": "Master-Detail enforces cascade deletion."
      },
      {
        "type": "mcq",
        "question": "Can a Lookup relationship field be required?",
        "options": [
          "Yes",
          "No",
          "Only on standard objects",
          "Only on custom objects"
        ],
        "correct": 0,
        "explanation": "Yes, lookup fields can be made required."
      },
      {
        "type": "mcq",
        "question": "What is a Roll-Up Summary field?",
        "options": [
          "Calculates values from related child records",
          "Summarizes text fields",
          "Creates a report",
          "Summarizes data across unrelated objects"
        ],
        "correct": 0,
        "explanation": "Roll-up summaries calculate min/max/sum/count of child records in a Master-Detail relationship."
      },
      {
        "type": "mcq",
        "question": "Where can you create a Roll-Up Summary field?",
        "options": [
          "On any object",
          "On the child object in a Lookup",
          "On the master object in a Master-Detail",
          "On the child object in a Master-Detail"
        ],
        "correct": 2,
        "explanation": "Roll-up summaries must be on the master object."
      },
      {
        "type": "mcq",
        "question": "What is Schema Builder?",
        "options": [
          "A tool for writing Apex",
          "A visual tool for data modeling",
          "A data import tool",
          "A report builder"
        ],
        "correct": 1,
        "explanation": "Schema Builder provides a visual canvas for objects and relationships."
      },
      {
        "type": "mcq",
        "question": "Which suffix denotes a custom object?",
        "options": [
          "__c",
          "__r",
          "__x",
          "__s"
        ],
        "correct": 0,
        "explanation": "Custom objects and fields end in __c."
      },
      {
        "type": "mcq",
        "question": "What is a junction object?",
        "options": [
          "An object with two lookups",
          "An object with two master-detail relationships",
          "A standard object",
          "An external object"
        ],
        "correct": 1,
        "explanation": "Junction objects model many-to-many relationships."
      },
      {
        "type": "mcq",
        "question": "What is the Data Import Wizard?",
        "options": [
          "Tool to import 5M records",
          "Tool to import 50,000 records",
          "Tool to write Apex",
          "Tool for exporting only"
        ],
        "correct": 1,
        "explanation": "Import Wizard handles up to 50,000 records."
      },
      {
        "type": "mcq",
        "question": "What is an External ID?",
        "options": [
          "A unique ID from another system used for matching",
          "A Salesforce generated ID",
          "A URL field",
          "A password field"
        ],
        "correct": 0,
        "explanation": "External IDs are used for upserts from external systems."
      },
      {
        "type": "mcq",
        "question": "What field type automatically numbers records?",
        "options": [
          "Auto Number",
          "Formula",
          "Roll-up",
          "Number"
        ],
        "correct": 0,
        "explanation": "Auto Number generates sequential numbers."
      },
      {
        "type": "mcq",
        "question": "Which relationship is exclusive to the User object?",
        "options": [
          "Lookup",
          "Master-Detail",
          "Hierarchical",
          "External"
        ],
        "correct": 2,
        "explanation": "Hierarchical relationships are only on the User object."
      },
      {
        "type": "mcq",
        "question": "Can standard objects be on the detail side of a Master-Detail relationship?",
        "options": [
          "Yes",
          "No",
          "Only Account",
          "Only Contact"
        ],
        "correct": 1,
        "explanation": "Standard objects cannot be the detail in a Master-Detail relationship."
      },
      {
        "type": "mcq",
        "question": "What is a cross-object formula?",
        "options": [
          "A formula that references fields on a related parent object",
          "A formula that updates child records",
          "A formula in a report",
          "A formula that calls an API"
        ],
        "correct": 0,
        "explanation": "Cross-object formulas can span up to 10 relationships upwards."
      },
      {
        "type": "mcq",
        "question": "What is a Picklist?",
        "options": [
          "A text field",
          "A multi-select checkbox",
          "A drop-down list of options",
          "A lookup to another object"
        ],
        "correct": 2,
        "explanation": "Picklists provide predefined options."
      }
    ],
    "hard": [
      {
        "type": "mcq",
        "question": "How many external IDs can an object have?",
        "options": [
          "1",
          "3",
          "7",
          "25"
        ],
        "correct": 3,
        "explanation": "Objects can have up to 25 External ID fields."
      },
      {
        "type": "mcq",
        "question": "What is the maximum number of custom fields per object in Enterprise Edition?",
        "options": [
          "100",
          "500",
          "800",
          "900"
        ],
        "correct": 1,
        "explanation": "Enterprise Edition allows 500 custom fields per object."
      },
      {
        "type": "mcq",
        "question": "Which data type is not supported in a Formula field?",
        "options": [
          "Text",
          "Number",
          "Long Text Area",
          "Date"
        ],
        "correct": 2,
        "explanation": "Long Text Area, Rich Text Area, and Encrypted fields cannot be used in formulas."
      },
      {
        "type": "mcq",
        "question": "What is the limit of cross-object formula relationships?",
        "options": [
          "5",
          "10",
          "15",
          "20"
        ],
        "correct": 1,
        "explanation": "Cross-object formulas can span up to 10 relationships away."
      },
      {
        "type": "mcq",
        "question": "If a user converts a lead, what happens to the lead's custom fields?",
        "options": [
          "They are lost",
          "They must be mapped to Account, Contact, or Opportunity custom fields",
          "They auto-map to standard fields",
          "They remain on the Lead object only"
        ],
        "correct": 1,
        "explanation": "You must map custom Lead fields to custom fields on the target objects."
      },
      {
        "type": "mcq",
        "question": "What is a polymorphic relationship?",
        "options": [
          "A relationship to multiple object types (e.g. WhatId)",
          "A junction object",
          "A master-detail",
          "A self-lookup"
        ],
        "correct": 0,
        "explanation": "Polymorphic fields like WhatId (Related To) can look up to an Account, Opportunity, Campaign, etc."
      },
      {
        "type": "mcq",
        "question": "Can you change a Master-Detail to a Lookup?",
        "options": [
          "No",
          "Yes, always",
          "Yes, if no roll-up summaries exist on the master",
          "Yes, if the child has no records"
        ],
        "correct": 2,
        "explanation": "You can convert Master-Detail to Lookup only if there are no roll-up summaries on the master."
      },
      {
        "type": "mcq",
        "question": "What is the default record access for a detail record in Master-Detail?",
        "options": [
          "Private",
          "Public Read/Write",
          "Controlled by Parent",
          "Public Read Only"
        ],
        "correct": 2,
        "explanation": "Detail records inherit the security (Controlled by Parent)."
      },
      {
        "type": "mcq",
        "question": "Can a child record in a Master-Detail be reparented?",
        "options": [
          "No, never",
          "Yes, if the \"Allow reparenting\" option is checked",
          "Yes, by default",
          "Only by admins"
        ],
        "correct": 1,
        "explanation": "Reparenting is allowed only if the option is checked on the relationship field."
      },
      {
        "type": "mcq",
        "question": "What is a Dependent Picklist?",
        "options": [
          "A picklist whose values depend on another field",
          "A picklist that requires a value",
          "A global picklist",
          "A multi-select picklist"
        ],
        "correct": 0,
        "explanation": "Dependent picklists filter their values based on a Controlling field."
      },
      {
        "type": "mcq",
        "question": "Which of these can be a Controlling field but NOT a Dependent field?",
        "options": [
          "Standard Picklist",
          "Custom Picklist",
          "Checkbox",
          "Multi-select Picklist"
        ],
        "correct": 2,
        "explanation": "Checkboxes can control picklists, but cannot be dependent themselves."
      },
      {
        "type": "mcq",
        "question": "What happens to a junction object record if ONE of its master records is deleted?",
        "options": [
          "Nothing",
          "The other master is deleted",
          "The junction record is deleted",
          "It becomes a lookup"
        ],
        "correct": 2,
        "explanation": "If either master is deleted, the junction record is deleted."
      },
      {
        "type": "mcq",
        "question": "Which tool is required to hard-delete records?",
        "options": [
          "Import Wizard",
          "Data Loader",
          "Reports",
          "List Views"
        ],
        "correct": 1,
        "explanation": "Data Loader supports Hard Delete (bypassing the Recycle Bin) via the Bulk API."
      },
      {
        "type": "mcq",
        "question": "How long do records stay in the Recycle Bin?",
        "options": [
          "15 days",
          "30 days",
          "60 days",
          "90 days"
        ],
        "correct": 0,
        "explanation": "Records stay in the Recycle Bin for 15 days before permanent deletion."
      },
      {
        "type": "mcq",
        "question": "What is an External Object?",
        "options": [
          "An object that stores data in Salesforce but is visible outside",
          "An object that maps to data stored outside Salesforce",
          "A custom object with an external ID",
          "A managed package object"
        ],
        "correct": 1,
        "explanation": "External objects (ending in __x) map to data stored outside Salesforce via Salesforce Connect."
      },
      {
        "type": "mcq",
        "question": "Can you create a Roll-up Summary field on a Lookup relationship?",
        "options": [
          "Yes",
          "No",
          "Only via Flow",
          "Only via Apex"
        ],
        "correct": 1,
        "explanation": "Roll-up summaries require a Master-Detail relationship."
      },
      {
        "type": "mcq",
        "question": "What is the maximum number of Roll-up summary fields per object?",
        "options": [
          "10",
          "25",
          "40",
          "100"
        ],
        "correct": 2,
        "explanation": "You can create up to 40 roll-up summary fields per object."
      },
      {
        "type": "mcq",
        "question": "What is Field History Tracking?",
        "options": [
          "Tracks login history",
          "Tracks changes to field values (old and new)",
          "Tracks field creation",
          "Tracks Apex usage"
        ],
        "correct": 1,
        "explanation": "Tracks up to 20 fields per object for value changes."
      },
      {
        "type": "mcq",
        "question": "How many fields can you track with Field History Tracking per object?",
        "options": [
          "10",
          "20",
          "50",
          "100"
        ],
        "correct": 1,
        "explanation": "You can track up to 20 fields per object (without purchasing Field Audit Trail)."
      },
      {
        "type": "mcq",
        "question": "What is the VLOOKUP function used for in Salesforce?",
        "options": [
          "Searching records globally",
          "Validating data against a custom object in validation rules",
          "Reporting",
          "Flow lookups"
        ],
        "correct": 1,
        "explanation": "VLOOKUP is used in Validation Rules to check values against a custom object."
      }
    ]
  },
  "2": {
    "easy": [
      {
        "type": "mcq",
        "question": "What is a Profile?",
        "options": [
          "Controls object and field permissions",
          "Controls record visibility",
          "A user photo",
          "A role"
        ],
        "correct": 0,
        "explanation": "Profiles control CRUD access to objects."
      },
      {
        "type": "mcq",
        "question": "What is a Role?",
        "options": [
          "Controls record visibility via hierarchy",
          "Controls field permissions",
          "A job title",
          "A permission set"
        ],
        "correct": 0,
        "explanation": "Roles open up record-level access."
      },
      {
        "type": "mcq",
        "question": "What is OWD?",
        "options": [
          "Organization-Wide Defaults",
          "Object-Wide Defaults",
          "Open-Wide Defaults",
          "Owner-Wide Defaults"
        ],
        "correct": 0,
        "explanation": "OWD sets the baseline record access."
      },
      {
        "type": "mcq",
        "question": "If OWD is Private, who sees the record?",
        "options": [
          "Everyone",
          "Only the owner and superiors in hierarchy",
          "Only admins",
          "Nobody"
        ],
        "correct": 1,
        "explanation": "Private means only the owner and hierarchy superiors can access it."
      },
      {
        "type": "mcq",
        "question": "What do Sharing Rules do?",
        "options": [
          "Restrict access",
          "Open up access horizontally",
          "Change profiles",
          "Delete records"
        ],
        "correct": 1,
        "explanation": "Sharing rules grant access to groups or roles."
      },
      {
        "type": "mcq",
        "question": "What is a Permission Set?",
        "options": [
          "Restricts access",
          "Grants additional access beyond the profile",
          "Replaces a profile",
          "A group of users"
        ],
        "correct": 1,
        "explanation": "Permission Sets extend access."
      },
      {
        "type": "mcq",
        "question": "Can a user have multiple Profiles?",
        "options": [
          "Yes",
          "No",
          "Only admins",
          "Only with permission sets"
        ],
        "correct": 1,
        "explanation": "A user can only have ONE profile."
      },
      {
        "type": "mcq",
        "question": "Can a user have multiple Permission Sets?",
        "options": [
          "Yes",
          "No",
          "Only admins",
          "Maximum 2"
        ],
        "correct": 0,
        "explanation": "Users can have multiple permission sets."
      },
      {
        "type": "mcq",
        "question": "What is a Validation Rule?",
        "options": [
          "Ensures data meets criteria before saving",
          "Deletes bad data",
          "Updates fields automatically",
          "Sends emails"
        ],
        "correct": 0,
        "explanation": "Validation rules block saves if criteria are not met."
      },
      {
        "type": "mcq",
        "question": "What is a Page Layout?",
        "options": [
          "Controls UI fields, sections, and buttons",
          "Controls OWD",
          "Controls data storage",
          "A visualforce page"
        ],
        "correct": 0,
        "explanation": "Page Layouts control the UI arrangement of fields."
      }
    ],
    "medium": [
      {
        "type": "mcq",
        "question": "Which automation tool is Salesforce retiring?",
        "options": [
          "Flow",
          "Workflow Rules & Process Builder",
          "Apex",
          "Approvals"
        ],
        "correct": 1,
        "explanation": "Workflow Rules and Process Builder are being retired in favor of Flow."
      },
      {
        "type": "mcq",
        "question": "What type of Flow runs when a user clicks a button?",
        "options": [
          "Record-Triggered",
          "Schedule-Triggered",
          "Screen Flow",
          "Platform Event"
        ],
        "correct": 2,
        "explanation": "Screen Flows guide users through a UI."
      },
      {
        "type": "mcq",
        "question": "Which Flow type replaces Before Triggers?",
        "options": [
          "After-Save Record-Triggered Flow",
          "Before-Save Record-Triggered Flow",
          "Screen Flow",
          "Schedule Flow"
        ],
        "correct": 1,
        "explanation": "Before-Save flows are fast and update the triggering record."
      },
      {
        "type": "mcq",
        "question": "What is the correct order of execution?",
        "options": [
          "Validation -> Triggers -> Flow",
          "Before Triggers -> Validation -> After Triggers -> Flow",
          "Flow -> Validation -> Triggers",
          "Validation -> Flow -> Triggers"
        ],
        "correct": 1,
        "explanation": "Before Triggers -> Validation -> After Triggers -> Flow."
      },
      {
        "type": "mcq",
        "question": "What is an Approval Process?",
        "options": [
          "A flow that approves data",
          "A process that routes records for sign-off and locks them",
          "A validation rule",
          "A sharing rule"
        ],
        "correct": 1,
        "explanation": "Approval processes lock records and route them to approvers."
      },
      {
        "type": "mcq",
        "question": "What is a dynamic dashboard?",
        "options": [
          "A dashboard that changes colors",
          "A dashboard that runs as the logged-in user",
          "An animated dashboard",
          "A scheduled dashboard"
        ],
        "correct": 1,
        "explanation": "Dynamic dashboards show data based on the viewing user's permissions."
      },
      {
        "type": "mcq",
        "question": "Can you schedule a dashboard refresh?",
        "options": [
          "Yes",
          "No",
          "Only in Classic",
          "Only via Apex"
        ],
        "correct": 0,
        "explanation": "Dashboards can be scheduled for automatic refresh."
      },
      {
        "type": "mcq",
        "question": "What is Field-Level Security (FLS)?",
        "options": [
          "Hides fields on page layouts",
          "Restricts access to fields across the entire platform",
          "Encrypts fields",
          "Locks fields from deletion"
        ],
        "correct": 1,
        "explanation": "FLS is enforced at the database level, unlike page layouts."
      },
      {
        "type": "mcq",
        "question": "What does Login IP Ranges on a Profile do?",
        "options": [
          "Restricts login to specific IP addresses",
          "Sends an alert if outside IP",
          "Requires MFA",
          "Nothing"
        ],
        "correct": 0,
        "explanation": "If a user logs in outside the profile IP range, they are denied access."
      },
      {
        "type": "mcq",
        "question": "What does Network Access (Trusted IP Ranges) do?",
        "options": [
          "Denies login outside range",
          "Bypasses identity verification (MFA/OTP) for those IPs",
          "Restricts API access",
          "Allows guest access"
        ],
        "correct": 1,
        "explanation": "Trusted IPs don't block login; they just bypass the email/SMS verification code step."
      },
      {
        "type": "mcq",
        "question": "What is a Public Group?",
        "options": [
          "A group of external users",
          "A collection of users, roles, or other groups for sharing",
          "A chat room",
          "A queue"
        ],
        "correct": 1,
        "explanation": "Public Groups are used in sharing rules."
      },
      {
        "type": "mcq",
        "question": "What is a Queue?",
        "options": [
          "A list of users",
          "A holding area for unassigned records (like Cases or Leads)",
          "A public group",
          "A dashboard"
        ],
        "correct": 1,
        "explanation": "Queues own records until a user takes ownership."
      },
      {
        "type": "mcq",
        "question": "Which object CANNOT have a Queue?",
        "options": [
          "Lead",
          "Case",
          "Custom Object",
          "Opportunity"
        ],
        "correct": 3,
        "explanation": "Opportunities cannot be owned by a Queue."
      },
      {
        "type": "mcq",
        "question": "What is a Custom Report Type?",
        "options": [
          "A report with charts",
          "Defines the set of records and fields available to a report",
          "A scheduled report",
          "An exported report"
        ],
        "correct": 1,
        "explanation": "Custom report types define relationships and available fields."
      },
      {
        "type": "mcq",
        "question": "What is the maximum number of components on a Dashboard?",
        "options": [
          "10",
          "15",
          "20",
          "25"
        ],
        "correct": 2,
        "explanation": "A dashboard can have up to 20 components."
      }
    ],
    "hard": [
      {
        "type": "mcq",
        "question": "What happens if a user is assigned a Profile with Object Read access, but FLS hides a field?",
        "options": [
          "They see the field",
          "They do not see the field",
          "Error occurs",
          "FLS is overridden"
        ],
        "correct": 1,
        "explanation": "The most restrictive setting applies (FLS hides it)."
      },
      {
        "type": "mcq",
        "question": "What is Muting in Permission Set Groups?",
        "options": [
          "Disables audio",
          "Allows removing specific permissions from the group",
          "Deletes the permission set",
          "Hides the group"
        ],
        "correct": 1,
        "explanation": "Muting permission sets allow you to subtract permissions from a group."
      },
      {
        "type": "mcq",
        "question": "What is Manual Sharing?",
        "options": [
          "Sharing a record using the Share button",
          "Sharing a password",
          "Exporting data",
          "Emailing a record"
        ],
        "correct": 0,
        "explanation": "Users can manually share records they own."
      },
      {
        "type": "mcq",
        "question": "Can you manually share a record if OWD is Public Read/Write?",
        "options": [
          "Yes",
          "No",
          "Only admins can",
          "Only via Apex"
        ],
        "correct": 1,
        "explanation": "If OWD is Public Read/Write, everyone already has access; manual sharing is redundant/hidden."
      },
      {
        "type": "mcq",
        "question": "What is a Criteria-Based Sharing Rule?",
        "options": [
          "Shares records based on field values",
          "Shares records based on ownership",
          "Shares records based on roles",
          "Shares records based on profiles"
        ],
        "correct": 0,
        "explanation": "Criteria-based sharing evaluates fields (e.g., Industry = Technology)."
      },
      {
        "type": "mcq",
        "question": "Which flow element should NEVER be inside a loop?",
        "options": [
          "Decision",
          "Assignment",
          "Update Records",
          "Action"
        ],
        "correct": 2,
        "explanation": "DML elements (Update/Create) inside a loop cause governor limit errors."
      },
      {
        "type": "mcq",
        "question": "What is a Pause element in Flow?",
        "options": [
          "Stops the flow permanently",
          "Pauses the flow until a specific time or event",
          "Throws an error",
          "Waits for user input"
        ],
        "correct": 1,
        "explanation": "Pause (Wait) elements suspend the flow and resume later."
      },
      {
        "type": "mcq",
        "question": "Can an Auto-Launched Flow have screens?",
        "options": [
          "Yes",
          "No",
          "Only in Lightning",
          "Only in Classic"
        ],
        "correct": 1,
        "explanation": "Auto-launched flows run in the background and cannot have UI."
      },
      {
        "type": "mcq",
        "question": "What is a Scheduled Action in Process Builder?",
        "options": [
          "An action that runs later",
          "An immediate action",
          "A deleted action",
          "An error action"
        ],
        "correct": 0,
        "explanation": "Scheduled actions execute after a time delay."
      },
      {
        "type": "mcq",
        "question": "If a record is locked in an Approval Process, who can edit it?",
        "options": [
          "Nobody",
          "Only System Admin and the Approver (if configured)",
          "Any user",
          "Only the owner"
        ],
        "correct": 1,
        "explanation": "Admins and designated approvers can edit locked records."
      },
      {
        "type": "mcq",
        "question": "What is a Custom Metadata Type?",
        "options": [
          "A custom object",
          "Customizable application metadata that is deployable",
          "A custom field",
          "A custom setting"
        ],
        "correct": 1,
        "explanation": "Custom Metadata records are deployable via change sets/packages."
      },
      {
        "type": "mcq",
        "question": "What is the difference between Custom Settings and Custom Metadata?",
        "options": [
          "Custom Settings are deployable",
          "Custom Metadata records are deployable, Custom Settings records are not",
          "They are the same",
          "Custom Metadata is deprecated"
        ],
        "correct": 1,
        "explanation": "Custom Settings DATA is not deployable; Custom Metadata RECORDS are."
      },
      {
        "type": "mcq",
        "question": "What is Delegated Administration?",
        "options": [
          "Assigning admin tasks (like resetting passwords) to non-admin users",
          "Delegating code deployment",
          "Delegating approval steps",
          "Delegating record ownership"
        ],
        "correct": 0,
        "explanation": "Delegated admins can manage users in specific roles/profiles."
      },
      {
        "type": "mcq",
        "question": "What is an Identity Provider (IdP)?",
        "options": [
          "A system that verifies a user's identity for SSO",
          "A salesforce profile",
          "A permission set",
          "A data loader tool"
        ],
        "correct": 0,
        "explanation": "IdP authenticates users for Single Sign-On (SSO)."
      },
      {
        "type": "mcq",
        "question": "What is SAML?",
        "options": [
          "A programming language",
          "An XML-based standard for exchanging authentication data",
          "A salesforce object",
          "A query language"
        ],
        "correct": 1,
        "explanation": "SAML is the protocol used for SSO."
      },
      {
        "type": "mcq",
        "question": "How do you deploy changes from Sandbox to Production?",
        "options": [
          "Data Loader",
          "Change Sets or Metadata API / Salesforce DX",
          "Import Wizard",
          "Reports"
        ],
        "correct": 1,
        "explanation": "Change Sets, Ant Migration Tool, or SFDX are used for deployments."
      },
      {
        "type": "mcq",
        "question": "What is a Partial Copy Sandbox?",
        "options": [
          "Has no data",
          "Includes metadata and a subset of production data",
          "Full copy of production",
          "Developer sandbox"
        ],
        "correct": 1,
        "explanation": "Partial sandboxes include up to 10k records per selected object."
      },
      {
        "type": "mcq",
        "question": "What is the refresh interval for a Full Sandbox?",
        "options": [
          "1 day",
          "5 days",
          "29 days",
          "30 days"
        ],
        "correct": 2,
        "explanation": "Full sandboxes can be refreshed every 29 days."
      },
      {
        "type": "mcq",
        "question": "What is Shield Platform Encryption?",
        "options": [
          "Encrypts passwords",
          "Encrypts data at rest at the database layer",
          "Encrypts network traffic",
          "Encrypts Apex code"
        ],
        "correct": 1,
        "explanation": "Shield encrypts sensitive data at rest."
      },
      {
        "type": "mcq",
        "question": "What is Event Monitoring?",
        "options": [
          "Monitors flows",
          "Captures detailed security, performance, and usage data via API",
          "Monitors network pings",
          "Monitors record creation"
        ],
        "correct": 1,
        "explanation": "Event Monitoring provides logs of user activity for security/auditing."
      }
    ]
  },
  "3": {
    "easy": [
      {
        "type": "mcq",
        "question": "What type of language is Apex?",
        "options": [
          "Compiled, strongly-typed",
          "Interpreted, weakly-typed",
          "Functional",
          "Scripting"
        ],
        "correct": 0,
        "explanation": "Apex is strongly-typed and compiled on the platform."
      },
      {
        "type": "mcq",
        "question": "Which collection allows duplicates?",
        "options": [
          "Set",
          "Map",
          "List",
          "Dictionary"
        ],
        "correct": 2,
        "explanation": "Lists are ordered collections that allow duplicates."
      },
      {
        "type": "mcq",
        "question": "Which collection does NOT allow duplicates?",
        "options": [
          "List",
          "Array",
          "Set",
          "Vector"
        ],
        "correct": 2,
        "explanation": "Sets are unordered and automatically prevent duplicates."
      },
      {
        "type": "mcq",
        "question": "What is a Map in Apex?",
        "options": [
          "A geographic tool",
          "A collection of key-value pairs",
          "A list of lists",
          "A set of strings"
        ],
        "correct": 1,
        "explanation": "Maps store data as key-value pairs."
      },
      {
        "type": "mcq",
        "question": "What is SOQL?",
        "options": [
          "Salesforce Object Query Language",
          "Standard Object Query Language",
          "System Object Query Language",
          "Salesforce Orientated Query Language"
        ],
        "correct": 0,
        "explanation": "SOQL is used to read data from the database."
      },
      {
        "type": "mcq",
        "question": "What is DML?",
        "options": [
          "Data Manipulation Language (Insert, Update, Delete)",
          "Data Meaning Language",
          "Direct Memory Link",
          "Dynamic Mapping Layer"
        ],
        "correct": 0,
        "explanation": "DML is used to modify records."
      },
      {
        "type": "mcq",
        "question": "What does Trigger.new contain?",
        "options": [
          "Old versions of records",
          "New versions of records",
          "A map of IDs",
          "Deleted records"
        ],
        "correct": 1,
        "explanation": "Trigger.new is a list of the new versions of sObject records."
      },
      {
        "type": "mcq",
        "question": "Can you use DML in a Before trigger?",
        "options": [
          "Yes",
          "No",
          "Only Insert",
          "Only Update"
        ],
        "correct": 1,
        "explanation": "Before triggers modify Trigger.new directly without DML."
      },
      {
        "type": "mcq",
        "question": "What does System.debug() do?",
        "options": [
          "Deletes a record",
          "Prints a message to the debug log",
          "Throws an error",
          "Stops execution"
        ],
        "correct": 1,
        "explanation": "Used for logging information to the developer console."
      },
      {
        "type": "mcq",
        "question": "What is a Governor Limit?",
        "options": [
          "A hard limit imposed by Salesforce to prevent resource hogging",
          "A political limit",
          "A limit on users",
          "A limit on sandboxes"
        ],
        "correct": 0,
        "explanation": "Limits ensure multi-tenant stability."
      }
    ],
    "medium": [
      {
        "type": "mcq",
        "question": "What is the SOQL query limit in a synchronous transaction?",
        "options": [
          "50",
          "100",
          "150",
          "200"
        ],
        "correct": 1,
        "explanation": "100 SOQL queries are allowed per synchronous transaction."
      },
      {
        "type": "mcq",
        "question": "What is the DML statement limit in a synchronous transaction?",
        "options": [
          "50",
          "100",
          "150",
          "200"
        ],
        "correct": 2,
        "explanation": "150 DML statements are allowed."
      },
      {
        "type": "mcq",
        "question": "How do you handle bulkification in a trigger?",
        "options": [
          "Use SOQL inside loops",
          "Use Maps and Sets outside loops to query and process records",
          "Use @future for everything",
          "Disable limits"
        ],
        "correct": 1,
        "explanation": "Bulkification requires collecting IDs and querying outside loops."
      },
      {
        "type": "mcq",
        "question": "What is the difference between insert and Database.insert(list, false)?",
        "options": [
          "They are identical",
          "insert rolls back completely on error; Database.insert allows partial success",
          "insert is faster",
          "Database.insert requires admin rights"
        ],
        "correct": 1,
        "explanation": "Database.insert(..., false) enables partial success."
      },
      {
        "type": "mcq",
        "question": "What is a Savepoint?",
        "options": [
          "A backup of the org",
          "A state of the database that you can rollback to",
          "A deployment feature",
          "A Git commit"
        ],
        "correct": 1,
        "explanation": "Database.setSavepoint() allows rolling back partial DML."
      },
      {
        "type": "mcq",
        "question": "What annotation runs a method asynchronously in the background?",
        "options": [
          "@async",
          "@future",
          "@background",
          "@queueable"
        ],
        "correct": 1,
        "explanation": "@future executes methods asynchronously."
      },
      {
        "type": "mcq",
        "question": "Which parameters are allowed in a @future method?",
        "options": [
          "Any object",
          "sObjects only",
          "Primitives or arrays of primitives only",
          "Maps of sObjects"
        ],
        "correct": 2,
        "explanation": "@future methods cannot take sObjects as arguments."
      },
      {
        "type": "mcq",
        "question": "What is Batch Apex?",
        "options": [
          "A trigger pattern",
          "An interface to process millions of records in chunks",
          "A SOQL feature",
          "A data loader tool"
        ],
        "correct": 1,
        "explanation": "Batch Apex processes data in batches (default size 200)."
      },
      {
        "type": "mcq",
        "question": "What interfaces must a Batch class implement?",
        "options": [
          "Database.Batchable",
          "System.Schedulable",
          "Queueable",
          "HttpCalloutMock"
        ],
        "correct": 0,
        "explanation": "Batch classes must implement Database.Batchable."
      },
      {
        "type": "mcq",
        "question": "What is the default batch size for Batch Apex?",
        "options": [
          "100",
          "200",
          "500",
          "2000"
        ],
        "correct": 1,
        "explanation": "The default batch size is 200 records per execute method."
      },
      {
        "type": "mcq",
        "question": "What is Queueable Apex?",
        "options": [
          "A legacy feature",
          "An async feature that allows chaining and complex types",
          "A workflow rule",
          "A reporting tool"
        ],
        "correct": 1,
        "explanation": "Queueable Apex is like @future but supports sObjects and chaining."
      },
      {
        "type": "mcq",
        "question": "How do you schedule Apex to run daily?",
        "options": [
          "Use a Workflow",
          "Implement Schedulable interface and use System.schedule",
          "Use @future",
          "Use an infinite loop"
        ],
        "correct": 1,
        "explanation": "Schedulable Apex can be scheduled via CRON expressions or the UI."
      },
      {
        "type": "mcq",
        "question": "What is the minimum code coverage required to deploy Apex?",
        "options": [
          "50%",
          "75%",
          "85%",
          "100%"
        ],
        "correct": 1,
        "explanation": "Salesforce requires 75% overall code coverage."
      },
      {
        "type": "mcq",
        "question": "What does @isTest do?",
        "options": [
          "Defines a class/method as test code that does not count towards org limits",
          "Runs the code in production",
          "Disables governor limits completely",
          "Mocks data"
        ],
        "correct": 0,
        "explanation": "Test classes are ignored for org code size limits."
      },
      {
        "type": "mcq",
        "question": "What does Test.startTest() do?",
        "options": [
          "Starts a timer",
          "Resets governor limits to zero for the enclosed code",
          "Mocks a callout",
          "Creates a savepoint"
        ],
        "correct": 1,
        "explanation": "It provides a fresh set of limits for testing."
      }
    ],
    "hard": [
      {
        "type": "mcq",
        "question": "What is the limit for total records retrieved by SOQL queries in a transaction?",
        "options": [
          "10,000",
          "50,000",
          "100,000",
          "500,000"
        ],
        "correct": 1,
        "explanation": "You can retrieve a maximum of 50,000 records per transaction."
      },
      {
        "type": "mcq",
        "question": "What is a Mixed DML error?",
        "options": [
          "Updating 2 Account records",
          "Updating a Setup object (User/Group) and a non-Setup object (Account) in the same transaction",
          "Inserting and Deleting at the same time",
          "Exceeding DML limits"
        ],
        "correct": 1,
        "explanation": "Mixed DML occurs when combining Setup and Non-Setup DML."
      },
      {
        "type": "mcq",
        "question": "How do you fix a Mixed DML error?",
        "options": [
          "Use Database.insert",
          "Move one DML operation to a @future or Queueable method",
          "Use a try/catch block",
          "Increase limits"
        ],
        "correct": 1,
        "explanation": "Async execution runs in a separate transaction, avoiding the conflict."
      },
      {
        "type": "mcq",
        "question": "What is the limit for SOQL queries in an ASYNCHRONOUS transaction (e.g., Batch)?",
        "options": [
          "100",
          "150",
          "200",
          "500"
        ],
        "correct": 2,
        "explanation": "Async limits are higher: 200 SOQL queries."
      },
      {
        "type": "mcq",
        "question": "Can you make a callout from a Trigger?",
        "options": [
          "Yes, directly",
          "No, callouts are blocked in triggers; must use @future(callout=true) or Queueable",
          "Yes, but only REST",
          "No, never"
        ],
        "correct": 1,
        "explanation": "Triggers run synchronously and cannot wait for external callouts."
      },
      {
        "type": "mcq",
        "question": "How do you test a Callout in Apex?",
        "options": [
          "Make the actual callout in the sandbox",
          "Implement HttpCalloutMock and use Test.setMock",
          "Use @isTest(SeeAllData=true)",
          "You cannot test callouts"
        ],
        "correct": 1,
        "explanation": "Salesforce requires mocks to simulate external callouts in tests."
      },
      {
        "type": "mcq",
        "question": "What does the WITH SECURITY_ENFORCED clause do in SOQL?",
        "options": [
          "Encrypts the results",
          "Throws an exception if the user lacks field/object access",
          "Bypasses FLS",
          "Requires a password"
        ],
        "correct": 1,
        "explanation": "It enforces Field-Level Security and Object permissions on the query."
      },
      {
        "type": "mcq",
        "question": "What is the purpose of the Trigger Handler pattern?",
        "options": [
          "To bypass limits",
          "To keep triggers logic-less and control the order of execution",
          "To write less code",
          "To disable triggers easily"
        ],
        "correct": 1,
        "explanation": "Logic-less triggers delegate work to a handler class."
      },
      {
        "type": "mcq",
        "question": "What is Database.Stateful used for in Batch Apex?",
        "options": [
          "To save records automatically",
          "To maintain state (like a counter) across multiple execute batches",
          "To bypass limits",
          "To retry failed batches"
        ],
        "correct": 1,
        "explanation": "By default, instance variables are reset per batch unless Database.Stateful is used."
      },
      {
        "type": "mcq",
        "question": "How many callouts are allowed in a single synchronous transaction?",
        "options": [
          "10",
          "50",
          "100",
          "150"
        ],
        "correct": 2,
        "explanation": "You can make up to 100 HTTP callouts per transaction."
      },
      {
        "type": "mcq",
        "question": "What is the maximum timeout for all callouts in a transaction?",
        "options": [
          "10 seconds",
          "60 seconds",
          "120 seconds",
          "240 seconds"
        ],
        "correct": 2,
        "explanation": "The cumulative timeout for all callouts in a transaction is 120 seconds."
      },
      {
        "type": "mcq",
        "question": "Can you call a Queueable job from a @future method?",
        "options": [
          "Yes",
          "No",
          "Only in tests",
          "Only in production"
        ],
        "correct": 1,
        "explanation": "You cannot chain a Queueable from a @future method."
      },
      {
        "type": "mcq",
        "question": "Can you call a @future method from a Batch execute method?",
        "options": [
          "Yes",
          "No",
          "Only if callout=true",
          "Only once"
        ],
        "correct": 1,
        "explanation": "You cannot call a @future method from a Batch job."
      },
      {
        "type": "mcq",
        "question": "What is Custom Settings (List type) replacement?",
        "options": [
          "Custom Metadata Types",
          "Custom Objects",
          "Static Resources",
          "Cache"
        ],
        "correct": 0,
        "explanation": "Custom Metadata Types replace List Custom Settings because they are deployable."
      },
      {
        "type": "mcq",
        "question": "What is Platform Cache?",
        "options": [
          "Browser cache",
          "Memory layer in Salesforce to store session or org-level data for faster access",
          "Hard drive storage",
          "Database index"
        ],
        "correct": 1,
        "explanation": "Platform Cache provides in-memory caching to improve performance."
      },
      {
        "type": "mcq",
        "question": "What is SOSL?",
        "options": [
          "Salesforce Object Search Language (used for text searches across multiple objects)",
          "SOQL for external objects",
          "System Object Security Layer",
          "Synchronous Object Search"
        ],
        "correct": 0,
        "explanation": "SOSL searches text across multiple objects simultaneously."
      },
      {
        "type": "mcq",
        "question": "What is the return type of a SOSL query?",
        "options": [
          "List<sObject>",
          "List<List<sObject>>",
          "Map<Id, sObject>",
          "Set<Id>"
        ],
        "correct": 1,
        "explanation": "SOSL returns a List of Lists, one list for each object searched."
      },
      {
        "type": "mcq",
        "question": "How do you bypass OWD in an Apex class?",
        "options": [
          "Declare it as \"without sharing\"",
          "Declare it as \"with sharing\"",
          "Declare it as \"global\"",
          "Use System.runAs()"
        ],
        "correct": 0,
        "explanation": "Classes declared \"without sharing\" ignore sharing rules."
      },
      {
        "type": "mcq",
        "question": "What does System.runAs() do in a test class?",
        "options": [
          "Changes the profile permanently",
          "Executes code in the context of a specific user to test sharing rules",
          "Bypasses validation rules",
          "Runs code asynchronously"
        ],
        "correct": 1,
        "explanation": "It allows testing sharing/visibility as different users."
      },
      {
        "type": "mcq",
        "question": "What is an Apex Exception?",
        "options": [
          "A limit breach",
          "A runtime error that can be caught using try/catch",
          "A compilation error",
          "A deployment failure"
        ],
        "correct": 1,
        "explanation": "Exceptions (like NullPointerException) disrupt flow but can be caught."
      }
    ]
  },
  "4": {
    "easy": [
      {
        "type": "mcq",
        "question": "What is LWC?",
        "options": [
          "Lightning Web Components",
          "Legacy Web Code",
          "Lightning Workflow Creator",
          "Local Web Client"
        ],
        "correct": 0,
        "explanation": "LWC is the modern UI framework for Salesforce."
      },
      {
        "type": "mcq",
        "question": "What web standards does LWC use?",
        "options": [
          "Custom Elements, Shadow DOM, HTML Templates",
          "jQuery, Bootstrap",
          "React, Redux",
          "Angular, TypeScript"
        ],
        "correct": 0,
        "explanation": "LWC relies on native browser web standards."
      },
      {
        "type": "mcq",
        "question": "What files make up an LWC bundle?",
        "options": [
          "html, js, css, js-meta.xml",
          "cmp, js, css, design",
          "vfp, apxc",
          "html, ts, scss"
        ],
        "correct": 0,
        "explanation": "A standard bundle contains html, js, css, and meta.xml."
      },
      {
        "type": "mcq",
        "question": "Which decorator exposes a public property?",
        "options": [
          "@api",
          "@track",
          "@wire",
          "@public"
        ],
        "correct": 0,
        "explanation": "@api allows parent components to pass data in."
      },
      {
        "type": "mcq",
        "question": "Which decorator provisions data reactively from Apex?",
        "options": [
          "@api",
          "@track",
          "@wire",
          "@invoke"
        ],
        "correct": 2,
        "explanation": "@wire connects a component to Salesforce data/Apex."
      },
      {
        "type": "mcq",
        "question": "How do you render data conditionally in LWC?",
        "options": [
          "lwc:if={condition}",
          "v-if=\"condition\"",
          "ng-if=\"condition\"",
          "render-if={condition}"
        ],
        "correct": 0,
        "explanation": "lwc:if, lwc:elseif, and lwc:else are used for conditional rendering."
      },
      {
        "type": "mcq",
        "question": "How do you iterate over an array in LWC?",
        "options": [
          "for:each={array} for:item=\"item\"",
          "v-for=\"item in array\"",
          "*ngFor=\"let item of array\"",
          "foreach(item in array)"
        ],
        "correct": 0,
        "explanation": "Use for:each and for:item to iterate."
      },
      {
        "type": "mcq",
        "question": "What is required on the first element inside a for:each loop?",
        "options": [
          "id={item.id}",
          "key={item.id}",
          "name={item.name}",
          "data-id={item.id}"
        ],
        "correct": 1,
        "explanation": "A unique key={...} attribute is mandatory for DOM tracking."
      },
      {
        "type": "mcq",
        "question": "Are LWC primitive properties reactive by default?",
        "options": [
          "Yes",
          "No",
          "Only with @track",
          "Only with @api"
        ],
        "correct": 0,
        "explanation": "All properties are reactive by default since Spring 20."
      },
      {
        "type": "mcq",
        "question": "What does @track do?",
        "options": [
          "Tracks page views",
          "Makes deep mutations (objects/arrays) reactive",
          "Tracks user clicks",
          "Tracks errors"
        ],
        "correct": 1,
        "explanation": "@track is used to observe changes inside objects or arrays."
      }
    ],
    "medium": [
      {
        "type": "mcq",
        "question": "How does a child component send data to a parent?",
        "options": [
          "By calling an @api method",
          "By dispatching a CustomEvent",
          "By using @wire",
          "By changing a global variable"
        ],
        "correct": 1,
        "explanation": "Child components dispatch events; parents listen."
      },
      {
        "type": "mcq",
        "question": "How do you dispatch an event named \"select\"?",
        "options": [
          "this.fire(\"select\")",
          "this.dispatchEvent(new CustomEvent(\"select\"))",
          "this.send(\"select\")",
          "event.dispatch(\"select\")"
        ],
        "correct": 1,
        "explanation": "Use standard DOM CustomEvent API."
      },
      {
        "type": "mcq",
        "question": "How does a parent listen to a child's \"select\" event in HTML?",
        "options": [
          "on-select={handler}",
          "onselect={handler}",
          "handle-select={handler}",
          "@select={handler}"
        ],
        "correct": 1,
        "explanation": "Event listeners in HTML use \"on\" + eventname."
      },
      {
        "type": "mcq",
        "question": "What is Lightning Data Service (LDS)?",
        "options": [
          "A database",
          "A data caching and synchronization layer for UI components",
          "An API gateway",
          "A deployment tool"
        ],
        "correct": 1,
        "explanation": "LDS handles data operations without needing Apex."
      },
      {
        "type": "mcq",
        "question": "Which module is used to show a toast message?",
        "options": [
          "lightning/platformShowToastEvent",
          "lightning/toast",
          "salesforce/toast",
          "ui/toast"
        ],
        "correct": 0,
        "explanation": "Import ShowToastEvent to display toast notifications."
      },
      {
        "type": "mcq",
        "question": "What is NavigationMixin?",
        "options": [
          "A tool to draw maps",
          "A mixin to navigate to standard Salesforce pages/URLs",
          "A router component",
          "A sidebar"
        ],
        "correct": 1,
        "explanation": "NavigationMixin handles programmatic routing in LWC."
      },
      {
        "type": "mcq",
        "question": "How do you call an Apex method imperatively?",
        "options": [
          "Using @wire",
          "Import the method and call it like a standard JS Promise",
          "Using <apex:actionFunction>",
          "Using a visualforce page"
        ],
        "correct": 1,
        "explanation": "Imperative calls return a Promise."
      },
      {
        "type": "mcq",
        "question": "Why use imperative Apex instead of @wire?",
        "options": [
          "To query more records",
          "To control exactly when the call occurs (e.g. on button click)",
          "To bypass FLS",
          "To use SOAP"
        ],
        "correct": 1,
        "explanation": "@wire is automatic; imperative gives you manual control."
      },
      {
        "type": "mcq",
        "question": "What must be true about an Apex method to be used with @wire?",
        "options": [
          "It must return a List",
          "It must be annotated with @AuraEnabled(cacheable=true)",
          "It must be global",
          "It must perform DML"
        ],
        "correct": 1,
        "explanation": "@wire requires cacheable=true."
      },
      {
        "type": "mcq",
        "question": "Can a cacheable=true Apex method perform DML (Insert/Update)?",
        "options": [
          "Yes",
          "No",
          "Only Inserts",
          "Only Updates"
        ],
        "correct": 1,
        "explanation": "Cacheable methods are read-only and cannot perform DML."
      },
      {
        "type": "mcq",
        "question": "What is the purpose of connectedCallback()?",
        "options": [
          "Fires when component is destroyed",
          "Fires when component is inserted into the DOM",
          "Fires on every render",
          "Fires when an error occurs"
        ],
        "correct": 1,
        "explanation": "Use it for initialization logic."
      },
      {
        "type": "mcq",
        "question": "What is Shadow DOM?",
        "options": [
          "A dark theme",
          "Browser standard that encapsulates component CSS and DOM",
          "A hidden object",
          "A backup database"
        ],
        "correct": 1,
        "explanation": "Shadow DOM prevents CSS styles from leaking out or bleeding in."
      },
      {
        "type": "mcq",
        "question": "How do you query an element inside your component's template?",
        "options": [
          "document.getElementById()",
          "this.template.querySelector()",
          "window.querySelector()",
          "$(\"selector\")"
        ],
        "correct": 1,
        "explanation": "Use this.template to query within the component's Shadow DOM."
      },
      {
        "type": "mcq",
        "question": "What is Lightning Message Service (LMS)?",
        "options": [
          "An email tool",
          "A publish-subscribe mechanism to communicate across unrelated components",
          "A chat tool",
          "An SMS gateway"
        ],
        "correct": 1,
        "explanation": "LMS connects LWC, Aura, and VF across the DOM."
      },
      {
        "type": "mcq",
        "question": "What file defines an LMS channel?",
        "options": [
          ".messageChannel-meta.xml",
          ".lms",
          ".channel",
          ".xml"
        ],
        "correct": 0,
        "explanation": "LMS channels are defined in XML metadata files."
      }
    ],
    "hard": [
      {
        "type": "mcq",
        "question": "What is the renderedCallback() hook?",
        "options": [
          "Fires once on load",
          "Fires every time the component finishes rendering",
          "Fires when data changes",
          "Fires on error"
        ],
        "correct": 1,
        "explanation": "renderedCallback runs after every render cycle."
      },
      {
        "type": "mcq",
        "question": "Why should you be careful with renderedCallback()?",
        "options": [
          "It can cause infinite loops if you update a reactive property inside it",
          "It deletes data",
          "It is deprecated",
          "It hides the component"
        ],
        "correct": 0,
        "explanation": "Updating state in renderedCallback triggers another render."
      },
      {
        "type": "mcq",
        "question": "What is the disconnectedCallback() hook?",
        "options": [
          "Fires when the user logs out",
          "Fires when the component is removed from the DOM",
          "Fires on network loss",
          "Fires when Apex fails"
        ],
        "correct": 1,
        "explanation": "Used to clean up resources like LMS subscriptions."
      },
      {
        "type": "mcq",
        "question": "What is the errorCallback() hook?",
        "options": [
          "Catches errors during rendering or in lifecycle hooks of child components",
          "Catches Apex errors",
          "Catches syntax errors",
          "Catches network errors"
        ],
        "correct": 0,
        "explanation": "errorCallback provides an error boundary for child components."
      },
      {
        "type": "mcq",
        "question": "How do you access static resources in LWC?",
        "options": [
          "import myResource from \"@salesforce/resourceUrl/myResource\"",
          "src=\"/static/myResource\"",
          "Use a URL string",
          "Query it via Apex"
        ],
        "correct": 0,
        "explanation": "Use the @salesforce/resourceUrl scoped module."
      },
      {
        "type": "mcq",
        "question": "How do you access the current user's ID in LWC?",
        "options": [
          "import Id from \"@salesforce/user/Id\"",
          "this.user.id",
          "Query via Apex",
          "$User.Id"
        ],
        "correct": 0,
        "explanation": "Use the scoped module @salesforce/user/Id."
      },
      {
        "type": "mcq",
        "question": "What is the purpose of the js-meta.xml file?",
        "options": [
          "Defines component structure",
          "Defines configuration, targets (where the component can be used), and design attributes",
          "Defines CSS",
          "Defines Apex controllers"
        ],
        "correct": 1,
        "explanation": "The XML file makes the component available in Lightning App Builder."
      },
      {
        "type": "mcq",
        "question": "How do you make properties configurable in the Lightning App Builder?",
        "options": [
          "Use @api in JS and define <targetConfig> with <property> in XML",
          "Just use @api",
          "Use @track",
          "It happens automatically"
        ],
        "correct": 0,
        "explanation": "You must define properties in the targetConfigs section of the XML."
      },
      {
        "type": "mcq",
        "question": "What is getRecord in the uiRecordApi?",
        "options": [
          "An imperative Apex call",
          "A wire adapter to fetch a record's data without Apex",
          "A button component",
          "A DML statement"
        ],
        "correct": 1,
        "explanation": "getRecord is part of LDS and fetches data automatically."
      },
      {
        "type": "mcq",
        "question": "How do you refresh an @wire response when data changes?",
        "options": [
          "refreshWire()",
          "import { refreshApex } from \"@salesforce/apex\" and call it with the wired provisioned value",
          "Call the method again",
          "Reload the page"
        ],
        "correct": 1,
        "explanation": "refreshApex() invalidates the LDS cache for that wire."
      },
      {
        "type": "mcq",
        "question": "What does \"composed: true\" mean when dispatching an event?",
        "options": [
          "The event can cross the Shadow DOM boundary",
          "The event bubbles up",
          "The event has data",
          "The event is an object"
        ],
        "correct": 0,
        "explanation": "composed: true allows the event to leave the shadow root."
      },
      {
        "type": "mcq",
        "question": "What is the difference between bubbles: true and composed: true?",
        "options": [
          "Bubbles moves up the DOM within the shadow tree; Composed allows it to cross the shadow boundary",
          "They are the same",
          "Bubbles is for Aura, composed is for LWC",
          "Bubbles is faster"
        ],
        "correct": 0,
        "explanation": "Bubbles travels up; Composed breaks out of Shadow DOM."
      },
      {
        "type": "mcq",
        "question": "Can a component access the DOM of its child components?",
        "options": [
          "Yes, always",
          "No, the child's DOM is encapsulated in its own Shadow DOM",
          "Yes, using document.querySelector",
          "Only if the child is Aura"
        ],
        "correct": 1,
        "explanation": "Shadow DOM prevents parents from inspecting children's internal DOM."
      },
      {
        "type": "mcq",
        "question": "What is a slot (<slot>) in LWC?",
        "options": [
          "A storage variable",
          "A placeholder where a parent component can inject HTML markup into a child",
          "A time reservation",
          "An event listener"
        ],
        "correct": 1,
        "explanation": "Slots allow composition by passing markup from parent to child."
      },
      {
        "type": "mcq",
        "question": "How do you share JavaScript code between LWCs without a UI?",
        "options": [
          "Create an Apex class",
          "Create a Service Component (an LWC with only a .js file) and import it",
          "Use a Static Resource",
          "Use global variables"
        ],
        "correct": 1,
        "explanation": "Export functions/classes from a JS-only LWC."
      },
      {
        "type": "mcq",
        "question": "What is Workspace API in LWC?",
        "options": [
          "API for VS Code",
          "API to manage console tabs and subtabs in Lightning Console apps",
          "API for data import",
          "API for creating orgs"
        ],
        "correct": 1,
        "explanation": "Workspace API controls tabs in console applications."
      },
      {
        "type": "mcq",
        "question": "Can LWC components run in Salesforce Classic?",
        "options": [
          "Yes, natively",
          "No, they must be wrapped in an Aura component or Visualforce page",
          "Yes, with a plugin",
          "No, never"
        ],
        "correct": 1,
        "explanation": "LWC requires a wrapper to run in Classic/VF."
      },
      {
        "type": "mcq",
        "question": "What is Lightning Locker / LWS (Lightning Web Security)?",
        "options": [
          "A password manager",
          "A security architecture that isolates components belonging to different namespaces",
          "A network firewall",
          "An encryption tool"
        ],
        "correct": 1,
        "explanation": "LWS/Locker prevents cross-site scripting and DOM tampering."
      },
      {
        "type": "mcq",
        "question": "How do you mock @wire data in Jest tests?",
        "options": [
          "Make a real callout",
          "Use @salesforce/sfdx-lwc-jest and emit mock data",
          "Use System.debug",
          "It cannot be tested"
        ],
        "correct": 1,
        "explanation": "LWC Jest provides tools to mock wired data and test reactivity."
      },
      {
        "type": "mcq",
        "question": "What is the standard tool to write unit tests for LWC?",
        "options": [
          "Apex Tests",
          "Selenium",
          "Jest",
          "Mocha"
        ],
        "correct": 2,
        "explanation": "Jest is the standard testing framework for LWC."
      }
    ]
  }
};