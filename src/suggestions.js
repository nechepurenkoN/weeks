// id         — уникальный ключ; тексты и категории живут в локалях (src/i18n/*.js)
// categoryKey — ключ в locale.categories
// link?       — { url } — только URL; label тоже в локали (locale.suggestions[id].linkLabel)
// when?       — (ctx) => boolean; если отсутствует — показывается всегда
//
// ctx: { age, weeksLeft, yearsLeft, percentLived, sex }
//   sex: 'm' | 'f'

export const suggestions = [
    // ── Здоровье ────────────────────────────────────────────────
    { id: 'sport',             categoryKey: 'health',        link: { url: 'https://www.who.int/ru/news-room/fact-sheets/detail/physical-activity' } },
    { id: 'sleep',             categoryKey: 'health' },
    { id: 'checkup',           categoryKey: 'health',        when: ({ age }) => age >= 30 },
    { id: 'oncoscreening-f',   categoryKey: 'health',        when: ({ sex, age }) => sex === 'f' && age >= 40 },
    { id: 'oncoscreening-m',   categoryKey: 'health',        when: ({ sex, age }) => sex === 'm' && age >= 45 },

    // ── Образование ─────────────────────────────────────────────
    { id: 'language',          categoryKey: 'education',     link: { url: 'https://duolingo.com' }, when: ({ yearsLeft }) => yearsLeft >= 3 },
    { id: 'books',             categoryKey: 'education',     when: ({ yearsLeft }) => yearsLeft >= 1 },
    { id: 'skill',             categoryKey: 'education',     when: ({ yearsLeft }) => yearsLeft >= 2 },

    // ── Отношения ───────────────────────────────────────────────
    { id: 'friends',           categoryKey: 'relationships' },
    { id: 'family-time',       categoryKey: 'relationships' },
    { id: 'letter',            categoryKey: 'relationships', when: ({ percentLived }) => percentLived >= 50 },

    // ── Путешествия ─────────────────────────────────────────────
    { id: 'bucket-list',       categoryKey: 'travel',        when: ({ yearsLeft }) => yearsLeft >= 3 },
    { id: 'one-trip',          categoryKey: 'travel',        when: ({ yearsLeft }) => yearsLeft >= 1 },

    // ── Наследие ────────────────────────────────────────────────
    { id: 'memories',          categoryKey: 'legacy',        when: ({ age, percentLived }) => age >= 50 || percentLived >= 60 },
    { id: 'will',              categoryKey: 'legacy',        when: ({ age }) => age >= 40 },

    // ── Финансы ─────────────────────────────────────────────────
    { id: 'financial-plan',    categoryKey: 'finance',       when: ({ age, yearsLeft }) => age >= 25 && yearsLeft >= 10 },
    { id: 'pension',           categoryKey: 'finance',       when: ({ age, yearsLeft }) => age >= 30 && yearsLeft >= 5 },
]
