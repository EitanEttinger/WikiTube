'use strict'

function debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout)
            func(...args)
        };

        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}

// console.log('hi')
// console.log('hi')
// console.log('hi')

// const debouncedLog = debounce(console.log, 500)
// debouncedLog('hi')
// debouncedLog('hello')
// debouncedLog('hi')
// debouncedLog('hi')
// debouncedLog('hi')
// debouncedLog('hi')
// debouncedLog('hi')
// debouncedLog('hi',5,6,7)