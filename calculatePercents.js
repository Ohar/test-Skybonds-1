// Maybe there should be another “MAX_LEN”? It mostly depends on the environment and such stuff.
const MAX_LEN = 1000000

const PERCENT_COEF = 100
const DIGIT_COUNT = 3

const DIGIT_COEF = Math.pow(10, DIGIT_COUNT)

let FRACTION_PART_DEFAULT = ''

for (let i = 1; i <= DIGIT_COUNT; i++) {
    FRACTION_PART_DEFAULT += '0'
}


module.exports = partNumberArr => {
    if (partNumberArr.length > MAX_LEN) {
        throw new Error(`Too big array (${partNumberArr.length}) to handle at once.`)
    }

    const summ = partNumberArr.reduce(
        (summCounter, num) => summCounter + Number(num),
        0
    )

    return partNumberArr.map(
        num => {
            const [intPart, fractPart] = String(
                Math.round((num * DIGIT_COEF * PERCENT_COEF) / summ) / DIGIT_COEF
            )
                .split('.')

            const fractionPartText = fractPart
                ? `${fractPart}${FRACTION_PART_DEFAULT.slice(fractPart.length)}`
                : '000'

            return `${intPart}.${fractionPartText}`
        }
    )
}
