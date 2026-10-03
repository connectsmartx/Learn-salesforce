const e={"3.1":{theory:`
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p><strong>Apex</strong> is Salesforce's proprietary, strongly-typed, object-oriented programming language. It runs on the Salesforce platform (server-side) and allows developers to add custom business logic to Salesforce operations — triggers, classes, web services, and more.</p>
      </div>
      <h3>Why Apex?</h3>
      <p>While Salesforce provides powerful no-code tools (Flows, Validation Rules, Formulas), some business requirements need code:</p>
      <ul>
        <li><strong>Complex business logic</strong> — When Flow decisions become too nested</li>
        <li><strong>External integrations</strong> — REST/SOAP API callouts to other systems</li>
        <li><strong>Bulk data processing</strong> — Millions of records via Batch Apex</li>
        <li><strong>Custom UI logic</strong> — Backend for Lightning Web Components</li>
        <li><strong>Trigger logic</strong> — Complex validation and automation on record events</li>
      </ul>
      <h3>Apex vs Java</h3>
      <p>Apex is syntactically similar to Java but designed specifically for the Salesforce platform:</p>
      <table>
        <thead><tr><th>Feature</th><th>Java</th><th>Apex</th></tr></thead>
        <tbody>
          <tr><td>Runs on</td><td>JVM</td><td>Salesforce servers (multi-tenant)</td></tr>
          <tr><td>Database</td><td>JDBC, Hibernate</td><td>Built-in SOQL/SOSL/DML</td></tr>
          <tr><td>Governor Limits</td><td>No</td><td>Yes — enforced per transaction</td></tr>
          <tr><td>Testing</td><td>Optional</td><td>75% coverage mandatory for deployment</td></tr>
          <tr><td>Compilation</td><td>Local</td><td>On Salesforce servers</td></tr>
        </tbody>
      </table>
      <div class="callout callout--tip">
        <p class="callout__title">💡 Key Point</p>
        <p>Apex is <strong>not</strong> a general-purpose language. It's designed exclusively for the Salesforce platform. You can't run Apex outside of Salesforce, and it has strict governor limits to ensure shared resources aren't monopolized.</p>
      </div>
    `,examples:[{title:"Example 1: Your First Apex Class",description:"A simple class with a method that returns a greeting.",code:`public class HelloWorld {
    
    // A simple method that returns a greeting
    public static String greet(String name) {
        return 'Hello, ' + name + '! Welcome to Apex.';
    }
    
    // Method that demonstrates variable types
    public static void showTypes() {
        String  companyName = 'Acme Corp';
        Integer employeeCount = 500;
        Decimal revenue = 1250000.50;
        Boolean isActive = true;
        Date    foundedDate = Date.newInstance(2020, 1, 15);
        
        System.debug('Company: ' + companyName);
        System.debug('Employees: ' + employeeCount);
        System.debug('Revenue: $' + revenue);
        System.debug('Active: ' + isActive);
        System.debug('Founded: ' + foundedDate);
    }
}`,language:"apex",explanation:"Apex classes look like Java classes. The System.debug() method is Apex's equivalent of console.log() — it outputs to the Debug Log."},{title:"Example 2: Executing Apex",description:"Running Apex in the Developer Console.",code:`// Execute this in Developer Console → Debug → Open Execute Anonymous Window

// Call the HelloWorld class
String message = HelloWorld.greet('Developer');
System.debug(message);
// Output: Hello, Developer! Welcome to Apex.

// Query Salesforce data with SOQL
List<Account> accounts = [SELECT Name, Industry FROM Account LIMIT 5];
for (Account a : accounts) {
    System.debug('Account: ' + a.Name + ' | Industry: ' + a.Industry);
}`,language:"apex",explanation:"Execute Anonymous is a quick way to test Apex code. It runs the code immediately and shows results in the Debug Log."},{title:"Example 3: Apex with Database Operations",description:"Create and query records using Apex.",code:`// Create a new Account
Account newAccount = new Account();
newAccount.Name = 'CloudTech Solutions';
newAccount.Industry = 'Technology';
newAccount.AnnualRevenue = 5000000;
insert newAccount;  // DML operation

System.debug('Created Account with Id: ' + newAccount.Id);

// Query it back
Account queriedAccount = [
    SELECT Name, Industry, AnnualRevenue 
    FROM Account 
    WHERE Id = :newAccount.Id
];
System.debug('Queried: ' + queriedAccount.Name);`,language:"apex",explanation:"Apex has built-in database operations. SOQL queries are embedded directly in the code, and DML statements (insert, update, delete) manipulate records."}],practice:{intro:"Write and execute your first Apex code in the Developer Console.",steps:["Log in to your Developer Edition org.",'Click the gear icon → "Developer Console".',"Go to File → New → Apex Class.",'Name it "HelloWorld" and paste the Example 1 code.',"Click Save (Ctrl+S).","Go to Debug → Open Execute Anonymous Window (Ctrl+E).","Type: System.debug(HelloWorld.greet('YourName'));",'Click "Execute".','Open the Debug Log (at the bottom). Click "Debug Only" to filter. Find your output.',"Try Example 3: create an Account using Execute Anonymous and verify it appears in the UI."],expectedOutcome:'You should see "Hello, YourName! Welcome to Apex." in the Debug Log and a new Account record created in your org.'},interviewQuestions:[{scenario:"A business analyst asks whether a requirement should be built with Flows or Apex. How do you decide?",answer:`Use Flows when: the logic is straightforward (field updates, record creation, simple decisions), admins need to maintain it, no external API calls needed. Use Apex when: complex logic with many conditions, need for HTTP callouts, bulk data processing (millions of records via Batch), performance-critical operations, unit testing is important, or when the logic is too complex for Flow's visual interface. I always recommend the "clicks over code" principle — use code only when declarative tools are insufficient.`},{scenario:"What are Governor Limits and why do they exist?",answer:"Governor Limits are runtime limits enforced by Salesforce to prevent any single tenant from monopolizing shared resources in the multi-tenant architecture. Key limits include: 100 SOQL queries per sync transaction, 150 DML statements, 50,000 rows retrieved, 6MB heap size (sync), 10-second CPU time. They exist because all Salesforce orgs share the same infrastructure — without limits, one org's heavy processing could degrade performance for everyone."},{scenario:"Can you run Apex code locally on your machine?",answer:"No. Apex can only be compiled and executed on Salesforce servers. You write code in an IDE (VS Code with Salesforce Extensions), save it to the org, and it compiles server-side. For testing, you use the Developer Console's Execute Anonymous window or run Apex test classes. This is different from Java where you compile and run locally."},{scenario:"What happens if you exceed a Governor Limit in production?",answer:"The transaction is immediately terminated with a LimitException. All DML operations in the transaction are rolled back — no partial commits. The user sees an error message. In triggers, this means the record save fails. In Batch Apex, only the current batch chunk fails (other chunks continue). To prevent this, write bulkified code, use Limits class methods (Limits.getQueries(), Limits.getLimitQueries()) to monitor usage, and test with large data volumes."},{scenario:"How is Apex testing different from testing in other languages?",answer:"Key differences: 1) 75% code coverage is MANDATORY for deployment to production — not optional. 2) Test data is isolated by default (@isTest annotation) — tests can't see org data unless SeeAllData=true is set. 3) Test methods don't count against governor limits separately (they have their own set via Test.startTest/stopTest). 4) System.assert/assertEquals/assertNotEquals are the built-in assertion methods. 5) Tests must use @TestSetup for shared test data creation."}]},"3.2":{theory:`
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p>Apex <strong>data types</strong> define what kind of value a variable can hold. Apex has <strong>primitive types</strong> (Integer, String, Boolean, etc.), <strong>sObject types</strong> (Account, Contact, etc.), and <strong>complex types</strong> (Collections: List, Set, Map).</p>
      </div>
      <h3>Primitive Data Types</h3>
      <table>
        <thead><tr><th>Type</th><th>Description</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td>Integer</td><td>32-bit whole number</td><td>Integer count = 42;</td></tr>
          <tr><td>Long</td><td>64-bit whole number</td><td>Long bigNum = 2147483648L;</td></tr>
          <tr><td>Decimal</td><td>Arbitrary precision number</td><td>Decimal price = 99.99;</td></tr>
          <tr><td>Double</td><td>64-bit floating point</td><td>Double rate = 3.14159;</td></tr>
          <tr><td>String</td><td>Text (single quotes)</td><td>String name = 'Salesforce';</td></tr>
          <tr><td>Boolean</td><td>true or false</td><td>Boolean active = true;</td></tr>
          <tr><td>Date</td><td>Date without time</td><td>Date d = Date.today();</td></tr>
          <tr><td>Datetime</td><td>Date with time</td><td>Datetime dt = Datetime.now();</td></tr>
          <tr><td>Time</td><td>Time without date</td><td>Time t = Time.newInstance(14, 30, 0, 0);</td></tr>
          <tr><td>Id</td><td>18-char Salesforce record ID</td><td>Id accId = '001xx000003DGbY';</td></tr>
          <tr><td>Blob</td><td>Binary data</td><td>Blob b = Blob.valueOf('text');</td></tr>
        </tbody>
      </table>
      <h3>sObject Types</h3>
      <p>Every Salesforce object (Account, Contact, MyCustom__c) is an sObject type in Apex. You can use the generic <code>sObject</code> type or the specific object type.</p>
      <div class="callout callout--tip">
        <p class="callout__title">💡 Key Difference from Java</p>
        <p>Apex uses <strong>single quotes</strong> for Strings (not double quotes). Also, Apex Strings are <strong>immutable</strong> — methods like toUpperCase() return a new string.</p>
      </div>
    `,examples:[{title:"Example 1: Primitive Types",description:"Declaring and using different data types.",code:`// Primitive types
String companyName = 'Acme Corp';
Integer employees = 150;
Decimal revenue = 2500000.75;
Boolean isEnterprise = true;
Date startDate = Date.newInstance(2024, 1, 15);
Datetime lastLogin = Datetime.now();

// Null handling
String middleName = null;
if (String.isBlank(middleName)) {
    System.debug('Middle name is blank or null');
}

// Type casting
Integer x = 10;
Decimal d = (Decimal) x;  // 10.0
String numStr = String.valueOf(x);  // '10'
Integer parsed = Integer.valueOf('42');  // 42`,language:"apex",explanation:"Apex is strongly typed — every variable must have a declared type. Null is a valid value for all non-primitive types."},{title:"Example 2: sObject Types",description:"Working with Salesforce records as sObjects.",code:`// Specific sObject type
Account acc = new Account();
acc.Name = 'CloudTech';
acc.Industry = 'Technology';
acc.AnnualRevenue = 5000000;

// Generic sObject type
sObject genericObj = new Account(Name = 'Generic Corp');
// Access fields via get/put
String name = (String) genericObj.get('Name');
genericObj.put('Industry', 'Finance');

// sObject from SOQL query
Contact c = [SELECT FirstName, LastName, Email, Account.Name
             FROM Contact LIMIT 1];
System.debug(c.FirstName + ' ' + c.LastName);
System.debug('Account: ' + c.Account.Name);  // Parent access`,language:"apex",explanation:"sObjects represent Salesforce records in Apex. You can use specific types (Account, Contact) for compile-time checking, or generic sObject for flexibility."},{title:"Example 3: String Methods",description:"Common string operations in Apex.",code:`String email = 'User@Example.COM';

// Common methods
System.debug(email.toLowerCase());        // user@example.com
System.debug(email.toUpperCase());         // USER@EXAMPLE.COM
System.debug(email.contains('@'));         // true
System.debug(email.substringBefore('@'));  // User
System.debug(email.substringAfter('@'));   // Example.COM
System.debug(email.length());             // 16
System.debug(email.trim());               // removes whitespace

// String comparison (case-insensitive)
String a = 'Hello';
String b = 'hello';
System.debug(a == b);              // true (Apex == is case-insensitive!)
System.debug(a.equals(b));         // false (case-sensitive)
System.debug(a.equalsIgnoreCase(b)); // true`,language:"apex",explanation:"Important Apex quirk: the == operator for Strings is CASE-INSENSITIVE. Use .equals() for case-sensitive comparison."}],practice:{intro:"Explore Apex data types in the Developer Console.",steps:["Open Developer Console → Debug → Execute Anonymous.","Declare variables of each primitive type and output them with System.debug().","Create an Account sObject, set its fields, and insert it.","Query the Account back and print its fields.","Test String methods: try toLowerCase(), contains(), split().","Experiment with type casting: convert Integer to String and back.","Test null handling: What happens when you call .length() on a null String?","Compare two strings with == vs .equals() to see the case-sensitivity difference."],expectedOutcome:"You should understand all Apex primitive types, how to create/query sObjects, and the quirks of String comparison in Apex."},interviewQuestions:[{scenario:"What is the difference between Integer and Long in Apex?",answer:"Integer is a 32-bit signed type (range: -2,147,483,648 to 2,147,483,647). Long is a 64-bit signed type (much larger range). Use Integer for most cases. Use Long only when values might exceed Integer limits, such as very large record counts or byte sizes. Long literals require an L suffix (e.g., 2147483648L)."},{scenario:`A developer writes: if (name == "John"). What's wrong?`,answer:`Two issues: 1) Apex uses single quotes for strings, not double quotes. It should be 'John'. 2) Even with correct quotes, == in Apex is case-insensitive for Strings. So "John" == "john" is true. If case-sensitive comparison is needed, use name.equals('John'). The code should be: if (name == 'John') or if (name.equals('John')) depending on the requirement.`},{scenario:"What happens if you try to access a field on a null sObject?",answer:"You get a NullPointerException. For example: Account a = null; String name = a.Name; throws a NullPointerException. Always check for null before accessing fields: if (a != null) { String name = a.Name; }. This is common when SOQL queries return no results and you assign to a single sObject variable."},{scenario:"How do you handle date arithmetic in Apex?",answer:"Apex Date class has built-in methods: Date.today().addDays(30), Date.today().addMonths(1), Date.today().addYears(-1). To find days between dates: Integer daysBetween = startDate.daysBetween(endDate). To check if a date is a weekday: use Math.mod(Date.today().toStartOfWeek().daysBetween(Date.today()), 7) to get the day of week."},{scenario:"What is the difference between Decimal and Double?",answer:"Decimal has arbitrary precision — it stores exact values, making it ideal for financial/monetary calculations (no floating-point rounding errors). Double is a 64-bit IEEE 754 floating-point type — faster but can have rounding issues (e.g., 0.1 + 0.2 != 0.3). Salesforce Currency fields map to Decimal in Apex. Always use Decimal for money-related calculations."}]},"3.3":{theory:`
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p><strong>Operators</strong> in Apex are symbols that perform operations on variables and values. <strong>Expressions</strong> are combinations of variables, operators, and method calls that evaluate to a single value.</p>
      </div>
      <h3>Arithmetic Operators</h3>
      <table>
        <thead><tr><th>Operator</th><th>Name</th><th>Example</th><th>Result</th></tr></thead>
        <tbody>
          <tr><td>+</td><td>Addition</td><td>5 + 3</td><td>8</td></tr>
          <tr><td>-</td><td>Subtraction</td><td>10 - 4</td><td>6</td></tr>
          <tr><td>*</td><td>Multiplication</td><td>6 * 7</td><td>42</td></tr>
          <tr><td>/</td><td>Division</td><td>15 / 4</td><td>3 (integer division)</td></tr>
          <tr><td>Math.mod()</td><td>Modulus</td><td>Math.mod(17, 5)</td><td>2</td></tr>
        </tbody>
      </table>
      <h3>Comparison Operators</h3>
      <table>
        <thead><tr><th>Operator</th><th>Meaning</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td>==</td><td>Equal to (case-insensitive for Strings)</td><td>'abc' == 'ABC' → true</td></tr>
          <tr><td>!=</td><td>Not equal to</td><td>5 != 3 → true</td></tr>
          <tr><td>&lt;</td><td>Less than</td><td>3 &lt; 5 → true</td></tr>
          <tr><td>&gt;</td><td>Greater than</td><td>10 &gt; 7 → true</td></tr>
          <tr><td>&lt;=</td><td>Less than or equal</td><td>5 &lt;= 5 → true</td></tr>
          <tr><td>&gt;=</td><td>Greater than or equal</td><td>8 &gt;= 10 → false</td></tr>
        </tbody>
      </table>
      <h3>Logical Operators</h3>
      <table>
        <thead><tr><th>Operator</th><th>Meaning</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td>&&</td><td>Logical AND</td><td>true && false → false</td></tr>
          <tr><td>||</td><td>Logical OR</td><td>true || false → true</td></tr>
          <tr><td>!</td><td>Logical NOT</td><td>!true → false</td></tr>
        </tbody>
      </table>
      <h3>Assignment Operators</h3>
      <p>Apex supports compound assignment: <code>+=</code>, <code>-=</code>, <code>*=</code>, <code>/=</code>, <code>&amp;=</code>, <code>|=</code>.</p>
      <div class="callout callout--tip">
        <p class="callout__title">💡 Key Gotcha</p>
        <p>Apex does NOT have the <code>%</code> modulus operator. Use <code>Math.mod(dividend, divisor)</code> instead. Also, <code>++</code> and <code>--</code> increment/decrement operators work the same as in Java.</p>
      </div>
      <h3>The Ternary Operator</h3>
      <p>Shorthand for if-else: <code>condition ? valueIfTrue : valueIfFalse</code></p>
      <h3>Safe Navigation Operator (?.) </h3>
      <p>Introduced in Winter '21, the <code>?.</code> operator prevents NullPointerException by short-circuiting if the left side is null:</p>
      <pre><code>Account acc = null;
String name = acc?.Name;  // Returns null instead of throwing NullPointerException</code></pre>
      <h3>instanceof Operator</h3>
      <p>Checks whether an object is an instance of a particular class: <code>if (myObj instanceof Account) { ... }</code></p>
    `,examples:[{title:"Example 1: Arithmetic & Comparison",description:"Working with numbers and comparisons.",code:`// Arithmetic
Integer a = 25;
Integer b = 7;
System.debug('Add: ' + (a + b));       // 32
System.debug('Sub: ' + (a - b));       // 18
System.debug('Mul: ' + (a * b));       // 175
System.debug('Div: ' + (a / b));       // 3 (integer division!)
System.debug('Mod: ' + Math.mod(a, b)); // 4

// Decimal division
Decimal preciseResult = (Decimal)a / b;
System.debug('Decimal Div: ' + preciseResult); // 3.571428...

// Comparison
System.debug(a > b);   // true
System.debug(a == b);  // false
System.debug(a != b);  // true

// String comparison quirk
String x = 'Hello';
String y = 'hello';
System.debug(x == y);         // true (case-insensitive!)
System.debug(x.equals(y));    // false (case-sensitive)`,language:"apex",explanation:"Integer division truncates. Cast to Decimal for precise results. Remember: == is case-insensitive for Strings in Apex."},{title:"Example 2: Logical Operators",description:"Combining conditions with AND, OR, NOT.",code:`Account acc = [SELECT Name, AnnualRevenue, Industry 
    FROM Account LIMIT 1];

Boolean isHighValue = acc.AnnualRevenue != null && acc.AnnualRevenue > 1000000;
Boolean isTech = acc.Industry == 'Technology';
Boolean isTarget = isHighValue && isTech;

System.debug('High Value: ' + isHighValue);
System.debug('Tech Company: ' + isTech);
System.debug('Target Account: ' + isTarget);

// Short-circuit evaluation
// && stops evaluating if first operand is false
// || stops evaluating if first operand is true
String name = null;
Boolean isValid = name != null && name.length() > 0; // Safe! Won't call .length() on null`,language:"apex",explanation:"Apex uses short-circuit evaluation: && stops if the first is false, || stops if the first is true. This is crucial for null-safe checks."},{title:"Example 3: Ternary & Safe Navigation",description:"Concise conditional expressions.",code:`// Ternary operator
Integer score = 85;
String grade = score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : 'F';
System.debug('Grade: ' + grade); // B

// Safe Navigation Operator (?.)
Account acc = [SELECT Name, Owner.Name FROM Account LIMIT 1];

// Without safe navigation (risky if ParentId is null)
// String parentName = acc.Parent.Name; // Could throw NullPointerException

// With safe navigation (safe)
String parentName = acc?.Parent?.Name; // Returns null if any part is null
System.debug('Parent: ' + parentName);

// Useful in conditional logic
Contact c = null;
String email = c?.Email ?? 'no-email@default.com'; // Combine with null coalescing`,language:"apex",explanation:"The safe navigation operator ?. is a game-changer for avoiding NullPointerExceptions when traversing relationship fields."}],practice:{intro:"Practice operators in the Developer Console Execute Anonymous window.",steps:["Test all arithmetic operators with Integer values.","Try dividing 10 / 3 as Integer vs Decimal. Observe the difference.","Use Math.mod() to check if a number is even or odd.",'Write a compound condition using && and || to check if an Account is "high priority".',"Test the ternary operator to assign letter grades based on a score variable.","Create a null variable and use the safe navigation operator (?.) to access a property.","Compare using == vs .equals() on two different strings."],expectedOutcome:"You should understand integer vs decimal division, short-circuit evaluation, and the safe navigation operator."},interviewQuestions:[{scenario:"Why doesn't Apex have a % modulus operator?",answer:"Apex replaced the % operator with Math.mod(). This is a design decision by Salesforce. To get the remainder, use Math.mod(dividend, divisor). For example: Math.mod(17, 5) returns 2. This is commonly asked because Java uses %, and Apex developers coming from Java often try % and get a compilation error."},{scenario:"What is the Safe Navigation Operator and when would you use it?",answer:"The Safe Navigation Operator (?.) was introduced in Winter '21. It short-circuits an expression to null if the left side is null, preventing NullPointerException. Use it when: traversing relationship fields (acc?.Parent?.Name), accessing fields on potentially null query results, or working with wrapper classes that might have null nested objects. It replaces verbose null checks like: if (acc != null && acc.Parent != null) { name = acc.Parent.Name; }"},{scenario:"Explain short-circuit evaluation in Apex. Why does it matter?",answer:"In short-circuit evaluation, && stops evaluating if the first operand is false (because false AND anything = false), and || stops if the first is true (because true OR anything = true). This matters for null safety: if (str != null && str.length() > 0) is safe because if str is null, .length() is never called. Without short-circuit, it would throw a NullPointerException."},{scenario:"How does the == operator behave differently for Strings vs other types?",answer:"For Strings, == is CASE-INSENSITIVE. 'Hello' == 'hello' returns true. For case-sensitive comparison, use .equals(). For other types (Integer, Boolean, sObject), == compares values normally. For sObject comparison, == compares all field values, while === (identity) checks if two variables reference the exact same object in memory."},{scenario:"What is the difference between = and == in Apex?",answer:"= is the assignment operator — it assigns a value to a variable (Integer x = 5). == is the equality comparison operator — it compares two values and returns a Boolean (x == 5 returns true). A common bug is writing if (x = 5) instead of if (x == 5). In Apex, this causes a compilation error because the condition must be Boolean, unlike C/C++ where it would silently compile."}]},"3.4":{theory:`
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p><strong>Control flow</strong> statements determine the order in which code executes. Apex provides <strong>conditional statements</strong> (if/else, switch) to make decisions and <strong>loop statements</strong> (for, while, do-while) to repeat actions.</p>
      </div>
      <h3>Conditional Statements</h3>
      <h4>if / else if / else</h4>
      <p>The most basic decision-making structure:</p>
      <pre><code>if (condition) {
    // executes if condition is true
} else if (anotherCondition) {
    // executes if anotherCondition is true
} else {
    // executes if none of the above are true
}</code></pre>
      <h4>switch on</h4>
      <p>Apex's switch statement (similar to Java's enhanced switch). Supports Integer, Long, String, sObject, and Enum types:</p>
      <pre><code>switch on expression {
    when value1 { /* code */ }
    when value2, value3 { /* multiple values */ }
    when null { /* null handling */ }
    when else { /* default */ }
}</code></pre>
      <div class="callout callout--tip">
        <p class="callout__title">💡 Key Difference from Java</p>
        <p>Apex's <code>switch on</code> does NOT fall through. There's no need for <code>break</code> statements — each <code>when</code> block is independent.</p>
      </div>
      <h3>Loop Statements</h3>
      <h4>Traditional for Loop</h4>
      <pre><code>for (Integer i = 0; i &lt; 10; i++) {
    System.debug(i);
}</code></pre>
      <h4>for-each Loop (Collection Iteration)</h4>
      <pre><code>for (Account acc : accountList) {
    System.debug(acc.Name);
}</code></pre>
      <h4>SOQL for Loop (Memory-Efficient)</h4>
      <pre><code>for (Account acc : [SELECT Name FROM Account]) {
    System.debug(acc.Name);
}</code></pre>
      <h4>while Loop</h4>
      <pre><code>Integer count = 0;
while (count &lt; 5) {
    System.debug(count);
    count++;
}</code></pre>
      <h4>do-while Loop</h4>
      <pre><code>Integer x = 0;
do {
    System.debug(x);
    x++;
} while (x &lt; 5);</code></pre>
      <div class="callout callout--warning">
        <p class="callout__title">⚠️ Governor Limit Alert</p>
        <p>Never put SOQL queries or DML statements inside loops! This is the #1 cause of governor limit violations. Query outside the loop, store results in a collection, then iterate.</p>
      </div>
    `,examples:[{title:"Example 1: if/else with Account Categorization",description:"Categorize accounts based on revenue.",code:`// Categorize accounts by revenue
List<Account> accounts = [SELECT Name, AnnualRevenue FROM Account WHERE AnnualRevenue != null LIMIT 10];

for (Account acc : accounts) {
    String category;
    
    if (acc.AnnualRevenue >= 10000000) {
        category = 'Enterprise';
    } else if (acc.AnnualRevenue >= 1000000) {
        category = 'Mid-Market';
    } else if (acc.AnnualRevenue >= 100000) {
        category = 'Small Business';
    } else {
        category = 'Startup';
    }
    
    System.debug(acc.Name + ' → ' + category + ' ($' + acc.AnnualRevenue + ')');
}`,language:"apex",explanation:"if/else chains evaluate top-to-bottom. The first true condition executes; the rest are skipped."},{title:"Example 2: switch on Statement",description:"Using switch for cleaner multi-value branching.",code:`// Determine lead action based on status
String leadStatus = 'Working - Contacted';

switch on leadStatus {
    when 'Open - Not Contacted' {
        System.debug('Action: Send welcome email');
    }
    when 'Working - Contacted' {
        System.debug('Action: Schedule follow-up call');
    }
    when 'Closed - Converted' {
        System.debug('Action: Create opportunity');
    }
    when 'Closed - Not Converted' {
        System.debug('Action: Add to nurture campaign');
    }
    when null {
        System.debug('Action: Status is missing — update required');
    }
    when else {
        System.debug('Action: Unknown status — ' + leadStatus);
    }
}

// switch on with sObject type matching
sObject record = [SELECT Id, Name FROM Account LIMIT 1];
switch on record {
    when Account acc {
        System.debug('Account: ' + acc.Name);
    }
    when Contact con {
        System.debug('Contact: ' + con.LastName);
    }
    when null {
        System.debug('Record is null');
    }
    when else {
        System.debug('Unknown type');
    }
}`,language:"apex",explanation:"switch on is cleaner than long if/else chains. It handles null explicitly and supports sObject type matching — very useful in polymorphic triggers."},{title:"Example 3: Loops — The Right Way",description:"Proper loop patterns that avoid governor limits.",code:`// ❌ BAD: SOQL inside a loop (will hit 100 SOQL limit)
// for (Account acc : accounts) {
//     List<Contact> contacts = [SELECT Name FROM Contact WHERE AccountId = :acc.Id];
// }

// ✅ GOOD: Collect IDs, query once, use Map
List<Account> accounts = [SELECT Id, Name FROM Account LIMIT 50];

// Collect all Account IDs
Set<Id> accountIds = new Set<Id>();
for (Account acc : accounts) {
    accountIds.add(acc.Id);
}

// Single query for all contacts
Map<Id, List<Contact>> contactsByAccount = new Map<Id, List<Contact>>();
for (Contact c : [SELECT Id, Name, AccountId FROM Contact WHERE AccountId IN :accountIds]) {
    if (!contactsByAccount.containsKey(c.AccountId)) {
        contactsByAccount.put(c.AccountId, new List<Contact>());
    }
    contactsByAccount.get(c.AccountId).add(c);
}

// Now iterate with O(1) lookups
for (Account acc : accounts) {
    List<Contact> relatedContacts = contactsByAccount.get(acc.Id);
    Integer count = relatedContacts != null ? relatedContacts.size() : 0;
    System.debug(acc.Name + ' has ' + count + ' contacts');
}

// SOQL for loop — memory efficient for large datasets
Integer totalAccounts = 0;
for (Account a : [SELECT Name FROM Account]) {
    totalAccounts++;
    // Processes 200 records at a time internally
}
System.debug('Total accounts: ' + totalAccounts);`,language:"apex",explanation:'The #1 best practice in Apex: NEVER put SOQL/DML inside loops. Collect IDs in a Set, query once, store in a Map, then loop with O(1) lookups. This is called "bulkification."'}],practice:{intro:"Practice control flow in the Developer Console.",steps:['Write an if/else chain that categorizes a number as "negative", "zero", "small" (1-100), or "large" (>100).',"Use switch on to handle different Lead Status values and output appropriate actions.","Write a for loop that prints numbers 1 to 20, but only the even ones (use Math.mod).","Use a for-each loop to iterate over a List of Strings and concatenate them.","Write a while loop that doubles a number until it exceeds 1000. Count the iterations.","Write a SOQL for loop that counts all Contacts in the org memory-efficiently.","Try the BAD pattern (SOQL in loop) on a small dataset to see it work, then imagine it with 200 records."],expectedOutcome:"You should be comfortable with all Apex control flow structures and understand why SOQL/DML must never go inside loops."},interviewQuestions:[{scenario:"Why should you never put SOQL inside a for loop?",answer:"Salesforce enforces a limit of 100 SOQL queries per synchronous transaction. If you put a query inside a loop that iterates 200 times, you hit the limit and the transaction fails. Instead, collect IDs in a Set, perform ONE query with WHERE Id IN :idSet, store results in a Map, then iterate with O(1) Map lookups. This pattern is fundamental to writing bulkified Apex."},{scenario:"What is the difference between a SOQL for loop and a regular for-each loop?",answer:"A regular for-each loop loads ALL query results into a List in memory at once — this can hit the heap size limit with large datasets. A SOQL for loop (for (Account a : [SELECT ...])) processes records in batches of 200 internally, so only 200 records are in memory at a time. Use SOQL for loops when processing large numbers of records to avoid heap size limits."},{scenario:"How does switch on differ from if/else in Apex?",answer:"switch on: No fall-through (no break needed), supports null handling with when null, supports sObject type matching (when Account acc { }), cleaner for multiple value matching (when 'A', 'B' { }), evaluates the expression once. if/else: More flexible conditions (ranges, method calls), can combine different comparison types, evaluates each condition sequentially. Use switch for discrete value matching; use if/else for range checks and complex conditions."},{scenario:"Describe a scenario where you would use do-while instead of while.",answer:"Use do-while when you need to execute the loop body at least once regardless of the condition. Example: prompting for user input validation, retrying an API callout at least once before checking for success, or processing paginated API responses where you need to make at least one call to know if there are more pages. In practice, do-while is rare in Apex — while and for-each are much more common."},{scenario:"How do you handle breaking out of nested loops in Apex?",answer:"Apex supports break (exit current loop) and continue (skip to next iteration). For nested loops, you can use a Boolean flag: Boolean found = false; for (...) { for (...) { if (condition) { found = true; break; } } if (found) break; }. Alternatively, refactor the nested loop into a separate method and use return to exit. Apex does not support labeled break statements."}]},"3.5":{theory:`
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p><strong>Collections</strong> in Apex are data structures that hold groups of elements. The three collection types are <strong>List</strong> (ordered, allows duplicates), <strong>Set</strong> (unordered, no duplicates), and <strong>Map</strong> (key-value pairs, no duplicate keys).</p>
      </div>
      <h3>When to Use Each</h3>
      <table>
        <thead><tr><th>Collection</th><th>Use When</th><th>Performance</th></tr></thead>
        <tbody>
          <tr><td><strong>List</strong></td><td>Order matters, duplicates OK, need index access</td><td>O(1) access by index</td></tr>
          <tr><td><strong>Set</strong></td><td>Need uniqueness, checking membership</td><td>O(1) contains check</td></tr>
          <tr><td><strong>Map</strong></td><td>Need key-based lookup, avoiding queries in loops</td><td>O(1) get by key</td></tr>
        </tbody>
      </table>
      <div class="callout callout--tip">
        <p class="callout__title">💡 Critical for Bulkification</p>
        <p>Collections are essential for writing bulkified Apex. The pattern: collect IDs in a Set, query once with WHERE Id IN :idSet, store results in a Map for O(1) lookup.</p>
      </div>
    `,examples:[{title:"Example 1: List Operations",description:"Creating and manipulating Lists.",code:`// Create a List
List<String> fruits = new List<String>{'Apple', 'Banana', 'Cherry'};

// Add elements
fruits.add('Date');                    // Add to end
fruits.add(1, 'Avocado');            // Insert at index 1

// Access elements
String first = fruits[0];             // 'Apple'
String second = fruits.get(1);        // 'Avocado'
Integer size = fruits.size();          // 5

// Iterate
for (String fruit : fruits) {
    System.debug(fruit);
}

// Sort (in-place, alphabetical)
fruits.sort();
// ['Apple', 'Avocado', 'Banana', 'Cherry', 'Date']

// Remove
fruits.remove(0);                      // Remove by index
Boolean removed = fruits.remove('Banana'); // Remove by value

// SOQL returns Lists
List<Account> accounts = [SELECT Name FROM Account LIMIT 10];`,language:"apex",explanation:"Lists are the most common collection. SOQL queries always return Lists. Lists maintain insertion order and allow duplicates."},{title:"Example 2: Set for Deduplication",description:"Using Sets to collect unique IDs.",code:`// Collect unique Account IDs from Contacts
Set<Id> accountIds = new Set<Id>();

List<Contact> contacts = [SELECT AccountId FROM Contact WHERE AccountId != null];
for (Contact c : contacts) {
    accountIds.add(c.AccountId);  // Duplicates auto-removed
}

System.debug('Unique Accounts: ' + accountIds.size());

// Check membership (O(1) — very fast)
Id testId = '001000000000001';
if (accountIds.contains(testId)) {
    System.debug('Found!');
}

// Set operations
Set<String> setA = new Set<String>{'A', 'B', 'C'};
Set<String> setB = new Set<String>{'B', 'C', 'D'};
setA.retainAll(setB);  // Intersection: {'B', 'C'}
// setA.addAll(setB);   // Union: {'A', 'B', 'C', 'D'}
// setA.removeAll(setB); // Difference: {'A'}`,language:"apex",explanation:"Sets are perfect for collecting unique IDs before querying. The contains() method is O(1), making it ideal for checking membership in triggers."},{title:"Example 3: Map for Bulkification",description:"The essential Map pattern for avoiding SOQL in loops.",code:`// ❌ BAD: SOQL inside loop (SOQL 101 error with 200+ records)
for (Contact c : Trigger.new) {
    Account a = [SELECT Name FROM Account WHERE Id = :c.AccountId];
    // This runs 1 query per Contact! 200 contacts = 200 queries = LIMIT EXCEEDED
}

// ✅ GOOD: Collect IDs → Query once → Map lookup
Set<Id> accountIds = new Set<Id>();
for (Contact c : Trigger.new) {
    accountIds.add(c.AccountId);
}

// Single query — returns Map<Id, Account>
Map<Id, Account> accountMap = new Map<Id, Account>(
    [SELECT Id, Name FROM Account WHERE Id IN :accountIds]
);

// O(1) lookup in the loop — no additional queries!
for (Contact c : Trigger.new) {
    Account acc = accountMap.get(c.AccountId);
    if (acc != null) {
        System.debug('Contact ' + c.LastName + ' → Account: ' + acc.Name);
    }
}`,language:"apex",explanation:"This is THE most important Apex pattern. Collect IDs → Query once → Map lookup. It prevents SOQL-in-loop governor limit violations and is essential for all trigger code."}],practice:{intro:"Master Apex collections through hands-on exercises.",steps:["Open Execute Anonymous and create a List<String> with 5 names. Sort it, iterate it, and print each.","Create a Set<Integer> with duplicate values: new Set<Integer>{1, 2, 2, 3, 3, 3}. Check its size (should be 3).","Query Contacts and collect unique AccountIds in a Set. Print the count.","Create a Map<String, Integer> to store word counts: {'hello' => 3, 'world' => 2}.","Practice the bulkification pattern: collect Contact AccountIds in a Set, query Accounts into a Map, iterate and access.","Try Map initialization from SOQL: Map<Id, Account> m = new Map<Id, Account>([SELECT Id, Name FROM Account]);","Use map.keySet() to get all keys, map.values() to get all values.","Test: What happens if you call map.get() with a key that doesn't exist? (Returns null)"],expectedOutcome:"You should be comfortable with List, Set, and Map operations and understand the critical bulkification pattern for trigger development."},interviewQuestions:[{scenario:"Your trigger processes 200 Contacts and needs to check each Contact's Account Industry. How would you write this efficiently?",answer:"Collect all AccountIds from Trigger.new into a Set<Id>. Query Accounts once: Map<Id, Account> accountMap = new Map<Id, Account>([SELECT Id, Industry FROM Account WHERE Id IN :accountIds]). In the loop, use accountMap.get(contact.AccountId).Industry for O(1) lookups. This uses exactly 1 SOQL query regardless of whether there are 1 or 200 Contacts — fully bulkified."},{scenario:"What is the difference between Map.get() returning null and a key not existing?",answer:"Map.get() returns null in two cases: 1) The key doesn't exist in the map, or 2) The key exists but its value is null. Use Map.containsKey(key) to distinguish between these cases. In Apex, Map.get(nonexistentKey) returns null without throwing an exception — different from some languages that throw KeyError."},{scenario:"Can you use a custom Apex class as a Map key?",answer:"Yes, but the class must implement equals() and hashCode() methods. Without these, the Map uses object identity (memory address) for comparison, which means two objects with the same field values would be treated as different keys. Standard types (String, Integer, Id, sObject) already have proper equals/hashCode implementations."},{scenario:"How do you convert a List to a Set in Apex?",answer:"Pass the List to the Set constructor: Set<String> mySet = new Set<String>(myList). This removes duplicates. To convert back: List<String> myList = new List<String>(mySet). This is useful when you receive a List (e.g., from SOQL) but need unique values for a filter."},{scenario:"What is the maximum size of a collection in Apex?",answer:"There is no hard limit on collection size itself, but collections consume heap memory (6MB sync, 12MB async limit). A Map of 50,000 records with several fields could approach the heap limit. For very large datasets, use SOQL for loops: for (Account a : [SELECT Id FROM Account]) {...} which processes in batches of 200 and doesn't load all records into memory at once."}]},"3.6":{theory:`
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p><strong>SOQL</strong> (Salesforce Object Query Language) is the query language used to read data from the Salesforce database. It is similar to SQL but designed specifically for Salesforce's metadata-driven architecture.</p>
      </div>
      <h3>SOQL vs SQL</h3>
      <table>
        <thead><tr><th>Feature</th><th>SQL</th><th>SOQL</th></tr></thead>
        <tbody>
          <tr><td>SELECT *</td><td>✅ Allowed</td><td>❌ Must list fields</td></tr>
          <tr><td>JOIN</td><td>✅ Explicit JOINs</td><td>❌ Relationship queries (dot notation)</td></tr>
          <tr><td>INSERT/UPDATE</td><td>SQL statements</td><td>DML statements (separate)</td></tr>
          <tr><td>Subqueries</td><td>✅ Full support</td><td>✅ Parent and child queries</td></tr>
          <tr><td>Aggregate</td><td>✅ Full support</td><td>✅ COUNT, SUM, AVG, MIN, MAX</td></tr>
        </tbody>
      </table>
    `,examples:[{title:"Example 1: Basic SOQL Queries",description:"Common query patterns.",code:`// Basic SELECT
List<Account> accs = [SELECT Name, Industry FROM Account];

// Filtering with WHERE
List<Account> techAccs = [
    SELECT Name, AnnualRevenue
    FROM Account
    WHERE Industry = 'Technology'
    AND AnnualRevenue > 1000000
];

// Sorting and limiting
List<Opportunity> topOpps = [
    SELECT Name, Amount, StageName
    FROM Opportunity
    WHERE Amount != null
    ORDER BY Amount DESC
    LIMIT 10
];

// Using variables (bind expressions)
String searchIndustry = 'Finance';
Integer minRevenue = 500000;
List<Account> results = [
    SELECT Name 
    FROM Account 
    WHERE Industry = :searchIndustry
    AND AnnualRevenue > :minRevenue
];`,language:"apex",explanation:"SOQL queries are embedded directly in Apex code using square brackets. The colon (:) prefix binds Apex variables into the query."},{title:"Example 2: Relationship Queries",description:"Querying across object relationships.",code:`// Parent-to-child (sub-query)
List<Account> accsWithContacts = [
    SELECT Name,
           (SELECT FirstName, LastName, Email FROM Contacts)
    FROM Account
    LIMIT 5
];
for (Account a : accsWithContacts) {
    System.debug('Account: ' + a.Name);
    for (Contact c : a.Contacts) {
        System.debug('  Contact: ' + c.FirstName + ' ' + c.LastName);
    }
}

// Child-to-parent (dot notation)
List<Contact> contactsWithAccounts = [
    SELECT FirstName, LastName,
           Account.Name, Account.Industry
    FROM Contact
    WHERE Account.Industry = 'Technology'
];`,language:"apex",explanation:"Parent-to-child uses sub-queries with the child relationship name (Contacts, not Contact). Child-to-parent uses dot notation (Account.Name)."},{title:"Example 3: Aggregate Queries",description:"Summarizing data with aggregate functions.",code:`// COUNT
Integer totalAccounts = [SELECT COUNT() FROM Account];

// GROUP BY with aggregate
List<AggregateResult> results = [
    SELECT Industry, COUNT(Id) cnt, SUM(AnnualRevenue) totalRev
    FROM Account
    WHERE Industry != null
    GROUP BY Industry
    HAVING COUNT(Id) > 2
    ORDER BY COUNT(Id) DESC
];

for (AggregateResult ar : results) {
    String industry = (String) ar.get('Industry');
    Integer count = (Integer) ar.get('cnt');
    Decimal revenue = (Decimal) ar.get('totalRev');
    System.debug(industry + ': ' + count + ' accounts, $' + revenue);
}`,language:"apex",explanation:"Aggregate queries return AggregateResult objects. Use aliases (cnt, totalRev) to reference the aggregated values via .get()."}],practice:{intro:"Practice SOQL queries in the Developer Console's Query Editor.",steps:["In Developer Console, go to the Query Editor tab (bottom panel).","Run: SELECT Name, Industry FROM Account LIMIT 10","Try a WHERE clause: SELECT Name FROM Account WHERE Industry = 'Technology'","Practice a parent-to-child query: SELECT Name, (SELECT LastName FROM Contacts) FROM Account LIMIT 5","Try child-to-parent: SELECT FirstName, Account.Name FROM Contact LIMIT 5","Run an aggregate: SELECT Industry, COUNT(Id) FROM Account GROUP BY Industry","In Execute Anonymous, write the same queries in Apex and iterate the results.","Test bind variables: define a String variable and use it with :variable in the query."],expectedOutcome:"You should be able to write basic and relationship SOQL queries, use aggregate functions, and embed queries in Apex code."},interviewQuestions:[{scenario:"Why doesn't SOQL support SELECT *?",answer:"SOQL requires explicit field names for performance reasons. In a multi-tenant environment, SELECT * could return hundreds of fields, consuming unnecessary memory and bandwidth. By requiring explicit fields, Salesforce ensures queries are efficient and predictable. Additionally, explicit fields make code more maintainable — you know exactly what data is being retrieved."},{scenario:"What is the difference between SOQL and SOSL?",answer:"SOQL (Salesforce Object Query Language) queries one object at a time (with relationships). It's used for retrieving specific records by criteria. SOSL (Salesforce Object Search Language) searches across multiple objects simultaneously using full-text search. SOQL is like SQL; SOSL is like Elasticsearch. Use SOQL for precise data retrieval, SOSL for searching text across objects."},{scenario:"How do you avoid the SOQL 101 error?",answer:"The SOQL 101 error means you exceeded the 100-query limit in a synchronous transaction. Prevention: 1) NEVER put SOQL inside a loop. 2) Collect IDs first, then query once with WHERE Id IN :ids. 3) Use relationship queries to get related data in one query. 4) Use SOQL for loops for large datasets. 5) Use aggregate queries instead of querying individual records for counts/sums."},{scenario:"Can you use LIKE in SOQL? How?",answer:`Yes. SOQL supports LIKE with wildcards: % matches any number of characters, _ matches exactly one character. Example: SELECT Name FROM Account WHERE Name LIKE 'Acme%' returns accounts starting with "Acme". Example: SELECT Name FROM Account WHERE Name LIKE '_est' matches "Test", "Best", etc. Note: LIKE is case-insensitive for standard fields but case-sensitive for some custom fields.`},{scenario:"What are date literals in SOQL and give examples?",answer:"Date literals are predefined date ranges: TODAY, YESTERDAY, THIS_WEEK, LAST_WEEK, THIS_MONTH, LAST_MONTH, THIS_QUARTER, THIS_YEAR, LAST_N_DAYS:n, NEXT_N_DAYS:n. Example: SELECT Name FROM Opportunity WHERE CloseDate = THIS_QUARTER. Example: SELECT Name FROM Case WHERE CreatedDate > LAST_N_DAYS:30. They simplify date filtering without calculating exact dates in code."}]},"3.7":{theory:`
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p><strong>Advanced SOQL</strong> covers aggregate queries (COUNT, SUM, AVG, MIN, MAX), sub-queries (inner and semi-join), dynamic SOQL, and SOQL security best practices — essential tools for complex data retrieval.</p>
      </div>
      <h3>Aggregate Functions</h3>
      <table>
        <thead><tr><th>Function</th><th>Purpose</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td>COUNT()</td><td>Count records</td><td>SELECT COUNT() FROM Contact</td></tr>
          <tr><td>COUNT(field)</td><td>Count non-null values</td><td>SELECT COUNT(Email) FROM Contact</td></tr>
          <tr><td>SUM(field)</td><td>Total a numeric field</td><td>SELECT SUM(Amount) FROM Opportunity</td></tr>
          <tr><td>AVG(field)</td><td>Average a numeric field</td><td>SELECT AVG(AnnualRevenue) FROM Account</td></tr>
          <tr><td>MIN(field)</td><td>Minimum value</td><td>SELECT MIN(CloseDate) FROM Opportunity</td></tr>
          <tr><td>MAX(field)</td><td>Maximum value</td><td>SELECT MAX(Amount) FROM Opportunity</td></tr>
        </tbody>
      </table>
      <h3>GROUP BY &amp; HAVING</h3>
      <p>Group results and filter groups:</p>
      <pre><code>SELECT Industry, COUNT(Id) cnt
FROM Account
GROUP BY Industry
HAVING COUNT(Id) > 5</code></pre>
      <h3>Sub-queries</h3>
      <p><strong>Inner sub-query (parent-to-child):</strong> retrieves child records within the parent query using the relationship name.</p>
      <p><strong>Semi-join / Anti-join:</strong> filter records based on related records using WHERE Id IN (SELECT ...).</p>
      <h3>Dynamic SOQL</h3>
      <p>Build queries at runtime using <code>Database.query(queryString)</code>. Use bind variables to prevent SOQL injection.</p>
      <div class="callout callout--warning">
        <p class="callout__title">⚠️ Security Warning</p>
        <p>Never concatenate user input directly into dynamic SOQL strings. Use bind variables (<code>:variable</code>) or <code>String.escapeSingleQuotes()</code> to prevent SOQL injection attacks.</p>
      </div>
    `,examples:[{title:"Example 1: Aggregate Queries",description:"Summarize data with COUNT, SUM, AVG.",code:`// Count all accounts by industry
List<AggregateResult> results = [
    SELECT Industry, COUNT(Id) total, SUM(AnnualRevenue) revenue
    FROM Account
    WHERE Industry != null
    GROUP BY Industry
    ORDER BY COUNT(Id) DESC
];

for (AggregateResult ar : results) {
    String industry = (String) ar.get('Industry');
    Integer total = (Integer) ar.get('total');
    Decimal revenue = (Decimal) ar.get('revenue');
    System.debug(industry + ': ' + total + ' accounts, $' + revenue + ' revenue');
}

// HAVING clause — only industries with 3+ accounts
List<AggregateResult> filtered = [
    SELECT Industry, COUNT(Id) cnt
    FROM Account
    GROUP BY Industry
    HAVING COUNT(Id) >= 3
];`,language:"apex",explanation:"AggregateResult values are accessed via get() with an alias. Cast to the appropriate type. HAVING filters groups after aggregation (like WHERE but for groups)."},{title:"Example 2: Sub-queries",description:"Parent-to-child and semi-join queries.",code:`// Inner sub-query: Get Accounts with their Contacts
List<Account> accounts = [
    SELECT Name, 
           (SELECT FirstName, LastName, Email FROM Contacts ORDER BY LastName)
    FROM Account
    LIMIT 10
];

for (Account acc : accounts) {
    System.debug('Account: ' + acc.Name);
    for (Contact c : acc.Contacts) {
        System.debug('  Contact: ' + c.FirstName + ' ' + c.LastName);
    }
}

// Semi-join: Accounts that HAVE at least one Opportunity
List<Account> withOpps = [
    SELECT Name FROM Account
    WHERE Id IN (SELECT AccountId FROM Opportunity)
];
System.debug('Accounts with opportunities: ' + withOpps.size());

// Anti-join: Accounts with NO Contacts
List<Account> noContacts = [
    SELECT Name FROM Account
    WHERE Id NOT IN (SELECT AccountId FROM Contact WHERE AccountId != null)
];
System.debug('Accounts without contacts: ' + noContacts.size());`,language:"apex",explanation:'Inner sub-queries use the child relationship name (Contacts, not Contact). Semi-joins filter by existence in related records — great for finding "accounts with/without" patterns.'},{title:"Example 3: Dynamic SOQL",description:"Build queries at runtime safely.",code:`// Dynamic SOQL with bind variables (SAFE)
String industry = 'Technology';
Decimal minRevenue = 1000000;
String query = 'SELECT Name, Industry, AnnualRevenue FROM Account';
query += ' WHERE Industry = :industry';
query += ' AND AnnualRevenue > :minRevenue';
query += ' ORDER BY AnnualRevenue DESC LIMIT 10';

List<Account> results = Database.query(query);
for (Account acc : results) {
    System.debug(acc.Name + ': $' + acc.AnnualRevenue);
}

// Dynamic field selection
List<String> fields = new List<String>{'Name', 'Industry', 'Phone'};
String fieldList = String.join(fields, ', ');
String dynamicQuery = 'SELECT ' + fieldList + ' FROM Account LIMIT 5';
List<Account> dynamic = Database.query(dynamicQuery);

// ❌ NEVER do this (SOQL Injection vulnerable):
// String userInput = 'Name FROM Account; DELETE Account';
// Database.query('SELECT ' + userInput);

// ✅ Always use String.escapeSingleQuotes() for user-provided values:
String searchTerm = String.escapeSingleQuotes(userInput);`,language:"apex",explanation:"Dynamic SOQL with bind variables (:variable) is safe from injection. Only use Database.query() when the query structure itself needs to change at runtime."}],practice:{intro:"Master advanced SOQL techniques in the Developer Console.",steps:["Write an aggregate query to count Opportunities by StageName.","Use SUM to total Opportunity Amounts grouped by Account.","Write a parent-to-child sub-query to get Accounts with their Cases.","Use a semi-join to find Contacts whose Accounts have Opportunities.","Build a dynamic SOQL query that accepts a search term and field name.","Test HAVING by finding Industries with more than 2 Accounts.","Use GROUP BY ROLLUP for subtotals (if on API version 55+)."],expectedOutcome:"You should be able to write aggregate queries, sub-queries, and safe dynamic SOQL for complex data retrieval needs."},interviewQuestions:[{scenario:"What is the difference between COUNT() and COUNT(fieldName)?",answer:"COUNT() counts all rows regardless of field values and returns an Integer directly. COUNT(fieldName) counts only non-null values of that specific field and returns via AggregateResult. For example: Integer total = [SELECT COUNT() FROM Contact]; vs List<AggregateResult> result = [SELECT COUNT(Email) FROM Contact]; — the second tells you how many contacts have email addresses."},{scenario:"How do you prevent SOQL injection in dynamic queries?",answer:"Two approaches: 1) Use bind variables (:variableName) — they are automatically escaped by the platform. This is the preferred method. 2) Use String.escapeSingleQuotes() to sanitize user-provided strings before concatenating into queries. Never concatenate raw user input into a SOQL string. Also consider using WITH SECURITY_ENFORCED to enforce field-level security."},{scenario:"Explain the difference between a semi-join and an anti-join in SOQL.",answer:"Semi-join (WHERE Id IN (SELECT ...)): Returns records that HAVE matching records in the subquery. Example: Accounts that have at least one Opportunity. Anti-join (WHERE Id NOT IN (SELECT ...)): Returns records that DO NOT have matching records. Example: Accounts without any Contacts. Both avoid the need for left joins, which SOQL does not support."},{scenario:"What are the limitations of aggregate queries in Apex?",answer:"Limitations: 1) Maximum 50,000 rows returned even with aggregation. 2) Cannot use aggregate functions in WHERE — use HAVING instead. 3) GROUP BY ROLLUP and CUBE have limited support. 4) COUNT() returns Integer directly; other aggregates return AggregateResult which requires casting. 5) You cannot use TEXT AREA LONG fields in GROUP BY. 6) Aggregate queries count toward the 100 SOQL query limit."},{scenario:"When would you use Database.query() vs inline SOQL?",answer:"Use inline SOQL (SELECT ... FROM ...) when the query is known at compile time — it provides compile-time field validation and better performance. Use Database.query() when: query structure changes at runtime (different fields, objects, or conditions based on user input or configuration), building search functionality, creating generic/reusable query methods, or when the object type is determined dynamically."}]},"3.8":{theory:`
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p><strong>SOSL (Salesforce Object Search Language)</strong> performs full-text searches across multiple objects simultaneously. Unlike SOQL which queries specific fields in one object, SOSL searches across all text-based fields using an inverted index for fast results.</p>
      </div>
      <h3>SOSL vs SOQL</h3>
      <table>
        <thead><tr><th>Feature</th><th>SOQL</th><th>SOSL</th></tr></thead>
        <tbody>
          <tr><td>Purpose</td><td>Query specific fields from one object</td><td>Full-text search across multiple objects</td></tr>
          <tr><td>Returns</td><td>List&lt;sObject&gt;</td><td>List&lt;List&lt;sObject&gt;&gt;</td></tr>
          <tr><td>Search type</td><td>Exact field matching</td><td>Full-text index search</td></tr>
          <tr><td>Objects</td><td>One object (+ relationships)</td><td>Multiple objects simultaneously</td></tr>
          <tr><td>Row limit</td><td>50,000</td><td>2,000 per object</td></tr>
          <tr><td>Trigger support</td><td>Yes</td><td>No (not in triggers/tests without Test.setFixedSearchResults)</td></tr>
        </tbody>
      </table>
      <h3>SOSL Syntax</h3>
      <pre><code>FIND {searchTerm}
IN ALL FIELDS          // or NAME FIELDS, EMAIL FIELDS, PHONE FIELDS
RETURNING Object1(field1, field2 WHERE condition),
          Object2(field1)</code></pre>
      <div class="callout callout--tip">
        <p class="callout__title">💡 When to Use SOSL</p>
        <p>Use SOSL when you don't know which object contains the data, when searching across multiple objects, or when you need fuzzy text matching. Use SOQL when you know the exact object and need precise field queries.</p>
      </div>
    `,examples:[{title:"Example 1: Basic SOSL Search",description:"Search across Accounts, Contacts, and Leads.",code:`// Search for "Cloud" across multiple objects
List<List<sObject>> results = [
    FIND 'Cloud*'
    IN ALL FIELDS
    RETURNING 
        Account(Name, Industry WHERE Industry = 'Technology'),
        Contact(FirstName, LastName, Email),
        Lead(Name, Company, Status)
];

// Results come back as a List of Lists
List<Account> accounts = (List<Account>) results[0];
List<Contact> contacts = (List<Contact>) results[1];
List<Lead> leads = (List<Lead>) results[2];

System.debug('Found ' + accounts.size() + ' accounts');
System.debug('Found ' + contacts.size() + ' contacts');
System.debug('Found ' + leads.size() + ' leads');

for (Account a : accounts) {
    System.debug('Account: ' + a.Name + ' (' + a.Industry + ')');
}`,language:"apex",explanation:"SOSL returns List<List<sObject>> — one list per RETURNING object, in order. Use * for wildcard and cast each result list to its specific type."},{title:"Example 2: SOSL with Wildcards & Operators",description:"Advanced search patterns.",code:`// Wildcard search: * matches zero or more characters
List<List<sObject>> r1 = [FIND 'Acm*' IN NAME FIELDS RETURNING Account(Name)];

// Exact phrase search (use double quotes inside curly braces)
List<List<sObject>> r2 = [FIND '"Cloud Solutions"' IN ALL FIELDS RETURNING Account(Name)];

// Logical operators: AND, OR, AND NOT
List<List<sObject>> r3 = [FIND 'Cloud AND Technology' IN ALL FIELDS RETURNING Account(Name)];
List<List<sObject>> r4 = [FIND 'Cloud OR Solutions' IN ALL FIELDS RETURNING Account(Name)];

// Search in specific field types
List<List<sObject>> emailSearch = [
    FIND 'john*'
    IN EMAIL FIELDS
    RETURNING Contact(Name, Email)
];

// Limit results
List<List<sObject>> limited = [
    FIND 'Test'
    IN ALL FIELDS
    RETURNING Account(Name LIMIT 5), Contact(Name LIMIT 10)
];`,language:"apex",explanation:"SOSL supports wildcards (*,?), exact phrases, Boolean operators, and field-type-specific searches. Use IN NAME FIELDS for faster searches on name fields only."},{title:"Example 3: Dynamic SOSL & Test Support",description:"Building SOSL at runtime and using in tests.",code:`// Dynamic SOSL with Search.query()
String searchTerm = 'Cloud';
String searchQuery = 'FIND \\'' + String.escapeSingleQuotes(searchTerm) + '*\\' ' +
    'IN ALL FIELDS RETURNING Account(Name, Industry), Contact(Name, Email)';

List<List<sObject>> dynamicResults = Search.query(searchQuery);

// In test classes, SOSL returns empty by default
// You must use Test.setFixedSearchResults() to mock results
@isTest
static void testSOSLSearch() {
    // Create test data
    Account testAcc = new Account(Name = 'CloudTech Corp');
    insert testAcc;
    
    // Tell the test framework what IDs SOSL should return
    Test.setFixedSearchResults(new List<Id>{testAcc.Id});
    
    Test.startTest();
    List<List<sObject>> results = [
        FIND 'Cloud' IN ALL FIELDS
        RETURNING Account(Name)
    ];
    Test.stopTest();
    
    System.assertEquals(1, results[0].size());
}`,language:"apex",explanation:"Dynamic SOSL uses Search.query(). In test classes, SOSL always returns empty unless you use Test.setFixedSearchResults() to mock the results."}],practice:{intro:"Practice SOSL in the Developer Console.",steps:["Run a basic SOSL query: FIND 'test' IN ALL FIELDS RETURNING Account(Name), Contact(Name)","Try different search scopes: ALL FIELDS, NAME FIELDS, EMAIL FIELDS.","Use wildcards: search for 'Acm*' to find partial matches.","Add WHERE clauses to RETURNING to filter results.","Use LIMIT to control the number of results per object.","Try Boolean operators: FIND 'Cloud AND NOT Amazon'.","Build a dynamic SOSL query using Search.query()."],expectedOutcome:"You should know when to use SOSL vs SOQL, how to search across multiple objects, and how to test SOSL in test classes."},interviewQuestions:[{scenario:"When would you choose SOSL over SOQL?",answer:"Choose SOSL when: 1) You need to search across multiple objects simultaneously. 2) You don't know which object contains the data. 3) You need fuzzy/full-text matching (not exact field values). 4) You're building a global search feature. Choose SOQL when: you know the exact object and fields, need precise filtering, need more than 2000 results, or are in a trigger context."},{scenario:"Why can't you use SOSL in triggers?",answer:"SOSL relies on Salesforce's full-text search index, which may not be updated immediately when records are modified. In a trigger, the index might not reflect the just-inserted/updated records, leading to inconsistent results. Additionally, search indexes are eventually consistent, not transactionally consistent like the database. SOQL queries the database directly and sees all changes in the current transaction."},{scenario:"How do you test SOSL queries in Apex test classes?",answer:"SOSL returns empty results by default in tests. Use Test.setFixedSearchResults(List<Id>) to specify which record IDs SOSL should return. Create test records, insert them, then call Test.setFixedSearchResults() with their IDs before running the SOSL query. This ensures deterministic test results regardless of the org's search index state."},{scenario:"What is the governor limit for SOSL queries?",answer:"The limit is 20 SOSL queries per Apex transaction (sync or async). Each SOSL query can return up to 2,000 records per object (unlike SOQL's 50,000). The search term must be at least 2 characters. You can search up to 20 objects in a single SOSL RETURNING clause."},{scenario:"How does SOSL handle special characters in search terms?",answer:'Special characters like & | ! ( ) { } [ ] ^ " ~ * ? : \\ must be escaped with a backslash in the search term. When building dynamic SOSL, use String.escapeSingleQuotes() for the outer quotes and be aware that the FIND clause uses different escaping rules than SOQL WHERE. For user-provided search terms, sanitize input to remove or escape special characters.'}]},"3.9":{theory:`
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p><strong>DML (Data Manipulation Language)</strong> operations in Apex allow you to insert, update, upsert, delete, undelete, and merge records in the Salesforce database. DML is how Apex code writes data.</p>
      </div>
      <h3>DML Statements</h3>
      <table>
        <thead><tr><th>Statement</th><th>Purpose</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td>insert</td><td>Create new records</td><td>insert newAccount;</td></tr>
          <tr><td>update</td><td>Modify existing records</td><td>update existingAccount;</td></tr>
          <tr><td>upsert</td><td>Insert or update based on external ID</td><td>upsert accounts ExternalId__c;</td></tr>
          <tr><td>delete</td><td>Move records to Recycle Bin</td><td>delete oldAccount;</td></tr>
          <tr><td>undelete</td><td>Restore from Recycle Bin</td><td>undelete deletedAccount;</td></tr>
          <tr><td>merge</td><td>Merge up to 3 records into one</td><td>merge masterAcc duplicateAcc;</td></tr>
        </tbody>
      </table>
      <h3>DML Statement vs Database Methods</h3>
      <table>
        <thead><tr><th>Feature</th><th>DML Statement</th><th>Database Method</th></tr></thead>
        <tbody>
          <tr><td>Syntax</td><td>insert accounts;</td><td>Database.insert(accounts, false);</td></tr>
          <tr><td>On error</td><td>Throws exception, rolls back ALL</td><td>Can allow partial success</td></tr>
          <tr><td>Result</td><td>No return value</td><td>Returns SaveResult[]</td></tr>
          <tr><td>Use when</td><td>All-or-nothing required</td><td>Need partial processing</td></tr>
        </tbody>
      </table>
      <div class="callout callout--tip">
        <p class="callout__title">💡 Governor Limit</p>
        <p>Maximum <strong>150 DML statements</strong> per transaction. Each insert/update/delete counts as ONE statement, regardless of how many records are in the list. Always batch DML on collections, not individual records!</p>
      </div>
    `,examples:[{title:"Example 1: Insert, Update, Delete",description:"Basic DML operations on records.",code:`// INSERT — Create a new Account and its Contacts
Account acc = new Account(Name = 'TechStart Inc', Industry = 'Technology');
insert acc;
System.debug('Created Account: ' + acc.Id); // Id is auto-populated after insert

// Insert related Contacts (use the Account Id)
List<Contact> contacts = new List<Contact>{
    new Contact(FirstName = 'Jane', LastName = 'Smith', AccountId = acc.Id),
    new Contact(FirstName = 'Bob', LastName = 'Jones', AccountId = acc.Id)
};
insert contacts; // ONE DML for both records

// UPDATE — Modify existing records
acc.AnnualRevenue = 5000000;
acc.Description = 'Updated via Apex';
update acc;

// Bulk update
List<Account> toUpdate = [SELECT Id, Description FROM Account WHERE Description = null LIMIT 50];
for (Account a : toUpdate) {
    a.Description = 'Bulk updated';
}
update toUpdate; // ONE DML statement for all 50 records

// DELETE — Move to Recycle Bin
delete contacts; // Both contacts deleted in one statement

// UNDELETE — Restore from Recycle Bin
undelete contacts;`,language:"apex",explanation:"Always perform DML on lists/collections, not individual records in a loop. After insert, the Id field is auto-populated on the sObject."},{title:"Example 2: Upsert & Merge",description:"Smart insert/update and duplicate merging.",code:`// UPSERT — Insert if new, update if exists
// Matches on Id by default, or specify an External ID field

// By Id (updates if Id exists, inserts if not)
Account acc = new Account(Name = 'Test Account');
upsert acc; // Inserts (no Id yet)
acc.Industry = 'Technology';
upsert acc; // Updates (has Id now)

// By External ID field
// Assume Account has a custom External_Id__c field
Account extAcc = new Account(
    Name = 'External Account',
    External_Id__c = 'EXT-001'
);
upsert extAcc External_Id__c; 
// First run: inserts. Second run: updates (matches on External_Id__c)

// MERGE — Combine duplicate records
Account master = [SELECT Id, Name FROM Account WHERE Name = 'Master Corp' LIMIT 1];
Account duplicate = [SELECT Id FROM Account WHERE Name = 'Master Corporation' LIMIT 1];

merge master duplicate;
// duplicate is deleted, its child records are reparented to master
System.debug('Merged into: ' + master.Id);`,language:"apex",explanation:"Upsert is essential for data integration — it intelligently decides whether to insert or update. Merge combines duplicates and automatically reparents child records."},{title:"Example 3: Database Methods (Partial Success)",description:"Handling errors gracefully with Database methods.",code:`// Database.insert with allOrNone = false (allow partial success)
List<Account> accounts = new List<Account>{
    new Account(Name = 'Valid Account 1'),
    new Account(Name = 'Valid Account 2'),
    new Account() // Missing required Name field — will fail
};

Database.SaveResult[] results = Database.insert(accounts, false);

Integer successCount = 0;
Integer failCount = 0;

for (Integer i = 0; i < results.size(); i++) {
    if (results[i].isSuccess()) {
        successCount++;
        System.debug('Success: ' + accounts[i].Name + ' — Id: ' + results[i].getId());
    } else {
        failCount++;
        for (Database.Error err : results[i].getErrors()) {
            System.debug('Error on record ' + i + ': ' + err.getStatusCode() + ' — ' + err.getMessage());
        }
    }
}

System.debug('Succeeded: ' + successCount + ', Failed: ' + failCount);
// Output: Succeeded: 2, Failed: 1
// The two valid accounts are saved even though the third failed`,language:"apex",explanation:"Database methods with allOrNone=false allow partial success. Check each SaveResult to handle individual errors. This is critical for data loading and integration scenarios."}],practice:{intro:"Practice DML operations in the Developer Console.",steps:["Create 5 Account records using a List and a single insert statement.","Update all 5 records to add a Description field.","Create Contact records linked to your Accounts using the Account Ids.","Use upsert on an Account — run it twice to see insert then update behavior.","Delete a Contact, then undelete it. Verify it reappears.","Use Database.insert with allOrNone=false. Include one invalid record and verify partial success.","Try merge on two test Accounts and see child records reparented."],expectedOutcome:"You should understand all 6 DML operations, the difference between DML statements and Database methods, and when to use partial processing."},interviewQuestions:[{scenario:"What is the difference between insert and Database.insert()?",answer:"insert throws a DmlException on any error and rolls back ALL records — all-or-nothing. Database.insert(records, false) allows partial success — valid records are saved, failed ones are skipped. Database.insert() returns SaveResult[] so you can check which records succeeded or failed and handle errors programmatically. Use insert when all records must succeed together; use Database.insert when partial processing is acceptable."},{scenario:"Explain upsert and when you would use it.",answer:"Upsert inserts if the record is new (no matching Id or External ID) or updates if it exists. By default, it matches on Id. You can specify a custom External ID field: upsert records ExternalId__c. It's essential for data integration: when receiving data from external systems, you may not know if the record already exists. Upsert handles both cases in one operation. It returns UpsertResult[] with isCreated() to tell you which action was taken."},{scenario:"Why should you never perform DML inside a loop?",answer:"Each DML statement counts toward the 150 DML limit per transaction. If you insert one record per loop iteration, 151 iterations causes a LimitException. Instead, collect all records in a List and perform ONE DML outside the loop: List<Account> toInsert = new List<Account>(); for (...) { toInsert.add(new Account(...)); } insert toInsert; This uses 1 DML statement regardless of list size."},{scenario:"What happens after you insert a record in Apex?",answer:"After a successful insert, Salesforce automatically populates the Id field on the sObject variable. You can immediately reference record.Id without re-querying. This also applies to system fields like CreatedDate and LastModifiedDate (though you'd need to query to access them). If insert fails, a DmlException is thrown and no Id is assigned."},{scenario:"How does merge work and what are its limitations?",answer:"Merge combines up to 3 duplicate records into a master record. The non-master records are deleted, and their child records (lookups) are automatically reparented to the master. Limitations: Only works with Accounts, Contacts, Leads, and Cases. Maximum 3 records per merge. The master record retains its field values unless you explicitly set them from the duplicate before merging. Merge fires delete triggers on the duplicated records."}]},"3.10":{theory:`
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p>An <strong>Apex Class</strong> is a blueprint that defines the structure and behavior of objects. Classes contain <strong>methods</strong> (functions), <strong>variables</strong> (properties), and <strong>constructors</strong>. They are the fundamental building blocks of Apex programming.</p>
      </div>
      <h3>Anatomy of a Class</h3>
      <pre><code>public class ClassName {
    // Variables (properties)
    public String name;
    private Integer count;
    
    // Constructor
    public ClassName(String name) {
        this.name = name;
        this.count = 0;
    }
    
    // Instance method
    public void doSomething() { ... }
    
    // Static method
    public static Integer calculate(Integer a, Integer b) { ... }
}</code></pre>
      <h3>Static vs Instance</h3>
      <table>
        <thead><tr><th>Feature</th><th>Static</th><th>Instance</th></tr></thead>
        <tbody>
          <tr><td>Keyword</td><td>static</td><td>(none)</td></tr>
          <tr><td>Called via</td><td>ClassName.method()</td><td>instance.method()</td></tr>
          <tr><td>Access to</td><td>Only static members</td><td>Both static and instance</td></tr>
          <tr><td>Memory</td><td>Shared across all instances</td><td>Per object instance</td></tr>
          <tr><td>Use for</td><td>Utility methods, constants</td><td>Object-specific behavior</td></tr>
        </tbody>
      </table>
      <h3>Constructors</h3>
      <p>Special methods called when creating an instance with <code>new</code>. Can be overloaded (multiple constructors with different parameters).</p>
      <div class="callout callout--tip">
        <p class="callout__title">💡 Key Pattern: Service Layer</p>
        <p>In real Salesforce projects, classes are organized into layers: <strong>Trigger Handler</strong> → <strong>Service Class</strong> → <strong>Selector/DAO Class</strong>. This separation makes code testable, reusable, and maintainable.</p>
      </div>
    `,examples:[{title:"Example 1: A Complete Apex Class",description:"Account service with static and instance methods.",code:`public class AccountService {
    
    // Static constant
    public static final String DEFAULT_INDUSTRY = 'Other';
    
    // Instance variables
    private List<Account> accounts;
    private Integer processedCount;
    
    // Constructor
    public AccountService() {
        this.accounts = new List<Account>();
        this.processedCount = 0;
    }
    
    // Overloaded constructor
    public AccountService(List<Account> accounts) {
        this.accounts = accounts;
        this.processedCount = 0;
    }
    
    // Instance method — categorize accounts
    public Map<String, List<Account>> categorizeByIndustry() {
        Map<String, List<Account>> result = new Map<String, List<Account>>();
        
        for (Account acc : this.accounts) {
            String industry = acc.Industry != null ? acc.Industry : DEFAULT_INDUSTRY;
            if (!result.containsKey(industry)) {
                result.put(industry, new List<Account>());
            }
            result.get(industry).add(acc);
        }
        
        this.processedCount = this.accounts.size();
        return result;
    }
    
    // Static utility method — can be called without instantiation
    public static Account createAccount(String name, String industry) {
        Account acc = new Account(Name = name, Industry = industry);
        insert acc;
        return acc;
    }
    
    // Getter
    public Integer getProcessedCount() {
        return this.processedCount;
    }
}`,language:"apex",explanation:"This class demonstrates static constants, constructors, instance methods, static methods, and encapsulation. Static methods are called via AccountService.createAccount(), instance methods via new AccountService().categorizeByIndustry()."},{title:"Example 2: Using the Class",description:"Calling static and instance methods.",code:`// Using static method (no instance needed)
Account newAcc = AccountService.createAccount('Demo Corp', 'Technology');
System.debug('Created: ' + newAcc.Id);

// Accessing static constant
System.debug('Default Industry: ' + AccountService.DEFAULT_INDUSTRY);

// Using instance methods
List<Account> allAccounts = [SELECT Name, Industry FROM Account LIMIT 50];

// Create instance with constructor
AccountService service = new AccountService(allAccounts);

// Call instance method
Map<String, List<Account>> categorized = service.categorizeByIndustry();

for (String industry : categorized.keySet()) {
    System.debug(industry + ': ' + categorized.get(industry).size() + ' accounts');
}

System.debug('Total processed: ' + service.getProcessedCount());`,language:"apex",explanation:"Static methods are called on the class itself. Instance methods require creating an object with new. This pattern separates concerns — static for utilities, instance for stateful operations."},{title:"Example 3: Inner Classes & Wrapper Pattern",description:"Classes within classes for structured data.",code:`public class OpportunityAnalyzer {
    
    // Inner class — "wrapper" to hold analyzed data
    public class OpportunityStats {
        public String stageName;
        public Integer count;
        public Decimal totalAmount;
        public Decimal avgAmount;
        
        public OpportunityStats(String stage) {
            this.stageName = stage;
            this.count = 0;
            this.totalAmount = 0;
            this.avgAmount = 0;
        }
        
        public void addOpportunity(Decimal amount) {
            this.count++;
            this.totalAmount += (amount != null ? amount : 0);
            this.avgAmount = this.totalAmount / this.count;
        }
    }
    
    // Main analysis method
    public static List<OpportunityStats> analyzeByStage() {
        Map<String, OpportunityStats> statsMap = new Map<String, OpportunityStats>();
        
        for (Opportunity opp : [SELECT StageName, Amount FROM Opportunity]) {
            if (!statsMap.containsKey(opp.StageName)) {
                statsMap.put(opp.StageName, new OpportunityStats(opp.StageName));
            }
            statsMap.get(opp.StageName).addOpportunity(opp.Amount);
        }
        
        return statsMap.values();
    }
}

// Usage:
List<OpportunityAnalyzer.OpportunityStats> stats = OpportunityAnalyzer.analyzeByStage();
for (OpportunityAnalyzer.OpportunityStats s : stats) {
    System.debug(s.stageName + ': ' + s.count + ' opps, avg $' + s.avgAmount);
}`,language:"apex",explanation:"Inner classes (wrapper classes) package related data together. They're widely used to send structured data to LWC components via @AuraEnabled methods. Access them with OuterClass.InnerClass syntax."}],practice:{intro:"Build your own Apex class in the Developer Console.",steps:['Create a class called "ContactService" with a constructor that takes a List<Contact>.',"Add a static method getContactsByAccount(Id accountId) that queries and returns contacts.","Add an instance method getEmailDomains() that returns a Set<String> of unique email domains.",'Create an inner wrapper class "ContactSummary" with fields: name, email, accountName.',"Add a method that returns List<ContactSummary> from the contacts.","Test the class in Execute Anonymous by calling both static and instance methods.","Verify the inner class works by iterating over ContactSummary results."],expectedOutcome:"You should be able to create well-structured Apex classes with constructors, static methods, instance methods, and inner classes."},interviewQuestions:[{scenario:"Explain the difference between static and instance methods.",answer:`Static methods belong to the class itself — called via ClassName.method(). They can only access other static members and don't have access to instance variables or "this". Instance methods belong to a specific object — called via instance.method(). They can access both instance and static members. Use static for utility/helper functions that don't need object state. Use instance when the method operates on object-specific data.`},{scenario:"What is a wrapper class and why would you use one?",answer:"A wrapper class (inner class) packages multiple pieces of related data into a single object. Common uses: 1) Returning structured data from @AuraEnabled methods to LWC — you can return complex data that doesn't map to a single sObject. 2) Adding computed/display fields to records (e.g., isSelected checkbox, formatted currency). 3) Creating DTOs (Data Transfer Objects) for API responses. They're essential for LWC development."},{scenario:"Can you have multiple constructors in one Apex class?",answer:"Yes, this is called constructor overloading. Each constructor must have a different parameter signature. Example: public MyClass() { } and public MyClass(String name) { } and public MyClass(String name, Integer count) { }. You can chain constructors using this(): public MyClass() { this('default', 0); }. This calls the constructor with matching parameters."},{scenario:'What is the "this" keyword in Apex?',answer:`"this" refers to the current instance of the class. It's used to: 1) Disambiguate between instance variables and method parameters with the same name: this.name = name. 2) Call another constructor in the same class: this(paramValue). 3) Pass the current instance as a parameter: someMethod(this). It cannot be used in static methods since they don't operate on instances.`},{scenario:"How do you organize classes in a real Salesforce project?",answer:"Best practice follows separation of concerns: 1) Trigger — minimal code, just calls handler. 2) TriggerHandler — orchestrates trigger logic. 3) Service classes — business logic (e.g., AccountService). 4) Selector/DAO classes — SOQL queries isolated for reuse. 5) Utility classes — static helper methods. 6) Wrapper/DTO classes — data structures for API/LWC. This makes code testable, maintainable, and follows SOLID principles."}]},"3.11":{theory:`
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p><strong>Access modifiers</strong> control the visibility of classes, methods, and variables. <strong>Properties</strong> in Apex are like variables with built-in getter/setter methods, providing controlled access to class data.</p>
      </div>
      <h3>Access Modifiers</h3>
      <table>
        <thead><tr><th>Modifier</th><th>Visibility</th><th>Use Case</th></tr></thead>
        <tbody>
          <tr><td><strong>private</strong></td><td>Same class only (default)</td><td>Internal implementation details</td></tr>
          <tr><td><strong>public</strong></td><td>Same namespace</td><td>Classes/methods used within your org</td></tr>
          <tr><td><strong>global</strong></td><td>Everywhere (including managed packages)</td><td>APIs, web services, managed package interfaces</td></tr>
          <tr><td><strong>protected</strong></td><td>Same class + subclasses</td><td>Methods intended for override in child classes</td></tr>
        </tbody>
      </table>
      <h3>Class Modifiers</h3>
      <table>
        <thead><tr><th>Modifier</th><th>Meaning</th></tr></thead>
        <tbody>
          <tr><td><strong>virtual</strong></td><td>Can be extended and methods can be overridden</td></tr>
          <tr><td><strong>abstract</strong></td><td>Must be extended; cannot be instantiated directly</td></tr>
          <tr><td><strong>with sharing</strong></td><td>Enforces the current user's sharing rules</td></tr>
          <tr><td><strong>without sharing</strong></td><td>Runs in system mode, ignoring sharing rules</td></tr>
          <tr><td><strong>inherited sharing</strong></td><td>Inherits sharing mode from the calling class</td></tr>
        </tbody>
      </table>
      <h3>Properties (Getters &amp; Setters)</h3>
      <pre><code>public class MyClass {
    // Auto-property (shorthand)
    public String Name { get; set; }
    
    // Read-only property
    public Integer Count { get; private set; }
    
    // Custom getter/setter
    public String FullName {
        get { return firstName + ' ' + lastName; }
        set { /* parse the value */ }
    }
}</code></pre>
      <div class="callout callout--warning">
        <p class="callout__title">⚠️ Sharing Rules Matter</p>
        <p>If a class does NOT specify a sharing keyword, it defaults to <strong>without sharing</strong>. This means the class can access ALL records regardless of the user's permissions — a potential security risk. Always explicitly declare sharing behavior.</p>
      </div>
    `,examples:[{title:"Example 1: Access Modifiers in Action",description:"Demonstrating visibility levels.",code:`public class AccountManager {
    // Private — only accessible within this class
    private static final Integer MAX_ACCOUNTS = 1000;
    
    // Public — accessible from any class in the namespace
    public String orgName;
    
    // Properties with controlled access
    public Integer ProcessedCount { get; private set; } // Read-only from outside
    public String Status { get; set; } // Read/write from anywhere
    
    // Private helper method
    private Boolean isValid(Account acc) {
        return acc.Name != null && acc.Name.length() > 0;
    }
    
    // Public method that uses private helper
    public List<Account> filterValid(List<Account> accounts) {
        List<Account> valid = new List<Account>();
        for (Account acc : accounts) {
            if (isValid(acc)) {
                valid.add(acc);
            }
        }
        this.ProcessedCount = valid.size();
        return valid;
    }
}

// Usage:
AccountManager mgr = new AccountManager();
mgr.orgName = 'My Org';             // ✅ Works (public)
mgr.Status = 'Active';              // ✅ Works (public set)
// mgr.ProcessedCount = 5;          // ❌ Error (private set)
Integer count = mgr.ProcessedCount; // ✅ Works (public get)`,language:"apex",explanation:"Properties with { get; private set; } are read-only from outside the class — only the class itself can modify the value. This is the most common access pattern."},{title:"Example 2: Sharing Keywords",description:"Controlling record-level security.",code:`// WITH SHARING — respects the running user's sharing rules
public with sharing class SecureAccountService {
    // This will only return Accounts the current user can see
    public List<Account> getMyAccounts() {
        return [SELECT Name FROM Account ORDER BY Name LIMIT 100];
    }
}

// WITHOUT SHARING — runs in system mode (sees all records)
public without sharing class AdminAccountService {
    // This returns ALL Accounts regardless of sharing rules
    public List<Account> getAllAccounts() {
        return [SELECT Name FROM Account ORDER BY Name LIMIT 100];
    }
}

// INHERITED SHARING — inherits from the calling context
public inherited sharing class FlexibleService {
    // If called from a "with sharing" class, respects sharing
    // If called from a "without sharing" class, ignores sharing
    public List<Account> getAccounts() {
        return [SELECT Name FROM Account ORDER BY Name LIMIT 100];
    }
}

// Example: Trigger handler should typically use without sharing
// (triggers run in system context), but service classes called 
// from LWC should use with sharing (to respect user permissions)`,language:"apex",explanation:"with sharing is the security best practice for most classes, especially those called from LWC. Use without sharing only when you intentionally need to bypass sharing rules (e.g., system operations, trigger handlers that need to update records the user can't see)."},{title:"Example 3: Virtual, Abstract & Interfaces",description:"Inheritance and polymorphism in Apex.",code:`// Abstract class — cannot be instantiated, provides base behavior
public abstract class NotificationService {
    protected String recipientEmail;
    
    // Abstract method — MUST be implemented by subclasses
    public abstract void send(String message);
    
    // Concrete method — inherited by subclasses
    public void setRecipient(String email) {
        this.recipientEmail = email;
    }
}

// Virtual class — CAN be extended, methods CAN be overridden
public virtual class EmailNotification extends NotificationService {
    public override void send(String message) {
        Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
        email.setToAddresses(new List<String>{this.recipientEmail});
        email.setSubject('Notification');
        email.setPlainTextBody(message);
        Messaging.sendEmail(new List<Messaging.Email>{email});
    }
    
    // Virtual method — CAN be overridden (but not required)
    public virtual String formatMessage(String msg) {
        return '[NOTIFICATION] ' + msg;
    }
}

// Interface — defines a contract
public interface Loggable {
    void log(String message);
    String getLogLevel();
}

// Implementing interface + extending class
public class UrgentEmailNotification extends EmailNotification implements Loggable {
    public override String formatMessage(String msg) {
        return '🚨 [URGENT] ' + msg;
    }
    
    public void log(String message) {
        System.debug('URGENT LOG: ' + message);
    }
    
    public String getLogLevel() {
        return 'URGENT';
    }
}`,language:"apex",explanation:"Abstract classes provide partial implementation; interfaces define pure contracts. Virtual allows extension. Override replaces parent behavior. This enables polymorphism — treating different subclasses uniformly through their parent type."}],practice:{intro:"Explore access modifiers and class design patterns.",steps:["Create a class with public, private, and protected variables. Test access from another class.","Add properties with different getter/setter access levels.",'Create a "with sharing" class and a "without sharing" class. Compare query results as different users.','Create an abstract base class "DataExporter" with an abstract method export().',"Create two concrete subclasses: CsvExporter and JsonExporter.",'Create an interface "Validatable" with a method validate(). Implement it in a class.',"Test polymorphism: create a List<DataExporter> and add both exporter types."],expectedOutcome:"You should understand access control in Apex, sharing keywords, and how to use inheritance and interfaces for clean code design."},interviewQuestions:[{scenario:'What is the difference between "with sharing" and "without sharing"?',answer:`"with sharing" enforces the current user's sharing rules — queries return only records the user has access to. "without sharing" runs in system mode — queries return all records regardless of the user's sharing settings. Best practice: use "with sharing" by default (especially in classes called from LWC/Aura). Use "without sharing" only when system-level access is intentionally needed (e.g., trigger handlers, batch jobs).`},{scenario:"When would you use global vs public?",answer:"global makes a class/method accessible from any namespace, including managed packages installed from AppExchange. public makes it accessible only within the same namespace. Use global for: web services (@RestResource, @HttpGet), methods exposed to managed packages, Schedulable/Batchable interfaces in packages. Use public for everything else. Avoid global unless necessary — once published in a managed package, global signatures cannot be changed."},{scenario:"Explain the difference between abstract and virtual classes.",answer:"Abstract: Cannot be instantiated directly. Can have abstract methods (no body, MUST be implemented by subclasses) and concrete methods. Used when you want to enforce a structure on subclasses. Virtual: CAN be instantiated. Methods marked virtual CAN be overridden by subclasses (but don't have to be). Used when you want to provide default behavior that subclasses can optionally customize."},{scenario:'What is "inherited sharing" and when would you use it?',answer:`"inherited sharing" makes the class inherit its sharing context from the class that calls it. If called from a "with sharing" class, it respects sharing. If called from a "without sharing" class, it ignores sharing. Use it for utility/service classes that should adapt to whatever context they're called from. It was introduced to solve the problem of utility classes that hardcode sharing behavior but are used in multiple contexts.`},{scenario:"How do properties differ from regular variables in Apex?",answer:"Properties have built-in getters and setters that control access: public String Name { get; set; }. This allows: read-only access (public get, private set), computed properties (custom getter that calculates a value), validation in setters, and triggering side effects on access. Regular variables (public String name;) have no access control — anyone can read and write. Properties are required for @AuraEnabled attributes exposed to LWC."}]},"3.12":{theory:`
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p><strong>Exception handling</strong> in Apex uses try/catch/finally blocks to gracefully manage runtime errors. Instead of crashing, your code can catch specific exceptions, log details, and take corrective action.</p>
      </div>
      <h3>Common Apex Exceptions</h3>
      <table>
        <thead><tr><th>Exception</th><th>When It Occurs</th></tr></thead>
        <tbody>
          <tr><td>DmlException</td><td>Failed insert/update/delete/upsert</td></tr>
          <tr><td>QueryException</td><td>SOQL returns no rows for single-record query</td></tr>
          <tr><td>NullPointerException</td><td>Accessing a method/property on a null reference</td></tr>
          <tr><td>ListException</td><td>Index out of bounds in a List</td></tr>
          <tr><td>MathException</td><td>Division by zero</td></tr>
          <tr><td>CalloutException</td><td>HTTP callout failure</td></tr>
          <tr><td>LimitException</td><td>Governor limit exceeded (CANNOT be caught)</td></tr>
          <tr><td>TypeException</td><td>Invalid type casting</td></tr>
        </tbody>
      </table>
      <h3>try / catch / finally</h3>
      <pre><code>try {
    // Code that might throw an exception
} catch (DmlException e) {
    // Handle DML-specific errors
} catch (Exception e) {
    // Handle all other exceptions
} finally {
    // Always executes (cleanup code)
}</code></pre>
      <div class="callout callout--warning">
        <p class="callout__title">⚠️ Critical: LimitException</p>
        <p><strong>LimitException cannot be caught!</strong> If you exceed governor limits, the transaction is immediately terminated and rolled back. No try/catch block can save you — you must write code that stays within limits.</p>
      </div>
      <h3>Custom Exceptions</h3>
      <p>Create domain-specific exceptions by extending the <code>Exception</code> class:</p>
      <pre><code>public class InsufficientFundsException extends Exception {}</code></pre>
    `,examples:[{title:"Example 1: Basic try/catch/finally",description:"Handling common exceptions.",code:`// DmlException handling
try {
    Account acc = new Account(); // Missing required Name field
    insert acc;
} catch (DmlException e) {
    System.debug('DML Error: ' + e.getMessage());
    System.debug('Number of errors: ' + e.getNumDml());
    for (Integer i = 0; i < e.getNumDml(); i++) {
        System.debug('Field: ' + e.getDmlFieldNames(i));
        System.debug('Message: ' + e.getDmlMessage(i));
        System.debug('Status: ' + e.getDmlStatusCode(i));
    }
}

// QueryException — single record query returns no results
try {
    Account acc = [SELECT Name FROM Account WHERE Name = 'NonExistent12345'];
    System.debug(acc.Name);
} catch (QueryException e) {
    System.debug('No record found: ' + e.getMessage());
}

// NullPointerException
try {
    String s = null;
    Integer len = s.length(); // Boom!
} catch (NullPointerException e) {
    System.debug('Null reference: ' + e.getMessage());
    System.debug('Line: ' + e.getLineNumber());
    System.debug('Stack: ' + e.getStackTraceString());
}

// finally block
Database.Savepoint sp = Database.setSavepoint();
try {
    insert new Account(Name = 'Test');
    // More operations...
} catch (Exception e) {
    Database.rollback(sp); // Undo all DML
    System.debug('Rolled back: ' + e.getMessage());
} finally {
    System.debug('Cleanup: This always runs');
}`,language:"apex",explanation:"DmlException has special methods like getNumDml(), getDmlMessage(), etc. Always catch specific exceptions before generic Exception. finally always runs — use for cleanup."},{title:"Example 2: Custom Exceptions",description:"Creating domain-specific exceptions.",code:`// Define custom exceptions
public class PaymentException extends Exception {}
public class InsufficientFundsException extends PaymentException {}
public class PaymentGatewayException extends PaymentException {}

// Service class using custom exceptions
public class PaymentService {
    
    public static void processPayment(Id accountId, Decimal amount) {
        // Validate amount
        if (amount == null || amount <= 0) {
            throw new PaymentException('Payment amount must be positive. Received: ' + amount);
        }
        
        // Check balance
        Account acc = [SELECT Name, AnnualRevenue FROM Account WHERE Id = :accountId];
        if (acc.AnnualRevenue == null || acc.AnnualRevenue < amount) {
            throw new InsufficientFundsException(
                'Insufficient funds for ' + acc.Name + 
                '. Balance: $' + acc.AnnualRevenue + ', Requested: $' + amount
            );
        }
        
        // Process payment
        try {
            acc.AnnualRevenue -= amount;
            update acc;
            System.debug('Payment of $' + amount + ' processed for ' + acc.Name);
        } catch (DmlException e) {
            throw new PaymentGatewayException('Payment failed: ' + e.getMessage());
        }
    }
}

// Usage with hierarchical catch
try {
    PaymentService.processPayment(someAccountId, 50000);
} catch (InsufficientFundsException e) {
    System.debug('Not enough funds: ' + e.getMessage());
} catch (PaymentGatewayException e) {
    System.debug('Gateway error: ' + e.getMessage());
} catch (PaymentException e) {
    System.debug('General payment error: ' + e.getMessage());
}`,language:"apex",explanation:"Custom exceptions make error handling domain-specific and clear. Catch more specific exceptions first, then generic ones. Custom exceptions can carry additional context in their message."},{title:"Example 3: Database Savepoints",description:"Rolling back transactions on error.",code:`// Savepoint pattern — rollback all DML on any error
public class OrderProcessor {
    
    public static void createOrder(String accountName, List<String> productNames) {
        // Create a savepoint BEFORE any DML
        Database.Savepoint sp = Database.setSavepoint();
        
        try {
            // Step 1: Create Account
            Account acc = new Account(Name = accountName);
            insert acc;
            System.debug('Step 1: Account created — ' + acc.Id);
            
            // Step 2: Create Opportunity
            Opportunity opp = new Opportunity(
                Name = accountName + ' Order',
                AccountId = acc.Id,
                StageName = 'Prospecting',
                CloseDate = Date.today().addDays(30)
            );
            insert opp;
            System.debug('Step 2: Opportunity created — ' + opp.Id);
            
            // Step 3: Create Products (simulate an error)
            if (productNames.isEmpty()) {
                throw new OrderException('At least one product is required');
            }
            
            System.debug('Order created successfully!');
            
        } catch (Exception e) {
            // Rollback EVERYTHING — Account and Opportunity are undone
            Database.rollback(sp);
            System.debug('Order failed, all changes rolled back: ' + e.getMessage());
            
            // Re-throw or handle as appropriate
            throw new OrderException('Order creation failed: ' + e.getMessage());
        }
    }
    
    public class OrderException extends Exception {}
}

// Test:
// OrderProcessor.createOrder('Test Corp', new List<String>()); // Rolls back
// OrderProcessor.createOrder('Test Corp', new List<String>{'Product A'}); // Succeeds`,language:"apex",explanation:"Database.setSavepoint() marks a point in the transaction. Database.rollback(sp) undoes ALL DML after that savepoint. This is essential for multi-step operations that must either all succeed or all fail."}],practice:{intro:"Practice exception handling in the Developer Console.",steps:["Cause a DmlException by inserting an Account without a Name. Catch and print the error details.","Cause a QueryException by querying a non-existent record with a single-row assignment.","Cause a NullPointerException and use e.getLineNumber() and e.getStackTraceString().","Create a custom exception class and throw it manually.","Use Database.setSavepoint() and Database.rollback() to undo a failed multi-step operation.","Test catching multiple exception types in order (specific to generic).","Try to catch a LimitException — verify it cannot be caught (use a small SOQL loop)."],expectedOutcome:"You should understand try/catch/finally, custom exceptions, DML-specific error details, savepoints, and the uncatchable LimitException."},interviewQuestions:[{scenario:"Why can't LimitException be caught in Apex?",answer:"LimitException cannot be caught because governor limits protect the shared multi-tenant infrastructure. If code could catch and ignore limit violations, it could continue consuming resources, degrading performance for other tenants. When a limit is hit, the entire transaction is immediately terminated and rolled back. The only prevention is writing efficient, bulkified code that stays within limits."},{scenario:"What is the difference between Exception and DmlException?",answer:"Exception is the base class for all exceptions. DmlException is a specific subclass with extra methods: getNumDml() (number of failed records), getDmlMessage(i) (error for record i), getDmlFieldNames(i) (fields that caused the error), getDmlStatusCode(i) (status code like REQUIRED_FIELD_MISSING). Always catch DmlException before Exception for more detailed error handling."},{scenario:"When would you use Database.setSavepoint()?",answer:"Use savepoints when performing multiple related DML operations that must either all succeed or all fail (atomic transactions). Example: creating an Account, then Contacts, then Opportunities. If the Opportunity insert fails, rollback undoes the Account and Contacts too. Without savepoints, the Account and Contacts would remain even though the overall operation failed, leaving orphaned data."},{scenario:"How do you handle errors in a trigger?",answer:"In triggers, use addError() on the record instead of try/catch: trigger.new[i].addError('Error message'). This prevents the record from being saved and shows the error to the user. For operations that should not block the save, use try/catch and log the error (create an Error_Log__c record or use Platform Events). Never swallow exceptions silently — always log or report."},{scenario:"What is a best practice for exception handling in production code?",answer:"Best practices: 1) Catch specific exceptions before generic ones. 2) Never catch and ignore (empty catch blocks). 3) Log exception details (message, stack trace, line number) to a custom Error_Log__c object or Platform Event. 4) Use custom exceptions for business logic errors. 5) Use Database.setSavepoint() for multi-step operations. 6) In LWC-facing @AuraEnabled methods, catch exceptions and throw AuraHandledException with user-friendly messages."}]},"3.13":{theory:`
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p>A <strong>Trigger</strong> in Apex is a piece of code that executes before or after specific data events (insert, update, delete, undelete) on a Salesforce object. Triggers enable custom logic to run when records are created, modified, or removed.</p>
      </div>
      <h3>Trigger Events</h3>
      <table>
        <thead><tr><th>Event</th><th>before</th><th>after</th></tr></thead>
        <tbody>
          <tr><td><strong>insert</strong></td><td>Validate/modify before save (no Id yet)</td><td>Access Id, update related records</td></tr>
          <tr><td><strong>update</strong></td><td>Validate/modify before save</td><td>Update related records, compare old vs new</td></tr>
          <tr><td><strong>delete</strong></td><td>Prevent deletion, cascade logic</td><td>Cleanup related data</td></tr>
          <tr><td><strong>undelete</strong></td><td>N/A</td><td>Restore related data</td></tr>
        </tbody>
      </table>
      <h3>Context Variables</h3>
      <ul>
        <li><strong>Trigger.new</strong> — List of new records (insert/update)</li>
        <li><strong>Trigger.old</strong> — List of old records (update/delete)</li>
        <li><strong>Trigger.newMap</strong> — Map of Id→new record (update)</li>
        <li><strong>Trigger.oldMap</strong> — Map of Id→old record (update/delete)</li>
        <li><strong>Trigger.isBefore / isAfter</strong> — Boolean context indicators</li>
        <li><strong>Trigger.isInsert / isUpdate / isDelete</strong> — Event type indicators</li>
      </ul>
    `,examples:[{title:"Example 1: Before Insert Trigger",description:"Auto-populate a field before record saves.",code:`trigger AccountTrigger on Account (before insert) {
    for (Account acc : Trigger.new) {
        // Auto-set Rating based on Annual Revenue
        if (acc.AnnualRevenue != null && acc.AnnualRevenue > 1000000) {
            acc.Rating = 'Hot';
        } else if (acc.AnnualRevenue != null && acc.AnnualRevenue > 500000) {
            acc.Rating = 'Warm';
        } else {
            acc.Rating = 'Cold';
        }
        
        // No DML needed in before triggers!
        // Changes apply automatically when the record saves
    }
}`,language:"apex",explanation:"In before triggers, you modify fields directly on Trigger.new records. No insert/update DML is needed — changes are applied when the record commits."},{title:"Example 2: After Update Trigger",description:"Detect field changes and update related records.",code:`trigger OpportunityTrigger on Opportunity (after update) {
    List<Task> tasksToCreate = new List<Task>();
    
    for (Opportunity opp : Trigger.new) {
        Opportunity oldOpp = Trigger.oldMap.get(opp.Id);
        
        // Detect Stage change to "Closed Won"
        if (opp.StageName == 'Closed Won' && oldOpp.StageName != 'Closed Won') {
            // Create a follow-up Task
            tasksToCreate.add(new Task(
                Subject = 'Follow up on won deal: ' + opp.Name,
                WhatId = opp.Id,
                OwnerId = opp.OwnerId,
                ActivityDate = Date.today().addDays(7),
                Priority = 'High'
            ));
        }
    }
    
    // Bulk insert outside the loop
    if (!tasksToCreate.isEmpty()) {
        insert tasksToCreate;
    }
}`,language:"apex",explanation:"After triggers are used when you need the record's Id (for relationships) or need to create/update OTHER records. Always compare Trigger.new with Trigger.oldMap to detect changes."},{title:"Example 3: Before Delete Trigger",description:"Prevent deletion based on business rules.",code:`trigger CaseTrigger on Case (before delete) {
    for (Case c : Trigger.old) {
        // Prevent deleting open cases
        if (c.Status != 'Closed') {
            c.addError('Cannot delete an open Case. Close it first.');
        }
        
        // Prevent deleting cases with activities
        // Note: This would need a query for related Activities
    }
}`,language:"apex",explanation:"addError() prevents the record from being saved/deleted and displays a custom error message to the user. It's the trigger equivalent of a validation rule."}],practice:{intro:"Create your first Apex trigger.",steps:["In Developer Console, go to File → New → Apex Trigger.",'Name: "AccountTrigger", sObject: "Account".',"Add the before insert event and copy Example 1 code.","Save the trigger.","Test: Create a new Account with Annual Revenue > $1,000,000.",'Verify the Rating field was auto-set to "Hot".',"Extend the trigger: add before update event.","Test: Edit an existing Account's Annual Revenue and verify Rating updates.","Examine the debug logs: Setup → Debug Logs → add yourself → view the log after creating a record."],expectedOutcome:"Your trigger should automatically set the Account Rating based on Annual Revenue on both insert and update."},interviewQuestions:[{scenario:"A trigger fires on Account before update. How do you check if a specific field changed?",answer:"Use Trigger.oldMap to compare: Opportunity oldOpp = Trigger.oldMap.get(opp.Id); if (opp.StageName != oldOpp.StageName) { // StageName changed }. This prevents unnecessary processing when unrelated fields are updated. Always check for changes before executing expensive logic."},{scenario:"Can you have multiple triggers on the same object?",answer:"Yes, but it's strongly discouraged. Salesforce does not guarantee the execution order of multiple triggers on the same object. This leads to unpredictable behavior. Best practice: ONE trigger per object that delegates to a handler class. The handler class contains all the logic, organized by event type."},{scenario:"What is the addError() method and when do you use it?",answer:"addError() prevents a record from being saved (in before triggers) or committed (in after triggers — rolls back the transaction). It displays a custom error message to the user. Use it for business validations that are too complex for declarative validation rules. In before triggers, call it on Trigger.new records. In after triggers, use Trigger.newMap.get(id).addError()."},{scenario:"What is trigger recursion and how do you prevent it?",answer:"Trigger recursion occurs when a trigger performs DML that re-fires the same trigger, potentially creating an infinite loop. Prevention: 1) Use a static Boolean flag in a helper class (static Boolean isExecuting = false). 2) Check the flag at the start of the trigger and set it before executing. 3) Reset it after execution. 4) Alternatively, use Trigger.isExecuting or compare old and new values to avoid redundant processing."},{scenario:"Your trigger works fine with single records but throws errors when bulk-loading 200 records via Data Loader. What's the likely issue?",answer:"The trigger probably has SOQL or DML inside a for loop — it works with 1 record but hits governor limits with 200. Fix: move queries outside the loop using the bulkification pattern (collect IDs in a Set, query once into a Map, loop with Map lookups). Similarly, collect DML records in a List inside the loop and perform a single DML operation after the loop."}]},"3.14":{theory:`
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p>A <strong>Trigger Framework</strong> (or Handler Pattern) is an architectural pattern that moves trigger logic out of the trigger file into dedicated handler classes. This makes code organized, testable, reusable, and prevents common issues like recursion.</p>
      </div>
      <h3>Why Use a Trigger Framework?</h3>
      <ul>
        <li><strong>One trigger per object</strong> — avoids unpredictable execution order</li>
        <li><strong>Separation of concerns</strong> — trigger routes events; handler contains logic</li>
        <li><strong>Testability</strong> — handler classes can be tested independently</li>
        <li><strong>Recursion control</strong> — centralized static flags prevent re-entry</li>
        <li><strong>Bypass mechanism</strong> — disable triggers per user/profile for data migrations</li>
      </ul>
      <h3>Common Framework Patterns</h3>
      <table>
        <thead><tr><th>Pattern</th><th>Complexity</th><th>Best For</th></tr></thead>
        <tbody>
          <tr><td>Simple Handler</td><td>Low</td><td>Small projects, 1-5 triggers</td></tr>
          <tr><td>Virtual Handler Base</td><td>Medium</td><td>Mid-size projects, consistent structure</td></tr>
          <tr><td>Metadata-Driven</td><td>High</td><td>Enterprise orgs, dynamic enable/disable</td></tr>
        </tbody>
      </table>
      <div class="callout callout--tip">
        <p class="callout__title">💡 Industry Best Practice</p>
        <p>In real Salesforce projects, <strong>never write logic directly in the trigger file</strong>. The trigger should contain at most 5 lines — just routing to the handler. This is expected in every professional codebase and every job interview.</p>
      </div>
    `,examples:[{title:"Example 1: Simple Handler Pattern",description:"The minimum viable trigger framework.",code:`// ===== TRIGGER (minimal code) =====
trigger AccountTrigger on Account (before insert, before update, after insert, after update) {
    AccountTriggerHandler.handle(Trigger.operationType, Trigger.new, Trigger.oldMap);
}

// ===== HANDLER CLASS =====
public class AccountTriggerHandler {
    
    // Static flag to prevent recursion
    private static Boolean isExecuting = false;
    
    public static void handle(
        System.TriggerOperation operationType,
        List<Account> newList,
        Map<Id, Account> oldMap
    ) {
        if (isExecuting) return; // Prevent recursion
        isExecuting = true;
        
        switch on operationType {
            when BEFORE_INSERT {
                setDefaults(newList);
            }
            when BEFORE_UPDATE {
                validateChanges(newList, oldMap);
            }
            when AFTER_INSERT {
                createRelatedRecords(newList);
            }
            when AFTER_UPDATE {
                notifyOnStatusChange(newList, oldMap);
            }
        }
        
        isExecuting = false;
    }
    
    private static void setDefaults(List<Account> accounts) {
        for (Account acc : accounts) {
            if (acc.Industry == null) acc.Industry = 'Other';
            if (acc.Rating == null) acc.Rating = 'Warm';
        }
    }
    
    private static void validateChanges(List<Account> newList, Map<Id, Account> oldMap) {
        for (Account acc : newList) {
            Account oldAcc = oldMap.get(acc.Id);
            if (oldAcc.Industry != acc.Industry && acc.AnnualRevenue > 1000000) {
                acc.addError('Cannot change Industry for high-value accounts');
            }
        }
    }
    
    private static void createRelatedRecords(List<Account> accounts) {
        List<Opportunity> opps = new List<Opportunity>();
        for (Account acc : accounts) {
            opps.add(new Opportunity(
                Name = acc.Name + ' — Initial Opportunity',
                AccountId = acc.Id,
                StageName = 'Prospecting',
                CloseDate = Date.today().addDays(90)
            ));
        }
        if (!opps.isEmpty()) insert opps;
    }
    
    private static void notifyOnStatusChange(List<Account> newList, Map<Id, Account> oldMap) {
        for (Account acc : newList) {
            if (acc.Rating != oldMap.get(acc.Id).Rating) {
                System.debug('Rating changed for ' + acc.Name);
            }
        }
    }
}`,language:"apex",explanation:"The trigger is 3 lines. All logic is in the handler. The static isExecuting flag prevents recursion. switch on Trigger.operationType routes events cleanly."},{title:"Example 2: Virtual Base Handler",description:"Reusable base class for all trigger handlers.",code:`// ===== BASE HANDLER (reuse for every object) =====
public virtual class TriggerHandler {
    
    // Bypass mechanism
    private static Set<String> bypassed = new Set<String>();
    
    public static void bypass(String handlerName) { bypassed.add(handlerName); }
    public static void clearBypass(String handlerName) { bypassed.remove(handlerName); }
    public static Boolean isBypassed(String handlerName) { return bypassed.contains(handlerName); }
    
    // Main run method
    public void run() {
        if (isBypassed(getHandlerName())) return;
        
        switch on Trigger.operationType {
            when BEFORE_INSERT  { this.beforeInsert(Trigger.new); }
            when BEFORE_UPDATE  { this.beforeUpdate(Trigger.new, Trigger.oldMap); }
            when BEFORE_DELETE  { this.beforeDelete(Trigger.oldMap); }
            when AFTER_INSERT   { this.afterInsert(Trigger.new); }
            when AFTER_UPDATE   { this.afterUpdate(Trigger.new, Trigger.oldMap); }
            when AFTER_DELETE   { this.afterDelete(Trigger.oldMap); }
            when AFTER_UNDELETE { this.afterUndelete(Trigger.new); }
        }
    }
    
    private String getHandlerName() { return String.valueOf(this).split(':')[0]; }
    
    // Virtual methods — override only what you need
    protected virtual void beforeInsert(List<sObject> newList) {}
    protected virtual void beforeUpdate(List<sObject> newList, Map<Id, sObject> oldMap) {}
    protected virtual void beforeDelete(Map<Id, sObject> oldMap) {}
    protected virtual void afterInsert(List<sObject> newList) {}
    protected virtual void afterUpdate(List<sObject> newList, Map<Id, sObject> oldMap) {}
    protected virtual void afterDelete(Map<Id, sObject> oldMap) {}
    protected virtual void afterUndelete(List<sObject> newList) {}
}

// ===== CONCRETE HANDLER =====
public class ContactHandler extends TriggerHandler {
    
    protected override void beforeInsert(List<sObject> newList) {
        for (Contact c : (List<Contact>) newList) {
            if (c.Email != null) {
                c.Email = c.Email.toLowerCase();
            }
        }
    }
    
    protected override void afterInsert(List<sObject> newList) {
        // Update parent Account contact count
        Set<Id> accountIds = new Set<Id>();
        for (Contact c : (List<Contact>) newList) {
            if (c.AccountId != null) accountIds.add(c.AccountId);
        }
        // ... update accounts
    }
}

// ===== TRIGGER =====
trigger ContactTrigger on Contact (before insert, before update, after insert, after update) {
    new ContactHandler().run();
}`,language:"apex",explanation:"The virtual base TriggerHandler class provides: event routing, bypass mechanism, and empty virtual methods. Each handler extends it and overrides only the events it needs. The bypass feature is invaluable for data migrations."},{title:"Example 3: Bypassing Triggers",description:"Disabling triggers during data migration.",code:`// During a data migration, bypass the Account trigger
TriggerHandler.bypass('AccountHandler');

// These inserts will NOT fire AccountHandler logic
List<Account> migrationData = new List<Account>();
for (Integer i = 0; i < 10000; i++) {
    migrationData.add(new Account(Name = 'Migrated Account ' + i));
}
insert migrationData;

// Re-enable the trigger
TriggerHandler.clearBypass('AccountHandler');

// Now triggers fire normally again
insert new Account(Name = 'Normal Account');

// Check if bypassed
if (TriggerHandler.isBypassed('AccountHandler')) {
    System.debug('Account trigger is currently bypassed');
}

// You can also bypass in tests to isolate behavior:
@isTest
static void testWithoutTrigger() {
    TriggerHandler.bypass('AccountHandler');
    
    // Insert test data without trigger side effects
    Account testAcc = new Account(Name = 'Test');
    insert testAcc;
    
    // Test something that doesn't depend on the trigger
    TriggerHandler.clearBypass('AccountHandler');
}`,language:"apex",explanation:"The bypass mechanism lets you disable triggers during data loads, migrations, or test scenarios. It uses static state, so bypasses persist for the entire transaction."}],practice:{intro:"Build a trigger framework from scratch.",steps:["Create the TriggerHandler virtual base class with all 7 event methods.","Add the static bypass mechanism (bypass, clearBypass, isBypassed).","Create an OpportunityHandler that extends TriggerHandler.","Override beforeInsert to set default CloseDate to 30 days from today.",'Override afterUpdate to log when StageName changes to "Closed Won".',"Create the OpportunityTrigger that calls new OpportunityHandler().run().","Test the bypass: insert an Opportunity with bypass, verify defaults are NOT set."],expectedOutcome:"You should have a reusable trigger framework that can be applied to any object with minimal setup."},interviewQuestions:[{scenario:"Why should you use a trigger framework instead of writing logic directly in triggers?",answer:"Key reasons: 1) One trigger per object — multiple triggers have unpredictable execution order. 2) Testability — handler classes can be unit tested without DML. 3) Separation of concerns — trigger routes, handler processes. 4) Recursion prevention — centralized static flags. 5) Bypass mechanism — disable triggers for data migration. 6) Code reuse — common logic in the base class. 7) Consistency — every developer follows the same pattern."},{scenario:"How do you prevent trigger recursion?",answer:"Use a static Boolean variable in the handler: private static Boolean isExecuting = false. Check it at the start: if (isExecuting) return. Set it to true before processing: isExecuting = true. Reset after: isExecuting = false. For more granular control, use a static Set<Id> to track which specific records have been processed, allowing re-processing of different records in the same transaction."},{scenario:"What is the order of execution in Salesforce when a record is saved?",answer:"The order is: 1) System validation rules. 2) Before triggers. 3) Custom validation rules + duplicate rules. 4) Record saved (not committed). 5) After triggers. 6) Assignment rules, auto-response rules. 7) Workflow rules + field updates (may re-fire before/after update triggers). 8) Escalation rules. 9) Processes and Flows. 10) DML commit. 11) Post-commit logic (emails, async). Understanding this order is crucial for debugging trigger behavior."},{scenario:"You need to load 5 million records into Salesforce. How do you handle triggers?",answer:"Strategy: 1) Bypass non-essential triggers using the framework's bypass mechanism. 2) Use Batch Apex or Data Loader with batch size tuning (200 records per batch is default). 3) Ensure remaining triggers are fully bulkified. 4) Disable Workflow Rules and Flows temporarily via Custom Metadata settings. 5) Re-enable everything after migration. 6) Run validation batches post-migration to verify data integrity. The bypass mechanism in the trigger framework makes this manageable."},{scenario:"How does your trigger framework handle multiple trigger events on the same object?",answer:"The base TriggerHandler class uses switch on Trigger.operationType to route to the correct virtual method (beforeInsert, afterUpdate, etc.). The concrete handler overrides only the events it needs — others use the empty base implementation. This avoids if/else chains and makes it clear which events are handled. Adding a new event is as simple as overriding another method."}]},"3.15":{theory:`
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p><strong>Governor Limits</strong> are runtime limits enforced by Salesforce to ensure no single tenant monopolizes shared resources. <strong>Bulkification</strong> is the practice of writing code that handles any number of records efficiently within these limits.</p>
      </div>
      <h3>Key Governor Limits</h3>
      <table>
        <thead><tr><th>Limit</th><th>Synchronous</th><th>Asynchronous</th></tr></thead>
        <tbody>
          <tr><td>SOQL Queries</td><td>100</td><td>200</td></tr>
          <tr><td>SOQL Rows Retrieved</td><td>50,000</td><td>50,000</td></tr>
          <tr><td>DML Statements</td><td>150</td><td>150</td></tr>
          <tr><td>DML Rows</td><td>10,000</td><td>10,000</td></tr>
          <tr><td>Heap Size</td><td>6 MB</td><td>12 MB</td></tr>
          <tr><td>CPU Time</td><td>10,000 ms</td><td>60,000 ms</td></tr>
          <tr><td>Callouts</td><td>100</td><td>100</td></tr>
        </tbody>
      </table>
      <div class="callout callout--warning">
        <p class="callout__title">⚠️ Critical</p>
        <p>These limits are <strong>per transaction</strong>, not per record. When Data Loader inserts 200 records, they share ONE transaction. Your code must handle all 200 records within the same limits as handling 1 record.</p>
      </div>
    `,examples:[{title:"Example 1: Bulkification Patterns",description:"Before and after — from non-bulk to bulk code.",code:`// ❌ NON-BULK: Fails with 200+ records
trigger ContactTrigger on Contact (after insert) {
    for (Contact c : Trigger.new) {
        // SOQL inside loop — 200 contacts = 200 queries!
        Account a = [SELECT Name FROM Account WHERE Id = :c.AccountId];
        
        // DML inside loop — 200 contacts = 200 DML operations!
        Task t = new Task(Subject = 'Welcome ' + c.LastName, WhoId = c.Id);
        insert t;
    }
}

// ✅ BULKIFIED: Works with any number of records
trigger ContactTrigger on Contact (after insert) {
    // 1. Collect IDs
    Set<Id> accountIds = new Set<Id>();
    for (Contact c : Trigger.new) {
        if (c.AccountId != null) accountIds.add(c.AccountId);
    }
    
    // 2. Single query → Map
    Map<Id, Account> accountMap = new Map<Id, Account>(
        [SELECT Id, Name FROM Account WHERE Id IN :accountIds]
    );
    
    // 3. Collect DML records
    List<Task> tasks = new List<Task>();
    for (Contact c : Trigger.new) {
        tasks.add(new Task(
            Subject = 'Welcome ' + c.LastName,
            WhoId = c.Id
        ));
    }
    
    // 4. Single DML operation
    insert tasks;
}`,language:"apex",explanation:"The bulkified version uses exactly 1 SOQL query and 1 DML statement regardless of whether it processes 1 or 200 records. This is the gold standard for Apex triggers."}],practice:{intro:"Practice bulkification and monitor governor limits.",steps:["Write a non-bulk trigger with SOQL inside a loop (for learning only!).","Use Execute Anonymous to insert 5 records — it works.","Try inserting 200 records via a List<Account> — observe the SOQL limit error.","Refactor the trigger using the bulkification pattern.","Re-test with 200 records — it should succeed.","Add Limits.getQueries() and Limits.getLimitQueries() debug statements to monitor SOQL usage.","Check: System.debug('SOQL used: ' + Limits.getQueries() + '/' + Limits.getLimitQueries());"],expectedOutcome:"You should understand why non-bulk code fails and how the bulkification pattern keeps query and DML counts constant regardless of record volume."},interviewQuestions:[{scenario:'A production trigger is throwing "Too many SOQL queries: 101". How do you debug and fix it?',answer:"Debug: 1) Check debug logs for the trigger, identify all SOQL queries and where they're called. 2) Look for SOQL inside for loops — this is the #1 cause. Fix: Move queries outside loops using the collect-IDs-query-once-map-lookup pattern. Also check if the trigger is calling utility methods that contain additional queries. Consider whether some queries can be combined using relationship queries or sub-queries."},{scenario:"What is the Limits class and how do you use it?",answer:"The Limits class provides methods to check current governor limit usage and maximum limits. Key methods: Limits.getQueries() (SOQL used), Limits.getLimitQueries() (max allowed), Limits.getDmlStatements(), Limits.getHeapSize(), Limits.getCpuTime(). Use these in debug logging to monitor resource consumption, and in code to implement defensive logic (e.g., if (Limits.getQueries() < Limits.getLimitQueries() - 10) { // safe to query })."},{scenario:"Can you increase governor limits?",answer:"Not directly. Governor limits are fixed per transaction type. However, strategies to work within them: 1) Use async Apex (Batch, Queueable, @future) which has higher limits. 2) Optimize queries (aggregate queries instead of iterating). 3) Use Platform Events to break work into separate transactions. 4) Use Salesforce Connect for external data instead of importing. 5) Contact Salesforce for limit increases in extreme cases (rare, typically for very large enterprises)."},{scenario:"How do you write a trigger that safely handles both single and bulk operations?",answer:"Always code as if Trigger.new contains 200 records: 1) Never assume Trigger.new.size() == 1. 2) Collect related IDs in Sets, query once into Maps. 3) Build DML lists inside loops, execute DML after loops. 4) Use Trigger.newMap/oldMap for lookups instead of iterating. 5) Test with both single records AND 200+ records. The key insight: if your code works with 200 records within limits, it will always work with 1 record."},{scenario:"What happens when governor limits are exceeded in a Batch Apex job?",answer:"In Batch Apex, limits apply per execute() method call (per batch chunk), not the entire job. If one chunk exceeds limits, only that chunk fails — other chunks continue processing. The finish() method still runs. The failed batch records can be identified via Database.BatchableContext and error handling. This is why Batch Apex is the solution for processing millions of records — it naturally breaks work into limit-friendly chunks."}]},"3.16":{theory:`
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p><strong>Batch Apex</strong> processes large data volumes by dividing work into manageable chunks (batches). It implements the <code>Database.Batchable</code> interface and has three methods: <code>start()</code>, <code>execute()</code>, and <code>finish()</code>. Each execute() call gets its own governor limits.</p>
      </div>
      <h3>When to Use Batch Apex</h3>
      <ul>
        <li>Processing more than <strong>50,000 records</strong></li>
        <li>Complex operations that would exceed governor limits in a single transaction</li>
        <li>Data cleanup, migration, or transformation jobs</li>
        <li>Scheduled recurring data operations</li>
      </ul>
      <h3>Batch Apex Lifecycle</h3>
      <table>
        <thead><tr><th>Method</th><th>Called</th><th>Purpose</th></tr></thead>
        <tbody>
          <tr><td>start()</td><td>Once</td><td>Returns QueryLocator or Iterable — the data to process</td></tr>
          <tr><td>execute()</td><td>N times</td><td>Processes one chunk (default 200 records). Has fresh governor limits.</td></tr>
          <tr><td>finish()</td><td>Once</td><td>Post-processing: send emails, chain another batch, log results</td></tr>
        </tbody>
      </table>
      <div class="callout callout--tip">
        <p class="callout__title">💡 Key Limit</p>
        <p>QueryLocator can return up to <strong>50 million records</strong>. Iterable is limited to the heap size but allows custom data sources. Max 5 concurrent batch jobs. Default batch size is 200; max is 2,000.</p>
      </div>
    `,examples:[{title:"Example 1: Basic Batch Class",description:"Process all Accounts to standardize industry values.",code:`global class AccountIndustryBatch implements Database.Batchable<sObject> {
    
    // START: Define the data to process
    global Database.QueryLocator start(Database.BatchableContext bc) {
        return Database.getQueryLocator(
            'SELECT Id, Name, Industry FROM Account WHERE Industry != null'
        );
    }
    
    // EXECUTE: Process each chunk (default 200 records)
    global void execute(Database.BatchableContext bc, List<Account> scope) {
        List<Account> toUpdate = new List<Account>();
        
        for (Account acc : scope) {
            // Standardize industry values
            String standardized = acc.Industry.trim().toLowerCase();
            if (standardized.contains('tech')) {
                acc.Industry = 'Technology';
                toUpdate.add(acc);
            } else if (standardized.contains('health')) {
                acc.Industry = 'Healthcare';
                toUpdate.add(acc);
            }
        }
        
        if (!toUpdate.isEmpty()) {
            Database.update(toUpdate, false); // Allow partial success
        }
    }
    
    // FINISH: Post-processing
    global void finish(Database.BatchableContext bc) {
        AsyncApexJob job = [SELECT Id, NumberOfErrors, JobItemsProcessed, 
            TotalJobItems FROM AsyncApexJob WHERE Id = :bc.getJobId()];
        
        System.debug('Batch Complete!');
        System.debug('Chunks processed: ' + job.JobItemsProcessed + '/' + job.TotalJobItems);
        System.debug('Errors: ' + job.NumberOfErrors);
    }
}

// Execute the batch:
Id batchId = Database.executeBatch(new AccountIndustryBatch(), 200);
System.debug('Batch Job Id: ' + batchId);`,language:"apex",explanation:"start() returns a QueryLocator — it can handle up to 50 million records. execute() processes each batch of 200 records with fresh governor limits. finish() runs once at the end for cleanup."},{title:"Example 2: Batch with Stateful & Callouts",description:"Track progress across batches and make HTTP callouts.",code:`global class DataSyncBatch implements Database.Batchable<sObject>, 
                                      Database.Stateful,
                                      Database.AllowsCallouts {
    
    // Stateful variables persist across execute() calls
    global Integer totalProcessed = 0;
    global Integer totalErrors = 0;
    global List<String> errorMessages = new List<String>();
    
    global Database.QueryLocator start(Database.BatchableContext bc) {
        return Database.getQueryLocator(
            'SELECT Id, Name, External_Id__c FROM Account WHERE NeedsSync__c = true'
        );
    }
    
    global void execute(Database.BatchableContext bc, List<Account> scope) {
        for (Account acc : scope) {
            try {
                // HTTP callout to external system
                HttpRequest req = new HttpRequest();
                req.setEndpoint('https://api.example.com/sync');
                req.setMethod('POST');
                req.setBody(JSON.serialize(acc));
                
                HttpResponse res = new Http().send(req);
                
                if (res.getStatusCode() == 200) {
                    acc.NeedsSync__c = false;
                    acc.Last_Synced__c = Datetime.now();
                    totalProcessed++;
                } else {
                    totalErrors++;
                    errorMessages.add(acc.Name + ': ' + res.getStatus());
                }
            } catch (Exception e) {
                totalErrors++;
                errorMessages.add(acc.Name + ': ' + e.getMessage());
            }
        }
        update scope;
    }
    
    global void finish(Database.BatchableContext bc) {
        // Send summary email
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        mail.setToAddresses(new List<String>{'admin@company.com'});
        mail.setSubject('Data Sync Complete');
        mail.setPlainTextBody(
            'Processed: ' + totalProcessed + '\\n' +
            'Errors: ' + totalErrors + '\\n' +
            String.join(errorMessages, '\\n')
        );
        Messaging.sendEmail(new List<Messaging.Email>{mail});
    }
}`,language:"apex",explanation:"Database.Stateful preserves instance variable values between execute() calls. Database.AllowsCallouts enables HTTP requests. Without Stateful, variables reset to initial values each execute() call."},{title:"Example 3: Batch Chaining",description:"Running batches sequentially.",code:`// Batch 1: Clean data
global class CleanDataBatch implements Database.Batchable<sObject> {
    global Database.QueryLocator start(Database.BatchableContext bc) {
        return Database.getQueryLocator('SELECT Id, Name FROM Account');
    }
    
    global void execute(Database.BatchableContext bc, List<Account> scope) {
        for (Account acc : scope) {
            acc.Name = acc.Name.trim();
        }
        update scope;
    }
    
    global void finish(Database.BatchableContext bc) {
        // Chain Batch 2 after Batch 1 finishes
        Database.executeBatch(new EnrichDataBatch(), 100);
    }
}

// Batch 2: Enrich data (runs after Batch 1)
global class EnrichDataBatch implements Database.Batchable<sObject> {
    global Database.QueryLocator start(Database.BatchableContext bc) {
        return Database.getQueryLocator('SELECT Id, Name, Industry FROM Account WHERE Industry = null');
    }
    
    global void execute(Database.BatchableContext bc, List<Account> scope) {
        for (Account acc : scope) {
            acc.Industry = 'Other';
        }
        update scope;
    }
    
    global void finish(Database.BatchableContext bc) {
        System.debug('All batches complete!');
    }
}

// Start the chain:
Database.executeBatch(new CleanDataBatch(), 200);`,language:"apex",explanation:"Batch chaining: call Database.executeBatch() in the finish() method of the previous batch. This creates sequential processing — Batch 2 starts only after Batch 1 completes."}],practice:{intro:"Build and run a Batch Apex job.",steps:["Create a Batch class that updates all Accounts missing a Description field.","Add Database.Stateful to track how many records were updated.","Implement the finish() method to log the total count.","Execute the batch with a batch size of 50.","Monitor the job in Setup → Apex Jobs.","Try different batch sizes (10, 200, 2000) and observe processing.","Create a second batch and chain them together in finish()."],expectedOutcome:"You should be able to create Batch Apex jobs for processing large data volumes with stateful tracking and batch chaining."},interviewQuestions:[{scenario:"When would you use Batch Apex vs a trigger?",answer:"Batch Apex is for processing large volumes of existing data (cleanup, migration, enrichment, sync). Triggers fire on individual record events (insert, update). Use Batch for: data migration of millions of records, scheduled data cleanup, bulk API callouts to external systems. Use triggers for: real-time business logic on record changes. They serve different purposes — Batch is proactive (you initiate it), triggers are reactive (events trigger them)."},{scenario:"What is Database.Stateful and when do you need it?",answer:"By default, Batch Apex resets instance variables between execute() calls. Database.Stateful preserves them across all chunks. Use it when you need to: track cumulative counts, collect error messages across batches, maintain running totals, or accumulate data for the finish() method. Caution: Stateful serializes the entire object between chunks, so keep stateful variables small (avoid storing large Lists)."},{scenario:"What happens when one batch chunk fails?",answer:"If one execute() chunk throws an uncaught exception, only that chunk fails — other chunks continue processing. The failed records are NOT processed. In finish(), you can check AsyncApexJob.NumberOfErrors to see how many chunks failed. Use Database.update(records, false) for partial success within a chunk. The finish() method always runs, even if all chunks fail."},{scenario:"How many batch jobs can run concurrently?",answer:"Maximum 5 Batch Apex jobs can run concurrently per org. Additional jobs are queued in the Apex Flex Queue (up to 100 queued). The flex queue processes jobs first-in-first-out as slots open. You can monitor and reorder flex queue jobs in Setup. For urgent jobs, you can promote a flex queue job to the top using System.FlexQueue.moveBeforeJob()."},{scenario:"What is the difference between QueryLocator and Iterable in start()?",answer:"QueryLocator: Can return up to 50 million records. Uses a SOQL query string. Subject to SOQL limits at start time only. Most common choice. Iterable: Limited by heap size (~12MB in async). Allows custom data sources (not just SOQL). Useful for processing data from external systems, custom iterators, or complex data structures. Choose QueryLocator for database records; Iterable for non-SOQL data sources."}]},"3.17":{theory:`
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p><strong>Schedulable Apex</strong> allows you to schedule Apex classes to run at specific times using cron expressions. Implements the <code>Schedulable</code> interface with a single <code>execute()</code> method. Commonly used to schedule Batch Apex jobs on a recurring basis.</p>
      </div>
      <h3>Cron Expression Format</h3>
      <table>
        <thead><tr><th>Position</th><th>Field</th><th>Values</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>Seconds</td><td>0-59</td></tr>
          <tr><td>2</td><td>Minutes</td><td>0-59</td></tr>
          <tr><td>3</td><td>Hours</td><td>0-23</td></tr>
          <tr><td>4</td><td>Day of Month</td><td>1-31</td></tr>
          <tr><td>5</td><td>Month</td><td>1-12 or JAN-DEC</td></tr>
          <tr><td>6</td><td>Day of Week</td><td>1-7 or SUN-SAT</td></tr>
          <tr><td>7</td><td>Year (optional)</td><td>1970-2099</td></tr>
        </tbody>
      </table>
      <h3>Common Cron Examples</h3>
      <ul>
        <li><code>'0 0 0 * * ?'</code> — Every day at midnight</li>
        <li><code>'0 0 8 ? * MON-FRI'</code> — Weekdays at 8 AM</li>
        <li><code>'0 0 */4 * * ?'</code> — Every 4 hours</li>
        <li><code>'0 30 6 1 * ?'</code> — 1st of every month at 6:30 AM</li>
      </ul>
      <div class="callout callout--tip">
        <p class="callout__title">💡 Limitation</p>
        <p>Maximum <strong>100 scheduled Apex jobs</strong> per org. Scheduled jobs execute in system context (no user-specific sharing). Use <code>System.schedule()</code> to register a job and <code>System.abortJob()</code> to cancel it.</p>
      </div>
    `,examples:[{title:"Example 1: Basic Scheduled Job",description:"Run a batch every night at midnight.",code:`global class NightlyCleanupScheduler implements Schedulable {
    
    global void execute(SchedulableContext sc) {
        // Launch a batch job
        Database.executeBatch(new AccountIndustryBatch(), 200);
        
        System.debug('Nightly cleanup batch launched at: ' + Datetime.now());
    }
}

// Schedule it to run every day at midnight
String cronExp = '0 0 0 * * ?'; // Seconds Minutes Hours DayOfMonth Month DayOfWeek
String jobId = System.schedule('Nightly Account Cleanup', cronExp, new NightlyCleanupScheduler());
System.debug('Scheduled Job Id: ' + jobId);

// View scheduled jobs:
// Setup → Scheduled Jobs

// Cancel a scheduled job:
// System.abortJob(jobId);

// Schedule for a specific date/time (one-time):
String oneTime = '0 0 14 15 10 ? 2024'; // Oct 15, 2024 at 2 PM
System.schedule('One-Time Job', oneTime, new NightlyCleanupScheduler());`,language:"apex",explanation:"The Schedulable class just launches work — typically a Batch job. The cron expression defines when. System.schedule() returns a job ID you can use to abort later."},{title:"Example 2: Self-Rescheduling Pattern",description:"Run a job every 5 minutes (workaround for cron limitations).",code:`global class FrequentCheckScheduler implements Schedulable {
    
    global void execute(SchedulableContext sc) {
        // Do the work
        checkForNewLeads();
        
        // Abort current job (it's a one-time execution)
        System.abortJob(sc.getTriggerId());
        
        // Reschedule 5 minutes from now
        Datetime nextRun = Datetime.now().addMinutes(5);
        String cronExp = nextRun.second() + ' ' + 
                         nextRun.minute() + ' ' + 
                         nextRun.hour() + ' ' + 
                         nextRun.day() + ' ' + 
                         nextRun.month() + ' ? ' + 
                         nextRun.year();
        
        System.schedule('Lead Check ' + nextRun.format(), cronExp, new FrequentCheckScheduler());
    }
    
    private void checkForNewLeads() {
        List<Lead> newLeads = [
            SELECT Name, Email, Status 
            FROM Lead 
            WHERE CreatedDate = TODAY AND Status = 'Open - Not Contacted'
        ];
        
        if (!newLeads.isEmpty()) {
            // Process or notify
            System.debug('Found ' + newLeads.size() + ' new uncontacted leads');
        }
    }
}

// Initial schedule (starts the chain):
System.schedule('Lead Check Init', '0 0 8 * * ?', new FrequentCheckScheduler());`,language:"apex",explanation:`Cron expressions can't do "every 5 minutes" directly. This pattern: abort current job → compute next run time → reschedule. Caution: each reschedule uses a scheduled job slot (100 max).`},{title:"Example 3: Scheduled Job with Test",description:"Testing a scheduled Apex class.",code:`// The scheduled class
global class WeeklyReportScheduler implements Schedulable {
    
    global void execute(SchedulableContext sc) {
        // Generate weekly report
        Integer totalAccounts = [SELECT COUNT() FROM Account];
        Integer newThisWeek = [SELECT COUNT() FROM Account WHERE CreatedDate = THIS_WEEK];
        
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        mail.setToAddresses(new List<String>{'manager@company.com'});
        mail.setSubject('Weekly Account Report');
        mail.setPlainTextBody(
            'Total Accounts: ' + totalAccounts + '\\n' +
            'New This Week: ' + newThisWeek
        );
        Messaging.sendEmail(new List<Messaging.Email>{mail});
    }
}

// Test class
@isTest
private class WeeklyReportSchedulerTest {
    
    @isTest
    static void testScheduledJob() {
        // Create test data
        insert new Account(Name = 'Test Account');
        
        Test.startTest();
        
        // Schedule the job
        String cronExp = '0 0 9 ? * MON'; // Every Monday at 9 AM
        String jobId = System.schedule('Test Weekly Report', cronExp, new WeeklyReportScheduler());
        
        Test.stopTest(); // Forces the scheduled job to execute
        
        // Verify the job was scheduled
        CronTrigger ct = [SELECT State FROM CronTrigger WHERE Id = :jobId];
        System.assertNotEquals(null, ct);
    }
}`,language:"apex",explanation:"Test.stopTest() forces the scheduled execute() to run synchronously. This lets you verify the job logic in tests. Check CronTrigger for job state after scheduling."}],practice:{intro:"Create and schedule Apex jobs.",steps:["Create a Schedulable class that logs the current Account count.","Schedule it to run daily at 6 AM using a cron expression.","View the job in Setup → Scheduled Jobs.","Abort the job using System.abortJob().","Create a Schedulable that launches a Batch Apex job.","Schedule it to run every Monday at 9 AM.","Write a test class that verifies the scheduled job executes correctly."],expectedOutcome:"You should be able to create, schedule, test, and abort scheduled Apex jobs with proper cron expressions."},interviewQuestions:[{scenario:"How do you schedule an Apex job to run every hour?",answer:"Use the cron expression: '0 0 * * * ?' (at minute 0, every hour, every day). Call System.schedule('Hourly Job', '0 0 * * * ?', new MySchedulable()). To monitor: Setup → Scheduled Jobs. To cancel: System.abortJob(jobId). Note: minimum scheduling interval is 1 hour with cron. For more frequent execution, use the self-rescheduling pattern or consider Platform Events / Change Data Capture."},{scenario:"Can a Schedulable class make HTTP callouts?",answer:"Not directly — callouts are not allowed in the execute() method of Schedulable. Workaround: have the Schedulable launch a Queueable or Batch class that implements Database.AllowsCallouts, and make the callouts there. This is a common pattern: Schedulable → Batch/Queueable → HTTP Callout."},{scenario:"What is the maximum number of scheduled jobs per org?",answer:"Maximum 100 scheduled Apex jobs per org. This includes both active and waiting jobs. If you hit the limit, abort unused jobs. For organizations that need more, consider using the Scheduled Flow feature (which has separate limits) or consolidating multiple jobs into one Schedulable that dispatches to different Batch jobs based on the current time/day."},{scenario:"How do you test a Schedulable Apex class?",answer:"In the test: 1) Create test data. 2) Call Test.startTest(). 3) Use System.schedule() with a cron expression and your Schedulable instance. 4) Call Test.stopTest() — this forces synchronous execution of the scheduled job. 5) Assert expected results. The job runs immediately in the test context, not at the scheduled time. Verify CronTrigger records to confirm scheduling."},{scenario:"What happens if a scheduled job fails?",answer:"If the execute() method throws an uncaught exception, the job fails for that execution. The job remains scheduled and will attempt to run again at the next scheduled time. Failed executions appear in Setup → Apex Jobs with the error message. The admin receives an email notification about the failure. The job is NOT automatically unscheduled after a failure — it keeps trying."}]},"3.18":{theory:`
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p><strong>Queueable Apex</strong> implements the <code>Queueable</code> interface to run asynchronous jobs. It's an enhanced version of @future methods — supporting complex types as parameters, job chaining, and monitoring via <code>AsyncApexJob</code>.</p>
      </div>
      <h3>Queueable vs @future vs Batch</h3>
      <table>
        <thead><tr><th>Feature</th><th>@future</th><th>Queueable</th><th>Batch</th></tr></thead>
        <tbody>
          <tr><td>Parameters</td><td>Primitives only</td><td>Any type (sObjects, classes)</td><td>QueryLocator/Iterable</td></tr>
          <tr><td>Chaining</td><td>No</td><td>Yes (job chains)</td><td>Yes (in finish)</td></tr>
          <tr><td>Monitoring</td><td>No Job ID</td><td>Returns Job ID</td><td>Returns Job ID</td></tr>
          <tr><td>Callouts</td><td>With (callout=true)</td><td>With AllowsCallouts</td><td>With AllowsCallouts</td></tr>
          <tr><td>Best for</td><td>Simple fire-and-forget</td><td>Complex async logic</td><td>Large data volumes</td></tr>
        </tbody>
      </table>
      <div class="callout callout--tip">
        <p class="callout__title">💡 When to Choose Queueable</p>
        <p>Use Queueable when you need async processing with: complex object parameters, job chaining, monitoring capability, or when @future is too limited but Batch is overkill. It's the "sweet spot" of async Apex.</p>
      </div>
    `,examples:[{title:"Example 1: Basic Queueable Job",description:"Process accounts asynchronously.",code:`public class AccountEnrichmentJob implements Queueable {
    
    private List<Account> accounts;
    
    // Constructor accepts complex types (unlike @future)
    public AccountEnrichmentJob(List<Account> accounts) {
        this.accounts = accounts;
    }
    
    public void execute(QueueableContext context) {
        // This runs asynchronously with higher limits
        System.debug('Job ID: ' + context.getJobId());
        System.debug('Processing ' + accounts.size() + ' accounts');
        
        for (Account acc : accounts) {
            if (acc.Description == null) {
                acc.Description = 'Enriched on ' + Datetime.now().format();
            }
            if (acc.Rating == null) {
                acc.Rating = acc.AnnualRevenue > 1000000 ? 'Hot' : 'Warm';
            }
        }
        
        update accounts;
        System.debug('Enrichment complete!');
    }
}

// Enqueue the job
List<Account> accounts = [SELECT Id, Name, Description, Rating, AnnualRevenue 
                          FROM Account WHERE Description = null LIMIT 100];

Id jobId = System.enqueueJob(new AccountEnrichmentJob(accounts));
System.debug('Queued Job: ' + jobId);

// Monitor the job
AsyncApexJob job = [SELECT Status, NumberOfErrors 
                    FROM AsyncApexJob WHERE Id = :jobId];
System.debug('Status: ' + job.Status);`,language:"apex",explanation:"Unlike @future, Queueable accepts complex types (Lists, sObjects, custom classes) as constructor parameters. System.enqueueJob() returns a Job ID for monitoring."},{title:"Example 2: Queueable with Chaining",description:"Run sequential async jobs.",code:`// Step 1: Clean accounts
public class CleanAccountsJob implements Queueable {
    private List<Id> accountIds;
    
    public CleanAccountsJob(List<Id> accountIds) {
        this.accountIds = accountIds;
    }
    
    public void execute(QueueableContext context) {
        List<Account> accounts = [SELECT Id, Name, Phone FROM Account WHERE Id IN :accountIds];
        
        for (Account acc : accounts) {
            acc.Name = acc.Name.trim();
            if (acc.Phone != null) {
                acc.Phone = acc.Phone.replaceAll('[^0-9+]', '');
            }
        }
        update accounts;
        
        // Chain the next job
        System.enqueueJob(new EnrichAccountsJob(accountIds));
    }
}

// Step 2: Enrich accounts (runs after Step 1)
public class EnrichAccountsJob implements Queueable, Database.AllowsCallouts {
    private List<Id> accountIds;
    
    public EnrichAccountsJob(List<Id> accountIds) {
        this.accountIds = accountIds;
    }
    
    public void execute(QueueableContext context) {
        List<Account> accounts = [SELECT Id, Name, Industry FROM Account WHERE Id IN :accountIds];
        
        for (Account acc : accounts) {
            // Could make callout here for enrichment
            if (acc.Industry == null) acc.Industry = 'Unknown';
        }
        update accounts;
        
        System.debug('Enrichment chain complete!');
    }
}

// Start the chain:
List<Id> ids = new List<Id>{'001xx000003DGbY', '001xx000003DGbZ'};
System.enqueueJob(new CleanAccountsJob(ids));`,language:"apex",explanation:"Chain Queueable jobs by calling System.enqueueJob() inside execute(). In production, you can chain up to 1 job per execute(). In tests, chaining depth is limited to 1."},{title:"Example 3: Testing Queueable",description:"Unit testing async Queueable jobs.",code:`@isTest
private class AccountEnrichmentJobTest {
    
    @TestSetup
    static void makeData() {
        List<Account> accounts = new List<Account>();
        for (Integer i = 0; i < 10; i++) {
            accounts.add(new Account(
                Name = 'Test Account ' + i,
                AnnualRevenue = i * 500000
            ));
        }
        insert accounts;
    }
    
    @isTest
    static void testEnrichment() {
        List<Account> accounts = [SELECT Id, Name, Description, Rating, AnnualRevenue 
                                  FROM Account];
        
        Test.startTest();
        System.enqueueJob(new AccountEnrichmentJob(accounts));
        Test.stopTest(); // Forces synchronous execution
        
        // Verify results
        List<Account> updated = [SELECT Description, Rating FROM Account];
        for (Account acc : updated) {
            System.assertNotEquals(null, acc.Description, 'Description should be set');
            System.assertNotEquals(null, acc.Rating, 'Rating should be set');
        }
        
        // Verify high-revenue accounts got 'Hot' rating
        Account highValue = [SELECT Rating FROM Account WHERE AnnualRevenue > 1000000 LIMIT 1];
        System.assertEquals('Hot', highValue.Rating);
    }
    
    @isTest
    static void testWithNoAccounts() {
        // Edge case: empty list
        Test.startTest();
        System.enqueueJob(new AccountEnrichmentJob(new List<Account>()));
        Test.stopTest();
        // Should not throw any errors
    }
}`,language:"apex",explanation:"Test.stopTest() forces the Queueable to execute synchronously. Test both normal cases and edge cases (empty data, null values). Queueable chaining is limited to depth 1 in tests."}],practice:{intro:"Build and test Queueable Apex jobs.",steps:["Create a Queueable class that accepts a List<Contact> and standardizes email addresses to lowercase.","Enqueue the job and verify it processes records asynchronously.","Monitor the job using AsyncApexJob queries.","Add Database.AllowsCallouts and simulate an HTTP callout.","Create a second Queueable and chain it from the first.","Write a comprehensive test class with positive and edge case tests.","Compare the approach with @future — note the advantages."],expectedOutcome:"You should be able to create Queueable jobs with complex parameters, chain them, and write proper tests."},interviewQuestions:[{scenario:"Why would you use Queueable over @future?",answer:"Queueable advantages: 1) Accepts complex types (sObjects, custom classes, Lists) as parameters — @future only accepts primitives and collections of primitives. 2) Returns a Job ID for monitoring. 3) Supports job chaining (calling another Queueable from execute). 4) Can implement Database.AllowsCallouts for HTTP calls. 5) Better error tracking through AsyncApexJob. Use @future only for the simplest fire-and-forget scenarios."},{scenario:"How many Queueable jobs can you chain?",answer:"In production: you can chain up to 1 Queueable job per execute() call, but the chain can be as deep as needed. In tests: chaining depth is limited to 1 (you can only test the first job in the chain). Each enqueued job counts toward the 50 Queueable jobs per transaction limit (per execute context). For complex chains, consider using Platform Events or Batch Apex instead."},{scenario:"What is the difference between Queueable and Batch Apex?",answer:"Queueable: Single execute() call, good for moderate data volumes, supports complex parameters, chaining, faster startup. Batch: Three-phase lifecycle (start/execute/finish), processes data in chunks with per-chunk governor limits, handles up to 50 million records, better for large data volumes. Use Queueable for quick async processing; Batch for massive data operations."},{scenario:"Can you pass sObjects to a Queueable constructor?",answer:"Yes! This is one of the key advantages over @future. You can pass List<Account>, Map<Id, Contact>, or even custom wrapper classes to the Queueable constructor. The framework serializes and deserializes the objects. However, be mindful of the serialization limit (~128 KB for Queueable parameters). For very large datasets, pass IDs and re-query in execute()."},{scenario:"How do you handle errors in Queueable jobs?",answer:"Use try/catch within execute(): try { // business logic } catch (Exception e) { // Log error to Error_Log__c or publish Platform Event }. Unlike triggers, errors in Queueable don't affect the original transaction. Monitor via AsyncApexJob. For critical failures, create error log records or send notification emails. Consider implementing a retry mechanism using job chaining with a retry counter."}]},"3.19":{theory:`
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p><strong>Future methods</strong> are the simplest form of asynchronous Apex. Annotated with <code>@future</code>, they run in a separate thread with higher governor limits. They're fire-and-forget — you can't monitor them or chain them.</p>
      </div>
      <h3>@future Method Rules</h3>
      <ul>
        <li>Must be <strong>static</strong> and return <strong>void</strong></li>
        <li>Parameters must be <strong>primitive types</strong> or <strong>collections of primitives</strong> (no sObjects)</li>
        <li>Cannot call another @future method</li>
        <li>Maximum <strong>50 @future calls</strong> per transaction</li>
        <li>No guaranteed execution order or timing</li>
        <li>Add <code>(callout=true)</code> to enable HTTP callouts</li>
      </ul>
      <h3>When to Use @future</h3>
      <table>
        <thead><tr><th>Use @future When</th><th>Don't Use @future When</th></tr></thead>
        <tbody>
          <tr><td>Simple, fire-and-forget operations</td><td>Need to pass sObject parameters</td></tr>
          <tr><td>HTTP callouts from triggers</td><td>Need to chain async operations</td></tr>
          <tr><td>Avoiding mixed DML errors</td><td>Need to monitor job status</td></tr>
          <tr><td>Operations that don't need tracking</td><td>Complex async logic (use Queueable)</td></tr>
        </tbody>
      </table>
      <div class="callout callout--warning">
        <p class="callout__title">⚠️ Mixed DML Error</p>
        <p>You cannot perform DML on setup objects (User, Profile) and non-setup objects (Account, Contact) in the same transaction. Use @future to separate them into different transactions.</p>
      </div>
    `,examples:[{title:"Example 1: Basic @future Method",description:"Asynchronous processing from a trigger.",code:`public class AccountHelper {
    
    // Basic @future method
    @future
    public static void updateAccountDescriptions(Set<Id> accountIds) {
        // This runs asynchronously — separate transaction, higher limits
        List<Account> accounts = [
            SELECT Id, Name, Description, CreatedDate 
            FROM Account WHERE Id IN :accountIds
        ];
        
        for (Account acc : accounts) {
            Integer daysSinceCreation = acc.CreatedDate.date().daysBetween(Date.today());
            acc.Description = 'Account age: ' + daysSinceCreation + ' days. Last reviewed: ' + Date.today();
        }
        
        update accounts;
    }
    
    // @future with callout
    @future(callout=true)
    public static void syncToExternalSystem(Set<Id> accountIds) {
        List<Account> accounts = [SELECT Name, Industry, AnnualRevenue FROM Account WHERE Id IN :accountIds];
        
        for (Account acc : accounts) {
            HttpRequest req = new HttpRequest();
            req.setEndpoint('https://api.external.com/accounts');
            req.setMethod('POST');
            req.setHeader('Content-Type', 'application/json');
            req.setBody(JSON.serialize(acc));
            
            HttpResponse res = new Http().send(req);
            System.debug(acc.Name + ' sync: ' + res.getStatusCode());
        }
    }
}

// Called from a trigger:
trigger AccountTrigger on Account (after insert) {
    // Collect IDs (can't pass sObjects to @future)
    Set<Id> newIds = new Set<Id>();
    for (Account acc : Trigger.new) {
        newIds.add(acc.Id);
    }
    
    AccountHelper.updateAccountDescriptions(newIds);
    AccountHelper.syncToExternalSystem(newIds);
}`,language:"apex",explanation:"Pass record IDs (not sObjects) to @future methods. The method re-queries the records. Use (callout=true) for HTTP calls. Both calls happen asynchronously after the trigger completes."},{title:"Example 2: Avoiding Mixed DML Errors",description:"Separating setup and non-setup DML.",code:`// ❌ This causes a Mixed DML error:
// Account acc = new Account(Name = 'Test');
// insert acc;
// User u = [SELECT Id FROM User WHERE Id = :UserInfo.getUserId()];
// u.Title = 'Admin';
// update u; // ERROR: MIXED_DML_OPERATION

// ✅ Solution: Use @future for the setup object DML
public class UserManager {
    
    @future
    public static void updateUserTitle(Id userId, String newTitle) {
        User u = [SELECT Id, Title FROM User WHERE Id = :userId];
        u.Title = newTitle;
        update u; // No mixed DML error — different transaction
    }
}

// Now this works:
Account acc = new Account(Name = 'Test');
insert acc; // Non-setup DML

UserManager.updateUserTitle(UserInfo.getUserId(), 'Admin'); // Async — separate transaction`,language:"apex",explanation:"Mixed DML = performing DML on setup objects (User, Profile, Group) and non-setup objects (Account, Contact) in the same transaction. @future separates them into different transactions."},{title:"Example 3: Testing @future Methods",description:"How to test asynchronous future methods.",code:`@isTest
private class AccountHelperTest {
    
    @isTest
    static void testUpdateAccountDescriptions() {
        // Create test data
        List<Account> accounts = new List<Account>();
        for (Integer i = 0; i < 5; i++) {
            accounts.add(new Account(Name = 'Future Test ' + i));
        }
        insert accounts;
        
        // Collect IDs
        Set<Id> accountIds = new Map<Id, Account>(accounts).keySet();
        
        Test.startTest();
        // Call the @future method
        AccountHelper.updateAccountDescriptions(accountIds);
        Test.stopTest(); // Forces @future to execute synchronously
        
        // Verify results
        List<Account> updated = [SELECT Description FROM Account WHERE Id IN :accountIds];
        for (Account acc : updated) {
            System.assert(acc.Description.contains('Account age:'), 
                'Description should contain age info');
        }
    }
    
    @isTest
    static void testSyncWithCallout() {
        // Set up HTTP mock
        Test.setMock(HttpCalloutMock.class, new ExternalAPIMock());
        
        Account acc = new Account(Name = 'Callout Test');
        insert acc;
        
        Test.startTest();
        AccountHelper.syncToExternalSystem(new Set<Id>{acc.Id});
        Test.stopTest();
        
        // Verify (check debug logs or custom fields if applicable)
    }
}

// HTTP Mock class
public class ExternalAPIMock implements HttpCalloutMock {
    public HttpResponse respond(HttpRequest req) {
        HttpResponse res = new HttpResponse();
        res.setStatusCode(200);
        res.setBody('{"status":"success"}');
        return res;
    }
}`,language:"apex",explanation:"Test.stopTest() forces @future methods to execute synchronously. For callout methods, use Test.setMock() with an HttpCalloutMock. Always verify the results after Test.stopTest()."}],practice:{intro:"Practice @future methods and understand their limitations.",steps:["Create a @future method that updates Contact email domains to a standard format.","Call it from a trigger after Contact insert.","Create a @future(callout=true) method that simulates an API call.","Test the mixed DML workaround: insert an Account AND update a User.","Write test classes for both @future methods.","Try calling one @future from another — observe the error.","Compare the same logic implemented as @future vs Queueable."],expectedOutcome:"You should understand when to use @future, its limitations, how to test it, and when to upgrade to Queueable instead."},interviewQuestions:[{scenario:"What are the limitations of @future methods?",answer:"Key limitations: 1) Parameters must be primitive types or collections of primitives — no sObjects. 2) Cannot call another @future from a @future. 3) No return value (void only). 4) No job ID — cannot monitor or track. 5) No guaranteed execution order. 6) Cannot be called from Batch Apex. 7) Maximum 50 @future calls per transaction. For any non-trivial async work, use Queueable instead."},{scenario:"What is a Mixed DML error and how do you solve it?",answer:"A Mixed DML error occurs when you perform DML on setup objects (User, Group, GroupMember, QueueSObject, PermissionSet) and non-setup objects (Account, Contact, etc.) in the same transaction. Solution: use @future to move the setup object DML to a separate transaction. In tests, use System.runAs(testUser) to create a separate context for setup object operations."},{scenario:"Why can't you pass sObjects to @future methods?",answer:"When a @future method is queued, its parameters are serialized and stored until execution. sObject fields can change between queueing and execution time (another user might update the record). If sObjects were passed, the @future method would work with stale data. By passing IDs and re-querying, the method always gets the latest field values. This is by design for data consistency."},{scenario:"How do you decide between @future, Queueable, and Batch?",answer:"@future: Simple fire-and-forget, primitive parameters, callouts from triggers, mixed DML workarounds. Queueable: Complex parameters (sObjects, classes), job chaining needed, monitoring required, moderate data volumes. Batch: Very large data volumes (thousands to millions), need chunked processing with per-chunk limits, complex ETL operations. Rule of thumb: start with @future, upgrade to Queueable when you hit limitations, use Batch for massive data."},{scenario:"Can @future methods be called from triggers?",answer:"Yes, @future methods are commonly called from triggers for: HTTP callouts (not allowed synchronously in triggers), mixed DML operations, and offloading heavy processing. However: 1) Maximum 50 @future calls per transaction. 2) In bulk triggers (200 records), avoid calling @future per record — collect IDs and make one call. 3) Cannot call @future from Batch Apex or another @future."}]},"3.20":{theory:`
      <div class="callout callout--definition">
        <p class="callout__title">📘 Definition</p>
        <p><strong>Test Classes</strong> in Apex are classes annotated with <code>@isTest</code> that verify your code works correctly. Salesforce requires a minimum of <strong>75% code coverage</strong> across all Apex classes for deployment to production.</p>
      </div>
      <h3>Key Testing Concepts</h3>
      <ul>
        <li><strong>@isTest</strong> — Marks a class or method as a test (doesn't count against code limits)</li>
        <li><strong>@TestSetup</strong> — Method that creates shared test data once for all test methods</li>
        <li><strong>Test.startTest() / Test.stopTest()</strong> — Resets governor limits for the code between them</li>
        <li><strong>System.assert()</strong> — Verifies expected outcomes</li>
        <li><strong>Test.isRunningTest()</strong> — Checks if code is running in test context</li>
      </ul>
    `,examples:[{title:"Example 1: Test Class Structure",description:"A complete test class for an Apex trigger.",code:`@isTest
private class AccountTriggerTest {
    
    @TestSetup
    static void setupData() {
        // Create test data shared by all test methods
        List<Account> accounts = new List<Account>();
        accounts.add(new Account(Name = 'High Revenue', AnnualRevenue = 2000000));
        accounts.add(new Account(Name = 'Medium Revenue', AnnualRevenue = 750000));
        accounts.add(new Account(Name = 'Low Revenue', AnnualRevenue = 100000));
        insert accounts;
    }
    
    @isTest
    static void testHighRevenueRating() {
        // Retrieve test data
        Account acc = [SELECT Rating FROM Account WHERE Name = 'High Revenue'];
        
        // Assert
        System.assertEquals('Hot', acc.Rating, 
            'High revenue accounts should have Hot rating');
    }
    
    @isTest
    static void testBulkInsert() {
        // Test with 200 records (bulkification test)
        List<Account> bulkAccounts = new List<Account>();
        for (Integer i = 0; i < 200; i++) {
            bulkAccounts.add(new Account(
                Name = 'Test Account ' + i,
                AnnualRevenue = 2000000
            ));
        }
        
        Test.startTest();
        insert bulkAccounts;  // Fresh governor limits
        Test.stopTest();
        
        // Verify all 200 got the correct rating
        List<Account> results = [SELECT Rating FROM Account 
                                  WHERE Name LIKE 'Test Account%'];
        for (Account a : results) {
            System.assertEquals('Hot', a.Rating);
        }
    }
    
    @isTest
    static void testNegativeScenario() {
        // Test with null revenue
        Account acc = new Account(Name = 'No Revenue');
        insert acc;
        
        acc = [SELECT Rating FROM Account WHERE Name = 'No Revenue'];
        System.assertEquals('Cold', acc.Rating,
            'Accounts without revenue should default to Cold');
    }
}`,language:"apex",explanation:"@TestSetup runs once, creating data available to all test methods (each gets a fresh copy). Test.startTest()/stopTest() gives the code between them a fresh set of governor limits."}],practice:{intro:"Write a test class for your Account trigger.",steps:["In Developer Console, File → New → Apex Class.",'Name: "AccountTriggerTest".',"Add @isTest annotation and @TestSetup method.","Write test methods covering: positive case, negative case, bulk insert (200 records).","Use System.assertEquals() for assertions.","Run the test: Test → New Run → Select AccountTriggerTest → Run.","Check the Code Coverage tab to verify coverage percentage.","Fix any assertion failures."],expectedOutcome:"Your test class should pass all tests with 100% coverage on the AccountTrigger. The bulk test proves your trigger handles 200 records within governor limits."},interviewQuestions:[{scenario:"What is the difference between Test.startTest() and Test.stopTest()?",answer:'Test.startTest() marks the beginning of a code block that gets a fresh set of governor limits. Test.stopTest() marks the end and also forces any async operations (like @future, Queueable, Schedulable) to execute synchronously before the test continues. The code between them simulates a separate transaction. Use this to isolate the "unit under test" from test data setup.'},{scenario:"Should test classes only aim for 75% coverage?",answer:"No! 75% is the minimum for deployment, but best practice is 90-100% with meaningful assertions. High coverage without assertions is meaningless — it proves the code doesn't crash but doesn't verify correctness. Every test method should have System.assert() calls verifying expected outcomes. Test positive cases, negative cases, bulk scenarios, and edge cases."},{scenario:"How do you test code that makes HTTP callouts?",answer:"Use Mock callouts. Create a class implementing HttpCalloutMock that returns a predefined response. In the test, register it with Test.setMock(HttpCalloutMock.class, new MyMock()). The actual HTTP callout is intercepted and the mock response is returned. This is necessary because real HTTP callouts are not allowed in test methods."},{scenario:"Can test methods see data in the org?",answer:"By default, no. Test methods are isolated — they can only see data created within the test context (@TestSetup or within the test method). To access org data, use @isTest(SeeAllData=true), but this is strongly discouraged because it makes tests dependent on org data that may change. Always create your own test data for predictable, portable tests."},{scenario:"What is the purpose of Test.isRunningTest()?",answer:"Test.isRunningTest() returns true when code is executing in a test context. Common use: skipping real HTTP callouts, bypassing certain validations during testing, or using test-specific configuration. Example: if (!Test.isRunningTest()) { HttpResponse resp = http.send(req); } else { // use mock data }. However, prefer using proper mocks over Test.isRunningTest() checks."}]}};export{e as module3Content};
