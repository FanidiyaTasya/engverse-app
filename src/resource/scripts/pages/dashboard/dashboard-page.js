import { Card } from './cards';
import { ScoreProgressionChart } from './chart';
import { HistoryTestTable } from './table';



export default class DashboardPage {
  async render() {
    return `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <h1 class="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    ${Card('Total Test', '5', 'bg-blue-500', 'text-blue-600', '<svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M3 1a1 1 0 000 2h14a1 1 0 000-2H3zM3 8a1 1 0 000 2h14a1 1 0 000-2H3zM3 15a1 1 0 000 2h14a1 1 0 000-2H3z"></path></svg>')}
                    ${Card('Total Users', '---', 'bg-green-500', 'text-green-600', '<svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"></path></svg>')}
                    ${Card('Total Progress', '---', 'bg-purple-500', 'text-purple-600', '<svg class="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 10.414V14a1 1 0 102 0v-3.586l1.293 1.293a1 1 0 001.414-1.414z" clip-rule="evenodd"></path></svg>')}
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div class="bg-white shadow rounded-lg p-6">
                        <h2 class="text-xl font-semibold text-gray-800 mb-4">Score Progression</h2>
                        ${ScoreProgressionChart()}
                    </div>

                    <div class="bg-white shadow rounded-lg p-6">
                        <h2 class="text-xl font-semibold text-gray-800 mb-4">History Test</h2>
                        ${HistoryTestTable()}
                    </div>
                </div>
            </div>
        `;
  }

  async afterRender() {
    
  }
}
