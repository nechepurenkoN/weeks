export const en = {
    localeCode: 'en-US',

    heading: 'How many weeks do you have left?',
    whatToDo: 'What to do with them',

    countryLabel: 'Country',
    countryPlaceholder: 'Select country',
    countryNotFound: 'Not found',

    sexLabel: 'Sex',
    male: '👨 Male',
    female: '👩 Female',

    dateBornLabel: 'Date of birth',
    datePlaceholder: 'DD.MM.YYYY',
    dateInvalid: 'Invalid date',

    noSuggestions: 'Enter your date of birth to see personal recommendations',
    noGrid: 'Select country and sex to see the weeks grid',

    counterLived: 'Lived',
    counterWeeks: 'weeks',
    counterLeft: 'Left',
    counterYearsLeft: y => `(${y} yrs)`,
    lifeExpLabel: 'Life expectancy:',
    lifeExpYears: y => `(${y} yrs)`,

    yearsAxis: 'Years',
    weeksAxis: 'Wks',
    months: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    tooltipYearWeek: (yr, wk) => `Year ${yr}, week ${wk}`,

    categories: {
        health:        'health',
        education:     'education',
        relationships: 'relationships',
        travel:        'travel',
        legacy:        'legacy',
        finance:       'finance',
    },

    suggestions: {
        sport:             { text: '150 minutes of moderate physical activity every week', linkLabel: 'WHO on physical activity' },
        sleep:             { text: 'Establish a sleep routine — 7–9 hours consistently' },
        checkup:           { text: 'Get an annual medical check-up' },
        'oncoscreening-f': { text: 'Mammography and cervical cancer screening every 2 years' },
        'oncoscreening-m': { text: 'Check PSA and get colorectal cancer screening' },
        language:          { text: 'Learn a new language to conversational level', linkLabel: 'Duolingo' },
        books:             { text: ({ yearsLeft }) => `Read ~${Math.round(yearsLeft * 12)} more books — one per month` },
        skill:             { text: 'Master one new professional skill' },
        friends:           { text: "Call a friend you haven't spoken to in a while" },
        'family-time':     { text: 'Spend a whole day with loved ones without phones' },
        letter:            { text: 'Write a letter to the most important person in your life' },
        'bucket-list':     { text: 'Make a list of places you want to visit' },
        'one-trip':        { text: ({ yearsLeft }) => `Visit ${Math.round(yearsLeft)} new places — one per year` },
        memories:          { text: 'Record family stories and memories for your loved ones' },
        will:              { text: 'Review or write your will' },
        'financial-plan':  { text: 'Create a personal financial plan for the next 10 years' },
        pension:           { text: 'Sort out your retirement savings' },
    },
}
