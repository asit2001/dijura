import type { Document } from 'mongoose';

export default interface IBook extends Document {
	name: string;
	author: string;
	available: boolean;
	imageUrl?:string
}
