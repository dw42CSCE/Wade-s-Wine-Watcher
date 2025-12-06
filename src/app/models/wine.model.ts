export interface Wine {
    id?: number;
    name: string;
    ingredients: string | string[];
    description: string;
    startDate: Date | string;
    startSpecificGravity: number;
    endSpecificGravity: number;
    rackDates: Date[] | string[];
}
