export interface InternshipModel {
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
    {name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', city: 'Москва', education: 'не требуется', experience: 0, salary: 32000, specialization: 'python программист', rating: 4.3, rates_count: 24, duration: 1},
    {name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', city: 'Москва', education: 'не требуется', experience: 0, salary: 32000, specialization: 'python программист', rating: 3.5, rates_count: 24, duration: 1},
    {name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', city: 'Москва', education: 'не требуется', experience: 0, salary: 32000, specialization: 'python программист', rating: 2.1, rates_count: 24, duration: 1},
    {name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', city: 'Москва', education: 'не требуется', experience: 3, salary: 32000, specialization: 'python программист', rating: 4.6, rates_count: 24, duration: 1},
    {name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', city: 'Москва', education: 'не требуется', experience: 2, salary: 32000, specialization: 'python программист', rating: 5.0, rates_count: 24, duration: 1},
]