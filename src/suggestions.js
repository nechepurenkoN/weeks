// Каждая подсказка:
//   id       — уникальный ключ
//   category — группа (отображается как заголовок секции)
//   text     — строка или функция (ctx) => строка для динамического контента
//   link?    — { label, url }
//   when?    — (ctx) => boolean; если отсутствует — показывается всегда
//
// ctx: { age, weeksLeft, yearsLeft, percentLived, sex }
//   sex: 'm' | 'f'

export const suggestions = [
    // ── Здоровье ────────────────────────────────────────────────
    {
        id: 'sport',
        category: 'здоровье',
        text: '150 минут умеренной физической активности каждую неделю',
        link: { label: 'ВОЗ о физактивности', url: 'https://www.who.int/ru/news-room/fact-sheets/detail/physical-activity' },
    },
    {
        id: 'sleep',
        category: 'здоровье',
        text: 'Наладить режим сна — 7–9 часов стабильно',
    },
    {
        id: 'checkup',
        category: 'здоровье',
        text: 'Пройти ежегодное медицинское обследование',
        when: ({ age }) => age >= 30,
    },
    {
        id: 'oncoscreening-f',
        category: 'здоровье',
        text: 'Маммография и скрининг рака шейки матки раз в 2 года',
        when: ({ sex, age }) => sex === 'f' && age >= 40,
    },
    {
        id: 'oncoscreening-m',
        category: 'здоровье',
        text: 'Проверить ПСА и пройти скрининг колоректального рака',
        when: ({ sex, age }) => sex === 'm' && age >= 45,
    },

    // ── Образование ─────────────────────────────────────────────
    {
        id: 'language',
        category: 'образование',
        text: 'Выучить новый язык до разговорного уровня',
        link: { label: 'Duolingo', url: 'https://duolingo.com' },
        when: ({ yearsLeft }) => yearsLeft >= 3,
    },
    {
        id: 'books',
        category: 'образование',
        text: ({ yearsLeft }) => `Прочитать ещё ~${Math.round(yearsLeft * 12)} книг — по одной в месяц`,
        when: ({ yearsLeft }) => yearsLeft >= 1,
    },
    {
        id: 'skill',
        category: 'образование',
        text: 'Освоить один новый профессиональный навык',
        when: ({ yearsLeft }) => yearsLeft >= 2,
    },

    // ── Отношения ───────────────────────────────────────────────
    {
        id: 'friends',
        category: 'отношения',
        text: 'Позвонить другу, с которым давно не общались',
    },
    {
        id: 'family-time',
        category: 'отношения',
        text: 'Провести целый день с близкими без телефона',
    },
    {
        id: 'letter',
        category: 'отношения',
        text: 'Написать письмо самому важному человеку в жизни',
        when: ({ percentLived }) => percentLived >= 50,
    },

    // ── Путешествия ─────────────────────────────────────────────
    {
        id: 'bucket-list',
        category: 'путешествия',
        text: 'Составить список мест, куда хочется попасть',
        when: ({ yearsLeft }) => yearsLeft >= 3,
    },
    {
        id: 'one-trip',
        category: 'путешествия',
        text: ({ yearsLeft }) => `Посетить ${Math.round(yearsLeft)} новых мест — по одному в год`,
        when: ({ yearsLeft }) => yearsLeft >= 1,
    },

    // ── Наследие ────────────────────────────────────────────────
    {
        id: 'memories',
        category: 'наследие',
        text: 'Записать семейные истории и воспоминания для близких',
        when: ({ age, percentLived }) => age >= 50 || percentLived >= 60,
    },
    {
        id: 'will',
        category: 'наследие',
        text: 'Проверить или составить завещание',
        when: ({ age }) => age >= 40,
    },

    // ── Финансы ─────────────────────────────────────────────────
    {
        id: 'financial-plan',
        category: 'финансы',
        text: 'Составить личный финансовый план на 10 лет вперёд',
        when: ({ age, yearsLeft }) => age >= 25 && yearsLeft >= 10,
    },
    {
        id: 'pension',
        category: 'финансы',
        text: 'Разобраться с накоплениями на пенсию',
        when: ({ age, yearsLeft }) => age >= 30 && yearsLeft >= 5,
    },
]
