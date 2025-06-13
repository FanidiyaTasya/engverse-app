export const Card = (title, value, bgColorClass, textColorClass, iconSvg) => {
    return `
        <div class="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
            <div>
                <p class="text-sm font-medium text-gray-500">${title}</p>
                <p class="text-3xl font-bold text-gray-900 mt-1">${value}</p>
            </div>
            <div class="p-3 rounded-full ${bgColorClass} bg-opacity-20 ${textColorClass}">
                ${iconSvg}
            </div>
        </div>
    `;
};