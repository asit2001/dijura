import multer from 'multer';
import crypto from 'crypto';
import path from 'path';
import admin from 'firebase-admin';

import { FIREBASE_SERVICE_ACCOUNT_BASE64, STORAGE_BUCKET } from '@/config/const';
import InternalError from '@/error/internal-error/internalError';
import COMMON_ERRORS from '@/error/internal-error/commonError';
const serviceAccountBuffer = Buffer.from(FIREBASE_SERVICE_ACCOUNT_BASE64, 'base64');
const serviceAccountJSON = serviceAccountBuffer.toString('utf-8');
const serviceAccount = JSON.parse(serviceAccountJSON);
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	storageBucket: STORAGE_BUCKET,
});

export const uploadFile = async (file: Express.Multer.File) => {
	const bucket = admin.storage().bucket();
	const filePath = 'dijura/' + crypto.randomUUID() + path.extname(file.originalname);
	const fileUpload = bucket.file(filePath);

	await fileUpload.save(file.buffer, {
		public: true,
		metadata: {
			contentType: file.mimetype,
		},
	});
	const [fileUrl] = await fileUpload.getSignedUrl({
		action: 'read',
		expires: '01-01-2050',
		virtualHostedStyle:true
	});

	return new URL(fileUrl).href;
};

export const ONLY_IMAGES_ALLOWED = (
	req: any,
	file: Express.Multer.File,
	cb: multer.FileFilterCallback
) => {
	if (
		file.mimetype !== 'image/png' &&
		file.mimetype !== 'image/jpg' &&
		file.mimetype !== 'image/jpeg'
	) {
		return cb(new InternalError(COMMON_ERRORS.UNSUPPORTED_MEDIA));
	}
	cb(null, true);
};
