let options = {
    widht: 1366,
    height: 768,
    bg: 'red',
    font: {
        size: '16px',
        color: 'white'
    }
};

console.log(JSON.parse(JSON.stringify(options)))

n = JSON.stringify(options)

console.log(JSON.parse(n))


console.log(n)