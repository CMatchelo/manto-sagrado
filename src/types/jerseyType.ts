export interface JerseyType {
    team: string;
    season?: string;
    country: string;
    brand: string;
    type?: string;
    jerseyName?: string;
    jerseyNumber?: number;
    yearBought?: string;
    placeBought?: string;
    price?: number;
    sport?: string;
    focus?: string;
    subfocus?: string;
    details?: string
    mainColor?: string;
    secColor?: string;
    id?: string;
    photoFront?: string;
    photoBack?: string;
}

export const createJersey = (): JerseyType => ({
    team: '',
    country: '',
    brand: '',
})
