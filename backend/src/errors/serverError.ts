export  interface IServerError {
	STATUS: number;
	TITLE: string;
	MESSAGE: string;
}

const ERROR_TITLE = 'Unhandled Error.';
export default abstract class ServerError extends Error {
	abstract status: number;
	abstract title: string;
	abstract message: string;
	constructor(msg: string = ERROR_TITLE) {
		super(msg);
		Object.setPrototypeOf(this, ServerError.prototype);
	}
	abstract serializeError(): {
		title: string;
		message: string;
		status: number;
	};
}

