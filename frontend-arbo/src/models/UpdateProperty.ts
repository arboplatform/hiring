export interface UpdateProperty {
    title?: string;
    description?: string;
    price?: number;
    area?: number;
    type?: string;
    address?: {
        street?: string;
        city?: string;
        state?: string;
        zipCode?: string;
    };
    features?: string[];
    img?: string[];
    status?: string;
}
