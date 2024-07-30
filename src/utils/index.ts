export function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(amount);
}

export function formateDate(dateSrt: string): string {
    
    const dateObj = new Date(dateSrt);
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    }

    return new Intl.DateTimeFormat('es-ES', options).format(dateObj);
}