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
    madeBy: 'Made with ❤️ by nechn and claude',
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
        creativity:    'creativity',
    },

    suggestions: {
        // Health
        sport:             { text: '150 minutes of moderate physical activity every week', linkLabel: 'WHO on physical activity' },
        sleep:             { text: 'Establish a sleep routine — 7–9 hours consistently' },
        checkup:           { text: 'Get an annual medical check-up' },
        'oncoscreening-f': { text: 'Mammography and cervical cancer screening every 2 years' },
        'oncoscreening-m': { text: 'Check PSA and get colorectal cancer screening' },
        meditation:        { text: 'Meditate for 10 minutes every day' },
        dental:            { text: 'Get an annual dental check-up and cleaning' },
        alcohol:           { text: 'Track and consciously reduce your alcohol consumption' },
        'strength-training': { text: 'Add strength training — twice a week' },
        'eye-checkup':     { text: 'Get your eyes and vision checked' },
        'mental-health':   { text: 'See a therapist or counselor' },
        posture:           { text: 'Work on your posture and strengthen your back muscles' },

        // Education
        language:          { text: 'Learn a new language to conversational level', linkLabel: 'Duolingo' },
        books:             { text: ({ yearsLeft }) => `Read ~${Math.round(yearsLeft * 12)} more books — one per month` },
        skill:             { text: 'Master one new professional skill' },
        instrument:        { text: 'Learn to play a musical instrument' },
        course:            { text: 'Complete a serious course in a completely unfamiliar field' },
        writing:           { text: 'Write regularly: a journal, notes, essays — at least once a week' },
        'public-speaking': { text: 'Improve your public speaking skills' },

        // Relationships
        friends:           { text: "Call a friend you haven't spoken to in a while" },
        'family-time':     { text: 'Spend a whole day with loved ones without phones' },
        letter:            { text: 'Write a letter to the most important person in your life' },
        parents:           { text: 'Call or visit your parents more often than you usually do' },
        'new-friends':     { text: 'Intentionally make a new friend' },
        therapy:           { text: 'Try therapy — at least 10 sessions' },
        forgiveness:       { text: "Let go of one long-held grudge you've been carrying" },
        mentor:            { text: 'Become a mentor for someone 10–15 years younger' },
        community:         { text: "Join a community around an interest you've been putting off" },

        // Travel
        'bucket-list':     { text: 'Make a list of places you want to visit' },
        'one-trip':        { text: ({ yearsLeft }) => `Visit ${Math.round(yearsLeft)} new places — one per year` },
        'solo-trip':       { text: 'Travel somewhere on your own' },
        'home-visit':      { text: 'Return to the place where you grew up' },
        'natural-wonder':  { text: 'See a natural wonder in person — mountains, ocean, or desert' },
        'live-abroad':     { text: 'Live in another country for at least a month' },

        // Legacy
        memories:          { text: 'Record family stories and memories for your loved ones' },
        will:              { text: 'Review or write your will' },
        journal:           { text: 'Start keeping a personal journal — even a few lines a week' },
        volunteer:         { text: 'Volunteer regularly for a cause that matters to you' },
        teach:             { text: "Teach someone a specific skill you're good at" },
        donate:            { text: 'Set up small regular charitable donations' },

        // Finance
        'financial-plan':  { text: 'Create a personal financial plan for the next 10 years' },
        pension:           { text: 'Sort out your retirement savings' },
        'emergency-fund':  { text: 'Build an emergency fund — 6 months of expenses' },
        'index-funds':     { text: 'Start investing in diversified index funds' },
        insurance:         { text: 'Review your life and health insurance coverage' },

        // Creativity
        'create-art':      { text: 'Make something with your hands: draw, sculpt, build' },
        photography:       { text: 'Document your life through regular photography' },
        'cook-signature':  { text: 'Master 5 dishes that become your signature cuisine' },
        'write-story':     { text: 'Write a short essay or story about your life' },
        'music-make':      { text: 'Try composing your own piece of music' },
        garden:            { text: 'Grow something edible — even on a windowsill' },
    },
}
