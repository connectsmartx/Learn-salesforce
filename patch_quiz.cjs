const fs = require('fs');
let code = fs.readFileSync('js/components/quiz-engine.js', 'utf8');

code = code.replace(/export async function renderQuizStart\(moduleId\) \{/, 'export async function renderQuizStart(moduleId, difficulty) {');

code = code.replace(/const module = getModule\(moduleId\);\s*if \(!module\) \{\s*main\.innerHTML = \'<div class="lesson-error"><h2>Module Not Found<\/h2><a href="#\/">Go Home<\/a><\/div>\';\s*return;\s*\}/, 
`const module = getModule(moduleId);
  if (!module || !difficulty) {
    main.innerHTML = '<div class="lesson-error"><h2>Quiz Not Found</h2><a href="#/quiz-hub">Go Back</a></div>';
    return;
  }`);

code = code.replace(/const quiz = quizzes\[moduleId\];\s*const previousScore = store\.getQuizScore\(moduleId\);/,
`const quiz = quizzes[moduleId] ? quizzes[moduleId][difficulty] : null;
  const storeKey = moduleId + '_' + difficulty;
  const previousScore = store.getQuizScore(storeKey);
  const diffTitle = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);`);

code = code.replace(/<h1 class="quiz-start__title">\$\{module\.title\} Quiz<\/h1>/g,
`<h1 class="quiz-start__title">\${module.title} (\${diffTitle})</h1>`);

code = code.replace(/<a href="#\/" class="btn btn--ghost">/g, '<a href="#/quiz-hub" class="btn btn--ghost">');

code = code.replace(/startQuiz\(moduleId, quiz\);/, 'startQuiz(moduleId, difficulty, quiz);');
code = code.replace(/startQuiz\(moduleId, wrongQuestions\);/, 'startQuiz(moduleId, difficulty, wrongQuestions);');

code = code.replace(/function startQuiz\(moduleId, questions\) \{/, 'function startQuiz(moduleId, difficulty, questions) {');

code = code.replace(/currentQuiz = \{ moduleId, questions: shuffleArray\(\[\.\.\.questions\]\) \};/,
'currentQuiz = { moduleId, difficulty, storeKey: moduleId + "_" + difficulty, questions: shuffleArray([...questions]) };');

code = code.replace(/store\.saveQuizScore\(currentQuiz\.moduleId,/g, 'store.saveQuizScore(currentQuiz.storeKey,');

code = code.replace(/<button class="btn btn--primary btn--lg" id="quizTryAgainBtn">🔄 Try Again<\/button>/,
`<a href="#/quiz/\${currentQuiz.moduleId}/\${currentQuiz.difficulty}" class="btn btn--primary btn--lg">🔄 Try Again</a>`);

code = code.replace(/<a href="#\/" class="btn btn--ghost btn--lg">🏠 Back to Module<\/a>/,
'<a href="#/quiz-hub" class="btn btn--ghost btn--lg">🏠 Back to Hub</a>');

code = code.replace(/document\.getElementById\('quizTryAgainBtn'\)\?\.addEventListener\('click', \(\) => \{\s*renderQuizStart\(currentQuiz\.moduleId\);\s*\}\);/, '');

fs.writeFileSync('js/components/quiz-engine.js', code, 'utf8');
console.log('Fixed quiz-engine.js');
