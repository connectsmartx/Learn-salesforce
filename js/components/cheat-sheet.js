/* ============================================================
   CHEAT SHEET — Quick Reference Cards
   ============================================================ */

import { highlight } from '../utils/syntax-highlighter.js';

const cheatSheets = [
  {
    id: 'soql',
    title: 'SOQL Quick Reference',
    icon: '🔍',
    color: '#00a1e0',
    items: [
      { label: 'Basic Query', code: "SELECT Id, Name FROM Account WHERE Industry = 'Technology' LIMIT 10", lang: 'soql' },
      { label: 'Relationship (Parent)', code: "SELECT Name, Account.Name FROM Contact WHERE Account.Industry = 'Finance'", lang: 'soql' },
      { label: 'Relationship (Child)', code: "SELECT Name, (SELECT LastName FROM Contacts) FROM Account", lang: 'soql' },
      { label: 'Aggregate', code: "SELECT Industry, COUNT(Id) cnt FROM Account GROUP BY Industry HAVING COUNT(Id) > 5", lang: 'soql' },
      { label: 'Date Literal', code: "SELECT Id FROM Opportunity WHERE CloseDate = THIS_QUARTER", lang: 'soql' },
      { label: 'Dynamic SOQL', code: "String query = 'SELECT Id FROM ' + objectName + ' WHERE ' + field + ' = :value';\nList<SObject> results = Database.query(query);", lang: 'apex' },
    ]
  },
  {
    id: 'apex-collections',
    title: 'Apex Collections',
    icon: '📦',
    color: '#f59e0b',
    items: [
      { label: 'List', code: "List<String> names = new List<String>{'Alice', 'Bob'};\nnames.add('Charlie');\nString first = names[0];  // Alice\nInteger size = names.size();  // 3", lang: 'apex' },
      { label: 'Set', code: "Set<Id> accountIds = new Set<Id>();\nfor (Contact c : contacts) {\n    accountIds.add(c.AccountId);\n}\n// Automatically de-duped", lang: 'apex' },
      { label: 'Map', code: "Map<Id, Account> accountMap = new Map<Id, Account>(\n    [SELECT Id, Name FROM Account]\n);\nAccount a = accountMap.get(someId);", lang: 'apex' },
    ]
  },
  {
    id: 'apex-triggers',
    title: 'Apex Trigger Context',
    icon: '⚡',
    color: '#ef4444',
    items: [
      { label: 'Trigger Events', code: "trigger AccountTrigger on Account (before insert, before update,\n    after insert, after update, before delete, after delete, after undelete) {\n    // Trigger.new, Trigger.old, Trigger.newMap, Trigger.oldMap\n}", lang: 'apex' },
      { label: 'Context Variables', code: "Trigger.isInsert  Trigger.isUpdate  Trigger.isDelete\nTrigger.isBefore   Trigger.isAfter\nTrigger.new        Trigger.old\nTrigger.newMap     Trigger.oldMap\nTrigger.size       Trigger.isExecuting", lang: 'text' },
      { label: 'Best Practice', code: "// ONE trigger per object → Handler class\ntrigger AccountTrigger on Account (before insert, after insert) {\n    AccountTriggerHandler handler = new AccountTriggerHandler();\n    if (Trigger.isBefore && Trigger.isInsert) {\n        handler.beforeInsert(Trigger.new);\n    }\n}", lang: 'apex' },
    ]
  },
  {
    id: 'lwc-basics',
    title: 'LWC Quick Reference',
    icon: '🧩',
    color: '#22c55e',
    items: [
      { label: 'Component Structure', code: "myComponent/\n├── myComponent.html      // Template\n├── myComponent.js        // Controller\n├── myComponent.css       // Styles\n└── myComponent.js-meta.xml  // Metadata", lang: 'text' },
      { label: 'Decorators', code: "import { LightningElement, api, wire, track } from 'lwc';\n\nexport default class MyComponent extends LightningElement {\n    @api recordId;           // Public property\n    @track complexObj = {};  // Deep-tracked reactive\n    reactiveField = '';      // Simple reactive (auto)\n}", lang: 'javascript' },
      { label: 'Wire Service', code: "import { wire } from 'lwc';\nimport getAccounts from '@salesforce/apex/AccountController.getAccounts';\n\n@wire(getAccounts, { searchKey: '$searchTerm' })\nwiredAccounts;  // { data, error }", lang: 'javascript' },
      { label: 'Conditional Rendering', code: '<template lwc:if={isAdmin}>\n    <p>Admin Panel</p>\n</template>\n<template lwc:elseif={isManager}>\n    <p>Manager Dashboard</p>\n</template>\n<template lwc:else>\n    <p>User View</p>\n</template>', lang: 'javascript' },
      { label: 'Custom Events', code: "// Child: dispatch event\nthis.dispatchEvent(new CustomEvent('select', {\n    detail: { recordId: this.selectedId },\n    bubbles: true\n}));\n\n// Parent HTML: handle event\n// <c-child onselect={handleSelect}></c-child>", lang: 'javascript' },
    ]
  },
  {
    id: 'governor-limits',
    title: 'Governor Limits',
    icon: '🚦',
    color: '#7c3aed',
    items: [
      { label: 'Key Limits (Sync)', code: "SOQL Queries:        100 per transaction\nSOQL Rows:           50,000 per transaction\nDML Statements:      150 per transaction\nDML Rows:            10,000 per transaction\nCallouts:            100 per transaction\nFuture Methods:      50 per transaction\nHeap Size:           6 MB (sync) / 12 MB (async)\nCPU Time:            10,000 ms (sync) / 60,000 ms (async)", lang: 'text' },
      { label: 'Bulkification', code: "// ❌ BAD: SOQL inside loop\nfor (Contact c : contacts) {\n    Account a = [SELECT Name FROM Account WHERE Id = :c.AccountId];\n}\n\n// ✅ GOOD: Query once, use Map\nSet<Id> accIds = new Set<Id>();\nfor (Contact c : contacts) accIds.add(c.AccountId);\nMap<Id, Account> accMap = new Map<Id, Account>(\n    [SELECT Id, Name FROM Account WHERE Id IN :accIds]\n);", lang: 'apex' },
    ]
  },
  {
    id: 'security',
    title: 'Security Model',
    icon: '🛡️',
    color: '#06b6d4',
    items: [
      { label: 'Security Layers', code: "Organization Level → Login IP, Login Hours\n    ↓\nObject Level → Profiles, Permission Sets (CRUD)\n    ↓\nField Level → Field-Level Security (FLS)\n    ↓\nRecord Level → OWD → Role Hierarchy → Sharing Rules → Manual Sharing", lang: 'text' },
      { label: 'OWD Settings', code: "Private:             Only owner + above in hierarchy\nPublic Read Only:    Everyone can see, only owner edits\nPublic Read/Write:   Everyone can see and edit\nControlled by Parent: Follows master object's OWD (detail objects)", lang: 'text' },
    ]
  }
];

export function renderCheatSheetsPage() {
  const main = document.getElementById('mainContent');
  if (!main) return;

  main.innerHTML = `
    <div class="cheatsheets-page">
      <header class="cheatsheets-page__header">
        <h1 class="cheatsheets-page__title">📋 Cheat Sheets</h1>
        <p class="cheatsheets-page__subtitle">Quick reference cards for Salesforce development. Copy code snippets with one click.</p>
      </header>

      <div class="cheatsheets-grid">
        ${cheatSheets.map(sheet => `
          <div class="cheatsheet-card" id="sheet-${sheet.id}">
            <div class="cheatsheet-card__header" style="border-left-color:${sheet.color}">
              <span class="cheatsheet-card__icon">${sheet.icon}</span>
              <h2 class="cheatsheet-card__title">${sheet.title}</h2>
            </div>
            <div class="cheatsheet-card__body">
              ${sheet.items.map(item => `
                <div class="cheatsheet-item">
                  <div class="cheatsheet-item__label">${item.label}</div>
                  <div class="code-block code-block--compact">
                    <div class="code-block__header">
                      <span class="code-block__lang">${item.lang}</span>
                      <button class="code-block__copy" onclick="navigator.clipboard.writeText(decodeURIComponent('${encodeURIComponent(item.code)}')).then(()=>{this.textContent='Copied!';setTimeout(()=>this.textContent='Copy',1500)})">Copy</button>
                    </div>
                    <pre><code class="language-${item.lang}">${highlight(item.code, item.lang)}</code></pre>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>`;

  main.scrollTo({ top: 0, behavior: 'smooth' });
}
