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