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
    { id: 'meditation',        categoryKey: 'health' },
    { id: 'dental',            categoryKey: 'health',        when: ({ age }) => age >= 20 },
    { id: 'alcohol',           categoryKey: 'health' },
    { id: 'strength-training', categoryKey: 'health' },
    { id: 'eye-checkup',       categoryKey: 'health',        when: ({ age }) => age >= 35 },
    { id: 'mental-health',     categoryKey: 'health' },
    { id: 'posture',           categoryKey: 'health' },

    // ── Образование ─────────────────────────────────────────────
    { id: 'language',          categoryKey: 'education',     link: { url: 'https://duolingo.com' }, when: ({ yearsLeft }) => yearsLeft >= 3 },
    { id: 'books',             categoryKey: 'education',     when: ({ yearsLeft }) => yearsLeft >= 1 },
    { id: 'skill',             categoryKey: 'education',     when: ({ yearsLeft }) => yearsLeft >= 2 },
    { id: 'instrument',        categoryKey: 'education',     when: ({ yearsLeft }) => yearsLeft >= 3 },
    { id: 'course',            categoryKey: 'education',     when: ({ yearsLeft }) => yearsLeft >= 1 },
    { id: 'writing',           categoryKey: 'education' },
    { id: 'public-speaking',   categoryKey: 'education',     when: ({ age, yearsLeft }) => age < 65 && yearsLeft >= 2 },

    // ── Отношения ───────────────────────────────────────────────
    { id: 'friends',           categoryKey: 'relationships' },
    { id: 'family-time',       categoryKey: 'relationships' },
    { id: 'letter',            categoryKey: 'relationships', when: ({ percentLived }) => percentLived >= 50 },
    { id: 'parents',           categoryKey: 'relationships', when: ({ age }) => age >= 18 },
    { id: 'new-friends',       categoryKey: 'relationships' },
    { id: 'therapy',           categoryKey: 'relationships' },
    { id: 'forgiveness',       categoryKey: 'relationships', when: ({ percentLived }) => percentLived >= 30 },
    { id: 'mentor',            categoryKey: 'relationships', when: ({ age }) => age >= 28 },
    { id: 'community',         categoryKey: 'relationships' },

    // ── Путешествия ─────────────────────────────────────────────
    { id: 'bucket-list',       categoryKey: 'travel',        when: ({ yearsLeft }) => yearsLeft >= 3 },
    { id: 'one-trip',          categoryKey: 'travel',        when: ({ yearsLeft }) => yearsLeft >= 1 },
    { id: 'solo-trip',         categoryKey: 'travel',        when: ({ yearsLeft }) => yearsLeft >= 2 },
    { id: 'home-visit',        categoryKey: 'travel' },
    { id: 'natural-wonder',    categoryKey: 'travel',        when: ({ yearsLeft }) => yearsLeft >= 3 },
    { id: 'live-abroad',       categoryKey: 'travel',        when: ({ age, yearsLeft }) => age < 55 && yearsLeft >= 5 },

    // ── Наследие ────────────────────────────────────────────────
    { id: 'memories',          categoryKey: 'legacy',        when: ({ age, percentLived }) => age >= 50 || percentLived >= 60 },
    { id: 'will',              categoryKey: 'legacy',        when: ({ age }) => age >= 40 },
    { id: 'journal',           categoryKey: 'legacy' },
    { id: 'volunteer',         categoryKey: 'legacy' },
    { id: 'teach',             categoryKey: 'legacy',        when: ({ age }) => age >= 25 },
    { id: 'donate',            categoryKey: 'legacy',        when: ({ age }) => age >= 22 },

    // ── Финансы ─────────────────────────────────────────────────
    { id: 'financial-plan',    categoryKey: 'finance',       when: ({ age, yearsLeft }) => age >= 25 && yearsLeft >= 10 },
    { id: 'pension',           categoryKey: 'finance',       when: ({ age, yearsLeft }) => age >= 30 && yearsLeft >= 5 },
    { id: 'emergency-fund',    categoryKey: 'finance',       when: ({ age, yearsLeft }) => age >= 22 && yearsLeft >= 10 },
    { id: 'index-funds',       categoryKey: 'finance',       when: ({ age, yearsLeft }) => age < 55 && yearsLeft >= 10 },
    { id: 'insurance',         categoryKey: 'finance',       when: ({ age }) => age >= 28 },

    // ── Творчество ──────────────────────────────────────────────
    { id: 'create-art',        categoryKey: 'creativity' },
    { id: 'photography',       categoryKey: 'creativity' },
    { id: 'cook-signature',    categoryKey: 'creativity' },
    { id: 'write-story',       categoryKey: 'creativity',   when: ({ percentLived }) => percentLived >= 25 },
    { id: 'music-make',        categoryKey: 'creativity',   when: ({ yearsLeft }) => yearsLeft >= 2 },
    { id: 'garden',            categoryKey: 'creativity' },
]
