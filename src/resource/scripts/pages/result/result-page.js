// export default class ResultPage {
//   async render() {
//     return `
//     <a href="#/dashboard" class="fixed top-5 right-10 z-50 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center cursor-pointer transition-all hover:bg-gray-100 hover:scale-110">
//         <i class="fas fa-times text-gray-600 text-xl"></i>
//     </a>

//     <section class="container mx-auto px-4 py-8 max-w-4xl">
//         <div class="bg-white rounded-xl shadow-sm overflow-hidden">
//             <div class="bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-8 text-white text-center">
//                 <div class="max-w-md mx-auto">
//                     <h2 class="text-2xl font-bold mb-2">Reading Practice Result</h2>
//                     <div class="flex justify-center items-end gap-2 mb-4">
//                         <span class="text-5xl font-bold">8</span>
//                         <span class="text-2xl text-blue-100 pb-1">/10</span>
//                     </div>

//                     <div class="relative pt-1">
//                         <div class="flex items-center justify-between mb-1">
//                             <span class="text-sm font-medium">Accuracy</span>
//                             <span class="text-sm font-medium">80%</span>
//                         </div>
//                         <div class="w-full bg-blue-200 rounded-full h-2.5">
//                             <div class="bg-white h-2.5 rounded-full" style="width: 80%"></div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div class="p-6 border-b">
//                 <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
//                     <div class="text-center">
//                         <p class="text-gray-500 text-sm">Time Spent</p>
//                         <p class="text-xl font-bold">12:45</p>
//                         <p class="text-xs text-gray-500">minutes</p>
//                     </div>
//                     <div class="text-center">
//                         <p class="text-gray-500 text-sm">Correct</p>
//                         <p class="text-xl font-bold text-green-600">8</p>
//                         <p class="text-xs text-gray-500">questions</p>
//                     </div>
//                     <div class="text-center">
//                         <p class="text-gray-500 text-sm">Incorrect</p>
//                         <p class="text-xl font-bold text-red-600">2</p>
//                         <p class="text-xs text-gray-500">questions</p>
//                     </div>
//                 </div>
//             </div>

//             <div class="p-6">
//                 <div class="question-card mb-6 p-4 border rounded-lg">
//                     <div class="flex justify-between items-start mb-3">
//                         <div>
//                             <span
//                                 class="font-medium bg-green-100 text-green-700 px-2 py-1 rounded text-xs">Correct</span>
//                             <span class="ml-2 text-gray-500 text-sm">Question 1</span>
//                         </div>
//                     </div>

//                     <div class="prose max-w-none mb-3">
//                         <p class="text-sm">"The Industrial Revolution marked a major turning
//                             point in history..."</p><br>
//                         <p class="text-sm mt-2">What was the primary significance of the
//                             Industrial Revolution?</p>
//                     </div>

//                     <div class="space-y-2 text-sm mb-3">
//                         <div class="flex items-start">
//                             <span class="mr-2 font-medium">A.</span>
//                             <span>It began in England</span>
//                         </div>
//                         <div class="flex items-start bg-green-50 p-2 rounded border border-green-200">
//                             <span class="mr-2 font-medium">B.</span>
//                             <span>It transformed manufacturing processes</span>
//                         </div>
//                         <div class="flex items-start">
//                             <span class="mr-2 font-medium">C.</span>
//                             <span>It improved agricultural techniques</span>
//                         </div>
//                         <div class="flex items-start">
//                             <span class="mr-2 font-medium">D.</span>
//                             <span>It reduced urban populations</span>
//                         </div>
//                     </div>

//                     <div class="feedback p-3 bg-blue-50 rounded-lg">
//                         <h4 class="font-medium text-blue-800 mb-1 flex items-center">
//                             <i class="fas fa-lightbulb text-yellow-500 mr-2"></i>
//                             Feedback
//                         </h4>
//                         <p class="text-sm">Excellent choice! Option B correctly identifies the main point about
//                             transforming manufacturing, which is explicitly stated in the passage.</p>
//                     </div>
//                 </div>

//                 <div class="question-card mb-6 p-4 border rounded-lg">
//                     <div class="flex justify-between items-start mb-3">
//                         <div>
//                             <span class="font-medium bg-red-100 text-red-700 px-2 py-1 rounded text-xs">Incorrect</span>
//                             <span class="ml-2 text-gray-500 text-sm">Question 2</span>
//                         </div>
//                     </div>

//                     <div class="prose max-w-none mb-3">
//                         <p class="text-sm">"While steam power was important, the development
//                             of machine tools was equally crucial..."</p><br>
//                         <p class="text-sm mt-2">What does the author emphasize about machine
//                             tools?</p>
//                     </div>

//                     <div class="space-y-2 text-sm mb-3">
//                         <div class="flex items-start">
//                             <span class="mr-2 font-medium">A.</span>
//                             <span>They were invented after steam power</span>
//                         </div>
//                         <div class="flex items-start bg-red-50 p-2 rounded border border-red-200">
//                             <span class="mr-2 font-medium">B.</span>
//                             <span>They were less important than steam power</span>
//                         </div>
//                         <div class="flex items-start bg-green-50 p-2 rounded border border-green-200">
//                             <span class="mr-2 font-medium">C.</span>
//                             <span>They were equally important as steam power</span>
//                         </div>
//                         <div class="flex items-start">
//                             <span class="mr-2 font-medium">D.</span>
//                             <span>They replaced steam power completely</span>
//                         </div>
//                     </div>

//                     <div class="feedback p-3 bg-blue-50 rounded-lg">
//                         <h4 class="font-medium text-blue-800 mb-1 flex items-center">
//                             <i class="fas fa-lightbulb text-yellow-500 mr-2"></i>
//                             Feedback
//                         </h4>
//                         <p class="text-sm">The correct answer is C. The passage uses the phrase "equally crucial" to
//                             show machine tools were just as important as steam power. Watch for contrast words like
//                             "while" that indicate balanced importance.</p>
//                     </div>
//                 </div>
//             </div>

//             <div class="p-6 flex flex-col sm:flex-row gap-3">
//                 <a href="#/dashboard" class="flex-1 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2">
//                     <i class="fas fa-book-open"></i> Back to Dashboard
//                 </a>
//                 <button class="flex-1 py-3 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition flex items-center justify-center gap-2">
//                     <i class="fas fa-redo"></i> Try Again
//                 </button>
//             </div>
//         </div>
//     </section>
//     `;
//   }

//   async afterRender() {
//   }
// }
