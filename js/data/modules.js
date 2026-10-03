/* ============================================================
   MODULES — Module & Lesson Metadata
   ============================================================ */

export const modules = [
  {
    id: '1',
    title: 'Salesforce Fundamentals',
    icon: '☁️',
    color: '#00a1e0',
    gradient: 'linear-gradient(135deg, #00a1e0, #0076b5)',
    description: 'Understand the core concepts of Salesforce CRM, cloud architecture, and data modeling.',
    lessonCount: 10,
    lessons: [
      { id: '1.1', title: 'What is Salesforce?', subtitle: 'CRM, Cloud Computing & Multi-tenant Architecture', duration: '15 min', difficulty: 'beginner' },
      { id: '1.2', title: 'Salesforce Editions & Licensing', subtitle: 'Essentials to Unlimited — Choosing the Right Edition', duration: '12 min', difficulty: 'beginner' },
      { id: '1.3', title: 'Salesforce Architecture', subtitle: 'MVC Pattern, Metadata-Driven, Multi-tenant', duration: '18 min', difficulty: 'beginner' },
      { id: '1.4', title: 'Setting Up Developer Edition', subtitle: 'Create Your Free Salesforce Org', duration: '10 min', difficulty: 'beginner' },
      { id: '1.5', title: 'Navigating Lightning Experience', subtitle: 'App Launcher, Navigation Bar, Home Page', duration: '12 min', difficulty: 'beginner' },
      { id: '1.6', title: 'Objects, Fields & Records', subtitle: 'The Building Blocks of Salesforce Data', duration: '20 min', difficulty: 'beginner' },
      { id: '1.7', title: 'Standard vs Custom Objects', subtitle: 'When to Use Each & How to Create Custom Objects', duration: '15 min', difficulty: 'beginner' },
      { id: '1.8', title: 'Relationships in Salesforce', subtitle: 'Lookup, Master-Detail & Hierarchical Relationships', duration: '20 min', difficulty: 'beginner' },
      { id: '1.9', title: 'Schema Builder', subtitle: 'Visual Data Modeling Tool', duration: '12 min', difficulty: 'beginner' },
      { id: '1.10', title: 'Data Types & Field Properties', subtitle: 'All 20+ Field Types Explained', duration: '18 min', difficulty: 'beginner' },
    ]
  },
  {
    id: '2',
    title: 'Salesforce Administration',
    icon: '🛡️',
    color: '#7c3aed',
    gradient: 'linear-gradient(135deg, #7c3aed, #5b21b6)',
    description: 'Master security, automation, reports, and data management like a pro admin.',
    lessonCount: 10,
    lessons: [
      { id: '2.1', title: 'Profiles & Permission Sets', subtitle: 'Controlling User Access & Permissions', duration: '18 min', difficulty: 'beginner' },
      { id: '2.2', title: 'Roles & Role Hierarchy', subtitle: 'Building Your Organization\'s Data Hierarchy', duration: '15 min', difficulty: 'beginner' },
      { id: '2.3', title: 'Record-Level Security', subtitle: 'OWD, Sharing Rules & Manual Sharing', duration: '20 min', difficulty: 'intermediate' },
      { id: '2.4', title: 'Page Layouts & Lightning App Builder', subtitle: 'Designing User Interfaces Without Code', duration: '18 min', difficulty: 'beginner' },
      { id: '2.5', title: 'Validation Rules', subtitle: 'Enforcing Data Quality with Formulas', duration: '15 min', difficulty: 'beginner' },
      { id: '2.6', title: 'Workflow Rules & Process Builder', subtitle: 'Legacy Automation Tools', duration: '15 min', difficulty: 'intermediate' },
      { id: '2.7', title: 'Flows', subtitle: 'Screen, Record-Triggered & Auto-Launched Flows', duration: '25 min', difficulty: 'intermediate' },
      { id: '2.8', title: 'Approval Processes', subtitle: 'Multi-Step Business Approvals', duration: '18 min', difficulty: 'intermediate' },
      { id: '2.9', title: 'Reports & Dashboards', subtitle: 'Visualizing Data with Salesforce Analytics', duration: '20 min', difficulty: 'beginner' },
      { id: '2.10', title: 'Data Management', subtitle: 'Import, Export & Data Loader', duration: '18 min', difficulty: 'intermediate' },
    ]
  },
  {
    id: '3',
    title: 'Apex Programming',
    icon: '💻',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
    description: 'Learn Salesforce\'s strongly-typed programming language from variables to advanced async processing.',
    lessonCount: 20,
    lessons: [
      { id: '3.1', title: 'Introduction to Apex', subtitle: 'What, Why & When to Use Apex', duration: '15 min', difficulty: 'beginner' },
      { id: '3.2', title: 'Data Types & Variables', subtitle: 'Primitive, sObject & Complex Types', duration: '18 min', difficulty: 'beginner' },
      { id: '3.3', title: 'Operators & Expressions', subtitle: 'Arithmetic, Comparison & Logical Operators', duration: '12 min', difficulty: 'beginner' },
      { id: '3.4', title: 'Control Flow', subtitle: 'if/else, switch, for, while & do-while', duration: '18 min', difficulty: 'beginner' },
      { id: '3.5', title: 'Collections', subtitle: 'List, Set & Map — When and How to Use Each', duration: '20 min', difficulty: 'beginner' },
      { id: '3.6', title: 'SOQL Basics', subtitle: 'SELECT, WHERE, ORDER BY, LIMIT & Relationships', duration: '22 min', difficulty: 'beginner' },
      { id: '3.7', title: 'Advanced SOQL', subtitle: 'Aggregate Queries, Sub-queries & Dynamic SOQL', duration: '20 min', difficulty: 'intermediate' },
      { id: '3.8', title: 'SOSL', subtitle: 'Salesforce Object Search Language', duration: '12 min', difficulty: 'intermediate' },
      { id: '3.9', title: 'DML Operations', subtitle: 'insert, update, upsert, delete & undelete', duration: '18 min', difficulty: 'beginner' },
      { id: '3.10', title: 'Classes & Methods', subtitle: 'Anatomy of an Apex Class', duration: '20 min', difficulty: 'intermediate' },
      { id: '3.11', title: 'Access Modifiers & Properties', subtitle: 'public, private, global, virtual & abstract', duration: '15 min', difficulty: 'intermediate' },
      { id: '3.12', title: 'Exception Handling', subtitle: 'try/catch/finally & Custom Exceptions', duration: '15 min', difficulty: 'intermediate' },
      { id: '3.13', title: 'Triggers', subtitle: 'Before & After Triggers on sObjects', duration: '22 min', difficulty: 'intermediate' },
      { id: '3.14', title: 'Trigger Framework', subtitle: 'Handler Pattern & Best Practices', duration: '20 min', difficulty: 'advanced' },
      { id: '3.15', title: 'Governor Limits & Bulkification', subtitle: 'Writing Efficient, Scalable Code', duration: '22 min', difficulty: 'advanced' },
      { id: '3.16', title: 'Batch Apex', subtitle: 'Processing Large Data Volumes', duration: '20 min', difficulty: 'advanced' },
      { id: '3.17', title: 'Schedulable Apex', subtitle: 'Cron Expressions & Scheduled Jobs', duration: '15 min', difficulty: 'advanced' },
      { id: '3.18', title: 'Queueable Apex', subtitle: 'Chaining Async Jobs', duration: '15 min', difficulty: 'advanced' },
      { id: '3.19', title: 'Future Methods', subtitle: '@future Annotation & Callout Patterns', duration: '15 min', difficulty: 'advanced' },
      { id: '3.20', title: 'Test Classes', subtitle: 'Writing Tests & Achieving Code Coverage', duration: '22 min', difficulty: 'intermediate' },
    ]
  },
  {
    id: '4',
    title: 'Lightning Web Components',
    icon: '⚡',
    color: '#22c55e',
    gradient: 'linear-gradient(135deg, #22c55e, #16a34a)',
    description: 'Build modern UI components using LWC — Salesforce\'s standards-based web component framework.',
    lessonCount: 15,
    lessons: [
      { id: '4.1', title: 'Introduction to LWC', subtitle: 'Web Standards, Shadow DOM & Component Model', duration: '18 min', difficulty: 'beginner' },
      { id: '4.2', title: 'Dev Environment Setup', subtitle: 'VS Code, Salesforce CLI & SFDX Project', duration: '15 min', difficulty: 'beginner' },
      { id: '4.3', title: 'LWC Project Structure', subtitle: 'Component Bundle: HTML, JS, CSS & Meta XML', duration: '15 min', difficulty: 'beginner' },
      { id: '4.4', title: 'Templates & Data Binding', subtitle: 'Dynamic Rendering with {expressions}', duration: '18 min', difficulty: 'beginner' },
      { id: '4.5', title: 'Decorators', subtitle: '@api, @track & @wire Explained', duration: '22 min', difficulty: 'intermediate' },
      { id: '4.6', title: 'CSS Styling in LWC', subtitle: 'SLDS, Custom CSS & CSS Variables', duration: '15 min', difficulty: 'beginner' },
      { id: '4.7', title: 'Conditional Rendering', subtitle: 'lwc:if, lwc:elseif & lwc:else', duration: '15 min', difficulty: 'beginner' },
      { id: '4.8', title: 'List Rendering', subtitle: 'for:each, iterator & key Directives', duration: '15 min', difficulty: 'beginner' },
      { id: '4.9', title: 'Event Handling', subtitle: 'Custom Events & Component Communication', duration: '22 min', difficulty: 'intermediate' },
      { id: '4.10', title: 'Wire Service', subtitle: 'Reactive Data with @wire & Apex', duration: '20 min', difficulty: 'intermediate' },
      { id: '4.11', title: 'Imperative Apex', subtitle: 'Calling Apex Methods from LWC', duration: '18 min', difficulty: 'intermediate' },
      { id: '4.12', title: 'Navigation & LMS', subtitle: 'NavigationMixin & Lightning Message Service', duration: '18 min', difficulty: 'intermediate' },
      { id: '4.13', title: 'Forms & Validation', subtitle: 'Input Components & Custom Validation', duration: '20 min', difficulty: 'intermediate' },
      { id: '4.14', title: 'Lightning Data Table', subtitle: 'Sortable, Editable Data Display', duration: '18 min', difficulty: 'intermediate' },
      { id: '4.15', title: 'Deploying LWC', subtitle: 'sf deploy & Org Management', duration: '12 min', difficulty: 'beginner' },
    ]
  }
];

export function getModule(moduleId) {
  return modules.find(m => m.id === moduleId);
}

export function getLesson(lessonId) {
  for (const mod of modules) {
    const lesson = mod.lessons.find(l => l.id === lessonId);
    if (lesson) return { ...lesson, module: mod };
  }
  return null;
}

export function getAllLessons() {
  const all = [];
  for (const mod of modules) {
    for (const lesson of mod.lessons) {
      all.push({ ...lesson, module: mod });
    }
  }
  return all;
}

export function getNextLesson(currentId) {
  const all = getAllLessons();
  const idx = all.findIndex(l => l.id === currentId);
  if (idx >= 0 && idx < all.length - 1) {
    const next = all[idx + 1];
    // Stop at module boundaries
    if (next.module.id === all[idx].module.id) {
      return next;
    }
  }
  return null;
}

export function getPrevLesson(currentId) {
  const all = getAllLessons();
  const idx = all.findIndex(l => l.id === currentId);
  if (idx > 0) {
    const prev = all[idx - 1];
    // Stop at module boundaries
    if (prev.module.id === all[idx].module.id) {
      return prev;
    }
  }
  return null;
}
