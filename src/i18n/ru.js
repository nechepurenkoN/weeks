export const ru = {
    localeCode: 'ru-RU',

    heading: 'Сколько тебе недель осталось?',
    whatToDo: 'Что можно успеть',

    countryLabel: 'Страна',
    countryPlaceholder: 'Выберите страну',
    countryNotFound: 'Не найдено',

    sexLabel: 'Пол',
    male: '👨 Мужчина',
    female: '👩 Женщина',

    dateBornLabel: 'Дата рождения',
    datePlaceholder: 'ДД.ММ.ГГГГ',
    dateInvalid: 'Неверная дата',

    noSuggestions: 'Введите дату рождения, чтобы увидеть персональные рекомендации',
    noGrid: 'Выберите страну и пол, чтобы увидеть сетку недель',

    counterLived: 'Прожито',
    counterWeeks: 'недель',
    counterLeft: 'Осталось',
    counterYearsLeft: y => `(${y} лет)`,
    lifeExpLabel: 'Ожидаемая продолжительность жизни:',
    lifeExpYears: y => `(${y} лет)`,

    yearsAxis: 'Годы',
    weeksAxis: 'Нед.',
    months: ['янв','фев','мар','апр','май','июн','июл','авг','сен','окт','ноя','дек'],
    tooltipYearWeek: (yr, wk) => `Год ${yr}, неделя ${wk}`,

    categories: {
        health:        'здоровье',
        education:     'образование',
        relationships: 'отношения',
        travel:        'путешествия',
        legacy:        'наследие',
        finance:       'финансы',
    },

    suggestions: {
        sport:             { text: '150 минут умеренной физической активности каждую неделю', linkLabel: 'ВОЗ о физактивности' },
        sleep:             { text: 'Наладить режим сна — 7–9 часов стабильно' },
        checkup:           { text: 'Пройти ежегодное медицинское обследование' },
        'oncoscreening-f': { text: 'Маммография и скрининг рака шейки матки раз в 2 года' },
        'oncoscreening-m': { text: 'Проверить ПСА и пройти скрининг колоректального рака' },
        language:          { text: 'Выучить новый язык до разговорного уровня', linkLabel: 'Duolingo' },
        books:             { text: ({ yearsLeft }) => `Прочитать ещё ~${Math.round(yearsLeft * 12)} книг — по одной в месяц` },
        skill:             { text: 'Освоить один новый профессиональный навык' },
        friends:           { text: 'Позвонить другу, с которым давно не общались' },
        'family-time':     { text: 'Провести целый день с близкими без телефона' },
        letter:            { text: 'Написать письмо самому важному человеку в жизни' },
        'bucket-list':     { text: 'Составить список мест, куда хочется попасть' },
        'one-trip':        { text: ({ yearsLeft }) => `Посетить ${Math.round(yearsLeft)} новых мест — по одному в год` },
        memories:          { text: 'Записать семейные истории и воспоминания для близких' },
        will:              { text: 'Проверить или составить завещание' },
        'financial-plan':  { text: 'Составить личный финансовый план на 10 лет вперёд' },
        pension:           { text: 'Разобраться с накоплениями на пенсию' },
    },
}
