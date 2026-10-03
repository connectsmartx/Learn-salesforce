/* ============================================================
   MODULE 1 CONTENT — Salesforce Fundamentals (10 Lessons)
   ============================================================ */

export const module1Content = {
  '1.1': {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p><strong>Salesforce</strong> is a cloud-based Customer Relationship Management (CRM) platform that helps businesses manage their sales, service, marketing, and more — all from a single, unified platform accessible via web browser. It is built on a <strong>multi-tenant architecture</strong>, meaning multiple organizations share the same infrastructure and code base while keeping their data completely isolated and secure.</p>
      </div>
      <h3>What is CRM?</h3>
      <p>CRM stands for <strong>Customer Relationship Management</strong>. It is a strategy and technology for managing all your company's relationships and interactions with customers and potential customers. A CRM system helps companies stay connected to customers, streamline processes, and improve profitability.</p>
      <p>Before CRM systems, businesses stored customer data in spreadsheets, emails, sticky notes, or even memory. This led to lost deals, missed follow-ups, and poor customer experience. CRM centralizes all this data into one accessible platform.</p>

      <h3>Why Salesforce?</h3>
      <p>Salesforce is the <strong>#1 CRM platform in the world</strong>, holding approximately 23% of the global CRM market share. Founded in 1999 by Marc Benioff, Salesforce pioneered the concept of delivering enterprise software via the cloud (Software-as-a-Service or SaaS). Key reasons businesses choose Salesforce include:</p>
      <ul>
        <li><strong>No software installation</strong> — Access from any browser, anywhere</li>
        <li><strong>Automatic upgrades</strong> — Three releases per year (Spring, Summer, Winter)</li>
        <li><strong>Highly customizable</strong> — Build apps without code using clicks, or with code using Apex and LWC</li>
        <li><strong>AppExchange marketplace</strong> — Thousands of pre-built apps and integrations</li>
        <li><strong>Scalable</strong> — Works for 5-person startups to Fortune 500 enterprises</li>
      </ul>

      <h3>Cloud Computing Model</h3>
      <p>Salesforce operates on a <strong>cloud computing</strong> model. Instead of installing software on your computer or hosting servers in your office, everything runs on Salesforce's servers (data centers). The three cloud service models are:</p>
      <table>
        <thead><tr><th>Model</th><th>What It Means</th><th>Salesforce Example</th></tr></thead>
        <tbody>
          <tr><td><strong>SaaS</strong> (Software as a Service)</td><td>Complete application delivered over the internet</td><td>Sales Cloud, Service Cloud</td></tr>
          <tr><td><strong>PaaS</strong> (Platform as a Service)</td><td>Platform for building custom applications</td><td>Salesforce Platform (Force.com)</td></tr>
          <tr><td><strong>IaaS</strong> (Infrastructure as a Service)</td><td>Raw computing resources</td><td>Salesforce Hyperforce</td></tr>
        </tbody>
      </table>

      <h3>Multi-Tenant Architecture</h3>
      <p>Salesforce uses a <strong>multi-tenant architecture</strong>, similar to an apartment building. Every tenant (organization) shares the same building (infrastructure), but each apartment (org) is completely private. This means:</p>
      <ul>
        <li>All customers share the same servers, database, and code version</li>
        <li>Data is completely isolated — Company A cannot see Company B's data</li>
        <li>Updates are rolled out to everyone simultaneously</li>
        <li>Governor limits ensure no single tenant can monopolize shared resources</li>
      </ul>
      <div class="callout callout--tip">
        <p class="callout__title">💡 Key Insight</p>
        <p>Think of multi-tenancy like a Gmail server: millions of users share the same email infrastructure, but each person can only see their own inbox. Salesforce works the same way for business data.</p>
      </div>
    `,
    examples: [
      {
        title: 'Example 1: Sales Cloud in Action',
        description: 'A sales rep at a software company uses Salesforce to track their deals.',
        code: `Scenario: Sales Pipeline Management
─────────────────────────────────────
Lead: John Smith (Acme Corp)
  → Converted to Contact + Account + Opportunity
  → Opportunity: "Acme Corp - Enterprise License"
  → Stage: Proposal/Price Quote
  → Amount: $50,000
  → Close Date: 2025-03-15
  → Activities: 3 calls logged, 2 emails sent
  → Next Step: Send final contract`,
        language: 'text',
        explanation: 'This shows how Salesforce tracks the entire customer journey from lead to deal. Every interaction is logged, making it easy to pick up where you left off.'
      },
      {
        title: 'Example 2: Service Cloud Use Case',
        description: 'A support team uses Salesforce to manage customer issues.',
        code: `Scenario: Customer Support Case
─────────────────────────────────
Case #: 00001234
Subject: "Login page not loading"
Contact: Jane Doe (Beta Inc.)
Priority: High
Status: In Progress
Assigned To: Support Agent Mike
Channel: Email → Escalated to Phone
SLA: 4-hour response (Met ✓)
Resolution: Cache cleared, login restored`,
        language: 'text',
        explanation: 'Service Cloud tracks support cases from creation to resolution, ensuring SLA compliance and customer satisfaction.'
      },
      {
        title: 'Example 3: Multi-Tenant Architecture Analogy',
        description: 'Understanding how multiple companies share one Salesforce instance.',
        code: `Multi-Tenant Architecture (Apartment Building Analogy)
═══════════════════════════════════════════════════════

SALESFORCE DATA CENTER (Building)
┌─────────────────────────────────────────┐
│                                         │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐ │
│  │ Org A   │  │ Org B   │  │ Org C   │ │
│  │ (Apt 1) │  │ (Apt 2) │  │ (Apt 3) │ │
│  │         │  │         │  │         │ │
│  │ Data: 🔒│  │ Data: 🔒│  │ Data: 🔒│ │
│  └─────────┘  └─────────┘  └─────────┘ │
│                                         │
│  Shared: Servers, Network, Salesforce   │
│          Code Base, Security Updates    │
│                                         │
│  Isolated: Data, Customizations,        │
│            Users, Configurations        │
└─────────────────────────────────────────┘`,
        language: 'text',
        explanation: 'Each org has its own isolated data and configurations, but shares the underlying infrastructure — making it cost-effective and easy to maintain.'
      }
    ],
    practice: {
      intro: 'Let\'s explore the Salesforce ecosystem hands-on by signing up for a free Developer Edition org.',
      steps: [
        'Go to <a href="https://developer.salesforce.com/signup" target="_blank" rel="noopener">developer.salesforce.com/signup</a> and fill in your details to create a free Developer Edition org.',
        'Check your email and verify your account by setting a password.',
        'Log in to your new org. You will land on the Lightning Experience Home page.',
        'Click the App Launcher (grid icon, top-left) and browse the available apps like Sales, Service, and Marketing.',
        'Navigate to Setup (gear icon → Setup) and explore the left-side menu. This is where all administration and configuration happens.',
        'In Setup, search for "Company Information" and note your Organization ID — this is your unique org identifier.'
      ],
      expectedOutcome: 'You should now have a fully functional Salesforce Developer Edition org with access to Setup, App Launcher, and the Lightning Experience homepage.'
    },
    interviewQuestions: [
      {
        scenario: 'Your manager asks you to explain to a non-technical stakeholder why the company should migrate from spreadsheets to Salesforce. How would you make the case?',
        answer: 'I would explain that spreadsheets lack real-time collaboration, have no built-in security or audit trail, and cannot automate workflows. Salesforce provides a centralized, cloud-based platform where all teams can access the same data in real-time, automate repetitive tasks (like follow-up emails), generate reports and dashboards instantly, and scale as the company grows — all without managing any servers or software installations.'
      },
      {
        scenario: 'A client is concerned about data security in Salesforce because they heard "data is in the cloud." How do you address this concern?',
        answer: 'I would explain that Salesforce uses multi-tenant architecture with complete data isolation between orgs. Salesforce is SOC 2 Type II certified, ISO 27001 compliant, and GDPR compliant. Data is encrypted in transit (TLS) and at rest (Platform Encryption). Additionally, Salesforce provides features like IP restrictions, two-factor authentication, field-level security, and audit trails. I would also mention trust.salesforce.com where they can monitor system status and security in real-time.'
      },
      {
        scenario: 'During a Salesforce implementation project, the CTO asks: "What is the difference between SaaS and PaaS in the context of Salesforce?" How do you explain it?',
        answer: 'SaaS (Software as a Service) refers to ready-to-use Salesforce products like Sales Cloud or Service Cloud — they work out of the box. PaaS (Platform as a Service) refers to the Salesforce Platform (formerly Force.com), which lets you build custom applications using Apex, LWC, and declarative tools. Think of SaaS as buying a furnished apartment, and PaaS as buying an empty plot where you can build whatever you want.'
      },
      {
        scenario: 'An architect from a competing CRM vendor argues that multi-tenancy is a security risk. How do you counter this argument?',
        answer: 'Multi-tenancy in Salesforce does NOT mean shared data. Each org has logically isolated data, separate metadata, and independent customizations. The shared infrastructure actually benefits security because Salesforce invests billions in securing one platform rather than each customer managing their own servers. Governor limits prevent any single org from affecting others. Salesforce has never had a multi-tenant data leak in 25+ years of operation.'
      },
      {
        scenario: 'A small business with 10 employees asks if Salesforce is overkill for them. What would you recommend?',
        answer: 'Salesforce offers Salesforce Essentials (now Starter Edition), designed specifically for small businesses with up to 10 users. It costs around $25/user/month and includes basic CRM features. However, I would also assess their needs — if they only need contact tracking, a simpler tool might suffice. But if they plan to grow, automate sales processes, or integrate with other tools, Salesforce scales from 10 to 10,000+ users without migration headaches.'
      }
    ]
  },

  '1.2': {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p><strong>Salesforce Editions</strong> are tiered product packages that determine the features, storage limits, API call limits, and customization capabilities available to an organization. Each edition is designed for a different business size and complexity level.</p>
      </div>
      <h3>Salesforce Editions Overview</h3>
      <p>Salesforce offers several editions, each building on the previous one with more features and higher limits:</p>
      <table>
        <thead><tr><th>Edition</th><th>Target Audience</th><th>Key Features</th><th>Price (approx/user/month)</th></tr></thead>
        <tbody>
          <tr><td><strong>Starter (Essentials)</strong></td><td>Small business (1-10 users)</td><td>Basic CRM, accounts, contacts, leads, opportunities</td><td>$25</td></tr>
          <tr><td><strong>Professional</strong></td><td>Growing businesses</td><td>Complete CRM, forecasting, customizable dashboards</td><td>$80</td></tr>
          <tr><td><strong>Enterprise</strong></td><td>Mid-to-large orgs</td><td>Workflow automation, Apex/VF, API access, advanced reporting</td><td>$165</td></tr>
          <tr><td><strong>Unlimited</strong></td><td>Large enterprises</td><td>Unlimited customizations, 24/7 support, sandbox types</td><td>$330</td></tr>
          <tr><td><strong>Developer</strong></td><td>Developers/Learning</td><td>Full Enterprise features, limited storage, free forever</td><td>Free</td></tr>
        </tbody>
      </table>

      <h3>Salesforce Clouds</h3>
      <p>Salesforce products are organized into <strong>Clouds</strong>, each addressing a specific business function:</p>
      <ul>
        <li><strong>Sales Cloud</strong> — Lead management, opportunities, forecasting, CPQ</li>
        <li><strong>Service Cloud</strong> — Case management, knowledge base, live agent, omni-channel</li>
        <li><strong>Marketing Cloud</strong> — Email marketing, journey builder, social studio, advertising</li>
        <li><strong>Commerce Cloud</strong> — B2B and B2C ecommerce storefronts</li>
        <li><strong>Experience Cloud</strong> — Customer and partner portals, communities</li>
        <li><strong>Analytics Cloud (Tableau CRM)</strong> — Advanced analytics and AI-powered insights</li>
        <li><strong>Platform</strong> — Custom app development with Apex, LWC, Flows</li>
      </ul>

      <h3>Licensing Model</h3>
      <p>Salesforce uses a <strong>per-user, per-month subscription</strong> model. Key licensing concepts include:</p>
      <ul>
        <li><strong>User Licenses</strong> — Determine the baseline features a user can access (e.g., Salesforce, Salesforce Platform)</li>
        <li><strong>Feature Licenses</strong> — Enable additional features on top of user licenses (e.g., Marketing User, Knowledge User)</li>
        <li><strong>Permission Set Licenses</strong> — Grant specific permissions without changing the user license</li>
      </ul>
      <div class="callout callout--tip">
        <p class="callout__title">💡 Developer Edition</p>
        <p>The Developer Edition is <strong>completely free</strong> and includes most Enterprise Edition features. It has limited data storage (5MB data, 20MB file) and 2 user licenses, making it perfect for learning and development. You can create as many Developer Edition orgs as you want.</p>
      </div>
    `,
    examples: [
      {
        title: 'Example 1: Choosing the Right Edition',
        description: 'A startup with 15 sales reps needs CRM with forecasting and custom reports.',
        code: `Decision Matrix: Choosing a Salesforce Edition
═══════════════════════════════════════════════════

Requirement Analysis:
┌────────────────────────────────┬──────┬──────┬───────┐
│ Feature Needed                 │ Pro  │ Ent  │ Unltd │
├────────────────────────────────┼──────┼──────┼───────┤
│ Lead & Opportunity Management  │  ✓   │  ✓   │   ✓   │
│ Forecasting                    │  ✓   │  ✓   │   ✓   │
│ Custom Reports & Dashboards    │  ✓   │  ✓   │   ✓   │
│ Workflow Automation            │  ✗   │  ✓   │   ✓   │
│ Apex & Custom Development      │  ✗   │  ✓   │   ✓   │
│ API Access                     │  ✗   │  ✓   │   ✓   │
│ Multiple Sandboxes             │  ✗   │  ✓   │   ✓   │
│ 24/7 Premium Support           │  ✗   │  ✗   │   ✓   │
├────────────────────────────────┼──────┼──────┼───────┤
│ Price per user/month           │ $80  │ $165 │  $330 │
│ 15 users annual cost           │$14.4K│$29.7K│ $59.4K│
└────────────────────────────────┴──────┴──────┴───────┘

Recommendation: Enterprise Edition
Reason: Startup needs workflow automation and may
        need custom Apex development as they grow.`,
        language: 'text',
        explanation: 'Enterprise Edition is the most popular choice because it balances features and cost. It includes API access and Apex development, which are essential for scaling.'
      },
      {
        title: 'Example 2: User License Types',
        description: 'Understanding the different license types in a typical org.',
        code: `User License Assignment Example
════════════════════════════════

Organization: TechCorp (Enterprise Edition, 50 licenses)

┌──────────────────┬──────────────┬──────────────────────┐
│ User             │ License Type │ Features Accessible  │
├──────────────────┼──────────────┼──────────────────────┤
│ Sales Rep        │ Salesforce   │ Full CRM access      │
│ Sales Manager    │ Salesforce   │ Full CRM + Reports   │
│ Marketing User   │ Salesforce   │ CRM + Marketing feat.│
│ Portal Customer  │ Customer Com.│ Portal access only   │
│ App Developer    │ SF Platform  │ Custom apps only     │
│ Read-Only User   │ Chatter Free │ Chatter + view data  │
└──────────────────┴──────────────┴──────────────────────┘

Note: Salesforce Platform licenses are cheaper ($25/mo)
      but only give access to custom apps, not standard
      CRM objects like Leads and Opportunities.`,
        language: 'text',
        explanation: 'Different user types may need different licenses. Using the right license type optimizes costs — not every user needs a full Salesforce license.'
      }
    ],
    practice: {
      intro: 'Let\'s explore the editions and features available in your Developer Edition org.',
      steps: [
        'Log in to your Salesforce Developer Edition org.',
        'Go to Setup → search for "Company Information" in the Quick Find box.',
        'Note your Organization Edition — it should show "Developer Edition."',
        'Look at the User Licenses section. You should see "Salesforce" license with 2 licenses available.',
        'Search for "Feature Licenses" in Setup and browse the available feature licenses.',
        'Go to <a href="https://www.salesforce.com/editions-pricing/overview/" target="_blank" rel="noopener">salesforce.com/editions-pricing</a> and compare the feature lists across different editions.'
      ],
      expectedOutcome: 'You should be able to identify your org edition, see the available user and feature licenses, and understand the feature differences between editions.'
    },
    interviewQuestions: [
      {
        scenario: 'A client with 200 employees asks you to recommend a Salesforce edition. They need CRM, workflow automation, and plan to build custom Apex integrations. What do you recommend and why?',
        answer: 'I would recommend Enterprise Edition. It includes full CRM capabilities, workflow and process automation, Apex and Visualforce development, API access for integrations, and multiple sandbox environments for development and testing. While Unlimited Edition offers more, Enterprise Edition provides all the features they need at a lower price point ($165/user/month vs $330). They can always upgrade later if they need 24/7 premier support or higher API limits.'
      },
      {
        scenario: 'Your organization has 50 sales reps who need full CRM access and 100 warehouse workers who only need to access a custom inventory tracking app. How would you optimize licensing costs?',
        answer: 'I would assign Salesforce licenses ($165/user/month) to the 50 sales reps for full CRM access, and Salesforce Platform licenses ($25/user/month) to the 100 warehouse workers for the custom inventory app. This saves significant cost because Platform licenses are much cheaper and sufficient for custom app access. The warehouse workers don\'t need access to Leads, Opportunities, or other standard CRM objects.'
      },
      {
        scenario: 'A developer asks you the difference between a Developer Edition org and a sandbox. How do you explain it?',
        answer: 'A Developer Edition org is a standalone, free Salesforce environment with its own data and configuration — it\'s not connected to any production org. A sandbox is a copy of a production org (metadata and optionally data) used for development, testing, or training. Sandboxes are linked to a production org and can deploy changes back to production. Developer Edition is ideal for learning and ISV app development, while sandboxes are used in real project development lifecycles.'
      },
      {
        scenario: 'During a Salesforce implementation, the CFO asks why they can\'t just use Salesforce Essentials to save money. The team has 30 users and needs process automation. What do you explain?',
        answer: 'Salesforce Essentials (Starter) has a hard limit of 10 users, so it cannot support 30 users. Additionally, Essentials lacks key features like workflow rules, Process Builder, advanced reports, and API access. For 30 users needing process automation, Professional Edition (at minimum) or Enterprise Edition would be appropriate. I would show a feature comparison to demonstrate that the per-user cost increase is justified by the automation, customization, and reporting capabilities they need.'
      },
      {
        scenario: 'A Salesforce ISV (Independent Software Vendor) partner wants to build and distribute a managed package. Which edition and org type should they use for development?',
        answer: 'They should use a Partner Developer Edition org, which can be obtained through the Salesforce Partner Program. This org provides additional features like higher storage limits and the ability to create managed packages. They develop and package their app in this org, then list it on AppExchange. For testing, they should use separate Developer Edition orgs or scratch orgs (via Salesforce DX) to test installation and functionality across different Salesforce editions.'
      }
    ]
  },

  '1.3': {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p><strong>Salesforce Architecture</strong> refers to the underlying technical design of the Salesforce platform, built on a <strong>metadata-driven</strong> development model that follows the <strong>Model-View-Controller (MVC)</strong> pattern. This architecture enables declarative (point-and-click) and programmatic customization while maintaining data isolation across tenants.</p>
      </div>
      <h3>The MVC Pattern in Salesforce</h3>
      <p>The Model-View-Controller pattern separates application logic into three interconnected layers:</p>
      <table>
        <thead><tr><th>Layer</th><th>Role</th><th>Salesforce Implementation</th></tr></thead>
        <tbody>
          <tr><td><strong>Model</strong> (Data Layer)</td><td>Manages data and business logic</td><td>Objects, Fields, Relationships, Apex Classes, SOQL</td></tr>
          <tr><td><strong>View</strong> (Presentation Layer)</td><td>What the user sees and interacts with</td><td>Lightning Components (LWC), Page Layouts, Visualforce Pages</td></tr>
          <tr><td><strong>Controller</strong> (Logic Layer)</td><td>Handles user input and updates the model</td><td>Apex Triggers, Apex Controllers, Flows, Validation Rules</td></tr>
        </tbody>
      </table>

      <h3>Metadata-Driven Architecture</h3>
      <p>Salesforce is <strong>metadata-driven</strong>, meaning the platform behavior is defined by metadata (data about data) rather than hard-coded logic. When you create a custom object, field, or page layout, you are creating metadata that the Salesforce runtime engine interprets. This is why:</p>
      <ul>
        <li>You can customize Salesforce without writing code (declarative development)</li>
        <li>Changes take effect immediately without compilation or server restarts</li>
        <li>Metadata can be packaged, versioned, and deployed between environments</li>
        <li>All orgs run the same compiled code but behave differently based on their metadata</li>
      </ul>

      <h3>Salesforce Technology Stack</h3>
      <ul>
        <li><strong>App Servers</strong> — Java-based application servers running Salesforce code</li>
        <li><strong>Database</strong> — Oracle database with Salesforce's custom abstraction layer</li>
        <li><strong>Search</strong> — Built on Apache Solr for SOSL and global search</li>
        <li><strong>File Storage</strong> — Amazon S3 for file and document storage</li>
        <li><strong>Caching</strong> — Memcached for session and data caching</li>
        <li><strong>CDN</strong> — Content delivery network for static assets</li>
      </ul>

      <h3>Trust and Instances</h3>
      <p>Each Salesforce org is hosted on a specific <strong>instance</strong> (e.g., NA73, EU26, AP15). You can check your instance and system status at <a href="https://trust.salesforce.com" target="_blank">trust.salesforce.com</a>. Salesforce guarantees 99.9% uptime SLA.</p>
      <div class="callout callout--important">
        <p class="callout__title">🔴 Important</p>
        <p>Understanding the MVC pattern is crucial for Salesforce development. When building features, always ask: <em>"Is this a data concern (Model), a UI concern (View), or a logic concern (Controller)?"</em> This helps you choose the right tool for each task.</p>
      </div>
    `,
    examples: [
      {
        title: 'Example 1: MVC in a Lead Conversion',
        description: 'How MVC layers work together when a sales rep converts a lead.',
        code: `MVC in Action: Lead Conversion
═══════════════════════════════

USER ACTION: Sales Rep clicks "Convert" on a Lead record

VIEW (What the user sees):
  → Lightning Lead Record Page
  → Convert dialog appears (LWC component)
  → User selects Account, Contact, Opportunity options

CONTROLLER (Logic that runs):
  → Validation Rules check required fields
  → Lead Assignment Rules evaluate
  → Apex Trigger (before update) runs business logic
  → Flow sends notification email
  → Lead status changes to "Converted"

MODEL (Data changes):
  → Lead record updated (Status = Converted)
  → Account record created/updated
  → Contact record created
  → Opportunity record created (if selected)
  → ActivityHistory transferred to Contact`,
        language: 'text',
        explanation: 'This shows the clear separation of concerns: the UI handles display, controllers handle business logic, and the model manages data operations.'
      },
      {
        title: 'Example 2: Metadata-Driven Configuration',
        description: 'How metadata controls behavior without writing code.',
        code: `Metadata Example: Custom Object Definition
═════════════════════════════════════════════

<!-- Project__c.object-meta.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<CustomObject xmlns="http://soap.sforce.com/2006/04/metadata">
    <label>Project</label>
    <pluralLabel>Projects</pluralLabel>
    <nameField>
        <label>Project Name</label>
        <type>Text</type>
    </nameField>
    <deploymentStatus>Deployed</deploymentStatus>
    <sharingModel>ReadWrite</sharingModel>
    <fields>
        <fullName>Budget__c</fullName>
        <label>Budget</label>
        <type>Currency</type>
        <precision>18</precision>
        <scale>2</scale>
    </fields>
</CustomObject>

This XML metadata tells the Salesforce runtime:
• Create a database table called "Project__c"
• Add a Currency field called "Budget__c"
• Set sharing model to ReadWrite
• No code was written — pure configuration!`,
        language: 'xml',
        explanation: 'Every customization in Salesforce is stored as metadata (XML). This metadata is what gets deployed between environments using tools like Salesforce CLI.'
      }
    ],
    practice: {
      intro: 'Explore the architecture concepts by examining your org\'s metadata and instance information.',
      steps: [
        'Log in to your Developer Edition org and navigate to Setup.',
        'Search for "Company Information" — note your Instance (e.g., NA73).',
        'Visit <a href="https://trust.salesforce.com" target="_blank">trust.salesforce.com</a> and find your instance to check system status.',
        'In Setup, search for "Object Manager" and click on any standard object (e.g., Account). Notice how Fields, Relationships, Page Layouts, and Triggers are organized — this is the MVC pattern in action.',
        'Click "Fields & Relationships" on the Account object — these represent the Model layer.',
        'Click "Page Layouts" — these represent the View layer.',
        'Click "Triggers" — these represent the Controller layer (programmatic logic).'
      ],
      expectedOutcome: 'You should understand how Salesforce organizes its architecture into Model (objects/fields), View (layouts/components), and Controller (triggers/flows), and how metadata defines all customizations.'
    },
    interviewQuestions: [
      {
        scenario: 'An interviewer asks you to explain Salesforce\'s MVC architecture with a real-world example. How would you respond?',
        answer: 'In Salesforce, the Model is represented by Objects (like Account, Contact) and their Fields and Relationships — this is where data lives. The View is the Lightning Pages, Lightning Web Components, and Page Layouts that users interact with. The Controller is the business logic layer — Apex Triggers, Apex Classes, Validation Rules, and Flows that process data and enforce rules. For example, when creating an Opportunity: the form (View) collects input, a validation rule (Controller) ensures the amount is positive, and the Opportunity record (Model) stores the data.'
      },
      {
        scenario: 'A junior developer asks: "If Salesforce is metadata-driven, does that mean we never write code?" How do you answer?',
        answer: 'Not exactly. Salesforce is "metadata-first," meaning you should use declarative tools (point-and-click) whenever possible — objects, fields, flows, validation rules are all metadata. However, when business requirements are too complex for declarative tools (e.g., complex integrations, advanced calculations, custom UI logic), you write Apex code for server-side logic and Lightning Web Components for UI. The rule of thumb is: clicks over code. Use code only when declarative tools can\'t meet the requirement.'
      },
      {
        scenario: 'During a technical discussion, someone asks why Salesforce uses Oracle as its database but you can\'t write SQL directly. Why?',
        answer: 'Salesforce abstracts the Oracle database layer for security and multi-tenancy reasons. Instead of SQL, you use SOQL (Salesforce Object Query Language). SOQL has intentional limitations — no SELECT *, no arbitrary JOINs, governor limits on queries — because in a multi-tenant environment, poorly written queries could degrade performance for all tenants. SOQL is optimized for the metadata-driven model and ensures data isolation between orgs sharing the same database.'
      },
      {
        scenario: 'A client is concerned about downtime during Salesforce\'s three annual releases. How do you reassure them?',
        answer: 'Salesforce\'s three annual releases (Spring, Summer, Winter) are zero-downtime upgrades for most features because of the metadata-driven architecture. The code release happens on the servers during a brief maintenance window (usually under 5 minutes), and metadata-driven customizations continue working seamlessly. Salesforce also provides preview sandboxes weeks before each release so you can test your customizations. Critical changes are communicated via release notes, and trust.salesforce.com provides real-time maintenance schedules.'
      },
      {
        scenario: 'Explain the difference between declarative and programmatic development in Salesforce. When should each be used?',
        answer: 'Declarative development uses point-and-click tools: Objects, Fields, Page Layouts, Validation Rules, Flows, Reports. No coding required. Programmatic development uses code: Apex (server-side Java-like language) and LWC (client-side JavaScript). Use declarative first because it\'s faster to build, easier to maintain, automatically upgraded, and doesn\'t count against code coverage. Use programmatic when you need complex business logic, external API integrations, custom UI beyond standard components, or batch processing. A best practice is the "80/20 rule" — 80% declarative, 20% code.'
      }
    ]
  },

  '1.4': {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p>A <strong>Salesforce Developer Edition</strong> org is a free, fully-functional Salesforce environment designed for learning, development, and testing. It includes most Enterprise Edition features with limited data and file storage (5 MB data storage, 20 MB file storage, 2 user licenses). Developer Edition orgs never expire and can be used indefinitely.</p>
      </div>
      <h3>Why Do You Need a Developer Org?</h3>
      <p>A Developer Edition org is your personal sandbox for learning Salesforce. You can:</p>
      <ul>
        <li>Create custom objects, fields, and page layouts</li>
        <li>Write and test Apex code and Triggers</li>
        <li>Build Lightning Web Components</li>
        <li>Configure workflows, flows, and automation</li>
        <li>Practice for Salesforce certifications</li>
        <li>Build AppExchange packages</li>
      </ul>
      <h3>Developer Org vs Trailhead Playground</h3>
      <table>
        <thead><tr><th>Feature</th><th>Developer Org</th><th>Trailhead Playground</th></tr></thead>
        <tbody>
          <tr><td>How to get</td><td>developer.salesforce.com/signup</td><td>Auto-created via Trailhead</td></tr>
          <tr><td>Purpose</td><td>General development & learning</td><td>Completing Trailhead challenges</td></tr>
          <tr><td>Customizable</td><td>Fully customizable</td><td>Pre-configured for modules</td></tr>
          <tr><td>Number you can have</td><td>Unlimited</td><td>Up to 2 active at a time</td></tr>
          <tr><td>Namespace</td><td>Can register a namespace</td><td>Cannot register namespace</td></tr>
        </tbody>
      </table>
      <h3>Important Setup Concepts</h3>
      <p>Once you log in, the <strong>Setup</strong> menu (gear icon → Setup) is where all administration happens. Key areas include:</p>
      <ul>
        <li><strong>Quick Find</strong> — Search bar to find any setting instantly</li>
        <li><strong>Object Manager</strong> — Manage objects, fields, relationships, page layouts</li>
        <li><strong>Users</strong> — Manage user accounts and permissions</li>
        <li><strong>Security</strong> — Profiles, permission sets, sharing settings</li>
        <li><strong>Platform Tools</strong> — Apex, Lightning Components, Flows</li>
        <li><strong>Environments</strong> — Sandboxes, deploy, monitoring</li>
      </ul>
    `,
    examples: [
      {
        title: 'Example 1: Signing Up for Developer Edition',
        description: 'Step-by-step walkthrough of the signup process.',
        code: `Developer Edition Signup Process
═════════════════════════════════

Step 1: Visit developer.salesforce.com/signup
Step 2: Fill in the form:
  ┌─────────────────────────────────────┐
  │ First Name: [Your Name]             │
  │ Last Name:  [Your Last Name]        │
  │ Email:      [your@email.com]        │
  │ Role:       [Developer]             │
  │ Company:    [Learning]              │
  │ Country:    [Your Country]          │
  │ Postal Code:[Your Zip]             │
  │ Username:   [you@learning.dev]      │
  │  (must be email format, but does    │
  │   not need to be a real email)      │
  └─────────────────────────────────────┘
Step 3: Check email for verification link
Step 4: Set password (min 8 chars, 1 letter, 1 number)
Step 5: Log in at login.salesforce.com

🎉 Your free Developer Org is ready!`,
        language: 'text',
        explanation: 'The username must be in email format but does not have to be your actual email. Use a unique username like yourname@salesforcelearning.dev.'
      },
      {
        title: 'Example 2: Navigating Setup',
        description: 'Finding your way around the Setup menu.',
        code: `Setup Menu Structure
════════════════════

SETUP HOME
├── 📋 Quick Find (Search Bar) ← Use this! Fastest way
│
├── 👤 ADMINISTRATION
│   ├── Users → Users, Profiles, Permission Sets, Roles
│   ├── Data → Data Import Wizard, Data Export
│   └── Email → Email Deliverability, Templates
│
├── 🔧 PLATFORM TOOLS
│   ├── Objects & Fields → Object Manager, Schema Builder
│   ├── Apps → App Manager, Lightning App Builder
│   ├── Process Automation → Flows, Workflow Rules
│   ├── Custom Code → Apex Classes, Triggers, LWC
│   └── Integrations → API, Connected Apps, Named Creds
│
├── 🔒 SECURITY
│   ├── Authentication → Login Policies, 2FA
│   ├── Sharing → OWD, Sharing Rules
│   └── Session Settings → Timeout, IP Ranges
│
└── ⚙️ SETTINGS
    ├── Company Information → Org ID, Edition, Limits
    └── Home → Setup Home Dashboard`,
        language: 'text',
        explanation: 'Pro tip: Always use the Quick Find search bar instead of clicking through menus. Type any keyword and Setup will filter to the matching settings instantly.'
      }
    ],
    practice: {
      intro: 'If you haven\'t already created a Developer Edition org, do so now. Then explore the Setup menu.',
      steps: [
        'Go to <a href="https://developer.salesforce.com/signup" target="_blank" rel="noopener">developer.salesforce.com/signup</a> and create a new Developer Edition org.',
        'Once logged in, click the gear icon (⚙️) in the top-right corner and select "Setup."',
        'In the Quick Find box, type "Company Information" and click on it. Note down your Organization ID and Instance.',
        'In Quick Find, type "Users" and click "Users." You should see your user account listed.',
        'In Quick Find, type "Object Manager" and explore the list of standard objects (Account, Contact, Lead, Opportunity).',
        'Click on the "Account" object and browse through its tabs: Fields & Relationships, Page Layouts, Triggers, etc.'
      ],
      expectedOutcome: 'You should have a working Developer Edition org, know how to access Setup, use Quick Find, and navigate the Object Manager.'
    },
    interviewQuestions: [
      {
        scenario: 'A team lead asks you to set up development environments for 5 developers working on a new Salesforce project. What environments would you create and why?',
        answer: 'For a proper development lifecycle, I would set up: (1) Individual Developer sandboxes or Developer Edition orgs for each developer to work independently, (2) A Developer Pro or Partial Copy sandbox for integration testing where developers merge their work, (3) A Full Copy sandbox for UAT/staging that mirrors production data, and (4) Production for final deployment. This follows the standard dev lifecycle: Dev → Integration → UAT → Production.'
      },
      {
        scenario: 'A new Salesforce administrator asks you what the Quick Find box is and how it differs from Global Search. How do you explain it?',
        answer: 'Quick Find is the search bar within the Setup menu that filters Setup pages and settings — it helps you find admin configurations like "Profiles," "Sharing Settings," or "Apex Classes." Global Search (the search bar in the main app header) searches across business data records like Accounts, Contacts, Cases, and custom objects. Think of it this way: Quick Find searches settings, Global Search searches data.'
      },
      {
        scenario: 'You realize your Developer Edition org has hit its 5 MB data storage limit during testing. What are your options?',
        answer: 'Options include: (1) Delete old test records using Mass Delete Records in Setup, (2) Create a new Developer Edition org (they\'re free and unlimited), (3) Use Data Loader to export and delete bulk records, (4) Reduce data by removing old test data you no longer need. For ongoing development, consider using Salesforce DX scratch orgs which are disposable and can be recreated quickly with clean data.'
      },
      {
        scenario: 'A developer is confused about whether to use a Developer Edition org or a Scratch Org for a new project. What\'s the difference?',
        answer: 'A Developer Edition org is persistent, manually configured, and lasts forever — great for learning and long-running projects. A Scratch Org is a temporary, source-driven org created via Salesforce CLI (sfdx force:org:create) that expires after 1-30 days. Scratch orgs are ideal for modern CI/CD workflows because they can be created, configured, and destroyed programmatically. For a new project using source-driven development (Salesforce DX), scratch orgs are recommended. For learning or quick prototyping, Developer Edition is simpler.'
      },
      {
        scenario: 'A manager notices there\'s a "Setup Audit Trail" in Salesforce and asks what it does. How do you explain its importance?',
        answer: 'Setup Audit Trail tracks the last 180 days of administrative changes made in Setup, including who made the change, what changed, and when. It logs changes to profiles, permission sets, page layouts, fields, validation rules, flows, and more. This is critical for security compliance, debugging configuration issues, and auditing unauthorized changes. You can find it in Setup → Security → View Setup Audit Trail. For longer retention, you can download the CSV.'
      }
    ]
  },

  '1.5': {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p><strong>Lightning Experience</strong> (LEX) is Salesforce's modern, component-based user interface framework. Launched in 2015, it replaced the older Salesforce Classic UI with a faster, more intuitive experience featuring a responsive design, customizable home pages, and drag-and-drop page building with the Lightning App Builder.</p>
      </div>
      <h3>Key UI Components</h3>
      <ul>
        <li><strong>App Launcher</strong> — The grid icon (top-left) that lets you switch between Salesforce apps and access all available tabs/objects</li>
        <li><strong>Navigation Bar</strong> — The horizontal bar with tabs for objects, apps, and items you access frequently</li>
        <li><strong>Home Page</strong> — Dashboard-style landing page with assistant, performance chart, and key deals</li>
        <li><strong>Record Pages</strong> — Detail pages showing a single record with related lists, fields, and components</li>
        <li><strong>List Views</strong> — Filtered, sortable lists of records for any object</li>
        <li><strong>Kanban View</strong> — Visual card-based view for pipeline management</li>
        <li><strong>Global Search</strong> — Search across all objects from the top search bar</li>
        <li><strong>Utility Bar</strong> — Fixed footer bar for quick access to tools like Notes, History, and Dialer</li>
      </ul>
      <h3>Lightning Experience vs Salesforce Classic</h3>
      <table>
        <thead><tr><th>Feature</th><th>Lightning Experience</th><th>Salesforce Classic</th></tr></thead>
        <tbody>
          <tr><td>UI Framework</td><td>Component-based (LWC/Aura)</td><td>Page-based (Visualforce)</td></tr>
          <tr><td>Home Page</td><td>Customizable with components</td><td>Fixed sidebar + dashboard</td></tr>
          <tr><td>App Builder</td><td>Drag-and-drop page builder</td><td>Not available</td></tr>
          <tr><td>Kanban View</td><td>✓</td><td>✗</td></tr>
          <tr><td>Einstein Analytics</td><td>✓</td><td>Limited</td></tr>
          <tr><td>Performance</td><td>Single Page App (faster)</td><td>Full page reloads</td></tr>
        </tbody>
      </table>
      <div class="callout callout--tip">
        <p class="callout__title">💡 Pro Tip</p>
        <p>Salesforce Classic is still available and some legacy features only exist in Classic. You can switch between Lightning and Classic by clicking your avatar → "Switch to Salesforce Classic." However, all new development should target Lightning Experience.</p>
      </div>
    `,
    examples: [
      {
        title: 'Example 1: App Launcher Navigation',
        description: 'Using the App Launcher to switch between Salesforce apps.',
        code: `App Launcher Usage
══════════════════

1. Click the waffle icon (⊞) in the top-left corner
2. The App Launcher panel appears:

   ┌─────────────────────────────────────────┐
   │  🔍 Search apps and items...            │
   │                                         │
   │  ★ APPS                                 │
   │  ┌──────┐  ┌──────┐  ┌──────┐          │
   │  │Sales │  │Serv. │  │Mktg. │          │
   │  │Cloud │  │Cloud │  │Cloud │          │
   │  └──────┘  └──────┘  └──────┘          │
   │                                         │
   │  ★ ALL ITEMS                            │
   │  → Accounts                             │
   │  → Contacts                             │
   │  → Leads                                │
   │  → Opportunities                        │
   │  → Reports                              │
   │  → Dashboards                           │
   └─────────────────────────────────────────┘

Each "App" bundles related tabs and objects.
For example, Sales Cloud shows:
  Home | Leads | Accounts | Contacts | Opportunities`,
        language: 'text',
        explanation: 'Apps in Salesforce are not separate software — they are curated collections of tabs and settings tailored for specific business functions.'
      },
      {
        title: 'Example 2: Record Page Anatomy',
        description: 'Understanding the layout of a Lightning Record Page.',
        code: `Lightning Record Page Layout
═════════════════════════════

┌─────────────────────────────────────────────┐
│ HEADER                                       │
│ ┌──────────────────┐ [Edit] [Delete] [Clone] │
│ │ Account Name:    │                         │
│ │ Acme Corporation │ Type: Customer           │
│ └──────────────────┘ Industry: Technology     │
├─────────────────────────────────────────────┤
│                                              │
│  HIGHLIGHTS PANEL (Key fields at a glance)   │
│  Phone: (555) 123-4567 | Website: acme.com  │
│  Annual Revenue: $10M  | Employees: 500      │
│                                              │
├──────────────┬───────────────────────────────┤
│  LEFT COLUMN │  RIGHT COLUMN                 │
│              │                               │
│  📋 Details  │  📊 Activity Timeline         │
│  ─────────── │  ─────────────────            │
│  Account Name│  → Email sent (Today)         │
│  Phone       │  → Call logged (Yesterday)    │
│  Website     │  → Task: Follow up (Due: Fri) │
│  Industry    │                               │
│  Description │  👥 Related Lists              │
│              │  ─────────────────            │
│  📍 Address  │  → Contacts (3)               │
│  ─────────── │  → Opportunities (2)          │
│  Street      │  → Cases (1)                  │
│  City, State │  → Files (4)                  │
└──────────────┴───────────────────────────────┘`,
        language: 'text',
        explanation: 'Lightning Record Pages are divided into regions (header, highlights, columns) that can be customized using the Lightning App Builder with drag-and-drop components.'
      }
    ],
    practice: {
      intro: 'Navigate through the Lightning Experience UI to become familiar with its key components.',
      steps: [
        'Log in to your Salesforce Developer Edition. You should land on the Lightning Experience Home page.',
        'Click the App Launcher (waffle icon ⊞) and explore the available apps. Click "Sales" to switch to the Sales app.',
        'In the navigation bar, click "Accounts" to see the list view. Try switching between "Recently Viewed" and "All Accounts."',
        'Click on any Account record. Identify the Header, Highlights Panel, Details tab, Activity Timeline, and Related Lists.',
        'Use Global Search (top search bar) to search for "Account" — notice how it searches across all objects.',
        'Click your avatar (profile icon, top-right) and explore the options. Note the "Switch to Salesforce Classic" option.',
        'Go to Setup → search for "App Manager." This shows all Lightning apps configured in your org.'
      ],
      expectedOutcome: 'You should be comfortable navigating Lightning Experience: switching apps, viewing list views, exploring record pages, using global search, and accessing Setup.'
    },
    interviewQuestions: [
      {
        scenario: 'A business user complains that they can\'t find the report they need in Lightning Experience. They say it was easy to find in Classic\'s sidebar. How do you help them?',
        answer: 'In Lightning Experience, the sidebar was replaced by the App Launcher and pinned list views. I would show them how to: (1) Use the App Launcher to find Reports, (2) Pin their frequently used reports as favorites, (3) Create a custom Lightning app that includes a Reports tab in the navigation bar, and (4) Use Global Search to find specific reports by name. I would also consider adding a Report Chart component to their Home page using Lightning App Builder.'
      },
      {
        scenario: 'Your client wants to show key metrics like open cases and revenue on the home page without navigating anywhere. How would you achieve this?',
        answer: 'I would use the Lightning App Builder to customize the Home page. I would add Report Chart components that display key metrics (open cases, revenue), a Rich Text component for announcements, and the Assistant component for AI-powered suggestions. I can also add custom Lightning Web Components for more advanced visualizations. To set this as the default, I assign it via Lightning App Builder → Activation → set as org default or assign to specific profiles/apps.'
      },
      {
        scenario: 'A user asks why some features appear in Salesforce Classic but not in Lightning Experience. What do you explain?',
        answer: 'While Salesforce is investing primarily in Lightning Experience, there are still a few features that are Classic-only (like JavaScript buttons, some report chart types, and certain admin tools). However, Salesforce has provided Lightning alternatives for most features. I would check the "Lightning Experience Readiness Check" in Setup to identify any gaps, and recommend the user switch to Lightning since Salesforce Classic will eventually be retired and all new features are Lightning-first.'
      },
      {
        scenario: 'An administrator asks how to customize the navigation bar for a specific set of users. What approach do you suggest?',
        answer: 'The navigation bar is controlled at the Lightning App level. To customize it for specific users: (1) Create a new Lightning App in Setup → App Manager, (2) Add the desired navigation items (objects, tabs, Visualforce pages), (3) Set visibility by assigning the app to specific Profiles or Permission Sets. Users assigned to that app will see the customized navigation. Individual users can also personalize their nav bar by clicking the pencil icon to add, remove, or reorder items.'
      },
      {
        scenario: 'A developer wants to understand the difference between Lightning Experience and the Lightning Framework. Can you clarify?',
        answer: 'Lightning Experience is the modern UI/UX of Salesforce — it\'s what users see and interact with. The Lightning Framework is the underlying technology used to build that UI, consisting of: (1) Lightning Web Components (LWC) — modern, standards-based web components, (2) Aura Components — the older component framework, (3) Lightning Design System (SLDS) — the CSS framework for consistent styling, (4) Lightning Data Service — client-side data caching, and (5) Lightning App Builder — the drag-and-drop page builder. Think of Lightning Experience as the car, and the Lightning Framework as the engine.'
      }
    ]
  },

  '1.6': {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p><strong>Objects</strong> are database tables in Salesforce that store data. <strong>Fields</strong> are the columns in those tables that define the data attributes. <strong>Records</strong> are individual rows of data within an object. Together, they form the foundation of all data in Salesforce.</p>
      </div>
      <h3>Objects — The Database Tables</h3>
      <p>Every piece of data in Salesforce is stored in an Object. There are two types:</p>
      <ul>
        <li><strong>Standard Objects</strong> — Pre-built by Salesforce (Account, Contact, Lead, Opportunity, Case, etc.)</li>
        <li><strong>Custom Objects</strong> — Created by you to store data specific to your business (e.g., Project__c, Invoice__c)</li>
      </ul>
      <p>Custom object API names always end with <code>__c</code> (double underscore c) to distinguish them from standard objects.</p>

      <h3>Fields — The Data Columns</h3>
      <p>Fields define what data can be stored in an object. Like objects, there are Standard Fields (pre-built) and Custom Fields (you create). Every object automatically has these standard fields:</p>
      <ul>
        <li><strong>Id</strong> — Unique 18-character record identifier</li>
        <li><strong>Name</strong> — The primary identifier field (text or auto-number)</li>
        <li><strong>CreatedDate</strong> — When the record was created</li>
        <li><strong>LastModifiedDate</strong> — When it was last updated</li>
        <li><strong>OwnerId</strong> — The user who owns the record</li>
        <li><strong>CreatedById / LastModifiedById</strong> — Who created/modified it</li>
      </ul>

      <h3>Records — The Data Rows</h3>
      <p>A record is a single instance of data stored in an object. For example:</p>
      <ul>
        <li>Object: Account → Record: "Acme Corporation"</li>
        <li>Object: Contact → Record: "John Smith"</li>
        <li>Object: Opportunity → Record: "Acme Corp - Enterprise License"</li>
      </ul>

      <h3>The 18-Character ID</h3>
      <p>Every record has a unique <strong>18-character ID</strong> (e.g., 001gL000004abc5QAA). The first 3 characters indicate the object type (001 = Account, 003 = Contact, 006 = Opportunity). IDs are case-sensitive in API calls but case-insensitive in formulas (using the 18-char version).</p>
      <div class="callout callout--warning">
        <p class="callout__title">⚠️ Common Mistake</p>
        <p>Never use 15-character IDs in integrations or code. Salesforce URLs show 15-char IDs, but APIs and Apex should always use the 18-character version to avoid case-sensitivity issues.</p>
      </div>
    `,
    examples: [
      {
        title: 'Example 1: Standard Objects & Their Purpose',
        description: 'The core standard objects every Salesforce org uses.',
        code: `Key Standard Objects in Salesforce
═══════════════════════════════════

Object          │ Purpose                          │ Key Fields
────────────────┼──────────────────────────────────┼──────────────────
Account         │ Companies/organizations          │ Name, Industry, Phone
Contact         │ People associated with accounts  │ Name, Email, Phone
Lead            │ Unqualified prospects             │ Name, Company, Status
Opportunity     │ Potential deals/revenue           │ Name, Stage, Amount
Case            │ Customer support issues           │ Subject, Status, Priority
Task            │ To-do items                       │ Subject, Due Date
Event           │ Calendar events                   │ Subject, Start/End Date
Campaign        │ Marketing campaigns               │ Name, Type, Status
Product         │ Items you sell                    │ Name, Price
Quote           │ Sales proposals                   │ Name, Total Price
Contract        │ Legal agreements                  │ Number, Status, Term

Custom Object Example:
Invoice__c      │ Custom invoices                   │ Amount__c, Due_Date__c`,
        language: 'text',
        explanation: 'Standard objects cover common business processes. Custom objects (ending in __c) extend Salesforce to handle your unique business data.'
      },
      {
        title: 'Example 2: Querying Objects, Fields & Records',
        description: 'Using SOQL to see the relationship between objects, fields, and records.',
        code: `// SOQL: Select fields (columns) from Account object (table)
// Each row returned is a record

SELECT Id, Name, Industry, AnnualRevenue
FROM Account
WHERE Industry = 'Technology'
LIMIT 5

// Results (Records):
// ┌─────────────────────┬──────────────┬─────────────────┐
// │ Name                │ Industry     │ AnnualRevenue   │
// ├─────────────────────┼──────────────┼─────────────────┤
// │ Acme Corporation    │ Technology   │ $10,000,000     │
// │ Global Tech Inc     │ Technology   │ $5,500,000      │
// │ CloudFirst Systems  │ Technology   │ $2,000,000      │
// └─────────────────────┴──────────────┴─────────────────┘`,
        language: 'java',
        explanation: 'SOQL (Salesforce Object Query Language) is how you query data. SELECT specifies fields, FROM specifies the object, WHERE filters records. We\'ll cover SOQL in depth in Module 3.'
      },
      {
        title: 'Example 3: Creating a Custom Field',
        description: 'Adding a custom field to the Account object.',
        code: `Steps to Create a Custom Field:
═══════════════════════════════

1. Setup → Object Manager → Account
2. Click "Fields & Relationships"
3. Click "New"
4. Choose field type: Currency
5. Fill in details:
   ┌─────────────────────────────────┐
   │ Field Label: Target Revenue     │
   │ Field Name: Target_Revenue      │
   │ API Name: Target_Revenue__c     │
   │ Length: 16                      │
   │ Decimal Places: 2              │
   │ Required: No                   │
   │ Default Value: (blank)         │
   │ Description: Expected annual   │
   │              target revenue    │
   └─────────────────────────────────┘
6. Set Field-Level Security (visible to which profiles)
7. Add to Page Layouts
8. Save

Note: The API name automatically gets "__c" suffix
      to indicate it's a custom field.`,
        language: 'text',
        explanation: 'Custom fields extend standard objects with business-specific data. The __c suffix differentiates custom fields from standard ones.'
      }
    ],
    practice: {
      intro: 'Create your first custom field and understand the object-field-record hierarchy.',
      steps: [
        'Go to Setup → Object Manager → Account.',
        'Click "Fields & Relationships" and scroll through the standard fields. Count how many there are.',
        'Click "New" to create a custom field. Choose "Currency" as the data type.',
        'Set the Field Label to "Target Revenue" (API Name will auto-fill as Target_Revenue__c). Set decimal places to 2.',
        'Set Field-Level Security — make it visible for your profile.',
        'Add it to the Account Page Layout and click Save.',
        'Navigate to an Account record (create one if none exist) and find your new "Target Revenue" field. Enter a value and save.'
      ],
      expectedOutcome: 'You should have a custom Currency field called "Target Revenue" on the Account object, visible on the record page, with a value entered.'
    },
    interviewQuestions: [
      {
        scenario: 'A business user asks you to explain the difference between an Object and a Record in Salesforce, using a simple analogy. How do you explain it?',
        answer: 'I would use a spreadsheet analogy: An Object is like a spreadsheet (e.g., "Contacts" spreadsheet). Fields are the column headers (Name, Email, Phone). Records are the individual rows of data. So the Account object is the "spreadsheet," the fields (Name, Industry, Revenue) are the "columns," and "Acme Corporation" is a single "row" or record in that spreadsheet.'
      },
      {
        scenario: 'A developer notices that custom objects end with __c but standard objects don\'t. Why does Salesforce use this naming convention?',
        answer: 'The __c suffix stands for "custom" and serves several purposes: (1) It prevents naming conflicts between standard and custom metadata, (2) It makes it immediately clear in code and SOQL whether you\'re working with standard or custom objects/fields, (3) It\'s enforced by the platform — you cannot create a custom object without the __c suffix, (4) Managed package objects use __c too, while their namespace prefix identifies the package (e.g., ns__MyObject__c). This convention extends to custom fields, labels (__mdt for metadata types), and relationships (__r for relationship names).'
      },
      {
        scenario: 'A consultant asks why the Salesforce record ID is 18 characters long. What\'s special about it?',
        answer: 'Salesforce record IDs are actually 15 characters base, plus 3 extra characters that form a case-insensitive checksum. The 15-char ID is case-sensitive (used in URLs), while the 18-char ID is case-insensitive (used in APIs, Excel, and integrations where case might be lost). The first 3 characters indicate the object key prefix (001=Account, 003=Contact, 006=Opportunity). Best practice: always use 18-char IDs in code and integrations to avoid case-sensitivity bugs.'
      },
      {
        scenario: 'You need to store customer survey data in Salesforce. The data includes survey name, question responses (1-5 rating), and comments. How would you design the data model?',
        answer: 'I would create two custom objects: (1) Survey__c (master) with fields: Name (auto-number like SRV-0001), Survey_Date__c (Date), Customer__c (Lookup to Contact), Overall_Rating__c (Number). (2) Survey_Response__c (detail) with fields: Survey__c (Master-Detail to Survey__c), Question__c (Text), Rating__c (Picklist: 1-5), Comments__c (Long Text Area). The Master-Detail relationship ensures survey responses are deleted when a survey is deleted, and enables roll-up summary fields on the Survey__c to calculate average ratings.'
      },
      {
        scenario: 'A data migration specialist asks about the system fields that are automatically created on every Salesforce object. What are they?',
        answer: 'Every Salesforce object automatically includes these system fields: Id (18-char unique identifier), Name (primary display field — text or auto-number), CreatedDate (timestamp of creation), CreatedById (user who created it), LastModifiedDate (last update timestamp), LastModifiedById (user who last modified it), SystemModstamp (system modification timestamp, includes workflow updates), OwnerId (record owner — user or queue), IsDeleted (soft delete flag for recycle bin). These fields are read-only (except OwnerId) and are populated automatically by the platform.'
      }
    ]
  },

  '1.7': {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p><strong>Standard Objects</strong> are pre-built objects provided by Salesforce (Account, Contact, Lead, Opportunity, Case, etc.). <strong>Custom Objects</strong> are objects you create to store data unique to your business. Custom object API names always end with <code>__c</code>.</p>
      </div>
      <h3>When to Use Standard vs Custom Objects</h3>
      <table>
        <thead><tr><th>Use Standard Objects When...</th><th>Use Custom Objects When...</th></tr></thead>
        <tbody>
          <tr><td>The data fits a standard concept (accounts, contacts, cases)</td><td>No standard object matches your data needs</td></tr>
          <tr><td>You want built-in features (lead conversion, opportunity stages)</td><td>You need a completely custom data structure</td></tr>
          <tr><td>You want out-of-the-box reports and dashboards</td><td>You\'re building a custom application</td></tr>
          <tr><td>You need AppExchange integration compatibility</td><td>You need business-specific fields and processes</td></tr>
        </tbody>
      </table>
      <h3>Creating Custom Objects</h3>
      <p>When creating a custom object, you configure:</p>
      <ul>
        <li><strong>Label</strong> — Display name (e.g., "Project")</li>
        <li><strong>Plural Label</strong> — Plural form (e.g., "Projects")</li>
        <li><strong>Object Name</strong> — API name (auto-generated, e.g., "Project__c")</li>
        <li><strong>Record Name</strong> — The primary field (Text or Auto Number)</li>
        <li><strong>Data Type for Name Field</strong> — Text (editable) or Auto Number (e.g., PRJ-{0000})</li>
        <li><strong>Optional features</strong> — Allow Reports, Activities, Track Field History, Search</li>
      </ul>
      <h3>Object Limits</h3>
      <p>Salesforce enforces limits on custom objects based on your edition:</p>
      <ul>
        <li><strong>Enterprise Edition</strong>: Up to 200 custom objects</li>
        <li><strong>Unlimited Edition</strong>: Up to 2,000 custom objects</li>
        <li><strong>Developer Edition</strong>: Up to 400 custom objects</li>
      </ul>
      <div class="callout callout--tip">
        <p class="callout__title">💡 Best Practice</p>
        <p>Always check if a standard object or an existing custom object can be repurposed before creating a new custom object. Fewer objects = simpler data model = easier maintenance.</p>
      </div>
    `,
    examples: [
      { title: 'Example 1: Creating a Custom Object', description: 'Building a "Project" custom object step by step.', code: `Creating Custom Object: Project__c\n═══════════════════════════════════\n\nSetup → Object Manager → Create → Custom Object\n\n┌─────────────────────────────────────┐\n│ Label:           Project            │\n│ Plural Label:    Projects           │\n│ Object Name:     Project (→ Project__c) │\n│                                     │\n│ Record Name:     Project Name       │\n│ Data Type:       Auto Number        │\n│ Display Format:  PRJ-{0000}         │\n│ Starting Number: 1                  │\n│                                     │\n│ ☑ Allow Reports                     │\n│ ☑ Allow Activities                  │\n│ ☑ Track Field History               │\n│ ☑ Allow in Chatter Groups           │\n│ ☑ Allow Search                      │\n│ ☐ Allow Sharing                     │\n│ ☐ Allow Bulk API Access             │\n│ ☐ Allow Streaming API Access        │\n│                                     │\n│ Deployment Status: [Deployed]       │\n└─────────────────────────────────────┘\n\nAfter saving, add custom fields:\n→ Client__c (Lookup to Account)\n→ Budget__c (Currency)\n→ Start_Date__c (Date)\n→ End_Date__c (Date)\n→ Status__c (Picklist: Planning/Active/Completed)`, language: 'text', explanation: 'The Auto Number format PRJ-{0000} will automatically generate IDs like PRJ-0001, PRJ-0002, etc. This is useful when you don\'t want users to manually enter record names.' },
      { title: 'Example 2: Standard vs Custom Object Comparison', description: 'Comparing built-in features of standard and custom objects.', code: `Feature Comparison: Standard vs Custom Objects\n═══════════════════════════════════════════════\n\n┌─────────────────────────────┬──────────┬────────┐\n│ Feature                     │ Standard │ Custom │\n├─────────────────────────────┼──────────┼────────┤\n│ Pre-built fields            │ ✓ Many   │ ✗ None │\n│ Page layouts                │ ✓ Default│ ✓ Basic│\n│ Standard reports            │ ✓ Yes    │ ✓ Yes  │\n│ Triggers allowed            │ ✓ Yes    │ ✓ Yes  │\n│ API name has __c            │ ✗ No     │ ✓ Yes  │\n│ Can delete object           │ ✗ No     │ ✓ Yes  │\n│ Can rename object           │ ✓ Label  │ ✓ Label│\n│ Can track field history     │ ✓ Yes    │ ✓ Yes  │\n│ Roll-up summary fields      │ ✓ Yes    │ ✓ Yes  │\n│ Built-in business logic     │ ✓ Yes    │ ✗ No   │\n│ Lead Conversion mapping     │ ✓ Yes    │ ✗ No   │\n│ Auto record relationships   │ ✓ Yes    │ ✗ No   │\n└─────────────────────────────┴──────────┴────────┘`, language: 'text', explanation: 'Standard objects come with built-in features (like Lead Conversion for Leads) that custom objects don\'t have. But custom objects offer full flexibility in design.' }
    ],
    practice: {
      intro: 'Create your first custom object and add custom fields to it.',
      steps: [
        'Go to Setup → Object Manager → click "Create" → "Custom Object."',
        'Set Label to "Project", Plural Label to "Projects."',
        'Set Record Name data type to "Auto Number" with format PRJ-{0000}.',
        'Check "Allow Reports," "Allow Activities," "Track Field History," and "Allow Search."',
        'Set Deployment Status to "Deployed" and click Save.',
        'Now add custom fields: Click "Fields & Relationships" → New → Create a Currency field called "Budget" and a Picklist field called "Status" with values: Planning, Active, On Hold, Completed.',
        'Create a new Project record using the App Launcher → Projects → New.'
      ],
      expectedOutcome: 'You should have a custom "Project" object with auto-numbered records, Budget and Status custom fields, and at least one test record created.'
    },
    interviewQuestions: [
      { scenario: 'A business analyst wants to track employee training records in Salesforce. Should they use a standard or custom object?', answer: 'A custom object (e.g., Training_Record__c) would be appropriate because there is no standard object for employee training. The custom object would have fields like Training_Name__c, Employee__c (Lookup to Contact or custom Employee object), Completion_Date__c, Score__c, and Certification_Expiry__c. However, if the requirement is simple, you could consider using a custom object related to the standard User object or a custom tab on the Contact object.' },
      { scenario: 'A client asks: "We already have 180 custom objects in our Enterprise Edition org. Can we create more?" What do you tell them?', answer: 'Enterprise Edition allows up to 200 custom objects per org. They have room for 20 more. However, I would recommend auditing existing objects first — some may be unused or duplicative. If they truly need more, they could upgrade to Unlimited Edition (2,000 custom objects) or use Big Objects for large data volumes. I would also suggest considering Custom Metadata Types for configuration data instead of custom objects.' },
      { scenario: 'When creating a custom object, when should you use Auto Number vs Text for the Name field?', answer: 'Use Auto Number when you want system-generated, sequential identifiers (e.g., INV-0001, CASE-0042) — ideal for invoices, tickets, and cases where manual naming doesn\'t make sense. Use Text when users should provide a meaningful name (e.g., Project Name, Course Title). Auto Number is also better for data import consistency since users can\'t create duplicates or inconsistent names.' },
      { scenario: 'A developer asks: "Can I delete a standard object I\'m not using?" How do you respond?', answer: 'No, you cannot delete standard objects in Salesforce. However, you can effectively hide them by: (1) Removing them from all Lightning App navigation bars, (2) Removing object permissions from all profiles and permission sets, (3) Removing the object tab from all apps. This makes the standard object invisible to users while keeping it available if needed in the future. For custom objects, deletion is possible but sends them to the Deleted Objects list for 15 days (recoverable) before permanent deletion.' },
      { scenario: 'You need to track both the company information and individual people at that company. Which standard objects would you use and how are they related?', answer: 'Use the Account object for company information and the Contact object for people at that company. In Salesforce, Contact has a standard lookup relationship to Account (AccountId field). One Account can have many Contacts. This is a fundamental Salesforce relationship. When you view an Account record, you\'ll see a "Contacts" related list showing all people associated with that company. This Account-Contact relationship is the backbone of B2B CRM in Salesforce.' }
    ]
  },

  '1.8': {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p><strong>Relationships</strong> in Salesforce link two objects together, similar to foreign keys in relational databases. They enable you to associate records from one object with records from another, creating a connected data model. Salesforce supports three main relationship types: <strong>Lookup</strong>, <strong>Master-Detail</strong>, and <strong>Hierarchical</strong>.</p>
      </div>
      <h3>Lookup Relationship</h3>
      <p>A <strong>loosely coupled</strong> relationship between two objects. The child record stores a reference (foreign key) to the parent, but they are independent.</p>
      <ul>
        <li>Parent record can be deleted without deleting child records</li>
        <li>Lookup field can be optional (blank)</li>
        <li>No roll-up summary fields (unless using DLRS or Flow)</li>
        <li>Child record inherits NO security from parent — has its own OWD</li>
        <li>Each object can have up to 40 lookup relationships</li>
      </ul>
      <h3>Master-Detail Relationship</h3>
      <p>A <strong>tightly coupled</strong> parent-child relationship where the child cannot exist without the parent.</p>
      <ul>
        <li>Deleting the parent automatically deletes all child records (cascade delete)</li>
        <li>The detail (child) field is <strong>required</strong> — cannot be blank</li>
        <li>Supports <strong>Roll-Up Summary Fields</strong> (COUNT, SUM, MIN, MAX)</li>
        <li>Child record inherits sharing/security from the parent</li>
        <li>The owner of the child is always the owner of the parent</li>
        <li>Each object can have up to 2 master-detail relationships</li>
      </ul>
      <h3>Hierarchical Relationship</h3>
      <p>A special type of self-lookup available <strong>only on the User object</strong>. It links a user to another user, creating a manager hierarchy (e.g., the "Manager" field on User).</p>
      <h3>Many-to-Many Relationships</h3>
      <p>Salesforce does not natively support many-to-many relationships. Instead, you create a <strong>Junction Object</strong> with two Master-Detail relationships connecting the two objects.</p>
      <div class="callout callout--tip">
        <p class="callout__title">💡 Decision Guide</p>
        <p>Use <strong>Master-Detail</strong> when the child record should NOT exist without the parent (e.g., Line Item without an Order). Use <strong>Lookup</strong> when the relationship is optional or the child should be independent (e.g., Contact can exist without a Campaign).</p>
      </div>
    `,
    examples: [
      { title: 'Example 1: Lookup vs Master-Detail', description: 'Comparing behavior when a parent record is deleted.', code: `Relationship Behavior Comparison\n════════════════════════════════\n\nLOOKUP: Contact → Account (Lookup)\n──────────────────────────────────\nAccount: "Acme Corp" has 3 Contacts\n→ Delete "Acme Corp"\n→ Result: 3 Contacts still exist (AccountId = null)\n→ Contacts are now "orphaned" but accessible\n\nMASTER-DETAIL: Line Item → Order (Master-Detail)\n─────────────────────────────────────────────────\nOrder: "ORD-001" has 5 Line Items\n→ Delete "ORD-001"\n→ Result: All 5 Line Items are DELETED (cascade)\n→ Line Items cannot exist without their Order\n\nKEY DIFFERENCES:\n┌────────────────────┬──────────┬───────────────┐\n│ Feature            │ Lookup   │ Master-Detail │\n├────────────────────┼──────────┼───────────────┤\n│ Required field?    │ No       │ Yes           │\n│ Cascade delete?    │ No       │ Yes           │\n│ Roll-up summary?   │ No       │ Yes           │\n│ Security inherit?  │ No       │ Yes           │\n│ Max per object     │ 40       │ 2             │\n│ Can reparent?      │ Yes      │ Configurable  │\n└────────────────────┴──────────┴───────────────┘`, language: 'text', explanation: 'The key differentiator is dependency: Master-Detail means the child depends on the parent for existence and security. Lookup means independence.' },
      { title: 'Example 2: Junction Object (Many-to-Many)', description: 'Creating a many-to-many relationship between Students and Courses.', code: `Many-to-Many: Student ↔ Course\n══════════════════════════════\n\nProblem: One Student takes many Courses.\n         One Course has many Students.\n         → Many-to-Many relationship needed.\n\nSolution: Create a Junction Object\n\n  Student__c ←──MD──→ Enrollment__c ←──MD──→ Course__c\n  (Parent 1)          (Junction)           (Parent 2)\n\n  Enrollment__c fields:\n  ┌──────────────────────────────────────┐\n  │ Student__c  (Master-Detail → Student)│\n  │ Course__c   (Master-Detail → Course) │\n  │ Grade__c    (Picklist: A, B, C, D, F)│\n  │ Semester__c (Text: "Fall 2025")      │\n  │ Status__c   (Picklist: Active/Dropped│\n  └──────────────────────────────────────┘\n\n  Result:\n  → Student "Jane" enrolled in Math, Science, English\n  → Course "Math 101" has 30 students enrolled\n  → Each Enrollment record links one Student to one Course`, language: 'text', explanation: 'The junction object (Enrollment__c) sits between Student and Course with Master-Detail relationships to both. This enables many-to-many while supporting roll-up summaries on both parent objects.' }
    ],
    practice: {
      intro: 'Create relationships between objects to build a connected data model.',
      steps: [
        'If you haven\'t already, create the "Project__c" custom object from the previous lesson.',
        'Create a new custom object called "Task__c" with fields: Task Name (Text, Name field), Description (Long Text Area), Priority (Picklist: High/Medium/Low), Due Date (Date).',
        'On Task__c, create a Master-Detail relationship field to Project__c. Label it "Project."',
        'Now go to Project__c → Fields & Relationships → New → Roll-Up Summary field. Set it to COUNT of Task__c records. Label it "Total Tasks."',
        'Create a Project record and add 3 Task records to it. Verify the "Total Tasks" roll-up shows 3.',
        'Try to delete the Project record — notice that all 3 Tasks are also deleted (cascade delete).',
        'Now create a Lookup relationship on Task__c to Contact (standard object) for an "Assignee" field. Notice this field is optional — unlike the Master-Detail.'
      ],
      expectedOutcome: 'You should have Project__c with a Roll-Up Summary counting Tasks, a Master-Detail relationship (Task to Project), and a Lookup relationship (Task to Contact).'
    },
    interviewQuestions: [
      { scenario: 'A business analyst asks: "When should I use a Lookup vs Master-Detail relationship?" Give a clear decision framework.', answer: 'Use Master-Detail when: (1) The child cannot exist without the parent (e.g., Order Line Item without Order), (2) You need roll-up summary fields (SUM, COUNT, MAX, MIN) on the parent, (3) You want cascade delete behavior, (4) You want the child to inherit the parent\'s sharing settings. Use Lookup when: (1) The relationship is optional (field can be blank), (2) The child should have its own independent sharing/security, (3) You need more than 2 relationships on the child (max 2 M-D), (4) You might need to change or remove the parent (reparent).' },
      { scenario: 'A developer wants to implement a "many-to-many" relationship between Products and Orders. How would you design this?', answer: 'Create a junction object called Order_Line_Item__c with two Master-Detail relationships: one to Order__c and one to Product__c. Add fields like Quantity__c, Unit_Price__c, and Line_Total__c (formula: Quantity × Unit_Price). This allows one Order to have many Products and one Product to appear on many Orders. You can then use roll-up summary fields on Order__c to calculate total order value by summing Line_Total__c.' },
      { scenario: 'A client reports that they tried to add a third Master-Detail relationship to their custom object but got an error. Why?', answer: 'Salesforce limits each object to a maximum of 2 Master-Detail relationships. This is because Master-Detail relationships control record ownership (the child inherits the parent\'s owner) and with more than 2, ownership would be ambiguous. The solution is to convert one of the Master-Detail relationships to a Lookup, or redesign the data model. If they need roll-up functionality on a Lookup, they can use Declarative Lookup Rollup Summaries (DLRS) or Salesforce Flows.' },
      { scenario: 'An admin asks: "What happens to child records when I convert a Master-Detail relationship to a Lookup?" What do you explain?', answer: 'Converting a Master-Detail to a Lookup is possible if: (1) The detail records all have a parent value (no orphans), (2) Any roll-up summary fields on the master are deleted first. After conversion: cascade delete stops, the relationship field becomes optional, the child records get their own OWD settings, and roll-up summaries are no longer available natively. The conversion is non-destructive — no data is lost. Going from Lookup to Master-Detail is also possible if all child records have a parent value (no blanks).' },
      { scenario: 'A Salesforce admin notices the "Hierarchical" relationship type in the documentation but can\'t find it when creating a new relationship. Where is it?', answer: 'The Hierarchical relationship type is a special self-lookup that is ONLY available on the User object. It creates a tree structure linking users to their managers (the standard "Manager" field on User uses this). You cannot create hierarchical relationships on custom objects or other standard objects. For custom hierarchical structures (e.g., organizational chart, category tree), use a self-referencing Lookup relationship where the object looks up to itself (e.g., Parent_Category__c on Category__c looks up to Category__c).' }
    ]
  },

  '1.9': {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p><strong>Schema Builder</strong> is a visual, drag-and-drop tool in Salesforce Setup that allows administrators and developers to view, create, and modify objects, fields, and relationships in a graphical interface. It displays the data model as an Entity Relationship Diagram (ERD), making it easier to understand object connections.</p>
      </div>
      <h3>Key Features of Schema Builder</h3>
      <ul>
        <li><strong>Visual Data Model</strong> — See all objects and their relationships as a diagram</li>
        <li><strong>Drag-and-Drop Object Creation</strong> — Create new objects directly on the canvas</li>
        <li><strong>Add Fields Inline</strong> — Add fields to objects without leaving the diagram</li>
        <li><strong>Relationship Lines</strong> — Visual arrows showing Lookup and Master-Detail connections</li>
        <li><strong>Filter Objects</strong> — Show/hide standard objects, custom objects, or specific objects</li>
        <li><strong>Color-Coded Fields</strong> — Different colors for different field types</li>
        <li><strong>Zoom & Pan</strong> — Navigate large data models</li>
      </ul>
      <h3>Schema Builder vs Object Manager</h3>
      <table>
        <thead><tr><th>Feature</th><th>Schema Builder</th><th>Object Manager</th></tr></thead>
        <tbody>
          <tr><td>View</td><td>Visual diagram (ERD)</td><td>List/table view</td></tr>
          <tr><td>Create objects</td><td>✓ Drag-and-drop</td><td>✓ Form-based</td></tr>
          <tr><td>Create fields</td><td>✓ Inline</td><td>✓ Wizard</td></tr>
          <tr><td>See relationships</td><td>✓ Visual lines</td><td>✓ Listed in fields</td></tr>
          <tr><td>Edit page layouts</td><td>✗</td><td>✓</td></tr>
          <tr><td>Create triggers</td><td>✗</td><td>✓</td></tr>
          <tr><td>Best for</td><td>Understanding data model, quick prototyping</td><td>Detailed configuration</td></tr>
        </tbody>
      </table>
      <div class="callout callout--warning">
        <p class="callout__title">⚠️ Limitation</p>
        <p>Schema Builder cannot create Lookup or Master-Detail relationships visually — you must create relationship fields through the Object Manager field wizard. Schema Builder only displays existing relationships.</p>
      </div>
    `,
    examples: [
      { title: 'Example 1: Reading a Schema Builder Diagram', description: 'Understanding the visual representation of a data model.', code: `Schema Builder Diagram Example\n══════════════════════════════\n\n  ┌──────────────────┐         ┌──────────────────┐\n  │    Account       │         │    Contact       │\n  │ ──────────────── │         │ ──────────────── │\n  │ Name        Text │◄────────│ AccountId   Lkup │\n  │ Industry    Pick │         │ FirstName   Text │\n  │ Revenue     Curr │         │ LastName    Text │\n  │ Phone       Phn  │         │ Email       Email│\n  │ Total_Tasks Roll │         │ Phone       Phn  │\n  └──────────────────┘         └──────────────────┘\n          │                            │\n          │ Lookup                     │ Lookup\n          ▼                            ▼\n  ┌──────────────────┐         ┌──────────────────┐\n  │  Opportunity     │         │    Task__c       │\n  │ ──────────────── │         │ ──────────────── │\n  │ Name        Text │         │ Name        Text │\n  │ Stage       Pick │         │ Project__c  M-D  │──┐\n  │ Amount      Curr │         │ Assignee__c Lkup │  │\n  │ CloseDate   Date │         │ Priority    Pick │  │\n  │ AccountId   Lkup │         │ Due_Date    Date │  │\n  └──────────────────┘         └──────────────────┘  │\n                                                     │M-D\n                               ┌──────────────────┐  │\n                               │  Project__c      │◄─┘\n                               │ ──────────────── │\n                               │ Name       AutoN │\n                               │ Budget     Curr  │\n                               │ Status     Pick  │\n                               │ TotalTasks Roll  │\n                               └──────────────────┘\n\n  Legend:\n  ────── = Lookup (loose coupling)\n  ══════ = Master-Detail (tight coupling)\n  Lkup = Lookup, M-D = Master-Detail\n  Roll = Roll-Up Summary, Pick = Picklist`, language: 'text', explanation: 'This ERD shows how objects are connected. Arrows point from child to parent. Master-Detail relationships (thicker lines) indicate cascade delete and roll-up summary support.' }
    ],
    practice: {
      intro: 'Use Schema Builder to visualize and expand your data model.',
      steps: [
        'Go to Setup → search for "Schema Builder" in Quick Find.',
        'In the left panel, check "Custom Objects" to show your Project__c and Task__c objects on the canvas.',
        'Also check "Account," "Contact," and "Opportunity" standard objects.',
        'Observe the relationship lines: the Master-Detail line from Task__c to Project__c, and the Lookup line from Task__c to Contact.',
        'Use the "Elements" tab on the left to drag a new Text field directly onto the Project__c object. Name it "Description."',
        'Zoom in/out and pan around to see the full picture. Take a screenshot of your data model for reference.',
        'Click on any relationship line to see the relationship details (type, field name, etc.).'
      ],
      expectedOutcome: 'You should be able to visualize your entire data model in Schema Builder, see all relationships, and add fields directly on the canvas.'
    },
    interviewQuestions: [
      { scenario: 'A project manager asks you to explain the data model to non-technical stakeholders. What tool would you use and how?', answer: 'I would use Schema Builder to create a visual Entity Relationship Diagram (ERD). I would filter to show only the relevant objects, screenshot the diagram, and present it in a slide deck. For stakeholders, I would explain: boxes = types of data (objects), lines = connections between data (relationships), fields inside boxes = the attributes we track. I would use simple terms like "A Customer (Account) has many Contacts, and each Contact can create support Cases."' },
      { scenario: 'Can you create all field types in Schema Builder? Are there any limitations?', answer: 'Schema Builder supports creating most field types including Text, Number, Currency, Date, Picklist, Checkbox, and Formula fields. However, it has limitations: (1) You cannot create Lookup or Master-Detail relationship fields — those must be created in Object Manager, (2) You cannot edit page layouts, (3) You cannot create triggers or validation rules, (4) Field-level security must be set in Object Manager. Schema Builder is best for quick prototyping and visualization, while Object Manager is needed for complete configuration.' },
      { scenario: 'Your team has 50+ custom objects and the data model is becoming hard to understand. How would you document it?', answer: 'I would: (1) Use Schema Builder to create visual ERDs, filtering by functional area (Sales objects, Service objects, Custom objects), (2) Export the diagram as screenshots for documentation, (3) Create a data dictionary spreadsheet listing every object, its fields, data types, descriptions, and relationships, (4) Use a tool like LucidChart or ERDPlus for more polished diagrams, (5) Document naming conventions and design patterns in a wiki. I would also recommend regular data model reviews to identify unused objects and fields.' },
      { scenario: 'A new developer joins your team and needs to quickly understand the Salesforce data model. What\'s the fastest way to bring them up to speed?', answer: 'The fastest approach is: (1) Open Schema Builder and show them the visual data model with key objects highlighted, (2) Walk through the main objects and their relationships (Account → Contact → Opportunity flow), (3) Show them Object Manager for one key object to understand fields, page layouts, and triggers, (4) Have them run a few SOQL queries in the Developer Console to see the data: SELECT Id, Name FROM Account LIMIT 10, (5) Point them to any existing data dictionary documentation. This visual + hands-on approach is much more effective than reading documentation.' },
      { scenario: 'During a data model design review, a colleague suggests creating 15 custom objects for a new feature. How do you evaluate this?', answer: 'I would evaluate: (1) Are all 15 objects truly needed? Can any be combined or replaced by existing objects? (2) Are there standard objects that could be repurposed? (3) Will this make the data model too complex for admins and users to understand? (4) Are there object limit concerns (200 in Enterprise)? (5) Could some data be stored as related lists on existing objects instead of new objects? I would draw the proposed ERD in Schema Builder to visualize complexity, and apply the principle of "minimum viable data model" — start simple and add objects only when clearly needed.' }
    ]
  },

  '1.10': {
    theory: `
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p><strong>Field Data Types</strong> define what kind of data a field can store and how it behaves in the UI, formulas, reports, and APIs. Salesforce offers 20+ field data types, each designed for specific data storage needs. Choosing the right data type is critical because it <strong>cannot be changed</strong> after creation for most types.</p>
      </div>
      <h3>Common Field Data Types</h3>
      <table>
        <thead><tr><th>Data Type</th><th>Stores</th><th>Example</th><th>Max Length</th></tr></thead>
        <tbody>
          <tr><td><strong>Text</strong></td><td>Short text/string</td><td>City name</td><td>255 chars</td></tr>
          <tr><td><strong>Text Area</strong></td><td>Multi-line text</td><td>Short description</td><td>255 chars</td></tr>
          <tr><td><strong>Long Text Area</strong></td><td>Large text blocks</td><td>Full description</td><td>131,072 chars</td></tr>
          <tr><td><strong>Rich Text Area</strong></td><td>Formatted text with images</td><td>HTML content</td><td>131,072 chars</td></tr>
          <tr><td><strong>Number</strong></td><td>Integers or decimals</td><td>Quantity: 150</td><td>18 digits</td></tr>
          <tr><td><strong>Currency</strong></td><td>Monetary amounts</td><td>$50,000.00</td><td>18 digits</td></tr>
          <tr><td><strong>Percent</strong></td><td>Percentage values</td><td>75%</td><td>18 digits</td></tr>
          <tr><td><strong>Date</strong></td><td>Date only</td><td>2025-03-15</td><td>N/A</td></tr>
          <tr><td><strong>Date/Time</strong></td><td>Date + time</td><td>2025-03-15 14:30:00</td><td>N/A</td></tr>
          <tr><td><strong>Checkbox</strong></td><td>Boolean true/false</td><td>Is Active: ✓</td><td>N/A</td></tr>
          <tr><td><strong>Picklist</strong></td><td>Single selection from list</td><td>Status: Active</td><td>255 chars per value</td></tr>
          <tr><td><strong>Multi-Select Picklist</strong></td><td>Multiple selections</td><td>Skills: Java; Apex; LWC</td><td>255 chars per value</td></tr>
          <tr><td><strong>Email</strong></td><td>Email address</td><td>user@example.com</td><td>80 chars</td></tr>
          <tr><td><strong>Phone</strong></td><td>Phone number</td><td>(555) 123-4567</td><td>40 chars</td></tr>
          <tr><td><strong>URL</strong></td><td>Web address</td><td>https://example.com</td><td>255 chars</td></tr>
          <tr><td><strong>Formula</strong></td><td>Calculated value</td><td>Profit = Revenue - Cost</td><td>3,900 chars</td></tr>
          <tr><td><strong>Roll-Up Summary</strong></td><td>Aggregate of child records</td><td>Total Line Items: 5</td><td>N/A</td></tr>
          <tr><td><strong>Lookup</strong></td><td>Reference to another record</td><td>Account: Acme Corp</td><td>N/A</td></tr>
          <tr><td><strong>Master-Detail</strong></td><td>Required parent reference</td><td>Order: ORD-001</td><td>N/A</td></tr>
          <tr><td><strong>Auto Number</strong></td><td>Auto-incrementing ID</td><td>PRJ-0001</td><td>N/A</td></tr>
          <tr><td><strong>Geolocation</strong></td><td>Latitude/Longitude</td><td>37.7749, -122.4194</td><td>N/A</td></tr>
        </tbody>
      </table>
      <h3>Field Properties</h3>
      <p>Beyond data type, every field has properties that control its behavior:</p>
      <ul>
        <li><strong>Required</strong> — Must have a value before saving</li>
        <li><strong>Unique</strong> — No two records can have the same value</li>
        <li><strong>External ID</strong> — Used for upsert operations and external system integration</li>
        <li><strong>Default Value</strong> — Pre-populated value for new records</li>
        <li><strong>Help Text</strong> — Tooltip explaining the field to users</li>
        <li><strong>Field-Level Security</strong> — Controls which profiles can see/edit the field</li>
      </ul>
      <div class="callout callout--important">
        <p class="callout__title">🔴 Critical Rule</p>
        <p>Most field data type changes are <strong>irreversible</strong>. You can change Text to Text Area, but you cannot change Currency to Text or Picklist to Checkbox. Always plan your field types carefully before creating them in production.</p>
      </div>
    `,
    examples: [
      { title: 'Example 1: Formula Field', description: 'Calculating days until opportunity close date.', code: `Formula Field: Days Until Close\n════════════════════════════════\n\nObject: Opportunity\nField Label: Days Until Close\nReturn Type: Number (0 decimal places)\n\nFormula:\nIF(\n  ISPICKVAL(StageName, 'Closed Won') ||\n  ISPICKVAL(StageName, 'Closed Lost'),\n  0,\n  CloseDate - TODAY()\n)\n\nResult Examples:\n• Close Date: 2025-04-15, Today: 2025-03-15 → 31 days\n• Close Date: 2025-03-10, Today: 2025-03-15 → -5 (overdue!)\n• Stage: Closed Won → 0 (already closed)`, language: 'java', explanation: 'Formula fields are calculated in real-time and don\'t consume storage. They\'re read-only and recalculate whenever the record is viewed or referenced.' },
      { title: 'Example 2: Picklist vs Multi-Select Picklist', description: 'Understanding when to use each type.', code: `Picklist Types Comparison\n═════════════════════════\n\nPICKLIST (Single Select):\n  Field: Status__c\n  Values: Planning | Active | On Hold | Completed\n  Selection: [Active] ← Only ONE can be selected\n  Stored as: "Active"\n  SOQL: WHERE Status__c = 'Active'\n\nMULTI-SELECT PICKLIST:\n  Field: Skills__c  \n  Values: Apex | LWC | Admin | Integration | Analytics\n  Selection: [Apex] [LWC] [Integration] ← MULTIPLE\n  Stored as: "Apex;LWC;Integration" (semicolon-separated)\n  SOQL: WHERE Skills__c INCLUDES ('Apex', 'LWC')\n\n⚠️ CAUTION with Multi-Select Picklists:\n  • Cannot be used in ORDER BY clauses\n  • Limited reporting capabilities\n  • Use INCLUDES/EXCLUDES in SOQL, not = or !=\n  • Consider using a related object instead for\n    better reporting and flexibility`, language: 'java', explanation: 'Multi-select picklists store values as semicolon-separated strings, which makes them harder to query and report on. For complex selections, consider a junction object pattern instead.' }
    ],
    practice: {
      intro: 'Create different field types on your Project__c object to understand their behaviors.',
      steps: [
        'Go to Setup → Object Manager → Project__c → Fields & Relationships.',
        'Create a Formula field: Label = "Days Remaining", Return Type = Number. Formula: End_Date__c - TODAY(). (Create End_Date__c Date field first if not already present.)',
        'Create a Picklist field: Label = "Priority", Values: Low, Medium, High, Critical.',
        'Create an Email field: Label = "Project Manager Email."',
        'Create a Checkbox field: Label = "Is Active", Default Value: Checked.',
        'Create a URL field: Label = "Documentation Link."',
        'Create a new Project record and fill in all the new fields. Notice how each field type has a different UI input widget.'
      ],
      expectedOutcome: 'Your Project__c object should now have Formula, Picklist, Email, Checkbox, and URL fields. You should understand how each field type renders and behaves in the UI.'
    },
    interviewQuestions: [
      { scenario: 'A business user wants to store a customer\'s age in Salesforce. They suggest a Text field. Why is that wrong and what should they use?', answer: 'A Text field would store "25" as a string, making it impossible to perform calculations, sorting, or filtering by numeric value. Instead, use a Number field (integer, 0 decimal places) for a fixed age, OR better yet, use a Date field for "Date of Birth" and create a Formula field that calculates age dynamically: FLOOR((TODAY() - Date_of_Birth__c) / 365.25). This approach keeps the age always current without manual updates.' },
      { scenario: 'A developer asks when to use a Formula field vs a Roll-Up Summary field. What\'s the difference?', answer: 'A Formula field performs calculations using fields on the SAME record or parent records (via cross-object formulas). Example: Full_Name__c = FirstName + " " + LastName. A Roll-Up Summary field aggregates data from CHILD records in a Master-Detail relationship using COUNT, SUM, MIN, or MAX. Example: Total_Invoice_Amount on Account = SUM of Amount on all child Invoice records. Roll-Up Summary requires a Master-Detail relationship and only works on the parent object.' },
      { scenario: 'A client wants a field that auto-generates unique IDs like "INV-2025-0001". How do you set this up?', answer: 'Use an Auto Number field as the Name field of the object. Set the Display Format to "INV-{YYYY}-{0000}" where {YYYY} is the 4-digit year and {0000} is a zero-padded sequential number. Starting Number should be 1. This auto-generates unique values like INV-2025-0001, INV-2025-0002, etc. Note: Auto Number can only be used as the Name field and is set during object creation. If you need a secondary auto-number, you\'d need a Flow or Trigger.' },
      { scenario: 'An admin created a Currency field but now the client wants to change it to a Text field. Is this possible?', answer: 'No, this field type change is not supported by Salesforce. Currency cannot be converted to Text. The admin would need to: (1) Create a new Text field, (2) Migrate the data from the Currency field using Data Loader or a Flow (converting the values), (3) Update all references (reports, formulas, validation rules, Apex code, page layouts), (4) Delete the old Currency field. This is why careful data type planning is critical before creating fields in production.' },
      { scenario: 'A user asks what "External ID" means on a field and when they should use it. How do you explain?', answer: 'An External ID is a field property that marks a field as a unique identifier from an external system. It can be set on Text, Number, or Email fields. External IDs are used for: (1) Upsert operations — Salesforce can match records by External ID instead of Salesforce ID, making data imports from external systems easier, (2) They\'re automatically indexed for faster SOQL queries, (3) They enable the "upsert" DML operation which inserts or updates based on the External ID match. Example: A field "ERP_Customer_ID__c" stores the customer ID from your ERP system, allowing seamless data sync between Salesforce and the ERP.' }
    ]
  }
};
