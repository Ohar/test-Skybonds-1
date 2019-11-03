const chai = require('chai')
const calculatePercents = require('./../calculatePercents')

describe(
    'calculatePercents',
    () => {
        it(
            'Is a function',
            () => chai.assert.isFunction(calculatePercents)
        )

        it(
            'Returns an Array',
            () => chai.assert.isArray(calculatePercents([]))
        )

        describe(
            'Calculation',
            () => {
                [
                    {
                        input: ['1.5', '3', '6', '1.5'],
                        expectedString: `["12.500","25.000","50.000","12.500"]`,
                    },
                    {
                        input: ['2', '4', '6'],
                        expectedString: `["16.667","33.333","50.000"]`,
                    },
                ]
                    .forEach(
                        ({input, expectedString}) => {
                            it(
                                `${input} → ${expectedString}`,
                                () => chai.assert.equal(expectedString, JSON.stringify(calculatePercents(input)))
                            )
                        }
                    )
            }
        )

        describe(
            'Errors',
            () => {
                const smallArraySize = 5

                it(
                    'Does not throw Error on small array',
                    () => chai.assert.doesNotThrow(
                        function () {
                            calculatePercents(new Array(smallArraySize))
                        },
                        `Too big array (${smallArraySize}) to handle at once.`
                    )
                )

                const bigArraySize = 10000000

                it(
                    'Throw Error on big array',
                    () => {
                        chai
                            .expect(
                                function () {
                                    calculatePercents(new Array(bigArraySize))
                                }
                            )
                            .to
                            .throw(`Too big array (${bigArraySize}) to handle at once.`)
                    }
                )
            }
        )
    }
)
