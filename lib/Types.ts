export type Essay = {
	id: number,
	Name: string
}

export type Header = {
    id: number,
    Name: string,
    Essay: number,
    Order_In_Essay: number
}

export type Sentence = {
    id: number,
    Paragraph: number,
    Sentence: string,
    Order_In_Paragraph: number
}