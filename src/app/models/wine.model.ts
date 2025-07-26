export interface Wine {
    id?: number;
    name: string;
    ingredients: string;
    description: string;
    startDate: Date;
    startSpecificGravity: number;
    endSpecificGravity: number;
    rackDates: Date[];
}