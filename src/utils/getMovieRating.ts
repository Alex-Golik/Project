export const getMovieRating = (id: string): number => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
        hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    const min = 40; 
    const max = 96; 
    const final = min + Math.abs(hash % (max - min));
    return final / 10;
};

export const getRatingColor = (rating: number): string => {
    if (rating >= 8.5) return '#1e4620'; 
    if (rating >= 7.0) return '#4caf50'; 
    if (rating >= 6.0) return '#fbc02d'; 
    if (rating >= 4.5) return '#ff9800'; 
    return '#f44336';                    
};