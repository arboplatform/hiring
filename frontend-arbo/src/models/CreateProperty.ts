export interface CreateProperty {
    title: string;
    description: string;
    price: number;
    area: number;
    type: string;
    address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
    };
    features?: string[];
    img?: string[];
}
