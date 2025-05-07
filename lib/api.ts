export interface Slide { id: number; src: string }

export async function fetchSlides(): Promise<Slide[]> {
    return Array.from({ length: 6 }, (_, i) => ({
        id: i + 1,
        src: `/hero/slide-${i + 1}.png`
    }))
}