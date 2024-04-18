export interface InternshipModel {
    id: number;
    name: string;
    city: string;
    specialization: string;
    education: string;
    experience: number; // кол-во лет
    salary: number; // кол-во рублей
    rating: number;
    rates_count: number;
    duration: number; //кол-во месяцев
}

export const Internships: InternshipModel[] = [
    {id: 0, rating: 3.25, education: 'среднее', rates_count: 23, name: 'специальная стражировка от Тинькоф', city: 'Москва', experience: 0, duration: 3, salary: 120000, specialization: 'Angular developer'},
    {id: 0, rating: 4.25, education: 'среднее', rates_count: 40, name: 'специальная стражировка от Тинькоф', city: 'Урюпинск', experience: 0, duration: 3, salary: 120000, specialization: 'Angular developer'},
    {id: 0, rating: 5, education: 'нет', rates_count: 12, name: 'специальная стражировка от HSE', city: 'Москва', experience: 0, duration: 3, salary: 120000, specialization: 'Python developer'},
    {id: 0, rating: 3.61, education: 'нет', rates_count: 42, name: 'специальная стражировка от ITMO', city: 'Питер', experience: 0, duration: 3, salary: 120000, specialization: 'Django developer'},
    {id: 0, rating: 2.25, education: 'среднее', rates_count: 55, name: 'специальная стражировка от ITMO', city: 'Москва', experience: 0, duration: 3, salary: 120000, specialization: 'Angular developer'},
    {id: 0, rating: 4.35, education: 'среднее', rates_count: 15, name: 'специальная стражировка от HSE', city: 'Волоколамск', experience: 0, duration: 3, salary: 120000, specialization: 'Angular developer'},
    {id: 0, rating: 5, education: 'среднее', rates_count: 7, name: 'специальная стражировка от Тинькоф', city: 'Москва', experience: 0, duration: 3, salary: 120000, specialization: 'Angular developer'},
]