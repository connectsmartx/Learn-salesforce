/* ============================================================
   MODULE 2 CONTENT — Salesforce Administration (10 Lessons)
   ============================================================ */

export const module2Content = {
  '2.1': {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p><strong>Profiles</strong> define the baseline set of permissions for a user — what objects they can access (CRUD), which fields they can see, which apps and tabs are visible, and what system permissions they have. Every user must have exactly one Profile.</p>
      </div>
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p><strong>Permission Sets</strong> are additive collections of permissions that extend a user's access beyond their Profile. A user can have zero or many Permission Sets.</p>
      </div>
      <h3>Profiles vs Permission Sets</h3>
      <table>
        <thead><tr><th>Feature</th><th>Profile</th><th>Permission Set</th></tr></thead>
        <tbody>
          <tr><td>Assignment</td><td>One per user (required)</td><td>Multiple per user (optional)</td></tr>
          <tr><td>Can restrict access</td><td>Yes</td><td>No — only adds</td></tr>
          <tr><td>Page layout assignment</td><td>Yes</td><td>No</td></tr>
          <tr><td>Login hours/IP restrictions</td><td>Yes</td><td>No</td></tr>
          <tr><td>Best for</td><td>Baseline minimum access</td><td>Granting additional permissions</td></tr>
        </tbody>
      </table>
      <h3>Key Profile Permissions (CRUD)</h3>
      <p>Profiles control object-level access via CRUD:</p>
      <ul>
        <li><strong>Create</strong> — Can the user create new records?</li>
        <li><strong>Read</strong> — Can the user view records?</li>
        <li><strong>Update</strong> — Can the user edit records?</li>
        <li><strong>Delete</strong> — Can the user delete records?</li>
      </ul>
      <div class="callout callout--tip">
        <p class="callout__title">💡 Best Practice</p>
        <p>Salesforce recommends using <strong>minimum-access profiles</strong> (like "Minimum Access - Salesforce") and granting additional permissions via Permission Sets and Permission Set Groups. This follows the <strong>principle of least privilege</strong>.</p>
      </div>
    `,
    examples: [
      { title: 'Example 1: Creating a Custom Profile', description: 'Clone an existing profile and modify it for sales reps.', code: `Steps to Create a Custom Profile:
═════════════════════════════════
1. Setup → Profiles → "Clone" next to "Standard User"
2. Name: "Sales Rep Profile"
3. Configure Object Permissions:
   ┌─────────────┬───────┬──────┬────────┬────────┐
   │ Object      │ Create│ Read │ Update │ Delete │
   ├─────────────┼───────┼──────┼────────┼────────┤
   │ Account     │  ✓    │  ✓   │  ✓     │  ✗    │
   │ Contact     │  ✓    │  ✓   │  ✓     │  ✗    │
   │ Opportunity │  ✓    │  ✓   │  ✓     │  ✗    │
   │ Case        │  ✗    │  ✓   │  ✗     │  ✗    │
   └─────────────┴───────┴──────┴────────┴────────┘
4. Set Tab Settings: Default On for Sales tabs
5. Save`, language: 'text', explanation: 'We clone rather than create from scratch to inherit a good baseline. Sales reps can create/read/edit but not delete — protecting data integrity.' },
      { title: 'Example 2: Permission Set for Report Access', description: 'Grant report creation access via a Permission Set.', code: `Permission Set: "Report Creator"
═══════════════════════════════
System Permissions Enabled:
  ✓ Create and Customize Reports
  ✓ Create and Customize Dashboards
  ✓ Export Reports
  ✓ Schedule Dashboards

Assignment:
  → Assign to: Sarah (Sales Rep), Mike (Marketing)
  → Both retain their "Sales Rep Profile"
  → But gain report creation abilities`, language: 'text', explanation: 'Permission Sets let you grant specific capabilities to individual users without modifying their profile or creating a new one.' }
    ],
    practice: {
      intro: 'Let\'s create a custom Profile and a Permission Set in your Developer Edition org.',
      steps: [
        'Go to Setup → Profiles. Click "Clone" next to "Standard User". Name it "Custom Sales Profile".',
        'In the cloned profile, under Object Permissions, remove Delete access for Accounts and Contacts.',
        'Under Tab Settings, set the Cases tab to "Tab Hidden".',
        'Save the profile.',
        'Go to Setup → Permission Sets → New.',
        'Name it "Report Creator". Set License to "Salesforce".',
        'Under System Permissions, enable "Create and Customize Reports".',
        'Save, then click "Manage Assignments" → "Add Assignments" → select your user.'
      ],
      expectedOutcome: 'You should have a custom profile with restricted delete access and a permission set that grants report creation capabilities. Your user should have both assigned.'
    },
    interviewQuestions: [
      { scenario: 'A new marketing team member needs the same access as other marketers but also needs to manage campaigns. How would you set this up?', answer: 'Assign the existing "Marketing User" profile (same as other marketers) and create a Permission Set called "Campaign Manager" with the "Marketing User" checkbox and campaign CRUD permissions enabled. Assign this Permission Set only to this user. This follows the principle of least privilege — the base profile stays the same, and additional permissions are layered via Permission Sets.' },
      { scenario: 'Your org has 15 different profiles for slight permission variations. What would you recommend to simplify this?', answer: 'I would recommend consolidating to 3-5 minimum-access profiles based on broad roles (Sales, Service, Marketing, Admin). Then use Permission Sets and Permission Set Groups to layer additional permissions. This reduces maintenance overhead, makes it easier to audit, and follows Salesforce best practices. Permission Set Groups can bundle related Permission Sets (e.g., "Sales Power User" = Sales Base + Report Creator + Dashboard Viewer).' },
      { scenario: 'A user reports they can see the Account object but cannot see the "Annual Revenue" field. What could be the issue?', answer: 'This is a Field-Level Security (FLS) issue. The user\'s Profile or Permission Sets don\'t grant Read access to the "Annual Revenue" field. To fix: go to the user\'s Profile → Field-Level Security for Account → check "Visible" for Annual Revenue. Alternatively, create a Permission Set with Read access to that field and assign it to the user.' },
      { scenario: 'Can a Permission Set remove access that a Profile grants?', answer: 'No. Permission Sets can only ADD permissions — they can never restrict or remove access granted by a Profile. Profiles set the baseline, and Permission Sets extend from there. If you need to restrict access, you must modify the Profile itself. This is a fundamental design principle in Salesforce security.' },
      { scenario: 'You need to restrict login hours for sales reps to business hours only (8 AM - 6 PM, Mon-Fri). Where do you configure this?', answer: 'Login hours are configured on the Profile, not Permission Sets. Go to the Sales Rep Profile → Login Hours → set the allowed hours for each day. Users attempting to log in outside these hours will be denied access. Existing sessions that extend past the end time will also be terminated.' }
    ]
  },

  '2.2': {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p>The <strong>Role Hierarchy</strong> is a mechanism that controls <strong>record-level visibility</strong> in Salesforce. Users higher in the hierarchy can always see records owned by users below them (when OWD is set to Private or Public Read Only). It mirrors your organization's management structure.</p>
      </div>
      <h3>How Role Hierarchy Works</h3>
      <p>The Role Hierarchy works like a tree. Each role can see all data owned by roles below it in the tree. This provides <strong>vertical data access</strong> — managers can see their team's records.</p>
      <h3>Key Points</h3>
      <ul>
        <li>Role Hierarchy only <strong>opens up</strong> access — it never restricts</li>
        <li>Works in conjunction with OWD settings (Private or Public Read Only)</li>
        <li>Users without a role cannot benefit from hierarchy-based sharing</li>
        <li>Not the same as a reporting structure (though often similar)</li>
        <li>Portal roles are separate from internal roles</li>
      </ul>
      <div class="callout callout--warning">
        <p class="callout__title">⚠️ Important</p>
        <p>Role Hierarchy only opens up access when OWD is set to Private or Public Read Only. If OWD is Public Read/Write, everyone already has full access, so hierarchy is irrelevant for that object.</p>
      </div>
    `,
    examples: [
      { title: 'Example 1: Company Role Hierarchy', description: 'A typical sales organization role hierarchy.', code: `Role Hierarchy:
═══════════════
CEO
├── VP Sales
│   ├── Regional Manager (West)
│   │   ├── Sales Rep 1
│   │   └── Sales Rep 2
│   └── Regional Manager (East)
│       ├── Sales Rep 3
│       └── Sales Rep 4
├── VP Service
│   └── Support Manager
│       ├── Agent 1
│       └── Agent 2
└── VP Marketing
    └── Marketing Manager

Data Visibility (OWD = Private for Opportunities):
• CEO can see ALL Opportunities
• VP Sales can see all Sales Opportunities
• Regional Manager (West) sees Rep 1 & 2's Opps
• Sales Rep 1 sees only their own Opps`, language: 'text', explanation: 'The hierarchy grants upward visibility. Each manager sees their direct and indirect reports\' records, but peers cannot see each other\'s records.' },
      { title: 'Example 2: Setting Up Roles', description: 'Steps to configure the role hierarchy in Salesforce.', code: `Setup → Roles → "Set Up Roles"
───────────────────────────────
1. Start with the CEO/top-level role
2. Click "Add Role" under CEO:
   - Label: "VP Sales"
   - Reports To: CEO
   - Role Name: VP_Sales
3. Repeat for sub-roles:
   - "Regional Manager" → Reports To: VP Sales
   - "Sales Rep" → Reports To: Regional Manager

Grant Access Using Hierarchies checkbox:
┌─────────────────┬────────────────┐
│ Object          │ Grant Access?  │
├─────────────────┼────────────────┤
│ Opportunities   │ ✓ Checked      │
│ Cases           │ ✓ Checked      │
│ Custom Objects  │ Configurable   │
└─────────────────┴────────────────┘`, language: 'text', explanation: 'The "Grant Access Using Hierarchies" checkbox on OWD settings controls whether the role hierarchy opens up access for each object.' }
    ],
    practice: {
      intro: 'Build a role hierarchy in your Developer Edition org.',
      steps: [
        'Go to Setup → Roles → "Set Up Roles" (or "Assign Roles" if already configured).',
        'Click "Add Role" at the top level. Name it "CEO". Save.',
        'Under CEO, add "VP Sales" and "VP Service".',
        'Under VP Sales, add "Sales Manager".',
        'Under Sales Manager, add "Sales Representative".',
        'Go to Setup → Users and assign yourself the "CEO" role.',
        'Create a second test user with the "Sales Representative" role.',
        'Verify in OWD settings (Setup → Sharing Settings) that "Grant Access Using Hierarchies" is checked for relevant objects.'
      ],
      expectedOutcome: 'You should have a functional role hierarchy with at least 4 levels. Users higher in the hierarchy should be able to see records owned by users below them.'
    },
    interviewQuestions: [
      { scenario: 'Your company has 500 sales reps across 4 regions. Each region should only see their own Accounts. How would you configure this?', answer: 'Set Account OWD to Private. Create a Role Hierarchy with: CEO → VP Sales → 4 Regional Manager roles → Sales Rep roles under each region. Each rep sees only their own accounts, regional managers see their region\'s accounts, VP Sales sees all sales accounts, and CEO sees everything. If cross-region visibility is needed for specific cases, add Criteria-Based Sharing Rules.' },
      { scenario: 'A company doesn\'t have a clear management hierarchy. They want all sales reps to see each other\'s opportunities. Should you use Role Hierarchy?', answer: 'No. If all sales reps should see each other\'s opportunities, set the OWD for Opportunities to "Public Read Only" (or Public Read/Write if they should also edit). Role Hierarchy is unnecessary because the baseline sharing already provides visibility. You could still set up a basic hierarchy for reporting/forecasting purposes, but it wouldn\'t affect data visibility.' },
      { scenario: 'Can you delete a role that has users assigned to it?', answer: 'No. You must first reassign all users to a different role before you can delete the original role. Also, if there are child roles, they must be moved or deleted first. Records owned by users in the role are not affected — ownership doesn\'t change when a user\'s role changes.' },
      { scenario: 'What happens when a user is moved from one role to another in the hierarchy?', answer: 'The user\'s record visibility changes immediately. They gain access to records visible from their new role position and lose access from their old position. Sharing rules are re-evaluated. However, record ownership doesn\'t change — the user still owns the same records. This can be significant during org restructuring.' },
      { scenario: 'A support manager says they can see their team\'s Cases but not Opportunities owned by the same reps. Why?', answer: 'Check the "Grant Access Using Hierarchies" checkbox in OWD settings. It\'s likely checked for Cases but unchecked for Opportunities. Each object has its own setting. Also verify the OWD for Opportunities — if it\'s Public Read/Write, hierarchy is irrelevant. If Private, the checkbox must be checked for the hierarchy to grant upward visibility.' }
    ]
  },

  '2.3': {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p><strong>Record-Level Security</strong> (also called <strong>Sharing</strong>) controls which specific records a user can see and edit. It operates independently of object-level security (Profiles) and works through a layered model: OWD → Role Hierarchy → Sharing Rules → Manual Sharing.</p>
      </div>
      <h3>Organization-Wide Defaults (OWD)</h3>
      <p>OWD sets the <strong>baseline</strong> — the most restrictive level of access for each object. You then open up access using the tools above.</p>
      <table>
        <thead><tr><th>OWD Setting</th><th>Who Can Access</th></tr></thead>
        <tbody>
          <tr><td><strong>Private</strong></td><td>Only record owner + users above in role hierarchy</td></tr>
          <tr><td><strong>Public Read Only</strong></td><td>Everyone can read, only owner can edit</td></tr>
          <tr><td><strong>Public Read/Write</strong></td><td>Everyone can read and edit</td></tr>
          <tr><td><strong>Controlled by Parent</strong></td><td>Detail objects inherit parent's sharing (Master-Detail only)</td></tr>
        </tbody>
      </table>
      <h3>Sharing Rules</h3>
      <p>Sharing Rules grant additional access beyond OWD. They can be <strong>owner-based</strong> (share records owned by certain users/roles) or <strong>criteria-based</strong> (share records matching specific field criteria).</p>
      <h3>Manual Sharing</h3>
      <p>Record owners and administrators can manually share individual records with specific users, roles, or groups.</p>
      <div class="callout callout--tip">
        <p class="callout__title">💡 Remember</p>
        <p>Sharing can only <strong>open up</strong> access. You cannot use sharing rules to restrict access that OWD or Role Hierarchy already grants. Always start with the most restrictive OWD and open up selectively.</p>
      </div>
    `,
    examples: [
      { title: 'Example 1: OWD + Sharing Rules', description: 'Configuring record-level security for a multi-team org.', code: `Scenario: Two sales teams sharing Opportunities
═══════════════════════════════════════════════
OWD for Opportunity: Private

Role Hierarchy:
  CEO → VP Sales → Team Lead A / Team Lead B
                  → Rep A1, A2  / Rep B1, B2

Without Sharing Rules:
  Rep A1 sees only their own Opps
  Team Lead A sees A1 + A2's Opps
  Team Lead B sees B1 + B2's Opps
  
With Sharing Rule:
  Type: Owner-Based
  Owned by: "Team A" Role and Subordinates
  Share with: "Team B" Role and Subordinates
  Access: Read Only
  
Result: Team B can now VIEW Team A's Opps (but not edit)`, language: 'text', explanation: 'Sharing Rules extend visibility beyond the Role Hierarchy. Here, Team B gains read access to Team A\'s opportunities without changing OWD or hierarchy.' },
      { title: 'Example 2: Criteria-Based Sharing', description: 'Share records based on field values.', code: `Criteria-Based Sharing Rule for Cases:
═══════════════════════════════════════
Name: "Share High Priority Cases"
Object: Case
Rule Type: Criteria-Based

Criteria:
  Priority EQUALS "High"
  AND Status NOT EQUALS "Closed"

Share With: Role = "Support Escalation Team"
Access Level: Read/Write

Result: All open high-priority Cases are
automatically visible and editable by
the Escalation Team, regardless of ownership.`, language: 'text', explanation: 'Criteria-based sharing rules are powerful for dynamic access — they automatically share records when field values match specific conditions.' }
    ],
    practice: {
      intro: 'Configure record-level security with OWD and Sharing Rules.',
      steps: [
        'Go to Setup → Sharing Settings.',
        'Set the OWD for Accounts to "Private". Click Save.',
        'Note the warning about recalculating sharing — click OK.',
        'Under "Account Sharing Rules", click "New".',
        'Create an Owner-Based Sharing Rule: records owned by your role, shared with "All Internal Users", Read Only access.',
        'Save and wait for sharing recalculation.',
        'Navigate to an Account record. Click the "Sharing" button (if visible) to see the sharing detail.',
        'Try Manual Sharing: on any Account record, click Sharing → Add → share with a specific user.'
      ],
      expectedOutcome: 'Accounts are now Private by default, but your sharing rule grants Read access to all internal users. Manual shares appear in the sharing detail list.'
    },
    interviewQuestions: [
      { scenario: 'Your CEO wants to ensure that Opportunity data is only visible to the sales team. Non-sales users should not see any Opportunities. How would you configure this?', answer: 'Set OWD for Opportunities to Private. The sales team\'s Role Hierarchy handles internal visibility (reps see their own, managers see their team\'s, VP sees all). Non-sales users won\'t have access because Private OWD blocks them. No sharing rules needed for non-sales users. This is the simplest, most secure approach.' },
      { scenario: 'Two departments need to share Cases: Support and Engineering. Support owns the Cases, but Engineering needs Read/Write access to Cases with Status = "Escalated". What\'s your approach?', answer: 'OWD for Cases: Private. Create a Criteria-Based Sharing Rule: when Status = "Escalated", share with the Engineering Role/Group with Read/Write access. This way, Engineering only sees escalated cases and can update them, while Support sees all their own cases through ownership. Non-escalated cases remain private to Support.' },
      { scenario: 'Can you make OWD more restrictive than Private?', answer: 'No. Private is the most restrictive OWD setting. With Private, only the record owner (and users above in the role hierarchy, if "Grant Access Using Hierarchies" is checked) can access the record. There is no "No Access" OWD — the owner must always be able to see their own records.' },
      { scenario: 'What is the difference between Owner-Based and Criteria-Based Sharing Rules?', answer: 'Owner-Based shares records based on WHO owns them (specific users, roles, groups). Criteria-Based shares records based on WHAT the record contains (field values meeting certain conditions). Owner-Based is evaluated once when ownership is set. Criteria-Based is re-evaluated whenever field values change.' },
      { scenario: 'A user manually shared a record with a colleague. The colleague\'s role later changes. Does the manual share persist?', answer: 'Yes. Manual shares persist regardless of role changes. They are only removed when: (1) the record owner explicitly removes the share, (2) an admin removes it, (3) the shared user is deactivated, or (4) OWD is changed to a more open level (e.g., Private to Public Read/Write, which makes manual sharing moot). Manual shares are NOT affected by role hierarchy changes.' }
    ]
  },

  '2.4': {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p><strong>Page Layouts</strong> control the arrangement of fields, buttons, related lists, and custom links on a record page. Different profiles can see different page layouts for the same object, often combined with <strong>Record Types</strong> for maximum flexibility.</p>
      </div>
      <h3>Page Layouts vs Lightning App Builder</h3>
      <table>
        <thead><tr><th>Feature</th><th>Page Layout</th><th>Lightning App Builder</th></tr></thead>
        <tbody>
          <tr><td>Controls</td><td>Field arrangement, buttons, related lists</td><td>Component placement, visibility rules</td></tr>
          <tr><td>Technology</td><td>Classic (works in LEX too)</td><td>Lightning only</td></tr>
          <tr><td>Dynamic visibility</td><td>No</td><td>Yes (component visibility filters)</td></tr>
          <tr><td>Custom components</td><td>No</td><td>Yes (LWC, Aura)</td></tr>
        </tbody>
      </table>
      <h3>Dynamic Forms</h3>
      <p><strong>Dynamic Forms</strong> is a Lightning feature that lets you place individual fields (not entire field sections) as components on a Lightning page, with visibility rules. This replaces the need for multiple page layouts in many scenarios.</p>
      <div class="callout callout--tip">
        <p class="callout__title">💡 Best Practice</p>
        <p>Use Lightning App Builder with Dynamic Forms for new Lightning pages. Reserve classic Page Layouts for field arrangement and related list configuration.</p>
      </div>
    `,
    examples: [
      { title: 'Example 1: Page Layout Configuration', description: 'Organizing fields on an Account page layout.', code: `Account Page Layout: "Sales Account Layout"
═══════════════════════════════════════════
Section: Account Information
  ┌──────────────────┬──────────────────┐
  │ Account Name *   │ Account Number   │
  │ Phone            │ Fax              │
  │ Website          │ Industry         │
  │ Type             │ Annual Revenue   │
  └──────────────────┴──────────────────┘

Section: Address Information (collapsed by default)
  ┌──────────────────┬──────────────────┐
  │ Billing Address  │ Shipping Address │
  └──────────────────┴──────────────────┘

Related Lists:
  1. Contacts (Name, Email, Phone, Title)
  2. Opportunities (Name, Stage, Amount, Close Date)
  3. Cases (Number, Subject, Status, Priority)
  4. Activity History`, language: 'text', explanation: 'Page layouts define what users see. You can organize fields into sections, make sections collapsible, and choose which related lists appear and in what order.' }
    ],
    practice: {
      intro: 'Customize a page layout and build a Lightning App Page.',
      steps: [
        'Go to Setup → Object Manager → Account → Page Layouts.',
        'Click the default layout. Drag fields to rearrange them.',
        'Create a new section called "Additional Details" and move some fields into it.',
        'Under Related Lists, reorder them (drag Contacts to the top).',
        'Save the layout.',
        'Now go to Setup → Lightning App Builder → New → Record Page → Account.',
        'Add a Rich Text component with a welcome message.',
        'Add a Related List component and configure it.',
        'Save and Activate as the Org Default.'
      ],
      expectedOutcome: 'You should have a customized page layout with reorganized fields and a Lightning Record Page with additional components.'
    },
    interviewQuestions: [
      { scenario: 'A client wants different fields visible for "Enterprise" vs "Small Business" Accounts. How would you implement this?', answer: 'Create two Record Types: "Enterprise" and "Small Business". Then create two Page Layouts with the appropriate fields for each. Use Page Layout Assignment to map the Record Types to the correct Profiles. For a more modern approach, use Dynamic Forms with visibility rules on a single Lightning page — showing/hiding fields based on the Record Type.' },
      { scenario: 'What is the advantage of Dynamic Forms over multiple page layouts?', answer: 'Dynamic Forms eliminate the need for multiple page layouts by using visibility rules on individual fields. Benefits: fewer layouts to maintain, real-time visibility changes without page reloads, ability to show/hide fields based on any criteria (not just Record Type/Profile), and works within the Lightning App Builder for a unified design experience.' },
      { scenario: 'Can you use Lightning App Builder to customize the layout for a custom object?', answer: 'Yes. Lightning App Builder works with any standard or custom object. You can create Record Pages for custom objects, add LWC and Aura components, configure Dynamic Forms, set up Dynamic Actions, and assign the page to specific apps, record types, or profiles.' },
      { scenario: 'What is the difference between a Lightning Record Page and a Page Layout?', answer: 'A Page Layout controls field arrangement and related lists (classic technology, works everywhere). A Lightning Record Page is built in Lightning App Builder and controls the overall component layout — it can include custom components, visibility rules, and Dynamic Forms. In Lightning Experience, a Record Page wraps around a Page Layout. Both work together.' },
      { scenario: 'How do you assign different page layouts to different profiles?', answer: 'Go to Setup → Object Manager → select object → Page Layouts → Page Layout Assignment. You\'ll see a matrix of profiles × record types. Click "Edit Assignment" and select which layout each profile-record type combination should see. This lets you give Sales reps a simplified layout while Admins see a comprehensive one.' }
    ]
  },

  '2.5': {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p><strong>Validation Rules</strong> are formulas that enforce data quality by preventing records from being saved when the formula evaluates to <strong>TRUE</strong>. When the rule fires, the user sees an error message and the record is not saved.</p>
      </div>
      <h3>How Validation Rules Work</h3>
      <p>A validation rule contains a <strong>formula expression</strong> that returns TRUE or FALSE. If the formula returns <strong>TRUE, the rule fires</strong> and the record cannot be saved. Think of it as: "If this condition is TRUE, the data is INVALID."</p>
      <h3>Common Formula Functions</h3>
      <ul>
        <li><strong>ISBLANK(field)</strong> — Checks if a field is empty</li>
        <li><strong>ISPICKVAL(field, value)</strong> — Checks a picklist value</li>
        <li><strong>REGEX(field, pattern)</strong> — Pattern matching</li>
        <li><strong>LEN(field)</strong> — Returns the length of a text field</li>
        <li><strong>AND(), OR(), NOT()</strong> — Logical operators</li>
        <li><strong>PRIORVALUE(field)</strong> — Gets the previous value (for updates)</li>
      </ul>
    `,
    examples: [
      { title: 'Example 1: Required Field Based on Stage', description: 'Make Amount required when Opportunity Stage is "Closed Won".', code: `Validation Rule: "Amount_Required_On_Close"
═══════════════════════════════════════════
Formula:
  AND(
    ISPICKVAL(StageName, "Closed Won"),
    ISBLANK(Amount)
  )

Error Message: "Amount is required when Stage is Closed Won."
Error Location: Field → Amount

Logic: Fires when Stage = "Closed Won" AND Amount is blank.`, language: 'text', explanation: 'This rule prevents closing an opportunity without specifying the amount. The AND() ensures both conditions must be true for the error to fire.' },
      { title: 'Example 2: Email Format Validation', description: 'Ensure a custom email field matches proper format.', code: `Validation Rule: "Valid_Email_Format"
═════════════════════════════════════
Formula:
  NOT(
    REGEX(
      Custom_Email__c,
      "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
    )
  )

Error Condition:
  ┌────────────────────────┬─────────┐
  │ Input                  │ Valid?  │
  ├────────────────────────┼─────────┤
  │ user@example.com       │ ✓      │
  │ user@domain.co.uk      │ ✓      │
  │ user@                  │ ✗ Error│
  │ @domain.com            │ ✗ Error│
  │ user domain.com        │ ✗ Error│
  └────────────────────────┴─────────┘`, language: 'text', explanation: 'REGEX validates the email format pattern. NOT() inverts it so the rule fires when the format does NOT match.' },
      { title: 'Example 3: Prevent Back-Dating Close Date', description: 'Don\'t allow Close Date to be in the past.', code: `Validation Rule: "No_Past_Close_Date"
══════════════════════════════════════
Formula:
  AND(
    ISNEW() || ISCHANGED(CloseDate),
    CloseDate < TODAY()
  )

Error: "Close Date cannot be in the past."

Logic: Only fires on new records or when Close
Date is changed. Existing records with past
dates are not affected unless the date is edited.`, language: 'text', explanation: 'Using ISNEW() || ISCHANGED() prevents the rule from blocking edits to unrelated fields on records that already have past dates.' }
    ],
    practice: {
      intro: 'Create validation rules to enforce data quality.',
      steps: [
        'Go to Setup → Object Manager → Opportunity → Validation Rules → New.',
        'Name: "Amount_Required_On_Close".',
        'Formula: AND(ISPICKVAL(StageName, "Closed Won"), ISBLANK(Amount))',
        'Error Message: "Amount is required when closing an Opportunity."',
        'Set Error Location to "Field" → Amount.',
        'Save and test: try to set an Opportunity to "Closed Won" without an Amount.',
        'Create another rule on Contact: require Phone when Department is "Sales".',
        'Formula: AND(ISPICKVAL(Department, "Sales"), ISBLANK(Phone))'
      ],
      expectedOutcome: 'You should see error messages when trying to save records that violate your validation rules. The Amount field should highlight when closing an Opportunity without a value.'
    },
    interviewQuestions: [
      { scenario: 'A user complains that they cannot save a record even though they\'ve filled in all visible fields. What could be the issue?', answer: 'A validation rule is likely firing on a field that is either hidden from their page layout, populated by automation, or involves a field they don\'t realize needs a specific value. Steps to debug: Check Setup → Object → Validation Rules to see all active rules. Use the error message to identify which rule is firing. Check if the rule references fields not on the user\'s layout. Consider adding the field to the layout or adjusting the rule logic.' },
      { scenario: 'How do validation rules interact with the order of execution?', answer: 'Validation rules run AFTER before triggers but BEFORE after triggers. The full order is: Before Triggers → System Validations (required fields, unique constraints) → Custom Validation Rules → Duplicate Rules → After Triggers → Assignment/Auto-Response Rules → Workflow/Process Builder/Flow. If a before trigger modifies a field, validation rules evaluate the modified value.' },
      { scenario: 'Can you bypass a validation rule for specific users or profiles?', answer: 'Yes. Add a condition to the formula that excludes specific users or profiles. Common patterns: OR($Profile.Name = "System Administrator", ...) to exempt admins. OR($User.Bypass_Validation__c, ...) using a custom checkbox on the User object for temporary bypasses. OR($Permission.Custom_Permission_Name, ...) using a custom permission assigned via Permission Set.' },
      { scenario: 'What is the difference between ISBLANK() and ISNULL() in validation rules?', answer: 'ISBLANK() works for all field types — it checks if a field is empty or contains only whitespace. ISNULL() only works for certain field types (not text or text area). Salesforce recommends always using ISBLANK() as it is more reliable and works consistently across all field types. ISNULL() is essentially legacy.' },
      { scenario: 'You need to prevent the Discount field from exceeding 30% unless the user has a "Discount Approver" permission. How?', answer: 'Create a validation rule: AND(Discount__c > 0.30, NOT($Permission.Discount_Approver)). Create a Custom Permission called "Discount_Approver", add it to a Permission Set, and assign the Permission Set to authorized users. This way, most users are blocked at 30%, but approved users can override the limit.' }
    ]
  },

  '2.6': {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p><strong>Workflow Rules</strong> and <strong>Process Builder</strong> are legacy automation tools that trigger actions when records meet certain criteria. Salesforce has retired Process Builder and recommends migrating to <strong>Flow Builder</strong> for all new automation.</p>
      </div>
      <h3>Workflow Rules (Legacy)</h3>
      <p>Workflow Rules evaluate records and trigger one or more actions:</p>
      <ul>
        <li><strong>Email Alerts</strong> — Send templated emails</li>
        <li><strong>Field Updates</strong> — Change field values</li>
        <li><strong>Tasks</strong> — Create task records</li>
        <li><strong>Outbound Messages</strong> — Send SOAP messages to external systems</li>
      </ul>
      <h3>Process Builder (Retired)</h3>
      <p>Process Builder was more powerful than Workflow Rules, supporting multiple criteria, immediate + scheduled actions, and record creation. However, it's now retired in favor of Flow Builder.</p>
      <div class="callout callout--warning">
        <p class="callout__title">⚠️ Migration Required</p>
        <p>Salesforce has announced that Workflow Rules and Process Builder are no longer receiving updates. All new automation should use <strong>Flow Builder</strong>. Existing automations should be migrated using the "Migrate to Flow" tool in Setup.</p>
      </div>
    `,
    examples: [
      { title: 'Example 1: Workflow Rule', description: 'Auto-update a field when criteria are met.', code: `Workflow Rule: "Set High Priority on Large Deals"
═══════════════════════════════════════════════════
Object: Opportunity
Evaluation Criteria: When created, and any time it's edited
Rule Criteria: Amount > 100000

Actions:
  1. Field Update:
     Field: Priority__c
     New Value: "High"
  
  2. Email Alert:
     Template: "Large Deal Notification"
     Recipients: Opportunity Owner's Manager`, language: 'text', explanation: 'When an Opportunity with Amount > $100,000 is created or edited, it automatically sets Priority to "High" and emails the owner\'s manager.' },
      { title: 'Example 2: Migrating to Flow', description: 'The equivalent automation in Flow Builder.', code: `Flow: "Large Deal Automation" (Record-Triggered)
═══════════════════════════════════════════════════
Trigger: Opportunity — After Save
Entry Conditions: Amount > 100000

Elements:
  1. Update Records (same record):
     - Priority__c = "High"
  
  2. Send Email Alert:
     - Template: "Large Deal Notification"
     - Recipients: {!$Record.Owner.ManagerId}

Advantages over Workflow Rule:
  ✓ More actions available (create, delete, call Apex)
  ✓ Decision elements for complex logic
  ✓ Loops and collections support
  ✓ Before-save for efficiency
  ✓ Active development and new features`, language: 'text', explanation: 'Flow Builder provides the same functionality as Workflow Rules but with significantly more power, flexibility, and active support from Salesforce.' }
    ],
    practice: {
      intro: 'Understand legacy automation and practice with Flow Builder.',
      steps: [
        'Go to Setup → Workflow Rules to see any existing rules (your org may have none).',
        'Note: You can still create Workflow Rules, but Salesforce recommends Flows.',
        'Go to Setup → Process Builder to see any existing processes.',
        'Now go to Setup → Flows → New Flow → Record-Triggered Flow.',
        'Select Opportunity as the object, trigger on "A record is created or updated".',
        'Set Entry Conditions: Amount > 50000.',
        'Add an "Update Records" element to set a custom field value.',
        'Save and Activate the Flow.'
      ],
      expectedOutcome: 'You should understand the legacy tools and have created a Record-Triggered Flow that automates a field update based on criteria.'
    },
    interviewQuestions: [
      { scenario: 'A client has 50 Workflow Rules and 20 Process Builders. They\'re experiencing performance issues. What would you recommend?', answer: 'Recommend a phased migration to Flow Builder. Start by auditing all automations to identify overlaps and conflicts. Use Salesforce\'s "Migrate to Flow" tool for simple migrations. Consolidate related automations into fewer, more efficient Flows. Before-Save Flows are faster than After-Save for field updates. This reduces order-of-execution complexity and improves performance.' },
      { scenario: 'What can Flow Builder do that Workflow Rules cannot?', answer: 'Flow Builder can: create/update/delete records on any object (Workflow only updates the same record or parent in Master-Detail), use loops and collections for batch processing, include decision elements for complex branching, call Apex actions, make HTTP callouts (via Apex), display screens for user interaction, and run before save for better performance. Workflow is limited to field updates, email alerts, tasks, and outbound messages.' },
      { scenario: 'In what order do automations execute when a record is saved?', answer: 'Order of execution: Before Triggers → System Validations → Custom Validation Rules → After Triggers → Assignment Rules → Auto-Response Rules → Workflow Rules → Escalation Rules → Process Builder → Before-Save Flow (record-triggered) → After-Save Flow (record-triggered) → Entitlement Rules → Roll-Up Summary Fields → Re-evaluation if field updates cause cross-object changes. Before-Save Flows run before commit, After-Save Flows run after initial commit.' },
      { scenario: 'Can a Workflow Rule trigger another Workflow Rule?', answer: 'Yes, indirectly. If a Workflow Rule performs a field update on the same record, it can re-trigger the record\'s evaluation criteria, which may fire other Workflow Rules. This is called "cascading" and can lead to infinite loops if not careful. Salesforce limits cascading to prevent issues. The same applies to Flows — After-Save Flows that update the triggering record can re-trigger.' },
      { scenario: 'What is the "Migrate to Flow" tool?', answer: 'It\'s a built-in Salesforce tool (Setup → Migrate to Flow) that automatically converts Workflow Rules and Process Builder processes into equivalent Flow Builder flows. It handles simple conversions well but may need manual adjustments for complex logic. It\'s the recommended way to move off legacy automation tools, especially given Salesforce\'s retirement timeline for Process Builder.' }
    ]
  },

  '2.7': {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p><strong>Flows</strong> are Salesforce's most powerful no-code automation tool. Built in <strong>Flow Builder</strong>, Flows can automate complex business processes by collecting data, making decisions, creating/updating records, calling Apex, and more.</p>
      </div>
      <h3>Types of Flows</h3>
      <table>
        <thead><tr><th>Flow Type</th><th>Trigger</th><th>Use Case</th></tr></thead>
        <tbody>
          <tr><td><strong>Screen Flow</strong></td><td>User clicks button/link</td><td>Guided wizards, data entry forms</td></tr>
          <tr><td><strong>Record-Triggered Flow</strong></td><td>Record create/update/delete</td><td>Auto-fill fields, send notifications</td></tr>
          <tr><td><strong>Schedule-Triggered Flow</strong></td><td>Scheduled time</td><td>Nightly data cleanup, batch updates</td></tr>
          <tr><td><strong>Auto-Launched Flow</strong></td><td>Invoked by another process</td><td>Subflows, Apex-invoked, API-invoked</td></tr>
          <tr><td><strong>Platform Event-Triggered</strong></td><td>Platform Event received</td><td>Real-time integrations</td></tr>
        </tbody>
      </table>
      <h3>Before-Save vs After-Save (Record-Triggered)</h3>
      <ul>
        <li><strong>Before Save</strong>: Runs before the record is saved. Faster, no DML needed for the triggering record. Use for field updates on the same record.</li>
        <li><strong>After Save</strong>: Runs after the record is committed. Required for creating/updating other records, sending emails, or calling external services.</li>
      </ul>
    `,
    examples: [
      { title: 'Example 1: Before-Save Flow', description: 'Auto-populate a field before the record saves.', code: `Flow: "Auto-Set Account Rating"
Type: Record-Triggered (Before Save)
Object: Account
When: Record is created or updated

Entry Conditions:
  AnnualRevenue is not null

Decision Element:
  ├── If AnnualRevenue > 1000000
  │     → Update: Rating = "Hot"
  ├── If AnnualRevenue > 500000
  │     → Update: Rating = "Warm"
  └── Default
        → Update: Rating = "Cold"

No DML needed — changes apply directly!`, language: 'text', explanation: 'Before-Save Flows are the most efficient way to update fields on the triggering record. No DML statements are consumed because the update is applied before the record commits.' },
      { title: 'Example 2: Screen Flow', description: 'A guided wizard for creating a new customer.', code: `Flow: "New Customer Wizard"
Type: Screen Flow

Screen 1: "Customer Details"
  ├── Company Name (Text Input)
  ├── Industry (Picklist)
  └── Annual Revenue (Currency)

Screen 2: "Primary Contact"
  ├── First Name, Last Name
  ├── Email, Phone
  └── Title

Logic:
  1. Create Account record
  2. Create Contact linked to Account
  3. Create Opportunity (if Revenue > $100K)
  4. Show confirmation screen

Deployed as: Quick Action on Home Page`, language: 'text', explanation: 'Screen Flows provide guided, wizard-like interfaces for complex data entry. They can create multiple related records in a single interaction.' }
    ],
    practice: {
      intro: 'Build a Record-Triggered Flow and a Screen Flow.',
      steps: [
        'Go to Setup → Flows → New Flow → Record-Triggered Flow.',
        'Object: Contact. Trigger: "A record is created or updated". Optimize for: "Fast Field Updates" (Before Save).',
        'Add Entry Conditions: Department is not null.',
        'Add a Decision element: If Department = "Executive" → update Title to "Executive Team".',
        'Save as "Auto-Set Contact Title" and Activate.',
        'Test by creating a Contact with Department = "Executive".',
        'Now create a Screen Flow: New Flow → Screen Flow.',
        'Add a Screen element with text inputs for Name and Email.',
        'Add a "Create Records" element to create a Contact with those values.',
        'Save, Activate, and test by running it from Flow Debug.'
      ],
      expectedOutcome: 'Your Before-Save Flow should automatically set the Title when Department is "Executive". Your Screen Flow should guide you through creating a Contact with a custom form.'
    },
    interviewQuestions: [
      { scenario: 'When should you use a Before-Save Flow vs an After-Save Flow?', answer: 'Use Before-Save when you only need to update fields on the triggering record — it\'s faster, doesn\'t consume DML limits, and runs before validation rules. Use After-Save when you need to: create/update/delete other records, send email alerts, post to Chatter, make callouts, or access the record\'s ID (which isn\'t available before insert). A common pattern is using both: Before-Save for field calculations, After-Save for related record operations.' },
      { scenario: 'A Flow is supposed to update a related record but nothing happens. How do you debug?', answer: 'Steps: 1) Check if the Flow is Active. 2) Use Flow Debug mode to step through the logic. 3) Verify entry conditions are being met. 4) Check for fault connectors to see if errors are being silently caught. 5) Look at the Debug Log for DML errors or governor limit exceptions. 6) Ensure the running user has permission to update the related object. 7) Check if another automation is reverting the change.' },
      { scenario: 'Can a Flow call an Apex class?', answer: 'Yes. Use an "Action" element in Flow and select an Apex class annotated with @InvocableMethod. The method receives input variables and can return output variables. This is the bridge between no-code (Flow) and pro-code (Apex) — use it when Flow logic isn\'t sufficient, e.g., complex calculations, API callouts, or bulk data processing.' },
      { scenario: 'What happens if a Record-Triggered Flow fails?', answer: 'If a Before-Save Flow fails, the record save is blocked and the user sees an error. If an After-Save Flow fails, the behavior depends on the error handling: without a fault connector, the entire transaction rolls back (the record save is reverted). With a fault connector, you can handle the error gracefully (log it, show a custom message, or retry). This is why adding Fault connectors to critical After-Save Flows is a best practice.' },
      { scenario: 'How do you prevent a Record-Triggered Flow from running recursively?', answer: 'Record-Triggered Flows have built-in recursion protection: they run at most twice per record per transaction (once for the original save, once if the record is re-saved). Additionally, you can: 1) Add an entry condition like "When a record is created, AND any time it\'s updated to meet the condition" instead of "every time a record is updated". 2) Use $Record__Prior values to check if relevant fields actually changed. 3) Use a custom checkbox field as a "processed" flag.' }
    ]
  },

  '2.8': {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p><strong>Approval Processes</strong> automate multi-step review and approval workflows. When a record is submitted for approval, it is locked (preventing edits) and routed through defined approver steps until approved, rejected, or recalled.</p>
      </div>
      <h3>Approval Process Components</h3>
      <ul>
        <li><strong>Entry Criteria</strong> — Which records can be submitted (e.g., Discount > 20%)</li>
        <li><strong>Approval Steps</strong> — Ordered sequence of approver assignments</li>
        <li><strong>Approver Assignment</strong> — Who approves (Manager, specific user, queue, related field)</li>
        <li><strong>Initial/Final Actions</strong> — Actions on submit, approve, reject, recall</li>
        <li><strong>Email Templates</strong> — Notification emails to approvers</li>
      </ul>
    `,
    examples: [
      { title: 'Example 1: Discount Approval Process', description: 'Multi-step approval for large discounts.', code: `Approval Process: "Discount Approval"
Object: Opportunity
Entry Criteria: Discount__c > 20%

Step 1: Manager Approval
  Approver: Opportunity Owner's Manager
  Criteria: Discount__c > 20% AND Discount__c <= 40%
  → If Approved: Proceed (or Final Approval if only step)
  → If Rejected: Final Rejection

Step 2: VP Approval (only if Discount > 40%)
  Approver: Role = "VP Sales"
  Criteria: Discount__c > 40%
  → If Approved: Final Approval
  → If Rejected: Final Rejection

Initial Submission Actions:
  - Lock Record
  - Field Update: Approval_Status__c = "Pending"

Final Approval Actions:
  - Unlock Record  
  - Field Update: Approval_Status__c = "Approved"
  - Email Alert to Opportunity Owner

Final Rejection Actions:
  - Unlock Record
  - Field Update: Approval_Status__c = "Rejected"
  - Email Alert to Opportunity Owner`, language: 'text', explanation: 'This two-step process routes small discounts (20-40%) to the manager and large discounts (>40%) to both manager and VP for approval.' }
    ],
    practice: {
      intro: 'Create a basic approval process for Opportunities.',
      steps: [
        'Go to Setup → Approval Processes → Opportunity → Create New Approval Process → Use Jump Start Wizard.',
        'Name: "Discount Approval". Entry Criteria: Discount > 10 (use any available numeric field or create a custom Discount__c field first).',
        'Set the Approver to: "Let the submitter choose the approver manually" (for testing).',
        'In Initial Submission Actions, add a Field Update to set a Status field.',
        'In Final Approval Actions, add another Field Update to mark as Approved.',
        'Activate the Approval Process.',
        'Create an Opportunity that meets the criteria and click "Submit for Approval".'
      ],
      expectedOutcome: 'The record should lock on submission, route to the chosen approver, and update the status fields on approval/rejection.'
    },
    interviewQuestions: [
      { scenario: 'A sales rep needs to recall an approval request because they entered the wrong discount. Can they do this, and what happens?', answer: 'Yes, the submitter can recall the request if the admin has enabled the "Allow Submitters to Recall Approval Requests" option. On recall: the record is unlocked, any Recall Actions execute (like resetting the status field), and the record can be edited and re-submitted. The approval history shows the recall event.' },
      { scenario: 'Can approval processes be triggered automatically, or do they always require manual submission?', answer: 'By default, users manually submit records using the "Submit for Approval" button. However, you can auto-submit using: a Record-Triggered Flow with a "Submit for Approval" action element, or Process Builder (legacy), or Apex code using Approval.ProcessSubmitRequest. This enables scenarios like auto-submitting when a record meets certain criteria.' },
      { scenario: 'What is the difference between a parallel and sequential approval process?', answer: 'Sequential: Approval steps execute one after another (Step 1 must approve before Step 2 starts). Parallel (within a step): Salesforce supports "Unanimous" (all must approve) or "First Response" (first approver\'s decision wins) within a single step. True multi-path parallel approvals require custom solutions with Apex.' },
      { scenario: 'Can you have multiple approval processes for the same object?', answer: 'Yes! An object can have multiple approval processes, each with different entry criteria. When a record is submitted, Salesforce evaluates processes in order and uses the FIRST matching one. You set the evaluation order in Setup. Only one process executes per submission.' },
      { scenario: 'What happens if the designated approver is out of office?', answer: 'Options: 1) The approver can delegate approval authority to another user (Setup → Personal → Approver Settings → Delegated Approver). 2) An admin can reassign the pending approval to another user. 3) You can configure the step to go to a Queue instead of a single user. 4) Use "Jump to" logic to skip to the next step if the approver doesn\'t respond within a timeframe (requires scheduled actions).' }
    ]
  },

  '2.9': {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p><strong>Reports</strong> in Salesforce retrieve and display data from your org in formatted views. <strong>Dashboards</strong> are visual representations of report data using charts, gauges, tables, and metrics.</p>
      </div>
      <h3>Report Types</h3>
      <table>
        <thead><tr><th>Type</th><th>Description</th><th>Use Case</th></tr></thead>
        <tbody>
          <tr><td><strong>Tabular</strong></td><td>Simple rows and columns, no grouping</td><td>Mailing lists, data exports</td></tr>
          <tr><td><strong>Summary</strong></td><td>Grouped by rows with subtotals</td><td>Sales by region, cases by status</td></tr>
          <tr><td><strong>Matrix</strong></td><td>Grouped by rows AND columns</td><td>Revenue by quarter by product</td></tr>
          <tr><td><strong>Joined</strong></td><td>Multiple report blocks in one view</td><td>Comparing Accounts with vs without Opps</td></tr>
        </tbody>
      </table>
      <h3>Dashboard Components</h3>
      <ul>
        <li><strong>Chart</strong> — Bar, Line, Donut, Funnel (from Summary/Matrix reports)</li>
        <li><strong>Gauge</strong> — Shows a value against a target range</li>
        <li><strong>Metric</strong> — Single grand total number</li>
        <li><strong>Table</strong> — Tabular data display</li>
      </ul>
      <h3>Key Concepts</h3>
      <ul>
        <li><strong>Report Filters</strong> — Limit data by field values, date ranges, or cross-filters</li>
        <li><strong>Bucket Fields</strong> — Group values into custom categories without creating formulas</li>
        <li><strong>Custom Report Types</strong> — Define which objects and relationships appear in reports</li>
        <li><strong>Dynamic Dashboards</strong> — Show data based on the viewing user (up to 3 per org in EE)</li>
      </ul>
    `,
    examples: [
      { title: 'Example 1: Summary Report', description: 'Sales pipeline report grouped by stage.', code: `Report: "Opportunity Pipeline by Stage"
Type: Summary Report
Object: Opportunities

Columns: Opportunity Name, Account Name, Amount, Close Date
Group By: Stage
Filter: Close Date = THIS_FISCAL_QUARTER

Result:
┌──────────────────┬──────────────────┬──────────┐
│ Stage            │ Opportunity      │ Amount   │
├──────────────────┼──────────────────┼──────────┤
│ Prospecting      │ Acme Deal        │ $50,000  │
│                  │ Beta Project     │ $75,000  │
│ Subtotal (2)     │                  │ $125,000 │
├──────────────────┼──────────────────┼──────────┤
│ Proposal         │ Gamma Expansion  │ $200,000 │
│ Subtotal (1)     │                  │ $200,000 │
├──────────────────┼──────────────────┼──────────┤
│ Closed Won       │ Delta Migration  │ $150,000 │
│ Subtotal (1)     │                  │ $150,000 │
├──────────────────┴──────────────────┼──────────┤
│ Grand Total (4)                     │ $475,000 │
└─────────────────────────────────────┴──────────┘`, language: 'text', explanation: 'Summary reports group data and show subtotals. This report shows the pipeline grouped by stage with dollar amounts subtotaled per stage.' }
    ],
    practice: {
      intro: 'Create reports and a dashboard in your Developer Edition org.',
      steps: [
        'Click the "Reports" tab → "New Report".',
        'Choose "Opportunities" report type.',
        'Add columns: Opportunity Name, Amount, Stage, Close Date.',
        'Add a Group: Stage. This converts it to a Summary report.',
        'Add a Filter: Close Date equals "This Year".',
        'Run the report and Save it as "My Pipeline Report".',
        'Now go to Dashboards → New Dashboard → name it "Sales Dashboard".',
        'Click "+ Component" → select your report → choose "Donut Chart" → Group by Stage.',
        'Add another component: same report as a "Metric" showing Sum of Amount.',
        'Save the dashboard.'
      ],
      expectedOutcome: 'You should have a Summary report showing opportunities by stage and a dashboard with a donut chart and metric component visualizing the data.'
    },
    interviewQuestions: [
      { scenario: 'A VP wants a dashboard that shows each rep\'s individual pipeline. What type of dashboard do you recommend?', answer: 'A Dynamic Dashboard. Unlike static dashboards that show data from one user\'s perspective, dynamic dashboards display data based on the logged-in viewer. Each sales rep sees their own pipeline. Note: Enterprise Edition supports up to 5 dynamic dashboards, Unlimited supports up to 10. Set "View Dashboard As" to "The dashboard viewer".' },
      { scenario: 'Can Tabular reports be used as the source for dashboard charts?', answer: 'No. Tabular reports can only power Table and Metric dashboard components (not charts). Charts require grouped data, which only Summary and Matrix reports provide. If you need a chart, switch the report to Summary format by adding at least one grouping.' },
      { scenario: 'What are Bucket Fields and when would you use them?', answer: 'Bucket Fields let you categorize report data into custom groups without creating formula fields. Example: bucket Account "Industry" into "Tech" (Technology, Electronics), "Finance" (Banking, Insurance), "Other" (everything else). Use them for ad-hoc grouping in reports without modifying the data model. They\'re report-specific and don\'t appear elsewhere in the org.' },
      { scenario: 'How do Cross-Filters work in reports?', answer: 'Cross-filters let you filter report results based on related objects. Example: "Accounts WITH Opportunities" shows only accounts that have at least one opportunity. "Accounts WITHOUT Cases" shows accounts that have no cases. You can add sub-filters to the cross-filter: "Accounts WITH Opportunities WHERE Amount > $50,000". This is powerful for finding gaps in data.' },
      { scenario: 'A report shows 2,000 rows but the user expects more. What could be limiting the results?', answer: 'Several factors: 1) Row limit — reports display up to 2,000 rows in the UI (export to get more). 2) Filters may be excluding records. 3) Record-level security — the user can only see records they have access to. 4) The report\'s "Show" filter might be set to "My records" instead of "All records". 5) The report type may not include the expected object relationships. Check all of these systematically.' }
    ]
  },

  '2.10': {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p><strong>Data Management</strong> in Salesforce encompasses importing, exporting, updating, and maintaining the quality of data within your org. The two primary tools are <strong>Data Import Wizard</strong> (web-based, up to 50,000 records) and <strong>Data Loader</strong> (desktop app, up to 5 million records).</p>
      </div>
      <h3>Data Import Wizard vs Data Loader</h3>
      <table>
        <thead><tr><th>Feature</th><th>Data Import Wizard</th><th>Data Loader</th></tr></thead>
        <tbody>
          <tr><td>Interface</td><td>Web-based</td><td>Desktop app (also CLI)</td></tr>
          <tr><td>Record limit</td><td>50,000</td><td>5 million</td></tr>
          <tr><td>Objects supported</td><td>Accounts, Contacts, Leads, Solutions, Custom</td><td>All objects</td></tr>
          <tr><td>Operations</td><td>Insert, Update, Upsert</td><td>Insert, Update, Upsert, Delete, Hard Delete, Export</td></tr>
          <tr><td>Scheduling</td><td>No</td><td>Yes (CLI mode)</td></tr>
          <tr><td>API</td><td>SOAP API</td><td>SOAP or Bulk API</td></tr>
        </tbody>
      </table>
      <h3>Key Concepts</h3>
      <ul>
        <li><strong>External ID</strong> — A custom field marked as External ID, used to match records during upsert operations</li>
        <li><strong>Upsert</strong> — A combination of update and insert: if a matching record exists, update it; otherwise, create a new one</li>
        <li><strong>Bulk API</strong> — Optimized for large volumes; processes data in parallel batches of 10,000</li>
        <li><strong>Duplicate Management</strong> — Matching Rules and Duplicate Rules to prevent duplicate records</li>
      </ul>
    `,
    examples: [
      { title: 'Example 1: Data Import Wizard', description: 'Import 500 contacts from a CSV file.', code: `Data Import Wizard Steps:
═══════════════════════
1. Setup → Data Import Wizard → Launch
2. Select: "Contacts and Accounts"
3. Choose: "Add new records"
4. Upload CSV file:
   ┌────────────┬────────────┬───────────────────┬──────────────┐
   │ First Name │ Last Name  │ Email             │ Account Name │
   ├────────────┼────────────┼───────────────────┼──────────────┤
   │ John       │ Smith      │ john@acme.com     │ Acme Corp    │
   │ Jane       │ Doe        │ jane@beta.com     │ Beta Inc     │
   │ ...        │ ...        │ ...               │ ...          │
   └────────────┴────────────┴───────────────────┴──────────────┘
5. Map columns to Salesforce fields
6. Review and Start Import
7. Check import status in the notification area`, language: 'text', explanation: 'The Data Import Wizard handles the mapping between CSV columns and Salesforce fields. It can automatically match or create Account records based on the Account Name column.' },
      { title: 'Example 2: Data Loader Upsert', description: 'Update existing records or insert new ones using External ID.', code: `Data Loader Upsert Operation:
═════════════════════════════
Object: Account
External ID Field: ERP_ID__c
CSV File:
┌──────────────┬─────────────────┬────────────┐
│ ERP_ID__c    │ Name            │ Industry   │
├──────────────┼─────────────────┼────────────┤
│ ERP-001      │ Acme Corp       │ Technology │ ← Exists → UPDATE
│ ERP-002      │ Beta Inc        │ Finance    │ ← Exists → UPDATE
│ ERP-003      │ Gamma LLC       │ Healthcare │ ← New → INSERT
└──────────────┴─────────────────┴────────────┘

Result:
✓ 2 records updated (matched by ERP_ID__c)
✓ 1 record inserted (no match found)
✗ 0 errors`, language: 'text', explanation: 'Upsert uses the External ID to find existing records. If found, it updates them; if not, it inserts new ones. This is essential for syncing data from external systems like ERPs.' }
    ],
    practice: {
      intro: 'Practice importing and managing data in your Developer Edition org.',
      steps: [
        'Create a CSV file with 5 rows of Contact data (First Name, Last Name, Email, Phone).',
        'Go to Setup → Data Import Wizard → Launch Wizard.',
        'Select "Contacts and Accounts" → "Add new records".',
        'Upload your CSV and map the columns.',
        'Start the import and verify the records were created.',
        'Now go to Setup → Duplicate Management → Duplicate Rules.',
        'Review the standard duplicate rules for Contacts and Accounts.',
        'Try creating a Contact with the same email as an existing one to see the duplicate warning.'
      ],
      expectedOutcome: 'You should have successfully imported 5 Contact records and understand how duplicate management alerts work when creating records with matching criteria.'
    },
    interviewQuestions: [
      { scenario: 'You need to update 2 million Account records with a new Industry classification. Which tool and approach should you use?', answer: 'Use Data Loader with the Bulk API. Steps: 1) Export current Account data (Id, Industry) as a backup. 2) Prepare the CSV with Id and new Industry values. 3) Configure Data Loader to use Bulk API (Settings → Use Bulk API = true). 4) Run the Update operation with batch size of 10,000. 5) Review success and error logs. The Bulk API processes in parallel and is optimized for large volumes.' },
      { scenario: 'What is the difference between Delete and Hard Delete in Data Loader?', answer: 'Delete moves records to the Recycle Bin where they can be recovered for 15 days. Hard Delete permanently removes records, bypassing the Recycle Bin. Hard Delete requires the "Bulk API Hard Delete" permission and is useful when you need to free up storage immediately or permanently remove sensitive data. Deleted records count toward storage until they\'re purged from the Recycle Bin.' },
      { scenario: 'How would you prevent duplicate records from being imported?', answer: 'Multiple approaches: 1) Use Duplicate Rules with Matching Rules to alert or block duplicates on creation. 2) Use External ID fields for upsert operations (matches by external system ID). 3) Pre-process the CSV to remove duplicates before import. 4) Use unique fields (like Email) with a validation rule to enforce uniqueness. 5) For large imports, use a staging custom object to validate before committing to the final object.' },
      { scenario: 'What is the purpose of an External ID field?', answer: 'External ID fields serve three purposes: 1) They\'re indexed for faster queries (SOQL WHERE clauses). 2) They enable upsert matching — Data Loader and API upsert operations match records by External ID. 3) They store identifiers from external systems (ERP IDs, legacy system IDs) to maintain mapping between Salesforce and external data sources. You can have up to 25 External ID fields per object (Enterprise Edition).' },
      { scenario: 'During a data import, 200 out of 10,000 records fail. How do you handle this?', answer: 'Data Loader generates a success file and an error file. Steps: 1) Open the error file to identify failure reasons (validation rule violations, required fields missing, duplicate detection, data format issues). 2) Fix the data in the error file. 3) Re-run the import using only the corrected error records. 4) Verify the re-import success. Common causes: validation rules firing, required fields blank, picklist values not matching, record type issues, or lookup fields referencing non-existent records.' }
    ]
  }
};
