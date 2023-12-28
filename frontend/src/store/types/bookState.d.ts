export interface Book {
	name: string;
	author: string;
	available: boolean;
	imageUrl?:string
}
export interface BookResponse extends Book{
    id:string
}
export interface bookState{
    bookProps:BookResponse;
    books:BookResponse[];
    filteredBooks:BookResponse[];
	isLoading:boolean
}