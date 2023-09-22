export interface Medicine{
    id: string;
    name: string;
    price: number;
    stock: number;
}

export interface MedicineProps{
    medicine: Medicine;
}

export function MedicineConstructor(){
    const medicine: Medicine = {
        id: "",
        name: "",
        price: 0,
        stock: 0
    }
    return medicine
}