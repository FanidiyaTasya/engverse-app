export const HistoryTestTable = () => {
    const data = [
        { date: '10 May 2023', score: 567, action: 'View' },
        { date: '10 Apr 2023', score: 564, action: 'View' },
        { date: '12 Apr 2023', score: 499, action: 'View' },
    ];

    const rows = data.map(item => `
        <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.date}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.score}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a href="#" class="text-blue-600 hover:text-blue-900">${item.action}</a>
            </td>
        </tr>
    `).join('');

    return `
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    ${rows}
                </tbody>
            </table>
        </div>
    `;
};